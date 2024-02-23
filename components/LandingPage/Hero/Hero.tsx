'use client';
import React from 'react';
import { Button } from '../../ui/button';
import ImageSlideshow from './ImageSlideshow';

const Hero = () => {
  return (
    <section className='container mx-auto'>
      <div className='flex gap-20 md:flex-row flex-col justify-center items-center w-full md:min-h-[500px] min-h-[400px]'>
        <div className='md:w-2/5 w-11/12 grid place-items-center'>
          <h1 className='md:text-6xl text-4xl text-center font-semibold'>
            Play, fight, Win
          </h1>
          <p className='text-xl text-center my-5'>
            Make money doing what you love
          </p>
          <Button className='text-lg rounded-xl p-6 text-foreground'>
            Sign Up Now!
          </Button>
        </div>
        <div className='md:w-2/5 w-11/12 grid place-items-center'>
          <ImageSlideshow />
        </div>
      </div>
    </section>
  );
};

export default Hero;
