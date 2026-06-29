---
name: "GitLab"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Hébergement de code"
description: "Hébergement Git et CI/CD auto-hébergé pour des projets personnels, dont le code Ansible de ce homelab et le client Sonixd Redux."
order: 7
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
openSource: true
screenshots:
  - caption: "Projets GitLab"
    image: "./images/gitlab_projects.png"
  - caption: "Pipeline CI/CD Sonixd Redux"
    image: "./images/sonixd_redux_cicd_pipeline.png"
relatedRoles: ["docker_install", "docker_compositor", "sonixd_redux_code_backup", "sonixd_redux_devel_code_backup"]
---

Une instance GitLab auto-hébergée hébergeant deux projets : le code Ansible de ce homelab, et Sonixd Redux (ainsi que sa branche de développement), un client musical compatible Subsonic. Rester auto-hébergé signifie un contrôle complet sur les runners CI et les limites de stockage sans dépendre d'une offre tierce, et un endroit où revenir à n'importe quel commit précédent si quelque chose casse.

Sonixd Redux dispose d'un pipeline CI/CD complet qui exécute les tests et construit l'application, utilisé pour valider les changements avant qu'ils soient poussés vers GitHub pour que les utilisateurs puissent les télécharger.

Les rôles `sonixd_redux_code_backup` et `sonixd_redux_devel_code_backup` ne touchent pas du tout aux données propres de GitLab : ils archivent en tar.gz le répertoire de travail local sur disque où le code est réellement développé (`~/Documents/git/sonixd-redux` et son équivalent `-devel`), et envoient l'archive vers les deux NAS, en conservant les 5 archives les plus récentes pour chacun. Les deux sont lancés manuellement, à la demande, dans le cadre d'une sauvegarde manuelle plus large plutôt que selon une tâche cron. Les données propres de GitLab, dépôts, tickets, historique CI, sont couvertes séparément : la VM de l'hôte Docker dans son ensemble est capturée par la sauvegarde nocturne de Proxmox vers PBS.
