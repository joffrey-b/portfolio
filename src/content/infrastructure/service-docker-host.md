---
name: "Docker Host"
type: "service"
subtitle: "Redhat"
description: "RedHat VM running 15+ containerized services behind Nginx Proxy Manager with individual SSL certificates. Accessible only from within the network."
order: 2
icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
screenshots: []
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup", "docker_data_restore"]
---

A RedHat VM running Docker CE hosts the bulk of the homelab's self-hosted applications, 19+ containers sitting behind Nginx Proxy Manager for reverse proxying and per-service SSL.

See [Self-Hosted Applications](/infrastructure#self-hosted-applications) below for what each one is and does.
