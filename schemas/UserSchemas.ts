import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(1, { message: 'Password must not be empty' }),
});

const usernameRegEx = /^[a-zA-Z\-]+$/;
const phoneNumberRegEx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
export const SignUpSchema = z
  .object({
    email: z.string().email(),
    userName: z
      .string()
      .min(5)
      .max(20)
      .regex(usernameRegEx, 'Invalid Username'),
    password: z
      .string()
      .min(6, { message: 'Atleast 6 chracters required' })
      .max(30, { message: "Can't contain more than 10 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Atleast 6 chracters required' })
      .max(30, { message: "Can't contain more than 10 characters" }),
    phoneNumber: z
      .string()
      .length(11, { message: '11 digits required' })
      .regex(phoneNumberRegEx, 'Invalid Mobile Number'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });

export const UserCompletionSchema = z.object({
  ign: z.string().min(3),
  uid: z.string().min(3),
  phoneNumber: z
    .string()
    .length(11, { message: '11 digits required' })
    .regex(phoneNumberRegEx, 'Invalid Mobile Number'),
});
