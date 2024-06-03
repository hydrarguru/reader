import {useState } from 'react';
import { Container, Header, Content} from 'rsuite';
import SiteHeader from './components/SiteHeader/SiteHeader';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <div>
    <Container>
      <Header>
        <SiteHeader />
      </Header>
      <Content>
        <LoginModal />
      </Content>
    </Container>
  </div>
  );
}

export default App
