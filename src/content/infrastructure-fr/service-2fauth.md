---
name: "2FAuth"
type: "service"
group: "app"
category: "Security"
subtitle: "Authentification à deux facteurs"
description: "Application auto-hébergée de double authentification pour stocker et générer des codes TOTP."
order: 1
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
openSource: true
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

2FAuth est une application web auto-hébergée pour stocker et générer des codes de double authentification (TOTP/HOTP), utilisée à la place d'une application d'authentification uniquement sur téléphone comme Google Authenticator ou Authy, spécifiquement pour garder les codes 2FA sur une infrastructure personnelle et sur un logiciel open-source. Elle tourne comme l'un des 15+ conteneurs de l'hôte Docker du homelab. Chaque compte avec la 2FA activée dépend de l'accessibilité de cette interface pour se connecter.

Comme la plupart des petites applications auto-hébergées ici, elle est déployée et mise à jour via la stack Compose de l'hôte Docker plutôt que par un rôle Ansible dédié. Il n'y a rien de spécifique à l'hôte à automatiser au-delà de l'entrée Compose initiale, donc les rôles génériques `docker_compositor` et `docker_data_backup` couvrent son déploiement et ses besoins de sauvegarde.
