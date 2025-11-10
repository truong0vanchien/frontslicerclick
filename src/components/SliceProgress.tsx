import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { SliceJob } from '@/types/slicer';

interface SliceProgressProps {
  job: SliceJob;
  onDownload: () => void;
  onReset: () => void;
}

export const SliceProgress = ({ job, onDownload, onReset }: SliceProgressProps) => {
  const [timeRemaining, setTimeRemaining] = useState(job.estimated_time_remaining || 0);

  useEffect(() => {
    if (job.status === 'processing' && job.estimated_time_remaining) {
      setTimeRemaining(job.estimated_time_remaining);
    }
  }, [job.estimated_time_remaining, job.status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (job.status) {
      case 'completed':
        return 'text-success';
      case 'failed':
        return 'text-destructive';
      case 'processing':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (job.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      default:
        return <Loader2 className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className={`font-semibold ${getStatusColor()}`}>
              {job.status === 'completed' && 'Slicing Complete!'}
              {job.status === 'processing' && 'Slicing in Progress'}
              {job.status === 'queued' && 'Queued for Slicing'}
              {job.status === 'failed' && 'Slicing Failed'}
            </h3>
            <p className="text-sm text-muted-foreground">{job.message}</p>
          </div>
        </div>

        {(job.status === 'processing' || job.status === 'queued') && (
          <>
            <Progress value={job.progress || 0} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {job.progress?.toFixed(0)}% Complete
              </span>
              {timeRemaining > 0 && (
                <span className="text-muted-foreground">
                  ~{formatTime(timeRemaining)} remaining
                </span>
              )}
            </div>
          </>
        )}

        {job.status === 'completed' && (
          <div className="flex gap-2">
            <Button onClick={onDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download G-code
            </Button>
            <Button onClick={onReset} variant="outline">
              New Slice
            </Button>
          </div>
        )}

        {job.status === 'failed' && (
          <Button onClick={onReset} variant="outline" className="w-full">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};
