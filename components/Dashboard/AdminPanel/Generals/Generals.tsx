import { TSiteData } from '@/lib/types';
import React from 'react';
import TransactionDataForm from './TransactionDataForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SiteData } from '@/lib/mongoDB/dbmodels';
import PackageDataForm from './PackageDataForm';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Generals() {
  const session = await auth();
  if (!session?.user) redirect('/');
  const currentSiteData: TSiteData | null = await SiteData.findOne();
  let numberdata;
  let packageData;
  if (currentSiteData)
    numberdata = currentSiteData.activeTransactionNumbers.map((v, i) => ({
      number: v.number,
      type: v.type,
    }));
  else numberdata = [{ number: '01xxxxxxxxx', type: 'Method' }];

  if (currentSiteData)
    packageData = currentSiteData.packageInfo.map((v, i) => ({
      name: v.name,
      price: v.price,
    }));
  else packageData = [{ name: 'Package', price: 0 }];
  //   if (!currentSiteData) return;

  return (
    <ScrollArea className='h-[80vh]'>
      <h1 className='text-xl font-semibold'>General Options</h1>
      <br />
      <h1 className='text-center text-lg'>Manage Transaction Numbers</h1>
      <TransactionDataForm phoneNumbers={numberdata} />
      <br /> <br />
      <h1 className='text-center text-lg'>Manage Packages</h1>
      <PackageDataForm packages={packageData} />
    </ScrollArea>
  );
}
