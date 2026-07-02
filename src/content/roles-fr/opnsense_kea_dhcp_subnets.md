---
title: "Sous-réseaux KEA DHCP OPNsense"
category: "Firewall & Security"
description: "Ce rôle gère les sous-réseaux KEA DHCPv4 dans OPNsense via l'API REST."
tags: ["DHCP", "DNS", "Kea", "NTP", "OPNsense", "VLAN", "YAML"]
---

## Vue d'ensemble

Ce rôle gère les sous-réseaux KEA DHCPv4 avec des opérations CRUD complètes (Créer, Lire, Mettre à jour, Supprimer). Les sous-réseaux définissent les range d'adresses IP attribuables, la définition du DNS utilisé, ainsi que la route par défaut à donner à la machine qui fait la requête.

## Ce que fait ce rôle

1. **Récupère les sous-réseaux existants** via `/api/kea/dhcpv4/search_subnet` pour construire un mapping CIDR → UUID

2. **Pour chaque sous-réseau dans `opnsense_kea_dhcp_subnets_list`** :
   - **Crée les nouveaux sous-réseaux** (CIDR absent d'OPNsense) via `/api/kea/dhcpv4/add_subnet`
   - **Met à jour les sous-réseaux existants** (CIDR présent mais plage d'adresses, description ou options DHCP différents) via `/api/kea/dhcpv4/set_subnet`

3. **Supprime les sous-réseaux** absents de la liste via `/api/kea/dhcpv4/del_subnet` (la liste est la source de vérité)

4. **Si des changements ont été effectués** : reconfigure le service KEA via `/api/kea/service/reconfigure`

5. **Affiche un résumé** avec le nombre de sous-réseaux créés, mis à jour et supprimés

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_kea_dhcp_subnets_list` | Liste des définitions de sous-réseaux |

**Champs de définition du sous-réseau :**

| Champ | Description |
|-------|-------------|
| `subnet` | CIDR du sous-réseau |
| `pools` | Plage d'adresses IP |
| `description` | Description du sous-réseau |
| `option_data` | Options DHCP (voir ci-dessous) |

**Options DHCP disponibles dans `option_data` :**

| Clé | Description |
|-----|-------------|
| `domain_name_servers` | Serveur(s) DNS |
| `routers` | Passerelle par défaut |
| `domain_name` | Nom de domaine |
| `ntp_servers` | Serveur(s) NTP |
| `tftp_server_name` | Serveur TFTP (PXE) |

## Notes

- Les sous-réseaux absents de `opnsense_kea_dhcp_subnets_list` sont supprimés (la liste est la source de vérité)
- Exécutez `opnsense_kea_dhcp_settings` avant ce rôle pour activer KEA DHCP
- Après avoir créé les sous-réseaux, exécutez `opnsense_kea_dhcp_reservations` pour ajouter les assignations statiques
