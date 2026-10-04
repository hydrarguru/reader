import { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import type { CommunityLoaderData } from '@/router';
import { CommunityHeader } from '../Community/CommunityHeader';
import { CommunityPostContainer } from '../Community/CommunityPostContainer';

export function CommunityPage() {
  const { community, posts } = useLoaderData() as CommunityLoaderData;

  useEffect(() => {
    document.title = `Reader - ${community.community_name}`;
  }, [community.community_name]);

  return (
    <div>
      <CommunityHeader community={community} />
      <CommunityPostContainer community={community} posts={posts} />
    </div>
  );
}
