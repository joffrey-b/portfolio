---
name: "Maloja"
type: "service"
group: "app"
category: "Media"
subtitle: "Suivi de scrobbles"
description: "Tracker de scrobbling secondaire de sauvegarde pour l'historique d'écoute musicale, conservé aux côtés de Koito, le tracker principal."
order: 14
icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
screenshots:
  - caption: "Vue des meilleurs artistes Maloja"
    image: "./images/maloja_top_artists.png"
  - caption: "Pulse Maloja de l'année écoulée"
    image: "./images/maloja_pulse.png"
openSource: true
relatedRoles: ["maloja_backup", "maloja_import_backup", "cron_configuration"]
---

Maloja est un tracker de scrobbling auto-hébergé pour l'historique d'écoute musicale, tournant comme sauvegarde de Koito, le tracker principal des statistiques d'écoute, plutôt que comme une seconde source principale indépendante. C'était autrefois le tracker principal, mais il ne compte que le nombre d'écoutes, pas la durée d'écoute, que Koito sait suivre et qui est aussi plus activement maintenu, d'où le changement. Maloja est conservé uniquement comme sauvegarde redondante et n'est en réalité jamais consulté.

Ses données sont sauvegardées chaque nuit en reprenant la même logique que le rôle `maloja_backup` : authentification auprès de l'API backend de Maloja (`POST /auth/authenticate`, distinct de la connexion à l'interface web) et export de l'historique complet de scrobbling depuis `/apis/mlj_1/export` vers les deux NAS, en conservant uniquement les 5 sauvegardes les plus récentes. Comme pour Koito, l'exécution nocturne est un script shell autonome déployé par `cron_configuration`, car cron ne peut pas fournir le mot de passe `become` interactif dont Ansible a besoin. Le rôle `maloja_backup` reste utile pour lancer la même sauvegarde manuellement, à la demande.

La restauration a son propre rôle, `maloja_import_backup` : il sélectionne automatiquement l'export le plus récent, le dépose dans le répertoire d'import du conteneur, redémarre le conteneur pour déclencher l'import, puis surveille les logs pendant jusqu'à 10 minutes en attendant la fin de l'opération. Maloja ignore lui-même les scrobbles déjà présents dans la base, donc réimporter ne crée jamais de doublons.
