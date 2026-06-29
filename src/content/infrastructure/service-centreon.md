---
name: "Centreon"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Monitoring Software"
description: "Open-source IT monitoring platform for service and host health checks."
order: 4
icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
screenshots:
  - caption: "Centreon resources status"
    image: "./images/centreon_resources_status.png"
  - caption: "CPU usage chart"
    image: "./images/centreon_cpu_usage_chart.png"
openSource: true
relatedRoles: ["centreon_clapi_backup", "centreon_clapi_restore", "deploy_system_monitoring", "system_update", "postfix"]
---

Centreon is the open-source monitoring platform handling service and host-level health checks across the homelab via SNMP, with NRPE used on a few hosts where a check needs to run a script directly on the remote machine. This is distinct from the time-series metrics in Grafana: this is about whether a service is up, not how it's trending, even if there are some graphs available in Centreon too.

It sends mail alerts through Postfix, itself installed and configured by its own Ansible role, both when a check goes bad and again when it recovers back to normal.

Its configuration is managed and restorable via its CLAPI interface, and it integrates directly with other roles: `system_update` schedules maintenance downtimes before rebooting a host so planned maintenance never triggers a false alert, and any role that intentionally takes a host or service down, like the Docker backups that stop every container, creates a matching downtime first. On top of those ad-hoc downtimes, a recurring nightly window is configured so the nightly backups don't trigger alerts either.
