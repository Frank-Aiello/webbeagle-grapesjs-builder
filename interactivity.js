/**
 * WebBeagle Canvas Interactivity
 * Scroll reveal, shimmer, sticky hero, smooth scroll, WP Interactions
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

  // ── WP Interactions Runtime + Confetti ──────────────────
  function setupConfetti() {
    if (typeof InteractRunner === 'undefined') return false;
    InteractRunner.configure([{
      key: 'cta_confetti',
      title: 'CTA Confetti',
      type: 'click',
      target: { type: 'selector', value: '.cta-section .btn-white' },
      timelines: [{
        loop: false,
        onceOnly: false,
        alternate: false,
        reset: false,
        reverse: false,
        actions: [{
          type: 'confetti',
          key: 'confetti_1',
          target: { type: 'trigger' },
          timing: {
            isStartingState: false,
            start: 0,
            duration: 0.5,
            easing: 'outCirc'
          },
          value: {}
        }]
      }],
      options: []
    }]);
    InteractRunner.init();
    return true;
  }

  // Load the interactions runtime
  var script = document.createElement('script');
  script.src = 'https://builder.webbeagle.com/assets/wp-interactions-full.js';
  script.onload = function() {
    // Give the runtime a tick to initialize
    setTimeout(function() {
      if (!setupConfetti()) {
        console.warn('WP Interactions: setupConfetti failed after runtime loaded');
      }
    }, 100);
  };
  script.onerror = function() {
    console.warn('WP Interactions runtime failed to load');
  };
  document.head.appendChild(script);

  // Backup polling: try every 500ms for up to 10 seconds
  var attempts = 0;
  var pollInterval = setInterval(function() {
    attempts++;
    if (setupConfetti()) {
      clearInterval(pollInterval);
    } else if (attempts > 20) {
      clearInterval(pollInterval);
      console.warn('WP Interactions: runtime did not load within 10s');
    }
  }, 500);
})();
