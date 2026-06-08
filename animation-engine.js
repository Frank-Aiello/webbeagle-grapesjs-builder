/**
 * WebBeagle Animation Engine v2
 * Centralized animation system — call apply() from existing editor hooks.
 *
 * Public API:
 *   AnimationEngine.init(editor)  →  { apply(), reset() }
 *
 * Usage:
 *   <section data-animate="fade-up" data-stagger="120">
 *     <div data-animate-item>Card 1</div>
 *   </section>
 */
var AnimationEngine = (function() {

  function init(editor) {
    var _scrollObserver = null;
    var _legacyObserver = null;

    function getCanvas() {
      return editor.Canvas.getDocument();
    }

    /**
     * Apply animations to everything in the canvas.
     * Idempotent — safe to call repeatedly.
     */
    function apply() {
      var doc = getCanvas();
      if (!doc) { setTimeout(apply, 300); return; }
      var win = doc.defaultView;
      if (!win) return;

      processNewSystem(doc, win);
      processLegacyReveals(doc, win);
    }

    /**
     * Process [data-animate] sections.
     */
    function processNewSystem(doc, win) {
      var sections = doc.querySelectorAll('[data-animate]');
      if (sections.length === 0) return;

      sections.forEach(function(section) {
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
          items = grid ? grid.querySelectorAll(':scope > *') : [];
        }
        if (items.length === 0) {
          items = [];
          Array.from(section.children).forEach(function(c) {
            if (c.nodeType === 1 && !c.classList.contains('section-header')) items.push(c);
          });
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

        // Self-animating: element has data-animate but no children — animate itself
        if (items.length === 0) {
          var self = section;
          self.classList.add('wb-animated');
          self.setAttribute('data-animate', animType);
          self.style.setProperty('--wb-anim-delay', '0ms');
          self.style.setProperty('--wb-anim-duration', duration + 'ms');
          self.style.setProperty('--wb-anim-easing', easing);
          self.style.setProperty('--wb-anim-opacity-start', startOp);
          self.style.setProperty('--wb-anim-offset', offset + 'px');
          self._wbAnimated = true;
          items = [self];
        }

        section._wbAnimated = true;

        // Load-triggered items play immediately
        if (trigger === 'load') {
          Array.from(items).forEach(function(item) {
            item.style.animationPlayState = 'running';
          });
        }
      });

      // Set up scroll-based triggers for the rest
      setupScrollTrigger(doc, win);
    }

    /**
     * Legacy .reveal classes — add .visible on scroll via IntersectionObserver.
     */
    function processLegacyReveals(doc, win) {
      if (!win.IntersectionObserver) return;
      var reveals = doc.querySelectorAll('.reveal:not(.visible)');
      if (reveals.length === 0) return;

      if (_legacyObserver) { try { _legacyObserver.disconnect(); } catch(e) {} }
      _legacyObserver = new win.IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            _legacyObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach(function(el) { _legacyObserver.observe(el); });

      // Canvas fallback: reveal elements immediately (canvas isn't scroll-triggered)
      // Published pages use the IntersectionObserver above
      setTimeout(function() {
        reveals.forEach(function(el) {
          el.classList.add('visible');
        });
      }, 100);
    }

    /**
     * Scroll-trigger for .wb-animated elements.
     */
    function setupScrollTrigger(doc, win) {
      if (!win.IntersectionObserver) return;
      if (_scrollObserver) { try { _scrollObserver.disconnect(); } catch(e) {} }

      var els = doc.querySelectorAll('.wb-animated[data-animate]');
      var targets = [];
      els.forEach(function(el) {
        if (el.style.animationPlayState === 'running') return;
        var s = el.closest('[data-trigger]');
        if (s && s.getAttribute('data-trigger') === 'load') return;
        targets.push(el);
      });

      if (targets.length === 0) return;

      _scrollObserver = new win.IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            _scrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      targets.forEach(function(el) { _scrollObserver.observe(el); });
    }

    /**
     * Reset all animation state.
     */
    function reset() {
      var doc = getCanvas();
      if (!doc) return;
      doc.querySelectorAll('.wb-animated').forEach(function(el) {
        el._wbAnimated = false;
        el.style.animationPlayState = 'paused';
      });
      doc.querySelectorAll('[data-animate]').forEach(function(el) {
        el._wbAnimated = false;
      });
      if (_scrollObserver) { try { _scrollObserver.disconnect(); } catch(e) {}; _scrollObserver = null; }
      if (_legacyObserver) { try { _legacyObserver.disconnect(); } catch(e) {}; _legacyObserver = null; }
    }

    // Public API
    return { apply: apply, reset: reset };
  }

  return { init: init };
})();
