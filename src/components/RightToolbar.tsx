import { Move, RotateCw, Scale, FlipHorizontal, Grid3x3, Scissors, Box as BoxIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const RightToolbar = () => {
  return (
    <TooltipProvider>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-card/95 backdrop-blur border border-border rounded-lg p-1 shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Move className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Move (T)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Scale className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Scale (S)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <RotateCw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Rotate (R)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <FlipHorizontal className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Mirror</p>
          </TooltipContent>
        </Tooltip>

        <div className="h-px bg-border my-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Grid3x3 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Arrange</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Scissors className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Split</p>
          </TooltipContent>
        </Tooltip>

        <div className="h-px bg-border my-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Upload className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Import STL/3MF</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
