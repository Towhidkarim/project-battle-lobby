'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditProfile } from '@/lib/actions/EditProfile';
import { TUser } from '@/lib/types';
import { cn } from '@/lib/utils';
import { UserCompletionSchema } from '@/schemas/UserSchemas';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRef } from 'react';
import { toast } from 'sonner';

const EditForm = ({ userData }: { userData: TUser }) => {
  const router = useRouter();

  const { userName, email, ign, phoneNumber, uid } = userData;
  const uidRef = useRef('');
  const ignRef = useRef('');
  const phoneNumberRef = useRef(phoneNumber ?? '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedData = UserCompletionSchema.safeParse({
      uid: uidRef.current,
      ign: ignRef.current,
      phoneNumber: phoneNumberRef.current,
    });
    if (!parsedData.success) {
      toast('Invalid Data');
      return;
    }
    const { ign, phoneNumber, uid } = parsedData.data;
    const res = await EditProfile({ ign, phoneNumber, uid });
    toast(res.message);
    router.refresh();
  };
  const labelClasses = 'my-3 ';
  const inputClasses = 'mb-6 mt-1';
  return (
    <form
      onSubmit={handleSubmit}
      className='w-full rounded-xl border-border/90 border py-4 px-6'
    >
      <label className={cn(labelClasses)}>
        User Name:
        <Input
          type='text'
          value={userName ?? ''}
          className={cn(inputClasses)}
          disabled
        />
      </label>
      <label className={cn(labelClasses)}>
        Email Address:
        <Input
          type='text'
          value={email ?? ''}
          className={cn(inputClasses)}
          disabled
        />
      </label>
      <label className={cn(labelClasses)}>
        Mobile Number
        <Input
          type='text'
          //   placeholder='01xxxxxxxxx'
          placeholder={phoneNumber ?? '01xxxxxxxxx'}
          className={cn(inputClasses)}
          onChange={(e) => (ignRef.current = e.target.value)}
        />
      </label>
      <label className={cn(labelClasses)}>
        In Game Name:
        <Input
          type='text'
          //   placeholder='Your ign here'
          placeholder={ign ?? 'Your IGN here'}
          className={cn(inputClasses)}
          onChange={(e) => (ignRef.current = e.target.value)}
        />
      </label>
      <label className={cn(labelClasses)}>
        UID (UsreID):
        <Input
          type='text'
          //   placeholder='Your UID from game here'
          placeholder={uid ?? 'Your UID here'}
          className={cn(inputClasses)}
          onChange={(e) => (uidRef.current = e.target.value)}
        />
      </label>
      <Button
        type='submit'
        className='w-full py-4 rounded-xl font-semibold text-lg'
      >
        Save
      </Button>
    </form>
  );
};

export default EditForm;
