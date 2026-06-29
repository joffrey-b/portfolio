---
name: "OPNsense"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Firewall OS"
description: "Open-source, FreeBSD-based firewall and routing platform, the most heavily automated piece of software in the homelab."
order: 21
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
screenshots:
  - caption: "OPNsense dashboard"
    image: "./images/opnsense_dashboard.png"
openSource: true
relatedRoles: ["opnsense_firewall", "opnsense_aliases", "opnsense_dashboard", "opnsense_kea_dhcp_settings", "opnsense_unbound_settings"]
---

OPNsense is an open-source, FreeBSD-based firewall distribution, the most heavily automated single piece of software in the homelab: nearly every configuration surface, firewall rules, aliases, NAT, DHCP, DNS, certificate trust, firmware updates, is managed through its REST API rather than its own web UI.

It sits directly behind the ISP router on the WAN port, with one dedicated physical port per VLAN rather than a single trunk, so any two VLANs can each push full gigabit throughput at once without clogging each other, for example a desktop pulling a backup from the NAS while everything else keeps moving normally. Every interface has its own strict, fully logged firewall rules. OPNsense also runs DHCP, DNS resolution through Unbound, source and destination NAT, and holds the internal CA that signs every server certificate in the homelab.

A WireGuard VPN with two clients, phone and laptop, is the only service allowed to receive traffic on the WAN interface. Since nothing else is exposed to the internet, connecting to the VPN is required to reach any self-hosted service from outside the home network.

That API-first design is what makes it possible to treat the live firewall configuration as code. A dozen-plus dedicated Ansible roles cover everything from basic firewall rules to Kea DHCP reservations and Unbound DNS overrides, so a fresh OPNsense install can be brought to the exact same state as production from the Ansible repository alone.
