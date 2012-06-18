dcCarousel - a jQuery carousel plugin
====================

A jQuery plugin to create a carousel. Extremely lightweight (< 2kb), easily customizable using CSS.

Screenshot
---------------------
![Screenshot](deanc.github.com/dcCarousel/screenshot.png)

Usage
---------------------

Add the following html to your page:

	<div id="carousel" class="dcCarousel">
		<div class="items">
			<div rel="1" class="item">
				Item 1
			</div>
			<div rel="2" class="item">
				Item 2
			</div>
			etc...
		</div>	
		<div class="carousel-holder">
			<a href="#" class="arrowl">&lt;</a>
			<div class="holder">
				<ul>
					<li class="selected"><a href="#">1</a></li>
					<li><a href="#">2</a></li>
					etc...					
				</ul>
			</div>
			<a href="#" class="arrowr">&gt;</a>
		</div>
		<div class="padder">
			<div class="outer-center">
				<ul class="controls inner-center"></ul>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>
	
<i>Obviously the etc... is there indicating that you should add further items</i>
	
Add this to your `$(document).ready` function:

	$("#carousel").dcCarousel();
	
Or with options:

	$("#carousel").dcCarousel({showPager: false});
	
Options
---------------------

`perpage`
The number of items to display per page on the carousel

`width`
The width in pixels of the carousel container

`showPager`
Whether the paging dots should be shown or not

`animationSpeed`
The speed of the animation to navigate through the carousel

`animationType`
The type of animation you wish to use. These are `swing` or `linear`

`startPage`
If you wish to start the carousel on a different page to 1

`onPageChangeStart`
Callback function to be executed before the page is changed

`onPageChangeEnd`
Callback function to be executed after the page is changed