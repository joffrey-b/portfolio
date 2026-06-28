---
title: "NTP Client"
category: "System Management"
description: "This role installs and configures Chrony as an NTP (Network Time Protocol) client for accurate time synchronization."
tags: ["Chrony", "Debian", "NTP", "OPNsense", "RedHat"]
---

## Overview

This role installs and configures Chrony as an NTP (Network Time Protocol) client for accurate time synchronization. It installs the chrony package, configures it to sync with the OPNsense firewall as the local NTP server, enables RTC (Real-Time Clock) synchronization, configures clock stepping for large time offsets, and ensures the chronyd service is enabled and started.

## What This Role Does

1. **Installs chrony package**
   - Package name: `chrony`
   - Includes chronyd daemon and chronyc client tool

2. **Deploys chrony.conf** from template:
   - Sets NTP server to OPNsense IP (VLAN10)
   - Configures drift file location
   - Enables RTC synchronization
   - Sets makestep parameters
   - Configures log directory
   - Sets port to 0 (client-only)

3. **Creates backup** of existing config (if any)

4. **Restarts chronyd service** (via handler):
   - Applies new configuration
   - Ensures service is enabled (starts on boot)

## Role Variables

| Variable | Description |
|----------|-------------|
| `ntp_client_chrony_package` | Package name to install |
| `ntp_client_driftfile` | Drift file path |
| `ntp_client_drift_seconds` | Makestep threshold (seconds) |
| `ntp_client_drift_limit` | Makestep attempts before slew-only |
| `ntp_client_port` | NTP listen port (0 = client-only) |
| `ntp_client_log_path` | Log directory |
| `ntp_client_config_path` | `/etc/chrony` (Debian) or `/etc` (RedHat) |
| `ntp_client_config_file_name` | Config file name |

## Notes

- Runs in client-only mode (`port 0`), does not serve NTP to other hosts
- RTC sync enabled, updates hardware clock
- Config is backed up before changes; service restarted via handler
