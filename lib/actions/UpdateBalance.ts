'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectMongoDB from '../mongoDB/database';
import { PurchaseRequests, Users } from '../mongoDB/dbmodels';
import { TUser } from '../types';

export default async function UpdateBalance(
  amount: number,
  email: string,
  transRecordID?: string
) {
  const session = await auth();
  if (!session?.user) redirect('/');
  await connectMongoDB();
  const adminInfo: TUser | null = await Users.findOne({
    email: session.user.email,
  });
  if (!adminInfo) redirect('/');
  if (adminInfo.role !== 'admin') redirect('/');

  try {
    await Users.findOneAndUpdate(
      { email },
      { $inc: { ticketBalance: amount } }
    );
    if (transRecordID)
      await PurchaseRequests.findByIdAndUpdate(transRecordID, {
        approved: true,
      });
    return { ok: true, message: 'Tickets Succesfully Updated' };
  } catch (error) {
    return { ok: false, message: 'Something went wrong' };
  }
}
