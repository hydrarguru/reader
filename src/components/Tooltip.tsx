import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipProps {
  toolTip: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  delayDur: number;
  children: React.ReactNode;
}
export function ComponentToolTip({ toolTip, align, side, delayDur, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDur || 700}>
        <TooltipTrigger>
            {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{toolTip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
