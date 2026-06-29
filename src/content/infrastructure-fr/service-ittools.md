---
name: "IT-Tools"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Boîte à outils"
description: "Collection d'utilitaires quotidiens pour développeurs et IT (encodeurs, générateurs, convertisseurs) en une seule application auto-hébergée."
order: 11
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "Exemples d'utilitaires IT-Tools"
    image: "./images/it_tools_example.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor"]
---

IT-Tools regroupe des dizaines d'utilitaires quotidiens pour développeurs et administrateurs systèmes en une seule application auto-hébergée, au lieu de dépendre de sites web publics aléatoires pour les mêmes tâches : outils de cryptographie comme les décodeurs base64 et JWT, convertisseurs et générateurs de tokens/mots de passe, utilitaires web, utilitaires image et vidéo, et utilitaires de développement comme les testeurs de regex. La même logique de confidentialité que pour BentoPDF s'applique : générer un QR code WiFi ici, par exemple, n'envoie jamais le mot de passe du réseau hors du domicile.

Déployé via la stack Compose générique aux côtés des autres conteneurs utilitaires légers.
