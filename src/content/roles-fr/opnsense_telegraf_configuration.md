---
title: "Configuration Telegraf OPNsense"
category: "Monitoring & Metrics"
description: "Ce rôle configure l'agent de collecte de métriques Telegraf sur le pare-feu OPNsense."
tags: ["Grafana", "InfluxDB", "JSON", "OPNsense", "SSH", "Telegraf"]
---

## Vue d'ensemble

Ce rôle configure l'agent de collecte de métriques Telegraf sur le pare-feu OPNsense en déployant des scripts de supervision personnalisés et en configurant les plugins d'entrée. Il crée un répertoire de scripts, déploie un script de supervision de la température CPU, ajoute la configuration du plugin dans telegraf.conf, et redémarre le service Telegraf pour activer la supervision. Cela permet de collecter les métriques de température CPU et de les envoyer à InfluxDB pour visualisation dans Grafana.

## Ce que fait ce rôle

1. **Crée le répertoire de scripts** :
   - S'assure que le répertoire `/usr/local/etc/telegraf-scripts` existe
   - Le créé si inexistant
   - Définit les permissions : `0755` (rwxr-xr-x)

2. **Déploie le script de température CPU** :
   - Copie `cputemp.sh` dans le dossier de scripts
   - Définit les permissions exécutables : `0755`
   - Le script interroge `sysctl dev.cpu` pour les températures

3. **Configure le plugin exec** :
   - Ajoute un bloc de configuration dans `/usr/local/etc/telegraf.conf`
   - Utilise `blockinfile` avec des marqueurs pour l'idempotence
   - Configure le chemin de la commande, le timeout et le format des données

4. **Redémarre Telegraf** :
   - Redémarre le service `telegraf`
   - Active la nouvelle configuration
   - Commence la collecte des métriques de température CPU

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `opnsense_telegraf_configuration_scripts_folder` | Chemin du répertoire de scripts |
| `opnsense_telegraf_configuration_temperature_script_name` | Nom du script de température CPU |
| `opnsense_telegraf_configuration_exec_timeout` | Timeout d'exécution du script |
| `opnsense_telegraf_configuration_data_format` | Format des données (protocole en ligne InfluxDB) |
| `opnsense_telegraf_configuration_config_file_name` | Nom du fichier de configuration Telegraf |

## Notes

- Exécutez d'abord `opnsense_install_packages` pour installer le plugin `os-telegraf`
- Le rôle déploie un script `cputemp.sh` qui produit des données au format InfluxDB
- Telegraf est redémarré après les modifications de configuration pour activer la nouvelle configuration
