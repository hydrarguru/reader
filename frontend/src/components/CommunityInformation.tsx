import { useState } from 'react';
import { Heading, Text } from 'rsuite';

const CommunityInformation = (community: {communityName: string, communityDesc: string, communityImageUrl: string}) => {
    const [communityInfo, setCommunityInfo] = useState(community);

    return (
        <div style={{
            padding: '4rem',
            backgroundImage: `url(${communityInfo.communityImageUrl})`,
            backgroundSize: 'cover',
        }}>
            <div style={{
                padding: '2rem',
                margin: 'auto',
                textShadow: '2px 2px 4px #000000',
            }}>
                <Heading level={1}>{communityInfo.communityName}</Heading>
                <Text>{communityInfo.communityDesc}</Text>
            </div>
        </div>
    );
};

export default CommunityInformation;