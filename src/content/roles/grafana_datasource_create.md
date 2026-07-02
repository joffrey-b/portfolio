---
title: "Grafana Datasource Create"
category: "Monitoring & Metrics"
description: "This role creates InfluxDB datasources in Grafana using the API."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "JSON"]
---

## Overview

This role creates InfluxDB datasources in Grafana using the Grafana HTTP API. It authenticates with an API token, configures datasources with InfluxQL query language support, and implements idempotent creation that safely handles existing datasources without errors.

## What This Role Does

1. **Sends POST request** to Grafana API (`/api/datasources`)
2. **Authenticates** with Bearer token (API key)
3. **Configures datasource** with parameters:
   - Type: `influxdb`
   - Access mode: `proxy` (requests proxied through Grafana backend)
   - URL: InfluxDB server address
   - Database name
   - Authentication credentials
   - Query language: `InfluxQL`
   - HTTP method: `GET`
4. **Handles existing datasources** gracefully (status 409 = already exists)
5. **Repeats for each datasource** in the list

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Grafana API token (from vault) |
| `grafana_datasource_create_datasources` | List of datasource configurations |
| `grafana_datasource_create_host` | Grafana server host:port |
| `grafana_datasource_create_port` | Grafana HTTP port |
| `grafana_datasource_create_validate_certs` | Validate SSL certificates |

**Datasource definition fields:**

| Field | Description |
|-------|-------------|
| `name` | Display name in Grafana UI |
| `uid` | Unique identifier for dashboard references |
| `url` | InfluxDB HTTP API URL |
| `database` | InfluxDB database name |
| `user` | InfluxDB username |
| `password` | InfluxDB password (from vault) |
| `is_default` | Make this the default datasource |

## Notes

- Uses Bearer token authentication (not basic auth)
- Currently supports InfluxDB datasources with InfluxQL query language
- Run `grafana_install` and `influxdb` roles before this role
