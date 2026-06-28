---
name: "Portainer"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Gestion de conteneurs"
description: "Interface web pour inspecter et gérer les conteneurs, images et volumes de l'hôte Docker."
order: 23
icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
screenshots:
  - caption: "Liste des conteneurs Portainer"
  - caption: "Utilisation des ressources d'un conteneur"
relatedRoles: ["docker_install", "docker_compositor"]
---

Portainer fournit une interface web pour inspecter et gérer les conteneurs, images, réseaux et volumes de l'hôte Docker, utile pour une vérification visuelle rapide sans se connecter en SSH et lancer `docker ps` à la main.

Il tourne via la stack Compose générique aux côtés des services qu'il gère.
