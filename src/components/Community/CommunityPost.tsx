import { Link } from 'react-router';
import { ButtonGroup } from './ButtonGroup';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { UserAvatar } from '../Common/UserAvatar';

function getTimeBetweenDates(date1: Date, date2: Date): string {
  const diff = Math.abs(date1.getTime() - date2.getTime());

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export function CommunityPostDate({ createdAt }: { createdAt?: Date }) {
  const [postDate] = useState<Date>(createdAt ? createdAt : new Date());
  const dateToolTip = `Posted on ${postDate.toDateString() + ' at ' + postDate.toLocaleTimeString()}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <time dateTime={postDate.toISOString()} className='cursor-default hover:text-foreground'>
            {postDate ? getTimeBetweenDates(postDate, new Date()) : 'Unknown date'}
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
