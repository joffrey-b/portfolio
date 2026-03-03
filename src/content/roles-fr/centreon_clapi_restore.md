---
title: "Restauration Centreon CLAPI"
category: "Backup & Recovery"
description: "Ce rôle restaure la configuration de supervision Centreon depuis un fichier de sauvegarde CLAPI (Command Line API)."
tags: ["Centreon", "NAS", "SNMP", "YAML"]
---

## Vue d'ensemble

Ce rôle restaure la configuration de supervision Centreon depuis un fichier de sauvegarde CLAPI (Command Line API). Il identifie automatiquement la sauvegarde la plus récente, importe la configuration et l'applique au serveur Centreon. Ce rôle est le compagnon de `centreon_clapi_backup`.

## Ce que fait ce rôle

1. **Recherche tous les fichiers de sauvegarde CLAPI** dans le répertoire de sauvegarde spécifié
2. **Identifie la sauvegarde la plus récente** en fonction de la date de modification du fichier
3. **Échoue proprement** si aucun fichier de sauvegarde n'est trouvé
4. **Affiche la sauvegarde en cours de restauration** pour confirmation
5. **Importe la configuration** via la commande `centreon -i`
6. **Applique la configuration** via `APPLYCFG` sur le collecteur 1
7. **Confirme la réussite de la restauration** avec une sortie de débogage

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_centreon_admin_password` | Mot de passe administrateur Centreon (depuis le vault) |
| `centreon_clapi_restore_backup_path` | Répertoire contenant les fichiers de sauvegarde CLAPI |
| `centreon_clapi_restore_admin_user` | Nom d'utilisateur administrateur Centreon pour les opérations CLAPI |

## Notes

- Sélectionne automatiquement le fichier `centreon_clapi_backup_*.txt` le plus récent dans le répertoire de sauvegarde
- L'import est additif : les objets existants portant le même nom sont mis à jour ; les objets absents de la sauvegarde ne sont pas modifiés
- Après l'import, exécute `APPLYCFG` sur le collecteur 1 pour appliquer la configuration
- Échoue explicitement si aucun fichier de sauvegarde n'est trouvé
- Le mot de passe administrateur utilise `no_log: true` ; il doit être stocké dans Ansible Vault
