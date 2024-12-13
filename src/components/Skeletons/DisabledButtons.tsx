import { Button } from '../ui/button';

interface ButtonProps {
  buttonCount: number;
}

export function DisabledButtons({ buttonCount }: ButtonProps) {
  return (
    <>
    {
        Array.from({ length: buttonCount }).map((_, index) => (
            <Button
            variant='default'
            disabled
            className='w-full p-4 border text-violet-600 bg-neutral-50 hover:bg-violet-800 hover:text-white hover:border-violet-800 transition-all ease-in-out duration-150 border-violet-600 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-violet-800 dark:text-white text-md font-normal'
            >
            {`Disabled Button ${index + 1}`}
          </Button>
        ))
    }
    </>
  );
}
