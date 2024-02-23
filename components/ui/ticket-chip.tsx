import { cn } from '@/lib/utils';
import React from 'react';
import { IoTicket } from 'react-icons/io5';

const TicketChip = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'bg-background inline-flex justify-center items-center gap-2 px-3 font-semibold rounded-2xl p-0.5',
        className
      )}
    >
      <span className='text-2xl'>
        <IoTicket />
      </span>
      {value}
    </span>
  );
};

export default TicketChip;
