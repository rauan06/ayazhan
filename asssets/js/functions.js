// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

    $('.slider--prev2, .slider--next2').click(function() {

      var $this = $(this),
          curLeft = $('.slider2').find('.slider--item-left2'),
          curLeftPos = $('.slider2').children().index(curLeft),
          curCenter = $('.slider2').find('.slider--item-center2'),
          curCenterPos = $('.slider2').children().index(curCenter),
          curRight = $('.slider2').find('.slider--item-right2'),
          curRightPos = $('.slider2').children().index(curRight),
          totalWorks = $('.slider2').children().length,
          $left = $('.slider--item-left2'),
          $center = $('.slider--item-center2'),
          $right = $('.slider--item-right2'),
          $item = $('.slider--item2');

      $('.slider2').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next2')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left2').next().addClass('slider--item-left2');
          $center.removeClass('slider--item-center2').next().addClass('slider--item-center2');
          $right.removeClass('slider--item-right2').next().addClass('slider--item-right2');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left2').first().addClass('slider--item-left2');
            $center.removeClass('slider--item-center2').next().addClass('slider--item-center2');
            $right.removeClass('slider--item-right2').next().addClass('slider--item-right2');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left2').next().addClass('slider--item-left2');
            $item.removeClass('slider--item-center2').first().addClass('slider--item-center2');
            $right.removeClass('slider--item-right2').next().addClass('slider--item-right2');
          }
          else {
            $left.removeClass('slider--item-left2').next().addClass('slider--item-left2');
            $center.removeClass('slider--item-center2').next().addClass('slider--item-center2');
            $item.removeClass('slider--item-right2').first().addClass('slider--item-right2');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left2').prev().addClass('slider--item-left2');
          $center.removeClass('slider--item-center2').prev().addClass('slider--item-center2');
          $right.removeClass('slider--item-right2').prev().addClass('slider--item-right2');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left2').last().addClass('slider--item-left2');
            $center.removeClass('slider--item-center2').prev().addClass('slider--item-center2');
            $right.removeClass('slider--item-right2').prev().addClass('slider--item-right2');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left2').prev().addClass('slider--item-left2');
            $item.removeClass('slider--item-center2').last().addClass('slider--item-center2');
            $right.removeClass('slider--item-right2').prev().addClass('slider--item-right2');
          }
          else {
            $left.removeClass('slider--item-left2').prev().addClass('slider--item-left2');
            $center.removeClass('slider--item-center2').prev().addClass('slider--item-center2');
            $item.removeClass('slider--item-right2').last().addClass('slider--item-right2');
          }
        }
      }

    }, 400);

    $('.slider3').animate({ opacity : 1 }, 400);

    });
    $('.slider--prev3, .slider--next3').click(function() {

      var $this = $(this),
          curLeft = $('.slider3').find('.slider--item-left3'),
          curLeftPos = $('.slider3').children().index(curLeft),
          curCenter = $('.slider3').find('.slider--item-center3'),
          curCenterPos = $('.slider3').children().index(curCenter),
          curRight = $('.slider3').find('.slider--item-right3'),
          curRightPos = $('.slider3').children().index(curRight),
          totalWorks = $('.slider3').children().length,
          $left = $('.slider--item-left3'),
          $center = $('.slider--item-center3'),
          $right = $('.slider--item-right3'),
          $item = $('.slider--item3');

      $('.slider3').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next3')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left3').next().addClass('slider--item-left3');
          $center.removeClass('slider--item-center3').next().addClass('slider--item-center3');
          $right.removeClass('slider--item-right3').next().addClass('slider--item-right3');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left3').first().addClass('slider--item-left3');
            $center.removeClass('slider--item-center3').next().addClass('slider--item-center3');
            $right.removeClass('slider--item-right3').next().addClass('slider--item-right3');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left3').next().addClass('slider--item-left3');
            $item.removeClass('slider--item-center3').first().addClass('slider--item-center3');
            $right.removeClass('slider--item-right3').next().addClass('slider--item-right3');
          }
          else {
            $left.removeClass('slider--item-left3').next().addClass('slider--item-left3');
            $center.removeClass('slider--item-center3').next().addClass('slider--item-center3');
            $item.removeClass('slider--item-right3').first().addClass('slider--item-right3');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left3').prev().addClass('slider--item-left3');
          $center.removeClass('slider--item-center3').prev().addClass('slider--item-center3');
          $right.removeClass('slider--item-right3').prev().addClass('slider--item-right3');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left3').last().addClass('slider--item-left3');
            $center.removeClass('slider--item-center3').prev().addClass('slider--item-center3');
            $right.removeClass('slider--item-right3').prev().addClass('slider--item-right3');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left3').prev().addClass('slider--item-left3');
            $item.removeClass('slider--item-center3').last().addClass('slider--item-center3');
            $right.removeClass('slider--item-right3').prev().addClass('slider--item-right3');
          }
          else {
            $left.removeClass('slider--item-left3').prev().addClass('slider--item-left3');
            $center.removeClass('slider--item-center3').prev().addClass('slider--item-center3');
            $item.removeClass('slider--item-right3').last().addClass('slider--item-right3');
          }
        }
      }

    }, 400);

    $('.slider3').animate({ opacity : 1 }, 400);

    });


  }