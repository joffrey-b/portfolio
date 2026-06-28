---
title: "System Update"
category: "System Management"
description: "This role orchestrates comprehensive system updates across heterogeneous infrastructure including Debian, RedHat, and OPNsense systems with intelligent reboot handling and Centreon monitoring integration."
tags: ["Centreon", "Debian", "Docker", "HTTPS", "MariaDB"]
---

## Overview

This role orchestrates comprehensive system updates across heterogeneous infrastructure including Debian, RedHat, and OPNsense systems with intelligent reboot handling and Centreon monitoring integration. It performs OS-specific updates, detects kernel updates requiring reboots, schedules Centreon downtimes to prevent false alerts during maintenance, automatically reboots systems when necessary, and provides informational summaries. The role handles special cases like Proxmox updates that affect VMs, Docker daemon updates triggering container restarts, Graylog server and its data node services restart after package updates, and Centreon-specific package exclusions. This role supports a flag to activate automatic reboot or not. This is useful so critical hosts like Proxmox and OPNsense are not restarted automatically on kernel updates.

## What This Role Does

**Comprehensive update orchestration**:

1. **OS Detection**: Identifies system type (Debian/RedHat/OPNsense)
2. **Package Updates**: Applies all available updates
3. **Kernel Detection**: Identifies if kernel was updated
4. **Downtime Scheduling**: Schedules Centreon maintenance windows
5. **Automatic Reboots**: Reboots systems when kernel was updated and if automatic reboot is allowed
6. **Status Reporting**: Provides clear update summaries, and informs if a manual reboot is required

**Special handling**:
- **Proxmox**: Schedules downtime for VMs when host kernel updates
- **Docker**: Handles Docker daemon and container updates separately
- **Centreon**: Excludes MySQL packages from Centreon servers (currently conflicts with Centreon SQL package)
- **OPNsense**: Uses API to check for firmware updates, and apply them if no reboot is required

## Role Variables

| Variable | Description |
|----------|-------------|
| `system_update_auto_reboot_enabled` | Automatically reboot after kernel updates |
| `system_update_reboot_timeout` | Seconds to wait for system to return after reboot |
| `system_update_reboot_message` | Message shown to logged-in users before reboot |
| `system_update_centreon_excluded_packages` | Packages excluded from updates on Centreon servers |
| `system_update_downtime_duration_minutes` | Centreon downtime duration (minutes) |
| `system_update_docker_prune_on_update` | Prune unused Docker resources after updates |
| `system_update_opnsense_api_timeout` | Timeout for OPNsense firmware API calls (seconds) |
| `system_update_opnsense_validate_certs` | Validate SSL certificates for OPNsense API |
| `system_update_apt_cache_valid_time` | Apt cache validity before refresh (seconds) |
| `system_update_apt_autoremove` | Remove unused packages after update (Debian) |
| `system_update_apt_autoclean` | Clean apt cache after update (Debian) |

## Notes

- Auto-reboot is disabled by default. Enable per-host in `host_vars` if desired
- Proxmox host updates schedule Centreon downtimes for all hosted VMs before rebooting
- Docker hosts automatically prune old images to save disk space
- Graylog services (`graylog-server`, `graylog-datanode`) are restarted automatically if their packages are updated
- OPNsense updates use the firmware API (not package manager)
