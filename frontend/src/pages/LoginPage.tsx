import {
    Container,
    Header,
    Content,
    Footer,
    FlexboxGrid,
    Panel
} from 'rsuite';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import LoginForm from '../components/Forms/RegisterForm';

const LoginPage = () => {
    return (
    <div>
        <Container>
          <Header>
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
          <Footer>Footer</Footer>
        </Container>
    </div>
    );
};

export default LoginPage;