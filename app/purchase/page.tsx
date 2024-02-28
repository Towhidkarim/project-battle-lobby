import Navbar from '@/components/NavBar/Navbar';
import PurchaseForm from '@/components/PurchasePage/PurchaseForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import connectMongoDB from '@/lib/mongoDB/database';
import { SiteData } from '@/lib/mongoDB/dbmodels';
import { TSiteData } from '@/lib/types';
import React from 'react';

export default async function Purchase() {
  await connectMongoDB();
  const siteData: TSiteData | null = await SiteData.findOne();
  const transactionNumbers = siteData?.activeTransactionNumbers.map((v, i) => ({
    number: v.number,
    method: v.type,
  }));
  const packageInfo = siteData?.packageInfo.map((v, i) => ({
    name: v.name,
    price: v.price,
  }));

  return (
    <main className='min-h-svh w-screen bg-background overflow-hidden'>
      <Navbar />
      <div className='container mx-auto'>
        <h1 className='md:text-4xl text-3xl my-4 font-semibold text-center'>
          Purchase Token
        </h1>
        <PurchaseForm
          transactionNumbers={transactionNumbers}
          packageInfo={packageInfo}
        />
      </div>
    </main>
  );
}
