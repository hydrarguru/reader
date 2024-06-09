import { useEffect, useState } from 'react';
import { Container, Content, Sidenav, Sidebar, Nav } from 'rsuite';
import { Placeholder } from 'rsuite';

import type { Community } from './types/CommunityType';
import type { Post } from './types/PostType';

import SiteHeader from './components/SiteHeader/SiteHeader';
import CommunityPost from './components/Posts/Post';
import { CommunityHeaderInfo, CommunityHeaderNoInfo } from './components/CommunityInformation';
import CreatePost from './components/Modals/CreatePost';

async function getCommunities() {
  const result = await fetch('http://localhost:8080/community')
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
  const data = await fetch(`http://localhost:8080/c/${community_id}/posts`)
  .then(res => res.json())
  .catch(err => console.error(err));
  if (data === undefined || data === null) {
    return;
  }
  else {
    return data as Post[];
  }
}

const allCommunities = await getCommunities();

function App() {
  const [communityPosts, setCommunityPosts] = useState<Post[] | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
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
      <SiteHeader />
        <Container>
          <Sidebar>
            <Sidenav style={{ minHeight: '100vh', display: 'flex' }}>
              <Sidenav.Body>
                <Nav>
                  <Nav.Menu title="Communities">
                    {
                      allCommunities.map((community: Community) => (
                          <Nav.Item key={community.community_id} 
                            onClick={() => setActiveCommunity(
                              {
                                community_id: community.community_id,
                                community_name: community.community_name,
                                community_desc: community.community_desc,
                                community_image_url: community.community_image_url
                              }
                            )}>
                            {community.community_name.charAt(0).toUpperCase() + community.community_name.slice(1)}
                          </Nav.Item>
                      ))
                    }
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          <Container>
            <Content>
              {
                activeCommunity !== null ?
                <div>
                  <CommunityHeaderInfo 
                  communityName={activeCommunity.community_name}
                  communityDesc={activeCommunity.community_desc}
                  communityImageUrl={activeCommunity.community_image_url}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem' }}>
                    <CreatePost />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0.5rem' }}>
                    {
                      communityPosts?.map((post: Post) => (
                        <div key={post.post_id}>
                          <CommunityPost 
                            title={post.post_title}
                            content={post.post_content}
                            score={post.post_score}
                            author={post.post_author}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
                :
                <div>
                  <CommunityHeaderNoInfo />
                  <div style={{ padding: '1rem' }}>
                    <Placeholder.Paragraph rows={16} />
                  </div>
                </div>
              }
            </Content>
          </Container>
        </Container>
    </div>
  );
}

export default App
