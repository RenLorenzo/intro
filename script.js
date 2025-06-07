window.addEventListener("load", () => {

  const loader = document.getElementById("loader");
  loader.classList.add("fade");


  const intro = document.querySelector('header h1');
  const text = intro.dataset.fulltext || intro.textContent;
  intro.textContent = '';
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      intro.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();


  revealOnScroll();
});



document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});



const showreelBtn = document.getElementById("showreel-btn");
const gallery = document.getElementById("gallery");

const images = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png",
  "images/image4.png",
  "images/image5.png",
  "images/image6.png"
];

showreelBtn.addEventListener("click", () => {
  if (gallery.children.length > 0) return; 

  gallery.style.opacity = 1;

  images.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.alt = `Showreel ${i + 1}`;
    img.style.opacity = 0;
    img.style.transform = "translateY(20px)";
    img.classList.add("fade-img");

    img.onload = () => {
      requestAnimationFrame(() => {
        img.style.opacity = 1;
        img.style.transform = "translateY(0)";
      });
    };

    setTimeout(() => {
      gallery.appendChild(img);
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
