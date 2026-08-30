---
title: "Debugging a race condition that only showed up on Tuesdays"
tags: [debugging]
excerpt: "The bug was real. The pattern I thought I saw in it was not."
---

For three weeks, a job failed intermittently and only ever on Tuesdays. That "pattern" turned out to be a coincidence — the actual cause was a shared cache with no lock around a read-modify-write, and Tuesday was just the day our traffic happened to spike enough to expose it.

The fix was boring: a mutex around four lines of code. The lesson wasn't. When a bug looks like it has a schedule, check the load first, not the calendar.
