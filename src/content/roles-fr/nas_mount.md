---
title: "Montage NAS"
category: "Network & Storage"
description: "Ce rôle gère le montage de partages réseau CIFS/SMB depuis des périphériques NAS."
tags: ["Centreon", "DNS", "Debian", "Docker", "NAS"]
---

## Vue d'ensemble

Ce rôle gère le montage de partages réseau CIFS/SMB depuis des périphériques NAS. Il installe cifs-utils, crée les répertoires de points de montage, génère des fichiers d'identifiants sécurisés, monte les partages réseau avec la propriété correcte (UID/GID), ajoute des entrées dans /etc/fstab pour la persistance après redémarrage, et supporte les opérations de montage et démontage pour plusieurs périphériques NAS. Ce rôle est prévu pour des montages temporaires (utilisé par les rôles de sauvegarde par exemple) contrairement au rôle `nas_mount_systemd`.

## Ce que fait ce rôle

### Quand nas_mount_state = mounted

1. **Installe le paquet cifs-utils**
   - Requis pour le montage CIFS/SMB
   - Fournit l'utilitaire mount.cifs

2. **Pour chaque NAS dans nas_mount_mounts** :
   - **Crée le répertoire du point de montage** (ex. `/mnt/synology-ds418`)
   - **Crée le fichier d'identifiants** (`/etc/nas_creds_{name}`) avec les permissions 0600
   - **Monte le partage** via ansible.posix.mount
   - **Ajoute à /etc/fstab** pour le montage persistant

### Quand nas_mount_state = unmounted

1. **Pour chaque NAS dans nas_mount_mounts** :
   - **Démonte le partage**
   - **Supprime le répertoire du point de montage**
   - **Supprime le fichier d'identifiants**
   - **Retire de /etc/fstab**

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `nas_mount_mounts` | Liste des configurations de montage NAS |
| `nas_mount_uid` | ID utilisateur pour la propriété du montage |
| `nas_mount_gid` | ID groupe pour la propriété du montage |
| `nas_mount_state` | État du montage (mounted/unmounted) |
| `nas_mount_synology_ds418_backup_share_path` | Chemin du partage sur le Synology DS418 |
| `nas_mount_synology_ds418_backup_user` | Nom d'utilisateur CIFS pour le Synology DS418 |
| `nas_mount_synology_ds418_backup_mount_point` | Point de montage local pour le Synology DS418 |
| `nas_mount_synology_ds418_backup_domain` | Domaine/groupe de travail Windows pour le Synology DS418 |
| `nas_mount_prxmx_omv_backup_share_path` | Chemin du partage sur le NAS Proxmox OMV |
| `nas_mount_prxmx_omv_backup_user` | Nom d'utilisateur CIFS pour le NAS Proxmox OMV |
| `nas_mount_prxmx_omv_backup_mount_point` | Point de montage local pour le NAS Proxmox OMV |
| `nas_mount_prxmx_omv_backup_domain` | Domaine/groupe de travail Windows pour le NAS Proxmox OMV |

**Champs de définition du montage :**

| Champ | Description |
|-------|----------|-------------|
| `name` | Identifiant unique pour ce montage |
| `server` | Adresse IP ou nom d'hôte du NAS |
| `share` | Chemin du partage sur le NAS |
| `mount_point` | Répertoire local pour monter le partage |
| `user` | Nom d'utilisateur CIFS/SMB |
| `password` | Mot de passe (depuis le vault) |
| `domain` | Domaine ou groupe de travail Windows |

## Notes

- La configuration par défaut monte le Synology DS418 et le Proxmox OMV en utilisant les variables IP de l'inventaire
- Les fichiers d'identifiants sont créés dans `/etc/.cifs_credentials_<name>` avec des permissions restreintes
- Si on ne rappelle pas ce rôle avec `nas_mount_state = unmounted` le montage persiste au démarrage, mais ce n'est pas le but de ce rôle.
- Utiliser le rôle `nas_mount_systemd` pour un montage permanent basé sur systemd avec une meilleure gestion des dépendances
