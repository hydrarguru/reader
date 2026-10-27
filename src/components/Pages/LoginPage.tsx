import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiError } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '../Auth/AuthProvider';
import { useReturnPath } from '../Auth/useReturnPath';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Enter your username.' }),
  password: z.string().min(1, { message: 'Enter your password.' }),
});

export function LoginPage() {
  const { session, login } = useAuth();
  const returnPath = useReturnPath();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    document.title = 'Reader - Log in';
  }, []);

  // Also handles the redirect after a successful login, so there is exactly one navigation.
  if (session !== null && !form.formState.isSubmitting) {
    return <Navigate to={returnPath} replace />;
  }

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setError(null);
    try {
      await login(data.username, data.password);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? 'Wrong username or password.'
          : err instanceof ApiError && err.status === 429
            ? err.message
            : 'Could not log in right now. Please try again.'
      );
    }
  };

  return (
    <div className='mx-auto my-8 w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-card'>
      <h1 className='font-display text-4xl font-medium tracking-tight'>Log in</h1>
      <p className='mt-1 mb-6 text-sm text-muted-foreground'>Welcome back to your communities.</p>
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='current-password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p role='alert' className='text-sm font-medium text-destructive'>{error}</p>}
          <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Logging in…' : 'Log in'}
          </Button>
        </form>
      </Form>
      <p className='mt-6 text-sm text-center text-muted-foreground'>
        No account yet?{' '}
        <Link to='/signup' state={{ from: returnPath }} className='font-semibold text-brand-ink hover:underline'>
          Sign up
        </Link>
      </p>
    </div>
  );
}
