var nectd = {
  uptimerobot_id: "m777152422-ad24efadc5fa462b916f09b1",
  checkServerStatus: function(){
    $.ajax({
     type: 'GET',
      url: "https://api.uptimerobot.com/getMonitors?apiKey="+nectd.uptimerobot_id+"&format=json",
      jsonpCallback: 'jsonUptimeRobotApi',
      contentType: "application/json",
      dataType: 'jsonp'
    })
    .done(function(data) {
         if(data && data.monitors && data.monitors.monitor && data.monitors.monitor[0] && (data.monitors.monitor[0].status == "2" )){
            $("#serverstatus_off").addClass("hide");
            $("#serverstatus_on").removeClass("hide");
         }
    });
  },
  checkPrivacybarCookie: function(){
    if(Cookies.get("cookie_policy") != "true"){
      $("#cookiebar").removeClass("hide-by-height");
    };
  },
  init: function(){

    if(!!currentPage && currentPage == "HOME"){
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
    }

  },
  handlers: function(){
    $("#action_close_cookiebar").click(function(){
      Cookies.set("cookie_policy", "true");
      $("#cookiebar").addClass("hide-by-height");
    });
  }

}

$(document).ready(function() {
  nectd.init();
  nectd.handlers();
  nectd.checkPrivacybarCookie();
  nectd.checkServerStatus();
})

// Initializing WOW.JS

 new WOW().init();