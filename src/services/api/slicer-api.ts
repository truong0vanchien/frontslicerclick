/**
 * API Service for 3D Slicer Backend
 * 
 * This file contains all API calls to the backend.
 * Currently using MOCK implementations - replace with actual API calls when backend is ready.
 * 
 * Base URL: http://localhost:8000/api/v1
 */

import type {
  SlicerParameters,
  UploadedModel,
  SliceJob,
  SlicerProfile,
  PrintEstimate,
  ApiResponse,
} from '@/types/slicer';

// Mock mode - set to false when backend is ready
const USE_MOCK = true;
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Upload a 3D model file (STL/OBJ)
 * @param file - The 3D model file to upload
 * @returns Uploaded model information
 */
export async function uploadModel(file: File): Promise<ApiResponse<UploadedModel>> {
  if (USE_MOCK) {
    // Mock implementation
    await delay(1500);
    return {
      success: true,
      data: {
        model_id: generateMockId(),
        filename: file.name,
        file_size: file.size,
        bounds: {
          x: { min: 0, max: 100 },
          y: { min: 0, max: 100 },
          z: { min: 0, max: 50 },
        },
        uploaded_at: new Date().toISOString(),
      },
    };
  }

  // Real implementation
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/models/upload`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

/**
 * Get information about an uploaded model
 * @param modelId - The ID of the uploaded model
 * @returns Model information
 */
export async function getModelInfo(modelId: string): Promise<ApiResponse<UploadedModel>> {
  if (USE_MOCK) {
    await delay(500);
    return {
      success: true,
      data: {
        model_id: modelId,
        filename: 'model.stl',
        file_size: 2048576,
        bounds: {
          x: { min: 0, max: 100 },
          y: { min: 0, max: 100 },
          z: { min: 0, max: 50 },
        },
        uploaded_at: new Date().toISOString(),
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/models/${modelId}`);
  return response.json();
}

/**
 * Start slicing a model with given parameters
 * @param modelId - The ID of the model to slice
 * @param parameters - Slicing parameters
 * @returns Slice job information
 */
