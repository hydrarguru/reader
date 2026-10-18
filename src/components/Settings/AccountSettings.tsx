import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiError } from '@/api/client';
import { invalidatePostsCache } from '@/api/posts';
import { deleteUser, updateUser } from '@/api/users';
import { Session, setSession } from '@/lib/session';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '../Auth/AuthProvider';

// Same rules as sign-up.
const profileFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(32, { message: 'Username can be at most 32 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Use only letters, numbers and underscores.' }),
  email: z
    .string()
    .trim()
    .refine((value) => value === '' || z.string().email().safeParse(value).success, { message: 'Enter a valid email address.' }),
});

const passwordFormSchema = z
  .object({
    current_password: z.string().min(1, { message: 'Enter your current password.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

function errorText(err: unknown): string {
  return err instanceof Error ? err.message : 'unknown error';
}

/** Sends the user to the login page after their session ran out, and back here afterwards. */
function useSessionExpired() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  return (action: string) => {
    toast({ title: 'Session expired', description: `Please log in again to ${action}.`, duration: 2000 });
    navigate('/login', { state: { from: location.pathname } });
  };
}

/** Forms for changing the username, email and password, and for deleting the account. */
export function AccountSettings({ session }: { session: Session }) {
  return (
    <div className='flex flex-col gap-8'>
      <ProfileForm session={session} />
      <PasswordForm session={session} />
      <DeleteAccount session={session} />
    </div>
  );
}

function ProfileForm({ session }: { session: Session }) {
  const { toast } = useToast();
  const sessionExpired = useSessionExpired();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { username: session.username, email: '' },
  });

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    const changes = {
      ...(data.username !== session.username ? { username: data.username } : {}),
      ...(data.email !== '' ? { email: data.email } : {}),
    };
    if (Object.keys(changes).length === 0) {
      toast({ title: 'Nothing to change', duration: 1250 });
      return;
    }
    try {
      const user = await updateUser(session.user_id, changes);
      if (user.username !== session.username) {
        setSession({ ...session, username: user.username });
        // Cached posts still show the old name on this user's posts.
        invalidatePostsCache();
      }
      form.reset({ username: user.username, email: '' });
      toast({ title: 'Account updated', duration: 1250 });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('change your account');
        return;
      }
      if (err instanceof ApiError && err.status === 409) {
        const field = err.message.toLowerCase().includes('email') ? 'email' : 'username';
        form.setError(field, { message: field === 'email' ? 'That email is already in use.' : 'That username is taken.' });
        return;
      }
      toast({ title: 'Error', description: `Error updating account: ${errorText(err)}`, duration: 2000 });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete='username' {...field} />
              </FormControl>
              <FormDescription>Your posts and comments show the new name too.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New email</FormLabel>
              <FormControl>
                <Input type='email' autoComplete='email' placeholder='Leave empty to keep your current email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PasswordForm({ session }: { session: Session }) {
  const { toast } = useToast();
  const sessionExpired = useSessionExpired();
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { current_password: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    try {
      await updateUser(session.user_id, { password: data.password, current_password: data.current_password });
      form.reset();
      toast({ title: 'Password changed', duration: 1250 });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('change your password');
        return;
      }
      if (err instanceof ApiError && err.status === 403) {
        form.setError('current_password', { message: 'That password is incorrect.' });
        return;
      }
      toast({ title: 'Error', description: `Error changing password: ${errorText(err)}`, duration: 2000 });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 border-t border-border pt-6'>
        {/* Lets password managers tie the new password to this account. */}
        <input type='text' name='username' autoComplete='username' value={session.username} readOnly hidden />
        <FormField
          control={form.control}
          name='current_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input type='password' autoComplete='current-password' {...field} />
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
              <FormLabel>New password</FormLabel>
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
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type='password' autoComplete='new-password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit' variant='outline' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Changing…' : 'Change password'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function DeleteAccount({ session }: { session: Session }) {
  const { logout } = useAuth();
  const { toast } = useToast();
  const sessionExpired = useSessionExpired();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deleteUser(session.user_id);
      invalidatePostsCache();
      // Leave the settings page first, so its login redirect doesn't kick in when the session ends.
      navigate('/', { replace: true, flushSync: true });
      logout();
      toast({ title: 'Account deleted', description: 'Your account, posts and comments are gone.', duration: 2000 });
    } catch (err) {
      setDeleting(false);
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('delete your account');
        return;
      }
      toast({ title: 'Error', description: `Error deleting account: ${errorText(err)}`, duration: 2000 });
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6'>
      <div>
        <p className='font-semibold'>Delete account</p>
        <p className='text-sm text-muted-foreground'>Deletes your account with all your posts and comments.</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete account'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes {session.username} along with every post and comment you wrote. It can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={onDelete}>
              Delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
