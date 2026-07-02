---
title: "OPNsense KEA DHCP Reservations"
category: "Firewall & Security"
description: "This role manages KEA DHCPv4 static reservations in OPNsense via the REST API."
tags: ["DHCP", "Kea", "OPNsense", "YAML"]
---

## Overview

This role manages KEA DHCPv4 static reservations (MAC → IP mappings) with full CRUD operations. DHCP reservations allow static IP address assignment for equipments that don't have network settings available. I mainly use it for my IP cameras, so I can then use firewall rules to block outbound traffic.

## What This Role Does

1. **Fetches existing subnets** via `/api/kea/dhcpv4/search_subnet` to build a CIDR → UUID lookup

2. **Fetches existing reservations** via `/api/kea/dhcpv4/search_reservation` to build a MAC → UUID lookup

3. **For each reservation in `opnsense_kea_dhcp_reservations_list`**:
   - **Creates new reservations** (MAC not in OPNsense) via `/api/kea/dhcpv4/add_reservation`
   - **Updates existing reservations** (MAC exists but IP, hostname, or description differ) via `/api/kea/dhcpv4/set_reservation`

4. **Deletes reservations** not in the list via `/api/kea/dhcpv4/del_reservation` (list is source of truth)

5. **If any changes were made**: reconfigures KEA service via `/api/kea/service/reconfigure`

6. **Displays a summary** with the count of created, updated, and deleted reservations

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_kea_dhcp_reservations_list` | List of static reservations |

**Reservation definition fields:**

| Field | Description |
|-------|-------------|
| `subnet` | Subnet CIDR (must match existing subnet) |
| `ip_address` | Static IP to assign |
| `hw_address` | MAC address (lowercase, colon-separated) |
| `hostname` | Optional hostname |
| `description` | Optional description |

## Notes

- Reservations not in `opnsense_kea_dhcp_reservations_list` are deleted (list is source of truth)
- Run `opnsense_kea_dhcp_subnets` before this role
