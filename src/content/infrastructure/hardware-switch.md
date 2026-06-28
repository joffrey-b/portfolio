---
name: "Switch"
type: "hardware"
subtitle: "Zyxel GS1900-24E"
description: "Managed switch handling all traffic. Configured for handling VLAN tagged and untagged traffic."
order: 5
specs: ["24-port managed Gigabit", "VLAN-aware (802.1Q)"]
screenshots: []
relatedRoles: []
---

A 24-port managed Gigabit switch that carries every wired connection in the homelab. It's configured for 802.1Q VLAN tagging, trunking the 8 VLANs to the OPNsense firewall while presenting untagged access ports to devices that don't need to be VLAN-aware themselves.

Configuration here is handled through the switch's own web UI rather than Ansible. It's touched rarely enough (port/VLAN assignment doesn't change often) that automating it hasn't been worth the effort relative to the rest of the stack.
