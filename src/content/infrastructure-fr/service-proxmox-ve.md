---
name: "Proxmox VE"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Logiciel d'hyperviseur"
description: "Plateforme de virtualisation KVM/LXC open-source hébergeant la majorité du homelab sous forme de VMs."
order: 26
icon: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
screenshots:
  - caption: "Résumé Proxmox VE"
    image: "./images/proxmox_ve_summary.png"
  - caption: "Vue datacenter"
    image: "./images/proxmox_ve_datacenter_view.png"
openSource: true
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

Proxmox VE est la plateforme de virtualisation open-source tournant sur le HP Z440, fournissant l'hyperviseur KVM/LXC sous-jacent à presque tous les autres services du homelab. Son interface web gère le cycle de vie des VMs et conteneurs, le stockage, le réseau et les sauvegardes en un seul endroit.

Contrairement à OPNsense, Proxmox lui-même n'est pas piloté via un rôle Ansible dédié. Les VMs sont provisionnées et gérées en grande partie à la main via son interface, tandis que les invités Linux tournant dans ces VMs sont ce qu'Ansible configure réellement. La maintenance au niveau de l'hôte, mises à jour, redémarrages, est tout de même automatisée via `system_update`, comme n'importe quel autre hôte Linux.

Avec OPNsense, c'est la machine la plus critique du homelab : elle héberge chaque VM faisant tourner les services utilisés au quotidien, toute la journée. Elle tourne actuellement sur un SSD grand public, qui sature facilement lorsque plusieurs tâches lourdes tournent en parallèle ; un SSD de classe datacenter est prévu pour la remplacer pour cette raison.

Voici un résumé rapide de chaque VM et de son rôle :

- **Serveur Grafana** : héberge la stack TIG, Telegraf, InfluxDB et Grafana. Il reçoit les données des agents Telegraf installés sur chaque autre machine, y compris les machines Windows ; la seule exception est le NAS Synology, qui expose ses données via SNMP et est interrogé par Telegraf plutôt que de faire tourner un agent lui-même.
- **Serveur Frigate** : un serveur NVR (Network Video Recorder) dédié avec un stockage chiffré. Il permet de visionner les images des caméras en direct, et conserve 10 jours d'images passées.
- **Serveur Docker** : héberge tous les conteneurs, faisant tourner la plupart des services auto-hébergés : le serveur de musique, les statistiques d'écoute, les bases de données, le gestionnaire de mots de passe, GitLab, et plus encore. La liste complète se trouve dans les applications auto-hébergées ci-dessous.
- **OpenMediaVault** : héberge le NAS de sauvegarde OMV, avec un disque chiffré de 6 To attaché exposant quelques dossiers partagés en tant que partages SMB.
- **Serveur Centreon** : le serveur de supervision. Chaque hôte est surveillé via SNMP, certains étant aussi interrogés via NRPE pour des scripts devant s'exécuter directement sur la machine distante. Il envoie des alertes par e-mail quand quelque chose va mal, selon des seuils configurés pour les hôtes et services ; certains services produisent aussi des graphiques, même si Grafana reste préféré pour cela.
- **Windows 11** : une VM de jeu avec le GPU passé en passthrough via la technologie GPU passthrough de Proxmox, connectée à la télévision pour regarder du contenu et jouer comme si un véritable PC y était branché. Elle héberge aussi un runner GitLab pour les jobs du conteneur GitLab nécessitant un environnement Windows.
- **Serveur de test RedHat** : utilisé pour tester de nouveaux logiciels avant de décider de les intégrer aux serveurs réels, et pour construire des mocks pour des scripts potentiellement destructeurs. Un snapshot propre, sans rien installé, est restauré juste après chaque campagne de test.
- **Linux Mint** : tourne avec une interface Cinnamon, utile pour tout travail Linux nécessitant une interface graphique. Cette machine héberge tout le code des rôles Ansible et fait office de contrôleur Ansible, via un environnement virtuel Python ; c'est aussi le poste de développement principal pour Sonixd Redux et d'autres projets personnels sur GitHub.
- **Serveur Graylog** : héberge le processus Graylog principal et sa base MongoDB, là où vit la configuration de Graylog, et contrôle les nœuds ; dans cette configuration, il y a un nœud séparé qui reçoit et stocke tous les logs.
- **Nœud de données Graylog** : là où tous les logs sont réellement stockés, contrôlé par la VM Graylog principale ci-dessus. Les logs arrivent sur un disque dur dédié monté au démarrage.
- **Serveur de test Debian** : remplit le même rôle que le serveur de test RedHat, mais sous Debian, pour s'assurer que tout fonctionne sur les deux OS puisque les deux tournent en production.

Un jour, j'utiliserai peut-être Terraform pour provisionner Proxmox. Pour l'instant, si je dois tout reconstruire, je sais que je peux compter sur mes sauvegardes quotidiennes pour réimporter les VMs.
