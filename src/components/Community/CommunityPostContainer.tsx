import { useEffect, useState } from 'react';

import { Community } from '@/types/CommunityType';
import { CommunityPost, CommunityPostSkeleton } from './CommunityPost';
import { Post } from '@/types/PostType';
import { CommunityInformationPanel } from './CommunityInfoPanel';

interface CommunityPostContainerProps {
  community: Community;
  communityId: string;
}

export function CommunityPostContainer(CommunityPostContainerProps: CommunityPostContainerProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function getPosts() {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/c/${CommunityPostContainerProps.communityId}/posts`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      if (result === undefined || result === null) {
        return [];
      } else {
        return result;
      }
    }

    if (posts === null) {
      getPosts().then((posts) => {
        if (posts !== undefined) {
          setPosts(posts);
        }
      });
    }
  }, [CommunityPostContainerProps.communityId, posts]);


  return (
    <div className='flex justify-between gap-4'>
      {
        posts !== null ? (
          <div className='w-3/4'>
            {posts.map((post) => (
              <CommunityPost key={post.post_id} title={post.post_title} content={post.post_content} score={post.post_score} author={post.post_author} />
            ))}
          </div>
        ) : (
          <div className='w-3/4'>
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
            <CommunityPostSkeleton />
          </div>
        )
      }
      <div className='w-1/4'>
        <CommunityInformationPanel community={CommunityPostContainerProps.community} />
      </div>
    </div>
  );
}