import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Community } from '@/types/CommunityType';
import { useAuth } from '../Auth/AuthProvider';
import { Button } from '../ui/button';
import { CreateCommunityPostModal } from '../Modals/CreateCommunityPostModal';
interface CommunityHeaderProps {
  community: Community;
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const [modalState, setModalState] = useState<boolean>(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalState = useCallback(() => {
    setModalState((prev) => !prev);
  }, []);

  function handleCreatePost() {
    if (session === null) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    handleModalState();
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
      <CreateCommunityPostModal
        key={community.community_id}
        communityId={community.community_id}
        communityName={community.community_name}
        isOpen={modalState}
        modalClose={handleModalState}
      />
    </header>
  );
}
