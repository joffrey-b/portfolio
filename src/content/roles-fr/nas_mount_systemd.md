---
title: "Montage NAS via systemd"
category: "Network & Storage"
description: "Ce rôle gère le montage de partages réseau CIFS/SMB via des unités mount systemd plutôt que les entrées /etc/fstab traditionnelles."
tags: ["DHCP", "Docker", "NAS", "SMB", "Synology"]
---

## Vue d'ensemble

Ce rôle gère le montage de partages réseau CIFS/SMB via des unités mount systemd plutôt que les entrées /etc/fstab traditionnelles. Il installe cifs-utils, crée les répertoires de points de montage, génère des fichiers d'identifiants sécurisés, crée des fichiers d'unité systemd .mount avec les dépendances appropriées, active et démarre les unités de montage, et gère le montage automatique via systemd. Ce rôle est utilisé pour des montages CIFS/SMB permanents, contrairement au rôle `nas_mount` utilisé pour des montages ponctuels (pour effectuer les sauvegardes par exemple). Ce rôle peut tout de même supprimer des montages systemd en indiquant `state: absent` dans `host_vars`.

## Ce que fait ce rôle

### Quand state = present

1. **Installe le paquet cifs-utils**
   - Requis pour le montage CIFS/SMB

2. **Pour chaque montage** :
   - **Crée le répertoire du point de montage** (ex. `/mnt/synology/media`)
   - **Crée le fichier d'identifiants** (`/etc/nas_creds_{name}_systemd`) avec les permissions 0600
   - **Génère une unité systemd .mount** dans `/lib/systemd/system/`
   - **Active l'unité de montage** (démarre au boot)
   - **Démarre l'unité de montage** (monte immédiatement)
   - **Redémarre si les identifiants ont changé**

### Quand state = absent

1. **Pour chaque montage** :
   - **Arrête l'unité de montage** (démonte le partage)
   - **Désactive l'unité de montage** (ne montera pas au boot)
   - **Supprime le fichier d'unité .mount**
   - **Supprime le fichier d'identifiants**
   - **Supprime le répertoire du point de montage**
   - **Recharge le daemon systemd**

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `nas_mount_systemd_mounts` | Liste des configurations de montage NAS |

**Champs de définition du montage :**

| Champ | Description |
|-------|-------------|
| `name` | Identifiant unique pour le montage |
| `server` | Adresse IP ou nom d'hôte du NAS |
| `share` | Chemin du partage sur le NAS |
| `mount_point` | Répertoire de montage local |
| `user` | Nom d'utilisateur CIFS |
| `password` | Mot de passe (depuis le vault) |
| `domain` | Domaine ou groupe de travail Windows |
| `file_mode` | Permissions des fichiers sur le montage |
| `dir_mode` | Permissions des répertoires sur le montage |
| `state` | `present` pour monter, `absent` pour démonter |

## Notes

- Les unités systemd attendent `network-online.target` avant de monter (évite les échecs au démarrage)
- Définir `state: absent` supprime l'unité systemd et démonte le partage
- Préférer ce rôle à `nas_mount` pour les montages permanents
