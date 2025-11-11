import { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';

interface ModelViewerProps {
  modelUrl?: string;
}

function Model({ url }: { url?: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!url) {
      setGeometry(null);
      return;
    }

    const loader = new STLLoader();
    loader.load(
      url,
      (loadedGeometry) => {
        loadedGeometry.center();
        setGeometry(loadedGeometry);
      },
      undefined,
      (error) => {
        console.error('Error loading STL:', error);
      }
    );
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#14b8a6" />
    </mesh>
  );
}

export const ModelViewer = ({ modelUrl }: ModelViewerProps) => {
  return (
    <div className="w-full h-full bg-[#0d0f12]">
      <Canvas 
        camera={{ position: [150, 150, 150], fov: 50 }}
        style={{ background: '#0d0f12' }}
      >
        <color attach="background" args={['#0d0f12']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Model url={modelUrl} />
        
        <Grid
          args={[200, 200]}
          position={[0, 0, 0]}
          cellSize={10}
          cellColor="#374151"
          sectionSize={50}
          sectionColor="#4b5563"
          fadeDistance={300}
          fadeStrength={1}
        />
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          mouseButtons={{
            LEFT: undefined,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE
          }}
        />
      </Canvas>
    </div>
  );
};
