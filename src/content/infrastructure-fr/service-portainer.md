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
    image: "./images/portainer_container_list.png"
  - caption: "Utilisation des ressources d'un conteneur"
    image: "./images/portainer_container_stats.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor"]
---

Portainer fournit une interface web pour inspecter et gérer les conteneurs, images, réseaux et volumes de l'hôte Docker, utile pour vérifier rapidement la santé et l'utilisation des ressources d'un conteneur sans se connecter en SSH et lancer `docker ps` à la main, et pour consulter ou exporter les logs des conteneurs.

Il n'est pas utilisé pour déployer la stack elle-même, c'est Docker Compose qui s'en charge directement, mais il tourne via cette même stack Compose générique aux côtés des services qu'il gère.
