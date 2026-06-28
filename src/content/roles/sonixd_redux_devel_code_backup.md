---
title: "Sonixd Redux Devel Code Backup"
category: "Backup & Recovery"
description: "This role backs up the entire Sonixd Redux development repository to dual NAS storage for redundancy."
tags: ["NAS", "Proxmox", "Synology", "YAML"]
---

## Overview

This role backs up the entire Sonixd Redux development repository to dual NAS storage for redundancy. It creates timestamped compressed archives and automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Creates a compressed archive** of the entire Sonixd Redux development repository
2. **Copies the archive to both NAS devices** with a timestamp in the filename
3. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `sonixd_redux_devel_code_backup_syno_mount_point` | Synology NAS backup destination |
| `sonixd_redux_devel_code_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `sonixd_redux_devel_code_backup_source_path` | Directory to archive |

## Notes

- NAS must be mounted before running, handled by the `nas_mount` role in the playbook
- Keeps last 5 backups per NAS; older files are automatically deleted
- To restore, extract the archive back to the original repository directory
