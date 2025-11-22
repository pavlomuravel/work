
export class Slider {
  constructor({ sliderId, images, slideTime = 3, transitionSpeed = 0.5, isPlayButtonHidden = false, isDotsHidden = false }) {
    if (!sliderId || !images || !images.length) {
      throw new Error("Slider ID and images array are required");
    }

    this.sliderId = sliderId;
    this.images = images;
    this.slideTime = slideTime;
    this.transitionSpeed = transitionSpeed;
    this.isPlayButtonHidden = isPlayButtonHidden;
    this.isDotsHidden = isDotsHidden;
    this.imgSlide = 0;
    this.slideCount = images.length;
    this.isSliding = true;
    this.slideInterval = null;
    this.imageWidth = 0;

    this.startX = 0;
    this.endX = 0;

    this.init();
  }

  init() {
    this.generateImg();
    this.generateDots();
    this.cacheElements();
    this.applyStyles();
    this.addEventListeners();

    setTimeout(() => {
      this.imageWidth = this.imgContainer.querySelector('img').offsetWidth;
      this.startAutoSlide();
    }, 100);
  }

  cacheElements() {
    this.imgContainer = document.querySelector(`#${this.sliderId} #imgContainer`);
    this.leftBack = document.querySelector(`#${this.sliderId} #leftBack`);
    this.rightNext = document.querySelector(`#${this.sliderId} #rightNext`);
    this.currentButtonContainer = document.querySelector(`#${this.sliderId} #current__button`);
    this.startStopButton = document.querySelector(`#${this.sliderId} #start-stop .stop`);
  }

  applyStyles() {
    if (this.isPlayButtonHidden && this.startStopButton) {
      this.startStopButton.style.display = 'none';
    }
    if (this.isDotsHidden && this.currentButtonContainer) {
      this.currentButtonContainer.style.display = 'none';
    }
  }

  addEventListeners() {
    this.leftBack.addEventListener("click", () => this.onLeftClick());
    this.rightNext.addEventListener("click", () => this.onRightClick());
    this.currentButtonContainer.addEventListener("click", (event) => this.onDotClick(event));
    this.startStopButton.addEventListener("click", (event) => this.startStop(event));

    document.addEventListener("keydown", (event) => this.onKeyPress(event));
    this.imgContainer.addEventListener("touchstart", (event) => this.onTouchStart(event));
    this.imgContainer.addEventListener("touchend", (event) => this.onTouchEnd(event));
  }

  generateImg() {
    const imgContainer = document.querySelector(`#${this.sliderId} #imgContainer`);
    if (!imgContainer) {
      console.error(`Element #imgContainer not found in #${this.sliderId}`);
      return;
    }
    imgContainer.innerHTML = this.images.map(img => `<img src="./assets/images/${img}" alt="#">`).join('');
  }

  generateDots() {
    const currentButtonContainer = document.querySelector(`#${this.sliderId} #current__button`);
    if (!currentButtonContainer) return;
    currentButtonContainer.innerHTML = this.images.map((_, index) => `<div class="current__button-item ${index === 0 ? 'active' : ''}" data-img="${index}"><h3>0${index + 1}</h3></div>`).join('');
  }

  onLeftClick() {
    this.imgSlide = (this.imgSlide - 1 + this.slideCount) % this.slideCount;
    this.updateSlide();
  }

  onRightClick() {
    this.imgSlide = (this.imgSlide + 1) % this.slideCount;
    this.updateSlide();
  }

  onDotClick(event) {
    if (!event.target.classList.contains("current__button-item")) return;
    this.imgSlide = parseInt(event.target.dataset.img);
    this.updateSlide();
  }

  updateSlide() {
    this.imgContainer.style.transform = `translateX(-${this.imgSlide * this.imageWidth}px)`;
    this.imgContainer.style.transition = `transform ${this.transitionSpeed}s ease-in-out`;
    this.refreshActiveDot();
  }

  refreshActiveDot() {
    document.querySelectorAll(`#${this.sliderId} .current__button-item`).forEach((dot, index) => {
      dot.classList.toggle("active", index === this.imgSlide);
    });
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => this.onRightClick(), this.slideTime * 1000);
  }

  startStop(event) {
    this.isSliding = !this.isSliding;
    if (event) {
      event.target.classList.toggle("stooped");
    }
    if (this.isSliding) {
      this.startAutoSlide();
    } else {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  onKeyPress(event) {
    if (event.key === "ArrowLeft") {
      this.onLeftClick();
    } else if (event.key === "ArrowRight") {
      this.onRightClick();
    } else if (event.key === " ") {
      event.preventDefault();
      this.startStop();
    }
  }

  onTouchStart(event) {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event) {
    this.endX = event.changedTouches[0].clientX;
    if (this.startX - this.endX > 50) {
      this.onRightClick();
    } else if (this.endX - this.startX > 50) {
      this.onLeftClick();
    }
  }
}