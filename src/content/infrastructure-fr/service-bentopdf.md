---
name: "BentoPDF"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Outils PDF"
description: "Boîte à outils auto-hébergée pour fusionner, scinder et convertir des fichiers PDF sans les envoyer à un tiers."
order: 3
icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
screenshots:
  - caption: "Écran de sélection d'outil BentoPDF"
    image: "./images/bento_pdf_tools.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor", "docker_data_backup"]
---

BentoPDF est une boîte à outils auto-hébergée pour fusionner, scinder, compresser et convertir des fichiers PDF, avec tout le traitement effectué côté navigateur plutôt que sur un serveur, si bien que les fichiers ne quittent jamais réellement l'appareil. Elle est utilisée rarement, mais elle est spécifiquement privilégiée pour les documents sensibles, comme des papiers médicaux, là où envoyer le fichier à un outil web tiers aléatoire n'est pas une option. C'est l'un des petits conteneurs utilitaires de l'hôte Docker.

Déployée via la stack Compose générique comme les autres applications utilitaires légères ici, sans rôle Ansible spécifique puisqu'il n'y a rien au-delà de l'entrée Compose initiale à gérer.
