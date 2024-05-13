function toggleMenu() {
    var navLinks = document.querySelector('.nav__links');
    var hamburgerMenu = document.querySelector('.hamburger__menu');
    navLinks.classList.toggle('show');
    hamburgerMenu.classList.toggle('active');
}

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  const currentY = window.scrollY;
  const start = performance.now();
  const duration = 500; // Duration of the scroll animation in milliseconds

  function step(timestamp) {
      const elapsed = timestamp - start;
      window.scrollTo(0, easeInOut(elapsed, currentY, -currentY, duration));
      if (elapsed < duration) {
          window.requestAnimationFrame(step);
      }
  }

  function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  }

  window.requestAnimationFrame(step);
}

// Get the footer element
const footer = document.querySelector('footer');

// Calculate the maximum scroll position
const maxScroll = footer.offsetTop - window.innerHeight - 30; // Stop 130px before the bottom

// Function to handle scroll event
function handleScroll() {
    if (window.scrollY > maxScroll) {
        // If the scroll position is greater than the maxScroll, set the button's position to be just above the footer
        myBtn.style.bottom = `${window.innerHeight - (footer.offsetTop - window.scrollY) + 30}px`; // Add back the 130px
    } else {
        // Otherwise, keep the button at its original position
        myBtn.style.bottom = '26px';
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

const images = document.querySelectorAll('.fullscreen-image');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeButton = document.getElementById('close-button');
const body = document.body;

// Add click event listener to each image
images.forEach(image => {
    image.addEventListener('click', () => {
        // Display the fullscreen overlay and set the image source
        fullscreenOverlay.style.display = 'flex';
        fullscreenImage.src = image.src;
        body.classList.add('no-scroll'); // Add class to disable scrolling
    });
});

// Hide the fullscreen overlay and enable scrolling when close button is clicked
closeButton.addEventListener('click', () => {
    fullscreenOverlay.style.display = 'none';
    body.classList.remove('no-scroll'); // Remove class to enable scrolling
});
