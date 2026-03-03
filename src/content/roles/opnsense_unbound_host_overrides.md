---
title: "OPNsense Unbound Host Overrides"
category: "Firewall & Security"
description: "This role manages DNS host overrides (local DNS records) in OPNsense Unbound resolver via the REST API."
tags: ["DNS", "Grafana", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Overview

This role manages DNS host overrides (local DNS records) in OPNsense Unbound resolver via the REST API. It provides full lifecycle management: creating new overrides, updating existing overrides when configuration changes, and deleting orphaned overrides that exist on OPNsense but are no longer defined in the vars files.

## What This Role Does

1. **Fetches existing overrides** via `/api/unbound/settings/searchHostOverride`
2. **Builds hostname+domain → UUID mapping** for idempotency
3. **Creates new overrides** via `/api/unbound/settings/addHostOverride`
4. **Updates existing overrides** via `/api/unbound/settings/setHostOverride/{uuid}`
5. **Deletes orphaned overrides** via `/api/unbound/settings/delHostOverride/{uuid}`
6. **Reconfigures Unbound** via `/api/unbound/service/reconfigure` to apply changes
7. **Displays summary** of configured overrides

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_unbound_host_overrides_list` | List of DNS host overrides |
| `opnsense_unbound_host_overrides_validate_certs` | Validate SSL certificates |

**Override definition fields:**

| Field | Description |
|-------|----------|-------------|
| `hostname` | Hostname |
| `domain` | Domain portion |
| `server` | IP address to resolve to |
| `enabled` | `"1"` to enable, `"0"` to disable |
| `rr` | Record type: `A`, `AAAA`, or `MX` |
| `mxprio` | MX record priority (required when `rr` is `MX`) |
| `mx` | Mail server hostname (required when `rr` is `MX`) |
| `description` | Human-readable description |

## Notes

- Overrides not in `opnsense_unbound_host_overrides_list` are deleted (list is source of truth)
- Changes are applied immediately via Unbound reconfigure
