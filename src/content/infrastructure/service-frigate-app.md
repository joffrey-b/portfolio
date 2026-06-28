---
name: "Frigate"
type: "service"
group: "app"
category: "Security"
subtitle: "NVR Software"
description: "Open-source NVR software for the homelab's IP cameras, the active system after replacing ZoneMinder."
order: 6
icon: "M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "Frigate live view"
  - caption: "Recording timeline"
relatedRoles: ["frigate_install", "zoneminder_install", "zoneminder_monitors"]
---

Frigate is the open-source NVR software recording the homelab's IP cameras, running as its own Docker Compose stack on a dedicated Debian server. It replaced ZoneMinder as the active system; this deployment is recording-only, with object detection and Home Assistant integration switched off since the host has no GPU.

The previous ZoneMinder installation is kept in the Ansible repository on standby rather than deleted, in case it's ever needed again.
