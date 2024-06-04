import { useLocation } from "react-router-dom";


const CommunityPage = () => {
    const communityName = useLocation().pathname.replace(/\/c\//, '');

    return (
        <div>
            <h1>Community Page</h1>
            <p>Community Name: {communityName}</p>
        </div>
    );
};

export default CommunityPage;