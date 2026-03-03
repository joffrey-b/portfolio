---
title: "Déploiement de la Supervision Système"
category: "Monitoring & Metrics"
description: "Ce rôle déploie une infrastructure de supervision système complète incluant NRPE (Nagios Remote Plugin Executor), des scripts de supervision personnalisés et des plugins Centreon."
tags: ["Apache", "Centreon", "Debian", "Docker", "HTTPS"]
---

## Vue d'ensemble

Ce rôle déploie une infrastructure de supervision système complète incluant NRPE (Nagios Remote Plugin Executor), des scripts de supervision personnalisés et des plugins Centreon. Il gère les configurations spécifiques aux hôtes pour les conteneurs Docker, l'hyperviseur Proxmox, le pare-feu OPNsense et le serveur de supervision Centreon. Le rôle installe les paquets, déploie des scripts de vérification personnalisés, configure le daemon NRPE avec les permissions appropriées et met en place des intégrations de services telles que Centreon Apache HTTPS et la planification du stockage Proxmox PBS.

## Ce que fait ce rôle

### Pour tous les hôtes supervisés

1. **Installe les paquets de supervision** (NRPE, plugins Nagios)
2. **Configure NRPE** pour écouter sur l'IP du VLAN12
3. **Définit les allowed_hosts** pour autoriser le serveur Centreon
4. **Crée le répertoire `/etc/nrpe.d/`** pour les commandes spécifiques aux hôtes
5. **Déploie des scripts de supervision personnalisés** dans les répertoires appropriés
6. **Active et démarre le service NRPE**

### Pour l'hôte Docker

1. **Installe les paquets RedHat** (nrpe, nagios-plugins, cpanminus)
2. **Déploie le script `check_docker.py`** vers `/usr/lib64/nagios/plugins/`
3. **Déploie la configuration des commandes NRPE Docker** vers `/etc/nrpe.d/docker_commands.cfg`
4. **Ajoute l'utilisateur nrpe au groupe docker** pour l'accès aux conteneurs
5. **Redémarre le service NRPE** pour appliquer les modifications

**Commandes NRPE Docker** :
- `check_docker_containers` : Vérifie l'état des conteneurs
- `check_docker_uptime` : Vérifie la durée de fonctionnement des conteneurs

### Pour l'hôte Proxmox

1. **Installe les paquets Debian** (monitoring-plugins, nagios-nrpe-server, cpanminus)
2. **Installe les modules Perl** (Config::Tiny) via cpanm
3. **Déploie le script `check_temp.sh`** vers `/usr/lib/nagios/plugins/`
4. **Déploie le script `check_smart.pl`** vers `/usr/lib/nagios/plugins/`
5. **Déploie la configuration des commandes NRPE Proxmox** vers `/etc/nrpe.d/proxmox_commands.cfg`
6. **Configure sudoers** pour que l'utilisateur nagios puisse exécuter `smartctl` sans mot de passe
7. **Crée des scripts d'activation/désactivation PBS** et des planifications cron
8. **Redémarre le service NRPE** pour appliquer les modifications

**Commandes NRPE Proxmox** :
- `check_cpu_temp` : Surveille la température CPU
- `check_smart_sda` : Vérifie l'état SMART de /dev/sda
- `check_smart_sdb` : Vérifie l'état SMART de /dev/sdb
- `check_smart_sdc` : Vérifie l'état SMART de /dev/sdc

### Pour le serveur Centreon

1. **Installe le plugin NRPE Centreon** (centreon-nrpe3-plugin)
2. **Déploie des scripts personnalisés Centreon** vers `/usr/lib/centreon/plugins/`
3. **Configure Apache pour HTTPS** avec des certificats SSL
4. **Configure les paramètres PHP** (session, mémoire, limites de temps, certificat CA)
5. **Désactive le module autoindex Apache** (sécurité)
6. **Redémarre les services httpd et php-fpm**

### Pour le pare-feu OPNsense

1. **Déploie des scripts de supervision personnalisés** vers `/usr/local/libexec/nagios/`

**Remarque** : OPNsense utilise NRPE intégré ; le rôle déploie uniquement les scripts.

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `deploy_system_monitoring_centreon_ip` | IP du serveur Centreon (VLAN12) |
| `deploy_system_monitoring_docker_uptime_warning` | Seuil d'avertissement pour la durée de fonctionnement des conteneurs Docker (secondes) |
| `deploy_system_monitoring_docker_uptime_critical` | Seuil critique pour la durée de fonctionnement des conteneurs Docker (secondes) |
| `deploy_system_monitoring_proxmox_cpu_temp_warning` | Seuil d'avertissement de température CPU (°C) |
| `deploy_system_monitoring_proxmox_cpu_temp_critical` | Seuil critique de température CPU (°C) |
| `deploy_system_monitoring_proxmox_cpu_sensor` | Identifiant du capteur CPU |
| `deploy_system_monitoring_proxmox_smart_disks` | Liste des disques pour la supervision SMART |
| `deploy_system_monitoring_proxmox_pbs_storage_name` | Nom du stockage PBS dans Proxmox |
| `deploy_system_monitoring_proxmox_pbs_enable_hour` | Heure d'activation du stockage PBS (1h10) |
| `deploy_system_monitoring_proxmox_pbs_enable_minute` | Minute d'activation du stockage PBS |
| `deploy_system_monitoring_proxmox_pbs_disable_hour` | Heure de désactivation du stockage PBS (2h20) |
| `deploy_system_monitoring_proxmox_pbs_disable_minute` | Minute de désactivation du stockage PBS |
| `deploy_system_monitoring_centreon_ssl_cert_path` | Chemin du certificat SSL Centreon |
| `deploy_system_monitoring_centreon_ssl_key_path` | Chemin de la clé SSL Centreon |

## Notes

- Le rôle détecte automatiquement le type d'hôte depuis les groupes d'inventaire et applique la configuration appropriée
- NRPE écoute sur l'adresse IP du VLAN12 pour la communication avec Centreon sur le port 5666
- Les hôtes Proxmox nécessitent `lm-sensors` et `smartmontools` (installés par le rôle)
- La planification PBS crée des tâches cron pour activer/désactiver le stockage pendant et hors des fenêtres de sauvegarde.
