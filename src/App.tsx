import { useEffect, useState } from 'react';
import type { Community } from './types/CommunityType';
import { NavBar } from './components/Navigation/NavBar';
import { CommunityContainer } from './components/Community/CommunityContainer';
import { useParams } from "react-router";
import { SkeletonContainer } from './components/Skeletons/SkeletonContainer';
import { CommunityList } from './components/Navigation/CommunityList';

async function getCommunities() {
  const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/communities`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (result === undefined || result === null) {
    console.error('Error fetching communities');
    return [];
  } else {
    return result;
  }
}
 
export function App() {
  const [communities, setCommunities] = useState<Community[] | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
  const communityParams = useParams();

  function handleCommunityChange(community: Community | null) {
    setActiveCommunity(community);
    community !== null ? window.history.pushState({}, '', `/${community.community_name}`) : window.history.pushState({}, '', '/');
  }

  useEffect(() => {
    /* This makes it so if a user reloads if the URL params are baseUrl/c/:community it will set the active community */
    /* from the community params */
    if (communityParams.community !== undefined && activeCommunity === null) {
      console.info('Community Param defined, activeCommunity is null, fetching activeCommunity');
      const community = communities?.find((community) => community.community_name === communityParams.community);
      if (community !== undefined) {
        setActiveCommunity(community);
      }
    }

    if (communities === null) {
      getCommunities().then((communities) => {
        if (communities !== undefined) {
          setCommunities(communities);
        }
      });
    }
  }, [communities, activeCommunity, communityParams]);

  return (
    <main className='m-4'>
      <NavBar communities={communities as Community[]} isUserLoggedIn={true} onCommunityChange={handleCommunityChange} />
      {activeCommunity !== null ? (
        <CommunityContainer community={activeCommunity} />
      ) : (
        <div className='my-4'>
          {communities !== null ? (
            <CommunityList communities={communities} />
          ) : (
            <SkeletonContainer skeletonCount={10} />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
