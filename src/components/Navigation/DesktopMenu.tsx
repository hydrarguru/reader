import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { NavLink } from 'react-router';

function SignedInUserMenu() {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem className='gap-2'>
          <User size={24} strokeWidth={1.5} className='text-black dark:text-white' />
          <NavLink to='/profile' className='text-black dark:text-white'>
            Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className='gap-2'>
          <Settings size={24} strokeWidth={1.5} className='text-black dark:text-white' />
          <NavLink to='/settings' className='text-black dark:text-white'>
            Settings
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className='gap-2'>
          <LogOut size={24} strokeWidth={1.5} className='text-black dark:text-white' />
          <NavLink to='/sign-out' className='text-black dark:text-white'>
            Logout
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}

function SignedOutUserMenu() {
  return (
    <>
      <DropdownMenuItem className='gap-2'>
        <LogIn size={24} strokeWidth={1.5} className='text-black dark:text-white' />
        <NavLink to='/sign-in' className='text-black dark:text-white'>
          Sign in
        </NavLink>
      </DropdownMenuItem>
      <DropdownMenuItem className='gap-2'>
        <UserPlus size={24} strokeWidth={1.5} className='text-black dark:text-white' />
        <NavLink to='/sign-in' className='text-black dark:text-white'>
          Sign up
        </NavLink>
      </DropdownMenuItem>
    </>
  );
}

interface DesktopMenuProps {
    loginState: boolean;
}

export function DesktopMenu({ loginState }: DesktopMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='max-sm:hidden'>
          <User
            strokeWidth={1.5}
            className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loginState === true ? <SignedInUserMenu /> : <SignedOutUserMenu />}
      </DropdownMenuContent>
      <ThemeToggleButton className='max-sm:hidden' />
    </DropdownMenu>
  );
}
