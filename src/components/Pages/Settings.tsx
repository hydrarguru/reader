import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../Auth/AuthProvider';
import { useTheme } from '../Theme/ThemeProvider';
import { UserAvatar } from '../Common/UserAvatar';
import { Button } from '../ui/button';
import { AccountSettings } from '../Settings/AccountSettings';

type Theme = 'light' | 'dark';

const themeOptions: { value: Theme; label: string; page: string; card: string; ink: string }[] = [
  { value: 'light', label: 'Light', page: '#E6EBE0', card: '#FAFBF7', ink: '#26222E' },
  { value: 'dark', label: 'Dark', page: '#1C1A21', card: '#262330', ink: '#E6EBE0' },
];

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className='grid gap-6 rounded-lg border border-border bg-card p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8'>
      <div>
        <h2 className='font-display text-2xl font-medium tracking-tight'>{title}</h2>
        <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}

export function Settings() {
  const { session, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Reader - Settings';
  }, []);

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-6'>
      <div className='mb-2'>
        <h1 className='font-display text-5xl font-medium tracking-tight'>Settings</h1>
        <p className='mt-2 text-muted-foreground'>Choose how Reader looks and manage your account.</p>
      </div>

      <SettingsSection title='Appearance' description='Pick a theme. It is saved on this device.'>
        <div role='radiogroup' aria-label='Theme' className='grid grid-cols-2 gap-4'>
          {themeOptions.map((option) => {
            const selected = theme === option.value;
            return (
              <button
                key={option.value}
                type='button'
                role='radio'
                aria-checked={selected}
                onClick={() => setTheme(option.value)}
                className={cn(
                  'group flex flex-col gap-3 rounded-lg border-2 p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                  selected ? 'border-brand' : 'border-border hover:border-line-strong'
                )}
              >
                {/* A miniature feed in the theme's own colours. */}
                <div aria-hidden className='flex h-24 flex-col gap-2 rounded-md p-3' style={{ background: option.page }}>
                  {[0, 1].map((i) => (
                    <div key={i} className='flex items-center gap-2 rounded px-2 py-2' style={{ background: option.card }}>
                      <span className='h-3 w-3 flex-none rounded-full bg-brand' />
                      <span className='h-1.5 flex-1 rounded-full opacity-70' style={{ background: option.ink }} />
                      <span className='h-3 w-6 flex-none rounded-full bg-sage' />
                    </div>
                  ))}
                </div>
                <span className='flex items-center justify-between text-sm font-semibold'>
                  {option.label}
                  {selected && (
                    <span className='grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-on'>
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </SettingsSection>

      {session && (
        <SettingsSection title='Account' description='Change your username, email or password, or delete your account.'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <UserAvatar name={session.username} size={44} />
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>Username</p>
                <p className='font-semibold'>{session.username}</p>
              </div>
            </div>
            <Button
              variant='outline'
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Log out
            </Button>
          </div>
          <div className='mt-8 border-t border-border pt-6'>
            <AccountSettings session={session} />
          </div>
        </SettingsSection>
      )}
    </div>
  );
}
