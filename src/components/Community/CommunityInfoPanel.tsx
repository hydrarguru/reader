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
  const rules = community.community_rules ?? [];

  return (
    <div className='flex flex-col gap-6 rounded-lg border border-border bg-card p-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>
          Rules of c/{community.community_name}
        </h2>
        {rules.length === 0 ? (
          <p className='py-2 text-sm text-muted-foreground'>No rules yet.</p>
        ) : (
          <Accordion type='single' collapsible className='w-full'>
            {rules.map((rule, index) => (
              <AccordionItem key={index} value={`rule-${index + 1}`} className={index === rules.length - 1 ? 'border-b-0' : undefined}>
                <AccordionTrigger>{rule.rule_title}</AccordionTrigger>
                {rule.rule_desc && <AccordionContent>{rule.rule_desc}</AccordionContent>}
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
