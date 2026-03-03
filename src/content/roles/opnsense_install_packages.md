---
title: "OPNsense Install Packages"
category: "Firewall & Security"
description: "This role installs plugins and packages on OPNsense firewall via the REST API."
tags: ["Centreon", "Chrony", "DNS", "Grafana", "HTTPS"]
---

## Overview

This role installs plugins and packages on OPNsense firewall via the REST API. It automates the installation of essential plugins including Chrony (NTP), Telegraf (metrics), SNMP, NRPE (monitoring), SMART (disk health), backup utilities, and UI themes using the OPNsense firmware API endpoint.

## What This Role Does

1. **For each package in the list**:
   - **Sends POST request** to `/api/core/firmware/install/{package}`
   - **Installs package** from OPNsense repository
   - **Expects 200 OK** response

2. **No configuration**: Role only installs packages, doesn't configure them

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_install_packages_list` | List of packages to install |
| `opnsense_install_packages_validate_certs` | Validate SSL certificates |

**Default package list:**

```yaml
opnsense_install_packages_list:
  - os-chrony           # NTP client
  - os-cpu-microcode-intel  # Intel CPU microcode
  - os-dmidecode        # Hardware information
  - os-net-snmp         # SNMP daemon
  - os-nrpe             # Nagios plugin executor
  - os-sftp-backup      # SFTP backup utility
  - os-smart            # SMART disk monitoring
  - os-telegraf         # Telegraf metrics agent
  - os-theme-advanced   # UI theme
  - os-theme-cicada     # UI theme
  - os-theme-rebellion  # UI theme
  - os-theme-flexcolor  # UI theme
```

## Notes

- Packages already installed are skipped (idempotent)
- Run this role before `opnsense_telegraf_configuration` and `opnsense_syslog_configuration`
