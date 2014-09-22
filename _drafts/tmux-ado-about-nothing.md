---
layout: post
title: "tmux Ado About Nothing"
date: 0000-00-00
---

Of the many things I get excited about, finding new ways to optimize my workflow and keeping organized is pretty high up that list. Give me your keyboard shortcuts, Alfred workflows, and productivity tools! I want them all!

Of course, playing around with lots of workflow improvement methods and tools is, but only a few of them actually stick around and become part of my toolkit. And as I've been writing more and more code, the number of terminal windows and/or tabs I need to manage is increasing as well. I've got sass watching one window, jekyll monitoring another, git management in yet another, and vim is probably peaking in on a window too. Switching between tabs to see logs and status eats up a lot of time in the course of a project. Why can't I just monitor them at a glance?

One way to do that is to make each terminal tab it's own window and arrange them on screen where you'd like them. Uh, no. That's not easily repeatable between sessions.

In iTerm, I could split my terminal window into panes and save their arrangement. Then I could create separate profiles for each pane. Also, no. That's a lot of tweaking and settings spread out in different places.  

I've used screen and have been encouraged to use tmux, but both seemed really complex and unapproachable. So I eventually went back to managing tabs. Lame.

Recently though, noticing just how many terminal windows I was managing for work on a single project, I decided it was time to stop worrying about complexity and start learning how to use tmux. And what I discovered is not is tmux actually very easy to use, but something I never want to be without!

## What is tmux?

Put "simply", tmux is a terminal multiplexer. Hello? Unapproachable!?

A terminal multiplexing (sometimes referred to as muxing - all the kids are doing it), is using a single terminal window to display multiple terminal sessions. There are some really cool benefits to muxing, including being able to easily share sessions with others, have many windows open at once, and persistence. If you start up a tmux session on a remote machine, detaching from it when you sign out leaves it running in the background. The next time you connect to that remote, you can just reattach to your tmux session and pick up where you left off.

# Getting started with tmux

tmux is run from the command line and has a whole slew of optiosn.

// start a session
// remove a session
// name a session
// split a window
// navigate between windows

// set up script for running dev environment automatically
