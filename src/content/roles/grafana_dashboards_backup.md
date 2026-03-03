---
title: "Grafana Dashboards Backup"
category: "Backup & Recovery"
description: "This role backs up all Grafana dashboards using the API to dual NAS storage."
tags: ["Grafana", "HTTPS", "JSON", "NAS", "Proxmox"]
---

## Overview

This role backs up all Grafana dashboards using the API to dual NAS storage. It downloads dashboard JSON definitions, creates compressed archives, and automatically manages retention by keeping only the last 5 backups per NAS. The exported JSON format is compatible with Grafana's import functionality.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Retrieves dashboard list** from Grafana API (`/api/search?type=dash-db`)
3. **Creates temporary directory** for staging dashboard files
4. **Downloads each dashboard** individually using dashboard UID (`/api/dashboards/uid/{uid}`)
5. **Extracts pure JSON** (removes API wrapper metadata)
6. **Saves each dashboard** as separate JSON file with sanitized filename
7. **Creates timestamped tar.gz archive** of all JSON files
8. **Copies archive to both NAS devices**
9. **Cleans up temporary files** and local archive
10. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Grafana API token (from vault) |
| `grafana_dashboards_backup_host` | Grafana host and port |
| `grafana_dashboards_backup_validate_certs` | Validate SSL certificates |
| `grafana_dashboards_backup_syno_mount_point` | Synology NAS destination |
| `grafana_dashboards_backup_prxmxomv_mount_point` | Proxmox OMV NAS destination |

## Notes

- Dashboards are saved as pure JSON (without API wrapper metadata), importable directly via Grafana UI
- Folder structure is not preserved — use folder names in filenames for reference
- Datasource configurations are NOT included (use `grafana_datasource_create` separately)
