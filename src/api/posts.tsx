import { Post } from "@/types/PostType";
import { apiFetch } from "./client";
import { cached, invalidateCache, peekCache, updateCache } from "@/lib/cache";

// Posts change more often than communities, so they are cached briefly and only in memory:
// moving around the app reuses them, but a reload always shows fresh posts.
const POSTS_CACHE_PREFIX = 'posts:';
const POSTS_CACHE_TTL = 2 * 60 * 1000; // 2 minutes
const POSTS_CACHE_OPTIONS = { persist: false };

function postsCacheKey(community_id: string): string {
  return POSTS_CACHE_PREFIX + community_id;
}

/**
 * Updates the score of a post. Requires the user to be logged in.
 * @param {number} score - The new score to be assigned to the post.
 * @param {string} postId - The unique identifier of the post to be updated.
 * @throws {ApiError} With status 401 if the user is not logged in.
 */
export async function updatePostScore(score: number, postId: string): Promise<void> {
  await apiFetch(`/post/${postId}/${score}`, { method: 'POST', auth: true });
  // Keep cached post lists in step, so going back to the community shows the new score.
  updateCache<Post[]>(
    POSTS_CACHE_PREFIX,
    (posts) => posts.map((post) => (post.post_id === postId ? { ...post, post_score: score } : post)),
    POSTS_CACHE_OPTIONS
  );
}

/**
 * Fetches all posts from a community. The result is cached in memory for 2 minutes.
 * @param {string} community_id - The unique identifier of the community.
 * @returns {Promise<Post[]>} A promise that resolves with the list of posts.
 */
export function getCommunityPosts(community_id: string): Promise<Post[]> {
  return cached(
    postsCacheKey(community_id),
    POSTS_CACHE_TTL,
    () => apiFetch<Post[]>(`/community/${community_id}/post/all`),
    POSTS_CACHE_OPTIONS
  );
}

/**
 * Fetches a single post. Uses the community's cached post list when it has the post,
 * e.g. when opening a post from the community page.
 * @param {string} postId - The unique identifier of the post.
 * @param {string} community_id - The community the post belongs to, to look in its cached posts.
 * @returns {Promise<Post>} A promise that resolves with the post.
 * @throws {ApiError} With status 404 if the post does not exist.
 */
export async function getPost(postId: string, community_id?: string): Promise<Post> {
  if (community_id !== undefined) {
    const cachedPost = peekCache<Post[]>(postsCacheKey(community_id), POSTS_CACHE_TTL, POSTS_CACHE_OPTIONS)
      ?.find((post) => post.post_id === postId);
    if (cachedPost !== undefined) return cachedPost;
  }
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
  invalidateCache(postsCacheKey(community_id));
}
