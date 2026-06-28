---
name: "ARA"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Analyse des exécutions Ansible"
description: "Enregistre chaque exécution de playbook Ansible du homelab dans une interface web et une API consultables."
order: 2
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "Historique des exécutions de playbooks ARA"
    image: "./images/ara_playbook_run_history.png"
  - caption: "Vue détaillée d'un résultat de playbook"
    image: "./images/ara_playbook_run_detailed_view.png"
relatedRoles: ["docker_install", "docker_compositor"]
---

ARA Records Ansible enregistre chaque exécution de playbook Ansible du homelab, chaque tâche, chaque hôte, chaque résultat changé, échoué ou ok, dans une interface web et une API consultables. C'est la piste d'audit derrière l'approche « tout en tant que code » : quand quelque chose change, ARA montre exactement quelle exécution de playbook l'a fait et ce qui s'est passé d'autre durant cette exécution.

Elle tourne sous la forme d'une petite paire API/interface dans la stack Docker, déployée via les rôles Compose génériques plutôt que par un rôle dédié.
