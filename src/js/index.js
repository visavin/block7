import '../scss/style.scss';

import Swiper, { Navigation, Pagination } from 'swiper';

(function () {
  'use strict'

  const leadButtons = document.querySelectorAll('.lead-button')
  const overlay = document.querySelector('.overlay')
  const menu = document.querySelector('.mobile-menu')

  function doAction (action) {
    switch (action) {
      case 'open menu':
        menu.classList.add('mobile-menu--active')
        overlay.classList.add('overlay--active')
        document.body.style.overflow= 'hidden';
        return
      case 'close menu':
        menu.classList.remove('mobile-menu--active')
        overlay.classList.remove('overlay--active')
        document.body.style.overflow = '';
        return
      default:
        menu.classList.remove('mobile-menu--active')
        // modal.classList.remove('modal--active')
        overlay.classList.remove('overlay--active')
        document.body.style.overflow = '';
    }
  }

  overlay.addEventListener('click', () => {
    doAction('')
  })

  for (let i = 0; i < leadButtons.length; i++) {
    if (leadButtons[i].dataset.action !== undefined) {
      leadButtons[i].addEventListener('click', (ev) => {
        doAction(ev.target.dataset.action)
      })
    }
  }

  const dropDownButton = document.querySelector('.repair-brands__read-more')
  const repairBrandsSwiper = document.querySelector('.repair-brands__swiper')
  const repairBrands = document.querySelector('.repair-brands')
  const dropdownText = document.querySelector('.repair-brands__read-more .dropdown__text')
  const dropdownIcon = document.querySelector('.repair-brands__read-more .dropdown__icon')

  dropDownButton.onclick = function () {
    const isDropped = this.classList.toggle('dropped')
    if (isDropped) {
      repairBrandsSwiper.style.height = '296px'
      repairBrands.style.paddingBottom = '14px'
      dropdownText.textContent = 'Скрыть'
      dropdownIcon.style.transform = 'rotate(180deg)';
    } else {
      repairBrandsSwiper.style.height = '200px'
      repairBrands.style.paddingBottom = '32px'
      dropdownText.textContent = 'Показать все'
      dropdownIcon.style.transform = 'none';
    }
  }

  const breakpoint = window.matchMedia('(max-width:767px)')
  let mySwiper
  const breakpointChecker = function () {
    if (breakpoint.matches === false) {
      repairBrandsSwiper.style.height = '200px'
      repairBrands.style.paddingBottom = '32px'
      dropdownText.textContent = 'Показать все'
      if (mySwiper !== undefined) mySwiper.destroy(true, true)
    } else if (breakpoint.matches === true) {
      dropDownButton.classList.remove('dropped')
      repairBrandsSwiper.style.height = '140px'
      repairBrands.style.paddingBottom = '0px'
      return enableSwiper()
    }
  }
  const enableSwiper = function () {
    mySwiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      pagination: {
        el: '.swiper-pagination', clickable: true
      }, slidesPerView: 'auto', spaceBetween: 16, freeMode: true
    })
    console.log('Swiper Works!');
  }
  breakpoint.addEventListener('change', breakpointChecker)
  breakpointChecker()
})()

console.log('Works!');
