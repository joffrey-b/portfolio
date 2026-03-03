---
title: "Restauration des Données Docker"
category: "Backup & Recovery"
description: "Ce rôle restaure les volumes de données Docker depuis des archives de sauvegarde stockées sur NAS."
tags: ["Docker", "Maloja", "MariaDB", "NAS", "YAML"]
---

## Vue d'ensemble

Ce rôle restaure les volumes de données Docker depuis des archives de sauvegarde stockées sur NAS. Il identifie automatiquement la sauvegarde la plus récente, affiche les informations de restauration pour confirmation et extrait les données vers l'emplacement cible. Ce rôle est le compagnon de `docker_data_backup` et est généralement utilisé pour la reprise après sinistre ou la migration de systèmes.

## Ce que fait ce rôle

1. **Recherche les fichiers de sauvegarde** correspondant au motif `docker_data_backup_*.tar.gz`
2. **Trie les sauvegardes par date de modification** (les plus récentes en premier)
3. **Sélectionne automatiquement la sauvegarde la plus récente**
4. **Échoue proprement** si aucune sauvegarde n'est trouvée
5. **Affiche les informations de la sauvegarde** (nom de fichier et taille en Mo)
6. **Demande une confirmation** avant de continuer
7. **Extrait l'archive** vers le chemin cible
8. **Affiche les résultats de la restauration** avec les étapes suivantes à effectuer

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `docker_data_restore_syno_mount_point` | Point de montage où les archives de sauvegarde sont stockées |
| `docker_data_restore_target_path` | Répertoire cible pour l'extraction des données Docker |

L'archive contient un sous-répertoire `docker/`, donc une extraction vers `/home/bjoffrey` restaure les données vers `/home/bjoffrey/docker/`.

## Notes

- Sélectionne automatiquement le fichier `docker_data_backup_*.tar.gz` le plus récent sur le NAS
- Affiche le nom du fichier de sauvegarde et sa taille avant l'extraction — inclut une pause de confirmation
- L'extraction écrase les fichiers existants portant les mêmes chemins
- Après la restauration, déployez la stack Docker Compose avec `docker_compositor` pour démarrer les conteneurs
- Les fichiers sont extraits directement depuis le NAS (aucune copie locale nécessaire — `remote_src: true`)
