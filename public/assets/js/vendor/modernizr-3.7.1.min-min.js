!function(e, t, n) {
  function r(e, t) {
    return typeof e===t;
  } function o(e) {
    let t=S.className; const n=C._config.classPrefix||''; if (x&&(t=t.baseVal), C._config.enableJSClass) {
      const r=new RegExp('(^|\\s)'+n+'no-js(\\s|$)'); t=t.replace(r, '$1'+n+'js$2');
    }C._config.enableClasses&&(e.length>0&&(t+=' '+n+e.join(' '+n)), x?S.className.baseVal=t:S.className=t);
  } function i(e, t) {
    if ('object'==typeof e) for (const n in e)k(e, n)&&i(n, e[n]); else {
      e=e.toLowerCase(); const r=e.split('.'); let s=C[r[0]]; if (2===r.length&&(s=s[r[1]]), void 0!==s) return C; t='function'==typeof t?t():t, 1===r.length?C[r[0]]=t:(!C[r[0]]||C[r[0]]instanceof Boolean||(C[r[0]]=new Boolean(C[r[0]])), C[r[0]][r[1]]=t), o([(t&&!1!==t?'':'no-')+r.join('-')]), C._trigger(e, t);
    } return C;
  } function s() {
    return 'function'!=typeof t.createElement?t.createElement(arguments[0]):x?t.createElementNS.call(t, 'http://www.w3.org/2000/svg', arguments[0]):t.createElement.apply(t, arguments);
  } function a() {
    let e=t.body; return e||(e=s(x?'svg':'body'), e.fake=!0), e;
  } function l(e, n, r, o) {
    let i; let l; let u; let f; const c='modernizr'; const d=s('div'); const p=a(); if (parseInt(r, 10)) for (;r--;)u=s('div'), u.id=o?o[r]:c+(r+1), d.appendChild(u); return i=s('style'), i.type='text/css', i.id='s'+c, (p.fake?p:d).appendChild(i), p.appendChild(d), i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)), d.id=c, p.fake&&(p.style.background='', p.style.overflow='hidden', f=S.style.overflow, S.style.overflow='hidden', S.appendChild(p)), l=n(d, e), p.fake?(p.parentNode.removeChild(p), S.style.overflow=f, S.offsetHeight):d.parentNode.removeChild(d), !!l;
  } function u(e, t) {
    return !!~(''+e).indexOf(t);
  } function f(e) {
    return e.replace(/([A-Z])/g, function(e, t) {
      return '-'+t.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  } function c(t, n, r) {
    let o; if ('getComputedStyle'in e) {
      o=getComputedStyle.call(e, t, n); const i=e.console; if (null!==o)r&&(o=o.getPropertyValue(r)); else if (i) {
        const s=i.error?'error':'log'; i[s].call(i, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
      }
    } else o=!n&&t.currentStyle&&t.currentStyle[r]; return o;
  } function d(t, r) {
    let o=t.length; if ('CSS'in e&&'supports'in e.CSS) {
      for (;o--;) if (e.CSS.supports(f(t[o]), r)) return !0; return !1;
    } if ('CSSSupportsRule'in e) {
      for (var i=[]; o--;)i.push('('+f(t[o])+':'+r+')'); return i=i.join(' or '), l('@supports ('+i+') { #modernizr { position: absolute; } }', function(e) {
        return 'absolute'===c(e, null, 'position');
      });
    } return n;
  } function p(e) {
    return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
      return t+n.toUpperCase();
    }).replace(/^-/, '');
  } function m(e, t, o, i) {
    function a() {
      f&&(delete N.style, delete N.modElem);
    } if (i=!r(i, 'undefined')&&i, !r(o, 'undefined')) {
      const l=d(e, o); if (!r(l, 'undefined')) return l;
    } for (var f, c, m, h, v, A=['modernizr', 'tspan', 'samp']; !N.style&&A.length;)f=!0, N.modElem=s(A.shift()), N.style=N.modElem.style; for (m=e.length, c=0; c<m; c++) {
      if (h=e[c], v=N.style[h], u(h, '-')&&(h=p(h)), N.style[h]!==n) {
        if (i||r(o, 'undefined')) return a(), 'pfx'!==t||h; try {
          N.style[h]=o;
        } catch (e) {} if (N.style[h]!==v) return a(), 'pfx'!==t||h;
      }
    } return a(), !1;
  } function h(e, t) {
    return function() {
      return e.apply(t, arguments);
    };
  } function v(e, t, n) {
    let o; for (const i in e) if (e[i]in t) return !1===n?e[i]:(o=t[e[i]], r(o, 'function')?h(o, n||t):o); return !1;
  } function A(e, t, n, o, i) {
    const s=e.charAt(0).toUpperCase()+e.slice(1); let a=(e+' '+O.join(s+' ')+s).split(' '); return r(t, 'string')||r(t, 'undefined')?m(a, t, o, i):(a=(e+' '+T.join(s+' ')+s).split(' '), v(a, t, n));
  } function g(e, t, r) {
    return A(e, n, n, t, r);
  } const y=[]; const w={_version: '3.7.1', _config: {classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0}, _q: [], on: function(e, t) {
    const n=this; setTimeout(function() {
      t(n[e]);
    }, 0);
  }, addTest: function(e, t, n) {
    y.push({name: e, fn: t, options: n});
  }, addAsyncTest: function(e) {
    y.push({name: null, fn: e});
  }}; var C=function() {}; C.prototype=w, C=new C; const b=[]; var S=t.documentElement; var x='svg'===S.nodeName.toLowerCase(); const _='Moz O ms Webkit'; var T=w._config.usePrefixes?_.toLowerCase().split(' '):[]; w._domPrefixes=T; const P=w._config.usePrefixes?' -webkit- -moz- -o- -ms- '.split(' '):['', '']; w._prefixes=P; let k; !function() {
    const e={}.hasOwnProperty; k=r(e, 'undefined')||r(e.call, 'undefined')?function(e, t) {
      return t in e&&r(e.constructor.prototype[t], 'undefined');
    }:function(t, n) {
      return e.call(t, n);
    };
  }(), w._l={}, w.on=function(e, t) {
    this._l[e]||(this._l[e]=[]), this._l[e].push(t), C.hasOwnProperty(e)&&setTimeout(function() {
      C._trigger(e, C[e]);
    }, 0);
  }, w._trigger=function(e, t) {
    if (this._l[e]) {
      const n=this._l[e]; setTimeout(function() {
        let e; for (e=0; e<n.length; e++)(0, n[e])(t);
      }, 0), delete this._l[e];
    }
  }, C._q.push(function() {
    w.addTest=i;
  }); const E=function() {
    function e(e, r) {
      let o; return !!e&&(r&&'string'!=typeof r||(r=s(r||'div')), e='on'+e, o=e in r, !o&&t&&(r.setAttribute||(r=s('div')), r.setAttribute(e, ''), o='function'==typeof r[e], r[e]!==n&&(r[e]=n), r.removeAttribute(e)), o);
    } var t=!('onblur'in S); return e;
  }(); w.hasEvent=E; const B=function() {
    const t=e.matchMedia||e.msMatchMedia; return t?function(e) {
      const n=t(e); return n&&n.matches||!1;
    }:function(t) {
      let n=!1; return l('@media '+t+' { #modernizr { position: absolute; } }', function(t) {
        n='absolute'===(e.getComputedStyle?e.getComputedStyle(t, null):t.currentStyle).position;
      }), n;
    };
  }(); w.mq=B; const z=function(e, t) {
    let n=!1; const r=s('div'); const o=r.style; if (e in o) {
      let i=T.length; for (o[e]=t, n=o[e]; i--&&!n;)o[e]='-'+T[i]+'-'+t, n=o[e];
    } return ''===n&&(n=!1), n;
  }; w.prefixedCSSValue=z; var O=w._config.usePrefixes?_.split(' '):[]; w._cssomPrefixes=O; const L={elem: s('modernizr')}; C._q.push(function() {
    delete L.elem;
  }); var N={style: L.elem.style}; C._q.unshift(function() {
    delete N.style;
  }), w.testAllProps=A, w.testAllProps=g, w.testProp=function(e, t, r) {
    return m([e], n, t, r);
  }, w.testStyles=l, C.addTest('customelements', 'customElements'in e), C.addTest('history', function() {
    const t=navigator.userAgent; return (-1===t.indexOf('Android 2.')&&-1===t.indexOf('Android 4.0')||-1===t.indexOf('Mobile Safari')||-1!==t.indexOf('Chrome')||-1!==t.indexOf('Windows Phone')||'file:'===location.protocol)&&e.history&&'pushState'in e.history;
  }), C.addTest('pointerevents', function() {
    let e=!1; let t=T.length; for (e=C.hasEvent('pointerdown'); t--&&!e;)E(T[t]+'pointerdown')&&(e=!0); return e;
  }); const j=new Boolean('postMessage'in e); j.structuredclones=!0; try {
    e.postMessage({toString: function() {
      j.structuredclones=!1;
    }}, '*');
  } catch (e) {}C.addTest('postmessage', j), C.addTest('webgl', function() {
    return 'WebGLRenderingContext'in e;
  }); let M=!1; try {
    M='WebSocket'in e&&2===e.WebSocket.CLOSING;
  } catch (e) {}C.addTest('websockets', M), C.addTest('cssanimations', g('animationName', 'a', !0)), function() {
    C.addTest('csscolumns', function() {
      let e=!1; const t=g('columnCount'); try {
        (e=!!t)&&(e=new Boolean(e));
      } catch (e) {} return e;
    }); for (var e, t, n=['Width', 'Span', 'Fill', 'Gap', 'Rule', 'RuleColor', 'RuleStyle', 'RuleWidth', 'BreakBefore', 'BreakAfter', 'BreakInside'], r=0; r<n.length; r++)e=n[r].toLowerCase(), t=g('column'+n[r]), 'breakbefore'!==e&&'breakafter'!==e&&'breakinside'!==e||(t=t||g(n[r])), C.addTest('csscolumns.'+e, t);
  }(), C.addTest('flexbox', g('flexBasis', '1px', !0)), C.addTest('picture', 'HTMLPictureElement'in e), C.addAsyncTest(function() {
    let e; let t; let n; const r=s('img'); const o='sizes'in r; !o&&'srcset'in r?(t='data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==', e='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', n=function() {
      i('sizes', 2===r.width);
    }, r.onload=n, r.onerror=n, r.setAttribute('sizes', '9px'), r.srcset=e+' 1w,'+t+' 8w', r.src=e):i('sizes', o);
  }), C.addTest('srcset', 'srcset'in s('img')), C.addTest('webworkers', 'Worker'in e), function() {
    let e; let t; let n; let o; let i; let s; let a; for (const l in y) {
      if (y.hasOwnProperty(l)) {
        if (e=[], t=y[l], t.name&&(e.push(t.name.toLowerCase()), t.options&&t.options.aliases&&t.options.aliases.length)) for (n=0; n<t.options.aliases.length; n++)e.push(t.options.aliases[n].toLowerCase()); for (o=r(t.fn, 'function')?t.fn():t.fn, i=0; i<e.length; i++)s=e[i], a=s.split('.'), 1===a.length?C[a[0]]=o:(!C[a[0]]||C[a[0]]instanceof Boolean||(C[a[0]]=new Boolean(C[a[0]])), C[a[0]][a[1]]=o), b.push((o?'':'no-')+a.join('-'));
      }
    }
  }(), o(b), delete w.addTest, delete w.addAsyncTest; for (let R=0; R<C._q.length; R++)C._q[R](); e.Modernizr=C;
}(window, document);
