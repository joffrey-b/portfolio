---
title: "Installation de Paquets OPNsense"
category: "Firewall & Security"
description: "Ce rôle installe des plugins et des paquets sur le pare-feu OPNsense via l'API REST."
tags: ["Centreon", "Chrony", "DNS", "Grafana", "HTTPS"]
---

## Vue d'ensemble

Ce rôle installe des plugins et des paquets sur le pare-feu OPNsense via l'API REST. Il automatise l'installation des plugins essentiels incluant Chrony (NTP), Telegraf (métriques), SNMP, NRPE (supervision), SMART (santé des disques), les utilitaires de sauvegarde et les thèmes d'interface, en utilisant l'endpoint API firmware d'OPNsense.

## Ce que fait ce rôle

1. **Pour chaque paquet dans la liste** :
   - **Envoie une requête POST** vers `/api/core/firmware/install/{package}`
   - **Installe le paquet** depuis le dépôt OPNsense
   - **Attend une réponse** 200 OK

2. **Pas de configuration** : le rôle installe uniquement les paquets, sans les configurer

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_install_packages_list` | Liste des paquets à installer |
| `opnsense_install_packages_validate_certs` | Valider les certificats SSL |

**Liste des paquets par défaut :**

```yaml
opnsense_install_packages_list:
  - os-chrony           # NTP client
  - os-cpu-microcode-intel  # Intel CPU microcode
  - os-dmidecode        # Hardware information
  - os-net-snmp         # SNMP daemon
  - os-nrpe             # Nagios plugin executor
  - os-sftp-backup      # SFTP backup utility
  - os-smart            # SMART disk monitoring
  - os-telegraf         # Telegraf metrics agent
  - os-theme-advanced   # UI theme
  - os-theme-cicada     # UI theme
  - os-theme-rebellion  # UI theme
  - os-theme-flexcolor  # UI theme
```

## Notes

- Les paquets déjà installés sont ignorés (idempotent)
- Exécutez ce rôle avant `opnsense_telegraf_configuration` et `opnsense_syslog_configuration`
