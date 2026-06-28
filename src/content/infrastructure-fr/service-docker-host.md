---
name: "Hôte Docker"
type: "service"
subtitle: "Redhat"
description: "VM RedHat hébergeant 15+ services conteneurisés derrière Nginx Proxy Manager avec des certificats SSL individuels. Accessible uniquement depuis le réseau interne."
order: 2
icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
screenshots: []
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup", "docker_data_restore"]
---

Une VM RedHat faisant tourner Docker CE héberge la majorité des applications auto-hébergées du homelab, 19+ conteneurs derrière Nginx Proxy Manager pour le reverse proxy et le SSL par service.

Voir les [applications auto-hébergées](/fr/infrastructure#self-hosted-applications) plus bas pour ce qu'est chacune et ce qu'elle fait.
