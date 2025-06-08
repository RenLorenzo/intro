window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const original = slider.innerHTML;

  let repeatCount = 10;
  for (let i = 0; i < repeatCount; i++) {
    slider.innerHTML += original;
  }
});
