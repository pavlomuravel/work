

const modalSubscribe = document.getElementsByClassName('modal_subsckribe')[0];
const modalSend = document.getElementsByClassName('modal_send')[0];
const openModalSubscribe = document.getElementById('subscribe');
const openModalSend = document.getElementById('send');
const closeModal = document.getElementsByClassName('modal__content-clous');


openModalSubscribe.addEventListener('click', (e) => {
  modalSubscribe.style.display = 'flex';
})

openModalSend.addEventListener('click', (e) => {
  modalSend.style.display = 'flex';
})


for (let btn of closeModal) {
  btn.addEventListener('click', (e) => {
    modalSubscribe.style.display = 'none';
    modalSend.style.display = 'none';
  })
}

window.addEventListener('click', function (event)  {
  if (event.target === modalSubscribe) {
    modalSubscribe.style.display = 'none';
  }
  if (event.target === modalSend) {
    modalSend.style.display = 'none';
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modalSubscribe.style.display = 'none';
    modalSend.style.display = 'none';
  }

})

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

