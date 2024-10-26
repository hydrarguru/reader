//import { useState } from 'react';
import { Community } from '@/types/CommunityType';
import { CommunityHeader } from './CommunityHeader';
import { CommunityPostContainer } from './CommunityPostContainer';

interface CommunityContainerProps {
  community: Community;
}

export function CommunityContainer(activeCommunity: CommunityContainerProps) {
  return (
    <div>
      <CommunityHeader community={activeCommunity.community} />
      <CommunityPostContainer community={activeCommunity.community} />
    </div>
  );
}
