---
layout: post
title: "Forget Finder: Navigating Your File System with Alfred"
date: 2015-11-04
tags:
- productivity
- tools
---

Becoming an [Alfred](http://alfredapp.com) power user requires time, a little patience, and getting to know the Preferences dialog or documentation on Alfred's website. Fun! However, I do realize that most people don't get excited about documentation the way I do, so in this post I introduce using Alfred to navigate your file system and helping you level-up your Alfred skills!

![A dog who jumps into a pile of leaves to retrieve a ball.](/images/gifs/dog-leaves.gif)

## Basic Search and Retrieval

The first set of commands are really simple and are a part of the basic Alfred installation (free). Suppose you are working on a poster called "movie-poster.ai" (let's face it, it's probably called,  "movie-poster-final-final-final-01.ai"). Because you know the name of the file (or at least part of it), you can enter ```open movie-poster.ai``` in Alfred to open the artwork.

![Opening a file with Alfred](/images/blog/alfred/alfred-open-file.png)

If for some reason you wanted to show the file in Finder, instead of typing ```open```, you'd type ```find movie-poster.ai```.

Now imagine you're looking for a document that includes a particular phrase or word. You can search the contents of files by entering ```in``` followed by the words you want to find. The documents that contain those words will be shown in Alfred's result list.

So there are three simple keywords to remember:

| ---- | ------ |
| ```open <filename>``` | Opens file in its default application |
| ```find <filename>``` | Locates the file in Finder |
| ```in <words to locate>``` | Find files with the specified words in its content |
|  |  |

## Navigating Your File System (*not a euphemism*)

Of course, you can't always recall the name of a file or you need to browse a list of files to find what you're looking for. I do this when selecting animated gifs for this blog. I'm not sure which gif I want to use, I browse through a list of them I've collected and wait for inspiration to strike!

![IMAGE](/images/gifs/idea.gif)

It's important to note that the features described below only work if you upgrade to Alfred's PowerPack. For this great navigation feature set alone it's worth the price.

To get started exploring your file system with Alfred, just press ```/```.

![Alfred's input display showing file system](/images/blog/alfred/alfred-file-system-1.png)

Displayed in Alfred's result list is your file system, starting at the root directory. If you press ```~``` instead of ```/```, it will display your home directory. From there, you can navigate through system folders to locate a file or directory.

This is where Alfred's navigation tools get really awesome. Imagine you need to move a screenshot from your desktop to your blog's image folder. Sure, you can do that from iTerm on the command line, or using Finder by opening two tabs, locating both folders (origin and target) and then dragging the image to its new location. But, boring.

![Bored](/images/gifs/bored.gif)

With Alfred's navigation tools you don't need to do that. Just hit ```~``` to open your home directory, type "Desktop" (you can use tab for autocompletion too!), and then browse the list of files on your Desktop.

Hitting the ```SHIFT``` key on a highlighted file allows to you to get a closer look at it with Preview.

When you locate the file you want to move, hit the ```RIGHT ARROW``` or ```OPT + CMD + \``` keys and you'll see a list of actions you can take on the file. With installed Workflows, you can expand this list (but I'll talk more about that in a blog post on Workflows). For now, all we want to do is move the file to the blog.

You can use the arrow keys or ```CMD + <#>``` to select 'Move To...' from the result list. Then you'll see a list of recently accessed folders. If one of them matches where you want to move the file, you can select it and you're done. If not, begin typing the location where you want to move the file (again, you can use autocomplete by tabbing to speed this up). When you have the right path, just hit enter and the file is moved!

There are lots of actions you can take on files this way:

* Email it to someone
* Open it with a specific application
* Copy its path to the clipboard
* Copy/Move/Delete
* Opening a Terminal window at its location

You can control which default actions you see by opening the Preferences Dialog, clicking the Features button, then File Search, and finally, selecting the Actions tab. There you can disable the default actions you don't need.

![File Search Actions in the Alfred Preferences dialog](/images/blog/alfred/alfred-prefs-file-search-actions.png)

## Buffers

It wasn't until recently that I realized file system navigation with Alfred is even more powerful and that's through its Buffers feature.

The Buffer is a stack system that lets you use the navigation techniques I've described above to gather a stack of files and perform actions on them as a group.

When selecting a file in Alfred's results, you can add it to the Buffer by pressing the ```OPT + UP ARROW``` keys. You'll see a tiny icon added to Alfred's display indicating the file is in the Buffer.

![Alfred's Buffer](/images/blog/alfred/alfred-buffer.png)

If you add a file by to the Buffer by mistake, you can remove it by pressing ```OPT + LEFT ARROW```.

If you are running through a list of files and want to easily add multiple files in succession, press ```OPT + DOWN ARROW``` to select the highlighted file and move the selection focus to the next file in the list.

Once you have collected a number of files in the Buffer, you can perform an action on all of them by pressing ```OPT + RIGHT ARROW```

![Alfred Buffer actions](/images/blog/alfred/alfred-buffer-actions.png)

After you've performed the desired action on the files in the Buffer, it is cleared. You can also set a preference that will clear the Buffer if no action is taken in 5 minutes.


### Practice Makes Perfect

As with any new commands you want to learn, I find it helpful to jot down shortcuts on a post-it note and then stick it to my monitor. Then I commit to using the shortcuts to perform those actions until I have them memorized and integrated into my daily routines.

That's it for now, stay tuned for more in this Alfred series with a post (or two) on Workflows!
