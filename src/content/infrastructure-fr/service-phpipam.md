---
name: "phpIPAM"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Gestion d'adresses IP"
description: "Suit l'allocation des adresses IP et l'usage des sous-réseaux sur chaque VLAN, synchronisé avec Ansible."
order: 22
icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
screenshots:
  - caption: "Vue d'ensemble des sous-réseaux phpIPAM"
    image: "./images/phpipam_subnets.png"
  - caption: "Détails du sous-réseau"
    image: "./images/phpipam_subnet_detail.png"
openSource: true
relatedRoles: ["phpipam_configuration"]
---

phpIPAM suit l'allocation des adresses IP et l'usage des sous-réseaux sur chaque VLAN du homelab, la source de vérité pour savoir quelle adresse appartient à quel hôte avant même qu'elle soit assignée, et l'endroit où vérifier ce qui est disponible pour une nouvelle machine ou une machine de test. Au-delà des adresses IP, il suit aussi les noms d'hôtes, les plages DHCP, les routeurs, les switches et d'autres appareils.

Sa configuration, sections, VLANs, sous-réseaux, types d'appareils, et appareils individuels avec leurs adresses par interface, est déployée via l'API REST de phpIPAM grâce au rôle `phpipam_configuration`, en s'authentifiant avec un jeton API propre à l'application plutôt qu'une connexion utilisateur. Les données elles-mêmes vivent dans trois fichiers de variables séparés (VLANs, types d'appareils, appareils) plutôt que dans le code du rôle, si bien qu'ajouter un nouvel hôte à l'IPAM est un changement de données, pas un changement de rôle. C'est additif plutôt que pleinement déclaratif cependant : les entrées existantes sont retrouvées par leur nom puis laissées telles quelles, donc une valeur modifiée à la main dans l'interface ne sera pas silencieusement écrasée, mais elle ne sera pas non plus corrigée automatiquement.
