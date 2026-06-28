---
title: "Sauvegarde des Dashboards Grafana"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde tous les dashboards Grafana via l'API vers deux NAS en parallèle."
tags: ["Grafana", "HTTPS", "JSON", "NAS", "Proxmox"]
---

## Vue d'ensemble

Ce rôle sauvegarde tous les dashboards Grafana via l'API vers deux NAS en parallèle. Il télécharge les définitions JSON des dashboards, crée des archives compressées et gère automatiquement la rétention en ne conservant que les 5 dernières sauvegardes par NAS. Le format JSON exporté est compatible avec la fonctionnalité d'import de Grafana.

## Ce que fait ce rôle

1. **Vérifie l'existence des répertoires de sauvegarde** sur les deux points de montage NAS
2. **Récupère la liste des dashboards** depuis l'API Grafana (`/api/search?type=dash-db`)
3. **Crée un répertoire temporaire** pour la mise en tampon des fichiers de dashboards
4. **Télécharge chaque dashboard** individuellement via l'UID du dashboard (`/api/dashboards/uid/{uid}`)
5. **Extrait le JSON pur** (supprime les métadonnées du wrapper API)
6. **Enregistre chaque dashboard** dans un fichier JSON séparé avec un nom de fichier normalisé
7. **Crée une archive tar.gz horodatée** de tous les fichiers JSON
8. **Copie l'archive sur les deux NAS**
9. **Nettoie les fichiers temporaires** et l'archive locale
10. **Supprime les anciennes sauvegardes**, en ne conservant que les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Token API Grafana (depuis le vault) |
| `grafana_dashboards_backup_host` | Hôte et port Grafana |
| `grafana_dashboards_backup_validate_certs` | Valider les certificats SSL |
| `grafana_dashboards_backup_syno_mount_point` | Destination de sauvegarde sur le NAS Synology |
| `grafana_dashboards_backup_prxmxomv_mount_point` | Destination de sauvegarde sur le NAS Proxmox OMV |

## Notes

- Les dashboards sont enregistrés en JSON pur (sans métadonnées du wrapper API), importables directement via l'interface Grafana
- La structure des dossiers n'est pas préservée. Utilisez les noms de dossiers dans les noms de fichiers à titre de référence
- Les configurations de sources de données ne sont PAS incluses (utilisez `grafana_datasource_create` séparément)
