import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

export default {
  providers: [
    credentials({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        if (user) {
          console.log(credentials);
          return user;
        }
        console.log('failed');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/user/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
