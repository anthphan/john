let mybutton = document.getElementById("myBtn");
let footer = document.querySelector('footer');
let maxScroll = footer.offsetTop - window.innerHeight - 130;
let images = document.querySelectorAll('.fullscreen-image');
let fullscreenOverlay = document.getElementById('fullscreen-overlay');
let fullscreenImage = document.getElementById('fullscreen-image');
let closeButton = document.getElementById('close-button'); // Make sure this element exists in your HTML
let body = document.body;

function toggleMenu() {
    var navLinks = document.querySelector('.nav__links');
    var hamburgerMenu = document.querySelector('.hamburger__menu');
    navLinks.classList.toggle('show');
    hamburgerMenu.classList.toggle('active');
}

window.onscroll = function() {
    scrollFunction();
    handleScroll();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    let currentY = window.scrollY;
    let start = performance.now();
    let duration = 500;

    function step(timestamp) {
        let elapsed = timestamp - start;
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

function handleScroll() {
    if (window.scrollY > maxScroll) {
        mybutton.style.bottom = `${window.innerHeight - (footer.offsetTop - window.scrollY) + 30}px`;
    } else {
        mybutton.style.bottom = '26px';
    }
}


// Update maxScroll when the window is resized
window.addEventListener('resize', () => {
    maxScroll = footer.offsetTop - window.innerHeight - 130;
});

window.addEventListener('scroll', handleScroll);

images.forEach(image => {
    image.addEventListener('click', () => {
        fullscreenOverlay.style.display = 'flex';
        fullscreenImage.src = image.src;
        body.classList.add('no-scroll');
    });
});

closeButton.addEventListener('click', () => {
    fullscreenOverlay.style.display = 'none';
    body.classList.remove('no-scroll');
});

// Hide the fullscreen overlay when clicking outside the image
fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
        fullscreenOverlay.style.display = 'none';
        body.classList.remove('no-scroll');
    }
});
