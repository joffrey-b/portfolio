---
name: "Nextcloud"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "File Sync"
description: "Self-hosted file sync and storage, used as a personal cloud drive."
order: 18
icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
screenshots:
  - caption: "Nextcloud file browser"
    image: "./images/nextcloud_folders.png"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Nextcloud provides self-hosted file sync and storage, used as a personal cloud drive across desktop and mobile, an alternative to keeping files in a third-party cloud service.

I don't use it as my main storage, I mainly use it for calendar and for the files I attach to events.

It runs through the generic Compose stack; the underlying Docker volume data is covered by `docker_data_backup` rather than a Nextcloud-specific role.
