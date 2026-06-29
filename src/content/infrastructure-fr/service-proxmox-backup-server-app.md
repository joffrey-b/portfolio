---
name: "Proxmox Backup Server"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Logiciel de sauvegarde"
description: "Logiciel de sauvegarde open-source offrant des sauvegardes de VMs dédupliquées, incrémentales et chiffrées."
order: 25
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Vue d'ensemble du datastore PBS"
    image: "./images/pbs_datastore_overview.png"
  - caption: "Statut des sauvegardes"
    image: "./images/pbs_backups.png"
openSource: true
relatedRoles: ["cron_configuration", "system_update"]
---

Proxmox Backup Server est le pendant logiciel du matériel de sauvegarde dédié sur lequel il tourne, développé par l'équipe Proxmox elle-même plutôt que par un tiers, ce qui lui permet de s'intégrer étroitement à Proxmox VE : déduplication, sauvegardes incrémentales et chiffrement côté client fonctionnent nativement.

Il s'allume via le BIOS avant les sauvegardes nocturnes, et une tâche cron l'éteint une fois celles-ci terminées, si bien que la machine ne consomme de l'électricité que lorsque c'est réellement nécessaire. Une passe de vérification s'exécute chaque jour pour confirmer que les sauvegardes ne sont pas corrompues.

Sa propre interface web couvre la gestion des datastores et la vérification des sauvegardes ; la planification du moment où son stockage est monté dans Proxmox est gérée par le rôle `cron_configuration` plutôt que par PBS lui-même.
