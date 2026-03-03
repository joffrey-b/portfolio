---
title: "Installation de Grafana"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure Grafana sur les systèmes RedHat."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "MySQL"]
---

## Vue d'ensemble

Ce rôle installe et configure Grafana sur les systèmes RedHat. Il ajoute le dépôt officiel Grafana, installe le paquet Grafana, configure HTTPS avec des certificats SSL, configure SQLite en mode WAL pour éviter les erreurs de verrouillage de base de données, configure SMTP pour les alertes par e-mail via Gmail, déploie les fichiers MIB SNMP Synology, et active le service grafana-server au démarrage.

## Ce que fait ce rôle

1. **Ajoute le dépôt YUM Grafana**
   - URL : https://rpm.grafana.com
   - Active la vérification GPG
   - Configure la vérification des certificats SSL

2. **Installe le paquet Grafana** via dnf/yum
   - Dernière version stable depuis le dépôt officiel

3. **Active et démarre le service grafana-server**
   - Démarre grafana-server
   - Le service démarre automatiquement au boot

4. **Configure les paramètres du serveur** dans `/etc/grafana/grafana.ini` :
   - Protocole (HTTP ou HTTPS)
   - Adresse d'écoute (IP)
   - Chemins des certificats SSL (si HTTPS)
   - Mode WAL SQLite et paramètres de retry (évite les erreurs de verrouillage)
   - Crée une sauvegarde du fichier de configuration avant les modifications

5. **Configure les paramètres SMTP** pour les alertes e-mail :
   - Serveur SMTP Gmail
   - Identifiants d'authentification
   - Adresse et nom d'expéditeur
   - Chiffrement StartTLS

6. **Crée le répertoire MIB SNMP** (`/usr/share/snmp/mibs/`)

7. **Copie les fichiers MIB Synology** pour la supervision SNMP

8. **Redémarre grafana-server** si la configuration a changé (via handler)

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `grafana_install_protocol` | Protocole de l'interface web (http ou https) |
| `grafana_install_http_addr` | Adresse IP d'écoute de l'interface web |
| `grafana_install_cert_file` | Chemin du certificat SSL |
| `grafana_install_cert_key` | Chemin de la clé privée SSL |
| `grafana_install_wal_enabled` | Activer le mode WAL SQLite (évite les erreurs de verrouillage) |
| `grafana_install_query_retries` | Nombre de tentatives de requête en cas de verrou SQLite |
| `grafana_install_transaction_retries` | Nombre de tentatives de transaction en cas de verrou SQLite |
| `grafana_install_smtp_enabled` | Activer SMTP pour les alertes e-mail |
| `grafana_install_smtp_host` | Serveur et port SMTP |
| `grafana_install_smtp_user` | Nom d'utilisateur SMTP (adresse Gmail) |
| `grafana_install_smtp_password` | Mot de passe SMTP (mot de passe d'application Gmail) |
| `grafana_install_smtp_from_address` | Adresse e-mail d'expéditeur |
| `grafana_install_smtp_from_name` | Nom d'expéditeur dans les e-mails |
| `grafana_install_smtp_starttls_policy` | Politique StartTLS |
| `grafana_install_mibs_dest_dir` | Répertoire des fichiers MIB SNMP |

## Notes

- Exécuter `deploy_ssl_certificates` avant ce rôle pour s'assurer que les fichiers de certificats existent
- Le mode WAL SQLite est activé par défaut — corrige les erreurs « database is locked » lorsque Grafana gère des évaluations d'alertes simultanées
- Les identifiants SMTP sont stockés dans Ansible Vault
- Gmail nécessite un mot de passe d'application (pas le mot de passe du compte) pour SMTP avec la double authentification activée
- Les fichiers MIB Synology sont déployés pour activer la supervision NAS via SNMP dans les dashboards
