'use server';
import { SignUpSchema } from '@/schemas/UserSchemas';
import z from 'zod';
import connectMongoDB from '../mongoDB/database';
import { Users } from '../mongoDB/dbmodels';
// import {} from 'mongoose'

export async function SignUpAuth(values: z.infer<typeof SignUpSchema>) {
  const parsedValues = SignUpSchema.safeParse(values);
  if (!parsedValues.success)
    return { ok: false, message: 'Something Went Wrong' };

  const { userName, email, phoneNumber, password } = parsedValues.data;
  const createdAt = new Date().getTime();
  try {
    await connectMongoDB();
    const exists = await Users.findOne({ email }).lean();
    if (exists) return { ok: false, message: 'User with Email already exists' };
    await Users.create({
      userName,
      email,
      phoneNumber,
      password,
      createdAt,
      emailVerified: false,
    });
  } catch (error) {
    console.log(error);
    return { ok: false, message: error };
  }
}
