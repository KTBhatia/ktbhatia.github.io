---
title: "Simple Bash Script to Cleanup ASM Config Files"
date: 2025-11-27
categories: bash linux automation
Tested on : Big-IP 13.x – 17.x.
permalink: /2025/11/27/asm-sync-config-cleanup.html  
---

# Simple Bash shell script to cleanup ASM config files
In F5 Active/Standby setup I came across /var getting filled up often. Below command gives top 10 files consuming space 
on /var partition


<br><small><code>find /var -xdev -type f -exec du -hs {} \; | sort -rn | head -10</code></small>

<p align="center">
  <img src="/img/ASM1.PNG" alt="Disk almost full from ASM sync files" width="750"/>
  <br><small>/var partition filled with old ASM config sync files</small>
</p>

<p align="center">
  <img src="/img/ASM2.PNG" alt="Top 10 biggest files on /var" width="750"/>
  <br><small>Output of <code>find /var -xdev -type f -exec du -hs {} \; | sort -rn | head -10</code></small>
</p>
Seemed like ASM config files took up too much space.
rm -rf var/ts/var/sync/sync_*_full_update , as described here --https://my.f5.com/manage/s/article/K03345470 works just fine, but
bash script for removal of files is better.  

A simple log file keeps the history of files and deletions

## Install & run in one line 

```bash
curl -Ls https://raw.githubusercontent.com/your-username/your-username.github.io/main/scripts/my-script.sh | bash
