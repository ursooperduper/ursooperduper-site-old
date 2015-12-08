---
layout: post
title: "Recreating the iOS Wallet app interaction in Framer Studio"
date: 2015-12-08
tags:
- prototypes
- ios
- framerjs
- tutorials
---

Apple's iOS Wallet app is useful for quick access to plane and rail tickets, as well as club and gift cards. With it's simple interaction model, it's easy to see what cards are in the wallet and to access them when they're needed. In this post, I'll walk you through creating a prototype of the Wallet app's interaction in [Framer Studio](http://framerjs.com/).

## The Sketch Assets

Before diving into Framer, I created a simple Sketch file, with five layers, each consisting of a colored card image. Each layer is named for its color, ```cardRed, cardOrange, cardGreen, cardYellow, and cardBlue```. Layer names are camelcased and unique, to make it easy to reference them once imported into Framer Studio.

![Screenshot of wallet cards in Sketch](/images/blog/sketch/sketch-wallet-ios.png)

## Setting up the prototype in Framer Studio

With Framer Studio open, the first thing I do is add a quick header and then set up the device on which I want to show my prototype. In this case, I want to use the iPhone I have, a silver 5s.

{% highlight coffee %}
# Wallet-Style Cards prototype
# Made by Sarah Kuehnle
# November 21, 2015

Framer.Device.background.backgroundColor = "#303030"
Framer.Device.deviceType = "iphone-5s-silver"
{% endhighlight %}

The next step is to import the artwork created in Sketch. [There's a great (still beta) ```Utils``` method called ```globalLayers```](https://github.com/koenbok/Framer/blob/b22d277d13618b6507f38f40db2626416536955c/framer/Utils.coffee#L734-L751) that allows you make  Sketch layers available at the top level of your Framer document without having to use the importedLayers prefix. I use that as well just to reduce the amount of repetition in my code.

{% highlight coffee %}
wLayers = Framer.Importer.load "imported/wallet-style-cards"
# beta property, be warned
Utils.globalLayers(wLayers)
{% endhighlight %}

![Screenshot of Framer Studio with imported artwork](/images/blog/framer-studio/framer-wallet.png)

Following that, I like to set up some default properties for animation. Since the interaction in this prototype is very simple, just one type of animation is all that's required.

{% highlight coffee %}
Framer.Defaults.Animation =
  curve: "spring(200,30,0)"
  time: .4
{% endhighlight %}

## Making the prototype interactive

Now we can get into the fun part of this prototype - making the design interactive! First, I want to apply a set of properties to each card in my design. Rather than duplicating the same code five times for each card, I can create an array that holds each of the card objects and then loop through that to set the states for each card.

{% highlight coffee %}
cards = [cardBlue, cardYellow, cardGreen, cardOrange, cardRed]

# set up card states
for c, i in cards
  c.states.add
    up:
      x: c.x
      y: 150 + (i - 1) * 150
    focus:
      x: c.x
      y: 150
  # set cards in the 'up' position
  c.states.switchInstant 'up'
{% endhighlight %}

Once states for the cards have been defined, each card's state is set to "up" - which is the default view of all cards visible onscreen.

When one card is selected (focused), the rest of the cards drop to the bottom of the screen. Since each card's y location change when they are in this collapsed position, rather than creating a state, I created a function to loop through the cards and animate them to the correct position.

{% highlight coffee %}
# send unfocused cards down
cardsDown = (card) ->
  counter = 1
  startY = 980
  for c in cards
    if c != card
      animation[counter] = new Animation
        layer: c
        properties:
	      y: 960 + counter * 20
      c.position = 'down'
      animation[counter].start()
      counter++
{% endhighlight %}

Each card has a property called ```position``` that indicates their current state: ```up```, ```down```, or ```focus```. When a card is clicked, a function is called which figures out what to do with the cards based in their current state.

{% highlight coffee %}
handleCards = (card) ->
  cardState = card.position
  if cardState == 'up'
    card.states.switch 'focus'
    card.position = 'focus'
    cardsDown(card)
  else
    for c in cards
      c.states.switch "up"
      c.position = 'up'
{% endhighlight %}

So when a card is clicked, it is passed into the ```handleCards``` function, which looks at the card position property. If the property is set to ```up```, that card's state is changed to ```focus``` and the rest fof the cards are shifted down. If the card clicked is not ```up```, then all the cards are raised to their ```up``` position.

Last, each card needs an event handler so they do something when clicked/tapped. Here's an example of the handler for the ```redCard```:

{% highlight coffee %}
cardRed.on Events.Click, ->
  handleCards(cardRed)
{% endhighlight %}

With that completed, we should have a working prototype of the Wallet app's selection interaction!

* [View the finished prototype.](http://ursooperduper.github.io/prototypes/wallet-style-cards.framer)
* [View the code.](https://github.com/ursooperduper/prototypes/blob/master/wallet-style-cards.framer/app.coffee)

## Improvements

There are a few improvements that could be made to this prototype. First, in the actual Wallet app, you can drag the cards together. You can also flip a focused card around to get more information about it. Both would be pretty easy to add to this prototype and good next steps to recreate all of the interactions in the app.

Feedback or questions? I'd love to hear from you in the comments below!
