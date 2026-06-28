---
name: "Switch"
type: "hardware"
subtitle: "Zyxel GS1900-24E"
description: "Switch managé gérant tout le trafic. Configuré pour gérer le trafic VLAN taggé et non taggé."
order: 5
specs: ["24 ports Gigabit managé", "Compatible VLAN (802.1Q)"]
screenshots: []
relatedRoles: []
---

Un switch managé 24 ports Gigabit qui porte chaque connexion filaire du homelab. Il est configuré pour le tagging VLAN 802.1Q, faisant transiter les 8 VLANs vers le pare-feu OPNsense en trunk tout en présentant des ports d'accès non taggés aux appareils qui n'ont pas besoin d'être eux-mêmes VLAN-aware.

La configuration ici passe par l'interface web propre du switch plutôt que par Ansible. Il est modifié assez rarement (l'assignation port/VLAN ne change pas souvent) pour que l'automatiser n'en vaille pas la peine par rapport au reste de la stack.
