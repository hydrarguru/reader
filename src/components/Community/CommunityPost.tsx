import { ButtonGroup } from "./ButtonGroup";
import { Skeleton } from "../ui/skeleton";


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
  return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`;
}

export function CommunityPost(post: {
    id?: string;
    title: string;
    content: string;
    score: number;
    author: string;
    createdAt?: Date;
  }) {
    return (
      <div className='border text-gray-200 p-4 rounded-md mx-auto mb-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <div className='flex items-center space-x-1'>
            <span className='text-sm text-gray-400'>{post.author}</span>
            <span className='text-sm text-gray-400'>•</span>
            <span className='text-sm text-gray-400'>{post.createdAt ? getTimeBetweenDates(post.createdAt, new Date()) : 'Unknown date'}</span>
          </div>
        </div>
  
        {/* Post Title */}
        <div className='text-lg mb-4 font-semibold text-gray-100'>{post.title}</div>
  
        {/* Interaction Bar */}
        <div className='flex items-center space-x-6 text-sm text-gray-400'>
          <div className='flex items-center space-x-1'>
            <ButtonGroup postScore={post.score} postId={post.id || ''} />
          </div>
        </div>
      </div>
    );
  }