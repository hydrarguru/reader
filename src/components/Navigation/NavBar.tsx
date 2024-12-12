import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
//import { NavBarSearch } from './NavBarSearch';
import { Button } from '../ui/button';
import { Community } from '@/types/CommunityType';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router";

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
    <nav className='p-4 rounded-xl border border-emerald-800  dark:bg-zinc-900 dark:border-zinc-700 dark:text-white'>
      <ul className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <NavLink to='/' className='flex items-center space-x-2' end>
            <span className='text-emerald-800 hover:text-emerald-700 text-3xl font-extrabold dark:text-white dark:hover:text-neutral-300 hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-200' onClick={() => NavBarProps.onCommunityChange(null)}>Reader</span>
          </NavLink>
        </div>
				<div className='flex pr-4 space-x-4'>
        <DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon'>
						<User className='text-black dark:text-white'/>
					</Button>
				</DropdownMenuTrigger>
          <DropdownMenuContent align={'center'}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
             {userLoginState === true ? (
							<>
              <DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Logout</DropdownMenuItem>
							</>
            ) : (
							<>
              <DropdownMenuItem>Sign in</DropdownMenuItem>
							<DropdownMenuItem>Sign up</DropdownMenuItem>
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
