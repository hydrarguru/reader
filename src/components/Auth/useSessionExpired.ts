import { useLocation, useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast';

/** Sends the user to the login page after their session ran out, and back here afterwards. */
export function useSessionExpired(): (action: string) => void {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  return (action) => {
    toast({ title: 'Session expired', description: `Please log in again to ${action}.`, duration: 2000 });
    navigate('/login', { state: { from: location.pathname } });
  };
}
