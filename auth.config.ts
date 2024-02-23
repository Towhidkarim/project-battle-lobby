import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import connectMongoDB from './lib/mongoDB/database';
import { Users } from './lib/mongoDB/dbmodels';
import { LoginSchema } from './schemas/UserSchemas';
import z from 'zod';
import { TUser } from './lib/types';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    credentials({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsedInfo = LoginSchema.safeParse(credentials);
        if (!parsedInfo.success) return null;
        const loginMail = parsedInfo.data.email;
        const loginPass = parsedInfo.data.password;
        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        try {
          await connectMongoDB();
          const fetchedUserInfo: TUser | null = await Users.findOne({
            email: loginMail,
          });
          if (fetchedUserInfo === null) return null;
          const { email, password, _id, userName, role } = fetchedUserInfo;

          const isPassCorrect = await bcrypt.compare(loginPass, password);
          if (isPassCorrect) return { id: _id, name: userName, email, role };
        } catch (error) {
          return null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/user/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
