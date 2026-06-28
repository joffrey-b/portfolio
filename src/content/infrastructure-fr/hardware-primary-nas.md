---
name: "NAS Principal"
type: "hardware"
subtitle: "Synology DS418"
description: "Cible de sauvegarde principale. Utilise le RAID SHR de Synology et des dossiers chiffrés. Reçoit les sauvegardes Proxmox toutes les deux nuits."
order: 4
specs: ["4× 3 To Seagate Ironwolf", "12 To de stockage brut", "Volumes chiffrés"]
screenshots: []
relatedRoles: ["nas_mount", "nas_mount_systemd", "snmp", "docker_data_backup"]
---

Un Synology DS418 avec quatre disques Ironwolf de 3 To en SHR (Synology Hybrid RAID), offrant environ 9 To de stockage utile et redondant. C'est la destination de sauvegarde principale pour presque tous les services du homelab.

Voir les [applications auto-hébergées](/fr/infrastructure#self-hosted-applications) pour savoir quelles applications sauvegardent ici et comment.
