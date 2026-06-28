---
name: "GitLab"
type: "service"
group: "app"
category: "Productivity & Tools"
subtitle: "Code Hosting"
description: "Self-hosted Git hosting and CI/CD, used for personal projects including the Sonixd Redux client."
order: 7
icon: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
screenshots:
  - caption: "GitLab projects"
    image: "./images/gitlab_projects.png"
  - caption: "Sonixd Redux CI/CD pipeline"
    image: "./images/sonixd_redux_cicd_pipeline.png"
relatedRoles: ["docker_install", "docker_compositor", "sonixd_redux_code_backup", "sonixd_redux_devel_code_backup"]
---

A self-hosted GitLab instance used for personal projects, including Sonixd Redux and its development branch, a Subsonic-compatible music client. Keeping it self-hosted means full control over CI runners and storage limits without depending on a third-party plan.

The repositories themselves are backed up independently via the `sonixd_redux_code_backup` and `sonixd_redux_devel_code_backup` roles, archiving the working tree to dual NAS storage on its own schedule, separate from GitLab's own data.
