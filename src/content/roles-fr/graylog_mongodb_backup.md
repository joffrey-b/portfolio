---
title: "Sauvegarde MongoDB Graylog"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde la base de données MongoDB Graylog vers vers deux NAS en parallèle, préservant tous les inputs, pipelines, streams, dashboards et paramètres."
tags: ["Graylog", "MongoDB", "NAS", "Synology"]
---

## Vue d'ensemble

Sauvegarde la base de données MongoDB `graylog` vers deux NAS en parallèle pour la redondance. Préserve tous les inputs, pipelines, streams, index, dashboards, utilisateurs et paramètres. Les fichiers de configuration sont gérés avec du code par le rôle `graylog_install` et ne sont pas inclus. Les données de log (indices OpenSearch) sont intentionnellement exclues — seule la base de données de configuration est sauvegardée.

## Ce que fait ce rôle

1. **Arrête `graylog-server`** pour garantir un snapshot cohérent de la base de données
2. **Exécute `mongodump`** sur la base de données `graylog` vers un répertoire tampon local
3. **Crée une archive tar.gz compressée** du dump
4. **Copie l'archive vers les deux NAS** avec un nom de fichier horodaté
5. **Supprime le répertoire tampon local** après la copie
6. **Redémarre `graylog-server`**
7. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `graylog_mongodb_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `graylog_mongodb_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `graylog_mongodb_backup_keep` | Nombre de sauvegardes à conserver par NAS |
| `graylog_mongodb_backup_mongodb_host` | Adresse de l'hôte MongoDB |
| `graylog_mongodb_backup_mongodb_port` | Port MongoDB |
| `graylog_mongodb_backup_mongodb_db` | Nom de la base de données MongoDB |
| `graylog_mongodb_backup_local_tmp` | Répertoire tampon local (supprimé automatiquement après la sauvegarde) |

## Notes

- `graylog-server` est arrêté pendant le dump MongoDB pour garantir la cohérence, puis redémarré — une courte interruption de service est à prévoir
- MongoDB lui-même reste en cours d'exécution pendant le dump
- Le répertoire tampon local est automatiquement supprimé après que l'archive est copiée sur le NAS
- Conserve les 5 dernières sauvegardes par NAS par défaut ; les fichiers plus anciens sont supprimés automatiquement
- Utiliser le rôle `graylog_mongodb_restore` pour restaurer depuis une sauvegarde (exécuter `graylog_install` d'abord)
