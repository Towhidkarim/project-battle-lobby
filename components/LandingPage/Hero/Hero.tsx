'use client';
import React from 'react';
import { Button } from '../../ui/button';
import ImageSlideshow from './ImageSlideshow';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Hero = () => {
  const { status } = useSession();
  return (
    <section className='container mx-auto'>
      <div className='flex gap-20 md:flex-row flex-col justify-center items-center w-full md:min-h-[500px] min-h-[400px]'>
        <div className='md:w-2/5 w-11/12 grid place-items-center'>
          <h1 className='md:text-6xl text-4xl text-center font-semibold'>
            Play, fight, Win
          </h1>
          <p className='text-xl text-center my-5'>
            Make money doing what you love
          </p>
          <Button className='text-lg rounded-xl p-6 text-foreground' asChild>
            {status !== 'authenticated' ? (
              <Link href='/user/signup'>Sign Up Now!</Link>
            ) : (
              <Link href='/dashboard'>Go to Dashboard</Link>
            )}
          </Button>
        </div>
        <div className='md:w-2/5 w-11/12 grid place-items-center'>
          <ImageSlideshow />
        </div>
      </div>
    </section>
  );
};

export default Hero;
