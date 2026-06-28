---
title: "OPNsense Unbound, Paramètres"
category: "Firewall & Security"
description: "Ce rôle configure les paramètres généraux et avancés du résolveur DNS Unbound dans OPNsense via l'API REST."
tags: ["DHCP", "DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL"]
---

## Vue d'ensemble

Ce rôle configure les paramètres généraux et avancés du résolveur DNS Unbound dans OPNsense via l'API REST.

## Ce que fait ce rôle

1. **Récupère la configuration existante** via `/api/unbound/settings/get`
2. **Compare avec la configuration souhaitée** (paramètres généraux et avancés)
3. **Met à jour si différent** via `/api/unbound/settings/set`
4. **Reconfigure Unbound** via `/api/unbound/service/reconfigure`
5. **Affiche un résumé** du statut des paramètres

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_unbound_settings_general` | Paramètres généraux d'Unbound |
| `opnsense_unbound_settings_advanced` | Paramètres avancés d'Unbound |
| `opnsense_unbound_settings_validate_certs` | Valider les certificats SSL |

**Structure des paramètres généraux (champs clés):**

```yaml
opnsense_unbound_settings_general:
  enabled: "1"
  port: "53"
  active_interface:       # Interfaces to listen on (use opt codes)
    - opt1                # VLAN10Management
    - opt2                # VLAN12Servers
  outgoing_interface:
    - wan
  dnssec: "0"             # Enable DNSSEC validation
  regdhcp: "0"            # Register DHCP leases in DNS
  safesearch: "0"         # Force SafeSearch
  local_zone_type: "transparent"
```

**Structure des paramètres avancés (champs clés):**

```yaml
opnsense_unbound_settings_advanced:
  hideidentity: "0"
  hideversion: "0"
  prefetch: "0"           # Enable prefetching for faster responses
  logqueries: "0"         # Log DNS queries
  logreplies: "0"
  logverbosity: "1"       # 0=none, 1=operational, 2-5=verbose
  privateaddress:
    - "10.0.0.0/8"
    - "172.16.0.0/12"
    - "192.168.0.0/16"
```

## Notes

- Appliquer les modifications aux redirections d'hôtes Unbound et au DNSBL après avoir modifié les paramètres généraux
