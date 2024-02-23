import React from 'react';
import { footerInfo } from '@/lib/constants';
import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className='container mx-auto border-t border-border py-5 mt-10'>
      <div className='grid md:grid-cols-5 grid-cols-2 gap-10 '>
        <h1 className='text-2xl my-2 font-semibold'>
          Battle<span className='font-bold'>Lobby</span>
        </h1>
        {footerInfo.map((value, index) => (
          <ul key={index}>
            {value.map((v, i) => (
              <li key={i} className='my-6'>
                <Link className='hover:opacity-80 transition' href={v.url}>
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className='border-t border-border py-4 text-muted-foreground'>
        Copyright©BattleLobby All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
