---
title: "Deploy SSL Certificates"
category: "System Management"
description: "This role deploys SSL/TLS certificates and private keys from Ansible Vault encrypted variables to target systems."
tags: ["Apache", "Debian", "HTTPS", "JSON", "Nginx"]
---

## Overview

This role deploys SSL/TLS certificates and private keys from Ansible Vault encrypted variables to target systems. It supports RedHat and Debian-based systems with OS-specific paths and permissions, handles multiple certificate formats (PEM, JKS), includes optional CA certificates, and provides special integration with Proxmox VE via its REST API to register certificates and automatically restart services.

## What This Role Does

### For RedHat Systems

1. **Checks OS family** (ansible_facts['os_family'] == 'RedHat')
2. **Deploys certificate files** to `/etc/pki/tls/certs/` with mode 0644
3. **Deploys private key files** to `/etc/pki/tls/private/` with mode 0640
4. **Deploys CA certificates** (if configured) with mode 0644
5. **Deploys JKS keystores** (if configured) with base64 decoding
6. **Sets ownership and permissions** as specified

### For Debian Systems

1. **Checks OS family** (ansible_facts['os_family'] == 'Debian')
2. **Deploys certificate files** to `/etc/ssl/certs/` with mode 0644
3. **Deploys private key files** to `/etc/ssl/private/` with group ssl-cert, mode 0640
4. **Deploys CA certificates** (if configured) with mode 0644
5. **Deploys JKS keystores** (if configured) with base64 decoding
6. **Sets ownership and permissions** as specified

### For Proxmox VE (Additional Steps)

1. **Obtains API authentication ticket** using root@pam credentials
2. **Reads deployed certificate** from filesystem using slurp
3. **Reads deployed private key** from filesystem using slurp
4. **Uploads to Proxmox API** at `/api2/json/nodes/{hostname}/certificates/custom`
5. **Forces certificate replacement** (force: 1)
6. **Automatically restarts services** (restart: 1)
7. **Uses CSRF token** for API security

## Role Variables

| Variable | Description |
|----------|-------------|
| `deploy_ssl_certificates_list` | List of certificate configurations to deploy (defined per-host in host_vars) |
| `deploy_ssl_certificates_redhat_cert_dir` | RedHat certificate directory |
| `deploy_ssl_certificates_redhat_key_dir` | RedHat private key directory |
| `deploy_ssl_certificates_debian_cert_dir` | Debian certificate directory |
| `deploy_ssl_certificates_debian_key_dir` | Debian private key directory |

**Certificate definition fields:**

| Field | Description |
|-------|----------|-------------|
| `cert_content` | Certificate PEM content (from vault) |
| `cert_path` | Destination path |
| `key_content` | Private key PEM content (from vault) |
| `key_path` | Destination path |
| `ca_content` | CA certificate content |
| `ca_path` | CA certificate destination path |
| `jks_content` | Base64-encoded JKS keystore (from vault) |
| `jks_path` | JKS destination path |
| `cert_owner/group/mode` | File ownership/permissions (default: root:root 0644) |
| `key_owner/group/mode` | Key ownership/permissions (default: root:ssl-cert 0640) |

## Notes

- Certificate content is stored in Ansible Vault as multi-line strings
- OS-specific paths and permissions are applied automatically based on target OS
- JKS support requires Java installed on the target system
- Proxmox integration registers certificates via the Proxmox API and restarts services
