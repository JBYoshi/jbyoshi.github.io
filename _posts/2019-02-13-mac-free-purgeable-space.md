---
title: Freeing Purgeable Space on macOS
---

The biggest annoyance I have with my laptop is its lack of storage space. Right now, I use about 50 GB of storage for a Windows 10 virtual machine - and I can't shrink it. The only way to make it smaller is to make a copy of the virtual hard drive in a different format.

Recently, I bit the bullet and tried a conversion.

It didn't work. My hard drive was full.

Except it wasn't - it supposedly had about 60 GB free. The problem? 40 GB of that was "purgeable" storage - storage that was used, but that could be freed up.

After looking online, I found a couple possible causes:

- Some articles suggested turning on iCloud Drive's "Optimize Mac Storage" option, which removes copies of files stored on your computer that are also on iCloud. However, I'm on the free iCloud plan, which only gives me 5 GB of storage. That left 35 GB of files.
- Some articles suggested creating a few giant files, forcing macOS to clear out space for them. However, that was exactly what I had been doing - trying to create a huge file. My computer wasn't letting me do that, either.
- Some articles suggested downloading a cleaning program. I don't recommend those - I don't trust them, and they might break some files.

After looking around, I found the culprit hidden in some comments: Time Machine. Even though I had told it to ignore my virtual machines (I back up any data separately), it somehow managed to grab a partial copy of my virtual hard drive in the middle of the conversion, filling up all that extra space. While it technically is purgeable (Time Machine eventually sends it to an external backup file), it wasn't being cleared out automatically.

A user by the name of Andrew posted [a comment](https://www.jackenhack.com/mac-os-remove-purgeable-high-sierra/#comment-54981) on an existing blog post giving some terminal commands to fix it. I adapted them to my own use case, and ended up with the following.

1. Go to System Preferences > Time Machine and turn off "Back Up Automatically".
2. Open Terminal.
3. Type the command `tmutil listlocalsnapshots /` and press Enter.
4. You should end up with a list of Time Machine backups. Each one starts with `com.apple.TimeMachine.` and ends with a date and time.
5. For each backup, type `tmutil deletelocalsnapshots "datetime"`, replacing `datetime` with the date and time at the end of the backup text. For example, to delete one of my snapshots, I typed `tmutil deletelocalsnapshots "2019-02-07-091157"`. Then press Enter. (If you know the time when you were messing with the large files, you may only need to pick the backups around that time.)
6. Repeat for all the snapshots in the list.

At this point, you should be able to see the amount of purgeable storage space decrease. In Finder, select the name of your computer, then right click "Macintosh HD" and click "Get Info". The amount of space you have will be listed near the top.

Enjoy your new free space! (And remember to turn Time Machine back on in System Preferences when you're done with the extra space.)
