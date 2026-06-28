---
title: "Configuration Cron"
category: "System Management"
description: "Ce rôle centralise les tâches cron planifiées de l'infrastructure, incluant la planification de la fenêtre de sauvegarde Proxmox et le déclenchement des sauvegardes Koito, Maloja et de la base de données Navidrome."
tags: ["Bash", "Cron", "JSON", "NAS", "Proxmox"]
---

## Vue d'ensemble

Ce rôle centralise toute la planification cron de l'infrastructure en un seul endroit, séparant les questions de planification des rôles qui possèdent les services sous-jacents. Il gère actuellement la fenêtre de stockage du Proxmox Backup Server et déclenche les sauvegardes de Koito, Maloja et de la base de données Navidrome selon un planning récurrent.

## Ce que fait ce rôle

1. **Planifie la fenêtre de stockage PBS** : active le stockage de sauvegarde juste avant la fenêtre de sauvegarde nocturne et le désactive ensuite pour éviter qu'il reste monté
2. **Déclenche la sauvegarde Koito** selon un planning, exportant l'historique d'écoute vers deux NAS
3. **Déclenche la sauvegarde Maloja** selon un planning, exportant les données de scrobbling vers deux NAS
4. **Déclenche la sauvegarde de la base de données Navidrome** selon un planning, copiant la base SQLite vers deux NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `cron_configuration_proxmox_pbs_storage_name` | Nom du stockage PBS dans Proxmox |
| `cron_configuration_backup_keep` | Nombre de sauvegardes conservées par NAS |
| `cron_configuration_koito_url` | URL de l'instance Koito |
| `cron_configuration_maloja_url` | URL de l'instance Maloja |
| `cron_configuration_navidrome_db_path` | Chemin du fichier de base de données SQLite Navidrome |

## Notes

- Les tâches de sauvegarde s'exécutent uniquement sur l'hôte `docker` ; la planification PBS s'exécute uniquement sur l'hôte `proxmox`. Tous les autres hôtes sont ignorés
- Les montages NAS doivent déjà être présents avant l'exécution de ces tâches, ce qui est géré par le rôle `nas_mount_systemd`
- Les identifiants pour Koito et Maloja sont stockés dans Ansible Vault et ne sont jamais journalisés
- Conserve les 5 sauvegardes les plus récentes par NAS pour chaque tâche planifiée
