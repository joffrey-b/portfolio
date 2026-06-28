---
name: "Proxmox VE"
type: "service"
group: "app"
category: "Infrastructure & Networking"
subtitle: "Logiciel d'hyperviseur"
description: "Plateforme de virtualisation KVM/LXC open-source hébergeant la majorité du homelab sous forme de VMs."
order: 26
icon: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
screenshots:
  - caption: "Résumé Proxmox VE"
    image: "./images/proxmox_ve_summary.png"
  - caption: "Vue datacenter"
    image: "./images/proxmox_ve_datacenter_view.png"
relatedRoles: ["system_update", "deploy_network_configuration", "cron_configuration", "login_banner"]
---

Proxmox VE est la plateforme de virtualisation open-source tournant sur le HP Z440, fournissant l'hyperviseur KVM/LXC sous-jacent à presque tous les autres services du homelab. Son interface web gère le cycle de vie des VMs et conteneurs, le stockage, le réseau et les sauvegardes en un seul endroit.

Contrairement à OPNsense, Proxmox lui-même n'est pas piloté via un rôle Ansible dédié. Les VMs sont provisionnées et gérées en grande partie à la main via son interface, tandis que les invités Linux tournant dans ces VMs sont ce qu'Ansible configure réellement. La maintenance au niveau de l'hôte, mises à jour, redémarrages, est tout de même automatisée via `system_update`, comme n'importe quel autre hôte Linux.

Ce serveur héberge presque tous les services que j'utilise au quotidien.

Un jour, j'utiliserai peut-être Terraform pour provisionner Proxmox. Pour l'instant, si je dois tout reconstruire, je sais que je peux compter sur mes sauvegardes quotidiennes pour réimporter les VMs.
