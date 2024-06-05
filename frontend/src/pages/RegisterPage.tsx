import {
    Container,
    Header,
    Content,
    FlexboxGrid,
    Panel
} from 'rsuite';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import RegisterForm from '../components/Forms/RegisterForm';

const RegisterPage = () => {
    return (
    <div>
        <Container>
          <Header>
            <SiteHeader />
          </Header>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <Panel header='Register' bordered>
                <RegisterForm />
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
    </div>
    );
};

export default RegisterPage;