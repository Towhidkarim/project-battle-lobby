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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ModifyLobby } from '@/lib/actions/ModifyLobby';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ModifyDialog({
  lobbyID,
  lobbyOpen,
  status,
  credentials,
}: {
  lobbyID: string;
  lobbyOpen: boolean;
  status: 'recruiting' | 'running' | 'ended';
  credentials: { code: string; password: string };
}) {
  const [open, setOpen] = useState(lobbyOpen);
  const [lobbyStatus, setLobbyStatus] = useState<string>(status);
  const codeRef = useRef(credentials.code);
  const passRef = useRef(credentials.password);

  const router = useRouter();

  const handleModify = async () => {
    const res = await ModifyLobby({
      lobbyID,
      credentials: { code: codeRef.current, password: passRef.current },
      open,
      status: lobbyStatus,
    });
    toast(res?.message);
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='rounded-2xl font-semibold'>Modify</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='border-border/70 w-auto p-10'>
        <AlertDialogHeader>
          <AlertDialogTitle>Modify Lobby Settings</AlertDialogTitle>
          <AlertDialogDescription className='text-foreground'>
            <div className='my-2 capitalize'>
              Lobby Status:
              <Select onValueChange={setLobbyStatus}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder={lobbyStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='recruiting'>Recruiting</SelectItem>
                  <SelectItem value='running'>Running</SelectItem>
                  <SelectItem value='ended'>Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <br />
            <span className='flex gap-2 justify-start items-center'>
              Lobby Enabled:
              <Switch checked={open} onCheckedChange={setOpen} />
            </span>
            <br />
            Code
            <Input
              className='w-44 mb-2 mt-1 rounded-xl'
              type='text'
              onChange={(e) => (codeRef.current = e.target.value)}
              placeholder={codeRef.current}
            />
            Password
            <Input
              className='w-44 mb-2 mt-1 rounded-xl'
              type='text'
              onChange={(e) => (passRef.current = e.target.value)}
              placeholder={passRef.current}
            />
            {/* <Button className='rounded-xl my-2'>Update Credentials</Button> */}
            <br /> <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex justify-center items-center'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleModify}>Modify </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
