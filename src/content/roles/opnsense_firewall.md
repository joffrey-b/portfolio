---
title: "OPNsense Firewall"
category: "Firewall & Security"
description: "This role manages firewall rules across multiple network interfaces on OPNsense via the REST API."
tags: ["Centreon", "DNS", "Grafana", "HTTPS", "InfluxDB", "JSON"]
---

## Overview

This role manages firewall rules across multiple network interfaces on OPNsense via the REST API. It supports configuration for VLANs (VLAN10-22), WAN, LAN, and WireGuard interfaces. The role provides full lifecycle management: creating new rules, updating existing rules when configuration changes, and deleting orphaned rules that exist on the firewall but are no longer defined in the vars files.

## What This Role Does

1. **Iterates through interfaces**:
   - vlan10, vlan12, vlan14, vlan16, vlan18, vlan20, vlan22
   - wg0, lan, wan

2. **For each interface with defined rules**:
   - **Fetches existing categories** via `/api/firewall/category/searchItem` and builds name → UUID mapping
   - **Fetches existing rules** via `/api/firewall/filter/search_rule`
   - **Builds sequence → UUID mapping** for idempotency
   - **Creates new rules** (sequence doesn't exist) via `/api/firewall/filter/addRule`
   - **Updates existing rules** (sequence exists but fields differ) via `/api/firewall/filter/setRule`
   - **Deletes orphaned rules** (sequence exists on firewall but not in vars) via `/api/firewall/filter/delRule`
   - **Applies configuration** via `/api/firewall/filter/apply`

3. **Displays summary**: Lists interfaces configured

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_firewall_rules` | Dictionary of rules organized by interface name |
| `opnsense_firewall_vlan10_rules` | Management VLAN rules |
| `opnsense_firewall_vlan12_rules` | Servers VLAN rules |
| `opnsense_firewall_vlan14_rules` | Desktops VLAN rules |
| `opnsense_firewall_vlan16_rules` | WiFi trusted rules |
| `opnsense_firewall_vlan18_rules` | WiFi guest rules |
| `opnsense_firewall_vlan20_rules` | WiFi CCTV rules |
| `opnsense_firewall_vlan22_rules` | Ethernet guest rules |
| `opnsense_firewall_wg0_rules` | WireGuard VPN rules |
| `opnsense_firewall_lan_rules` | LAN interface rules |
| `opnsense_firewall_wan_rules` | WAN interface rules |
| `opnsense_firewall_validate_certs` | Validate SSL certificates |

**Rule definition fields:**

| Field | Description |
|-------|-------------|
| `sequence` | Unique number per interface (idempotency key) |
| `action` | `pass`, `block`, or `reject` |
| `interface` | Interface name |
| `description` | Rule description |
| `protocol` | `tcp`, `udp`, `icmp`, etc. |
| `source_net` | Source address (`any`, alias name, or CIDR) |
| `destination_net` | Destination address |
| `destination_port` | Destination port |
| `log` | `"1"` to log matched packets |
| `categories` | Category name (see `opnsense_firewall_categories` role) |

## Notes

- Removing a rule from vars deletes it from the firewall on the next run
- Sequence numbers must be unique per interface but can be reused across interfaces
- Define firewall categories first using the `opnsense_firewall_categories` role
- Define aliases first using the `opnsense_aliases` role if referenced in rules
