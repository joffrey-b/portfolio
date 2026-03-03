---
title: "OPNsense Unbound — Redirections d'hôtes"
category: "Firewall & Security"
description: "Ce rôle gère les redirections d'hôtes DNS (enregistrements DNS locaux) dans le résolveur Unbound d'OPNsense via l'API REST."
tags: ["DNS", "Grafana", "HTTPS", "JSON", "OPNsense", "REST API"]
---

## Vue d'ensemble

Ce rôle gère les redirections d'hôtes DNS (enregistrements DNS locaux) dans le résolveur Unbound d'OPNsense via l'API REST. Il assure une gestion complète du cycle de vie : création de nouvelles redirections, mise à jour des redirections existantes en cas de modification de la configuration, et suppression des redirections orphelines qui existent sur OPNsense mais ne sont plus définies dans les fichiers vars.

## Ce que fait ce rôle

1. **Récupère les redirections existantes** via `/api/unbound/settings/searchHostOverride`
2. **Construit un index hostname+domaine → UUID** pour l'idempotence
3. **Crée les nouvelles redirections** via `/api/unbound/settings/addHostOverride`
4. **Met à jour les redirections existantes** via `/api/unbound/settings/setHostOverride/{uuid}`
5. **Supprime les redirections orphelines** via `/api/unbound/settings/delHostOverride/{uuid}`
6. **Reconfigure Unbound** via `/api/unbound/service/reconfigure` pour appliquer les changements
7. **Affiche un résumé** des redirections configurées

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_unbound_host_overrides_list` | Liste des redirections d'hôtes |
| `opnsense_unbound_host_overrides_validate_certs` | Valider les certificats SSL |

**Champs de définition de la redirection :**

| Champ | Description |
|-------|----------|-------------|
| `hostname` | Nom d'hôte |
| `domain` | Partie du domaine |
| `server` | Adresse IP de résolution |
| `enabled` | `"1"` pour activer, `"0"` pour désactiver |
| `rr` | Type d'enregistrement : `A`, `AAAA` ou `MX` |
| `mxprio` | Priorité de l'enregistrement MX (requis si `rr` est `MX`) |
| `mx` | Hostname du serveur mail (requis si `rr` est `MX`) |
| `description` | Description lisible |

## Notes

- Les redirections absentes de `opnsense_unbound_host_overrides_list` sont supprimées (la liste fait référence)
- Les modifications sont appliquées immédiatement via la reconfiguration d'Unbound
