---
title: "Déploiement des Certificats SSL"
category: "System Management"
description: "Ce rôle déploie des certificats SSL/TLS et des clés privées depuis des variables chiffrées par Ansible Vault vers les systèmes cibles."
tags: ["Apache", "Debian", "HTTPS", "JSON", "Nginx"]
---

## Vue d'ensemble

Ce rôle déploie des certificats SSL/TLS et des clés privées depuis des variables chiffrées par Ansible Vault vers les systèmes cibles. Il prend en charge les systèmes RedHat et Debian avec des chemins et permissions spécifiques à chaque OS, gère plusieurs formats de certificats (PEM, JKS), inclut des certificats CA optionnels et offre une intégration spéciale avec Proxmox VE via son API REST pour enregistrer les certificats et redémarrer automatiquement les services.

## Ce que fait ce rôle

### Pour les systèmes RedHat

1. **Vérifie la famille d'OS** (ansible_facts['os_family'] == 'RedHat')
2. **Déploie les fichiers de certificats** vers `/etc/pki/tls/certs/` avec le mode 0644
3. **Déploie les fichiers de clés privées** vers `/etc/pki/tls/private/` avec le mode 0640
4. **Déploie les certificats CA** (si configuré) avec le mode 0644
5. **Déploie les keystores JKS** (si configuré) avec décodage base64
6. **Définit la propriété et les permissions** telles que spécifiées

### Pour les systèmes Debian

1. **Vérifie la famille d'OS** (ansible_facts['os_family'] == 'Debian')
2. **Déploie les fichiers de certificats** vers `/etc/ssl/certs/` avec le mode 0644
3. **Déploie les fichiers de clés privées** vers `/etc/ssl/private/` avec le groupe ssl-cert, mode 0640
4. **Déploie les certificats CA** (si configuré) avec le mode 0644
5. **Déploie les keystores JKS** (si configuré) avec décodage base64
6. **Définit la propriété et les permissions** telles que spécifiées

### Pour Proxmox VE (étapes supplémentaires)

1. **Obtient un ticket d'authentification API** via les identifiants root@pam
2. **Lit le certificat déployé** depuis le système de fichiers via slurp
3. **Lit la clé privée déployée** depuis le système de fichiers via slurp
4. **Envoie vers l'API Proxmox** à `/api2/json/nodes/{hostname}/certificates/custom`
5. **Force le remplacement du certificat** (force: 1)
6. **Redémarre automatiquement les services** (restart: 1)
7. **Utilise le token CSRF** pour la sécurité de l'API

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `deploy_ssl_certificates_list` | Liste des configurations de certificats à déployer |
| `deploy_ssl_certificates_redhat_cert_dir` | Répertoire des certificats RedHat |
| `deploy_ssl_certificates_redhat_key_dir` | Répertoire des clés privées RedHat |
| `deploy_ssl_certificates_debian_cert_dir` | Répertoire des certificats Debian |
| `deploy_ssl_certificates_debian_key_dir` | Répertoire des clés privées Debian |

**Champs de définition du certificat :**

| Champ | Description |
|-------|----------|-------------|
| `cert_content` | Contenu du certificat PEM (depuis le vault) |
| `cert_path` | Chemin de destination |
| `key_content` | Contenu de la clé privée PEM (depuis le vault) |
| `key_path` | Chemin de destination |
| `ca_content` | Contenu du certificat CA |
| `ca_path` | Chemin de destination du certificat CA |
| `jks_content` | Keystore JKS encodé en Base64 (depuis le vault) |
| `jks_path` | Chemin de destination du keystore JKS |
| `cert_owner/group/mode` | Propriété/permissions du certificat (défaut : root:root 0644) |
| `key_owner/group/mode` | Propriété/permissions de la clé (défaut : root:ssl-cert 0640) |

## Notes

- Le contenu des certificats est stocké dans Ansible Vault sous forme de chaînes multi-lignes
- Les chemins et permissions spécifiques à l'OS sont appliqués automatiquement selon l'OS cible
- Le support JKS nécessite que Java soit installé sur le système cible
- L'intégration Proxmox enregistre les certificats via l'API Proxmox et redémarre les services
