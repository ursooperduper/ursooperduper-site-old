---
layout: post
title: "tmux Ado About Nothing"
date: 0000-00-00
---

Of the many things I get excited about, finding new ways to speed up and organize my workflow is pretty high up on my list. Give me your keyboard shortcuts, Alfred workflows, and productivity tools! I want them all! (Seriously, send them to me. I want them.)

As I've been writing more and more code, the number of terminal windows and/or tabs I need to manage is increasing. I've got sass watching one window, jekyll monitoring another, my ruby log rolling in another. Switching back and forth between tabs all day is not ideal, so while I've avoided it in the past due to its complexity, I decided to learn and use tmux.

But surely there are other ways of solving this problem?

Absolutely. I could make each terminal tab it's own window and arrange the windows on screen as I'd like. But that's not easily repeatable between sessions. So that's a non-starter.

Or I could manage this in [iTerm](http://iterm2.com/), my terminal of choice, and split terminal windows into panes then save their arrangement. From there I could create separate profiles for each pane and save those as well. But that involves a lot of tweaking and settings in different places.

So with renewed vigor, I learned to use tmux, found that it's not as complex as I once thought, and now wonder how I ever lived without it.

## What is tmux?

Put "simply", [tmux](http://tmux.sourceforge.net/) is a terminal multiplexer.

## Great. What's terminal multiplexing?

[Terminal multiplexing](https://en.wikipedia.org/wiki/Terminal_multiplexer) (sometimes referred to as muxing - all the kids are doing it), is the use of a single terminal window to display multiple terminal sessions. There are some really cool benefits to *muxing*, including being able to easily share sessions with others, have many windows open at once, and persistence. If you start a tmux session on a remote machine, then detach from it when you sign out, it's still running in the background waiting patiently for your return. The next time you connect, you simply reattach to your session and pick up where you left off.

For my use, I've found it easy to define a development environment for individual projects so you spend less time setting up terminal windows and more time making things that are awesome.

# Getting started with tmux

To find out if you have tmux installed and/or create your first session, type in your favorite terminal:

`tmux`

If you don't have tmux installed, Mac users can  can install it with [Homebrew](http://brew.sh/) like this:

`brew install tmux`

And Debian or Ubuntu users can use apt-get:

`sudo apt-get install tmux`


// MORE HERE

# tmux Terminology

A new tmux session will begin and will be given the default name (0). You can specify a name for your tmux session by including the -t flag when you start tmux:

tmux new -t development // Creates a new session called development.

### Creating a session

A session is made up of one or more

// start a session
// remove a session
// name a session
// split a window
// navigate between windows

// set up script for running dev environment automatically

## Using tmux to maintain a project's development environment

It's easy to write a bash script that can start up your development enviroment and keep it running for you.

For this blog, I use jekyll, a static site generator; sass for css preprocessing; haml for templating; git for version control; and rake to run some scripts. I had been using vim as my editor, but I've drop it (for now) in favor of Atom which has simplified my use of tmux in this project.

With those tools, I need at least 3 terminal windows: one to run jekyll, one to watch for sass changes, and one for working with git, rake, and other file system actions.

With a simple shell script, I can use a tmux session to run jekyll, sass, and display my project directory ready for git and rake commands.

The code is simple.

First, it checks to see if tmux session with the name, 'tmux_ursoop_sess' is running. If it is, then tmux just attaches to the session.

If the session doesn't exist, it's created and then run.

The creation process is pretty simple as well. The first window created starts a new session, which I've named 'editor'. Then some key commands are sent to that window. It navigates to my project directory,  lists the directory contents, and then runs the jekyll server.

Next the main window is split, creating a new window into which I load the project directory, and then run sass --watch to monitor for changes in my scss files. Finally, the window is split again, locating the project directory and and displaying it. I use that last window for running rake and git command.

I have this script set up as executable. So when I'm ready to start working, I can spin up my development server quickly and get right to coding.

Here's the full script:

```sh
tmux has-session -t tmux_ursoop_sess

if [ $? != 0 ]
then
  tmux new-session -s tmux_ursoop_sess -n editor -d
  tmux send-keys -t tmux_ursoop_sess:1.1 'cd ~/projects/ursooperduper.github.io' C-m
  tmux send-keys -t tmux_ursoop_sess:1.1 'ls' C-m
  tmux send-keys -t tmux_ursoop_sess:1.1 'jekyll serve --watch' C-m

  tmux split-window -v -t tmux_ursoop_sess
  tmux send-keys -t tmux_ursoop_sess:1.2 'cd ~/projects/ursooperduper.github.io' C-m
  tmux send-keys -t tmux_ursoop_sess:1.2 'sass --watch css/scss:css' C-m

  tmux split-window -v -t tmux_ursoop_sess
  tmux send-keys -t tmux_ursoop_sess:1.3 'cd ~/projects/ursooperduper.github.io' C-m
  tmux send-keys -t tmux_ursoop_sess:1.3 'ls' C-m
fi
tmux attach -t tmux_ursoop_sess
```
## Customizing tmux

You can customize tmux to make it
The default prefix for keybinding in tmux is ctrl-b. My prefix is `, because it's out of the way and easy to reach. You can customize this in your tmux.conf, but I'll save that for another blog post.

## Learning More!

While there are some great tmux references online, I highly recommend the book, [tmux: Productive Mouse-Free Development](https://pragprog.com/book/bhtmux/tmux), from [The Pramatic Programmers](https://pragprog.com/). Just one afternoon with this book and I felt pretty comfortable with tmux and you will too!
