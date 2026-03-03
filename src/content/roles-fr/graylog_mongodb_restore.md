---
title: "Restauration MongoDB Graylog"
category: "Backup & Recovery"
description: "Ce rôle restaure la base de données MongoDB Graylog depuis une archive de sauvegarde créée par le rôle graylog_mongodb_backup."
tags: ["Graylog", "MongoDB", "NAS", "Synology"]
---

## Vue d'ensemble

Restaure la base de données MongoDB Graylog depuis l'archive de sauvegarde la plus récente créée par le rôle `graylog_mongodb_backup`. Supprime et remplace la base de données `graylog` existante. La configuration est entièrement gérée par le rôle `graylog_install` et n'est pas restaurée depuis la sauvegarde — seules les données MongoDB (inputs, pipelines, streams, dashboards, paramètres) sont restaurées.

## Ce que fait ce rôle

1. **Recherche l'archive de sauvegarde la plus récente** sur le NAS Synology
2. **Demande une confirmation** avant de procéder
3. **Arrête `graylog-server`**
4. **Copie l'archive** vers un répertoire tampon local et l'extrait
5. **Exécute `mongorestore --drop`** pour remplacer le contenu de la base de données existante
6. **Supprime le répertoire tampon local** après la restauration
7. **Redémarre `graylog-server`**

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `graylog_mongodb_restore_syno_mount_point` | Chemin NAS Synology contenant les archives de sauvegarde |
| `graylog_mongodb_restore_mongodb_host` | Adresse de l'hôte MongoDB |
| `graylog_mongodb_restore_mongodb_port` | Port MongoDB |
| `graylog_mongodb_restore_mongodb_db` | Nom de la base de données MongoDB |
| `graylog_mongodb_restore_local_tmp` | Répertoire tampon local (supprimé automatiquement après la restauration) |

## Notes

- Sélectionne toujours l'archive de sauvegarde **la plus récente** depuis le NAS
- Demande une confirmation avant de procéder
- Utilise `mongorestore --drop` pour remplacer le contenu de la base de données existante
- `graylog-server` est arrêté pendant la restauration, puis redémarré
- MongoDB lui-même reste en cours d'exécution pendant la restauration
- Le répertoire tampon local est automatiquement supprimé après la restauration
- Restaurer vers la **même version de Graylog** que celle de la sauvegarde pour éviter les problèmes de compatibilité
