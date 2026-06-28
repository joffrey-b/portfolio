---
title: "Installation de Graylog"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure MongoDB et le serveur Graylog (Open) sur le nœud Graylog principal."
tags: ["Graylog", "MongoDB", "Java", "SSL", "TLS"]
---

## Vue d'ensemble

Installe et configure MongoDB et le serveur Graylog (Open) sur le nœud Graylog principal. Destiné aux nouvelles installations ou aux reconstructions complètes. Après l'exécution de ce rôle, utiliser `graylog_mongodb_restore` pour restaurer la configuration depuis une sauvegarde.

## Ce que fait ce rôle

1. **Ajoute le dépôt yum MongoDB** et installe `mongodb-org` avec versionlock pour prévenir les mises à jour non souhaitées
2. **Configure MongoDB** pour écouter sur localhost et l'interface VLAN server
3. **Installe `graylog-server`** depuis le dépôt officiel Graylog
4. **Configure `server.conf`** avec tous les paramètres requis (HTTP, TLS, journal, URI MongoDB, heap JVM)
5. **Calcule automatiquement le heap JVM** à la moitié de la RAM disponible (limité entre 1g et 16g)
6. **Active et démarre** `mongod` et `graylog-server`

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_graylog_password_secret` | Secret partagé (min 64 caractères), doit correspondre au nœud de données (depuis le vault) |
| `vault_graylog_root_password` | Mot de passe administrateur (haché en sha256 par le rôle) (depuis le vault) |
| `graylog_install_mongodb_version` | Version de MongoDB à installer |
| `graylog_install_version` | Version de Graylog à installer |
| `graylog_install_root_timezone` | Fuseau horaire de l'utilisateur root Graylog |
| `graylog_install_http_bind_address` | Adresse d'écoute HTTP Graylog |
| `graylog_install_http_enable_tls` | Activer HTTPS sur l'interface web |
| `graylog_install_http_tls_cert_file` | Chemin du certificat TLS |
| `graylog_install_http_tls_key_file` | Chemin de la clé privée TLS |
| `graylog_install_message_journal_max_age` | Durée de rétention des messages du journal |
| `graylog_install_message_journal_max_size` | Taille maximale du journal sur disque |
| `graylog_install_mongodb_uri` | URI de connexion MongoDB |
| `graylog_install_mongodb_max_connections` | Nombre maximum de connexions MongoDB |
| `graylog_install_jvm_heap` | Heap JVM pour le serveur Graylog |
| `graylog_install_jvm_truststore` | Truststore JKS pour CA personnalisée |

## Notes

- Le data node (`graylog_datanode_install`) doit être installé et en cours d'exécution **avant** ce rôle
- Le secret partagé doit être identique sur les deux nœuds et est stocké dans Ansible Vault
- Après l'installation, Graylog démarre avec une configuration minimale. Exécuter `graylog_mongodb_restore` pour restaurer la configuration complète
- `graylog-server` est automatiquement redémarré si un paramètre de `server.conf` ou de sysconfig change
- MongoDB écoute sur localhost et l'interface VLAN server. Localhost est requis par un composant interne de Graylog au démarrage
- Le versionlock MongoDB prévient les mises à jour non souhaitées via `dnf update`
- Sur une nouvelle installation, les paramètres optionnels sont ajoutés à la fin de `server.conf` car le fichier par défaut les a commentés. C'est fonctionnellement correct, Graylog lit le fichier complet
- Le heap JVM est calculé automatiquement depuis la RAM disponible (utilise la moitié par défaut) et peut être surchargé par hôte
