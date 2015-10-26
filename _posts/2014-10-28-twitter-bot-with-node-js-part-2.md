---
layout: post
title: "Creating a Twitter bot with Node.js: Part 2 - Writing the code"
date: 2014-10-28
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

In the [first post in this series]({{ site.url }}/2014/10/27/twitter-bot-with-node-js-part-1.html), I covered how to set up a Twitter account, get API keys, and install Node.js and a few great modules that will help you create a Twitter bot. In this second post, I'll step through the code for my first Twitter bot, [@PickTwoBot](https://twitter.com/picktwobot), so you can see how easy it is to spout prolific nothings at the Twitterverse.

![Prolific.](/images/dicaprio-crowd.gif)

To recap, my Twitter bot grabs a public tweet, looks to see if it has three nouns, and if it does, creates a tweet using those three nouns. The code for the bot lives in a single JavaScript file called bot.js. At the top of that file, I've included all the Node.js packages I discussed in the first post.

{% highlight javascript  %}
var _           = require('lodash');
var Client      = require('node-rest-client').Client;
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');
{% endhighlight  %}

Nothing too surprising here. If you're curious about any of the packages and want to dig further, follow these links: [lodash](https://www.npmjs.org/package/lodash), [node-rest-client](https://www.npmjs.org/package/node-rest-client), [twit](https://www.npmjs.org/package/twit), [async](https://www.npmjs.org/package/async), [wordfilter](https://www.npmjs.org/package/wordfilter).

Next, I create an instance of Twit and pass it an object that contains my Twitter API keys. Below that, I also create a variable to store my Wordnik API key:

{% highlight javascript %}
var t = new Twit({
  consumer_key:         : process.env.PICKTWOBOT_TWIT_CONSUMER_KEY,
  consumer_secret:      : process.env.PICKTWOBOT_TWIT_CONSUMER_SECRET,
  access_token          : process.env.PICKTWOBOT_TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.PICKTWOBOT_TWIT_ACCESS_TOKEN_SECRET
});
var wordnikKey          = process.env.WORDNIK_API_KEY;
{% endhighlight %}

To make sure I don't accidentally publish any private keys, I like store API keys as environment variables. In the code above, I use `process.env` to access those keys. (I'll talk about how to set these up in a production environment in the next blog post).

After these definitions, the rest of the bot.js file is comprised of a series of functions that are called in order. Though defined at the bottom of the file, let's look at how those functions are called in the code snippet below:

{% highlight javascript %}
run = function() {
  async.waterfall([
    getPublicTweet,
    extractWordsFromTweet,
    getAllWordData,
    findNouns,
    formatTweet,
    postTweet
  ],
  function(err, botData) {
    if (err) {
      consola.log('There was an error posting to Twitter: ', err);
    } else {
      console.log('Tweet successful!');
      console.log('Tweet: ', botData.tweetBlock);
    }
    console.log('Base tweet: ', botData.baseTweet);
  });
}
{% endhighlight %}

