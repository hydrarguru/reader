import { NavLink } from 'react-router';
import type { Community } from '../../types/CommunityType';

interface CommunityListProps {
  communities: Community[];
}

export function CommunityList(CommunityListProps: CommunityListProps) {
  return (
    <section className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center self-center first:mt-4'>
      {CommunityListProps.communities.map((community) => (
        <article
          key={community.community_id}
          className='p-4 rounded-md border flex flex-col items-center bg-neutral-50 hover:bg-neutral-100 border-violet-600 dark:bg-zinc-900 dark:border-zinc-700  dark:hover:bg-zinc-800 hover:cursor-pointer hover:transition-all ease-in-out duration-200'
        >
          <NavLink key={community.community_id} to={`/c/${community.community_name}`} className='text-center'>
            <h2 className='text-xl font-semibold max-sm:text-3xl overflow-y-hidden max-sm:p-4'>{community.community_name}</h2>
            <p className='italic dark:text- max-sm:hidden'>{community.community_desc}</p>
          </NavLink>
        </article>
      ))}
    </section>
  );
}
