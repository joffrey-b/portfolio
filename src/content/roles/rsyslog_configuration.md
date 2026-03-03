---
title: "Rsyslog Configuration"
category: "Monitoring & Metrics"
description: "This role configures rsyslog on Linux systems to forward system logs to a remote Graylog server."
tags: ["Apache", "Debian", "Graylog", "JSON", "Nginx"]
---

## Overview

This role configures rsyslog on Linux systems to forward system logs to a remote Graylog server and optionally monitor custom application log files. It installs rsyslog, configures remote log forwarding via UDP or TCP, sets up file monitoring for application-specific logs, and restarts the service to activate changes. This enables centralized logging for system events and application logs in Graylog for analysis, alerting, and troubleshooting.

## What This Role Does

1. **Install rsyslog**:
   - Ensures rsyslog package installed
   - Installs the package if absent

2. **Configure log forwarding**:
   - Creates remote forwarding config in `/etc/rsyslog.d/`
   - Template: `forward_to_graylog.conf.j2`
   - Forwards all system logs to Graylog
   - Uses UDP or TCP based on configuration

3. **Configure file monitoring** (if custom logs defined):
   - Loads `imfile` module for file tailing
   - Creates monitoring config per host
   - Template: `custom_log_monitoring.conf.j2`
   - Monitors each specified log file
   - Tags logs for identification in Graylog
   - Only the file path and tag need to be defined in `host_vars`
   - Logging level and facility have a default value that can be overriden in `host_vars`
   - The role handles the rest via the template

4. **Restart rsyslog**:
   - Restarts service via systemd
   - Activates new configuration
   - Begins forwarding logs immediately

## Role Variables

| Variable | Description |
|----------|-------------|
| `rsyslog_configuration_server_ip` | Graylog server IP |
| `rsyslog_configuration_server_port` | Syslog port on Graylog |
| `rsyslog_configuration_protocol` | Transport protocol (`udp` or `tcp`) |
| `rsyslog_configuration_custom_log_files` | Custom log files to monitor |
| `rsyslog_configuration_polling_interval` | File polling interval (seconds) |
| `rsyslog_configuration_default_severity` | Default log severity |
| `rsyslog_configuration_default_facility` | Default log facility |

**Custom log file definition:**

```yaml
rsyslog_configuration_custom_log_files:
  - file: /var/log/myapp/application.log
    tag: myapp
    severity: info
    facility: local1
```

## Notes

- Use `tcp` protocol for reliable delivery of critical logs (UDP may lose packets under load)
- `rsyslog_configuration_custom_log_files` supports tailing any log file and forwarding to Graylog
- Configure a matching syslog input (UDP/TCP port 514) in Graylog before enabling forwarding
- Rsyslog service is restarted after configuration changes
