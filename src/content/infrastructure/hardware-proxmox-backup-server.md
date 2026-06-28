---
name: "Proxmox Backup Server"
type: "hardware"
subtitle: "HP EliteDesk 800 G2"
description: "Dedicated backup host running Proxmox Backup Server. Encrypted backups of important VMs run every night."
order: 3
specs: ["Intel Xeon E3-1245v3", "16GB DDR3 RAM", "Integrated NIC"]
screenshots: []
relatedRoles: ["cron_configuration", "system_update", "login_banner"]
---

A small-form-factor HP EliteDesk, repurposed purely as a dedicated Proxmox Backup Server. Keeping backups on separate physical hardware from the Proxmox VE hypervisor it protects means a hardware failure on the main server can't take out both the VMs and their backups at once.

Every important VM gets an encrypted, deduplicated, incremental backup every night.

See [Proxmox Backup Server](/infrastructure/service-proxmox-backup-server-app) in Self-Hosted Applications for more on the software running here.
