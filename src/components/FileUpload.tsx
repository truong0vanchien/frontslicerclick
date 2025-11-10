import { useCallback } from 'react';
import { Upload, File } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File;
  isUploading?: boolean;
}

export const FileUpload = ({ onFileSelect, selectedFile, isUploading }: FileUploadProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.stl') || file.name.endsWith('.obj'))) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Upload 3D Model</h2>
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isUploading 
            ? "border-muted bg-muted/50 cursor-not-allowed" 
            : "border-border hover:border-primary hover:bg-accent/5 cursor-pointer"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".stl,.obj"
          onChange={handleFileInput}
          disabled={isUploading}
        />
        
        <label htmlFor="file-upload" className="cursor-pointer block">
          {selectedFile ? (
            <div className="space-y-2">
              <File className="w-12 h-12 mx-auto text-primary" />
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {!isUploading && (
                <p className="text-xs text-muted-foreground mt-2">
                  Click or drag to replace
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="font-medium text-foreground">
                Drop your STL or OBJ file here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Maximum file size: 50MB
              </p>
            </div>
          )}
        </label>
      </div>

      {isUploading && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Uploading model...
        </div>
      )}
    </Card>
  );
};
