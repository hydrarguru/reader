import { Link, matchPath, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { CommunityPostSkeleton } from '../Community/CommunityPost';

/**
 * Shown on the first load of the site, inside the real layout, while the route data
 * loads. Picks a placeholder shaped like the page being opened. Pages without a
 * loader of their own (home, login, …) render as soon as the root loader returns,
 * which is immediate, so they need no placeholder here.
 */
export function RouteSkeleton() {
  const { pathname } = useLocation();
  const post = matchPath('/c/:communityName/p/:postId', pathname);
  if (post) return <PostPageSkeleton communityName={post.params.communityName ?? ''} />;
  const community = matchPath('/c/:communityName', pathname);
  if (community) return <CommunityPageSkeleton communityName={community.params.communityName ?? ''} />;
  return null;
}

/** Uses the community name from the URL, so the header reads right before the data arrives. */
function CommunityPageSkeleton({ communityName }: { communityName: string }) {

  return (
    <div aria-busy>
      <header className='mb-8 overflow-hidden rounded-xl border border-border bg-card'>
        <Skeleton className='h-32 rounded-none sm:h-40' />
        <div className='flex flex-wrap items-end justify-between gap-4 px-6 pb-6'>
          <div className='flex items-end gap-4'>
            <div
              aria-hidden
              className='relative -mt-9 grid h-[72px] w-[72px] flex-none place-items-center rounded-full border-4 border-card bg-brand font-display text-4xl font-medium leading-none text-brand-on'
            >
              {communityName.charAt(0).toUpperCase()}
            </div>
            <div className='pt-4'>
              <h1 className='font-display text-4xl font-medium tracking-tight'>
                <span className='font-normal text-muted-foreground'>c/</span>
                {communityName}
              </h1>
              <Skeleton className='mt-2 h-4 w-64 max-w-full' />
            </div>
          </div>
          <Button disabled>Create post</Button>
        </div>
      </header>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]'>
        <div className='flex flex-col gap-4'>
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
        </div>
        <aside className='order-first flex flex-col gap-4 rounded-lg border border-border bg-card p-6 self-start lg:order-none'>
          <h2 className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>
            Rules of c/{communityName}
          </h2>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-5 w-24' />
        </aside>
      </div>
    </div>
  );
}

function PostPageSkeleton({ communityName }: { communityName: string }) {

  return (
    <article aria-busy className='mx-auto max-w-3xl'>
      <Link
        to={`/c/${communityName}`}
        className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:underline'
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        c/{communityName}
      </Link>
      <div className='mt-6 rounded-xl border border-border bg-card px-6 py-8 shadow-card sm:px-10'>
        <div className='mb-4 flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='mb-3 h-9 w-full' />
        <Skeleton className='mb-8 h-9 w-2/3' />
        <div className='mb-8 flex flex-col gap-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
        <div className='border-t border-border pt-4'>
          <Skeleton className='h-8 w-28 rounded-full' />
        </div>
      </div>
    </article>
  );
}
