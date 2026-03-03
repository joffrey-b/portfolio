---
title: "NAT de Destination OPNsense"
category: "Firewall & Security"
description: "Ce rôle gère les règles de NAT de destination (redirection de ports) sur OPNsense via l'API REST."
tags: ["DNS", "HTTPS", "JSON", "NTP", "OPNsense", "REST API", "SSH"]
---

## Vue d'ensemble

Ce rôle gère les règles de NAT de destination (redirection de ports) sur OPNsense via l'API REST. Il permet de rediriger le trafic externe vers des hôtes internes et de rediriger le trafic entre interfaces. Le rôle fournit une gestion complète du cycle de vie : création de nouvelles règles, mise à jour des règles existantes lorsque la configuration change, et suppression des règles orphelines qui existent sur le pare-feu mais ne sont plus définies dans les fichiers de variables.

## Ce que fait ce rôle

1. **Récupère les règles existantes** via `/api/firewall/d_nat/search_rule`
2. **Construit un mapping sequence → UUID** pour l'idempotence
3. **Crée les nouvelles règles** (séquence inexistante) via `/api/firewall/d_nat/addRule`
4. **Met à jour les règles existantes** (séquence existante mais champs différents) via `/api/firewall/d_nat/setRule`
5. **Supprime les règles orphelines** (séquence présente sur le pare-feu mais absente des vars) via `/api/firewall/d_nat/delRule`
6. **Applique la configuration** via `/api/firewall/d_nat/apply`
7. **Affiche un résumé** des règles configurées

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_destination_nat_rules` | Liste des règles DNAT |
| `opnsense_destination_nat_validate_certs` | Valider les certificats SSL |

**Champs de définition de la règle :**

| Champ | Description |
|-------|----------|-------------|
| `sequence` | Numéro unique pour l'idempotence (doit être unique) |
| `interface` | Interface d'entrée |
| `destination_port` | Port externe à intercepter |
| `target` | IP interne vers laquelle rediriger |
| `local_port` | Port interne vers lequel rediriger |
| `description` | Description de la règle |
| `disabled` | `"0"` = active, `"1"` = désactivée |
| `protocol` | `tcp`, `udp` ou `tcp/udp` |
| `log` | Journaliser les paquets correspondants |

## Notes

- Supprimer une règle de la liste des vars la supprimera du pare-feu lors de la prochaine exécution
- Modifier un numéro de séquence crée une nouvelle règle et rend orpheline l'ancienne (qui sera supprimée)
