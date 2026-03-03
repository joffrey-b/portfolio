---
title: "NAS Mount"
category: "Network & Storage"
description: "This role manages CIFS/SMB network share mounting from NAS devices."
tags: ["Centreon", "DNS", "Debian", "Docker", "NAS"]
---

## Overview

This role manages CIFS/SMB network share mounting from NAS devices. It installs cifs-utils, creates mount point directories, generates secure credential files, mounts network shares with proper ownership (UID/GID), adds entries to /etc/fstab for persistence across reboots, and supports both mounting and unmounting operations for multiple NAS devices. This role is meant for temporary mounts (used by backup roles for instance) contrary to the role `nas_mount_systemd`.

## What This Role Does

### When nas_mount_state = mounted

1. **Installs cifs-utils package**
   - Required for CIFS/SMB mounting
   - Provides mount.cifs helper

2. **For each NAS in nas_mount_mounts**:
   - **Creates mount point directory** (e.g., `/mnt/synology-ds418`)
   - **Creates credentials file** (`/etc/nas_creds_{name}`) with mode 0600
   - **Mounts the share** using ansible.posix.mount
   - **Adds to /etc/fstab** for persistent mounting

### When nas_mount_state = unmounted

1. **For each NAS in nas_mount_mounts**:
   - **Unmounts the share**
   - **Removes mount point directory**
   - **Deletes credentials file**
   - **Removes from /etc/fstab**

## Role Variables

| Variable | Description |
|----------|-------------|
| `nas_mount_mounts` | List of NAS mount configurations |
| `nas_mount_uid` | User ID for mount ownership |
| `nas_mount_gid` | Group ID for mount ownership |
| `nas_mount_state` | Mount state (`mounted` or `unmounted`) |
| `nas_mount_synology_ds418_backup_share_path` | Share path on Synology DS418 |
| `nas_mount_synology_ds418_backup_user` | CIFS username for Synology DS418 |
| `nas_mount_synology_ds418_backup_mount_point` | Local mount point for Synology DS418 |
| `nas_mount_synology_ds418_backup_domain` | Windows domain/workgroup for Synology DS418 |
| `nas_mount_prxmx_omv_backup_share_path` | Share path on Proxmox OMV NAS |
| `nas_mount_prxmx_omv_backup_user` | CIFS username for Proxmox OMV NAS |
| `nas_mount_prxmx_omv_backup_mount_point` | Local mount point for Proxmox OMV NAS |
| `nas_mount_prxmx_omv_backup_domain` | Windows domain/workgroup for Proxmox OMV NAS |

**Mount definition fields:**

| Field | Description |
|-------|----------|-------------|
| `name` | Unique identifier for this mount |
| `server` | NAS IP address or hostname |
| `share` | Share path on NAS |
| `mount_point` | Local directory to mount share |
| `user` | CIFS/SMB username |
| `password` | Password (from vault) |
| `domain` | Windows domain or workgroup |

## Notes

- Default configuration mounts Synology DS418 and Proxmox OMV using inventory IP variables
- Credential files are created at `/etc/.cifs_credentials_<name>` with restricted permissions
- If this role is not called back with `nas_mount_state = unmounted` the mount persists across reboots, but it's not the purpose of this role.
- Use `nas_mount_systemd` role for permanent systemd-based mounting with better dependency management
