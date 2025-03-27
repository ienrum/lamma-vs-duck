import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { HELP_BUTTON_TOOLTIP } from '../constants/topbar';

export const HelpButton = ({ className }: { className?: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className={cn('hover:bg-gray-100', className)}>
            <HelpCircle className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{HELP_BUTTON_TOOLTIP}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}; 