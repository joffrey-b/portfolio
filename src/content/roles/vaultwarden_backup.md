---
title: "Vaultwarden Backup"
category: "Backup & Recovery"
description: "This role backs up Vaultwarden (self-hosted Bitwarden) password vault using the official Bitwarden CLI."
tags: ["Debian", "HTTPS", "JSON", "NAS", "Proxmox"]
---

## Overview

This role backs up Vaultwarden (self-hosted Bitwarden) password vault using the official Bitwarden CLI. It downloads the CLI temporarily, authenticates with API credentials, exports the vault as encrypted JSON, and stores it on dual NAS storage. The role automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Creates temporary directory** for Bitwarden CLI
3. **Downloads Bitwarden CLI** from official source
4. **Ensures unzip is installed** (for extracting CLI)
5. **Extracts Bitwarden CLI** binary
6. **Sets executable permissions** on CLI binary
7. **Configures server URL** for Vaultwarden instance
8. **Logs in with API credentials** (using environment variables, retrieved from Ansible Vault)
9. **Unlocks vault** with master password
10. **Extracts session key** for operations that need authentication
11. **Syncs vault** to ensure latest data
12. **Exports vault** as encrypted JSON to Synology NAS
13. **Exports vault** as encrypted JSON to Proxmox OMV NAS
14. **Locks vault** (clears session)
15. **Logs out** from Vaultwarden
16. **Displays success message**
17. **Cleans up temporary CLI directory**
18. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_vaultwarden_api_client_id` | Vaultwarden API client ID (from vault) |
| `vault_vaultwarden_api_client_secret` | Vaultwarden API client secret (from vault) |
| `vault_vaultwarden_master_password` | Vault master password (from vault) |
| `vault_vaultwarden_backup_export_password` | Password to encrypt the export file (from vault) |
| `vaultwarden_backup_url` | Vaultwarden instance URL |
| `vaultwarden_backup_ca_file` | Custom CA certificate path (empty = system CA) |
| `vaultwarden_backup_syno_mount_point` | Synology NAS backup destination |
| `vaultwarden_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |

## Notes

- The Bitwarden CLI is downloaded to a temp directory and deleted after the backup
- The export is encrypted with a dedicated password, separate from the master password (stored in Ansible Vault)
- All sensitive values use `no_log: true`; credentials are not displayed in console output
- Keeps last 5 backups per NAS; older files are automatically deleted
- API client ID/secret are obtained from Vaultwarden: Settings → Security → Keys → View API Key
