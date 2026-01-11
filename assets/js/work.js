import { Slider } from './Slider.js';


const imgsLinks2 = [
  'img_11.png',
  'img_11.png',
  'img_11.png',
  'img_11.png',
  'img_11.png',
  'img_11.png',
  'img_11.png',
];


const slider2 = new Slider({
  sliderId: 'carousel2',
  images: imgsLinks2,
  slideTime: 60,
  isPlayButtonHidden: false,
  isDotsHidden: false,
  transitionSpeed: 5,
});

const burgerNav = document.getElementById("burger");
const nav = document.querySelector(".container-burger__nav")
const navClose = document.querySelector(".header__nav-close");

burgerNav.addEventListener("click", () => {
  nav.classList.add("active");
})

navClose.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.remove('active');
});
