import { FileText, Save, FolderOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  activeTab: 'prepare' | 'preview' | 'device' | 'project';
  onTabChange: (tab: 'prepare' | 'preview' | 'device' | 'project') => void;
  onSliceClick: () => void;
  canSlice: boolean;
}

export const TopBar = ({ activeTab, onTabChange, onSliceClick, canSlice }: TopBarProps) => {
  return (
    <div className="h-12 bg-[#1a1d23] border-b border-border flex items-center justify-between px-3">
      {/* Left - File menu and tabs */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
          <FileText className="w-4 h-4 mr-1" />
          File
        </Button>

        <div className="flex items-center gap-0.5 ml-2">
          <Button
            variant={activeTab === 'prepare' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('prepare')}
            className="h-8 px-3"
          >
            <FolderOpen className="w-4 h-4 mr-1" />
            Prepare
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('preview')}
            className="h-8 px-3"
          >
            <FileText className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant={activeTab === 'device' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('device')}
            className="h-8 px-3"
          >
            <Settings className="w-4 h-4 mr-1" />
            Device
          </Button>
          <Button
            variant={activeTab === 'project' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('project')}
            className="h-8 px-3"
          >
            <FolderOpen className="w-4 h-4 mr-1" />
            Project
          </Button>
        </div>
      </div>

      {/* Center - Project name */}
      <div className="text-sm text-muted-foreground">
        Untitled
      </div>

      {/* Right - Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="h-8 bg-primary hover:bg-primary/90"
          onClick={onSliceClick}
          disabled={!canSlice}
        >
          Slice plate
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 bg-primary hover:bg-primary/90"
        >
          Print
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Save className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
