---
name: "Navidrome"
type: "service"
group: "app"
category: "Media"
subtitle: "Serveur de musique"
description: "Serveur de streaming musical auto-hébergé avec API compatible Subsonic, sauvegardé chaque nuit via trois rôles Ansible dédiés."
order: 17
icon: "M9 9V4.5a.75.75 0 0 1 .9-.735l9.75 1.95a.75.75 0 0 1 .6.735v9.3m-11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Zm11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
screenshots:
  - caption: "Vue artiste Navidrome"
    image: "./images/navidrome_artist_view.png"
  - caption: "Lecture en cours"
    image: "./images/navidrome_song_playing.png"
relatedRoles: ["navidrome_scan", "navidrome_playlists_backup", "navidrome_db_backup", "cron_configuration"]
---

Navidrome est un serveur de streaming musical auto-hébergé avec une API compatible Subsonic, permettant à n'importe quel client Subsonic de diffuser la bibliothèque musicale personnelle depuis n'importe où. C'est l'application personnelle la plus automatisée du homelab, avec trois rôles Ansible dédiés.

`navidrome_scan` déclenche une réanalyse de la bibliothèque via l'API après l'ajout de nouvelle musique, `navidrome_playlists_backup` exporte les playlists en fichiers M3U selon un planning, et `navidrome_db_backup` arrête le conteneur, copie la base de données SQLite et le redémarre, le tout vers deux NAS avec rétention automatique.
