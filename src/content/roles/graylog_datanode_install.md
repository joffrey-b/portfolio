---
title: "Graylog Data Node Install"
category: "Monitoring & Metrics"
description: "This role installs and configures the Graylog data node (OpenSearch) including full disk setup, package installation, and configuration."
tags: ["Graylog", "OpenSearch", "Java"]
---

## Overview

Installs and configures the Graylog data node (OpenSearch) on a dedicated host. Handles the full disk setup (partition, XFS format, mount) as well as package installation and configuration. All disk operations are idempotent. An already-formatted disk will not be reformatted, preserving existing data on rebuilds.

## What This Role Does

1. **Partitions and formats the data disk** with XFS (skipped if already formatted, existing data is preserved)
2. **Mounts the disk** at the configured data path and adds it to fstab
3. **Adds the Graylog repository** and installs `graylog-datanode`
4. **Configures `datanode.conf`** with the shared secret, MongoDB URI, data path, and heap size (auto-calculated from available RAM)
5. **Sets `vm.max_map_count=262144`** permanently via sysctl (required by OpenSearch)
6. **Enables and starts** the `graylog-datanode` service

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_graylog_password_secret` | Shared secret, must be identical to the main Graylog node (from vault) |
| `graylog_datanode_install_version` | Graylog version |
| `graylog_datanode_install_disk_device` | Disk device for OpenSearch data |
| `graylog_datanode_install_opensearch_data_location` | Mount point and OpenSearch data path |
| `graylog_datanode_install_opensearch_heap` | OpenSearch heap size |
| `graylog_datanode_install_mongodb_uri` | MongoDB connection URI |

## Notes

- `graylog-datanode` is automatically restarted if any `datanode.conf` setting changes
- `vm.max_map_count=262144` is set permanently. This is a hard requirement for OpenSearch
- The data node must be installed and running **before** the main Graylog node
- After a MongoDB restore on the main Graylog node, the data node reconnects automatically
- OpenSearch heap is auto-calculated from available RAM (takes half of it by default) and can be overridden per host
