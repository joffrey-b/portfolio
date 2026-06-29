---
name: "Joplin"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Notes"
description: "Self-hosted, end-to-end encrypted note-taking app, synced across devices."
order: 12
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Joplin notebook view"
    image: "./images/joplin_notebook.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Joplin is a self-hosted, end-to-end encrypted note-taking app, synced across desktop and mobile clients via its own sync server running in the Docker stack, with every note syncing automatically as soon as the app opens on any device. Markdown support and notebook import/export make notes easy to organize, back up, and restore on top of the underlying container backup.

Notes are encrypted client-side before they ever reach the server, so the server only ever stores ciphertext. It's deployed through the generic Compose stack, with the underlying volume covered by `docker_data_backup`.
