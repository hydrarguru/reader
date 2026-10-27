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
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]'>
      <div className='flex flex-col gap-4'>
        {posts.length === 0 && (
          <p className='rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground'>
            No posts yet. Be the first to start a thread in c/{community.community_name}.
          </p>
        )}
        {posts.map((post) => (
          <CommunityPost
            key={post.post_id}
            communityName={community.community_name}
            id={post.post_id as string}
            title={post.post_title}
            excerpt={post.post_content}
            score={post.post_score}
            commentCount={post.comment_count}
            author={post.post_author}
            createdAt={post.created_at ? new Date(post.created_at) : undefined}
          />
        ))}
      </div>
      <aside className='order-first lg:order-none'>
        <div className='lg:sticky lg:top-24'>
          <CommunityInformationPanel community={community} />
        </div>
      </aside>
    </div>
  );
}
