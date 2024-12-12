export type User = {
    user_id?: string;
    username: string;
    password: string;
    email: string;
    created_at?: string;
    modified_at?: string;
};

export type UserRole = {
    role_name: string;
    role_color: string;
}