---
title: "Installation du data node Graylog"
category: "Monitoring & Metrics"
description: "Ce rôle installe et configure le data node Graylog (OpenSearch), incluant la configuration complète du disque, l'installation des paquets et la configuration."
tags: ["Graylog", "OpenSearch", "Java"]
---

## Vue d'ensemble

Installe et configure le data node Graylog (OpenSearch) sur un hôte dédié. Gère la configuration complète du disque (partition, formatage XFS, montage) ainsi que l'installation des paquets et la configuration. Toutes les opérations disque sont idempotentes — un disque déjà formaté ne sera pas reformaté, préservant les données existantes lors des reconstructions.

## Ce que fait ce rôle

1. **Partitionne et formate le disque de données** en XFS (ignoré si déjà formaté — les données existantes sont préservées)
2. **Monte le disque** au chemin de données configuré et l'ajoute au fstab
3. **Ajoute le dépôt Graylog** et installe `graylog-datanode`
4. **Configure `datanode.conf`** avec le secret partagé, l'URI MongoDB, le chemin des données et la taille du heap (calculée automatiquement depuis la RAM disponible)
5. **Définit `vm.max_map_count=262144`** de façon permanente via sysctl (requis par OpenSearch)
6. **Active et démarre** le service `graylog-datanode`

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `vault_graylog_password_secret` | Secret partagé — doit être identique au nœud Graylog principal (depuis le vault) |
| `graylog_datanode_install_version` | Version de Graylog à installer |
| `graylog_datanode_install_disk_device` | Périphérique disque pour les données OpenSearch |
| `graylog_datanode_install_opensearch_data_location` | Point de montage et chemin des données OpenSearch |
| `graylog_datanode_install_opensearch_heap` | Taille du heap OpenSearch |
| `graylog_datanode_install_mongodb_uri` | URI de connexion MongoDB |

## Notes

- `graylog-datanode` est automatiquement redémarré si un paramètre de `datanode.conf` change
- `vm.max_map_count=262144` est défini de façon permanente — c'est une exigence stricte d'OpenSearch
- Le data node doit être installé et en cours d'exécution **avant** le nœud Graylog principal
- Après une restauration de MongoDB sur le nœud Graylog principal, le data node se reconnecte automatiquement
- Le heap OpenSearch est calculé automatiquement depuis la RAM disponible (utilise la moitié par défaut) et peut être surchargé par hôte
