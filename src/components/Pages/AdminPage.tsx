import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useRevalidator } from 'react-router';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { ApiError } from '@/api/client';
import { createCommunity, deleteCommunity, updateCommunity } from '@/api/communities';
import { Community } from '@/types/CommunityType';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthProvider';
import { WithCommunities } from '../Common/WithCommunities';
import { CommunityFormDialog, CommunityFormValues } from '../Admin/CommunityFormDialog';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

type FormState = { open: false } | { open: true; community: Community | null };

function CommunityRow({ community, onEdit, onDelete }: { community: Community; onEdit: () => void; onDelete: () => void }) {
  return (
    <li className='flex items-center gap-4 rounded-lg border border-border bg-card p-4'>
      <div className='h-12 w-20 flex-none overflow-hidden rounded-md bg-sage'>
        {community.community_image_url && <img src={community.community_image_url} alt='' className='h-full w-full object-cover' />}
      </div>
      <div className='min-w-0 flex-1'>
        <Link to={`/c/${community.community_name}`} className='font-semibold hover:text-brand-ink'>
          c/{community.community_name}
        </Link>
        <p className='truncate text-sm text-muted-foreground'>{community.community_desc}</p>
      </div>
      <div className='flex flex-none gap-1'>
        <Button variant='ghost' size='icon' aria-label={`Edit c/${community.community_name}`} onClick={onEdit}>
          <Pencil size={16} />
        </Button>
        <Button variant='ghost' size='icon' aria-label={`Delete c/${community.community_name}`} onClick={onDelete}>
          <Trash2 size={16} />
        </Button>
      </div>
    </li>
  );
}

export function AdminPage() {
  const [formState, setFormState] = useState<FormState>({ open: false });
  const [pendingDelete, setPendingDelete] = useState<Community | null>(null);
  const { toast } = useToast();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();

  useEffect(() => {
    document.title = 'Reader - Admin';
  }, []);

  /** Shows a toast for a failed request; a 401 sends the user to log in again. */
  function handleError(action: string, err: unknown) {
    if (err instanceof ApiError && err.status === 401) {
      toast({ title: 'Session expired', description: 'Please log in again.', duration: 2000 });
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    toast({
      title: `Couldn't ${action}`,
      description: err instanceof Error ? err.message : 'Unknown error',
      duration: 3000,
    });
  }

  async function handleSubmit(values: CommunityFormValues) {
    if (!formState.open) return;
    const editing = formState.community;
    try {
      if (editing === null) {
        await createCommunity({
          community_name: values.community_name,
          community_desc: values.community_desc,
          community_image_url: values.community_image_url || undefined,
        });
        toast({ title: 'Community created', description: `c/${values.community_name} is live.`, duration: 1500 });
      } else {
        await updateCommunity(editing.community_id, {
          community_desc: values.community_desc,
          community_image_url: values.community_image_url,
          community_rules: values.community_rules,
        });
        toast({ title: 'Changes saved', description: `c/${editing.community_name} has been updated.`, duration: 1500 });
      }
      setFormState({ open: false });
      revalidate();
    } catch (err) {
      handleError(editing === null ? 'create the community' : 'save changes', err);
    }
  }

  async function handleDelete(community: Community) {
    try {
      await deleteCommunity(community.community_id);
      toast({ title: 'Community deleted', description: `c/${community.community_name} is gone.`, duration: 1500 });
      revalidate();
    } catch (err) {
      handleError('delete the community', err);
    }
  }

  if (!session?.is_admin) {
    return (
      <div className='mx-auto max-w-4xl'>
        <h1 className='font-display text-5xl font-medium tracking-tight'>Admin</h1>
        <p className='mt-2 text-muted-foreground'>
          Only admins can manage communities. If you were just made an admin, log out and in again.
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-6'>
      <div className='mb-2 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='font-display text-5xl font-medium tracking-tight'>Admin</h1>
          <p className='mt-2 text-muted-foreground'>Create, edit and delete communities.</p>
        </div>
        <Button onClick={() => setFormState({ open: true, community: null })}>
          <Plus size={16} className='mr-1' />
          New community
        </Button>
      </div>

      <WithCommunities
        fallback={<p className='text-sm text-muted-foreground'>Loading communities…</p>}
        errorElement={<p className='text-sm text-muted-foreground'>Couldn't load communities.</p>}
      >
        {(communities) =>
          communities.length === 0 ? (
            <p className='rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground'>No communities yet.</p>
          ) : (
            <ul className='flex flex-col gap-3'>
              {[...communities]
                .sort((a, b) => a.community_name.localeCompare(b.community_name))
                .map((community) => (
                  <CommunityRow
                    key={community.community_id}
                    community={community}
                    onEdit={() => setFormState({ open: true, community })}
                    onDelete={() => setPendingDelete(community)}
                  />
                ))}
            </ul>
          )
        }
      </WithCommunities>

      <CommunityFormDialog
        community={formState.open ? formState.community : null}
        open={formState.open}
        onOpenChange={(open) => !open && setFormState({ open: false })}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete c/{pendingDelete?.community_name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes the community with all its posts and comments. It can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              onClick={() => pendingDelete && handleDelete(pendingDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
