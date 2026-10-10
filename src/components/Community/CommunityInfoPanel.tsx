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

export function CommunityInformationPanel({ community }: communityInformationPanelProps) {
  return (
    <div className='flex flex-col gap-6 rounded-lg border border-border bg-card p-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>
          Rules of c/{community.community_name}
        </h2>
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
          <AccordionItem value='rule-3' className='border-b-0'>
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
