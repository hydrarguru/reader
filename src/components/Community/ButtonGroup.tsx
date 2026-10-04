import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Maximize2, ArrowUp, ArrowDown } from 'lucide-react';
import { updatePostScore } from '@/api/posts';
import { ApiError } from '@/api/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 100);
}

interface ButtonGroupProps {
  id: string;
  score: number;
  /** Link to the post's own page. Leave out when already on it. */
  postPath?: string;
}


export function ButtonGroup({ id: postId, score, postPath }: ButtonGroupProps) {
  const [postedScore, setPostedScore] = useState<number>(score);
  const [intitalScore] = useState<number>(score);
  const [commentsAmount] = useState<number>(generateRandomNumber());
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const sendScore = useCallback((newScore: number, previous: { score: number; up: boolean; down: boolean }) => {
    updatePostScore(newScore, postId).catch((err) => {
      // Roll back the optimistic update.
      setPostedScore(previous.score);
      setIsUpvoted(previous.up);
      setIsDownvoted(previous.down);
      if (err instanceof ApiError && err.status === 401) {
        toast({ title: 'Session expired', description: 'Please log in again to vote.', duration: 2000 });
        navigate('/login', { state: { from: location.pathname } });
      } else {
        toast({ title: 'Error', description: 'Could not save your vote.', duration: 2000 });
      }
    });
  }, [postId, toast, navigate, location.pathname]);

  const handleIncrement = useCallback((increment: boolean) => {
    if (session === null) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    const previous = { score: postedScore, up: isUpvoted, down: isDownvoted };
    const newScore = increment ? postedScore + 1 : postedScore - 1;
    if(!isUpvoted && !isDownvoted) {
      setPostedScore(newScore);
      sendScore(newScore, previous);
      if (increment) {
        setIsUpvoted(true);
      }
      else {
        setIsDownvoted(true);
      }
    }
    // remove downvote
    if (isDownvoted) {
      setPostedScore(intitalScore);
      sendScore(intitalScore, previous);
      setIsDownvoted(false);
    }
    //Remove upvote
    if (isUpvoted) {
      setPostedScore(intitalScore);
      sendScore(intitalScore, previous);
      setIsUpvoted(false);
    }
  }, [session, navigate, location.pathname, postedScore, intitalScore, isUpvoted, isDownvoted, sendScore]);

  return (
    <div className='flex items-center gap-2'>
      {postPath && (
        <Link to={postPath} className='p-2 rounded-full hover:bg-zinc-900' aria-label='Open post'>
          <Maximize2 className='rotate-90' />
        </Link>
      )}
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-green-500' onClick={() => handleIncrement(true)}>
        <ArrowUp />
      </button>
      {
        isUpvoted ? <span className='text-green-500'>{postedScore}</span> : isDownvoted ? <span className='text-red-500'>{postedScore}</span> : <span className='text-gray-400'>{postedScore}</span>
      }
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-red-500' onClick={() => handleIncrement(false)}>
        <ArrowDown />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <span className='text-gray-400'>{`${commentsAmount} comments`}</span>
      </button>
    </div>
  );
}
