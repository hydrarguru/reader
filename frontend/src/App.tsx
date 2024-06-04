import { Container, Content, Sidenav, Sidebar, Nav } from 'rsuite';
import SiteHeader from './components/SiteHeader/SiteHeader';
import PostsContainer from './components/Posts/PostsContainer';
import type { Community } from './types/CommunityType';

const allCommunities = await fetch('http://localhost:8080/community').then(res => res.json());

function App() {
  return (
    <div>
      <SiteHeader />
        <Container>
          <Sidebar style={{
            width: 250,
            minHeight: '100vh',
          }}
          >
            <Sidenav>
              <Sidenav.Body>
                <Nav>
                  <Nav.Menu title="Communities">
                    {
                      allCommunities.map((community: Community) => (
                        <Nav.Item key={community.community_id}>{community.community_name.charAt(0).toUpperCase() + community.community_name.slice(1)}</Nav.Item>
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
            <Content style={{
              padding: 10,
              minHeight: '100vh',
            }}
            >
              <PostsContainer />
            </Content>
          </Container>
        </Container>
    </div>
  );
}

export default App
