---
name: "OpenMediaVault"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Logiciel NAS"
description: "Logiciel NAS open-source fournissant un stockage de sauvegarde secondaire en tant que VM Proxmox."
order: 20
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "Tableau de bord OpenMediaVault"
    image: "./images/omv_dashboard.png"
  - caption: "Configuration d'un dossier partagé"
    image: "./images/omv_shared_folders.png"
relatedRoles: ["nas_mount", "nas_mount_systemd", "docker_data_backup"]
---

OpenMediaVault est le système d'exploitation NAS open-source tournant en tant que VM Proxmox dédiée, fournissant une cible de sauvegarde secondaire redondante aux côtés du NAS Synology physique. Sa propre interface web gère les pools de stockage et le partage de dossiers.

Être une VM plutôt qu'un matériel dédié signifie qu'elle hérite aussi de la couverture de sauvegarde propre à Proxmox, en plus des données qu'elle stocke pour tout le reste.
