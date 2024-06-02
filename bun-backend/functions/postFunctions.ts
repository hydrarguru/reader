import type { Post } from '../types/PostType'
import { insertOne, deleteOne, checkIfExists, updateOne } from '../db'

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

export async function editPost(postId: string, editedPost: Post) {
    if (await checkIfExists('Posts', 'post_id', postId)) {
        await updateOne('Posts', 'post_id', postId, 'post_title', editedPost.post_title);
        console.log('Post edited');
    }
    else {
        console.error('Could not edit post.');
    }
}