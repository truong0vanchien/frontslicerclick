import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/FileUpload';
import { ModelViewer } from '@/components/ModelViewer';
import { SlicerParameters } from '@/components/SlicerParameters';
import { SliceProgress } from '@/components/SliceProgress';
import { ProfileSelector } from '@/components/ProfileSelector';
import { Box, Play } from 'lucide-react';
import { toast } from 'sonner';
import {
  uploadModel,
  sliceModel,
  getSliceStatus,
  downloadGCode,
  getSlicerProfiles,
  DEFAULT_PARAMETERS,
} from '@/services/api/slicer-api';
import type { SlicerParameters as SlicerParams, UploadedModel, SliceJob, SlicerProfile } from '@/types/slicer';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedModel, setUploadedModel] = useState<UploadedModel>();
  const [parameters, setParameters] = useState<SlicerParams>(DEFAULT_PARAMETERS);
  const [sliceJob, setSliceJob] = useState<SliceJob>();
  const [isSlicing, setIsSlicing] = useState(false);
  const [profiles, setProfiles] = useState<SlicerProfile[]>([]);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  // Poll for slice status
  useEffect(() => {
    if (sliceJob && (sliceJob.status === 'processing' || sliceJob.status === 'queued')) {
      const interval = setInterval(async () => {
        const response = await getSliceStatus(sliceJob.job_id);
        if (response.success && response.data) {
          setSliceJob(response.data);
          if (response.data.status === 'completed') {
            toast.success('Slicing completed successfully!');
          } else if (response.data.status === 'failed') {
            toast.error('Slicing failed. Please try again.');
          }
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [sliceJob]);

  const loadProfiles = async () => {
    const response = await getSlicerProfiles();
    if (response.success && response.data) {
      setProfiles(response.data);
    }
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    
    try {
      const response = await uploadModel(file);
      if (response.success && response.data) {
        setUploadedModel(response.data);
        toast.success('Model uploaded successfully!');
      } else {
        toast.error(response.error || 'Failed to upload model');
      }
    } catch (error) {
      toast.error('Failed to upload model');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSlice = async () => {
    if (!uploadedModel) {
      toast.error('Please upload a model first');
      return;
    }

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

  const handleDownload = async () => {
    if (!sliceJob) return;

    try {
      const blob = await downloadGCode(sliceJob.job_id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile?.name.replace(/\.(stl|obj)$/i, '')}_sliced.gcode` || 'model.gcode';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('G-code downloaded!');
    } catch (error) {
      toast.error('Failed to download G-code');
    }
  };

  const handleReset = () => {
    setSliceJob(undefined);
    setSelectedFile(undefined);
    setUploadedModel(undefined);
  };

  const handleLoadProfile = (profile: SlicerProfile) => {
    setParameters(profile.parameters);
    toast.success(`Loaded profile: ${profile.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Box className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">3D Slicer</h1>
              <p className="text-sm text-muted-foreground">Professional STL/OBJ to G-code converter</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Parameters */}
          <div className="space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              isUploading={isUploading}
            />

            {uploadedModel && (
              <SlicerParameters
                parameters={parameters}
                onChange={setParameters}
                onLoadProfile={() => setShowProfileSelector(true)}
              />
            )}

            {uploadedModel && !sliceJob && (
              <Button
                onClick={handleSlice}
                disabled={isSlicing}
                className="w-full"
                size="lg"
              >
                {isSlicing ? (
                  <>
                    <Play className="w-4 h-4 mr-2 animate-pulse" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Slicing
                  </>
                )}
              </Button>
            )}

            {sliceJob && <SliceProgress job={sliceJob} onDownload={handleDownload} onReset={handleReset} />}
          </div>

          {/* Right Column - 3D Viewer */}
          <div className="lg:col-span-2">
            <ModelViewer />
          </div>
        </div>
      </main>

      {/* Profile Selector Dialog */}
      <ProfileSelector
        open={showProfileSelector}
        onClose={() => setShowProfileSelector(false)}
        profiles={profiles}
        onSelect={handleLoadProfile}
      />
    </div>
  );
};

export default Index;
