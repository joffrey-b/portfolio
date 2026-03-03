---
title: "Maloja Import Backup"
category: "Backup & Recovery"
description: "This role restores Maloja music scrobbling data from backup files created by `maloja_backup`."
tags: ["Docker", "JSON", "Maloja", "NAS", "YAML"]
---

## Overview

This role restores Maloja music scrobbling data from backup files created by `maloja_backup`. It automatically identifies the latest backup, copies it to Maloja's import directory, triggers import by restarting the container, and monitors the import process through container logs. The role is designed specifically for Docker-based Maloja deployments.

## What This Role Does

1. **Ensures import directory exists** (`docker_data_path/maloja/import/`)
2. **Finds all backup files** on NAS matching `maloja_export_*.json`
3. **Sorts by modification time** and selects most recent
4. **Fails gracefully** if no backups found
5. **Displays backup information** (filename and size in MB)
6. **Copies backup to import directory** with correct ownership
7. **Restarts Maloja container** to trigger import process
8. **Waits 5 seconds** for container to initialize
9. **Monitors logs for "Parsing"** message (import started)
10. **Displays import start message**
11. **Monitors logs for "Successfully imported"** message (import completed)
12. **Displays import completion message**
13. **Checks for skipped scrobbles** and displays count
14. **Removes import file** after successful import
15. **Restarts Maloja** again to clean up
16. **Displays success message**

## Role Variables

| Variable | Description |
|----------|-------------|
| `docker_compose_directory` | Docker Compose project directory (from host_vars) |
| `docker_data_path` | Docker data volumes directory (from host_vars) |
| `docker_user` | Docker volume owner user (from host_vars) |
| `docker_maloja_container_name` | Maloja container name (from host_vars) |
| `maloja_import_backup_dir` | Import directory inside Docker volume |
| `maloja_import_backup_syno_mount_point` | NAS path with backup files |

## Notes

- Automatically selects the most recent `maloja_export_*.json` file from the NAS
- Copies the file to the Maloja import directory, restarts the container, then monitors logs
- Import file is deleted after successful import; container is restarted again for a clean state
- Duplicate scrobbles are automatically skipped by Maloja
