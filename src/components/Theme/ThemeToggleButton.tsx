import { useState } from 'react';
import { Sun, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Theme/ThemeProvider';
import { ComponentToolTip } from '../Tooltip';

export function ThemeToggleButton() {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('light');

  function handleThemeChange() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  }

  return (
    <ComponentToolTip toolTip='Toggle Theme' align='center' delayDur={500}>
      <Button
        className='text-violet-600 border-violet-600 hover:bg-violet-800 hover:border-zinc-700 hover:text-white dark:bg-zinc-950 dark:hover:border-lime-500 dark:hover:bg-zinc-950 dark:hover:text-lime-500'
        variant='outline'
        size='icon'
        onClick={() => handleThemeChange()}
      >
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <SunMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </ComponentToolTip>
  );
}
