import { Community } from '../types/CommunityType';
import { apiFetch } from './client';
import { cached, invalidateCache } from '@/lib/cache';

const COMMUNITIES_CACHE_KEY = 'communities';
const COMMUNITIES_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches all communities from the backend. The result is cached for 5 minutes
 * (across reloads and tabs); call invalidateCommunities() after changing communities.
 * @returns {Promise<Community[]>} A promise that resolves to an array of Community objects.
 * @throws {ApiError} If the backend responds with an error and nothing is cached.
 */
export function getAllCommunities(): Promise<Community[]> {
  return cached(COMMUNITIES_CACHE_KEY, COMMUNITIES_CACHE_TTL, () => apiFetch<Community[]>('/community/all'));
}

/**
 * Clears the cached community list, so the next getAllCommunities() call fetches it again.
 */
export function invalidateCommunities() {
  invalidateCache(COMMUNITIES_CACHE_KEY);
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
