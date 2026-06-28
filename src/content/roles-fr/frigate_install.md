---
title: "Installation Frigate"
category: "Applications"
description: "Ce rôle déploie Frigate sous forme de stack Docker Compose NVR sur un serveur Debian dédié — le NVR actif après avoir remplacé ZoneMinder."
tags: ["Debian", "Docker", "HTTPS", "Nginx", "RTSP"]
---

## Vue d'ensemble

Ce rôle déploie le NVR Frigate sous forme de stack Docker Compose sur un serveur Debian dédié, où il a remplacé ZoneMinder en tant que NVR actif. Frigate fonctionne aux côtés de Nginx Proxy Manager, qui fournit un reverse proxy et la terminaison TLS pour son interface web. Ce déploiement est utilisé uniquement pour l'enregistrement — la détection d'objets et l'intégration Home Assistant sont désactivées, le serveur ne disposant ni de GPU ni d'accélérateur matériel.

## Ce que fait ce rôle

1. **Installe Docker** via la dépendance au rôle `docker_install`
2. **Déploie Frigate et Nginx Proxy Manager** en une seule stack Docker Compose
3. **Configure les flux caméra** à partir d'une liste de sources RTSP, chacune ré-diffusée localement afin que Frigate n'ouvre qu'une seule connexion par caméra
4. **Monte un stockage dédié** pour les enregistrements et la configuration
5. **Redémarre automatiquement la stack** à chaque changement de configuration ou du fichier Compose

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `frigate_install_compose_dir` | Répertoire contenant le fichier Docker Compose |
| `frigate_install_media_dir` | Répertoire monté dans le conteneur pour les enregistrements |
| `frigate_install_shm_size` | Mémoire partagée allouée au conteneur Frigate |
| `frigate_install_cameras` | Liste des caméras à configurer (nom, URL RTSP, résolution, rétention) |

## Notes

- Les identifiants RTSP des caméras sont stockés dans Ansible Vault, jamais en dur dans le code
- La détection d'objets et l'intégration Home Assistant sont désactivées — ce déploiement est utilisé uniquement pour l'enregistrement
- Nginx Proxy Manager est inclus pour le reverse proxy / la terminaison TLS, configuré manuellement via sa propre interface web après le déploiement
- Aucun GPU ni accélérateur Coral n'est utilisé ; le serveur ne dispose d'aucune accélération matérielle vidéo
- Les rôles `zoneminder_install` et `zoneminder_monitors` sont conservés dans le dépôt en réserve, au cas où ZoneMinder devrait être réinstallé un jour
