---
name: "Glance"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Tableau de bord"
description: "Page d'accueil auto-hébergée regroupant liens de services, statuts et flux dans un seul tableau de bord."
order: 8
icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
screenshots:
  - caption: "Page d'accueil du tableau de bord Glance"
    image: "./images/glance_dashboard.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor"]
---

Glance est un tableau de bord auto-hébergé sur une seule page, regroupant liens, statuts de services et flux RSS, le genre de page d'accueil qui met chaque autre service auto-hébergé à un clic plutôt qu'une rangée de favoris dans le navigateur. Il est rarement consulté pour l'aspect statut en particulier, puisque Centreon envoie déjà un e-mail dès que quelque chose va vraiment mal.

Il tourne via la stack Compose générique ; sa configuration tient dans un seul fichier YAML, assez simple pour ne pas nécessiter son propre rôle Ansible.
