//加载模块css,js
require('./css/swiper.min.css');
require('./js/swiper.min.js');
  function swiperOne(){
    var swiper = new Swiper('.swiper-container', {
      autoplay: 5000,
      pagination: '.swiper-pagination',
      mousewheelControl:false,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      loop: true,
      slidesPerView: 1,
      paginationClickable: true,
      updateFormElements: true,
      simulateTouch: false
    });
  }
  function swiperFour(){
    var swiper = new Swiper('.swiper-container',{
      pagination: '.swiper-pagination',
      slidesPerView: 4,
      spaceBetweem:20,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      loop: true,
      autoplay : 5000
    });
  }
module.exports = function(){
  var Swiper = {
    swiperOne: swiperOne,
    swiperFour: swiperFour
  }
  return Swiper
};
