---
name: "Firewall"
type: "service"
subtitle: "OPNsense"
description: "BSD-based firewall with REST API management, multi-VLAN routing, Kea DHCP, Unbound DNS, and firewall rules automation."
order: 3
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
screenshots: []
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings", "deploy_network_configuration"]
---

OPNsense is the single point of control for everything that crosses a VLAN boundary in the homelab, all inter-VLAN traffic is denied by default except what's explicitly allowed.

See [OPNsense](/infrastructure/service-opnsense) in Self-Hosted Applications for more details.
