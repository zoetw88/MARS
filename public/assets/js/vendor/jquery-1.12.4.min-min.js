!function(e, t) {
'object'==typeof module&&'object'==typeof module.exports?module.exports=e.document?t(e, !0):function(e) {
  if (!e.document) throw new Error('jQuery requires a window with a document'); return t(e);
}:t(e);
}('undefined'!=typeof window?window:this, function(e, t) {
  function n(e) {
    const t=!!e&&'length'in e&&e.length; const n=he.type(e); return 'function'!==n&&!he.isWindow(e)&&('array'===n||0===t||'number'==typeof t&&t>0&&t-1 in e);
  } function r(e, t, n) {
    if (he.isFunction(t)) {
      return he.grep(e, function(e, r) {
        return !!t.call(e, r, e)!==n;
      });
    } if (t.nodeType) {
      return he.grep(e, function(e) {
        return e===t!==n;
      });
    } if ('string'==typeof t) {
      if (Ee.test(t)) return he.filter(t, e, n); t=he.filter(t, e);
    } return he.grep(e, function(e) {
      return he.inArray(e, t)>-1!==n;
    });
  } function i(e, t) {
    do {
      e=e[t];
    } while (e&&1!==e.nodeType); return e;
  } function o(e) {
    const t={}; return he.each(e.match(De)||[], function(e, n) {
      t[n]=!0;
    }), t;
  } function a() {
ie.addEventListener?(ie.removeEventListener('DOMContentLoaded', s), e.removeEventListener('load', s)):(ie.detachEvent('onreadystatechange', s), e.detachEvent('onload', s));
  } function s() {
    (ie.addEventListener||'load'===e.event.type||'complete'===ie.readyState)&&(a(), he.ready());
  } function u(e, t, n) {
    if (void 0===n&&1===e.nodeType) {
      const r='data-'+t.replace(_e, '-$1').toLowerCase(); if ('string'==typeof(n=e.getAttribute(r))) {
        try {
          n='true'===n||'false'!==n&&('null'===n?null:+n+''===n?+n:qe.test(n)?he.parseJSON(n):n);
        } catch (e) {}he.data(e, t, n);
      } else n=void 0;
    } return n;
  } function l(e) {
    let t; for (t in e) if (('data'!==t||!he.isEmptyObject(e[t]))&&'toJSON'!==t) return !1; return !0;
  } function c(e, t, n, r) {
    if (He(e)) {
      let i; let o; const a=he.expando; const s=e.nodeType; const u=s?he.cache:e; let l=s?e[a]:e[a]&&a; if (l&&u[l]&&(r||u[l].data)||void 0!==n||'string'!=typeof t) return l||(l=s?e[a]=re.pop()||he.guid++:a), u[l]||(u[l]=s?{}:{toJSON: he.noop}), 'object'!=typeof t&&'function'!=typeof t||(r?u[l]=he.extend(u[l], t):u[l].data=he.extend(u[l].data, t)), o=u[l], r||(o.data||(o.data={}), o=o.data), void 0!==n&&(o[he.camelCase(t)]=n), 'string'==typeof t?null==(i=o[t])&&(i=o[he.camelCase(t)]):i=o, i;
    }
  } function d(e, t, n) {
    if (He(e)) {
      let r; let i; const o=e.nodeType; const a=o?he.cache:e; const s=o?e[he.expando]:he.expando; if (a[s]) {
        if (t&&(r=n?a[s]:a[s].data)) {
he.isArray(t)?t=t.concat(he.map(t, he.camelCase)):t in r?t=[t]:(t=he.camelCase(t), t=t in r?[t]:t.split(' ')), i=t.length; for (;i--;) delete r[t[i]]; if (n?!l(r):!he.isEmptyObject(r)) return;
        }(n||(delete a[s].data, l(a[s])))&&(o?he.cleanData([e], !0):fe.deleteExpando||a!=a.window?delete a[s]:a[s]=void 0);
      }
    }
  } function f(e, t, n, r) {
    let i; let o=1; let a=20; const s=r?function() {
      return r.cur();
    }:function() {
      return he.css(e, t, '');
    }; const u=s(); let l=n&&n[3]||(he.cssNumber[t]?'':'px'); let c=(he.cssNumber[t]||'px'!==l&&+u)&&Me.exec(he.css(e, t)); if (c&&c[3]!==l) {
      l=l||c[3], n=n||[], c=+u||1; do {
        o=o||'.5', c/=o, he.style(e, t, c+l);
      } while (o!==(o=s()/u)&&1!==o&&--a);
    } return n&&(c=+c||+u||0, i=n[1]?c+(n[1]+1)*n[2]:+n[2], r&&(r.unit=l, r.start=c, r.end=i)), i;
  } function p(e) {
    const t=$e.split('|'); const n=e.createDocumentFragment(); if (n.createElement) for (;t.length;)n.createElement(t.pop()); return n;
  } function h(e, t) {
    let n; let r; let i=0; let o=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||'*'):void 0!==e.querySelectorAll?e.querySelectorAll(t||'*'):void 0; if (!o) for (o=[], n=e.childNodes||e; null!=(r=n[i]); i++)!t||he.nodeName(r, t)?o.push(r):he.merge(o, h(r, t)); return void 0===t||t&&he.nodeName(e, t)?he.merge([e], o):o;
  } function g(e, t) {
    for (var n, r=0; null!=(n=e[r]); r++)he._data(n, 'globalEval', !t||he._data(t[r], 'globalEval'));
  } function m(e) {
    Be.test(e.type)&&(e.defaultChecked=e.checked);
  } function v(e, t, n, r, i) {
    for (var o, a, s, u, l, c, d, f=e.length, v=p(t), y=[], x=0; f>x; x++) {
      if ((a=e[x])||0===a) {
        if ('object'===he.type(a))he.merge(y, a.nodeType?[a]:a); else if (Xe.test(a)) {
          for (u=u||v.appendChild(t.createElement('div')), l=($.exec(a)||['', ''])[1].toLowerCase(), d=ze[l]||ze._default, u.innerHTML=d[1]+he.htmlPrefilter(a)+d[2], o=d[0]; o--;)u=u.lastChild; if (!fe.leadingWhitespace&&Ie.test(a)&&y.push(t.createTextNode(Ie.exec(a)[0])), !fe.tbody) for (a='table'!==l||Ue.test(a)?'<table>'!==d[1]||Ue.test(a)?0:u:u.firstChild, o=a&&a.childNodes.length; o--;)he.nodeName(c=a.childNodes[o], 'tbody')&&!c.childNodes.length&&a.removeChild(c); for (he.merge(y, u.childNodes), u.textContent=''; u.firstChild;)u.removeChild(u.firstChild); u=v.lastChild;
        } else y.push(t.createTextNode(a));
      }
    } for (u&&v.removeChild(u), fe.appendChecked||he.grep(h(y, 'input'), m), x=0; a=y[x++];) if (r&&he.inArray(a, r)>-1)i&&i.push(a); else if (s=he.contains(a.ownerDocument, a), u=h(v.appendChild(a), 'script'), s&&g(u), n) for (o=0; a=u[o++];)We.test(a.type||'')&&n.push(a); return u=null, v;
  } function y() {
    return !0;
  } function x() {
    return !1;
  } function b() {
    try {
      return ie.activeElement;
    } catch (e) {}
  } function w(e, t, n, r, i, o) {
    let a; let s; if ('object'==typeof t) {
      'string'!=typeof n&&(r=r||n, n=void 0); for (s in t)w(e, s, n, r, t[s], o); return e;
    } if (null==r&&null==i?(i=n, r=n=void 0):null==i&&('string'==typeof n?(i=r, r=void 0):(i=r, r=n, n=void 0)), !1===i)i=x; else if (!i) return e; return 1===o&&(a=i, i=function(e) {
      return he().off(e), a.apply(this, arguments);
    }, i.guid=a.guid||(a.guid=he.guid++)), e.each(function() {
      he.event.add(this, t, i, r, n);
    });
  } function T(e, t) {
    return he.nodeName(e, 'table')&&he.nodeName(11!==t.nodeType?t:t.firstChild, 'tr')?e.getElementsByTagName('tbody')[0]||e.appendChild(e.ownerDocument.createElement('tbody')):e;
  } function C(e) {
    return e.type=(null!==he.find.attr(e, 'type'))+'/'+e.type, e;
  } function E(e) {
    const t=rt.exec(e.type); return t?e.type=t[1]:e.removeAttribute('type'), e;
  } function N(e, t) {
    if (1===t.nodeType&&he.hasData(e)) {
      let n; let r; let i; const o=he._data(e); const a=he._data(t, o); const s=o.events; if (s) {
        delete a.handle, a.events={}; for (n in s) for (r=0, i=s[n].length; i>r; r++)he.event.add(t, n, s[n][r]);
      }a.data&&(a.data=he.extend({}, a.data));
    }
  } function k(e, t) {
    let n; let r; let i; if (1===t.nodeType) {
      if (n=t.nodeName.toLowerCase(), !fe.noCloneEvent&&t[he.expando]) {
        i=he._data(t); for (r in i.events)he.removeEvent(t, r, i.handle); t.removeAttribute(he.expando);
      }'script'===n&&t.text!==e.text?(C(t).text=e.text, E(t)):'object'===n?(t.parentNode&&(t.outerHTML=e.outerHTML), fe.html5Clone&&e.innerHTML&&!he.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):'input'===n&&Be.test(e.type)?(t.defaultChecked=t.checked=e.checked, t.value!==e.value&&(t.value=e.value)):'option'===n?t.defaultSelected=t.selected=e.defaultSelected:'input'!==n&&'textarea'!==n||(t.defaultValue=e.defaultValue);
    }
  } function S(e, t, n, r) {
    t=ae.apply([], t); let i; let o; let a; let s; let u; let l; let c=0; const d=e.length; const f=d-1; const p=t[0]; const g=he.isFunction(p); if (g||d>1&&'string'==typeof p&&!fe.checkClone&&nt.test(p)) {
      return e.each(function(i) {
        const o=e.eq(i); g&&(t[0]=p.call(this, i, o.html())), S(o, t, n, r);
      });
    } if (d&&(l=v(t, e[0].ownerDocument, !1, e, r), i=l.firstChild, 1===l.childNodes.length&&(l=i), i||r)) {
      for (s=he.map(h(l, 'script'), C), a=s.length; d>c; c++)o=l, c!==f&&(o=he.clone(o, !0, !0), a&&he.merge(s, h(o, 'script'))), n.call(e[c], o, c); if (a) for (u=s[s.length-1].ownerDocument, he.map(s, E), c=0; a>c; c++)o=s[c], We.test(o.type||'')&&!he._data(o, 'globalEval')&&he.contains(u, o)&&(o.src?he._evalUrl&&he._evalUrl(o.src):he.globalEval((o.text||o.textContent||o.innerHTML||'').replace(it, ''))); l=i=null;
    } return e;
  } function A(e, t, n) {
    for (var r, i=t?he.filter(t, e):e, o=0; null!=(r=i[o]); o++)n||1!==r.nodeType||he.cleanData(h(r)), r.parentNode&&(n&&he.contains(r.ownerDocument, r)&&g(h(r, 'script')), r.parentNode.removeChild(r)); return e;
  } function D(e, t) {
    const n=he(t.createElement(e)).appendTo(t.body); const r=he.css(n[0], 'display'); return n.detach(), r;
  } function j(e) {
    let t=ie; let n=ut[e]; return n||(n=D(e, t), 'none'!==n&&n||(st=(st||he('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(t.documentElement), t=(st[0].contentWindow||st[0].contentDocument).document, t.write(), t.close(), n=D(e, t), st.detach()), ut[e]=n), n;
  } function L(e, t) {
    return {get: function() {
      return e()?void delete this.get:(this.get=t).apply(this, arguments);
    }};
  } function H(e) {
    if (e in Ct) return e; for (let t=e.charAt(0).toUpperCase()+e.slice(1), n=Tt.length; n--;) if ((e=Tt[n]+t)in Ct) return e;
  } function q(e, t) {
    for (var n, r, i, o=[], a=0, s=e.length; s>a; a++)r=e[a], r.style&&(o[a]=he._data(r, 'olddisplay'), n=r.style.display, t?(o[a]||'none'!==n||(r.style.display=''), ''===r.style.display&&Re(r)&&(o[a]=he._data(r, 'olddisplay', j(r.nodeName)))):(i=Re(r), (n&&'none'!==n||!i)&&he._data(r, 'olddisplay', i?n:he.css(r, 'display')))); for (a=0; s>a; a++)r=e[a], r.style&&(t&&'none'!==r.style.display&&''!==r.style.display||(r.style.display=t?o[a]||'':'none')); return e;
  } function _(e, t, n) {
    const r=xt.exec(t); return r?Math.max(0, r[1]-(n||0))+(r[2]||'px'):t;
  } function F(e, t, n, r, i) {
    for (var o=n===(r?'border':'content')?4:'width'===t?1:0, a=0; 4>o; o+=2)'margin'===n&&(a+=he.css(e, n+Oe[o], !0, i)), r?('content'===n&&(a-=he.css(e, 'padding'+Oe[o], !0, i)), 'margin'!==n&&(a-=he.css(e, 'border'+Oe[o]+'Width', !0, i))):(a+=he.css(e, 'padding'+Oe[o], !0, i), 'padding'!==n&&(a+=he.css(e, 'border'+Oe[o]+'Width', !0, i))); return a;
  } function M(e, t, n) {
    let r=!0; let i='width'===t?e.offsetWidth:e.offsetHeight; const o=pt(e); const a=fe.boxSizing&&'border-box'===he.css(e, 'boxSizing', !1, o); if (0>=i||null==i) {
      if (i=ht(e, t, o), (0>i||null==i)&&(i=e.style[t]), ct.test(i)) return i; r=a&&(fe.boxSizingReliable()||i===e.style[t]), i=parseFloat(i)||0;
    } return i+F(e, t, n||(a?'border':'content'), r, o)+'px';
  } function O(e, t, n, r, i) {
    return new O.prototype.init(e, t, n, r, i);
  } function R() {
    return e.setTimeout(function() {
      Et=void 0;
    }), Et=he.now();
  } function P(e, t) {
    let n; const r={height: e}; let i=0; for (t=t?1:0; 4>i; i+=2-t)n=Oe[i], r['margin'+n]=r['padding'+n]=e; return t&&(r.opacity=r.width=e), r;
  } function B(e, t, n) {
    for (var r, i=(z.tweeners[t]||[]).concat(z.tweeners['*']), o=0, a=i.length; a>o; o++) if (r=i[o].call(n, t, e)) return r;
  } function W(e, t, n) {
    let r; let i; let o; let a; let s; let u; let l; let c; const d=this; const f={}; const p=e.style; let h=e.nodeType&&Re(e); let g=he._data(e, 'fxshow'); n.queue||(s=he._queueHooks(e, 'fx'), null==s.unqueued&&(s.unqueued=0, u=s.empty.fire, s.empty.fire=function() {
      s.unqueued||u();
    }), s.unqueued++, d.always(function() {
      d.always(function() {
        s.unqueued--, he.queue(e, 'fx').length||s.empty.fire();
      });
    })), 1===e.nodeType&&('height'in t||'width'in t)&&(n.overflow=[p.overflow, p.overflowX, p.overflowY], l=he.css(e, 'display'), 'inline'===(c='none'===l?he._data(e, 'olddisplay')||j(e.nodeName):l)&&'none'===he.css(e, 'float')&&(fe.inlineBlockNeedsLayout&&'inline'!==j(e.nodeName)?p.zoom=1:p.display='inline-block')), n.overflow&&(p.overflow='hidden', fe.shrinkWrapBlocks()||d.always(function() {
      p.overflow=n.overflow[0], p.overflowX=n.overflow[1], p.overflowY=n.overflow[2];
    })); for (r in t) {
      if (i=t[r], kt.exec(i)) {
        if (delete t[r], o=o||'toggle'===i, i===(h?'hide':'show')) {
          if ('show'!==i||!g||void 0===g[r]) continue; h=!0;
        }f[r]=g&&g[r]||he.style(e, r);
      } else l=void 0;
    } if (he.isEmptyObject(f))'inline'===('none'===l?j(e.nodeName):l)&&(p.display=l); else {
g?'hidden'in g&&(h=g.hidden):g=he._data(e, 'fxshow', {}), o&&(g.hidden=!h), h?he(e).show():d.done(function() {
  he(e).hide();
}), d.done(function() {
        let t; he._removeData(e, 'fxshow'); for (t in f)he.style(e, t, f[t]);
      }); for (r in f)a=B(h?g[r]:0, r, d), r in g||(g[r]=a.start, h&&(a.end=a.start, a.start='width'===r||'height'===r?1:0));
    }
  } function I(e, t) {
    let n; let r; let i; let o; let a; for (n in e) {
      if (r=he.camelCase(n), i=t[r], o=e[n], he.isArray(o)&&(i=o[1], o=e[n]=o[0]), n!==r&&(e[r]=o, delete e[n]), (a=he.cssHooks[r])&&'expand'in a) {
        o=a.expand(o), delete e[r]; for (n in o)n in e||(e[n]=o[n], t[n]=i);
      } else t[r]=i;
    }
  } function z(e, t, n) {
    let r; let i; let o=0; const a=z.prefilters.length; const s=he.Deferred().always(function() {
      delete u.elem;
    }); var u=function() {
      if (i) return !1; for (var t=Et||R(), n=Math.max(0, l.startTime+l.duration-t), r=n/l.duration||0, o=1-r, a=0, u=l.tweens.length; u>a; a++)l.tweens[a].run(o); return s.notifyWith(e, [l, o, n]), 1>o&&u?n:(s.resolveWith(e, [l]), !1);
    }; var l=s.promise({elem: e, props: he.extend({}, t), opts: he.extend(!0, {specialEasing: {}, easing: he.easing._default}, n), originalProperties: t, originalOptions: n, startTime: Et||R(), duration: n.duration, tweens: [], createTween: function(t, n) {
      const r=he.Tween(e, l.opts, t, n, l.opts.specialEasing[t]||l.opts.easing); return l.tweens.push(r), r;
    }, stop: function(t) {
      let n=0; const r=t?l.tweens.length:0; if (i) return this; for (i=!0; r>n; n++)l.tweens[n].run(1); return t?(s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])):s.rejectWith(e, [l, t]), this;
    }}); const c=l.props; for (I(c, l.opts.specialEasing); a>o; o++) if (r=z.prefilters[o].call(l, e, c, l.opts)) return he.isFunction(r.stop)&&(he._queueHooks(l.elem, l.opts.queue).stop=he.proxy(r.stop, r)), r; return he.map(c, B, l), he.isFunction(l.opts.start)&&l.opts.start.call(e, l), he.fx.timer(he.extend(u, {elem: e, anim: l, queue: l.opts.queue})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  } function X(e) {
    return he.attr(e, 'class')||'';
  } function U(e) {
    return function(t, n) {
      'string'!=typeof t&&(n=t, t='*'); let r; let i=0; const o=t.toLowerCase().match(De)||[]; if (he.isFunction(n)) for (;r=o[i++];)'+'===r.charAt(0)?(r=r.slice(1)||'*', (e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n);
    };
  } function V(e, t, n, r) {
    function i(s) {
      let u; return o[s]=!0, he.each(e[s]||[], function(e, s) {
        const l=s(t, n, r); return 'string'!=typeof l||a||o[l]?a?!(u=l):void 0:(t.dataTypes.unshift(l), i(l), !1);
      }), u;
    } var o={}; var a=e===Qt; return i(t.dataTypes[0])||!o['*']&&i('*');
  } function Y(e, t) {
    let n; let r; const i=he.ajaxSettings.flatOptions||{}; for (r in t) void 0!==t[r]&&((i[r]?e:n||(n={}))[r]=t[r]); return n&&he.extend(!0, e, n), e;
  } function J(e, t, n) {
    for (var r, i, o, a, s=e.contents, u=e.dataTypes; '*'===u[0];)u.shift(), void 0===i&&(i=e.mimeType||t.getResponseHeader('Content-Type')); if (i) {
      for (a in s) {
        if (s[a]&&s[a].test(i)) {
          u.unshift(a); break;
        }
      }
    } if (u[0]in n)o=u[0]; else {
      for (a in n) {
        if (!u[0]||e.converters[a+' '+u[0]]) {
          o=a; break;
        }r||(r=a);
      }o=o||r;
    } return o?(o!==u[0]&&u.unshift(o), n[o]):void 0;
  } function G(e, t, n, r) {
    let i; let o; let a; let s; let u; const l={}; const c=e.dataTypes.slice(); if (c[1]) for (a in e.converters)l[a.toLowerCase()]=e.converters[a]; for (o=c.shift(); o;) {
      if (e.responseFields[o]&&(n[e.responseFields[o]]=t), !u&&r&&e.dataFilter&&(t=e.dataFilter(t, e.dataType)), u=o, o=c.shift()) {
        if ('*'===o)o=u; else if ('*'!==u&&u!==o) {
          if (!(a=l[u+' '+o]||l['* '+o])) {
            for (i in l) {
              if (s=i.split(' '), s[1]===o&&(a=l[u+' '+s[0]]||l['* '+s[0]])) {
!0===a?a=l[i]:!0!==l[i]&&(o=s[0], c.unshift(s[1])); break;
              }
            }
          } if (!0!==a) {
            if (a&&e.throws)t=a(t); else {
              try {
                t=a(t);
              } catch (e) {
                return {state: 'parsererror', error: a?e:'No conversion from '+u+' to '+o};
              }
            }
          }
        }
      }
    } return {state: 'success', data: t};
  } function Q(e) {
    return e.style&&e.style.display||he.css(e, 'display');
  } function K(e) {
    if (!he.contains(e.ownerDocument||ie, e)) return !0; for (;e&&1===e.nodeType;) {
      if ('none'===Q(e)||'hidden'===e.type) return !0; e=e.parentNode;
    } return !1;
  } function Z(e, t, n, r) {
    let i; if (he.isArray(t)) {
      he.each(t, function(t, i) {
n||nn.test(e)?r(e, i):Z(e+'['+('object'==typeof i&&null!=i?t:'')+']', i, n, r);
      });
    } else if (n||'object'!==he.type(t))r(e, t); else for (i in t)Z(e+'['+i+']', t[i], n, r);
  } function ee() {
    try {
      return new e.XMLHttpRequest;
    } catch (e) {}
  } function te() {
    try {
      return new e.ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  } function ne(e) {
    return he.isWindow(e)?e:9===e.nodeType&&(e.defaultView||e.parentWindow);
  } var re=[]; var ie=e.document; const oe=re.slice; var ae=re.concat; const se=re.push; const ue=re.indexOf; const le={}; const ce=le.toString; const de=le.hasOwnProperty; var fe={}; const pe='1.12.4'; var he=function(e, t) {
    return new he.fn.init(e, t);
  }; const ge=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; const me=/^-ms-/; const ve=/-([\da-z])/gi; const ye=function(e, t) {
    return t.toUpperCase();
  }; he.fn=he.prototype={jquery: pe, constructor: he, selector: '', length: 0, toArray: function() {
    return oe.call(this);
  }, get: function(e) {
    return null!=e?0>e?this[e+this.length]:this[e]:oe.call(this);
  }, pushStack: function(e) {
    const t=he.merge(this.constructor(), e); return t.prevObject=this, t.context=this.context, t;
  }, each: function(e) {
    return he.each(this, e);
  }, map: function(e) {
    return this.pushStack(he.map(this, function(t, n) {
      return e.call(t, n, t);
    }));
  }, slice: function() {
    return this.pushStack(oe.apply(this, arguments));
  }, first: function() {
    return this.eq(0);
  }, last: function() {
    return this.eq(-1);
  }, eq: function(e) {
    const t=this.length; const n=+e+(0>e?t:0); return this.pushStack(n>=0&&t>n?[this[n]]:[]);
  }, end: function() {
    return this.prevObject||this.constructor();
  }, push: se, sort: re.sort, splice: re.splice}, he.extend=he.fn.extend=function() {
    let e; let t; let n; let r; let i; let o; let a=arguments[0]||{}; let s=1; const u=arguments.length; let l=!1; for ('boolean'==typeof a&&(l=a, a=arguments[s]||{}, s++), 'object'==typeof a||he.isFunction(a)||(a={}), s===u&&(a=this, s--); u>s; s++) if (null!=(i=arguments[s])) for (r in i)e=a[r], n=i[r], a!==n&&(l&&n&&(he.isPlainObject(n)||(t=he.isArray(n)))?(t?(t=!1, o=e&&he.isArray(e)?e:[]):o=e&&he.isPlainObject(e)?e:{}, a[r]=he.extend(l, o, n)):void 0!==n&&(a[r]=n)); return a;
  }, he.extend({expando: 'jQuery'+(pe+Math.random()).replace(/\D/g, ''), isReady: !0, error: function(e) {
    throw new Error(e);
  }, noop: function() {}, isFunction: function(e) {
    return 'function'===he.type(e);
  }, isArray: Array.isArray||function(e) {
    return 'array'===he.type(e);
  }, isWindow: function(e) {
    return null!=e&&e==e.window;
  }, isNumeric: function(e) {
    const t=e&&e.toString(); return !he.isArray(e)&&t-parseFloat(t)+1>=0;
  }, isEmptyObject: function(e) {
    let t; for (t in e) return !1; return !0;
  }, isPlainObject: function(e) {
    let t; if (!e||'object'!==he.type(e)||e.nodeType||he.isWindow(e)) return !1; try {
      if (e.constructor&&!de.call(e, 'constructor')&&!de.call(e.constructor.prototype, 'isPrototypeOf')) return !1;
    } catch (e) {
      return !1;
    } if (!fe.ownFirst) for (t in e) return de.call(e, t); for (t in e);return void 0===t||de.call(e, t);
  }, type: function(e) {
    return null==e?e+'':'object'==typeof e||'function'==typeof e?le[ce.call(e)]||'object':typeof e;
  }, globalEval: function(t) {
    t&&he.trim(t)&&(e.execScript||function(t) {
      e.eval.call(e, t);
    })(t);
  }, camelCase: function(e) {
    return e.replace(me, 'ms-').replace(ve, ye);
  }, nodeName: function(e, t) {
    return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase();
  }, each: function(e, t) {
    let r; let i=0; if (n(e)) for (r=e.length; r>i&&!1!==t.call(e[i], i, e[i]); i++);else for (i in e) if (!1===t.call(e[i], i, e[i])) break; return e;
  }, trim: function(e) {
    return null==e?'':(e+'').replace(ge, '');
  }, makeArray: function(e, t) {
    const r=t||[]; return null!=e&&(n(Object(e))?he.merge(r, 'string'==typeof e?[e]:e):se.call(r, e)), r;
  }, inArray: function(e, t, n) {
    let r; if (t) {
      if (ue) return ue.call(t, e, n); for (r=t.length, n=n?0>n?Math.max(0, r+n):n:0; r>n; n++) if (n in t&&t[n]===e) return n;
    } return -1;
  }, merge: function(e, t) {
    for (var n=+t.length, r=0, i=e.length; n>r;)e[i++]=t[r++]; if (n!==n) for (;void 0!==t[r];)e[i++]=t[r++]; return e.length=i, e;
  }, grep: function(e, t, n) {
    for (var r, i=[], o=0, a=e.length, s=!n; a>o; o++)(r=!t(e[o], o))!==s&&i.push(e[o]); return i;
  }, map: function(e, t, r) {
    let i; let o; let a=0; const s=[]; if (n(e)) for (i=e.length; i>a; a++)null!=(o=t(e[a], a, r))&&s.push(o); else for (a in e)null!=(o=t(e[a], a, r))&&s.push(o); return ae.apply([], s);
  }, guid: 1, proxy: function(e, t) {
    let n; let r; let i; return 'string'==typeof t&&(i=e[t], t=e, e=i), he.isFunction(e)?(n=oe.call(arguments, 2), r=function() {
      return e.apply(t||this, n.concat(oe.call(arguments)));
    }, r.guid=e.guid=e.guid||he.guid++, r):void 0;
  }, now: function() {
    return +new Date;
  }, support: fe}), 'function'==typeof Symbol&&(he.fn[Symbol.iterator]=re[Symbol.iterator]), he.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(e, t) {
    le['[object '+t+']']=t.toLowerCase();
  }); const xe=function(e) {
    function t(e, t, n, r) {
      let i; let o; let a; let s; let u; let l; let d; let p; let h=t&&t.ownerDocument; const g=t?t.nodeType:9; if (n=n||[], 'string'!=typeof e||!e||1!==g&&9!==g&&11!==g) return n; if (!r&&((t?t.ownerDocument||t:B)!==H&&L(t), t=t||H, _)) {
        if (11!==g&&(l=$.exec(e))) {
          if (i=l[1]) {
            if (9===g) {
              if (!(a=t.getElementById(i))) return n; if (a.id===i) return n.push(a), n;
            } else if (h&&(a=h.getElementById(i))&&R(t, a)&&a.id===i) return n.push(a), n;
          } else {
            if (l[2]) return Z.apply(n, t.getElementsByTagName(e)), n; if ((i=l[3])&&w.getElementsByClassName&&t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(i)), n;
          }
        } if (w.qsa&&!U[e+' ']&&(!F||!F.test(e))) {
          if (1!==g)h=t, p=e; else if ('object'!==t.nodeName.toLowerCase()) {
            for ((s=t.getAttribute('id'))?s=s.replace(xe, '\\$&'):t.setAttribute('id', s=P), d=N(e), o=d.length, u=pe.test(s)?'#'+s:'[id=\''+s+'\']'; o--;)d[o]=u+' '+f(d[o]); p=d.join(','), h=ye.test(e)&&c(t.parentNode)||t;
          } if (p) {
            try {
              return Z.apply(n, h.querySelectorAll(p)), n;
            } catch (e) {} finally {
              s===P&&t.removeAttribute('id');
            }
          }
        }
      } return S(e.replace(ue, '$1'), t, n, r);
    } function n() {
      function e(n, r) {
        return t.push(n+' ')>T.cacheLength&&delete e[t.shift()], e[n+' ']=r;
      } var t=[]; return e;
    } function r(e) {
      return e[P]=!0, e;
    } function i(e) {
      let t=H.createElement('div'); try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode&&t.parentNode.removeChild(t), t=null;
      }
    } function o(e, t) {
      for (let n=e.split('|'), r=n.length; r--;)T.attrHandle[n[r]]=t;
    } function a(e, t) {
      let n=t&&e; const r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||Y)-(~e.sourceIndex||Y); if (r) return r; if (n) for (;n=n.nextSibling;) if (n===t) return -1; return e?1:-1;
    } function s(e) {
      return function(t) {
        return 'input'===t.nodeName.toLowerCase()&&t.type===e;
      };
    } function u(e) {
      return function(t) {
        const n=t.nodeName.toLowerCase(); return ('input'===n||'button'===n)&&t.type===e;
      };
    } function l(e) {
      return r(function(t) {
        return t=+t, r(function(n, r) {
          for (var i, o=e([], n.length, t), a=o.length; a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]));
        });
      });
    } function c(e) {
      return e&&void 0!==e.getElementsByTagName&&e;
    } function d() {} function f(e) {
      for (var t=0, n=e.length, r=''; n>t; t++)r+=e[t].value; return r;
    } function p(e, t, n) {
      const r=t.dir; const i=n&&'parentNode'===r; const o=I++; return t.first?function(t, n, o) {
        for (;t=t[r];) if (1===t.nodeType||i) return e(t, n, o);
      }:function(t, n, a) {
        let s; let u; let l; const c=[W, o]; if (a) {
          for (;t=t[r];) if ((1===t.nodeType||i)&&e(t, n, a)) return !0;
        } else {
          for (;t=t[r];) {
            if (1===t.nodeType||i) {
              if (l=t[P]||(t[P]={}), u=l[t.uniqueID]||(l[t.uniqueID]={}), (s=u[r])&&s[0]===W&&s[1]===o) return c[2]=s[2]; if (u[r]=c, c[2]=e(t, n, a)) return !0;
            }
          }
        }
      };
    } function h(e) {
      return e.length>1?function(t, n, r) {
        for (let i=e.length; i--;) if (!e[i](t, n, r)) return !1; return !0;
      }:e[0];
    } function g(e, n, r) {
      for (let i=0, o=n.length; o>i; i++)t(e, n[i], r); return r;
    } function m(e, t, n, r, i) {
      for (var o, a=[], s=0, u=e.length, l=null!=t; u>s; s++)(o=e[s])&&(n&&!n(o, r, i)||(a.push(o), l&&t.push(s))); return a;
    } function v(e, t, n, i, o, a) {
      return i&&!i[P]&&(i=v(i)), o&&!o[P]&&(o=v(o, a)), r(function(r, a, s, u) {
        let l; let c; let d; const f=[]; const p=[]; const h=a.length; const v=r||g(t||'*', s.nodeType?[s]:s, []); const y=!e||!r&&t?v:m(v, f, e, s, u); let x=n?o||(r?e:h||i)?[]:a:y; if (n&&n(y, x, s, u), i) for (l=m(x, p), i(l, [], s, u), c=l.length; c--;)(d=l[c])&&(x[p[c]]=!(y[p[c]]=d)); if (r) {
          if (o||e) {
            if (o) {
              for (l=[], c=x.length; c--;)(d=x[c])&&l.push(y[c]=d); o(null, x=[], l, u);
            } for (c=x.length; c--;)(d=x[c])&&(l=o?te(r, d):f[c])>-1&&(r[l]=!(a[l]=d));
          }
        } else x=m(x===a?x.splice(h, x.length):x), o?o(null, a, x, u):Z.apply(a, x);
      });
    } function y(e) {
      for (var t, n, r, i=e.length, o=T.relative[e[0].type], a=o||T.relative[' '], s=o?1:0, u=p(function(e) {
          return e===t;
        }, a, !0), l=p(function(e) {
          return te(t, e)>-1;
        }, a, !0), c=[function(e, n, r) {
          const i=!o&&(r||n!==A)||((t=n).nodeType?u(e, n, r):l(e, n, r)); return t=null, i;
        }]; i>s; s++) {
        if (n=T.relative[e[s].type])c=[p(h(c), n)]; else {
          if (n=T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
            for (r=++s; i>r&&!T.relative[e[r].type]; r++);return v(s>1&&h(c), s>1&&f(e.slice(0, s-1).concat({value: ' '===e[s-2].type?'*':''})).replace(ue, '$1'), n, r>s&&y(e.slice(s, r)), i>r&&y(e=e.slice(r)), i>r&&f(e));
          }c.push(n);
        }
      } return h(c);
    } function x(e, n) {
      const i=n.length>0; const o=e.length>0; const a=function(r, a, s, u, l) {
        let c; let d; let f; let p=0; let h='0'; const g=r&&[]; let v=[]; const y=A; const x=r||o&&T.find.TAG('*', l); const b=W+=null==y?1:Math.random()||.1; const w=x.length; for (l&&(A=a===H||a||l); h!==w&&null!=(c=x[h]); h++) {
          if (o&&c) {
            for (d=0, a||c.ownerDocument===H||(L(c), s=!_); f=e[d++];) {
              if (f(c, a||H, s)) {
                u.push(c); break;
              }
            }l&&(W=b);
          }i&&((c=!f&&c)&&p--, r&&g.push(c));
        } if (p+=h, i&&h!==p) {
          for (d=0; f=n[d++];)f(g, v, a, s); if (r) {
            if (p>0) for (;h--;)g[h]||v[h]||(v[h]=Q.call(u)); v=m(v);
          }Z.apply(u, v), l&&!r&&v.length>0&&p+n.length>1&&t.uniqueSort(u);
        } return l&&(W=b, A=y), g;
      }; return i?r(a):a;
    } let b; let w; let T; let C; let E; let N; let k; let S; let A; let D; let j; let L; let H; let q; let _; let F; let M; let O; let R; var P='sizzle'+1*new Date; var B=e.document; var W=0; var I=0; const z=n(); const X=n(); var U=n(); let V=function(e, t) {
      return e===t&&(j=!0), 0;
    }; var Y=1<<31; const J={}.hasOwnProperty; let G=[]; var Q=G.pop; const K=G.push; var Z=G.push; const ee=G.slice; var te=function(e, t) {
      for (let n=0, r=e.length; r>n; n++) if (e[n]===t) return n; return -1;
    }; const ne='checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'; const re='[\\x20\\t\\r\\n\\f]'; const ie='(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+'; const oe='\\['+re+'*('+ie+')(?:'+re+'*([*^$|!~]?=)'+re+'*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|('+ie+'))|)'+re+'*\\]'; const ae=':('+ie+')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|'+oe+')*)|.*)\\)|)'; const se=new RegExp(re+'+', 'g'); var ue=new RegExp('^'+re+'+|((?:^|[^\\\\])(?:\\\\.)*)'+re+'+$', 'g'); const le=new RegExp('^'+re+'*,'+re+'*'); const ce=new RegExp('^'+re+'*([>+~]|'+re+')'+re+'*'); const de=new RegExp('='+re+'*([^\\]\'"]*?)'+re+'*\\]', 'g'); const fe=new RegExp(ae); var pe=new RegExp('^'+ie+'$'); const he={ID: new RegExp('^#('+ie+')'), CLASS: new RegExp('^\\.('+ie+')'), TAG: new RegExp('^('+ie+'|[*])'), ATTR: new RegExp('^'+oe), PSEUDO: new RegExp('^'+ae), CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\('+re+'*(even|odd|(([+-]|)(\\d*)n|)'+re+'*(?:([+-]|)'+re+'*(\\d+)|))'+re+'*\\)|)', 'i'), bool: new RegExp('^(?:'+ne+')$', 'i'), needsContext: new RegExp('^'+re+'*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\('+re+'*((?:-\\d)?\\d*)'+re+'*\\)|)(?=[^-]|$)', 'i')}; const ge=/^(?:input|select|textarea|button)$/i; const me=/^h\d$/i; const ve=/^[^{]+\{\s*\[native \w/; var $=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/; var ye=/[+~]/; var xe=/'|\\/g; const be=new RegExp('\\\\([\\da-f]{1,6}'+re+'?|('+re+')|.)', 'ig'); const we=function(e, t, n) {
      const r='0x'+t-65536; return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296, 1023&r|56320);
    }; const Te=function() {
      L();
    }; try {
      Z.apply(G=ee.call(B.childNodes), B.childNodes), G[B.childNodes.length].nodeType;
    } catch (e) {
      Z={apply: G.length?function(e, t) {
        K.apply(e, ee.call(t));
      }:function(e, t) {
        for (var n=e.length, r=0; e[n++]=t[r++];);e.length=n-1;
      }};
    }w=t.support={}, E=t.isXML=function(e) {
      const t=e&&(e.ownerDocument||e).documentElement; return !!t&&'HTML'!==t.nodeName;
    }, L=t.setDocument=function(e) {
      let t; let n; const r=e?e.ownerDocument||e:B; return r!==H&&9===r.nodeType&&r.documentElement?(H=r, q=H.documentElement, _=!E(H), (n=H.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener('unload', Te, !1):n.attachEvent&&n.attachEvent('onunload', Te)), w.attributes=i(function(e) {
        return e.className='i', !e.getAttribute('className');
      }), w.getElementsByTagName=i(function(e) {
        return e.appendChild(H.createComment('')), !e.getElementsByTagName('*').length;
      }), w.getElementsByClassName=ve.test(H.getElementsByClassName), w.getById=i(function(e) {
        return q.appendChild(e).id=P, !H.getElementsByName||!H.getElementsByName(P).length;
      }), w.getById?(T.find.ID=function(e, t) {
        if (void 0!==t.getElementById&&_) {
          const n=t.getElementById(e); return n?[n]:[];
        }
      }, T.filter.ID=function(e) {
        const t=e.replace(be, we); return function(e) {
          return e.getAttribute('id')===t;
        };
      }):(delete T.find.ID, T.filter.ID=function(e) {
        const t=e.replace(be, we); return function(e) {
          const n=void 0!==e.getAttributeNode&&e.getAttributeNode('id'); return n&&n.value===t;
        };
      }), T.find.TAG=w.getElementsByTagName?function(e, t) {
        return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0;
      }:function(e, t) {
        let n; const r=[]; let i=0; const o=t.getElementsByTagName(e); if ('*'===e) {
          for (;n=o[i++];)1===n.nodeType&&r.push(n); return r;
        } return o;
      }, T.find.CLASS=w.getElementsByClassName&&function(e, t) {
        return void 0!==t.getElementsByClassName&&_?t.getElementsByClassName(e):void 0;
      }, M=[], F=[], (w.qsa=ve.test(H.querySelectorAll))&&(i(function(e) {
        q.appendChild(e).innerHTML='<a id=\''+P+'\'></a><select id=\''+P+'-\r\\\' msallowcapture=\'\'><option selected=\'\'></option></select>', e.querySelectorAll('[msallowcapture^=\'\']').length&&F.push('[*^$]='+re+'*(?:\'\'|"")'), e.querySelectorAll('[selected]').length||F.push('\\['+re+'*(?:value|'+ne+')'), e.querySelectorAll('[id~='+P+'-]').length||F.push('~='), e.querySelectorAll(':checked').length||F.push(':checked'), e.querySelectorAll('a#'+P+'+*').length||F.push('.#.+[+~]');
      }), i(function(e) {
        const t=H.createElement('input'); t.setAttribute('type', 'hidden'), e.appendChild(t).setAttribute('name', 'D'), e.querySelectorAll('[name=d]').length&&F.push('name'+re+'*[*^$|!~]?='), e.querySelectorAll(':enabled').length||F.push(':enabled', ':disabled'), e.querySelectorAll('*,:x'), F.push(',.*:');
      })), (w.matchesSelector=ve.test(O=q.matches||q.webkitMatchesSelector||q.mozMatchesSelector||q.oMatchesSelector||q.msMatchesSelector))&&i(function(e) {
        w.disconnectedMatch=O.call(e, 'div'), O.call(e, '[s!=\'\']:x'), M.push('!=', ae);
      }), F=F.length&&new RegExp(F.join('|')), M=M.length&&new RegExp(M.join('|')), t=ve.test(q.compareDocumentPosition), R=t||ve.test(q.contains)?function(e, t) {
        const n=9===e.nodeType?e.documentElement:e; const r=t&&t.parentNode; return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)));
      }:function(e, t) {
        if (t) for (;t=t.parentNode;) if (t===e) return !0; return !1;
      }, V=t?function(e, t) {
        if (e===t) return j=!0, 0; let n=!e.compareDocumentPosition-!t.compareDocumentPosition; return n||(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1, 1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===H||e.ownerDocument===B&&R(B, e)?-1:t===H||t.ownerDocument===B&&R(B, t)?1:D?te(D, e)-te(D, t):0:4&n?-1:1);
      }:function(e, t) {
        if (e===t) return j=!0, 0; let n; let r=0; const i=e.parentNode; const o=t.parentNode; const s=[e]; const u=[t]; if (!i||!o) return e===H?-1:t===H?1:i?-1:o?1:D?te(D, e)-te(D, t):0; if (i===o) return a(e, t); for (n=e; n=n.parentNode;)s.unshift(n); for (n=t; n=n.parentNode;)u.unshift(n); for (;s[r]===u[r];)r++; return r?a(s[r], u[r]):s[r]===B?-1:u[r]===B?1:0;
      }, H):H;
    }, t.matches=function(e, n) {
      return t(e, null, null, n);
    }, t.matchesSelector=function(e, n) {
      if ((e.ownerDocument||e)!==H&&L(e), n=n.replace(de, '=\'$1\']'), w.matchesSelector&&_&&!U[n+' ']&&(!M||!M.test(n))&&(!F||!F.test(n))) {
        try {
          const r=O.call(e, n); if (r||w.disconnectedMatch||e.document&&11!==e.document.nodeType) return r;
        } catch (e) {}
      } return t(n, H, null, [e]).length>0;
    }, t.contains=function(e, t) {
      return (e.ownerDocument||e)!==H&&L(e), R(e, t);
    }, t.attr=function(e, t) {
      (e.ownerDocument||e)!==H&&L(e); const n=T.attrHandle[t.toLowerCase()]; let r=n&&J.call(T.attrHandle, t.toLowerCase())?n(e, t, !_):void 0; return void 0!==r?r:w.attributes||!_?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null;
    }, t.error=function(e) {
      throw new Error('Syntax error, unrecognized expression: '+e);
    }, t.uniqueSort=function(e) {
      let t; const n=[]; let r=0; let i=0; if (j=!w.detectDuplicates, D=!w.sortStable&&e.slice(0), e.sort(V), j) {
        for (;t=e[i++];)t===e[i]&&(r=n.push(i)); for (;r--;)e.splice(n[r], 1);
      } return D=null, e;
    }, C=t.getText=function(e) {
      let t; let n=''; let r=0; const i=e.nodeType; if (i) {
        if (1===i||9===i||11===i) {
          if ('string'==typeof e.textContent) return e.textContent; for (e=e.firstChild; e; e=e.nextSibling)n+=C(e);
        } else if (3===i||4===i) return e.nodeValue;
      } else for (;t=e[r++];)n+=C(t); return n;
    }, T=t.selectors={cacheLength: 50, createPseudo: r, match: he, attrHandle: {}, find: {}, relative: {'>': {dir: 'parentNode', first: !0}, ' ': {dir: 'parentNode'}, '+': {dir: 'previousSibling', first: !0}, '~': {dir: 'previousSibling'}}, preFilter: {ATTR: function(e) {
      return e[1]=e[1].replace(be, we), e[3]=(e[3]||e[4]||e[5]||'').replace(be, we), '~='===e[2]&&(e[3]=' '+e[3]+' '), e.slice(0, 4);
    }, CHILD: function(e) {
      return e[1]=e[1].toLowerCase(), 'nth'===e[1].slice(0, 3)?(e[3]||t.error(e[0]), e[4]=+(e[4]?e[5]+(e[6]||1):2*('even'===e[3]||'odd'===e[3])), e[5]=+(e[7]+e[8]||'odd'===e[3])):e[3]&&t.error(e[0]), e;
    }, PSEUDO: function(e) {
      let t; const n=!e[6]&&e[2]; return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||'':n&&fe.test(n)&&(t=N(n, !0))&&(t=n.indexOf(')', n.length-t)-n.length)&&(e[0]=e[0].slice(0, t), e[2]=n.slice(0, t)), e.slice(0, 3));
    }}, filter: {TAG: function(e) {
      const t=e.replace(be, we).toLowerCase(); return '*'===e?function() {
        return !0;
      }:function(e) {
        return e.nodeName&&e.nodeName.toLowerCase()===t;
      };
    }, CLASS: function(e) {
      let t=z[e+' ']; return t||(t=new RegExp('(^|'+re+')'+e+'('+re+'|$)'))&&z(e, function(e) {
        return t.test('string'==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute('class')||'');
      });
    }, ATTR: function(e, n, r) {
      return function(i) {
        let o=t.attr(i, e); return null==o?'!='===n:!n||(o+='', '='===n?o===r:'!='===n?o!==r:'^='===n?r&&0===o.indexOf(r):'*='===n?r&&o.indexOf(r)>-1:'$='===n?r&&o.slice(-r.length)===r:'~='===n?(' '+o.replace(se, ' ')+' ').indexOf(r)>-1:'|='===n&&(o===r||o.slice(0, r.length+1)===r+'-'));
      };
    }, CHILD: function(e, t, n, r, i) {
      const o='nth'!==e.slice(0, 3); const a='last'!==e.slice(-4); const s='of-type'===t; return 1===r&&0===i?function(e) {
        return !!e.parentNode;
      }:function(t, n, u) {
        let l; let c; let d; let f; let p; let h; let g=o!==a?'nextSibling':'previousSibling'; const m=t.parentNode; const v=s&&t.nodeName.toLowerCase(); const y=!u&&!s; let x=!1; if (m) {
          if (o) {
            for (;g;) {
              for (f=t; f=f[g];) if (s?f.nodeName.toLowerCase()===v:1===f.nodeType) return !1; h=g='only'===e&&!h&&'nextSibling';
            } return !0;
          } if (h=[a?m.firstChild:m.lastChild], a&&y) {
            for (f=m, d=f[P]||(f[P]={}), c=d[f.uniqueID]||(d[f.uniqueID]={}), l=c[e]||[], p=l[0]===W&&l[1], x=p&&l[2],
            f=p&&m.childNodes[p]; f=++p&&f&&f[g]||(x=p=0)||h.pop();) {
              if (1===f.nodeType&&++x&&f===t) {
                c[e]=[W, p, x]; break;
              }
            }
          } else if (y&&(f=t, d=f[P]||(f[P]={}), c=d[f.uniqueID]||(d[f.uniqueID]={}), l=c[e]||[], p=l[0]===W&&l[1], x=p), !1===x) for (;(f=++p&&f&&f[g]||(x=p=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++x||(y&&(d=f[P]||(f[P]={}), c=d[f.uniqueID]||(d[f.uniqueID]={}), c[e]=[W, x]), f!==t)););return (x-=i)===r||x%r==0&&x/r>=0;
        }
      };
    }, PSEUDO: function(e, n) {
      let i; const o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error('unsupported pseudo: '+e); return o[P]?o(n):o.length>1?(i=[e, e, '', n], T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e, t) {
        for (var r, i=o(e, n), a=i.length; a--;)r=te(e, i[a]), e[r]=!(t[r]=i[a]);
      }):function(e) {
        return o(e, 0, i);
      }):o;
    }}, pseudos: {not: r(function(e) {
      const t=[]; const n=[]; const i=k(e.replace(ue, '$1')); return i[P]?r(function(e, t, n, r) {
        for (var o, a=i(e, null, r, []), s=e.length; s--;)(o=a[s])&&(e[s]=!(t[s]=o));
      }):function(e, r, o) {
        return t[0]=e, i(t, null, o, n), t[0]=null, !n.pop();
      };
    }), has: r(function(e) {
      return function(n) {
        return t(e, n).length>0;
      };
    }), contains: r(function(e) {
      return e=e.replace(be, we), function(t) {
        return (t.textContent||t.innerText||C(t)).indexOf(e)>-1;
      };
    }), lang: r(function(e) {
      return pe.test(e||'')||t.error('unsupported lang: '+e), e=e.replace(be, we).toLowerCase(), function(t) {
        let n; do {
          if (n=_?t.lang:t.getAttribute('xml:lang')||t.getAttribute('lang')) return (n=n.toLowerCase())===e||0===n.indexOf(e+'-');
        } while ((t=t.parentNode)&&1===t.nodeType); return !1;
      };
    }), target: function(t) {
      const n=e.location&&e.location.hash; return n&&n.slice(1)===t.id;
    }, root: function(e) {
      return e===q;
    }, focus: function(e) {
      return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex);
    }, enabled: function(e) {
      return !1===e.disabled;
    }, disabled: function(e) {
      return !0===e.disabled;
    }, checked: function(e) {
      const t=e.nodeName.toLowerCase(); return 'input'===t&&!!e.checked||'option'===t&&!!e.selected;
    }, selected: function(e) {
      return e.parentNode&&e.parentNode.selectedIndex, !0===e.selected;
    }, empty: function(e) {
      for (e=e.firstChild; e; e=e.nextSibling) if (e.nodeType<6) return !1; return !0;
    }, parent: function(e) {
      return !T.pseudos.empty(e);
    }, header: function(e) {
      return me.test(e.nodeName);
    }, input: function(e) {
      return ge.test(e.nodeName);
    }, button: function(e) {
      const t=e.nodeName.toLowerCase(); return 'input'===t&&'button'===e.type||'button'===t;
    }, text: function(e) {
      let t; return 'input'===e.nodeName.toLowerCase()&&'text'===e.type&&(null==(t=e.getAttribute('type'))||'text'===t.toLowerCase());
    }, first: l(function() {
      return [0];
    }), last: l(function(e, t) {
      return [t-1];
    }), eq: l(function(e, t, n) {
      return [0>n?n+t:n];
    }), even: l(function(e, t) {
      for (let n=0; t>n; n+=2)e.push(n); return e;
    }), odd: l(function(e, t) {
      for (let n=1; t>n; n+=2)e.push(n); return e;
    }), lt: l(function(e, t, n) {
      for (let r=0>n?n+t:n; --r>=0;)e.push(r); return e;
    }), gt: l(function(e, t, n) {
      for (let r=0>n?n+t:n; ++r<t;)e.push(r); return e;
    })}}, T.pseudos.nth=T.pseudos.eq; for (b in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[b]=s(b); for (b in {submit: !0, reset: !0})T.pseudos[b]=u(b); return d.prototype=T.filters=T.pseudos, T.setFilters=new d, N=t.tokenize=function(e, n) {
      let r; let i; let o; let a; let s; let u; let l; const c=X[e+' ']; if (c) return n?0:c.slice(0); for (s=e, u=[], l=T.preFilter; s;) {
        r&&!(i=le.exec(s))||(i&&(s=s.slice(i[0].length)||s), u.push(o=[])), r=!1, (i=ce.exec(s))&&(r=i.shift(), o.push({value: r, type: i[0].replace(ue, ' ')}), s=s.slice(r.length)); for (a in T.filter)!(i=he[a].exec(s))||l[a]&&!(i=l[a](i))||(r=i.shift(), o.push({value: r, type: a, matches: i}), s=s.slice(r.length)); if (!r) break;
      } return n?s.length:s?t.error(e):X(e, u).slice(0);
    }, k=t.compile=function(e, t) {
      let n; const r=[]; const i=[]; let o=U[e+' ']; if (!o) {
        for (t||(t=N(e)), n=t.length; n--;)o=y(t[n]), o[P]?r.push(o):i.push(o); o=U(e, x(i, r)), o.selector=e;
      } return o;
    }, S=t.select=function(e, t, n, r) {
      let i; let o; let a; let s; let u; const l='function'==typeof e&&e; const d=!r&&N(e=l.selector||e); if (n=n||[], 1===d.length) {
        if (o=d[0]=d[0].slice(0), o.length>2&&'ID'===(a=o[0]).type&&w.getById&&9===t.nodeType&&_&&T.relative[o[1].type]) {
          if (!(t=(T.find.ID(a.matches[0].replace(be, we), t)||[])[0])) return n; l&&(t=t.parentNode), e=e.slice(o.shift().value.length);
        } for (i=he.needsContext.test(e)?0:o.length; i--&&(a=o[i], !T.relative[s=a.type]);) {
          if ((u=T.find[s])&&(r=u(a.matches[0].replace(be, we), ye.test(o[0].type)&&c(t.parentNode)||t))) {
            if (o.splice(i, 1), !(e=r.length&&f(o))) return Z.apply(n, r), n; break;
          }
        }
      } return (l||k(e, d))(r, t, !_, n, !t||ye.test(e)&&c(t.parentNode)||t), n;
    }, w.sortStable=P.split('').sort(V).join('')===P, w.detectDuplicates=!!j, L(), w.sortDetached=i(function(e) {
      return 1&e.compareDocumentPosition(H.createElement('div'));
    }), i(function(e) {
      return e.innerHTML='<a href=\'#\'></a>', '#'===e.firstChild.getAttribute('href');
    })||o('type|href|height|width', function(e, t, n) {
      return n?void 0:e.getAttribute(t, 'type'===t.toLowerCase()?1:2);
    }), w.attributes&&i(function(e) {
      return e.innerHTML='<input/>', e.firstChild.setAttribute('value', ''), ''===e.firstChild.getAttribute('value');
    })||o('value', function(e, t, n) {
      return n||'input'!==e.nodeName.toLowerCase()?void 0:e.defaultValue;
    }), i(function(e) {
      return null==e.getAttribute('disabled');
    })||o(ne, function(e, t, n) {
      let r; return n?void 0:!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null;
    }), t;
  }(e); he.find=xe, he.expr=xe.selectors, he.expr[':']=he.expr.pseudos, he.uniqueSort=he.unique=xe.uniqueSort, he.text=xe.getText, he.isXMLDoc=xe.isXML, he.contains=xe.contains; const be=function(e, t, n) {
    for (var r=[], i=void 0!==n; (e=e[t])&&9!==e.nodeType;) {
      if (1===e.nodeType) {
        if (i&&he(e).is(n)) break; r.push(e);
      }
    } return r;
  }; const we=function(e, t) {
    for (var n=[]; e; e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e); return n;
  }; const Te=he.expr.match.needsContext; const Ce=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/; var Ee=/^.[^:#\[\.,]*$/; he.filter=function(e, t, n) {
    const r=t[0]; return n&&(e=':not('+e+')'), 1===t.length&&1===r.nodeType?he.find.matchesSelector(r, e)?[r]:[]:he.find.matches(e, he.grep(t, function(e) {
      return 1===e.nodeType;
    }));
  }, he.fn.extend({find: function(e) {
    let t; let n=[]; const r=this; const i=r.length; if ('string'!=typeof e) {
      return this.pushStack(he(e).filter(function() {
        for (t=0; i>t; t++) if (he.contains(r[t], this)) return !0;
      }));
    } for (t=0; i>t; t++)he.find(e, r[t], n); return n=this.pushStack(i>1?he.unique(n):n), n.selector=this.selector?this.selector+' '+e:e, n;
  }, filter: function(e) {
    return this.pushStack(r(this, e||[], !1));
  }, not: function(e) {
    return this.pushStack(r(this, e||[], !0));
  }, is: function(e) {
    return !!r(this, 'string'==typeof e&&Te.test(e)?he(e):e||[], !1).length;
  }}); let Ne; const ke=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; (he.fn.init=function(e, t, n) {
    let r; let i; if (!e) return this; if (n=n||Ne, 'string'==typeof e) {
      if (!(r='<'===e.charAt(0)&&'>'===e.charAt(e.length-1)&&e.length>=3?[null, e, null]:ke.exec(e))||!r[1]&&t) return !t||t.jquery?(t||n).find(e):this.constructor(t).find(e); if (r[1]) {
        if (t=t instanceof he?t[0]:t, he.merge(this, he.parseHTML(r[1], t&&t.nodeType?t.ownerDocument||t:ie, !0)), Ce.test(r[1])&&he.isPlainObject(t)) for (r in t)he.isFunction(this[r])?this[r](t[r]):this.attr(r, t[r]); return this;
      } if ((i=ie.getElementById(r[2]))&&i.parentNode) {
        if (i.id!==r[2]) return Ne.find(e); this.length=1, this[0]=i;
      } return this.context=ie, this.selector=e, this;
    } return e.nodeType?(this.context=this[0]=e, this.length=1, this):he.isFunction(e)?void 0!==n.ready?n.ready(e):e(he):(void 0!==e.selector&&(this.selector=e.selector, this.context=e.context), he.makeArray(e, this));
  }).prototype=he.fn, Ne=he(ie); const Se=/^(?:parents|prev(?:Until|All))/; const Ae={children: !0, contents: !0, next: !0, prev: !0}; he.fn.extend({has: function(e) {
    let t; const n=he(e, this); const r=n.length; return this.filter(function() {
      for (t=0; r>t; t++) if (he.contains(this, n[t])) return !0;
    });
  }, closest: function(e, t) {
    for (var n, r=0, i=this.length, o=[], a=Te.test(e)||'string'!=typeof e?he(e, t||this.context):0; i>r; r++) {
      for (n=this[r]; n&&n!==t; n=n.parentNode) {
        if (n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&he.find.matchesSelector(n, e))) {
          o.push(n); break;
        }
      }
    } return this.pushStack(o.length>1?he.uniqueSort(o):o);
  }, index: function(e) {
    return e?'string'==typeof e?he.inArray(this[0], he(e)):he.inArray(e.jquery?e[0]:e, this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1;
  }, add: function(e, t) {
    return this.pushStack(he.uniqueSort(he.merge(this.get(), he(e, t))));
  }, addBack: function(e) {
    return this.add(null==e?this.prevObject:this.prevObject.filter(e));
  }}), he.each({parent: function(e) {
    const t=e.parentNode; return t&&11!==t.nodeType?t:null;
  }, parents: function(e) {
    return be(e, 'parentNode');
  }, parentsUntil: function(e, t, n) {
    return be(e, 'parentNode', n);
  }, next: function(e) {
    return i(e, 'nextSibling');
  }, prev: function(e) {
    return i(e, 'previousSibling');
  }, nextAll: function(e) {
    return be(e, 'nextSibling');
  }, prevAll: function(e) {
    return be(e, 'previousSibling');
  }, nextUntil: function(e, t, n) {
    return be(e, 'nextSibling', n);
  }, prevUntil: function(e, t, n) {
    return be(e, 'previousSibling', n);
  }, siblings: function(e) {
    return we((e.parentNode||{}).firstChild, e);
  }, children: function(e) {
    return we(e.firstChild);
  }, contents: function(e) {
    return he.nodeName(e, 'iframe')?e.contentDocument||e.contentWindow.document:he.merge([], e.childNodes);
  }}, function(e, t) {
    he.fn[e]=function(n, r) {
      let i=he.map(this, t, n); return 'Until'!==e.slice(-5)&&(r=n), r&&'string'==typeof r&&(i=he.filter(r, i)), this.length>1&&(Ae[e]||(i=he.uniqueSort(i)), Se.test(e)&&(i=i.reverse())), this.pushStack(i);
    };
  }); var De=/\S+/g; he.Callbacks=function(e) {
    e='string'==typeof e?o(e):he.extend({}, e); let t; let n; let r; let i; let a=[]; let s=[]; let u=-1; const l=function() {
      for (i=e.once, r=t=!0; s.length; u=-1) for (n=s.shift(); ++u<a.length;)!1===a[u].apply(n[0], n[1])&&e.stopOnFalse&&(u=a.length, n=!1); e.memory||(n=!1), t=!1, i&&(a=n?[]:'');
    }; var c={add: function() {
      return a&&(n&&!t&&(u=a.length-1, s.push(n)), function t(n) {
        he.each(n, function(n, r) {
he.isFunction(r)?e.unique&&c.has(r)||a.push(r):r&&r.length&&'string'!==he.type(r)&&t(r);
        });
      }(arguments), n&&!t&&l()), this;
    }, remove: function() {
      return he.each(arguments, function(e, t) {
        for (var n; (n=he.inArray(t, a, n))>-1;)a.splice(n, 1), u>=n&&u--;
      }), this;
    }, has: function(e) {
      return e?he.inArray(e, a)>-1:a.length>0;
    }, empty: function() {
      return a&&(a=[]), this;
    }, disable: function() {
      return i=s=[], a=n='', this;
    }, disabled: function() {
      return !a;
    }, lock: function() {
      return i=!0, n||c.disable(), this;
    }, locked: function() {
      return !!i;
    }, fireWith: function(e, n) {
      return i||(n=n||[], n=[e, n.slice?n.slice():n], s.push(n), t||l()), this;
    }, fire: function() {
      return c.fireWith(this, arguments), this;
    }, fired: function() {
      return !!r;
    }}; return c;
  }, he.extend({Deferred: function(e) {
    const t=[['resolve', 'done', he.Callbacks('once memory'), 'resolved'], ['reject', 'fail', he.Callbacks('once memory'), 'rejected'], ['notify', 'progress', he.Callbacks('memory')]]; let n='pending'; var r={state: function() {
      return n;
    }, always: function() {
      return i.done(arguments).fail(arguments), this;
    }, then: function() {
      let e=arguments; return he.Deferred(function(n) {
        he.each(t, function(t, o) {
          const a=he.isFunction(e[t])&&e[t]; i[o[1]](function() {
            const e=a&&a.apply(this, arguments); e&&he.isFunction(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[o[0]+'With'](this===r?n.promise():this, a?[e]:arguments);
          });
        }), e=null;
      }).promise();
    }, promise: function(e) {
      return null!=e?he.extend(e, r):r;
    }}; var i={}; return r.pipe=r.then, he.each(t, function(e, o) {
      const a=o[2]; const s=o[3]; r[o[1]]=a.add, s&&a.add(function() {
        n=s;
      }, t[1^e][2].disable, t[2][2].lock), i[o[0]]=function() {
        return i[o[0]+'With'](this===i?r:this, arguments), this;
      }, i[o[0]+'With']=a.fireWith;
    }), r.promise(i), e&&e.call(i, i), i;
  }, when: function(e) {
    let t=0; const n=oe.call(arguments); const r=n.length; let i=1!==r||e&&he.isFunction(e.promise)?r:0; const o=1===i?e:he.Deferred(); const a=function(e, t, n) {
      return function(r) {
        t[e]=this, n[e]=arguments.length>1?oe.call(arguments):r, n===s?o.notifyWith(t, n):--i||o.resolveWith(t, n);
      };
    }; let s; let u; let l; if (r>1) for (s=new Array(r), u=new Array(r), l=new Array(r); r>t; t++)n[t]&&he.isFunction(n[t].promise)?n[t].promise().progress(a(t, u, s)).done(a(t, l, n)).fail(o.reject):--i; return i||o.resolveWith(l, n), o.promise();
  }}); let je; he.fn.ready=function(e) {
    return he.ready.promise().done(e), this;
  }, he.extend({isReady: !1, readyWait: 1, holdReady: function(e) {
e?he.readyWait++:he.ready(!0);
  }, ready: function(e) {
    (!0===e?--he.readyWait:he.isReady)||(he.isReady=!0, !0!==e&&--he.readyWait>0||(je.resolveWith(ie, [he]), he.fn.triggerHandler&&(he(ie).triggerHandler('ready'), he(ie).off('ready'))));
  }}), he.ready.promise=function(t) {
    if (!je) {
      if (je=he.Deferred(), 'complete'===ie.readyState||'loading'!==ie.readyState&&!ie.documentElement.doScroll)e.setTimeout(he.ready); else if (ie.addEventListener)ie.addEventListener('DOMContentLoaded', s), e.addEventListener('load', s); else {
        ie.attachEvent('onreadystatechange', s), e.attachEvent('onload', s); let n=!1; try {
          n=null==e.frameElement&&ie.documentElement;
        } catch (e) {}n&&n.doScroll&&function t() {
          if (!he.isReady) {
            try {
              n.doScroll('left');
            } catch (n) {
              return e.setTimeout(t, 50);
            }a(), he.ready();
          }
        }();
      }
    } return je.promise(t);
  }, he.ready.promise(); let Le; for (Le in he(fe)) break; fe.ownFirst='0'===Le, fe.inlineBlockNeedsLayout=!1, he(function() {
    let e; let t; let n; let r; (n=ie.getElementsByTagName('body')[0])&&n.style&&(t=ie.createElement('div'), r=ie.createElement('div'), r.style.cssText='position:absolute;border:0;width:0;height:0;top:0;left:-9999px', n.appendChild(r).appendChild(t), void 0!==t.style.zoom&&(t.style.cssText='display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1', fe.inlineBlockNeedsLayout=e=3===t.offsetWidth, e&&(n.style.zoom=1)), n.removeChild(r));
  }), function() {
    let e=ie.createElement('div'); fe.deleteExpando=!0; try {
      delete e.test;
    } catch (e) {
      fe.deleteExpando=!1;
    }e=null;
  }(); var He=function(e) {
    const t=he.noData[(e.nodeName+' ').toLowerCase()]; const n=+e.nodeType||1; return (1===n||9===n)&&(!t||!0!==t&&e.getAttribute('classid')===t);
  }; var qe=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/; var _e=/([A-Z])/g; he.extend({cache: {}, noData: {'applet ': !0, 'embed ': !0, 'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'}, hasData: function(e) {
    return !!(e=e.nodeType?he.cache[e[he.expando]]:e[he.expando])&&!l(e);
  }, data: function(e, t, n) {
    return c(e, t, n);
  }, removeData: function(e, t) {
    return d(e, t);
  }, _data: function(e, t, n) {
    return c(e, t, n, !0);
  }, _removeData: function(e, t) {
    return d(e, t, !0);
  }}), he.fn.extend({data: function(e, t) {
    let n; let r; let i; const o=this[0]; const a=o&&o.attributes; if (void 0===e) {
      if (this.length&&(i=he.data(o), 1===o.nodeType&&!he._data(o, 'parsedAttrs'))) {
        for (n=a.length; n--;)a[n]&&(r=a[n].name, 0===r.indexOf('data-')&&(r=he.camelCase(r.slice(5)), u(o, r, i[r]))); he._data(o, 'parsedAttrs', !0);
      } return i;
    } return 'object'==typeof e?this.each(function() {
      he.data(this, e);
    }):arguments.length>1?this.each(function() {
      he.data(this, e, t);
    }):o?u(o, e, he.data(o, e)):void 0;
  }, removeData: function(e) {
    return this.each(function() {
      he.removeData(this, e);
    });
  }}), he.extend({queue: function(e, t, n) {
    let r; return e?(t=(t||'fx')+'queue', r=he._data(e, t), n&&(!r||he.isArray(n)?r=he._data(e, t, he.makeArray(n)):r.push(n)), r||[]):void 0;
  }, dequeue: function(e, t) {
    t=t||'fx'; const n=he.queue(e, t); let r=n.length; let i=n.shift(); const o=he._queueHooks(e, t); const a=function() {
      he.dequeue(e, t);
    }; 'inprogress'===i&&(i=n.shift(), r--), i&&('fx'===t&&n.unshift('inprogress'), delete o.stop, i.call(e, a, o)), !r&&o&&o.empty.fire();
  }, _queueHooks: function(e, t) {
    const n=t+'queueHooks'; return he._data(e, n)||he._data(e, n, {empty: he.Callbacks('once memory').add(function() {
      he._removeData(e, t+'queue'), he._removeData(e, n);
    })});
  }}), he.fn.extend({queue: function(e, t) {
    let n=2; return 'string'!=typeof e&&(t=e, e='fx', n--), arguments.length<n?he.queue(this[0], e):void 0===t?this:this.each(function() {
      const n=he.queue(this, e, t); he._queueHooks(this, e), 'fx'===e&&'inprogress'!==n[0]&&he.dequeue(this, e);
    });
  }, dequeue: function(e) {
    return this.each(function() {
      he.dequeue(this, e);
    });
  }, clearQueue: function(e) {
    return this.queue(e||'fx', []);
  }, promise: function(e, t) {
    let n; let r=1; const i=he.Deferred(); const o=this; let a=this.length; const s=function() {
      --r||i.resolveWith(o, [o]);
    }; for ('string'!=typeof e&&(t=e, e=void 0), e=e||'fx'; a--;)(n=he._data(o[a], e+'queueHooks'))&&n.empty&&(r++, n.empty.add(s)); return s(), i.promise(t);
  }}), function() {
    let e; fe.shrinkWrapBlocks=function() {
      if (null!=e) return e; e=!1; let t; let n; let r; return n=ie.getElementsByTagName('body')[0], n&&n.style?(t=ie.createElement('div'), r=ie.createElement('div'), r.style.cssText='position:absolute;border:0;width:0;height:0;top:0;left:-9999px', n.appendChild(r).appendChild(t), void 0!==t.style.zoom&&(t.style.cssText='-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1', t.appendChild(ie.createElement('div')).style.width='5px', e=3!==t.offsetWidth), n.removeChild(r), e):void 0;
    };
  }(); const Fe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source; var Me=new RegExp('^(?:([+-])=|)('+Fe+')([a-z%]*)$', 'i'); var Oe=['Top', 'Right', 'Bottom', 'Left']; var Re=function(e, t) {
    return e=t||e, 'none'===he.css(e, 'display')||!he.contains(e.ownerDocument, e);
  }; var Pe=function(e, t, n, r, i, o, a) {
    let s=0; const u=e.length; let l=null==n; if ('object'===he.type(n)) {
      i=!0; for (s in n)Pe(e, t, s, n[s], !0, o, a);
    } else if (void 0!==r&&(i=!0, he.isFunction(r)||(a=!0), l&&(a?(t.call(e, r), t=null):(l=t, t=function(e, t, n) {
      return l.call(he(e), n);
    })), t)) for (;u>s; s++)t(e[s], n, a?r:r.call(e[s], s, t(e[s], n))); return i?e:l?t.call(e):u?t(e[0], n):o;
  }; var Be=/^(?:checkbox|radio)$/i; var $=/<([\w:-]+)/; var We=/^$|\/(?:java|ecma)script/i; var Ie=/^\s+/; var $e='abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video'; !function() {
    const e=ie.createElement('div'); const t=ie.createDocumentFragment(); let n=ie.createElement('input'); e.innerHTML='  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', fe.leadingWhitespace=3===e.firstChild.nodeType, fe.tbody=!e.getElementsByTagName('tbody').length, fe.htmlSerialize=!!e.getElementsByTagName('link').length, fe.html5Clone='<:nav></:nav>'!==ie.createElement('nav').cloneNode(!0).outerHTML, n.type='checkbox', n.checked=!0, t.appendChild(n), fe.appendChecked=n.checked, e.innerHTML='<textarea>x</textarea>', fe.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n=ie.createElement('input'), n.setAttribute('type', 'radio'), n.setAttribute('checked', 'checked'), n.setAttribute('name', 't'), e.appendChild(n), fe.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked, fe.noCloneEvent=!!e.addEventListener, e[he.expando]=1, fe.attributes=!e.getAttribute(he.expando);
  }(); var ze={option: [1, '<select multiple=\'multiple\'>', '</select>'], legend: [1, '<fieldset>', '</fieldset>'], area: [1, '<map>', '</map>'], param: [1, '<object>', '</object>'], thead: [1, '<table>', '</table>'], tr: [2, '<table><tbody>', '</tbody></table>'], col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'], td: [3, '<table><tbody><tr>', '</tr></tbody></table>'], _default: fe.htmlSerialize?[0, '', '']:[1, 'X<div>', '</div>']}; ze.optgroup=ze.option, ze.tbody=ze.tfoot=ze.colgroup=ze.caption=ze.thead, ze.th=ze.td; var Xe=/<|&#?\w+;/; var Ue=/<tbody/i; !function() {
    let t; let n; let r=ie.createElement('div'); for (t in {submit: !0, change: !0, focusin: !0})n='on'+t, (fe[t]=n in e)||(r.setAttribute(n, 't'), fe[t]=!1===r.attributes[n].expando); r=null;
  }(); const Ve=/^(?:input|select|textarea)$/i; const Ye=/^key/; const Je=/^(?:mouse|pointer|contextmenu|drag|drop)|click/; const Ge=/^(?:focusinfocus|focusoutblur)$/; const Qe=/^([^.]*)(?:\.(.+)|)/; he.event={global: {}, add: function(e, t, n, r, i) {
    let o; let a; let s; let u; let l; let c; let d; let f; let p; let h; let g; const m=he._data(e); if (m) {
      for (n.handler&&(u=n, n=u.handler, i=u.selector), n.guid||(n.guid=he.guid++), (a=m.events)||(a=m.events={}), (c=m.handle)||(c=m.handle=function(e) {
        return void 0===he||e&&he.event.triggered===e.type?void 0:he.event.dispatch.apply(c.elem, arguments);
      }, c.elem=e), t=(t||'').match(De)||[''], s=t.length; s--;)o=Qe.exec(t[s])||[], p=g=o[1], h=(o[2]||'').split('.').sort(), p&&(l=he.event.special[p]||{}, p=(i?l.delegateType:l.bindType)||p, l=he.event.special[p]||{}, d=he.extend({type: p, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i&&he.expr.match.needsContext.test(i), namespace: h.join('.')}, u), (f=a[p])||(f=a[p]=[], f.delegateCount=0, l.setup&&!1!==l.setup.call(e, r, h, c)||(e.addEventListener?e.addEventListener(p, c, !1):e.attachEvent&&e.attachEvent('on'+p, c))), l.add&&(l.add.call(e, d), d.handler.guid||(d.handler.guid=n.guid)), i?f.splice(f.delegateCount++, 0, d):f.push(d), he.event.global[p]=!0); e=null;
    }
  }, remove: function(e, t, n, r, i) {
    let o; let a; let s; let u; let l; let c; let d; let f; let p; let h; let g; const m=he.hasData(e)&&he._data(e); if (m&&(c=m.events)) {
      for (t=(t||'').match(De)||[''], l=t.length; l--;) {
        if (s=Qe.exec(t[l])||[], p=g=s[1], h=(s[2]||'').split('.').sort(), p) {
          for (d=he.event.special[p]||{}, p=(r?d.delegateType:d.bindType)||p, f=c[p]||[], s=s[2]&&new RegExp('(^|\\.)'+h.join('\\.(?:.*\\.|)')+'(\\.|$)'), u=o=f.length; o--;)a=f[o], !i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&('**'!==r||!a.selector)||(f.splice(o, 1), a.selector&&f.delegateCount--, d.remove&&d.remove.call(e, a)); u&&!f.length&&(d.teardown&&!1!==d.teardown.call(e, h, m.handle)||he.removeEvent(e, p, m.handle), delete c[p]);
        } else for (p in c)he.event.remove(e, p+t[l], n, r, !0);
      } he.isEmptyObject(c)&&(delete m.handle, he._removeData(e, 'events'));
    }
  }, trigger: function(t, n, r, i) {
    let o; let a; let s; let u; let l; let c; let d; const f=[r||ie]; let p=de.call(t, 'type')?t.type:t; let h=de.call(t, 'namespace')?t.namespace.split('.'):[]; if (s=c=r=r||ie, 3!==r.nodeType&&8!==r.nodeType&&!Ge.test(p+he.event.triggered)&&(p.indexOf('.')>-1&&(h=p.split('.'), p=h.shift(), h.sort()), a=p.indexOf(':')<0&&'on'+p, t=t[he.expando]?t:new he.Event(p, 'object'==typeof t&&t), t.isTrigger=i?2:3, t.namespace=h.join('.'), t.rnamespace=t.namespace?new RegExp('(^|\\.)'+h.join('\\.(?:.*\\.|)')+'(\\.|$)'):null, t.result=void 0, t.target||(t.target=r), n=null==n?[t]:he.makeArray(n, [t]), l=he.event.special[p]||{}, i||!l.trigger||!1!==l.trigger.apply(r, n))) {
      if (!i&&!l.noBubble&&!he.isWindow(r)) {
        for (u=l.delegateType||p, Ge.test(u+p)||(s=s.parentNode); s; s=s.parentNode)f.push(s), c=s; c===(r.ownerDocument||ie)&&f.push(c.defaultView||c.parentWindow||e);
      } for (d=0; (s=f[d++])&&!t.isPropagationStopped();)t.type=d>1?u:l.bindType||p, o=(he._data(s, 'events')||{})[t.type]&&he._data(s, 'handle'), o&&o.apply(s, n), (o=a&&s[a])&&o.apply&&He(s)&&(t.result=o.apply(s, n), !1===t.result&&t.preventDefault()); if (t.type=p, !i&&!t.isDefaultPrevented()&&(!l._default||!1===l._default.apply(f.pop(), n))&&He(r)&&a&&r[p]&&!he.isWindow(r)) {
        c=r[a], c&&(r[a]=null), he.event.triggered=p; try {
          r[p]();
        } catch (e) {}he.event.triggered=void 0, c&&(r[a]=c);
      } return t.result;
    }
  }, dispatch: function(e) {
    e=he.event.fix(e); let t; let n; let r; let i; let o; let a=[]; const s=oe.call(arguments); const u=(he._data(this, 'events')||{})[e.type]||[]; const l=he.event.special[e.type]||{}; if (s[0]=e, e.delegateTarget=this, !l.preDispatch||!1!==l.preDispatch.call(this, e)) {
      for (a=he.event.handlers.call(this, e, u), t=0; (i=a[t++])&&!e.isPropagationStopped();) for (e.currentTarget=i.elem, n=0; (o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)e.rnamespace&&!e.rnamespace.test(o.namespace)||(e.handleObj=o, e.data=o.data, void 0!==(r=((he.event.special[o.origType]||{}).handle||o.handler).apply(i.elem, s))&&!1===(e.result=r)&&(e.preventDefault(), e.stopPropagation())); return l.postDispatch&&l.postDispatch.call(this, e), e.result;
    }
  }, handlers: function(e, t) {
    let n; let r; let i; let o; const a=[]; const s=t.delegateCount; let u=e.target; if (s&&u.nodeType&&('click'!==e.type||isNaN(e.button)||e.button<1)) {
      for (;u!=this; u=u.parentNode||this) {
        if (1===u.nodeType&&(!0!==u.disabled||'click'!==e.type)) {
          for (r=[], n=0; s>n; n++)o=t[n], i=o.selector+' ', void 0===r[i]&&(r[i]=o.needsContext?he(i, this).index(u)>-1:he.find(i, this, null, [u]).length), r[i]&&r.push(o); r.length&&a.push({elem: u, handlers: r});
        }
      }
    } return s<t.length&&a.push({elem: this, handlers: t.slice(s)}), a;
  }, fix: function(e) {
    if (e[he.expando]) return e; let t; let n; let r; const i=e.type; const o=e; let a=this.fixHooks[i]; for (a||(this.fixHooks[i]=a=Je.test(i)?this.mouseHooks:Ye.test(i)?this.keyHooks:{}), r=a.props?this.props.concat(a.props):this.props, e=new he.Event(o), t=r.length; t--;)n=r[t], e[n]=o[n]; return e.target||(e.target=o.srcElement||ie), 3===e.target.nodeType&&(e.target=e.target.parentNode), e.metaKey=!!e.metaKey, a.filter?a.filter(e, o):e;
  }, props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '), fixHooks: {}, keyHooks: {props: 'char charCode key keyCode'.split(' '), filter: function(e, t) {
    return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode), e;
  }}, mouseHooks: {props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '), filter: function(e, t) {
    let n; let r; let i; const o=t.button; const a=t.fromElement; return null==e.pageX&&null!=t.clientX&&(r=e.target.ownerDocument||ie, i=r.documentElement, n=r.body, e.pageX=t.clientX+(i&&i.scrollLeft||n&&n.scrollLeft||0)-(i&&i.clientLeft||n&&n.clientLeft||0), e.pageY=t.clientY+(i&&i.scrollTop||n&&n.scrollTop||0)-(i&&i.clientTop||n&&n.clientTop||0)), !e.relatedTarget&&a&&(e.relatedTarget=a===e.target?t.toElement:a), e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0), e;
  }}, special: {load: {noBubble: !0}, focus: {trigger: function() {
    if (this!==b()&&this.focus) {
      try {
        return this.focus(), !1;
      } catch (e) {}
    }
  }, delegateType: 'focusin'}, blur: {trigger: function() {
    return this===b()&&this.blur?(this.blur(), !1):void 0;
  }, delegateType: 'focusout'}, click: {trigger: function() {
    return he.nodeName(this, 'input')&&'checkbox'===this.type&&this.click?(this.click(), !1):void 0;
  }, _default: function(e) {
    return he.nodeName(e.target, 'a');
  }}, beforeunload: {postDispatch: function(e) {
    void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result);
  }}}, simulate: function(e, t, n) {
    const r=he.extend(new he.Event, n, {type: e, isSimulated: !0}); he.event.trigger(r, null, t), r.isDefaultPrevented()&&n.preventDefault();
  }}, he.removeEvent=ie.removeEventListener?function(e, t, n) {
    e.removeEventListener&&e.removeEventListener(t, n);
  }:function(e, t, n) {
    const r='on'+t; e.detachEvent&&(void 0===e[r]&&(e[r]=null), e.detachEvent(r, n));
  }, he.Event=function(e, t) {
    return this instanceof he.Event?(e&&e.type?(this.originalEvent=e, this.type=e.type, this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?y:x):this.type=e, t&&he.extend(this, t), this.timeStamp=e&&e.timeStamp||he.now(), void(this[he.expando]=!0)):new he.Event(e, t);
  }, he.Event.prototype={constructor: he.Event, isDefaultPrevented: x, isPropagationStopped: x, isImmediatePropagationStopped: x, preventDefault: function() {
    const e=this.originalEvent; this.isDefaultPrevented=y, e&&(e.preventDefault?e.preventDefault():e.returnValue=!1);
  }, stopPropagation: function() {
    const e=this.originalEvent; this.isPropagationStopped=y, e&&!this.isSimulated&&(e.stopPropagation&&e.stopPropagation(), e.cancelBubble=!0);
  }, stopImmediatePropagation: function() {
    const e=this.originalEvent; this.isImmediatePropagationStopped=y, e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(), this.stopPropagation();
  }}, he.each({mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout'}, function(e, t) {
    he.event.special[e]={delegateType: t, bindType: t, handle: function(e) {
      let n; const r=this; const i=e.relatedTarget; const o=e.handleObj; return i&&(i===r||he.contains(r, i))||(e.type=o.origType, n=o.handler.apply(this, arguments), e.type=t), n;
    }};
  }), fe.submit||(he.event.special.submit={setup: function() {
    return !he.nodeName(this, 'form')&&void he.event.add(this, 'click._submit keypress._submit', function(e) {
      const t=e.target; const n=he.nodeName(t, 'input')||he.nodeName(t, 'button')?he.prop(t, 'form'):void 0; n&&!he._data(n, 'submit')&&(he.event.add(n, 'submit._submit', function(e) {
        e._submitBubble=!0;
      }), he._data(n, 'submit', !0));
    });
  }, postDispatch: function(e) {
    e._submitBubble&&(delete e._submitBubble, this.parentNode&&!e.isTrigger&&he.event.simulate('submit', this.parentNode, e));
  }, teardown: function() {
    return !he.nodeName(this, 'form')&&void he.event.remove(this, '._submit');
  }}), fe.change||(he.event.special.change={setup: function() {
    return Ve.test(this.nodeName)?('checkbox'!==this.type&&'radio'!==this.type||(he.event.add(this, 'propertychange._change', function(e) {
      'checked'===e.originalEvent.propertyName&&(this._justChanged=!0);
    }), he.event.add(this, 'click._change', function(e) {
      this._justChanged&&!e.isTrigger&&(this._justChanged=!1), he.event.simulate('change', this, e);
    })), !1):void he.event.add(this, 'beforeactivate._change', function(e) {
      const t=e.target; Ve.test(t.nodeName)&&!he._data(t, 'change')&&(he.event.add(t, 'change._change', function(e) {
        !this.parentNode||e.isSimulated||e.isTrigger||he.event.simulate('change', this.parentNode, e);
      }), he._data(t, 'change', !0));
    });
  }, handle: function(e) {
    const t=e.target; return this!==t||e.isSimulated||e.isTrigger||'radio'!==t.type&&'checkbox'!==t.type?e.handleObj.handler.apply(this, arguments):void 0;
  }, teardown: function() {
    return he.event.remove(this, '._change'), !Ve.test(this.nodeName);
  }}), fe.focusin||he.each({focus: 'focusin', blur: 'focusout'}, function(e, t) {
    const n=function(e) {
      he.event.simulate(t, e.target, he.event.fix(e));
    }; he.event.special[t]={setup: function() {
      const r=this.ownerDocument||this; const i=he._data(r, t); i||r.addEventListener(e, n, !0), he._data(r, t, (i||0)+1);
    }, teardown: function() {
      const r=this.ownerDocument||this; const i=he._data(r, t)-1; i?he._data(r, t, i):(r.removeEventListener(e, n, !0), he._removeData(r, t));
    }};
  }), he.fn.extend({on: function(e, t, n, r) {
    return w(this, e, t, n, r);
  }, one: function(e, t, n, r) {
    return w(this, e, t, n, r, 1);
  }, off: function(e, t, n) {
    let r; let i; if (e&&e.preventDefault&&e.handleObj) return r=e.handleObj, he(e.delegateTarget).off(r.namespace?r.origType+'.'+r.namespace:r.origType, r.selector, r.handler), this; if ('object'==typeof e) {
      for (i in e) this.off(i, t, e[i]); return this;
    } return !1!==t&&'function'!=typeof t||(n=t, t=void 0), !1===n&&(n=x), this.each(function() {
      he.event.remove(this, e, n, t);
    });
  }, trigger: function(e, t) {
    return this.each(function() {
      he.event.trigger(e, t, this);
    });
  }, triggerHandler: function(e, t) {
    const n=this[0]; return n?he.event.trigger(e, t, n, !0):void 0;
  }}); const Ke=/ jQuery\d+="(?:null|\d+)"/g; const Ze=new RegExp('<(?:'+$e+')[\\s/>]', 'i'); const et=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi; const tt=/<script|<style|<link/i; var nt=/checked\s*(?:[^=]|=\s*.checked.)/i; var rt=/^true\/(.*)/; var it=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; const ot=p(ie); const at=ot.appendChild(ie.createElement('div')); he.extend({htmlPrefilter: function(e) {
    return e.replace(et, '<$1></$2>');
  }, clone: function(e, t, n) {
    let r; let i; let o; let a; let s; const u=he.contains(e.ownerDocument, e); if (fe.html5Clone||he.isXMLDoc(e)||!Ze.test('<'+e.nodeName+'>')?o=e.cloneNode(!0):(at.innerHTML=e.outerHTML, at.removeChild(o=at.firstChild)), !(fe.noCloneEvent&&fe.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||he.isXMLDoc(e))) for (r=h(o), s=h(e), a=0; null!=(i=s[a]); ++a)r[a]&&k(i, r[a]); if (t) if (n) for (s=s||h(e), r=r||h(o), a=0; null!=(i=s[a]); a++)N(i, r[a]); else N(e, o); return r=h(o, 'script'), r.length>0&&g(r, !u&&h(e, 'script')), r=s=i=null, o;
  }, cleanData: function(e, t) {
    for (var n, r, i, o, a=0, s=he.expando, u=he.cache, l=fe.attributes, c=he.event.special; null!=(n=e[a]); a++) {
      if ((t||He(n))&&(i=n[s], o=i&&u[i])) {
        if (o.events) for (r in o.events)c[r]?he.event.remove(n, r):he.removeEvent(n, r, o.handle); u[i]&&(delete u[i], l||void 0===n.removeAttribute?n[s]=void 0:n.removeAttribute(s), re.push(i));
      }
    }
  }}), he.fn.extend({domManip: S, detach: function(e) {
    return A(this, e, !0);
  }, remove: function(e) {
    return A(this, e);
  }, text: function(e) {
    return Pe(this, function(e) {
      return void 0===e?he.text(this):this.empty().append((this[0]&&this[0].ownerDocument||ie).createTextNode(e));
    }, null, e, arguments.length);
  }, append: function() {
    return S(this, arguments, function(e) {
      if (1===this.nodeType||11===this.nodeType||9===this.nodeType) {
        T(this, e).appendChild(e);
      }
    });
  }, prepend: function() {
    return S(this, arguments, function(e) {
      if (1===this.nodeType||11===this.nodeType||9===this.nodeType) {
        const t=T(this, e); t.insertBefore(e, t.firstChild);
      }
    });
  }, before: function() {
    return S(this, arguments, function(e) {
      this.parentNode&&this.parentNode.insertBefore(e, this);
    });
  }, after: function() {
    return S(this, arguments, function(e) {
      this.parentNode&&this.parentNode.insertBefore(e, this.nextSibling);
    });
  }, empty: function() {
    for (var e, t=0; null!=(e=this[t]); t++) {
      for (1===e.nodeType&&he.cleanData(h(e, !1)); e.firstChild;)e.removeChild(e.firstChild); e.options&&he.nodeName(e, 'select')&&(e.options.length=0);
    } return this;
  }, clone: function(e, t) {
    return e=null!=e&&e, t=null==t?e:t, this.map(function() {
      return he.clone(this, e, t);
    });
  }, html: function(e) {
    return Pe(this, function(e) {
      let t=this[0]||{}; let n=0; const r=this.length; if (void 0===e) return 1===t.nodeType?t.innerHTML.replace(Ke, ''):void 0; if ('string'==typeof e&&!tt.test(e)&&(fe.htmlSerialize||!Ze.test(e))&&(fe.leadingWhitespace||!Ie.test(e))&&!ze[($.exec(e)||['', ''])[1].toLowerCase()]) {
        e=he.htmlPrefilter(e); try {
          for (;r>n; n++)t=this[n]||{}, 1===t.nodeType&&(he.cleanData(h(t, !1)), t.innerHTML=e); t=0;
        } catch (e) {}
      }t&&this.empty().append(e);
    }, null, e, arguments.length);
  }, replaceWith: function() {
    const e=[]; return S(this, arguments, function(t) {
      const n=this.parentNode; he.inArray(this, e)<0&&(he.cleanData(h(this)), n&&n.replaceChild(t, this));
    }, e);
  }}), he.each({appendTo: 'append',
    prependTo: 'prepend', insertBefore: 'before', insertAfter: 'after', replaceAll: 'replaceWith'}, function(e, t) {
    he.fn[e]=function(e) {
      for (var n, r=0, i=[], o=he(e), a=o.length-1; a>=r; r++)n=r===a?this:this.clone(!0), he(o[r])[t](n), se.apply(i, n.get()); return this.pushStack(i);
    };
  }); let st; var ut={HTML: 'block', BODY: 'block'}; const lt=/^margin/; var ct=new RegExp('^('+Fe+')(?!px)[a-z%]+$', 'i'); const dt=function(e, t, n, r) {
    let i; let o; const a={}; for (o in t)a[o]=e.style[o], e.style[o]=t[o]; i=n.apply(e, r||[]); for (o in t)e.style[o]=a[o]; return i;
  }; const ft=ie.documentElement; !function() {
    function t() {
      let t; let c; const d=ie.documentElement; d.appendChild(u), l.style.cssText='-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%', n=i=s=!1, r=a=!0, e.getComputedStyle&&(c=e.getComputedStyle(l), n='1%'!==(c||{}).top, s='2px'===(c||{}).marginLeft, i='4px'===(c||{width: '4px'}).width, l.style.marginRight='50%', r='4px'===(c||{marginRight: '4px'}).marginRight, t=l.appendChild(ie.createElement('div')), t.style.cssText=l.style.cssText='-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', t.style.marginRight=t.style.width='0', l.style.width='1px', a=!parseFloat((e.getComputedStyle(t)||{}).marginRight), l.removeChild(t)), l.style.display='none', o=0===l.getClientRects().length, o&&(l.style.display='', l.innerHTML='<table><tr><td></td><td>t</td></tr></table>', l.childNodes[0].style.borderCollapse='separate', t=l.getElementsByTagName('td'), t[0].style.cssText='margin:0;border:0;padding:0;display:none', (o=0===t[0].offsetHeight)&&(t[0].style.display='', t[1].style.display='none', o=0===t[0].offsetHeight)), d.removeChild(u);
    } let n; let r; let i; let o; let a; let s; var u=ie.createElement('div'); var l=ie.createElement('div'); l.style&&(l.style.cssText='float:left;opacity:.5', fe.opacity='0.5'===l.style.opacity, fe.cssFloat=!!l.style.cssFloat, l.style.backgroundClip='content-box', l.cloneNode(!0).style.backgroundClip='', fe.clearCloneStyle='content-box'===l.style.backgroundClip, u=ie.createElement('div'), u.style.cssText='border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute', l.innerHTML='', u.appendChild(l), fe.boxSizing=''===l.style.boxSizing||''===l.style.MozBoxSizing||''===l.style.WebkitBoxSizing, he.extend(fe, {reliableHiddenOffsets: function() {
      return null==n&&t(), o;
    }, boxSizingReliable: function() {
      return null==n&&t(), i;
    }, pixelMarginRight: function() {
      return null==n&&t(), r;
    }, pixelPosition: function() {
      return null==n&&t(), n;
    }, reliableMarginRight: function() {
      return null==n&&t(), a;
    }, reliableMarginLeft: function() {
      return null==n&&t(), s;
    }}));
  }(); let pt; let ht; const gt=/^(top|right|bottom|left)$/; e.getComputedStyle?(pt=function(t) {
    let n=t.ownerDocument.defaultView; return n&&n.opener||(n=e), n.getComputedStyle(t);
  }, ht=function(e, t, n) {
    let r; let i; let o; let a; const s=e.style; return n=n||pt(e), a=n?n.getPropertyValue(t)||n[t]:void 0, ''!==a&&void 0!==a||he.contains(e.ownerDocument, e)||(a=he.style(e, t)), n&&!fe.pixelMarginRight()&&ct.test(a)&&lt.test(t)&&(r=s.width, i=s.minWidth, o=s.maxWidth, s.minWidth=s.maxWidth=s.width=a, a=n.width, s.width=r, s.minWidth=i, s.maxWidth=o), void 0===a?a:a+'';
  }):ft.currentStyle&&(pt=function(e) {
    return e.currentStyle;
  }, ht=function(e, t, n) {
    let r; let i; let o; let a; const s=e.style; return n=n||pt(e), a=n?n[t]:void 0, null==a&&s&&s[t]&&(a=s[t]), ct.test(a)&&!gt.test(t)&&(r=s.left, i=e.runtimeStyle, o=i&&i.left, o&&(i.left=e.currentStyle.left), s.left='fontSize'===t?'1em':a, a=s.pixelLeft+'px', s.left=r, o&&(i.left=o)), void 0===a?a:a+''||'auto';
  }); const mt=/alpha\([^)]*\)/i; const vt=/opacity\s*=\s*([^)]*)/i; const yt=/^(none|table(?!-c[ea]).+)/; var xt=new RegExp('^('+Fe+')(.*)$', 'i'); const bt={position: 'absolute', visibility: 'hidden', display: 'block'}; const wt={letterSpacing: '0', fontWeight: '400'}; var Tt=['Webkit', 'O', 'Moz', 'ms']; var Ct=ie.createElement('div').style; he.extend({cssHooks: {opacity: {get: function(e, t) {
    if (t) {
      const n=ht(e, 'opacity'); return ''===n?'1':n;
    }
  }}}, cssNumber: {animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {float: fe.cssFloat?'cssFloat':'styleFloat'}, style: function(e, t, n, r) {
    if (e&&3!==e.nodeType&&8!==e.nodeType&&e.style) {
      let i; let o; let a; const s=he.camelCase(t); const u=e.style; if (t=he.cssProps[s]||(he.cssProps[s]=H(s)||s), a=he.cssHooks[t]||he.cssHooks[s], void 0===n) return a&&'get'in a&&void 0!==(i=a.get(e, !1, r))?i:u[t]; if (o=typeof n, 'string'===o&&(i=Me.exec(n))&&i[1]&&(n=f(e, t, i), o='number'), null!=n&&n===n&&('number'===o&&(n+=i&&i[3]||(he.cssNumber[s]?'':'px')), fe.clearCloneStyle||''!==n||0!==t.indexOf('background')||(u[t]='inherit'), !(a&&'set'in a&&void 0===(n=a.set(e, n, r))))) {
        try {
          u[t]=n;
        } catch (e) {}
      }
    }
  }, css: function(e, t, n, r) {
    let i; let o; let a; const s=he.camelCase(t); return t=he.cssProps[s]||(he.cssProps[s]=H(s)||s), a=he.cssHooks[t]||he.cssHooks[s], a&&'get'in a&&(o=a.get(e, !0, n)), void 0===o&&(o=ht(e, t, r)), 'normal'===o&&t in wt&&(o=wt[t]), ''===n||n?(i=parseFloat(o), !0===n||isFinite(i)?i||0:o):o;
  }}), he.each(['height', 'width'], function(e, t) {
    he.cssHooks[t]={get: function(e, n, r) {
      return n?yt.test(he.css(e, 'display'))&&0===e.offsetWidth?dt(e, bt, function() {
        return M(e, t, r);
      }):M(e, t, r):void 0;
    }, set: function(e, n, r) {
      const i=r&&pt(e); return _(e, n, r?F(e, t, r, fe.boxSizing&&'border-box'===he.css(e, 'boxSizing', !1, i), i):0);
    }};
  }), fe.opacity||(he.cssHooks.opacity={get: function(e, t) {
    return vt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||'')?.01*parseFloat(RegExp.$1)+'':t?'1':'';
  }, set: function(e, t) {
    const n=e.style; const r=e.currentStyle; const i=he.isNumeric(t)?'alpha(opacity='+100*t+')':''; const o=r&&r.filter||n.filter||''; n.zoom=1, (t>=1||''===t)&&''===he.trim(o.replace(mt, ''))&&n.removeAttribute&&(n.removeAttribute('filter'), ''===t||r&&!r.filter)||(n.filter=mt.test(o)?o.replace(mt, i):o+' '+i);
  }}), he.cssHooks.marginRight=L(fe.reliableMarginRight, function(e, t) {
    return t?dt(e, {display: 'inline-block'}, ht, [e, 'marginRight']):void 0;
  }), he.cssHooks.marginLeft=L(fe.reliableMarginLeft, function(e, t) {
    return t?(parseFloat(ht(e, 'marginLeft'))||(he.contains(e.ownerDocument, e)?e.getBoundingClientRect().left-dt(e, {marginLeft: 0}, function() {
      return e.getBoundingClientRect().left;
    }):0))+'px':void 0;
  }), he.each({margin: '', padding: '', border: 'Width'}, function(e, t) {
    he.cssHooks[e+t]={expand: function(n) {
      for (var r=0, i={}, o='string'==typeof n?n.split(' '):[n]; 4>r; r++)i[e+Oe[r]+t]=o[r]||o[r-2]||o[0]; return i;
    }}, lt.test(e)||(he.cssHooks[e+t].set=_);
  }), he.fn.extend({css: function(e, t) {
    return Pe(this, function(e, t, n) {
      let r; let i; const o={}; let a=0; if (he.isArray(t)) {
        for (r=pt(e), i=t.length; i>a; a++)o[t[a]]=he.css(e, t[a], !1, r); return o;
      } return void 0!==n?he.style(e, t, n):he.css(e, t);
    }, e, t, arguments.length>1);
  }, show: function() {
    return q(this, !0);
  }, hide: function() {
    return q(this);
  }, toggle: function(e) {
    return 'boolean'==typeof e?e?this.show():this.hide():this.each(function() {
Re(this)?he(this).show():he(this).hide();
    });
  }}), he.Tween=O, O.prototype={constructor: O, init: function(e, t, n, r, i, o) {
    this.elem=e, this.prop=n, this.easing=i||he.easing._default, this.options=t, this.start=this.now=this.cur(), this.end=r, this.unit=o||(he.cssNumber[n]?'':'px');
  }, cur: function() {
    const e=O.propHooks[this.prop]; return e&&e.get?e.get(this):O.propHooks._default.get(this);
  }, run: function(e) {
    let t; const n=O.propHooks[this.prop]; return this.options.duration?this.pos=t=he.easing[this.easing](e, this.options.duration*e, 0, 1, this.options.duration):this.pos=t=e, this.now=(this.end-this.start)*t+this.start, this.options.step&&this.options.step.call(this.elem, this.now, this), n&&n.set?n.set(this):O.propHooks._default.set(this), this;
  }}, O.prototype.init.prototype=O.prototype, O.propHooks={_default: {get: function(e) {
    let t; return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=he.css(e.elem, e.prop, ''), t&&'auto'!==t?t:0);
  }, set: function(e) {
he.fx.step[e.prop]?he.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[he.cssProps[e.prop]]&&!he.cssHooks[e.prop]?e.elem[e.prop]=e.now:he.style(e.elem, e.prop, e.now+e.unit);
  }}}, O.propHooks.scrollTop=O.propHooks.scrollLeft={set: function(e) {
    e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now);
  }}, he.easing={linear: function(e) {
    return e;
  }, swing: function(e) {
    return.5-Math.cos(e*Math.PI)/2;
  }, _default: 'swing'}, he.fx=O.prototype.init, he.fx.step={}; let Et; let Nt; var kt=/^(?:toggle|show|hide)$/; const St=/queueHooks$/; he.Animation=he.extend(z, {tweeners: {'*': [function(e, t) {
    const n=this.createTween(e, t); return f(n.elem, e, Me.exec(t), n), n;
  }]}, tweener: function(e, t) {
he.isFunction(e)?(t=e, e=['*']):e=e.match(De); for (var n, r=0, i=e.length; i>r; r++)n=e[r], z.tweeners[n]=z.tweeners[n]||[], z.tweeners[n].unshift(t);
  }, prefilters: [W], prefilter: function(e, t) {
t?z.prefilters.unshift(e):z.prefilters.push(e);
  }}), he.speed=function(e, t, n) {
    const r=e&&'object'==typeof e?he.extend({}, e):{complete: n||!n&&t||he.isFunction(e)&&e, duration: e, easing: n&&t||t&&!he.isFunction(t)&&t}; return r.duration=he.fx.off?0:'number'==typeof r.duration?r.duration:r.duration in he.fx.speeds?he.fx.speeds[r.duration]:he.fx.speeds._default, null!=r.queue&&!0!==r.queue||(r.queue='fx'), r.old=r.complete, r.complete=function() {
      he.isFunction(r.old)&&r.old.call(this), r.queue&&he.dequeue(this, r.queue);
    }, r;
  }, he.fn.extend({fadeTo: function(e, t, n, r) {
    return this.filter(Re).css('opacity', 0).show().end().animate({opacity: t}, e, n, r);
  }, animate: function(e, t, n, r) {
    const i=he.isEmptyObject(e); const o=he.speed(t, n, r); const a=function() {
      const t=z(this, he.extend({}, e), o); (i||he._data(this, 'finish'))&&t.stop(!0);
    }; return a.finish=a, i||!1===o.queue?this.each(a):this.queue(o.queue, a);
  }, stop: function(e, t, n) {
    const r=function(e) {
      const t=e.stop; delete e.stop, t(n);
    }; return 'string'!=typeof e&&(n=t, t=e, e=void 0), t&&!1!==e&&this.queue(e||'fx', []), this.each(function() {
      let t=!0; let i=null!=e&&e+'queueHooks'; const o=he.timers; const a=he._data(this); if (i)a[i]&&a[i].stop&&r(a[i]); else for (i in a)a[i]&&a[i].stop&&St.test(i)&&r(a[i]); for (i=o.length; i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n), t=!1, o.splice(i, 1)); !t&&n||he.dequeue(this, e);
    });
  }, finish: function(e) {
    return !1!==e&&(e=e||'fx'), this.each(function() {
      let t; const n=he._data(this); const r=n[e+'queue']; const i=n[e+'queueHooks']; const o=he.timers; const a=r?r.length:0; for (n.finish=!0, he.queue(this, e, []), i&&i.stop&&i.stop.call(this, !0), t=o.length; t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0), o.splice(t, 1)); for (t=0; a>t; t++)r[t]&&r[t].finish&&r[t].finish.call(this); delete n.finish;
    });
  }}), he.each(['toggle', 'show', 'hide'], function(e, t) {
    const n=he.fn[t]; he.fn[t]=function(e, r, i) {
      return null==e||'boolean'==typeof e?n.apply(this, arguments):this.animate(P(t, !0), e, r, i);
    };
  }), he.each({slideDown: P('show'), slideUp: P('hide'), slideToggle: P('toggle'), fadeIn: {opacity: 'show'}, fadeOut: {opacity: 'hide'}, fadeToggle: {opacity: 'toggle'}}, function(e, t) {
    he.fn[e]=function(e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), he.timers=[], he.fx.tick=function() {
    let e; const t=he.timers; let n=0; for (Et=he.now(); n<t.length; n++)(e=t[n])()||t[n]!==e||t.splice(n--, 1); t.length||he.fx.stop(), Et=void 0;
  }, he.fx.timer=function(e) {
    he.timers.push(e), e()?he.fx.start():he.timers.pop();
  }, he.fx.interval=13, he.fx.start=function() {
    Nt||(Nt=e.setInterval(he.fx.tick, he.fx.interval));
  }, he.fx.stop=function() {
    e.clearInterval(Nt), Nt=null;
  }, he.fx.speeds={slow: 600, fast: 200, _default: 400}, he.fn.delay=function(t, n) {
    return t=he.fx?he.fx.speeds[t]||t:t, n=n||'fx', this.queue(n, function(n, r) {
      const i=e.setTimeout(n, t); r.stop=function() {
        e.clearTimeout(i);
      };
    });
  }, function() {
    let e; let t=ie.createElement('input'); let n=ie.createElement('div'); const r=ie.createElement('select'); const i=r.appendChild(ie.createElement('option')); n=ie.createElement('div'), n.setAttribute('className', 't'), n.innerHTML='  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', e=n.getElementsByTagName('a')[0], t.setAttribute('type', 'checkbox'), n.appendChild(t), e=n.getElementsByTagName('a')[0], e.style.cssText='top:1px', fe.getSetAttribute='t'!==n.className, fe.style=/top/.test(e.getAttribute('style')), fe.hrefNormalized='/a'===e.getAttribute('href'), fe.checkOn=!!t.value, fe.optSelected=i.selected, fe.enctype=!!ie.createElement('form').enctype, r.disabled=!0, fe.optDisabled=!i.disabled, t=ie.createElement('input'), t.setAttribute('value', ''), fe.input=''===t.getAttribute('value'), t.value='t', t.setAttribute('type', 'radio'), fe.radioValue='t'===t.value;
  }(); const At=/\r/g; const Dt=/[\x20\t\r\n\f]+/g; he.fn.extend({val: function(e) {
    let t; let n; let r; const i=this[0]; return arguments.length?(r=he.isFunction(e), this.each(function(n) {
      let i; 1===this.nodeType&&(i=r?e.call(this, n, he(this).val()):e, null==i?i='':'number'==typeof i?i+='':he.isArray(i)&&(i=he.map(i, function(e) {
        return null==e?'':e+'';
      })), (t=he.valHooks[this.type]||he.valHooks[this.nodeName.toLowerCase()])&&'set'in t&&void 0!==t.set(this, i, 'value')||(this.value=i));
    })):i?(t=he.valHooks[i.type]||he.valHooks[i.nodeName.toLowerCase()], t&&'get'in t&&void 0!==(n=t.get(i, 'value'))?n:(n=i.value, 'string'==typeof n?n.replace(At, ''):null==n?'':n)):void 0;
  }}), he.extend({valHooks: {option: {get: function(e) {
    const t=he.find.attr(e, 'value'); return null!=t?t:he.trim(he.text(e)).replace(Dt, ' ');
  }}, select: {get: function(e) {
    for (var t, n, r=e.options, i=e.selectedIndex, o='select-one'===e.type||0>i, a=o?null:[], s=o?i+1:r.length, u=0>i?s:o?i:0; s>u; u++) {
      if (n=r[u], (n.selected||u===i)&&(fe.optDisabled?!n.disabled:null===n.getAttribute('disabled'))&&(!n.parentNode.disabled||!he.nodeName(n.parentNode, 'optgroup'))) {
        if (t=he(n).val(), o) return t; a.push(t);
      }
    } return a;
  }, set: function(e, t) {
    for (var n, r, i=e.options, o=he.makeArray(t), a=i.length; a--;) {
      if (r=i[a], he.inArray(he.valHooks.option.get(r), o)>-1) {
        try {
          r.selected=n=!0;
        } catch (e) {
          r.scrollHeight;
        }
      } else r.selected=!1;
    } return n||(e.selectedIndex=-1), i;
  }}}}), he.each(['radio', 'checkbox'], function() {
    he.valHooks[this]={set: function(e, t) {
      return he.isArray(t)?e.checked=he.inArray(he(e).val(), t)>-1:void 0;
    }}, fe.checkOn||(he.valHooks[this].get=function(e) {
      return null===e.getAttribute('value')?'on':e.value;
    });
  }); let jt; let Lt; const Ht=he.expr.attrHandle; const qt=/^(?:checked|selected)$/i; const _t=fe.getSetAttribute; const Ft=fe.input; he.fn.extend({attr: function(e, t) {
    return Pe(this, he.attr, e, t, arguments.length>1);
  }, removeAttr: function(e) {
    return this.each(function() {
      he.removeAttr(this, e);
    });
  }}), he.extend({attr: function(e, t, n) {
    let r; let i; const o=e.nodeType; if (3!==o&&8!==o&&2!==o) return void 0===e.getAttribute?he.prop(e, t, n):(1===o&&he.isXMLDoc(e)||(t=t.toLowerCase(), i=he.attrHooks[t]||(he.expr.match.bool.test(t)?Lt:jt)), void 0!==n?null===n?void he.removeAttr(e, t):i&&'set'in i&&void 0!==(r=i.set(e, n, t))?r:(e.setAttribute(t, n+''), n):i&&'get'in i&&null!==(r=i.get(e, t))?r:(r=he.find.attr(e, t), null==r?void 0:r));
  }, attrHooks: {type: {set: function(e, t) {
    if (!fe.radioValue&&'radio'===t&&he.nodeName(e, 'input')) {
      const n=e.value; return e.setAttribute('type', t), n&&(e.value=n), t;
    }
  }}}, removeAttr: function(e, t) {
    let n; let r; let i=0; const o=t&&t.match(De); if (o&&1===e.nodeType) for (;n=o[i++];)r=he.propFix[n]||n, he.expr.match.bool.test(n)?Ft&&_t||!qt.test(n)?e[r]=!1:e[he.camelCase('default-'+n)]=e[r]=!1:he.attr(e, n, ''), e.removeAttribute(_t?n:r);
  }}), Lt={set: function(e, t, n) {
    return !1===t?he.removeAttr(e, n):Ft&&_t||!qt.test(n)?e.setAttribute(!_t&&he.propFix[n]||n, n):e[he.camelCase('default-'+n)]=e[n]=!0, n;
  }}, he.each(he.expr.match.bool.source.match(/\w+/g), function(e, t) {
    const n=Ht[t]||he.find.attr; Ft&&_t||!qt.test(t)?Ht[t]=function(e, t, r) {
      let i; let o; return r||(o=Ht[t], Ht[t]=i, i=null!=n(e, t, r)?t.toLowerCase():null, Ht[t]=o), i;
    }:Ht[t]=function(e, t, n) {
      return n?void 0:e[he.camelCase('default-'+t)]?t.toLowerCase():null;
    };
  }), Ft&&_t||(he.attrHooks.value={set: function(e, t, n) {
    return he.nodeName(e, 'input')?void(e.defaultValue=t):jt&&jt.set(e, t, n);
  }}), _t||(jt={set: function(e, t, n) {
    let r=e.getAttributeNode(n); return r||e.setAttributeNode(r=e.ownerDocument.createAttribute(n)), r.value=t+='', 'value'===n||t===e.getAttribute(n)?t:void 0;
  }}, Ht.id=Ht.name=Ht.coords=function(e, t, n) {
    let r; return n?void 0:(r=e.getAttributeNode(t))&&''!==r.value?r.value:null;
  }, he.valHooks.button={get: function(e, t) {
    const n=e.getAttributeNode(t); return n&&n.specified?n.value:void 0;
  }, set: jt.set}, he.attrHooks.contenteditable={set: function(e, t, n) {
    jt.set(e, ''!==t&&t, n);
  }}, he.each(['width', 'height'], function(e, t) {
    he.attrHooks[t]={set: function(e, n) {
      return ''===n?(e.setAttribute(t, 'auto'), n):void 0;
    }};
  })), fe.style||(he.attrHooks.style={get: function(e) {
    return e.style.cssText||void 0;
  }, set: function(e, t) {
    return e.style.cssText=t+'';
  }}); const Mt=/^(?:input|select|textarea|button|object)$/i; const Ot=/^(?:a|area)$/i; he.fn.extend({prop: function(e, t) {
    return Pe(this, he.prop, e, t, arguments.length>1);
  }, removeProp: function(e) {
    return e=he.propFix[e]||e, this.each(function() {
      try {
        this[e]=void 0, delete this[e];
      } catch (e) {}
    });
  }}), he.extend({prop: function(e, t, n) {
    let r; let i; const o=e.nodeType; if (3!==o&&8!==o&&2!==o) return 1===o&&he.isXMLDoc(e)||(t=he.propFix[t]||t, i=he.propHooks[t]), void 0!==n?i&&'set'in i&&void 0!==(r=i.set(e, n, t))?r:e[t]=n:i&&'get'in i&&null!==(r=i.get(e, t))?r:e[t];
  }, propHooks: {tabIndex: {get: function(e) {
    const t=he.find.attr(e, 'tabindex'); return t?parseInt(t, 10):Mt.test(e.nodeName)||Ot.test(e.nodeName)&&e.href?0:-1;
  }}}, propFix: {for: 'htmlFor', class: 'className'}}), fe.hrefNormalized||he.each(['href', 'src'], function(e, t) {
    he.propHooks[t]={get: function(e) {
      return e.getAttribute(t, 4);
    }};
  }), fe.optSelected||(he.propHooks.selected={get: function(e) {
    const t=e.parentNode; return t&&(t.selectedIndex, t.parentNode&&t.parentNode.selectedIndex), null;
  }, set: function(e) {
    const t=e.parentNode; t&&(t.selectedIndex, t.parentNode&&t.parentNode.selectedIndex);
  }}), he.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function() {
    he.propFix[this.toLowerCase()]=this;
  }), fe.enctype||(he.propFix.enctype='encoding'); const Rt=/[\t\r\n\f]/g; he.fn.extend({addClass: function(e) {
    let t; let n; let r; let i; let o; let a; let s; let u=0; if (he.isFunction(e)) {
      return this.each(function(t) {
        he(this).addClass(e.call(this, t, X(this)));
      });
    } if ('string'==typeof e&&e) {
      for (t=e.match(De)||[]; n=this[u++];) {
        if (i=X(n), r=1===n.nodeType&&(' '+i+' ').replace(Rt, ' ')) {
          for (a=0; o=t[a++];)r.indexOf(' '+o+' ')<0&&(r+=o+' '); s=he.trim(r), i!==s&&he.attr(n, 'class', s);
        }
      }
    } return this;
  }, removeClass: function(e) {
    let t; let n; let r; let i; let o; let a; let s; let u=0; if (he.isFunction(e)) {
      return this.each(function(t) {
        he(this).removeClass(e.call(this, t, X(this)));
      });
    } if (!arguments.length) return this.attr('class', ''); if ('string'==typeof e&&e) {
      for (t=e.match(De)||[]; n=this[u++];) {
        if (i=X(n), r=1===n.nodeType&&(' '+i+' ').replace(Rt, ' ')) {
          for (a=0; o=t[a++];) for (;r.indexOf(' '+o+' ')>-1;)r=r.replace(' '+o+' ', ' '); s=he.trim(r), i!==s&&he.attr(n, 'class', s);
        }
      }
    } return this;
  }, toggleClass: function(e, t) {
    const n=typeof e; return 'boolean'==typeof t&&'string'===n?t?this.addClass(e):this.removeClass(e):he.isFunction(e)?this.each(function(n) {
      he(this).toggleClass(e.call(this, n, X(this), t), t);
    }):this.each(function() {
      let t; let r; let i; let o; if ('string'===n) for (r=0, i=he(this), o=e.match(De)||[]; t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t); else void 0!==e&&'boolean'!==n||(t=X(this), t&&he._data(this, '__className__', t), he.attr(this, 'class', t||!1===e?'':he._data(this, '__className__')||''));
    });
  }, hasClass: function(e) {
    let t; let n; let r=0; for (t=' '+e+' '; n=this[r++];) if (1===n.nodeType&&(' '+X(n)+' ').replace(Rt, ' ').indexOf(t)>-1) return !0; return !1;
  }}), he.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function(e, t) {
    he.fn[t]=function(e, n) {
      return arguments.length>0?this.on(t, null, e, n):this.trigger(t);
    };
  }), he.fn.extend({hover: function(e, t) {
    return this.mouseenter(e).mouseleave(t||e);
  }}); const Pt=e.location; let Bt=he.now(); const Wt=/\?/; const It=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g; he.parseJSON=function(t) {
    if (e.JSON&&e.JSON.parse) return e.JSON.parse(t+''); let n; let r=null; const i=he.trim(t+''); return i&&!he.trim(i.replace(It, function(e, t, i, o) {
      return n&&t&&(r=0), 0===r?e:(n=i||t, r+=!o-!i, '');
    }))?Function('return '+i)():he.error('Invalid JSON: '+t);
  }, he.parseXML=function(t) {
    let n; let r; if (!t||'string'!=typeof t) return null; try {
e.DOMParser?(r=new e.DOMParser, n=r.parseFromString(t, 'text/xml')):(n=new e.ActiveXObject('Microsoft.XMLDOM'), n.async='false', n.loadXML(t));
    } catch (e) {
      n=void 0;
    } return n&&n.documentElement&&!n.getElementsByTagName('parsererror').length||he.error('Invalid XML: '+t), n;
  }; const $t=/#.*$/; const zt=/([?&])_=[^&]*/; const Xt=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm; const Ut=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/; const Vt=/^(?:GET|HEAD)$/; const Yt=/^\/\//; const Jt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/; const Gt={}; var Qt={}; const Kt='*/'.concat('*'); const Zt=Pt.href; const en=Jt.exec(Zt.toLowerCase())||[]; he.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: Zt, type: 'GET', isLocal: Ut.test(en[1]), global: !0, processData: !0, async: !0, contentType: 'application/x-www-form-urlencoded; charset=UTF-8', accepts: {'*': Kt, 'text': 'text/plain', 'html': 'text/html', 'xml': 'application/xml, text/xml', 'json': 'application/json, text/javascript'}, contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/}, responseFields: {xml: 'responseXML', text: 'responseText', json: 'responseJSON'}, converters: {'* text': String, 'text html': !0, 'text json': he.parseJSON, 'text xml': he.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function(e, t) {
    return t?Y(Y(e, he.ajaxSettings), t):Y(he.ajaxSettings, e);
  }, ajaxPrefilter: U(Gt), ajaxTransport: U(Qt), ajax: function(t, n) {
    function r(t, n, r, i) {
      let o; let d; let y; let x; let w; let C=n; 2!==b&&(b=2, u&&e.clearTimeout(u), c=void 0, s=i||'', T.readyState=t>0?4:0, o=t>=200&&300>t||304===t, r&&(x=J(f, T, r)), x=G(f, x, T, o), o?(f.ifModified&&(w=T.getResponseHeader('Last-Modified'), w&&(he.lastModified[a]=w), (w=T.getResponseHeader('etag'))&&(he.etag[a]=w)), 204===t||'HEAD'===f.type?C='nocontent':304===t?C='notmodified':(C=x.state, d=x.data, y=x.error, o=!y)):(y=C, !t&&C||(C='error', 0>t&&(t=0))), T.status=t, T.statusText=(n||C)+'', o?g.resolveWith(p, [d, C, T]):g.rejectWith(p, [T, C, y]), T.statusCode(v), v=void 0, l&&h.trigger(o?'ajaxSuccess':'ajaxError', [T, f, o?d:y]), m.fireWith(p, [T, C]), l&&(h.trigger('ajaxComplete', [T, f]), --he.active||he.event.trigger('ajaxStop')));
    }'object'==typeof t&&(n=t, t=void 0), n=n||{}; let i; let o; let a; let s; let u; let l; let c; let d; var f=he.ajaxSetup({}, n); var p=f.context||f; var h=f.context&&(p.nodeType||p.jquery)?he(p):he.event; var g=he.Deferred(); var m=he.Callbacks('once memory'); var v=f.statusCode||{}; const y={}; const x={}; var b=0; let w='canceled'; var T={readyState: 0, getResponseHeader: function(e) {
      let t; if (2===b) {
        if (!d) for (d={}; t=Xt.exec(s);)d[t[1].toLowerCase()]=t[2]; t=d[e.toLowerCase()];
      } return null==t?null:t;
    }, getAllResponseHeaders: function() {
      return 2===b?s:null;
    }, setRequestHeader: function(e, t) {
      const n=e.toLowerCase(); return b||(e=x[n]=x[n]||e, y[e]=t), this;
    }, overrideMimeType: function(e) {
      return b||(f.mimeType=e), this;
    }, statusCode: function(e) {
      let t; if (e) if (2>b) for (t in e)v[t]=[v[t], e[t]]; else T.always(e[T.status]); return this;
    }, abort: function(e) {
      const t=e||w; return c&&c.abort(t), r(0, t), this;
    }}; if (g.promise(T).complete=m.add, T.success=T.done, T.error=T.fail, f.url=((t||f.url||Zt)+'').replace($t, '').replace(Yt, en[1]+'//'), f.type=n.method||n.type||f.method||f.type, f.dataTypes=he.trim(f.dataType||'*').toLowerCase().match(De)||[''], null==f.crossDomain&&(i=Jt.exec(f.url.toLowerCase()), f.crossDomain=!(!i||i[1]===en[1]&&i[2]===en[2]&&(i[3]||('http:'===i[1]?'80':'443'))===(en[3]||('http:'===en[1]?'80':'443')))), f.data&&f.processData&&'string'!=typeof f.data&&(f.data=he.param(f.data, f.traditional)), V(Gt, f, n, T), 2===b) return T; l=he.event&&f.global, l&&0==he.active++&&he.event.trigger('ajaxStart'), f.type=f.type.toUpperCase(), f.hasContent=!Vt.test(f.type), a=f.url, f.hasContent||(f.data&&(a=f.url+=(Wt.test(a)?'&':'?')+f.data, delete f.data), !1===f.cache&&(f.url=zt.test(a)?a.replace(zt, '$1_='+Bt++):a+(Wt.test(a)?'&':'?')+'_='+Bt++)), f.ifModified&&(he.lastModified[a]&&T.setRequestHeader('If-Modified-Since', he.lastModified[a]), he.etag[a]&&T.setRequestHeader('If-None-Match', he.etag[a])), (f.data&&f.hasContent&&!1!==f.contentType||n.contentType)&&T.setRequestHeader('Content-Type', f.contentType), T.setRequestHeader('Accept', f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+('*'!==f.dataTypes[0]?', '+Kt+'; q=0.01':''):f.accepts['*']); for (o in f.headers)T.setRequestHeader(o, f.headers[o]); if (f.beforeSend&&(!1===f.beforeSend.call(p, T, f)||2===b)) return T.abort(); w='abort'; for (o in {success: 1, error: 1, complete: 1})T[o](f[o]); if (c=V(Qt, f, n, T)) {
      if (T.readyState=1, l&&h.trigger('ajaxSend', [T, f]), 2===b) return T; f.async&&f.timeout>0&&(u=e.setTimeout(function() {
        T.abort('timeout');
      }, f.timeout)); try {
        b=1, c.send(y, r);
      } catch (e) {
        if (!(2>b)) throw e; r(-1, e);
      }
    } else r(-1, 'No Transport'); return T;
  }, getJSON: function(e, t, n) {
    return he.get(e, t, n, 'json');
  }, getScript: function(e, t) {
    return he.get(e, void 0, t, 'script');
  }}), he.each(['get', 'post'], function(e, t) {
    he[t]=function(e, n, r, i) {
      return he.isFunction(n)&&(i=i||r, r=n, n=void 0), he.ajax(he.extend({url: e, type: t, dataType: i, data: n, success: r}, he.isPlainObject(e)&&e));
    };
  }), he._evalUrl=function(e) {
    return he.ajax({url: e, type: 'GET', dataType: 'script', cache: !0, async: !1, global: !1, throws: !0});
  }, he.fn.extend({wrapAll: function(e) {
    if (he.isFunction(e)) {
      return this.each(function(t) {
        he(this).wrapAll(e.call(this, t));
      });
    } if (this[0]) {
      const t=he(e, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode&&t.insertBefore(this[0]), t.map(function() {
        for (var e=this; e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild; return e;
      }).append(this);
    } return this;
  }, wrapInner: function(e) {
    return he.isFunction(e)?this.each(function(t) {
      he(this).wrapInner(e.call(this, t));
    }):this.each(function() {
      const t=he(this); const n=t.contents(); n.length?n.wrapAll(e):t.append(e);
    });
  }, wrap: function(e) {
    const t=he.isFunction(e); return this.each(function(n) {
      he(this).wrapAll(t?e.call(this, n):e);
    });
  }, unwrap: function() {
    return this.parent().each(function() {
      he.nodeName(this, 'body')||he(this).replaceWith(this.childNodes);
    }).end();
  }}), he.expr.filters.hidden=function(e) {
    return fe.reliableHiddenOffsets()?e.offsetWidth<=0&&e.offsetHeight<=0&&!e.getClientRects().length:K(e);
  }, he.expr.filters.visible=function(e) {
    return !he.expr.filters.hidden(e);
  }; const tn=/%20/g; var nn=/\[\]$/; const rn=/\r?\n/g; const on=/^(?:submit|button|image|reset|file)$/i; const an=/^(?:input|select|textarea|keygen)/i; he.param=function(e, t) {
    let n; const r=[]; const i=function(e, t) {
      t=he.isFunction(t)?t():null==t?'':t, r[r.length]=encodeURIComponent(e)+'='+encodeURIComponent(t);
    }; if (void 0===t&&(t=he.ajaxSettings&&he.ajaxSettings.traditional), he.isArray(e)||e.jquery&&!he.isPlainObject(e)) {
      he.each(e, function() {
        i(this.name, this.value);
      });
    } else for (n in e)Z(n, e[n], t, i); return r.join('&').replace(tn, '+');
  }, he.fn.extend({serialize: function() {
    return he.param(this.serializeArray());
  }, serializeArray: function() {
    return this.map(function() {
      const e=he.prop(this, 'elements'); return e?he.makeArray(e):this;
    }).filter(function() {
      const e=this.type; return this.name&&!he(this).is(':disabled')&&an.test(this.nodeName)&&!on.test(e)&&(this.checked||!Be.test(e));
    }).map(function(e, t) {
      const n=he(this).val(); return null==n?null:he.isArray(n)?he.map(n, function(e) {
        return {name: t.name, value: e.replace(rn, '\r\n')};
      }):{name: t.name, value: n.replace(rn, '\r\n')};
    }).get();
  }}), he.ajaxSettings.xhr=void 0!==e.ActiveXObject?function() {
    return this.isLocal?te():ie.documentMode>8?ee():/^(get|post|head|put|delete|options)$/i.test(this.type)&&ee()||te();
  }:ee; let sn=0; const un={}; let ln=he.ajaxSettings.xhr(); e.attachEvent&&e.attachEvent('onunload', function() {
    for (const e in un)un[e](void 0, !0);
  }), fe.cors=!!ln&&'withCredentials'in ln, (ln=fe.ajax=!!ln)&&he.ajaxTransport(function(t) {
    if (!t.crossDomain||fe.cors) {
      let n; return {send: function(r, i) {
        let o; const a=t.xhr(); const s=++sn; if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (o in t.xhrFields)a[o]=t.xhrFields[o]; t.mimeType&&a.overrideMimeType&&a.overrideMimeType(t.mimeType), t.crossDomain||r['X-Requested-With']||(r['X-Requested-With']='XMLHttpRequest'); for (o in r) void 0!==r[o]&&a.setRequestHeader(o, r[o]+''); a.send(t.hasContent&&t.data||null), n=function(e, r) {
          let o; let u; let l; if (n&&(r||4===a.readyState)) {
            if (delete un[s], n=void 0, a.onreadystatechange=he.noop, r)4!==a.readyState&&a.abort(); else {
              l={}, o=a.status, 'string'==typeof a.responseText&&(l.text=a.responseText); try {
                u=a.statusText;
              } catch (e) {
                u='';
              }o||!t.isLocal||t.crossDomain?1223===o&&(o=204):o=l.text?200:404;
            }
          }l&&i(o, u, l, a.getAllResponseHeaders());
        }, t.async?4===a.readyState?e.setTimeout(n):a.onreadystatechange=un[s]=n:n();
      }, abort: function() {
        n&&n(void 0, !0);
      }};
    }
  }), he.ajaxSetup({accepts: {script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'}, contents: {script: /\b(?:java|ecma)script\b/}, converters: {'text script': function(e) {
    return he.globalEval(e), e;
  }}}), he.ajaxPrefilter('script', function(e) {
    void 0===e.cache&&(e.cache=!1), e.crossDomain&&(e.type='GET', e.global=!1);
  }), he.ajaxTransport('script', function(e) {
    if (e.crossDomain) {
      let t; const n=ie.head||he('head')[0]||ie.documentElement; return {send: function(r, i) {
        t=ie.createElement('script'), t.async=!0, e.scriptCharset&&(t.charset=e.scriptCharset), t.src=e.url, t.onload=t.onreadystatechange=function(e, n) {
          (n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null, t.parentNode&&t.parentNode.removeChild(t), t=null, n||i(200, 'success'));
        }, n.insertBefore(t, n.firstChild);
      }, abort: function() {
        t&&t.onload(void 0, !0);
      }};
    }
  }); const cn=[]; const dn=/(=)\?(?=&|$)|\?\?/; he.ajaxSetup({jsonp: 'callback', jsonpCallback: function() {
    const e=cn.pop()||he.expando+'_'+Bt++; return this[e]=!0, e;
  }}), he.ajaxPrefilter('json jsonp', function(t, n, r) {
    let i; let o; let a; const s=!1!==t.jsonp&&(dn.test(t.url)?'url':'string'==typeof t.data&&0===(t.contentType||'').indexOf('application/x-www-form-urlencoded')&&dn.test(t.data)&&'data'); return s||'jsonp'===t.dataTypes[0]?(i=t.jsonpCallback=he.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback, s?t[s]=t[s].replace(dn, '$1'+i):!1!==t.jsonp&&(t.url+=(Wt.test(t.url)?'&':'?')+t.jsonp+'='+i), t.converters['script json']=function() {
      return a||he.error(i+' was not called'), a[0];
    }, t.dataTypes[0]='json', o=e[i], e[i]=function() {
      a=arguments;
    }, r.always(function() {
void 0===o?he(e).removeProp(i):e[i]=o, t[i]&&(t.jsonpCallback=n.jsonpCallback, cn.push(i)), a&&he.isFunction(o)&&o(a[0]), a=o=void 0;
    }), 'script'):void 0;
  }), he.parseHTML=function(e, t, n) {
    if (!e||'string'!=typeof e) return null; 'boolean'==typeof t&&(n=t, t=!1), t=t||ie; let r=Ce.exec(e); const i=!n&&[]; return r?[t.createElement(r[1])]:(r=v([e], t, i), i&&i.length&&he(i).remove(), he.merge([], r.childNodes));
  }; const fn=he.fn.load; he.fn.load=function(e, t, n) {
    if ('string'!=typeof e&&fn) return fn.apply(this, arguments); let r; let i; let o; const a=this; const s=e.indexOf(' '); return s>-1&&(r=he.trim(e.slice(s, e.length)), e=e.slice(0, s)), he.isFunction(t)?(n=t, t=void 0):t&&'object'==typeof t&&(i='POST'), a.length>0&&he.ajax({url: e, type: i||'GET', dataType: 'html', data: t}).done(function(e) {
      o=arguments, a.html(r?he('<div>').append(he.parseHTML(e)).find(r):e);
    }).always(n&&function(e, t) {
      a.each(function() {
        n.apply(this, o||[e.responseText, t, e]);
      });
    }), this;
  }, he.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function(e, t) {
    he.fn[t]=function(e) {
      return this.on(t, e);
    };
  }), he.expr.filters.animated=function(e) {
    return he.grep(he.timers, function(t) {
      return e===t.elem;
    }).length;
  }, he.offset={setOffset: function(e, t, n) {
    let r; let i; let o; let a; let s; let u; let l; const c=he.css(e, 'position'); const d=he(e); const f={}; 'static'===c&&(e.style.position='relative'), s=d.offset(), o=he.css(e, 'top'), u=he.css(e, 'left'), l=('absolute'===c||'fixed'===c)&&he.inArray('auto', [o, u])>-1, l?(r=d.position(), a=r.top, i=r.left):(a=parseFloat(o)||0, i=parseFloat(u)||0), he.isFunction(t)&&(t=t.call(e, n, he.extend({}, s))), null!=t.top&&(f.top=t.top-s.top+a), null!=t.left&&(f.left=t.left-s.left+i), 'using'in t?t.using.call(e, f):d.css(f);
  }}, he.fn.extend({offset: function(e) {
    if (arguments.length) {
      return void 0===e?this:this.each(function(t) {
        he.offset.setOffset(this, e, t);
      });
    } let t; let n; let r={top: 0, left: 0}; const i=this[0]; const o=i&&i.ownerDocument; return o?(t=o.documentElement, he.contains(t, i)?(void 0!==i.getBoundingClientRect&&(r=i.getBoundingClientRect()), n=ne(o), {top: r.top+(n.pageYOffset||t.scrollTop)-(t.clientTop||0), left: r.left+(n.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}):r):void 0;
  }, position: function() {
    if (this[0]) {
      let e; let t; let n={top: 0, left: 0}; const r=this[0]; return 'fixed'===he.css(r, 'position')?t=r.getBoundingClientRect():(e=this.offsetParent(), t=this.offset(), he.nodeName(e[0], 'html')||(n=e.offset()), n.top+=he.css(e[0], 'borderTopWidth', !0), n.left+=he.css(e[0], 'borderLeftWidth', !0)), {top: t.top-n.top-he.css(r, 'marginTop', !0), left: t.left-n.left-he.css(r, 'marginLeft', !0)};
    }
  }, offsetParent: function() {
    return this.map(function() {
      for (var e=this.offsetParent; e&&!he.nodeName(e, 'html')&&'static'===he.css(e, 'position');)e=e.offsetParent; return e||ft;
    });
  }}), he.each({scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset'}, function(e, t) {
    const n=/Y/.test(t); he.fn[e]=function(r) {
      return Pe(this, function(e, r, i) {
        const o=ne(e); return void 0===i?o?t in o?o[t]:o.document.documentElement[r]:e[r]:void(o?o.scrollTo(n?he(o).scrollLeft():i, n?i:he(o).scrollTop()):e[r]=i);
      }, e, r, arguments.length, null);
    };
  }), he.each(['top', 'left'], function(e, t) {
    he.cssHooks[t]=L(fe.pixelPosition, function(e, n) {
      return n?(n=ht(e, t), ct.test(n)?he(e).position()[t]+'px':n):void 0;
    });
  }), he.each({Height: 'height', Width: 'width'}, function(e, t) {
    he.each({'padding': 'inner'+e, 'content': t, '': 'outer'+e}, function(n, r) {
      he.fn[r]=function(r, i) {
        const o=arguments.length&&(n||'boolean'!=typeof r); const a=n||(!0===r||!0===i?'margin':'border'); return Pe(this, function(t, n, r) {
          let i; return he.isWindow(t)?t.document.documentElement['client'+e]:9===t.nodeType?(i=t.documentElement, Math.max(t.body['scroll'+e], i['scroll'+e], t.body['offset'+e], i['offset'+e], i['client'+e])):void 0===r?he.css(t, n, a):he.style(t, n, r, a);
        }, t, o?r:void 0, o, null);
      };
    });
  }), he.fn.extend({bind: function(e, t, n) {
    return this.on(e, null, t, n);
  }, unbind: function(e, t) {
    return this.off(e, null, t);
  }, delegate: function(e, t, n, r) {
    return this.on(t, e, n, r);
  }, undelegate: function(e, t, n) {
    return 1===arguments.length?this.off(e, '**'):this.off(t, e||'**', n);
  }}), he.fn.size=function() {
    return this.length;
  }, he.fn.andSelf=he.fn.addBack, 'function'==typeof define&&define.amd&&define('jquery', [], function() {
    return he;
  }); const pn=e.jQuery; const hn=e.$; return he.noConflict=function(t) {
    return e.$===he&&(e.$=hn), t&&e.jQuery===he&&(e.jQuery=pn), he;
  }, t||(e.jQuery=e.$=he), he;
});
