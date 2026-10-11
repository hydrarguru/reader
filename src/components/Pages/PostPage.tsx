import { useEffect } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import type { PostLoaderData } from '@/router';
import { ButtonGroup } from '../Community/ButtonGroup';
import { CommunityPostDate } from '../Community/CommunityPost';
import { UserAvatar } from '../Common/UserAvatar';
import { PostComments } from '../Comments/PostComments';

export function PostPage() {
  const { post } = useLoaderData() as PostLoaderData;
  const { communityName } = useParams();

  useEffect(() => {
    document.title = `Reader - ${post.post_title}`;
  }, [post.post_title]);

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
    </article>
  );
}
