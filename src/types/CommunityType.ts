export type CommunityRule = {
    rule_title: string;
    rule_desc: string;
};

export type Community = {
    community_id: string;
    community_name: string;
    community_image_url: string;
    community_desc: string;
    /** Missing when the backend predates community rules. */
    community_rules?: CommunityRule[];
    created_at?: Date;
    modified_at?: Date;
};
