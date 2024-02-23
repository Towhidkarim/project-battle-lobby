'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LoginSchema } from '@/schemas/UserSchemas';

export async function LoginAuth(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validatedData = LoginSchema.safeParse(values);

  if (!validatedData.success) return { error: 'Invalid Inputs' };
  const { email, password } = validatedData.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { status: 'success', ok: true };
  } catch (error) {
    if (error instanceof AuthError) return { status: error.message, ok: false };
  }
}
