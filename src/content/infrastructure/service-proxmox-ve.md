---
name: "Proxmox VE"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Hypervisor Software"
description: "Open-source KVM/LXC virtualization platform hosting most of the homelab as virtual machines."
order: 26
icon: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
screenshots:
  - caption: "Proxmox VE datacenter view"
  - caption: "VM console"
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

Proxmox VE is the open-source virtualization platform running on the HP Z440, providing the KVM/LXC hypervisor underneath almost every other service in the homelab. Its web UI handles VM and container lifecycle, storage, networking, and backups in one place.

Unlike OPNsense, Proxmox itself isn't driven through a dedicated Ansible role. VMs are provisioned and managed largely by hand through its UI, while the Linux guests running inside those VMs are what Ansible actually configures. Host-level maintenance, updates, reboots, is still automated through `system_update`, same as any other Linux host.
