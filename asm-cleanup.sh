#!/usr/bin

a=$(ls  /var/ts/var/cluster/send/ -1 | wc -l)
for (( i=1; i<$a; i++ ));
do
  file=$(find /var/ts/var/cluster/send/ -type f | sort | head -n 1)
  echo "The date is $(date). Total $a file in dir removing $i .... " >> /home/kroot/logtest.txt # replace kroot with your userdir 

  rm -rf $file
done

## Install as cron job 

Run it automatically every 10th Minute of every hour, since I could see that was the frequency of file generation.

```bash
# Edit crontab as admin (or root if needed)
crontab -e

# Add this line:
*/10 */1 * * * /root/asm_file_cleanup.sh #every 10th Minute of every hour
