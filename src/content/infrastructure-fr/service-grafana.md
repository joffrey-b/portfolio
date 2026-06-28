---
name: "Grafana"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Visualisation"
description: "Outil de tableaux de bord open-source pour les métriques time-series du homelab."
order: 9
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Tableau de bord Proxmox sur Grafana"
    image: "./images/grafana_proxmox_dashboard.png"
  - caption: "Tableau de bord détail réseau"
    image: "./images/grafana_network_detail.png"
  - caption: "Configuration des règles d'alerte"
    image: "./images/grafana_alert_rules.png"
relatedRoles: ["grafana_install", "grafana_datasource_create", "grafana_dashboards_backup", "grafana_dashboards_restore", "grafana_alerts_backup"]
---

Grafana est la couche de visualisation pour chaque métrique time-series collectée dans le homelab, interrogeant InfluxDB et la rendant sous forme de tableaux de bord pour le CPU, la mémoire, le disque, le réseau et les panneaux spécifiques à chaque service. Les agents Telegraf tournant sur chaque hôte Linux envoient leurs métriques vers InfluxDB ; le NAS Synology est la seule exception, il n'a pas d'agent propre, il expose donc ses métriques via SNMP, et Grafana va chercher ces données directement.

Les tableaux de bord et règles d'alerte sont sauvegardés via l'API propre de Grafana selon un planning, et les sources de données sont provisionnées via Ansible plutôt que configurées à la main, si bien qu'une nouvelle instance Grafana peut être restaurée à tout moment. Les tableaux de bord, les alertes et le fichier de configuration de Grafana sont eux aussi provisionnés via Ansible.
