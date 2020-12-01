
;(function () {

	'use strict';

	var TxtType = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function() {
	    var i = this.loopNum % this.toRotate.length;
	    var fullTxt = this.toRotate[i];

	    if (this.isDeleting) {
	    this.txt = fullTxt.substring(0, this.txt.length - 1);
	    } else {
	    this.txt = fullTxt.substring(0, this.txt.length + 1);
	    }

	    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	    var that = this;
	    var delta = 200 - Math.random() * 100;

	    if (this.isDeleting) { delta /= 2; }

	    if (!this.isDeleting && this.txt === fullTxt) {
	    delta = this.period;
	    this.isDeleting = true;
	    } else if (this.isDeleting && this.txt === '') {
	    this.isDeleting = false;
	    this.loopNum++;
	    delta = 500;
	    }

	    setTimeout(function() {
	    that.tick();
	    }, delta);
	};

	window.onload = function() {
	    var elements = document.getElementsByClassName('typewrite');
	    for (var i=0; i<elements.length; i++) {
	        var toRotate = elements[i].getAttribute('data-type');
	        var period = elements[i].getAttribute('data-period');
	        if (toRotate) {
	          new TxtType(elements[i], JSON.parse(toRotate), period);
	        }
	    }
	    // INJECT CSS
	    var css = document.createElement("style");
	    css.type = "text/css";
	    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	    document.body.appendChild(css);
	};


	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');

	    	}

	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');

	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');

		$section.waypoint(function(direction) {

		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})

// Pop up layer
		$('.btn-example').click(function(){

			var $href = $(this).attr('href');
			layer_popup($href);
		});

    var layer_popup = function(el) {

        var $el = $(el);

				$el.fadeIn();
        $el.css({top: 0, left: 0});

        $el.find('a.btn-layerClose').click(function(){
            $el.fadeOut();
            return false;
        });
    }
	};

	// Document on load.
	$(function(){
		fullHeight();
		contentWayPoint();
		burgerMenu();
		clickMenu();
		navigationSection();
		mobileMenuOutsideClick();
		//stickyFunction();
		owlCrouselFeatureSlide();
	});


}());
