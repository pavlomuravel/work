
import { Slider } from './Slider.js';


const imgsLinks = [
  'img_1.jpg',
  'img_2.jpg',
  'img_3.jpg',
  'img_4.jpg',
];


const slider1 = new Slider({
  sliderId: 'carousel',
  images: imgsLinks,
  slideTime: 30,
  isPlayButtonHidden: false,
  isDotsHidden: false,
  transitionSpeed: 5,
});

