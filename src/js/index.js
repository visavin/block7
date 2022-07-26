import '../scss/style.scss';
import { disableScroll, enableScroll } from './scroll.js'
import Swiper, { Navigation, Pagination } from 'swiper';

(function () {
  'use strict'

  const leadButtons = document.querySelectorAll('.lead-button')
  const overlay = document.querySelector('.overlay')
  const menu = document.querySelector('.mobile-menu')
  const modal = document.querySelector('.modal')
  const requestCall = document.getElementById('request-call')
  const feedbackMessage = document.getElementById('feedback-message')

  function doAction (action, type) {
    switch (action) {
      case 'open menu':
        menu.classList.add('mobile-menu--active')
        overlay.classList.add('overlay--active')
        disableScroll()
        return
      case 'close menu':
        menu.classList.remove('mobile-menu--active')
        overlay.classList.remove('overlay--active')
        enableScroll()
        return
      case 'open modal':
        if (type === 'request call') {
          requestCall.classList.add('form--active')
          feedbackMessage.classList.remove('form--active')
          requestCall.getElementsByClassName('form__input')[0].focus();
        }
        if (type === 'feedback message') {
          feedbackMessage.classList.add('form--active')
          requestCall.classList.remove('form--active')
          feedbackMessage.getElementsByClassName('form__input')[0].focus();
        }
        menu.classList.remove('mobile-menu--active')
        modal.classList.add('modal--active')
        overlay.classList.add('overlay--active')
        disableScroll()
        return
      case 'close modal':
        modal.classList.remove('modal--active')
        overlay.classList.remove('overlay--active')
        enableScroll()
        return
      default:
        menu.classList.remove('mobile-menu--active')
        modal.classList.remove('modal--active')
        overlay.classList.remove('overlay--active')
        enableScroll()
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
  const brandsDropdownText = document.querySelector('.brands__read-more .dropdown__text')
  const brandsDropdownIcon = document.querySelector('.brands__read-more .dropdown__icon')
  const technicDropdownText = document.querySelector('.technic__read-more .dropdown__text')
  const technicDropdownIcon = document.querySelector('.technic__read-more .dropdown__icon')

  const dropdownBlock = [
    document.querySelector('.about-text__text'),
    document.querySelector('.brands__swiper'),
    document.querySelector('.technic__swiper')
  ]
  const DropdownText = [
    document.querySelector('.about-text__button .dropdown__text'),
    brandsDropdownText,
    technicDropdownText
  ]
  const DropdownIcon = [
    document.querySelector('.about-text__button .dropdown__icon'),
    brandsDropdownIcon,
    technicDropdownIcon
  ]
  const baseBlockHeight = [
    dropdownBlock[0].scrollHeight + 'px',
    dropdownBlock[1].scrollHeight + 'px',
    dropdownBlock[2].scrollHeight + 'px'
  ]

  const hiddenBlockHeight = []
  if (window.matchMedia("(min-width: 768px)").matches) {
    hiddenBlockHeight[0] = '160px'
  } else {
    hiddenBlockHeight[0] = '90px'
  }
  hiddenBlockHeight[1] = '200px'
  hiddenBlockHeight[2] = '200px'

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

  function toggleHeight(button, block, blockHeight, hiddenBlockHeight, dropdownText, dropdownIcon) {
    const innerText = dropdownText.textContent
    // button.addEventListener('click', (ev) => {
    //   const isDropped = ev.target.classList.toggle('dropped')
    button.onclick = function () {
      const isDropped = this.classList.toggle('dropped')
      if (isDropped) {
        block.style.height = blockHeight
        dropdownText.textContent = 'Скрыть'
        dropdownIcon.style.transform = 'rotate(180deg)';
      } else {
        block.style.height = hiddenBlockHeight
        dropdownText.textContent = innerText
        dropdownIcon.style.transform = 'none';
      }
    }
  }

  const brandsDropDownButton = document.querySelector('.brands__read-more')
  const brandsSwiper = document.querySelector('.brands__swiper')
  const technicDropDownButton = document.querySelector('.technic__read-more')
  const technicSwiper = document.querySelector('.technic__swiper')


  const repair = document.querySelector('.repair')
  const breakpoint = window.matchMedia('(max-width:767px)')
  let mySwiper
  const breakpointChecker = function () {
    if (breakpoint.matches === false) {
      brandsSwiper.style.height = '200px'
      technicSwiper.style.height = '200px'
      repair.style.paddingBottom = ''
      brandsDropdownText.textContent = 'Показать все'
      brandsDropdownIcon.style.transform = 'none';
      technicDropdownText.textContent = 'Показать все'
      technicDropdownIcon.style.transform = 'none';
      if (mySwiper !== undefined) mySwiper.destroy(true, true)
    } else if (breakpoint.matches === true) {
      brandsDropDownButton.classList.remove('dropped')
      technicDropDownButton.classList.remove('dropped')
      brandsSwiper.style.height = '140px'
      technicSwiper.style.height = '228px'
      repair.style.paddingBottom = '0px'
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
