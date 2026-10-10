import { Skeleton } from '../ui/skeleton';

interface ButtonProps {
  buttonCount: number;
}

export function DisabledButtons({ buttonCount }: ButtonProps) {
  return (
    <>
    {
        Array.from({ length: buttonCount }).map((_, index) => (
            <Skeleton key={index} className='h-9 w-full' />
        ))
    }
    </>
  );
}
