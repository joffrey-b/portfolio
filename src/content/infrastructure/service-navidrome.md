---
name: "Navidrome"
type: "service"
group: "app"
category: "Media"
subtitle: "Music Server"
description: "Self-hosted music streaming server with a Subsonic-compatible API, backed up nightly via three dedicated Ansible roles."
order: 17
icon: "M9 9V4.5a.75.75 0 0 1 .9-.735l9.75 1.95a.75.75 0 0 1 .6.735v9.3m-11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Zm11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
screenshots:
  - caption: "Navidrome artist view"
    image: "./images/navidrome_artist_view.png"
  - caption: "Song playing"
    image: "./images/navidrome_song_playing.png"
relatedRoles: ["navidrome_scan", "navidrome_playlists_backup", "navidrome_db_backup", "cron_configuration"]
---

Navidrome is a self-hosted music streaming server with a Subsonic-compatible API, letting any Subsonic client stream the personal music library from anywhere. It's the most heavily automated personal app in the homelab, with three dedicated Ansible roles.

`navidrome_scan` triggers a library rescan via the API after new music is added, `navidrome_playlists_backup` exports playlists as M3U files on a schedule, and `navidrome_db_backup` stops the container, copies the SQLite database, and restarts it, all to dual NAS storage with automatic retention.
