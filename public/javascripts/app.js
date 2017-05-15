$(document).ready(function() {
     $("article").addClass("articletransition");
    $("nav").removeClass('navtransition');
    $(".twitter-timeline").addClass('navtransition');
    $(".footer").addClass('footertransition');
    $("#logo").addClass('logotransition');
    if($('.collapse').hasClass("in")){
      $(".navbar").addClass("fixNav");
    };
   });

