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
  - caption: "Grafana dashboard"
  - caption: "Alert rule configuration"
relatedRoles: ["grafana_install", "grafana_datasource_create", "grafana_dashboards_backup", "grafana_dashboards_restore", "grafana_alerts_backup"]
---

Grafana is the visualization layer for every time-series metric collected in the homelab, querying InfluxDB and rendering it as dashboards for CPU, memory, disk, network, and service-specific panels. Telegraf agents running on every Linux host ship their metrics into InfluxDB; the Synology NAS is the one exception, it has no agent of its own, so it exposes its metrics over SNMP instead, and Grafana queries that data directly.

Dashboards and alert rules are backed up via Grafana's own API on a schedule, and datasources are provisioned through Ansible rather than clicked together by hand, so a fresh Grafana instance can be restored to the exact same state as production.
