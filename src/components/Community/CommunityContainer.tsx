//import { useState } from 'react';
import { Community } from '@/types/CommunityType';
import { CommunityHeader } from './CommunityHeader';
import { CommunityPostContainer } from './CommunityPostContainer';

interface CommunityContainerProps {
  community: Community;
}

function setTitle(title: string) {
  const constructedTitle = `Reader - ${title}`;
  window.document.title = constructedTitle;
}

export function CommunityContainer(activeCommunity: CommunityContainerProps) {
  setTitle(activeCommunity.community.community_name);
  return (
    <div>
      <CommunityHeader community={activeCommunity.community} />
      <CommunityPostContainer community={activeCommunity.community} communityId={activeCommunity.community.community_id} />
    </div>
  );
}
