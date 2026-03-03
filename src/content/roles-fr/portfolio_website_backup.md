---
title: "Sauvegarde du site portfolio"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde le répertoire source du site portfolio vers deux NAS en parallèle pour la redondance."
tags: ["NAS", "Synology"]
---

## Vue d'ensemble

Ce rôle sauvegarde le répertoire source du site portfolio vers deux NAS en parallèle pour la redondance. Il crée des archives compressées horodatées et gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **S'assure que les répertoires de sauvegarde existent** sur les deux points de montage NAS
2. **Crée une archive tar.gz compressée** du répertoire source du site portfolio
3. **Copie l'archive vers les deux NAS** avec un horodatage dans le nom de fichier
4. **Recherche toutes les sauvegardes existantes** sur chaque NAS
5. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `portfolio_website_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `portfolio_website_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `portfolio_website_backup_source_path` | Répertoire à archiver |
| `portfolio_website_backup_nases_path` | Liste des chemins de destination horodatés |

## Notes

- Le NAS doit être monté avant l'exécution — le playbook gère cela via `nas_mount`
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- L'archivage est idempotent dans sa structure mais crée un nouveau fichier à chaque exécution
