import { Link, NavLink, useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { ThemeToggleButton } from '../Theme/ThemeToggleButton';
import { Button } from '../ui/button';
import { UserAvatar } from '../Common/UserAvatar';
import { useAuth } from '../Auth/AuthProvider';
import { useAuthLinkState } from '../Auth/useReturnPath';
//import { DesktopMenu } from './DesktopMenu';

function AccountButtons() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const authLinkState = useAuthLinkState();

  if (session === null) {
    return (
      <div className='flex items-center gap-2 max-sm:hidden'>
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
    <div className='flex items-center gap-2 max-sm:hidden'>
      <Link
        to='/profile'
        className='flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-semibold hover:bg-surface-hover'
      >
        <UserAvatar name={session.username} size={28} ring />
        {session.username}
      </Link>
      <Button
        variant='ghost'
        size='icon'
        aria-label='Log out'
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        <LogOut strokeWidth={1.8} size={18} />
      </Button>
    </div>
  );
}

export function NavBar() {
  return (
    <nav className='max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6'>
      <NavLink
        to='/'
        end
        className='flex items-baseline gap-1 font-display text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-brand-ink'
      >
        Reader
        <span aria-hidden className='inline-block h-2 w-2 rounded-full bg-brand' />
      </NavLink>
      <div className='flex items-center gap-1'>
        <AccountButtons />
        <ThemeToggleButton />
        <MobileDrawer />
        {/*<DesktopMenu loginState={userLoginState} />*/}
      </div>
    </nav>
  );
}
