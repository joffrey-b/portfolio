---
name: "Primary NAS"
type: "hardware"
subtitle: "Synology DS418"
description: "Primary backup target. Uses Synology SHR Raid and encrypted folders. Receives Proxmox backups every two nights."
order: 4
specs: ["4× 3TB Seagate Ironwolf", "12TB raw storage", "Encrypted volumes"]
screenshots: []
relatedRoles: ["nas_mount", "nas_mount_systemd", "snmp", "docker_data_backup"]
---

A Synology DS418 with four 3TB Ironwolf drives in SHR (Synology Hybrid RAID), giving roughly 9TB of usable, redundant storage. It's the primary backup destination for nearly every service in the homelab.

See [Self-Hosted Applications](/infrastructure#self-hosted-applications) for which apps back up here and how.
