---
name: "Graylog"
type: "service"
group: "app"
category: "Monitoring & Observability"
subtitle: "Log Management"
description: "Open-source log management platform aggregating syslog output from every host."
order: 10
icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
screenshots:
  - caption: "Graylog search interface"
    image: "./images/graylog_search_interface.png"
  - caption: "Log source overview"
    image: "./images/graylog_log_sources.png"
openSource: true
relatedRoles: ["graylog_install", "graylog_datanode_install", "graylog_mongodb_backup", "graylog_mongodb_restore", "rsyslog_configuration"]
---

Graylog is the search and ingestion layer for centralized logging. Log storage and indexing itself is handled by a separate OpenSearch data node on its own disk, mounted at boot, part of the same Graylog deployment, splitting ingestion from storage so a spike in log volume doesn't starve Graylog's own resources. Every host except the Windows machines forwards its syslog output here via rsyslog, giving a single searchable place to investigate anything from a failed cron job to a firewall block. Streams are configured per machine and per container, so filtering down to a specific source is quick.

Its MongoDB-backed configuration, inputs, pipelines, streams, dashboards, is backed up and restorable independently of the log data itself, which lives in OpenSearch.
