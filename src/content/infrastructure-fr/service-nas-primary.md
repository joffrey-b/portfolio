---
name: "NAS, Principal"
type: "service"
subtitle: "Synology"
description: "Cible de sauvegarde principale pour les VM Proxmox, les données Docker et plus encore."
order: 8
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots: []
relatedRoles: ["nas_mount", "nas_mount_systemd", "snmp", "ansible_code_backup"]
---

Le Synology DS418 cumule deux rôles : matériel physique et cible de sauvegarde principale référencée par presque tous les rôles de sauvegarde du dépôt Ansible.

Voir [Matériel Physique](/fr/infrastructure#physical-hardware) pour les caractéristiques, et [Synology DSM](/fr/infrastructure/service-synology-dsm) dans les applications auto-hébergées pour le logiciel qui tourne ici.
