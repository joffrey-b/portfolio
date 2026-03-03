---
title: "Restauration des Alertes Grafana"
category: "Backup & Recovery"
description: "Ce rôle restaure les règles d'alerte Grafana depuis des archives de sauvegarde créées par `grafana_alerts_backup`."
tags: ["Grafana", "HTTPS", "NAS", "SSL", "Synology", "YAML"]
---

## Vue d'ensemble

Ce rôle restaure les règles d'alerte Grafana depuis des archives de sauvegarde créées par `grafana_alerts_backup`. Il gère intelligemment la création des dossiers, la configuration des points de contact et l'import/mise à jour des règles d'alerte via l'API de provisionnement Grafana. Le rôle identifie automatiquement la sauvegarde la plus récente et gère les conflits proprement en mettant à jour les alertes existantes.

## Ce que fait ce rôle

1. **Trouve la dernière archive de sauvegarde** correspondant au motif `grafana_alerts_*.tar.gz`
2. **Échoue proprement** si aucune sauvegarde n'est trouvée
3. **Crée un répertoire temporaire** pour l'extraction
4. **Extrait l'archive de sauvegarde** vers l'emplacement temporaire
5. **Trouve tous les fichiers YAML** dans la sauvegarde extraite
6. **Analyse les fichiers de provisionnement YAML** et extrait les groupes de règles d'alerte
7. **Identifie les dossiers requis** depuis les règles d'alerte
8. **Récupère les dossiers existants** depuis l'API Grafana
9. **Crée les dossiers manquants** uniquement s'ils n'existent pas déjà
10. **Construit la correspondance nom de dossier/UID** à partir des dossiers nouveaux et existants
11. **Extrait les règles d'alerte individuelles** avec les folderUIDs et groupes de règles corrects
12. **Vérifie l'existence du point de contact**, le crée s'il est absent
13. **Importe les règles d'alerte** via l'API de provisionnement Grafana (POST)
14. **Met à jour les alertes existantes** en cas de conflit (PUT avec UID)
15. **Nettoie les fichiers temporaires**
16. **Affiche un résumé de la restauration** avec des statistiques

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Token API Grafana (depuis le vault) |
| `grafana_alerts_restore_backup_path` | Répertoire contenant les archives de sauvegarde |
| `grafana_alerts_restore_host` | Hôte et port Grafana |
| `grafana_alerts_restore_port` | Port HTTP Grafana |
| `grafana_alerts_restore_validate_certs` | Valider les certificats SSL |
| `grafana_alerts_restore_contact_point_name` | Nom du point de contact à créer |
| `grafana_alerts_restore_contact_point_type` | Type de point de contact (email, slack, etc.) |
| `grafana_alerts_restore_contact_point_email` | Adresse email pour les notifications |

## Notes

- Sélectionne automatiquement le fichier `grafana_alerts_*.tar.gz` le plus récent dans le chemin de sauvegarde
- Les alertes existantes sont mises à jour (un HTTP 409 déclenche une mise à jour PUT), sans duplication
- Les dossiers sont créés automatiquement s'ils n'existent pas dans le Grafana cible
- Les points de contacts déjà existants sont ignorés
