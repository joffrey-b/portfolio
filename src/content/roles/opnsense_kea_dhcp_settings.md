---
title: "OPNsense KEA DHCP Settings"
category: "Firewall & Security"
description: "This role configures general KEA DHCPv4 settings in OPNsense via the REST API."
tags: ["DHCP", "Kea", "OPNsense", "REST API", "VLAN", "YAML"]
---

## Overview

This role configures general KEA DHCPv4 settings in OPNsense via the REST API. It configures listening interfaces, DHCP lease time, and other settings.

## What This Role Does

1. **Fetches current KEA DHCPv4 configuration** via `/api/kea/dhcpv4/get`

2. **Compares current settings** with the desired state (enabled flag, listening interfaces, lease lifetime, firewall rules flag, socket type)

3. **If settings differ**: updates via `/api/kea/dhcpv4/set`

4. **If updated**: reconfigures KEA service via `/api/kea/service/reconfigure`

5. **Displays status**: whether settings were updated or already up to date

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_kea_dhcp_settings_general` | General KEA DHCP configuration |

**Settings structure:**

```yaml
opnsense_kea_dhcp_settings_general:
  enabled: "1"              # Enable KEA DHCP
  interfaces:               # Interfaces to serve DHCP (use opt codes)
    - opt1                  # VLAN10Management
    - opt2                  # VLAN12Servers
  valid_lifetime: "21600"   # Lease time in seconds (6 hours default)
  fwrules: "1"              # Auto-create firewall rules for DHCP
  dhcp_socket_type: "raw"   # raw or udp
```

**Interface codes:**

| Code | Interface |
|------|-----------|
| `opt1` | VLAN10Management |
| `opt2` | VLAN12Servers |
| `opt3` | VLAN14Desktops |
| `opt4` | VLAN16WifiTrusted |
| `opt5` | VLAN18WifiGuest |
| `opt6` | VLAN20WifiCCTV |
| `opt7` | VLAN22EthernetGuest |

## Notes

- Run this role before `opnsense_kea_dhcp_subnets` and `opnsense_kea_dhcp_reservations`
- `fwrules: "1"` automatically creates OPNsense firewall rules to allow DHCP traffic
