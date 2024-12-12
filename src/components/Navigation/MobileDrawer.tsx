import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router';
import { User, Settings, LogOut, LogIn, UserPlus, PanelLeftOpen } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';
import { DrawerSeparator } from './MobileDrawerSeparator';

export function MobileDrawer() {
  return (
    <Drawer.Root direction='right' handleOnly={true}>
      <Drawer.Trigger asChild>
        <Button variant='outline' size='icon' className=''>
          <User
            strokeWidth={1.5}
            className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800'
          />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0' />
        <Drawer.Content className='right-0 top-0 bottom-0 fixed z-10 outline-none w-[310px] flex border-l border-violet-600'>
          <div className='h-full w-full grow flex flex-col items-center bg-neutral-50 dark:bg-zinc-900 dark:border-zinc-700 text-black dark:text-white'>
            <div className='flex flex-row justify-between items-center w-full px-2 my-2'>
              <Drawer.Close>
                <Button variant='outline' size='icon' className=''>
                  <PanelLeftOpen strokeWidth={1.5} className='text-violet-600 dark:text-violet-600' />
                </Button>
              </Drawer.Close>
              <Drawer.Title className='text-black dark:text-white text-xl semibold'>Reader Menu</Drawer.Title>
              <ThemeToggleButton className='' />
            </div>
            <DrawerSeparator title='asdasd' />
            <div className='p-4'>
                <Drawer.Description className='text-zinc-600 mb-2'>Description</Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
