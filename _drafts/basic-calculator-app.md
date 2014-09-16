---
layout: post
title: "A Basic Calculator App"
date: 2014-09-15
---

My first iOS app is a basic calculator. I chose this as a project
as a way to learn about XCode, basic iOS development principles, and
to finally write some Swift code outside of a Playground.

Project Goals
-------------
A calculator app can go from simple to complex so quickly. Just turn your iOS calculator from portrait to landscape mode and marvel at the power of a more detailed camera.

I don't want to spend my time at Hacker School making a super-loaded, uber calculator, so I decided to keep my requirements rather simple:

+   Only basic math would be supported: addition, subtraction, multiplication, and division.
+   Numbers can be positive or negative.
+   Decimal values will be supported.
+   The app would be built for iPhone only.

// get a finn and jake mathematical graphic to show here

Getting Started
---------------
Before I could dive into making this calculator work, I had to
create a storyboard for it in XCode. Storyboards are where you
handle the visual layout and look of your app.

// Talk more about what a storyboard is here.

The storyboard for the calculator is pretty simple. It's just one view. And it's a calculator, so the layout is pretty simple. You
just need a grid of numeric and mathematical operator buttons, a place where you can show number output, and way to total and clear
the calculator.

It was really easy to layout the buttons on the storyboard view, but when I compiled and ran the first version to test, the whole view was displayed half-off my iPhone screen. WTF?!?!?

Diving into more Xcode documentation, I learned about universal layouts. The idea is to create a generic layout

// Talk about constraints and auto-layout

// Screen shots of the bad layout.
// Screenshot to show constraints.

Once the constraints were working and the iPhone display looked good, it was time to hook up the storyboard to its view controller.

I'd never worked with an IDE before. My normal tools are a terminal window and an editor like Sublime or Atom. My assets were created in an app like Illustrator, or Photoshop and dropped into a folder I'd later reference in my code.

Working with Xcode is a whole new ball game for me. After laying
out the view in a storyboard in XCode, you now have to connect
all those UI items to their view controller. While you can just
programmatically created UI elements and flows/handlers/gestures/etc, I haven't figured out how you tie those back to the visual storyboard. It seems that if you work with the storyboard to layout your app, you need to physically drag each UI item/gesture/etc from the storyboard layout to the View Controller code editor.

Once all the UI elements were conncted to the View Controller, I was ready to start building a real calculator!

Writing Code
------------

Finally ready to write some Swift code, two resources became immediately invaluable - an Xcode playground and the Swift iBook. Getting started on Xcode with Swift and iOS 8 is fun, but there isn't a lot of great documentation available yet. So some things just require some trial and error testing.

The basic functionality for the app seemed pretty straight forward.

I'd need functions to add, subtract, multiply, and divide.

I'd also need to handle what to do when a user entered a negative sign (or toggled back to positive).

Simple enough. Right?

I thought so.

Then I compared my basic calculator to Apple's iOS calculator app. You can probably guess what happened here.

The calculation to perform was pretty simple:

5 + 2 * 3

Apple's calculator app returned a value of 11. Nice. That makes sense.

My app returned a value of 21.

// Insert sad photo here.

I should have anticipated this, but I think I was experiencing a coder's high (much like a runner's high) at the time. That's my excuse anyway.

So now it was time to tackle operator precedenc and learning about stacks!

Stacks are awesome and save you writing A LOT of code
-----------------------------------------------------

When I first started working on this app, I was trying to manage all the calculated and user entered values using variables. Then I'd written some rather complicated logic blocks to determine what to do based on all the values of the stored variables.

Enter stacks!

In some languages, there are push and pop functions. Not so in Swift.

Next steps
----------
There are some nice, small improvements that could be added to my calculator over time:

+   Add the % operator.
+   Support landscape orientation.
+   Add easter eggs when typing numbers that form words!
+   Support scientific calculator operations and beyond.

I have no immediate plans to do any of the above, but


One last moment of victory!
---------------------------

While my calculator is indeed, very basic, it does perform better than one production code calcuator. Mac users, test out my operation from above (5 + 2 * 3)

The dashboard calcualtor will immediately add the 5 + 2 before you can even enter * 3!!

I realize programming shouldn't be about one-upping other people's work, but I'm taking this one. My calculator is better than the OS X dashboard calculator!

\o/
