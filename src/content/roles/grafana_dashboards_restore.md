---
title: "Grafana Dashboards Restore"
category: "Backup & Recovery"
description: "This role restores Grafana dashboards from backup archives created by `grafana_dashboards_backup`."
tags: ["Grafana", "HTTPS", "JSON", "NAS", "SSL", "Synology"]
---

## Overview

This role restores Grafana dashboards from backup archives created by `grafana_dashboards_backup`. It automatically identifies the latest backup, extracts dashboard JSON files, and imports them into Grafana using the API with overwrite capability.

## What This Role Does

1. **Finds latest backup archive** matching pattern `grafana_dashboards_*.tar.gz`
2. **Sorts by modification time** and selects the most recent
3. **Fails gracefully** if no backups are found
4. **Creates temporary directory** for extraction
5. **Extracts backup archive** to temporary location
6. **Finds all JSON files** in extracted backup
7. **Reads each dashboard JSON** file
8. **Imports dashboards** via Grafana API with overwrite enabled
9. **Cleans up temporary files**

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Grafana API token (from vault) |
| `grafana_dashboards_restore_backup_path` | Directory with backup archives |
| `grafana_dashboards_restore_host` | Grafana host and port |
| `grafana_dashboards_restore_port` | Grafana HTTP port |
| `grafana_dashboards_restore_validate_certs` | Validate SSL certificates |

## Notes

- Automatically selects the most recent `grafana_dashboards_*.tar.gz` file in the backup path
- Existing dashboards are overwritten (not duplicated)
