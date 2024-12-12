import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
//import { NavBarSearch } from './NavBarSearch';
import { Button } from '../ui/button';
import { Community } from '@/types/CommunityType';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

interface NavBarProps {
  communities: Community[];
  onCommunityChange: (community: Community | null) => void;
  isUserLoggedIn: boolean;
}

//TODO: fix nav width when width is 600px or lower.
export function NavBar(NavBarProps: NavBarProps) {
  const [userLoginState, setUserLoginState] = useState<boolean | null>(null);

  useEffect(() => {
    setUserLoginState(NavBarProps.isUserLoggedIn);
  }, [NavBarProps.isUserLoggedIn]);

  return (
    <nav className='p-4 rounded-lg bg-neutral-50 border border-violet-600  dark:bg-zinc-900 dark:border-zinc-700 dark:text-white'>
      <ul className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <NavLink to='/' className='flex items-center space-x-2' end>
            <span
              className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800 drop-shadow-sm text-3xl font-extrabold hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-200'
              onClick={() => NavBarProps.onCommunityChange(null)}
            >
              Reader
            </span>
          </NavLink>
        </div>
        <div className='flex pr-4 space-x-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <User strokeWidth={1.5} className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='start'>
              <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userLoginState === true ? (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='gap-2'>
                      <User size={24} strokeWidth={1.5} className='text-black dark:text-white' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='gap-2'>
                      <Settings size={24} strokeWidth={1.5} className='text-black dark:text-white' />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='gap-2'>
                      <LogOut size={24} strokeWidth={1.5} className='text-black dark:text-white' />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              ) : (
                <>
                  <DropdownMenuItem className='gap-2'>
                    <LogIn size={24} strokeWidth={1.5} className='text-black dark:text-white' />
                    <span>Sign in</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='gap-2'>
                    <UserPlus size={24} strokeWidth={1.5} className='text-black dark:text-white' />
                    <span>Sign up</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
            <ThemeToggleButton />
          </DropdownMenu>
        </div>
      </ul>
    </nav>
  );
}
