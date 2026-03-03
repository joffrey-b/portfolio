---
title: "Création de datasource Grafana"
category: "Monitoring & Metrics"
description: "Ce rôle crée des datasources InfluxDB dans Grafana via l'API."
tags: ["DNS", "Grafana", "HTTPS", "InfluxDB", "JSON"]
---

## Vue d'ensemble

Ce rôle crée des datasources InfluxDB dans Grafana via l'API HTTP Grafana. Il s'authentifie avec un token API, configure les datasources avec le support du langage de requête InfluxQL, et implémente une création idempotente qui gère sans erreur les datasources déjà existantes.

## Ce que fait ce rôle

1. **Envoie une requête POST** à l'API Grafana (`/api/datasources`)
2. **S'authentifie** avec un token Bearer (clé API)
3. **Configure la datasource** avec les paramètres suivants :
   - Type : `influxdb`
   - Mode d'accès : `proxy` (requêtes proxiées via le backend Grafana)
   - URL : adresse du serveur InfluxDB
   - Nom de la base de données
   - Identifiants d'authentification
   - Langage de requête : `InfluxQL`
   - Méthode HTTP : `GET`
4. **Gère les datasources existantes** sans erreur (statut 409 = déjà existante)
5. **Répète pour chaque datasource** de la liste

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_grafana_ansibleuser_api_token` | Token API Grafana pour l'authentification (depuis le vault) |
| `grafana_datasource_create_datasources` | Liste des configurations de datasources |
| `grafana_datasource_create_host` | Hôte:port du serveur Grafana |
| `grafana_datasource_create_port` | Port HTTP Grafana |
| `grafana_datasource_create_validate_certs` | Valider les certificats SSL |

**Champs de définition de la datasource :**

| Champ | Description |
|-------|----------|-------------|
| `name` | Nom d'affichage dans l'interface Grafana |
| `uid` | Identifiant unique pour les références aux tableaux de bord |
| `url` | URL de l'API HTTP InfluxDB |
| `database` | Nom de la base de données InfluxDB |
| `user` | Nom d'utilisateur InfluxDB |
| `password` | Mot de passe InfluxDB (depuis le vault) |
| `is_default` | Définir cette source comme datasource par défaut |

## Notes

- Utilise l'authentification par token Bearer (pas d'authentification basique)
- Supporte actuellement les datasources InfluxDB avec le langage de requête InfluxQL
- Exécuter les rôles `grafana_install` et `influxdb` avant ce rôle
