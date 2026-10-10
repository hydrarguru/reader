import { Link } from 'react-router';
import type { Community } from '../../types/CommunityType';

interface CommunityListProps {
  communities: Community[];
}

export function CommunityList({ communities }: CommunityListProps) {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {communities.map((community) => (
        <Link
          key={community.community_id}
          to={`/c/${community.community_name}`}
          className='group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <div className='h-24 bg-sage'>
            {community.community_image_url && (
              <img src={community.community_image_url} alt='' className='h-full w-full object-cover' />
            )}
          </div>
          <div className='flex flex-col gap-1 p-5'>
            <h2 className='font-display text-2xl font-medium tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4'>
              <span className='text-muted-foreground'>c/</span>
              {community.community_name}
            </h2>
            <p className='line-clamp-2 text-sm text-muted-foreground'>{community.community_desc}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
