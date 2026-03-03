---
title: "OPNsense Unbound DNSBL"
category: "Firewall & Security"
description: "Ce rôle configure les listes de blocage DNS (DNSBL) dans le résolveur Unbound d'OPNsense via l'API REST."
tags: ["DNS", "HTTPS", "JSON", "OPNsense", "REST API", "SSL", "TLS"]
---

## Vue d'ensemble

Ce rôle configure les listes de blocage DNS (DNSBL) dans le résolveur Unbound d'OPNsense via l'API REST. Le DNSBL bloque les domaines malveillants, les publicités, les trackers et autres contenus indésirables au niveau DNS.

## Ce que fait ce rôle

1. **Récupère la configuration DNSBL existante** via `/api/unbound/settings/search_dnsbl`
2. **Compare avec la configuration souhaitée** (activé, type, listes, listes d'autorisation, etc.)
3. **Met à jour si différent** via `/api/unbound/settings/set_dnsbl/{uuid}`
4. **Applique les modifications DNSBL** via `/api/unbound/service/dnsbl`
5. **Affiche un résumé** du statut DNSBL

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_unbound_dnsbl_config` | Objet de configuration DNSBL |
| `opnsense_unbound_dnsbl_validate_certs` | Valider les certificats SSL |

**Configuration structure:**

```yaml
opnsense_unbound_dnsbl_config:
  enabled: "1"          # Enable DNSBL
  type:                 # Blocklist source codes (see below)
    - ag                # AdGuard
    - sb                # Steven Black
    - atf               # ThreatFox
    - hgz003            # Hagezi PRO
  lists: []             # Custom blocklist URLs
  allowlists: []        # Domains to whitelist
  blocklists: []        # Domains to explicitly block
  wildcards: []         # Wildcard domain blocks
  nxdomain: "0"         # Return NXDOMAIN (1) or redirect (0)
  cache_ttl: "72000"    # Cache TTL in seconds
  description: "default"
```

**Codes des sources de blocklist (sélection) :**

| Code | Description |
|------|-------------|
| `ag` | AdGuard |
| `sb` | Steven Black |
| `atf` | ThreatFox IOC database |
| `el` | EasyList |
| `ep` | EasyPrivacy |
| `hgz001`–`hgz021` | Hagezi lists (LIGHT to ULTIMATE) |
| `oisd0`–`oisd2` | OISD domain blocklists |

## Notes

- Les modifications DNSBL sont appliquées immédiatement via l'endpoint de reconfiguration du service Unbound
- Ajoutez les domaines légitimes fréquemment bloqués dans `allowlists` pour éviter les faux positifs
