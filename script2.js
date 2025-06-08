// Intersection Observer fade-in
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.game-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(card => observer.observe(card));
});

// Modal open/close and content population
const gamesData = {
  superliminal: {
    title: 'Superliminal',
    desc: 'A mind-bending first-person puzzle game based on forced perspective.',
    images: [
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1049410/ss_1e8d43c1a1a2b1c84793b86ebc9db426b57e5c51.600x338.jpg',
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1049410/ss_4e77989fdb899869742a1b19af0f9c4a0f1aafc0.600x338.jpg'
    ],
    steamLink: 'https://store.steampowered.com/app/1049410/Superliminal/'
  },
  battlefield4: {
    title: 'Battlefield 4',
    desc: 'A shooter game featuring large maps, vehicles, and team-based combat.',
    images: [
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1238840/ss_efbe68b945de6e379c6423766f43f4e08e7b0c0a.600x338.jpg',
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1238840/ss_3a4b7f4d4c849ede02447d1eebd3d79d0803d1f1.600x338.jpg'
    ],
    steamLink: 'https://store.steampowered.com/app/1238840/Battlefield_4/'
  }
};

document.querySelectorAll('.game-icon').forEach(button => {
  button.addEventListener('click', () => {
    const game = button.dataset.game;
    const modal = document.getElementById('game-modal');
    const title = modal.querySelector('#modal-title');
    const desc = modal.querySelector('#modal-desc');
    const gallery = modal.querySelector('.modal-gallery');
    const link = modal.querySelector('#modal-link');

    const data = gamesData[game];
    if (!data) return;

    title.textContent = data.title;
    desc.textContent = data.desc;
    gallery.innerHTML = '';
    data.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${data.title} screenshot`;
      gallery.appendChild(img);
    });
    link.href = data.steamLink;

    modal.hidden = false;
    modal.focus();
  });
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('game-modal').hidden = true;
});

// Close modal on outside click
document.getElementById('game-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.hidden = true;
  }
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  const modal = document.getElementById('game-modal');
  if (e.key === 'Escape' && !modal.hidden) {
    modal.hidden = true;
  }
});
