import { Community } from "./models/Community";
import { Post } from "./models/Post";
import { User } from "./models/User";

export function createTables(): void  {
    User.sync({ force: true });
    Post.sync({ force: true });
    Community.sync({ force: true });
};