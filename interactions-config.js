/**
 * WebBeagle WP Interactions Config
 * Runs after wp-interactions-full.js is loaded by GrapesJS canvas
 */
(function(){
  'use strict';

  if (typeof InteractRunner === 'undefined') {
    console.warn('WP Interactions: InteractRunner not loaded');
    return;
  }

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
  console.log('WP Interactions: confetti configured on .cta-section .btn-white');
})();
