---
name: "Proxmox Backup Server"
type: "hardware"
subtitle: "HP EliteDesk 800 G2"
description: "Hôte de sauvegarde dédié sous Proxmox Backup Server. Sauvegardes chiffrées des VMs importantes exécutées chaque nuit."
order: 3
specs: ["Intel Xeon E3-1245v3", "16 Go DDR3 RAM", "NIC intégrée"]
screenshots: []
relatedRoles: ["cron_configuration", "system_update", "login_banner"]
---

Un HP EliteDesk au format compact, reconverti uniquement en serveur Proxmox Backup Server dédié. Garder les sauvegardes sur un matériel physique séparé de l'hyperviseur Proxmox VE qu'il protège signifie qu'une panne matérielle sur le serveur principal ne peut pas emporter à la fois les VMs et leurs sauvegardes.

Chaque VM importante reçoit une sauvegarde chiffrée, dédupliquée et incrémentale chaque nuit.

Voir [Proxmox Backup Server](/fr/infrastructure/service-proxmox-backup-server-app) dans les applications auto-hébergées pour en savoir plus sur le logiciel qui tourne ici.
