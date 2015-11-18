---
layout: post
title: "Using CSS to Create Ordered Lists That Don't Reset"
date: 2015-11-18
tags:
- tutorials
- CSS
- HTML
---

It's not uncommon to see academic texts where bulleted lists are split apart by paragraphs or new headings. Never having coded a document like this, I wondered how and if ordered lists could be split apart while maintaining numbering. With some experimentation, I learned about the CSS properties ```counter-increment``` and ```counter-reset```.

The document I want to recreate looks something like this:

```
Introductory Heading

1. Some interesting point.
2. Another interesting point.

Secondary Heading

3. A fine example.
4. Yet another good point.
5. Lots of good information.

Third Heading

6. A final, great point.
```

To mark this up in HTML, I have:

{% highlight html %}
<h1>Introductory Heading</h1>

<ol>
  <li>Some interesting point.</li>
  <li>Another interesting point.</li>
</ol>

<h2>Secondary Heading</h2>

<ol>
  <li>A fine example.</li>
  <li>Yet another good point.</li>
  <li>Lots of good information.</li>
</ol>

<h2>Third Heading</h2>

<ol>
  <li>A final, great point.</li>
</ol>
{% endhighlight %}

But of course, when you preview this markup, you'll see the numbering resets with each new section.

## Enter CSS Counters

I learned about two very useful CSS properties: ```counter-reset``` and ```counter-increment``` which can help achieve the result I'm seeking.

### counter-reset

The ```counter-reset``` property allows you to automatically number HTML elements. While I'm using it for an ordered list in this example, you can easily imagine using it for numbered headings in a detailed specification or academic text.

The ```counter-reset``` property takes the following input:

{% highlight css %}
counter-reset: <counter name> <integer> // integer defaults to 0
{% endhighlight %}

or

{% highlight css %}
counter-reset: none // disables the counter
{% endhighlight %}

So you give a counter a name and apply that to the property where you want to begin your list:

{% highlight css %}
.begin {
  counter-reset: listcounter;
}
{% endhighlight %}

Next, we need some way to tell ```listcounter``` to increment and that's where the property, ```counter-increment``` comes in.

### counter-increment

The ```counter-increment``` property is applied to the elements you want to count. In my example, I want to increment with each list item. The ```counter-increment``` property accepts similar values as ```counter-reset```:

{% highlight css %}
counter-increment: <counter name> <integer> // Integer is the number to increment by. The default is 1.
{% endhighlight %}

or

{% highlight css %}
counter-increment: none // disables the counter for that element
{% endhighlight %}

## Using the counter

Because we're using a counter to increment the list in this example, we don't want the list to show numbers, they'll be set by the ```listcounter```. This means we need to set the list style and margins appropriately:

{% highlight css %}
ol.begin li,
ol.continue li {
  list-style: none;
  text-indent: -1.2em;
}
{% endhighlight %}

We need to display the numbers from the ```listcounter```. This is easy to do using the ```content``` property.

{% highlight css %}
ol.begin li:before,
ol.continue li:before {
  content: counter(listcounter) ". ";
  counter-increment: listcounter;
}
{% endhighlight %}

You'll notice that I'm using the ```:before``` selector in the example above. This means that before each ``li``, some content is inserted. And in this case, it's the current value of ```listcounter```, followed by a period and a space. Then the counter is incremented by 1.

In my example, I've created two CSS classes, ```begin``` and ```continue```. The mark up for the original HTML looks like this now:

{% highlight for html %}
<h1>Introductory Heading</h1>

<ol class="begin">
  <li>Some interesting point.</li>
  <li>Another interesting point.</li>
</ol>

<h2>Secondary Heading</h2>

<ol class="continue">
  <li>A fine example.</li>
  <li>Yet another good point.</li>
  <li>Lots of good information.</li>
</ol>

<h2>Third Heading</h2>

<ol class="continue">
  <li>A final, great point.</li>
</ol>
{% endhighlight %}

Pretty simple! And now we have a numbered list that doesn't reset with the start of a new section. You can see the result in the Code Pen example below.  

<p data-height="360" data-theme-id="0" data-slug-hash="JYemro" data-default-tab="result" data-user="ursooperduper" class='codepen'>See the Pen <a href='http://codepen.io/ursooperduper/pen/JYemro/'>An ordered list that doesn't reset</a> by Sarah Kuehnle (<a href='http://codepen.io/ursooperduper'>@ursooperduper</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

You can do all sorts of things with counters - lists that count backwards, deeply structured contents and indexes, and so much more!

![Tiny Fey says You're Welcome!](/images/gifs/tina-fey-welcome.gif)
