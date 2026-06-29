---
name: "Vaultwarden"
type: "service"
group: "app"
category: "Security"
subtitle: "Gestionnaire de mots de passe"
description: "Gestionnaire de mots de passe auto-hébergé, compatible Bitwarden."
order: 27
icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
openSource: true
relatedRoles: ["vaultwarden_backup", "docker_install"]
---

Vaultwarden est un gestionnaire de mots de passe léger, auto-hébergé, compatible avec les clients officiels Bitwarden et leurs extensions navigateur, sans le coût ni l'empreinte de faire tourner le serveur officiel de Bitwarden, un seul conteneur au lieu des plusieurs requis par la solution officielle auto-hébergée. Il a remplacé KeepassXC, ce qui imposait de copier la base à la main sur chaque appareil après chaque modification ; le faire tourner comme un conteneur centralisé supprime complètement cette étape.

Son coffre est sauvegardé via le rôle `vaultwarden_backup`, exécuté manuellement plutôt que selon un planning, en utilisant le CLI officiel de Bitwarden plutôt qu'un appel API personnalisé : le CLI est téléchargé à la volée dans un répertoire temporaire, utilisé pour se connecter avec un ID et un secret de client API puis exporter le coffre en JSON chiffré, avant d'être supprimé à nouveau. Le mot de passe d'export est volontairement distinct du mot de passe maître du coffre, si bien que le fichier de sauvegarde reste lisible même si le mot de passe maître venait à changer. Les deux NAS conservent les 5 derniers exports, les plus anciens étant supprimés automatiquement. En complément, la VM de l'hôte Docker dans son ensemble est capturée par la sauvegarde nocturne de Proxmox vers PBS et répliquée vers le NAS Synology, si bien que le coffre est aussi couvert au niveau de la VM chaque nuit, indépendamment de l'export manuel.
