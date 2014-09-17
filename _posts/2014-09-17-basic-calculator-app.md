---
layout: post
title: "Building a Basic Calculator App for iOS"
date: 2014-09-17
---

My first iOS app is a basic calculator. I chose this  project as a way to learn about XCode, iOS development principles and workflows, and to finally write some actual Swift code.

![Get mathematical!](/images/mathematical.gif)

## Project Goals

A calculator app can go from simple to complex very quickly. Just turn the iOS calculator from portrait to landscape mode and marvel at the enhanced functionality!

![The landscape view of the iOS standard calculator](/images/ios-calculator-landscape.png)

I don't want to spend my time at Hacker School making a super-loaded, uber-calculator, so I decided to keep my requirements very simple:

+   Only basic math will be supported: +, -, *, /
+   Numbers can be positive or negative.
+   Decimal values will also be supported.

## Getting Started

Learning about XCode's general workflow was the first task. I'm used to a trusty text editor and web browser to build out an app, so this was very new to me. XCode offers a bevy of documentation, layout, debugging, source control, testing, and simulation tools that were both exciting and daunting to encounter as I explored this IDE for the first time. There's a lot to master here, but I'm up for it.

Once I knew my way around XCode a little better, my next step was to create a storyboard for the calculator. Storyboards are where you build the visual elements for the app. Each screen or scene in your program represents a different 'View' in Xcode. In addition to laying out UI elements, you also create connections between them in the storyboard. These connections define how UI elements work together, where they get data from, and how Views (scenes) tie together to create your program.

The storyboard for the calculator is pretty simple. It's just one View and the layout is familiar and generally well-understood. There is a grid of numeric and mathematical operator buttons, a place where you can show number output, and way to total and clear that output.

It was really easy to layout the buttons on the storyboard view, but when I compiled and ran the first version to test, the whole view was displayed half-off my iPhone screen. Oh noes! Diving into Xcode docs, I learned about autolayout for universal app design in Xcode 6. The idea is to create a generic layout that will render appropriately on target devices regardless of their screen size.

![The generic layout for my calculator app](/images/calculator-generic-layout.png)

You set up constraints for Views and UI elements which is a way of explaining how each element relates to the rest in terms of position and size.

![The same calculator app design shown on the iPhone and iPad](/images/calculator-various-devices.png)

It's not the sexiest design ever, but it's just a calculator and in this case, my target device is just the iPhone, so I felt pretty good about what I had set up.

Figuring out the right constraints was not an easy task, but I'm hoping that's just because it's new to me. But once the constraints were working and the iPhone display looked good, it was time to hook up the storyboard to its view controller.

With the layout complete, I connected the UI elements from the storyboard to the corresponding View Controller. In XCode, you have to connect all those UI items to their view controller by dragging them from the storyboard window to the code editor view. You can then assign them variable names and actions. While you can also do this programmatically, I haven't figured out how you tie those back to the visual storyboard (yet).

Once all the UI elements were connected to the View Controller, it was time to make the calculator functional!

## Writing the Code & Learning Swift

### Tools & Resources to help along the way

As I'm new to both iOS development and Swift, two resources became immediately invaluable as I started making the calculator functional - the Xcode playground and the [Swift iBook](https://itunes.apple.com/us/book/swift-programming-language/id881256329?mt=11). Working with a language that's brand new is exciting, but it means that you can't just google for answers when you're stuck! But that's also great for learning and experimentation. So the Playground in Xcode was perfect to test out code.

A Playground in is an interactive workspace that allows you to write Swift code and see it's result in a live preview area right alongside the code. Every time I wonder, "Will this work?", I simply pop open the Playground to try out the idea and tweak the code before adding it to the app.


### The Code!
The basic functionality for the calculator app seemed pretty straight forward. The program needs functions to add, subtract, multiply, and divide numbers that are entered by the user. It also needs to handle decimal or negative values when they are entered.

Each time the user enters a digit or operator key, a function is called to update the display and/or do some math. For example:

    @IBAction func btn1Press(sender: UIButton) {
        handleInput("1")
    }

    @IBAction func btnMultiplyPress(sender: UIButton) {
        doMath("*")
    }

There are functions called `handleInput` and `updateDisplay` that manage converting the entered string into a decimal value and makes sure the correct number is displayed back:

    func handleInput(str: String) {
        // Is the number entered, negative?
        if str == "-" {
            if userInput.hasPrefix(str) {
                // Strip off the first character (a dash)
                userInput = userInput.substringFromIndex(userInput.startIndex.successor())
            } else {
                userInput = str + userInput
            }
        } else {
            userInput += str
        }
        accumulator = Double((userInput as NSString).doubleValue)
        updateDisplay()
    }

    func updateDisplay() {
        // If the value is an integer, don't show a decimal point
        var iAcc = Int(accumulator)
        if accumulator - Double(iAcc) == 0 {
            numField.text = "\(iAcc)"
        } else {
            numField.text = "\(accumulator)"
        }
    }

