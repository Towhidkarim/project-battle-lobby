import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TPurchaseRequest } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import AddBalance from './AddBalance';

export default function RequestsTable({
  columns,
  data,
}: {
  columns: string[];
  data?: TPurchaseRequest[];
}) {
  return (
    <div className=' mx-auto'>
      <div className=' flex rounded-t-3xl bg-foreground text-background font-semibold justify-between'>
        {columns.map((value, index) => (
          <span className='w-1/5 p-4 text-lg' key={index}>
            {value}
          </span>
        ))}
      </div>
      <ScrollArea className='w-full h-[90vh]'>
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

          const tableRowClass =
            'w-1/5 p-4 text-base font-normal overflow-hidden';
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
