# 3D Slicer API Specification

This document describes all backend API endpoints for the 3D Slicer application.

**Base URL:** `http://localhost:8000/api/v1`

---

## 1. Upload Model

Upload a 3D model file (STL/OBJ) to the server.

**Endpoint:** `POST /models/upload`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: File (STL or OBJ format)

**Response:**
```json
{
  "success": true,
  "model_id": "uuid-string",
  "filename": "model.stl",
  "file_size": 2048576,
  "bounds": {
    "x": { "min": 0, "max": 100 },
    "y": { "min": 0, "max": 100 },
    "z": { "min": 0, "max": 50 }
  },
  "uploaded_at": "2024-01-15T10:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid file format. Only STL and OBJ files are supported."
}
```

---

## 2. Get Model Info

Retrieve information about an uploaded model.

**Endpoint:** `GET /models/{model_id}`

**Request:**
- Method: `GET`
- Path Parameters:
  - `model_id`: string (UUID)

**Response:**
```json
{
  "success": true,
  "model_id": "uuid-string",
  "filename": "model.stl",
  "file_size": 2048576,
  "bounds": {
    "x": { "min": 0, "max": 100 },
    "y": { "min": 0, "max": 100 },
    "z": { "min": 0, "max": 50 }
  },
  "uploaded_at": "2024-01-15T10:30:00Z"
}
```

---

## 3. Slice Model

Start the slicing process with specified parameters.

**Endpoint:** `POST /slice`

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
```json
{
  "model_id": "uuid-string",
  "parameters": {
    "layer_height": 0.2,
    "infill_density": 20,
    "print_speed": 50,
    "nozzle_temperature": 200,
    "bed_temperature": 60,
    "support_enabled": true,
    "support_density": 15,
    "wall_thickness": 0.8,
    "top_bottom_thickness": 0.8,
    "retraction_enabled": true,
    "retraction_distance": 5.0,
    "retraction_speed": 45
  }
}
```

**Response:**
```json
{
  "success": true,
  "job_id": "uuid-string",
  "status": "queued",
  "estimated_time": 120
}
```

---

## 4. Get Slicing Status

Check the status of a slicing job.

**Endpoint:** `GET /slice/{job_id}/status`

**Request:**
- Method: `GET`
- Path Parameters:
  - `job_id`: string (UUID)

**Response:**
```json
{
  "success": true,
  "job_id": "uuid-string",
  "status": "processing",
  "progress": 45,
  "message": "Generating support structures...",
  "estimated_time_remaining": 60
}
```

**Status values:**
- `queued`: Job is waiting to start
- `processing`: Slicing in progress
- `completed`: Slicing finished successfully
- `failed`: Slicing failed
- `cancelled`: Job was cancelled

---

## 5. Download G-code

Download the generated G-code file.

**Endpoint:** `GET /slice/{job_id}/download`

**Request:**
- Method: `GET`
- Path Parameters:
  - `job_id`: string (UUID)

**Response:**
- Content-Type: `application/octet-stream` or `text/plain`
- Body: G-code file content

**Headers:**
- `Content-Disposition`: `attachment; filename="model_sliced.gcode"`

---

## 6. Get Slicer Profiles

Get list of available slicer configuration profiles.

**Endpoint:** `GET /profiles`

**Request:**
- Method: `GET`

**Response:**
```json
{
  "success": true,
  "profiles": [
    {
      "id": "profile-1",
      "name": "Standard Quality",
      "description": "Balanced quality and speed",
      "parameters": {
        "layer_height": 0.2,
        "infill_density": 20,
        "print_speed": 50,
        "nozzle_temperature": 200,
        "bed_temperature": 60
      }
    },
    {
      "id": "profile-2",
      "name": "High Quality",
      "description": "Best quality, slower printing",
      "parameters": {
        "layer_height": 0.1,
        "infill_density": 30,
        "print_speed": 30,
        "nozzle_temperature": 200,
        "bed_temperature": 60
      }
    }
  ]
}
```

---

## 7. Get Print Time Estimate

Get estimated print time for given parameters without slicing.

