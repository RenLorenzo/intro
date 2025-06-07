window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("fade");
});

const intro = document.querySelector('header h1');
const text = intro.textContent;
intro.textContent = '';

let i = 0;
function typeWriter() {
  if (i < text.length) {
    intro.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const showreelBtn = document.getElementById("showreel-btn");
const gallery = document.getElementById("gallery");

const images = [
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
  "image6.png"
];

showreelBtn.addEventListener("click", () => {
  gallery.innerHTML = "";
  gallery.style.opacity = 1;
  images.forEach((src, i) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = src;
      img.style.opacity = 0;
      img.style.transform = "translateY(20px)";
      gallery.appendChild(img);
      requestAnimationFrame(() => {
        img.style.opacity = 1;
        img.style.transform = "translateY(0)";
      });
    }, i * 200); 
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
const sections = document.querySelectorAll('section');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
