import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Post } from '@/types/PostType';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Same limits as the backend's validatePostChanges (Posts.post_title is VARCHAR(50)).
const postFormSchema = z.object({
  post_title: z
    .string()
    .trim()
    .min(1, { message: 'Give the post a title.' })
    .max(50, { message: 'Keep the title under 50 characters.' }),
  post_content: z.string().trim().min(1, { message: 'Write something first.' }),
  post_image_url: z
    .string()
    .trim()
    .max(255, { message: 'Keep the URL under 255 characters.' })
    .refine((value) => value === '' || /^https?:\/\/\S+$/.test(value), { message: 'Enter a full http(s) URL, or leave it empty.' }),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

interface PostFormDialogProps {
  /** The post to edit, or null to write a new one. */
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PostFormValues) => Promise<void>;
}

function toFormValues(post: Post | null): PostFormValues {
  return {
    post_title: post?.post_title ?? '',
    post_content: post?.post_content ?? '',
    post_image_url: post?.post_image_url ?? '',
  };
}

export function PostFormDialog({ post, open, onOpenChange, onSubmit }: PostFormDialogProps) {
  const isEditing = post !== null;
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: toFormValues(post),
  });

  // Start from the current post, or an empty form, each time the dialog opens.
  useEffect(() => {
    if (open) form.reset(toFormValues(post));
  }, [open, post, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='font-display text-3xl font-medium tracking-tight'>{isEditing ? 'Edit post' : 'Create a post'}</DialogTitle>
          <DialogDescription>{isEditing ? 'Change the title, text or image.' : 'Share something with the community.'}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='post_title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='An interesting title' autoComplete='off' maxLength={50} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='post_content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea rows={8} placeholder='What do you want to share?' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='post_image_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input type='url' placeholder='https://… (optional)' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='gap-2 pt-2'>
              <Button type='button' variant='ghost' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Post'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
