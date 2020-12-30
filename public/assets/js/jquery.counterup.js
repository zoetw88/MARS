/* !
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function( $ ) {
  'use strict';

  $.fn.counterUp = function( options ) {
    // Defaults
    const settings = $.extend({
      'time': 400,
      'delay': 10,
    }, options);

    return this.each(function() {
      // Store the object
      const $this = $(this);
      const $settings = settings;

      const counterUpper = function() {
        const nums = [];
        const divisions = $settings.time / $settings.delay;
        let num = $this.text();
        const isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, '');
        const isInt = /^[0-9]+$/.test(num);
        const isFloat = /^[0-9]+\.[0-9]+$/.test(num);
        const decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

        // Generate list of incremental numbers to display
        for (let i = divisions; i >= 1; i--) {
          // Preserve as int if input was int
          let newNum = parseInt(num / divisions * i);

          // Preserve float if input was float
          if (isFloat) {
            newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
          }

          // Preserve commas if input had commas
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
          }

          nums.unshift(newNum);
        }

        $this.data('counterup-nums', nums);
        $this.text('0');

        // Updates the number until we're done
        const f = function() {
          $this.text($this.data('counterup-nums').shift());
          if ($this.data('counterup-nums').length) {
            setTimeout($this.data('counterup-func'), $settings.delay);
          } else {
            delete $this.data('counterup-nums');
            $this.data('counterup-nums', null);
            $this.data('counterup-func', null);
          }
        };
        $this.data('counterup-func', f);

        // Start the count up
        setTimeout($this.data('counterup-func'), $settings.delay);
      };

      // Perform counts when the element gets into view
      $this.waypoint(counterUpper, {offset: '100%', triggerOnce: true});
    });
  };
})( jQuery );
