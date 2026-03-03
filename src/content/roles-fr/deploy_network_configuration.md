---
title: "Déploiement de la Configuration Réseau"
category: "Network & Storage"
description: "Ce rôle gère la configuration réseau multi-VLAN sur des systèmes hétérogènes dans l'environnement."
tags: ["Centreon", "Debian", "Docker", "Grafana", "Graylog"]
---

## Vue d'ensemble

Ce rôle gère la configuration réseau multi-VLAN sur des systèmes hétérogènes dans l'environnement. Il déploie les tables de routage, les configurations NetworkManager pour les systèmes RedHat, les scripts dispatcher NetworkManager pour les serveurs Docker, des scripts de routage personnalisés avec services systemd pour OpenMediaVault, ainsi que la configuration `/etc/network/interfaces` pour Proxmox et ZoneMinder. Le rôle inclut des dispositifs de sécurité complets : invites de confirmation, support du mode check, sauvegardes de configuration et validation de la connectivité pour prévenir toute perturbation réseau accidentelle.

## Ce que fait ce rôle

### 1. Affichage de l'invite de confirmation (si activée)

Affiche un avertissement avec des recommandations.

**Quand** : `deploy_network_configuration_require_confirmation: true` (par défaut)

**Ignoré si** :
- La confirmation est désactivée
- L'hôte n'a pas `deploy_network_configuration_interfaces` de défini

### 2. Déploiement de la configuration des tables de routage

**Fichier** : `/usr/share/iproute2/rt_tables` (la plupart) ou `/etc/iproute2/rt_tables` (OMV)

**Contenu ajouté** :
```
# Custom routing tables for policy-based routing
100 mgmt
101 servers
```

**Objectif** : Active les tables de routage nommées pour le routage basé sur des politiques

### 3. Déploiement de la configuration réseau spécifique à l'OS

**RedHat NetworkManager** (Centreon, Docker, Grafana, Graylog, etc.) :
- Copie les fichiers `.nmconnection` vers `/etc/NetworkManager/system-connections/`
- Définit les permissions : `0600` (root uniquement, exigence de sécurité)
- Copie les scripts dispatcher vers `/etc/NetworkManager/dispatcher.d/`
- Définit les permissions : `0755` (exécutable)
- Recharge ou redémarre NetworkManager

**Debian NetworkManager** (OpenMediaVault) :
- Déploie un script de routage personnalisé vers `/usr/local/bin/setup-omv-routing.sh`
- Crée un service systemd : `omv-routing.service`
- Le service s'exécute après `network-online.target`
- Active et démarre le service
- Configure nginx pour lier l'interface web à l'IP du VLAN d'administration
- Préserve les liaisons localhost pour l'accès local
- Redémarre nginx en cas de changement de configuration

**Debian ifupdown** (Proxmox, ZoneMinder) :
- Déploie `/etc/network/interfaces` depuis un template
- Crée une sauvegarde de la configuration existante au préalable
- Redémarre le service réseau

### 4. Validation de la connectivité réseau

Après les changements de configuration :
- Attend jusqu'à 60 secondes que le réseau se stabilise
- Teste la connectivité Ansible
- Rapporte le succès ou l'échec

**En cas d'échec de la validation** : Un accès console est disponible pour le dépannage

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `deploy_network_configuration_require_confirmation` | Demander confirmation avant les modifications |
| `deploy_network_configuration_rt_tables` | Définitions des tables de routage |
| `deploy_network_configuration_interfaces` | Configuration des interfaces par hôte |
| `deploy_network_configuration_interfaces_file` | Fichier interfaces Debian |

## Notes

- Le rôle est conçu pour la **prévention de la dérive de configuration**, ou pour la configuration réseau initiale
- Ansible nécessite une connectivité réseau pour s'exécuter ; un bootstrap manuel minimum doit être effectué au préalable
- `deploy_network_configuration_require_confirmation: false` désactive l'invite de sécurité (pour CI/CD)
- Chaque hôte définit ses propres `deploy_network_configuration_interfaces` dans `host_vars`
