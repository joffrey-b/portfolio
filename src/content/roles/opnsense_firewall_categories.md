---
title: "OPNsense Firewall Categories"
category: "Firewall & Security"
description: "This role manages firewall rule categories on OPNsense via the REST API."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL", "TLS"]
---

## Overview

This role manages firewall rule categories on OPNsense via the REST API. Categories help organize and visualize firewall rules by grouping them with colored labels. The role provides full lifecycle management: creating new categories, updating existing ones when configuration changes, and deleting orphaned categories that exist on the firewall but are no longer defined in the vars files.

## What This Role Does

1. **Fetches existing categories** via `/api/firewall/category/searchItem`

2. **Builds name → UUID mapping** for idempotency

3. **Creates new categories** (name doesn't exist) via `/api/firewall/category/addItem`

4. **Updates existing categories** (name exists but color/auto differ) via `/api/firewall/category/setItem`

5. **Deletes orphaned categories** (exist on firewall but not in vars) via `/api/firewall/category/delItem`

6. **Displays summary** of configured categories

**Note**: Categories are applied immediately - no reconfigure step needed.

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_firewall_categories_list` | List of categories to create |
| `opnsense_firewall_categories_validate_certs` | Validate SSL certificates |

**Category definition fields:**

| Field | Description |
|-------|----------|-------------|
| `name` | Category name (unique identifier) |
| `color` | Hex color code without `#` |
| `auto` | Auto-assign rules matching category name |

## Notes

- Categories not present in the list are deleted from OPNsense (list is source of truth)
- Assign categories to firewall rules via the `categories` field in the `opnsense_firewall` role
