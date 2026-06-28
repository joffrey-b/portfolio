---
title: "Sauvegarde Koito"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde l'historique d'écoute Koito via la fonctionnalité d'export de l'API, en le stockant sur deux NAS pour la redondance."
tags: ["Docker", "HTTPS", "JSON", "NAS", "REST API"]
---

## Vue d'ensemble

Ce rôle sauvegarde l'historique d'écoute Koito via la fonctionnalité d'export de l'API. Il s'authentifie à l'instance Koito avec un jeton API, télécharge l'historique d'écoute en JSON, et le stocke sur deux NAS pour la redondance. Le rôle gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **S'authentifie à Koito** à l'aide d'un jeton API
2. **Télécharge l'historique d'écoute** sous forme d'export JSON
3. **Enregistre l'export sur les deux NAS** avec un nom de fichier horodaté
4. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `koito_backup_url` | URL de l'instance Koito |
| `koito_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `koito_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |

## Notes

- S'authentifie via un en-tête `Authorization` basé sur un jeton ; le jeton API est stocké dans Ansible Vault et n'est jamais journalisé
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- Les points de montage NAS doivent être accessibles avant l'exécution du rôle
