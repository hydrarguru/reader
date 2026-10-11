import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';

import { Community } from '@/types/CommunityType';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const communityFormSchema = z.object({
  // Same rule as the backend's validateCommunityName.
  community_name: z
    .string()
    .regex(/^[a-zA-Z_]{1,20}$/, { message: 'Use 1 to 20 letters or underscores.' }),
  community_desc: z
    .string()
    .trim()
    .min(1, { message: 'Add a description.' })
    .max(255, { message: 'Keep the description under 255 characters.' }),
  community_image_url: z
    .string()
    .trim()
    .max(255, { message: 'Keep the URL under 255 characters.' })
    .refine((value) => value === '' || /^https?:\/\/\S+$/.test(value), { message: 'Enter a full http(s) URL, or leave it empty.' }),
  community_rules: z.array(
    z.object({
      rule_title: z.string().trim().min(1, { message: 'Give the rule a title.' }),
      rule_desc: z.string().trim(),
    })
  ),
});

export type CommunityFormValues = z.infer<typeof communityFormSchema>;

interface CommunityFormDialogProps {
  /** The community to edit, or null to create a new one. */
  community: Community | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CommunityFormValues) => Promise<void>;
}

function toFormValues(community: Community | null): CommunityFormValues {
  return {
    community_name: community?.community_name ?? '',
    community_desc: community?.community_desc ?? '',
    community_image_url: community?.community_image_url ?? '',
    community_rules: community?.community_rules ?? [],
  };
}

export function CommunityFormDialog({ community, open, onOpenChange, onSubmit }: CommunityFormDialogProps) {
  const isEditing = community !== null;
  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: toFormValues(community),
  });
  const rules = useFieldArray({ control: form.control, name: 'community_rules' });

  // Start from the chosen community each time the dialog opens.
  useEffect(() => {
    if (open) form.reset(toFormValues(community));
  }, [open, community, form]);

  const bannerUrl = form.watch('community_image_url');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='font-display text-3xl font-medium tracking-tight'>
            {isEditing ? `Edit c/${community.community_name}` : 'New community'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Change the description, banner and rules.' : 'The name is part of the URL and cannot be changed later.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='community_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='book_club' autoComplete='off' disabled={isEditing} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='community_desc'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder='What is this community about?' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='community_image_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner image URL</FormLabel>
                  <FormControl>
                    <Input type='url' placeholder='https://…' autoComplete='off' {...field} />
                  </FormControl>
                  <FormDescription>Shown across the top of the community page.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div aria-hidden className='h-24 overflow-hidden rounded-lg border border-border bg-sage'>
              {/^https?:\/\/\S+$/.test(bannerUrl) && <img src={bannerUrl} alt='' className='h-full w-full object-cover' />}
            </div>

            {isEditing && (
              <fieldset className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <legend className='text-sm font-medium'>Rules</legend>
                  <Button type='button' variant='outline' size='sm' onClick={() => rules.append({ rule_title: '', rule_desc: '' })}>
                    <Plus size={16} className='mr-1' />
                    Add rule
                  </Button>
                </div>
                {rules.fields.length === 0 && <p className='text-sm text-muted-foreground'>No rules yet.</p>}
                {rules.fields.map((rule, index) => (
                  <div key={rule.id} className='space-y-2 rounded-lg border border-border p-3'>
                    <div className='flex items-start gap-2'>
                      <FormField
                        control={form.control}
                        name={`community_rules.${index}.rule_title`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel className='sr-only'>Rule {index + 1} title</FormLabel>
                            <FormControl>
                              <Input placeholder={`Rule ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='button' variant='ghost' size='icon' aria-label={`Remove rule ${index + 1}`} onClick={() => rules.remove(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`community_rules.${index}.rule_desc`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='sr-only'>Rule {index + 1} details</FormLabel>
                          <FormControl>
                            <Textarea rows={2} placeholder='Details (optional)' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </fieldset>
            )}

            <DialogFooter className='gap-2 pt-2'>
              <Button type='button' variant='ghost' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Create community'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
