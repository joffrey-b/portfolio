---
title: "Agent Telegraf"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure l'agent de supervision Telegraf sur les systèmes Linux pour collecter et transmettre les métriques système vers InfluxDB."
tags: ["Centreon", "Debian", "Docker", "Grafana", "Graylog"]
---

## Vue d'ensemble

Ce rôle installe et configure l'agent de supervision Telegraf sur les systèmes Linux pour collecter et transmettre les métriques système vers InfluxDB. Il utilise une approche de configuration à deux niveaux : un fichier de configuration principal contenant les paramètres de l'agent, la sortie InfluxDB et les plugins d'entrée communs, plus des configurations spécifiques par hôte pour des entrées spécialisées comme la supervision Docker, via SNMP, etc. Le rôle prend en charge les systèmes RedHat et Debian, gère automatiquement la configuration des dépôts, valide la configuration Telegraf avant déploiement, et gère le service.

## Ce que fait ce rôle

### 1. Configurer le dépôt InfluxData

**RedHat/CentOS** :
- Ajoute le dépôt yum InfluxData
- Installe la clé GPG pour la vérification des paquets

**Debian/Ubuntu** :
- Ajoute le dépôt apt InfluxData
- Installe la clé GPG

### 2. Installer le paquet Telegraf

- Installe le paquet `telegraf` depuis le dépôt InfluxData.

### 3. Déployer la configuration principale

**Fichier** : `/etc/telegraf/telegraf.conf`

**Contenu** :
- Paramètres de l'agent (intervalle, flush, buffer)
- Configuration de la sortie InfluxDB
- Plugins d'entrée communs (toujours activés) :
  - Métriques CPU
  - Utilisation disque
  - I/O disque
  - Statistiques noyau
  - Utilisation mémoire
  - Processus
  - Utilisation swap
  - Charge/uptime système
  - Interfaces réseau
  - Statistiques réseau

### 4. Déployer les configurations spécifiques par hôte

**Répertoire** : `/etc/telegraf/telegraf.d/`

**Configurations conditionnelles** (selon les flags activés) :
- `docker.conf` : Supervision Docker (`enable_docker_input: true`)
- `temp.conf` : Capteurs de température (`enable_temp_input: true`)
- `interrupts.conf` : Supervision des interruptions (`enable_interrupts_input: true`)
- `sysctl.conf` : Supervision sysctl (`enable_sysctl_input: true`)
- `snmp_synology.conf` : SNMP Synology (`enable_snmp_synology: true`)
- `snmp_zyxel.conf` : SNMP Zyxel AP (`enable_snmp_zyxel_ap: true`)

### 5. Ajouter Telegraf au groupe Docker (si Docker activé)

Si `telegraf_agent_enable_docker_input: true` :
- Ajoute l'utilisateur `telegraf` au groupe `docker`
- Permet à Telegraf d'accéder au socket Docker
- Redémarre Telegraf pour appliquer l'appartenance au groupe

### 6. Valider la configuration

Avant de redémarrer Telegraf :
- Exécute `telegraf --config /etc/telegraf/telegraf.conf --test`
- Valide la syntaxe de la configuration
- Échoue le déploiement si la configuration est invalide

### 7. Activer et démarrer le service

- Active le service Telegraf au démarrage
- Démarre ou redémarre le service Telegraf
- Le service s'exécute en tant qu'utilisateur `telegraf`

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_influxdb_telegraf_password` | Mot de passe InfluxDB (depuis le vault) |
| `telegraf_agent_service_name` | Nom du service systemd Telegraf |
| `telegraf_agent_interval` | Intervalle de collecte |
| `telegraf_agent_round_interval` | Arrondir l'intervalle de collecte à l'intervalle configuré |
| `telegraf_agent_metric_batch_size` | Nombre maximum de métriques par lot d'écriture |
| `telegraf_agent_metric_buffer_limit` | Nombre maximum de métriques en tampon par sortie |
| `telegraf_agent_collection_jitter` | Gigue aléatoire ajoutée à l'intervalle de collecte |
| `telegraf_agent_flush_interval` | Intervalle de flush |
| `telegraf_agent_flush_jitter` | Gigue aléatoire ajoutée à l'intervalle de flush |
| `telegraf_agent_precision` | Précision des horodatages (vide = pas d'arrondi) |
| `telegraf_agent_influxdb_url` | URL InfluxDB |
| `telegraf_agent_influxdb_database` | Nom de la base de données |
| `telegraf_agent_influxdb_retention_policy` | Nom de la politique de rétention InfluxDB |
| `telegraf_agent_influxdb_username` | Nom d'utilisateur InfluxDB |
| `telegraf_agent_cpu_percpu` | Collecter les métriques par cœur CPU |
| `telegraf_agent_cpu_totalcpu` | Collecter les métriques CPU totales |
| `telegraf_agent_cpu_collect_cpu_time` | Collecter les métriques de temps CPU |
| `telegraf_agent_cpu_report_active` | Rapporter les métriques CPU actives |
| `telegraf_agent_cpu_core_tags` | Ajouter les tags de cœur aux métriques CPU |
| `telegraf_agent_disk_ignore_fs` | Types de systèmes de fichiers à exclure des métriques disque |
| `telegraf_agent_enable_docker_input` | Activer la supervision Docker |
| `telegraf_agent_docker_endpoint` | Chemin de la socket Docker pour la supervision |
| `telegraf_agent_docker_group` | Groupe OS auquel ajouter l'utilisateur telegraf pour l'accès Docker |
| `telegraf_agent_enable_snmp_synology` | Activer le SNMP NAS Synology |
| `telegraf_agent_snmp_synology_agents` | Liste des adresses des agents SNMP du NAS Synology |
| `telegraf_agent_snmp_synology_interval` | Intervalle de collecte SNMP pour le Synology |
| `telegraf_agent_snmp_synology_timeout` | Délai d'expiration des requêtes SNMP pour le Synology |
| `telegraf_agent_snmp_synology_retries` | Nombre de tentatives de requêtes SNMP pour le Synology |
| `telegraf_agent_snmp_synology_version` | Version du protocole SNMP pour le Synology |
| `telegraf_agent_snmp_synology_community` | Chaîne de communauté SNMP pour le Synology |
| `telegraf_agent_snmp_synology_max_repetitions` | Nombre maximum de répétitions SNMP pour les requêtes bulk |
| `telegraf_agent_snmp_synology_name` | Nom de la mesure pour les données SNMP du Synology |

## Notes

- Activer les entrées spécifiques par hôte dans `host_vars` (ex. : `telegraf_agent_enable_docker_input: true` sur les hôtes Docker)
- La supervision Docker nécessite l'ajout de l'utilisateur Telegraf au groupe `docker`
- Les entrées communes (interruptions, sysctl, temp) sont intégrées dans le template de configuration de base et toujours activées
- La supervision SNMP pour Synology nécessite des chaînes de communauté dans Ansible Vault
- La configuration est validée (`telegraf --test`) avant le déploiement
