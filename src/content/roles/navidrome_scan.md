---
title: "Navidrome Scan"
category: "Applications"
description: "This role triggers music library scans in Navidrome using the Subsonic API."
tags: ["Docker", "HTTPS", "JSON", "Navidrome", "Python"]
---

## Overview

This role triggers music library scans in Navidrome using the Subsonic API. It generates secure authentication tokens using MD5 hashing with random salt, calls the Navidrome startScan API endpoint, supports both incremental and full scan modes, and displays scan status and statistics (tracks found, folders scanned) after triggering the scan.

## What This Role Does

1. **Generates random salt** (6-character hexadecimal)
   - Used for Subsonic API authentication
   - Prevents replay attacks

2. **Calculates MD5 token**
   - Formula: `MD5(password + salt)`
   - Subsonic API authentication method

3. **Calls Subsonic API** startScan endpoint:
   - URL: `/rest/startScan`
   - Method: GET
   - Authentication: Token + salt
   - Parameters: username, token, salt, format (json), version (1.8.0), client, fullScan

4. **Displays scan status**:
   - Scanning status (true/false)
   - Scan type (incremental/full)

5. **Displays statistics**:
   - Number of tracks found
   - Number of folders scanned

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_navidrome_joffrey_user` | Navidrome username (from vault) |
| `vault_navidrome_joffrey_password` | Navidrome password (from vault) |
| `navidrome_scan_url` | Navidrome server URL |
| `navidrome_scan_full` | `true` for full scan, `false` for incremental |

## Notes

- Uses Subsonic API with MD5/salt token authentication
- Default incremental scan detects only new or modified files (faster)
- Full scan (`navidrome_scan_full: true`) re-scans entire library
