---
name: "Joplin"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Notes"
description: "Application de prise de notes auto-hébergée et chiffrée de bout en bout, synchronisée entre appareils."
order: 12
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Vue des carnets Joplin"
    image: "./images/joplin_notebook.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

Joplin est une application de prise de notes auto-hébergée et chiffrée de bout en bout, synchronisée entre clients de bureau et mobiles via son propre serveur de synchronisation tournant dans la stack Docker, chaque note se synchronisant automatiquement dès l'ouverture de l'application sur n'importe quel appareil. Le support Markdown et l'import/export de carnets facilitent l'organisation, la sauvegarde et la restauration des notes, en plus de la sauvegarde du conteneur sous-jacent.

Les notes sont chiffrées côté client avant même d'atteindre le serveur, qui ne stocke donc jamais que du texte chiffré. Elle est déployée via la stack Compose générique, avec le volume sous-jacent couvert par `docker_data_backup`.
