!function($) {
  'use strict'; $.fn.meanmenu=function(e) {
    const n={meanMenuTarget: jQuery(this), meanMenuContainer: 'body', meanMenuClose: 'X', meanMenuCloseSize: '18px', meanMenuOpen: '<span /><span /><span />', meanRevealPosition: 'right', meanRevealPositionDistance: '0', meanRevealColour: '', meanScreenWidth: '480', meanNavPush: '', meanShowChildren: !0, meanExpandableChildren: !0, meanExpand: '+', meanContract: '-', meanRemoveAttrs: !1, onePage: !1, meanDisplay: 'block', removeElements: ''}; e=$.extend(n, e); let a=window.innerWidth||document.documentElement.clientWidth; return this.each(function() {
      const n=e.meanMenuTarget; const t=e.meanMenuContainer; const r=e.meanMenuClose; const i=e.meanMenuCloseSize; const s=e.meanMenuOpen; const u=e.meanRevealPosition; const m=e.meanRevealPositionDistance; const l=e.meanRevealColour; const o=e.meanScreenWidth; const c=e.meanNavPush; const v='.meanmenu-reveal'; const h=e.meanShowChildren; const d=e.meanExpandableChildren; const y=e.meanExpand; const j=e.meanContract; const Q=e.meanRemoveAttrs; const f=e.onePage; const g=e.meanDisplay; const p=e.removeElements; let C=!1; (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i))&&(C=!0), (navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i))&&jQuery('html').css('overflow-y', 'scroll'); let w=''; const x=function() {
        if ('center'===u) {
          const e=window.innerWidth||document.documentElement.clientWidth; const n=e/2-22+'px'; w='left:'+n+';right:auto;', C?jQuery('.meanmenu-reveal').animate({left: n}):jQuery('.meanmenu-reveal').css('left', n);
        }
      }; let A=!1; let E=!1; 'right'===u&&(w='right:'+m+';left:auto;'), 'left'===u&&(w='left:'+m+';right:auto;'), x(); let M=''; const P=function() {
        M.html(jQuery(M).is('.meanmenu-reveal.meanclose')?r:s);
      }; const W=function() {
        jQuery('.mean-bar,.mean-push').remove(), jQuery(t).removeClass('mean-container'), jQuery(n).css('display', g), A=!1, E=!1, jQuery(p).removeClass('mean-remove');
      }; const b=function() {
        const e='background:'+l+';color:'+l+';'+w; if (o>=a) {
          jQuery(p).addClass('mean-remove'), E=!0, jQuery(t).addClass('mean-container'), jQuery('.mean-container').prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+e+'">Show Navigation</a><nav class="mean-nav"></nav></div>'); const r=jQuery(n).html(); jQuery('.mean-nav').html(r), Q&&jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
jQuery(this).is('.mean-remove')?jQuery(this).attr('class', 'mean-remove'):jQuery(this).removeAttr('class'), jQuery(this).removeAttr('id');
          }), jQuery(n).before('<div class="mean-push" />'), jQuery('.mean-push').css('margin-top', c), jQuery(n).hide(), jQuery('.meanmenu-reveal').show(), jQuery(v).html(s), M=jQuery(v), jQuery('.mean-nav ul').hide(), h?d?(jQuery('.mean-nav ul ul').each(function() {
            jQuery(this).children().length&&jQuery(this, 'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+i+'">'+y+'</a>');
          }), jQuery('.mean-expand').on('click', function(e) {
            e.preventDefault(), jQuery(this).hasClass('mean-clicked')?(jQuery(this).text(y), jQuery(this).prev('ul').slideUp(300, function() {})):(jQuery(this).text(j), jQuery(this).prev('ul').slideDown(300, function() {})), jQuery(this).toggleClass('mean-clicked');
          })):jQuery('.mean-nav ul ul').show():jQuery('.mean-nav ul ul').hide(), jQuery('.mean-nav ul li').last().addClass('mean-last'), M.removeClass('meanclose'), jQuery(M).click(function(e) {
            e.preventDefault(), !1===A?(M.css('text-align', 'center'), M.css('text-indent', '0'), M.css('font-size', i), jQuery('.mean-nav ul:first').slideDown(), A=!0):(jQuery('.mean-nav ul:first').slideUp(), A=!1), M.toggleClass('meanclose'), P(), jQuery(p).addClass('mean-remove');
          }), f&&jQuery('.mean-nav ul > li > a:first-child').on('click', function() {
            jQuery('.mean-nav ul:first').slideUp(), A=!1, jQuery(M).toggleClass('meanclose').html(s);
          });
        } else W();
      }; C||jQuery(window).resize(function() {
        a=window.innerWidth||document.documentElement.clientWidth, W(), o>=a?(b(), x()):W();
      }), jQuery(window).resize(function() {
        a=window.innerWidth||document.documentElement.clientWidth, C?(x(), o>=a?!1===E&&b():W()):(W(), o>=a&&(b(), x()));
      }), b();
    });
  };
}(jQuery);
