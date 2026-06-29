---
name: "BentoPDF"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "PDF Tools"
description: "Self-hosted toolkit for merging, splitting, and converting PDF files without uploading them to a third party."
order: 3
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "BentoPDF tool selection screen"
    image: "./images/bento_pdf_tools.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

BentoPDF is a self-hosted toolkit for merging, splitting, compressing, and converting PDF files, with all the processing happening client-side in the browser rather than on a server, so files never actually leave the device. It's used rarely, but it's specifically trusted for sensitive documents, like medical paperwork, where uploading to a random third-party web tool isn't an option. It's one of the smaller utility containers on the Docker host.

Deployed through the generic Compose stack like the other lightweight utility apps here, with no app-specific Ansible role since there's nothing beyond the initial Compose service entry to manage.
