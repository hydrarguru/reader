import {
    Container,
    Header,
    Content,
    FlexboxGrid,
    Panel
} from 'rsuite';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => {
    return (
    <div>
        <Container>
          <Header style={{ paddingBottom: '2rem' }}>
            <SiteHeader />
          </Header>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <Panel header='Login' bordered>
                    <LoginForm />
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
    </div>
    );
};

export default LoginPage;