---
title: "Bannière de connexion"
category: "System Management"
description: "Ce rôle installe une bannière de connexion en ASCII art affichant les informations système à chaque connexion interactive, avec des logos personnalisés par hôte en option."
tags: ["Bash", "Debian", "RedHat", "Rocky Linux"]
---

## Vue d'ensemble

Ce rôle installe `linux_logo` pour afficher un logo en ASCII art avec les informations système — version de l'OS, CPU, RAM, nom d'hôte — à chaque connexion interactive. Sur les systèmes Debian, il s'agit d'une simple installation de paquet ; sur les systèmes RedHat, où aucun paquet n'existe, le rôle compile `linux_logo` depuis les sources. Chaque hôte peut avoir son propre logo personnalisé, ou utiliser par défaut celui de sa famille d'OS.

## Ce que fait ce rôle

1. **Installe `linux_logo`** : via le gestionnaire de paquets sur Debian, ou compilé depuis les sources sur RedHat
2. **Déploie un logo par hôte** si une personnalisation est configurée, sinon utilise le logo par défaut de la famille d'OS
3. **Écrit la configuration d'affichage** qui contrôle le rendu du logo et des informations système
4. **Ajoute un script de connexion** qui n'affiche la bannière que pour l'utilisateur configuré

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `login_banner_linux_logo_version` | Version de linux_logo compilée sur RedHat |
| `login_banner_custom_logo_template` | Fichier de logo personnalisé par hôte, défini dans host_vars |
| `login_banner_user` | Seul utilisateur pour lequel la bannière est affichée |

## Notes

- Idempotent sur RedHat : la compilation depuis les sources est ignorée si `linux_logo` est déjà installé
- La bannière ne s'affiche que sur la session de connexion de l'utilisateur configuré, et reste silencieuse sur `sudo -i` / `su -`
- Les logos personnalisés par hôte sont générés à partir des vraies images de logo des entreprises via un script de conversion basé sur Pillow
