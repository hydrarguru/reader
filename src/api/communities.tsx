import { Community } from '../types/CommunityType';

/**
 * Fetches all communities from the backend.
 * @returns {Promise<Community[]>} A promise that resolves to an array of Community objects.
 * If there is an error during the fetch operation, it logs the error and returns an empty array.
 */
export async function getAllCommunities(): Promise<Community[]> {
  const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/community/all`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (result === undefined || result === null) {
    console.error('Error fetching communities');
    return [];
  } else {
    return result;
  }
}
