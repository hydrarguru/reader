import type { Post } from '../types/PostType'
import { insertOne, deleteOne, checkIfExists } from '../db'

export async function createPost(newPost: Post) {
    await insertOne('Posts', newPost);
    console.log('Post created');
    console.table(newPost);    
}

export async function deletePost(postId: string) {
    if (await checkIfExists('Posts', 'post_id', postId)) {
        await deleteOne('Posts', 'post_id', postId);
        console.log('Post deleted');
    }
    else {
        console.error('Could not delete post.');
    }
}