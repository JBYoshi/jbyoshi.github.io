---
title: Sharing a Git Submodule between Multiple Parent Projects
---

One of the problems I've been working with for some time with Git is using a single clone of a submodule with multiple containing repositories. I tried using symbolic links, but Git refuses to interpret the symbolic links as real submodules. Then I found an interesting workaround via the Git configuration:

1. Set up the repositories individually, as you would normally do.
2. Choose a location to place the submodule. Place exactly one checkout of the submodule there.
3. Delete the submodule directory from all other locations. In their place, add an empty directory (for compatibility reasons).
4. Run `git config --local submodule.SubmoduleName.path /path/to/submodule` in each repository you want to share the submodule
between. The path should either be relative to the repository root or absolute.

Now you have a single checkout of the submodule shared among all repositories. I made a sample repository using [SpongeForge](https://github.com/SpongePowered/SpongeForge) and [SpongeVanilla](https://github.com/SpongePowered/SpongeVanilla); you can view it [here](https://github.com/JBYoshi/SpongeAll). See the README file for usage instructions; the `init` script contains all the logic.
