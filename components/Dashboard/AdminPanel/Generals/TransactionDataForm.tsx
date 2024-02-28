'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import AlertButton from './AlertButton';
import { UpdateTransactionNumbers } from '@/lib/actions/UpdateTransactionNumbers';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function TransactionDataForm({
  phoneNumbers,
}: {
  phoneNumbers: { number: string; type: string }[];
}) {
  const defaults = phoneNumbers;
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [numbers, setNumbers] = useState(phoneNumbers);

  const addMore = () => {
    setNumbers((value) => [
      ...value,
      { number: '01xxxxxxxxx', type: 'Method' },
    ]);
  };

  const updateNumber = (index: number, value: string) => {
    setNumbers((initial) =>
      initial.map((v, i) => (i === index ? { number: value, type: v.type } : v))
    );
  };
  const updateType = (index: number, value: string) => {
    setNumbers((initial) =>
      initial.map((v, i) =>
        i === index ? { number: v.number, type: value } : v
      )
    );
  };

  const remove = (value: { number: string; type: string }) => {
    setNumbers((item) => item.filter((v) => (v == value ? false : true)));
  };

  if (!phoneNumbers) addMore();
  //   console.log('hello');
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const res = await UpdateTransactionNumbers(numbers);
    toast(res?.message);
    setIsPending(false);
    if (res?.ok) router.refresh();
  };

  return (
    <form
      onSubmit={formOnSubmit}
      className='max-w-[40rem] mx-auto p-5 m-2 border border-border/75 rounded-xl'
    >
      {numbers.map((value, index) => (
        <div key={index} className='flex gap-4 justify-center items-center'>
          <Input
            type='text'
            placeholder={value.number}
            defaultValue={value.number == '01xxxxxxxxx' ? '' : value.number}
            pattern='^[0][1-9]\d{9}$|^[1-9]\d{9}$'
            className='my-4 max-w-64'
            onChange={(e) => updateNumber(index, e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder={value.type}
            defaultValue={value.type == 'Method' ? '' : value.type}
            className='my-4 max-w-32'
            onChange={(e) => updateType(index, e.target.value)}
            required
          />
          <AlertButton value={value} deleteFunction={remove} />
        </div>
      ))}
      <div className='mx-auto w-96 flex gap-4 justify-center items-center'>
        <Button
          type='button'
          disabled={isPending}
          className='my-4 w-full mx-auto rounded-lg font-semibold'
          onClick={addMore}
        >
          <span className='text-2xl font-semibold'>+&nbsp;</span>
          Add More
        </Button>
        {/* <Button onClick={() => setNumbers(defaults)}> Defaults </Button> */}
      </div>
      <Button
        disabled={isPending}
        className='w-full rounded-2xl text-lg font-semibold p-6'
      >
        Save Changes
      </Button>
    </form>
  );
}
