/**
 * WebBeagle Canvas Interactivity
 * Scroll reveal, shimmer, sticky hero, smooth scroll
 */
(function(){
  'use strict';

  // ── Scroll reveal observer ──────────────────────────────
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });

  // ── Glass shimmer mouse tracking ────────────────────────
  document.querySelectorAll('.glass').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  // ── Sticky hero opacity fade ────────────────────────────
  var heroWrap = document.querySelector('.hero-wrap');
  var hero = document.querySelector('.hero');
  if (heroWrap && hero) {
    window.addEventListener('scroll', function() {
      var rect = heroWrap.getBoundingClientRect();
      var progress = 1 - Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      hero.style.opacity = 0.4 + (progress * 0.6);
    }, { passive: true });
  }

  // ── Smooth nav scroll ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
