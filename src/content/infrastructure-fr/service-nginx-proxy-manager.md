---
name: "Nginx Proxy Manager"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Reverse Proxy"
description: "Reverse proxy et terminaison SSL pour chaque application auto-hébergée de l'hôte Docker."
order: 19
icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
screenshots:
  - caption: "Liste des hôtes proxy de Nginx Proxy Manager"
    image: "./images/npm_hosts.png"
relatedRoles: ["docker_install", "docker_compositor"]
---

Nginx Proxy Manager se place devant chaque application auto-hébergée de l'hôte Docker, routant le domaine de chacune vers le bon conteneur et gérant la terminaison SSL avec des certificats Let's Encrypt, tout cela via sa propre interface web plutôt que des fichiers de configuration Nginx écrits à la main.

Il fait aussi office de proxy pour l'interface web de Frigate sur son serveur dédié, configuré de la même façon via sa propre instance là-bas. Déployé via la stack Compose générique plutôt qu'un rôle dédié, puisque les hôtes proxy et les certificats sont gérés à la main via l'interface sur les deux instances.
