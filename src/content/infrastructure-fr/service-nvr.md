---
name: "NVR"
type: "service"
subtitle: "Frigate"
description: "Enregistreur vidéo réseau gérant les caméras de sécurité IP sur un VLAN CCTV isolé, sur son propre serveur Debian dédié. A remplacé ZoneMinder, dont le rôle Ansible est conservé en réserve en cas de besoin de réinstallation."
order: 10
icon: "M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots: []
relatedRoles: ["frigate_install", "zoneminder_install", "zoneminder_monitors"]
---

Frigate est le NVR actif enregistrant les caméras IP du homelab sur un VLAN CCTV isolé, sur son propre serveur Debian dédié. Il a remplacé ZoneMinder, dont le rôle est conservé en réserve.

Voir [Frigate](/fr/infrastructure/service-frigate-app) dans les applications auto-hébergées pour l'installation complète.
