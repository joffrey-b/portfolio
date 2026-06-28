---
name: "NAS, Secondary"
type: "service"
subtitle: "OpenMediaVault"
description: "Secondary backup target running as a Proxmox VM, providing redundant storage for all critical data."
order: 9
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots: []
relatedRoles: ["nas_mount", "nas_mount_systemd", "docker_data_backup"]
---

OpenMediaVault runs as its own Proxmox VM, acting as a redundant secondary backup target alongside the physical Synology NAS.

See [OpenMediaVault](/infrastructure/service-openmediavault-app) in Self-Hosted Applications for the details.
