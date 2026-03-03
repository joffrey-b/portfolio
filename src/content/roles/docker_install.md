---
title: "Docker Install"
category: "Docker & Containers"
description: "This role installs Docker Engine (CE) on RedHat-based systems."
tags: ["DNS", "Debian", "Docker", "HTTPS", "JSON"]
---

## Overview

This role installs Docker Engine (CE) on RedHat-based systems. It configures the official Docker CE repository, installs Docker Engine, CLI tools, containerd runtime, and Docker Compose V2 plugin, starts and enables the Docker daemon, and adds specified users to the docker group for non-root container management.

## What This Role Does

### For RedHat Systems

1. **Adds Docker CE repository**
   - Creates `/etc/yum.repos.d/docker-ce-stable.repo`
   - Configures GPG key verification
   - Points to official Docker download server

2. **Installs Docker packages** via dnf/yum:
   - docker-ce (Docker Engine daemon)
   - docker-ce-cli (docker command)
   - containerd.io (container runtime)
   - docker-buildx-plugin (extended build features)
   - docker-compose-plugin (Compose V2)

3. **Starts and enables Docker daemon**
   - Starts Docker
   - Ensures Docker starts on boot

4. **Adds users to docker group**
   - Users can run `docker` commands without sudo
   - Takes effect after user logs out/in

## Role Variables

| Variable | Description |
|----------|-------------|
| `docker_install_docker_group_users` | Users to add to the docker group |
| `docker_install_yum_packages` | List of Docker packages to install |
| `docker_install_yum_repositories` | Docker CE repository configuration |

## Notes

- Installs `docker-ce`, `docker-ce-cli`, `containerd.io`, `docker-buildx-plugin`, `docker-compose-plugin`
- Users added to the docker group gain access to Docker commands
- Docker daemon is enabled to start automatically on boot
- This role only supports RedHat-based distributions
