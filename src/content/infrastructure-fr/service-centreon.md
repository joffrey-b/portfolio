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
  - caption: "Statut des ressources Centreon"
    image: "./images/centreon_resources_status.png"
  - caption: "Graphique d'utilisation CPU"
    image: "./images/centreon_cpu_usage_chart.png"
openSource: true
relatedRoles: ["centreon_clapi_backup", "centreon_clapi_restore", "deploy_system_monitoring", "system_update", "postfix"]
---

Centreon est la plateforme de supervision open-source gérant les contrôles de santé au niveau des services et des hôtes dans tout le homelab via SNMP, avec NRPE utilisé sur quelques hôtes où un contrôle doit exécuter un script directement sur la machine distante. Ceci est distinct des métriques time-series de Grafana : il s'agit ici de savoir si un service est actif, pas de sa tendance, même s'il existe aussi quelques graphiques dans Centreon.

Il envoie des alertes par e-mail via Postfix, lui-même installé et configuré par son propre rôle Ansible, à la fois quand un contrôle passe en défaut et quand il revient à la normale.

Sa configuration est gérée et restaurable via son interface CLAPI, et elle s'intègre directement avec d'autres rôles : `system_update` planifie des plages de maintenance avant de redémarrer un hôte pour qu'une maintenance planifiée ne déclenche jamais de fausse alerte, et tout rôle qui arrête volontairement un hôte ou un service, comme les sauvegardes Docker qui arrêtent tous les conteneurs, crée d'abord une plage de maintenance correspondante. En plus de ces plages ponctuelles, une plage récurrente est configurée chaque nuit pour que les sauvegardes nocturnes ne déclenchent pas non plus d'alertes.
