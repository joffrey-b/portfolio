---
title: "Grafana Alerts Backup"
category: "Backup & Recovery"
description: "This role backs up all Grafana alert rules using the API to dual NAS storage."
tags: ["Grafana", "HTTPS", "NAS", "Proxmox", "SSL"]
---

## Overview

This role backs up all Grafana alert rules using the API to dual NAS storage. It exports alerts in YAML provisioning format, organized by folder, and automatically manages retention by keeping only the last 5 backups per NAS. The backup format is compatible with Grafana's alert rule provisioning, making restoration straightforward.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Retrieves folder list** from Grafana API (`/api/folders`)
3. **Creates temporary directory** for staging backup files
4. **Retrieves all alert rules** from Grafana Provisioning API (`/api/v1/provisioning/alert-rules`)
5. **Groups alert rules by folder** and saves each as YAML file
6. **Skips empty folders** (folders with no alert rules)
7. **Creates timestamped tar.gz archive** of all YAML files
8. **Copies archive to both NAS devices**
9. **Cleans up temporary files** and local archive
10. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Grafana API token (from vault) |
| `grafana_alerts_backup_host` | Grafana host and port |
| `grafana_alerts_backup_validate_certs` | Validate SSL certificates |
| `grafana_alerts_backup_syno_mount_point` | Synology NAS destination |
| `grafana_alerts_backup_prxmxomv_mount_point` | Proxmox OMV NAS destination |

## Notes

- Backup format is Grafana YAML provisioning format, compatible with `grafana_alerts_restore`
- Contact points and notification policies are NOT included (alert rules only)
- Each NAS independently retains the last 5 backups
