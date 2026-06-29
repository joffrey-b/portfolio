---
name: "Frigate"
type: "service"
group: "app"
category: "Security"
subtitle: "Logiciel NVR"
description: "Logiciel NVR open-source pour les caméras IP du homelab, le système actif depuis le remplacement de ZoneMinder."
order: 6
icon: "M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
openSource: true
relatedRoles: ["frigate_install", "zoneminder_install", "zoneminder_monitors"]
---

Frigate est le logiciel NVR open-source enregistrant les caméras IP du homelab, tournant en tant que sa propre stack Docker Compose sur une VM Debian dédiée avec un disque chiffré pour que les images restent en sécurité. Il a remplacé ZoneMinder en tant que système actif ; ce déploiement est utilisé uniquement pour l'enregistrement, la détection d'objets et l'intégration Home Assistant étant désactivées puisque le serveur ne dispose pas de GPU.

Les flux des caméras peuvent être consultés en direct, et jusqu'à 10 jours d'images passées sont conservés avant d'être supprimés.

L'ancienne installation ZoneMinder est conservée dans le dépôt Ansible en réserve plutôt que supprimée, au cas où elle serait à nouveau nécessaire un jour.
