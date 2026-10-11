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
 * Fetches a single community by its name. Uses the cached community list when the
 * community is in it, and only asks the backend for communities it doesn't know yet.
 * @param {string} name - The community name, as used in the URL.
 * @returns {Promise<Community>} A promise that resolves to the community.
 * @throws {ApiError} With status 404 if the community does not exist.
 */
export async function getCommunity(name: string): Promise<Community> {
  try {
    const community = (await getAllCommunities()).find((c) => c.community_name === name);
    if (community !== undefined) return community;
  } catch {
    /* fall back to asking for this one community */
  }
  const result = await apiFetch<{ community: Community }>(`/community/${encodeURIComponent(name)}`);
  return result.community;
}

export type NewCommunity = Pick<Community, 'community_name' | 'community_desc'> & {
  community_image_url?: string;
};

export type CommunityChanges = Partial<Pick<Community, 'community_desc' | 'community_image_url' | 'community_rules'>>;

/**
 * Creates a community. Requires the user to be logged in.
 * @param {NewCommunity} community - Name (letters and underscores, 1-20 characters), description and optional banner image URL.
 * @throws {ApiError} With status 400 if the name is invalid or already taken, 401 if the user is not logged in.
 */
export async function createCommunity(community: NewCommunity): Promise<void> {
  await apiFetch('/community/create', { method: 'POST', auth: true, body: community });
  invalidateCommunities();
}

/**
 * Updates a community's description, banner image URL and rules. Requires the user to be logged in.
 * The backend has no route for this yet, so it currently fails with a 404.
 * @param {string} communityId - The unique identifier of the community.
 * @param {CommunityChanges} changes - The fields to change.
 * @throws {ApiError} With status 401 if the user is not logged in, 404 if the route or community doesn't exist.
 */
export async function updateCommunity(communityId: string, changes: CommunityChanges): Promise<void> {
  await apiFetch(`/community/${encodeURIComponent(communityId)}`, { method: 'PATCH', auth: true, body: changes });
  invalidateCommunities();
}

/**
 * Deletes a community, together with its posts and their comments. Requires the user to be logged in.
 * @param {string} communityId - The unique identifier of the community.
 * @throws {ApiError} With status 400 if the ID is invalid, 401 if the user is not logged in.
 */
export async function deleteCommunity(communityId: string): Promise<void> {
  await apiFetch(`/community/${encodeURIComponent(communityId)}`, { method: 'DELETE', auth: true });
  invalidateCommunities();
}
