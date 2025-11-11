import { ChevronDown } from 'lucide-react';

const lineTypes = [
  { name: 'Inner wall', color: '#ff6b35', time: '2h45m', percent: 34.4, length: '25.15m', weight: '62.92g' },
  { name: 'Outer wall', color: '#ffa500', time: '1h17m', percent: 16.0, length: '7.77m', weight: '19.28g' },
  { name: 'Overhang wall', color: '#4ecdc4', time: '46s', percent: 0.2, length: '0.01m', weight: '0.03g' },
  { name: 'Sparse infill', color: '#95e1d3', time: '1h16m', percent: 15.8, length: '12.25m', weight: '30.64g' },
  { name: 'Internal solid infill', color: '#b19cd9', time: '1h12m', percent: 15.1, length: '8.14m', weight: '20.37g' },
  { name: 'Top surface', color: '#ff8787', time: '9m6s', percent: 1.9, length: '1.06m', weight: '2.64g' },
  { name: 'Bottom surface', color: '#ffaaa5', time: '9m20s', percent: 1.9, length: '0.98m', weight: '2.79g' },
  { name: 'Bridge', color: '#00b8a9', time: '22s', percent: '<0.1', length: '0.02m', weight: '0.04g' },
  { name: 'Internal Bridge', color: '#006494', time: '12m37s', percent: 2.6, length: '1.03m', weight: '2.59g' },
  { name: 'Gap infill', color: '#ffe66d', time: '3s', percent: '<0.1', length: '0.00m', weight: '0.00g' },
  { name: 'Brim', color: '#fff3b0', time: '4m16s', percent: 0.9, length: '0.33m', weight: '0.85g' },
  { name: 'Travel', color: '#666666', time: '52m51s', percent: 11.0, length: '-', weight: '-' },
  { name: 'Retract', color: '#444444', time: '-', percent: '-', length: '-', weight: '-' },
  { name: 'Unretract', color: '#888888', time: '-', percent: '-', length: '-', weight: '-' },
  { name: 'Wipe', color: '#aaaaaa', time: '-', percent: '-', length: '-', weight: '-' },
  { name: 'Seams', color: '#cccccc', time: '-', percent: '-', length: '-', weight: '-' },
];

export const LineTypeLegend = () => {
  return (
    <div className="absolute right-4 top-4 w-80 bg-card/95 backdrop-blur border border-border rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Line Type</span>
        </div>
      </div>

      {/* Legend header */}
      <div className="grid grid-cols-4 gap-2 px-3 py-1.5 text-[10px] font-medium text-muted-foreground border-b border-border bg-muted/20">
        <div className="col-span-1">Line Type</div>
        <div className="text-right">Time</div>
        <div className="text-right">%</div>
        <div className="text-right">Usage</div>
      </div>

      {/* Legend items */}
      <div className="max-h-96 overflow-y-auto">
        {lineTypes.map((type, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 px-3 py-1 text-[10px] hover:bg-muted/20 cursor-pointer border-b border-border/50"
          >
            <div className="col-span-1 flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: type.color }} />
              <span className="text-foreground truncate">{type.name}</span>
            </div>
            <div className="text-right text-muted-foreground">{type.time}</div>
            <div className="text-right text-muted-foreground">{type.percent}</div>
            <div className="text-right text-muted-foreground">{type.length}</div>
          </div>
        ))}
      </div>

      {/* Total estimation */}
      <div className="border-t border-border bg-muted/30 p-3">
        <div className="text-xs font-medium text-foreground mb-2">Total estimation</div>
        <div className="space-y-1 text-[10px] text-muted-foreground">
          <div className="flex justify-between">
            <span>Total Filament:</span>
            <span className="text-foreground">57.34 m</span>
          </div>
          <div className="flex justify-between">
            <span>Model Filament:</span>
            <span className="text-foreground">143.43 g</span>
          </div>
          <div className="flex justify-between">
            <span>Cost:</span>
            <span className="text-foreground">2.87</span>
          </div>
          <div className="flex justify-between">
            <span>Prepare time:</span>
            <span className="text-foreground">&lt;1s</span>
          </div>
          <div className="flex justify-between">
            <span>Model printing time:</span>
            <span className="text-foreground font-medium">8h0m</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-foreground">Total time:</span>
            <span className="text-foreground">8h0m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
