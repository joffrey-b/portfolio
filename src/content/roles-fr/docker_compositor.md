---
title: "Docker Compositor"
category: "Docker & Containers"
description: "Ce rôle déploie et gère des stacks Docker Compose avec détection intelligente des changements, initialisation des bases de données et intégration de la supervision."
tags: ["Centreon", "Debian", "Docker", "Grafana", "HTTPS"]
---

## Vue d'ensemble

Ce rôle déploie et gère des stacks Docker Compose avec détection intelligente des changements, initialisation des bases de données et intégration de la supervision. Il crée la structure de répertoires nécessaire, génère le fichier docker-compose.yml depuis des templates, met en œuvre des vérifications d'idempotence pour éviter les redémarrages inutiles, planifie des plages de maintenance Centreon pendant les mises à jour et gère l'initialisation des bases de données pour les conteneurs PostgreSQL et MariaDB/MySQL. Ce rôle créé également un fichier .env pour chaque service qui en a besoin, protégeant ainsi les données sensibles.

## Ce que fait ce rôle

### Étape 1 : Prérequis

1. **Crée le répertoire compose** (ex. `/home/user/docker/compose/`)
2. **Crée les répertoires de volumes** pour tous les services avec la propriété appropriée
3. **Crée le répertoire de configuration Glance** (si le service Glance est présent)
4. **Copie les fichiers de configuration Glance** (glance.yml, home.yml)
5. **Crée les fichiers .env** pour les services avec des variables sensibles (mode 0600)

### Étape 2 : Vérification d'idempotence

1. **Vérifie si le fichier compose actuel existe**
2. **Génère un fichier compose temporaire** depuis le template
3. **Calcule les sommes de contrôle SHA256** des deux fichiers
4. **Compare les sommes de contrôle** pour détecter les modifications
5. **Supprime le fichier temporaire**
6. **Si des modifications sont détectées** :
   - Calcule la fenêtre de maintenance (heure de début + durée)
   - Planifie une plage de maintenance Centreon pour le service "Docker Containers Uptime"
   - Arrête proprement tous les conteneurs

### Étape 3 : Installation/Mise à jour

1. **Déploie docker-compose.yml** depuis le template
2. **Démarre d'abord les conteneurs de bases de données** (postgresql, mariadb)
3. **Attend 15 secondes** pour l'initialisation des bases de données
4. **Initialise les bases de données PostgreSQL** :
   - Vérifie si l'utilisateur existe (idempotent)
   - Crée l'utilisateur si nécessaire
   - Vérifie si la base de données existe (idempotent)
   - Crée la base de données si nécessaire avec le bon propriétaire
5. **Initialise les bases de données MariaDB/MySQL** :
   - Crée la base de données si elle n'existe pas
   - Crée l'utilisateur s'il n'existe pas
   - Attribue les privilèges
   - Applique les privilèges
6. **Démarre tous les services** avec Docker Compose V2 :
   - Nom du projet : `docker_compose_stack_name`
   - Suppression des orphelins : true (nettoyage des anciens services)
   - Recréation : auto (uniquement si modification)
   - Pull : missing (télécharge les images si absentes)
   - Dépendances : true (respecte les depends_on)
   - Attente : true (attend les health checks)
   - Délai d'attente : 600 secondes (10 minutes)

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `docker_compose_directory` | Répertoire contenant docker-compose.yml |
| `docker_data_path` | Chemin de base pour les volumes de données des conteneurs |
| `docker_user` | Utilisateur propriétaire des fichiers et volumes Docker |
| `docker_compose_file` | Nom du fichier compose |
| `docker_compose_stack_name` | Nom du projet Docker Compose |
| `docker_compositor_definition` | Structure complète de définition des services |
| `docker_compositor_postgres_databases` | Liste des bases de données PostgreSQL à créer |
| `docker_compositor_mysql_databases` | Liste des bases de données MariaDB/MySQL à créer |
| `docker_compositor_downtime_duration_minutes` | Durée de la plage de maintenance Centreon (minutes) |

**Structure de définition de la stack :**

```yaml
docker_compositor_definition:
  state: present  # present, stopped, or absent

  services:
    - name: service_name
      image: docker/image:tag
      container_name: container_name
      restart_policy: unless-stopped
      volumes:
        - folder_path_on_host: "{{ docker_data_path }}/app/data"
          folder_path_in_container: /data
          owner: "{{ docker_user }}"
          group: "{{ docker_user }}"
          mode: '0755'
      environment:
        PUBLIC_VAR: "value"
      sensitive_env_vars:
        SECRET_KEY: "{{ vault_secret }}"
      ports:
        - "8080:80"
      networks:
        - app_network
```

## Notes

- Les conteneurs ne sont redémarrés que lorsque le fichier compose change réellement (idempotent)
- Les variables d'environnement sensibles sont stockées dans des fichiers `.env`, pas dans le fichier compose
- L'initialisation des bases de données ne s'exécute qu'au premier déploiement (lorsque les conteneurs sont nouveaux)
- Le rôle planifie une plage de maintenance Centreon avant de redémarrer les conteneurs
