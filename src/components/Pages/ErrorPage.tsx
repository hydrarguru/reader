import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  if (!notFound) console.error(error);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-center'>
      <h1 className='text-3xl font-extrabold tracking-tight'>
        {notFound ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className='text-gray-400'>
        {notFound
          ? "The page you're looking for doesn't exist."
          : "We couldn't load this page. Check your connection and try again."}
      </p>
      <Link to='/' className='px-4 py-2 rounded-full border border-zinc-400 hover:border-zinc-100'>
        Back to communities
      </Link>
    </div>
  );
}