The above function, `run()`,  called once an hour by `setInterval()` (but not shown here), is really cool. It uses an [async](https://github.com/caolan/async#waterfall) method called `waterfall()` which runs takes an array of tasks and an optional callback. async ensures that each of the functions in the array of tasks is called one a time and passes its results to the next function in the list. If any of the tasks fail, the next function isn't executed. Instead, the main callback is called with an error.

The first function called in the array of tasks is `getPublicTweet()` which attempts to grab a public tweet. If successful, it creates an object called `botData` which is passed to the next function in the callback.

{% highlight javascript %}
getPublicTweet = function(cb) {
  t.get('search/tweets', {q: 'a', count: 1, result_type: 'recent', lang: 'en'}, function(err, data, response) {
    if (!err) {
      var botData = {
        baseTweet       : data.statuses[0].text.toLowerCase(),
        tweetID         : data.statuses[0].id_str,
        tweetUsername   : data.statuses[0].user.screen_name
      };
      cb(null, botData);
    } else {
      console.log("There was an error getting a public Tweet. Abandoning EVERYTHING :(");
      cb(err, botData);
    }
  });
};
{% endhighlight %}

The `botData` object will grow as its passed from one function to the next, building up the elements needed to construct our bot's tweet.

The second line `t.get(...` uses the Twitter Search API to retrieve a public tweet. Without using the Stream API, I had a hard time getting a random tweet that wasn't a duplicate. So I'm using the query term, 'a',to find a recent tweet with the word 'a' in it. (Lame, I know. I'd like to improve this in future enhancements and other bots I might build.)

After getting a tweet to work with, the next step is to pick out words from it. So the next function called is `extractWordsFromTweet()`:

{% highlight javascript %}
extractWordsFromTweet = function(botData, cb) {
  var excludeNonAlpha       = /[^a-zA-Z]+/;
  var excludeURLs           = /https?:\/\/[-a-zA-Z0-9@:%_\+.~#?&\/=]+/g;
  var excludeShortAlpha     = /\b[a-z][a-z]?\b/g;
  var excludeHandles        = /@[a-z0-9_-]+/g;
  var excludePatterns       = [excludeURLs, excludeShortAlpha, excludeHandles];
  botData.tweet             = botData.baseTweet;

  _.each(excludePatterns, function(pat) {
    botData.tweet = botData.tweet.replace(pat, ' ');
  });

  botData.tweetWordList = botData.tweet.split(excludeNonAlpha);

  var excludedElements = ['and','the','pick','select','picking'];
  botData.tweetWordList = _.reject(botData.tweetWordList, function(w) {
    return _.contains(excludedElements, w);
  });

  cb(null, botData);
};
{% endhighlight %}

This function has a lot going on. As the function is entered, a series of patterns are defined and then added to the `excludePatterns[]` list. LoDash's `_.each` is called with that list of patterns and applies each pattern it contains to tweet we grqbbed. Once URLs, words made up of 1-2 characters, non-alpha, and twitter handles are removed from the tweet and replaced with spaces, the tweet is broken into a list, `botData.tweetWordList`. Several 'boring' words are omitted from the list and the next function is called.

The next function, `getAllWordData()` uses `async.map` which takes an array (the list of words from a tweet), an iterator (another function, `getWordData()`), and a callback.

{% highlight javascript %}
getAllWordData = function(botData, cb) {
  async.map(botData.tweetWordList, getWordData, function(err, results){
    botData.wordList = results;
    cb(err, botData);
  });
}
{% endhighlight %}

What this means it that the function `getWordData()` will be called for each word in the array, `botData.tweetWordList`. So let's take a look at what `getWordData()` does:

{% highlight javascript %}
getWordData = function(word, cb) {
  var client = new Client();
  var wordnikWordURLPart1   = 'http://api.wordnik.com:80/v4/word.json/';
  var wordnikWordURLPart2   = '/definitions?limit=1&includeRelated=false&useCanonical=true&includeTags=false&api_key=';
  var args = {headers: {'Accept':'application/json'}};
  var wordnikURL = wordnikWordURLPart1 + word.toLowerCase() + wordnikWordURLPart2 + wordnikKey;

  client.get(wordnikURL, args, function (data, response) {
    if (response.statusCode === 200) {
      var result = JSON.parse(data);
      if (result.length) {
        cb(null, result);
      } else {
        cb(null, null);
      }
    } else {
      cb(null, null);
    }
  });
};
{% endhighlight %}

`getWordData()` takes a word and looks it up using the Wordnik API. The function begins by constructing the URL for the Wordnik API endpoint to be called. Next, the node package `node-rest-client`'s method, `get` is called to perform the API request. If we get a response, that data is passed back into the `botData` object.

The Wordnik API endpoint passes back all sorts of interesting information about the word queried, including definitions and alternate words, but for this bot, we're most interested in identifying the part of speech the word repressents.

Once all the words from the tweet have been queried, the next function, `findNouns()` is called:

{% highlight javascript %}
findNouns = function(botData, cb) {
  botData.nounList = [];
  botData.wordList = _.compact(botData.wordList);

  _.each(botData.wordList, function(wordInfo) {
    var word            = wordInfo[0].word;
    var partOfSpeech    = wordInfo[0].partOfSpeech;

    if (partOfSpeech == 'noun' || partOfSpeech == 'proper-noun') {
      botData.nounList.push(word);
    }
  });

  if (botData.nounList.length >= 3) {
    cb(null, botData);
  } else {
    cb('There are fewer than 3 nouns.', botData);
  }
}
{% endhighlight %}

The `findNouns()` function is really important because it's a big determiner in whether the @PickTwoBot will actually tweet a new message. In this function, a new list is defined, `botData.nounList`. After compacting `botData.wordList`, to remove any empty elements, the function loops through each element in the wordList and examines its `partOfSpeech` property. If the property is a noun or proper noun, it is added to the `botData.nounList` array.

If three nouns aren't found, we return an error to the callback function indicating there weren't enough nouns to create a tweet, then the program exits. But, if three nouns were found, the next function, `formatTweet()` is called:

{% highlight javascript %}
formatTweet = function(botData, cb) {
  botData.pickTwoWordList = [];
  _.each(botData.nounList.slice(0,3), function(word) {
    word = word.charAt(0).toUpperCase() + word.slice(1) + ".";
    botData.pickTwoWordList.push(word);
  });

  var tweetLine1    = botData.pickTwoWordList.join(' ');
  var tweetLine2    = 'Pick Two.';
  var tweetLine3    = 'http://twitter.com/' + botData.tweetUsername + '/status/' + botData.tweetID;
  botData.tweetBlock = tweetLine1 + '\n' + tweetLine2 + '\n' + tweetLine3;
  cb(null, botData);
}
{% endhighlight %}

In this function, a new array is added to `botData`, called `pickTwoWordList`. Then `botData.pickTwoWordList` is sliced to retrieve the first three nouns in the list. Each of those words is capitalized, given a period at the end of it and joined to form a single string.

Finally the tweet can be constructed! The three lines that comprise @PickTwoBot's tweet are combined to form, `botData.tweetBlock`. With that constructed, the final function, `postTweet()` can be called:

{% highlight javascript %}
postTweet = function(botData, cb) {
  if (!wordFilter.blacklisted(botData.tweetBlock)) {
    t.post('statuses/update', {status: botData.tweetBlock}, function(err, data, response) {
      cb(err, botData);
    });
  }
}
{% endhighlight %}

`postTweet()`, surprisingly enough, attempts to the post the Tweet we've constructed to Twitter. Before it does that, the tweet is reviewed against a list of blacklisted words (from the node module, `wordfilter`. If there are any flagged words, the tweet is abandoned. Otherwise, the Twit method, `post` is called with the tweet we want to post.

If that's successful, we're done and the masses will either marvel or puzzle at the tweet we've just posted!

All the [code for my Twitter bot can be found on Github](https://github.com/ursooperduper/picktwobot)! If you have any questions about it or suggestions for how to improve it, please let me know in the comments below!

## A few thoughts...

I'm pretty happy with the code for this bot, but a few improvements could (and should) be made:

* Look for blacklisted words when the public tweet has first been retrieved. It would be smarter to abandon the program right away rather than going through all the steps to compose the tweet.
* Come up with a better way to retrieve a single public tweet from the Twitter API. It feels silly sending a query for a tweet with the word, 'a', in it.
* Generalize many of the functions to they can be reused for other types of Twitter bots I might want to create!

## Ready for part three - Deploying your Twitter bot!

In the third and final blog post in this series, I'll talk about how to deploy your own bot. This step, which took me the longest of all three steps, is actually the simplest once you know what you're doing. See you next post!
