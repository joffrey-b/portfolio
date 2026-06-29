---
name: "Graylog"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Gestion des journaux"
description: "Plateforme open-source de gestion des journaux centralisant la sortie syslog de chaque hôte."
order: 10
icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
screenshots:
  - caption: "Interface de recherche Graylog"
    image: "./images/graylog_search_interface.png"
  - caption: "Vue d'ensemble des sources de logs"
    image: "./images/graylog_log_sources.png"
openSource: true
relatedRoles: ["graylog_install", "graylog_datanode_install", "graylog_mongodb_backup", "graylog_mongodb_restore", "rsyslog_configuration"]
---

Graylog est la couche de recherche et d'ingestion de la journalisation centralisée. Le stockage et l'indexation des logs eux-mêmes sont gérés par un nœud de données OpenSearch séparé sur son propre disque, monté au démarrage, qui fait partie du même déploiement Graylog, séparant l'ingestion du stockage pour qu'un pic de volume de logs n'affame pas les ressources propres de Graylog. Chaque hôte sauf les machines Windows transfère sa sortie syslog ici via rsyslog, offrant un seul endroit consultable pour enquêter sur n'importe quoi, d'une tâche cron échouée à un blocage du pare-feu. Des streams sont configurés par machine et par conteneur, ce qui permet de filtrer rapidement sur une source précise.

Sa configuration, basée sur MongoDB, inputs, pipelines, streams, dashboards, est sauvegardée et restaurable indépendamment des données de logs elles-mêmes, qui vivent dans OpenSearch.
