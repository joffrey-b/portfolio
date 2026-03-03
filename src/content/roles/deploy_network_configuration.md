---
title: "Deploy Network Configuration"
category: "Network & Storage"
description: "This role manages multi-VLAN network configuration across heterogeneous systems in the homelab environment."
tags: ["Centreon", "Debian", "Docker", "Grafana", "Graylog"]
---

## Overview

This role manages multi-VLAN network configuration across heterogeneous systems in the homelab environment. It deploys routing tables, NetworkManager configurations for RedHat systems, NetworkManager dispatcher scripts for Docker servers, custom routing scripts with systemd services for OpenMediaVault, and /etc/network/interfaces configuration for Proxmox and ZoneMinder. The role includes comprehensive safety features including confirmation prompts, check mode support, configuration backups, and connectivity validation to prevent accidental network disruption.

## What This Role Does

### 1. Display Confirmation Prompt (if enabled)

Shows warning with recommendations.

**When**: `deploy_network_configuration_require_confirmation: true` (default)

**Skipped if**:
- Confirmation disabled
- Host doesn't have `deploy_network_configuration_interfaces` defined

### 2. Deploy Routing Tables Configuration

**File**: `/usr/share/iproute2/rt_tables` (most) or `/etc/iproute2/rt_tables` (OMV)

**Content added**:
```
# Custom routing tables for policy-based routing
100 mgmt
101 servers
```

**Purpose**: Enables named routing tables for policy-based routing

### 3. Deploy OS-Specific Network Configuration

**RedHat NetworkManager** (Centreon, Docker, Grafana, Graylog, etc.):
- Copies `.nmconnection` files to `/etc/NetworkManager/system-connections/`
- Sets permissions: `0600` (root only, security requirement)
- Copies dispatcher scripts to `/etc/NetworkManager/dispatcher.d/`
- Sets permissions: `0755` (executable)
- Reloads or restarts NetworkManager

**Debian NetworkManager** (OpenMediaVault):
- Deploys custom routing script to `/usr/local/bin/setup-omv-routing.sh`
- Creates systemd service: `omv-routing.service`
- Service runs after `network-online.target`
- Enables and starts service
- Configures nginx to bind web interface to management VLAN IP
- Preserves localhost bindings for local access
- Restarts nginx when configuration changes

**Debian ifupdown** (Proxmox, ZoneMinder):
- Deploys `/etc/network/interfaces` from template
- Creates backup of existing configuration first
- Restarts networking service

### 4. Validate Network Connectivity

After configuration changes:
- Waits up to 60 seconds for network to stabilize
- Tests Ansible connectivity
- Reports success or failure

**If validation fails**: You have console access to troubleshoot

## Role Variables

| Variable | Description |
|----------|-------------|
| `deploy_network_configuration_require_confirmation` | Prompt for confirmation before applying changes |
| `deploy_network_configuration_rt_tables` | Routing table definitions |
| `deploy_network_configuration_interfaces` | Per-host interface config (defined in host_vars) |
| `deploy_network_configuration_interfaces_file` | Debian interfaces file |

## Notes

- Role is designed for **configuration drift prevention**, or initial network setup
- Ansible requires network connectivity to run, so a minimal manual bootstrap must be done first
- `deploy_network_configuration_require_confirmation: false` disables the safety prompt (for CI/CD)
- Each host defines its own `deploy_network_configuration_interfaces` in `host_vars`
