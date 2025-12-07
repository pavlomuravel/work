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