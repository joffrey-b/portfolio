---
title: "Graylog MongoDB Backup"
category: "Backup & Recovery"
description: "This role backs up the Graylog MongoDB database to dual NAS storage, preserving all inputs, pipelines, streams, dashboards, and settings."
tags: ["Graylog", "MongoDB", "NAS", "Synology"]
---

## Overview

Backs up the MongoDB `graylog` database to dual NAS storage for redundancy. Preserves all inputs, pipelines, streams, indexes, dashboards, users, and settings. Configuration files are managed as code by the `graylog_install` role and are not included. Log data (OpenSearch indices) is intentionally excluded. Only the configuration database is backed up.

## What This Role Does

1. **Stops `graylog-server`** to ensure a consistent database snapshot
2. **Runs `mongodump`** on the `graylog` database to a local staging directory
3. **Creates a compressed tar.gz archive** of the dump
4. **Copies the archive to both NAS devices** with a timestamped filename
5. **Removes the local staging directory** after the copy completes
6. **Restarts `graylog-server`**
7. **Removes old backups**, keeping only the 5 most recent per NAS

## Role Variables

| Variable | Description |
|----------|-------------|
| `graylog_mongodb_backup_syno_mount_point` | Synology NAS backup destination |
| `graylog_mongodb_backup_prxmxomv_mount_point` | Proxmox OMV NAS backup destination |
| `graylog_mongodb_backup_keep` | Number of backups to keep per NAS |
| `graylog_mongodb_backup_mongodb_host` | MongoDB host |
| `graylog_mongodb_backup_mongodb_port` | MongoDB port |
| `graylog_mongodb_backup_mongodb_db` | MongoDB database name |
| `graylog_mongodb_backup_local_tmp` | Local staging directory (auto-deleted after backup) |

## Notes

- `graylog-server` is stopped during the MongoDB dump for consistency, then restarted. Expect a brief outage
- MongoDB itself remains running during the dump
- The local staging directory is automatically removed after the archive is copied to the NAS
- Keeps the last 5 backups per NAS by default; older files are auto-deleted
- Use the `graylog_mongodb_restore` role to restore from a backup (run `graylog_install` first)
