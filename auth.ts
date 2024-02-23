import NextAuth from 'next-auth';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface User {
    /** The user's postal address. */
    role?: 'moderator' | 'user' | 'admin';
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    // signIn({ user, account }) {
    //   console.log(user);
    //   return true;
  },

  ...authConfig,
});
