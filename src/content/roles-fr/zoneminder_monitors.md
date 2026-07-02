---
title: "Moniteurs ZoneMinder"
category: "Applications"
description: "Ce rôle automatise l'ajout de caméras dans ZoneMinder via l'API REST, conservé en réserve depuis la migration vers Frigate."
tags: ["HTTPS", "JSON", "REST API", "SSL", "VLAN"]
---

## Vue d'ensemble

Ce rôle automatise l'ajout de caméras dans ZoneMinder via l'API REST. Il s'authentifie auprès de l'API ZoneMinder, récupère la liste des caméras existantes pour éviter les doublons, et crée de nouvelles caméras avec des paramètres personnalisables : nom, chemin RTSP, résolution, fonction d'enregistrement, paramètres d'encodage vidéo et options d'enregistrement audio. Le rôle est idempotent et n'ajoute que les caméras qui n'existent pas déjà.

## Ce que fait ce rôle

**Flux d'ajout de caméras** :

1. **Authentification** : Connexion à l'API ZoneMinder et obtention du token d'accès
2. **Vérification de l'existant** : Récupération de la liste des caméras actuellement configurées
3. **Comparaison** : Identification des caméras à ajouter
4. **Ajout** : Création des caméras qui n'existent pas encore (le rôle est idempotent)
5. **Configuration** : Définition de tous les paramètres de caméra (résolution, fonction, encodage)

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `zoneminder_monitors_api_user` | Nom d'utilisateur API ZoneMinder |
| `zoneminder_monitors_api_password` | Mot de passe API (depuis le vault) |
| `zoneminder_monitors_list` | Liste des caméras à ajouter |
| `zoneminder_monitors_api_url` | URL de l'API ZoneMinder |
| `zoneminder_monitors_validate_certs` | Valider les certificats SSL |
| `zoneminder_monitors_defaults` | Paramètres caméra par défaut |

**Paramètres caméra par défaut (`zoneminder_monitors_defaults`) :**

```yaml
zoneminder_monitors_defaults:
  type: "Ffmpeg"
  method: "rtpRtsp"
  colours: 4
  save_jpegs: 0
  video_writer: 2       # 2 = passthrough (recommended for H.264)
  record_audio: 1
```

**Champs de définition de la caméra :**

| Champ | Description |
|-------|-------------|
| `name` | Nom d'affichage (utilisé pour la détection des doublons) |
| `path` | URL RTSP complète incluant les identifiants |
| `width` | Largeur vidéo en pixels |
| `height` | Hauteur vidéo en pixels |
| `function` | `Record`, `Modect` (détection de mouvement) ou `Mocord` |

## Notes

- **Plus utilisé en production**. Frigate est désormais le NVR actif ; ce rôle est conservé au cas où ZoneMinder devrait être réinstallé
- Les caméras sont identifiées par nom. Celles portant le même nom ne sont pas dupliquées
- `Modect` enregistre uniquement lors d'une détection de mouvement ; `Record` enregistre en continu ; `Mocord` fait les deux
- Les URLs RTSP contiennent les identifiants des caméras. Les stocker dans Ansible Vault
- Exécuter `zoneminder_install` avant ce rôle
