import { useState } from 'react';
import { createPost } from '@/api/posts';
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
  post_author: z.string(),
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
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      community_id: CreateCommunityPostModalProps.communityId,
      post_author: 'admin',
      post_title: '',
      post_content: '',
    },
  });

  const onCancel = () => {
    form.reset();
    CreateCommunityPostModalProps.modalClose();
  }

  const onSubmit = async (data: z.infer<typeof createPostFormSchema>) => {
    createPost(
      data.community_id,
      data.post_title,
      data.post_author,
      '',
      data.post_content
    ).then(() => {
      form.reset();
      CreateCommunityPostModalProps.modalClose();
      toast({
        title: 'Post created',
        description: 'Your post has been successfully created',
        type: 'foreground',
        duration: 1250
      });
    }).catch((err) => {
      console.error(err);
      toast({
        title: 'Error',
        description: `Error creating post: ${err}`,
        type: 'background',
        duration: 1250
      });
    });
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        CreateCommunityPostModalProps.isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='fixed inset-0 bg-black opacity-50' onClick={onCancel}></div>
      <div className='bg-zinc-900 rounded-md overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-white'>
            Creating a post in {CreateCommunityPostModalProps.communityName}
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-2'>
              <FormField
                control={form.control}
                name='post_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post title:</FormLabel>
                    <FormControl>
                      <Input className='focus-visible:ring-0' placeholder='Post title...' autoComplete='false' {...field} />
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
                    <FormLabel>Post content:</FormLabel>
                    <FormControl>
                      <Textarea className='focus-visible:ring-0' cols={5} placeholder='Post content...' autoComplete='false' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between'>
                <Button className='mt-2' type='submit'>
                  Submit
                </Button>
                <Button className='mt-2' variant="destructive" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
