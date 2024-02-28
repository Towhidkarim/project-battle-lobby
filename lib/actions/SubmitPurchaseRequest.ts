'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import connectMongoDB from '../mongoDB/database';
import { TPurchaseRequest, TUser } from '../types';
import { PurchaseRequests, Users } from '../mongoDB/dbmodels';

export default async function SubmitPurchaseReques(
  packageInfo: { name: string; price: number },
  numberInfo: { number: string; method: string },
  transactionID: string
) {
  const session = await auth();
  if (!session?.user) redirect('/user/signin');
  await connectMongoDB();
  const userInfo: TUser | null = await Users.findOne({
    email: session.user.email,
  });
  if (!userInfo) redirect('/user/signin');
  const reqInfo: TPurchaseRequest = {
    email: userInfo.email,
    packageName: packageInfo.name,
    packagePrice: packageInfo.price,
    transNumber: numberInfo.number,
    method: numberInfo.method,
    userName: userInfo.userName,
    transactionID,
    approved: false,
  };

  try {
    await PurchaseRequests.create(reqInfo);
    return {
      ok: true,
      message: 'Request Submitted Succesfully, Wait for approval and topup',
    };
  } catch (error) {
    return { ok: false, message: 'Error! Something went wrong' };
  }
}
