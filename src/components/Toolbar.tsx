import { Move, Scale, RotateCw, FlipHorizontal, Grid3x3, Scissors, Combine, Upload, Home as HomeIcon, MousePointer2, Box, Layers, Type, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ToolbarProps {
  onFileSelect?: (file: File) => void;
}

export const Toolbar = ({ onFileSelect }: ToolbarProps) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const tools = [
    { icon: MousePointer2, label: 'Select', shortcut: 'Q' },
    { icon: Move, label: 'Move', shortcut: 'T' },
    { icon: Scale, label: 'Scale', shortcut: 'S' },
    { icon: RotateCw, label: 'Rotate', shortcut: 'R' },
    { icon: FlipHorizontal, label: 'Mirror', shortcut: 'M' },
    { icon: Grid3x3, label: 'Arrange', shortcut: 'A' },
    { icon: Scissors, label: 'Split', shortcut: '' },
    { icon: Combine, label: 'Boolean', shortcut: '' },
    { icon: Box, label: 'Add Primitive', shortcut: '' },
    { icon: Layers, label: 'Layer', shortcut: '' },
    { icon: Type, label: 'Text', shortcut: '' },
    { icon: Ruler, label: 'Measure', shortcut: '' },
  ];

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#2a2a2a]/95 backdrop-blur border border-border rounded-lg px-2 py-1.5 flex items-center gap-1 shadow-lg z-10">
      <TooltipProvider delayDuration={300}>
        {tools.map((tool, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-accent/50"
              >
                <tool.icon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-[#1a1d23] border-border text-xs">
              <p>{tool.label} {tool.shortcut && <span className="text-muted-foreground ml-1">({tool.shortcut})</span>}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        <div className="h-5 w-px bg-border mx-1" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent/50"
            >
              <label htmlFor="toolbar-file-upload" className="cursor-pointer flex items-center justify-center w-full h-full">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <input
                  type="file"
                  id="toolbar-file-upload"
                  className="hidden"
                  accept=".stl,.obj,.3mf"
                  onChange={handleFileInput}
                />
              </label>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1a1d23] border-border text-xs">
            <p>Import STL/3MF</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent/50"
            >
              <HomeIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1a1d23] border-border text-xs">
            <p>Reset View (F)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
