'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import TicketChip from '@/components/ui/ticket-chip';
import { JoinLobby } from '@/lib/actions/JoinLobby';
import { TLobby } from '@/lib/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function EntranceDialogue({
  lobbyID,
  lobbyTitle,
  gameName,
  entryFee,
  caption,
  startTime,
}: {
  lobbyID: string;
  lobbyTitle: string;
  gameName: string;
  entryFee: number;
  caption: string;
  startTime: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleJoin = async () => {
    setIsLoading(true);
    const res = await JoinLobby(lobbyID);
    router.refresh();
    toast(res?.message);
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant='outline'
          className='w-full my-6 border-white/50 hover:bg-background/75 hover:text-xl bg-background/50 font-bold text-lg active:scale-100 group-active:opacity-90 rounded-xl p-6 '
        >
          Join Now
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='border-border rounded-xl'>
        <AlertDialogHeader>
          <AlertDialogTitle>Join lobby "{lobbyTitle}" ?</AlertDialogTitle>
          <AlertDialogDescription className='text-base'>
            <p>{caption}</p>
            <span className='flex justify-start items-center gap-2 py-2'>
              Entry Fee:
              <TicketChip
                className='border border-white/60 px-2'
                value={entryFee ? entryFee.toString() : 'Free'}
              />
            </span>
            <span>
              Starting at: &nbsp;
              {startTime}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleJoin}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
