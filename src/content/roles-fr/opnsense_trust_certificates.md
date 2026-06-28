---
title: "OPNsense, Certificats de confiance"
category: "Firewall & Security"
description: "Ce rôle gère les certificats SSL/TLS sur OPNsense via l'API REST."
tags: ["Centreon", "DNS", "HTTPS", "JSON", "Navidrome", "OPNsense", "SSL"]
---

## Vue d'ensemble

Ce rôle gère les certificats SSL/TLS sur OPNsense via l'API REST. Il assure une gestion complète du cycle de vie : création de nouveaux certificats signés par une CA OPNsense existante, renouvellement des certificats en cas de modification de la configuration ou d'expiration, et suppression des certificats non définis dans le code. Les fichiers de certificat et de clé privée sont enregistrés localement pour être déployés sur les services.

## Ce que fait ce rôle

1. **Récupère la liste des CA** et recherche la CA par nom pour obtenir le `refid`
2. **Récupère les certificats existants** depuis OPNsense et construit un index par description
3. **Crée les nouveaux certificats** présents dans la config mais absents d'OPNsense
   - Signe avec la CA configurée
   - Enregistre les fichiers .crt et .key localement
4. **Vérifie les certificats existants** pour déterminer s'ils doivent être réémis :
   - Changement du Common Name
   - Changement des SAN DNS/IP/URI/email
   - Changement du type de certificat, de clé ou de digest
   - Certificat expiré (`valid_to` < horodatage actuel)
5. **Réémet les certificats** nécessitant une mise à jour
   - Génère un nouveau certificat (conserve la même clé privée)
   - Enregistre le fichier .crt mis à jour localement
6. **Supprime les certificats** non définis dans le code
7. **Affiche un résumé** des certificats créés, réémis et supprimés

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_opnsense_bjoffrey_user_api_key` | Clé API OPNsense (depuis le vault) |
| `vault_opnsense_bjoffrey_user_api_secret` | Secret API OPNsense (depuis le vault) |
| `opnsense_trust_certificates_list` | Liste des définitions de certificats (dans le fichier vars) |
| `opnsense_trust_certificates_ca_name` | Nom de la CA signataire dans OPNsense |
| `opnsense_trust_certificates_validate_certs` | Valider les certificats SSL pour les appels API |
| `opnsense_trust_certificates_output_dir` | Répertoire d'export des fichiers .crt/.key |

**Champs de définition du certificat :**

| Champ | Description |
|-------|----------|-------------|
| `descr` | Description du certificat (utilisée comme identifiant unique) |
| `commonname` | Nom commun (CN) du certificat |
| `altnames_dns` | Noms alternatifs DNS (Subject Alternative Names, chaîne multiligne) |
| `altnames_ip` | Noms alternatifs IP (Subject Alternative Names, chaîne multiligne) |
| `key_type` | Taille de la clé RSA (défaut : `2048`) |
| `lifetime` | Durée de validité en jours (défaut : `1200` ≈ 3,3 ans) |

## Notes

- Les certificats sont réémis automatiquement en cas de changement du CN, des SAN, du type de clé ou d'expiration
- Les certificats absents de la liste sont supprimés d'OPNsense (la liste fait référence)
- Les clés privées ne sont jamais journalisées (`no_log: true` sur les tâches sensibles)
