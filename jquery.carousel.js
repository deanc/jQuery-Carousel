(function( $ ){

    var settings = {};
    var currentPage = 1;
    var totalPages = 1;

    var methods = {
        init : function( options ) {
            settings = $.extend( {
                'perpage' : 5
                ,'width' : '800'
				,'showPager': true
				,'animationSpeed': 1000
				,'animationType': 'swing'
				,'startPage': 1
				,'onPageChangeStart': null
				,'onPageChangeEnd': null
            }, options);

            var self = this;

            // paging
            return this.each(function() {
                var $this = $(this);

				// handle building of the pager
				var ul = $(".carousel-holder ul", $this);
				var lis = $("li", ul);
				var liw = $(lis[0]).outerWidth();
				ul.width(liw*lis.length); // set the correct width whilst we're here
				var ulw = ul.outerWidth();
				totalPages = Math.round(ulw/liw/settings.perpage);
					
				if(settings.showPager) {
					for(var i = 0; i < totalPages; i++)
					{
						$(".controls", $this).append("<li><a href=\"#\"></a></li>");
					}
					$(".controls li:first-child", $this).addClass("selected");

					// set up the events for the pager
					$(".controls li a", $this).click(function () {

						if(!$(".carousel-holder ul", $this).is(":animated"))
						{
							// adjust the margin
							var index = $(this).parent().index();
							var newPage = index+1;
							$this.carousel("changePage", newPage);
							currentPage = newPage;
						}

						return false;
					});
				}

                // handle left/right arrows
                $(".carousel-holder .arrowl", $this).click(function () {
                    var carousel = $("ul", $(this).parent());
                    if(!carousel.is(":animated")) {
                        if(currentPage > 1) {
                            var newPage = currentPage-1;
                            $this.carousel("changePage", currentPage-1);
                            currentPage = newPage;
                        }
                    }
                    return false;
                });
                $(".carousel-holder .arrowr", $this).click(function () {
                    var carousel = $("ul", $(this).parent());
                    if(!carousel.is(":animated")) {
                        if(currentPage < totalPages) {
                            var newPage = currentPage+1;
                            $this.carousel("changePage", newPage);
                            currentPage = newPage;
                        }
                    }
                    return false;
                });

                // hide all but the first item!
                $(".items > div", $this).hide();
                $(".items div:first-child", $this).show();

                $(".carousel-holder li", $this).click(function () {
                    var index = $(this).index()+1;

                    $("li", $(this).parent()).removeClass("selected");
                    $(this).addClass("selected");

                    $(".items div.item", $this).hide();
                    $(".items div.item[rel='" + index + "']", $this).show();

                    return false;
                });
				
				if(settings.startPage > 1 && settings.startPage <= totalPages) {
					$this.carousel("changePage", settings.startPage, false);
				}

            });
        },
        changePage: function (page, animate) {
            this.each(function () {

				var ml = ((page-1)*-1*settings.width) + 'px';
				
                // animate the slide if we want to!
				if(animate != false) {
					if(jQuery.isFunction(settings.onPageChangeStart)) {
						settings.onPageChangeStart.call(this, page);
					}
					$(".carousel-holder ul", $(this)).animate({'margin-left': ml}, settings.animationSpeed, settings.animationType, function () {
						if(jQuery.isFunction(settings.onPageChangeEnd)) {
							settings.onPageChangeEnd.call(this, page);
						}
					});
				} else {
					$(".carousel-holder ul").css({'margin-left': ml});
				}

                // update the paging icon!
                $(".controls li.selected", $(this)).removeClass("selected");
                $(".controls li:nth-child(" + (page) + ")", $(this)).addClass("selected");
            });

        }
    };

    $.fn.carousel = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.dcSlider' );
        }

    };

})( jQuery );