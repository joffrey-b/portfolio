---
title: "Tableau de bord OPNsense"
category: "Firewall & Security"
description: "Ce rôle configure la disposition des widgets du tableau de bord de l'interface web OPNsense via l'API REST."
tags: ["DHCP", "DNS", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Vue d'ensemble

Ce rôle configure la disposition des widgets du tableau de bord de l'interface web OPNsense via l'API REST. Il applique une disposition définie incluant les positions des widgets, leurs tailles et les configurations par widget (ex. : interfaces sélectionnées pour le graphique de trafic, sélection des capteurs de température). La disposition est toujours appliquée pour garantir la cohérence.

## Ce que fait ce rôle

1. **POST de la disposition des widgets** vers `/api/core/dashboard/save_widgets`
   - Envoie la liste complète des widgets avec positions, tailles et configurations
   - L'API retourne `{"result": "saved"}`

Le rôle applique toujours la disposition souhaitée. Il s'agit d'un appel API léger qui garantit que le tableau de bord correspond à la configuration définie.

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_dashboard_widgets` | Liste des définitions de widgets (dans le fichier vars) |
| `opnsense_dashboard_validate_certs` | Valider les certificats SSL |
| `opnsense_dashboard_options` | Options au niveau du tableau de bord |

**Champs de définition du widget :**

| Champ | Type | Description |
|-------|------|-------------|
| `id` | Identifiant du widget |
| `x` | int | Position horizontale (0-11, grille de 12 colonnes) |
| `y` | int | Position verticale en pixels |
| `w` | int/null | Largeur en colonnes (null = défaut) |
| `h` | int | Hauteur en pixels |
| `minW` | int | Largeur minimale en colonnes |
| `widget` | dict | Configuration spécifique au widget |

## Notes

- Le rôle applique toujours la liste complète des widgets définie, écrasant ainsi la configuration actuelle à chaque exécution
