---
layout: post
title: "Simplifying your workspace with a minimal desktop in macOS"
crosspost_to_medium: true
date: 2016-10-10
tags:
- productivity
- macOS
- tutorials
---

Clutter is distracting. In addition to a clean, organized physical workspace in my physical workspace, I like my Mac’s desktop to share the same minimal aesthetic. I'm often asked how I customize my desktop, so this post will share the macOS customizations and apps I use to achieve this barren wonder.

![Ahhhh... A clean desktop](/images/gifs/clean-desktop.gif)

## Hide your cluttered desktop

It’s tempting to throw files on your Mac’s desktop because it’s right next to the window you’re working in. The problem with this is that the more you drag random files onto your desktop, the more unorganized you become until you're forced do a big select all and drag all your desktop items into a folder labeled, ‘To be organized TODO NEW 2’ and never touch it again.

I decided to take a different approach. I don’t want a pile of scattered icons distracting me while I’m working / watching Ghostbusters for the 50483th time.
I still use my Desktop for file storage - especially for work in progress or things I know I only need temporarily.

What's great is you can easily hide your desktop icons by entering the following into the terminal window of your choice:

{% highlight bash linenos %}
defaults write com.apple.finder CreateDesktop -bool false && killall Finder
{% endhighlight %}

Even better, you can alias this command in your .bashrc so you can easily hide and show your desktop:

{% highlight bash linenos %}
alias hidedesktop="defaults write com.apple.finder CreateDesktop -bool false && killall Finder"
alias showdesktop="defaults write com.apple.finder CreateDesktop -bool true && killall Finder"
{% endhighlight %}

Now whenever you want to see your desktop you can just enter ‘show desktop’ on the command line. Or for bonus points, you can use [Alfred](https://www.alfredapp.com) and fire off the command by entering

{% highlight bash linenos %}
> showdesktop
{% endhighlight %}

This will open your Terminal window (or favorite terminal app) and run the command. Very handy if you don’t currently have your terminal open.

![Oooooo...yes!](/images/gifs/hader-ooo.gif)

## Clean up your menu bar

Now that all those pesky icons are hidden from the desktop, we can get to cleaning up the menu bar. And this is really easy to do.

All you need is a super fantastic app called, [Bartender 2]. Bartender is a menu bar organization tool that allows you to move all your menu bar icons to another menu. You can choose what icons are moved, including macOS system tools. You can choose to hide menu bar items in Bartender’s own bar or have them hidden altogether. This is a great way to get rid of things you don’t use like the Siri, Spotlight, Notification Center, or User menu, for example.

I hide all my menu bar icons with the exception of time and the Fantastical icon. All I really need is the date and time and I’m good to go. You can see my expanded Bartender bar below and all the menu bar icons I don’t have to see cluttering my desktop.

![Bartender app](/images/blog/bartender.png)

You can set a hot key to access the Bartender bar. For me, I just hit ``CMD+SHIFT+B`` and I can see and access all my menu bar icons. If I want to toggle the menu bar to show all the icons for some reason, I just enter ``CMD+SHIFT+L``.

Bartender 2 is only $15. And it’s soooo worth it. If you’re not sure it’s for you, you can try it out first, a 4 week trial is also offered! (Thanks, [surtees studios](http://www.surteesstudios.com)!)

## Hide your dock

Now we have a clean desktop and menu bar, so why not remove more from the screen. Do you really need to see your dock all the time?

~[Nope!](/images/gifs/snl-nope.gif)

I like to remove all the icons from my dock since they can easily be launched with [Alfred](https://www.alfredapp.com) when I need them. I make the dock as small as possible and remove all apps from it, so the only apps that display on it are ones that are currently running.

![Hide that dock!](/images/blog/dock.png)

To get additional clutter off the screen, I also have the dock automatically hide so it’s not on-screen all the time getting in the way.

You can also automate the clean-up of your dock on a new install on the command line. All the cool kids are doing it.

{% highlight bash linenos %}
# Remove all apps from the dock
defaults write com.apple.dock persistent-apps -array

# Remove the auto-hiding dock delay. Hide that thing... quick!
defaults write com.apple.dock autohide-delay -float 0

# Automatically show and hide the dock
defaults write com.apple.dock autohide -bool true
{% endhighlight %}

## Wallpaper options

The last thing is wallpaper choice. With such a minimal desktop, you can do pretty much anything you want for wallpaper with no icons or extra UI to mess up your selected image. I’ve struggled with choosing the right image. Photos don’t usually cut it, there are minimal desktop images like those found at simple desktops, but none of them seem to stick for me. So for now, until I make my own wallpaper, I went for the most simple and minimal option - a solid gray. Done.

![Minimal, uncluttered desktop](/images/blog/empty-desktop.png)

## Et la, voila!

And with that, we have an extremely simple and minimal desktop, free of clutter and distraction. Now you can get your work on!
