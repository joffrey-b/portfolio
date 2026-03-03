---
title: "OPNsense Syslog Configuration"
category: "Firewall & Security"
description: "This role configures OPNsense firewall to forward system logs to a remote Graylog server via the REST API."
tags: ["DHCP", "Graylog", "HTTPS", "JSON", "OPNsense"]
---

## Overview

This role configures OPNsense firewall to forward system logs to a remote Graylog server via the REST API. It manages syslog destinations using an idempotent approach: searching for existing configurations, creating new destinations if needed, or updating existing ones. The role applies configuration changes to activate log forwarding immediately.

## What This Role Does

1. **Search for existing syslog destination**:
   - **Calls API**: `/api/syslog/settings/searchDestinations`
   - **Filters by**: Server IP and port
   - **Determines**: Create new or update existing

2. **If no existing destination found**:
   - **Creates new destination** via `/api/syslog/settings/addDestination`
   - **Configures**: IP, port, transport, log levels

3. **If existing destination found**:
   - **Updates destination** via `/api/syslog/settings/setDestination/{uuid}`
   - **Ensures**: Configuration matches desired state

4. **Apply configuration**:
   - **Reconfigures service** via `/api/syslog/service/reconfigure`
   - **Activates changes** immediately
   - **Starts forwarding** logs to Graylog

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | OPNsense API key (from vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | OPNsense API secret (from vault) |
| `opnsense_syslog_configuration_firewall_host` | OPNsense firewall hostname or IP |
| `opnsense_syslog_configuration_api_protocol` | API protocol (`https`) |
| `opnsense_syslog_configuration_server_ip` | Graylog server IP |
| `opnsense_syslog_configuration_server_port` | Syslog port |
| `opnsense_syslog_configuration_transport` | Transport (`udp4`, `tcp4`, `tls4`, `tls6`) |
| `opnsense_syslog_configuration_rfc5424` | Enable RFC5424 syslog format (`0` or `1`) |
| `opnsense_syslog_configuration_levels` | Log severity levels to forward (comma-separated) |
| `opnsense_syslog_configuration_facility` | Facility filter (empty = all facilities) |
| `opnsense_syslog_configuration_program` | Program filter (empty = all programs) |
| `opnsense_syslog_configuration_certificate` | TLS certificate ID (for `tls4`/`tls6` transport) |
| `opnsense_syslog_configuration_description` | Destination description label |
| `opnsense_syslog_configuration_enabled` | Enable the syslog destination (`0` or `1`) |
| `opnsense_syslog_configuration_validate_certs` | Validate SSL certificates |

## Notes

- Configuration is applied immediately via the OPNsense syslog reconfigure API
- Use `tcp4` transport for guaranteed log delivery (UDP may lose packets under load)
- Configure a matching syslog UDP/TCP input in Graylog before enabling forwarding
