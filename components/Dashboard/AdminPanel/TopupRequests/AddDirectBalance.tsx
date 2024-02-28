'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UpdateBalance from '@/lib/actions/UpdateBalance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddDirectBalance() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const res = await UpdateBalance(amount, email);
    toast(res.message);
    setIsPending(false);
    router.refresh();
  };
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <h1 className='text-2xl text-center'>Add Balance through E-mail</h1>
      <Input
        type='email'
        placeholder='Email'
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type='number'
        defaultValue={0}
        required
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button type='submit' disabled={isPending}>
        {' '}
        Add Tickets{' '}
      </Button>
    </form>
  );
}
