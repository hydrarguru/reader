import { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
//import { User, Settings, LogOut, LogIn, UserPlus, PanelLeftOpen } from 'lucide-react';
import { PanelLeftOpen } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';
import { DrawerSeparator } from './MobileDrawerSeparator';
import { ComponentToolTip } from '../Tooltip';

import { Community } from '../../types/CommunityType';
import { WithCommunities } from '../Common/WithCommunities';
import { DisabledButtons } from '../Skeletons/DisabledButtons';
import { useAuth } from '../Auth/AuthProvider';
import { useAuthLinkState } from '../Auth/useReturnPath';

// function fetchStarredCommunities(): Community[] | null {
//   const storedStarredCommunities = localStorage.getItem('starredCommunities');
//   if (storedStarredCommunities === null || storedStarredCommunities === undefined) {
//     console.info('No starred communities found in local storage');
//     return null;
//   }
//   else {
//     console.info('Starred communities found in local storage');
//     return JSON.parse(storedStarredCommunities);
//   }
// }

function RandomCommunities({ communities }: { communities: Community[] }) {
  // Pick once per load, so the list doesn't reshuffle on every render.
  const randomCommunities = useMemo(
    () => [...communities].sort(() => Math.random() - 0.5).slice(0, 3),
    [communities]
  );

  return (
    <>
      {randomCommunities.map((community) => (
        <NavLink role='button' className={drawerLinkClass}
          to={`/c/${community.community_name}`}
          key={community.community_id}
          >
            {community.community_name}
        </NavLink>
      ))}
    </>
  );
}

const drawerLinkClass =
  'w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover';

export function MobileDrawer() {
  const [starredCommunities] = useState<Community[] | null>(null);
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const authLinkState = useAuthLinkState();


  return (
    <Drawer.Root direction='right' handleOnly dismissible={true}>
      <Drawer.Trigger
        asChild
      >
        <Button variant='ghost' size='icon' aria-label='Open sidebar'>
          <PanelLeftOpen strokeWidth={1.8} size={18} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-40 bg-[#1C1A21]/40' />
        <Drawer.Content
          role='Sidebar Content'
          className='right-0 top-0 bottom-0 fixed z-50 outline-none w-[310px] flex border-l border-border shadow-raised'
        >
          <div className='h-full w-full grow flex flex-col items-center bg-card text-foreground overflow-y-auto overflow-x-hidden'>
            <div className='flex flex-row items-center justify-center w-full px-2 py-2 my-2'>
              <Drawer.Close>
                <ComponentToolTip toolTip='Close the sidebar' align='center' delayDur={300}>
                  <Drawer.Title className='font-display text-2xl font-medium'>
                    Reader
                  </Drawer.Title>
                </ComponentToolTip>
              </Drawer.Close>
            </div>
            <DrawerSeparator title='Starred communities' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1'>
              {starredCommunities !== null ? (
                starredCommunities.map((community) => (
                  <NavLink role='button' className={drawerLinkClass}
                    to={`/c/${community.community_name}`}
                    key={community.community_id}
                    >
                      {community.community_name}
                  </NavLink>
                )) 
              ) : (
                <DisabledButtons buttonCount={3} />
              )}
            </div>
            <DrawerSeparator title='Communities' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1'>
              <WithCommunities
                fallback={<DisabledButtons buttonCount={3} />}
                errorElement={<p className='w-full px-3 py-2 text-sm text-muted-foreground'>Couldn't load communities.</p>}
              >
                {(communities) => <RandomCommunities communities={communities} />}
              </WithCommunities>
            </div>
            <DrawerSeparator title='Account' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1 mb-4'>
              {session !== null ? (
                <>
                  <NavLink
                    to='/profile'
                    className={drawerLinkClass}
                    >
                      Profile
                  </NavLink>
                  <NavLink
                    to='/settings'
                    className={drawerLinkClass}
                    >
                      Preferences
                  </NavLink>
                  <button
                    type='button'
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className={drawerLinkClass}
                    >
                      Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to='/login'
                    state={authLinkState}
                    className={drawerLinkClass}
                    >
                      Log in
                  </NavLink>
                  <NavLink
                    to='/signup'
                    state={authLinkState}
                    className={drawerLinkClass}
                    >
                      Sign up
                  </NavLink>
                </>
              )}
            </div>
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1'>
              <ThemeToggleButton />
            </div>
            <div className='mt-auto w-full p-4 border-t border-border flex justify-center items-center'>
              <ComponentToolTip toolTip='Visit my portfolio!' align='center' delayDur={500}>
                <NavLink to='https://henrikengqvist.se' target='_blank'>
                  <span className='text-sm text-muted-foreground hover:text-foreground'>
                    Henrik Engqvist © 2024
                  </span>
                </NavLink>
              </ComponentToolTip>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
