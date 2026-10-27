import { useState } from 'react';
import { useLocation, useNavigate, useRevalidator } from 'react-router';
import { Community } from '@/types/CommunityType';
import { ApiError } from '@/api/client';
import { createPost } from '@/api/posts';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';
import { useSessionExpired } from '../Auth/useSessionExpired';
import { Button } from '../ui/button';
import { PostFormDialog, PostFormValues } from '../Modals/PostFormDialog';
interface CommunityHeaderProps {
  community: Community;
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const [creating, setCreating] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const { revalidate } = useRevalidator();
  const sessionExpired = useSessionExpired();
  const navigate = useNavigate();
  const location = useLocation();

  function handleCreatePost() {
    if (session === null) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    setCreating(true);
  }

  async function onCreate(values: PostFormValues) {
    try {
      await createPost(community.community_id, values.post_title, values.post_content, values.post_image_url);
      setCreating(false);
      toast({ title: 'Post created', duration: 1250 });
      // Re-run the route loaders so the new post shows up.
      revalidate();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setCreating(false);
        sessionExpired('post');
        return;
      }
      toast({
        title: 'Error',
        description: `Error creating post: ${err instanceof Error ? err.message : 'unknown error'}`,
        duration: 2000,
      });
    }
  }

  return (
    <header className='mb-8 overflow-hidden rounded-xl border border-border bg-card'>
      <div className='h-32 bg-sage sm:h-40'>
        {community.community_image_url && (
          <img src={community.community_image_url} alt='' className='h-full w-full object-cover' />
        )}
      </div>
      <div className='flex flex-wrap items-end justify-between gap-4 px-6 pb-6'>
        <div className='flex items-end gap-4'>
          <div
            aria-hidden
            className='relative -mt-9 grid h-[72px] w-[72px] flex-none place-items-center rounded-full border-4 border-card bg-brand font-display text-4xl font-medium leading-none text-brand-on'
          >
            {community.community_name.charAt(0).toUpperCase()}
          </div>
          <div className='pt-4'>
            <h1 className='font-display text-4xl font-medium tracking-tight'>
              <span className='font-normal text-muted-foreground'>c/</span>
              {community.community_name}
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>{community.community_desc}</p>
          </div>
        </div>
        <Button onClick={handleCreatePost}>Create post</Button>
      </div>
      <PostFormDialog post={null} open={creating} onOpenChange={setCreating} onSubmit={onCreate} />
    </header>
  );
}
