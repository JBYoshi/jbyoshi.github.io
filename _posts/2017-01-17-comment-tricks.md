---
title: C/C++/Objective-C/Java Comment Tricks
---

Today, I was working on a bit of code that I wanted to switch between two versions quickly. So I used a few commenting tricks to do it.

# 1: End a comment, if it exists

```c
//*/
```

If there is a multi-line comment before this, it will end the comment here. If not, the rest of the line will simply be skipped.

Here's a basic example of this:

```c
int startOfMultiLineComment = 0;
/*
Multi-line comment
//*/
int endOfMultiLineComment = 0;

//*/
int notCommented = 0;
```

# 2: Toggle comments

```c
/*/
```

If there is a multi-line comment before this, it will be ended. If not, one will be started.

Here's an example:

```c
int startOfComment = 0;
/*/
Commented out
/*/
int endOfComment = 0;
```

# 3: Not the start of a comment

```c
//*
```

I use this to say "maybe start a comment, maybe not". This is the disabled state; only this line is commented. To enable it, just delete one of the `/`s.

An example:

```c
//*
int maybeCommented = 0;
//*/   // See #1
```

Then I can quickly switch to:

```c
/*
int maybeCommented = 0; (This is commented out)
//*/ // See #1
```

So I use this to switch between two variations of a file quickly:

```c
// Variation 1

//*
int variation1 = 0;
/*/
int variation2 = 0;
//*/

// Variation 2
/*
int variation1 = 0;
/*/
int variation2 = 0;
//*/
```
