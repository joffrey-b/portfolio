---
name: "Maloja"
type: "service"
group: "app"
category: "Media"
subtitle: "Listening Stats"
description: "Secondary, backup scrobble tracker for music listening history, kept alongside Koito, the primary tracker."
order: 14
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Maloja top artists view"
    image: "./images/maloja_top_artists.png"
  - caption: "Maloja pulse for last year"
    image: "./images/maloja_pulse.png"
openSource: true
relatedRoles: ["maloja_backup", "maloja_import_backup", "cron_configuration"]
---

Maloja is a self-hosted scrobble tracker for music listening history, running as a backup to Koito, the primary listening-stats tracker, rather than as a second, independent primary source. It used to be the primary tracker, but it only counts play counts, not listening duration, which Koito does track and is also more actively maintained, hence the switch. Maloja is kept purely as a redundant backup and isn't actually checked day to day.

Its data is backed up nightly using the same logic as the `maloja_backup` role: authenticating against Maloja's backend API (`POST /auth/authenticate`, separate from the web login) and exporting the full scrobble history from `/apis/mlj_1/export` to both NAS targets, keeping only the 5 most recent backups. As with Koito, the nightly run is a standalone shell script deployed by `cron_configuration`, since cron can't supply the interactive `become` password Ansible needs. The `maloja_backup` role stays useful for running the same backup by hand, on demand.

Restoring is its own role, `maloja_import_backup`: it picks the newest export automatically, drops it into the container's import directory, restarts the container to trigger the import, and polls the logs for up to 10 minutes waiting for it to finish. Maloja itself skips any scrobbles already in the database, so re-importing never creates duplicates.
