---
title: "Sauvegarde Vaultwarden"
category: "Backup & Recovery"
description: "Ce rôle sauvegarde le coffre-fort de mots de passe Vaultwarden (Bitwarden auto-hébergé) en utilisant la CLI officielle Bitwarden."
tags: ["Debian", "HTTPS", "JSON", "NAS", "Proxmox"]
---

## Vue d'ensemble

Ce rôle sauvegarde le coffre-fort de mots de passe Vaultwarden (Bitwarden auto-hébergé) en utilisant la CLI officielle Bitwarden. Il télécharge la CLI temporairement, s'authentifie avec les identifiants API, exporte le coffre-fort sous forme de JSON chiffré, et le stocke vers deux NAS en parallèle. Le rôle gère automatiquement la rétention en conservant uniquement les 5 dernières sauvegardes par NAS.

## Ce que fait ce rôle

1. **S'assure que les répertoires de sauvegarde existent** sur les deux points de montage NAS
2. **Crée un répertoire temporaire** pour la CLI Bitwarden
3. **Télécharge la CLI Bitwarden** depuis la source officielle
4. **S'assure qu'unzip est installé** (pour extraire la CLI)
5. **Extrait le binaire CLI Bitwarden**
6. **Définit les permissions d'exécution** sur le binaire CLI
7. **Configure l'URL du serveur** pour l'instance Vaultwarden
8. **Se connecte avec les identifiants API** (via les variables d'environnement, récupérées depuis Ansible Vault)
9. **Déverrouille le coffre-fort** avec le mot de passe maître
10. **Extrait la clé de session** pour les opérations nécessitant d'être authentifié
11. **Synchronise le coffre-fort** pour s'assurer d'avoir les données les plus récentes
12. **Exporte le coffre-fort** en JSON chiffré vers le NAS Synology
13. **Exporte le coffre-fort** en JSON chiffré vers le NAS Proxmox OMV
14. **Verrouille le coffre-fort** (efface la session)
15. **Se déconnecte** de Vaultwarden
16. **Affiche un message de succès**
17. **Nettoie le répertoire temporaire CLI**
18. **Supprime les anciennes sauvegardes**, en conservant uniquement les 5 plus récentes par NAS

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_vaultwarden_api_client_id` | ID client API Vaultwarden (depuis le vault) |
| `vault_vaultwarden_api_client_secret` | Secret client API Vaultwarden (depuis le vault) |
| `vault_vaultwarden_master_password` | Mot de passe maître du coffre-fort (depuis le vault) |
| `vault_vaultwarden_backup_export_password` | Mot de passe de chiffrement de l'export (depuis le vault) |
| `vaultwarden_backup_url` | URL de l'instance Vaultwarden |
| `vaultwarden_backup_ca_file` | Chemin vers un fichier CA personnalisé |
| `vaultwarden_backup_syno_mount_point` | Destination de sauvegarde NAS Synology |
| `vaultwarden_backup_prxmxomv_mount_point` | Destination de sauvegarde NAS Proxmox OMV |

## Notes

- La CLI Bitwarden est téléchargée dans un répertoire temporaire et supprimée après la sauvegarde
- L'export est chiffré avec un mot de passe dédié, distinct du mot de passe maître (stocké dans Ansible Vault)
- Toutes les valeurs sensibles utilisent `no_log: true` ; les identifiants ne sont pas affichés dans la sortie de la console
- Conserve les 5 dernières sauvegardes par NAS ; les fichiers plus anciens sont automatiquement supprimés
- L'ID et le secret client API s'obtiennent depuis Vaultwarden : Paramètres → Sécurité → Clés → Voir la clé API
