import { useState, useCallback } from 'react';
import { Community } from '@/types/CommunityType';
import { CreateCommunityPostModal } from '../Modals/CreateCommunityPostModal';

const img_url =
  'https://images.unsplash.com/photo-1682692290240-ac21cb19b0eb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface CommunityHeaderProps {
  community: Community;
}

export function CommunityHeader(CommunityHeaderProps: CommunityHeaderProps) {
  const [activeCommunity] = useState<Community | null>(CommunityHeaderProps.community);
  const [modalState, setModalState] = useState<boolean>(false);

  const handleModalState = useCallback(() => {
    setModalState((prev) => !prev);
  }, []);

  return (
    <div className='my-4'>
      <img
        src={activeCommunity?.community_image_url || img_url}
        alt='Community Header Image'
        className='rounded-md object-cover w-full h-32'
      />
      <div className='flex justify-between items-center my-4'>
        <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl py-2'>
          {activeCommunity?.community_name || 'Community Name'}
        </h1>
        <div className='grid gap-2 grid-flow-col'>
          <button className='px-4 py-2 rounded-full border border-zinc-400 hover:border-zinc-100' onClick={handleModalState}>
            Create Post
          </button>
        </div>
      </div>
      <CreateCommunityPostModal communityId={activeCommunity?.community_id as string} communityName={activeCommunity?.community_name as string} isOpen={modalState} modalClose={handleModalState} />
    </div>
  );
}
