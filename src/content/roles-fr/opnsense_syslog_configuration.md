---
title: "Configuration Syslog OPNsense"
category: "Firewall & Security"
description: "Ce rôle configure le pare-feu OPNsense pour transférer les journaux système vers un serveur Graylog distant via l'API REST."
tags: ["DHCP", "Graylog", "HTTPS", "JSON", "OPNsense"]
---

## Vue d'ensemble

Ce rôle configure le pare-feu OPNsense pour transférer les journaux système vers un serveur Graylog distant via l'API REST. Il gère les destinations syslog avec une approche idempotente : recherche des configurations existantes, création de nouvelles destinations si nécessaire, ou mise à jour des existantes. Le rôle applique les modifications de configuration pour activer immédiatement le transfert de logs.

## Ce que fait ce rôle

1. **Recherche une destination syslog existante** :
   - **Appelle l'API** : `/api/syslog/settings/searchDestinations`
   - **Filtre par** : IP et port du serveur
   - **Détermine** : création d'une nouvelle destination ou mise à jour de l'existante

2. **Si aucune destination existante n'est trouvée** :
   - **Crée une nouvelle destination** via `/api/syslog/settings/addDestination`
   - **Configure** : IP, port, transport, niveaux de logs

3. **Si une destination existante est trouvée** :
   - **Met à jour la destination** via `/api/syslog/settings/setDestination/{uuid}`
   - **Garantit** que la configuration correspond à l'état souhaité

4. **Applique la configuration** :
   - **Reconfigure le service** via `/api/syslog/service/reconfigure`
   - **Active les modifications** immédiatement
   - **Démarre le transfert** des logs vers Graylog

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_syslog_configuration_firewall_host` | Hostname ou IP du pare-feu OPNsense |
| `opnsense_syslog_configuration_api_protocol` | Protocole API (`https`) |
| `opnsense_syslog_configuration_server_ip` | IP du serveur Graylog |
| `opnsense_syslog_configuration_server_port` | Port syslog |
| `opnsense_syslog_configuration_transport` | Protocole de transport (`udp4`, `tcp4`, `tls4`, `tls6`) |
| `opnsense_syslog_configuration_rfc5424` | Activer le format syslog RFC5424 (`0` ou `1`) |
| `opnsense_syslog_configuration_levels` | Niveaux de sévérité à transférer (séparés par des virgules) |
| `opnsense_syslog_configuration_facility` | Filtre de facility (vide = toutes les facilities) |
| `opnsense_syslog_configuration_program` | Filtre de programme (vide = tous les programmes) |
| `opnsense_syslog_configuration_certificate` | Identifiant du certificat TLS (pour le transport `tls4`/`tls6`) |
| `opnsense_syslog_configuration_description` | Libellé de la destination |
| `opnsense_syslog_configuration_enabled` | Activer la destination syslog (`0` ou `1`) |
| `opnsense_syslog_configuration_validate_certs` | Valider les certificats SSL |

## Notes

- La configuration est appliquée immédiatement via l'API de reconfiguration syslog OPNsense
- Utilisez le transport `tcp4` pour une livraison garantie des logs (UDP peut perdre des paquets sous charge)
- Configurez une entrée syslog UDP/TCP correspondante dans Graylog avant d'activer le transfert
