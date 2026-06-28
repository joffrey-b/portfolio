---
title: "Docker Data Restore"
category: "Backup & Recovery"
description: "This role restores Docker data volumes from backup archives stored on NAS."
tags: ["Docker", "Maloja", "MariaDB", "NAS", "YAML"]
---

## Overview

This role restores Docker data volumes from backup archives stored on NAS. It automatically identifies the latest backup, displays restore information for user confirmation, and extracts the data to the target location. This role is the companion to `docker_data_backup` and is typically used for disaster recovery or system migration.

## What This Role Does

1. **Searches for backup files** matching pattern `docker_data_backup_*.tar.gz`
2. **Sorts backups by modification time** (newest first)
3. **Selects the most recent backup** automatically
4. **Fails gracefully** if no backups are found
5. **Displays backup information** (filename and size in MB)
6. **Prompts for confirmation** before proceeding
7. **Extracts the archive** to the target path
8. **Displays restore results** with next steps

## Role Variables

| Variable | Description |
|----------|-------------|
| `docker_data_restore_syno_mount_point` | Directory containing backup archives |
| `docker_data_restore_target_path` | Directory to extract Docker data into |

The archive contains a `docker/` subdirectory, so extracting to `/home/bjoffrey` restores data to `/home/bjoffrey/docker/`.

## Notes

- Automatically selects the most recent `docker_data_backup_*.tar.gz` from the NAS
- Displays the backup filename and size before extracting, includes a confirmation pause
- The extraction overwrites existing files with the same paths
- After restore, deploy the Docker Compose stack with `docker_compositor` to start containers
- Files are extracted directly from NAS (no local copy needed, `remote_src: true`)
