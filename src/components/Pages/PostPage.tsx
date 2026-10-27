import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import type { PostLoaderData } from '@/router';
import { Post } from '@/types/PostType';
import { ApiError } from '@/api/client';
import { deletePost, updatePost } from '@/api/posts';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { useSessionExpired } from '../Auth/useSessionExpired';
import { ButtonGroup } from '../Community/ButtonGroup';
import { CommunityPostDate } from '../Community/CommunityPost';
import { UserAvatar } from '../Common/UserAvatar';
import { PostComments } from '../Comments/PostComments';
import { PostFormDialog, PostFormValues } from '../Modals/PostFormDialog';

export function PostPage() {
  const { post: loadedPost } = useLoaderData() as PostLoaderData;
  const { communityName } = useParams();
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const sessionExpired = useSessionExpired();
  // The post as last saved here; falls back to the loaded one when moving to another post.
  const [savedPost, setSavedPost] = useState<Post | null>(null);
  const post = savedPost !== null && savedPost.post_id === loadedPost.post_id ? savedPost : loadedPost;
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isOwn = session !== null && session.username === post.post_author;
  const canDelete = isOwn || session?.is_admin === true;

  useEffect(() => {
    document.title = `Reader - ${post.post_title}`;
  }, [post.post_title]);

  const onEdit = async (values: PostFormValues) => {
    try {
      const updated = await updatePost(post.post_id as string, values);
      setSavedPost(updated);
      setEditing(false);
      toast({ title: 'Post updated', duration: 1250 });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setEditing(false);
        sessionExpired('edit your post');
        return;
      }
      toast({
        title: 'Error',
        description: `Error saving post: ${err instanceof Error ? err.message : 'unknown error'}`,
        duration: 2000,
      });
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deletePost(post.post_id as string, post.community_id as string);
      toast({ title: 'Post deleted', duration: 1250 });
      navigate(`/c/${communityName}`);
    } catch (err) {
      setDeleting(false);
      if (err instanceof ApiError && err.status === 401) {
        sessionExpired('delete the post');
        return;
      }
      if (err instanceof ApiError && err.status === 404) {
        // Already gone, e.g. deleted in another tab.
        navigate(`/c/${communityName}`);
        return;
      }
      toast({
        title: 'Error',
        description: `Error deleting post: ${err instanceof Error ? err.message : 'unknown error'}`,
        duration: 2000,
      });
    }
  };

  return (
    <article className='mx-auto max-w-3xl'>
      <Link
        to={`/c/${communityName}`}
        className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:underline'
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        c/{communityName}
      </Link>
      <div className='mt-6 rounded-xl border border-border bg-card px-6 py-8 shadow-card sm:px-10'>
        <div className='mb-4 flex items-center gap-2 text-[13px] font-medium text-muted-foreground'>
          <UserAvatar name={post.post_author} size={24} />
          <span>{post.post_author}</span>
          <span aria-hidden className='text-line-strong'>·</span>
          <CommunityPostDate createdAt={post.created_at ? new Date(post.created_at) : undefined} />
          <div className='ml-auto flex items-center gap-1'>
            {isOwn && (
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-foreground'
                onClick={() => setEditing(true)}
                aria-label='Edit post'
              >
                <Pencil size={16} strokeWidth={1.8} />
              </Button>
            )}
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-muted-foreground hover:text-destructive'
                    disabled={deleting}
                    aria-label='Delete post'
                  >
                    <Trash2 size={16} strokeWidth={1.8} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {isOwn
                        ? "Its comments are deleted too. This can't be undone."
                        : `This deletes ${post.post_author}'s post and its comments. It can't be undone.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={onDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        <h1 className='mb-6 font-display text-4xl font-medium leading-tight tracking-tight [text-wrap:balance]'>
          {post.post_title}
        </h1>
        {post.post_image_url && (
          <img src={post.post_image_url} alt='' className='mb-6 max-h-[480px] w-full rounded-md bg-muted object-contain' />
        )}
        <p className='mb-8 whitespace-pre-wrap text-base leading-[26px]'>{post.post_content}</p>
        <div className='border-t border-border pt-4'>
          <ButtonGroup key={post.post_id} id={post.post_id as string} score={post.post_score} />
        </div>
      </div>
      <PostComments key={post.post_id} postId={post.post_id as string} />
      {isOwn && <PostFormDialog post={post} open={editing} onOpenChange={setEditing} onSubmit={onEdit} />}
    </article>
  );
}
