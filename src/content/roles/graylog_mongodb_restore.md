---
title: "Graylog MongoDB Restore"
category: "Backup & Recovery"
description: "This role restores the Graylog MongoDB database from a backup archive created by the graylog_mongodb_backup role."
tags: ["Graylog", "MongoDB", "NAS", "Synology"]
---

## Overview

Restores the Graylog MongoDB database from the most recent backup archive created by the `graylog_mongodb_backup` role. Drops and replaces the existing `graylog` database. Configuration is fully managed by the `graylog_install` role and is not restored from backup — only the MongoDB data (inputs, pipelines, streams, dashboards, settings) is restored.

## What This Role Does

1. **Finds the most recent backup archive** on the Synology NAS
2. **Prompts for confirmation** before proceeding
3. **Stops `graylog-server`**
4. **Copies the archive** to a local staging directory and extracts it
5. **Runs `mongorestore --drop`** to replace the existing database contents
6. **Removes the local staging directory** after restore completes
7. **Restarts `graylog-server`**

## Role Variables

| Variable | Description |
|----------|-------------|
| `graylog_mongodb_restore_syno_mount_point` | Synology NAS path containing backup archives |
| `graylog_mongodb_restore_mongodb_host` | MongoDB host |
| `graylog_mongodb_restore_mongodb_port` | MongoDB port |
| `graylog_mongodb_restore_mongodb_db` | MongoDB database name |
| `graylog_mongodb_restore_local_tmp` | Local staging directory (auto-deleted after restore) |

## Notes

- Always picks the **most recent** backup archive from the NAS
- Prompts for confirmation before proceeding
- Uses `mongorestore --drop` to replace the existing database contents
- `graylog-server` is stopped during restore, then restarted
- MongoDB itself remains running during the restore
- The local staging directory is automatically removed after restore
- Restore to the **same Graylog version** as the backup to avoid compatibility issues
