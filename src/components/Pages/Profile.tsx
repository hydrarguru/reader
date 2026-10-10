import { useAuth } from '../Auth/AuthProvider';
import { UserAvatar } from '../Common/UserAvatar';

export function Profile() {
  const { session } = useAuth();
  return (
    <div className='flex items-center gap-5'>
      {session && <UserAvatar name={session.username} size={72} ring />}
      <h1 className='font-display text-4xl font-medium tracking-tight'>{session?.username}</h1>
    </div>
  );
}
