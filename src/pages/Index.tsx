import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { LeftSidebar } from '@/components/LeftSidebar';
import { ModelViewer } from '@/components/ModelViewer';
import { RightToolbar } from '@/components/RightToolbar';
import { LineTypeLegend } from '@/components/LineTypeLegend';
import { toast } from 'sonner';
import {
  sliceModel,
  getSliceStatus,
  DEFAULT_PARAMETERS,
} from '@/services/api/slicer-api';
import type { SlicerParameters as SlicerParams, SliceJob } from '@/types/slicer';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'prepare' | 'preview' | 'device' | 'project'>('prepare');
  const [parameters, setParameters] = useState<SlicerParams>(DEFAULT_PARAMETERS);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [sliceJob, setSliceJob] = useState<SliceJob>();
  const [isSlicing, setIsSlicing] = useState(false);

  // Mock uploaded model for demo
  const uploadedModel = {
    model_id: 'demo-model-id',
    filename: 'demo.stl',
    file_size: 1024000,
    bounds: {
      x: { min: 0, max: 100 },
      y: { min: 0, max: 100 },
      z: { min: 0, max: 50 },
    },
    uploaded_at: new Date().toISOString(),
  };

  // Poll for slice status
  useEffect(() => {
    if (sliceJob && (sliceJob.status === 'processing' || sliceJob.status === 'queued')) {
      const interval = setInterval(async () => {
        const response = await getSliceStatus(sliceJob.job_id);
        if (response.success && response.data) {
          setSliceJob(response.data);
          if (response.data.status === 'completed') {
            toast.success('Slicing completed successfully!');
            setActiveTab('preview');
          } else if (response.data.status === 'failed') {
            toast.error('Slicing failed. Please try again.');
          }
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [sliceJob]);

  const handleSlice = async () => {
    setIsSlicing(true);
    try {
      const response = await sliceModel(uploadedModel.model_id, parameters);
      if (response.success && response.data) {
        setSliceJob(response.data);
        toast.success('Slicing started!');
      } else {
        toast.error(response.error || 'Failed to start slicing');
      }
    } catch (error) {
      toast.error('Failed to start slicing');
    } finally {
      setIsSlicing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      {/* Top Bar */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSliceClick={handleSlice}
        canSlice={!isSlicing}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Only show on Prepare and Preview tabs */}
        {(activeTab === 'prepare' || activeTab === 'preview') && (
          <LeftSidebar
            parameters={parameters}
            onChange={setParameters}
            isAdvanced={isAdvanced}
            onAdvancedToggle={setIsAdvanced}
          />
        )}

        {/* Center - 3D Viewer */}
        <div className="flex-1 relative bg-[#0d0f12]">
          {activeTab === 'prepare' && (
            <>
              <ModelViewer />
              <RightToolbar />
              
              {/* Plate indicator bottom-left */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur border border-border rounded px-3 py-1.5 text-sm text-foreground">
                Plate <span className="text-primary font-medium">01</span>
              </div>
            </>
          )}

          {activeTab === 'preview' && (
            <>
              <ModelViewer />
              <LineTypeLegend />
              
              {/* Layer slider - would go here */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur border border-border rounded px-4 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Layer:</span>
                  <div className="w-64 h-1 bg-muted rounded-full">
                    <div className="w-1/2 h-full bg-primary rounded-full" />
                  </div>
                  <span className="text-xs text-foreground font-medium">1451 / 2902</span>
                </div>
              </div>

              {/* G-code console bottom-right */}
              <div className="absolute bottom-4 right-4 w-96 bg-card/95 backdrop-blur border border-border rounded-lg overflow-hidden">
                <div className="px-3 py-1.5 bg-muted/30 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">G-code Preview</span>
                  <span className="text-[10px] text-muted-foreground">23/37</span>
                </div>
                <div className="p-2 font-mono text-[10px] text-foreground space-y-0.5 max-h-32 overflow-y-auto">
                  <div className="text-orange-400">1328213 G1 X42.268 Y72.762 E.05326</div>
                  <div className="text-muted-foreground">1328214 ; stop printing object Iconner&bedsp3.stl id:1 copy 0</div>
                  <div className="text-green-400">1328215 G1 E-.28 F1800</div>
                  <div className="text-muted-foreground">1328216 ;WIPE_START</div>
                  <div className="text-orange-400">1328217 G1 F4200</div>
                  <div className="text-orange-400">1328218 G1 X40.853 Y74.176 E-.12</div>
                  <div className="text-muted-foreground">1328219 ;WIPE_END</div>
                  <div className="text-yellow-400">1328220 ;EXCLUDE_OBJECT_END NAME=Iconner_bedsp3.stl_id_1_copy_0</div>
                  <div className="text-blue-400">1328221 M106 S0</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'device' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Device tab</p>
                <p className="text-sm mt-2">Connect to your 3D printer</p>
              </div>
            </div>
          )}

          {activeTab === 'project' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Project tab</p>
                <p className="text-sm mt-2">Manage your 3MF projects</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
