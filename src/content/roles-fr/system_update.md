---
title: "Mise à jour système"
category: "System Management"
description: "Ce rôle orchestre les mises à jour système complètes sur une infrastructure hétérogène incluant les systèmes Debian, RedHat et OPNsense, avec une gestion intelligente des redémarrages et une intégration à la supervision Centreon."
tags: ["Centreon", "Debian", "Docker", "HTTPS", "MariaDB"]
---

## Vue d'ensemble

Ce rôle orchestre des mises à jour système complètes sur une infrastructure hétérogène incluant les systèmes Debian, RedHat et OPNsense, avec une gestion intelligente des redémarrages et une intégration à la supervision Centreon. Il effectue les mises à jour spécifiques à chaque OS, détecte les mises à jour de noyau nécessitant un redémarrage, planifie des plages de maintenance Centreon pour éviter les fausses alertes, redémarre automatiquement les systèmes si nécessaire, et fournit des résumés informatifs. Le rôle gère des cas particuliers comme les mises à jour de Proxmox affectant les VMs, les mises à jour du daemon Docker nécessitant le redémarrage des conteneurs, et les exclusions de paquets spécifiques à Centreon. Ce rôle prend en compte un flag permettant d'activer ou désactiver le redémarrage automatique des machines. Ceci est utile pour ne pas redémarrer automatiquement des machines critiques telles que Proxmox ou OPNsense par exemple.

## Ce que fait ce rôle

**Orchestration complète des mises à jour** :

1. **Détection OS** : Identifie le type de système (Debian/RedHat/OPNsense)
2. **Mises à jour des paquets** : Applique toutes les mises à jour disponibles
3. **Détection de noyau** : Identifie si le noyau a été mis à jour
4. **Planification des plages de maintenance** : Programme des fenêtres de maintenance Centreon
5. **Redémarrages automatiques** : Redémarre les systèmes lorsque le noyau est mis à jour selon la condition de redémarrage automatique
6. **Rapport de statut** : Fournit des résumés clairs des mises à jour, et informe si un redémarrage manuel est requis

**Gestion spéciale** :
- **Proxmox** : Planifie des plages de maintenance pour les VMs lorsque le noyau de l'hôte est mis à jour
- **Docker** : Gère séparément les mises à jour du daemon Docker et des conteneurs
- **Centreon** : Exclut les paquets MySQL des serveurs Centreon (problème de conflit avec le paquet SQL de Centreon)
- **OPNsense** : Utilise l'API pour vérifier les mises à jour firmware, et appliquer les mises à jour ne nécessitant pas de redémarrage

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `system_update_auto_reboot_enabled` | Activer les redémarrages automatiques |
| `system_update_reboot_timeout` | Timeout de redémarrage (secondes) |
| `system_update_reboot_message` | Message de redémarrage |
| `system_update_centreon_excluded_packages` | Paquets exclus des mises à jour sur les serveurs Centreon |
| `system_update_downtime_duration_minutes` | Durée de la plage de maintenance Centreon |
| `system_update_docker_prune_on_update` | Nettoyer Docker après les mises à jour |
| `system_update_opnsense_api_timeout` | Timeout des appels API firmware OPNsense (secondes) |
| `system_update_opnsense_validate_certs` | Valider les certificats SSL pour l'API OPNsense |
| `system_update_apt_cache_valid_time` | Validité du cache apt (secondes) |
| `system_update_apt_autoremove` | Supprimer les paquets inutilisés (Debian) |
| `system_update_apt_autoclean` | Nettoyer le cache apt (Debian) |

## Notes

- Le redémarrage automatique est désactivé par défaut — à activer par hôte dans `host_vars` si souhaité
- Les mises à jour d'hôtes Proxmox planifient des plages de maintenance Centreon pour toutes les VMs hébergées avant le redémarrage
- Les hôtes Docker nettoient automatiquement les anciennes images pour gagner de l'espace disque
- Les mises à jour OPNsense utilisent l'API firmware (pas le gestionnaire de paquets)
