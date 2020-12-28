"use strict";

fontSize();
$(window).resize(function () {
  fontSize();
});

function fontSize() {
  var size;
  var winW = $(window).width();

  if (winW <= 1400 && winW > 800) {
    size = Math.round(winW / 14);
  } else if (winW <= 800) {
    size = Math.round(winW / 7.5);

    if (size > 65) {
      size = 65;
    }
  } else {
    size = 100;
  }

  $('html').css({
    'font-size': size + 'px'
  });
}

$(function () {
  //--
  setTimeout(function () {
    $('body').addClass('show');
  }, 500);
  new WOW().init(); //--

  {} // $('.navA').click(function () {
  //     if ($('.g-head').hasClass('navShow')) {
  //         $('.g-head').removeClass('navShow')
  //     } else {
  //         $('.g-head').addClass('navShow')
  //     }
  // });
  // $('.g-nav').find('li').each(function () {
  //     var li = $(this);
  //     if ($(this).find('.list').length > 0) {
  //         li.find('a.name').click(function () {
  //             if ($(window).width() > 800) return;
  //             if (li.hasClass('on')) {
  //                 li.removeClass('on');
  //                 li.find('.list').hide();
  //             } else {
  //                 li.addClass('on');
  //                 li.find('.list').show();
  //             }
  //             return false;
  //         })
  //     }
  // })
  //--返回顶部

  scroll2top(); //--js下拉选择框

  {
    $('.select').each(function () {
      var select = $(this);
      select.find('select').change(function () {
        select.find('span').html($(this).find("option:selected").text());
      });
    });
  }
  {
    $('.form').find('li').each(function () {
      var li = $(this);
      li.find('input').focus(function () {
        li.addClass('on');
      });
      li.find('input').blur(function () {
        li.removeClass('on');
      });
      li.find('textarea').focus(function () {
        li.addClass('on');
      });
      li.find('textarea').blur(function () {
        li.removeClass('on');
      });
    });
  }
});

function swiperFun(swiper) {
  this.dom = swiper.dom;
  this.domList = this.dom;
  this.dom.find('ul').addClass('swiper-wrapper');
  this.dom.find('li').addClass('swiper-slide');

  if (swiper.domList !== undefined) {
    this.domList = this.dom.find(swiper.domList);
  }

  if (this.dom.find('.num').length > 0) {
    this.dom.find('.num-total').html(this.dom.find('li').length);
  }

  this.change = function () {};

  var that = this;
  this.mySwiper = new Swiper(that.domList, {
    loop: swiper.loop !== undefined ? swiper.loop : true,
    autoplay: swiper.autoplay !== undefined ? swiper.autoplay : 5000,
    autoplayDisableOnInteraction: false,
    paginationClickable: true,
    speed: 600,
    slidesPerView: swiper.slidesPerView !== undefined ? swiper.slidesPerView : 1,
    centeredSlides: swiper.centeredSlides !== undefined ? swiper.centeredSlides : false,
    pagination: that.dom.find('.dots'),
    onSlideChangeStart: function onSlideChangeStart(swiper) {
      if (that.dom.find('.num').length > 0) {
        that.dom.find('.num-curr').html(swiper.realIndex + 1);
      }

      that.change(swiper.realIndex);
    }
  });
  this.dom.find('.prev').click(function () {
    that.mySwiper.slidePrev();
    return false;
  });
  this.dom.find('.next').click(function () {
    that.mySwiper.slideNext();
    return false;
  });
} //--选项卡-- tabFun({dom: $('.about'), curr: 0});


function tabFun(tab) {
  var btn = tab.dom.find('.tab-btn li'),
      box = tab.dom.find('.tab-box');
  btn.each(function (i) {
    $(this).click(function () {
      change(i);
    });
  });
  change(tab.curr);

  function change(curr) {
    btn.removeClass('on');
    btn.eq(curr).addClass('on');
    box.hide();
    box.eq(curr).fadeIn();
  }
}

function scroll2top() {
  var btn = $('.topA');
  btn.click(function () {
    $('body,html').stop(true, true).animate({
      scrollTop: 0
    }, 300);
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height()) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
}

{
  var dom = $('#foot');
  dom.html("");
}
{
  var _dom = $('#head');

  _dom.html("");

  var nav = $('.g-nav'),
      curr = _dom.data('curr');

  nav.find('li').eq(curr).find('a.name').addClass('on');
}