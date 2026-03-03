---
title: "OPNsense Unbound Settings"
category: "Firewall & Security"
description: "This role configures the general and advanced Unbound DNS resolver settings in OPNsense via the REST API."
tags: ["DHCP", "DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL"]
---

## Overview

This role configures the general and advanced Unbound DNS resolver settings in OPNsense via the REST API.

## What This Role Does

1. **Fetches existing config** via `/api/unbound/settings/get`
2. **Compares with desired config** (general and advanced settings)
3. **Updates if different** via `/api/unbound/settings/set`
4. **Reconfigures Unbound** via `/api/unbound/service/reconfigure`
5. **Displays summary** of settings status

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_unbound_settings_general` | General Unbound settings |
| `opnsense_unbound_settings_advanced` | Advanced Unbound settings |
| `opnsense_unbound_settings_validate_certs` | Validate SSL certificates |

**General settings structure (key fields):**

```yaml
opnsense_unbound_settings_general:
  enabled: "1"
  port: "53"
  active_interface:       # Interfaces to listen on (use opt codes)
    - opt1                # VLAN10Management
    - opt2                # VLAN12Servers
  outgoing_interface:
    - wan
  dnssec: "0"             # Enable DNSSEC validation
  regdhcp: "0"            # Register DHCP leases in DNS
  safesearch: "0"         # Force SafeSearch
  local_zone_type: "transparent"
```

**Advanced settings structure (key fields):**

```yaml
opnsense_unbound_settings_advanced:
  hideidentity: "0"
  hideversion: "0"
  prefetch: "0"           # Enable prefetching for faster responses
  logqueries: "0"         # Log DNS queries
  logreplies: "0"
  logverbosity: "1"       # 0=none, 1=operational, 2-5=verbose
  privateaddress:
    - "10.0.0.0/8"
    - "172.16.0.0/12"
    - "192.168.0.0/16"
```

## Notes

- Apply changes to Unbound host overrides and DNSBL after changing general settings
