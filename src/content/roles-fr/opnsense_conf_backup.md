---
title: "Sauvegarde Configuration OPNsense"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde la configuration du pare-feu OPNsense via l'API vers deux NAS en parallèle."
tags: ["DHCP", "DNS", "HTTPS", "NAS", "NTP"]
---

## Vue d'ensemble

Ce rôle sauvegarde la configuration du pare-feu OPNsense via l'API OPNsense vers deux NAS en parallèle. Il télécharge la configuration complète au format XML, la stocke avec des horodatages et gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS. Cela offre une capacité de reprise après sinistre.

## Ce que fait ce rôle

1. **S'assure que les répertoires de sauvegarde existent** sur les deux points de montage NAS
2. **Télécharge le XML de configuration** via l'API OPNsense (`/api/core/backup/download/this/`)
3. **Enregistre sur les deux emplacements NAS** avec un nom de fichier horodaté
4. **Recherche toutes les sauvegardes existantes** sur chaque NAS
5. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_conf_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `opnsense_conf_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `opnsense_conf_backup_validate_certs` | Valider les certificats SSL |

## Notes

- La sauvegarde XML inclut toutes les règles de pare-feu, interfaces, DHCP, VPN, certificats et comptes utilisateurs
- Chaque NAS conserve indépendamment les 5 dernières sauvegardes (10 au total sur les deux appareils)
