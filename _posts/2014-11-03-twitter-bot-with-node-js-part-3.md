---
layout: post
title: "Creating a Twitter bot with Node.js: Part 3 - Deploying your Twitter bot"
date: 2014-11-03
tags:
- Twitter
- bots
- projects
- Node.js
- API
- Wordnik
- JavaScript
- Heroku
- tutorials
---

Thanks for all the great feedback on my [last blog post, reviewing the code for my Twitter bot]({{ site.url }}/2014/10/28/twitter-bot-with-node-js-part-2.html). I'll be sure to include more code deep dives in future posts. In this, the third and final post in the series on creating a Twitter bot, I'll share how I deployed my Twitter bot.

Figuring out how to deploy a bot took several attempts because there are so many ways to do it. As first, I added a tiny Node-based web framework to my bot, which allowed me to call a URL that triggered the bot's main loop. To automate the URL being requested, I used an uptime-reporting site to ping the bot's URL once an hour. But finding free hosting for a node app that wouldn't automatically shut down or go idle after an hour was tricky, so I abandoned this approach.

Luckily, I found a much easier way to host my bot, which is both free and simple to set up.

![Excited!](/images/gifs/excited-wiig.gif)

## Heroku to the rescue!
By far, my favorite application platform is Heroku. It's an affordable, easy to use service with a well-documented CLI (command line interface) that's pure joy to work with. Heroku has great how-to guides available to deploy just about any sort of application. In my case, I used the [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) doc. That doc is good enough to get you most of the way there deploying your bot, but I'll summarize the steps below as well since there are a few differences.

If you have a Heroku account, log in via the CLI. If you don't have one, [create a free account](https://signup.heroku.com/dc) and install the Heroku Toolbelt (CLI).

Once you're authenticated with Heroku and have initialized a git repo in your project directory, just run `heroku create <your-app-name>` and an app is created for you on Heroku. If you don't specify an app name, one will be created for you - something epic and awesome like ike blue-fire-beard-mountain-goat-rainbows.

At the same time, Heroku sets up a git remote that's tied to your git repo. You can deploy your app by running `git push remote master`.

## Set up environment variables

If you set up local environment variables to store private keys for your bot, you'll need to set those up on Heroku as well. Like everything else, this is very easy to do. From your project directory, use `heroku config:set <KEYNAME>=<KEY>` for each key you need to include in your app. For example:

{% highlight bash %}
$ heroku config:set TWIT_ACCESS_TOKEN=9999999999999
{% endhighlight %}

You'll receive a confirmation message once the config has been set. You can review the environment variables you've set by running, `heroku config`. I encourage you to [read more about managing environment variables on Heroku](https://devcenter.heroku.com/articles/config-vars)  as well for a better overall understanding of how to work with configuration variables.

Next, you'll need to create a package.json file if you haven't done so already.

## Package.json

If you've built Node.js apps before, you already know that you need a package.json file. But if you're new to the game and haven't created this file yet, do not fret!

Assuming you're in your project directory, run `npm init`. You'll be asked a few questions about your app like the name, version, and a description. You'll also be asked to specify the entry point, which is the file that runs your bot's main loop. Once you've answered all the questions, a package.json file is created for you. You can open that file and easily modify its contents as your app changes.

The other thing your package.json file needs is a list of your app's dependencies - all the modules you've used to make your bot awesome. The easiest way to add those modules to your package.json file is to run the command, `npm install <module-name> --save`.

The `--save` flag installs the module for you and adds it to your package.json file as well.

Keep in mind this is all assuming a very basic appm, like our Twitter bot. If you have a more complicated Node.js app, I highly recommend checking out the [interactive package.json guide](http://browsenpm.org/package.json), the [npm package.json docs](https://www.npmjs.org/doc/files/package.json.html), and [npm-install docs](https://www.npmjs.org/doc/cli/npm-install.html).

Here's the very basic package.json file for my Twitter bot, @PickTwoBot:

{% highlight json %}
{
  "name"            : "picktwobot",
  "version"         : "1.0.0",
  "description"     : "A Twitter bot that reminds you that you can't have everything.",
  "main"            : "bot.js",
  "scripts"         : {
                        "start" : "node bot.js"
                      },
  "dependencies"    : {
                        "async"             : "^0.9.0",
                        "lodash"            : "^2.4.1",
                        "node-rest-client"  : "^1.4.1",
                        "twit"              : "^1.1.18",
                        "wordfilter"        : "^0.1.7"
                      }
}
{% endhighlight %}

Now when you push to Heroku, your Node.js app will be detected and the dependencies listed in your package.json will be installed. Next, you need to set up a Procfile to properly run your bot on Heroku.

## Create a Procfile

A [Procfile](https://devcenter.heroku.com/articles/procfile) is located in your project's root directory and it tells the server what sort of app you're running and the command that runs the app.

The default Node.js gettings started docs explain that you should define a process type of `web`, but in our case, without a web interface to our Twitter bot, we need a different type of single process type.

There are a variety of process types that can be defined in a Procfile, but for something really simple like our Twitter bot, we just a need a [worker](https://devcenter.heroku.com/articles/background-jobs-queueing). A worker is a background job that can run outside a user-initiated request/response cycle.

The Procfile for @PickTwoBot looks like this:

{% highlight bash %}
worker: node bot.js
{% endhighlight %}

## Run the bot's main loop once an hour

In order to run the bot once an hour, we need a to add a small piece of code to the bot.js file that will attempt to run the main loop once an hour. A simple JavaScript setInterval() function will do the trick:

{% highlight javascript %}
setInterval(function() {
  try {
    run();
  }
  catch (e) {
    console.log(e);
  }
}, 60000* 60);
{% endhighlight %}

## It's alive!

If you've made all these updates and pushed everyting to Heroku, your app is **READY TO RUN!**

![The bot is ready!](/images/gifs/oprah-excited.gif)

Each time you push to Heroku, your package.json and Procfile will be detected and run. So with your new Procfile deployed, your app should start running right away. You can check that it's running with the command: `heroku ps`.

You should see something like this:

{% highlight bash %}
$ heroku ps
=== worker (1X): `node bot.js`
worker.1: up 2014/11/02 23:42:31 (~ 12h ago)
{% endhighlight %}

If your Node.js app isn't running, you can do some investigation by checking the logs:
`heroku logs -t`

## Tweeting!

With any luck, you've now deployed and have a running Twitter bot! I've created two bots so far. The first, [@PickTwoBot](http://twitter.com/picktwobot), is the bot discussed in this series of blog posts. It spews forth such gems as:

![Pick Two Bot Tweet](/images/blog/picktwobot.png)

I've also created a new bot - a sort of homage to Charles Dickens, named  [@TaleOfTwoTweets](https://twitter.com/taleoftwotweets). This bot looks for two tweets, one with the word 'best' in it, the other with the word, 'worst' in it. It then looks at the word in those tweets that follows after 'best' or 'worst' and constructs a tweet in the format, "It was the best of <word>, it was the worst of <word>." Here's an example:

![Tale of Two Tweets Bot Tweet](/images/blog/taleoftwotweets.png)

And so, that wraps up my series on creating your own Twitter bot. If you create a bot, I'd love to check it out. Include a link to your bot below or @ me on [Twitter](https://twitter.com/ursooperduper)!
