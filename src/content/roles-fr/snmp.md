---
title: "SNMP"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure le daemon Net-SNMP (snmpd) sur les systèmes Linux pour activer la supervision via le protocole SNMP."
tags: ["Centreon", "Debian", "RedHat", "SNMP", "YAML"]
---

## Vue d'ensemble

Ce rôle installe et configure le daemon Net-SNMP (snmpd) sur les systèmes Linux pour activer la supervision via le protocole SNMP. Il configure SNMPv2c avec l'authentification par communauté, définit des listes de contrôle d'accès (ACL), crée des vues pour contrôler les sous-arbres OID accessibles, et prend en charge plusieurs utilisateurs avec différents niveaux de permissions. Le rôle est conçu pour une intégration avec la supervision Centreon et d'autres systèmes de gestion SNMP.

## Ce que fait ce rôle

1. **Installer les paquets SNMP** :
   - **RedHat/CentOS** : Installe `net-snmp`, `net-snmp-utils`
   - **Debian/Ubuntu** : Installe `snmpd`
   - Le gestionnaire de paquets met à jour le cache si nécessaire

2. **Déployer snmpd.conf** :
   - Template : `snmpd.conf.j2`
   - Emplacement : `/etc/snmp/snmpd.conf`
   - Permissions : `0660` (root:root)
   - Sauvegarde : Crée une sauvegarde avant écrasement

3. **Configurer les ACL** :
   - Définit les correspondances communauté-utilisateur
   - Assigne les utilisateurs aux groupes
   - Crée des vues avec accès aux sous-arbres OID
   - Associe les groupes aux vues avec permissions de lecture

4. **Redémarrer snmpd** :
   - Redémarre le service via le handler
   - Active le service au démarrage
   - Applique la nouvelle configuration

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `snmp_protocol_version` | Version SNMP (v1, v2c, v3) |
| `snmp_view_subtrees` | Liste des sous-arbres OID par vue |
| `snmp_acl_info` | Configuration utilisateur/groupe/vue/communauté |
| `snmp_config_file_name` | Nom du fichier de configuration |

**Valeurs par défaut de `snmp_view_subtrees` :**

```yaml
snmp_view_subtrees:
  - subtree: ".1.3.6.1"          # All OIDs
    view_name: "CentreonView"
    included: true
  - subtree: ".1.3.6.1.2.1.1"   # System info
    view_name: "SystemView"
    included: true
  - subtree: ".1.3.6.1.2.1.25.1.1"  # Host resources
    view_name: "SystemView"
    included: true
```

**Valeurs par défaut de `snmp_acl_info` :**

```yaml
snmp_acl_info:
  config:
    user: "ConfigUser"
    group: "ConfigGroup"
    view: "SystemView"
    community: "{{ vault_snmp_config_user_password }}"
  centreon:
    user: "CentreonUser"
    group: "CentreonGroup"
    view: "CentreonView"
    community: "{{ vault_snmp_centreon_user_password }}"
```

## Notes

- Les identifiants sont stockés dans Ansible Vault
- La chaîne de communauté Centreon bénéficie d'un accès complet à l'arbre OID (`.1.3.6.1`) pour la supervision
- S'assurer que les règles de pare-feu autorisent le port UDP 161 depuis le serveur Centreon
- Utilise SNMPv2c (basé sur les communautés), non chiffré
