---
title: "Cron Configuration"
category: "System Management"
description: "This role centralizes scheduled cron jobs across the homelab, including Proxmox backup window scheduling and triggering the Koito, Maloja, and Navidrome database backups."
tags: ["Bash", "Cron", "JSON", "NAS", "Proxmox"]
---

## Overview

This role centralizes all cron-based scheduling across the homelab in one place, keeping timing concerns separate from the roles that own the underlying services. It currently manages the Proxmox Backup Server storage window and triggers the Koito, Maloja, and Navidrome database backups on a recurring schedule.

## What This Role Does

1. **Schedules the Proxmox PBS storage window** — enables the backup storage target shortly before the nightly backup run and disables it afterward so it isn't left mounted
2. **Triggers the Koito backup** on a schedule, exporting listen history to dual NAS storage
3. **Triggers the Maloja backup** on a schedule, exporting scrobble data to dual NAS storage
4. **Triggers the Navidrome database backup** on a schedule, copying the SQLite database to dual NAS storage

## Role Variables

| Variable | Description |
|----------|-------------|
| `cron_configuration_proxmox_pbs_storage_name` | PBS storage name in Proxmox |
| `cron_configuration_backup_keep` | Number of backup files retained per NAS location |
| `cron_configuration_koito_url` | Koito instance URL |
| `cron_configuration_maloja_url` | Maloja instance URL |
| `cron_configuration_navidrome_db_path` | Path to the Navidrome SQLite database file |

## Notes

- Backup jobs run only on the `docker` host; the Proxmox PBS schedule runs only on the `proxmox` host — all other hosts are skipped
- NAS mounts must already be present before these jobs run, handled by the `nas_mount_systemd` role
- Credentials for Koito and Maloja are stored in Ansible Vault and never logged
- Keeps the 5 most recent backups per NAS for each scheduled job
