import { Link, NavLink, useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { Button } from '../ui/button';
import { useAuth } from '../Auth/AuthProvider';
import { useAuthLinkState } from '../Auth/useReturnPath';
//import { DesktopMenu } from './DesktopMenu';

function AccountButtons() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const authLinkState = useAuthLinkState();

  if (session === null) {
    return (
      <div className='flex items-center space-x-2 max-sm:hidden'>
        <Button variant='ghost' asChild>
          <Link to='/login' state={authLinkState}>Log in</Link>
        </Button>
        <Button asChild>
          <Link to='/signup' state={authLinkState}>Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center space-x-2 max-sm:hidden'>
      <Link to='/profile' className='font-medium hover:underline'>
        {session.username}
      </Link>
      <Button
        variant='outline'
        size='icon'
        aria-label='Log out'
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        <LogOut strokeWidth={1.5} size={20} />
      </Button>
    </div>
  );
}

export function NavBar() {
  return (
    <nav className='p-4 rounded-lg bg-neutral-50 border border-violet-600  dark:bg-zinc-950 dark:border-gray-600 dark:text-white'>
      <ul className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <NavLink to='/'
            className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-lime-500 drop-shadow-sm text-3xl font-bold hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-150'
            end
            >
            Reader
          </NavLink>
        </div>
        <div className='flex items-center pr-4 space-x-4'>
          <AccountButtons />
          <MobileDrawer />
          <ThemeToggleButton />
          {/*<DesktopMenu loginState={userLoginState} />*/}
        </div>
      </ul>
    </nav>
  );
}
