import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <article className='flex flex-col'>
      <Skeleton className='h-[125px] rounded-xl' />
    </article>
  );
}
