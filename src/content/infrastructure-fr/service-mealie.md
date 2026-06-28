---
name: "Mealie"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Gestionnaire de recettes"
description: "Gestionnaire de recettes et planificateur de repas auto-hébergé."
order: 16
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Liste des recettes Mealie"
  - caption: "Calendrier du planificateur de repas"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Mealie est un gestionnaire de recettes et planificateur de repas auto-hébergé, utilisé pour garder les recettes recherchables et partageables plutôt qu'éparpillées entre favoris du navigateur et captures d'écran.

Il tourne via la stack Compose générique ; les données du volume Docker sous-jacent sont couvertes par `docker_data_backup` plutôt qu'un rôle spécifique aux recettes.
