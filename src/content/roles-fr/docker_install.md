---
title: "Installation de Docker"
category: "Docker & Containers"
description: "Ce rôle installe Docker Engine (CE) sur les systèmes basés sur RedHat."
tags: ["DNS", "Debian", "Docker", "HTTPS", "JSON"]
---

## Vue d'ensemble

Ce rôle installe Docker Engine (CE) sur les systèmes basés sur RedHat. Il configure le dépôt officiel Docker CE, installe Docker Engine, les outils CLI, le runtime containerd et le plugin Docker Compose V2, créé un override nécessaire à navidrome, démarre et active le daemon Docker, et ajoute les utilisateurs spécifiés au groupe docker pour la gestion des conteneurs sans droits root.

## Ce que fait ce rôle

### Pour les systèmes RedHat

1. **Ajoute le dépôt Docker CE**
   - Crée `/etc/yum.repos.d/docker-ce-stable.repo`
   - Configure la vérification par clé GPG
   - Pointe vers le serveur de téléchargement officiel Docker

2. **Installe les paquets Docker** via dnf/yum :
   - docker-ce (daemon Docker Engine)
   - docker-ce-cli (commande docker)
   - containerd.io (runtime de conteneurs)
   - docker-buildx-plugin (fonctionnalités de build étendues)
   - docker-compose-plugin (Compose V2)

3. **Démarre et active le daemon Docker**
   - Démarre Docker
   - Garantit que Docker démarre au boot

4. **Ajoute les utilisateurs au groupe docker**
   - Les utilisateurs peuvent exécuter les commandes `docker` sans sudo
   - Prend effet après déconnexion/reconnexion de l'utilisateur

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `docker_install_docker_group_users` | Utilisateurs à ajouter au groupe docker |
| `docker_install_yum_packages` | Liste des paquets Docker à installer |
| `docker_install_yum_repositories` | Configuration du dépôt Docker CE |

## Notes

- Installe `docker-ce`, `docker-ce-cli`, `containerd.io`, `docker-buildx-plugin`, `docker-compose-plugin`
- Les utilisateurs ajoutés au groupe docker obtiennent accès aux commandes Docker
- Un override est créé afin que la librarie musicale soit montée avant le démarrage des conteneurs pour que navidrome n'ait pas une librairie vide
- Le daemon Docker est activé pour démarrer automatiquement au boot
- Ce rôle ne prend en charge que les distributions basées sur RedHat
