---
layout: post
title: "Creating a Twitter bot with Node.js: Part 1 - Setting up"
date: 2014-10-27
tags:
- Twitter
- bots
- projects
- Node.js
- API
- Wordnik
- JavaScript
- tutorials
---

I recently watched a [talk by Darius Kazemi from the 2014 XOXO Festival](https://www.youtube.com/watch?v=l_F9jxsfGCw&). In the video Darius talks about side projects, of which he completed over 70 last year. He's created bots that [mash-up article headlines](https://twitter.com/TwoHeadlines), create [flow charts and venn diagrams](https://twitter.com/AutoCharts), and even make [random Amazon purchases](http://randomshopper.tumblr.com/post/35454415921/randomized-consumerism).

Inspired, I decided to build my own Twitter bot this weekend. Doing that took a slightly longer than I would have liked, but I learned a lot of great tricks along the way so I thought I'd share what I learned in a three-part post extravaganza!

In this first post, I'll walk through everything you need to set up and configure before you get started actually coding your bot.

I'm excited. You're excited. So let's get started!

![Excited!](/images/gifs/excited-fan.gif)

## Creating a new Twitter Account

The first step to creating a Twitter bot is creating a [new Twitter account](https://twitter.com/signup) for said bot. If you already have a Twitter account, the new bot account will need a unique email address.

### A Unique Email Address without creating a new email account

I recommend not creating lots of dummy email addresses each time you want to create a new bot. It's a hassle tracking all those email addresses and there's a much easier way. Instead, you can easily add a modifier to your existing email address.

For example, if your email address is `llama@gmail.com`, you can use the address, `llama+twitterbot@gmail.com`. The addition of the `+` modifier to your existing email will look like a unique address to Twitter.

(Update 2014-10-28: *It was pointed out to me that the above +modifier approach only works for Gmail accounts. So if you don't use Gmail, you'll need to create new, unique, email addresses.*)

Once you've chosen a handle and email address for your bot in the Twitter sign-up process, you'll receive an email asking you to verify your account. Follow the link in the email you receive to get that step out of the way. It'll matter when you want to sign up for Twitter API keys.

### Verify your phone number with Twitter

You may also be asked to verify your phone number with Twitter during the sign-up process. You shouldn't skip this step, because without that verification, you'll only have read access for your new bot (and it would be nice if your fancy new Twitter bot could actually tweet).

As with an email address, Twitter also requires the phone number provided be unique. But what if you've already associated your phone number with another Twitter account? Never fear. The next step is a pain, but it works.

First, log in to your normal Twitter account, go to [Device Settings](https://twitter.com/settings/devices) and remove your phone number from the account. Then log back in to Twitter with your new bot account and add the phone number in Settings. You'll receive a vertification code via txt. Now when you set up your Twitter API access, you'll be able to set up read+write access for your bot.

## Create a new Twitter App

You'll need a set of API keys to allow you bot to do cool things with Twitter, so visit [apps.twitter.com](https://apps.twitter.com) to create a new Twitter App. There, you'll specify a few details about your app (*note: you don't need a callback URL for the bot, so you can skip that optional field*) and agree to the Twitter Developer Agreement.

Providing you've verified your email address, you'll arrive at the Application Management page for your new bot. This is where you'll get your Twitter API keys. On the Details tab, if you scroll down to view your Appliation Settings, you'll notice your app's access level is currently set to read-only. Oh noes!!

![Oh noes!](/images/gifs/ohnoes-dog.gif)

### Set read and write access for your bot

Luckily it's easy to change permissions for you bot (provided you've verified your phone number), just select the 'modify app permissions' link. On the Permissions page that follows select 'Read and Write' on the Access form. Select 'Update Settings' and your permissions will be updated.

### Generating Twitter API keys

Now visit the Keys and Access Tokens tab in Application Management and you'll find your Consumer Key and Consumer Secret. But in order to make API calls right away, you'll also need to create access tokens. Scroll to down the page and you'll see a button labeled, 'Create my access token'. Click that, the page will refresh, and when you scroll down the page now, you should see an Access Token and Access Token Secret. Copy all four keys from this page and save them somewhere safe.

That takes care of the Twitter set up for your bot!

## Getting a Wordnik API Key

The Twitter bot I created needs to identify nouns in the tweets it grabs and Wordnik provides an API perfect for this very task.

To get an API key, you'll first need to create a Wordnik account. After that, you can sign up for an API key by visiting [Wordnik's developer site](http://developer.wordnik.com). If you've used the Wordnik API before, I think you can just use the same API key again because the existing developer sign-up flow limits one API key per Wordnik username. Once you've got the Wordnik API key, save that somewhere safe as well.

Next, you'll install the tools you'll use for development.

## Installing Node.JS

My Twitter bot is built as a Node.js app. Node.js allows you to build network applications quickly with JavaScript and is extremely easy to install and start using. On OS X, I recommended using Homebrew to install, like this:

```
brew install node
```

Non-homebrewers can find download information for their systems on the [Node.js website](http://nodejs.org/download/). When you install Node.js, it also installs the Node Package Manager (npm), which works just like Homebrew, Rubygems, or Pip. With Node.js and npm installed, you can now set up any packages you want to use for the bot.

## Create a project directory for your bot

I suppose this goes without saying, but you'll now create a project directory for your bot wherever you plan to work on it. Once you've done that, jump into that project directory.

## Set up your package.json file

Every Node.js app should have a package.json file which provides information about the app and its dependencies. npm has a tool to help you create this file, accessed from the command line:

```
npm init
```

Through a simple CLI, you'll be asked a series of questions about your app and once complete, a basic package.json file has been created for you. You can always edit that file if/when you need to. You'll most often update it when you add any Node.js modules to your project. And this is what we'll do next.

## Installing useful Node.js Modules

The Twitter bot I wrote uses a few useful Node.js modules that I'll explain below. You may need different modules depending on what you're going to do with your bot, but the following are some good ones that are useful in most projects:

### async

[async](https://www.npmjs.org/package/async) provides functions and patterns to help manage asynchronous code. It's a great tool to have available when making API requests that might not return data immediately. Install it and automatically add it to your package.json, like this:

```
npm install async --save
```

### lodash

[lodash](https://www.npmjs.org/package/lodash) is a [low-level utility library](https://lodash.com) for Javascript that is best explained as awesome and you should just use it. It makes JavaScript a little less icky. Install:

```
npm install lodash -- save
```

### node-rest-client

[node-rest-client](https://www.npmjs.org/package/node-rest-client) is a Node.js API REST client which makes it easy to connect to any API REST and access the results as JavaScript Objects. Install:

```
npm install node-rest-client --save
```

### twit

[twit](https://www.npmjs.org/package/twit) is a Twitter API client that supports REST and Streaming. It makes searching for tweets and posting so easy it would be a crime not to use it. Install:

```
npm install twit --save
```

### wordfilter

wordfilter is a small, but extremely useful module that filters strings for bad language. Very useful to make sure your bot isn't spewing hate. Install:

```
npm install wordfilter --save
```

![Iron Man is ready to part two.](/images/gifs/ironman-ready.gif)

## Ready for part two - Twitter bot coding fun!

At this point, you've set up all the essentials tools you'll need to create your own Twitter bot. In the next post, I'll review the code for my own Twitter bot, [@PickTwoBot](https://twitter.com/picktwobot), so you can see how I coded my own Twitter bot.

*Updated: 2014-10-28 - Regarding email modifiers only being available via Gmail.*
