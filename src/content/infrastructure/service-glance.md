---
name: "Glance"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Dashboard"
description: "Self-hosted homepage aggregating service links, status, and feeds in one dashboard."
order: 8
icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
screenshots:
  - caption: "Glance dashboard homepage"
relatedRoles: ["docker_install", "docker_compositor"]
---

Glance is a self-hosted, single-page dashboard aggregating links, service status, and RSS feeds, the kind of homepage that puts every other self-hosted service one click away instead of a row of browser bookmarks.

It runs through the generic Compose stack; its configuration is a single YAML file, simple enough that it doesn't need its own Ansible role.
