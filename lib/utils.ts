import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeLeft(milliSeconds: number) {
  const days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(milliSeconds / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(milliSeconds / (1000 * 60)) % 60;
  const seconds = Math.floor(milliSeconds / 1000) % 60;

  return { days, hours, minutes, seconds };
}
