import { useEffect, useState } from 'react';
import type { Community } from './types/CommunityType';
import { NavBar } from './components/Navigation/NavBar';
import { CommunityContainer } from './components/Community/CommunityContainer';
import { NavLink, useParams } from "react-router";
import { SkeletonContainer } from './components/Skeletons/SkeletonContainer';

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
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {communities.map((community) => (
                <NavLink key={community.community_id} to={`/c/${community.community_name}`} className='bg-zinc-800 p-4 rounded-lg hover:bg-zinc-900 hover:cursor-pointer' onClick={() => handleCommunityChange(community)}>
                  <h2 className='text-xl font-semibold'>{community.community_name}</h2>
                  <p className='text-gray-200'>{community.community_desc}</p>
                </NavLink>
              ))}
            </div>
          ) : (
            <SkeletonContainer skeletonCount={10} />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
