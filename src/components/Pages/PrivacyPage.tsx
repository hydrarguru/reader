const LAST_UPDATED = 'October 11, 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='font-display text-2xl font-medium tracking-tight text-foreground'>{title}</h2>
      {children}
    </section>
  );
}

export function PrivacyPage() {
  return (
    <article className='max-w-2xl mx-auto flex flex-col gap-8 text-muted-foreground leading-relaxed'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-4xl font-medium tracking-tight text-foreground'>Privacy policy</h1>
        <p className='text-sm'>Last updated {LAST_UPDATED}</p>
      </header>

      <p>
        This page explains what personal data Reader stores, why, and the rights you have over it under the EU General
        Data Protection Regulation (GDPR).
      </p>

      <Section title='What we store'>
        <ul className='list-disc pl-5 flex flex-col gap-1'>
          <li>
            <strong className='text-foreground'>Your account:</strong> your username, email address, a hashed version of
            your password (never the password itself), and when the account was created and last changed.
          </li>
          <li>
            <strong className='text-foreground'>What you post:</strong> the posts, comments and votes you make, and the
            communities you create.
          </li>
        </ul>
        <p>
          Your username and what you post are public to other visitors. Your email address and password are never shown
          to anyone.
        </p>
      </Section>

      <Section title='Why we store it'>
        <p>
          Only to run Reader: to let you log in, and to show your posts, comments and votes to others. The legal basis is
          the agreement you make with us when you sign up. We don't sell your data, share it with third parties, or use
          it for advertising.
        </p>
      </Section>

      <Section title='In your browser'>
        <p>
          Reader keeps your login session and your theme choice in your browser's local storage, and caches some pages so
          they load faster. It sets no tracking or advertising cookies, and logging out removes your session.
        </p>
      </Section>

      <Section title='Where it is kept'>
        <p>
          Your data is stored in Reader's database, run on Fly.io. The website itself is hosted on Netlify, which may keep
          standard server logs, such as IP addresses, for a short time.
        </p>
      </Section>

      <Section title='How long we keep it'>
        <p>Until you ask us to delete your account. Deleting it removes your account and what you posted.</p>
      </Section>

      <Section title='Your rights'>
        <p>
          You can ask for a copy of your data, have it corrected, or have it deleted. You can also object to how it is
          used, or complain to your country's data protection authority.
        </p>
      </Section>
    </article>
  );
}
