---
name: "Hyperviseur Proxmox VE"
type: "hardware"
subtitle: "HP Z440"
description: "Serveur principal hébergeant 10+ VMs : stack de supervision, journalisation, services Docker, Frigate, OpenMediaVault, une VM gaming Windows 11 avec passthrough PCI, une VM de dev Linux Mint et des serveurs de test."
order: 2
specs: ["Intel Xeon E5-2698v3 @ 2,30 GHz", "128 Go DDR4 RAM", "SSD PNY 1 To (stockage VMs)", "HDD Seagate 6 To + 3 To", "1× Intel I350-T4"]
screenshots: []
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

Le HP Z440 est la bête de somme du homelab, une station de travail reconvertie en hyperviseur Proxmox VE principal. Son Xeon E5-2698v3 (16 cœurs / 32 threads) et ses 128 Go de DDR4 offrent assez de marge pour faire tourner 10+ VMs simultanément sans contention.

Le stockage est partagé entre un SSD PNY de 1 To pour les disques des VMs (démarrage et IO rapides pour tout ce qui en a besoin) et une paire de disques durs Seagate de 6 To + 3 To pour le stockage volumineux moins sensible à la latence.

Les VMs hébergées couvrent l'ensemble du homelab : la stack de supervision, la stack de journalisation, l'hôte Docker faisant tourner 19+ applications auto-hébergées, le serveur NVR dédié de Frigate, OpenMediaVault pour les sauvegardes secondaires, une VM gaming Windows 11 avec passthrough PCI complet d'un GPU dédié qui fait aussi tourner un runner GitLab CI pour les jobs nécessitant un environnement Windows, une VM Linux Mint qui sert à la fois de contrôleur Ansible et de poste de développement pour Sonixd Redux et d'autres projets personnels, et une paire de serveurs de test RedHat et Debian jetables, réinitialisés depuis un snapshot propre après chaque campagne de test.

Voir les [applications auto-hébergées](/fr/infrastructure#self-hosted-applications) plus bas pour ce que chacune de ces VMs fait tourner réellement.
