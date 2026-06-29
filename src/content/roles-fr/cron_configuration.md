---
title: "Configuration Cron"
category: "System Management"
description: "Ce rôle centralise les tâches cron planifiées de l'infrastructure, incluant la planification de la fenêtre de sauvegarde Proxmox et les scripts de sauvegarde nocturnes de Koito, Maloja et de la base de données Navidrome."
tags: ["Bash", "Cron", "JSON", "NAS", "Proxmox"]
---

## Vue d'ensemble

Ce rôle centralise toute la planification cron de l'infrastructure en un seul endroit, séparant les questions de planification des rôles qui possèdent les services sous-jacents. Il gère actuellement la fenêtre de stockage du Proxmox Backup Server ainsi que les sauvegardes nocturnes de Koito, Maloja et de la base de données Navidrome.

Les sauvegardes Koito, Maloja et base de données Navidrome existent aussi sous forme de rôles Ansible dédiés, mais une tâche cron ne peut pas fournir le mot de passe `become` interactif dont Ansible a besoin pour s'exécuter en root. Pour ces trois sauvegardes, ce rôle déploie donc un script shell autonome, appartenant à root, qui reproduit la même logique de sauvegarde, et le planifie via cron plutôt que de relancer le rôle Ansible lui-même. Les rôles dédiés restent utiles pour lancer la même sauvegarde manuellement, à la demande.

## Ce que fait ce rôle

1. **Planifie la fenêtre de stockage PBS** : active le stockage de sauvegarde juste avant la fenêtre de sauvegarde nocturne et le désactive ensuite pour éviter qu'il reste monté
2. **Déploie et planifie un script de sauvegarde Koito**, exportant l'historique d'écoute vers deux NAS chaque nuit
3. **Déploie et planifie un script de sauvegarde Maloja**, exportant les données de scrobbling vers deux NAS chaque nuit
4. **Déploie et planifie un script de sauvegarde de la base de données Navidrome**, copiant la base SQLite vers deux NAS chaque nuit

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
