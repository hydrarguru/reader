import { NavLink, NavLinkProps, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';
import { DrawerSeparator } from './MobileDrawerSeparator';

import { Community } from '../../types/CommunityType';
import { WithCommunities } from '../Common/WithCommunities';
import { DisabledButtons } from '../Skeletons/DisabledButtons';
import { useAuth } from '../Auth/AuthProvider';
import { useAuthLinkState } from '../Auth/useReturnPath';

function CommunityLinks({ communities }: { communities: Community[] }) {
  const sorted = [...communities].sort((a, b) => a.community_name.localeCompare(b.community_name));

  return (
    <>
      {sorted.map((community) => (
        <DrawerLink to={`/c/${community.community_name}`} key={community.community_id}>
          {community.community_name}
        </DrawerLink>
      ))}
    </>
  );
}

const drawerLinkClass =
  'w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

function DrawerLink(props: NavLinkProps) {
  return (
    <Drawer.Close asChild>
      <NavLink className={drawerLinkClass} {...props} />
    </Drawer.Close>
  );
}

export function MobileDrawer() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const authLinkState = useAuthLinkState();

  return (
    <Drawer.Root direction='right' handleOnly dismissible={true}>
      <Drawer.Trigger asChild>
        <Button variant='ghost' size='icon' aria-label='Open menu' className='sm:hidden'>
          <Menu strokeWidth={1.8} size={18} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-40 bg-[#1C1A21]/40' />
        <Drawer.Content
          aria-describedby={undefined}
          className='right-0 top-0 bottom-0 fixed z-50 outline-none w-[310px] flex border-l border-border shadow-raised'
        >
          <div className='h-full w-full grow flex flex-col items-center bg-card text-foreground overflow-y-auto overflow-x-hidden'>
            <div className='flex items-center justify-between w-full pl-7 pr-3 py-2 my-2'>
              <Drawer.Title className='font-display text-2xl font-medium'>
                Reader
              </Drawer.Title>
              <Drawer.Close asChild>
                <Button variant='ghost' size='icon' aria-label='Close menu'>
                  <X strokeWidth={1.8} size={18} />
                </Button>
              </Drawer.Close>
            </div>
            <DrawerSeparator title='Communities' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1'>
              <WithCommunities
                fallback={<DisabledButtons buttonCount={3} />}
                errorElement={<p className='w-full px-3 py-2 text-sm text-muted-foreground'>Couldn't load communities.</p>}
              >
                {(communities) => <CommunityLinks communities={communities} />}
              </WithCommunities>
            </div>
            <DrawerSeparator title='Account' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-1 mb-4'>
              {session !== null ? (
                <>
                  <DrawerLink to='/profile'>Profile</DrawerLink>
                  <DrawerLink to='/settings'>Settings</DrawerLink>
                  {session.is_admin && <DrawerLink to='/admin'>Admin</DrawerLink>}
                  <Drawer.Close asChild>
                    <button
                      type='button'
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className={drawerLinkClass}
                    >
                      Log out
                    </button>
                  </Drawer.Close>
                </>
              ) : (
                <>
                  <DrawerLink to='/login' state={authLinkState}>Log in</DrawerLink>
                  <Drawer.Close asChild>
                    <Button asChild className='w-full mt-2'>
                      <NavLink to='/signup' state={authLinkState}>
                        Sign up
                      </NavLink>
                    </Button>
                  </Drawer.Close>
                </>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
