---
title: "Postfix"
category: "System Management"
description: "Ce rôle installe et configure Postfix comme relais SMTP pour l'envoi d'emails système via un serveur de messagerie externe."
tags: ["Centreon", "DNS", "Debian", "Postfix", "SMTP"]
---

## Vue d'ensemble

Ce rôle installe et configure Postfix comme relais SMTP pour l'envoi d'emails système via un serveur de messagerie externe. Il configure l'authentification SASL, le chiffrement TLS, la réécriture des en-têtes pour un affichage correct du nom de l'expéditeur, et paramètre le fichier de configuration principal de Postfix. Ce rôle est conçu pour les systèmes devant envoyer des emails de notification (comme les alertes Centreon) via un hôte relais tel que Gmail, Office 365 ou un serveur SMTP dédié.

## Ce que fait ce rôle

1. **Installer les paquets** :
   - `postfix` : serveur/relais SMTP
   - `postfix-pcre` : support des expressions régulières Perl (réécriture d'en-têtes)
   - `s-nail` : utilitaire de commande mail
   - `cyrus-sasl-plain` : authentification SASL PLAIN

2. **Configurer le mot de passe SASL** :
   - Crée `sasl_passwd` avec les identifiants du relais
   - Format : `[relais:port] utilisateur:motdepasse`
   - Définit les permissions : `0600` (root uniquement)
   - Exécute `postmap` pour créer la base de données hash

3. **Configurer les vérifications d'en-têtes** :
   - Crée `smtp_header_checks` pour la réécriture du champ From
   - Réécrit les emails de centreon-engine avec le nom d'affichage Centreon Alerts
   - Utilise la correspondance par regex PCRE

4. **Configurer main.cf** :
   - Définit l'hôte et le port du relais
   - Active TLS et l'authentification SASL
   - Référence les maps de mots de passe et les vérifications d'en-têtes
   - Renseigne le hostname du système

5. **Redémarrer Postfix** :
   - Redémarre le service pour appliquer les changements
   - Active Postfix au démarrage

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `postfix_config_path` | Chemin du répertoire de configuration Postfix |
| `postfix_config_file` | Nom du fichier de configuration principal |
| `postfix_password_maps_file` | Nom du fichier de maps de mots de passe SASL |
| `postfix_smtp_header_checks_file` | Nom du fichier de vérifications d'en-têtes SMTP |
| `postfix_smtp_host` | Hostname du relais SMTP |
| `postfix_smtp_port` | Port du relais SMTP |
| `postfix_sender_email` | Adresse email de l'expéditeur |
| `postfix_sender_password` | Mot de passe d'authentification SMTP (depuis le vault) |
| `postfix_myhostname` | Hostname du système pour le mail |
| `postfix_sender_display_name` | Nom d'affichage dans le champ From |
| `postfix_relayhost` | Hôte relais au format Postfix (construit automatiquement depuis `postfix_smtp_host` et `postfix_smtp_port`) |
| `postfix_smtp_use_tls` | Activer le chiffrement TLS |
| `postfix_smtp_sasl_auth_enable` | Activer l'authentification SASL |
| `postfix_smtp_sasl_security_options` | Options de sécurité SASL |
| `postfix_smtp_sasl_tls_security_options` | Options de sécurité SASL TLS |

## Notes

- Gmail requiert un mot de passe d'application (pas le mot de passe du compte) lorsque la 2FA est activée
- Le mot de passe de l'expéditeur est stocké dans Ansible Vault, jamais en clair
- Utiliser le port `587` avec TLS (STARTTLS) pour Gmail. Le port `465` utilise SSL implicite
