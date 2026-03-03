---
title: "Deploy SSH Keys"
category: "System Management"
description: "This role deploys SSH public keys to user accounts on target systems."
tags: ["Debian", "RedHat", "SSH", "YAML"]
---

## Overview

This role deploys SSH public keys to user accounts on target systems. It verifies user existence, creates necessary `.ssh` directories with proper permissions, adds public keys to `authorized_keys` files, and ensures correct ownership and permissions for SSH authentication to work properly.

## What This Role Does

1. **Checks user existence** using `getent` for each configured user
2. **Filters to existing users** (skips users not on system)
3. **Displays found users** for verification
4. **Creates `.ssh` directories** for each user with mode 0700
5. **Sets directory ownership** to user:user
6. **Deploys public keys** to `authorized_keys` using `authorized_key` module
7. **Preserves existing keys** (exclusive: false)
8. **Adds key comments** for identification
9. **Verifies file permissions** on `authorized_keys` (mode 0600)
10. **Sets file ownership** to user:user
11. **Displays success message** with hostname

## Role Variables

| Variable | Description |
|----------|-------------|
| `deploy_ssh_keys_users` | List of user/key configurations to deploy |
| `deploy_ssh_keys_ssh_dir_mode` | Permission mode for `.ssh` directory |
| `deploy_ssh_keys_authorized_keys_mode` | Permission mode for `authorized_keys` |

**Default users configuration:**
```yaml
deploy_ssh_keys_users:
  - username: ansibleuser
    key_file: ansible_user.pub
    comment: "Ansible automation key from mint-vm"
  - username: bjoffrey
    key_file: bjoffrey_user.pub
    comment: "bjoffrey interactive SSH key (PuTTY)"
```

## Notes

- Role does not create user accounts or modify `sshd_config`
- Keys are appended to `authorized_keys`, never removed
