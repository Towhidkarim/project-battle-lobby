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
import { Input } from '@/components/ui/input';
import UpdateBalance from '@/lib/actions/UpdateBalance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { toast } from 'sonner';

export default function AddBalance({
  price,
  email,
  _id,
}: {
  _id: string;
  price: number;
  email: string;
}) {
  const [ticketAmount, setTicketAmount] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const addFunds = async () => {
    setIsPending(true);
    const res = await UpdateBalance(ticketAmount, email, _id);
    toast(res.message);
    setIsPending(false);
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Add <b className='text-white'>{ticketAmount}</b> tickets to the user
            with email <b className='text-white'>{email}</b> for
            <span className='flex gap-2 text-lg'>
              <TbCurrencyTaka />
              {price}
            </span>
            <br />
            <label htmlFor=''>
              Enter Amount
              <Input
                className='w-3/4 m-4 mx-auto'
                type='number'
                defaultValue={ticketAmount}
                onChange={(e) => setTicketAmount(Number(e.target.value))}
              />
            </label>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => addFunds()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
