import { ButtonGroup } from './ButtonGroup';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Post } from '../../types/PostType';
import { UserRole } from '@/types/UserType';
import { useState } from 'react';

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

function handleUserRoleColor(username: string) {
  const userRoles: UserRole[] = [
    { role_name: 'admin', role_color: 'text-sm text-red-500' },
    { role_name: 'moderator', role_color: 'text-sm text-green-500' },
    { role_name: 'user', role_color: 'text-sm text-gray-400' },
  ];
  /*
  switch (username) {
    case 'admin':
      return userRoles[0].role_color;
    case 'moderator':
      return userRoles[1].role_color;
    default:
      return userRoles[2].role_color;
  }
  */
  const randomRole = Math.floor(Math.random() * userRoles.length);
  return userRoles[randomRole].role_color;
}

export function CommunityPostDate({ createdAt }: { createdAt?: Date }) {
  const [postDate] = useState<Date>(createdAt ? createdAt : new Date());
  const dateToolTip = `Posted on ${postDate.toDateString() + ' at ' + postDate.toLocaleTimeString()}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='hover:text-gray-500 cursor-default text-sm text-gray-400'>
            {postDate ? getTimeBetweenDates(postDate, new Date()) : 'Unknown date'}
          </span>
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
    <div className='border text-gray-200 p-4 rounded-md mx-auto mb-4'>
      <div className='flex items-center space-x-2 mb-2'>
        <div className='flex items-center space-x-1'>
          <Skeleton className='h-4 w-20' />
        </div>
      </div>

      {/* Post Title */}
      <div className='text-lg mb-4 font-semibold text-gray-100'>
        <Skeleton className='h-6 w-72' />
      </div>

      {/* Interaction Bar */}
      <div className='flex items-center space-x-6 text-sm text-gray-400'>
        <div className='flex items-center space-x-1'>
          <Skeleton className='h-4 w-20' />
        </div>
      </div>
    </div>
  );
}

interface CommunityPostProps {
  communityPost: Post;
  id: string;
  title: string;
  content: string;
  score: number;
  author: string;
  createdAt?: Date;
}

export function CommunityPost(CommunityPostProps: CommunityPostProps) {
  return (
    <div className='border text-gray-200 p-4 rounded-md mx-auto mb-4'>
      <div className='flex items-center space-x-2 mb-2'>
        <div className='flex items-center space-x-1'>
          <span className={handleUserRoleColor(CommunityPostProps.author)}>{CommunityPostProps.author}</span>
          <span className='text-sm text-gray-400'>•</span>
          <CommunityPostDate createdAt={CommunityPostProps.createdAt} />
        </div>
      </div>

      {/* Post Title */}
      <div className='text-lg mb-4 font-semibold text-gray-100'>{CommunityPostProps.title}</div>

      {/* Interaction Bar */}
      <div className='flex items-center space-x-6 text-sm text-gray-400'>
        <div className='flex items-center space-x-1'>
          <ButtonGroup
            id={CommunityPostProps.id}
            title={CommunityPostProps.title}
            content={CommunityPostProps.title}
            score={CommunityPostProps.score}
            author={CommunityPostProps.author}
            createdAt={CommunityPostProps.createdAt}
          />
        </div>
      </div>
    </div>
  );
}
