'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SiteData, Users } from '../mongoDB/dbmodels';
import { SiteDataSchema, TSiteData, TUser } from '../types';
import { z } from 'zod';
import connectMongoDB from '../mongoDB/database';

export async function UpdateTransactionNumbers(
  inputData: { number: string; type: string }[]
) {
  const session = await auth();
  const phoneNumberRegEx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

  if (!session?.user) redirect('/');
  const schema = z.array(
    z.object({
      number: z.string().regex(phoneNumberRegEx),
      type: z.string().toLowerCase(),
    })
  );
  const parsedData = schema.safeParse(inputData);
  if (!parsedData.success) {
    return { ok: false, message: 'Invalid Input Data' };
  }
  await connectMongoDB();
  const userInfo: TUser | null = await Users.findOne(
    { email: session.user.email },
    { role: 1 }
  );
  if (!userInfo) redirect('/');
  if (userInfo.role !== 'admin')
    return { ok: false, message: "You don't have Admin privilege" };

  const siteData: TSiteData | null = await SiteData.findOne();
  if (!siteData)
    await SiteData.create({
      packageInfo: [
        {
          name: '',
          price: 0,
        },
      ],
      activeTransactionNumbers: [
        {
          number: '',
          type: '',
        },
      ],
    });
  else {
    try {
      await SiteData.findOneAndUpdate({
        activeTransactionNumbers: parsedData.data,
      });
      return { ok: true, message: 'Updated Succesfully' };
    } catch (error) {
      return { ok: false, message: 'Some Unexpected Error Occured' };
    }
  }
}
