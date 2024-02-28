'use client';
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TSiteData } from '@/lib/types';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Button } from '../ui/button';
import SubmitPurchaseReques from '@/lib/actions/SubmitPurchaseRequest';
import { toast } from 'sonner';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export default function PurchaseForm({
  transactionNumbers,
  packageInfo,
}: {
  transactionNumbers?: { number: string; method: string }[] | null;
  packageInfo?: { name: string; price: number }[] | null;
}) {
  const packageData = packageInfo;
  const numberData = transactionNumbers;
  const packageRef = useRef(0);
  const numberRef = useRef(0);
  const transID = useRef('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataPackage = packageData?.[packageRef.current];
    const dataNumber = numberData?.[numberRef.current];
    if (!dataNumber || !dataPackage) {
      toast('Invalid Input');
      return;
    }
    setIsPending(true);
    const res = await SubmitPurchaseReques(
      dataPackage,
      dataNumber,
      transID.current
    );
    toast(res.message);
    console.log(dataPackage, dataNumber, transID.current);
    setIsPending(false);
    if (res.ok) router.refresh();
  };

  return (
    <form
      onSubmit={onSubmit}
      className='rounded-xl w-full mx-auto border border-border/80 p-4 '
    >
      <h1 className='text-xl '>Select Package</h1>
      <RadioGroup
        defaultValue='0'
        onValueChange={(value) => (packageRef.current = Number(value))}
        className='flex gap-2 justify-start flex-wrap'
      >
        {packageInfo?.map((value, index) => (
          <label key={index} htmlFor={`r${index}`}>
            <Button
              variant='ghost'
              className='m-2 has-[:checked]:bg-primary/20 h-20'
              asChild
            >
              <div className='flex items-center space-x-2' key={index}>
                <RadioGroupItem
                  className='h-5 w-5'
                  value={index.toString()}
                  id={`r${index}`}
                />
                <label
                  className='flex h-20 flex-col justify-center items-center gap-1'
                  htmlFor={`r${index}`}
                >
                  <p className='capitalize text-lg font-semibold py-1'>
                    {value.name}
                  </p>
                  <p className='text-muted-foreground font-light flex'>
                    <span className='text-xl'>
                      <TbCurrencyTaka />
                    </span>
                    {value.price}
                  </p>
                </label>
              </div>
            </Button>
          </label>
        ))}
      </RadioGroup>
      <h1 className='my-4 text-xl'>Select Transaction Number and Type</h1>

      <RadioGroup
        defaultValue='0'
        onValueChange={(value) => (numberRef.current = Number(value))}
        className='flex gap-2 flex-wrap justify-start'
      >
        {transactionNumbers?.map((value, index) => (
          <label key={index} htmlFor={`p${index}`}>
            <Button
              variant='ghost'
              className='m-2 has-[:checked]:bg-primary/20 h-14'
              asChild
            >
              <div className='flex items-center space-x-2' key={index}>
                <RadioGroupItem
                  className='h-5 w-5'
                  value={index.toString()}
                  id={`p${index}`}
                />
                <label
                  className='flex h-20 flex-col justify-center items-center gap-1'
                  htmlFor={`p${index}`}
                >
                  <p className='flex flex-col capitalize text-lg font-semibold py-1'>
                    {value.number}
                    <span className='text-muted-foreground font-light'>
                      {value.method}
                    </span>
                  </p>
                </label>
              </div>
            </Button>
          </label>
        ))}
      </RadioGroup>
      <br />
      <p className='text-sm py-2 text-muted-foreground'>
        Please make payment on the selected number and enter your transaction ID
      </p>
      <label>
        Transaction ID:
        <Input
          type='text'
          placeholder='xxxxxxxxxx'
          min={3}
          disabled={isPending}
          required
          onChange={(e) => (transID.current = e.target.value)}
        />
      </label>
      <br />
      <Button
        disabled={isPending}
        type='submit'
        className='w-full rounded-xl p-6 font-semibold'
      >
        Submit Purchase Request
      </Button>
    </form>
  );
}
