$(function() {
  'use strict';
  $(window).on('load', function(n) {
    $('.preloader').delay(500).fadeOut(500);
  }), $(window).on('scroll', function(n) {
        $(window).scrollTop() < 10 ? $('.header-navbar').removeClass('sticky') : $('.header-navbar').addClass('sticky');
  }), $('.navbar-toggler').on('click', function() {
    $(this).toggleClass('active');
  });
  const n = $('.sub-menu-bar .navbar-nav .sub-menu');
  if (n.length) {
    n.parent('li').children('a').append(function() {
      return '<button class="sub-nav-toggler"> <i class="fa fa-chevron-down"></i> </button>';
    });
    $('.sub-menu-bar .navbar-nav .sub-nav-toggler').on('click', function() {
      return $(this).parent().parent().children('.sub-menu').slideToggle(), !1;
    });
  }
  $('.counter').counterUp({
    delay: 10,
    time: 2e3,
  }), $(window).on('scroll', function(n) {
        $(this).scrollTop() > 600 ? $('.back-to-top').fadeIn(200) : $('.back-to-top').fadeOut(200);
  }), $('.back-to-top').on('click', function(n) {
    n.preventDefault(), $('html, body').animate({
      scrollTop: 0,
    }, 1500);
  }), $('select').niceSelect();
});
