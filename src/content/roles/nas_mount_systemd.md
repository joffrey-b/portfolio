---
title: "NAS Mount Systemd"
category: "Network & Storage"
description: "This role manages CIFS/SMB network share mounting using systemd mount units instead of traditional /etc/fstab entries."
tags: ["DHCP", "Docker", "NAS", "SMB", "Synology"]
---

## Overview

This role manages CIFS/SMB network share mounting using systemd mount units instead of traditional /etc/fstab entries. It installs cifs-utils, creates mount point directories, generates secure credential files, creates systemd .mount unit files with proper dependencies, enables and starts mount units, and handles automatic mounting via systemd. This role is used for permanent CIFS/SMB mounts, contrary to the `nas_mount`role which is used for one-shot mounts (used for making backups for instance). This role can still delete systemd mounts by setting `state: absent` in `host_vars`.

## What This Role Does

### When state = present

1. **Installs cifs-utils package**
   - Required for CIFS/SMB mounting

2. **For each mount**:
   - **Creates mount point directory** (e.g., `/mnt/synology/media`)
   - **Creates credentials file** (`/etc/nas_creds_{name}_systemd`) with mode 0600
   - **Generates systemd .mount unit** in `/lib/systemd/system/`
   - **Enables mount unit** (starts on boot)
   - **Starts mount unit** (mounts immediately)
   - **Restarts if credentials changed**

### When state = absent

1. **For each mount**:
   - **Stops mount unit** (unmounts share)
   - **Disables mount unit** (won't mount on boot)
   - **Removes .mount unit file**
   - **Deletes credentials file**
   - **Removes mount point directory**
   - **Reloads systemd daemon**

## Role Variables

| Variable | Description |
|----------|-------------|
| `nas_mount_systemd_mounts` | List of NAS mount configurations |

**Mount definition fields:**

| Field | Description |
|-------|----------|-------------|
| `name` | Unique identifier for mount |
| `server` | NAS IP address or hostname |
| `share` | Share path on NAS |
| `mount_point` | Local mount directory |
| `user` | CIFS username |
| `password` | Password (from vault) |
| `domain` | Windows domain or workgroup |
| `file_mode` | File permissions on mount |
| `dir_mode` | Directory permissions on mount |
| `state` | `present` to mount, `absent` to unmount |

## Notes

- Systemd units wait for `network-online.target` before mounting (avoids boot failures)
- Setting `state: absent` removes the systemd unit and unmounts the share
- Prefer this role over `nas_mount` for permanent mounts
