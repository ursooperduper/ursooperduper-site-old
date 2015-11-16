---
layout: post
title: Creating Snippets for Atom
date: 2015-11-16
tags:
- tools
- tutorials
---

Do you ever find yourself typing things repetitively in [Atom](http://atom.io)? Or maybe you forget the exact syntax for a particular language or framework? If so, you can save yourself a lot of time and typos by building a library of snippets. In this post, you'll learn what a snippet is and how to create your own in Atom.

## What is a Snippet?

A snippet is a small piece of a code that can be inserted into a document in Atom with simple keystrokes. Snippets are triggered with the keyboard shortcut, ```OPT + SHIFT + S```. A list appears with Snippets supported by the file type (language) you have open. Each snippet has a prefix (shortcut) that you can use to quickly insert a snippet instead of searching for it in a long list. You simply trigger snippets with ```OPT + SHIFT + S``` followed by the snippet's prefix and hit ```Enter```.

Many Atom packages include snippets as well. For example, when you create an HTML document, you can insert a minimal HTML template with the prefix, ```html-min```. The next time you're working on a file in Alfred, check out the snippets already available to you by triggering the snippet list and exploring the results.

## The Snippet Deconstructed

It turns out that making your own snippets is really easy in Atom. But before we make one of our own, let's look at the syntax for creating a custom snippet.

In your ```~/.atom``` directory is a file called ```snippets.cson```. It's in this file that you'll write your snippets. Here's an example snippet:

{% highlight yaml linenos %}
 '.source.coffee':
   'Console log':
     'prefix': 'log'
     'body': 'console.log $1'
{% endhighlight %}

Let's examine this line by line:

1. On line one, the source language is identified. We'll look at how to properly identify a source in the next section when we create our own snippet.

2. Next is the name of your snippet.

3. The prefix is the shortcut you want to use to access the snippet.

4. The body is where the actual code you want to insert is contained. Inserting ```$1``` places a tab stop at this location in your inserted code. This means you can tab through a piece of code to include customizations.

Pretty simple, isn't it?

![Emma Stone gets it!](/images/gifs/emma-stone-gets-it.gif)

## Creating Your First Snippet

Now let's work through a simple example. I'm working on a new project involving keyboard shortcuts which are all organized in YAML files. A keyboard shortcut entry looks like this:

{% highlight yaml %}
- shortcut:
  desc:
{% endhighlight %}

Short and sweet. But I need to write this for each shortcut entry and you wouldn't believe how many times I've misspelled shortcut as I built out these data files. With a snippet I could paste this into my document with a quick keystroke and then just fill in the required shortcut and description.

So with this simple use case, let's build a simple snippet.

First, open the ```snippets.cson``` file which is located in ```~/.atom```. In this file you'll see a short explanation of what snippets are as well as an example. You'll also learn that you can use a snippet to create a snippet! Just enter: ```OPT + SHIFT + S``` then ```snip``` and a snippet template will be inserted into the file.

{% highlight yaml %}
'.source.js':
  'Snippet Name':
    'prefix': 'Snippet Trigger'
    'body': 'Hello World!'
{% endhighlight %}

First, you need to identify the '.source' for your snippet. This means identifying the language for which your snippet will be available. The easiest way to get the right syntax for the .source is to open Atom's settings (```CMD + ,```) and go to the Packages tab. In the filter input field, type ```language``` to see all the language packages for your Atom install.

![Atom Settings - Packages](/images/atom/atom-packages-filter-language.png)

My snippet is for YAML files, so I need to find the Language-YAML package in the list. Once found, you click the Settings button for that package. In this case, on the Language YAML settings page, locate the YAML Grammar section and the first line underneath the header is the source: ```Source: source.yaml```.

![Atom Settings - Language YAML Settings](/images/atom/atom-package-yaml-source.png)

Back in the ```snippets.cson``` file you can specify the correct source and fill out the rest of the snippet:

{% highlight yaml %}
'.source.yaml':
{% endhighlight %}

On the second and third line, you'll give your snippet a name and a prefix (shortcut). I'll call my snippet 'Cheatsheet Shortcut' and give it a prefix of 'cs'. Before assigning a snippet, it's a good idea to make sure that prefix you want to use isn't already taken by a snippet for that language. To check this, enter the shortcut to access snippets, ```OPT + SHIFT + S``` and look at the list of snippets displayed. The top line displays the assigned prefix for each snippet available for that language. For my cheatsheet snippet, I'll assign the prefix, 'cs'.

{% highlight yaml %}
'.source.yaml':
  'Cheatsheet Shortcut':
  'prefix': 'cs'
  'body': ''
{% endhighlight %}

Next is the fun part, adding in the code you want to insert when the snippet is accessed. To achieve the format I showed at the beginning of this tutorial, my snippet body would look something like this:

{% highlight yaml %}
- shortcut: \n\tdesc: \n
{% endhighlight %}

That looks pretty good, but it would be cool if the snippet were a bit more interactive. Like move the cursor to enter text where I need it. Luckily, this is also very easy to do. You can place tab stops using the format $[num]. Then when you insert that snippet, you can tab through the text filling out relevant details. My snippet body now looks like this:

{% highlight yaml %}
- shortcut: $1\n\tdesc: $2\n$0
{% endhighlight %}

Putting a ```$0``` at the end of the snippet means the last tab stop will be at the end of the inserted code.

By the way, if you work directly in your snippets.cson file, when you hit save, your snippet should be immediately available in the snippet menu. I find it useful to keep a working document open, in the file type of my snippet, so I can test it as I work.

With the body complete, my snippet is complete and looks something like this:

{% highlight yaml %}
'.source.yaml':
  'Cheatsheet Shortcut':
  'prefix': 'cs'
  'body': 'shortcut: $1\n\tdesc: $2\n$0'
{% endhighlight %}

Though not necessarily useful for a snippet as simple as this one, you can also include placeholder text when you set up your tab stops. As you tab through the inserted code from the snippet, the placeholder text will highlight, ready to replaced by your input. To do that, you modify the tab stops shown above slightly:

{% highlight yaml %}
shortcut: ${1:shortcut}\n\tdesc: ${2:description}\n$0
{% endhighlight %}

Also, if you're working on a larger snippet and don't want to fuss with \n and \t for layout, you can create multiline snippet bodies by include three ```"``` in a row before and after the snippet body, like this:

{% highlight yaml %}
'body': """
  - shortcut: $1
    desc: $2
  $0
"""
{% endhighlight %}

That should get you going with Snippets for Atom. Snippets have all sorts of great use cases and I'd love to check out some of your favorite custom snippets. Share them in the comments below or [on Twitter](http://twitter.com/ursooperduper)!
