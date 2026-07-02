---
title: "OPNsense Trust Certificates"
category: "Firewall & Security"
description: "This role manages SSL/TLS certificates on OPNsense via the REST API."
tags: ["Centreon", "DNS", "HTTPS", "JSON", "Navidrome", "OPNsense", "SSL"]
---

## Overview

This role manages SSL/TLS certificates on OPNsense via the REST API. It provides full lifecycle management: creating new certificates signed by an existing OPNsense CA, reissuing certificates when configuration changes or they expire, and deleting certificates not defined in code. Certificate and private key files are saved locally for deployment to services.

## What This Role Does

1. **Fetch CA list** and look up CA by name to get `refid`
2. **Fetch existing certificates** from OPNsense and build lookup by description
3. **Create new certificates** that exist in config but not in OPNsense
   - Signs with the configured CA
   - Saves .crt and .key files locally
4. **Check existing certificates for reissue need**:
   - Common name changed
   - DNS/IP/URI/email SANs changed
   - Certificate type, key type, or digest changed
   - Certificate expired (`valid_to` < current timestamp)
5. **Reissue certificates** that need updating
   - Generates new certificate (keeps same private key)
   - Saves updated .crt file locally
6. **Delete certificates** not defined in code
7. **Display summary** of created, reissued, and deleted certificates

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_trust_certificates_list` | List of certificate definitions |
| `opnsense_trust_certificates_ca_name` | Name of the signing CA in OPNsense |
| `opnsense_trust_certificates_validate_certs` | Validate SSL certificates for API calls |
| `opnsense_trust_certificates_output_dir` | Directory for exported .crt/.key files |

**Certificate definition fields:**

| Field | Description |
|-------|-------------|
| `descr` | Certificate description (used as unique identifier) |
| `commonname` | Certificate Common Name (CN) |
| `altnames_dns` | DNS Subject Alternative Names (multi-line string) |
| `altnames_ip` | IP Subject Alternative Names (multi-line string) |
| `key_type` | RSA key size (default: `2048`) |
| `lifetime` | Validity in days (default: `1200` ≈ 3.3 years) |

## Notes

- Certificates are reissued automatically when CN, SANs, key type, or expiry changes
- Certificates not in the list are deleted from OPNsense (list is source of truth)
- Private keys are never logged (`no_log: true` on sensitive tasks)
