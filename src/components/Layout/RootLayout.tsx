import { Outlet, useNavigation } from 'react-router';
import { NavBar } from '../Navigation/NavBar';

export function RootLayout({ children }: { children?: React.ReactNode }) {
  const navigation = useNavigation();

  return (
    <div className='min-h-screen flex flex-col m-4'>
      <header>
        <NavBar />
      </header>
      <main className={navigation.state === 'loading' ? 'opacity-60 transition-opacity' : undefined}>
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
