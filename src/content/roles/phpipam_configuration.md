---
title: "Phpipam Configuration"
category: "Network & Storage"
description: "This role populates phpIPAM with the homelab infrastructure network info via the phpIPAM REST API."
tags: ["Docker", "Grafana", "HTTPS", "MariaDB", "MySQL"]
---

## Overview

This role populates phpIPAM with the homelab infrastructure network info via the phpIPAM REST API. It creates sections, VLANs, subnets, device types, devices, and IP addresses with full interface and switch port metadata. The role uses "App code with SSL" authentication and is fully idempotent.

## What This Role Does

1. **Create section**: Create the "Homelab" section if it doesn't exist
2. **Create VLANs**: Create VLANs that don't already exist (matched by name)
3. **Create subnets**: Create subnets linked to their VLANs and section (matched by subnet address)
4. **Create device types**: Create device types that don't already exist (matched by name)
5. **Create devices**: Create devices with management IP, type, and description (matched by hostname)
6. **Create IP addresses**: Register IPs linked to devices, with interface, note, and gateway flag (matched by IP)

All steps are idempotent: existing resources are skipped.

## Role Variables

| Variable | Description |
|----------|-------------|
| `vault_phpipam_configuration_api_token` | phpIPAM API token (from vault) |
| `phpipam_configuration_vlans` | List of VLANs and subnets (from `vars/vlans.yml`) |
| `phpipam_configuration_device_types` | List of device types (from `vars/device_types.yml`) |
| `phpipam_configuration_devices` | List of devices and addresses (from `vars/devices.yml`) |
| `phpipam_configuration_api_url` | phpIPAM API base URL |
| `phpipam_configuration_api_app_id` | API application ID |
| `phpipam_configuration_section_name` | Section name in phpIPAM |

**VLAN definition:**

```yaml
phpipam_configuration_vlans:
  - name: "VLAN10"
    number: 10
    description: "Management network"
    subnet: "192.168.10.0"
    mask: 24
```

**Device types definition:**

```yaml
phpipam_configuration_device_types:
  - name: "Firewall"
    description: "Network firewall appliance"
  - name: "Switch"
    description: "Network switch"
```

**Device definition:**

```yaml
phpipam_configuration_devices:
  - hostname: "grafana"
    type: "Server"
    description: "Grafana monitoring server"
    management_ip: "{{ hostvars['grafana']['ip_vlan10'] }}"
    addresses:
      - ip: "{{ hostvars['grafana']['ip_vlan10'] }}"
        vlan: "VLAN10"
        interface: "ens19"
      - ip: "{{ hostvars['grafana']['ip_vlan12'] }}"
        vlan: "VLAN12"
        interface: "ens18"
        is_gateway: false
        note: "eth1, untagged"
```

## Notes

- All data is defined in separate vars files: `vlans.yml`, `device_types.yml`, `devices.yml`
- Existing resources are matched by name/hostname and skipped (no update on existing)
