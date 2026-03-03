---
title: "Maloja Backup"
category: "Backup & Recovery"
description: "This role backs up Maloja music scrobbling data using the API export feature."
tags: ["Docker", "HTTPS", "JSON", "Maloja", "NAS"]
---

## Overview

This role backs up Maloja music scrobbling data using the API export feature. It authenticates to the Maloja backend, downloads scrobble history as JSON, and stores it on dual NAS storage for redundancy. The role automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Authenticates to Maloja** backend API (`/auth/authenticate`)
3. **Extracts session cookies** from authentication response
4. **Downloads scrobble export** using authenticated session (`/apis/mlj_1/export`)
5. **Saves export to both NAS locations** with timestamped filename
6. **Finds all existing backups** on each NAS
7. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_maloja_backend_user` | Maloja backend username (from vault) |
| `vault_maloja_backend_password` | Maloja backend password (from vault) |
| `maloja_backup_url` | Maloja instance URL |
| `maloja_backup_syno_mount_point` | Synology NAS backup destination |
| `maloja_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `maloja_backup_nases_path` | List of timestamped destination file paths |

## Notes

- Authenticates via the Maloja backend API (different from web UI login)
- Credentials and session cookies use `no_log: true`; credentials are stored in Ansible Vault
- Keeps last 5 backups per NAS; older files are automatically deleted
- Use `maloja_import_backup` role to restore from a backup
