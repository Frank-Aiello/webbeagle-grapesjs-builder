/**
 * WebBeagle Animation Runtime
 * Standalone — no GrapesJS dependency. Drop into any published page.
 * 
 * Reads [data-animate] containers and their [data-animate-item] children,
 * applies .wb-animated class with staggered CSS animation delays,
 * and fires them via IntersectionObserver (or immediately for trigger=load).
 *
 * Usage: <script src="/animation-runtime.js"></script>
 *         <link rel="stylesheet" href="/animation-runtime.css">
 */
(function() {
  'use strict';

  // ── CSS: Inject keyframes + .wb-animated rules ──
  var CSS = '\
@keyframes wb-fade-up {\
  0%   { opacity: var(--wb-anim-opacity-start, 0); transform: translateY(var(--wb-anim-offset, 40px)); }\
  100% { opacity: 1; transform: translateY(0); }\
}\
@keyframes wb-fade-in {\
  0%   { opacity: var(--wb-anim-opacity-start, 0); }\
  100% { opacity: 1; }\
}\
@keyframes wb-slide-left {\
  0%   { opacity: var(--wb-anim-opacity-start, 0); transform: translateX(calc(-1 * var(--wb-anim-offset, 40px))); }\
  100% { opacity: 1; transform: translateX(0); }\
}\
@keyframes wb-slide-right {\
  0%   { opacity: var(--wb-anim-opacity-start, 0); transform: translateX(var(--wb-anim-offset, 40px)); }\
  100% { opacity: 1; transform: translateX(0); }\
}\
@keyframes wb-zoom-in {\
  0%   { opacity: var(--wb-anim-opacity-start, 0); transform: scale(var(--wb-anim-scale-start, 0.92)); }\
  100% { opacity: 1; transform: scale(1); }\
}\
.wb-animated {\
  animation-fill-mode: both;\
  animation-timing-function: var(--wb-anim-easing, cubic-bezier(0.16, 1, 0.3, 1));\
  animation-duration: var(--wb-anim-duration, 800ms);\
  animation-delay: var(--wb-anim-delay, 0ms);\
  animation-play-state: paused;\
  will-change: opacity, transform;\
}\
.wb-animated[data-animate="fade-up"]     { animation-name: wb-fade-up; }\
.wb-animated[data-animate="fade-in"]     { animation-name: wb-fade-in; }\
.wb-animated[data-animate="slide-left"]  { animation-name: wb-slide-left; }\
.wb-animated[data-animate="slide-right"] { animation-name: wb-slide-right; }\
.wb-animated[data-animate="zoom-in"]     { animation-name: wb-zoom-in; }\
[data-trigger="load"] .wb-animated,\
.wb-animated[style*="running"] {\
  animation-play-state: running;\
}\
';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // ── Processing ──
  var scrollObserver = null;

  function processContainers() {
    var containers = document.querySelectorAll('[data-animate]');
    if (containers.length === 0) return;

    containers.forEach(function(section) {
      if (section._wbAnimated) return;

      var animType = section.getAttribute('data-animate');
      var stagger  = parseInt(section.getAttribute('data-stagger')) || 120;
      var duration = parseInt(section.getAttribute('data-duration')) || 800;
      var easing   = section.getAttribute('data-easing') || 'cubic-bezier(0.16,1,0.3,1)';
      var startOp  = section.getAttribute('data-initial-opacity') || '0';
      var trigger  = section.getAttribute('data-trigger') || 'scroll';
      var offset   = section.getAttribute('data-offset') || '40';

      // Find items: data-animate-item markers, then grid children, then direct children
      var items = section.querySelectorAll('[data-animate-item]');
      if (items.length === 0) {
        var grid = section.querySelector('.testimonials-grid, .services-grid, .steps-grid, [class*="-grid"]');
        if (grid) items = grid.children;
      }
      if (items.length === 0) {
        items = [];
        Array.from(section.children).forEach(function(c) {
          if (c.nodeType === 1 && !c.classList.contains('section-header')) items.push(c);
        });
      }

      // Handle self-animating element (no children found, element animates itself)
      if (items.length === 0) {
        items = [section];
      }

      Array.from(items).forEach(function(item, i) {
        if (item._wbAnimated) return;
        item.classList.add('wb-animated');
        item.setAttribute('data-animate', animType);
        item.style.setProperty('--wb-anim-delay', (i * stagger) + 'ms');
        item.style.setProperty('--wb-anim-duration', duration + 'ms');
        item.style.setProperty('--wb-anim-easing', easing);
        item.style.setProperty('--wb-anim-opacity-start', startOp);
        item.style.setProperty('--wb-anim-offset', offset + 'px');
        item._wbAnimated = true;
      });

      section._wbAnimated = true;

      // Load-trigger: play immediately
      if (trigger === 'load') {
        Array.from(items).forEach(function(item) {
          item.style.animationPlayState = 'running';
        });
      }
    });

    setupScrollObserver();
  }

  function setupScrollObserver() {
    if (!window.IntersectionObserver) return;
    if (scrollObserver) { try { scrollObserver.disconnect(); } catch(e) {} }

    var els = document.querySelectorAll('.wb-animated[data-animate]');
    var targets = [];
    els.forEach(function(el) {
      if (el.style.animationPlayState === 'running') return;
      var s = el.closest('[data-trigger]');
      if (s && s.getAttribute('data-trigger') === 'load') return;
      targets.push(el);
    });

    if (targets.length === 0) return;

    scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function(el) { scrollObserver.observe(el); });
  }

  // ── Legacy .reveal support (keep backward compat) ──
  function processLegacyReveals() {
    var reveals = document.querySelectorAll('.reveal:not(.visible)');
    if (reveals.length === 0) return;

    var legacyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          legacyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function(el) { legacyObserver.observe(el); });
  }

  // ── Run ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      processContainers();
      processLegacyReveals();
    });
  } else {
    processContainers();
    processLegacyReveals();
  }

})();
