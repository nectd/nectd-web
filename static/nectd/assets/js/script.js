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

    if(!!currentPage && currentPage.indexOf("HOME") >= 0){
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

      $("#action_close_cookiebar").click(function(e){
        e.preventDefault();
        Cookies.set("cookie_policy", "true");
        $("#cookiebar").addClass("hide-by-height");
      });

    };

    if(!!currentPage && currentPage.indexOf("UNSUBSCRIBED") >= 0){

      $(".unsubscribed_feedback").click(function(e){
        e.preventDefault();
        var _this = $(this);
        $(".unsubscribed_feedback").removeClass("selected").addClass("btn-default");
        _this.removeClass("btn-default").addClass("selected").blur();
        // TODO Insert Analitycs Event
        $("#thanks").removeClass("invisible").addClass("animated bounceIn");
      });

    }

    if(!!currentPage && currentPage.indexOf("SIGNIN") >= 0){

    }
    if(!!currentPage && currentPage.indexOf("REGISTER") >= 0){
      var step1 = $("#register-step1");
      var step2 = $("#register-step2");
      $("#register-step1-btn").click(function(e){
        e.preventDefault();
        step1.removeClass("animated slideOutLeft slideInLeft").addClass("animated slideOutLeft");
        step2.removeClass("hidden").removeClass("animated slideInRight slideOutRight").addClass("animated slideInRight");
      });
      $("#register-step1-back-btn").click(function(e){
        e.preventDefault();
        step1.removeClass("animated slideOutLeft slideInLeft").addClass("animated slideInLeft");
        step2.removeClass("animated slideInRight slideOutRight").addClass("animated slideOutRight");
      });

      $(".toggle_showpassword").hover(function(){
        var $this = $(this);
        if (!$this.hasClass("on")){
          $this.next('input').attr("type", "text")
        }
      }, function(){
        var $this = $(this);
        if (!$this.hasClass("on")){
          $this.next('input').attr("type", "password")
        }
      });
      /*.click(function(){
        var $this = $(this);
        if ($this.hasClass("on")){
          $this.removeClass("on").text("show");
          $this.next('input').attr("type", "text")
        }else{
          $this.addClass("on").text("hide");
          $this.next('input').attr("type", "password")
        }

      });*/


    }
    if(!!currentPage && currentPage.indexOf("ERROR") >= 0){
      $("#error_action_1").click(function(e){
        e.preventDefault();
        window.location.replace("/");
        /* TO DO - TRY AGAIN LOGIC */
      });
      $("#error_action_2").click(function(e){
        e.preventDefault();
        window.location.replace("/");
      });
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