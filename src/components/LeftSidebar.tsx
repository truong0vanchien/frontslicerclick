import { useState } from 'react';
import { ChevronDown, Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SlicerParameters } from '@/types/slicer';

interface LeftSidebarProps {
  parameters: SlicerParameters;
  onChange: (params: SlicerParameters) => void;
  isAdvanced: boolean;
  onAdvancedToggle: (value: boolean) => void;
}

export const LeftSidebar = ({ parameters, onChange, isAdvanced, onAdvancedToggle }: LeftSidebarProps) => {
  const updateParameter = <K extends keyof SlicerParameters>(
    key: K,
    value: SlicerParameters[K]
  ) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <div className="w-80 bg-[#1a1d23] border-r border-border overflow-y-auto">
      {/* Printer Section */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Printer</span>
        </div>
        <Select defaultValue="a200">
          <SelectTrigger className="w-full bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="a200">a200</SelectItem>
            <SelectItem value="a300">a300</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-2">
          <Label className="text-xs text-muted-foreground">Bed type</Label>
          <Select defaultValue="smooth">
            <SelectTrigger className="w-full bg-card border-border mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="smooth">Smooth High Temp Plate</SelectItem>
              <SelectItem value="textured">Textured Plate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filament Section */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-sm font-medium text-foreground">Filament</span>
        </div>
        <Select defaultValue="abs">
          <SelectTrigger className="w-full bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="abs">abs</SelectItem>
            <SelectItem value="pla">PLA</SelectItem>
            <SelectItem value="petg">PETG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Process Section */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Process</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Advanced</span>
            <Switch checked={isAdvanced} onCheckedChange={onAdvancedToggle} />
          </div>
        </div>
        <Select defaultValue="standard">
          <SelectTrigger className="w-full bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="standard">0.2 a200 for abs</SelectItem>
            <SelectItem value="fine">0.1 Fine Quality</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Parameter Tabs */}
      <div className="p-3">
        <Tabs defaultValue="quality" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-0.5 bg-muted/50 p-0.5">
            <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
            <TabsTrigger value="strength" className="text-xs">Strength</TabsTrigger>
            <TabsTrigger value="speed" className="text-xs">Speed</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-3 gap-0.5 bg-muted/50 p-0.5 mt-1">
            <TabsTrigger value="support" className="text-xs">Support</TabsTrigger>
            <TabsTrigger value="multi" className="text-xs">Multimaterial</TabsTrigger>
            <TabsTrigger value="others" className="text-xs">Others</TabsTrigger>
          </TabsList>

          <TabsContent value="quality" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Layer height</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  value={parameters.layer_height}
                  onChange={(e) => updateParameter('layer_height', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">First layer height</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  value={parameters.layer_height}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <Label className="text-xs font-medium text-foreground">Line width</Label>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Default</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  defaultValue="0.4"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm or %</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Outer wall</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  defaultValue="0.4"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm or %</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Inner wall</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  defaultValue="0.45"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm or %</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Top surface</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  defaultValue="0.42"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm or %</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Sparse infill</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.05"
                  defaultValue="0.4"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm or %</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <Label className="text-xs font-medium text-foreground">Seam</Label>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Seam position</Label>
              <Select defaultValue="aligned">
                <SelectTrigger className="w-full bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="aligned">Aligned</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="nearest">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Wipe speed</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  defaultValue="80"
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm/s or %</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Wipe on loops</Label>
              <Switch defaultChecked />
            </div>
          </TabsContent>

          <TabsContent value="strength" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Wall thickness</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  value={parameters.wall_thickness}
                  onChange={(e) => updateParameter('wall_thickness', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Top/Bottom thickness</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  value={parameters.top_bottom_thickness}
                  onChange={(e) => updateParameter('top_bottom_thickness', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Infill density</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={parameters.infill_density}
                  onChange={(e) => updateParameter('infill_density', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="speed" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Print speed</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={parameters.print_speed}
                  onChange={(e) => updateParameter('print_speed', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">mm/s</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Generate support</Label>
              <Switch
                checked={parameters.support_enabled}
                onCheckedChange={(checked) => updateParameter('support_enabled', checked)}
              />
            </div>

            {parameters.support_enabled && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Support density</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={parameters.support_density}
                    onChange={(e) => updateParameter('support_density', parseFloat(e.target.value))}
                    className="bg-card border-border"
                  />
                  <span className="text-xs text-muted-foreground self-center">%</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="multi" className="mt-4 space-y-3">
            <p className="text-xs text-muted-foreground">Multi-material settings will appear here</p>
          </TabsContent>

          <TabsContent value="others" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Nozzle temperature</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={parameters.nozzle_temperature}
                  onChange={(e) => updateParameter('nozzle_temperature', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">°C</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Bed temperature</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={parameters.bed_temperature}
                  onChange={(e) => updateParameter('bed_temperature', parseFloat(e.target.value))}
                  className="bg-card border-border"
                />
                <span className="text-xs text-muted-foreground self-center">°C</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Enable retraction</Label>
              <Switch
                checked={parameters.retraction_enabled}
                onCheckedChange={(checked) => updateParameter('retraction_enabled', checked)}
              />
            </div>

            {parameters.retraction_enabled && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Retraction distance</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={parameters.retraction_distance}
                      onChange={(e) => updateParameter('retraction_distance', parseFloat(e.target.value))}
                      className="bg-card border-border"
                    />
                    <span className="text-xs text-muted-foreground self-center">mm</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Retraction speed</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={parameters.retraction_speed}
                      onChange={(e) => updateParameter('retraction_speed', parseFloat(e.target.value))}
                      className="bg-card border-border"
                    />
                    <span className="text-xs text-muted-foreground self-center">mm/s</span>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
