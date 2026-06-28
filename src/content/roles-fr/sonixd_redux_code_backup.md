---
title: "Sauvegarde du code Sonixd Redux"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde l'intégralité du dépôt Sonixd Redux sur deux NAS pour la redondance."
tags: ["NAS", "Proxmox", "Synology", "YAML"]
---

## Vue d'ensemble

Ce rôle sauvegarde l'intégralité du dépôt Sonixd Redux sur deux NAS pour la redondance. Il crée des archives compressées horodatées et gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **Crée une archive compressée** de l'intégralité du dépôt Sonixd Redux
2. **Copie l'archive sur les deux NAS** avec un horodatage dans le nom de fichier
3. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `sonixd_redux_code_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `sonixd_redux_code_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `sonixd_redux_code_backup_source_path` | Répertoire à archiver |

## Notes

- Le NAS doit être monté avant l'exécution — géré par le rôle `nas_mount` dans le playbook
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- Pour restaurer, extraire l'archive vers le répertoire d'origine du dépôt
