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
  - caption: "Top artists and tracks view"
relatedRoles: ["koito_backup", "cron_configuration", "docker_install"]
---

Koito is the primary tool for tracking personal music listening history, similar in spirit to Last.fm but fully self-hosted. Maloja runs alongside it as a secondary, backup tracker for the same listening data.

Its listen history is backed up nightly via the `koito_backup` role, which authenticates with an API token and exports the full history as JSON to dual NAS storage, triggered on a schedule by `cron_configuration`.
