import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export function CustomToolTipComponent({
  triggerer = "Hover",
  toolValue = "Biriyani",
}: {
  triggerer?: string | ReactNode;
  toolValue?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerer}</TooltipTrigger>
        <TooltipContent className="min-w-24 bg-black text-white">
          <p>{toolValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
