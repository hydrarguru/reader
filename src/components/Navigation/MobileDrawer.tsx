import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
//import { User, Settings, LogOut, LogIn, UserPlus, PanelLeftOpen } from 'lucide-react';
import { PanelLeftOpen } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';
import { DrawerSeparator } from './MobileDrawerSeparator';
import { ComponentToolTip } from '../Tooltip';

import { Community } from '../../types/CommunityType';
import { getAllCommunities } from '@/api/communities';
import { DisabledButtons } from '../Skeletons/DisabledButtons';

function fetchStarredCommunities(): Community[] | null {
  const storedStarredCommunities = localStorage.getItem('starredCommunities');
  if (storedStarredCommunities === null || storedStarredCommunities === undefined) {
    console.info('No starred communities found in local storage');
    return null;
  }
  else {
    console.info('Starred communities found in local storage');
    return JSON.parse(storedStarredCommunities);
  }
}

export function MobileDrawer() {
  const [starredCommunities, setStarredCommunities] = useState<Community[] | null>(null);
  const [communities, setCommunities] = useState<Community[] | null>(null);

  function getRandomCommunties(): Community[] {
    const randomCommunities: Community[] = communities?.sort(() => Math.random() - Math.random()).slice(0, 3) || [];
    return randomCommunities;
  }

  useEffect(() => {
    if (communities === null) {
      getAllCommunities().then((communities) => {
        if (communities !== undefined) {
          setCommunities(communities);
        }
      });
    }
  }, [communities]);

  return (
    <Drawer.Root direction='right' handleOnly dismissible={true}>
      <Drawer.Trigger
        asChild
        className='text-violet-600 border-violet-600 hover:bg-violet-800 hover:border-zinc-700 hover:text-white dark:bg-zinc-950 dark:hover:border-lime-500 dark:hover:bg-zinc-950 dark:hover:text-lime-500'
      >
        <Button variant='outline' size='icon'>
          <PanelLeftOpen strokeWidth={1.75} size={24} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0' />
        <Drawer.Content
          role='Sidebar Content'
          className='right-0 top-0 bottom-0 fixed z-10 outline-none w-[310px] flex border-l border-violet-600'
        >
          <div className='h-full w-full grow flex flex-col items-center bg-neutral-50 dark:bg-zinc-900 dark:border-zinc-700 text-black dark:text-white overflow-y-auto overflow-x-hidden'>
            <div className='flex flex-row items-center justify-center w-full px-2 py-2 my-2'>
              <Drawer.Close>
                <ComponentToolTip toolTip='Close the sidebar' align='center' delayDur={300}>
                  <Drawer.Title className='text-black dark:text-white text-2xl font-normal'>
                    Reader Sidebar
                  </Drawer.Title>
                </ComponentToolTip>
              </Drawer.Close>
            </div>
            <DrawerSeparator title='Starred communities' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-4'>
              {starredCommunities !== null ? (
                starredCommunities.map((community) => (
                  <NavLink role='button' className='w-full p-2 border rounded-md text-center text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
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
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-4'>
              {communities !== null ? (
                getRandomCommunties().map((community) => (
                  <NavLink role='button' className='w-full p-2 border rounded-md text-center text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                    to={`/c/${community.community_name}`}
                    key={community.community_id}
                    >
                      {community.community_name}
                  </NavLink>
                ))
              ) : (
                <>
                  {/* Disabled buttons */}
                    <Button
                      variant='default'
                      disabled
                      className='w-full p-4 border text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                    >
                      <span>Community 1</span>
                    </Button>
                    <Button
                      variant='default'
                      disabled
                      className='w-full p-4 border text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                    >
                      <span>Community 2</span>
                    </Button>
                    <Button
                      variant='default'
                      disabled
                      className='w-full p-4 border text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                    >
                      <span>Community 3</span>
                    </Button>
                </>
              )}
            </div>
            <DrawerSeparator title='Account' />
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-4 mb-4'>
            <NavLink 
                to='/profile'
                className='w-full p-2 border rounded-md text-center text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                >
                  Profile
              </NavLink>
              <NavLink 
                to='/settings'
                className='w-full p-2 border rounded-md text-center text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                >
                  Preferences
              </NavLink>
              <NavLink 
                to='/signout'
                className='w-full p-2 border rounded-md text-center text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
                >
                  Sign out
              </NavLink>
            </div>
            <div className='flex flex-col items-center justify-center w-full px-4 py-2 space-y-4'>
              <ThemeToggleButton />
            </div>
            <div className='mt-auto w-full p-4 border-t border-violet-600 dark:border-zinc-700 flex justify-center items-center'>
              <ComponentToolTip toolTip='Visit my portfolio!' align='center' delayDur={500}>
                <NavLink to='https://henrikengqvist.se' target='_blank'>
                  <span className='max-md:text-sm max-lg:text-md text-violet-600 dark:text-white'>
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
