---
layout: post
title: "10 Must-have Alfred Workflows for Developers"
tags:
- productivity
- tools
---

Upgrading [Alfred](http://alfredapp.com) with the PowerPack gives you access to some really great features, the best of which are workflows. Workflows extend the functionality of Alfred by allowing you to connect more directly with apps and web services. Alfred has a thriving community who create and share new workflows every day and many of them are aimed at streamlining the work of developers. So in this post, I present 10 of the best workflows to add to your development toolkit.


## Dash

![Alfred Workflow - Dash](/images/blog/alfred/alfred-workflow-dash.png)

[Dash](https://kapeli.com/dash) is a documentation browser that gives you quick access to docs for languages, libraries, and tools. You can save code snippets and bookmark documentation you use frequently.

When you've integrated Dash with Alfred, you just type ```dash``` and the term you want to look up in your documentation sources. Alfred's result list will show links to Dash documentation matches. When you select one, Dash will pop up with documentation on that topic.

[Learn more about Dash integration with Alfred](https://www.alfredapp.com/blog/productivity/dash-quicker-api-documentation-search/)

-------------------------------------------------------------------------------

## Homebrew & Cask

![Alfred Workflow - Homebrew](/images/blog/alfred/alfred-workflow-brew.png)

[Homebrew](http://brew.sh/) is the ultimate package manager for OS X. It allows you to install and manage tools like Ruby, Sinatra, and ImageMagick from a simple command line interface. [Homebrew Cask](http://caskroom.io/) is an extension of Homebrew that allows you to use that same command line interface to manage OS X applications.

The Homebrew & Cask workflow gives you access to brew and cask commands directly from Alfred. When you run one of these commands in Alfred, your terminal application opens and completes the task. Easy!

### Useful Brew Commands

| :------ | :---------- |
| ```brew install <pkg name>``` | Install a new package |
| ```brew uninstall <pkg name>``` | Uninstall an existing package |
| ```brew search <pkg name>``` | Find a package on brew |
| ```brew list``` | List all installed packages |
| ```brew update``` | Update existing brew packages |
| ```brew upgrade``` | Upgrade existing brew packages |
| ```brew doctor``` | Run tests on your brew installation and solve configuration issues |
| ```brew info <pkg name>``` | Get info about installed packages |
|  |  |

### Useful Cask Commands

| :----- | :----- |
| ```cask install <app name>``` | Install an application |
| ```cask uninstall <app name>``` | Uninstall an application |
| ```cask search <app name>``` | Searche for an app in cask |
| ```cask list``` | List all installed casks |
| ```cask update``` | Update installed casks |
| ```cask home <app name>``` | Open the homepage of a cask |
|  |  |

[Learn more & install the Homebrew & Cask Workflow](http://www.packal.org/workflow/homebrew-and-cask-alfred)

-------------------------------------------------------------------------------

## Github

![Alfred Workflow - Github - My Repositories](/images/blog/alfred/alfred-workflow-github-my.png)

I spend a lot of time on Github managing my repos and learning about other people's projects as well. So it's nice to have a way to quickly jump to various projects on Github through Alfred.

To use this workflow, you'll have to set up basic authentication so the workflow can access the Github API. There are easy instructions for this on the [workflow's Github page](https://github.com/willfarrell/alfred-github-workflow).

Once it's set up, you can run the following commands:

| :----- | :----- |
| ```git search <query>``` | Search all Github repos |
| ```git my <query>``` | Search your own Github repos |
| ```git star <query>``` | Search your starred Github repos |
| ```gist <query>``` | Search your Gists |
| ```gist create``` | Creates a new Gist |
|  |  |

[Learn more & install the Github Workflow](https://github.com/willfarrell/alfred-github-workflow)

-------------------------------------------------------------------------------

## Package Managers

![Alfred Workflow - Package Managers - apm](/images/blog/alfred/alfred-workflow-pm-apm.png)

Package managers allow you to manage apps, libraries, and frameworks from the command line. There are tons of package management systems available and this Workflow attempts to give you access to as many of them as possible.

Some of the Package Managers include: ```apm, bower, cocoapods, docker, ruby gems, grunt, gulp, npm, pear, puppet, yo```. Check out the [documentation](https://github.com/willfarrell/alfred-pkgman-workflow) for specific commands and modifiers.

[Learn more & install the Package Managers Workflow](https://github.com/willfarrell/alfred-pkgman-workflow)

-------------------------------------------------------------------------------

## man

![Alfred Workflow - man](/images/blog/alfred/alfred-workflow-man.png)

There are so many wonderful tools you can access via the command line and many of us only scratch the surface of their power. In this workflow, you can use the Unix command `man` (short for manual) to access manual pages for various Unix utilities. The workflow opens a Terminal window, HTML page, or PDF for any UNIX command.

| :----- | :----- |
| ```man <query>``` | Open the man page for the specified utility in your terminal |
| ```hman <query>``` | Open a man page in Safari |
| ```pman <query>``` | Open a man page as a PDF |
|  |  |

[Learn more & install the man Workflow](http://www.packal.org/workflow/man)

-------------------------------------------------------------------------------

## Colors

![Alfred Workflow - Colors](/images/blog/alfred/alfred-workflow-colors.png)

The Colors workflow is really helpful when you need color codes in various formats. Hexadecimal, RBG, HSL, named colors, NSColor, and UIColors are all supported. Just enter a color notation and the result list will present that color codes in all other formats. Hitting enter on a selected color format pastes it into your front-most application, while pressing ```CMD+C``` will copy the selected format to the clipboard.  

[Learn more & install the Colors Workflow](http://www.packal.org/workflow/colors)

-------------------------------------------------------------------------------

## Font Awesome

![Alfred Workflow - Font Awesome](/images/blog/alfred/alfred-workflow-font-awesome.png)

Font Awesome is a great icon font/CSS toolkit. As of this writing, there are 585 icons in Font Awesome, so it can be tricky to remember the codes for each one. Rather than hunting down the icon code you need on the website, the Font Awesome workflow lets you search icons incrementally. The result list shows the names of matched icons. If you hit enter on a selection, it will paste the code to your front-most application.

[Learn more & install the Font Awesome Workflow](https://github.com/ruedap/alfred2-font-awesome-workflow)

-------------------------------------------------------------------------------

## caniuse.com

![Alfred Workflow - caniuse.com](/images/blog/alfred/alfred-workflow-caniuse.png)

caniuse.com is a website that provides browser support information for CSS, HTML, SVG, and more. Wuth the caniuse.com workflow, just enter ```caniuse``` and the name of the element you want to look up. Matching elements on caniuse.com are shown in the result list. Selecting a result opens a browser tab with that element's browser support information.

[Learn more & install the caniuse.com Workflow](https://github.com/willfarrell/alfred-caniuse-workflow)

-------------------------------------------------------------------------------

## Faker

![Alfred Workflow - Faker](/images/blog/alfred/alfred-workflow-faker-address.png)

When you're testing forms or stubbing out data for applications you work on, it's useful to test inputs with names and addresses other than your own. The Faker Workflow provides fake names, addresses, email addresses, and more. Just enter ```faker``` followed by the type of data you want, for example: ```faker name```. The results (like 'Malachi Kuphal') are made available on the clipboard ready for pasting!

[Learn more & install the Faker Workflow](http://www.packal.org/workflow/alfred-faker)

-------------------------------------------------------------------------------

## Hacker News

![Alfred Workflow - Hacker News](/images/blog/alfred/alfred-workflow-hn.png)

Hacker News provides tech-relevant news or a distraction from work (depending on how you look at it). You can get quick access to the latest stories from Hacker News with this workflow. Just enter, ```hn``` and the result list will display the titles of the latest news. Selecting a result loads that story in your browser.

[Learn more & install the Hacker News Workflow](http://www.packal.org/workflow/hackernews-alfred)

-------------------------------------------------------------------------------

## Want more?

What are you favorite workflows? Are there developer-centric workflows you love that I should know about? [Connect with me on Twitter](http://twitter.com/ursooperduper) and let me know about your favorites!
