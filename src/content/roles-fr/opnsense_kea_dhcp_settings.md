---
title: "Paramètres KEA DHCP OPNsense"
category: "Firewall & Security"
description: "Ce rôle configure les paramètres généraux de KEA DHCPv4 dans OPNsense via l'API REST."
tags: ["DHCP", "Kea", "OPNsense", "REST API", "VLAN", "YAML"]
---

## Vue d'ensemble

Ce rôle configure les paramètres généraux de KEA DHCPv4 dans OPNsense via l'API REST. Il prend en charge les interfaces d'écoute, la durée d'une attribution DHCP, et d'autres paramètres.

## Ce que fait ce rôle

1. **Récupère la configuration KEA DHCPv4 actuelle** via `/api/kea/dhcpv4/get`

2. **Compare les paramètres actuels** avec l'état souhaité (activation, interfaces d'écoute, durée des baux, création de règles de pare-feu, type de socket)

3. **Si les paramètres diffèrent** : met à jour via `/api/kea/dhcpv4/set`

4. **Si une mise à jour a été effectuée** : reconfigure le service KEA via `/api/kea/service/reconfigure`

5. **Affiche le statut** : indique si les paramètres ont été mis à jour ou étaient déjà à jour

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_kea_dhcp_settings_general` | Configuration générale du serveur KEA DHCP |

**Structure des paramètres :**

```yaml
opnsense_kea_dhcp_settings_general:
  enabled: "1"              # Enable KEA DHCP
  interfaces:               # Interfaces to serve DHCP (use opt codes)
    - opt1                  # VLAN10Management
    - opt2                  # VLAN12Servers
  valid_lifetime: "21600"   # Lease time in seconds (6 hours default)
  fwrules: "1"              # Auto-create firewall rules for DHCP
  dhcp_socket_type: "raw"   # raw or udp
```

**Codes d'interface :**

| Code | Interface |
|------|-----------|
| `opt1` | VLAN10Management |
| `opt2` | VLAN12Servers |
| `opt3` | VLAN14Desktops |
| `opt4` | VLAN16WifiTrusted |
| `opt5` | VLAN18WifiGuest |
| `opt6` | VLAN20WifiCCTV |
| `opt7` | VLAN22EthernetGuest |

## Notes

- Exécutez ce rôle avant `opnsense_kea_dhcp_subnets` et `opnsense_kea_dhcp_reservations`
- `fwrules: "1"` crée automatiquement des règles de pare-feu OPNsense pour autoriser le trafic DHCP
