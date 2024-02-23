import { ScrollArea } from '@/components/ui/scroll-area';
import { TLobby } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import LobbyInfo from '../LobbyInfo/LobbyInfo';
import { ModifyDialog } from './ModifyDilaogue';

const LobbyTable = ({ lobbyData }: { lobbyData: TLobby[] }) => {
  const headers = [
    'Title',
    'Game',
    'Status',
    'Open/Closed',
    'PlayerCount',
    'EntryFee',
    'PlayerData',
  ];
  const tableRowClass = 'w-[14%] p-4 text-base font-normal';
  return (
    <div className='w-full flex flex-col border border-border/70'>
      <div className='w-full flex rounded-t-3xl bg-foreground text-background font-semibold justify-between'>
        {headers.map((value, index) => (
          <span className='w-1/5 p-4 text-lg' key={index}>
            {value}
          </span>
        ))}
      </div>
      <ScrollArea className='flex flex-col max-h-[70vh]'>
        {lobbyData.map((value, index) => {
          const {
            _id,
            lobbyTitle,
            gameName,
            status,
            open,
            currentlyEntered,
            maxCapacity,
            credentials,
            entryFee,
          } = value;
          return (
            <div
              key={index}
              className={cn(
                'w-full flex font-semibold justify-between',
                index % 2 == 0 ? 'bg-foreground/5' : ''
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(tableRowClass, 'text-start overflow-hidden')}
                  >
                    {lobbyTitle}
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white'>
                    <p className='text-base'>{lobbyTitle}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className={tableRowClass}>{gameName}</span>
              <span className={cn(tableRowClass, 'capitalize')}>{status}</span>
              <span className={tableRowClass}>{open ? 'Open' : 'Closed'}</span>
              <span className={cn(tableRowClass, '')}>
                {currentlyEntered}/{maxCapacity}
              </span>
              <span className={tableRowClass}>{entryFee || 'Free'}</span>
              <span className={cn(tableRowClass, 'flex gap-2 -translate-x-8')}>
                <ModifyDialog
                  lobbyID={_id?.toString() ?? ''}
                  credentials={credentials ?? { code: '', password: '' }}
                  lobbyOpen={open}
                  status={status}
                />
                <Button className='rounded-2xl font-semibold' asChild>
                  <Link
                    href={'/administration/lobbydata/' + _id}
                    target='_blank'
                  >
                    Players
                  </Link>
                </Button>
              </span>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default LobbyTable;
