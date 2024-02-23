'use client';
import React, { startTransition, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from '@/auth';
import { useFormState } from 'react-dom';
import { LoginSchema } from '@/schemas/UserSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginAuth } from '@/lib/actions/LoginAuth';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Link from 'next/link';

const SignInForm = () => {
  const email = useRef('');
  const password = useRef('');
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formOnsubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      const res = LoginAuth(values);
      res.then((result) => {
        if (result?.ok) {
          toast('Login Succesful', {
            description: 'Redirecting to Dashboard',
            duration: 3000,
          });
          router.push('/dashboard');
        }
      });
    });
  };

  const [pending, setPending] = useState(false);

  return (
    <Form {...form}>
      <form
        className='max-w-[80%] h-svh flex justify-center items-center flex-col w-96 relative'
        onSubmit={form.handleSubmit(formOnsubmit)}
      >
        <h1 className='absolute top-10 mx-auto text-3xl font-semibold'>
          Sign In
        </h1>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormLabel className='text-base py-2'>Email</FormLabel>
              <FormControl>
                <Input
                  className='p-6 text-base rounded-2xl'
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
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base py-2'>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='p-6 text-base rounded-2xl'
                  type='password'
                  placeholder='******'
                />
              </FormControl>
              <FormMessage className='text-rose-500' />
            </FormItem>
          )}
        />
        <br />
        <Button type='submit' className='w-full text-lg py-6 rounded-2xl'>
          Login
        </Button>
        <Link href='#' className='py-4 hover:opacity-90 transition'>
          Forgot Password?{' '}
        </Link>
        <br />
        <Button
          asChild
          className='md:hidden font-semibold py-6 rounded-xl text-base'
        >
          <Link href='#'>Create New Account</Link>
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
