import z from 'zod';

export const UserTypeSchema = z.object({
  _id: z.string().optional(),
  userName: z.string().min(5),
  password: z.string().min(6),
  email: z.string().email(),
  inGameTag: z.string().optional(),
  role: z.union([z.literal('user'), z.literal('admin')]),
  createdAt: z.date(),
  currentOtp: z.number().optional(),
  emailVerified: z.boolean(),
});

export type TUser = z.infer<typeof UserTypeSchema>;
