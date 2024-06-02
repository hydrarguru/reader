import type { Community } from '../types/CommunityType'
import { insertOne, checkForDuplicate } from '../db'

export async function createCommunity(newCommunity: Community) {
    if (await checkForDuplicate('Communities', 'community_name', newCommunity.community_name)) {
        console.error('Community name already exists');
    }
    else {
        await insertOne('Communities', newCommunity);
        console.log('Community created');
        console.table(newCommunity);
    }    
}