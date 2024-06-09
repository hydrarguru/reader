import { Heading, Text } from 'rsuite';

const CommunityHeaderInfo = (community: {communityName: string, communityDesc: string, communityImageUrl: string}) => {
    return (
        <div style={{
            padding: '2rem',
            backgroundImage: `url(${community.communityImageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div style={{
                padding: '2rem',
                margin: 'auto',
                textShadow: '2px 2px 4px #000000',
            }}>
                <Heading level={1}>{community.communityName}</Heading>
                <Text>{community.communityDesc}</Text>
            </div>
        </div>
    );
};

const CommunityHeaderNoInfo = () => {
    return (
        <div style={{
            padding: '2rem',
            backgroundImage: `url('https://images.unsplash.com/photo-1709274296402-f6e96caaa1eb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div style={{
                padding: '2rem',
                margin: 'auto',
                textShadow: '2px 2px 4px #000000',
            }}>
                <Heading level={1}>Placeholder Community Name</Heading>
                <Text>Placeholder Community Description.</Text>
            </div>
        </div>
    );
};

export { CommunityHeaderInfo, CommunityHeaderNoInfo };