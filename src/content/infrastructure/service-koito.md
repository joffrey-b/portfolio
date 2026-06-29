---
name: "Koito"
type: "service"
group: "app"
category: "Media"
subtitle: "Listening Stats"
description: "Primary tool for tracking personal music listening history, backed up nightly via its API export."
order: 13
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Koito listening history dashboard"
    image: "./images/koito_listening_history_dashboard.png"
  - caption: "Koito top artist and album example"
    image: "./images/koito_top_example.png"
openSource: true
relatedRoles: ["koito_backup", "cron_configuration", "docker_install"]
---

Koito is the primary tool for tracking personal music listening history, similar in spirit to Last.fm but fully self-hosted, with stats updating in real time rather than the monthly reporting cycle typical of online platforms. Listening data can be filtered by week, year, or all time, and a rewind feature surfaces monthly or yearly recaps. Maloja runs alongside it as a secondary, backup tracker for the same listening data.

Its listen history is backed up nightly using the same logic as the `koito_backup` role: authenticating against Koito's `/apis/web/v1/export` endpoint with a token-based `Authorization` header, downloading the full history as a single JSON export, and writing it to both NAS targets as `koito_export_<timestamp>.json`, keeping only the last 5 backups per NAS. The nightly run itself is a standalone shell script deployed by `cron_configuration`, since a cron job can't supply the interactive `become` password Ansible needs. The `koito_backup` role stays useful for running the same backup by hand, on demand.
