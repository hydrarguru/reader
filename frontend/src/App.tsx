//import {useState } from 'react';
import { Container, Header, Content} from 'rsuite';
import SiteHeader from './components/SiteHeader/SiteHeader';
import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';

function App() {
  return (
    <div>
    <Container>
      <Header>
        <SiteHeader />
      </Header>
      <Content>
        <LoginModal />
        <RegisterModal />
      </Content>
    </Container>
  </div>
  );
}

export default App
