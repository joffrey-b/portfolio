---
title: "Sauvegarde du Code Ansible"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde l'intégralité du dépôt Ansible (playbooks, rôles, configurations) vers deux NAS en parallèle pour assurer la redondance."
tags: ["NAS", "Proxmox", "Synology", "YAML"]
---

## Vue d'ensemble

Ce rôle sauvegarde l'intégralité du dépôt Ansible (playbooks, rôles, configurations) vers deux NAS en parallèle pour assurer la redondance. Il crée des archives compressées horodatées et gère automatiquement la rétention en ne conservant que les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **Vérifie l'existence des répertoires de sauvegarde** sur les deux points de montage NAS
2. **Crée une archive tar.gz compressée** de l'intégralité du dépôt Ansible
3. **Copie l'archive sur les deux NAS** avec un horodatage dans le nom de fichier
4. **Recherche toutes les sauvegardes existantes** sur chaque NAS
5. **Supprime les anciennes sauvegardes**, en ne conservant que les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `ansible_code_backup_syno_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Synology |
| `ansible_code_backup_prxmxomv_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Proxmox OMV |
| `ansible_code_backup_source_path` | Répertoire source à sauvegarder |
| `ansible_code_backup_nases_path` | Liste des chemins de destination avec horodatages |

## Notes

- Le NAS doit être monté avant l'exécution — le playbook gère cela via `nas_mount`
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- L'archivage est idempotent dans sa structure, mais crée un nouveau fichier à chaque exécution
