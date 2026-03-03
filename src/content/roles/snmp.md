---
title: "SNMP"
category: "Monitoring & Metrics"
description: "This role installs and configures Net-SNMP daemon (snmpd) on Linux systems to enable monitoring via SNMP protocol."
tags: ["Centreon", "Debian", "RedHat", "SNMP", "YAML"]
---

## Overview

This role installs and configures Net-SNMP daemon (snmpd) on Linux systems to enable monitoring via SNMP protocol. It configures SNMPv2c with community-based authentication, defines access control lists (ACLs), creates views to control which OID subtrees are accessible, and supports multiple users with different permission levels. The role is designed for integration with Centreon monitoring and other SNMP management systems.

## What This Role Does

1. **Install SNMP packages**:
   - **RedHat/CentOS**: Installs `net-snmp`, `net-snmp-utils`
   - **Debian/Ubuntu**: Installs `snmpd`
   - Package manager updates cache if needed

2. **Deploy snmpd.conf**:
   - Template: `snmpd.conf.j2`
   - Location: `/etc/snmp/snmpd.conf`
   - Permissions: `0660` (root:root)
   - Backup: Creates backup before overwriting

3. **Configure ACLs**:
   - Defines community-to-user mappings
   - Assigns users to groups
   - Creates views with OID subtree access
   - Links groups to views with read permissions

4. **Restart snmpd**:
   - Restarts service via handler
   - Enables service on boot
   - Activates new configuration

## Role Variables

| Variable | Description |
|----------|-------------|
| `snmp_protocol_version` | SNMP version |
| `snmp_view_subtrees` | List of OID subtrees per view |
| `snmp_acl_info` | User/group/view/community configuration |
| `snmp_config_file_name` | SNMP daemon configuration file name |

**Default `snmp_view_subtrees`:**

```yaml
snmp_view_subtrees:
  - subtree: ".1.3.6.1"          # All OIDs
    view_name: "CentreonView"
    included: true
  - subtree: ".1.3.6.1.2.1.1"   # System info
    view_name: "SystemView"
    included: true
  - subtree: ".1.3.6.1.2.1.25.1.1"  # Host resources
    view_name: "SystemView"
    included: true
```

**Default `snmp_acl_info`:**

```yaml
snmp_acl_info:
  config:
    user: "ConfigUser"
    group: "ConfigGroup"
    view: "SystemView"
    community: "{{ vault_snmp_config_user_password }}"
  centreon:
    user: "CentreonUser"
    group: "CentreonGroup"
    view: "CentreonView"
    community: "{{ vault_snmp_centreon_user_password }}"
```

## Notes

- Credentials are stored in Ansible Vault
- The Centreon community string gets full OID access (`.1.3.6.1`) for monitoring
- Ensure firewall rules allow UDP port 161 from the Centreon server
- Uses SNMPv2c (community-based) — not encrypted
