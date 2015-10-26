---
layout: post
title: Using Lo-Dash to Clean Up Initializers in JavaScript
date: 2014-10-12
tags:
- lodash
- JavaScript
- productivity
---

Over the past week, I've started working on new project that involves a lot of JavaScript. As I started fleshing out ideas for the project, I was introduced to [Lo-Dash](https://lodash.com/), a functional programming library for *all of the things* in Javascript and I'm absolutely smitten.

![I'm in love.](/images/pokemon-love.gif)

Here's some sample code for an object in my app. There's a lot of repetition as I initialize and set defaults for properties of the Circle object:

{% highlight javascript %}
  var Circle = function(config) {
    var context;
    var radius;
    var xPos;
    var yPos;
    var startAngle;
    var endAngle;
    var reverse;
    var lineWidth;
    var color;

    function init() {
      context = config.context || null;
      radius = config.radius || 10;
      xPos = config.xPos || 0;
      yPos = config.yPos || 0;
      startAngle = config.startAngle || 0;
      endAngle = config.endAngle || 360;
      reverse = config.reverse || false;
      lineWidth = config.lineWidth || 1;
      color = config.color || "red";
    }

    function draw() {
      // Do some cool things here...
    }

    init();

    return {
        draw: draw
    };
  };
{% endhighlight %}

Using Lo-Dash and cleaning up the JavaScript a bit, I have a much simpler Circle object:

{% highlight javascript %}
  var Circle = function(config) {
    var props = {
      radius : 100,
      xPos : 0,
      yPos : 0,
      startAngle : 0,
      endAngle : 360,
      reverse : false,
      circleColor : "red"
    };

    _.assign(props, config);

    function draw() {
      // Do cool things here ...
    }

    return {
        draw: draw
    };
  };

  c = Circle({radius: 60, xPos: 100, yPos: 200, circleColor: "blue"});
  c.draw();
__
{% endhighlight %}

The change is really simple. But using the Lo-Dash method, `_.assign`, I can take the props object which contains the default properties for the Circle object and assign the values contained in the config object. The config object is passed into the Circle object when it's called (as shown right after the object definition in the code snippet above).

This is my first use of Lo-Dash and I'm eager to see what else it has to offer. Lo-Dash has shown to be to be more performant than other low-level utility libraries and makes JavaScript more readable and, in my opinion, more fun to write. I'll cover more of my experiences with Lo-Dash in future blog posts. In the meantime, I want to hear about your favorite use for Lo-Dash. Get in touch in the comments below or on [Twitter](https://twitter.com/ursooperduper)!
