/**
 * Updates the score of a post by making a POST request to the backend.
 *
 * @param {number} score - The new score to be assigned to the post.
 * @param {string} postId - The unique identifier of the post to be updated.
 * @returns {Promise<void>} A promise that resolves when the request is complete.
 */
export async function updatePostScore(score: number, postId: string) {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/${postId}/${score}`, {
    method: 'POST',
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}
