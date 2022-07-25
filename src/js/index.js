import '../scss/style.scss';

import Swiper, { Navigation, Pagination } from 'swiper';

(function () {
  'use strict'

  const leadButtons = document.querySelectorAll('.lead-button')
  const overlay = document.querySelector('.overlay')
  const menu = document.querySelector('.mobile-menu')
  const modal = document.querySelector('.modal')
  const requestCall = document.getElementById('request-call')

  function doAction (action, type) {
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
      case 'open modal':
        if (type === 'request call') {
          requestCall.classList.add('form--active')
          // feedbackMessage.classList.remove('form--active')
          requestCall.getElementsByClassName('form__input')[0].focus();
        }
        menu.classList.remove('mobile-menu--active')
        modal.classList.add('modal--active')
        overlay.classList.add('overlay--active')
        document.body.style.overflow= 'hidden';
        return
      case 'close modal':
        modal.classList.remove('modal--active')
        overlay.classList.remove('overlay--active')
        document.body.style.overflow = '';
        return
      default:
        menu.classList.remove('mobile-menu--active')
        modal.classList.remove('modal--active')
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
        doAction(ev.target.dataset.action, ev.target.dataset.type)
      })
    }
  }

  const dropdownButton = document.querySelectorAll('.dropdown')
  const dropdownBlock = [
    document.querySelector('.about-text__text'),
    document.querySelector('.repair-brands__swiper')
  ]
  const DropdownText = [
    document.querySelector('.about-text__button .dropdown__text'),
    document.querySelector('.repair-brands__read-more .dropdown__text')
  ]
  const DropdownIcon = [
    document.querySelector('.about-text__button .dropdown__icon'),
    document.querySelector('.repair-brands__read-more .dropdown__icon')
  ]
  const baseBlockHeight = [
    dropdownBlock[0].scrollHeight + 'px',
    dropdownBlock[1].scrollHeight + 'px'
  ]

  const hiddenBlockHeight = []
  if (window.matchMedia("(min-width: 768px)").matches) {
    hiddenBlockHeight[0] = '160px'
  } else {
    hiddenBlockHeight[0] = '90px'
  }
  hiddenBlockHeight[1] = '200px'

  for (let i = 0; i < dropdownButton.length; i++) {
    toggleHeight(
      dropdownButton[i],
      dropdownBlock[i],
      baseBlockHeight[i],
      hiddenBlockHeight[i],
      DropdownText[i],
      DropdownIcon[i]
    )
  }

  function toggleHeight(button, block, blockHeight, hiddenBlockHeight, DropdownText, DropdownIcon) {
    const innerText = DropdownText.textContent
    // button.addEventListener('click', (ev) => {
    //   const isDropped = ev.target.classList.toggle('dropped')
    button.onclick = function () {
      const isDropped = this.classList.toggle('dropped')
      if (isDropped) {
        block.style.height = blockHeight
        DropdownText.textContent = 'Скрыть'
        DropdownIcon.style.transform = 'rotate(180deg)';
      } else {
        block.style.height = hiddenBlockHeight
        DropdownText.textContent = innerText
        DropdownIcon.style.transform = 'none';
      }
    }
  }

  const repairBrandsDropDownButton = document.querySelector('.repair-brands__read-more')
  const repairBrandsSwiper = document.querySelector('.repair-brands__swiper')
  const repairBrandsDropdownText = document.querySelector('.repair-brands__read-more .dropdown__text')
  const repairBrandsDropdownIcon = document.querySelector('.repair-brands__read-more .dropdown__icon')

  const repairBrands = document.querySelector('.repair-brands')
  const breakpoint = window.matchMedia('(max-width:767px)')
  let mySwiper
  const breakpointChecker = function () {
    if (breakpoint.matches === false) {
      repairBrandsSwiper.style.height = '200px'
      repairBrands.style.paddingBottom = '32px'
      repairBrandsDropdownText.textContent = 'Показать все'
      repairBrandsDropdownIcon.style.transform = 'none';
      if (mySwiper !== undefined) mySwiper.destroy(true, true)
    } else if (breakpoint.matches === true) {
      repairBrandsDropDownButton.classList.remove('dropped')
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
  }
  breakpoint.addEventListener('change', breakpointChecker)
  breakpointChecker()
})()

console.log('Works!');
