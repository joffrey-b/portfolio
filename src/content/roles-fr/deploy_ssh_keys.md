---
title: "Déploiement des Clés SSH"
category: "System Management"
description: "Ce rôle déploie des clés publiques SSH sur les comptes utilisateurs des systèmes cibles."
tags: ["Debian", "RedHat", "SSH", "YAML"]
---

## Vue d'ensemble

Ce rôle déploie des clés publiques SSH sur les comptes utilisateurs des systèmes cibles. Il vérifie l'existence des utilisateurs, crée les répertoires `.ssh` nécessaires avec les bonnes permissions, ajoute les clés publiques dans les fichiers `authorized_keys` et s'assure que la propriété et les permissions sont correctes pour que l'authentification SSH fonctionne.

## Ce que fait ce rôle

1. **Vérifie l'existence des utilisateurs** via `getent` pour chaque utilisateur configuré
2. **Filtre les utilisateurs existants** (ignore les utilisateurs absents du système)
3. **Affiche les utilisateurs trouvés** pour vérification
4. **Crée les répertoires `.ssh`** pour chaque utilisateur avec le mode 0700
5. **Définit la propriété du répertoire** à user:user
6. **Déploie les clés publiques** dans `authorized_keys` via le module `authorized_key`
7. **Préserve les clés existantes** (exclusive: false)
8. **Ajoute des commentaires aux clés** pour identification
9. **Vérifie les permissions du fichier** `authorized_keys` (mode 0600)
10. **Définit la propriété du fichier** à user:user
11. **Affiche un message de succès** avec le nom d'hôte

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `deploy_ssh_keys_users` | Liste des configurations utilisateurs avec leurs clés SSH |
| `deploy_ssh_keys_ssh_dir_mode` | Mode de permission pour le répertoire `.ssh` |
| `deploy_ssh_keys_authorized_keys_mode` | Mode de permission pour le fichier `authorized_keys` |

**Configuration des utilisateurs par défaut :**
```yaml
deploy_ssh_keys_users:
  - username: ansibleuser
    key_file: ansible_user.pub
    comment: "Ansible automation key from mint-vm"
  - username: bjoffrey
    key_file: bjoffrey_user.pub
    comment: "bjoffrey interactive SSH key (PuTTY)"
```

## Notes

- Le rôle ne crée pas de comptes utilisateurs ni ne modifie `sshd_config`
- Les clés sont ajoutées à `authorized_keys`, jamais supprimées
