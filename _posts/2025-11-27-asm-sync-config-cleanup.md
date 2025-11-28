---
title:  "ASM config files cleanup script"
date:   2025-11-27
categories: bash linux automation
Works on : Big-IP 13.x – 17.x.
---

# Simple Bash shell script to cleanup ASM config files
In F5 Active/Standby setup I came across /var getting filled up often. Below command gives top 10 files consuming space 
on /var partition

```bash
find /var -xdev -type f -exec du -hs {} \; | sort -rn | head -10
<img width="588" height="117" alt="ASM2" src="https://github.com/user-attachments/assets/1d36a00c-a2a3-44cb-b521-680c1e7f829d" />

Seemed like ASM config files took up too much space.
Solution was simple to just, rm -rf var/ts/var/sync/sync_*_full_update , as described here --https://my.f5.com/manage/s/article/K03345470
Thought tiny Bash script would be fun for removal of files periodially adjusted using cron.  

A simple log file keeps the history of files and deletions
<img width="393" height="89" alt="ASM1" src="https://github.com/user-attachments/assets/8aa7243b-1f64-4e91-9d19-fcf4b0bf6f3f" />

## Install & run in one line 

```bash
curl -Ls https://raw.githubusercontent.com/your-username/your-username.github.io/main/scripts/my-script.sh | bash
