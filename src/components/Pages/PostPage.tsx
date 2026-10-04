import { useEffect } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import type { PostLoaderData } from '@/router';
import { ButtonGroup } from '../Community/ButtonGroup';
import { CommunityPostDate } from '../Community/CommunityPost';

export function PostPage() {
  const { post } = useLoaderData() as PostLoaderData;
  const { communityName } = useParams();

  useEffect(() => {
    document.title = `Reader - ${post.post_title}`;
  }, [post.post_title]);

  return (
    <article className='my-4 max-w-3xl mx-auto'>
      <Link to={`/c/${communityName}`} className='text-sm text-violet-600 hover:underline'>
        ← Back to {communityName}
      </Link>
      <div className='flex items-center space-x-1 mt-4 mb-2 text-sm text-gray-400'>
        <span>{post.post_author}</span>
        <span>•</span>
        <CommunityPostDate createdAt={post.created_at ? new Date(post.created_at) : undefined} />
      </div>
      <h1 className='text-3xl font-extrabold tracking-tight mb-4'>{post.post_title}</h1>
      {post.post_image_url && (
        <img src={post.post_image_url} alt='' className='rounded-md mb-4 max-h-[480px] object-contain' />
      )}
      <p className='whitespace-pre-wrap mb-4'>{post.post_content}</p>
      <ButtonGroup key={post.post_id} id={post.post_id as string} score={post.post_score} />
    </article>
  );
}
