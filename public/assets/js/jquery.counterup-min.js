!function($) {
  'use strict'; $.fn.counterUp=function(t) {
    const e=$.extend({time: 400, delay: 10}, t); return this.each(function() {
      const t=$(this); const n=e; const u=function() {
        const e=[]; const u=n.time/n.delay; let a=t.text(); const r=/[0-9]+,[0-9]+/.test(a); a=a.replace(/,/g, ''); for (let o=/^[0-9]+$/.test(a), c=/^[0-9]+\.[0-9]+$/.test(a), i=c?(a.split('.')[1]||[]).length:0, s=u; s>=1; s--) {
          let d=parseInt(a/u*s); if (c&&(d=parseFloat(a/u*s).toFixed(i)), r) for (;/(\d+)(\d{3})/.test(d.toString());)d=d.toString().replace(/(\d+)(\d{3})/, '$1,$2'); e.unshift(d);
        }t.data('counterup-nums', e), t.text('0'); const f=function() {
          t.text(t.data('counterup-nums').shift()), t.data('counterup-nums').length?setTimeout(t.data('counterup-func'), n.delay):(t.data('counterup-nums'), t.data('counterup-nums', null), t.data('counterup-func', null));
        }; t.data('counterup-func', f), setTimeout(t.data('counterup-func'), n.delay);
      }; t.waypoint(u, {offset: '100%', triggerOnce: !0});
    });
  };
}(jQuery);
