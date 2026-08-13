const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slideshow-dots');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlidePosition() {
  slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlidePosition();
}

// Swipe functionality
slidesWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  slidesWrapper.classList.add('grabbing');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const diff = startX - e.clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex = Math.min(currentIndex + 1, slides.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    updateSlidePosition();
    isDragging = false;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  slidesWrapper.classList.remove('grabbing');
});

// Touch swipe for mobile
slidesWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slidesWrapper.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex = Math.min(currentIndex + 1, slides.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    updateSlidePosition();
  }
});
