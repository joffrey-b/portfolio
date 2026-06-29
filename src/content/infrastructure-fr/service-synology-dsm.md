---
name: "Synology DSM"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Logiciel NAS"
description: "Système d'exploitation NAS propriétaire sur matériel dédié, la cible de sauvegarde principale du homelab."
order: 26.5
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "Informations du Synology DS418"
    image: "./images/synology_ds418_info.png"
openSource: false
relatedRoles: ["nas_mount", "nas_mount_systemd", "snmp", "docker_data_backup", "ansible_code_backup"]
---

Synology DSM est le système d'exploitation NAS propriétaire tournant sur le matériel dédié DS418, la cible de sauvegarde principale du homelab référencée par presque tous les rôles de sauvegarde du dépôt Ansible. Sa propre interface web gère la gestion des pools de stockage (SHR), et il expose ses dossiers partagés via SMB, montés en CIFS depuis les machines Linux et Windows. Le dossier personnel et le dossier de sauvegarde sont tous les deux chiffrés.

Il n'a pas d'agent Telegraf propre, il expose donc ses métriques de santé et de capacité via SNMP, interrogées par Telegraf plutôt que directement par Grafana. Il reçoit aussi les sauvegardes des VM Proxmox chaque nuit, à la même cadence que PBS, ainsi que les données des volumes Docker et un large éventail d'autres sauvegardes gérées par Ansible.
