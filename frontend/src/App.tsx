//import { useEffect, useState } from 'react';
import { Container, Content, Sidenav, Sidebar, Nav } from 'rsuite';
import { Link } from "react-router-dom";

import SiteHeader from './components/SiteHeader/SiteHeader';
import type { Community } from './types/CommunityType';
//import { Post } from './types/PostType';
import CommunityPost from './components/Posts/Post';

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

const jsonData = {
  "posts": [
      {
        "post_id": "283dcadb-4cd7-4166-b538-5935b5c5693d",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 5",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:10.000Z",
        "modified_at": "2024-06-05T00:48:10.000Z"
      },
      {
        "post_id": "320b5993-92cb-419e-8439-41a9a98612b3",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 7",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:16.000Z",
        "modified_at": "2024-06-05T00:48:16.000Z"
      },
      {
        "post_id": "9a29d2c1-f909-4d6a-92e6-187af6042340",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 4",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:07.000Z",
        "modified_at": "2024-06-05T00:48:07.000Z"
      },
      {
        "post_id": "afad4e8f-17ef-488f-af13-3f7698565b64",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 10",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:30.000Z",
        "modified_at": "2024-06-05T00:48:30.000Z"
      },
      {
        "post_id": "bf71ec47-455c-44d2-a3f9-67ad4084712e",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 3",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:04.000Z",
        "modified_at": "2024-06-05T00:48:04.000Z"
      },
      {
        "post_id": "c660de5c-1ad0-464e-aaa8-5efd8b44e367",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 9",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:27.000Z",
        "modified_at": "2024-06-05T00:48:27.000Z"
      },
      {
        "post_id": "cc561695-70ab-4da8-9b02-1edab9760b7c",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 8",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:21.000Z",
        "modified_at": "2024-06-05T00:48:21.000Z"
      },
      {
        "post_id": "dd2de69b-87b0-4c7c-b4a0-f172eb1cf0b8",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 1",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:47:49.000Z",
        "modified_at": "2024-06-05T00:47:49.000Z"
      },
      {
        "post_id": "f0f534db-fd3d-42d0-8c8a-bf63fcddd0df",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 2",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:00.000Z",
        "modified_at": "2024-06-05T00:48:00.000Z"
      },
      {
        "post_id": "f7e77997-eb50-42b7-8a2d-f0fadbed9900",
        "community_id": "2723f65c-010d-4687-87c6-e5f501952c6d",
        "post_author": "02962896-582f-4865-8439-5dea7381cdde",
        "post_title": "Gaming Post 6",
        "post_image_url": "",
        "post_content": "This post was generated by the backend.",
        "post_score": 0,
        "created_at": "2024-06-05T00:48:13.000Z",
        "modified_at": "2024-06-05T00:48:13.000Z"
      }
    ]
  }

function App() {
  //const currentCommunity = useLocation().pathname.replace(/\/c\//, '');
  //const [posts, setPosts] = useState<[]>([]);
  //useEffect(() => {
  //  fetchCommunityPosts('2723f65c-010d-4687-87c6-e5f501952c6d').then((result) => {
  //    setPosts(result);
  //  });
  //}, []);

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
              {
                jsonData.posts.map((post: any) => (
                  <div key={post.post_id}>
                    <CommunityPost title={post.post_title} content={post.post_content} score={post.post_score} />
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
