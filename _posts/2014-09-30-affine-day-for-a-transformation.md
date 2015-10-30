---
layout: post
title: "Affine Day For a Transformation"
date: 2014-09-30
tags:
- math
- iOS
- Swift
- Xcode
- projects
categories:
- Projects
- Development
- Mobile
---

As I learn iOS development with Swift, I've been trying to choose projects that help me explore different parts of the iOS SDK. To try out the new Photos Framework, I decided to create a photo app that lets you take a picture of a friend and replace their head with a cartoon one, because let's face it, this is an app you need. The app, called Creatures are Friends, is still a work in progress, but you can follow along [on Github](https://github.com/ursooperduper/creatures-are-friends).

Once the cartoon head is oriented the way the user likes it, it can be saved to the their photo library. In the future, I'll also add share functionality, facial recognition, and more cartoon heads. This post, however, is about the basics - saving the created image and what I learned as I implemented this core feature.

# Act 1: I try to do simple things

I thought it would be trivial. Take the two images in the app's UIView and save them as a new image. It should be easy.

![I cried.](/images/gifs/bttf-sad.gif)

But, no. Not easy at all. Making this work turned out to be one of the biggest challenges I've encountered in iOS development so far. With the Photos Framework, it's really easy to access a user's photo library and view or save images so I didn't need to worry about that. But taking two images, saving their modified position/rotation/scale and saving them as one new image was a completely different story. A long, painful story.

This happened.
![Screenshot of CAF with incorrect positioning.](/images/blog/bad-position-1.jpg)

And this.
![Screenshot of CAF with incorrect positioning.](/images/blog/bad-position-2.jpg)

Clearly, I wasn't working with the assets properly. The images I was creating were huge, the scale was off, and the positions were a complete mess.

![OMFG](/images/gifs/neverending-story-scream.gif)

After a slight melt down, I calmly explored my options.

## Option 1: Save a screenshot of the UIView that contains the  images

This approach was simple - just take a screenshot. It meant I wouldn't need to know anything about the assets themselves, I would just take a snapshot of the UIView that contains them. Here's the code:

{% highlight swift %}
func getUIImageFromView(view: UIView) -> UIImage {
    UIGraphicsBeginImageContext(view.bounds.size)
    view.layer.renderInContext(UIGraphicsGetCurrentContext())
    var graphicImg: UIImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return graphicImg
}
{% endhighlight %}

The problem with this approach is in its simplicity - it's just  a screenshot. I was eager to move on with the project so I was excited this worked, but there were some problems I couldn't ignore:

1. The new image size is just the size of the UIView, not the original photo.
2. The resulting image quality wasn't great (and completely unsuitable for framing).

The perfectionist in me needed to find a better solution. So I pushed myself to learn how to properly orient and save the images as one and hopefully arrive with a higher quality final image.

# Act two: I learn that I don't know what I don't know

I spent entirely too much time trying to combine the images. There's so much documentation that it's hard to know where to look. I eventually found frameworks in the iOS SDK made specifically to address what I was after. In the future, I'll save myself a lot of time if I learn more about what's offered in the iOS SDK. Lesson learned.

## Getting to Know Affine Transformations

The other thing I needed to understand more in depth was what was happening to the cartoon image when the user pinches, rotates, or moves it.

A good friend walked me through affine transformations, how to create an affine transformation matrix, and helped connect the dots with  graphing I'd done back in elementary school! Remember plotting a series points to make a picture, then using another set of points, to move that picture to a new location and orientation on a graph? That involves an affine transformation!

![I'm learning!](/images/gifs/learning.gif)

An affine transformation is a function that manipulates an image while preserving planes, points, and lines in that image. For example, if you rotate an image that has parallel lines, the lines should still be parallel after that rotation takes place. Affine transformations are used for all sorts of things - including some of which are extremely relevant to my photo project: rotation, scale, and translation. This function prevents distortion of the image as it's transformed and understanding this would restore my sanity.

Affine transformations are defined in a matrix which has points that represent the position, rotation, and scale of an image. Bingo.

## Options 2: Use the Core Graphics & Core Image Frameworks to manipulate two images & save them as one

Armed with a new-found understanding of affine transformations, this once complex task became much more straightforward. The code I ended up with is shown below. I'll walk through it step by step to explain what's going on.

### Preparing the Cartoon Character Image

{% highlight swift %}
func formatCharacterForSaving(character: UIImage) -> UIImage {
  let rotation   = CGAffineTransformMakeRotation(-(characterInfo["rotation"]!))
  let scale = CGAffineTransformMakeScale((characterInfo["scale"])!/2, (characterInfo["scale"])!/2)
  let affineTransformationMatrix = CGAffineTransformConcat(rotation, scale)
  let context = CIContext(options: nil)
  let transformFilter = CIFilter(name: "CIAffineTransform")
  let characterData = CIImage(image: character)
  transformFilter.setValue(characterData, forKey: "inputImage")
  transformFilter.setValue(NSValue(CGAffineTransform: affineTransformationMatrix), forKey: "inputTransform")
  let filterResult = transformFilter.valueForKey("outputImage") as CIImage
  return UIImage(CIImage: filterResult)!
}
{% endhighlight %}

The `formatCharacterForSaving` function does just what it says. It takes the important information we've stored about the character and uses an affine transformation to position the image exactly as the user defined it in their view.

Not shown in the code above, but important to note is that when the user hits the save button in the app, the final position, rotation, and scale of the character are saved into a dictionary called `characterInfo`. In the first couple of lines of the function, affine transformation matrices are created for the character image:

{% highlight swift %}
let rotation   = CGAffineTransformMakeRotation(-(characterInfo["rotation"]!))
let scale = CGAffineTransformMakeScale((characterInfo["scale"])!/2, (characterInfo["scale"])!/2)
{% endhighlight %}

`rotation` and `scale` create transformation matricies for the rotation and scale the user applied to the character as they pinched and rotated it. There is a problem though, in that there should be only one tranformation matrix applied to the image. Luckily, there's a concatenate function that is used to combine two affine transformation matrices:

{% highlight swift %}
let affineTransformationMatrix = CGAffineTransformConcat(rotation, scale)
{% endhighlight %}

With the affine transformation matrix defined, it can now be applied to the character to get it into position, ready to be applied to the final image:

{% highlight swift %}
let context = CIContext(options: nil)
let transformFilter = CIFilter(name: "CIAffineTransform")
let characterData = CIImage(image: character)
transformFilter.setValue(characterData, forKey: "inputImage")
transformFilter.setValue(NSValue(CGAffineTransform: affineTransformationMatrix), forKey: "inputTransform")
{% endhighlight %}

A lot happens in the code above. First, a context is defined, which you can think of as a canvas onto which an image will be painted. Next a filter, called `CIAffineTransform`, is requested. On line 3, the character image is converted to a CIImage, which is an object that holds all the data about the image and is the format required for the transform filter that's to be applied.

Now, magic happens. On lines 4 and 5, the properties for the CIAffineTransform filter are defined. The filter requires two inputs: `inputImage`, and `inputTransform`. The CIImage object, `characterData`, is used to supply the description of the image, and the affine transformation matrix, `affineTransformationMatrix`, is passed as "inputTransform".

{% highlight swift %}
let filterResult = transformFilter.valueForKey("outputImage") as CIImage
return UIImage(CIImage: filterResult)!
{% endhighlight %}

The last thing to do is grab the result of the affine transformation filter. The filter has a key called, `outputImage`, which contains the image data for the cartoon character after the filter has been applied. The function ends here, taking the CIImage object retrieved from the filter and converting it to a UIImage.

### Combining the two images

With the cartoon head prepped, the two images can be combined:

{% highlight swift %}
func getCombinedImage(character: UIImage, photo: UIImage) -> UIImage {
    let photoSize = CGSizeMake(photo.size.width, photo.size.height)
    UIGraphicsBeginImageContext(photoSize)
    photo.drawInRect(CGRectMake(0, 0, photoSize.width, photoSize.height))
    character.drawInRect(CGRectMake(characterInfo["xPos"]!, characterInfo["yPos"]!, character.size.width, character.size.height), blendMode: kCGBlendModeNormal, alpha: 1.0)
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return newImage
}
{% endhighlight %}

The `getCombinedImage` function takes two parameters, `character`, the UIImage cartoon we just created using the affine transformation matrix, and `photo`, the picture of the person who's mug we want to cover up with a cartoon. With those two inputs, a new image asset can be created that can then be saved to the user's photo library. Let's walk through the code step by step:

{% highlight swift %}
let photoSize = CGSizeMake(photo.size.width, photo.size.height)
{% endhighlight %}

First, the size of the final image is defined. The method used to create our final image require the size to be a CGSize. So the constant, `photoSize`, is defined and uses the method, CGSizeMake to define the image dimensions in the correct format.

{% highlight swift %}
UIGraphicsBeginImageContext(photoSize)
{% endhighlight %}

The next step is to create a new context - the canvas onto which we're going to paint our two images.

{% highlight swift %}
photo.drawInRect(CGRectMake(0, 0, photoSize.width, photoSize.height))
{% endhighlight %}

Inside the context, the UIImage object `photo` calls `drawInRect`, which takes a CGRect object that requires values for the x, y, width, and height of the photo to be drawn. Because this is the background image, the x and y coordinates are simply, 0.0.

{% highlight swift %}
character.drawInRect(CGRectMake(characterInfo["xPos"]!, characterInfo["yPos"]!, character.size.width, character.size.height), blendMode: kCGBlendModeNormal, alpha: 1.0)
{% endhighlight %}

With the background image (photo) painted onto the canvas (context), the cartoon character can now be painted on top. This time, `character` (the cartoon image) calls the `drawInRect` method. This time, some additional parameters are included. In addition to the x, y, width, and height for the character, a blend mode and alpha are specified. In this case, a normal blend mode and alpha of 1.0 are given to make the image opaque.

{% highlight swift %}
let newImage = UIGraphicsGetImageFromCurrentImageContext()
{% endhighlight %}

With both images now painted on to the canvas, the resulting image is retrieved by calling the `UIGraphicsGetImageFromCurrentImageContext` function.

Now there is a UIImage of the two images overlaid, just as the user defined them by manipulating the character onscreen! From here, you can simply make a request to the new Photos Framework to save the image and place it in the appropriate photo library.

Boom!

## I got 99 problems...

There are still some problems with my approach (and maybe some I haven't identified yet).

The background image might need to have an affine transformation performed on it as well. The images I had been using to test all shared one important characteristic, they were all oriented in the same way - up. However, if an image was taken in landscape mode, for example, then it needs a bit of work before the image is saved.

Another issue I've uncovered is that while the quality of the new image is much better than my earlier attempts, the cartoon head is slightly pixelated depending on how much it's scaled. I'd like to figure out if I can improve the quality of the cartoon.

Looking back, learning how to combine the two images together was really fun. I learned about more frameworks in the iOS SDK,  brushed up on some math, and enjoyed testing and debugging issues that arose.

If you've worked on something similar and have suggestions on better ways to save two images as one, I'd love to hear from you! Post your thoughts in the comments below or get in touch on Twitter!
