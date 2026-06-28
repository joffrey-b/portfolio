---
name: "GitLab"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Hébergement de code"
description: "Hébergement Git et CI/CD auto-hébergé, utilisé pour des projets personnels dont le client Sonixd Redux."
order: 7
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "Vue d'ensemble d'un projet GitLab"
  - caption: "Vue d'un pipeline CI/CD"
relatedRoles: ["docker_install", "docker_compositor", "sonixd_redux_code_backup", "sonixd_redux_devel_code_backup"]
---

Une instance GitLab auto-hébergée utilisée pour des projets personnels, dont Sonixd Redux et sa branche de développement, un client musical compatible Subsonic. Rester auto-hébergé signifie un contrôle complet sur les runners CI et les limites de stockage sans dépendre d'une offre tierce.

Les dépôts eux-mêmes sont sauvegardés indépendamment via les rôles `sonixd_redux_code_backup` et `sonixd_redux_devel_code_backup`, qui archivent l'arborescence de travail vers deux NAS selon leur propre planning, séparément des données de GitLab.
