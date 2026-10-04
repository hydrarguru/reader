import { Post } from "@/types/PostType";
import { apiFetch } from "./client";

/**
 * Updates the score of a post. Requires the user to be logged in.
 * @param {number} score - The new score to be assigned to the post.
 * @param {string} postId - The unique identifier of the post to be updated.
 * @throws {ApiError} With status 401 if the user is not logged in.
 */
export async function updatePostScore(score: number, postId: string): Promise<void> {
  await apiFetch(`/post/${postId}/${score}`, { method: 'POST', auth: true });
}

/**
 * Fetches all posts from a community.
 * @param {string} community_id - The unique identifier of the community.
 * @returns {Promise<Post[]>} A promise that resolves with the list of posts.
 */
export function getCommunityPosts(community_id: string): Promise<Post[]> {
  return apiFetch<Post[]>(`/community/${community_id}/post/all`);
}

/**
 * Fetches a single post.
 * @param {string} postId - The unique identifier of the post.
 * @returns {Promise<Post>} A promise that resolves with the post.
 * @throws {ApiError} With status 404 if the post does not exist.
 */
export async function getPost(postId: string): Promise<Post> {
  const result = await apiFetch<{ post: Post }>(`/post/${encodeURIComponent(postId)}`);
  return result.post;
}

/**
 * Creates a new post in a community. Requires the user to be logged in;
 * the backend sets the author to the logged-in user.
 *
 * @param {string} community_id - The unique identifier of the community where the post will be created.
 * @param {string} title - The title of the post.
 * @param {string} content - The content of the post.
 * @param {string} image_url - Optional URL of an image associated with the post.
 * @throws {ApiError} With status 401 if the user is not logged in.
 */
export async function createPost(community_id: string, title: string, content: string, image_url?: string): Promise<void> {
  await apiFetch('/post/create', {
    method: 'POST',
    auth: true,
    body: {
      community_id: community_id,
      post_title: title,
      post_content: content,
      ...(image_url ? { post_image_url: image_url } : {}),
    },
  });
}
