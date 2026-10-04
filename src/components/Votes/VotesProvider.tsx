import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getMyVotes, votePost, Vote } from '@/api/posts';
import { useAuth } from '../Auth/AuthProvider';

interface VotesContextValue {
  /** The logged-in user's vote on a post, 0 if none (or not logged in). */
  getVote: (postId: string) => Vote;
  /** Saves a vote and returns the post's new score. Rolls the vote back and rethrows on failure. */
  castVote: (postId: string, vote: Vote) => Promise<number>;
}

const VotesContext = createContext<VotesContextValue | null>(null);

export function VotesProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const userId = session?.user_id ?? null;
  const [votes, setVotesState] = useState<Map<string, Vote>>(new Map());
  // Mirror of `votes` for reading the current value inside castVote without waiting for a render.
  const votesRef = useRef(votes);
  const setVotes = useCallback((next: Map<string, Vote>) => {
    votesRef.current = next;
    setVotesState(next);
  }, []);

  // Load the user's votes once per login, and forget them on logout.
  useEffect(() => {
    setVotes(new Map());
    if (userId === null) return;
    let cancelled = false;
    getMyVotes()
      .then((list) => {
        if (!cancelled) setVotes(new Map(list.map(({ post_id, vote }) => [post_id, vote])));
      })
      .catch((err) => console.error('Could not load votes', err));
    return () => {
      cancelled = true;
    };
  }, [userId, setVotes]);

  const getVote = useCallback((postId: string): Vote => votes.get(postId) ?? 0, [votes]);

  const castVote = useCallback(async (postId: string, vote: Vote): Promise<number> => {
    const setVote = (value: Vote) => {
      const next = new Map(votesRef.current);
      if (value === 0) next.delete(postId);
      else next.set(postId, value);
      setVotes(next);
    };

    const previous = votesRef.current.get(postId) ?? 0;
    setVote(vote);
    try {
      const result = await votePost(postId, vote);
      setVote(result.vote);
      return result.post_score;
    } catch (err) {
      setVote(previous);
      throw err;
    }
  }, [setVotes]);

  return <VotesContext.Provider value={{ getVote, castVote }}>{children}</VotesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVotes(): VotesContextValue {
  const context = useContext(VotesContext);
  if (context === null) throw new Error('useVotes must be used inside VotesProvider');
  return context;
}
