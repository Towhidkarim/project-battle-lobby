'use server';

import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import connectMongoDB from '../mongoDB/database';
import { Lobbies, Users } from '../mongoDB/dbmodels';
import { TLobby, TLobbyRegistrationData, TUser } from '../types';

export async function JoinLobby(lobbyID: string) {
  const session = await auth();
  if (!session) redirect('/');

  try {
    await connectMongoDB();
    const lobbyData: TLobby | null = await Lobbies.findOne({ _id: lobbyID });
    if (!lobbyData || !lobbyData._id)
      return { ok: false, message: 'Lobby Not found' };
    if (lobbyData.currentlyEntered >= lobbyData.maxCapacity)
      return { ok: false, message: 'Lobby Already Full' };
    if (lobbyData.status === 'ended' || lobbyData.status === 'running')
      return { ok: false, message: 'Registration Closed' };
    // console.log(lobbyData);
    const userInfo: TUser | null = await Users.findOne({
      email: session.user?.email,
    });
    if (!userInfo) return { ok: false, message: 'User Not found' };
    if (!userInfo.uid || !userInfo.ign)
      return {
        ok: false,
        message: 'Please Update your IGN and UID from profile settings',
      };
    if (userInfo.lobbiesRegistered.includes(lobbyData._id)) {
      return { ok: false, message: 'Already Registered to this lobby' };
    }
    if (!userInfo.ticketBalance)
      await Users.findByIdAndUpdate(userInfo._id, { ticketBalance: 0 });
    if (userInfo.ticketBalance < lobbyData.entryFee)
      return { ok: false, message: 'Not Enough Tickets' };

    const registrationInfo: TLobbyRegistrationData = {
      player_id: userInfo._id?.toString() ?? '',
      player_uid: userInfo.uid,
      player_userName: userInfo.userName,
      playerEmail: userInfo.email,
      playerIGN: userInfo.ign ?? '',
      playerNumber: userInfo.phoneNumber,
    };
    await Lobbies.findOneAndUpdate(
      { _id: lobbyID },
      {
        $inc: { currentlyEntered: 1 },
        $push: {
          registrationData: registrationInfo,
          dropDupes: true,
        },
      }
    );

    await Users.findByIdAndUpdate(userInfo._id, {
      $inc: { ticketBalance: lobbyData.entryFee * -1 },
      $push: { lobbiesRegistered: lobbyData._id },
    });
    return { ok: true, message: 'succesfully joined' };
  } catch (error) {
    console.log(error);
  }
}
