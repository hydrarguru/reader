import { Maximize2, ArrowUp, ArrowDown } from 'lucide-react';

export function ButtonGroup({ postScore }: { postScore: number }) {
  return (
    <div className='flex items-center gap-2'>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <Maximize2 className='rotate-90' />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-green-500'>
        <ArrowUp />
      </button>
      <span className='cursor-default'>{postScore}</span>
      <button className='p-2 rounded-full hover:bg-zinc-900 hover:text-red-500'>
        <ArrowDown />
      </button>
      <button className='p-2 rounded-full hover:bg-zinc-900'>
        <span className='text-gray-400'>16 comments</span>
      </button>
    </div>
  );
}