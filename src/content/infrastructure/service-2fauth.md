---
name: "2FAuth"
type: "service"
group: "app"
category: "Security"
subtitle: "Two-Factor Auth"
description: "Self-hosted two-factor authentication app for storing and generating TOTP codes."
order: 1
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
screenshots:
  - caption: "2FAuth account list"
  - caption: "TOTP code generation"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

2FAuth is a self-hosted web app for storing and generating two-factor authentication codes (TOTP/HOTP), an alternative to a phone-only authenticator app. It runs as one of the 15+ containers on the homelab's Docker host.

Like most of the smaller self-hosted apps here, it's deployed and updated through the Docker host's Compose stack rather than a dedicated Ansible role. There's nothing host-specific to automate beyond the initial service entry, so the generic `docker_compositor` and `docker_data_backup` roles cover its deployment and backup needs.
