---
title: "Koito Backup"
category: "Backup & Recovery"
description: "This role backs up Koito listen history data using the API export feature, storing it on dual NAS storage for redundancy."
tags: ["Docker", "HTTPS", "JSON", "NAS", "REST API"]
---

## Overview

This role backs up Koito listen history data using the API export feature. It authenticates to the Koito instance with an API token, downloads the listen history as JSON, and stores it on dual NAS storage for redundancy. The role automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Authenticates to Koito** using a token-based API key
2. **Downloads the listen history** as a JSON export
3. **Saves the export to both NAS locations** with a timestamped filename
4. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `koito_backup_url` | Koito instance URL |
| `koito_backup_syno_mount_point` | Synology NAS backup destination |
| `koito_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |

## Notes

- Authenticates via a token-based `Authorization` header; the API token is stored in Ansible Vault and never logged
- Keeps last 5 backups per NAS; older files are automatically deleted
- NAS mount points must be accessible before the role runs
