---
title: "F5OS backups using Ansible"
tags: [Ansible, Automation]
excerpt: "Backing up F5OS with Ansible "
---

Newer F5 VELOS/rSeries devices have microservices based F5OS running as the hypervisor(host OS) layer which is different from the previous generation iSeries/Viprions platforms that have BigIP TMOS playing the role on both Hypervisor and Guest layers.

Having migrated to new rSeries - required some bit of code to pull backup host OS config as push option wasnt available like in some products like Cisco FMC. No change to the way Tenants were backed up as that was still TMOS where we simply backup the .ucs archive. 

I planned to do this with shell script compiled of curl based RESTCONF calls given in https://my.f5.com/manage/s/article/K000140649

I set Initial Primary key for DB in the UI(mandatory step to restore configs during RMA etc), following that the process was to:


1.get token and authenticate  --> 2.generate config on target --> 3.copy config to backup server.


Till step 2 all okay, step 3 did not seem to work. Backup file was 160K and transfered file was 80bytes. double checked - syntax was no problem, but file wasnt copying correctly.

I thought trying to do this via Ansible, as I saw some bug defects for the download via restconf. Altough Ansible would eventually use the same calls. SO..againt better my judgement and  some coffee I referred : https://clouddocs.f5.com/products/orchestration/ansible/devel/f5os/modules_3_0/f5os_config_backup_module.html and https://clouddocs.f5.com/products/orchestration/ansible/devel/f5os/f5os.html 

**Playbook** (`backup-f5os.yml`):
```yaml
---
- name: Backup F5os
  connection: httpapi
  hosts: f5os_hosts
  collections:
    - f5networks.f5os
  any_errors_fatal: true

  vars:
    ansible_user: "un" # rSeries username
    ansible_httpapi_password: "pw"   # rSeries  Password
    ansible_network_os: "f5networks.f5os.f5os"
    ansible_httpapi_use_ssl: true
    ansible_httpapi_use_proxy: false
    ansible_httpapi_validate_certs: "no"
    ansible_httpapi_port: 8888
    ansible_command_timeout: 1800


  tasks:
    - name: Recreate existing backup file and upload it to remote server
      f5os_config_backup:
        name: "{{ inventory_hostname }}_{{ lookup('pipe', 'date +%m%d%Y') }}"
        remote_host: 1.2.3.4 # Backup Server IP
        remote_path: /data/backup/F5_LB/f5os/
        remote_user: admin
        remote_password: "pw" 
        timeout: 300
        protocol: scp
        force: true
        state: present

    - name: Remove backup file
      f5os_config_backup:
        name: "{{ inventory_hostname }}_{{ lookup('pipe', 'date +%m%d%Y') }}" #Took help of AI to get this Hostname_date as file name
        state: absent

```
**Inventory** (`inventory.yml`):

```yaml
all:
  children:
    f5os_hosts:
      hosts:
        Host1r10600:
          ansible_host: 1.1.1.1
        Host1r5800:
          ansible_host: 2.2.2.2
        Host2rVELOS:
          ansible_host: 3.3.3.3
        Host2r10900:
          ansible_host: 4.4.4.4
          
```
Useful verification commands :
1. Useful to check syntax of inventory file
```yaml
ansible-inventory -i inventory.yml --list --yaml 
ansible-playbook -i inventory.yml F5osbackup.yaml --syntax-check
```
2. Dry Run check
```yaml
ansible-playbook -i inventory.yml F5osbackup.yaml --check
```


Oddly, once I cleared out the older backup files from previous failed attempts, the original RESTCONF/curl approach started transferring the full file correctly too. 

I removed old backup files on Backup server and from the F5 Host as well.

- **Once it started working:** file sizes matched, and so did the checksums

```bash
md5sum /data/backup/F5_LB/f5os/f5os_config_backup
9e7249f9d0fbcb6437cf65ca4e116f58  /data/backup/F5_LB/f5os/f5os_config_backup
```
I decided to stick with the Ansible scripts as its easy to add more to inventory file with other useful things like idempotency.









