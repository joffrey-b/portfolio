---
title: "Réservations KEA DHCP OPNsense"
category: "Firewall & Security"
description: "Ce rôle gère les réservations statiques KEA DHCPv4 dans OPNsense via l'API REST."
tags: ["DHCP", "Kea", "OPNsense", "YAML"]
---

## Vue d'ensemble

Ce rôle gère les réservations statiques KEA DHCPv4 (mappings MAC → IP) avec des opérations CRUD complètes. Les réservations DHCP permettent d'assigner une adresse IP statique à un équipement ne pouvant pas être configuré. Je m'en sers notamment pour mes caméras IP, afin de pouvoir bloquer le trafic sortant par la suite via des règles de pare-feu.

## Ce que fait ce rôle

1. **Récupère les sous-réseaux existants** via `/api/kea/dhcpv4/search_subnet` pour construire un mapping CIDR → UUID

2. **Récupère les réservations existantes** via `/api/kea/dhcpv4/search_reservation` pour construire un mapping MAC → UUID

3. **Pour chaque réservation dans `opnsense_kea_dhcp_reservations_list`** :
   - **Crée les nouvelles réservations** (adresse MAC absente d'OPNsense) via `/api/kea/dhcpv4/add_reservation`
   - **Met à jour les réservations existantes** (adresse MAC présente mais IP, hostname ou description différents) via `/api/kea/dhcpv4/set_reservation`

4. **Supprime les réservations** absentes de la liste via `/api/kea/dhcpv4/del_reservation` (la liste est la source de vérité)

5. **Si des changements ont été effectués** : reconfigure le service KEA via `/api/kea/service/reconfigure`

6. **Affiche un résumé** avec le nombre de réservations créées, mises à jour et supprimées

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_kea_dhcp_reservations_list` | Liste des réservations statiques |

**Champs de définition de la réservation :**

| Champ | Description |
|-------|----------|-------------|
| `subnet` | CIDR du sous-réseau (doit correspondre à un sous-réseau existant) |
| `ip_address` | Adresse IP statique à assigner |
| `hw_address` | Adresse MAC (minuscules, séparée par des deux-points) |
| `hostname` | Nom d'hôte optionnel |
| `description` | Description optionnelle |

## Notes

- Les réservations absentes de `opnsense_kea_dhcp_reservations_list` sont supprimées (la liste est la source de vérité)
- Exécutez `opnsense_kea_dhcp_subnets` avant ce rôle
