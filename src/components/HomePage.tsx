import { Plus, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface HomePageProps {
  onFileSelect?: (file: File) => void;
  onTabChange: (tab: 'prepare') => void;
}

export const HomePage = ({ onFileSelect, onTabChange }: HomePageProps) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
      onTabChange('prepare');
    }
  };

  const recentProjects = [
    { name: 'Iconner&bedsp3.3mf', date: '2025-11-06 18:41:25', thumbnail: null },
    { name: 'skirt x3 & mirro x2.3mf', date: '2025-11-06 18:19:44', thumbnail: null },
    { name: 'bottom coner x3.3mf', date: '2025-10-23 20:23:28', thumbnail: null },
  ];

  return (
    <div className="flex-1 bg-background p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl">
          <Card className="p-6 hover:bg-accent/5 transition-colors cursor-pointer border-2 border-dashed border-border">
            <label htmlFor="home-file-upload" className="cursor-pointer flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">New Project</h3>
                <p className="text-sm text-muted-foreground">Create new project</p>
              </div>
              <input
                type="file"
                id="home-file-upload"
                className="hidden"
                accept=".stl,.obj,.3mf"
                onChange={handleFileInput}
              />
            </label>
          </Card>

          <Card className="p-6 hover:bg-accent/5 transition-colors cursor-pointer border-2 border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Open Project</h3>
                <p className="text-sm text-muted-foreground">3mf</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recently opened</h2>
          <button className="text-sm text-primary hover:underline">Clear all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recentProjects.map((project, index) => (
            <Card key={index} className="p-0 overflow-hidden hover:bg-accent/5 transition-colors cursor-pointer">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <div className="text-6xl text-muted-foreground/20">📦</div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{project.date}</p>
              </div>
            </Card>
          ))}
          
          {/* Placeholder cards */}
          {[...Array(12)].map((_, index) => (
            <Card key={`placeholder-${index}`} className="p-0 overflow-hidden opacity-40">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground">File is missing</p>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">Untitled.3mf</p>
                <p className="text-xs text-muted-foreground mt-1">2025-08-17 23:40:18</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
