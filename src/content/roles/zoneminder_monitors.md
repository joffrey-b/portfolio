---
title: "Zoneminder Monitors"
category: "Applications"
description: "This role automates the addition of camera monitors to ZoneMinder via the REST API, kept on standby after migrating to Frigate."
tags: ["HTTPS", "JSON", "REST API", "SSL", "VLAN"]
---

## Overview

This role automates the addition of camera monitors to ZoneMinder via the REST API. It authenticates with the ZoneMinder API, retrieves the list of existing monitors to prevent duplicates, and creates new camera monitors with customizable settings including name, RTSP path, resolution, recording function, video encoding parameters, and audio recording options. The role is idempotent and will only add monitors that don't already exist.

## What This Role Does

**Camera addition workflow**:

1. **Authenticate**: Login to ZoneMinder API and get access token
2. **Check existing**: Retrieve list of currently configured monitors
3. **Compare**: Identify which cameras need to be added
4. **Add new**: Create monitors that don't already exist (role is idempotent)
5. **Configure**: Set all camera parameters (resolution, function, encoding)

## Role Variables

| Variable | Description |
|----------|-------------|
| `zoneminder_monitors_api_user` | ZoneMinder API username |
| `zoneminder_monitors_api_password` | API password (from vault) |
| `zoneminder_monitors_list` | List of camera monitors to add |
| `zoneminder_monitors_api_url` | ZoneMinder API URL |
| `zoneminder_monitors_validate_certs` | Validate SSL certificates |
| `zoneminder_monitors_defaults` | Default settings applied to all cameras |

**Default camera settings (`zoneminder_monitors_defaults`):**

```yaml
zoneminder_monitors_defaults:
  type: "Ffmpeg"
  method: "rtpRtsp"
  colours: 4
  save_jpegs: 0
  video_writer: 2       # 2 = passthrough (recommended for H.264)
  record_audio: 1
```

**Camera definition fields:**

| Field | Description |
|-------|----------|-------------|
| `name` | Display name (used for duplicate detection) |
| `path` | Full RTSP URL including credentials |
| `width` | Video width in pixels |
| `height` | Video height in pixels |
| `function` | `Record`, `Modect` (motion detect), or `Mocord` |

## Notes

- **No longer in production**. Frigate is now the active NVR; this role is kept in case ZoneMinder is ever reinstalled
- Monitors are identified by name. Cameras with the same name are not duplicated
- `Modect` records only when motion is detected; `Record` records continuously; `Mocord` does both
- RTSP URLs contain camera credentials. Store them in Ansible Vault
- Run `zoneminder_install` before this role
