---
title: "Login Banner"
category: "System Management"
description: "This role installs an ASCII art login banner showing system info on every interactive login, with optional per-host branded logos."
tags: ["Bash", "Debian", "RedHat", "Rocky Linux"]
---

## Overview

This role installs `linux_logo` to display an ASCII art logo with system information, OS version, CPU, RAM, hostname, on every interactive login. On Debian-based systems it's a direct package install; on RedHat-based systems, where no package exists, it builds `linux_logo` from source. Hosts can be given their own branded logo, or fall back to an OS-family default.

## What This Role Does

1. **Installs `linux_logo`**, via the package manager on Debian, or built from source on RedHat
2. **Deploys a per-host logo** when a custom override is configured, otherwise falls back to an OS-family default
3. **Writes the display configuration** controlling how the logo and system info are rendered
4. **Adds a login script** that displays the banner for the configured user only

## Role Variables

| Variable | Description |
|----------|-------------|
| `login_banner_linux_logo_version` | linux_logo version built on RedHat |
| `login_banner_custom_logo_template` | Per-host custom logo file, set in host_vars |
| `login_banner_user` | The only user shown the banner on login |

## Notes

- Idempotent on RedHat. The source build is skipped once `linux_logo` is already installed
- The banner only displays on the configured user's own login shell, staying silent on `sudo -i` / `su -`
- Custom per-host logos are generated from real company logo images using a Pillow-based conversion script
