import { useEffect } from 'react';
import { useRouteLoaderData } from 'react-router';
import type { RootLoaderData } from '@/router';
import { CommunityList } from '../Navigation/CommunityList';

export function HomePage() {
  const { communities } = useRouteLoaderData('root') as RootLoaderData;

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
      {communities.length === 0 ? (
        <p className='rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground'>
          There are no communities yet.
        </p>
      ) : (
        <CommunityList communities={communities} />
      )}
    </div>
  );
}
