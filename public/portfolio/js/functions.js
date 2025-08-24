;(function($) {

  'use strict'; // Using strict mode

  // Vertical lines
  $('body').append('<div class="l1"></div><div class="l2"></div><div class="l3"></div>')

  // Page transitions

  $('a[href]:not([href^="#"]):not([data-toggle=tab]):not([data-toggle=collapse]):not([target=_blank]):not(.anchor)').addClass('smooth');

  $('.smooth-transition').animsition({
    linkElement: '.smooth',
    inDuration: 500,
    outDuration: 500,
  });

  $('html').on('click', function(e){
    $('.navigation, .nav-trigger').removeClass('tapped');
  });

  const navTrigger = document.querySelector('.nav-trigger');
  const navigation = document.querySelector('.navigation');
  const navOverlay = document.querySelector('.nav-overlay');
  const navSwipeIndicator = document.querySelector('.nav-swipe-indicator');
  const navCloseBtn = document.querySelector('.nav-close-btn'); // Get the close button

  if (!navigation || !navTrigger) return;

  // Removed old jQuery mobile navigation toggle handler
  // $('.nav-trigger').on('click', function(e){
  //   e.stopPropagation();
  //   $('.navigation').toggleClass('tapped');
  //   if($('.navigation').hasClass('tapped'))
  //     $('.nav-trigger').addClass('tapped');
  //   else
  //     $('.nav-trigger').removeClass('tapped');
  // });

  // Removed old jQuery navigation list item click handler
  // $('.navigation li').on('click', function(e){
  //   e.stopPropagation();
  //   $(this).toggleClass('tapped');
  // });

  // Grid functions

  var $grid = $('.grid');
  var isPackeryInitialized = false;

  $grid.imagesLoaded(function(){
    // Initialize Masonry after the images are loaded
    $grid.packery({
      itemSelector: '.item', // Portfolio item
    });
    isPackeryInitialized = true;
  });

  // Safe Packery layout function
  function safePackeryLayout() {
    if (isPackeryInitialized) {
      $grid.packery('layout');
    }
  }

  $('.filter-trigger').on('click', function(e){
    e.preventDefault();
    $('body').addClass('filters-active');
    $('html,body').animate({
      scrollTop: $('.grid').offset().top+'px'
    }, 500);
    $('.filter-container').fadeIn();
  });

  $('.filter-container').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('filters-active');
    $('.filter-container').fadeOut();
  });

  $('.filter').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);
    var selected = $this.attr('data-filter');
    var $filters = $('.filter');
    var $gridItems = $('.grid .item');

    // Add loading class to the clicked filter button
    $this.addClass('loading');

    // Remove active class from all filters and add to the clicked one
    $filters.removeClass('active');
    $this.addClass('active');

    // Perform filtering
    if (selected === 'item') {
      // Show all
      $gridItems.show().css({
        'transform': 'scale(1)',
        'opacity': '1'
      });
    } else {
      $gridItems.hide();
      $('.grid .' + selected).show().css({
        'transform': 'scale(1)',
        'opacity': '1'
      });
    }

    // Layout grid and remove loading class after layout is complete
    $grid.imagesLoaded(function() {
      safePackeryLayout();
      // Remove loading class from the clicked filter button
      $this.removeClass('loading');
    });
  });

  $(window).on('resize', function(){
    // Change Masonry on resize
    setTimeout(function(){
      safePackeryLayout();
      window.requestAnimationFrame(inView); // Make new items visible
    }, 1500);
  });

  // You can use anchor links, using the .anchor class
  $('.anchor').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var href = $(this).attr('href');
    $('html,body').animate({
      scrollTop : $(href).offset().top+'px'
    });
  });

  // Parallax background script, use the ".parallax" class.
  var parallaxSpeed = 0.15;

  function parallax(){
    // Parallax scrolling function
    $('.parallax').each(function(){
      var el = $(this);
      var yOffset = $(window).scrollTop(),
          parallaxOffset = yOffset * parallaxSpeed,
          parallaxOffset = +parallaxOffset.toFixed(2);
      if(el.hasClass('fs')){
        el.css('transform','translate3d(-50%,-'+(50-parallaxOffset*0.15)+'%,0)');
      } else {
        el.css('transform','translate3d(0,'+parallaxOffset+'px,0)');
      }
    });
  }

  // Initialize functions on scroll
  $(window).on('scroll', function(){
    window.requestAnimationFrame(parallax); // Parallax
  });

  var $animation_elements = $('.item, .fadein'); // The fly-in element, used for elements that fly-in the window after they're visible on screen

  function inView() { // Function when element is in view
    var window_height =   $(window).height();
    var window_top_position =   $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top-100;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $(window).on('scroll resize', function(){
    window.requestAnimationFrame(inView);
    $('.anchor').each(function(){
      var id = '#'+$('.in-view').attr('id');
      if(id == $(this).attr('href')){
        $('.anchor').removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  $(window).on('load', function(){
    window.requestAnimationFrame(inView);
  });

  $(window).on('pageshow', function(event) {
      if (event.originalEvent.persisted) {
          window.location.reload()
      }
  });

  // Removed old mobile navigation event listeners and logic, as they are now handled by js/modules/navigation.js

})(jQuery);
