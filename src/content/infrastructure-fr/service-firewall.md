---
name: "Pare-feu"
type: "service"
subtitle: "OPNsense"
description: "Pare-feu BSD avec gestion via API REST, routage multi-VLAN, Kea DHCP, Unbound DNS et automatisation des règles de pare-feu."
order: 3
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
screenshots: []
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings", "deploy_network_configuration"]
---

OPNsense est le point de contrôle unique pour tout ce qui traverse une frontière de VLAN dans le homelab, tout le trafic inter-VLAN est refusé par défaut sauf ce qui est explicitement autorisé.

Voir [OPNsense](/fr/infrastructure/service-opnsense) dans les applications auto-hébergées pour plus de détails.
