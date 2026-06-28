---
name: "Centreon"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Logiciel de supervision"
description: "Plateforme de supervision IT open-source pour les contrôles de santé des services et des hôtes."
order: 4
icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
screenshots:
  - caption: "Statut des services Centreon"
  - caption: "Tableau de bord de supervision des hôtes"
relatedRoles: ["centreon_clapi_backup", "centreon_clapi_restore", "deploy_system_monitoring", "system_update", "postfix"]
---

Centreon est la plateforme de supervision open-source gérant les contrôles de santé au niveau des services et des hôtes dans tout le homelab via SNMP, distincte des métriques time-series de Grafana : il s'agit ici de savoir si un service est actif, pas de sa tendance.

Sa configuration est gérée et restaurable via son interface CLAPI, et elle s'intègre directement avec d'autres rôles : `system_update` planifie des plages de maintenance avant de redémarrer un hôte pour qu'une maintenance planifiée ne déclenche jamais de fausse alerte.
