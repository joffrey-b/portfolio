---
title: "NAT Source OPNsense"
category: "Firewall & Security"
description: "Ce rôle crée et gère les règles NAT sortant (Source NAT/SNAT) sur OPNsense via l'API REST."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Vue d'ensemble

Ce rôle crée et gère les règles NAT sortant (Source NAT/SNAT) sur OPNsense via l'API REST. Le SNAT traduit les adresses IP privées internes en adresse IP WAN, permettant l'accès à internet pour les réseaux internes. Le rôle crée les règles SNAT, applique les modifications de configuration et fournit un résumé des règles configurées.

## Ce que fait ce rôle

1. **Récupère les règles SNAT existantes** via `/api/firewall/source_nat/search_rule` pour construire un mapping séquence → UUID

2. **Pour chaque règle dans `opnsense_source_nat_rules`** :
   - **Crée les nouvelles règles** (séquence absente d'OPNsense) via `/api/firewall/source_nat/addRule`
   - **Met à jour les règles existantes** (séquence présente mais un champ diffère) via `/api/firewall/source_nat/setRule`

3. **Supprime les règles orphelines** (séquences présentes sur le pare-feu mais absentes des variables) via `/api/firewall/source_nat/delRule`

4. **Si des changements ont été effectués** : applique la configuration via `/api/firewall/source_nat/apply`

5. **Affiche un résumé** avec le nombre total de règles configurées

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_source_nat_rules` | Liste des règles SNAT |
| `opnsense_source_nat_validate_certs` | Valider les certificats SSL |

**Champs de définition de la règle :**

| Champ | Description |
|-------|-------------|
| `sequence` | Numéro de séquence de la règle (utilisé comme clé d'idempotence) |
| `interface` | Interface de sortie (généralement `wan`) |
| `source_net` | Réseau source (CIDR ou alias) |
| `target` | Cible de traduction (généralement `wan_address`) |
| `description` | Description de la règle |
| `enabled` | `"1"` = active, `"0"` = désactivée |
| `destination_net` | Destination (généralement `any`) |
| `log` | Journaliser les traductions NAT |
| `staticnatport` | Préserver le port source |

## Notes

- `wan_address` est un mot-clé spécial OPNsense qui se résout en l'IP WAN actuelle
- L'interface WAN est connectée au routeur de mon FAI, qui fait lui-même ensuite du NAT vers une IP publique
- Les règles sont idempotentes, correspondance par numéro de séquence sur les règles existantes
- Configurez les règles de pare-feu dans `opnsense_firewall` pour autoriser le trafic avant que le NAT ne s'applique
