import { ScrollArea } from '@/components/ui/scroll-area';
import { TPurchaseRequest } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';
import connectMongoDB from '@/lib/mongoDB/database';
import { PurchaseRequests } from '@/lib/mongoDB/dbmodels';
import { Button } from '@/components/ui/button';
import AddBalance from './AddBalance';
import AddDirectBalance from './AddDirectBalance';

export default async function TopupRequests() {
  await connectMongoDB();
  const data: TPurchaseRequest[] | null = await PurchaseRequests.find()
    .sort({ _id: -1 })
    .lean();
  const columns = [
    'UserName',
    'Email',
    'Package',
    'Package Price',
    'Transaction On',
    'Method',
    'TransactionID',
    'Approval',
  ];

  const tableRowClass = 'w-1/5 p-4 text-base font-normal overflow-hidden';
  return (
    <div className='p-4 w-full flex flex-col justify-center items-center'>
      <AddDirectBalance />
      <br />
      {/* <Button className='mx-auto  p-6 font-semibold text-base my-4 rounded-2xl'>
        Download Data
      </Button> */}
      <div className='w-full flex rounded-t-3xl bg-foreground text-background font-semibold justify-between'>
        {columns.map((value, index) => (
          <span className='w-1/5 p-4 text-lg' key={index}>
            {value}
          </span>
        ))}
      </div>
      <ScrollArea className='w-full h-[300px]'>
        {data?.map((value, index) => {
          const {
            _id,
            email,
            method,
            packagePrice,
            transNumber,
            transactionID,
            userName,
            packageName,
            approved,
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
                    {userName}
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white'>
                    <p className='text-base'>{userName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(tableRowClass, 'text-start overflow-hidden')}
                  >
                    {email}
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white'>
                    <p className='text-base'>{email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className={tableRowClass}>{packageName}</span>
              <span className={tableRowClass}>{packagePrice}</span>
              <span className={cn(tableRowClass, 'capitalize')}>
                {transNumber}
              </span>
              <span className={cn(tableRowClass, 'capitalize')}>{method}</span>
              {/* <span className={tableRowClass}>{playerEmail}</span> */}
              <span className={tableRowClass}>{transactionID}</span>
              <span className={tableRowClass}>
                {approved ? (
                  <Button disabled>Approved</Button>
                ) : (
                  <AddBalance
                    _id={_id?.toString() ?? ''}
                    price={packagePrice}
                    email={email}
                  />
                )}
              </span>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
