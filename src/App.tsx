import { useEffect, useState } from "react";
import { Container, Content, Sidenav, Sidebar, Nav, Loader, Placeholder } from "rsuite";
import type { Community } from "./types/CommunityType";
import type { Post } from "./types/PostType";

import SiteHeader from "./components/SiteHeader/SiteHeader";
import CommunityPost from "./components/Posts/Post";
import {
  CommunityHeaderInfo,
  CommunityHeaderNoInfo,
} from "./components/CommunityInformation";
import CreatePost from "./components/Modals/CreatePost";
import CreateCommunity from "./components/Modals/CreateCommunity";

async function getCommunities() {
  const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/communities`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (result === undefined || result === null) {
    return [];
  } else {
    return result;
  }
}

async function fetchPosts(): Promise<Post[]> {
  const posts = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
  if (posts.ok) {
    return posts.json();
  } else {
    throw new Error("Failed to fetch posts");
  }
}

//const fetchedPosts = await fetchPosts();

export function AppSkeleton() {
  return (
    <div>
      <SiteHeader />
      <Container>
        <Sidebar>
          <Sidenav style={{ minHeight: "100vh", display: "flex" }}>
            <Sidenav.Body>
              <Nav>
                <Nav.Item><Placeholder.Paragraph /></Nav.Item>
                <Nav.Item><Placeholder.Paragraph /></Nav.Item>
                <Nav.Item><Placeholder.Paragraph /></Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
        <Container>
          <Content>
            <CommunityHeaderNoInfo
              communityHeader="All Posts Index"
              communityDesc="This is where you will find all posts."
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
              }}
            >
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "0.5rem",
              }}
            >
            <Placeholder.Paragraph graph="square" active />
            <Placeholder.Paragraph graph="square" active />
            <Placeholder.Paragraph graph="square" active />
            </div>
          </Content>
        </Container>
      </Container>
    </div>
  );
}

function App() {
  const [communities, setCommunities] = useState<Community[] | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(
    null
  );
  const [communityPosts, setCommunityPosts] = useState<Post[] | null>(null);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (communities === null) {
      getCommunities().then((communities) => {
        if (communities !== undefined) {
          setCommunities(communities);
        }
      });
    }
  }, [communities]);

  useEffect(() => {
    if (allPosts === null) {
      fetchPosts().then((posts) => {
        setAllPosts(posts);
      });
    }
  }, [allPosts]);


  function setActiveCommunityAndPosts(community: Community) {
    setActiveCommunity(community);
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/c/${community.community_id}/posts`
    )
      .then((res) => res.json())
      .then((posts) => setCommunityPosts(posts))
      .catch((err) => console.error(err));
  }

  return (
    <>
      {allPosts === null ? (
        <AppSkeleton />
      ) : (
        <div>
          <SiteHeader />
          <Container>
            <Sidebar>
              <Sidenav style={{ minHeight: "100vh", display: "flex" }}>
                <Sidenav.Body>
                  <Nav activeKey={communities}
                    style={{ minHeight: "100vh" }}
                    >
                    {communities?.map((community: Community) => (
                      <Nav.Item
                        key={community.community_id}
                        onClick={() => setActiveCommunityAndPosts(community)}
                      >
                        {community.community_name.charAt(0).toUpperCase() +
                          community.community_name.slice(1)}
                      </Nav.Item>
                    ))}
                  </Nav>
                </Sidenav.Body>
              </Sidenav>
            </Sidebar>
            <Container>
              <Content>
                {activeCommunity !== null ? (
                  <div>
                    <CommunityHeaderInfo
                      communityName={activeCommunity.community_name}
                      communityDesc={activeCommunity.community_desc}
                      communityImageUrl={activeCommunity.community_image_url}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <CreatePost communityArray={communities as Community[]} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        margin: "0.5rem",
                      }}
                    >
                      {communityPosts?.map((post: Post) => (
                        <div key={post.post_id}>
                          <CommunityPost
                            id={String(post.post_id)}
                            title={post.post_title}
                            content={post.post_content}
                            score={post.post_score}
                            author={post.post_author}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  allPosts !== null && (
                    <div>
                      <CommunityHeaderNoInfo
                        communityHeader="All Posts Index"
                        communityDesc="This is where you will find all posts."
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                        }}
                      >
                        <CreateCommunity />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          margin: "0.5rem",
                        }}
                      >
                        {allPosts.map((post: Post) => (
                          <div key={post.post_id}>
                            <CommunityPost
                              id={String(post.post_id)}
                              title={post.post_title}
                              content={post.post_content}
                              score={post.post_score}
                              author={post.post_author}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </Content>
            </Container>
          </Container>
        </div>
      )}
    </>
  );
}

export default App;
