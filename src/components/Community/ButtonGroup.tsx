import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Maximize2, ArrowUp, ArrowDown } from 'lucide-react';
import { Vote } from '@/api/posts';
import { ApiError } from '@/api/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';
import { useVotes } from '../Votes/VotesProvider';

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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [commentsAmount] = useState<number>(generateRandomNumber());
  const { session } = useAuth();
  const { getVote, castVote } = useVotes();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const currentVote = getVote(postId);

  // Pick up a new score when the page's data is reloaded.
  useEffect(() => {
    setPostedScore(score);
  }, [score]);

  async function handleVote(direction: 1 | -1) {
    if (session === null) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (isSaving) return;

    // Clicking the arrow you already voted with removes the vote.
    const newVote: Vote = currentVote === direction ? 0 : direction;
    const previousScore = postedScore;
    setPostedScore(postedScore - currentVote + newVote);
    setIsSaving(true);
    try {
      setPostedScore(await castVote(postId, newVote));
    } catch (err) {
      setPostedScore(previousScore);
      if (err instanceof ApiError && err.status === 401) {
        toast({ title: 'Session expired', description: 'Please log in again to vote.', duration: 2000 });
        navigate('/login', { state: { from: location.pathname } });
      } else {
        toast({ title: 'Error', description: 'Could not save your vote.', duration: 2000 });
      }
    } finally {
      setIsSaving(false);
    }
  }

  const scoreColor = currentVote === 1 ? 'text-green-500' : currentVote === -1 ? 'text-red-500' : 'text-gray-400';

  return (
    <div className='flex items-center gap-2'>
      {postPath && (
        <Link to={postPath} className='p-2 rounded-full hover:bg-zinc-900' aria-label='Open post'>
          <Maximize2 className='rotate-90' />
        </Link>
      )}
      <button
        className={`p-2 rounded-full hover:bg-zinc-900 hover:text-green-500 ${currentVote === 1 ? 'text-green-500' : ''}`}
        onClick={() => handleVote(1)}
        aria-label='Upvote'
        aria-pressed={currentVote === 1}
      >
        <ArrowUp />
      </button>
      <span className={scoreColor}>{postedScore}</span>
      <button
        className={`p-2 rounded-full hover:bg-zinc-900 hover:text-red-500 ${currentVote === -1 ? 'text-red-500' : ''}`}
        onClick={() => handleVote(-1)}
        aria-label='Downvote'
        aria-pressed={currentVote === -1}
      >
        <ArrowDown />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <span className='text-gray-400'>{`${commentsAmount} comments`}</span>
      </button>
    </div>
  );
}
