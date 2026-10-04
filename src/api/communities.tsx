import { Community } from '../types/CommunityType';
import { apiFetch } from './client';

/**
 * Fetches all communities from the backend.
 * @returns {Promise<Community[]>} A promise that resolves to an array of Community objects.
 * @throws {ApiError} If the backend responds with an error.
 */
export function getAllCommunities(): Promise<Community[]> {
  return apiFetch<Community[]>('/community/all');
}

/**
 * Fetches a single community by its name.
 * @param {string} name - The community name, as used in the URL.
 * @returns {Promise<Community>} A promise that resolves to the community.
 * @throws {ApiError} With status 404 if the community does not exist.
 */
export async function getCommunity(name: string): Promise<Community> {
  const result = await apiFetch<{ community: Community }>(`/community/${encodeURIComponent(name)}`);
  return result.community;
}
