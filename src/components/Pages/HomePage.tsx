import { useEffect } from 'react';
import { useRouteLoaderData } from 'react-router';
import type { RootLoaderData } from '@/router';
import { CommunityList } from '../Navigation/CommunityList';

export function HomePage() {
  const { communities } = useRouteLoaderData('root') as RootLoaderData;

  useEffect(() => {
    document.title = 'Reader';
  }, []);

  if (communities.length === 0) {
    return <p className='my-8 text-center text-gray-400'>There are no communities yet.</p>;
  }
  return <CommunityList communities={communities} />;
}
