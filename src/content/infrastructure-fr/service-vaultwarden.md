---
name: "Vaultwarden"
type: "service"
group: "app"
category: "Security"
subtitle: "Gestionnaire de mots de passe"
description: "Gestionnaire de mots de passe auto-hébergé, compatible Bitwarden, sauvegardé chaque nuit."
order: 27
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
relatedRoles: ["vaultwarden_backup", "docker_install"]
---

Vaultwarden est un gestionnaire de mots de passe léger, auto-hébergé, compatible avec les clients officiels Bitwarden et leurs extensions navigateur, sans le coût ni l'empreinte de faire tourner le serveur officiel de Bitwarden.

Les données de son coffre sont sauvegardées chaque nuit via le rôle `vaultwarden_backup` vers deux NAS, avec rétention automatique.
