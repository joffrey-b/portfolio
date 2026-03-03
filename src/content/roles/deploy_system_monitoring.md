---
title: "Deploy System Monitoring"
category: "Monitoring & Metrics"
description: "This role deploys comprehensive system monitoring infrastructure including NRPE (Nagios Remote Plugin Executor), custom monitoring scripts, and Centreon plugins."
tags: ["Apache", "Centreon", "Debian", "Docker", "HTTPS"]
---

## Overview

This role deploys comprehensive system monitoring infrastructure including NRPE (Nagios Remote Plugin Executor), custom monitoring scripts, and Centreon plugins. It handles host-specific configurations for Docker containers, Proxmox hypervisor, OPNsense firewall, and Centreon monitoring server. The role installs packages, deploys custom check scripts, configures NRPE daemon with appropriate permissions, and sets up service integrations like Centreon Apache HTTPS and Proxmox PBS storage scheduling.

## What This Role Does

### For All Monitored Hosts

1. **Installs monitoring packages** (NRPE, Nagios plugins)
2. **Configures NRPE** to bind to VLAN12 IP
3. **Sets allowed_hosts** to permit Centreon server
4. **Creates `/etc/nrpe.d/` directory** for host-specific commands
5. **Deploys custom monitoring scripts** to appropriate directories
6. **Enables and starts NRPE service**

### For Docker Host

1. **Installs RedHat packages** (nrpe, nagios-plugins, cpanminus)
2. **Deploys `check_docker.py` script** to `/usr/lib64/nagios/plugins/`
3. **Deploys Docker NRPE commands** configuration to `/etc/nrpe.d/docker_commands.cfg`
4. **Adds nrpe user to docker group** for container access
5. **Restarts NRPE service** to apply changes

**Docker NRPE Commands**:
- `check_docker_containers`: Check container status
- `check_docker_uptime`: Check container uptime

### For Proxmox Host

1. **Installs Debian packages** (monitoring-plugins, nagios-nrpe-server, cpanminus)
2. **Installs Perl modules** (Config::Tiny) via cpanm
3. **Deploys `check_temp.sh` script** to `/usr/lib/nagios/plugins/`
4. **Deploys `check_smart.pl` script** to `/usr/lib/nagios/plugins/`
5. **Deploys Proxmox NRPE commands** configuration to `/etc/nrpe.d/proxmox_commands.cfg`
6. **Configures sudoers** for nagios user to run `smartctl` without password
7. **Creates PBS enable/disable scripts** and cron schedules
8. **Restarts NRPE service** to apply changes

**Proxmox NRPE Commands**:
- `check_cpu_temp`: Monitor CPU temperature
- `check_smart_sda`: Check SMART health for /dev/sda
- `check_smart_sdb`: Check SMART health for /dev/sdb
- `check_smart_sdc`: Check SMART health for /dev/sdc

### For Centreon Server

1. **Installs Centreon NRPE plugin** (centreon-nrpe3-plugin)
2. **Deploys Centreon custom scripts** to `/usr/lib/centreon/plugins/`
3. **Configures Apache for HTTPS** with SSL certificates
4. **Configures PHP settings** (session, memory, time limits, CA certificate)
5. **Disables Apache autoindex module** (security)
6. **Restarts httpd and php-fpm services**

### For OPNsense Firewall

1. **Deploys custom monitoring scripts** to `/usr/local/libexec/nagios/`

**Note**: OPNsense uses built-in NRPE, role only deploys scripts.

## Role Variables

| Variable | Description |
|----------|-------------|
| `deploy_system_monitoring_centreon_ip` | Centreon server IP for NRPE allowed_hosts |
| `deploy_system_monitoring_docker_uptime_warning` | Container uptime warning threshold (seconds) |
| `deploy_system_monitoring_docker_uptime_critical` | Container uptime critical threshold (seconds) |
| `deploy_system_monitoring_proxmox_cpu_temp_warning` | CPU temperature warning (°C) |
| `deploy_system_monitoring_proxmox_cpu_temp_critical` | CPU temperature critical (°C) |
| `deploy_system_monitoring_proxmox_cpu_sensor` | CPU sensor identifier |
| `deploy_system_monitoring_proxmox_smart_disks` | Disks for SMART monitoring (device + interface) |
| `deploy_system_monitoring_proxmox_pbs_storage_name` | PBS storage name in Proxmox |
| `deploy_system_monitoring_proxmox_pbs_enable_hour` | Hour to enable PBS storage |
| `deploy_system_monitoring_proxmox_pbs_enable_minute` | Minute to enable PBS storage |
| `deploy_system_monitoring_proxmox_pbs_disable_hour` | Hour to disable PBS storage |
| `deploy_system_monitoring_proxmox_pbs_disable_minute` | Minute to disable PBS storage |
| `deploy_system_monitoring_centreon_ssl_cert_path` | Centreon SSL certificate path |
| `deploy_system_monitoring_centreon_ssl_key_path` | Centreon SSL key path |

## Notes

- Role auto-detects host type from inventory groups and applies appropriate configuration
- NRPE binds to the VLAN12 IP address for Centreon communication on port 5666
- Proxmox hosts require `lm-sensors` and `smartmontools` (installed by the role)
- PBS scheduling creates cron jobs to enable/disable storage during and outside of backup windows
