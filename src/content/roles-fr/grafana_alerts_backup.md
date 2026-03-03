---
title: "Sauvegarde des Alertes Grafana"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde toutes les règles d'alerte Grafana via l'API vers deux NAS en parallèle."
tags: ["Grafana", "HTTPS", "NAS", "Proxmox", "SSL"]
---

## Vue d'ensemble

Ce rôle sauvegarde toutes les règles d'alerte Grafana via l'API vers deux NAS en parallèle. Il exporte les alertes au format de provisionnement YAML, organisées par dossier, et gère automatiquement la rétention en ne conservant que les 5 dernières sauvegardes par NAS. Le format de sauvegarde est compatible avec le provisionnement des règles d'alerte Grafana, ce qui facilite la restauration.

## Ce que fait ce rôle

1. **Vérifie l'existence des répertoires de sauvegarde** sur les deux points de montage NAS
2. **Récupère la liste des dossiers** depuis l'API Grafana (`/api/folders`)
3. **Crée un répertoire temporaire** pour la mise en tampon des fichiers de sauvegarde
4. **Récupère toutes les règles d'alerte** depuis l'API de provisionnement Grafana (`/api/v1/provisioning/alert-rules`)
5. **Regroupe les règles d'alerte par dossier** et enregistre chacune dans un fichier YAML
6. **Ignore les dossiers vides** (dossiers sans règles d'alerte)
7. **Crée une archive tar.gz horodatée** de tous les fichiers YAML
8. **Copie l'archive sur les deux NAS**
9. **Nettoie les fichiers temporaires** et l'archive locale
10. **Supprime les anciennes sauvegardes**, en ne conservant que les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Token API Grafana (depuis le vault) |
| `grafana_alerts_backup_host` | Hôte et port Grafana |
| `grafana_alerts_backup_validate_certs` | Valider les certificats SSL |
| `grafana_alerts_backup_syno_mount_point` | Destination de sauvegarde sur le NAS Synology |
| `grafana_alerts_backup_prxmxomv_mount_point` | Destination de sauvegarde sur le NAS Proxmox OMV |

## Notes

- Le format de sauvegarde est le format de provisionnement YAML Grafana, compatible avec le rôle `grafana_alerts_restore`
- Les points de contact et les politiques de notification ne sont PAS inclus (règles d'alerte uniquement)
- Chaque NAS conserve indépendamment les 5 dernières sauvegardes
