---
name: "GitLab"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Code Hosting"
description: "Self-hosted Git hosting and CI/CD for personal projects, including this homelab's own Ansible code and the Sonixd Redux client."
order: 7
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
openSource: true
screenshots:
  - caption: "GitLab projects"
    image: "./images/gitlab_projects.png"
  - caption: "Sonixd Redux CI/CD pipeline"
    image: "./images/sonixd_redux_cicd_pipeline.png"
relatedRoles: ["docker_install", "docker_compositor", "sonixd_redux_code_backup", "sonixd_redux_devel_code_backup"]
---

A self-hosted GitLab instance hosting two projects: this homelab's own Ansible code, and Sonixd Redux (plus its development branch), a Subsonic-compatible music client. Keeping it self-hosted means full control over CI runners and storage limits without depending on a third-party plan, and a place to revert to any previous commit if something breaks.

Sonixd Redux has a full CI/CD pipeline that runs tests and builds the app, used to validate changes before they're pushed to GitHub for users to actually download.

The `sonixd_redux_code_backup` and `sonixd_redux_devel_code_backup` roles don't touch GitLab's own data at all, they tar.gz the local working directory on disk where the code is actually developed (`~/Documents/git/sonixd-redux` and its `-devel` counterpart) and ship the archive to both NAS targets, keeping the 5 most recent archives each. Both are run by hand, on demand, as part of a broader manual backup sweep rather than on a cron schedule. GitLab's own data, repos, issues, CI history, is covered separately: the whole Docker host VM is captured in Proxmox's nightly backup to PBS.
