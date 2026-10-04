import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Community } from '@/types/CommunityType';
import { useAuth } from '../Auth/AuthProvider';
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
    <div className='my-4'>
      <img
        src={community.community_image_url}
        alt='Community Header Image'
        className='rounded-md object-cover w-full h-32'
      />
      <div className='flex justify-between items-center my-4'>
        <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl py-2'>
          {community.community_name}
        </h1>
        <div className='grid gap-2 grid-flow-col'>
          <button className='px-4 py-2 rounded-full border border-zinc-400 hover:border-zinc-100' onClick={handleCreatePost}>
            Create Post
          </button>
        </div>
      </div>
      <CreateCommunityPostModal
        key={community.community_id}
        communityId={community.community_id}
        communityName={community.community_name}
        isOpen={modalState}
        modalClose={handleModalState}
      />
    </div>
  );
}
