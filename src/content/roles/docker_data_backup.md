---
title: "Docker Data Backup"
category: "Backup & Recovery"
description: "This role performs comprehensive backup of Docker data volumes to dual NAS storage."
tags: ["Centreon", "Docker", "NAS", "Nginx", "Proxmox"]
---

## Overview

This role performs comprehensive backup of Docker data volumes to dual NAS storage. It intelligently orchestrates the backup process by scheduling Centreon monitoring downtimes, gracefully stopping containers, creating compressed archives, and automatically managing retention. This ensures data consistency while minimizing false monitoring alerts.

## What This Role Does

### Phase 1: Downtime Scheduling
1. **Calculates downtime window** based on current time and duration
2. **Schedules Centreon downtimes** for three services:
   - `Docker Containers Uptime` (container uptime check)
   - `Docker Containers Status` (container health check)
   - `Check Nginx Proxy Port` (reverse proxy availability)
3. **Delegates to Centreon server** using CLAPI commands

### Phase 2: Backup Execution
1. **Ensures backup directories exist** on both NAS mount points
2. **Stops all Docker containers** using Docker Compose V2 (`docker compose down`)
3. **Waits 10 seconds** for containers to fully stop
4. **Creates compressed tar.gz archive** of entire Docker data directory
5. **Copies archive to both NAS devices** with timestamp in filename
6. **Starts all Docker containers** using Docker Compose V2 (`docker compose up`)

### Phase 3: Cleanup
1. **Finds all existing backups** on each NAS
2. **Removes old backups**, keeping only the 2 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Centreon admin password (from vault) |
| `centreon_host_name` | Host name as it appears in Centreon (from host_vars) |
| `docker_compose_directory` | Directory containing `compose.yaml` (from host_vars) |
| `docker_data_path` | Directory containing all Docker volume data (from host_vars) |
| `docker_data_backup_syno_mount_point` | Synology NAS backup destination |
| `docker_data_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `docker_data_backup_downtime_duration_minutes` | Centreon downtime window duration |
| `docker_data_backup_nases_path` | List of timestamped destination file paths |

Backup filenames: `docker_data_backup_YYYYMMDDTHHMMSS.tar.gz`

## Notes

- Containers are stopped during the backup. Services will be briefly unavailable
- Centreon downtime is scheduled for: `Docker Containers Uptime`, `Docker Containers Status`, `Check Nginx Proxy Port`
- Centreon downtime failures use `failed_when: false`. Backup proceeds even if Centreon is unreachable
- Keeps last **2** backups per NAS (unlike most other backup roles which keep 5)
- After backup, containers are always restarted even if archiving fails
- Use `docker_data_restore` role to restore from a backup
