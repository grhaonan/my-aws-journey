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

// === Counter Animation ===
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;
  const duration = 1500; // ms
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

// Observe stat numbers and trigger count-up when visible
document.addEventListener('DOMContentLoaded', () => {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number[data-target]').forEach((el) => {
    el.textContent = '0';
    counterObserver.observe(el);
  });
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
