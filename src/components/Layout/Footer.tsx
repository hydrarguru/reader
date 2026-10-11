import { Link } from 'react-router';

const REPO_URL = 'https://github.com/hydrarguru/reader';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-muted-foreground'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
            <span>© {year} Reader. All rights reserved.</span>
            <Link to='/privacy' className='hover:text-foreground hover:underline'>
              Privacy policy
            </Link>
          </div>
          {__COMMIT_HASH__ && (
            <a
              href={`${REPO_URL}/commit/${__COMMIT_HASH__}`}
              target='_blank'
              rel='noreferrer'
              className='font-mono hover:text-foreground hover:underline'
              title='The commit this version of the site was built from'
            >
              {__COMMIT_HASH__.slice(0, 7)}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
