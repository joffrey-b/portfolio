---
name: "WiFi Access Point"
type: "hardware"
subtitle: "Zyxel NWA50AX"
description: "Access point serving separate SSIDs for trusted devices, guest WiFi, and CCTV, each tagged to their respective isolated VLAN."
order: 6
specs: ["WiFi 6 (802.11ax)", "Multi-SSID with VLAN tagging"]
screenshots: []
relatedRoles: []
---

A WiFi 6 access point broadcasting three separate SSIDs, trusted devices, guest WiFi, and CCTV, each tagged to its own isolated VLAN at the radio level. A guest connecting to the guest SSID never touches the same broadcast domain as a trusted laptop or an IP camera, regardless of physical proximity.

Like the switch, this is configured through its own web UI; the main day-to-day value it provides is consistent, isolated wireless access without needing a separate physical AP per network segment.
