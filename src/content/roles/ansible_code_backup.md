---
title: "Ansible Code Backup"
category: "Backup & Recovery"
description: "This role backs up the entire Ansible repository (playbooks, roles, configurations) to dual NAS storage for redundancy."
tags: ["NAS", "Proxmox", "Synology", "YAML"]
---

## Overview

This role backs up the entire Ansible repository (playbooks, roles, configurations) to dual NAS storage for redundancy. It creates timestamped compressed archives and automatically manages retention by keeping only the last 5 backups per NAS.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Creates compressed tar.gz archive** of the entire Ansible repository
3. **Copies archive to both NAS devices** with timestamp in filename
4. **Finds all existing backups** on each NAS
5. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `ansible_code_backup_syno_mount_point` | Synology NAS backup destination |
| `ansible_code_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `ansible_code_backup_source_path` | Directory to archive |
| `ansible_code_backup_nases_path` | List of timestamped destination file paths |

## Notes

- NAS must be mounted before running. The playbook handles this via `nas_mount`
- Keeps last 5 backups per NAS; older files are automatically deleted
- Archiving is idempotent in structure but creates a new file each run
