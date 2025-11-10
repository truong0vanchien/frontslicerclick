import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlicerParameters as SlicerParams } from '@/types/slicer';
import { Settings, Thermometer, Layers } from 'lucide-react';

interface SlicerParametersProps {
  parameters: SlicerParams;
  onChange: (parameters: SlicerParams) => void;
  onLoadProfile: () => void;
}

export const SlicerParameters = ({ parameters, onChange, onLoadProfile }: SlicerParametersProps) => {
  const updateParameter = <K extends keyof SlicerParams>(
    key: K,
    value: SlicerParams[K]
  ) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Slicer Settings</h2>
        <Button variant="outline" size="sm" onClick={onLoadProfile}>
          Load Profile
        </Button>
      </div>

      <Tabs defaultValue="quality" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quality">
            <Layers className="w-4 h-4 mr-2" />
            Quality
          </TabsTrigger>
          <TabsTrigger value="temperature">
            <Thermometer className="w-4 h-4 mr-2" />
            Temperature
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Settings className="w-4 h-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="layer-height">Layer Height (mm)</Label>
            <Input
              id="layer-height"
              type="number"
              step="0.05"
              min="0.05"
              max="0.4"
              value={parameters.layer_height}
              onChange={(e) => updateParameter('layer_height', parseFloat(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Lower = better quality, longer print time</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="infill">Infill Density (%)</Label>
            <Input
              id="infill"
              type="number"
              min="0"
              max="100"
              value={parameters.infill_density}
              onChange={(e) => updateParameter('infill_density', parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="print-speed">Print Speed (mm/s)</Label>
            <Input
              id="print-speed"
              type="number"
              min="10"
              max="150"
              value={parameters.print_speed}
              onChange={(e) => updateParameter('print_speed', parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wall-thickness">Wall Thickness (mm)</Label>
            <Input
              id="wall-thickness"
              type="number"
              step="0.1"
              min="0.4"
              max="5.0"
              value={parameters.wall_thickness}
              onChange={(e) => updateParameter('wall_thickness', parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="top-bottom">Top/Bottom Thickness (mm)</Label>
            <Input
              id="top-bottom"
              type="number"
              step="0.1"
              min="0.4"
              max="5.0"
              value={parameters.top_bottom_thickness}
              onChange={(e) => updateParameter('top_bottom_thickness', parseFloat(e.target.value))}
            />
          </div>
        </TabsContent>

        <TabsContent value="temperature" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nozzle-temp">Nozzle Temperature (°C)</Label>
            <Input
              id="nozzle-temp"
              type="number"
              min="180"
              max="300"
              value={parameters.nozzle_temperature}
              onChange={(e) => updateParameter('nozzle_temperature', parseFloat(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Typical PLA: 190-220°C</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bed-temp">Bed Temperature (°C)</Label>
            <Input
              id="bed-temp"
              type="number"
              min="0"
              max="120"
              value={parameters.bed_temperature}
              onChange={(e) => updateParameter('bed_temperature', parseFloat(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Typical PLA: 50-60°C</p>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="support">Generate Support</Label>
              <p className="text-xs text-muted-foreground">
                Add support structures for overhangs
              </p>
            </div>
            <Switch
              id="support"
              checked={parameters.support_enabled}
              onCheckedChange={(checked) => updateParameter('support_enabled', checked)}
            />
          </div>

          {parameters.support_enabled && (
            <div className="space-y-2">
              <Label htmlFor="support-density">Support Density (%)</Label>
              <Input
                id="support-density"
                type="number"
                min="5"
                max="50"
                value={parameters.support_density}
                onChange={(e) => updateParameter('support_density', parseFloat(e.target.value))}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="retraction">Enable Retraction</Label>
              <p className="text-xs text-muted-foreground">
                Pull back filament during travel moves
              </p>
            </div>
            <Switch
              id="retraction"
              checked={parameters.retraction_enabled}
              onCheckedChange={(checked) => updateParameter('retraction_enabled', checked)}
            />
          </div>

          {parameters.retraction_enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="retraction-distance">Retraction Distance (mm)</Label>
                <Input
                  id="retraction-distance"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={parameters.retraction_distance}
                  onChange={(e) => updateParameter('retraction_distance', parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retraction-speed">Retraction Speed (mm/s)</Label>
                <Input
                  id="retraction-speed"
                  type="number"
                  min="10"
                  max="100"
                  value={parameters.retraction_speed}
                  onChange={(e) => updateParameter('retraction_speed', parseFloat(e.target.value))}
                />
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
