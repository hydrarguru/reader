import { Outlet, useNavigation } from 'react-router';
import { NavBar } from '../Navigation/NavBar';
import { Footer } from './Footer';

export function RootLayout({ children }: { children?: React.ReactNode }) {
  const navigation = useNavigation();

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur'>
        <NavBar />
      </header>
      <main
        className={`flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 ${navigation.state === 'loading' ? 'opacity-60 transition-opacity' : ''}`}
      >
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
