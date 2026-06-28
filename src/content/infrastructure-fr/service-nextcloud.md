---
name: "Nextcloud"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Synchronisation de fichiers"
description: "Synchronisation et stockage de fichiers auto-hébergés, utilisés comme cloud personnel."
order: 18
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "Navigateur de fichiers Nextcloud"
  - caption: "Paramètres de synchronisation mobile"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Nextcloud fournit une synchronisation et un stockage de fichiers auto-hébergés, utilisés comme cloud personnel entre ordinateur et mobile, une alternative à garder ses fichiers dans un service cloud tiers.

Il tourne via la stack Compose générique ; les données du volume Docker sous-jacent sont couvertes par `docker_data_backup` plutôt qu'un rôle spécifique à Nextcloud.
