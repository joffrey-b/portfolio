---
name: "Nginx Proxy Manager"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Reverse Proxy"
description: "Reverse proxy and SSL termination for every self-hosted app on the Docker host."
order: 19
icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
screenshots:
  - caption: "Nginx Proxy Manager proxy host list"
  - caption: "SSL certificate status"
relatedRoles: ["docker_install", "docker_compositor"]
---

Nginx Proxy Manager sits in front of every self-hosted app on the Docker host, routing each one's domain to the right container and handling SSL termination with Let's Encrypt certificates, all through its own web UI instead of hand-written Nginx config files.

It also proxies Frigate's web UI on its dedicated server, configured the same way through its own instance there. Deployed through the generic Compose stack rather than a dedicated role, since proxy hosts and certificates are managed by hand through the UI on both instances.
