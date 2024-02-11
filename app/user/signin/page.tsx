import Navbar from '@/components/NavBar/Navbar';
import SignInForm from '@/components/SignInForm/SignInForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import demoBG from '@/assets/demo-bg.webp';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Home = async () => {
  const session = await auth();
  if (session?.user) redirect('/');
  return (
    <main className='min-h-svh w-full bg-background'>
      <div className='flex w-full min-h-svh justify-center items-center'>
        <section className='hidden w-2/5 relative z-10 h-svh md:flex flex-col justify-center items-center'>
          <figure className=''></figure>
          <Image
            src={demoBG}
            alt=''
            className='absolute h-full -z-[1] border blur object-cover'
          />
          <h1 className='text-5xl text-center font-semibold py-2'>
            Welcome to BattleLobby
          </h1>
          <p>Not a user? Register now!</p> <br />
          <Button className='rounded-xl p-5 text-lg font-semibold shadow-lg'>
            <Link href='/user/signup'>Sign up</Link>
          </Button>
        </section>
        <section className='w-full md:w-3/5 h-full grid place-items-center'>
          <SignInForm />
        </section>
      </div>
    </main>
  );
};

export default Home;
