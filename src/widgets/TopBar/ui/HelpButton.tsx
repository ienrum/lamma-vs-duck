import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { HELP_BUTTON_TOOLTIP } from '../constants/topbar';
import { Dialog } from '@/components/ui/dialog';
import { MarkdownRenderer } from '@/src/shared/ui/MarkdownRenderer/ui/MarkdownRenderer';

export const HelpButton = ({
  className,
  gameRuleTitle,
  gameRuleScript,
}: {
  className?: string;
  gameRuleTitle: string;
  gameRuleScript: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog
            title={gameRuleTitle}
            trigger={
              <Button
                data-testid="dialog-trigger"
                variant="ghost"
                size="icon"
                className={cn('hover:bg-gray-100', className)}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            }
          >
            <div className="prose max-w-none">
              <MarkdownRenderer content={gameRuleScript} />
            </div>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>{HELP_BUTTON_TOOLTIP}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
