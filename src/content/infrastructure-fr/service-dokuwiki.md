---
name: "DokuWiki"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Wiki"
description: "Wiki léger basé sur des fichiers, mis en place pour la documentation d'infrastructure et les notes, mais peu utilisé aujourd'hui."
order: 5
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
openSource: true
screenshots:
  - caption: "Page d'accueil DokuWiki"
    image: "./images/dokuwiki_start_page.png"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

DokuWiki est un wiki léger basé sur des fichiers, sans base de données requise, mis en place tôt pour documenter la construction de l'infrastructure et garder des tutoriels de reconstruction, ainsi que pour héberger des notes de jeu et d'autres notes diverses. En pratique, il est resté peu utilisé : Ansible et GitLab servent déjà de documentation d'infrastructure vivante, et le support Markdown de Joplin s'est révélé mieux adapté aux notes personnelles, si bien que DokuWiki est resté en grande partie inactif depuis. Les pages sont stockées en texte brut, ce qui les rend triviales à sauvegarder avec le reste des données de l'hôte Docker.

Il tourne via la stack Compose générique plutôt qu'avec un rôle dédié ; les données du volume Docker sous-jacent sont couvertes par `docker_data_backup`.
