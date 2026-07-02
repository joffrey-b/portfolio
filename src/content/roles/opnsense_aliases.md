---
title: "OPNsense Aliases"
category: "Firewall & Security"
description: "This role creates and manages firewall aliases on OPNsense via the REST API."
tags: ["HTTPS", "JSON", "OPNsense", "REST API", "SSL"]
---

## Overview

This role creates and manages firewall aliases on OPNsense via the REST API. Aliases are named groups of IP addresses, networks, or other objects that simplify firewall rule management. The role uses name-based idempotency to create new aliases or update existing ones, applies configuration changes to activate them, and provides a summary of configured aliases.

**Note**: This role does NOT support deletion to avoid accidentally removing system-created aliases. Delete aliases manually via OPNsense Web UI (Firewall → Aliases).

## What This Role Does

1. **Fetches existing aliases** via `/api/firewall/alias/searchItem`

2. **Builds name → UUID mapping** for idempotency

3. **For each alias in opnsense_aliases_definition**:
   - **Creates new aliases** (name doesn't exist) via `/api/firewall/alias/addItem`
   - **Updates existing aliases** (name exists but fields differ) via `/api/firewall/alias/setItem`

4. **If any aliases changed**:
   - **Calls reconfigure endpoint** (`/api/firewall/alias/reconfigure`)
   - **Applies changes** to active firewall configuration

5. **Displays summary**:
   - Lists all configured alias names

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_aliases_definition` | List of aliases to create |
| `opnsense_aliases_validate_certs` | Validate SSL certificates |

**Alias definition fields:**

| Field | Description |
|-------|-------------|
| `name` | Alias name (no spaces, use underscore) |
| `type` | `host`, `network`, `port`, or `url` |
| `content` | List of IPs/networks/ports |
| `description` | Human-readable description |
| `enabled` | `"1"` to enable, `"0"` to disable |
| `counters` | Track packet statistics |

## Notes

- Aliases are referenced by name in firewall rules (`opnsense_firewall` role)
- Deletion is intentionally not supported to prevent accidental removal of system aliases
- Changes are applied immediately via the OPNsense reconfigure API
