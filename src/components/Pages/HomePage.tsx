import { useEffect } from 'react';
import { CommunityList } from '../Navigation/CommunityList';
import { WithCommunities } from '../Common/WithCommunities';
import { SkeletonContainer } from '../Skeletons/SkeletonContainer';

export function HomePage() {
  useEffect(() => {
    document.title = 'Reader';
  }, []);

  return (
    <div className='flex flex-col gap-10'>
      <section className='max-w-2xl pt-4'>
        <p className='text-xs font-semibold uppercase tracking-[0.08em] text-brand-ink'>Communities</p>
        <h1 className='mt-3 font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl'>
          Find your people, share what you love.
        </h1>
        <p className='mt-4 text-base text-muted-foreground'>
          Join a community, post what you are into, and vote up the things worth reading.
        </p>
      </section>
      <WithCommunities
        fallback={<SkeletonContainer skeletonCount={6} />}
        errorElement={
          <p role='alert' className='rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground'>
            We couldn't load the communities. Check your connection and reload the page.
          </p>
        }
      >
        {(communities) =>
          communities.length === 0 ? (
            <p className='rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground'>
              There are no communities yet.
            </p>
          ) : (
            <CommunityList communities={communities} />
          )
        }
      </WithCommunities>
    </div>
  );
}
