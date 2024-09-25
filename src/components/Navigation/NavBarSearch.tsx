import { Input } from '@/components/ui/input';

import { Search as SearchIcon } from 'lucide-react';

//TODO: fix input focus ring border radius
export function NavBarSearch() {
  return (
    <div className='relative'>
      <SearchIcon
        className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'
        size={40}
        color='rgb(222,222,222)'
      />
    <div className='flex items-center'>
      <Input
        className='rounded-sm lg:w-[600px] md:w-[420px] sm:w-[260px] pl-12 text-gray-500'
        placeholder='Search reader'
      />
    </div>
    </div>
  );
}
