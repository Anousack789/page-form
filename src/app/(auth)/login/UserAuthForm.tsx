'use client';

import { HTMLAttributes, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuLoader2 } from 'react-icons/lu';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' })
    .max(50),
});
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [pending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    setTransition(async () => {
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.status === 200) {
        router.push(callbackUrl ?? '/');
      } else {
        alert(signInResult?.error);
      }
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='********' {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pending}>
              {pending && <LuLoader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
