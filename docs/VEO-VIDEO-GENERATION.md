# Google Veo 3.0 Video Generation & Architecture Guide

## Overview

This guide documents how Google Veo 3.0 video generation is executed on Google Cloud Vertex AI for Inerate, the exact mechanics, the sandbox limitations observed in Claude Code vs Antigravity/external shells, and why client-side CSS/SVG/canvas was selected for the live interactive storytelling UI.

---

## 1. GCP Project & Vertex AI Configuration

- **GCP Project ID**: `astute-lyceum-484806-g3`
- **Location**: `us-central1`
- **Model**: `veo-3.0-generate-001` (Active and verified)
- **Service Account**: `growth-charters@astute-lyceum-484806-g3.iam.gserviceaccount.com`

---

## 2. API Endpoints & Request Flow

Veo video generation uses an asynchronous Long-Running Operation (LRO) pattern:

### Step 1: Submit Generation Job
- **Endpoint**: `POST https://us-central1-aiplatform.googleapis.com/v1/projects/astute-lyceum-484806-g3/locations/us-central1/publishers/google/models/veo-3.0-generate-001:predictLongRunning`
- **Headers**:
  - `Authorization: Bearer <GCLOUD_ACCESS_TOKEN>`
  - `Content-Type: application/json; charset=utf-8`
- **Payload**:
  ```json
  {
    "instances": [
      {
        "prompt": "Apple-caliber cinematic 3D macro shot. Multiple floating, semi-transparent frosted glass documents and digital pages with elegant typographic lines glowing subtly. The glass sheets smoothly glide and seamlessly fuse into one pristine, glowing crystal document stack. Dark minimalist studio background with soft ambient emerald green and fuchsia iridescence refraction, 8k render, photorealistic, smooth slow motion."
      }
    ],
    "parameters": {
      "aspectRatio": "16:9",
      "sampleCount": 1
    }
  }
  ```
- **Response**: Returns an operation resource name, e.g.:
  ```json
  {
    "name": "projects/astute-lyceum-484806-g3/locations/us-central1/publishers/google/models/veo-3.0-generate-001/operations/<OPERATION_ID>"
  }
  ```

### Step 2: Poll Operation Status
- **Endpoint**: `POST https://us-central1-aiplatform.googleapis.com/v1/projects/astute-lyceum-484806-g3/locations/us-central1/publishers/google/models/veo-3.0-generate-001:fetchPredictOperation`
- **Payload**:
  ```json
  {
    "operationName": "projects/astute-lyceum-484806-g3/locations/us-central1/publishers/google/models/veo-3.0-generate-001/operations/<OPERATION_ID>"
  }
  ```
- **Result**: Once `done: true`, returns base64-encoded MP4 bytes (`bytesBase64Encoded` in the `videos` array) ready to be decoded and written to disk.

---

## 3. Python Automation Script

```python
import subprocess
import json
import requests
import time
import base64
import os

def get_token():
    # On Windows PowerShell / CMD:
    res = subprocess.run("gcloud.cmd auth print-access-token", shell=True, capture_output=True, text=True, check=True)
    return res.stdout.strip()

token = get_token()
project_id = "astute-lyceum-484806-g3"
location = "us-central1"
model = "veo-3.0-generate-001"

# 1. Trigger generation
submit_url = f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/publishers/google/models/{model}:predictLongRunning"
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json; charset=utf-8"}
payload = {
    "instances": [{"prompt": "Your cinematic video prompt here"}],
    "parameters": {"aspectRatio": "16:9", "sampleCount": 1}
}

resp = requests.post(submit_url, headers=headers, json=payload)
operation_name = resp.json()["name"]
print(f"Started Veo operation: {operation_name}")

# 2. Poll until complete
fetch_url = f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/publishers/google/models/{model}:fetchPredictOperation"
poll_payload = {"operationName": operation_name}

for _ in range(40):
    time.sleep(10)
    res = requests.post(fetch_url, headers=headers, json=poll_payload).json()
    if res.get("done"):
        videos = res.get("response", {}).get("videos", [])
        for i, vid in enumerate(videos):
            b64 = vid.get("bytesBase64Encoded") or vid.get("video", {}).get("bytesBase64Encoded")
            if b64:
                with open(f"veo_output_{i+1}.mp4", "wb") as f:
                    f.write(base64.b64decode(b64))
                print("Video saved successfully!")
        break
```

---

## 4. Claude Code Sandbox vs Antigravity Execution

- **Claude Code Permission Sandbox**:
  Claude Code has a client-side tool permission classifier that blocks commands/functions minting live `cloud-platform` OAuth bearer tokens (e.g. `gcloud auth print-access-token` or Python `google.auth.default(scopes=['...cloud-platform'])`).
- **Antigravity / External Terminal**:
  Antigravity IDE and standalone terminal shells run with direct system tool execution, allowing `gcloud.cmd auth print-access-token` and Vertex AI REST APIs to execute without obstruction.

---

## 5. UI Architecture: Pure CSS/SVG/Canvas vs Video Files

For the live document utility suite at `tools.inerate.com`:

1. **Scroll-Scrubbing Performance**:
   Pre-rendered video files (`.mp4`/`.webm`) stutter or drop resolution when tied to scroll scrubbing (`currentTime` seeking). Frame interpolation lag creates visual jitter on mobile and low-powered laptops.
2. **Zero-Byte Overhead**:
   A pure CSS/SVG 3D layer (e.g. `InteractiveGlassFilm` and `GlassDocStack`) is <15 KB of code, renders at 60–120 FPS native refresh rate, adapts seamlessly across all 5 themes (Daylight, Iridescence, Obsidian, Aurora, Ember), and downloads zero megabytes over mobile networks.
3. **Privacy & Integrity**:
   Vector animations cannot be extracted or stolen as video files, preserving the native, responsive macOS-style aesthetic.
