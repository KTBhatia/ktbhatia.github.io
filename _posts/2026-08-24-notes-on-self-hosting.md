---
title: "Notes on self-hosting the boring stuff"
tags: [infra]
excerpt: "The unglamorous parts of running your own services are the parts that actually save you money."
---

Everyone writes about the fun part of self-hosting — the dashboard, the app you finally control. Nobody writes about backups, and that's exactly where most home setups quietly fail.

## The checklist that matters

1. Automated backups, tested by actually restoring them
2. Monitoring that alerts *you*, not just a log file nobody reads
3. Updates on a schedule, not "whenever I remember"

None of this is exciting. All of it is why the exciting part keeps working.

```bash
# the only cron job that actually matters
0 3 * * * /usr/local/bin/backup.sh && /usr/local/bin/verify-restore.sh
```

If you only do one thing from this list, verify your restores. A backup you haven't restored is a hypothesis, not a backup.
