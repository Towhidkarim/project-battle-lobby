'use client';

import { timeLeft } from '@/lib/utils';
import { useEffect, useState } from 'react';

const CountDown = ({ endTime }: { endTime: Date }) => {
  const timeNow = Date.now();
  const [timer, setTimer] = useState(timeLeft(endTime.getTime() - Date.now()));

  const withPrefix = (value: number) =>
    value < 10 ? '0' + value.toString() : value.toString();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timeLeft(endTime.getTime() - Date.now()));
    }, 1000);
    if (endTime.getTime() - Date.now() < 0) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (endTime.getTime() - Date.now() < 0)
    return <span className='md:text-base text-sm'>Lobby Started!</span>;

  return (
    <span suppressHydrationWarning>
      Starts in: &nbsp;
      {`${withPrefix(timer.hours)}:${withPrefix(timer.minutes)}:${withPrefix(
        timer.seconds
      )}`}
    </span>
  );
};

export default CountDown;
