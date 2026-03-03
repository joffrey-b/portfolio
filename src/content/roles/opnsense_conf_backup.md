---
title: "OPNsense Conf Backup"
category: "Backup & Recovery"
description: "This role backs up OPNsense firewall configuration using the API to dual NAS storage."
tags: ["DHCP", "DNS", "HTTPS", "NAS", "NTP"]
---

## Overview

This role backs up OPNsense firewall configuration using the OPNsense API to dual NAS storage. It downloads the complete configuration as XML, stores it with timestamps, and automatically manages retention by keeping only the last 5 backups per NAS. This provides disaster recovery capability.

## What This Role Does

1. **Ensures backup directories exist** on both NAS mount points
2. **Downloads configuration XML** using OPNsense API (`/api/core/backup/download/this/`)
3. **Saves to both NAS locations** with timestamped filename
4. **Finds all existing backups** on each NAS
5. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_conf_backup_syno_mount_point` | Synology NAS destination |
| `opnsense_conf_backup_prxmxomv_mount_point` | Proxmox OMV NAS destination |
| `opnsense_conf_backup_validate_certs` | Validate SSL certificates |

## Notes

- The XML backup includes all firewall rules, interfaces, DHCP, VPN, certificates, and user accounts
- Each NAS independently retains the last 5 backups (10 total across both devices)
