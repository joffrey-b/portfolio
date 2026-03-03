---
title: "Restauration des dashboards Grafana"
category: "Backup & Recovery"
description: "Ce rôle restaure les dashboards Grafana depuis des archives de sauvegarde créées par `grafana_dashboards_backup`."
tags: ["Grafana", "HTTPS", "JSON", "NAS", "SSL", "Synology"]
---

## Vue d'ensemble

Ce rôle restaure les dashboards Grafana depuis des archives de sauvegarde créées par `grafana_dashboards_backup`. Il identifie automatiquement la sauvegarde la plus récente, extrait les fichiers JSON des dashboards et les importe dans Grafana via l'API avec la fonctionnalité d'écrasement activée.

## Ce que fait ce rôle

1. **Recherche la dernière archive de sauvegarde** correspondant au motif `grafana_dashboards_*.tar.gz`
2. **Trie par date de modification** et sélectionne la plus récente
3. **Échoue proprement** si aucune sauvegarde n'est trouvée
4. **Crée un répertoire temporaire** pour l'extraction
5. **Extrait l'archive de sauvegarde** vers l'emplacement temporaire
6. **Recherche tous les fichiers JSON** dans la sauvegarde extraite
7. **Lit chaque fichier JSON** de dashboard
8. **Importe les dashboards** via l'API Grafana avec l'écrasement activé
9. **Supprime les fichiers temporaires**

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Token API Grafana (depuis le vault) |
| `grafana_dashboards_restore_backup_path` | Répertoire contenant les archives de sauvegarde |
| `grafana_dashboards_restore_host` | Hôte et port Grafana |
| `grafana_dashboards_restore_port` | Port HTTP Grafana |
| `grafana_dashboards_restore_validate_certs` | Valider les certificats SSL |

## Notes

- Sélectionne automatiquement le fichier `grafana_dashboards_*.tar.gz` le plus récent dans le répertoire de sauvegarde
- Les dashboards existants sont écrasés (pas dupliqués)
