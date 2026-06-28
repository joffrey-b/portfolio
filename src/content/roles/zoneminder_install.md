---
title: "Zoneminder Install"
category: "Applications"
description: "This role installs and configures ZoneMinder, an open-source video surveillance NVR — kept on standby after migrating to Frigate as the active system."
tags: ["Apache", "Debian", "HTTPS", "JSON", "MariaDB", "MySQL"]
---

## Overview

This role installs and configures ZoneMinder, an open-source video surveillance and NVR (Network Video Recorder) system, along with its dependencies including Apache web server and MariaDB database. It handles complete setup including database creation and schema import, Apache virtual host configuration with SSL support, CGI and rewrite module enablement, permissions, and service management. The role provides a production-ready ZoneMinder installation accessible via HTTP and HTTPS.

## What This Role Does

### 1. Install Python MySQL Packages

Installs Python packages required for Ansible MySQL modules:
- `python3-pymysql`: Python MySQL client library

**Why needed**: Ansible `community.mysql` modules require Python MySQL client

### 2. Install ZoneMinder Packages

Installs required packages:
- `apache2`: Web server
- `mariadb-server`: Database server
- `zoneminder`: NVR application

**Package manager**: `apt` (Debian/Ubuntu)

### 3. Configure MariaDB

**Start MariaDB**:
- Enables MariaDB service
- Starts MariaDB daemon

**Create database**:
- Creates database `zm`

**Create user**:
- Creates user `zmuser`
- Grants all privileges on database `zm`to this user

**Import schema**:
- Checks if schema already imported (looks for `Config` table)
- Imports `/usr/share/zoneminder/db/zm_create.sql` if needed
- Idempotent: Won't re-import if already done

### 4. Configure ZoneMinder

**Set file permissions**:
- File: `/etc/zm/zm.conf`
- Owner: `root:www-data`
- Mode: `0640` (read-only for www-data group)

**Update database password**:
- Sets `ZM_DB_PASS=password` in `/etc/zm/zm.conf`
- Uses lineinfile for idempotent updates

### 5. Configure Apache

**Deploy ZoneMinder Apache config**:
- Template: `zoneminder.conf.j2`
- Location: `/etc/apache2/conf-available/zoneminder.conf`
- Enables ZoneMinder web application with HTTPS and API

**Enable configuration**:
- Enables `zoneminder` apache configuration

**Enable Apache modules**:
- `cgi`: For ZoneMinder CGI scripts
- `rewrite`: For URL rewriting
- `ssl`: For HTTPS support

**Deploy virtual hosts**:
- HTTP: `000-default.conf` (port 80)
- HTTPS: `default-ssl.conf` (port 443)
- The HTTP configuration only contains a redirect to HTTPS

**Enable sites**:
- Enables `000-default.conf`
- Enables `default-ssl.conf`

### 6. Start Services

**Apache**:
- Starts service
- Enables on boot
- Reloads on config changes

**ZoneMinder**:
- Starts service
- Enables on boot
- Restarts on config changes

## Role Variables

| Variable | Description |
|----------|-------------|
| `zoneminder_install_db_name` | MariaDB database name |
| `zoneminder_install_db_user` | Database username |
| `zoneminder_install_db_password` | Database password (from vault) |
| `zoneminder_install_db_host` | Database host |
| `zoneminder_install_ssl_cert_file` | SSL certificate path |
| `zoneminder_install_ssl_key_file` | SSL private key path |
| `zoneminder_install_config_file` | ZoneMinder config file |

## Notes

- **No longer in production** — replaced by `frigate_install`; this role is kept on standby in case ZoneMinder is ever reinstalled
- Database password is stored in Ansible Vault
- SSL certificate files must exist before running the role (deploy via `deploy_ssl_certificates`)
- After installation, add cameras using the `zoneminder_monitors` role
