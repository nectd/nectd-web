$(document).ready(function() {

	/***************** Waypoints ******************/

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated bounceInDown');
	}, {
		offset: '75%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInRight');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

	/***************** Flickity ******************/

	$('#featuresSlider').flickity({
		cellAlign: 'left',
		contain: true,
		prevNextButtons: false
	});

	$('#showcaseSlider').flickity({
		cellAlign: 'left',
		contain: true,
		prevNextButtons: false,
		imagesLoaded: true
	});

	/***************** Fancybox ******************/

	$(".youtube-media").on("click", function(e) {
		var jWindow = $(window).width();
		if (jWindow <= 768) {
			return;
		}
		$.fancybox({
			href: this.href,
			padding: 4,
			type: "iframe",
			'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
		});
		return false;
	});

});

$(document).ready(function() {
	$("a.single_image").fancybox({
		padding: 4,
	});
});

/***************** Nav Transformicon ******************/

/* When user clicks the Icon */
$(".nav-toggle").click(function() {
	$(this).toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function() {
	$(".nav-toggle").toggleClass("active");
	$(".overlay-boxify").toggleClass("open");
});

/***************** Smooth Scrolling ******************/

$('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 2000);
			return false;
		}
	}
});


$(function() {

    // Get the form.
    var form = $('#mailchimp');

    // Get the messages div.
    var formLoading = $('#loading');
    var formMessages = $('#loading .status');
    var section_a = $('#pre-subscribe');
    var section_b = $('#post-subscribe');

    // Set up an event listener for the subscribe form.
    $(form).submit(function(e) {

        // Stop the browser from submitting the form.
        e.preventDefault();
        
        // Show the loading div.
        $(formLoading).fadeIn(100);

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

        .done(function(response) {

            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $(formMessages).fadeIn(100);
            $(formMessages).delay(1000).fadeOut(500);
            $(formLoading).delay(1000).fadeOut(500);

            // Clear the form.
            $('#fname').val('');
            $('#lname').val('');
            $('#email').val('');

            $(section_a).fadeOut(500);
            $(section_b).delay(1000).fadeIn(500);
        })

        .fail(function(data) {

            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');
            $(formMessages).fadeIn(100);
            $(formMessages).delay(1000).fadeOut(500);
            $(formLoading).delay(1000).fadeOut(500);
            
            // Clear the form.
            $('#fname').val('');
            $('#lname').val('');
            $('#email').val('');
        });
    });
});

