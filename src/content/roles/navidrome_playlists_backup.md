---
title: "Navidrome Playlists Backup"
category: "Backup & Recovery"
description: "This role backs up Navidrome music playlists using the API."
tags: ["HTTPS", "JSON", "NAS", "Navidrome", "Proxmox"]
---

## Overview

This role backs up Navidrome music playlists using the API. It authenticates to Navidrome, downloads each playlist as M3U files, and stores them on dual NAS storage with dated directories for organization. The role automatically manages retention by keeping only the last 5 backup directories per NAS.

## What This Role Does

1. **Creates dated backup directories** on both NAS mounts (format: YYYY-MM-DD)
2. **Authenticates to Navidrome** API (`/auth/login`)
3. **Extracts JWT token** and client ID from response
4. **Fails gracefully** if authentication fails
5. **Downloads each playlist** as M3U file from `/api/playlist/{id}/tracks`
6. **Saves to Synology NAS** with timestamped filename
7. **Saves to Proxmox OMV NAS** with timestamped filename
8. **Finds all backup directories** on each NAS
9. **Removes old directories**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_navidrome_joffrey_user` | Navidrome username (from vault) |
| `vault_navidrome_joffrey_password` | Navidrome password (from vault) |
| `navidrome_playlists_backup_url` | Navidrome instance URL |
| `navidrome_playlists_backup_syno_mount_point` | Synology NAS backup destination |
| `navidrome_playlists_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `navidrome_playlists_backup_playlists` | Dict mapping playlist UUID to name |

**Playlists to backup configuration:**
```yaml
navidrome_playlists_backup_playlists:
  dqHOiCmnQlj0VVgZCbGCRE: "My favorites"
  i7fIJvWDj8kIy9ZHNjeQAg: "What I play on guitar"
```

Playlist UUIDs are found in the Navidrome UI URL when viewing a playlist: `.../app/playlist/{UUID}`

## Notes

- Backups are stored in dated directories: `navidrome/playlists/YYYY-MM-DD/`
- Keeps last 5 dated directories per NAS; older directories are automatically deleted
- M3U files contain track metadata and file paths (not actual music files)
- Credentials use `no_log: true`, and are stored in Ansible Vault