**Endpoint:** `POST /estimate`

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
```json
{
  "model_id": "uuid-string",
  "parameters": {
    "layer_height": 0.2,
    "infill_density": 20,
    "print_speed": 50
  }
}
```

**Response:**
```json
{
  "success": true,
  "estimated_time_minutes": 180,
  "estimated_filament_length_mm": 15000,
  "estimated_filament_weight_g": 45
}
```

---

## Error Codes

All endpoints may return these error codes:

- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Server is busy

**Error Response Format:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "error_code": "INVALID_PARAMETERS"
}
```

---

## Notes for Frontend Developers

1. **File Upload**: Use FormData to upload files
2. **Polling**: Use GET /slice/{job_id}/status to poll for slicing progress (recommended interval: 1-2 seconds)
3. **Parameter Validation**: Validate parameters on frontend before sending to backend
4. **Error Handling**: Always check the `success` field in responses
5. **File Size Limits**: Maximum file size is 50MB
6. **Supported Formats**: STL (binary and ASCII), OBJ

---

## ⚠️ CRITICAL: Slicing Process Flow

**THE SLICING PROCESS MUST BE PERFORMED ENTIRELY ON THE BACKEND, NOT ON THE FRONTEND**

### Frontend Responsibilities (What Frontend DOES):
- ✅ Collect all slicer parameters from the UI
- ✅ Send POST request to `/slice` endpoint with `model_id` and complete `parameters` object
- ✅ Display "Slicing..." status immediately after sending the request
- ✅ Poll `/slice/{job_id}/status` endpoint to get progress updates
- ✅ Display progress bar and status messages returned from the backend
- ✅ Only show "Slicing Complete" when backend returns `status: "completed"`
- ✅ Enable G-code download only after receiving `status: "completed"`

### Frontend Responsibilities (What Frontend DOES NOT DO):
- ❌ **DO NOT** perform any slicing calculations on the frontend
- ❌ **DO NOT** simulate or mock the slicing process locally  
- ❌ **DO NOT** generate fake progress updates
- ❌ **DO NOT** process STL files or generate G-code on the client side
- ❌ **DO NOT** assume slicing is complete until backend confirms `status: "completed"`

### Backend Responsibilities (What Backend DOES):
- ✅ Receive the full parameters object from the POST request
- ✅ Perform all slicing calculations and algorithms
- ✅ Generate the actual G-code file
- ✅ Update job status and progress during processing
- ✅ Return `status: "completed"` only when slicing is truly finished
- ✅ Handle all file processing, model analysis, and toolpath generation

### Workflow Example:

```
1. User clicks "Start Slicing" button
   ↓
2. Frontend sends: POST /slice { model_id, parameters }
   ↓
3. Backend receives request and starts slicing job
   ↓
4. Backend returns: { job_id, status: "queued" }
   ↓
5. Frontend starts polling: GET /slice/status/{job_id}
   ↓
6. Backend processes and updates status:
   - status: "queued" → "processing" (progress: 0%)
   - status: "processing" (progress: 25%)
   - status: "processing" (progress: 50%)
   - status: "processing" (progress: 75%)
   - status: "completed" (progress: 100%)
   ↓
7. Frontend receives status: "completed"
   ↓
8. Frontend displays "Slicing Complete" and enables download button
```

**This ensures proper separation of concerns: UI on frontend, heavy processing on backend.**

---

## Parameter Ranges

| Parameter | Min | Max | Default | Unit |
|-----------|-----|-----|---------|------|
| layer_height | 0.05 | 0.4 | 0.2 | mm |
| infill_density | 0 | 100 | 20 | % |
| print_speed | 10 | 150 | 50 | mm/s |
| nozzle_temperature | 180 | 300 | 200 | °C |
| bed_temperature | 0 | 120 | 60 | °C |
| support_density | 5 | 50 | 15 | % |
| wall_thickness | 0.4 | 5.0 | 0.8 | mm |
| top_bottom_thickness | 0.4 | 5.0 | 0.8 | mm |
| retraction_distance | 0 | 10.0 | 5.0 | mm |
| retraction_speed | 10 | 100 | 45 | mm/s |
