---
name: "ARA"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "ARA Records Ansible"
description: "Records every Ansible playbook run across the homelab into a searchable web UI and API."
order: 2
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "ARA playbook run history"
    image: "./images/ara_playbook_run_history.png"
  - caption: "Playbook result detailed view"
    image: "./images/ara_playbook_run_detailed_view.png"
relatedRoles: ["docker_install", "docker_compositor"]
---

ARA Records Ansible records every Ansible playbook run across the homelab, every task, every host, every changed, failed, or ok result, into a searchable web UI and API. It's the audit trail behind the "everything as code" approach: when something changes, ARA shows exactly which playbook run did it and what else happened during that run.

It runs as a small API and UI pair in the Docker stack, deployed through the generic Compose roles rather than a dedicated role of its own.
