---
title: "Postfix"
category: "System Management"
description: "This role installs and configures Postfix as an SMTP relay for sending system emails through an external mail server."
tags: ["Centreon", "DNS", "Debian", "Postfix", "SMTP"]
---

## Overview

This role installs and configures Postfix as an SMTP relay for sending system emails through an external mail server. It sets up SASL authentication, TLS encryption, header rewriting for proper sender display names, and configures the main Postfix configuration file. The role is designed for systems that need to send notification emails (like Centreon alerts) via a relay host such as Gmail, Office 365, or a dedicated SMTP server.

## What This Role Does

1. **Install packages**:
   - `postfix`: SMTP server/relay
   - `postfix-pcre`: Perl regex support (header rewriting)
   - `s-nail`: Mail command utility
   - `cyrus-sasl-plain`: SASL PLAIN authentication

2. **Configure SASL password**:
   - Creates `sasl_passwd` with relay credentials
   - Format: `[relay:port] user:password`
   - Sets permissions: `0600` (root only)
   - Runs `postmap` to create hash database

3. **Configure header checks**:
   - Creates `smtp_header_checks` for From rewriting
   - Rewrites centreon-engine emails with display name Centreon Alerts
   - Uses PCRE regex matching

4. **Configure main.cf**:
   - Sets relay host and port
   - Enables TLS and SASL authentication
   - References password maps and header checks
   - Sets system hostname

5. **Restart Postfix**:
   - Restarts service to apply changes
   - Enables Postfix on boot

## Role Variables

| Variable | Description |
|----------|-------------|
| `postfix_config_path` | Path to Postfix configuration directory |
| `postfix_config_file` | Main configuration filename |
| `postfix_password_maps_file` | SASL password maps filename |
| `postfix_smtp_header_checks_file` | SMTP header checks filename |
| `postfix_smtp_host` | SMTP relay hostname |
| `postfix_smtp_port` | SMTP relay port |
| `postfix_sender_email` | Sender email address for authentication |
| `postfix_sender_password` | SMTP authentication password (from vault) |
| `postfix_myhostname` | System hostname used in SMTP HELO |
| `postfix_sender_display_name` | Display name in From field |
| `postfix_relayhost` | Relay host in Postfix format (auto-built from `postfix_smtp_host` and `postfix_smtp_port`) |
| `postfix_smtp_use_tls` | Enable TLS encryption |
| `postfix_smtp_sasl_auth_enable` | Enable SASL authentication |
| `postfix_smtp_sasl_security_options` | SASL security options for non-TLS connections |
| `postfix_smtp_sasl_tls_security_options` | SASL security options for TLS connections |

## Notes

- Gmail requires an App Password (not account password) when 2FA is enabled
- The sender password is stored in Ansible Vault, never in plaintext
- Use port `587` with TLS (STARTTLS) for Gmail. Port `465` uses implicit SSL
