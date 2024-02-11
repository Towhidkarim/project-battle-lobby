'use client';
import React, { startTransition, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoginSchema, SignUpSchema } from '@/schemas/UserSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginAuth } from '@/lib/actions/LoginAuth';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Link from 'next/link';
import { SignUpAuth } from '@/lib/actions/SignUpAuth';

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const formOnsubmit = async (values: z.infer<typeof SignUpSchema>) => {
    startTransition(() => {
      const res = SignUpAuth(values);
      res.then((result) => {
        // if (!result?.ok) router.push('/');
      });
    });
  };

  const [pending, setPending] = useState(false);

  const inputClass = 'p-4 rounded-2xl';

  return (
    <Form {...form}>
      <form
        className='max-w-[80%] flex justify-center items-center flex-col w-96 relative'
        onSubmit={form.handleSubmit(formOnsubmit)}
      >
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormLabel className=' py-2'>User Name</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  {...field}
                  type='text'
                  placeholder='UserName'
                />
              </FormControl>
              <FormMessage className='text-rose-500' />
            </FormItem>
          )}
        />
        <br />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormLabel className=' py-2'>Email</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  {...field}
                  type='email'
                  placeholder='user@mail.com'
                />
              </FormControl>
              <FormMessage className='text-rose-500' />
            </FormItem>
          )}
        />
        <br />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormLabel className=' py-2'>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  {...field}
                  type='tel'
                  placeholder='01xxxxxxxxx'
                />
              </FormControl>
              <FormMessage className='text-rose-500' />
            </FormItem>
          )}
        />
        <br />
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className=' py-2'>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={inputClass}
                    type='password'
                    placeholder='******'
                  />
                </FormControl>
                <FormMessage className='text-rose-500' />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className=' py-2'>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={inputClass}
                    type='password'
                    placeholder='******'
                  />
                </FormControl>
                <FormMessage className='text-rose-500' />
              </FormItem>
            )}
          />
        </div>
        <br />
        <Button type='submit' className='w-full text-lg py-6 rounded-2xl'>
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
