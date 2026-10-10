import { Suspense } from 'react';
import { Await, useRouteLoaderData } from 'react-router';
import type { RootLoaderData } from '@/router';
import type { Community } from '@/types/CommunityType';

interface WithCommunitiesProps {
  /** Shown while the community list is loading. */
  fallback: React.ReactNode;
  /** Shown if the community list could not be loaded. */
  errorElement?: React.ReactNode;
  children: (communities: Community[]) => React.ReactNode;
}

/**
 * Renders `children` with the community list from the root loader. The root loader
 * doesn't wait for the list, so pages render straight away and only this part waits.
 */
export function WithCommunities({ fallback, errorElement = null, children }: WithCommunitiesProps) {
  // Undefined while the root route renders its own loading or error state.
  const communities = (useRouteLoaderData('root') as RootLoaderData | undefined)?.communities;
  if (communities === undefined) return <>{fallback}</>;

  return (
    <Suspense fallback={fallback}>
      <Await resolve={communities} errorElement={errorElement}>
        {(resolved: Community[]) => children(resolved)}
      </Await>
    </Suspense>
  );
}
