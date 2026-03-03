---
title: "Règles Pare-feu OPNsense"
category: "Firewall & Security"
description: "Ce rôle gère les règles de pare-feu sur plusieurs interfaces réseau sur OPNsense via l'API REST."
tags: ["Centreon", "DNS", "Grafana", "HTTPS", "InfluxDB", "JSON"]
---

## Vue d'ensemble

Ce rôle gère les règles de pare-feu sur plusieurs interfaces réseau sur OPNsense via l'API REST. Il supporte la configuration pour les VLANs (VLAN10-22), WAN, LAN et les interfaces WireGuard. Le rôle fournit une gestion complète du cycle de vie : création de nouvelles règles, mise à jour des règles existantes lorsque la configuration change, et suppression des règles orphelines qui existent sur le pare-feu mais ne sont plus définies dans les fichiers de variables.

## Ce que fait ce rôle

1. **Itère sur les interfaces** :
   - vlan10, vlan12, vlan14, vlan16, vlan18, vlan20, vlan22
   - wg0, lan, wan

2. **Pour chaque interface avec des règles définies** :
   - **Récupère les catégories existantes** via `/api/firewall/category/searchItem` et construit un mapping nom → UUID
   - **Récupère les règles existantes** via `/api/firewall/filter/search_rule`
   - **Construit un mapping sequence → UUID** pour l'idempotence
   - **Crée les nouvelles règles** (séquence inexistante) via `/api/firewall/filter/addRule`
   - **Met à jour les règles existantes** (séquence existante mais champs différents) via `/api/firewall/filter/setRule`
   - **Supprime les règles orphelines** (séquence présente sur le pare-feu mais absente des vars) via `/api/firewall/filter/delRule`
   - **Applique la configuration** via `/api/firewall/filter/apply`

3. **Affiche un résumé** : liste les interfaces configurées

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_firewall_rules` | Dictionnaire de règles par interface |
| `opnsense_firewall_vlan10_rules` | Règles VLAN10 (gestion) |
| `opnsense_firewall_vlan12_rules` | Règles VLAN12 (serveurs) |
| `opnsense_firewall_vlan14_rules` | Règles VLAN14 (postes de travail) |
| `opnsense_firewall_vlan16_rules` | Règles VLAN16 (WiFi de confiance) |
| `opnsense_firewall_vlan18_rules` | Règles VLAN18 (WiFi invité) |
| `opnsense_firewall_vlan20_rules` | Règles VLAN20 (WiFi CCTV) |
| `opnsense_firewall_vlan22_rules` | Règles VLAN22 (Ethernet invité) |
| `opnsense_firewall_wg0_rules` | Règles VPN WireGuard |
| `opnsense_firewall_lan_rules` | Règles interface LAN |
| `opnsense_firewall_wan_rules` | Règles interface WAN |
| `opnsense_firewall_validate_certs` | Valider les certificats SSL |

**Champs de définition de la règle :**

| Champ | Description |
|-------|----------|-------------|
| `sequence` | Numéro unique par interface (clé d'idempotence) |
| `action` | `pass`, `block` ou `reject` |
| `interface` | Nom de l'interface |
| `description` | Description de la règle |
| `protocol` | `tcp`, `udp`, `icmp`, etc. |
| `source_net` | Adresse source (`any`, nom d'alias ou CIDR) |
| `destination_net` | Adresse de destination |
| `destination_port` | Port de destination |
| `log` | `"1"` pour journaliser les paquets correspondants |
| `categories` | Nom de la catégorie (voir le rôle `opnsense_firewall_categories`) |

## Notes

- Supprimer une règle des vars la supprime du pare-feu lors de la prochaine exécution
- Les numéros de séquence doivent être uniques par interface mais peuvent être réutilisés entre interfaces
- Définissez d'abord les catégories pare-feu avec le rôle `opnsense_firewall_categories`
- Définissez d'abord les alias avec le rôle `opnsense_aliases` s'ils sont référencés dans les règles
