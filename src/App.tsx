import { useEffect, useState } from 'react';
import type { Community } from './types/CommunityType';
import type { Post } from './types/PostType';

//import SiteHeader from './components/SiteHeader/SiteHeader';
//import CommunityPost from './components/Posts/Post';
//import { CommunityHeaderInfo, CommunityHeaderNoInfo } from './components/CommunityInformation';
//import CreatePost from './components/Modals/CreatePost';
//import CreateCommunity from './components/Modals/CreateCommunity';

async function getCommunities() {
  const result = await fetch(`${import.meta.env.VITE_READER_BACKEND_URL}/community`)
    .then(res => res.json())
    .catch(err => console.error(err));
    if (result === undefined || result === null) {
      return [];
    }
    else {
      return result;
    }
}

async function getCommunityPosts(community_id: string) {
  const data = await fetch(`${import.meta.env.VITE_READER_BACKEND_URL}/c/${community_id}/posts`)
  .then(res => res.json())
  .catch(err => console.error(err));
  if (data === undefined || data === null) {
    return;
  }
  else {
    return data as Post[];
  }
}

async function getPosts() {
  const data = await fetch(`${import.meta.env.VITE_READER_BACKEND_URL}/posts`)
  .then(res => res.json())
  .catch(err => console.error(err));
  if (data === undefined || data === null) {
    return;
  }
  else {
    return data as Post[];
  }
}

import { Button } from "@/components/ui/button"

function Shadcn() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}


function App() {
  const [communities, setCommunities] = useState<Community[] | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
  const [communityPosts, setCommunityPosts] = useState<Post[] | null>(null);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (communities === null) {
      getCommunities()
      .then((communities) => {
        if (communities !== undefined) {
          setCommunities(communities);
        }
      });
    }

  }, [communities]);

  useEffect(() => {
    getPosts()
    .then((posts) => {
      if (posts !== undefined) {
        setAllPosts(posts);
      }
    });
  }, [allPosts]);

  useEffect(() => {
    if (activeCommunity !== null) {
      getCommunityPosts(activeCommunity.community_id)
      .then((posts) => {
        if (posts !== undefined) {
          setCommunityPosts(posts);
        }
      });
    }
  }, [activeCommunity]);

  return (
    <div>
      <h1>Reader</h1>
      <Shadcn />
    </div>
  );
}

export default App
