---
name: "Monitoring"
type: "service"
subtitle: "Centreon"
description: "Service and performance monitoring platform with SNMP-based checks. Mail alerts are sent via Postfix."
order: 7
icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
screenshots: []
relatedRoles: ["centreon_clapi_backup", "centreon_clapi_restore", "deploy_system_monitoring", "system_update"]
---

Centreon handles service- and host-level health checks across the homelab via SNMP, distinct from the time-series metrics in Grafana.

See [Centreon](/infrastructure/service-centreon) in Self-Hosted Applications for more details.
