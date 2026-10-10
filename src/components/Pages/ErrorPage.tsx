import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { Button } from '../ui/button';

export function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  if (!notFound) console.error(error);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-center'>
      <p aria-hidden className='font-display text-8xl font-medium leading-none text-brand'>{notFound ? '404' : 'Oops'}</p>
      <h1 className='font-display text-4xl font-medium tracking-tight'>
        {notFound ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className='max-w-md text-muted-foreground'>
        {notFound
          ? "The page you're looking for doesn't exist."
          : "We couldn't load this page. Check your connection and try again."}
      </p>
      <Button asChild className='mt-2'>
        <Link to='/'>Back to communities</Link>
      </Button>
    </div>
  );
}
