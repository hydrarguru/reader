import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Theme/ThemeProvider';
import { ComponentToolTip } from '../Tooltip';

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <ComponentToolTip toolTip='Toggle theme' align='center' delayDur={500}>
      <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Sun className='h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' strokeWidth={1.8} />
        <Moon className='absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' strokeWidth={1.8} />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </ComponentToolTip>
  );
}
