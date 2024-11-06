import { useState, useCallback } from 'react';
import { Maximize2, ArrowUp, ArrowDown } from 'lucide-react';
import { updatePostScore } from '@/api/posts';

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 100);
}


export function ButtonGroup({ postScore, postId }: { postScore: number, postId: string }) {
  const [postedId] = useState<string>(postId);
  const [postedScore, setPostedScore] = useState<number>(postScore);
  const [intitalScore] = useState<number>(postScore);
  const [commentsAmount] = useState<number>(generateRandomNumber());
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);

  const handleIncrement = useCallback((increment: boolean, postId: string) => {
    const newScore = increment ? postedScore + 1 : postedScore - 1;
    if(!isUpvoted && !isDownvoted) {
      setPostedScore(newScore);
      updatePostScore(newScore, postId);
      if (increment) {
        setIsUpvoted(true);
        console.debug('Upvoted');
      }
      else {
        setIsDownvoted(true);
        console.debug('Downvoted');
      }
    }
    // remove downvote
    if (isDownvoted) {
      setPostedScore(intitalScore);
      updatePostScore(intitalScore, postId);
      setIsDownvoted(false);
    }
    //Remove upvote
    if (isUpvoted) {
      setPostedScore(intitalScore);
      updatePostScore(intitalScore, postId);
      setIsUpvoted(false);
    }
  }, [postedScore, intitalScore, isUpvoted, isDownvoted]);

  return (
    <div className='flex items-center gap-2'>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <Maximize2 className='rotate-90' />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-green-500' onClick={() => handleIncrement(true, postedId)}>
        <ArrowUp />
      </button>
      {
        isUpvoted ? <span className='text-green-500'>{postedScore}</span> : isDownvoted ? <span className='text-red-500'>{postedScore}</span> : <span className='text-gray-400'>{postedScore}</span>
      }
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-red-500' onClick={() => handleIncrement(false, postedId)}>
        <ArrowDown />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <span className='text-gray-400'>{`${commentsAmount} comments`}</span>
      </button>
    </div>
  );
}