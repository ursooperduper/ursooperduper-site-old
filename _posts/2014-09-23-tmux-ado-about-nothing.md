---
layout: post
title: "tmux Ado About Nothing"
date: 2014-09-23
tags:
- productivity
- tmux
- tools
- tutorials
---

As I've been writing more code (yay!), the number of terminal windows and/or tabs I need to manage is growing (boo!). Sass is watching one window, jekyll monitoring another, and a server log in another. Switching back and forth between tabs all day is not ideal and I'd like to be able to see everything in one place. So while I've avoided it in the past due to its perceived complexity, I decided to learn tmux.

![learning - image of a chick wearing roller skates](/images/learn-to-skate.gif)

But surely there are other ways of solving this problem, you say?

Absolutely. I could make each terminal tab a separate window and arrange those windows on screen however I'd like. But that's time consuming and not easily repeatable between sessions.

I could also manage my setup in [iTerm](http://iterm2.com/) (my terminal of choice) by splitting terminal windows into panes and save their arrangement. Then I could create separate profiles for each pane and save those as well. But that involves a lot of tweaking and settings in different places.

I could use [screen](http://www.gnu.org/software/screen/) to do this, but I heard all the cool kids use tmux, so I'm hoppin' on board that train! (Is that what the cool kids say?)

## What is tmux?

[tmux](http://tmux.sourceforge.net/) is a terminal multiplexer.

### Great. What's terminal multiplexing?

[Terminal multiplexing](https://en.wikipedia.org/wiki/Terminal_multiplexer) (sometimes referred to as muxing - all the kids are doing it!), is the use of a single terminal window to display multiple terminal sessions. There are some really cool benefits to *muxing*, including being able to easily share sessions with others, have many windows open at once, and persistence. If you start a tmux session on a remote machine, then detach from it when you sign out, it's still running in the background anxiously awaiting your return. The next time you connect, you simply reattach to your session and pick up where you left off. Hurray!

![Yes! News team celebration!](/images/anchorman-newsteam-yes.gif)

## How I use tmux

You can do a lot with tmux, but my favorite thing is to set up scripts that connect to or set up  my development environment for a given project. Many tmux commands are scriptable, which allows  you to configure a tmux session that you can run whenever you need it. This means you spend less time setting up your terminal and more time making things that are awesome. I'll show how I do that after a quick tmux primer.

## Getting started with tmux

If you don't already have tmux installed and you're a Mac user, install it with [Homebrew](http://brew.sh/):

`$ brew install tmux`

Debian or Ubuntu users can use apt-get:

`$ sudo apt-get install tmux`

#### Creating  a session & adding windows to it

To create a session, you enter `$ tmux new` and a new session will launch with the default name (0). You can also specify a name for a tmux session by including the -t flag:

`$ tmux new -t development`

A session is typically made up of one or more windows and one or more panes. Windows in tmux are like tabs in your browser. You can add and switch between as many as you like. Within a window, you can add one or more panes (windows in windows!):

`PREFIX + %` Creates a new pane by splitting the current one in half vertically.

`PREFIX + "` Creates a new pane by splitting the current one in half horizontally.

#### Wait, what does PREFIX mean?

In a tmux session, you enter commands by first entering a PREFIX and then the desired command. The default PREFIX is `ctrl-b`. So to split a window as described above, you enter `ctrl-b + %` in your tmux session. You can remap the PREFIX to whatever you'd like in your tmux configuration file (.tmux.conf). My PREFIX, for example, has been remapped to `.

#### Leaving & joining tmux sessions

If you need to detach (exit) your tmux session, you don't need to quit out of each window. Instead, enter `PREFIX + d` and you will detach from your tmux session, leaving it running in the background.

To see which tmux sessions are currently running, enter:

`$ tmux list-sessions` or `$ tmux ls`

This lists all your running tmux sessions, like so:

![terminal screenshot showing tmux ls command](/images/tmux-ls.png)

The above image shows I have two tmux sessions running: 1 and blog and the date they were created.

Next, to reattach to a tmux session, enter:

`$ tmux attach -t <session_name>`

For example, `$ tmux attach -t 1` will reattach me to the session named 1.

Likewise, to remove a tmux session, enter:

`$ tmux kill-session -t <session_name>`

For example `$ tmux kill-session -t 1` will remove the session named 1.

#### Navigating within a tmux session

Mouse support isn't enabled by default in tmux and it's actually faster to navigate using the keyboard. Doing this is easy:

`PREFIX + UP/DOWN/LEFT/RIGHT` Navigates around panes within a window

If you have multiple windows, you can move between them easily too:

`PREFIX + n` Goes to the next window

`PREFIX + p` Goes to the previous window

`PREFIX + 0..9` Goes to the a specific window number

There's so much more tmux information I could cover including additional layout, organization, and navigation commands, but I think what I've covered here is good enough to get you started. So let's move on to my development environment set up.

## Using tmux to set up project dev environments

It's easy to write a script that loads up a development environment and keep it running for you. This means you don't have to repeat the same steps every time you want to work on a project.

For example, to build and edit this blog, I use jekyll, a static site generator; sass for css preprocessing; haml for templating; git for version control; and rake to run some scripts. I had been using vim, but I've drop it (for now) in favor of [Atom](https://atom.io/) (because it's new and shiny) and this has simplified project's tmux setup since I don't need a big editing window available.

So I need at least 3 terminal windows: one to run jekyll, one to watch for sass changes, and one for working with git, rake, and other file system actions.

![iterm and tmux](/images/tmux-terminal.png)

Above is a screenshot of what my iTerm window looks like with my blog's tmux session running.  And below is the simple script I use to set it up:

{% highlight sh %}
tmux has-session -t blog

if [ $? != 0 ]
then
  tmux new-session -s blog -n editor -d
  tmux send-keys -t blog:1.1 'cd ~/code/ursooperduper.github.io' C-m
  tmux send-keys -t blog:1.1 'jekyll serve --watch' C-m

  tmux split-window -h -t blog:1.1
  tmux send-keys -t blog:1.2 'cd ~/code/ursooperduper.github.io' C-m
  tmux send-keys -t blog:1.2 'ls' C-m

  tmux split-window -v -t blog:1.1 -d
  tmux send-keys -t blog:1.3 'cd ~/code/ursooperduper.github.io' C-m
  tmux send-keys -t blog:1.3 'sass --watch css/scss:css' C-m
fi
tmux attach -t blog
{% endhighlight %}

Let's review the script in pieces.

First, it checks to see if a tmux session with the name, 'blog', is running. If it is, then tmux just attaches to the session:

{% highlight sh %}
tmux has-session -t blog
...some code...
tmux attach -t blog
{% endhighlight %}

If the session doesn't exist, it's created and then run:

{% highlight sh %}
if [ $? != 0 ]
then
  tmux new-session -s blog -n editor -d
  ... some code ...
fi
tmux attach -t blog
{% endhighlight %}

This creates a new session called 'blog' with a window named 'editor'.

To set up the meat of the session, three window panes are created, the first is created above when we intialize the new tmux session "blog". From there, it sends key commands to execute in the newly created pane. In this case it's navigating to a project directory and running jekyll:

{% highlight sh %}
tmux new-session -s blog -n editor -d
tmux send-keys -t blog:1.1 'cd ~/Dropbox/code/ursooperduper.github.io' C-m
tmux send-keys -t blog:1.1 'jekyll serve --watch' C-m
{% endhighlight %}

Next, the window is split creating a second pane:

{% highlight sh %}
tmux split-window -h -t blog:1.1
tmux send-keys -t blog:1.2 'cd ~/Dropbox/code/ursooperduper.github.io' C-m
tmux send-keys -t blog:1.2 'ls' C-m
{% endhighlight %}

Similar to the first window pane, the second sends key commands to navigate to the project's directory and then displays a directory listing. Easy.

*Important to note from the code snippets above is that specific identifiers are assigned to the windows. The first is blog:1.1 and the second is blog:1.2. The identifiers are an important part of understanding how a tmux session is organized. The key looks like this:*

`<session_name>:<window_num>.<pane_num>`

*From the code above, for example, the second pane is located in the session named 'blog', in window 1, pane 2.*

The third and final pane again navigates to the project directory and then runs the sass service to watch for changes to my scss files:

{% highlight sh %}
tmux split-window -v -t blog:1.1 -d
tmux send-keys -t blog:1.3 'cd ~/code/ursooperduper.github.io' C-m
tmux send-keys -t blog:1.3 'sass --watch css/scss:css' C-m
{% endhighlight %}

And that's it! I have the script set as executable (`chmod +x <filename>`). So when I'm ready to start working, I can spin up my development server quickly and get right to coding.

### Bonus!
Though not tmux-specific, but speed and efficiency related, I've also created an alias in my .bashrc file that allows me to enter `$ blog` in my terminal to execute the tmux script above. Instant development environment when I get ready to start work for the day!

`alias blog='cd /code/ursooperduper.github.io && \. tmux-ursoop-sess'`

![High five!](/images/tina-fey-high-five.gif)

## Before I go, a few shortcuts

I'm working on a gist with tmux shortcuts, but until that's ready, here are some of my most-used tmux shortcuts:

`PREFIX + x` Toggles a zoom in/out of the selected pane giving it full screen display.

`PREFIX + o` Cycles through open panes.

`PREFIX + q` Momentarily displays the number associated with each pane.

`PREFIX + c` Creates a new window in the current session.

`PREFIX + <space>` Cycles through various pane layouts.

## Customizing tmux

You can customize tmux to add more definition and color to each of your windows, customize your key-bindings, allow mouse interactivity, and so much more. If you're curious about tmux after reading this, it's definitely worth learning more about customization because makes tmux even more fun to use (and much better looking!).

## Ready to learn more?

There are some great tmux references online, but I highly recommend the book, [tmux: Productive Mouse-Free Development](https://pragprog.com/book/bhtmux/tmux), from [The Pramatic Programmers](https://pragprog.com/). It's a quick and easy read that will have you using tmux like a pro in just an afternoon!

Having fun muxing!
