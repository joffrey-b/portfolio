---
name: "PostgreSQL"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Database"
description: "Shared PostgreSQL instance backing the self-hosted apps that need it."
order: 24
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
openSource: true
screenshots: []
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

A shared PostgreSQL instance running in the Docker stack, used as backing storage for the self-hosted apps that need it, alongside the separate MariaDB instance for apps that need MySQL compatibility instead. It currently backs Joplin and Mealie; Koito used it too before moving to its own SQLite database.

It has no web UI of its own, so there's nothing to screenshot here, it's pure plumbing. It's deployed through the generic Compose stack, with the underlying volume data covered by `docker_data_backup`.
