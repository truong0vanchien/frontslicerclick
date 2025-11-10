import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SlicerProfile } from '@/types/slicer';
import { CheckCircle2 } from 'lucide-react';

interface ProfileSelectorProps {
  open: boolean;
  onClose: () => void;
  profiles: SlicerProfile[];
  onSelect: (profile: SlicerProfile) => void;
}

export const ProfileSelector = ({ open, onClose, profiles, onSelect }: ProfileSelectorProps) => {
  const handleSelect = (profile: SlicerProfile) => {
    onSelect(profile);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Slicer Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="p-4 cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleSelect(profile)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{profile.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Layer Height:</span>{' '}
                      <span className="font-medium">{profile.parameters.layer_height}mm</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Infill:</span>{' '}
                      <span className="font-medium">{profile.parameters.infill_density}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Print Speed:</span>{' '}
                      <span className="font-medium">{profile.parameters.print_speed}mm/s</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nozzle Temp:</span>{' '}
                      <span className="font-medium">{profile.parameters.nozzle_temperature}°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
