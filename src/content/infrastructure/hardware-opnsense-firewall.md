---
name: "OPNsense Firewall"
type: "hardware"
subtitle: "Asus Desktop"
description: "Core of the network. Handles all inter-VLAN routing, firewall rules, Kea DHCP, Unbound DNS, and WireGuard VPN. Fully managed via REST API with Ansible."
order: 1
specs: ["Intel Core i5-4570S @ 2.90GHz", "16GB DDR3 RAM", "128GB SSD", "2× Intel I350-T4 (WAN + per-VLAN)"]
screenshots: []
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings", "deploy_network_configuration"]
---

This repurposed Asus desktop is the heart of the homelab network. Running OPNsense on modest but reliable hardware, a quad-core i5-4570S, 16GB of RAM, and a 128GB SSD, it handles full inter-VLAN routing across 8 segmented networks, firewall enforcement, Kea DHCP, Unbound DNS, and a WireGuard VPN endpoint for remote access.

Two Intel I350-T4 quad-port NICs (8 physical ports total) are split between the WAN uplink and one dedicated physical port per VLAN, keeping broadcast domains physically isolated rather than relying purely on 802.1Q tagging on a single trunk.

See [OPNsense](/infrastructure/service-opnsense) in Self-Hosted Applications for more on the software running here.
