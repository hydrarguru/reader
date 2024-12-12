import { NavLink } from 'react-router';
import type { Community } from '../../types/CommunityType';

interface CommunityListProps {
  communities: Community[];
}

export function CommunityList(CommunityListProps: CommunityListProps) {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center self-center'>
      {CommunityListProps.communities.map((community) => (
        <article
          key={community.community_id}
          className='bg-zinc-800 p-4 rounded-lg hover:bg-zinc-900 hover:cursor-pointer flex flex-col items-center'
        >
          <NavLink key={community.community_id} to={`/c/${community.community_name}`} className='text-center'>
            <h2 className='text-xl font-semibold'>{community.community_name}</h2>
            <p className='text-gray-200'>{community.community_desc}</p>
          </NavLink>
        </article>
      ))}
    </section>
  );
}
