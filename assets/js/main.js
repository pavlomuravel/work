
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

function animateCircle(item) {
  const textEl = item.querySelector(".percent-text");
  const circle = item.querySelector(".progress");

  if (!textEl || !circle) return;

  const percent = parseInt(textEl.textContent.replace("%", ""), 10);
  const r = circle.getAttribute("r");
  const total = 2 * Math.PI * r;

  circle.style.strokeDasharray = total;
  circle.style.strokeDashoffset = total;

  const offset = total - (total * percent) / 100;

  // Анімація кола
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 100);

  // Анімація цифри
  let current = 0;
  const duration = 2500;
  const fps = 60;
  const step = percent / (duration / (1000 / fps));

  const counter = setInterval(() => {
    current += step;
    if (current >= percent) {
      current = percent;
      clearInterval(counter);
    }
    textEl.textContent = Math.round(current) + "%";
  }, 1000 / fps);
}

// ---------------------------
// Scroll Observer
// ---------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCircle(entry.target);
        observer.unobserve(entry.target); // один раз і все
      }
    });
  },
  { threshold: 0.5 } // коли видно 50%
);


document.querySelectorAll(".progress__item").forEach((item) => {
  observer.observe(item);
});


