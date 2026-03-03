---
title: "Configuration rsyslog"
category: "Monitoring & Metrics"
description: "Ce rôle configure rsyslog sur les systèmes Linux pour transférer les logs système vers un serveur Graylog distant."
tags: ["Apache", "Debian", "Graylog", "JSON", "Nginx"]
---

## Vue d'ensemble

Ce rôle configure rsyslog sur les systèmes Linux pour transférer les logs système vers un serveur Graylog distant et transférer optionnellement des fichiers de logs applicatifs spécifiques. Il installe rsyslog, configure le transfert de logs distant via UDP ou TCP, met en place la surveillance de fichiers pour les logs applicatifs spécifiques, et redémarre le service pour activer les changements. Cela permet une journalisation centralisée des événements système et des logs applicatifs dans Graylog pour l'analyse, les alertes et le dépannage.

## Ce que fait ce rôle

1. **Installer rsyslog** :
   - S'assure que le paquet rsyslog est installé
   - Installe le paquet si non-présent

2. **Configurer le transfert de logs** :
   - Crée la configuration de transfert vers le serveur distant dans `/etc/rsyslog.d/`
   - Template : `forward_to_graylog.conf.j2`
   - Transfère tous les logs système vers Graylog
   - Utilise UDP ou TCP selon la configuration

3. **Configurer la surveillance de fichiers** (si des logs spécifiques sont définis) :
   - Charge le module `imfile` pour la lecture de fichiers
   - Crée une configuration de surveillance par hôte
   - Template : `custom_log_monitoring.conf.j2`
   - Surveille chaque fichier de log spécifié
   - Tague les logs pour leur identification dans Graylog
   - Il suffit de renseigner dans `host_vars` le chemin du fichier et le tag
   - Le niveau de log et la facility ont une valeur par défaut qui peut être surchargée dans `host_vars`
   - Le rôle se charge de tout le reste via le template

4. **Redémarrer rsyslog** :
   - Redémarre le service via systemd
   - Active la nouvelle configuration
   - Commence immédiatement le transfert des logs

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `rsyslog_configuration_server_ip` | IP du serveur Graylog |
| `rsyslog_configuration_server_port` | Port syslog sur Graylog |
| `rsyslog_configuration_protocol` | Protocole de transport (udp/tcp) |
| `rsyslog_configuration_custom_log_files` | Fichiers de logs spécifiques à surveiller |
| `rsyslog_configuration_polling_interval` | Intervalle de lecture des fichiers (secondes) |
| `rsyslog_configuration_default_severity` | Sévérité de log par défaut |
| `rsyslog_configuration_default_facility` | Facility de log par défaut |

**Définition d'un fichier de log personnalisé :**

```yaml
rsyslog_configuration_custom_log_files:
  - file: /var/log/myapp/application.log
    tag: myapp
    severity: info
    facility: local1
```

## Notes

- Utiliser le protocole `tcp` pour une livraison fiable des logs critiques (UDP peut perdre des paquets sous charge)
- `rsyslog_configuration_custom_log_files` permet de lire n'importe quel fichier de log et de le transférer vers Graylog
- Configurer une entrée syslog correspondante (UDP/TCP port 514) dans Graylog avant d'activer le transfert
- Le service rsyslog est redémarré après les modifications de configuration
