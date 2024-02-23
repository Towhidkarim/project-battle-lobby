import React from 'react';
import TopUpCard from './TopUpCard';
import { PricingTiers } from '@/lib/constants';

const TopUpHome = () => {
  return (
    <section className='my-10 container mx-auto '>
      <h1 className='text-3xl mt-5 font-semibold text-center'>Top Up</h1>
      <hr className='w-44 bg-foreground rounded-full mx-auto h-1 my-2' />
      <br />
      <div className='flex md:flex-row flex-col gap-10 items-center justify-center'>
        {PricingTiers.map((value, index) => (
          <TopUpCard {...value} key={index} />
        ))}
      </div>
    </section>
  );
};

export default TopUpHome;
