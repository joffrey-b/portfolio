---
name: "Proxmox Backup Server"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Backup Software"
description: "Open-source backup software providing deduplicated, incremental, encrypted VM backups."
order: 25
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "PBS datastore overview"
    image: "./images/pbs_datastore_overview.png"
  - caption: "Backups status"
    image: "./images/pbs_backups.png"
openSource: true
relatedRoles: ["cron_configuration", "system_update"]
---

Proxmox Backup Server is the software counterpart to the dedicated backup hardware it runs on, built by the Proxmox team itself rather than a third party, so it integrates tightly with Proxmox VE: deduplication, incremental backups, and client-side encryption all work out of the box.

It powers on via BIOS before the nightly backups, and a cron job powers it back off once they're done, so the machine only draws power while it's actually needed. A verification pass runs every day to confirm the backups aren't corrupted.

Its own web UI covers datastore management and backup verification; the scheduling of when its storage target is mounted in Proxmox is handled by the `cron_configuration` role rather than PBS itself.
