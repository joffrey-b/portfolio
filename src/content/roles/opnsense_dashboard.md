---
title: "OPNsense Dashboard"
category: "Firewall & Security"
description: "This role configures the OPNsense web UI dashboard widget layout via the REST API."
tags: ["DHCP", "DNS", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Overview

This role configures the OPNsense web UI dashboard widget layout via the REST API. It applies a defined widget layout including widget positions, sizes, and per-widget configurations (e.g., selected interfaces for traffic graph, thermal sensors selection). The layout is always applied to ensure consistency.

## What This Role Does

1. **POST widget layout** to `/api/core/dashboard/save_widgets`
   - Sends the full widget list with positions, sizes, and configurations
   - API returns `{"result": "saved"}`

The role always applies the desired layout. This is a lightweight API call that ensures the dashboard matches the defined configuration.

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_dashboard_widgets` | List of widget definitions |
| `opnsense_dashboard_validate_certs` | Validate SSL certificates |
| `opnsense_dashboard_options` | Dashboard-level options |

**Widget definition fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | Widget identifier |
| `x` | int | Horizontal position (0-11, 12-column grid) |
| `y` | int | Vertical position in pixels |
| `w` | int/null | Width in columns (null = default) |
| `h` | int | Height in pixels |
| `minW` | int | Minimum width in columns |
| `widget` | dict | Widget-specific configuration |

## Notes

- The role always applies the full widget list, replacing the current layout each time the role is run