export async function sliceModel(
  modelId: string,
  parameters: SlicerParameters
): Promise<ApiResponse<SliceJob>> {
  const requestBody = {
    model_id: modelId,
    parameters,
  };

  console.log('🚀 Slicing Request:', requestBody);
  console.log('📊 Full Parameters:', JSON.stringify(parameters, null, 2));

  if (USE_MOCK) {
    await delay(800);
    return {
      success: true,
      data: {
        job_id: generateMockId(),
        status: 'queued',
        estimated_time: 120,
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/slice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}

/**
 * Get the status of a slicing job
 * @param jobId - The ID of the slice job
 * @returns Job status and progress
 */
export async function getSliceStatus(jobId: string): Promise<ApiResponse<SliceJob>> {
  if (USE_MOCK) {
    await delay(300);
    const progress = Math.min(mockJobProgress[jobId] || 0, 100);
    mockJobProgress[jobId] = progress + Math.random() * 15;

    return {
      success: true,
      data: {
        job_id: jobId,
        status: progress >= 100 ? 'completed' : 'processing',
        progress: Math.min(progress, 100),
        message: getProgressMessage(progress),
        estimated_time_remaining: Math.max(0, Math.floor((100 - progress) * 1.2)),
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/slice/${jobId}/status`);
  return response.json();
}

/**
 * Download the G-code file for a completed slice job
 * @param jobId - The ID of the completed slice job
 * @returns Blob containing the G-code file
 */
export async function downloadGCode(jobId: string): Promise<Blob> {
  if (USE_MOCK) {
    await delay(1000);
    const mockGCode = generateMockGCode();
    return new Blob([mockGCode], { type: 'text/plain' });
  }

  const response = await fetch(`${API_BASE_URL}/slice/${jobId}/download`);
  return response.blob();
}

/**
 * Get available slicer configuration profiles
 * @returns List of slicer profiles
 */
export async function getSlicerProfiles(): Promise<ApiResponse<SlicerProfile[]>> {
  if (USE_MOCK) {
    await delay(500);
    return {
      success: true,
      data: MOCK_PROFILES,
    };
  }

  const response = await fetch(`${API_BASE_URL}/profiles`);
  return response.json();
}

/**
 * Get print time estimate without slicing
 * @param modelId - The ID of the model
 * @param parameters - Slicing parameters
 * @returns Print time and filament estimates
 */
export async function getPrintEstimate(
  modelId: string,
  parameters: Partial<SlicerParameters>
): Promise<ApiResponse<PrintEstimate>> {
  if (USE_MOCK) {
    await delay(700);
    return {
      success: true,
      data: {
        estimated_time_minutes: 180 + Math.random() * 60,
        estimated_filament_length_mm: 15000 + Math.random() * 5000,
        estimated_filament_weight_g: 45 + Math.random() * 15,
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model_id: modelId, parameters }),
  });

  return response.json();
}

// ============================================================================
// MOCK DATA AND UTILITIES
// ============================================================================

const mockJobProgress: Record<string, number> = {};

function generateMockId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getProgressMessage(progress: number): string {
  if (progress < 10) return 'Initializing slicer...';
  if (progress < 30) return 'Analyzing model geometry...';
  if (progress < 50) return 'Generating support structures...';
  if (progress < 70) return 'Creating layer paths...';
  if (progress < 90) return 'Optimizing toolpaths...';
  if (progress < 100) return 'Finalizing G-code...';
  return 'Slicing completed!';
}

function generateMockGCode(): string {
  return `; Generated by 3D Slicer
; Date: ${new Date().toISOString()}
; Layer Height: 0.2mm
; Infill: 20%

G21 ; set units to millimeters
G90 ; use absolute coordinates
M82 ; use absolute distances for extrusion
M104 S200 ; set nozzle temp
M140 S60 ; set bed temp
M109 S200 ; wait for nozzle temp
M190 S60 ; wait for bed temp
G28 ; home all axes
G1 Z5 F5000 ; lift nozzle

; LAYER 1
G1 X10 Y10 F3000
G1 Z0.2 F1000
G1 X90 Y10 E5 F1500
G1 X90 Y90 E10 F1500
G1 X10 Y90 E15 F1500
G1 X10 Y10 E20 F1500

; ... [additional layers would be here in real G-code]

; END
M104 S0 ; turn off nozzle
M140 S0 ; turn off bed
G28 X0 Y0 ; home X and Y
M84 ; disable motors
`;
}

const MOCK_PROFILES: SlicerProfile[] = [
  {
    id: 'standard',
    name: 'Standard Quality',
    description: 'Balanced quality and speed - good for most prints',
    parameters: {
      layer_height: 0.2,
      infill_density: 20,
      print_speed: 50,
      nozzle_temperature: 200,
      bed_temperature: 60,
      support_enabled: true,
      support_density: 15,
      wall_thickness: 0.8,
      top_bottom_thickness: 0.8,
      retraction_enabled: true,
      retraction_distance: 5.0,
      retraction_speed: 45,
    },
  },
  {
    id: 'high-quality',
    name: 'High Quality',
    description: 'Best quality with finer details - slower printing',
    parameters: {
      layer_height: 0.1,
      infill_density: 30,
      print_speed: 30,
      nozzle_temperature: 200,
      bed_temperature: 60,
      support_enabled: true,
      support_density: 20,
      wall_thickness: 1.2,
      top_bottom_thickness: 1.2,
      retraction_enabled: true,
      retraction_distance: 5.0,
      retraction_speed: 45,
    },
  },
  {
    id: 'fast-draft',
    name: 'Fast Draft',
    description: 'Quick prototyping with lower quality',
    parameters: {
      layer_height: 0.3,
      infill_density: 10,
      print_speed: 80,
      nozzle_temperature: 210,
      bed_temperature: 60,
      support_enabled: false,
      support_density: 10,
      wall_thickness: 0.8,
      top_bottom_thickness: 0.6,
      retraction_enabled: true,
      retraction_distance: 4.5,
      retraction_speed: 50,
    },
  },
];

export const DEFAULT_PARAMETERS: SlicerParameters = MOCK_PROFILES[0].parameters;
