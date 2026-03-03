---
title: "Sauvegarde Maloja"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde les données de scrobbling musical Maloja via la fonctionnalité d'export de l'API."
tags: ["Docker", "HTTPS", "JSON", "Maloja", "NAS"]
---

## Vue d'ensemble

Ce rôle sauvegarde les données de scrobbling musical Maloja via la fonctionnalité d'export de l'API. Il s'authentifie au backend Maloja, télécharge l'historique de scrobbling en JSON, et le stocke vers deux NAS en parallèle pour la redondance. Le rôle gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **S'assure que les répertoires de sauvegarde existent** sur les deux points de montage NAS
2. **S'authentifie** au backend API Maloja (`/auth/authenticate`)
3. **Extrait les cookies de session** depuis la réponse d'authentification
4. **Télécharge l'export des scrobbles** avec la session authentifiée (`/apis/mlj_1/export`)
5. **Enregistre l'export sur les deux NAS** avec un nom de fichier horodaté
6. **Recherche toutes les sauvegardes existantes** sur chaque NAS
7. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_maloja_backend_user` | Nom d'utilisateur backend Maloja (depuis le vault) |
| `vault_maloja_backend_password` | Mot de passe backend Maloja (depuis le vault) |
| `maloja_backup_url` | URL de l'instance Maloja |
| `maloja_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `maloja_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |
| `maloja_backup_nases_path` | Liste des chemins de destination avec horodatages |

## Notes

- S'authentifie via l'API backend Maloja (différente de la connexion à l'interface web)
- Les identifiants et cookies de session utilisent `no_log: true` ; les identifiants sont stockés dans Ansible Vault
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- Utiliser le rôle `maloja_import_backup` pour restaurer depuis une sauvegarde
