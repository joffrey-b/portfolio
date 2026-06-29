---
name: "Proxmox VE"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Hypervisor Software"
description: "Open-source KVM/LXC virtualization platform hosting most of the homelab as virtual machines."
order: 26
icon: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
screenshots:
  - caption: "Proxmox VE summary"
    image: "./images/proxmox_ve_summary.png"
  - caption: "Datacenter view"
    image: "./images/proxmox_ve_datacenter_view.png"
openSource: true
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

Proxmox VE is the open-source virtualization platform running on the HP Z440, providing the KVM/LXC hypervisor underneath almost every other service in the homelab. Its web UI handles VM and container lifecycle, storage, networking, and backups in one place.

Unlike OPNsense, Proxmox itself isn't driven through a dedicated Ansible role. VMs are provisioned and managed largely by hand through its UI, while the Linux guests running inside those VMs are what Ansible actually configures. Host-level maintenance, updates, reboots, is still automated through `system_update`, same as any other Linux host.

Alongside OPNsense, this is the most critical machine in the homelab: it holds every VM running the services used every day, all day. It currently runs on a consumer-grade SSD, which gets overloaded when several heavy tasks run in parallel; a datacenter-grade SSD is on the upgrade list for that reason.

Here's a quick summary of each VM and what it does:

- **Grafana server**: hosts the TIG stack, Telegraf, InfluxDB, and Grafana. It receives data from Telegraf agents installed on every other machine, including the Windows ones; the only exception is the Synology NAS, which exposes its data over SNMP instead and gets polled by Telegraf rather than running an agent itself.
- **Frigate server**: a dedicated NVR (Network Video Recorder) server with encrypted storage. It allows viewing camera footage live, and keeps 10 days of past footage.
- **Docker server**: holds every container, running most of the self-hosted services: the music server, listening stats, databases, password manager, GitLab, and more. The full list is in Self-Hosted Applications below.
- **OpenMediaVault**: holds the OMV backup NAS, with a 6TB attached encrypted drive exposing a few shared folders as SMB shares.
- **Centreon server**: the monitoring server. Every host is monitored via SNMP, with some also queried over NRPE for scripts that need to run directly on the remote machine. It sends mail alerts when something goes wrong, based on configured thresholds for hosts and services; some services also output graphs, though Grafana is preferred for that.
- **Windows 11**: a gaming VM with the GPU passed through using Proxmox's GPU passthrough, connected to the TV to watch content and play games as if a real PC were hooked up to it. It also hosts a GitLab runner for jobs in the GitLab container that need a Windows environment.
- **RedHat test server**: used to test new software before deciding whether to integrate it into the real servers, and to build mocks for potentially destructive scripts. A clean snapshot with nothing installed is restored right after each round of testing.
- **Linux Mint**: runs a Cinnamon desktop, useful for any Linux work that needs a GUI. This machine hosts all the Ansible role code and acts as the Ansible controller, using a Python venv for that; it's also the primary dev station for Sonixd Redux and other personal GitHub projects.
- **Graylog server**: hosts the main Graylog process and its MongoDB database, where the Graylog configuration lives, and controls the nodes; in this setup there's one separate node that receives and stores all the logs.
- **Graylog data node**: where all the logs are actually stored, controlled by the main Graylog VM above. Logs arrive on a dedicated hard drive that's mounted at boot.
- **Debian test server**: serves the same purpose as the RedHat test server, but on Debian, to make sure everything works on both OSes since both run in production.

One day I might use terraform to provision proxmox. Right now, if I have to rebuild, I know I can count on my daily backups to reimport the VMs.
