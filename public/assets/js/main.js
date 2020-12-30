$(function() {
  'use strict';

  // ===== Prealoder

  $(window).on('load', function(event) {
    $('.preloader').delay(500).fadeOut(500);
  });


  // ===== Sticky

  $(window).on('scroll', function(event) {
    const scroll = $(window).scrollTop();
    if (scroll < 10) {
      $('.header-navbar').removeClass('sticky');
    } else {
      $('.header-navbar').addClass('sticky');
    }
  });


  // ===== Mobile Menu

  $('.navbar-toggler').on('click', function() {
    $(this).toggleClass('active');
  });

  const subMenu = $('.sub-menu-bar .navbar-nav .sub-menu');

  if (subMenu.length) {
    subMenu.parent('li').children('a').append(function() {
      return '<button class="sub-nav-toggler"> <i class="fa fa-chevron-down"></i> </button>';
    });

    const subMenuToggler = $('.sub-menu-bar .navbar-nav .sub-nav-toggler');

    subMenuToggler.on('click', function() {
      $(this).parent().parent().children('.sub-menu').slideToggle();
      return false;
    });
  }


  // ===== Counter


  // ===== Back to top

  // Show or hide the sticky footer button
  $(window).on('scroll', function(event) {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top').fadeIn(200);
    } else {
      $('.back-to-top').fadeOut(200);
    }
  });


  // Animate the scroll to Top
  $('.back-to-top').on('click', function(event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0,
    }, 1500);
  });
});
