export interface SlicerParameters {
  layer_height: number;
  infill_density: number;
  print_speed: number;
  nozzle_temperature: number;
  bed_temperature: number;
  support_enabled: boolean;
  support_density: number;
  wall_thickness: number;
  top_bottom_thickness: number;
  retraction_enabled: boolean;
  retraction_distance: number;
  retraction_speed: number;
}

export interface ModelBounds {
  x: { min: number; max: number };
  y: { min: number; max: number };
  z: { min: number; max: number };
}

export interface UploadedModel {
  model_id: string;
  filename: string;
  file_size: number;
  bounds: ModelBounds;
  uploaded_at: string;
}

export interface SliceJob {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress?: number;
  message?: string;
  estimated_time?: number;
  estimated_time_remaining?: number;
}

export interface SlicerProfile {
  id: string;
  name: string;
  description: string;
  parameters: SlicerParameters;
}

export interface PrintEstimate {
  estimated_time_minutes: number;
  estimated_filament_length_mm: number;
  estimated_filament_weight_g: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  error_code?: string;
}
