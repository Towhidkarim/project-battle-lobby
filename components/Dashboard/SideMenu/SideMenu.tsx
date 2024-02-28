'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TUser } from '@/lib/types';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { MdAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';
import Logo from '@/components/Logo';

const SideMenu = ({
  userData,
  tabsData,
}: {
  userData: TUser;
  tabsData: {
    title: string;
    icon: React.ReactNode;
    component: React.ReactNode;
  }[];
}) => {
  const { userName, role } = userData;

  return (
    <TabsList className='relative flex flex-col justify-start py-8 items-center h-full'>
      <Logo />
      <span className='h-10' />
      <Avatar className='w-20 h-20 text-4xl'>
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      <p className='text-lg font-bold py-2'>{userName}</p>
      <span className='bg-foreground capitalize text-background py-1 px-2 rounded-md font-semibold text-xs'>
        {role === 'admin' || role === 'moderator' ? role : 'member'}
      </span>
      <Button
        asChild
        variant='ghost'
        className={cn(
          'h-12 inline-flex justify-center my-4 text-lg gap-3 items-center font-semibold w-3/5 px-10',
          ' hover:bg-foreground/5 rounded-xl transition-all py-3',
          role === 'user' ? 'hidden' : 'inline-flex'
        )}
      >
        <Link href='/administration'>
          <span className='scale-125'>
            <MdAdminPanelSettings />
          </span>
          Admin Panel
        </Link>
      </Button>
      <span className='h-6' />
      <div className='flex flex-col w-full justify-start items-center'>
        {tabsData.map((data, index) => (
          <TabsTrigger
            value={data.title}
            key={index}
            className={cn(
              'h-12 inline-flex justify-start gap-3 items-center font-light w-4/5 min-w-64 data-[state=active]:text-lg my-1 px-10',
              'data-[state=active]:font-extrabold hover:bg-foreground/5 rounded-xl transition-all py-3 data-[state=active]:bg-foreground/10 '
            )}
          >
            <span className='scale-125'>{data.icon}</span>
            {data.title}
          </TabsTrigger>
        ))}

        <Button
          onClick={() => signOut()}
          variant='ghost'
          className='absolute gap-3 bottom-4 h-12 w-3/5 inline-flex justify-start px-10 text-base font-light rounded-xl mx-auto'
        >
          <span className='scale-125'>
            <FaSignOutAlt />
          </span>
          Log Out
        </Button>
      </div>
    </TabsList>
  );
};

export default SideMenu;
