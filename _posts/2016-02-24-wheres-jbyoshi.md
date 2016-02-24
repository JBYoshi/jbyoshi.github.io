---
title: Where's JBYoshi?
---

You might have noticed that my commits in the past few weeks have been few and far between. I can explain.

I decided to start on a new program. Right now, it's just called "Robot Game", but that's the best I could think of. It allows you
to write Java programs to control virtual robots. I'm almost ready to push out the first commits, but I'm trying to add in a few
more features first:

- An automatic updater. Every few minutes, your client will check for an update, and download one if it exists. I'll need a CI
  setup, though, (although it could just be a .git/hooks file), and I'm still working on writing the updater code.
- Right now, the program just looks for a file named `RobotGameScript.java` in your working directory. I'd like to change that
  up before release, although it's not a priority.

I'll hopefully get it pushed out sometime in the next couple days. Stay tuned!
