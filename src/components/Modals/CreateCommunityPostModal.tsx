import { useLocation, useNavigate, useRevalidator } from 'react-router';
import { createPost } from '@/api/posts';
import { ApiError } from '@/api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

interface CreateCommunityPostModalProps {
  communityId: string;
  communityName: string;
  isOpen: boolean;
  modalClose: () => void;
}

const createPostFormSchema = z.object({
  community_id: z.string(),
  post_title: z
    .string()
    .min(6, {
      message: 'Post title must be at least 6 characters.',
    })
    .max(255),
  post_content: z.string().min(6, {
    message: 'Post content must be at least 6 characters.',
  }),
});

export function CreateCommunityPostModal(CreateCommunityPostModalProps: CreateCommunityPostModalProps) {
  const { toast } = useToast();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      community_id: CreateCommunityPostModalProps.communityId,
      post_title: '',
      post_content: '',
    },
  });

  const onCancel = () => {
    form.reset();
    CreateCommunityPostModalProps.modalClose();
  }

  const onSubmit = async (data: z.infer<typeof createPostFormSchema>) => {
    try {
      await createPost(data.community_id, data.post_title, data.post_content);
      form.reset();
      CreateCommunityPostModalProps.modalClose();
      toast({
        title: 'Post created',
        description: 'Your post has been successfully created',
        type: 'foreground',
        duration: 1250
      });
      // Re-run the route loaders so the new post shows up.
      revalidate();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        CreateCommunityPostModalProps.modalClose();
        toast({ title: 'Session expired', description: 'Please log in again to post.', duration: 2000 });
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      toast({
        title: 'Error',
        description: `Error creating post: ${err instanceof Error ? err.message : 'unknown error'}`,
        type: 'background',
        duration: 2000
      });
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${CreateCommunityPostModalProps.isOpen ? 'block' : 'hidden'
        }`}
    >
      <div className='fixed inset-0 bg-[#1C1A21]/50 backdrop-blur-sm' onClick={onCancel}></div>
      <div role='dialog' aria-modal='true' aria-labelledby='create-post-title' className='relative mx-4 w-full overflow-hidden rounded-xl border border-border bg-card shadow-raised transition-all sm:max-w-lg'>
        <div className='p-6 sm:p-8'>
          <h3 id='create-post-title' className='font-display text-3xl font-medium tracking-tight'>Create a post</h3>
          <p className='mt-1 text-sm text-muted-foreground'>in c/{CreateCommunityPostModalProps.communityName}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 space-y-4'>
              <FormField
                control={form.control}
                name='post_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='An interesting title' autoComplete='false' {...field} />
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
                      <Textarea rows={6} placeholder='What do you want to share?' autoComplete='false' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end gap-2 pt-2'>
                <Button type='button' variant='ghost' onClick={onCancel}>
                  Cancel
                </Button>
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Posting…' : 'Post'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
