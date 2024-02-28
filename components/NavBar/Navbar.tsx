import React from 'react';
import { Button } from '../ui/button';
import { FaAngleDown } from 'react-icons/fa6';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import UserSection from './UserSection';
import Logo from '../Logo';

const Navbar = () => {
  return (
    <nav className='w-full h-14 border-b-[1px] border-border grid place-items-center text-lg'>
      <div className='container mx-auto w-full flex flex-row items-center justify-between'>
        <Logo />
        <div className='md:flex hidden  font-semibold'>
          <Button
            variant='ghost'
            className='font-bold rounded-xl lg:text-xl text-lg'
            asChild
          >
            <Link href='/'>Home</Link>
          </Button>
          <Button
            variant='ghost'
            className='font-bold rounded-xl lg:text-xl text-lg text-foreground/70'
            asChild
          >
            <Link href='/dashboard'>Schedule</Link>
          </Button>
          <Button
            variant='ghost'
            className='font-bold rounded-xl lg:text-xl text-lg text-foreground/70'
            asChild
          >
            <Link href='/'>About us</Link>
          </Button>
        </div>
        <div className='flex flex-row gap-2'>
          {/* <div className='flex md:text-lg text-base justify-center items-center gap-2 relative m-auto mx-4 group cursor-pointer active:opacity-90 transition'>
            Language
            <span className='group-hover:rotate-180 transition'>
              <FaAngleDown />
            </span>
            <div
              className='group-hover:scale-y-100 group-active:scale-y-100 origin-top scale-y-0 transition
                             absolute top-full bg-background border border-border shadow rounded-lg w-[8ch] py-3 px-6 flex flex-col items-center justify-center'
            >
              <Button variant='ghost' className='w-16'>
                EN
              </Button>
              <Button variant='ghost' className='w-16'>
                BN
              </Button>
            </div>
          </div> */}
          <UserSection />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
