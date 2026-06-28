---
name: "phpIPAM"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "IP Address Management"
description: "Tracks IP address allocation and subnet usage across every VLAN, kept in sync with Ansible."
order: 22
icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
screenshots:
  - caption: "phpIPAM subnet overview"
    image: "./images/phpipam_subnets.png"
  - caption: "Subnet details"
    image: "./images/phpipam_subnet_detail.png"
relatedRoles: ["phpipam_configuration"]
---

phpIPAM tracks IP address allocation and subnet usage across every VLAN in the homelab, the source of truth for which address belongs to which host before it's ever assigned.

Its configuration, subnets, VLANs, and address reservations, is deployed and kept in sync via the `phpipam_configuration` role rather than entered by hand through the web UI.