Simple enough. Right? I thought I had a handle on everything, but my first pass at the functionality involved storing the operators entered by the user and all number digits in a couple of handfuls of variables that were buried in a deep logic flow to figure out what to do and when. And while my code was a complicated nest of if/elses, it worked - mostly.

Then I compared my calculator to Apple's iOS calculator. The calculation to perform was pretty simple:

`5 + 2 * 3`

Apple's calculator app returned a value of `11`. Yes. Very good. Mine returned a value of `21`.

![Head meet desk](/images/head-desk.gif)

My app was just running through the user entered operators and digits in order and PAYING ABSOLUTELY NO ATTENTION TO OPERATOR PRECEDENCE!

But then something awesome happened - some major code refactoring and learning about stacks.

## Stacks are awesome and save you writing A LOT of code

As I mentioned above, I was trying to manage all the calculated and user entered values using variables. Then I'd written some rather complicated logic blocks to determine what to do based on all the values of the stored variables.

Enter stacks! A stack is a collection where the main (or only) operations on the collection are adding (known as 'push') and removing (known as 'pop') an item.

Rather than passing a bunch of variables around, I created two stacks - one to manage digits and the other managing operations.


    func doMath(newOp: String) {
        if userInput == "" || numStack.isEmpty {
            opStack.append(newOp)
            numStack.append(accumulator) // push

        } else {
            var stackOp = opStack.last
            if !((stackOp == "+" || stackOp == "-") && (newOp == "*" || newOp == "/")) {
                var oper = ops[opStack.removeLast()]
                accumulator = oper!(numStack.removeLast(), accumulator)

                doEquals()
            }
            opStack.append(newOp)
            numStack.append(accumulator)
        }
        userInput = ""
        updateDisplay()
    }

As shown above, the function `doMath` is called whenever the user presses an operator key (+,-,*,/), which is passed in as the variable, `newOp`. Entering the function, we examine the stacks to see what values they hold, if any, and perform the mathematic operations by pushing and popping items from each stack.

When the user pressed the Equals button, a similar operation needs to occur, but it also needs to ensure that all the math operations in the stack are called and cleared. So the `doEquals` function will call itself recursively until the stack is clear:

    func doEquals() {
        if userInput == "" {
            return
        }
        if !numStack.isEmpty {
            var oper = ops[opStack.removeLast()]
            accumulator = oper!(numStack.removeLast(), accumulator)
            if !opStack.isEmpty {
                doEquals()
            }
        }
        updateDisplay()
        userInput = ""
    }

Another thing I learned about while working on this project was the power of passing functions as variables. Each mathematic operation the calculator needs to perform can be stored as a simple function. The addition function for example, looks like this:

    func add(a: Double, b: Double) -> Double {
        var result = a + b
        return result
    }

There are similar functions for subtraction, multiplication, and division. To make referencing and calling these functions easy, I created a hash to store the string representations of each function:

    typealias Binop = (Double, Double) -> Double
    let ops: [String: Binop] = [ "+" : add, "-" : sub, "*" : mul, "/" : div ]

Then each time a mathematic operation needs to be performed, I can simply use the operation string as a lookup for the function and run it.

And here's the final product:

![Basic iOS calculator UI](/images/basic-ios-calculator.png)

## Next steps

With decimal, negative, positive values, and operator precedence all working as expected, I'm calling V1 of my calculator app complete! You can check out the code, here

[https://github.com/ursooperduper/calculator](https://github.com/ursooperduper/calculator)

Moving forward, there is an ever-growing list of improvements that could be added to the calculator app:

+   Add the % operator.
+   Support landscape orientation.
+   Support scientific calculator operations and beyond.
+   Add easter eggs when typing numbers that form words!

I'm going to move on to another app for the time being to experiment with some other areas of iOS development I'm interested in (Photos Framework, I'm looking at you!). But I think there's a lot of room for more experimentation and improvement here as well.

If you have questions or comments about this project, or have suggestions on how improve this code, please get in touch via [Twitter](https://twitter.com/ursooperduper) or on [Github](https://github.com/ursooperduper)!

One last moment of victory!
---------------------------

While my calculator is indeed, very basic, it does perform better than one production code calcuator. Mac users, test out my operation from above (5 + 2 * 3)

The dashboard calculator will immediately add the 5 + 2 before you can even enter * 3!

While programming isn't be about one-upping other people's work, I'm taking this one. My calculator is better than the OS X dashboard calculator!

\o/
