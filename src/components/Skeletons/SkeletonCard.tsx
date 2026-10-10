import { Skeleton } from '@/components/ui/skeleton';

/** Placeholder with the shape of a community card in CommunityList. */
export function SkeletonCard() {
  return (
    <article className='flex flex-col overflow-hidden rounded-lg border border-border bg-card'>
      <Skeleton className='h-24 rounded-none' />
      <div className='flex flex-col gap-2 p-5'>
        <Skeleton className='h-7 w-40' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </div>
    </article>
  );
}
