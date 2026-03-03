---
title: "Sauvegarde des playlists Navidrome"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde les playlists musicales Navidrome via l'API."
tags: ["HTTPS", "JSON", "NAS", "Navidrome", "Proxmox"]
---

## Vue d'ensemble

Ce rôle sauvegarde les playlists musicales Navidrome via l'API. Il s'authentifie à Navidrome, télécharge chaque playlist en fichiers M3U, et les stocke vers deux NAS en parallèle dans des répertoires datés pour une meilleure organisation. Le rôle gère automatiquement la rétention en conservant uniquement les 5 derniers répertoires de sauvegarde par NAS.

## Ce que fait ce rôle

1. **Crée des répertoires de sauvegarde datés** sur les deux NAS (format : YYYY-MM-DD)
2. **S'authentifie** à l'API Navidrome (`/auth/login`)
3. **Extrait le token JWT** et l'ID client depuis la réponse
4. **Échoue proprement** si l'authentification échoue
5. **Télécharge chaque playlist** en fichier M3U depuis `/api/playlist/{id}/tracks`
6. **Enregistre sur le NAS Synology** avec un nom de fichier horodaté
7. **Enregistre sur le NAS Proxmox OMV** avec un nom de fichier horodaté
8. **Recherche tous les répertoires de sauvegarde** sur chaque NAS
9. **Supprime les anciens répertoires**, en conservant uniquement les 5 plus récents par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_navidrome_joffrey_user` | Nom d'utilisateur Navidrome (depuis le vault) |
| `vault_navidrome_joffrey_password` | Mot de passe Navidrome (depuis le vault) |
| `navidrome_playlists_backup_url` | URL de l'instance Navidrome |
| `navidrome_playlists_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `navidrome_playlists_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `navidrome_playlists_backup_playlists` | Dictionnaire des IDs et noms de playlists |

**Configuration des playlists à sauvegarder :**
```yaml
navidrome_playlists_backup_playlists:
  dqHOiCmnQlj0VVgZCbGCRE: "My favorites"
  i7fIJvWDj8kIy9ZHNjeQAg: "What I play on guitar"
```

Les UUIDs des playlists se trouvent dans l'URL lorsque l'on consulte une playlist depuis l'interface web : `.../app/playlist/{UUID}`

## Notes

- Les sauvegardes sont stockées dans des répertoires datés : `navidrome/playlists/YYYY-MM-DD/`
- Conserve les 5 derniers répertoires datés par NAS ; les répertoires plus anciens sont automatiquement supprimés
- Les fichiers M3U contiennent les métadonnées des pistes et les chemins de fichiers (pas les fichiers musicaux eux-mêmes)
- Les identifiants utilisent `no_log: true`, et sont stockés dans Ansible Vault
