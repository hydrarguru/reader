import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <article className='flex flex-col'>
      <Skeleton className='h-[180px] rounded-lg' />
    </article>
  );
}
