import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEffect, useState } from 'react';
import { Community } from '@/types/CommunityType';

interface NavBarProps {
  //communities: Community[] | null;
  listOfCommunities: string[] | null;
	isUserLoggedIn: boolean;
}

import { Book, User, Library } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';

function NavBarLogo() {
  return (
    <div className='flex items-center space-x-2'>
      <Book color='white' size={44} />
      <span className='text-lg text-neutral-50'>Reader</span>
    </div>
  );
}

import { NavBarSearch } from './NavBarSearch';

export function NavBar(NavBarProps: NavBarProps) {
	const [communities, setCommunities] = useState<Community[] | null>(null);
	const [userLoginState, setUserLoginState] = useState<boolean | null>(true);

  return (
    <nav className='p-4 bg-violet-600'>
      <ul className='flex justify-between'>
        <NavBarLogo />
				<div className='flex pr-4 space-x-4'>
        <DropdownMenu>
          <DropdownMenuTrigger><Library color='white' size={40} strokeWidth={'1.5px'} /></DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Browse communities</DropdownMenuLabel>
            <DropdownMenuSeparator />
							{
								NavBarProps.listOfCommunities?.map((community) => (
									<DropdownMenuItem key={community}>{community}</DropdownMenuItem>
								))
							}
          </DropdownMenuContent>
        </DropdownMenu>

        <NavBarSearch />
        <ThemeToggleButton />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User color='white' size={40} />
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
        </DropdownMenu>
				</div>
      </ul>
    </nav>
  );
}
