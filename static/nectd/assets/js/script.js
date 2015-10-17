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
            $("#serverstatus_off").addClass("hidden");
            $("#serverstatus_on").removeClass("hidden");
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

      $("#action_close_cookiebar").click(function(){
        Cookies.set("cookie_policy", "true");
        $("#cookiebar").addClass("hide-by-height");
      });

    };

    if(!!currentPage && currentPage == "UNSUBSCRIBED"){

      $(".unsubscribed_feedback").click(function(){
        var _this = $(this);
        $(".unsubscribed_feedback").removeClass("selected").addClass("btn-default");
        _this.removeClass("btn-default").addClass("selected").blur();
        // TODO Insert Analitycs Event
        $("#thanks").removeClass("invisible").addClass("animated bounceIn");
      });

    }

    if(!!currentPage && currentPage == "SIGNIN"){

    }
    if(!!currentPage && currentPage == "REGISTER"){

    }
  }

}

$(document).ready(function() {
  nectd.init();
  nectd.checkPrivacybarCookie();
  nectd.checkServerStatus();
})

// Initializing WOW.JS

 new WOW().init();