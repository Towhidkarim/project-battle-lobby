'use server';

import { auth } from '@/auth';
import { TUser } from '../types';
import { redirect } from 'next/navigation';
import { connect } from 'http2';
import connectMongoDB from '../mongoDB/database';
import { Users } from '../mongoDB/dbmodels';
import { UserCompletionSchema } from '@/schemas/UserSchemas';
import z from 'zod';

export async function EditProfile({
  ign,
  phoneNumber,
  uid,
}: z.infer<typeof UserCompletionSchema>) {
  const session = await auth();
  if (!session) return redirect('/');
  const parsedData = UserCompletionSchema.safeParse({ ign, phoneNumber, uid });
  if (!parsedData.success) return { ok: true, message: 'Invalid Data' };
  try {
    await connectMongoDB();
    await Users.findOneAndUpdate(
      { email: session.user?.email },
      {
        ign,
        phoneNumber,
        uid,
      }
    );
    return { ok: true, message: 'Updated Succesfully' };
  } catch (error) {
    return { ok: false, message: 'Something went wrong' };
  }
}
