//import { useEffect, useState } from 'react';
import { Container, Content, Sidenav, Sidebar, Nav } from 'rsuite';
import { Link, useLocation } from "react-router-dom";

import SiteHeader from './components/SiteHeader/SiteHeader';
import type { Community } from './types/CommunityType';
import CommunityPost from './components/Posts/Post';
import CommunityInformation from './components/CommunityInformation';
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
const communityPosts = await getCommunityPosts('2723f65c-010d-4687-87c6-e5f501952c6d');

function App() {
  //const currentCommunity = useLocation().pathname.replace(/\/c\//, '');

  return (
    <div>
      <SiteHeader />
        <Container>
          <Sidebar style={{width: 250 }}>
            <Sidenav style={{ minHeight: '100vh', display: 'flex' }}>
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
              <CommunityInformation communityName='All' communityDesc='All' communityImageUrl='https://images.unsplash.com/photo-1715174539960-6b2f5f279ee5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem' }}>
                  <CreatePost />
                </div>
                {
                  communityPosts?.map((post: any) => (
                    <div style={{ margin: '1rem' }} key={post.post_id}>
                      <CommunityPost
                        title={post.post_title}
                        author={post.post_author}
                        content={post.post_content}
                        created={post.created_at}
                        score={post.post_score} />
                    </div>
                  ))
                }
            </Content>
          </Container>
        </Container>
    </div>
  );
}

export default App
