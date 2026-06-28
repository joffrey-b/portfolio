---
title: "Client NTP"
category: "System Management"
description: "Ce rôle installe et configure Chrony en tant que client NTP (Network Time Protocol) pour une synchronisation horaire précise."
tags: ["Chrony", "Debian", "NTP", "OPNsense", "RedHat"]
---

## Vue d'ensemble

Ce rôle installe et configure Chrony en tant que client NTP (Network Time Protocol) pour une synchronisation horaire précise. Il installe le paquet chrony, le configure pour se synchroniser avec le pare-feu OPNsense en tant que serveur NTP local, active la synchronisation RTC (Real-Time Clock), configure le stepping d'horloge pour les grands décalages temporels, et s'assure que le service chronyd est activé et démarré.

## Ce que fait ce rôle

1. **Installe le paquet chrony**
   - Nom du paquet : `chrony`
   - Inclut le daemon chronyd et l'outil client chronyc

2. **Déploie chrony.conf** depuis un template :
   - Définit le serveur NTP sur l'IP OPNsense (VLAN10)
   - Configure l'emplacement du fichier de drift
   - Active la synchronisation RTC
   - Définit les paramètres makestep
   - Configure le répertoire de logs
   - Définit le port à 0 (client uniquement)

3. **Crée une sauvegarde** de la configuration existante (si elle existe)

4. **Redémarre le service chronyd** (via handler) :
   - Applique la nouvelle configuration
   - S'assure que le service est activé (démarre au démarrage)

## Variables du rôle

| Variable | Description |
|----------|-------------|
| `ntp_client_chrony_package` | Nom du paquet à installer |
| `ntp_client_driftfile` | Emplacement du fichier de drift |
| `ntp_client_drift_seconds` | Intervalle de mesure du drift |
| `ntp_client_drift_limit` | Drift maximum avant stepping |
| `ntp_client_port` | Port d'écoute NTP (0 = client uniquement) |
| `ntp_client_log_path` | Répertoire de logs |
| `ntp_client_config_path` | Chemin du répertoire de configuration |
| `ntp_client_config_file_name` | Nom du fichier de configuration |

## Notes

- Fonctionne en mode client uniquement (`port 0`), ne sert pas le NTP aux autres hôtes
- Synchronisation RTC activée, met à jour l'horloge matérielle
- La configuration est sauvegardée avant les modifications ; le service est redémarré via un handler
