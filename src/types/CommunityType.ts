export type CommunityRule = {
    rule_title: string;
    rule_desc: string;
};

export type Community = {
    community_id: string;
    community_name: string;
    community_image_url: string;
    community_desc: string;
    /** Not stored by the backend yet; see updateCommunity(). */
    community_rules?: CommunityRule[];
    created_at?: Date;
    modified_at?: Date;
};
