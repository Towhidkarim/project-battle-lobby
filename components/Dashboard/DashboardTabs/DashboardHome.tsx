import React from 'react';
import demoBanner from '@/assets/demo-banner.jpg';
import Image from 'next/image';
import LobbyBanner from '../LobbyBanner/LobbyBanner';
import { FetchLobbies } from '@/lib/actions/FetchLobbies';
import { TUser } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashboardHome = async ({ userData }: { userData: TUser }) => {
  const lobbies = await FetchLobbies(true);
  // if (lobbies?.ok) console.log(lobbies);
  return (
    <section>
      <h1 className='text-lg font-semibold my-2'>Currently Open Lobbies</h1>
      <ScrollArea className='h-[75vh]'>
        <div className='flex flex-col gap-10'>
          {lobbies?.data?.map((value, index) => (
            <LobbyBanner key={index} lobbyData={value} userData={userData} />
          ))}
        </div>
      </ScrollArea>
      {/* <LobbyBanner /> */}
    </section>
  );
};

export default DashboardHome;
