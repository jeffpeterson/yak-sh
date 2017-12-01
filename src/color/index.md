# Color

Here is an image:

{% include image.html
    src="./the-first-fires.jpg"
    alt="An album cover."
    caption="The North Borders by Bonobo." %}

It's looks nice, there are some great colors in there.

If I were to pick out the colors for this image,
I could imagine picking {% include color.html color="#08141B" %} as the background color,
{% include color.html color="#F8E4B8" %} as the primary color,
and {% include color.html color="#72A692" %} as the secondary color.

Let's build a program that analyzes this image and selects similar colors.

We need to convert the image to the YCbCr color-space created for broadcast television.
YCbCr was used for broadcast signals in part because color data is compressed
into fewer bits by removing extra colors that the human eye can't differentiate.
This is perfect for finding contrasting colors!

Here's what this image looks like after converting to the new color-space.

<figure id="figure1">
</figure>

<script type="module" src="index.js"></script>
<link href="./index.css" rel="stylesheet" />
