'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SiteData, Users } from '../mongoDB/dbmodels';
import { SiteDataSchema, TSiteData, TUser } from '../types';
import { z } from 'zod';
import connectMongoDB from '../mongoDB/database';

export async function UpdatePackages(
  inputData: { name: string; price: number }[]
) {
  const session = await auth();

  if (!session?.user) redirect('/');
  const schema = z.array(
    z.object({
      name: z.string(),
      price: z.number().min(0),
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
        packageInfo: parsedData.data,
      });
      return { ok: true, message: 'Updated Succesfully' };
    } catch (error) {
      return { ok: false, message: 'Some Unexpected Error Occured' };
    }
  }
}
