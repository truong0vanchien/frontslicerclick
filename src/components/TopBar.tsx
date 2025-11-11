import { FileText, Save, FolderOpen, Settings, Home, Undo, Redo, Grid3x3, Upload, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  activeTab: 'home' | 'prepare' | 'preview' | 'device' | 'project';
  onTabChange: (tab: 'home' | 'prepare' | 'preview' | 'device' | 'project') => void;
  onSliceClick: () => void;
  canSlice: boolean;
  onFileSelect?: (file: File) => void;
}

export const TopBar = ({ activeTab, onTabChange, onSliceClick, canSlice, onFileSelect }: TopBarProps) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="h-9 bg-[#1a1d23] border-b border-border flex items-center justify-between px-2">
      {/* Left - File menu and tabs */}
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
              <FileText className="w-3.5 h-3.5 mr-1" />
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#2a2a2a] border-border">
            <DropdownMenuItem className="text-foreground hover:bg-accent/50 cursor-pointer">
              <label className="flex items-center cursor-pointer w-full">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </label>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-accent/50 cursor-pointer">
              <label htmlFor="file-upload" className="flex items-center cursor-pointer w-full">
                <Upload className="w-4 h-4 mr-2" />
                Import STL/3MF
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".stl,.obj,.3mf"
                  onChange={handleFileInput}
                />
              </label>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-accent/50 cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              Open Project
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-foreground hover:bg-accent/50 cursor-pointer">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Grid3x3 className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <FolderOpen className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Undo className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Redo className="w-3.5 h-3.5" />
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        <div className="flex items-center gap-0.5">
          <Button
            variant={activeTab === 'home' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('home')}
            className="h-7 px-2"
          >
            <Home className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant={activeTab === 'prepare' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('prepare')}
            className="h-7 px-3 text-xs"
          >
            <FolderOpen className="w-3.5 h-3.5 mr-1" />
            Prepare
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('preview')}
            className="h-7 px-3 text-xs"
          >
            <FileText className="w-3.5 h-3.5 mr-1" />
            Preview
          </Button>
          <Button
            variant={activeTab === 'device' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('device')}
            className="h-7 px-3 text-xs"
          >
            <Settings className="w-3.5 h-3.5 mr-1" />
            Device
          </Button>
          <Button
            variant={activeTab === 'project' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('project')}
            className="h-7 px-3 text-xs"
          >
            <FolderOpen className="w-3.5 h-3.5 mr-1" />
            Project
          </Button>
        </div>
      </div>

      {/* Center - Project name */}
      <div className="text-xs text-muted-foreground">
        Untitled
      </div>

      {/* Right - Action buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="default"
          size="sm"
          className="h-7 text-xs bg-primary hover:bg-primary/90"
          onClick={onSliceClick}
          disabled={!canSlice}
        >
          Slice plate
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-7 text-xs bg-primary hover:bg-primary/90"
        >
          Print
        </Button>
      </div>
    </div>
  );
};
