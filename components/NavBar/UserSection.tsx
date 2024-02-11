'use client';
import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserSection = () => {
  const { data, status } = useSession();
  if (status == 'authenticated') return <h1>{data.user?.name}</h1>;
  return (
    <>
      <Button variant='outline' className='rounded-xl font-bold ' asChild>
        <Link href='user/signin'>Log In</Link>
      </Button>
      <Button className='rounded-xl font-bold hidden md:block text-foreground'>
        Sign Up
      </Button>
    </>
  );
};

export default UserSection;
