---
title: "Import de sauvegarde Maloja"
category: "Backup & Recovery"
description: "Ce rôle restaure les données de scrobbling musical Maloja depuis des fichiers de sauvegarde créés par `maloja_backup`."
tags: ["Docker", "JSON", "Maloja", "NAS", "YAML"]
---

## Vue d'ensemble

Ce rôle restaure les données de scrobbling musical Maloja depuis des fichiers de sauvegarde créés par `maloja_backup`. Il identifie automatiquement la dernière sauvegarde, la copie dans le répertoire d'import de Maloja, déclenche l'import en redémarrant le container, et surveille le processus d'import à travers les logs du container. Le rôle est conçu spécifiquement pour les déploiements Maloja basés sur Docker.

## Ce que fait ce rôle

1. **S'assure que le répertoire d'import existe** (`docker_data_path/maloja/import/`)
2. **Recherche tous les fichiers de sauvegarde** sur le NAS correspondant à `maloja_export_*.json`
3. **Trie par date de modification** et sélectionne le plus récent
4. **Échoue proprement** si aucune sauvegarde n'est trouvée
5. **Affiche les informations de la sauvegarde** (nom du fichier et taille en Mo)
6. **Copie la sauvegarde dans le répertoire d'import** avec les bons droits
7. **Redémarre le container Maloja** pour déclencher le processus d'import
8. **Attend 5 secondes** que le container s'initialise
9. **Surveille les logs pour le message "Parsing"** (import démarré)
10. **Affiche le message de démarrage de l'import**
11. **Surveille les logs pour le message "Successfully imported"** (import terminé avec succès)
12. **Affiche le message de fin d'import**
13. **Vérifie les scrobbles ignorés** et affiche le nombre
14. **Supprime le fichier d'import** après un import réussi
15. **Redémarre Maloja** une nouvelle fois pour nettoyer
16. **Affiche le message de succès**

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `docker_compose_directory` | Vars hôte |
| `docker_data_path` | Vars hôte |
| `docker_user` | Vars hôte |
| `docker_maloja_container_name` | Vars hôte |
| `maloja_import_backup_dir` | Chemin du répertoire d'import Maloja |
| `maloja_import_backup_syno_mount_point` | Point de montage NAS avec les sauvegardes |

## Notes

- Sélectionne automatiquement le fichier `maloja_export_*.json` le plus récent depuis le NAS
- Copie le fichier dans le répertoire d'import Maloja, redémarre le container, puis surveille les logs
- Le fichier d'import est supprimé après un import réussi ; le container est redémarré une nouvelle fois pour être dans un état propre
- Les scrobbles en double sont automatiquement ignorés par Maloja
