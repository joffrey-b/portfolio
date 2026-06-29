---
name: "Vaultwarden"
type: "service"
group: "app"
category: "Security"
subtitle: "Password Manager"
description: "Self-hosted, Bitwarden-compatible password manager."
order: 27
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
openSource: true
relatedRoles: ["vaultwarden_backup", "docker_install"]
---

Vaultwarden is a lightweight, self-hosted, Bitwarden-compatible password manager, compatible with the official Bitwarden clients and browser extensions without the cost or footprint of running Bitwarden's own server, a single container instead of the several the official self-hosted stack needs. It replaced KeepassXC, which meant manually copying the database to every device after each change; running it as a centralized container removes that step entirely.

Its vault is backed up via the `vaultwarden_backup` role, run manually rather than on a schedule, using the official Bitwarden CLI instead of a custom API call: the CLI is downloaded fresh into a temp directory, used to log in with an API client ID/secret and export the vault as an encrypted JSON file, then deleted again. The export password is intentionally separate from the vault's own master password, so the backup file stays readable even if the master password ever changes. Both NAS targets keep the last 5 exports, older ones removed automatically. On top of that, the whole Docker host VM is captured in Proxmox's nightly backup to PBS and replicated to the Synology NAS, so the vault is also covered at the VM level every night, independent of the manual export.
