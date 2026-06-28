---
name: "Métriques"
type: "service"
subtitle: "Grafana + InfluxDB"
description: "Visualisation des métriques time-series (Grafana) et stockage (InfluxDB), avec des agents Telegraf sur tous les hôtes et via SNMP pour Synology."
order: 6
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots: []
relatedRoles: ["grafana_install", "grafana_datasource_create", "influxdb", "telegraf_agent", "grafana_dashboards_backup"]
---

Grafana et InfluxDB forment la stack de métriques time-series, des tableaux de bord pour le CPU, la mémoire, le disque, le réseau et les données spécifiques à chaque service sur tous les hôtes.

Voir [Grafana](/fr/infrastructure/service-grafana) dans les applications auto-hébergées pour plus de détails.
