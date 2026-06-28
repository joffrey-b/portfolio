---
title: "Navidrome Database Backup"
category: "Backup & Recovery"
description: "This role backs up the Navidrome SQLite database to dual NAS storage with a clean container stop/restart."
tags: ["Centreon", "Docker", "NAS", "Navidrome", "SQLite"]
---

## Overview

This role backs up the Navidrome SQLite database to dual NAS storage. It schedules a Centreon downtime, stops the Navidrome container to guarantee a clean snapshot, copies the database to both NAS locations with a timestamped filename, then restarts the container. The role automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Schedules a Centreon downtime** to prevent false alerts during the backup
2. **Stops the Navidrome container** to ensure a consistent database snapshot
3. **Copies the database** to both NAS locations with a timestamped filename
4. **Restarts the Navidrome container**
5. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `centreon_host_name` | Host name as it appears in Centreon |
| `navidrome_db_backup_syno_mount_point` | Synology NAS backup destination |
| `navidrome_db_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `navidrome_db_backup_downtime_duration_minutes` | Centreon downtime window duration |

## Notes

- Only the Navidrome container is stopped. All other Docker services keep running
- If the database copy fails, the container is restarted immediately rather than left stopped
- Centreon downtime failures don't block the backup. It proceeds even if Centreon is unreachable
- Keeps last 5 backups per NAS; older files are automatically deleted
