// Hamburger menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Certifications Carousel with Auto-Scroll
let currentSlide = 0;
let autoScrollInterval;

function scrollCertifications(direction) {
  const carousel = document.querySelector('.certification-carousel');
  const cards = document.querySelectorAll('.certification-card');

  if (!carousel || cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = 32; // 2rem gap
  const totalCards = cards.length;

  // Calculate how many cards are visible
  const carouselWidth = carousel.offsetWidth;
  const cardsVisible = Math.floor(carouselWidth / (cardWidth + gap));

  // Update current slide
  currentSlide += direction;

  // Loop around
  if (currentSlide < 0) {
    currentSlide = totalCards - cardsVisible;
  } else if (currentSlide > totalCards - cardsVisible) {
    currentSlide = 0;
  }

  // Calculate scroll position
  const scrollAmount = currentSlide * (cardWidth + gap);

  // Smooth scroll
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// Auto-scroll function
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    scrollCertifications(1);
  }, 3000); // Scroll every 3 seconds
}

// Stop auto-scroll on hover
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Initialize auto-scroll when page loads
window.addEventListener('load', () => {
  const carousel = document.querySelector('.certification-carousel');
  const carouselContainer = document.querySelector('.carousel-container');

  if (carousel && carouselContainer) {
    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    // Pause on touch/interaction
    carousel.addEventListener('touchstart', stopAutoScroll);
    carousel.addEventListener('touchend', () => {
      setTimeout(startAutoScroll, 2000); // Resume after 2 seconds
    });
  }
});
