import { useLocation } from "react-router-dom";
import { Container, Header, Content} from 'rsuite';
import SiteHeader from '../components/SiteHeader/SiteHeader';


const CommunityPage = () => {
    const communityName = useLocation().pathname.replace(/\/c\//, '');

    return (
        <Container>
            <Header>
                <SiteHeader />
            </Header>
            <Content>
                <h1>{communityName}</h1>
            </Content>
        </Container>
    );
};

export default CommunityPage;