import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vote } from '@/api/posts';
import { ApiError } from '@/api/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';
import { useVotes } from '../Votes/VotesProvider';

interface ButtonGroupProps {
  id: string;
  score: number;
  /** Link to the post's own page. Leave out when already on it. */
  postPath?: string;
}


export function ButtonGroup({ id: postId, score, postPath }: ButtonGroupProps) {
  const [postedScore, setPostedScore] = useState<number>(score);
  const [isSaving, setIsSaving] = useState<boolean>(false);
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

  return (
    <div className='flex items-center gap-2'>
      <div
        role='group'
        aria-label='Vote'
        className={cn(
          'inline-flex items-center gap-0.5 rounded-full bg-muted p-0.5 text-[13px] font-semibold',
          currentVote === 1 && 'bg-brand-soft',
          currentVote === -1 && 'bg-sage-soft'
        )}
      >
        <button
          className={cn(
            'grid h-[30px] w-[30px] place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            currentVote === 1 && 'bg-brand text-brand-on hover:bg-brand hover:text-brand-on'
          )}
          onClick={() => handleVote(1)}
          aria-label='Upvote'
          aria-pressed={currentVote === 1}
        >
          <ArrowUp size={16} strokeWidth={2} />
        </button>
        <span
          aria-live='polite'
          className={cn(
            'min-w-7 text-center tabular-nums',
            currentVote === 1 && 'text-brand-ink',
            currentVote === -1 && 'text-sage-ink'
          )}
        >
          {postedScore}
        </span>
        <button
          className={cn(
            'grid h-[30px] w-[30px] place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            currentVote === -1 && 'bg-sage text-[#26222E] hover:bg-sage hover:text-[#26222E]'
          )}
          onClick={() => handleVote(-1)}
          aria-label='Downvote'
          aria-pressed={currentVote === -1}
        >
          <ArrowDown size={16} strokeWidth={2} />
        </button>
      </div>
      {/* The post page lists its comments below, so the link is only shown on post cards. */}
      {postPath && (
        <Link
          to={postPath}
          className='inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground'
        >
          <MessageSquare size={15} strokeWidth={1.8} />
          Comments
        </Link>
      )}
    </div>
  );
}
