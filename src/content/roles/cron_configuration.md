---
title: "Cron Configuration"
category: "System Management"
description: "This role centralizes scheduled cron jobs across the homelab, including Proxmox backup window scheduling and the nightly Koito, Maloja, and Navidrome database backup scripts."
tags: ["Bash", "Cron", "JSON", "NAS", "Proxmox"]
---

## Overview

This role centralizes all cron-based scheduling across the homelab in one place, keeping timing concerns separate from the roles that own the underlying services. It currently manages the Proxmox Backup Server storage window and the nightly Koito, Maloja, and Navidrome database backups.

The Koito, Maloja, and Navidrome database backups also exist as their own dedicated Ansible roles, but a cron job can't supply the interactive `become` password Ansible needs to run as root. So for these three, this role deploys a standalone root-owned shell script that mirrors the same backup logic and schedules it with cron, instead of re-running the Ansible role itself. The dedicated roles stay useful for running the same backup by hand, on demand.

## What This Role Does

1. **Schedules the Proxmox PBS storage window**, enables the backup storage target shortly before the nightly backup run and disables it afterward so it isn't left mounted
2. **Deploys and schedules a Koito backup script**, exporting listen history to dual NAS storage every night
3. **Deploys and schedules a Maloja backup script**, exporting scrobble data to dual NAS storage every night
4. **Deploys and schedules a Navidrome database backup script**, copying the SQLite database to dual NAS storage every night

## Role Variables

| Variable | Description |
|----------|-------------|
| `cron_configuration_proxmox_pbs_storage_name` | PBS storage name in Proxmox |
| `cron_configuration_backup_keep` | Number of backup files retained per NAS location |
| `cron_configuration_koito_url` | Koito instance URL |
| `cron_configuration_maloja_url` | Maloja instance URL |
| `cron_configuration_navidrome_db_path` | Path to the Navidrome SQLite database file |

## Notes

- Backup jobs run only on the `docker` host; the Proxmox PBS schedule runs only on the `proxmox` host. All other hosts are skipped
- NAS mounts must already be present before these jobs run, handled by the `nas_mount_systemd` role
- Credentials for Koito and Maloja are stored in Ansible Vault and never logged
- Keeps the 5 most recent backups per NAS for each scheduled job
