
import modal from './modules/modals.js';



//slider
$(function () {

  $(".menu").on("click", "a", function (e) {
    e.preventDefault();
    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  $('.slider-box').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000
  });

  $('.reviews__inner').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,

  });

  $('.gallery__slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }

      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }

      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }

      }
    ]

  });

  AOS.init();




  if (window.innerWidth < 450) {
    AOS.init({
      disable: true,
    });
  }



  const mixer = mixitup('.foodies__content');

});



window.addEventListener('DOMContentLoaded', () => {
  modals();
  formsSubmit();


  //search 

  const searchInput = document.querySelector('.search-form__input'),
    searchBtn = document.querySelector('.search-form__btn'),
    logo = document.querySelector('.header__logo');

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.toggle('active-search');
    logo.classList.toggle('active-logo');
  });

  //tabs
  const tabsBtn = document.querySelectorAll('.popup__btn-tab');
  const contentTabsBtn = document.querySelectorAll('.popup__btn-content__box');


  tabsBtn.forEach(item => {
    item.addEventListener('click', () => {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
      if (!currentBtn.classList.contains('active')) {
        tabsBtn.forEach(item => {
          item.classList.remove('active');
        });

        contentTabsBtn.forEach(item => {
          item.classList.remove('active');

        });

        currentBtn.classList.add('active');
        currentTab.classList.add('active');
      };
    });

  });

  document.querySelector('.popup__btn-tab').click();




  //menu
  const menuBtn = document.querySelector('.menu__btn');
  menuBtn.addEventListener('click', event => {
    menuBtn.classList.toggle('menu-active');

  });








  //stars
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    const rating = star.dataset.rateyoRating;

    $(star).rateYo({
      starSvg: '<svg width="11" height="11" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"> \
     <path d="M4.90991 0.882647L3.56729 3.72683L0.563373 4.18439C0.0246826 4.26602 -0.191205 4.95988 0.199449 5.35729L2.37272 7.56991L1.8587 10.6955C1.76617 11.2605 2.33571 11.6837 2.81272 11.4194L5.5 9.94364L8.18729 11.4194C8.66429 11.6815 9.23383 11.2605 9.1413 10.6955L8.62729 7.56991L10.8006 5.35729C11.1912 4.95988 10.9753 4.26602 10.4366 4.18439L7.43271 3.72683L6.09009 0.882647C5.84953 0.375678 5.15252 0.369234 4.90991 0.882647Z" fill="#DEAD6F" /> \
   </svg>',
      starWidth: "11px",
      spacing: "5px",

    })
  })




});


























