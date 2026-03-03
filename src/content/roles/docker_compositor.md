---
title: "Docker Compositor"
category: "Docker & Containers"
description: "This role deploys and manages Docker Compose stacks with intelligent change detection, database initialization, and monitoring integration."
tags: ["Centreon", "Debian", "Docker", "Grafana", "HTTPS"]
---

## Overview

This role deploys and manages Docker Compose stacks with intelligent change detection, database initialization, and monitoring integration. It creates the necessary directory structure, generates docker-compose.yml from templates, implements idempotency checks to prevent unnecessary restarts, schedules Centreon monitoring downtimes during updates, and handles database initialization for PostgreSQL and MariaDB/MySQL containers. This role also creates a .env file for every service that needs it, securing sensitive data.

## What This Role Does

### Step 1: Prerequisites

1. **Creates compose directory** (e.g., `/home/user/docker/compose/`)
2. **Creates volume directories** for all services with proper ownership
3. **Creates Glance config directory** (if Glance service present)
4. **Copies Glance configuration files** (glance.yml, home.yml)
5. **Creates .env files** for services with sensitive variables (mode 0600)

### Step 2: Idempotency Check

1. **Checks if current compose file exists**
2. **Generates temporary compose file** from template
3. **Calculates SHA256 checksums** for both files
4. **Compares checksums** to detect changes
5. **Deletes temporary file**
6. **If changes detected**:
   - Calculate downtime window (start time + duration)
   - Schedule Centreon downtime for "Docker Containers Uptime" service
   - Stop all containers cleanly

### Step 3: Installation/Update

1. **Deploys docker-compose.yml** from template
2. **Starts database containers first** (postgresql, mariadb)
3. **Waits 15 seconds** for databases to initialize
4. **Initializes PostgreSQL databases**:
   - Check if user exists (idempotent)
   - Create user if needed
   - Check if database exists (idempotent)
   - Create database if needed with correct owner
5. **Initializes MariaDB/MySQL databases**:
   - Create database if not exists
   - Create user if not exists
   - Grant privileges
   - Flush privileges
6. **Starts all services** with Docker Compose V2:
   - Project name: `docker_compose_stack_name`
   - Remove orphans: true (cleanup old services)
   - Recreate: auto (only if changed)
   - Pull: missing (pull images if not present)
   - Dependencies: true (respect depends_on)
   - Wait: true (wait for health checks)
   - Wait timeout: 600 seconds (10 minutes)

## Role Variables

| Variable | Description |
|----------|-------------|
| `docker_compose_directory` | Directory containing docker-compose.yml (from host_vars) |
| `docker_data_path` | Base path for container data volumes (from host_vars) |
| `docker_user` | User that owns Docker files and volumes (from host_vars) |
| `docker_compose_file` | Compose file name (from host_vars) |
| `docker_compose_stack_name` | Docker Compose project name (from host_vars) |
| `docker_compositor_definition` | Complete stack definition (from host_vars) |
| `docker_compositor_postgres_databases` | PostgreSQL databases to create on first run |
| `docker_compositor_mysql_databases` | MariaDB/MySQL databases to create on first run |
| `docker_compositor_downtime_duration_minutes` | Centreon downtime duration during updates |

**Stack definition structure:**

```yaml
docker_compositor_definition:
  state: present  # present, stopped, or absent

  services:
    - name: service_name
      image: docker/image:tag
      container_name: container_name
      restart_policy: unless-stopped
      volumes:
        - folder_path_on_host: "{{ docker_data_path }}/app/data"
          folder_path_in_container: /data
          owner: "{{ docker_user }}"
          group: "{{ docker_user }}"
          mode: '0755'
      environment:
        PUBLIC_VAR: "value"
      sensitive_env_vars:
        SECRET_KEY: "{{ vault_secret }}"
      ports:
        - "8080:80"
      networks:
        - app_network
```

## Notes

- Containers are only restarted when the compose file actually changes (idempotent)
- Sensitive environment variables are stored in `.env` files, not in compose file
- Database initialization runs only on first deploy (when containers are new)
- Role schedules a Centreon downtime before restarting containers
