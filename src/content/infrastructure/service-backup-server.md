---
name: "Backup Server"
type: "service"
subtitle: "Proxmox BS"
description: "Dedicated Proxmox Backup Server running nightly encrypted backups of important VMs."
order: 1
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots: []
relatedRoles: ["cron_configuration", "system_update"]
---

A dedicated Proxmox Backup Server instance, isolated from the hypervisor it backs up, running nightly encrypted backups for every VM that needs point-in-time recovery.

See [Proxmox Backup Server](/infrastructure/service-proxmox-backup-server-app) in Self-Hosted Applications for more details.
