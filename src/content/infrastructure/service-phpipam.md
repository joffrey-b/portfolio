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
openSource: true
relatedRoles: ["phpipam_configuration"]
---

phpIPAM tracks IP address allocation and subnet usage across every VLAN in the homelab, the source of truth for which address belongs to which host before it's ever assigned, and the place to check what's free to hand out to a new or test machine. Beyond raw IPs, it also tracks hostnames, DHCP ranges, routers, switches, and other devices.

Its configuration, sections, VLANs, subnets, device types, and individual devices with their per-interface addresses, is deployed via phpIPAM's REST API using the `phpipam_configuration` role, authenticating with an app-specific API token rather than a user login. The data itself lives in three separate vars files (VLANs, device types, devices) rather than in the role's code, so adding a new host to the IPAM is a data change, not a role change. It's additive rather than fully declarative, though: existing entries are matched by name and left alone, so a value changed by hand in the UI won't be silently overwritten, but it also won't be auto-corrected back.
