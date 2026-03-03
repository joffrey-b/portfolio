---
title: "Sauvegarde Centreon CLAPI"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde la configuration de supervision Centreon via CLAPI (Command Line API) vers deux NAS en parallèle pour la reprise après sinistre."
tags: ["Centreon", "NAS", "Proxmox", "SNMP", "Synology"]
---

## Vue d'ensemble

Ce rôle sauvegarde la configuration de supervision Centreon via CLAPI (Command Line API) vers deux NAS en parallèle pour la reprise après sinistre. Il exporte tous les objets Centreon (hôtes, services, templates, commandes, etc.) et gère automatiquement la rétention en ne conservant que les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **Vérifie l'existence des répertoires de sauvegarde** sur les deux points de montage NAS
2. **Exécute l'export CLAPI** via `centreon -u admin -p <password> -e`
3. **Enregistre l'export sur les deux NAS** avec un horodatage dans le nom de fichier
4. **Recherche toutes les sauvegardes existantes** sur chaque NAS
5. **Supprime les anciennes sauvegardes**, en ne conservant que les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Mot de passe administrateur Centreon (depuis le vault) |
| `centreon_clapi_backup_syno_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Synology |
| `centreon_clapi_backup_prxmxomv_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Proxmox OMV |
| `centreon_clapi_backup_nases_path` | Liste des chemins de destination avec horodatages |

## Notes

- Le NAS est monté via des unités systemd (géré par `nas_mount_systemd` dans le playbook)
- Exporte tous les objets Centreon : hôtes, services, templates, commandes, contacts, groupes, ACLs
- Ne sauvegarde PAS les données RRD, les journaux d'événements ni l'historique des performances
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- Utilisez le rôle `centreon_clapi_restore` pour restaurer depuis une sauvegarde
