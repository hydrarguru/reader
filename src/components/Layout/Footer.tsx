const REPO_URL = 'https://github.com/hydrarguru/reader';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-2 text-xs text-muted-foreground'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span>© {year} Reader. All rights reserved.</span>
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
        <p>
          Privacy: when you sign up we store your username, email address and a hashed password, plus the posts,
          comments and votes you create, only to run Reader. Your login session and theme choice are kept in your
          browser's local storage. We use no tracking or advertising cookies.
        </p>
      </div>
    </footer>
  );
}
