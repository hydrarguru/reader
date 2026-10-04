import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signUp } from '@/api/auth';
import { ApiError } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';
import { useReturnPath } from '../Auth/useReturnPath';

const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters.' })
      .max(32, { message: 'Username can be at most 32 characters.' })
      .regex(/^[a-zA-Z0-9_]+$/, { message: 'Use only letters, numbers and underscores.' }),
    email: z.string().email({ message: 'Enter a valid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUpPage() {
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const returnPath = useReturnPath();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    document.title = 'Reader - Sign up';
  }, []);

  // Also handles the redirect after a successful sign-up, so there is exactly one navigation.
  if (session !== null && !form.formState.isSubmitting) {
    return <Navigate to={returnPath} replace />;
  }

  const onSubmit = async (data: SignUpForm) => {
    setError(null);
    try {
      await signUp(data.username, data.email, data.password);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 409
          ? 'That username or email is already taken.'
          : 'Could not create your account right now. Please try again.'
      );
      return;
    }

    try {
      await login(data.username, data.password);
      toast({ title: 'Welcome to Reader!', description: `Signed in as ${data.username}.`, duration: 2000 });
    } catch {
      // The account exists, so send them to log in rather than showing a sign-up error.
      navigate('/login', { replace: true, state: { from: returnPath } });
    }
  };

  return (
    <div className='max-w-sm w-full mx-auto my-12 p-6 rounded-md border bg-neutral-50 dark:bg-zinc-900'>
      <h1 className='text-2xl font-bold mb-4'>Create an account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input autoComplete='username' autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' autoComplete='email' {...field} />
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
                  <Input type='password' autoComplete='new-password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='new-password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p role='alert' className='text-sm font-medium text-destructive'>{error}</p>}
          <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>
      </Form>
      <p className='mt-4 text-sm text-center text-gray-500 dark:text-gray-400'>
        Already have an account?{' '}
        <Link to='/login' state={{ from: returnPath }} className='text-violet-600 hover:underline'>
          Log in
        </Link>
      </p>
    </div>
  );
}
