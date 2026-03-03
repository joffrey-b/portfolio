---
title: "OPNsense Source Nat"
category: "Firewall & Security"
description: "This role creates and manages outbound NAT (Source NAT/SNAT) rules on OPNsense via the REST API."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Overview

This role creates and manages outbound NAT (Source NAT/SNAT) rules on OPNsense via the REST API. SNAT translates internal private IP addresses to the WAN IP address, enabling internet access for internal networks. The role creates SNAT rules, applies configuration changes, and provides a summary of configured rules.

## What This Role Does

1. **Fetches existing SNAT rules** via `/api/firewall/source_nat/search_rule` to build a sequence → UUID lookup

2. **For each rule in `opnsense_source_nat_rules`**:
   - **Creates new rules** (sequence not in OPNsense) via `/api/firewall/source_nat/addRule`
   - **Updates existing rules** (sequence exists but any field differs) via `/api/firewall/source_nat/setRule`

3. **Deletes orphaned rules** (sequences on the firewall not in vars) via `/api/firewall/source_nat/delRule`

4. **If any changes were made**: applies configuration via `/api/firewall/source_nat/apply`

5. **Displays a summary** with the total number of configured rules

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_source_nat_rules` | List of SNAT rules |
| `opnsense_source_nat_validate_certs` | Validate SSL certificates |

**Rule definition fields:**

| Field | Description |
|-------|----------|-------------|
| `sequence` | Rule sequence number (used as idempotency key) |
| `interface` | Outbound interface (usually `wan`) |
| `source_net` | Source network (CIDR or alias) |
| `target` | Translation target (usually `wan_address`) |
| `description` | Rule description |
| `enabled` | `"1"` = active, `"0"` = disabled |
| `destination_net` | Destination (usually `any`) |
| `log` | Log NAT translations |
| `staticnatport` | Preserve source port |

## Notes

- `wan_address` is a special OPNsense keyword that resolves to the current WAN IP
- The WAN interface is connected to my ISP router, which then also does NAT to a public IP address
- Rules are idempotent — matched by sequence number on existing rules
- Configure firewall rules in `opnsense_firewall` to allow traffic before NAT applies
