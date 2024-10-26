import { useState } from 'react';
import { Community } from '@/types/CommunityType';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface communityInformationPanelProps {
  community: Community;
}

export function CommunityInformationPanel(
  communityInformationPanelProps: communityInformationPanelProps
) {
  const [activeCommunity] = useState<Community | null>(communityInformationPanelProps.community);

  return (
    <div className='flex flex-col gap-4 dark:bg-zinc-900 p-4 border rounded-md'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-semibold'>Community Information:</h2>
        <span className='text-sm italic text-black dark:text-white'>
          {activeCommunity?.community_desc}
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Community Rules:</h2>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='rule-1'>
            <AccordionTrigger>Rule 1</AccordionTrigger>
            <AccordionContent>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='rule-2'>
            <AccordionTrigger>Rule 2</AccordionTrigger>
            <AccordionContent>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='rule-3'>
            <AccordionTrigger>Rule 3</AccordionTrigger>
            <AccordionContent>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
