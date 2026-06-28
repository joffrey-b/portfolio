---
name: "Serveur de Sauvegarde"
type: "service"
subtitle: "Proxmox BS"
description: "Proxmox Backup Server dédié effectuant des sauvegardes chiffrées des VMs importantes chaque nuit."
order: 1
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots: []
relatedRoles: ["cron_configuration", "system_update"]
---

Une instance Proxmox Backup Server dédiée, isolée de l'hyperviseur qu'elle sauvegarde, exécutant des sauvegardes chiffrées nocturnes pour chaque VM nécessitant une restauration à un instant donné.

Voir [Proxmox Backup Server](/fr/infrastructure/service-proxmox-backup-server-app) dans les applications auto-hébergées pour plus de détails.
