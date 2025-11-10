import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Box } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Maximize2 } from 'lucide-react';

interface ModelViewerProps {
  modelUrl?: string;
}

export const ModelViewer = ({ modelUrl }: ModelViewerProps) => {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">3D Preview</h2>
        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
          <Maximize2 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="bg-muted rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <Canvas camera={{ position: [150, 150, 150], fov: 50 }}>
          <color attach="background" args={['hsl(var(--muted))']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          {/* Sample model - replace with actual STL loader when file is uploaded */}
          <Box args={[50, 50, 25]} position={[0, 25, 0]}>
            <meshStandardMaterial color="hsl(var(--primary))" />
          </Box>
          
          <Grid
            args={[200, 200]}
            position={[0, 0, 0]}
            cellSize={10}
            cellColor="#6b7280"
            sectionSize={50}
            sectionColor="#374151"
            fadeDistance={300}
            fadeStrength={1}
          />
          
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      <div className="mt-4 text-xs text-muted-foreground space-y-1">
        <p>• Left click + drag to rotate</p>
        <p>• Right click + drag to pan</p>
        <p>• Scroll to zoom</p>
      </div>
    </Card>
  );
};
