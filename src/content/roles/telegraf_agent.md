---
title: "Telegraf Agent"
category: "Monitoring & Metrics"
description: "This role installs and configures the Telegraf monitoring agent on Linux systems for collecting and forwarding system metrics to InfluxDB."
tags: ["Centreon", "Debian", "Docker", "Grafana", "Graylog"]
---

## Overview

This role installs and configures the Telegraf monitoring agent on Linux systems for collecting and forwarding system metrics to InfluxDB. It uses a two-tier configuration approach with a main config file containing agent settings, InfluxDB output, and common input plugins, plus host-specific configs for specialized inputs like Docker monitoring, SNMP polling, etc. The role supports both RedHat and Debian systems, automatically manages repository configuration, validates Telegraf configuration before deploying, and handles service management.

## What This Role Does

### 1. Configure InfluxData Repository

**RedHat/CentOS**:
- Adds InfluxData yum repository
- Installs GPG key for package verification

**Debian/Ubuntu**:
- Adds InfluxData apt repository
- Installs GPG key

### 2. Install Telegraf Package

- Installs `telegraf` package from InfluxData repository.

### 3. Deploy Main Configuration

**File**: `/etc/telegraf/telegraf.conf`

**Content**:
- Agent settings (interval, flush, buffer)
- InfluxDB output configuration
- Common input plugins (always enabled):
  - CPU metrics
  - Disk usage
  - Disk I/O
  - Kernel statistics
  - Memory usage
  - Processes
  - Swap usage
  - System load/uptime
  - Network interfaces
  - Network statistics

### 4. Deploy Host-Specific Configurations

**Directory**: `/etc/telegraf/telegraf.d/`

**Conditional configs** (based on enabled flags):
- `docker.conf`: Docker monitoring (`enable_docker_input: true`)
- `temp.conf`: Temperature sensors (`enable_temp_input: true`)
- `interrupts.conf`: Interrupt monitoring (`enable_interrupts_input: true`)
- `sysctl.conf`: Sysctl monitoring (`enable_sysctl_input: true`)
- `snmp_synology.conf`: Synology SNMP (`enable_snmp_synology: true`)
- `snmp_zyxel.conf`: Zyxel AP SNMP (`enable_snmp_zyxel_ap: true`)

### 5. Add Telegraf to Docker Group (if Docker enabled)

If `telegraf_agent_enable_docker_input: true`:
- Adds `telegraf` user to `docker` group
- Allows Telegraf to access Docker socket
- Restarts Telegraf to apply group membership

### 6. Validate Configuration

Before restarting Telegraf:
- Runs `telegraf --config /etc/telegraf/telegraf.conf --test`
- Validates configuration syntax
- Fails deployment if config invalid

### 7. Enable and Start Service

- Enables Telegraf service on boot
- Starts or restarts Telegraf service
- Service runs as `telegraf` user

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_influxdb_telegraf_password` | InfluxDB password for the Telegraf user (from vault) |
| `telegraf_agent_service_name` | Telegraf systemd service name |
| `telegraf_agent_interval` | Metrics collection interval |
| `telegraf_agent_round_interval` | Round collection interval to the configured interval |
| `telegraf_agent_metric_batch_size` | Maximum metrics per write batch |
| `telegraf_agent_metric_buffer_limit` | Maximum metrics to buffer per output |
| `telegraf_agent_collection_jitter` | Random jitter added to collection interval |
| `telegraf_agent_flush_interval` | Flush interval for all outputs |
| `telegraf_agent_flush_jitter` | Random jitter added to flush interval |
| `telegraf_agent_precision` | Timestamp precision (empty = no rounding) |
| `telegraf_agent_influxdb_url` | InfluxDB server URL |
| `telegraf_agent_influxdb_database` | InfluxDB database name |
| `telegraf_agent_influxdb_retention_policy` | InfluxDB retention policy name |
| `telegraf_agent_influxdb_username` | InfluxDB username |
| `telegraf_agent_cpu_percpu` | Collect per-CPU metrics |
| `telegraf_agent_cpu_totalcpu` | Collect total CPU metrics |
| `telegraf_agent_cpu_collect_cpu_time` | Collect CPU time metrics |
| `telegraf_agent_cpu_report_active` | Report active CPU metrics |
| `telegraf_agent_cpu_core_tags` | Add core tags to CPU metrics |
| `telegraf_agent_disk_ignore_fs` | Filesystem types to exclude from disk metrics |
| `telegraf_agent_enable_docker_input` | Enable Docker container monitoring |
| `telegraf_agent_docker_endpoint` | Docker socket path for monitoring |
| `telegraf_agent_docker_group` | OS group to add telegraf user to for Docker access |
| `telegraf_agent_enable_snmp_synology` | Enable Synology NAS SNMP monitoring |
| `telegraf_agent_snmp_synology_agents` | List of Synology NAS SNMP agent addresses |
| `telegraf_agent_snmp_synology_interval` | SNMP collection interval for Synology |
| `telegraf_agent_snmp_synology_timeout` | SNMP request timeout for Synology |
| `telegraf_agent_snmp_synology_retries` | SNMP request retry count for Synology |
| `telegraf_agent_snmp_synology_version` | SNMP protocol version for Synology |
| `telegraf_agent_snmp_synology_community` | SNMP community string for Synology |
| `telegraf_agent_snmp_synology_max_repetitions` | SNMP max repetitions for bulk requests |
| `telegraf_agent_snmp_synology_name` | Measurement name for Synology SNMP data |

## Notes

- Enable host-specific inputs in `host_vars` (e.g., `telegraf_agent_enable_docker_input: true` on Docker hosts)
- Docker monitoring requires Telegraf user added to the `docker` group
- Common inputs (interrupts, sysctl, temp) are baked into the base config template and always enabled
- SNMP monitoring for Synology requires community strings in Ansible Vault
- Configuration is validated (`telegraf --test`) before deployment
