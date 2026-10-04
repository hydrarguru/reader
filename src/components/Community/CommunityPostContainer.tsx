import { Community } from '@/types/CommunityType';
import { CommunityPost } from './CommunityPost';
import { Post } from '@/types/PostType';
import { CommunityInformationPanel } from './CommunityInfoPanel';

interface CommunityPostContainerProps {
  community: Community;
  posts: Post[];
}

export function CommunityPostContainer({ community, posts }: CommunityPostContainerProps) {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-4'>
      <div className='md:w-1/4 lg:hidden'>
        <CommunityInformationPanel community={community} />
      </div>
      <div className='w-full md:w-3/4'>
        {posts.length === 0 && (
          <p className='my-8 text-center text-gray-400'>No posts yet. Be the first to post!</p>
        )}
        {posts.map((post) => (
          <CommunityPost
            key={post.post_id}
            communityName={community.community_name}
            id={post.post_id as string}
            title={post.post_title}
            score={post.post_score}
            author={post.post_author}
            createdAt={post.created_at ? new Date(post.created_at) : new Date()}
          />
        ))}
      </div>
      <div className='hidden lg:block lg:w-1/4'>
        <CommunityInformationPanel community={community} />
      </div>
    </div>
  );
}
