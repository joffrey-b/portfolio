---
name: "OPNsense"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "OS Pare-feu"
description: "Plateforme de pare-feu et de routage open-source basée sur FreeBSD, le logiciel le plus automatisé du homelab."
order: 21
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
screenshots:
  - caption: "Tableau de bord OPNsense"
    image: "./images/opnsense_dashboard.png"
openSource: true
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_dashboard", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings"]
---

OPNsense est une distribution de pare-feu open-source basée sur FreeBSD, le logiciel le plus automatisé du homelab : presque toute surface de configuration, règles de pare-feu, alias, NAT, DHCP, DNS, confiance des certificats, mises à jour du firmware, est gérée via son API REST plutôt que via sa propre interface web.

Il se trouve directement derrière le routeur du FAI sur le port WAN, avec un port physique dédié par VLAN plutôt qu'un seul trunk, si bien que deux VLANs peuvent chacun pousser un débit gigabit complet en même temps sans se gêner, par exemple un poste de travail qui récupère une sauvegarde depuis le NAS pendant que tout le reste continue à fonctionner normalement. Chaque interface a ses propres règles de pare-feu strictes, entièrement journalisées. OPNsense gère aussi le DHCP, la résolution DNS via Unbound, le NAT source et destination, et détient la CA interne qui signe tous les certificats serveur du homelab.

Un VPN WireGuard avec deux clients, téléphone et ordinateur portable, est le seul service autorisé à recevoir du trafic sur l'interface WAN. Comme rien d'autre n'est exposé à internet, se connecter au VPN est nécessaire pour atteindre n'importe quel service auto-hébergé depuis l'extérieur du domicile.

Cette conception API-first est ce qui permet de traiter la configuration du pare-feu en production comme du code. Une douzaine de rôles Ansible dédiés couvrent tout, des règles de pare-feu de base aux réservations Kea DHCP et surcharges Unbound DNS, si bien qu'une nouvelle installation OPNsense peut être ramenée exactement au même état que la production depuis le seul dépôt Ansible.
