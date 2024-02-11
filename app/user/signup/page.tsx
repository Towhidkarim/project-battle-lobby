import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <main className='min-h-svh bg-background w-screen'>
      <div className='w-full h-full flex justify-between items-center'>
        <div className='md:w-3/5 h-svh w-full flex flex-col justify-center items-center '>
          <h1 className=' text-3xl mb-6 font-semibold'>Create an account</h1>
          <h1 className=' text-sm py-2'>
            Already have an account?
            <span>
              <Button variant='outline' className='rounded-2xl mx-4'>
                <Link href='/user/signin'>Sign In</Link>
              </Button>
            </span>
          </h1>

          <SignUpForm />
        </div>
        <div className='w-2/5 hidden md:flex h-[90vh] mr-10 p-10 flex-col justify-between border border-border rounded-3xl'>
          <h4 className='text-lg'>
            Battle<b>Lobby</b>
          </h4>
          <div className='text-3xl font-bold'>
            Start your gaming journey with us!
            <p className='text-base text-muted-foreground'>Sub Caption</p>
          </div>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elita
            reprehenderit numquam ipsum, amet consectetur alias. Magni molestiae
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
