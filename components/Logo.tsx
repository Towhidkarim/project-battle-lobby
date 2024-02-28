import Link from 'next/link';
import React from 'react';
import { MobileMenu } from './NavBar/MobileMenu';
import { Button } from './ui/button';

export default function Logo() {
  return (
    <>
      <span className='mr-3 md:hidden '>
        <MobileMenu />
      </span>
      <Button variant='ghost' className='rounded-xl' asChild>
        <Link href='/'>
          <h1 className='text-xl'>
            <span></span>
            Battle<span className='font-bold'>Lobby</span>
          </h1>
        </Link>
      </Button>
    </>
  );
}
