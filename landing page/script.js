const slider = document.getElementById('image-slider');
let paused = false;
let scrollSpeed = 1; // px per frame
let pos = 0;

// Clone images for infinite effect
const images = Array.from(slider.children);
images.forEach(img => {
  const clone = img.cloneNode();
  slider.appendChild(clone);
});

function step() {
  if (!paused) {
    pos += scrollSpeed;
    if (pos >= slider.scrollWidth / 2) pos = 0; // reset scroll
    slider.scrollLeft = pos;
  }
  requestAnimationFrame(step);
}

slider.addEventListener('click', () => {
  paused = !paused;
  slider.style.filter = paused ? 'brightness(0.8)' : 'none'; // visual pause hint
});

requestAnimationFrame(step);
