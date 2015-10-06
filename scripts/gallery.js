$(document).ready(function(){
	var item, img, title, largeImg, windowWidth;
	var cw, ch, cl, ct, hpadding, vpadding, imgTag;
	// Flag for preventing multiple image display
	var lbLoading = false;
	var doc = $(document);

	$(".lightbox li").click(function(){
		if (lbLoading) return false;
		lbLoading= true;

		item  = $(this);
		img   = item.find("img");
		title = item.find(".title").html();

		// Remove active class from previously clicked LI
		$(".lightbox li.active").removeClass("active");
		// Mark the clicked LI as active for later use
		item.addClass("active");

		largeImg = new Image();

		windowWidth = $(window).width();

		if (windowWidth > 800) {
			largeImg.src = img.attr("datalg");
		} else if (windowWidth > 500 && windowWidth < 800) {
			largeImg.src = img.attr("dataml");
		} else if (windowWidth > 300 && windowWidth < 500) {
			largeImg.src = img.attr("datamd");
		} else {
			largeImg.src = img.attr("src");
		}

		// Add additional HTML - only if it hasn't been added before
		if ($(".lb-backdrop").length < 1) {
			var lbBackdrop = '<div class="lb-backdrop"></div>';
			var lbCanvas 	 = '<div class="lb-canvas"></div>';
			var lbPrevious = '<span class="lb-prev"><i class="fa fa-chevron-left"></i></span>';
			var lbTitle 	 = '<span class="lb-title"></span>';
			var lbNext 		 = '<span class="lb-next"><i class="fa fa-chevron-right"></i></span>';
			var lbControls = '<div class="lb-controls">' + lbPrevious + lbTitle + lbNext + '</div>';
			var totalHtml  = lbBackdrop + lbCanvas + lbControls;

			$(totalHtml).appendTo("body");
		}
		// Fade in lightbox elements if they are hidden due to a previous exit
		if ($(".lb-backdrop:visible").length === 0) {
			$(".lb-backdrop, .lb-canvas, .lb-controls").fadeIn("slow");
		}

		// Display preloader till the large image loads and make the previous image translucent so that the loader in the BG is visible
		if (!largeImg.complete) {
			$(".lb-canvas").addClass("loading").children().css("opacity", "0.5");
		}

		//Disabling left/right controls on first/last items
		if (item.prev().length === 0) {
			$(".lb-prev").addClass("inactive");
		} else {
			$(".lb-prev").removeClass("inactive");
		}
		if (item.next().length === 0) {
			$(".lb-next").addClass("inactive");
		} else {
			$(".lb-next").removeClass("inactive");
		}

		// Centering .lb_canvas
		cw = $(".lb-canvas").outerWidth();
		ch = $(".lb-canvas").outerHeight();
		// top and left coordinates
		cl = ($(window).width() - cw) / 2;
		ct = ($(window).height() - ch) / 2;
		$(".lb-canvas").css({top: ct, left: cl});

		// Inserting the large image into .lb_canvas once it's loaded
		$(largeImg).load(function() {
			// Recentering .lb_canvas with new dimensions
			cw = largeImg.width;
			ch = largeImg.height;
			// .lb_canvas padding to be added to image width/height to get the total dimensions
			hpadding = parseInt($(".lb-canvas").css("paddingLeft")) + parseInt($(".lb-canvas").css("paddingRight"));
			vpadding = parseInt($(".lb-canvas").css("paddingTop")) + parseInt($(".lb-canvas").css("paddingBottom"));
		  cl = ($(window).width() - cw - hpadding) / 2;
			ct = ($(window).height() - ch - vpadding) / 2;

			// Animate .lb-canvas to new dimensions & position
			$(".lb-canvas").html("").animate({width: cw, height: ch, top: ct, left: cl}, 500, function() {
				// Insert the image but keep it hidden
				imgTag = '<img src="' + largeImg.src + '" style="opacity: 0;" />';
				$(".lb-canvas").html(imgTag);
				$(".lb-canvas img").fadeTo("slow", 1);
				// Displaying the image title
				$(".lb-title").html(title);

				lbLoading= false;
				$(".lb-canvas").removeClass("loading");
			});
		});
	});

	// Navigation
	doc.on("click", ".lb-prev", function(){ navigate(-1); });
	doc.on("click", ".lb-next", function(){ navigate(1); });
	doc.on("click", ".lb-backdrop", function(){ navigate(0); });

	// Bonus! Keyboard navigation
	doc.keyup(function(e) {
		// Keyboard navigation should work only if lightbox is active which means backdrop is visible.
		if ($(".lb-backdrop:visible").length == 1) {
			//Left
			if (e.keyCode == "37") navigate(-1);
			//Right
			else if (e.keyCode == "39") navigate(1);
			//Esc
			else if (e.keyCode == "27") navigate(0);
		}
	});

	function navigate(direction) {
		if (direction === -1) { // left
			$(".lightbox li.active").prev().trigger("click");
		} else if (direction == 1) { //right
			$(".lightbox li.active").next().trigger("click");
		} else if (direction === 0) { //exit
			$(".lightbox li.active").removeClass("active");
			$(".lb-canvas").removeClass("loading");
			// Fade out the lightbox elements
			$(".lb-backdrop, .lb-canvas, .lb-controls").fadeOut("slow", function() {
				// empty canvas and title
				$(".lb-canvas, .lb-title").html("");
			});
			lbLoading = false;
		}
	}
});
