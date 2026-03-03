---
title: "OPNsense Telegraf Configuration"
category: "Monitoring & Metrics"
description: "This role configures Telegraf metrics collection agent on OPNsense."
tags: ["Grafana", "InfluxDB", "JSON", "OPNsense", "SSH", "Telegraf"]
---

## Overview

This role configures Telegraf metrics collection agent on OPNsense firewall by deploying custom monitoring scripts and configuring input plugins. It creates a scripts directory, deploys a CPU temperature monitoring script, adds input configuration to telegraf.conf, and restarts the Telegraf service to activate monitoring. This enables CPU temperature metrics to be collected and sent to InfluxDB for visualization in Grafana.

## What This Role Does

1. **Create scripts directory**:
   - Ensures `/usr/local/etc/telegraf-scripts` exists
   - Creates it if not present
   - Sets permissions: `0755` (rwxr-xr-x)

2. **Deploy CPU temperature script**:
   - Copies `cputemp.sh` to scripts folder
   - Sets executable permissions: `0755`
   - Script queries `sysctl dev.cpu` for temperatures

3. **Configure exec input**:
   - Adds configuration block to `/usr/local/etc/telegraf.conf`
   - Uses `blockinfile` with markers for idempotency
   - Configures command path, timeout, data format

4. **Restart Telegraf**:
   - Restarts `telegraf` service
   - Activates new configuration
   - Begins collecting CPU temperature metrics

## Role Variables

| Variable | Description |
|----------|-------------|
| `opnsense_telegraf_configuration_scripts_folder` | Directory for monitoring scripts |
| `opnsense_telegraf_configuration_temperature_script_name` | CPU temperature script filename |
| `opnsense_telegraf_configuration_exec_timeout` | Script execution timeout |
| `opnsense_telegraf_configuration_data_format` | Output format (InfluxDB line protocol) |
| `opnsense_telegraf_configuration_config_file_name` | Telegraf config filename |

## Notes

- Run `opnsense_install_packages` first to install the `os-telegraf` plugin
- The role deploys a `cputemp.sh` script that outputs InfluxDB data
- Telegraf is restarted after configuration changes to activate the new configuration
