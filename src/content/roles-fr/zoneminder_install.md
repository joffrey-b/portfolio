---
title: "Installation ZoneMinder"
category: "Applications"
description: "Ce rôle installe et configure ZoneMinder, un système open-source de vidéosurveillance et NVR (Network Video Recorder)."
tags: ["Apache", "Debian", "HTTPS", "JSON", "MariaDB", "MySQL"]
---

## Vue d'ensemble

Ce rôle installe et configure ZoneMinder, un système open-source de vidéosurveillance et NVR (Network Video Recorder), ainsi que ses dépendances incluant le serveur web Apache et la base de données MariaDB. Il gère l'installation complète : création de la base de données et import du schéma, configuration du virtualhost Apache avec support SSL, activation des modules CGI et rewrite, permissions, et gestion du service. Le rôle fournit une installation ZoneMinder prête pour la production, accessible via HTTP et HTTPS.

## Ce que fait ce rôle

### 1. Installer les paquets Python MySQL

Installe les paquets Python requis pour les modules Ansible MySQL :
- `python3-pymysql` : bibliothèque client Python MySQL

**Raison** : Les modules `community.mysql` d'Ansible nécessitent un client MySQL Python

### 2. Installer les paquets ZoneMinder

Installe les paquets nécessaires :
- `apache2` : serveur web
- `mariadb-server` : serveur de base de données
- `zoneminder` : application NVR

**Gestionnaire de paquets** : `apt` (Debian/Ubuntu)

### 3. Configurer MariaDB

**Démarrer MariaDB** :
- Active le service MariaDB
- Démarre le daemon MariaDB

**Créer la base de données** :
- Créé la base de données `zm`

**Créer l'utilisateur** :
- Créé l'utilisateur `zmuser`
- Donne tous les droits à cet utilisateur sur la base de données `zm`

**Importer le schéma** :
- Vérifie si le schéma a déjà été importé (recherche la table `Config`)
- Importe `/usr/share/zoneminder/db/zm_create.sql` si nécessaire
- Idempotent : ne réimporte pas si déjà importé

### 4. Configurer ZoneMinder

**Définir les permissions de fichier** :
- Fichier : `/etc/zm/zm.conf`
- Propriétaire : `root:www-data`
- Mode : `0640` (lecture seule pour le groupe www-data)

**Mettre à jour le mot de passe de la base de données** :
- Définit `ZM_DB_PASS=password` dans `/etc/zm/zm.conf`
- Utilise lineinfile pour des mises à jour idempotentes

### 5. Configurer Apache

**Déployer la configuration Apache ZoneMinder** :
- Template : `zoneminder.conf.j2`
- Emplacement : `/etc/apache2/conf-available/zoneminder.conf`
- Active l'application web ZoneMinder avec HTTPS et son API

**Activer la configuration** :
- Active la configuration apache `zoneminder`

**Activer les modules Apache** :
- `cgi` : pour les scripts CGI de ZoneMinder
- `rewrite` : pour la réécriture d'URL
- `ssl` : pour le support HTTPS

**Déployer les virtualhosts** :
- HTTP : `000-default.conf` (port 80)
- HTTPS : `default-ssl.conf` (port 443)
- La configuration HTTP contient uniquement un redirection vers HTTPS

**Activer les sites** :
- Active `000-default.conf`
- Active `default-ssl.conf`

### 6. Démarrer les services

**Apache** :
- Démarre le service
- Active le service au démarrage du serveur
- Recharge lors des changements de configuration

**ZoneMinder** :
- Démarre le service
- Active le service au démarrage du serveur
- Redémarre lors des changements de configuration

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `zoneminder_install_db_name` | Nom de la base de données MariaDB |
| `zoneminder_install_db_user` | Nom d'utilisateur de la base de données |
| `zoneminder_install_db_password` | Mot de passe de la base de données (depuis le vault) |
| `zoneminder_install_db_host` | Hôte de la base de données |
| `zoneminder_install_ssl_cert_file` | Chemin du certificat SSL |
| `zoneminder_install_ssl_key_file` | Chemin de la clé privée SSL |
| `zoneminder_install_config_file` | Fichier de configuration ZoneMinder |

## Notes

- Le mot de passe de la base de données est stocké dans Ansible Vault
- Les fichiers de certificat SSL doivent exister avant l'exécution du rôle (déployer via `deploy_ssl_certificates`)
- Après l'installation, ajouter les caméras en utilisant le rôle `zoneminder_monitors`
