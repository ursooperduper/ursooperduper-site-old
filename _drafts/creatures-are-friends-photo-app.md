---
layout: post
title: "A Photo App: Creatures are Friends"
date: 0000-00-00
---

In week two of Hacker School, I started my second iOS, an app that lets you take a photo of a friend and place a cartoon head over there head. Guaranteed fun.

After watching this WWDC 2014 talk, I was particularly excited about the new Photos Framework, and this felt like a great project to learn about the framework.

## Project Requirements

Setting some goals for the project before you start - especially on a personal project - is pretty important. So I made some decisions up front about what I would and would not do with this app.

+   The user can take a picture with the Camera and use that to edit.
+   Photos will be saved into a new folder in the user's photo album, specific to the app.
+   Users can only add one cartoon head to each photo.

## Getting Started

### App Structure

The Creatures are Friends app is a bit more complicated than my first app, but a great next step for learning about working with Xcode.

The flow for this app is simple.

After the app starts up, the user is taken to a view of their Creatures are Friends photo album, where they can select a photo to work with or take a picture to work with. With an image selected, the user is taken to a full screen view where they can use various gestures to add a cartoon head to the picture.

Implementing this in Xcode first meant setting up the storyboard view.
