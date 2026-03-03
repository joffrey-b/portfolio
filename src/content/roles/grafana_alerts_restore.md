---
title: "Grafana Alerts Restore"
category: "Backup & Recovery"
description: "This role restores Grafana alert rules from backup archives created by `grafana_alerts_backup`."
tags: ["Grafana", "HTTPS", "NAS", "SSL", "Synology", "YAML"]
---

## Overview

This role restores Grafana alert rules from backup archives created by `grafana_alerts_backup`. It intelligently handles folder creation, contact point setup, and alert rule import/update using the Grafana Provisioning API. The role automatically identifies the latest backup and handles conflicts gracefully by updating existing alerts.

## What This Role Does

1. **Finds latest backup archive** matching pattern `grafana_alerts_*.tar.gz`
2. **Fails gracefully** if no backups are found
3. **Creates temporary directory** for extraction
4. **Extracts backup archive** to temporary location
5. **Finds all YAML files** in extracted backup
6. **Parses YAML provisioning files** and extracts alert rule groups
7. **Identifies required folders** from alert rules
8. **Retrieves existing folders** from Grafana API
9. **Creates missing folders** only if they don't already exist
10. **Builds folder name-to-UID mapping** from both new and existing folders
11. **Extracts individual alert rules** with correct folderUIDs and rule groups
12. **Checks for contact point** existence, creates if missing
13. **Imports alert rules** via Grafana Provisioning API (POST)
14. **Updates existing alerts** if conflicts occur (PUT with UID)
15. **Cleans up temporary files**
16. **Displays restoration summary** with statistics

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Grafana API token (from vault) |
| `grafana_alerts_restore_backup_path` | Directory with backup archives |
| `grafana_alerts_restore_host` | Grafana host and port |
| `grafana_alerts_restore_port` | Grafana HTTP port |
| `grafana_alerts_restore_validate_certs` | Validate SSL certificates |
| `grafana_alerts_restore_contact_point_name` | Contact point name to create if missing |
| `grafana_alerts_restore_contact_point_type` | Contact point type |
| `grafana_alerts_restore_contact_point_email` | Email for notifications |

## Notes

- Automatically selects the most recent `grafana_alerts_*.tar.gz` file in the backup path
- Existing alerts are updated (HTTP 409 triggers a PUT update), not duplicated
- Folders are created automatically if they don't exist in the target Grafana
- Existing contact points are ignored
