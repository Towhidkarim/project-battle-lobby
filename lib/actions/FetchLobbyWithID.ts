'use server';

import { auth } from '@/auth';
import connectMongoDB from '../mongoDB/database';
import { Lobbies, Users } from '../mongoDB/dbmodels';
import { TLobby, TUser } from '../types';
import { redirect } from 'next/navigation';

export async function FetchLobbieyWithID(id: string) {
  const session = await auth();
  if (!session) return;
  const email = session.user?.email;
  await connectMongoDB();
  const userData: TUser | null = await Users.findOne({ email }, { role: 1 });
  if (!userData) redirect('/');
  if (userData.role !== 'admin') redirect('/');

  try {
    await connectMongoDB();

    const lobbydata: TLobby | null = await Lobbies.findById(id);
    if (lobbydata) return { ok: true, data: lobbydata };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
