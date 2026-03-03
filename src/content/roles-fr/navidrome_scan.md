---
title: "Scan Navidrome"
category: "Applications"
description: "Ce rôle déclenche des scans de la bibliothèque musicale dans Navidrome via l'API Subsonic."
tags: ["Docker", "HTTPS", "JSON", "Navidrome", "Python"]
---

## Vue d'ensemble

Ce rôle déclenche des scans de la bibliothèque musicale dans Navidrome via l'API Subsonic. Il génère des tokens d'authentification sécurisés en utilisant le hachage MD5 avec un salt aléatoire, appelle le endpoint API startScan de Navidrome, supporte les modes de scan incrémental et complet, et affiche le statut du scan et les statistiques (pistes trouvées, dossiers scannés) après le déclenchement du scan.

## Ce que fait ce rôle

1. **Génère un salt aléatoire** (hexadécimal de 6 caractères)
   - Utilisé pour l'authentification à l'API Subsonic
   - Prévient les attaques par rejeu

2. **Calcule le token MD5**
   - Formule : `MD5(password + salt)`
   - Méthode d'authentification de l'API Subsonic

3. **Appelle le endpoint startScan** de l'API Subsonic :
   - URL : `/rest/startScan`
   - Méthode : GET
   - Authentification : Token + salt
   - Paramètres : username, token, salt, format (json), version (1.8.0), client, fullScan

4. **Affiche le statut du scan** :
   - État du scan (true/false)
   - Type de scan (incrémental/complet)

5. **Affiche les statistiques** :
   - Nombre de pistes trouvées
   - Nombre de dossiers scannés

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_navidrome_joffrey_user` | Nom d'utilisateur Navidrome (depuis le vault) |
| `vault_navidrome_joffrey_password` | Mot de passe Navidrome (depuis le vault) |
| `navidrome_scan_url` | URL du serveur Navidrome |
| `navidrome_scan_full` | Scan complet (true) ou incrémental (false) |

## Notes

- Utilise l'API Subsonic avec l'authentification par token MD5/salt
- Le scan incrémental par défaut détecte uniquement les fichiers nouveaux ou modifiés (plus rapide)
- Le scan complet (`navidrome_scan_full: true`) re-scanne l'intégralité de la bibliothèque
