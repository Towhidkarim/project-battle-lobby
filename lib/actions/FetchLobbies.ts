'use server';

import { auth } from '@/auth';
import connectMongoDB from '../mongoDB/database';
import { Lobbies } from '../mongoDB/dbmodels';
import { TLobby } from '../types';

export async function FetchLobbies(openOnly: boolean = false) {
  const session = await auth();
  if (!session?.user) return;

  try {
    await connectMongoDB();
    let lobbydata: TLobby[] | null;
    if (openOnly)
      lobbydata = await Lobbies.find({ open: true }).sort({ _id: -1 }).lean();
    else lobbydata = await Lobbies.find().sort({ _id: -1 }).lean();
    if (lobbydata) return { ok: true, data: lobbydata };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
