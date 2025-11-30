document.addEventListener('DOMContentLoaded', function() {

  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(function(header) {

    header.addEventListener('click', function() {

      const clickedContent = header.nextElementSibling;


      const clickedIcon = header.querySelector('.icon');

      const isCurrentlyOpen = clickedContent.classList.contains('open');


      document.querySelectorAll('.accordion__content').forEach(function(content) {
        content.classList.remove('open');
      });

      document.querySelectorAll('.accordion-header .icon').forEach(function(icon) {
        icon.textContent = '+';
      });


      if (!isCurrentlyOpen) {
        clickedContent.classList.add('open');
        clickedIcon.textContent = '−';
      }

    });

  });

});