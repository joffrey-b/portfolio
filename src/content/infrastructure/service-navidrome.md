---
name: "Navidrome"
type: "service"
group: "app"
category: "Media"
subtitle: "Music Server"
description: "Self-hosted music streaming server with a Subsonic-compatible API, its database backed up nightly through dedicated automation."
order: 17
icon: "M9 9V4.5a.75.75 0 0 1 .9-.735l9.75 1.95a.75.75 0 0 1 .6.735v9.3m-11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Zm11.25 0a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
screenshots:
  - caption: "Navidrome artist view"
    image: "./images/navidrome_artist_view.png"
  - caption: "Song playing"
    image: "./images/navidrome_song_playing.png"
openSource: true
relatedRoles: ["navidrome_scan", "navidrome_playlists_backup", "navidrome_db_backup", "cron_configuration"]
---

Navidrome is a self-hosted music streaming server with a Subsonic-compatible API, letting any Subsonic client stream the personal music library from anywhere; it also ships its own web interface for anyone who'd rather not install a dedicated app. The library itself lives on the Synology NAS, mounted onto the Docker VM via systemd, with Navidrome scanning that mount rather than holding a local copy. It's the most automated personal app in the homelab, with three dedicated Ansible roles.

`navidrome_scan` authenticates with the Subsonic API's salted MD5 token scheme and calls `startScan`, defaulting to an incremental scan (only new or changed files) with a full re-scan available as an option. `navidrome_playlists_backup` exports each playlist, tracked by UUID in a small lookup table that grows as new playlists are made, as an `.m3u` file into a dated `YYYY-MM-DD` folder on each NAS. Both are run by hand, on demand.

`navidrome_db_backup` is the one that runs unattended every night: it schedules a Centreon downtime scoped to just the container-uptime check, stops only the Navidrome container, copies the live SQLite file, and restarts it, using the same logic as a standalone shell script deployed by `cron_configuration`, since cron can't supply the interactive `become` password the Ansible role itself would need. All three roles keep 5 backups per NAS (or 5 dated folders, for playlists) and clean up older ones automatically.
