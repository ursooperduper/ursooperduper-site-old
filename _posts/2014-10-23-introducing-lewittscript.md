---
layout: post
title: "Introducing LeWittScript: A conceptualist art + code project"
date: 2014-10-23
tags:
- art
- projects
---

Right before I started Hacker School, I had an idea for a web-app based on the artwork of one of my favorite American artists, Sol LeWitt. But I put that project off in favor of exploring mobile development with Swift. Yet my excitement for the art project continued to grow. So a couple of weeks ago, I decided to take a break from mobile and start work on LeWittScript.

## Who was Sol LeWitt?

To really understand LeWittScript, it's helpful to learn something about the artist for whom this project is named.

[Sol LeWitt](http://en.wikipedia.org/wiki/Sol_LeWitt) was an American minimalist/conceptualist from Hartford, Connecticut. A great sculptor and painter, LeWitt is perhaps best known for his wall drawings and these are the focus of LeWittScript.

### Wall Drawings

During the 1960s, LeWitt created sets of instructions for works of art. These instructions were than executed on a wall in a variety of media, including graphite, crayon, pencil crayons, ink washes, and acrylic paint.

![Sol LeWitt. Wall Drawing-49](/images/blog/wall-drawing-49.jpg)
Ref: [Wall Drawing 49 @ MASS MoCA](http://www.massmoca.org/lewitt/walldrawing.php?id=419)

LeWitt's wall drawings were typically executed in a space they were to be shown and later torn down when a show closed. If a new show was to include the same piece, the instructions were executed again. It's also important to note that LeWitt wasn't usually the person executing the instructions. In fact, this was an important component to this work - the idea over the execution. This meant that the interpretation of a set of instructions was left to the individual executing the piece.

Before his death in 2007, Sol Lewitt had created over 1200 wall drawings. Permanent works by Sol LeWitt can be viewed in art galleries across the US, but most notably, there's a retrospective exhibition of Sol LeWitt's work on display (until 2033!) at MASS MoCA in North Adams, MA. It was at this retrospective that I first became familiar with LeWitt's work. MASS MoCA is an incredible gallery and I very highly recommend checking it out if you can.

## The Idea for LeWittScript

After experiencing his work in person at MASS MoCA, I was completely taken with Sol LeWitt. But other than enjoying his work, I didn't get any of this much more thought. Sometimes, however, random elements fall into place and spark new ideas. At the show, I purchased a book about LeWitt and after a cross-country move earlier this year, the book ended up on the same shelf as my generative art and Processing books. Lightbulb! An idea is born!

![An idea!](/images/gifs/aladdin-idea.gif)

So the initial idea for LeWittScript is pretty simple. Imagine a rather plan/empty interface (purposely blank like a bare wall or canvas), where a user can enter a set of instructions for a piece of art that are then processed and drawn to an HTML5 canvas element.

Here's how I'm thinking about the initial approach for this project:

### Front-end

On the front-end, the implementation uses HTML5 and Javascript to evaluate user-entered instructions and then renders them to a canvas element. (The super awesome JavaScript utility library, Lo-Dash, is also used to make JavaScript a little more beautiful and fun to write).

In this approach, instructions are retrieved from input elements and then evaluated using RegEx to look for keywords that explain shapes, colors, position, etc. The inputs are converted to instruction objects which can be inspected and acted upon to draw the described art to the canvas.

### Back-end

Beyond just entering instructions, I'd like users to be able to save and share the instructions they've created and executed. The back-end will work a lot like a URL shortener where a set of instructions can be saved, given a custom name, and be recalled by anyone who has that link.

I haven't started work here, but my plan is to use Ruby/Sinatra for the back-end and Mongo for the database. I'm familiar with Ruby so it won't take long to wire up the backend, but I've never used Mongo and this seemed like a great project to learn more about it.

## Progress to Date

So far, I've done a lot of experimentation parsing basic instructions and rendering them to the canvas. Here are a couple of examples.

![Early LeWittScript Art](/images/blog/lws-001.png)

```
Instructions:
There are 20 tiny aquamarine triangles.
The background is slate gray.
```

![Early LeWittScript Art](/images/blog/lws-002.png)

```
Instructions:
There are 50 randomly placed dots.
From each dot, there are 10 lines leading to the top right.
The background is goldenrod yellow.
```

## Next Steps

With initial experimentation complete, I'm ready to work on the actual user-facing implementation. In the next few days, I plan to start work on:

* A proper parser to read and evaluate user-entered instructions
* The back-end system that will save and retrieve instructions
* Design for handling more complex instructions

Once a basic implementation is in place, I'm also hoping to port this project to work on iOS as well. But that's a little ways down the road.

Stay tuned for more updates on the project and, as always, if you have any questions or comments, please share your thoughts below or @ me on Twitter!
