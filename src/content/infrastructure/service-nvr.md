---
name: "NVR"
type: "service"
subtitle: "Frigate"
description: "Network video recorder managing IP security cameras on an isolated CCTV VLAN, running on its own dedicated Debian server. Replaced ZoneMinder, whose Ansible role is kept on standby in case a reinstall is ever needed."
order: 10
icon: "M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots: []
relatedRoles: ["frigate_install", "zoneminder_install", "zoneminder_monitors"]
---

Frigate is the active NVR recording the homelab's IP cameras on an isolated CCTV VLAN, running on its own dedicated Debian server. It replaced ZoneMinder, whose role is kept on standby.

See [Frigate](/infrastructure/service-frigate-app) in Self-Hosted Applications for the full setup.
