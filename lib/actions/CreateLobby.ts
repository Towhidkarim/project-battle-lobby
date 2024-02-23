'use server';

import { auth } from '@/auth';
import connectMongoDB from '../mongoDB/database';
import { Lobbies, Users } from '../mongoDB/dbmodels';
import { LobbyTypeSchema, TLobby, TUser } from '../types';
import { redirect } from 'next/navigation';

export async function CreateLobby(lobbyData: TLobby) {
  const session = await auth();
  if (!session) return;
  const email = session.user?.email;
  await connectMongoDB();
  const userData: TUser | null = await Users.findOne({ email }, { role: 1 });
  if (!userData) redirect('/');
  if (userData.role !== 'admin') redirect('/');
  const parsedData = LobbyTypeSchema.safeParse(lobbyData);
  if (!parsedData.success)
    return { ok: false, message: 'Invalid Data', error: parsedData.error };

  const {
    caption,
    gameName,
    lobbyStartTime,
    lobbyTitle,
    maxCapacity,
    entryFee,
    tags,
  } = parsedData.data;
  try {
    await Lobbies.create({
      caption,
      gameName,
      lobbyStartTime,
      lobbyTitle,
      maxCapacity,
      lobbyCreationTime: Date.now(),
      currentlyEntered: 0,
      entryFee,
      tags,
      status: 'recruiting',
      open: true,
    });
    return { ok: true, message: 'Event Created Succesfully' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Database Error', error };
  }
}
