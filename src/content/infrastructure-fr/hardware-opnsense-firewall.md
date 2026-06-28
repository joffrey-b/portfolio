---
name: "Pare-feu OPNsense"
type: "hardware"
subtitle: "Ordinateur Asus"
description: "Cœur du réseau. Gère tout le routage inter-VLAN, les règles de pare-feu, Kea DHCP, Unbound DNS et le VPN WireGuard. Entièrement géré via l'API REST avec Ansible."
order: 1
specs: ["Intel Core i5-4570S @ 2,90 GHz", "16 Go DDR3 RAM", "SSD 128 Go", "2× Intel I350-T4 (WAN + par VLAN)"]
screenshots: []
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings", "deploy_network_configuration"]
---

Cet ordinateur de bureau Asus reconverti est le cœur du réseau du homelab. Sous OPNsense, sur un matériel modeste mais fiable, un i5-4570S quad-core, 16 Go de RAM et un SSD de 128 Go, il assure le routage inter-VLAN complet sur 8 réseaux segmentés, l'application des règles de pare-feu, Kea DHCP, Unbound DNS et un point d'accès VPN WireGuard pour l'accès distant.

Deux cartes réseau Intel I350-T4 à quatre ports (8 ports physiques au total) sont réparties entre la liaison WAN et un port physique dédié par VLAN, gardant les domaines de diffusion physiquement isolés plutôt que de s'appuyer uniquement sur le tagging 802.1Q sur un seul lien.

Voir [OPNsense](/fr/infrastructure/service-opnsense) dans les applications auto-hébergées pour en savoir plus sur le logiciel qui tourne ici.
