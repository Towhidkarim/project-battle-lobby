import React from 'react';
import { FaUser, FaGamepad, FaMoneyCheckAlt } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi2';
import { Button } from '../../ui/button';

const cardContent = [
  {
    icon: <FaUser />,
    text: 'Sign up and get started',
  },
  {
    icon: <FaGamepad />,
    text: 'Participate in our regular lobbies',
  },
  {
    icon: <FaMoneyCheckAlt />,
    text: 'Win, perform well and get handsomly rewarded!',
  },
  {
    icon: <HiUserGroup />,
    text: 'Join our large community',
  },
];

const SubHero = () => {
  return (
    <section className='container mx-auto'>
      <h1 className='text-4xl md:text-6xl font-semibold text-center mt-10 mb-5'>
        It's Easy to Get Started.
      </h1>
      <p className='text-center text-lg md:text-xl text-muted-foreground my-6 mb-10'>
        Improve your KD/A and earn at the same time
      </p>
      <div className='grid place-items-center max-w-[40rem] mx-auto grid-flow-row md:grid-cols-2 gap-10'>
        {cardContent.map((value, index) => (
          <div className='md:w-72 select-none w-full bg-background hover:scale-105 transition h-40 rounded-2xl border shadow-md border-border justify-center items-center flex flex-col gap-5'>
            <span className='text-3xl'>{value.icon}</span>
            <span className='text-center'>{value.text}</span>
          </div>
        ))}
      </div>
      <br /> <br />
      <h1 className='text-4xl md:text-5xl font-semibold text-center mt-20 mb-5'>
        Large Platform with Robust Support
      </h1>
      <p className='text-center text-lg md:text-xl text-muted-foreground my-6 mb-10'>
        Are you a pro player? or a casual, or a tournament host? Look No Further
      </p>
      <div className='grid place-items-center'>
        <Button
          className='mx-auto text-lg text-foreground font-semibold rounded-xl hover:animate-none animate-pulse'
          size='lg'
        >
          Join Now!
        </Button>
      </div>
    </section>
  );
};

export default SubHero;
