import { Link } from 'react-router';
import { ButtonGroup } from './ButtonGroup';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserAvatar } from '../Common/UserAvatar';

const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [['day', 86400], ['hour', 3600], ['minute', 60]];

/** "5 minutes ago", "1 hour ago", "yesterday". */
function timeAgo(date: Date): string {
  const seconds = Math.trunc((date.getTime() - Date.now()) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.trunc(seconds / size), unit);
  }
  return relativeTime.format(seconds, 'second');
}

export function CommunityPostDate({ createdAt }: { createdAt?: Date }) {
  if (createdAt === undefined) return <span>Unknown date</span>;
  const dateToolTip = `Posted on ${createdAt.toDateString()} at ${createdAt.toLocaleTimeString()}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <time dateTime={createdAt.toISOString()} className='cursor-default hover:text-foreground'>
            {timeAgo(createdAt)}
          </time>
        </TooltipTrigger>
        <TooltipContent>
          <p>{dateToolTip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CommunityPostSkeleton() {
  return (
    <div className='rounded-lg border border-border bg-card px-6 py-5'>
      <Skeleton className='mb-3 h-4 w-32' />
      <Skeleton className='mb-4 h-6 w-72' />
      <Skeleton className='h-8 w-28 rounded-full' />
    </div>
  );
}

interface CommunityPostProps {
  communityName: string;
  id: string;
  title: string;
  excerpt?: string;
  score: number;
  commentCount?: number;
  author: string;
  createdAt?: Date;
}

export function CommunityPost(CommunityPostProps: CommunityPostProps) {
  const postPath = `/c/${CommunityPostProps.communityName}/p/${CommunityPostProps.id}`;
  return (
    <article className='rounded-lg border border-border bg-card px-6 py-5 shadow-card transition-shadow hover:shadow-raised'>
      <div className='mb-2 flex flex-wrap items-center gap-2 text-[13px] font-medium leading-[18px] text-muted-foreground'>
        <UserAvatar name={CommunityPostProps.author} size={20} />
        <span>{CommunityPostProps.author}</span>
        <span aria-hidden className='text-line-strong'>·</span>
        <CommunityPostDate createdAt={CommunityPostProps.createdAt} />
      </div>

      <Link
        to={postPath}
        className='mb-2 block font-display text-[22px] font-medium leading-7 text-foreground [text-wrap:pretty] hover:underline hover:decoration-1 hover:underline-offset-4'
      >
        {CommunityPostProps.title}
      </Link>

      {CommunityPostProps.excerpt && (
        <p className='mb-4 line-clamp-2 text-[15px] leading-6 text-muted-foreground'>{CommunityPostProps.excerpt}</p>
      )}

      <ButtonGroup id={CommunityPostProps.id} score={CommunityPostProps.score} postPath={postPath} commentCount={CommunityPostProps.commentCount} />
    </article>
  );
}
