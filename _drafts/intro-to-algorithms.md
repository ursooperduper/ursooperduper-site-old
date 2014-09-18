---
layout: post
title: "Getting Started with Algorithms: Insertion Sort"
date: 0000-00-00
---

This week I started reading [Introduction to Algorithms](http://www.amazon.com/Introduction-Algorithms-Thomas-H-Cormen-ebook/dp/B007CNRCAO). I'm trying to work through at least a chapter of the book each week while I'm Hacker School.With no formal computer science training, it felt like it would be useful to supplement my project work with some study of algorithms.

The first algorithm I learned about is the Insertion Sort algorithm, which provides an efficient way to sort a small number of elements.

You can think of insertion sort the way some people sort cards into their hand when playing a game. On the table are a stack of cards for their hand, face down. The player picks up one card at a time and places it into his hand, comparing it to the cards already in his hand and places in the appropriate place - either by ascending or descending value, scanning left to right to find the right position.

So maybe you don't sort your cards that way, but it's a nice way to visualize what's going on with insertion sort.

## Code Samples

At Hacker School, I'm working in both Ruby and Swift, so I thought I'd wrap a function for the insertion sort algorithm in each language.

Here are they are:

### Ruby


    num_arr = [31, 41, 59, 26, 41, 58]
    puts "Original array:\n\t#{num_arr.join(",")}"

    def insertion_sort(arr, comp)

      (1...arr.length).each do |j|
        key = arr[j]
        i = j - 1

        while i >= 0 && arr[i].method(comp).call(key)
          arr[i+1] = arr[i]
          i = i - 1
        end

        arr[i+1] = key
      end

      puts "Array after insertion sort:\n\t#{arr.join(",")}"
    end

    insertion_sort(num_arr, ">")


[Gist](https://gist.github.com/ursooperduper/17f0fbe22d10d95ac5c3)


### Swift


    typealias ArrayInt = Array<Int>

    func lt(a: Int, b: Int) -> Bool {
        return a < b
    }
    func gt(a: Int, b: Int) -> Bool {
        return a > b
    }

    func insertionSort(arr: ArrayInt, comp: (Int, Int) -> Bool) -> ArrayInt {
        var key = 0
        var j = 0
        var i = 0
        var new_arr = arr

        for j = 1; j < new_arr.count; ++j {
            key = new_arr[j]
            i = j - 1

            while i >= 0 && comp(new_arr[i], key) {
                new_arr[i + 1] = new_arr[i]
                i = i - 1
            }
            new_arr[i + 1] = key
        }
        return new_arr
    }
    var myArr: [Int] = [31, 41, 59, 26, 41, 58]
    insertionSort(myArr, gt)

Writing these two functions was relatively simple once I'd read the pseudocode example from the book, but making them more flexible, so you could pass either greater than or less than into the function call took me a while longer to sort out. As a new programmer, an important concept I've been learning is that it's possible to pass function calls around as parameters. Swift makes this relatively easy, provided you define the explicit types you're working with in a function.

In Ruby, this was harder, as I haven't figured out how to pass a function as a parameter as easily. Instead, I learned about `.method` and `call`, which allow me to do something like pass a arithmetic opetator, `>` and let Ruby interpret that the string is used to do.
