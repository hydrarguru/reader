import { NavLink } from 'react-router';
import { Community } from '@/types/CommunityType';
import { useEffect, useState } from 'react';
import { MobileDrawer } from './MobileDrawer';
import { DesktopMenu } from './DesktopMenu';

interface NavBarProps {
  communities: Community[];
  onCommunityChange: (community: Community | null) => void;
  isUserLoggedIn: boolean;
}



//TODO: fix nav width when width is 600px or lower.
export function NavBar(NavBarProps: NavBarProps) {
  const [userLoginState, setUserLoginState] = useState<boolean>(false);

  useEffect(() => {
    setUserLoginState(NavBarProps.isUserLoggedIn);
  }, [NavBarProps.isUserLoggedIn]);

  return (
    <nav className='p-4 rounded-lg bg-neutral-50 border border-violet-600  dark:bg-zinc-900 dark:border-zinc-700 dark:text-white'>
      <ul className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <NavLink to='/' className='flex items-center space-x-2' end>
            <span
              className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800 drop-shadow-sm text-3xl font-bold hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-200'
              onClick={() => NavBarProps.onCommunityChange(null)}
            >
              Reader
            </span>
          </NavLink>
        </div>
        <div className='flex pr-4 space-x-4'>
          <MobileDrawer />
          <DesktopMenu loginState={userLoginState} />
        </div>
      </ul>
    </nav>
  );
}
