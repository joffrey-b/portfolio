---
title: "Sauvegarde des Données Docker"
category: "Backup & Recovery"
description: "Ce rôle effectue une sauvegarde complète des volumes de données Docker vers deux NAS en parallèle."
tags: ["Centreon", "Docker", "NAS", "Nginx", "Proxmox"]
---

## Vue d'ensemble

Ce rôle effectue une sauvegarde complète des volumes de données Docker vers deux NAS en parallèle. Il orchestre intelligemment le processus de sauvegarde en planifiant des plages de maintenance Centreon, en arrêtant proprement les conteneurs, en créant des archives compressées et en gérant automatiquement la rétention. Cela garantit la cohérence des données tout en minimisant les fausses alertes de supervision.

## Ce que fait ce rôle

### Phase 1 : Planification des plages de maintenance
1. **Calcule la fenêtre de maintenance** en fonction de l'heure actuelle et de la durée
2. **Planifie des plages de maintenance Centreon** pour trois services :
   - `Docker Containers Uptime` (vérification du temps de fonctionnement des conteneurs)
   - `Docker Containers Status` (vérification de l'état des conteneurs)
   - `Check Nginx Proxy Port` (disponibilité du reverse proxy)
3. **Délègue au serveur Centreon** via des commandes CLAPI

### Phase 2 : Exécution de la sauvegarde
1. **Vérifie l'existence des répertoires de sauvegarde** sur les deux points de montage NAS
2. **Arrête tous les conteneurs Docker** via Docker Compose V2 (`docker compose down`)
3. **Attend 10 secondes** que les conteneurs s'arrêtent complètement
4. **Crée une archive tar.gz compressée** de l'intégralité du répertoire de données Docker
5. **Copie l'archive sur les deux NAS** avec un horodatage dans le nom de fichier
6. **Démarre tous les conteneurs Docker** via Docker Compose V2 (`docker compose up`)

### Phase 3 : Nettoyage
1. **Recherche toutes les sauvegardes existantes** sur chaque NAS
2. **Supprime les anciennes sauvegardes**, en ne conservant que les 2 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Mot de passe admin Centreon (depuis le vault) |
| `centreon_host_name` | Nom de l'hôte tel qu'il apparaît dans Centreon (depuis host_vars) |
| `docker_compose_directory` | Répertoire contenant `compose.yaml` (depuis host_vars) |
| `docker_data_path` | Répertoire contenant les données des volumes Docker (depuis host_vars) |
| `docker_data_backup_syno_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Synology |
| `docker_data_backup_prxmxomv_mount_point` | Point de montage pour la destination de sauvegarde sur le NAS Proxmox OMV |
| `docker_data_backup_downtime_duration_minutes` | Durée de la plage de maintenance Centreon en minutes |
| `docker_data_backup_nases_path` | Liste des chemins de destination avec horodatages |

Noms des archives : `docker_data_backup_YYYYMMDDTHHMMSS.tar.gz`

## Notes

- Les conteneurs sont arrêtés pendant la sauvegarde. Les services seront brièvement indisponibles
- La plage de maintenance Centreon est planifiée pour : `Docker Containers Uptime`, `Docker Containers Status`, `Check Nginx Proxy Port`
- Les échecs de planification des maintenances Centreon utilisent `failed_when: false`. La sauvegarde se poursuit même si Centreon est injoignable
- Conserve les **2** dernières sauvegardes par NAS (contrairement à la plupart des autres rôles de sauvegarde qui en conservent 5)
- Après la sauvegarde, les conteneurs sont toujours redémarrés même si l'archivage échoue
- Utilisez le rôle `docker_data_restore` pour restaurer depuis une sauvegarde
