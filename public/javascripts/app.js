$(document).ready(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
'use strict';
     $("article").addClass("articletransition");
    $("nav").removeClass('navtransition');
    $(".twitter-timeline").addClass('navtransition');
    $(".footer").addClass('footertransition');
    $("#logo").addClass('logotransition');
    if($('.collapse').hasClass("in")){
      $(".navbar").addClass("fixNav");
    };
   };


