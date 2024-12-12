import { useState } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Theme/ThemeProvider';

interface ThemeToggleButtonProps {
  className?: string;
}

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('light');

  function handleThemeChange() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  }

  return (
    <Button className={className} variant='outline' size='icon' onClick={() => handleThemeChange()}>
      <Sun className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <SunMoon className='text-violet-600 dark:text-violet-600 hover:text-violet-800 dark:hover:text-violet-800 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
