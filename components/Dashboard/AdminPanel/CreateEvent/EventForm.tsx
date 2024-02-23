'use client';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';

import { TLobby, LobbyTypeSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IoPeople, IoTicket } from 'react-icons/io5';
import { toast } from 'sonner';
import { CreateLobby } from '@/lib/actions/CreateLobby';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const EventForm = () => {
  const lobbyTitle = useRef('');
  const gameName = useRef('');
  const maxCapacity = useRef(0);
  const caption = useRef('');
  const time = useRef('00:00');
  const entryFee = useRef(0);
  const tags = useRef('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const router = useRouter();
  const timeSchema = z.object({
    hour: z.number().min(1).max(12),
    minute: z.number().min(0).max(59),
    meridiem: z.union([z.literal('AM'), z.literal('PM')]),
  });
  // const time = useRef<z.infer<typeof timeSchema>>({
  //   hour: 12,
  //   minute: 0,
  //   meridiem: 'AM',
  // });
  const onSubmit = async () => {};

  const inputClasses = 'my-1 mb-4 rounded-xl';
  const labelClasses = 'my-2';
  const formData = useRef<TLobby>();

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!time.current || !date) return;
    const startDate = date;
    const timeInfo = time.current.split(':');
    startDate.setHours(Number(timeInfo[0]));
    startDate.setMinutes(Number(timeInfo[1]));

    e.preventDefault();
    const eventData: TLobby = {
      caption: caption.current,
      gameName: gameName.current,
      maxCapacity: maxCapacity.current,
      lobbyCreationTime: new Date(),
      currentlyEntered: 0,
      lobbyTitle: lobbyTitle.current,
      lobbyStartTime: startDate,
      tags: [tags.current],
      open: true,
      status: 'recruiting',
      entryFee: entryFee.current,
    };
    const parsedData = LobbyTypeSchema.safeParse(eventData);
    if (parsedData.success) {
      const res = await CreateLobby(parsedData.data);
      if (res?.ok) {
        toast(res.message);
        router.refresh();
      }
    }
  };

  return (
    <ScrollArea className='h-[75vh]'>
      <div className='w-11/12 mx-auto border border-border rounded-3xl p-6'>
        <form onSubmit={formOnSubmit}>
          <label className={labelClasses}>
            Lobby Title
            <Input
              type='text'
              placeholder='A lobby'
              name='lobbyTitle'
              className={cn(inputClasses)}
              onChange={(e) => (lobbyTitle.current = e.target.value)}
            />
          </label>
          <label className={labelClasses}>
            Game Name
            <Input
              type='text'
              name='gameName'
              placeholder='Any supported game'
              className={cn(inputClasses)}
              onChange={(e) => (gameName.current = e.target.value)}
            />
          </label>
          <label className={labelClasses}>
            Caption
            <Input
              type='text'
              placeholder='Small Description'
              className={cn(inputClasses)}
              onChange={(e) => (caption.current = e.target.value)}
            />
          </label>
          <div className='flex w-full gap-4'>
            <label className={cn(labelClasses)}>
              <span className='inline-flex justify-center items-center gap-2'>
                Max Capacity
                <IoPeople />
              </span>
              <Input
                type='number'
                defaultValue={0}
                min={0}
                className={cn(inputClasses)}
                onChange={(e) => (maxCapacity.current = Number(e.target.value))}
              />
            </label>
            <label className={cn(labelClasses)}>
              <span className='inline-flex justify-center items-center gap-2'>
                Entry Fee
                <IoTicket />
              </span>
              <Input
                type='number'
                defaultValue={0}
                min={0}
                className={cn(inputClasses)}
                onChange={(e) => (entryFee.current = Number(e.target.value))}
              />
            </label>
            <label className={cn(labelClasses)}>
              <span className='inline-flex justify-center items-center gap-2'>
                Lobby Tag
                {/* <IoTicket /> */}
              </span>
              <Input
                type='text'
                placeholder='Tag such as FFA, Squad'
                className={cn(inputClasses)}
                onChange={(e) => (tags.current = e.target.value)}
              />
            </label>
          </div>
          <label>Lobby Start Time and Date</label>
          <div className='flex md:gap-5 flex-col md:flex-row gap-2'>
            <label className={labelClasses}>
              <Input
                type='time'
                className={cn('w-32')}
                defaultValue='12:00'
                onChange={(e) => (time.current = e.target.value)}
                // onChange={(e) => console.log(e.target.value)}
              />
            </label>
            <label className={cn(labelClasses, '')}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-48 justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </label>
            {/* <label className={labelClasses}>
              Hour
              <Input
                type='number'
                min={1}
                max={12}
                name='Small Description'
                defaultValue={12}
                className={cn(inputClasses, 'w-28 ')}
                onChange={(e) => (time.current.hour = Number(e.target.value))}
              />
            </label>
            <label className={labelClasses}>
              Minute
              <Input
                type='number'
                min={0}
                max={59}
                name='Small Description'
                defaultValue={0}
                className={cn(inputClasses, 'w-28')}
                onChange={(e) => (time.current.minute = Number(e.target.value))}
              />
            </label>
            <label className={labelClasses}>
              Meridiem
              <Input
                type='text'
                name='Small Description'
                defaultValue='AM'
                className={cn(inputClasses, 'w-28 ')}
                //onChange={(e) => (maxCapacity.current = Number(e.target.value))}
              />
            </label> */}
          </div>
          <Button>Submit</Button>
        </form>
      </div>
    </ScrollArea>
  );
};

export default EventForm;
