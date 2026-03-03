---
title: "OPNsense Unbound DNSBL"
category: "Firewall & Security"
description: "This role configures DNS Blocklists (DNSBL) in OPNsense Unbound resolver via the REST API."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL", "TLS"]
---

## Overview

This role configures DNS Blocklists (DNSBL) in OPNsense Unbound resolver via the REST API. DNSBL blocks malicious domains, ads, trackers, and other unwanted content at the DNS level.

## What This Role Does

1. **Fetches existing DNSBL config** via `/api/unbound/settings/search_dnsbl`
2. **Compares with desired config** (enabled, type, lists, allowlists, etc.)
3. **Updates if different** via `/api/unbound/settings/set_dnsbl/{uuid}`
4. **Applies DNSBL changes** via `/api/unbound/service/dnsbl`
5. **Displays summary** of DNSBL status

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_unbound_dnsbl_config` | DNSBL configuration object |
| `opnsense_unbound_dnsbl_validate_certs` | Validate SSL certificates |

**Configuration structure:**

```yaml
opnsense_unbound_dnsbl_config:
  enabled: "1"          # Enable DNSBL
  type:                 # Blocklist source codes (see below)
    - ag                # AdGuard
    - sb                # Steven Black
    - atf               # ThreatFox
    - hgz003            # Hagezi PRO
  lists: []             # Custom blocklist URLs
  allowlists: []        # Domains to whitelist
  blocklists: []        # Domains to explicitly block
  wildcards: []         # Wildcard domain blocks
  nxdomain: "0"         # Return NXDOMAIN (1) or redirect (0)
  cache_ttl: "72000"    # Cache TTL in seconds
  description: "default"
```

**Blocklist source codes (selection):**

| Code | Description |
|------|-------------|
| `ag` | AdGuard |
| `sb` | Steven Black |
| `atf` | ThreatFox IOC database |
| `el` | EasyList |
| `ep` | EasyPrivacy |
| `hgz001`–`hgz021` | Hagezi lists (LIGHT to ULTIMATE) |
| `oisd0`–`oisd2` | OISD domain blocklists |

## Notes

- DNSBL changes are applied immediately via the Unbound service reconfigure endpoint
- Add frequently-blocked legitimate domains to `allowlists` to prevent false positives
