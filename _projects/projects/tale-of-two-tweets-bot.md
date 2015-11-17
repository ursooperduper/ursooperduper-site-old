---
layout: page
title: A Tale of Two Tweets Bot
data: tale-bot
thumb: tale-of-two-tweets.jpg
---

{% include project-meta.html proj=page.data %}

My second Twitter bot, A Tale of Two Tweets, was created to explore the WordNik API a little more. The bot is based on Charles Dickens' work, A Tale of Two Cities, opening quote, "It was the best of times, it was the worst of times."

The bot grabs two recent publics Tweets; one that includes the word "best" and the other including the word "worst". It then looks for the word that follows "best" or "worst" and checks to see if those words are nouns. If they are, the plural form of words is used in the following format: "It was the best of {noun}. It was the worst of {noun}."

Sometimes the results don't make any sense, which is part of the fun of creating these bots. Other times the bots returns hilarious results, as shown below.

![Tweet: It was the best of teams, it was the worst of divisions.](/images/work/bots/tale-of-two-tweets.jpg)

The bot uses the [Worknik API](http://developer.wordnik.com) to identify the parts of speech in a given tweet and then formats them in the singular form.

The bot runs as a [Node.js](https://nodejs.org) app and as a worker on [Heroku](https://heroku.com). It fails silently if it doesn't find Tweets of the correct format. It just tries again in the next time interval.

To learn more about how the bot was created, see my three-part blog series on creating a Twitter bot:

* [Creating a Twitter bot with Node.js: Part 1 - Setting up](/2014/10/27/twitter-bot-with-node-js-part-1.html)
* [Creating a Twitter bot with Node.js: Part 2 - Writing the code](/2014/10/28/twitter-bot-with-node-js-part-2.html)
* [Creating a Twitter bot with Node.js: Part 3 - Deploying your Twitter bot](/2014/11/03/twitter-bot-with-node-js-part-3.html)

[Follow the bot on Twitter!](https://twitter.com/taleoftwotweets)

[Check out the code in this project's Github repository](https://github.com/ursooperduper/taleoftwotweets)

[Return to Work Samples](/work.html)
