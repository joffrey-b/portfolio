---
name: "Navidrome"
type: "service"
group: "app"
category: "Media"
subtitle: "Serveur de musique"
description: "Serveur de streaming musical auto-hébergé avec API compatible Subsonic, sa base de données sauvegardée chaque nuit via une automatisation dédiée."
order: 17
icon: "M9 9V4.5a.75.75 0 0 1 .9-.735l9.75 1.95a.75.75 0 0 1 .6.735v9.3m-11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Zm11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
screenshots:
  - caption: "Vue artiste Navidrome"
    image: "./images/navidrome_artist_view.png"
  - caption: "Lecture en cours"
    image: "./images/navidrome_song_playing.png"
openSource: true
relatedRoles: ["navidrome_scan", "navidrome_playlists_backup", "navidrome_db_backup", "cron_configuration"]
---

Navidrome est un serveur de streaming musical auto-hébergé avec une API compatible Subsonic, permettant à n'importe quel client Subsonic de diffuser la bibliothèque musicale personnelle depuis n'importe où ; il fournit aussi sa propre interface web pour ceux qui préfèrent ne pas installer une application dédiée. La bibliothèque elle-même réside sur le NAS Synology, montée sur la VM Docker via systemd, Navidrome scannant ce point de montage plutôt que de garder une copie locale. C'est l'application personnelle la plus automatisée du homelab, avec trois rôles Ansible dédiés.

`navidrome_scan` s'authentifie avec le schéma de jeton MD5 salé de l'API Subsonic et appelle `startScan`, en utilisant par défaut une analyse incrémentale (seulement les fichiers nouveaux ou modifiés), avec une réanalyse complète disponible en option. `navidrome_playlists_backup` exporte chaque playlist, suivie par UUID dans une petite table de correspondance qui s'enrichit à chaque nouvelle playlist créée, en fichier `.m3u` dans un dossier daté `YYYY-MM-DD` sur chaque NAS. Les deux sont lancés manuellement, à la demande.

`navidrome_db_backup` est celui qui s'exécute seul chaque nuit : il planifie une plage de maintenance Centreon limitée au seul contrôle de disponibilité du conteneur, arrête uniquement le conteneur Navidrome, copie le fichier SQLite en cours d'utilisation, puis le redémarre, en reprenant la même logique qu'un script shell autonome déployé par `cron_configuration`, car cron ne peut pas fournir le mot de passe `become` interactif dont le rôle Ansible aurait besoin. Les trois rôles conservent 5 sauvegardes par NAS (ou 5 dossiers datés, pour les playlists) et suppriment les anciennes automatiquement.
