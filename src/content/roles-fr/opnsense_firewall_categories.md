---
title: "Catégories de Règles Pare-feu OPNsense"
category: "Firewall & Security"
description: "Ce rôle gère les catégories de règles de pare-feu sur OPNsense via l'API REST."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL", "TLS"]
---

## Vue d'ensemble

Ce rôle gère les catégories de règles de pare-feu sur OPNsense via l'API REST. Les catégories permettent d'organiser et de visualiser les règles de pare-feu en les regroupant avec des étiquettes colorées. Le rôle fournit une gestion complète du cycle de vie : création de nouvelles catégories, mise à jour des existantes lorsque la configuration change, et suppression des catégories orphelines qui existent sur le pare-feu mais ne sont plus définies dans les fichiers de variables.

## Ce que fait ce rôle

1. **Récupère les catégories existantes** via `/api/firewall/category/searchItem`

2. **Construit un mapping nom → UUID** pour l'idempotence

3. **Crée les nouvelles catégories** (nom inexistant) via `/api/firewall/category/addItem`

4. **Met à jour les catégories existantes** (nom existant mais couleur/auto différents) via `/api/firewall/category/setItem`

5. **Supprime les catégories orphelines** (présentes sur le pare-feu mais absentes des vars) via `/api/firewall/category/delItem`

6. **Affiche un résumé** des catégories configurées

**Note** : Les catégories sont appliquées immédiatement. Aucune étape de reconfiguration n'est nécessaire.

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_firewall_categories_list` | Liste des catégories à créer |
| `opnsense_firewall_categories_validate_certs` | Valider les certificats SSL |

**Champs de définition de la catégorie :**

| Champ | Description |
|-------|-------------|
| `name` | Nom de la catégorie (identifiant unique) |
| `color` | Code couleur hexadécimal sans `#` |
| `auto` | Attribution automatique des règles correspondant au nom de catégorie |

## Notes

- Les catégories absentes de la liste sont supprimées d'OPNsense (la liste est la source de vérité)
- Assignez des catégories aux règles de pare-feu via le champ `categories` dans le rôle `opnsense_firewall`
