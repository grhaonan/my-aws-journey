// === Scroll Animations (IntersectionObserver) ===
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});

// === Lightbox ===
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.lightbox-trigger');
  if (trigger) {
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const img = document.createElement('img');
    img.src = trigger.src || trigger.dataset.src;
    img.alt = trigger.alt || '';
    overlay.appendChild(img);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handler);
      }
    });
    document.body.appendChild(overlay);
  }
});

// === Smooth scroll for nav links ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
