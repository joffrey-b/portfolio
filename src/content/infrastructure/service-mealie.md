---
name: "Mealie"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Recipe Manager"
description: "Self-hosted recipe manager and meal planner."
order: 16
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Mealie recipe example"
    image: "./images/mealie_recipe_example.png"
  - caption: "Shopping list"
    image: "./images/mealie_shopping_list.png"
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Mealie is a self-hosted recipe manager and meal planner, used to keep recipes searchable and shareable instead of scattered across browser bookmarks and screenshots.

It runs through the generic Compose stack; the underlying Docker volume data is covered by `docker_data_backup` rather than a recipe-specific role.
