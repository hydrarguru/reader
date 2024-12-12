import { SkeletonCard } from './SkeletonCard';

interface SkeletonContainerProps {
    skeletonCount: number;
}

export function SkeletonContainer(skeletonCount: SkeletonContainerProps) {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: skeletonCount.skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </section>
  );
}
