---
name: "MariaDB"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Base de données"
description: "Instance MariaDB partagée utilisée par les applications auto-hébergées nécessitant un stockage compatible MySQL."
order: 15
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots: []
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Une instance MariaDB partagée tournant dans la stack Docker, utilisée comme stockage par les applications auto-hébergées ayant besoin d'un stockage compatible MySQL plutôt que chaque application n'embarque son propre conteneur de base de données.

Elle n'a pas d'interface web propre, il n'y a donc rien à montrer en capture d'écran ici, c'est de la pure plomberie. Elle est déployée via la stack Compose générique, avec les données du volume sous-jacent couvertes par `docker_data_backup`.
