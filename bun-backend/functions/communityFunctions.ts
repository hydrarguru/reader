import type { Community } from '../types/CommunityType'
import { insertOne, checkForDuplicate, deleteOne } from '../db'

export async function createCommunity(newCommunity: Community) {
    if (await checkForDuplicate('Communities', 'community_name', newCommunity.community_name)) {
        console.error('Community name already exists');
    }
    else {
        if(newCommunity.community_id === '') {
            newCommunity.community_id = crypto.randomUUID();
            await createCommunity(newCommunity);
            console.log('Community created, id supplied by backend.');
        }


        await insertOne('Communities', newCommunity);
        console.log('Community created, id supplied by user');
        console.table(newCommunity);
    }    
}

export async function deleteCommunity(community_name: string) {
    await deleteOne('Communities', 'community_name', community_name);
    console.log('Community deleted');
}