---
name: "OpenMediaVault"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "NAS Software"
description: "Open-source NAS software providing secondary backup storage as a Proxmox VM."
order: 20
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "OpenMediaVault dashboard"
    image: "./images/omv_dashboard.png"
  - caption: "Shared folder configuration"
    image: "./images/omv_shared_folders.png"
openSource: true
relatedRoles: ["nas_mount", "nas_mount_systemd", "docker_data_backup"]
---

OpenMediaVault is the open-source NAS operating system running as a dedicated Proxmox VM, providing a redundant secondary backup target alongside the physical Synology NAS. A 6TB encrypted drive is attached to it, holding the same important data and backups as the Synology. Its own web UI handles storage pool and share management, and like the Synology, it exposes Samba shares that get mounted over CIFS from Linux and Windows machines.

Being a VM rather than dedicated hardware means it also inherits Proxmox's own backup coverage, on top of the data it stores for everything else.
