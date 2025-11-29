---
title:  "ASM config files cleanup script"
date:   2025-11-27
categories: bash linux automation
Tested on : Big-IP 13.x – 17.x.
---

# Simple Bash shell script to cleanup ASM config files
In F5 Active/Standby setup I came across /var getting filled up often. Below command gives top 10 files consuming space 
on /var partition

```bash
find /var -xdev -type f -exec du -hs {} \; | sort -rn | head -10

### Before & After Cleanup

<p align="center">
  <img src="/assets/ASM1.PNG" alt="Disk full" width="750"/>
  <br><small>Disk almost full because of old ASM sync files</small>
</p>

<p align="center">
  <img src="/assets/ASM2.PNG" alt="Top 10 files" width="750"/>
  <br><small>Top 10 biggest files on /var partition</small>
</p>

Seemed like ASM config files took up too much space.
rm -rf var/ts/var/sync/sync_*_full_update , as described here --https://my.f5.com/manage/s/article/K03345470 works just fine, but
bash script for removal of files is better.  

A simple log file keeps the history of files and deletions

## Install & run in one line 

```bash
curl -Ls https://raw.githubusercontent.com/your-username/your-username.github.io/main/scripts/my-script.sh | bash
