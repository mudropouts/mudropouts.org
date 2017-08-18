
$(document).ready(function(){
	$('.banner_slider').owlCarousel({
		items:1,
		navigation:false,
		pagination:false,
		mouseDrag: false,
		stopOnHover:true,
		loop:true,
		autoPlay: 5000,
		slideSpeed: 500,
	});

	$('.testimonial_carousel').owlCarousel({
		items:3,
		itemsTablet: [767,1], //2 items between 600 and 0
		itemsMobile : false ,
		navigation:true,
		navigationText:['<i class="owl_arrow_prev"></i>','<i class="owl_arrow_next"></i>'],
		pagination:false,
		mouseDrag: false,
		autoPlay:false,
		stopOnHover:true
	});


})