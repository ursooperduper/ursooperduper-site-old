---
layout: page
title: Creatures Are Friends (iOS App)
data: caf
thumb: caf.jpg
---

{% include project-meta.html proj=page.data %}

![Creatures are Friends screenshot](/images/work/caf/caf.jpg)

To learn more about the Photos Framework in OS, I wanted to create an app that would let you take a photo of a friend and replace their head with a cartoon one.

In addition to learning how to access a user's photo library, create new collections, and save photos to that new collection, I had to figure out how to take an asset - in this case a cartoon head - and merge with the selected photo, saving the resulting image. Doing that turned out to be a huge challenge. It's easy to save photos, but the resulting image never looked like the image created in the app. The cartoon head was always in the wrong place or the wrong size and orientation. Fixing this problem meant learning all about affine transformations.

I shared how I solved my image creation issues and more about affine transformations in a [blog post](/2014/09/30/affine-day-for-a-transformation.html).

[Check out the code in this project's Github repository](https://github.com/ursooperduper/creatures-are-friends)

[Return to Work Samples](/projects)
