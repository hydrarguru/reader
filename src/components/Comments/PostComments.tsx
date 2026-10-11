import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Trash2 } from 'lucide-react';

import { ApiError } from '@/api/client';
import { createComment, deleteComment, getPostComments } from '@/api/comments';
import { Comment } from '@/types/CommentType';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useAuthLinkState } from '../Auth/useReturnPath';
import { UserAvatar } from '../Common/UserAvatar';
import { CommunityPostDate } from '../Community/CommunityPost';

// Matches the Comments.comment_content column, VARCHAR(255).
const MAX_COMMENT_LENGTH = 255;

const commentFormSchema = z.object({
  comment_content: z
    .string()
    .trim()
    .min(1, { message: 'Write something first.' })
    .max(MAX_COMMENT_LENGTH, { message: `Comments can be at most ${MAX_COMMENT_LENGTH} characters.` }),
});

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

/** The comments under a post: a form for logged-in users, then the comments, oldest first. */
export function PostComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let current = true;
    setComments(null);
    setLoadError(false);
    getPostComments(postId)
      .then((result) => current && setComments(result))
      .catch((err) => {
        console.error('Could not load comments', err);
        if (current) setLoadError(true);
      });
    return () => {
      current = false;
    };
  }, [postId]);

  const heading = comments === null ? 'Comments' : `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`;

  return (
    <section aria-labelledby='comments-heading' aria-busy={comments === null && !loadError} className='mt-8'>
      <h2 id='comments-heading' className='mb-4 font-display text-2xl font-medium tracking-tight'>
        {heading}
      </h2>
      <CommentForm postId={postId} onCreated={(comment) => setComments((prev) => [...(prev ?? []), comment])} />
      <div className='mt-6 flex flex-col gap-3'>
        {loadError ? (
          <p className='text-sm text-muted-foreground'>Comments couldn't be loaded. Try reloading the page.</p>
        ) : comments === null ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : comments.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              onDeleted={() => setComments((prev) => prev?.filter((c) => c.comment_id !== comment.comment_id) ?? null)}
            />
          ))
        )}
      </div>
    </section>
  );
}

function CommentForm({ postId, onCreated }: { postId: string; onCreated: (comment: Comment) => void }) {
  const { session } = useAuth();
  const authLinkState = useAuthLinkState();
  const sessionExpired = useSessionExpired();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { comment_content: '' },
  });

  if (session === null) {
    return (
      <p className='rounded-lg border border-border bg-card px-5 py-4 text-sm text-muted-foreground'>
        <Link to='/login' state={authLinkState} className='font-semibold text-brand-ink hover:underline'>
          Log in
        </Link>{' '}
        to join the conversation.
      </p>
    );
  }

  const onSubmit = async (data: z.infer<typeof commentFormSchema>) => {
    try {
      const comment = await createComment(postId, data.comment_content);
      form.reset();
      onCreated(comment);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('comment');
        return;
      }
      toast({
        title: 'Error',
        description: `Error posting comment: ${err instanceof Error ? err.message : 'unknown error'}`,
        duration: 2000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border border-border bg-card p-5'>
        <FormField
          control={form.control}
          name='comment_content'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sr-only'>Comment</FormLabel>
              <FormControl>
                <Textarea rows={3} maxLength={MAX_COMMENT_LENGTH} placeholder='Add a comment' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-3 flex justify-end'>
          <Button type='submit' size='sm' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Commenting…' : 'Comment'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function CommentItem({ comment, onDeleted }: { comment: Comment; onDeleted: () => void }) {
  const { session } = useAuth();
  const sessionExpired = useSessionExpired();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const isOwn = session !== null && session.username === comment.comment_author;

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deleteComment(comment.comment_id);
      onDeleted();
    } catch (err) {
      setDeleting(false);
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('delete your comment');
        return;
      }
      if (err instanceof ApiError && err.status === 404) {
        // Already gone, e.g. deleted in another tab.
        onDeleted();
        return;
      }
      toast({
        title: 'Error',
        description: `Error deleting comment: ${err instanceof Error ? err.message : 'unknown error'}`,
        duration: 2000,
      });
    }
  };

  return (
    <article className='rounded-lg border border-border bg-card px-5 py-4'>
      <div className='mb-2 flex items-center gap-2 text-[13px] font-medium text-muted-foreground'>
        <UserAvatar name={comment.comment_author} size={22} ring={isOwn} />
        <span>{comment.comment_author}</span>
        <span aria-hidden className='text-line-strong'>·</span>
        <CommunityPostDate createdAt={comment.created_at ? new Date(comment.created_at) : undefined} />
        {isOwn && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='ml-auto h-8 w-8 text-muted-foreground hover:text-destructive'
                disabled={deleting}
                aria-label='Delete comment'
              >
                <Trash2 size={16} strokeWidth={1.8} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
                <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <p className='whitespace-pre-wrap text-[15px] leading-6'>{comment.comment_content}</p>
    </article>
  );
}

export function CommentSkeleton() {
  return (
    <div className='rounded-lg border border-border bg-card px-5 py-4'>
      <div className='mb-3 flex items-center gap-2'>
        <Skeleton className='h-[22px] w-[22px] rounded-full' />
        <Skeleton className='h-4 w-32' />
      </div>
      <Skeleton className='mb-2 h-4 w-full' />
      <Skeleton className='h-4 w-2/3' />
    </div>
  );
}
