---
name: "Journalisation"
type: "service"
subtitle: "Graylog + OpenSearch"
description: "Centralisation des journaux répartie sur deux VMs : un nœud principal Graylog et un nœud de données OpenSearch dédié stockant les logs sur un disque séparé. Tous les hôtes transfèrent leurs logs via rsyslog."
order: 5
icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
screenshots: []
relatedRoles: ["graylog_install", "graylog_datanode_install", "graylog_mongodb_backup", "rsyslog_configuration"]
---

Graylog et son nœud de données OpenSearch forment la stack de journalisation centralisée, chaque hôte transfère sa sortie syslog ici via rsyslog, offrant un seul endroit consultable pour enquêter sur n'importe quoi.

Voir [Graylog](/fr/infrastructure/service-graylog) dans les applications auto-hébergées pour plus de détails.
