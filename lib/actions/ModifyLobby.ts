'use server';

import { auth } from '@/auth';
import connectMongoDB from '../mongoDB/database';
import { Lobbies, Users } from '../mongoDB/dbmodels';
import { LobbyTypeSchema, TLobby, TUser } from '../types';
import { redirect } from 'next/navigation';

export async function ModifyLobby({
  lobbyID,
  status,
  open,
  credentials,
}: {
  lobbyID: string;
  status: string;
  open: boolean;
  credentials: {
    code: string;
    password: string;
  };
}) {
  const session = await auth();
  if (!session) return;
  const email = session.user?.email;
  try {
    await connectMongoDB();
    const userData: TUser | null = await Users.findOne({ email }, { role: 1 });
    if (!userData) redirect('/');
    if (userData.role !== 'admin') redirect('/');

    if (status !== 'recruiting' && status !== 'running' && status !== 'ended') {
      console.log(status, open);
      return { ok: false, message: 'Invalid Status Info' };
    }
    console.log(status, open);

    await Lobbies.findByIdAndUpdate(lobbyID, {
      status,
      open,
      credentials,
    });
    return { ok: true, message: 'Succesfully Modified' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Error Occured' };
  }
}
