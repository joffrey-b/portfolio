---
name: "IT-Tools"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Utility Belt"
description: "Collection of everyday developer and IT utilities (encoders, generators, converters) in one self-hosted app."
order: 11
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "IT-Tools utility examples"
    image: "./images/it_tools_example.png"
openSource: true
relatedRoles: ["docker_install", "docker_compositor"]
---

IT-Tools bundles dozens of everyday developer and sysadmin utilities into one self-hosted app instead of relying on random public websites for the same tasks: cryptography tools like base64 and JWT decoders, converters and token/password generators, web utilities, image and video utilities, and development utilities like regex testers. The same privacy reasoning as BentoPDF applies: generating a WiFi QR code here, for example, never sends the network password anywhere outside the home.

Deployed through the generic Compose stack alongside the other lightweight utility containers.
