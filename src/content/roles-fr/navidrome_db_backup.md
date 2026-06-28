---
title: "Sauvegarde base de données Navidrome"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde la base de données SQLite de Navidrome sur deux NAS, avec un arrêt et redémarrage propre du conteneur."
tags: ["Centreon", "Docker", "NAS", "Navidrome", "SQLite"]
---

## Vue d'ensemble

Ce rôle sauvegarde la base de données SQLite de Navidrome sur deux NAS. Il planifie une plage de maintenance Centreon, arrête le conteneur Navidrome pour garantir un instantané propre, copie la base de données vers les deux NAS avec un nom de fichier horodaté, puis redémarre le conteneur. Le rôle gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **Planifie une plage de maintenance Centreon** pour éviter les fausses alertes pendant la sauvegarde
2. **Arrête le conteneur Navidrome** pour garantir un instantané cohérent de la base de données
3. **Copie la base de données** vers les deux NAS avec un nom de fichier horodaté
4. **Redémarre le conteneur Navidrome**
5. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `centreon_host_name` | Nom de l'hôte tel qu'il apparaît dans Centreon |
| `navidrome_db_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `navidrome_db_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `navidrome_db_backup_downtime_duration_minutes` | Durée de la plage de maintenance Centreon |

## Notes

- Seul le conteneur Navidrome est arrêté. Tous les autres services Docker continuent de fonctionner
- Si la copie de la base de données échoue, le conteneur est immédiatement redémarré plutôt que laissé arrêté
- Les échecs de planification Centreon ne bloquent pas la sauvegarde. Elle se poursuit même si Centreon est inaccessible
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
