---
title: "Centreon CLAPI Restore"
category: "Backup & Recovery"
description: "This role restores Centreon monitoring configuration from a CLAPI (Command Line API) backup file."
tags: ["Centreon", "NAS", "SNMP", "YAML"]
---

## Overview

This role restores Centreon monitoring configuration from a CLAPI (Command Line API) backup file. It automatically identifies the latest backup, imports the configuration, and applies it to the Centreon server. This role is the companion to `centreon_clapi_backup`.

## What This Role Does

1. **Finds all CLAPI backup files** in the specified backup directory
2. **Identifies the latest backup** based on file modification time
3. **Fails gracefully** if no backup files are found
4. **Displays the backup being restored** for user confirmation
5. **Imports the configuration** using `centreon -i` command
6. **Applies the configuration** using `APPLYCFG` to poller 1
7. **Confirms successful restoration** with debug output

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Centreon admin password (from vault) |
| `centreon_clapi_restore_backup_path` | Directory containing backup files |
| `centreon_clapi_restore_admin_user` | Centreon admin username |

## Notes

- Automatically picks the most recent `centreon_clapi_backup_*.txt` file from the backup directory
- Import is additive: existing objects with the same name are updated; objects not in backup are left unchanged
- After import, runs `APPLYCFG` on poller 1 to apply the configuration
- Fails explicitly if no backup files are found
- Admin password uses `no_log: true`; must be stored in Ansible Vault
