---
name: "Grafana"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Visualization"
description: "Open-source dashboarding tool for the homelab's time-series metrics."
order: 9
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Grafana Proxmox dashboard"
    image: "./images/grafana_proxmox_dashboard.png"
  - caption: "Grafana Network detail dashboard"
    image: "./images/grafana_network_detail.png"
  - caption: "Alert rules configuration"
    image: "./images/grafana_alert_rules.png"
openSource: true
relatedRoles: ["grafana_install", "grafana_datasource_create", "grafana_dashboards_backup", "grafana_dashboards_restore", "grafana_alerts_backup"]
---

Grafana is the visualization layer for every time-series metric collected in the homelab, querying InfluxDB and rendering it as dashboards for CPU, memory, disk, network, and service-specific panels. Telegraf agents installed on every machine, Linux and Windows alike, ship their metrics into InfluxDB; the Synology NAS is the one exception, it has no agent of its own, so it exposes its metrics over SNMP instead, and Telegraf polls that data rather than Grafana querying it directly.

A handful of dashboards cover most of what's worth watching day to day:

- **Docker**: per-container CPU, RAM, and network activity
- **Global system**: every standard host metric, CPU, RAM, processes, storage, network, kernel I/O, in one place
- **Koito music stats**: pulled from Koito's own API, for visualizing listening history
- **OPNsense, Firewall**: the usual system metrics plus a detailed breakdown of network usage per VLAN
- **Proxmox**: host metrics alongside per-VM/LXC detail and storage usage
- **Synology**: SNMP-only data, internal alerts like power, fan, and RAID status, plus disk health, usage, and temperature
- **Windows metrics**: the Windows equivalent of the global system dashboard, disk usage, network throughput, and detailed process graphs

Dashboards and alert rules are backed up via Grafana's own API, run by hand with the `grafana_dashboards_backup` and `grafana_alerts_backup` roles rather than on a schedule, and datasources are provisioned through Ansible rather than clicked together by hand, so a fresh Grafana instance can be restored anytime. Dashboards, alerts, and Grafana's configuration file are also provisioned through Ansible.
