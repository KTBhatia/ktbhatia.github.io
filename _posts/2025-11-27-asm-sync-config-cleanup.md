---
title:  "ASM config files cleanup script"
date:   2025-11-27
categories: bash linux automation
---

# Simple Bash shell script to cleanup ASM config files

In our F5 setup I came across /var getting filled up often. Below command gives top 10 files consuming space 
on /var partition

```bash
find /var -xdev -type f -exec du -hs {} \; | sort -rn | head -10

Solution was simple to just **rm-rf <file>** , as described here --https://my.f5.com/manage/s/article/K03345470
so I wrote a tiny Bash script that does the removal of files periodially adjusted using cron.  

## Install & run in one line (recommended)

```bash
curl -Ls https://raw.githubusercontent.com/your-username/your-username.github.io/main/scripts/my-script.sh | bash
