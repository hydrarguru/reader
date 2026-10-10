import { Input } from '@/components/ui/input';

import { Search as SearchIcon } from 'lucide-react';

//TODO: fix input focus ring border radius
export function NavBarSearch() {
  return (
    <div className='relative'>
      <SearchIcon
        size={18}
        className='absolute inset-y-0 left-0 my-auto ml-3 pointer-events-none text-muted-foreground'
      />
    <div className='flex items-center'>
      <Input
        className='rounded-full lg:w-[600px] md:w-[420px] sm:w-[260px] pl-10'
        placeholder='Search reader'
      />
    </div>
    </div>
  );
}
