---
title: "Alias OPNsense"
category: "Firewall & Security"
description: "Ce rôle crée et gère les alias de pare-feu sur OPNsense via l'API REST."
tags: ["HTTPS", "JSON", "OPNsense", "REST API", "SSL"]
---

## Vue d'ensemble

Ce rôle crée et gère les alias de pare-feu sur OPNsense via l'API REST. Les alias sont des groupes nommés d'adresses IP, de réseaux ou d'autres objets qui simplifient la gestion des règles de pare-feu. Le rôle utilise l'idempotence basée sur le nom pour créer de nouveaux alias ou mettre à jour les alias existants, applique les modifications de configuration pour les activer, et fournit un résumé des alias configurés.

**Note** : Ce rôle ne supporte PAS la suppression afin d'éviter la suppression accidentelle d'alias créés par le système. Supprimez les alias manuellement via l'interface web OPNsense (Firewall → Aliases).

## Ce que fait ce rôle

1. **Récupère les alias existants** via `/api/firewall/alias/searchItem`

2. **Construit un mapping nom → UUID** pour l'idempotence

3. **Pour chaque alias dans opnsense_aliases_definition** :
   - **Crée les nouveaux alias** (nom inexistant) via `/api/firewall/alias/addItem`
   - **Met à jour les alias existants** (nom existant mais champs différents) via `/api/firewall/alias/setItem`

4. **Si des alias ont été modifiés** :
   - **Appelle l'endpoint de reconfiguration** (`/api/firewall/alias/reconfigure`)
   - **Applique les modifications** à la configuration active du pare-feu

5. **Affiche un résumé** :
   - Liste tous les noms d'alias configurés

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_aliases_definition` | Liste des alias à créer |
| `opnsense_aliases_validate_certs` | Valider les certificats SSL |

**Champs de définition de l'alias :**

| Champ | Description |
|-------|-------------|
| `name` | Nom de l'alias (sans espaces, utiliser le tiret bas) |
| `type` | `host`, `network`, `port` ou `url` |
| `content` | Liste d'IPs/réseaux/ports |
| `description` | Description lisible |
| `enabled` | `"1"` pour activer, `"0"` pour désactiver |
| `counters` | Suivre les statistiques de paquets |

## Notes

- Les alias sont référencés par nom dans les règles de pare-feu (rôle `opnsense_firewall`)
- La suppression est intentionnellement non supportée pour éviter la suppression accidentelle d'alias système
- Les modifications sont appliquées immédiatement via l'API de reconfiguration OPNsense
