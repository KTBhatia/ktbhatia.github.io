---
title:  "ASM config files cleanup script"
date:   2025-11-27
categories: bash linux automation
---

# Simple Bash shell script to cleanup ASM config files

I got tired of manually doing removing ASM files that got generated on F5 every hour filling up /var every day, so I wrote a tiny Bash script that does the removal of files periodially adjusted using cron.  
## Features
- Super fast
- No root required

## Install & run in one line (recommended)

```bash
curl -Ls https://raw.githubusercontent.com/your-username/your-username.github.io/main/scripts/my-script.sh | bash
