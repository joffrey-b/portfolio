---
name: "Maloja"
type: "service"
group: "app"
category: "Media"
subtitle: "Suivi de scrobbles"
description: "Tracker de scrobbling secondaire de sauvegarde pour l'historique d'écoute musicale, conservé aux côtés de Koito, le tracker principal."
order: 14
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Historique de scrobbles Maloja"
  - caption: "Graphiques de statistiques d'écoute"
relatedRoles: ["maloja_backup", "maloja_import_backup", "cron_configuration"]
---

Maloja est un tracker de scrobbling auto-hébergé pour l'historique d'écoute musicale, tournant comme sauvegarde de Koito, le tracker principal des statistiques d'écoute, plutôt que comme une seconde source principale indépendante.

Ses données sont sauvegardées chaque nuit via le rôle `maloja_backup`, qui s'authentifie au backend Maloja et exporte l'historique de scrobbling vers deux NAS. Le rôle `maloja_import_backup` gère la restauration depuis l'un de ces exports si Maloja devait être réinstallé.
