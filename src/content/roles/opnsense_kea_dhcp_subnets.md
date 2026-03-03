---
title: "OPNsense KEA DHCP Subnets"
category: "Firewall & Security"
description: "This role manages KEA DHCPv4 subnets in OPNsense via the REST API."
tags: ["DHCP", "DNS", "Kea", "NTP", "OPNsense", "VLAN", "YAML"]
---

## Overview

This role manages KEA DHCPv4 subnets with full CRUD operations (Create, Read, Update, Delete). Subnets manage IP address ranges, DNS definition, and default gateway to give to the machine that makes the request.

## What This Role Does

1. **Fetches existing subnets** via `/api/kea/dhcpv4/search_subnet` to build a CIDR → UUID lookup

2. **For each subnet in `opnsense_kea_dhcp_subnets_list`**:
   - **Creates new subnets** (CIDR not in OPNsense) via `/api/kea/dhcpv4/add_subnet`
   - **Updates existing subnets** (CIDR exists but pools, description, or DHCP options differ) via `/api/kea/dhcpv4/set_subnet`

3. **Deletes subnets** not in the list via `/api/kea/dhcpv4/del_subnet` (list is source of truth)

4. **If any changes were made**: reconfigures KEA service via `/api/kea/service/reconfigure`

5. **Displays a summary** with the count of created, updated, and deleted subnets

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_kea_dhcp_subnets_list` | List of subnet definitions |

**Subnet definition fields:**

| Field | Description |
|-------|----------|-------------|
| `subnet` | Subnet CIDR |
| `pools` | IP range |
| `description` | Subnet description |
| `option_data` | DHCP options (see below) |

**Available DHCP options in `option_data`:**

| Key | Description |
|-----|-------------|
| `domain_name_servers` | DNS server(s) |
| `routers` | Default gateway |
| `domain_name` | Domain name |
| `ntp_servers` | NTP server(s) |
| `tftp_server_name` | TFTP server (PXE) |

## Notes

- Subnets not in `opnsense_kea_dhcp_subnets_list` are deleted (list is source of truth)
- Run `opnsense_kea_dhcp_settings` before this role to enable KEA DHCP
- After creating subnets, run `opnsense_kea_dhcp_reservations` to add static assignments
