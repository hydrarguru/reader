import { useState } from 'react';
import { Community } from '@/types/CommunityType';
import { CommunityHeader } from './Community/CommunityHeader';
import { CommunityPostContainer } from './Community/CommunityPostContainer';

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
