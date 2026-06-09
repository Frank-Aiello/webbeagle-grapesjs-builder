/**
 * WebBeagle Canvas Interactivity
 * Scroll reveal, shimmer, sticky hero, smooth scroll
 * + WP Interactions runtime & confetti
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
  var confettiSetUp = false;

  function trySetupConfetti() {
    if (confettiSetUp) return true;
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
    confettiSetUp = true;
    console.log('🎉 WP Interactions: confetti ready on CTA button');
    return true;
  }

  // Inject the runtime script
  var wpScript = document.createElement('script');
  wpScript.src = 'https://builder.webbeagle.com/assets/wp-interactions-full.js';
  wpScript.onload = function() {
    // Small delay to let runtime initialize
    setTimeout(function() {
      if (trySetupConfetti()) return;
      // Poll if not ready yet
      var attempts = 0;
      var iv = setInterval(function() {
        if (trySetupConfetti() || ++attempts > 20) clearInterval(iv);
      }, 250);
    }, 200);
  };
  wpScript.onerror = function() {
    console.warn('WP Interactions: runtime failed to load');
  };
  document.head.appendChild(wpScript);

  // Also try immediately (race condition if cached)
  trySetupConfetti();
})();
