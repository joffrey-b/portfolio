---
title: "Configuration phpIPAM"
category: "Network & Storage"
description: "Ce rôle alimente phpIPAM avec les informations réseau de l'infrastructure via l'API REST phpIPAM."
tags: ["Docker", "Grafana", "HTTPS", "MariaDB", "MySQL"]
---

## Vue d'ensemble

Ce rôle alimente phpIPAM avec les informations réseau de l'infrastructure via l'API REST phpIPAM. Il crée des sections, des VLANs, des sous-réseaux, des types d'équipements, des équipements et des adresses IP avec l'ensemble des métadonnées d'interfaces et de ports de switch. Le rôle utilise l'authentification « App code with SSL » et est entièrement idempotent.

## Ce que fait ce rôle

1. **Créer la section** : Crée la section « Homelab » si elle n'existe pas
2. **Créer les VLANs** : Crée les VLANs qui n'existent pas encore (correspondance par nom)
3. **Créer les sous-réseaux** : Crée les sous-réseaux liés à leurs VLANs et à la section (correspondance par adresse de sous-réseau)
4. **Créer les types d'équipements** : Crée les types d'équipements qui n'existent pas encore (correspondance par nom)
5. **Créer les équipements** : Crée les équipements avec l'IP de gestion, le type et la description (correspondance par hostname)
6. **Créer les adresses IP** : Enregistre les IPs liées aux équipements, avec l'interface, la note et le flag de passerelle (correspondance par IP)

Toutes les étapes sont idempotentes : les ressources existantes sont ignorées.

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_phpipam_configuration_api_token` | Token API phpIPAM (depuis le vault) |
| `phpipam_configuration_vlans` | Liste des VLANs et sous-réseaux (chargée depuis `vars/vlans.yml`) |
| `phpipam_configuration_device_types` | Liste des types d'équipements (chargée depuis `vars/device_types.yml`) |
| `phpipam_configuration_devices` | Liste des équipements et leurs adresses (chargée depuis `vars/devices.yml`) |
| `phpipam_configuration_api_url` | URL de base de l'API phpIPAM |
| `phpipam_configuration_api_app_id` | Identifiant d'application API phpIPAM |
| `phpipam_configuration_section_name` | Nom de la section dans phpIPAM |

**Définition VLAN :**

```yaml
phpipam_configuration_vlans:
  - name: "VLAN10"
    number: 10
    description: "Management network"
    subnet: "192.168.10.0"
    mask: 24
```
**Définition de types d'équipement :**

```yaml
phpipam_configuration_device_types:
  - name: "Firewall"
    description: "Network firewall appliance"
  - name: "Switch"
    description: "Network switch"
```

**Définition de machines :**

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

- Toutes les données sont définies dans des fichiers vars séparés : `vlans.yml`, `device_types.yml`, `devices.yml`
- Les ressources existantes sont identifiées par nom/hostname et ignorées (pas de mise à jour sur l'existant)
