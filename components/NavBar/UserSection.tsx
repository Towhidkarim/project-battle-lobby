'use client';
import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserSection = () => {
  const { data, status } = useSession();
  if (status == 'authenticated')
    return (
      <Link
        className='hover:bg-foreground/10 py-1 font-semibold px-4 rounded-xl'
        href='/dashboard'
      >
        {data.user?.name}
      </Link>
    );
  return (
    <>
      <Button variant='outline' className='rounded-xl font-bold ' asChild>
        <Link href='user/signin'>Log In</Link>
      </Button>
      <Button
        asChild
        className='rounded-xl scale-90 lg:scale-100 font-bold hidden md:block text-foreground'
      >
        <Link href='/user/signup'>Sign Up</Link>
      </Button>
    </>
  );
};

export default UserSection;
