import { useAuth } from '../Auth/AuthProvider';

export function Profile() {
  const { session } = useAuth();
  return (
    <div className='my-8'>
      <h1 className='text-3xl font-extrabold tracking-tight'>{session?.username}</h1>
    </div>
  );
}
