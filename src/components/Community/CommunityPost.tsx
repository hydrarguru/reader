import { ButtonGroup } from "./ButtonGroup";
import { Skeleton } from "../ui/skeleton";
import { Post } from "../../types/PostType";


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
            <span className='text-sm text-gray-400'>{CommunityPostProps.author}</span>
            <span className='text-sm text-gray-400'>•</span>
            <span className='text-sm text-gray-400'>{CommunityPostProps.createdAt ? getTimeBetweenDates(CommunityPostProps.createdAt, new Date()) : 'Unknown date'}</span>
          </div>
        </div>
  
        {/* Post Title */}
        <div className='text-lg mb-4 font-semibold text-gray-100'>{CommunityPostProps.title}</div>
  
        {/* Interaction Bar */}
        <div className='flex items-center space-x-6 text-sm text-gray-400'>
          <div className='flex items-center space-x-1'>
            <ButtonGroup id={CommunityPostProps.id}  title={CommunityPostProps.title} content={CommunityPostProps.title} score={CommunityPostProps.score} author={CommunityPostProps.author} createdAt={CommunityPostProps.createdAt}/>
          </div>
        </div>
      </div>
    );
  }