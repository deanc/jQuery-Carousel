(function( $ ){

    var settings = {};
    var currentPage = 1;
    var totalPages = 1;

    var methods = {
        init : function( options ) {
            settings = $.extend( {
                'perpage' : 5,
                'width' : '800'
            }, options);

            var self = this;

            // paging
            return this.each(function(){
                var $this = $(this);


                // handle building of the pager
                var ul = $(".carousel-holder ul", $this);
                var lis = $("li", ul);
                var liw = $(lis[0]).outerWidth();
                ul.width(liw*lis.length); // set the correct width whilst we're here
                var ulw = ul.outerWidth();
                totalPages = ulw/liw/settings.perpage;
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
    //                    var interval = 800;
    //                    $(".carousel-holder ul", obj).animate({'margin-left': (index*-1*interval) + 'px'}, 1000);
                        var newPage = index+1;
                        $this.dcCarousel("changePage", newPage);
                        currentPage = newPage;
                    }

                    return false;
                });

                // handle left/right arrows
                $(".carousel-holder .arrowl", $this).click(function () {
                    var carousel = $("ul", $(this).parent());
                    if(!carousel.is(":animated")) {
                        if(currentPage > 1) {
                            var newPage = currentPage-1;
                            $this.dcCarousel("changePage", currentPage-1);
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
                            $this.dcCarousel("changePage", newPage);
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

            });
        },
        changePage: function (page) {
            this.each(function () {

                // animate the slide!
                $(".carousel-holder ul", $(this)).animate({'margin-left': ((page-1)*-1*settings.width) + 'px'}, 1000);

                // update the paging icon!
                $(".controls li.selected", $(this)).removeClass("selected");
                $(".controls li:nth-child(" + (page) + ")", $(this)).addClass("selected");
            });

        }
    };

    $.fn.dcCarousel = function( method ) {

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