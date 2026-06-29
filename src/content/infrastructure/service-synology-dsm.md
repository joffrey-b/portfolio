---
name: "Synology DSM"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "NAS Software"
description: "Proprietary NAS operating system on dedicated hardware, the homelab's primary backup target."
order: 26.5
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "Synology DS418 info"
    image: "./images/synology_ds418_info.png"
openSource: false
relatedRoles: ["nas_mount", "nas_mount_systemd", "snmp", "docker_data_backup", "ansible_code_backup"]
---

Synology DSM is the proprietary NAS operating system running on the dedicated DS418 hardware, the homelab's primary backup target referenced by nearly every backup role in the Ansible repository. Its own web UI handles storage pool management (SHR), and it exposes shared folders over SMB, mounted via CIFS from both Linux and Windows machines. The personal folder and the backup folder are both encrypted.

It has no Telegraf agent of its own, so it exposes its health and capacity metrics over SNMP instead, polled by Telegraf rather than queried directly by Grafana. It also receives nightly Proxmox VM backups, the same cadence as PBS, alongside Docker volume data and a wide range of other Ansible-managed backups.
