---
name: "Portainer"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Container Management"
description: "Web UI for inspecting and managing the Docker host's containers, images, and volumes."
order: 23
icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
screenshots:
  - caption: "Portainer container list"
    image: "./images/portainer_container_list.png"
  - caption: "Container resource usage"
    image: "./images/portainer_container_stats.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor"]
---

Portainer provides a web UI for inspecting and managing the Docker host's containers, images, networks, and volumes, useful for a quick check on container health and resource usage without SSHing in and running `docker ps` by hand, and for browsing or exporting container logs.

It isn't used to deploy the stack itself, that's handled directly through Docker Compose, but it runs through that same generic Compose stack alongside the services it manages.
