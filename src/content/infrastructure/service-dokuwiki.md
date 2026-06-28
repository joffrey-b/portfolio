---
name: "DokuWiki"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Wiki"
description: "Lightweight, file-based wiki used for internal documentation and notes."
order: 5
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "DokuWiki page list"
  - caption: "A rendered documentation page"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

DokuWiki is a lightweight, file-based wiki, no database required, used for internal documentation: network diagrams, runbooks, and notes that don't fit neatly into a README. Pages are stored as plain text files, which makes them trivial to back up alongside the rest of the Docker host's data.

It runs through the generic Compose stack rather than a dedicated role; the underlying Docker volume data is covered by `docker_data_backup`.
