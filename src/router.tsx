import { createBrowserRouter, data, LoaderFunctionArgs } from 'react-router';

import { ApiError } from './api/client';
import { getAllCommunities, getCommunity } from './api/communities';
import { getCommunityPosts, getPost } from './api/posts';

import { RootLayout } from './components/Layout/RootLayout';
import { RequireAuth } from './components/Auth/RequireAuth';
import { ErrorPage } from './components/Pages/ErrorPage';
import { HomePage } from './components/Pages/HomePage';
import { CommunityPage } from './components/Pages/CommunityPage';
import { PostPage } from './components/Pages/PostPage';
import { LoginPage } from './components/Pages/LoginPage';
import { SignUpPage } from './components/Pages/SignUpPage';
import { Profile } from './components/Pages/Profile';
import { Settings } from './components/Pages/Settings';
import { SkeletonContainer } from './components/Skeletons/SkeletonContainer';

/** Turns a backend 404 into a route error response, so ErrorPage can show "not found". */
async function orNotFound<T>(request: Promise<T>): Promise<T> {
  try {
    return await request;
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
      throw data('Not found', { status: 404 });
    }
    throw err;
  }
}

async function rootLoader() {
  return { communities: await getAllCommunities() };
}

async function communityLoader({ params }: LoaderFunctionArgs) {
  const community = await orNotFound(getCommunity(params.communityName!));
  const posts = await getCommunityPosts(community.community_id);
  return { community, posts };
}

async function postLoader({ params }: LoaderFunctionArgs) {
  const community = await orNotFound(getCommunity(params.communityName!));
  const post = await orNotFound(getPost(params.postId!, community.community_id));
  return { post };
}

export type RootLoaderData = Awaited<ReturnType<typeof rootLoader>>;
export type CommunityLoaderData = Awaited<ReturnType<typeof communityLoader>>;
export type PostLoaderData = Awaited<ReturnType<typeof postLoader>>;

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    errorElement: <RootLayout><ErrorPage /></RootLayout>,
    hydrateFallbackElement: <div className='m-4'><SkeletonContainer skeletonCount={10} /></div>,
    children: [
      {
        // Errors in child routes render inside the layout, so the navbar stays visible.
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'c/:communityName', element: <CommunityPage />, loader: communityLoader },
          { path: 'c/:communityName/p/:postId', element: <PostPage />, loader: postLoader },
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignUpPage /> },
          {
            element: <RequireAuth />,
            children: [
              { path: 'profile', element: <Profile /> },
              { path: 'settings', element: <Settings /> },
            ],
          },
          { path: '*', loader: () => { throw data('Not found', { status: 404 }); } },
        ],
      },
    ],
  },
]);
