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
import Link from 'next/link';

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
      <Button className='rounded-2xl p-6 text-lg font-semibold' asChild>
        <Link href='/administration/purchaserequests' target='_blank'>
          View All Purchase Requests
        </Link>
      </Button>
    </div>
  );
}
