import { Comment } from '@/types/CommentType';
import { apiFetch } from './client';
import { changeCachedCommentCount } from './posts';

/**
 * Fetches the comments on a post, oldest first.
 * @param {string} postId - The unique identifier of the post.
 * @returns {Promise<Comment[]>} A promise that resolves with the post's comments.
 * @throws {ApiError} With status 404 if the post does not exist.
 */
export function getPostComments(postId: string): Promise<Comment[]> {
  return apiFetch<Comment[]>(`/post/${encodeURIComponent(postId)}/comments`);
}

/**
 * Adds a comment to a post. Requires the user to be logged in;
 * the backend sets the author to the logged-in user.
 * @param {string} postId - The unique identifier of the post.
 * @param {string} content - The comment text.
 * @returns {Promise<Comment>} The created comment.
 * @throws {ApiError} With status 401 if the user is not logged in, 404 if the post doesn't exist.
 */
export async function createComment(postId: string, content: string): Promise<Comment> {
  const result = await apiFetch<{ comment: Comment }>(`/post/${encodeURIComponent(postId)}/comments`, {
    method: 'POST',
    auth: true,
    body: { comment_content: content },
  });
  changeCachedCommentCount(postId, 1);
  return result.comment;
}

/**
 * Edits the text of one of the logged-in user's comments.
 * @param {string} commentId - The unique identifier of the comment.
 * @param {string} content - The new comment text.
 * @returns {Promise<Comment>} The updated comment.
 * @throws {ApiError} With status 401 if the user is not logged in, 403 if the comment
 * belongs to someone else, 404 if it doesn't exist.
 */
export async function updateComment(commentId: string, content: string): Promise<Comment> {
  const result = await apiFetch<{ comment: Comment }>(`/comment/${encodeURIComponent(commentId)}`, {
    method: 'PATCH',
    auth: true,
    body: { comment_content: content },
  });
  return result.comment;
}

/**
 * Deletes a comment. Its author and admins can delete it.
 * @param {string} commentId - The unique identifier of the comment.
 * @param {string} postId - The post the comment is on, to update its cached comment count.
 * @throws {ApiError} With status 401 if the user is not logged in, 403 if the comment
 * belongs to someone else and the user isn't an admin, 404 if it doesn't exist.
 */
export async function deleteComment(commentId: string, postId: string): Promise<void> {
  await apiFetch(`/comment/${encodeURIComponent(commentId)}`, { method: 'DELETE', auth: true });
  changeCachedCommentCount(postId, -1);
}
