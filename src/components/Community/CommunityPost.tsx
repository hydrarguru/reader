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

export function CommunityPost(post: {
    id?: string;
    title: string;
    content: string;
    score: number;
    author: string;
  }) {
    return (
      <div className='border text-gray-200 p-4 rounded-md mx-auto mb-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <div className='flex items-center space-x-1'>
            <span className='text-sm text-gray-400'>{post.author}</span>
            <span className='text-sm text-gray-400'>•</span>
            <span className='text-sm text-gray-400'>4h ago</span>
          </div>
        </div>
  
        {/* Post Title */}
        <div className='text-lg mb-4 font-semibold text-gray-100'>{post.title}</div>
  
        {/* Interaction Bar */}
        <div className='flex items-center space-x-6 text-sm text-gray-400'>
          <div className='flex items-center space-x-1'>
            <ButtonGroup postScore={post.score} />
          </div>
        </div>
      </div>
    );
  }