---
title: "Influxdb"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure la base de données de séries temporelles InfluxDB 1.x sur les systèmes RedHat."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "JSON", "Nginx"]
---

## Vue d'ensemble

Ce rôle installe et configure la base de données de séries temporelles InfluxDB 1.x sur les systèmes RedHat. Il ajoute le dépôt officiel InfluxData, installe InfluxDB, configure les paramètres HTTP/UDP/logging, crée des bases de données avec des utilisateurs et leurs privilèges, met en place des politiques de rétention pour la gestion du cycle de vie des données, et s'assure que le service est activé et démarré. Le rôle est entièrement idempotent et vérifie l'existence des ressources avant de les créer.

## Ce que fait ce rôle

1. **Ajoute le dépôt InfluxData**
   - URL : https://repos.influxdata.com/rhel/
   - Active la vérification GPG

2. **Installe le paquet InfluxDB** via dnf/yum
   - Version 1.x depuis le dépôt officiel

3. **Configure l'API HTTP** dans `/etc/influxdb/influxdb.conf` :
   - Adresse d'écoute
   - Journalisation des accès
   - Active/désactive l'endpoint HTTP

4. **Configure la journalisation** :
   - Format (logfmt ou json)
   - Niveau (error, warn, info, debug)
   - Suppression du logo

5. **Configure l'entrée UDP** (si activée) :
   - Adresse d'écoute
   - Base de données par défaut pour les écritures UDP

6. **Démarre et active le service** :
   - Démarre InfluxDB
   - Garantit que InfluxDB démarre au boot

7. **Attend qu'InfluxDB** soit prêt (port 8086)

8. **Vérifie les utilisateurs existants** (idempotent) :
   - Requête : `SHOW USERS`
   - Analyse la réponse JSON

9. **Crée les utilisateurs** :
   - Crée uniquement s'ils n'existent pas
   - Utilise les mots de passe depuis le vault

10. **Vérifie les bases de données existantes** (idempotent) :
    - Requête : `SHOW DATABASES`
    - Analyse la réponse JSON

11. **Crée les bases de données** :
    - Crée uniquement si elles n'existent pas

12. **Attribue les privilèges** :
    - `GRANT ALL ON database TO user`

13. **Vérifie les politiques de rétention existantes** :
    - Requête : `SHOW RETENTION POLICIES ON database`

14. **Crée les politiques de rétention** :
    - Crée uniquement si elles n'existent pas
    - Définit comme défaut si spécifié

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `influxdb_databases` | Liste des bases de données à créer ; chaque entrée supporte un `user` (avec `password`) et une `retention_policy` optionnels |
| `influxdb_service_enabled` | Activer le service au démarrage |
| `influxdb_service_state` | État désiré du service |
| `influxdb_http_enabled` | Activer l'API HTTP |
| `influxdb_http_bind_address` | Adresse d'écoute HTTP |
| `influxdb_http_log_enabled` | Activer la journalisation des requêtes HTTP |
| `influxdb_http_access_log_path` | Chemin du fichier de journal des accès HTTP |
| `influxdb_udp_enabled` | Activer l'entrée UDP |
| `influxdb_udp_bind_address` | Adresse d'écoute UDP |
| `influxdb_udp_database` | Base de données par défaut pour les écritures UDP |
| `influxdb_logging_level` | Niveau de journalisation |
| `influxdb_logging_format` | Format de sortie des journaux (`logfmt` ou `json`) |
| `influxdb_logging_suppress_logo` | Supprimer le logo de démarrage InfluxDB dans les journaux |

**Structure de définition de la base de données :**

```yaml
influxdb_databases:
  - name: homelab
    user: telegraf
    password: "{{ vault_influxdb_telegraf_password }}"
    retention_policy:
      name: thirty_days
      duration: 30d
      replication: 1
      default: true
  - name: opnsense
    retention_policy:
      name: ninety_days
      duration: 90d
      replication: 1
      default: true
```

## Notes

- Supporte uniquement InfluxDB 1.x (langage de requête InfluxQL)
- Utilisé typiquement comme backend dans la stack de supervision Telegraf → InfluxDB → Grafana
