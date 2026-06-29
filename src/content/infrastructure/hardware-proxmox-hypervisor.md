---
name: "Proxmox VE Hypervisor"
type: "hardware"
subtitle: "HP Z440"
description: "Main server running 10+ VMs: monitoring stack, logging, Docker services, Frigate, OpenMediaVault, a Windows 11 gaming VM with PCI passthrough, a Linux Mint dev VM, and test servers."
order: 2
specs: ["Intel Xeon E5-2698v3 @ 2.30GHz", "128GB DDR4 RAM", "1TB PNY SSD (VM storage)", "6TB + 3TB Seagate HDD", "1× Intel I350-T4"]
screenshots: []
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

The HP Z440 is the workhorse of the homelab, a workstation-class machine repurposed as the main Proxmox VE hypervisor. Its Xeon E5-2698v3 (16 cores / 32 threads) and 128GB of DDR4 give it enough headroom to run 10+ VMs simultaneously without contention.

Storage is split between a 1TB PNY SSD for VM disks (fast boot/IO for everything that needs it) and a 6TB + 3TB HDD pair for less latency-sensitive bulk storage.

Hosted VMs span the full range of the homelab: the monitoring stack, the logging stack, the Docker host running 19+ self-hosted apps, Frigate's dedicated NVR server, OpenMediaVault for secondary backups, a Windows 11 gaming VM with full PCI passthrough of a dedicated GPU that also runs a GitLab CI runner for jobs needing a Windows environment, a Linux Mint VM that doubles as the Ansible controller and the dev station for Sonixd Redux and other personal projects, and a pair of disposable RedHat and Debian test servers, reset from a clean snapshot after each round of testing.

See [Self-Hosted Applications](/infrastructure#self-hosted-applications) below for what each of those VMs actually runs.
