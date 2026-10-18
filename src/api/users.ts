import { apiFetch } from './client';

export type PublicUser = { user_id: string; username: string };

/** Fields left out stay as they are. Changing the password needs `current_password`. */
export type UserChanges = {
  username?: string;
  email?: string;
  password?: string;
  current_password?: string;
};

/**
 * Changes the logged-in user's username, email or password. The token keeps working after a rename.
 * @param {string} userId - The logged-in user's id.
 * @param {UserChanges} changes - The fields to change.
 * @returns {Promise<PublicUser>} The updated user.
 * @throws {ApiError} With status 400 on invalid fields, 401 if the user is not logged in,
 * 403 if current_password is wrong, 409 if the username or email is taken.
 */
export async function updateUser(userId: string, changes: UserChanges): Promise<PublicUser> {
  const result = await apiFetch<{ user: PublicUser }>(`/user/${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    auth: true,
    body: changes,
  });
  return result.user;
}

/**
 * Deletes a user along with their posts and comments. Users can delete themselves; admins can delete anyone.
 * @param {string} userId - The unique identifier of the user.
 * @throws {ApiError} With status 401 if the user is not logged in, 403 if not allowed, 404 if the user doesn't exist.
 */
export async function deleteUser(userId: string): Promise<void> {
  await apiFetch(`/user/${encodeURIComponent(userId)}`, { method: 'DELETE', auth: true });
}
