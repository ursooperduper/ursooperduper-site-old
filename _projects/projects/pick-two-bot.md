---
layout: page
title: Pick Two Bot
data: pick-two-bot
thumb: pick-two-bot.jpg
---

{% include project-meta.html proj=page.data %}


Inspired by the bots created by Internet artist, [Darius Kazemi](http://tinysubversions.com/projects), I wanted to learn about building and deploying Twitter bots.

Pick Two Bot, my first Twitter bot, is based on the project management triangle: "good, fast, cheap: pick two". The bot queries Twitter for a random recent tweet that includes three nouns and reformats them in the following way: "{noun}. {noun}. {noun}. Pick two." Below is an example.

![Tweet: Bacon. Cheeseburger. Love. Pick two.](/images/work/bots/pick-two-bot.jpg)


The bot uses the [Worknik API](http://developer.wordnik.com) to identify the parts of speech in a given tweet and then formats them in the singular form.

The bot runs as a [Node.js](https://nodejs.org) app and as a worker on [Heroku](https://heroku.com)> It fails silently if it doesn't find a Tweet with 3 nouns. It just tries again in the next time interval.

To learn more about how the bot was created, see my three-part blog series on creating a Twitter bot:

* [Creating a Twitter bot with Node.js: Part 1 - Setting up](/2014/10/27/twitter-bot-with-node-js-part-1.html)
* [Creating a Twitter bot with Node.js: Part 2 - Writing the code](/2014/10/28/twitter-bot-with-node-js-part-2.html)
* [Creating a Twitter bot with Node.js: Part 3 - Deploying your Twitter bot](/2014/11/03/twitter-bot-with-node-js-part-3.html)

[Follow the Pick Two Bot on Twitter!](https://twitter.com/picktwobot)

[Check out the code in this project's Github repository](https://github.com/ursooperduper/picktwobot)

[Return to Work Samples](/projects)
