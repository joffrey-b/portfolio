---
title: "Influxdb"
category: "Monitoring & Metrics"
description: "This role installs and configures InfluxDB 1.x time-series database on RedHat-based systems."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "JSON", "Nginx"]
---

## Overview

This role installs and configures InfluxDB 1.x time-series database on RedHat-based systems. It adds the official InfluxData repository, installs InfluxDB, configures HTTP/UDP/logging settings, creates databases with users and grants privileges, sets up retention policies for data lifecycle management, and ensures the service is enabled and started. The role is fully idempotent and checks for existing resources before creating them.

## What This Role Does

1. **Adds InfluxData repository**
   - URL: https://repos.influxdata.com/rhel/
   - Enables GPG verification

2. **Installs InfluxDB package** via dnf/yum
   - Version 1.x from official repository

3. **Configures HTTP API** in `/etc/influxdb/influxdb.conf`:
   - Bind address
   - Access logging
   - Enables/disables HTTP endpoint

4. **Configures logging**:
   - Format (logfmt or json)
   - Level (error, warn, info, debug)
   - Logo suppression

5. **Configures UDP input** (if enabled):
   - Bind address
   - Default database for UDP writes

6. **Starts and enables service**:
   - Starts InfluxDB
   - Ensures InfluxDB starts on boot

7. **Waits for InfluxDB** to be ready (port 8086)

8. **Checks existing users** (idempotent):
   - Queries: `SHOW USERS`
   - Parses JSON response

9. **Creates users**:
   - Only creates if not exists
   - Uses passwords from vault

10. **Checks existing databases** (idempotent):
    - Queries: `SHOW DATABASES`
    - Parses JSON response

11. **Creates databases**:
    - Only creates if not exists

12. **Grants privileges**:
    - `GRANT ALL ON database TO user`

13. **Checks existing retention policies**:
    - Queries: `SHOW RETENTION POLICIES ON database`

14. **Creates retention policies**:
    - Only creates if not exists
    - Sets as default if specified

## Role Variables

| Variable | Description |
|----------|-------------|
| `influxdb_databases` | List of databases to create; each entry supports an optional `user` (with `password`) and an optional `retention_policy` |
| `influxdb_service_enabled` | Enable InfluxDB service to start on boot |
| `influxdb_service_state` | Desired service state after role execution |
| `influxdb_http_enabled` | Enable HTTP API |
| `influxdb_http_bind_address` | HTTP API bind address |
| `influxdb_http_log_enabled` | Enable HTTP request logging |
| `influxdb_http_access_log_path` | Path to HTTP access log file |
| `influxdb_udp_enabled` | Enable UDP input listener |
| `influxdb_udp_bind_address` | UDP listener bind address |
| `influxdb_udp_database` | Default database for UDP writes |
| `influxdb_logging_level` | Log level |
| `influxdb_logging_format` | Log output format (`logfmt` or `json`) |
| `influxdb_logging_suppress_logo` | Suppress InfluxDB startup logo in logs |

**Database definition structure:**

```yaml
influxdb_databases:
  - name: homelab
    user: telegraf
    password: "{{ vault_influxdb_telegraf_password }}"
    retention_policy:
      name: thirty_days
      duration: 30d
      replication: 1
      default: true
  - name: opnsense
    retention_policy:
      name: ninety_days
      duration: 90d
      replication: 1
      default: true
```

## Notes

- Supports InfluxDB 1.x only (InfluxQL query language)
- Typically used as the backend for the Telegraf → InfluxDB → Grafana monitoring stack
