

$(document).ready(function() {
 
  $("#bg-slider").owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 100,
      autoPlay: 5000,
      paginationSpeed : 100,
      singleItem:true,
      mouseDrag: false,
      transitionStyle : "fade"
  });

  $("#shortFeatures").owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 100,
      pagination : false,
      autoPlay: 5000,
      paginationSpeed : 100,
      singleItem:true,
      mouseDrag: false,
      transitionStyle : "goDown"
  });

  $("#searchinput").trigger( "focus" );

 
})

// Initializing WOW.JS

 new WOW().init();