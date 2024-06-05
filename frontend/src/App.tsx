import { useEffect, useState } from 'react';
import { Container, Content, Sidenav, Sidebar, Nav } from 'rsuite';
import { Link } from "react-router-dom";

import SiteHeader from './components/SiteHeader/SiteHeader';
import type { Community } from './types/CommunityType';
//import { Post } from './types/PostType';
//import CommunityPost from './components/Posts/Post';

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

async function fetchCommunityPosts(community_id: string) {
  const result = await fetch(`http://localhost:8080/c/${community_id}/posts`)
    .then(res => res.json())
    .catch(err => console.error(err));
    if (result === undefined || result === null) {
      return [];
    }
    else {
      return result;
    }
}

const allCommunities = await getCommunities();
//const communityPosts = await fetchCommunityPosts('2723f65c-010d-4687-87c6-e5f501952c6d');

function App() {
  //const currentCommunity = useLocation().pathname.replace(/\/c\//, '');
  const [posts, setPosts] = useState<[]>([]);

  useEffect(() => {
    fetchCommunityPosts('2723f65c-010d-4687-87c6-e5f501952c6d').then((result) => {
      setPosts(result);
    });
  }, []);

  return (
    <div>
      <SiteHeader />
        <Container>
          <Sidebar style={{width: 250 }}>
            <Sidenav style={{ minHeight: '100vh' }}>
              <Sidenav.Body>
                <Nav>
                  <Nav.Menu title="Communities">
                    {
                      allCommunities.map((community: Community) => (
                        <Nav.Item key={community.community_id}><Link to={'/c/' + community.community_name}>{community.community_name.charAt(0).toUpperCase() + community.community_name.slice(1)}</Link></Nav.Item>
                      ))
                    }
                  </Nav.Menu>
                  <Nav.Menu title="Settings">
                    <Nav.Item>User Settings</Nav.Item>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          <Container>
            <Content>
            </Content>
          </Container>
        </Container>
    </div>
  );
}

export default App
