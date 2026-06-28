---
title: "Grafana Install"
category: "Monitoring & Metrics"
description: "This role installs and configures Grafana on RedHat-based systems."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "MySQL"]
---

## Overview

This role installs and configures Grafana on RedHat-based systems. It adds the official Grafana repository, installs the Grafana package, configures HTTPS with SSL certificates, configures SQLite in WAL mode to avoid database lock errors, sets up SMTP for email alerts via Gmail, deploys Synology SNMP MIB files, and enables the grafana-server service to start on boot.

## What This Role Does

1. **Adds Grafana YUM repository**
   - URL: https://rpm.grafana.com
   - Enables GPG verification
   - Configures SSL certificate verification

2. **Installs Grafana package** via dnf/yum
   - Latest stable version from official repository

3. **Enables and starts grafana-server service**
   - Starts grafana-server
   - Service starts on boot automatically

4. **Configures server settings** in `/etc/grafana/grafana.ini`:
   - Protocol (HTTP or HTTPS)
   - Bind address (IP)
   - SSL certificate paths (if HTTPS)
   - SQLite WAL mode and retry settings (avoids database lock errors)
   - Creates backup of config file before changes

5. **Configures SMTP settings** for email alerts:
   - Gmail SMTP server
   - Authentication credentials
   - From address and name
   - StartTLS encryption

6. **Creates SNMP MIB directory** (`/usr/share/snmp/mibs/`)

7. **Copies Synology MIB files** for SNMP monitoring

8. **Restarts grafana-server** if configuration changed (via handler)

## Role Variables

| Variable | Description |
|----------|-------------|
| `grafana_install_protocol` | Web interface protocol (`http` or `https`) |
| `grafana_install_http_addr` | IP address to bind |
| `grafana_install_cert_file` | SSL certificate path |
| `grafana_install_cert_key` | SSL private key path |
| `grafana_install_wal_enabled` | Enable SQLite WAL mode (avoids database lock errors on alerts) |
| `grafana_install_query_retries` | Query retries on SQLite lock |
| `grafana_install_transaction_retries` | Transaction retries on SQLite lock |
| `grafana_install_smtp_enabled` | Enable SMTP email alerts |
| `grafana_install_smtp_host` | SMTP server and port |
| `grafana_install_smtp_user` | SMTP username (Gmail address) |
| `grafana_install_smtp_password` | SMTP app password |
| `grafana_install_smtp_from_address` | From address |
| `grafana_install_smtp_from_name` | From name |
| `grafana_install_smtp_starttls_policy` | StartTLS policy for SMTP |
| `grafana_install_mibs_dest_dir` | SNMP MIB files directory |

## Notes

- Run `deploy_ssl_certificates` before this role to ensure cert files exist
- SQLite WAL mode is enabled by default, fixes "database is locked" errors when Grafana handles concurrent alert evaluations
- SMTP credentials are stored in Ansible Vault
- Gmail requires an App Password (not account password) for SMTP with 2FA enabled
- Synology MIB files are deployed to enable SNMP-based NAS monitoring in dashboards
