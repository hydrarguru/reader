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

/**
 * Creates a new post in a community by making a POST request to the backend.
 *
 * @param {string} community_id - The unique identifier of the community where the post will be created.
 * @param {string} title - The title of the post.
 * @param {string} author - The user id of the author.
 * @param {string} image_url - The URL of the image associated with the post.
 * @param {string} content - The content of the post.
 * @returns {Promise<number>} A promise that resolves with the status code of the request.
 */
export async function createPost(community_id: string, title: string, author: string, image_url: string, content: string): Promise<number> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      community_id: community_id,
      post_author: author,
      post_title: title,
      post_image_url: image_url,
      post_content: content,
    })
  });

  if (!response.ok) {
    console.error('Failed to create post:', response.statusText);
    return 500;
  }

  const data = await response.json();
  console.log(data);
  return response.status;
}
