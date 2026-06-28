---
title: "Frigate Install"
category: "Applications"
description: "This role deploys Frigate as a Docker Compose NVR stack on a dedicated Debian server, the active NVR after replacing ZoneMinder."
tags: ["Debian", "Docker", "HTTPS", "Nginx", "RTSP"]
---

## Overview

This role deploys Frigate NVR as a Docker Compose stack on a dedicated Debian server, where it has replaced ZoneMinder as the active NVR. Frigate runs alongside Nginx Proxy Manager, which provides a reverse proxy and TLS termination point for its web interface. This deployment is recording-only. Object detection and Home Assistant integration are disabled, since the server has no GPU or hardware accelerator.

## What This Role Does

1. **Installs Docker** via the `docker_install` role dependency
2. **Deploys Frigate and Nginx Proxy Manager** as a single Docker Compose stack
3. **Configures camera streams** from a list of RTSP sources, re-streaming each one locally so Frigate only opens a single connection per camera
4. **Mounts dedicated storage** for recordings and configuration
5. **Restarts the stack automatically** whenever the configuration or Compose file changes

## Role Variables

| Variable | Description |
|----------|-------------|
| `frigate_install_compose_dir` | Directory holding the Docker Compose file |
| `frigate_install_media_dir` | Directory mounted into the container for recordings |
| `frigate_install_shm_size` | Shared memory allocated to the Frigate container |
| `frigate_install_cameras` | List of cameras to configure (name, RTSP URL, resolution, retention) |

## Notes

- RTSP camera credentials are stored in Ansible Vault, never hardcoded
- Object detection and Home Assistant integration are disabled. This deployment is used purely for recording
- Nginx Proxy Manager is included for reverse proxy / TLS termination, configured manually through its own web UI after deployment
- No GPU or Coral accelerator is used; the server has no hardware video acceleration
- The `zoneminder_install` and `zoneminder_monitors` roles are kept in the repo on standby, in case ZoneMinder ever needs to be reinstalled
