import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Book, User, Library } from 'lucide-react';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { NavBarSearch } from './NavBarSearch';
import { Button } from '../ui/button';


import { useEffect, useState } from 'react';
//import { Community } from '@/types/CommunityType';

interface NavBarProps {
  listOfCommunities: string[] | null; //communities: Community[] | null;
	isUserLoggedIn: boolean;
}

function NavBarLogo() {
  return (
    <div className='flex items-center space-x-2'>
      <Book color='white' size={40} />
      <span className='text-lg text-neutral-50'>Reader</span>
    </div>
  );
}

//TODO: fix nav width when width is 600px or lower.
export function NavBar(NavBarProps: NavBarProps) {
	//const [communities, setCommunities] = useState<Community[] | null>(null);
	const [userLoginState, setUserLoginState] = useState<boolean | null>(null);

  useEffect(() => {
    setUserLoginState(NavBarProps.isUserLoggedIn);
  }, [NavBarProps.isUserLoggedIn]);

  return (
    <nav className='p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 drop-shadow-2xl'>
      <ul className='flex justify-between'>
        <NavBarLogo />
				<div className='flex pr-4 space-x-4'>
        <DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon'>
						<Library color='grey' />
					</Button>
				</DropdownMenuTrigger>
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
