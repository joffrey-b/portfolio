---
title: "Centreon CLAPI Backup"
category: "Backup & Recovery"
description: "This role backs up Centreon monitoring configuration using CLAPI (Command Line API) to dual NAS storage for disaster recovery."
tags: ["Centreon", "NAS", "Proxmox", "SNMP", "Synology"]
---

## Overview

This role backs up Centreon monitoring configuration using CLAPI (Command Line API) to dual NAS storage for disaster recovery. It exports all Centreon objects (hosts, services, templates, commands, etc.) and automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Executes CLAPI export** using `centreon -u admin -p <password> -e`
3. **Saves export to both NAS devices** with timestamp in filename
4. **Finds all existing backups** on each NAS
5. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Centreon admin password (from vault) |
| `centreon_clapi_backup_syno_mount_point` | Synology NAS backup destination |
| `centreon_clapi_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `centreon_clapi_backup_nases_path` | List of timestamped destination file paths |

## Notes

- NAS is mounted via systemd units (handled by `nas_mount_systemd` in the playbook)
- Exports all Centreon objects: hosts, services, templates, commands, contacts, groups, ACLs
- Does NOT back up RRD data, event logs, or performance history
- Keeps last 5 backups per NAS; older files are automatically deleted
- Use `centreon_clapi_restore` role to restore from a backup
