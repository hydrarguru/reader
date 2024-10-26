import { Community } from '@/types/CommunityType';
import { CommunityPost } from './CommunityPost';
import { CommunityInformationPanel } from './CommunityInfoPanel';

interface CommunityPostContainerProps {
  community: Community;
}

export function CommunityPostContainer(CommunityPostContainerProps: CommunityPostContainerProps) {
  return (
    <div className='flex justify-between gap-4'>
      <div className='w-3/4'>
        <CommunityPost id='1' title='Post Title' content='Post Content' score={100} author='Author' />
        <CommunityPost id='1' title='Post Title' content='Post Content' score={100} author='Author' />
        <CommunityPost id='1' title='Post Title' content='Post Content' score={100} author='Author' />
        <CommunityPost id='1' title='Post Title' content='Post Content' score={100} author='Author' />
        <CommunityPost id='1' title='Post Title' content='Post Content' score={100} author='Author' />
      </div>
      <div className='w-1/4'>
        <CommunityInformationPanel community={CommunityPostContainerProps.community} />
      </div>
    </div>
  );
}