---
name: "Koito"
type: "service"
group: "app"
category: "Media"
subtitle: "Statistiques d'écoute"
description: "Outil principal de suivi de l'historique d'écoute musicale personnel, sauvegardé chaque nuit via son export API."
order: 13
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Tableau de bord de l'historique d'écoute Koito"
    image: "./images/koito_listening_history_dashboard.png"
  - caption: "Exemple top artiste et album Koito"
    image: "./images/koito_top_example.png"
openSource: true
relatedRoles: ["koito_backup", "cron_configuration", "docker_install"]
---

Koito est l'outil principal de suivi de l'historique d'écoute musicale personnel, dans le même esprit que Last.fm mais entièrement auto-hébergé, avec des statistiques mises à jour en temps réel plutôt que selon le cycle mensuel habituel des plateformes en ligne. Les données d'écoute peuvent être filtrées par semaine, année ou depuis toujours, et une fonction de rewind fait ressortir des récapitulatifs mensuels ou annuels. Maloja tourne à ses côtés comme tracker secondaire de sauvegarde pour les mêmes données d'écoute.

Son historique d'écoute est sauvegardé chaque nuit en reprenant la même logique que le rôle `koito_backup` : authentification auprès du point de terminaison `/apis/web/v1/export` de Koito avec un en-tête `Authorization` basé sur un jeton, téléchargement de l'historique complet en un seul export JSON, puis écriture sur les deux NAS sous le nom `koito_export_<horodatage>.json`, en ne conservant que les 5 dernières sauvegardes par NAS. L'exécution nocturne elle-même est un script shell autonome déployé par `cron_configuration`, car une tâche cron ne peut pas fournir le mot de passe `become` interactif dont Ansible a besoin. Le rôle `koito_backup` reste utile pour lancer la même sauvegarde manuellement, à la demande.
