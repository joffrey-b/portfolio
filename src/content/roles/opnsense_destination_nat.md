---
title: "OPNsense Destination Nat"
category: "Firewall & Security"
description: "This role manages Destination NAT (port forwarding) rules on OPNsense via the REST API."
tags: ["DNS", "HTTPS", "JSON", "NTP", "OPNsense", "REST API", "SSH"]
---

## Overview

This role manages Destination NAT (port forwarding) rules on OPNsense via the REST API. It enables forwarding external traffic to internal hosts and redirecting traffic between interfaces. The role provides full lifecycle management: creating new rules, updating existing rules when configuration changes, and deleting orphaned rules that exist on the firewall but are no longer defined in the vars files.

## What This Role Does

1. **Fetches existing rules** via `/api/firewall/d_nat/search_rule`
2. **Builds sequence → UUID mapping** for idempotency
3. **Creates new rules** (sequence doesn't exist) via `/api/firewall/d_nat/addRule`
4. **Updates existing rules** (sequence exists but fields differ) via `/api/firewall/d_nat/setRule`
5. **Deletes orphaned rules** (sequence exists on firewall but not in vars) via `/api/firewall/d_nat/delRule`
6. **Applies configuration** via `/api/firewall/d_nat/apply`
7. **Displays summary** of configured rules

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_destination_nat_rules` | List of DNAT rules |
| `opnsense_destination_nat_validate_certs` | Validate SSL certificates |

**Rule definition fields:**

| Field | Description |
|-------|----------|-------------|
| `sequence` | Unique number for idempotency (must be unique) |
| `interface` | Incoming interface |
| `destination_port` | External port to match |
| `target` | Internal IP to forward to |
| `local_port` | Internal port to forward to |
| `description` | Rule description |
| `disabled` | `"0"` = active, `"1"` = disabled |
| `protocol` | `tcp`, `udp`, or `tcp/udp` |
| `log` | Log matched packets |

## Notes

- Removing a rule from the vars list will delete it from the firewall on the next run
- Changing a sequence number creates a new rule and orphans the old one (which gets deleted)
