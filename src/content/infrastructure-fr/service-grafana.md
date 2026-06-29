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
openSource: true
relatedRoles: ["grafana_install", "grafana_datasource_create", "grafana_dashboards_backup", "grafana_dashboards_restore", "grafana_alerts_backup"]
---

Grafana est la couche de visualisation pour chaque métrique time-series collectée dans le homelab, interrogeant InfluxDB et la rendant sous forme de tableaux de bord pour le CPU, la mémoire, le disque, le réseau et les panneaux spécifiques à chaque service. Les agents Telegraf installés sur chaque machine, Linux comme Windows, envoient leurs métriques vers InfluxDB ; le NAS Synology est la seule exception, il n'a pas d'agent propre, il expose donc ses métriques via SNMP, et c'est Telegraf qui va chercher ces données plutôt que Grafana directement.

Une poignée de tableaux de bord couvre l'essentiel de ce qui vaut la peine d'être surveillé au quotidien :

- **Docker** : CPU, RAM et activité réseau par conteneur
- **Système global** : toutes les métriques système standard, CPU, RAM, processus, stockage, réseau, I/O kernel, au même endroit
- **Statistiques musicales Koito** : récupérées depuis l'API de Koito, pour visualiser l'historique d'écoute
- **OPNsense, Pare-feu** : les métriques système habituelles plus un détail de l'usage réseau par VLAN
- **Proxmox** : métriques de l'hôte ainsi que le détail par VM/conteneur LXC et l'usage du stockage
- **Synology** : données uniquement via SNMP, alertes internes comme l'état de l'alimentation, des ventilateurs et du RAID, plus la santé, l'usage et la température des disques
- **Métriques Windows** : l'équivalent Windows du tableau de bord système global, usage disque, débit réseau et graphiques détaillés des processus

Les tableaux de bord et règles d'alerte sont sauvegardés via l'API propre de Grafana, lancés manuellement avec les rôles `grafana_dashboards_backup` et `grafana_alerts_backup` plutôt que selon un planning, et les sources de données sont provisionnées via Ansible plutôt que configurées à la main, si bien qu'une nouvelle instance Grafana peut être restaurée à tout moment. Les tableaux de bord, les alertes et le fichier de configuration de Grafana sont eux aussi provisionnés via Ansible.
