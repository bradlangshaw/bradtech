$(document).ready(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
'use strict';
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-84280707-1', 'auto'); ga('send', 'pageview');
     $("article").addClass("articletransition");
    $("nav").removeClass('navtransition');
    $(".twitter-timeline").addClass('navtransition');
    $(".footer").addClass('footertransition');
    $("#logo").addClass('logotransition');
    if($('.collapse').hasClass("in")){
      $(".navbar").addClass("fixNav");
    };
   });


