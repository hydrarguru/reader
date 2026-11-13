import { FormDescription } from '@/components/ui/form';

export function CharacterCount({ value, max }: { value: string; max: number }) {
  return (
    <FormDescription className='text-right text-[13px] tabular-nums'>
      {value.length}/{max}
    </FormDescription>
  );
}
