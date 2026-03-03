---
title: "Graylog Install"
category: "Monitoring & Metrics"
description: "This role installs and configures MongoDB and Graylog server (Open) on the main Graylog node."
tags: ["Graylog", "MongoDB", "Java", "SSL", "TLS"]
---

## Overview

Installs and configures MongoDB and Graylog server (Open) on the main Graylog node. Intended for fresh installs or full rebuilds. After running this role, use `graylog_mongodb_restore` to restore configuration from backup.

## What This Role Does

1. **Adds the MongoDB yum repository** and installs `mongodb-org` with versionlock to prevent unintended upgrades
2. **Configures MongoDB** to listen on both localhost and the server VLAN interface
3. **Installs `graylog-server`** from the official Graylog repository
4. **Configures `server.conf`** with all required settings (HTTP, TLS, journal, MongoDB URI, JVM heap)
5. **Auto-calculates JVM heap** as half of available RAM (capped between 1g and 16g)
6. **Enables and starts** both `mongod` and `graylog-server`

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_graylog_password_secret` | Shared secret (min 64 chars) — must match the data node (from vault) |
| `vault_graylog_root_password` | Admin password (hashed with sha256 by the role) (from vault) |
| `graylog_install_mongodb_version` | MongoDB version |
| `graylog_install_version` | Graylog version |
| `graylog_install_root_timezone` | Timezone for Graylog root user |
| `graylog_install_http_bind_address` | Graylog HTTP bind address (management VLAN) |
| `graylog_install_http_enable_tls` | Enable HTTPS on the web UI |
| `graylog_install_http_tls_cert_file` | TLS certificate path |
| `graylog_install_http_tls_key_file` | TLS private key path |
| `graylog_install_message_journal_max_age` | Journal message retention age |
| `graylog_install_message_journal_max_size` | Journal maximum size on disk |
| `graylog_install_mongodb_uri` | MongoDB connection URI |
| `graylog_install_mongodb_max_connections` | MongoDB max connections |
| `graylog_install_jvm_heap` | JVM heap for Graylog server |
| `graylog_install_jvm_truststore` | JKS truststore for custom CA |

## Notes

- The data node (`graylog_datanode_install`) must be installed and running **before** this role
- The shared secret must be identical on both nodes and is stored in Ansible Vault
- After install, Graylog starts with a minimal configuration — run `graylog_mongodb_restore` to restore full configuration
- `graylog-server` is automatically restarted if any `server.conf` or sysconfig setting changes
- MongoDB listens on both localhost and the server VLAN interface — localhost is required by an internal Graylog component at startup
- MongoDB versionlock prevents unintended upgrades via `dnf update`
- On a fresh install, optional settings are appended at the bottom of `server.conf` since the default file has them commented out — this is functionally correct, Graylog reads the full file
- JVM heap is auto-calculated from available RAM (takes half of it by default) and can be overridden per host
