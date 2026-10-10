import { useEffect } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router';
import { ArrowDown, ArrowUp, LogOut, Settings as SettingsIcon } from 'lucide-react';
import type { RootLoaderData } from '@/router';
import { useAuth } from '../Auth/AuthProvider';
import { useVotes } from '../Votes/VotesProvider';
import { UserAvatar } from '../Common/UserAvatar';
import { CommunityList } from '../Navigation/CommunityList';
import { Button } from '../ui/button';

function StatTile({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: 'brand' | 'sage' }) {
  return (
    <div className='flex items-center gap-4 rounded-lg border border-border bg-card p-5'>
      <span
        aria-hidden
        className={
          tone === 'brand'
            ? 'grid h-10 w-10 place-items-center rounded-full bg-brand text-brand-on'
            : 'grid h-10 w-10 place-items-center rounded-full bg-sage text-[#26222E]'
        }
      >
        {icon}
      </span>
      <div>
        <p className='font-display text-3xl font-medium leading-none tabular-nums'>{value}</p>
        <p className='mt-1 text-sm text-muted-foreground'>{label}</p>
      </div>
    </div>
  );
}

export function Profile() {
  const { session, logout } = useAuth();
  const { voteCounts } = useVotes();
  const navigate = useNavigate();
  // Undefined when the root loader failed.
  const communities = (useRouteLoaderData('root') as RootLoaderData | undefined)?.communities ?? [];

  useEffect(() => {
    document.title = `Reader - ${session?.username ?? 'Profile'}`;
  }, [session?.username]);

  if (session === null) return null;

  return (
    <div className='flex flex-col gap-10'>
      <header className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='h-28 bg-highlight sm:h-36' />
        <div className='flex flex-wrap items-end justify-between gap-4 px-6 pb-6'>
          <div className='flex items-end gap-5'>
            <UserAvatar
              name={session.username}
              size={96}
              className='relative -mt-12 border-4 border-card'
            />
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>Profile</p>
              <h1 className='font-display text-4xl font-medium tracking-tight'>{session.username}</h1>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link to='/settings'>
                <SettingsIcon size={16} strokeWidth={1.8} />
                Settings
              </Link>
            </Button>
            <Button
              variant='ghost'
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut size={16} strokeWidth={1.8} />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <section className='flex flex-col gap-4'>
        <h2 className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>Your votes</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <StatTile icon={<ArrowUp size={18} strokeWidth={2} />} label='Posts upvoted' value={voteCounts.up} tone='brand' />
          <StatTile icon={<ArrowDown size={18} strokeWidth={2} />} label='Posts downvoted' value={voteCounts.down} tone='sage' />
        </div>
      </section>

      {communities.length > 0 && (
        <section className='flex flex-col gap-4'>
          <h2 className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>Communities to explore</h2>
          <CommunityList communities={communities.slice(0, 3)} />
        </section>
      )}
    </div>
  );
}
