(()=>{
  const e={146: (e, t, n)=>{
    !function(e) {
      'use strict'; e.overlayMode=function(t, n, r) {
        return {startState: function() {
          return {base: e.startState(t), overlay: e.startState(n), basePos: 0, baseCur: null, overlayPos: 0, overlayCur: null, streamSeen: null};
        }, copyState: function(r) {
          return {base: e.copyState(t, r.base), overlay: e.copyState(n, r.overlay), basePos: r.basePos, baseCur: null, overlayPos: r.overlayPos, overlayCur: null};
        }, token: function(e, i) {
          return (e!=i.streamSeen||Math.min(i.basePos, i.overlayPos)<e.start)&&(i.streamSeen=e, i.basePos=i.overlayPos=e.start), e.start==i.basePos&&(i.baseCur=t.token(e, i.base), i.basePos=e.pos), e.start==i.overlayPos&&(e.pos=e.start, i.overlayCur=n.token(e, i.overlay), i.overlayPos=e.pos), e.pos=Math.min(i.basePos, i.overlayPos), null==i.overlayCur?i.baseCur:null!=i.baseCur&&i.overlay.combineTokens||r&&null==i.overlay.combineTokens?i.baseCur+' '+i.overlayCur:i.overlayCur;
        }, indent: t.indent&&function(e, n, r) {
          return t.indent(e.base, n, r);
        }, electricChars: t.electricChars, innerMode: function(e) {
          return {state: e.base, mode: t};
        }, blankLine: function(e) {
          let i; let o; return t.blankLine&&(i=t.blankLine(e.base)), n.blankLine&&(o=n.blankLine(e.overlay)), null==o?i:r&&null!=i?i+' '+o:o;
        }};
      };
    }(n(631));
  }, 790: (e, t, n)=>{
    !function(e) {
      'use strict'; function t(e, t) {
        if (!e.hasOwnProperty(t)) throw new Error('Undefined state '+t+' in simple mode');
      } function n(e, t) {
        if (!e) return /(?:)/; let n=''; return e instanceof RegExp?(e.ignoreCase&&(n='i'), e=e.source):e=String(e), new RegExp((!1===t?'':'^')+'(?:'+e+')', n);
      } function r(e, r) {
        (e.next||e.push)&&t(r, e.next||e.push), this.regex=n(e.regex), this.token=function(e) {
          if (!e) return null; if (e.apply) return e; if ('string'==typeof e) return e.replace(/\./g, ' '); for (var t=[], n=0; n<e.length; n++)t.push(e[n]&&e[n].replace(/\./g, ' ')); return t;
        }(e.token), this.data=e;
      } function i(e, t) {
        return function(n, r) {
          if (r.pending) {
            const i=r.pending.shift(); return 0==r.pending.length&&(r.pending=null), n.pos+=i.text.length, i.token;
          } if (r.local) {
            if (r.local.end&&n.match(r.local.end)) {
              var o=r.local.endToken||null; return r.local=r.localState=null, o;
            } let a; return o=r.local.mode.token(n, r.localState), r.local.endScan&&(a=r.local.endScan.exec(n.current()))&&(n.pos=n.start+a.index), o;
          } for (let l=e[r.state], c=0; c<l.length; c++) {
            const u=l[c]; const d=(!u.data.sol||n.sol())&&n.match(u.regex); if (d) {
u.data.next?r.state=u.data.next:u.data.push?((r.stack||(r.stack=[])).push(r.state), r.state=u.data.push):u.data.pop&&r.stack&&r.stack.length&&(r.state=r.stack.pop()), u.data.mode&&s(t, r, u.data.mode, u.token), u.data.indent&&r.indent.push(n.indentation()+t.indentUnit), u.data.dedent&&r.indent.pop(); let h=u.token; if (h&&h.apply&&(h=h(d)), d.length>2&&u.token&&'string'!=typeof u.token) {
  r.pending=[]; for (let p=2; p<d.length; p++)d[p]&&r.pending.push({text: d[p], token: u.token[p-1]}); return n.backUp(d[0].length-(d[1]?d[1].length:0)), h[0];
} return h&&h.join?h[0]:h;
            }
          } return n.next(), null;
        };
      } function o(e, t) {
        if (e===t) return !0; if (!e||'object'!=typeof e||!t||'object'!=typeof t) return !1; let n=0; for (var r in e) {
          if (e.hasOwnProperty(r)) {
            if (!t.hasOwnProperty(r)||!o(e[r], t[r])) return !1; n++;
          }
        } for (var r in t)t.hasOwnProperty(r)&&n--; return 0==n;
      } function s(t, r, i, s) {
        let a; if (i.persistent) for (let l=r.persistentStates; l&&!a; l=l.next)(i.spec?o(i.spec, l.spec):i.mode==l.mode)&&(a=l); const c=a?a.mode:i.mode||e.getMode(t, i.spec); const u=a?a.state:e.startState(c); i.persistent&&!a&&(r.persistentStates={mode: c, spec: i.spec, state: u, next: r.persistentStates}), r.localState=u, r.local={mode: c, end: i.end&&n(i.end), endScan: i.end&&!1!==i.forceEnd&&n(i.end, !1), endToken: s&&s.join?s[s.length-1]:s};
      } function a(t, n) {
        return function(r, i, o) {
          if (r.local&&r.local.mode.indent) return r.local.mode.indent(r.localState, i, o); if (null==r.indent||r.local||n.dontIndentStates&&function(e, t) {
            for (let n=0; n<t.length; n++) if (t[n]===e) return !0;
          }(r.state, n.dontIndentStates)>-1) return e.Pass; let s=r.indent.length-1; let a=t[r.state]; e:for (;;) {
            for (let l=0; l<a.length; l++) {
              const c=a[l]; if (c.data.dedent&&!1!==c.data.dedentIfLineStart) {
                const u=c.regex.exec(i); if (u&&u[0]) {
                  s--, (c.next||c.push)&&(a=t[c.next||c.push]), i=i.slice(u[0].length); continue e;
                }
              }
            } break;
          } return s<0?0:r.indent[s];
        };
      }e.defineSimpleMode=function(t, n) {
        e.defineMode(t, (function(t) {
          return e.simpleMode(t, n);
        }));
      }, e.simpleMode=function(n, o) {
        t(o, 'start'); const s={}; const l=o.meta||{}; let c=!1; for (const u in o) {
          if (u!=l&&o.hasOwnProperty(u)) {
            for (let d=s[u]=[], h=o[u], p=0; p<h.length; p++) {
              const f=h[p]; d.push(new r(f, o)), (f.indent||f.dedent)&&(c=!0);
            }
          }
        } const m={startState: function() {
          return {state: 'start', pending: null, local: null, localState: null, indent: c?[]:null};
        }, copyState: function(t) {
          const n={state: t.state, pending: t.pending, local: t.local, localState: null, indent: t.indent&&t.indent.slice(0)}; t.localState&&(n.localState=e.copyState(t.local.mode, t.localState)), t.stack&&(n.stack=t.stack.slice(0)); for (let r=t.persistentStates; r; r=r.next)n.persistentStates={mode: r.mode, spec: r.spec, state: r.state==t.localState?n.localState:e.copyState(r.mode, r.state), next: n.persistentStates}; return n;
        }, token: i(s, n), innerMode: function(e) {
          return e.local&&{mode: e.local.mode, state: e.localState};
        }, indent: a(s, l)}; if (l) for (const g in l)l.hasOwnProperty(g)&&(m[g]=l[g]); return m;
      };
    }(n(631));
  }, 631: function(e) {
    e.exports=function() {
      'use strict'; const e=navigator.userAgent; const t=navigator.platform; const n=/gecko\/\d/i.test(e); const r=/MSIE \d/.test(e); const i=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e); const o=/Edge\/(\d+)/.exec(e); const s=r||i||o; const a=s&&(r?document.documentMode||6:+(o||i)[1]); let l=!o&&/WebKit\//.test(e); const c=l&&/Qt\/\d+\.\d+/.test(e); const u=!o&&/Chrome\//.test(e); let d=/Opera\//.test(e); const h=/Apple Computer/.test(navigator.vendor); const p=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e); const f=/PhantomJS/.test(e); const m=!o&&/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e); const g=/Android/.test(e); const v=m||g||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e); const y=m||/Mac/.test(t); const b=/\bCrOS\b/.test(e); const w=/win/i.test(t); let x=d&&e.match(/Version\/(\d*\.\d*)/); x&&(x=Number(x[1])), x&&x>=15&&(d=!1, l=!0); const k=y&&(c||d&&(null==x||x<12.11)); const _=n||s&&a>=9; function S(e) {
        return new RegExp('(^|\\s)'+e+'(?:$|\\s)\\s*');
      } let C; const M=function(e, t) {
        const n=e.className; const r=S(t).exec(n); if (r) {
          const i=n.slice(r.index+r[0].length); e.className=n.slice(0, r.index)+(i?r[1]+i:'');
        }
      }; function T(e) {
        for (let t=e.childNodes.length; t>0; --t)e.removeChild(e.firstChild); return e;
      } function O(e, t) {
        return T(e).appendChild(t);
      } function D(e, t, n, r) {
        const i=document.createElement(e); if (n&&(i.className=n), r&&(i.style.cssText=r), 'string'==typeof t)i.appendChild(document.createTextNode(t)); else if (t) for (let o=0; o<t.length; ++o)i.appendChild(t[o]); return i;
      } function E(e, t, n, r) {
        const i=D(e, t, n, r); return i.setAttribute('role', 'presentation'), i;
      } function N(e, t) {
        if (3==t.nodeType&&(t=t.parentNode), e.contains) return e.contains(t); do {
          if (11==t.nodeType&&(t=t.host), t==e) return !0;
        } while (t=t.parentNode);
      } function A() {
        let e; try {
          e=document.activeElement;
        } catch (t) {
          e=document.body||null;
        } for (;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement; return e;
      } function L(e, t) {
        const n=e.className; S(t).test(n)||(e.className+=(n?' ':'')+t);
      } function z(e, t) {
        for (let n=e.split(' '), r=0; r<n.length; r++)n[r]&&!S(n[r]).test(t)&&(t+=' '+n[r]); return t;
      }C=document.createRange?function(e, t, n, r) {
        const i=document.createRange(); return i.setEnd(r||e, n), i.setStart(e, t), i;
      }:function(e, t, n) {
        const r=document.body.createTextRange(); try {
          r.moveToElementText(e.parentNode);
        } catch (e) {
          return r;
        } return r.collapse(!0), r.moveEnd('character', n), r.moveStart('character', t), r;
      }; let I=function(e) {
        e.select();
      }; function q(e) {
        const t=Array.prototype.slice.call(arguments, 1); return function() {
          return e.apply(null, t);
        };
      } function F(e, t, n) {
        for (const r in t||(t={}), e)!e.hasOwnProperty(r)||!1===n&&t.hasOwnProperty(r)||(t[r]=e[r]); return t;
      } function P(e, t, n, r, i) {
        null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length); for (let o=r||0, s=i||0; ;) {
          const a=e.indexOf('\t', o); if (a<0||a>=t) return s+(t-o); s+=a-o, s+=n-s%n, o=a+1;
        }
      }m?I=function(e) {
        e.selectionStart=0, e.selectionEnd=e.value.length;
      }:s&&(I=function(e) {
        try {
          e.select();
        } catch (e) {}
      }); const R=function() {
        this.id=null, this.f=null, this.time=0, this.handler=q(this.onTimeout, this);
      }; function B(e, t) {
        for (let n=0; n<e.length; ++n) if (e[n]==t) return n; return -1;
      }R.prototype.onTimeout=function(e) {
        e.id=0, e.time<=+new Date?e.f():setTimeout(e.handler, e.time-+new Date);
      }, R.prototype.set=function(e, t) {
        this.f=t; const n=+new Date+e; (!this.id||n<this.time)&&(clearTimeout(this.id), this.id=setTimeout(this.handler, e), this.time=n);
      }; const j={toString: function() {
        return 'CodeMirror.Pass';
      }}; const W={scroll: !1}; const H={origin: '*mouse'}; const V={origin: '+move'}; function $(e, t, n) {
        for (let r=0, i=0; ;) {
          let o=e.indexOf('\t', r); -1==o&&(o=e.length); const s=o-r; if (o==e.length||i+s>=t) return r+Math.min(s, t-i); if (i+=o-r, r=o+1, (i+=n-i%n)>=t) return r;
        }
      } const U=['']; function K(e) {
        for (;U.length<=e;)U.push(J(U)+' '); return U[e];
      } function J(e) {
        return e[e.length-1];
      } function Y(e, t) {
        for (var n=[], r=0; r<e.length; r++)n[r]=t(e[r], r); return n;
      } function G() {} function X(e, t) {
        let n; return Object.create?n=Object.create(e):(G.prototype=e, n=new G), t&&F(t, n), n;
      } const Z=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/; function Q(e) {
        return /\w/.test(e)||e>''&&(e.toUpperCase()!=e.toLowerCase()||Z.test(e));
      } function ee(e, t) {
        return t?!!(t.source.indexOf('\\w')>-1&&Q(e))||t.test(e):Q(e);
      } function te(e) {
        for (const t in e) if (e.hasOwnProperty(t)&&e[t]) return !1; return !0;
      } const ne=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/; function re(e) {
        return e.charCodeAt(0)>=768&&ne.test(e);
      } function ie(e, t, n) {
        for (;(n<0?t>0:t<e.length)&&re(e.charAt(t));)t+=n; return t;
      } function oe(e, t, n) {
        for (let r=t>n?-1:1; ;) {
          if (t==n) return t; const i=(t+n)/2; const o=r<0?Math.ceil(i):Math.floor(i); if (o==t) return e(o)?t:n; e(o)?n=o:t=o+r;
        }
      } let se=null; function ae(e, t, n) {
        let r; se=null; for (let i=0; i<e.length; ++i) {
          const o=e[i]; if (o.from<t&&o.to>t) return i; o.to==t&&(o.from!=o.to&&'before'==n?r=i:se=i), o.from==t&&(o.from!=o.to&&'before'!=n?r=i:se=i);
        } return null!=r?r:se;
      } const le=function() {
        const e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/; const t=/[stwN]/; const n=/[LRr]/; const r=/[Lb1n]/; const i=/[1n]/; function o(e, t, n) {
          this.level=e, this.from=t, this.to=n;
        } return function(s, a) {
          let l; const c='ltr'==a?'L':'R'; if (0==s.length||'ltr'==a&&!e.test(s)) return !1; for (var u=s.length, d=[], h=0; h<u; ++h)d.push((l=s.charCodeAt(h))<=247?'bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN'.charAt(l):1424<=l&&l<=1524?'R':1536<=l&&l<=1785?'nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111'.charAt(l-1536):1774<=l&&l<=2220?'r':8192<=l&&l<=8203?'w':8204==l?'b':'L'); for (let p=0, f=c; p<u; ++p) {
            const m=d[p]; 'm'==m?d[p]=f:f=m;
          } for (let g=0, v=c; g<u; ++g) {
            const y=d[g]; '1'==y&&'r'==v?d[g]='n':n.test(y)&&(v=y, 'r'==y&&(d[g]='R'));
          } for (let b=1, w=d[0]; b<u-1; ++b) {
            const x=d[b]; '+'==x&&'1'==w&&'1'==d[b+1]?d[b]='1':','!=x||w!=d[b+1]||'1'!=w&&'n'!=w||(d[b]=w), w=x;
          } for (let k=0; k<u; ++k) {
            const _=d[k]; if (','==_)d[k]='N'; else if ('%'==_) {
              let S=void 0; for (S=k+1; S<u&&'%'==d[S]; ++S);for (let C=k&&'!'==d[k-1]||S<u&&'1'==d[S]?'1':'N', M=k; M<S; ++M)d[M]=C; k=S-1;
            }
          } for (let T=0, O=c; T<u; ++T) {
            const D=d[T]; 'L'==O&&'1'==D?d[T]='L':n.test(D)&&(O=D);
          } for (let E=0; E<u; ++E) {
            if (t.test(d[E])) {
              let N=void 0; for (N=E+1; N<u&&t.test(d[N]); ++N);for (let A='L'==(E?d[E-1]:c), L=A==('L'==(N<u?d[N]:c))?A?'L':'R':c, z=E; z<N; ++z)d[z]=L; E=N-1;
            }
          } for (var I, q=[], F=0; F<u;) {
            if (r.test(d[F])) {
              const P=F; for (++F; F<u&&r.test(d[F]); ++F);q.push(new o(0, P, F));
            } else {
              let R=F; let B=q.length; const j='rtl'==a?1:0; for (++F; F<u&&'L'!=d[F]; ++F);for (let W=R; W<F;) {
                if (i.test(d[W])) {
                  R<W&&(q.splice(B, 0, new o(1, R, W)), B+=j); const H=W; for (++W; W<F&&i.test(d[W]); ++W);q.splice(B, 0, new o(2, H, W)), B+=j, R=W;
                } else ++W;
              } R<F&&q.splice(B, 0, new o(1, R, F));
            }
          } return 'ltr'==a&&(1==q[0].level&&(I=s.match(/^\s+/))&&(q[0].from=I[0].length, q.unshift(new o(0, 0, I[0].length))), 1==J(q).level&&(I=s.match(/\s+$/))&&(J(q).to-=I[0].length, q.push(new o(0, u-I[0].length, u)))), 'rtl'==a?q.reverse():q;
        };
      }(); function ce(e, t) {
        let n=e.order; return null==n&&(n=e.order=le(e.text, t)), n;
      } const ue=[]; const de=function(e, t, n) {
        if (e.addEventListener)e.addEventListener(t, n, !1); else if (e.attachEvent)e.attachEvent('on'+t, n); else {
          const r=e._handlers||(e._handlers={}); r[t]=(r[t]||ue).concat(n);
        }
      }; function he(e, t) {
        return e._handlers&&e._handlers[t]||ue;
      } function pe(e, t, n) {
        if (e.removeEventListener)e.removeEventListener(t, n, !1); else if (e.detachEvent)e.detachEvent('on'+t, n); else {
          const r=e._handlers; const i=r&&r[t]; if (i) {
            const o=B(i, n); o>-1&&(r[t]=i.slice(0, o).concat(i.slice(o+1)));
          }
        }
      } function fe(e, t) {
        const n=he(e, t); if (n.length) for (let r=Array.prototype.slice.call(arguments, 2), i=0; i<n.length; ++i)n[i].apply(null, r);
      } function me(e, t, n) {
        return 'string'==typeof t&&(t={type: t, preventDefault: function() {
          this.defaultPrevented=!0;
        }}), fe(e, n||t.type, e, t), xe(t)||t.codemirrorIgnore;
      } function ge(e) {
        const t=e._handlers&&e._handlers.cursorActivity; if (t) for (let n=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]), r=0; r<t.length; ++r)-1==B(n, t[r])&&n.push(t[r]);
      } function ve(e, t) {
        return he(e, t).length>0;
      } function ye(e) {
        e.prototype.on=function(e, t) {
          de(this, e, t);
        }, e.prototype.off=function(e, t) {
          pe(this, e, t);
        };
      } function be(e) {
e.preventDefault?e.preventDefault():e.returnValue=!1;
      } function we(e) {
e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;
      } function xe(e) {
        return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue;
      } function ke(e) {
        be(e), we(e);
      } function _e(e) {
        return e.target||e.srcElement;
      } function Se(e) {
        let t=e.which; return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)), y&&e.ctrlKey&&1==t&&(t=3), t;
      } let Ce; let Me; const Te=function() {
        if (s&&a<9) return !1; const e=D('div'); return 'draggable'in e||'dragDrop'in e;
      }(); function Oe(e) {
        if (null==Ce) {
          const t=D('span', '​'); O(e, D('span', [t, document.createTextNode('x')])), 0!=e.firstChild.offsetHeight&&(Ce=t.offsetWidth<=1&&t.offsetHeight>2&&!(s&&a<8));
        } const n=Ce?D('span', '​'):D('span', ' ', null, 'display: inline-block; width: 1px; margin-right: -1px'); return n.setAttribute('cm-text', ''), n;
      } function De(e) {
        if (null!=Me) return Me; const t=O(e, document.createTextNode('AخA')); const n=C(t, 0, 1).getBoundingClientRect(); const r=C(t, 1, 2).getBoundingClientRect(); return T(e), !(!n||n.left==n.right)&&(Me=r.right-n.right<3);
      } let Ee; const Ne=3!='\n\nb'.split(/\n/).length?function(e) {
        for (var t=0, n=[], r=e.length; t<=r;) {
          let i=e.indexOf('\n', t); -1==i&&(i=e.length); const o=e.slice(t, '\r'==e.charAt(i-1)?i-1:i); const s=o.indexOf('\r'); -1!=s?(n.push(o.slice(0, s)), t+=s+1):(n.push(o), t=i+1);
        } return n;
      }:function(e) {
        return e.split(/\r\n?|\n/);
      }; const Ae=window.getSelection?function(e) {
        try {
          return e.selectionStart!=e.selectionEnd;
        } catch (e) {
          return !1;
        }
      }:function(e) {
        let t; try {
          t=e.ownerDocument.selection.createRange();
        } catch (e) {} return !(!t||t.parentElement()!=e)&&0!=t.compareEndPoints('StartToEnd', t);
      }; const Le='oncopy'in(Ee=D('div'))||(Ee.setAttribute('oncopy', 'return;'), 'function'==typeof Ee.oncopy); let ze=null; const Ie={}; const qe={}; function Fe(e, t) {
        arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments, 2)), Ie[e]=t;
      } function Pe(e) {
        if ('string'==typeof e&&qe.hasOwnProperty(e))e=qe[e]; else if (e&&'string'==typeof e.name&&qe.hasOwnProperty(e.name)) {
          let t=qe[e.name]; 'string'==typeof t&&(t={name: t}), (e=X(t, e)).name=t.name;
        } else {
          if ('string'==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return Pe('application/xml'); if ('string'==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e)) return Pe('application/json');
        } return 'string'==typeof e?{name: e}:e||{name: 'null'};
      } function Re(e, t) {
        t=Pe(t); const n=Ie[t.name]; if (!n) return Re(e, 'text/plain'); const r=n(e, t); if (Be.hasOwnProperty(t.name)) {
          const i=Be[t.name]; for (const o in i)i.hasOwnProperty(o)&&(r.hasOwnProperty(o)&&(r['_'+o]=r[o]), r[o]=i[o]);
        } if (r.name=t.name, t.helperType&&(r.helperType=t.helperType), t.modeProps) for (const s in t.modeProps)r[s]=t.modeProps[s]; return r;
      } var Be={}; function je(e, t) {
        F(t, Be.hasOwnProperty(e)?Be[e]:Be[e]={});
      } function We(e, t) {
        if (!0===t) return t; if (e.copyState) return e.copyState(t); const n={}; for (const r in t) {
          let i=t[r]; i instanceof Array&&(i=i.concat([])), n[r]=i;
        } return n;
      } function He(e, t) {
        for (var n; e.innerMode&&(n=e.innerMode(t))&&n.mode!=e;)t=n.state, e=n.mode; return n||{mode: e, state: t};
      } function Ve(e, t, n) {
        return !e.startState||e.startState(t, n);
      } const $e=function(e, t, n) {
        this.pos=this.start=0, this.string=e, this.tabSize=t||8, this.lastColumnPos=this.lastColumnValue=0, this.lineStart=0, this.lineOracle=n;
      }; function Ue(e, t) {
        if ((t-=e.first)<0||t>=e.size) throw new Error('There is no line '+(t+e.first)+' in the document.'); for (var n=e; !n.lines;) {
          for (let r=0; ;++r) {
            const i=n.children[r]; const o=i.chunkSize(); if (t<o) {
              n=i; break;
            }t-=o;
          }
        } return n.lines[t];
      } function Ke(e, t, n) {
        const r=[]; let i=t.line; return e.iter(t.line, n.line+1, (function(e) {
          let o=e.text; i==n.line&&(o=o.slice(0, n.ch)), i==t.line&&(o=o.slice(t.ch)), r.push(o), ++i;
        })), r;
      } function Je(e, t, n) {
        const r=[]; return e.iter(t, n, (function(e) {
          r.push(e.text);
        })), r;
      } function Ye(e, t) {
        const n=t-e.height; if (n) for (let r=e; r; r=r.parent)r.height+=n;
      } function Ge(e) {
        if (null==e.parent) return null; for (var t=e.parent, n=B(t.lines, e), r=t.parent; r; t=r, r=r.parent) for (let i=0; r.children[i]!=t; ++i)n+=r.children[i].chunkSize(); return n+t.first;
      } function Xe(e, t) {
        let n=e.first; e:do {
          for (let r=0; r<e.children.length; ++r) {
            const i=e.children[r]; const o=i.height; if (t<o) {
              e=i; continue e;
            }t-=o, n+=i.chunkSize();
          } return n;
        } while (!e.lines); for (var s=0; s<e.lines.length; ++s) {
          const a=e.lines[s].height; if (t<a) break; t-=a;
        } return n+s;
      } function Ze(e, t) {
        return t>=e.first&&t<e.first+e.size;
      } function Qe(e, t) {
        return String(e.lineNumberFormatter(t+e.firstLineNumber));
      } function et(e, t, n) {
        if (void 0===n&&(n=null), !(this instanceof et)) return new et(e, t, n); this.line=e, this.ch=t, this.sticky=n;
      } function tt(e, t) {
        return e.line-t.line||e.ch-t.ch;
      } function nt(e, t) {
        return e.sticky==t.sticky&&0==tt(e, t);
      } function rt(e) {
        return et(e.line, e.ch);
      } function it(e, t) {
        return tt(e, t)<0?t:e;
      } function ot(e, t) {
        return tt(e, t)<0?e:t;
      } function st(e, t) {
        return Math.max(e.first, Math.min(t, e.first+e.size-1));
      } function at(e, t) {
        if (t.line<e.first) return et(e.first, 0); const n=e.first+e.size-1; return t.line>n?et(n, Ue(e, n).text.length):function(e, t) {
          const n=e.ch; return null==n||n>t?et(e.line, t):n<0?et(e.line, 0):e;
        }(t, Ue(e, t.line).text.length);
      } function lt(e, t) {
        for (var n=[], r=0; r<t.length; r++)n[r]=at(e, t[r]); return n;
      }$e.prototype.eol=function() {
        return this.pos>=this.string.length;
      }, $e.prototype.sol=function() {
        return this.pos==this.lineStart;
      }, $e.prototype.peek=function() {
        return this.string.charAt(this.pos)||void 0;
      }, $e.prototype.next=function() {
        if (this.pos<this.string.length) return this.string.charAt(this.pos++);
      }, $e.prototype.eat=function(e) {
        const t=this.string.charAt(this.pos); if ('string'==typeof e?t==e:t&&(e.test?e.test(t):e(t))) return ++this.pos, t;
      }, $e.prototype.eatWhile=function(e) {
        for (var t=this.pos; this.eat(e););return this.pos>t;
      }, $e.prototype.eatSpace=function() {
        for (var e=this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos; return this.pos>e;
      }, $e.prototype.skipToEnd=function() {
        this.pos=this.string.length;
      }, $e.prototype.skipTo=function(e) {
        const t=this.string.indexOf(e, this.pos); if (t>-1) return this.pos=t, !0;
      }, $e.prototype.backUp=function(e) {
        this.pos-=e;
      }, $e.prototype.column=function() {
        return this.lastColumnPos<this.start&&(this.lastColumnValue=P(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos=this.start), this.lastColumnValue-(this.lineStart?P(this.string, this.lineStart, this.tabSize):0);
      }, $e.prototype.indentation=function() {
        return P(this.string, null, this.tabSize)-(this.lineStart?P(this.string, this.lineStart, this.tabSize):0);
      }, $e.prototype.match=function(e, t, n) {
        if ('string'!=typeof e) {
          const r=this.string.slice(this.pos).match(e); return r&&r.index>0?null:(r&&!1!==t&&(this.pos+=r[0].length), r);
        } const i=function(e) {
          return n?e.toLowerCase():e;
        }; if (i(this.string.substr(this.pos, e.length))==i(e)) return !1!==t&&(this.pos+=e.length), !0;
      }, $e.prototype.current=function() {
        return this.string.slice(this.start, this.pos);
      }, $e.prototype.hideFirstChars=function(e, t) {
        this.lineStart+=e; try {
          return t();
        } finally {
          this.lineStart-=e;
        }
      }, $e.prototype.lookAhead=function(e) {
        const t=this.lineOracle; return t&&t.lookAhead(e);
      }, $e.prototype.baseToken=function() {
        const e=this.lineOracle; return e&&e.baseToken(this.pos);
      }; const ct=function(e, t) {
        this.state=e, this.lookAhead=t;
      }; const ut=function(e, t, n, r) {
        this.state=t, this.doc=e, this.line=n, this.maxLookAhead=r||0, this.baseTokens=null, this.baseTokenPos=1;
      }; function dt(e, t, n, r) {
        const i=[e.state.modeGen]; const o={}; wt(e, t.text, e.doc.mode, n, (function(e, t) {
          return i.push(e, t);
        }), o, r); for (var s=n.state, a=function(r) {
            n.baseTokens=i; const a=e.state.overlays[r]; let l=1; let c=0; n.state=!0, wt(e, t.text, a.mode, n, (function(e, t) {
              for (var n=l; c<e;) {
                const r=i[l]; r>e&&i.splice(l, 1, e, i[l+1], r), l+=2, c=Math.min(e, r);
              } if (t) {
                if (a.opaque)i.splice(n, l-n, e, 'overlay '+t), l=n+2; else {
                  for (;n<l; n+=2) {
                    const o=i[n+1]; i[n+1]=(o?o+' ':'')+'overlay '+t;
                  }
                }
              }
            }), o), n.state=s, n.baseTokens=null, n.baseTokenPos=1;
          }, l=0; l<e.state.overlays.length; ++l)a(l); return {styles: i, classes: o.bgClass||o.textClass?o:null};
      } function ht(e, t, n) {
        if (!t.styles||t.styles[0]!=e.state.modeGen) {
          const r=pt(e, Ge(t)); const i=t.text.length>e.options.maxHighlightLength&&We(e.doc.mode, r.state); const o=dt(e, t, r); i&&(r.state=i), t.stateAfter=r.save(!i), t.styles=o.styles, o.classes?t.styleClasses=o.classes:t.styleClasses&&(t.styleClasses=null), n===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        } return t.styles;
      } function pt(e, t, n) {
        const r=e.doc; const i=e.display; if (!r.mode.startState) return new ut(r, !0, t); const o=function(e, t, n) {
          for (var r, i, o=e.doc, s=n?-1:t-(e.doc.mode.innerMode?1e3:100), a=t; a>s; --a) {
            if (a<=o.first) return o.first; const l=Ue(o, a-1); const c=l.stateAfter; if (c&&(!n||a+(c instanceof ct?c.lookAhead:0)<=o.modeFrontier)) return a; const u=P(l.text, null, e.options.tabSize); (null==i||r>u)&&(i=a-1, r=u);
          } return i;
        }(e, t, n); const s=o>r.first&&Ue(r, o-1).stateAfter; const a=s?ut.fromSaved(r, s, o):new ut(r, Ve(r.mode), o); return r.iter(o, t, (function(n) {
          ft(e, n.text, a); const r=a.line; n.stateAfter=r==t-1||r%5==0||r>=i.viewFrom&&r<i.viewTo?a.save():null, a.nextLine();
        })), n&&(r.modeFrontier=a.line), a;
      } function ft(e, t, n, r) {
        const i=e.doc.mode; const o=new $e(t, e.options.tabSize, n); for (o.start=o.pos=r||0, ''==t&&mt(i, n.state); !o.eol();)gt(i, o, n.state), o.start=o.pos;
      } function mt(e, t) {
        if (e.blankLine) return e.blankLine(t); if (e.innerMode) {
          const n=He(e, t); return n.mode.blankLine?n.mode.blankLine(n.state):void 0;
        }
      } function gt(e, t, n, r) {
        for (let i=0; i<10; i++) {
          r&&(r[0]=He(e, n).mode); const o=e.token(t, n); if (t.pos>t.start) return o;
        } throw new Error('Mode '+e.name+' failed to advance stream.');
      }ut.prototype.lookAhead=function(e) {
        const t=this.doc.getLine(this.line+e); return null!=t&&e> this.maxLookAhead&&(this.maxLookAhead=e), t;
      }, ut.prototype.baseToken=function(e) {
        if (!this.baseTokens) return null; for (;this.baseTokens[this.baseTokenPos]<=e;) this.baseTokenPos+=2; const t=this.baseTokens[this.baseTokenPos+1]; return {type: t&&t.replace(/( |^)overlay .*/, ''), size: this.baseTokens[this.baseTokenPos]-e};
      }, ut.prototype.nextLine=function() {
        this.line++, this.maxLookAhead>0&&this.maxLookAhead--;
      }, ut.fromSaved=function(e, t, n) {
        return t instanceof ct?new ut(e, We(e.mode, t.state), n, t.lookAhead):new ut(e, We(e.mode, t), n);
      }, ut.prototype.save=function(e) {
        const t=!1!==e?We(this.doc.mode, this.state):this.state; return this.maxLookAhead>0?new ct(t, this.maxLookAhead):t;
      }; const vt=function(e, t, n) {
        this.start=e.start, this.end=e.pos, this.string=e.current(), this.type=t||null, this.state=n;
      }; function yt(e, t, n, r) {
        let i; let o; const s=e.doc; const a=s.mode; const l=Ue(s, (t=at(s, t)).line); const c=pt(e, t.line, n); const u=new $e(l.text, e.options.tabSize, c); for (r&&(o=[]); (r||u.pos<t.ch)&&!u.eol();)u.start=u.pos, i=gt(a, u, c.state), r&&o.push(new vt(u, i, We(s.mode, c.state))); return r?o:new vt(u, i, c.state);
      } function bt(e, t) {
        if (e) {
          for (;;) {
            const n=e.match(/(?:^|\s+)line-(background-)?(\S+)/); if (!n) break; e=e.slice(0, n.index)+e.slice(n.index+n[0].length); const r=n[1]?'bgClass':'textClass'; null==t[r]?t[r]=n[2]:new RegExp('(?:^|\\s)'+n[2]+'(?:$|\\s)').test(t[r])||(t[r]+=' '+n[2]);
          }
        } return e;
      } function wt(e, t, n, r, i, o, s) {
        let a=n.flattenSpans; null==a&&(a=e.options.flattenSpans); let l; let c=0; let u=null; const d=new $e(t, e.options.tabSize, r); const h=e.options.addModeClass&&[null]; for (''==t&&bt(mt(n, r.state), o); !d.eol();) {
          if (d.pos>e.options.maxHighlightLength?(a=!1, s&&ft(e, t, r, d.pos), d.pos=t.length, l=null):l=bt(gt(n, d, r.state, h), o), h) {
            const p=h[0].name; p&&(l='m-'+(l?p+' '+l:p));
          } if (!a||u!=l) {
            for (;c<d.start;)i(c=Math.min(d.start, c+5e3), u); u=l;
          }d.start=d.pos;
        } for (;c<d.pos;) {
          const f=Math.min(d.pos, c+5e3); i(f, u), c=f;
        }
      } let xt=!1; let kt=!1; function _t(e, t, n) {
        this.marker=e, this.from=t, this.to=n;
      } function St(e, t) {
        if (e) {
          for (let n=0; n<e.length; ++n) {
            const r=e[n]; if (r.marker==t) return r;
          }
        }
      } function Ct(e, t) {
        for (var n, r=0; r<e.length; ++r)e[r]!=t&&(n||(n=[])).push(e[r]); return n;
      } function Mt(e, t) {
        if (t.full) return null; const n=Ze(e, t.from.line)&&Ue(e, t.from.line).markedSpans; const r=Ze(e, t.to.line)&&Ue(e, t.to.line).markedSpans; if (!n&&!r) return null; const i=t.from.ch; const o=t.to.ch; const s=0==tt(t.from, t.to); let a=function(e, t, n) {
          let r; if (e) {
            for (let i=0; i<e.length; ++i) {
              const o=e[i]; const s=o.marker; if (null==o.from||(s.inclusiveLeft?o.from<=t:o.from<t)||o.from==t&&'bookmark'==s.type&&(!n||!o.marker.insertLeft)) {
                const a=null==o.to||(s.inclusiveRight?o.to>=t:o.to>t); (r||(r=[])).push(new _t(s, o.from, a?null:o.to));
              }
            }
          } return r;
        }(n, i, s); let l=function(e, t, n) {
          let r; if (e) {
            for (let i=0; i<e.length; ++i) {
              const o=e[i]; const s=o.marker; if (null==o.to||(s.inclusiveRight?o.to>=t:o.to>t)||o.from==t&&'bookmark'==s.type&&(!n||o.marker.insertLeft)) {
                const a=null==o.from||(s.inclusiveLeft?o.from<=t:o.from<t); (r||(r=[])).push(new _t(s, a?null:o.from-t, null==o.to?null:o.to-t));
              }
            }
          } return r;
        }(r, o, s); const c=1==t.text.length; const u=J(t.text).length+(c?i:0); if (a) {
          for (let d=0; d<a.length; ++d) {
            const h=a[d]; if (null==h.to) {
              const p=St(l, h.marker); p?c&&(h.to=null==p.to?null:p.to+u):h.to=i;
            }
          }
        } if (l) {
          for (let f=0; f<l.length; ++f) {
            const m=l[f]; null!=m.to&&(m.to+=u), null==m.from?St(a, m.marker)||(m.from=u, c&&(a||(a=[])).push(m)):(m.from+=u, c&&(a||(a=[])).push(m));
          }
        }a&&(a=Tt(a)), l&&l!=a&&(l=Tt(l)); const g=[a]; if (!c) {
          let v; const y=t.text.length-2; if (y>0&&a) for (let b=0; b<a.length; ++b)null==a[b].to&&(v||(v=[])).push(new _t(a[b].marker, null, null)); for (let w=0; w<y; ++w)g.push(v); g.push(l);
        } return g;
      } function Tt(e) {
        for (let t=0; t<e.length; ++t) {
          const n=e[t]; null!=n.from&&n.from==n.to&&!1!==n.marker.clearWhenEmpty&&e.splice(t--, 1);
        } return e.length?e:null;
      } function Ot(e) {
        const t=e.markedSpans; if (t) {
          for (let n=0; n<t.length; ++n)t[n].marker.detachLine(e); e.markedSpans=null;
        }
      } function Dt(e, t) {
        if (t) {
          for (let n=0; n<t.length; ++n)t[n].marker.attachLine(e); e.markedSpans=t;
        }
      } function Et(e) {
        return e.inclusiveLeft?-1:0;
      } function Nt(e) {
        return e.inclusiveRight?1:0;
      } function At(e, t) {
        const n=e.lines.length-t.lines.length; if (0!=n) return n; const r=e.find(); const i=t.find(); const o=tt(r.from, i.from)||Et(e)-Et(t); return o?-o:tt(r.to, i.to)||Nt(e)-Nt(t)||t.id-e.id;
      } function Lt(e, t) {
        let n; const r=kt&&e.markedSpans; if (r) for (let i=void 0, o=0; o<r.length; ++o)(i=r[o]).marker.collapsed&&null==(t?i.from:i.to)&&(!n||At(n, i.marker)<0)&&(n=i.marker); return n;
      } function zt(e) {
        return Lt(e, !0);
      } function It(e) {
        return Lt(e, !1);
      } function qt(e, t) {
        let n; const r=kt&&e.markedSpans; if (r) {
          for (let i=0; i<r.length; ++i) {
            const o=r[i]; o.marker.collapsed&&(null==o.from||o.from<t)&&(null==o.to||o.to>t)&&(!n||At(n, o.marker)<0)&&(n=o.marker);
          }
        } return n;
      } function Ft(e, t, n, r, i) {
        const o=Ue(e, t); const s=kt&&o.markedSpans; if (s) {
          for (let a=0; a<s.length; ++a) {
            const l=s[a]; if (l.marker.collapsed) {
              const c=l.marker.find(0); const u=tt(c.from, n)||Et(l.marker)-Et(i); const d=tt(c.to, r)||Nt(l.marker)-Nt(i); if (!(u>=0&&d<=0||u<=0&&d>=0)&&(u<=0&&(l.marker.inclusiveRight&&i.inclusiveLeft?tt(c.to, n)>=0:tt(c.to, n)>0)||u>=0&&(l.marker.inclusiveRight&&i.inclusiveLeft?tt(c.from, r)<=0:tt(c.from, r)<0))) return !0;
            }
          }
        }
      } function Pt(e) {
        for (var t; t=zt(e);)e=t.find(-1, !0).line; return e;
      } function Rt(e, t) {
        const n=Ue(e, t); const r=Pt(n); return n==r?t:Ge(r);
      } function Bt(e, t) {
        if (t>e.lastLine()) return t; let n; let r=Ue(e, t); if (!jt(e, r)) return t; for (;n=It(r);)r=n.find(1, !0).line; return Ge(r)+1;
      } function jt(e, t) {
        const n=kt&&t.markedSpans; if (n) {
          for (let r=void 0, i=0; i<n.length; ++i) {
            if ((r=n[i]).marker.collapsed) {
              if (null==r.from) return !0; if (!r.marker.widgetNode&&0==r.from&&r.marker.inclusiveLeft&&Wt(e, t, r)) return !0;
            }
          }
        }
      } function Wt(e, t, n) {
        if (null==n.to) {
          const r=n.marker.find(1, !0); return Wt(e, r.line, St(r.line.markedSpans, n.marker));
        } if (n.marker.inclusiveRight&&n.to==t.text.length) return !0; for (let i=void 0, o=0; o<t.markedSpans.length; ++o) if ((i=t.markedSpans[o]).marker.collapsed&&!i.marker.widgetNode&&i.from==n.to&&(null==i.to||i.to!=n.from)&&(i.marker.inclusiveLeft||n.marker.inclusiveRight)&&Wt(e, t, i)) return !0;
      } function Ht(e) {
        for (var t=0, n=(e=Pt(e)).parent, r=0; r<n.lines.length; ++r) {
          const i=n.lines[r]; if (i==e) break; t+=i.height;
        } for (let o=n.parent; o; o=(n=o).parent) {
          for (let s=0; s<o.children.length; ++s) {
            const a=o.children[s]; if (a==n) break; t+=a.height;
          }
        } return t;
      } function Vt(e) {
        if (0==e.height) return 0; for (var t, n=e.text.length, r=e; t=zt(r);) {
          const i=t.find(0, !0); r=i.from.line, n+=i.from.ch-i.to.ch;
        } for (r=e; t=It(r);) {
          const o=t.find(0, !0); n-=r.text.length-o.from.ch, n+=(r=o.to.line).text.length-o.to.ch;
        } return n;
      } function $t(e) {
        const t=e.display; const n=e.doc; t.maxLine=Ue(n, n.first), t.maxLineLength=Vt(t.maxLine), t.maxLineChanged=!0, n.iter((function(e) {
          const n=Vt(e); n>t.maxLineLength&&(t.maxLineLength=n, t.maxLine=e);
        }));
      } const Ut=function(e, t, n) {
        this.text=e, Dt(this, t), this.height=n?n(this):1;
      }; function Kt(e) {
        e.parent=null, Ot(e);
      }Ut.prototype.lineNo=function() {
        return Ge(this);
      }, ye(Ut); const Jt={}; const Yt={}; function Gt(e, t) {
        if (!e||/^\s*$/.test(e)) return null; const n=t.addModeClass?Yt:Jt; return n[e]||(n[e]=e.replace(/\S+/g, 'cm-$&'));
      } function Xt(e, t) {
        const n=E('span', null, null, l?'padding-right: .1px':null); const r={pre: E('pre', [n], 'CodeMirror-line'), content: n, col: 0, pos: 0, cm: e, trailingSpace: !1, splitSpaces: e.getOption('lineWrapping')}; t.measure={}; for (let i=0; i<=(t.rest?t.rest.length:0); i++) {
          const o=i?t.rest[i-1]:t.line; let s=void 0; r.pos=0, r.addToken=Qt, De(e.display.measure)&&(s=ce(o, e.doc.direction))&&(r.addToken=en(r.addToken, s)), r.map=[], nn(o, r, ht(e, o, t!=e.display.externalMeasured&&Ge(o))), o.styleClasses&&(o.styleClasses.bgClass&&(r.bgClass=z(o.styleClasses.bgClass, r.bgClass||'')), o.styleClasses.textClass&&(r.textClass=z(o.styleClasses.textClass, r.textClass||''))), 0==r.map.length&&r.map.push(0, 0, r.content.appendChild(Oe(e.display.measure))), 0==i?(t.measure.map=r.map, t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(r.map), (t.measure.caches||(t.measure.caches=[])).push({}));
        } if (l) {
          const a=r.content.lastChild; (/\bcm-tab\b/.test(a.className)||a.querySelector&&a.querySelector('.cm-tab'))&&(r.content.className='cm-tab-wrap-hack');
        } return fe(e, 'renderLine', e, t.line, r.pre), r.pre.className&&(r.textClass=z(r.pre.className, r.textClass||'')), r;
      } function Zt(e) {
        const t=D('span', '•', 'cm-invalidchar'); return t.title='\\u'+e.charCodeAt(0).toString(16), t.setAttribute('aria-label', t.title), t;
      } function Qt(e, t, n, r, i, o, l) {
        if (t) {
          let c; const u=e.splitSpaces?function(e, t) {
            if (e.length>1&&!/  /.test(e)) return e; for (var n=t, r='', i=0; i<e.length; i++) {
              let o=e.charAt(i); ' '!=o||!n||i!=e.length-1&&32!=e.charCodeAt(i+1)||(o=' '), r+=o, n=' '==o;
            } return r;
          }(t, e.trailingSpace):t; const d=e.cm.state.specialChars; let h=!1; if (d.test(t)) {
            c=document.createDocumentFragment(); for (let p=0; ;) {
              d.lastIndex=p; const f=d.exec(t); const m=f?f.index-p:t.length-p; if (m) {
                const g=document.createTextNode(u.slice(p, p+m)); s&&a<9?c.appendChild(D('span', [g])):c.appendChild(g), e.map.push(e.pos, e.pos+m, g), e.col+=m, e.pos+=m;
              } if (!f) break; p+=m+1; let v=void 0; if ('\t'==f[0]) {
                const y=e.cm.options.tabSize; const b=y-e.col%y; (v=c.appendChild(D('span', K(b), 'cm-tab'))).setAttribute('role', 'presentation'), v.setAttribute('cm-text', '\t'), e.col+=b;
              } else '\r'==f[0]||'\n'==f[0]?((v=c.appendChild(D('span', '\r'==f[0]?'␍':'␤', 'cm-invalidchar'))).setAttribute('cm-text', f[0]), e.col+=1):((v=e.cm.options.specialCharPlaceholder(f[0])).setAttribute('cm-text', f[0]), s&&a<9?c.appendChild(D('span', [v])):c.appendChild(v), e.col+=1); e.map.push(e.pos, e.pos+1, v), e.pos++;
            }
          } else e.col+=t.length, c=document.createTextNode(u), e.map.push(e.pos, e.pos+t.length, c), s&&a<9&&(h=!0), e.pos+=t.length; if (e.trailingSpace=32==u.charCodeAt(t.length-1), n||r||i||h||o||l) {
            let w=n||''; r&&(w+=r), i&&(w+=i); const x=D('span', [c], w, o); if (l) for (const k in l)l.hasOwnProperty(k)&&'style'!=k&&'class'!=k&&x.setAttribute(k, l[k]); return e.content.appendChild(x);
          }e.content.appendChild(c);
        }
      } function en(e, t) {
        return function(n, r, i, o, s, a, l) {
          i=i?i+' cm-force-border':'cm-force-border'; for (let c=n.pos, u=c+r.length; ;) {
            for (var d=void 0, h=0; h<t.length&&!((d=t[h]).to>c&&d.from<=c); h++);if (d.to>=u) return e(n, r, i, o, s, a, l); e(n, r.slice(0, d.to-c), i, o, null, a, l), o=null, r=r.slice(d.to-c), c=d.to;
          }
        };
      } function tn(e, t, n, r) {
        let i=!r&&n.widgetNode; i&&e.map.push(e.pos, e.pos+t, i), !r&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement('span'))), i.setAttribute('cm-marker', n.id)), i&&(e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos+=t, e.trailingSpace=!1;
      } function nn(e, t, n) {
        const r=e.markedSpans; const i=e.text; let o=0; if (r) {
          for (var s, a, l, c, u, d, h, p=i.length, f=0, m=1, g='', v=0; ;) {
            if (v==f) {
              l=c=u=a='', h=null, d=null, v=1/0; for (var y=[], b=void 0, w=0; w<r.length; ++w) {
                const x=r[w]; const k=x.marker; if ('bookmark'==k.type&&x.from==f&&k.widgetNode)y.push(k); else if (x.from<=f&&(null==x.to||x.to>f||k.collapsed&&x.to==f&&x.from==f)) {
                  if (null!=x.to&&x.to!=f&&v>x.to&&(v=x.to, c=''), k.className&&(l+=' '+k.className), k.css&&(a=(a?a+';':'')+k.css), k.startStyle&&x.from==f&&(u+=' '+k.startStyle), k.endStyle&&x.to==v&&(b||(b=[])).push(k.endStyle, x.to), k.title&&((h||(h={})).title=k.title), k.attributes) for (const _ in k.attributes)(h||(h={}))[_]=k.attributes[_]; k.collapsed&&(!d||At(d.marker, k)<0)&&(d=x);
                } else x.from>f&&v>x.from&&(v=x.from);
              } if (b) for (let S=0; S<b.length; S+=2)b[S+1]==v&&(c+=' '+b[S]); if (!d||d.from==f) for (let C=0; C<y.length; ++C)tn(t, 0, y[C]); if (d&&(d.from||0)==f) {
                if (tn(t, (null==d.to?p+1:d.to)-f, d.marker, null==d.from), null==d.to) return; d.to==f&&(d=!1);
              }
            } if (f>=p) break; for (let M=Math.min(p, v); ;) {
              if (g) {
                const T=f+g.length; if (!d) {
                  const O=T>M?g.slice(0, M-f):g; t.addToken(t, O, s?s+l:l, u, f+O.length==v?c:'', a, h);
                } if (T>=M) {
                  g=g.slice(M-f), f=M; break;
                }f=T, u='';
              }g=i.slice(o, o=n[m++]), s=Gt(n[m++], t.cm.options);
            }
          }
        } else for (let D=1; D<n.length; D+=2)t.addToken(t, i.slice(o, o=n[D]), Gt(n[D+1], t.cm.options));
      } function rn(e, t, n) {
        this.line=t, this.rest=function(e) {
          for (var t, n; t=It(e);)e=t.find(1, !0).line, (n||(n=[])).push(e); return n;
        }(t), this.size=this.rest?Ge(J(this.rest))-n+1:1, this.node=this.text=null, this.hidden=jt(e, t);
      } function on(e, t, n) {
        for (var r, i=[], o=t; o<n; o=r) {
          const s=new rn(e.doc, Ue(e.doc, o), o); r=o+s.size, i.push(s);
        } return i;
      } let sn=null; let an=null; function ln(e, t) {
        const n=he(e, t); if (n.length) {
          let r; const i=Array.prototype.slice.call(arguments, 2); sn?r=sn.delayedCallbacks:an?r=an:(r=an=[], setTimeout(cn, 0)); for (let o=function(e) {
              r.push((function() {
                return n[e].apply(null, i);
              }));
            }, s=0; s<n.length; ++s)o(s);
        }
      } function cn() {
        const e=an; an=null; for (let t=0; t<e.length; ++t)e[t]();
      } function un(e, t, n, r) {
        for (let i=0; i<t.changes.length; i++) {
          const o=t.changes[i]; 'text'==o?pn(e, t):'gutter'==o?mn(e, t, n, r):'class'==o?fn(e, t):'widget'==o&&gn(e, t, r);
        }t.changes=null;
      } function dn(e) {
        return e.node==e.text&&(e.node=D('div', null, null, 'position: relative'), e.text.parentNode&&e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), s&&a<8&&(e.node.style.zIndex=2)), e.node;
      } function hn(e, t) {
        const n=e.display.externalMeasured; return n&&n.line==t.line?(e.display.externalMeasured=null, t.measure=n.measure, n.built):Xt(e, t);
      } function pn(e, t) {
        const n=t.text.className; const r=hn(e, t); t.text==t.node&&(t.node=r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text=r.pre, r.bgClass!=t.bgClass||r.textClass!=t.textClass?(t.bgClass=r.bgClass, t.textClass=r.textClass, fn(e, t)):n&&(t.text.className=n);
      } function fn(e, t) {
        (function(e, t) {
          let n=t.bgClass?t.bgClass+' '+(t.line.bgClass||''):t.line.bgClass; if (n&&(n+=' CodeMirror-linebackground'), t.background)n?t.background.className=n:(t.background.parentNode.removeChild(t.background), t.background=null); else if (n) {
            const r=dn(t); t.background=r.insertBefore(D('div', null, n), r.firstChild), e.display.input.setUneditable(t.background);
          }
        })(e, t), t.line.wrapClass?dn(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className=''); const n=t.textClass?t.textClass+' '+(t.line.textClass||''):t.line.textClass; t.text.className=n||'';
      } function mn(e, t, n, r) {
        if (t.gutter&&(t.node.removeChild(t.gutter), t.gutter=null), t.gutterBackground&&(t.node.removeChild(t.gutterBackground), t.gutterBackground=null), t.line.gutterClass) {
          const i=dn(t); t.gutterBackground=D('div', null, 'CodeMirror-gutter-background '+t.line.gutterClass, 'left: '+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+'px; width: '+r.gutterTotalWidth+'px'), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        } const o=t.line.gutterMarkers; if (e.options.lineNumbers||o) {
          const s=dn(t); const a=t.gutter=D('div', null, 'CodeMirror-gutter-wrapper', 'left: '+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+'px'); if (e.display.input.setUneditable(a), s.insertBefore(a, t.text), t.line.gutterClass&&(a.className+=' '+t.line.gutterClass), !e.options.lineNumbers||o&&o['CodeMirror-linenumbers']||(t.lineNumber=a.appendChild(D('div', Qe(e.options, n), 'CodeMirror-linenumber CodeMirror-gutter-elt', 'left: '+r.gutterLeft['CodeMirror-linenumbers']+'px; width: '+e.display.lineNumInnerWidth+'px'))), o) {
            for (let l=0; l<e.display.gutterSpecs.length; ++l) {
              const c=e.display.gutterSpecs[l].className; const u=o.hasOwnProperty(c)&&o[c]; u&&a.appendChild(D('div', [u], 'CodeMirror-gutter-elt', 'left: '+r.gutterLeft[c]+'px; width: '+r.gutterWidth[c]+'px'));
            }
          }
        }
      } function gn(e, t, n) {
        t.alignable&&(t.alignable=null); for (let r=S('CodeMirror-linewidget'), i=t.node.firstChild, o=void 0; i; i=o)o=i.nextSibling, r.test(i.className)&&t.node.removeChild(i); yn(e, t, n);
      } function vn(e, t, n, r) {
        const i=hn(e, t); return t.text=t.node=i.pre, i.bgClass&&(t.bgClass=i.bgClass), i.textClass&&(t.textClass=i.textClass), fn(e, t), mn(e, t, n, r), yn(e, t, r), t.node;
      } function yn(e, t, n) {
        if (bn(e, t.line, t, n, !0), t.rest) for (let r=0; r<t.rest.length; r++)bn(e, t.rest[r], t, n, !1);
      } function bn(e, t, n, r, i) {
        if (t.widgets) {
          for (let o=dn(n), s=0, a=t.widgets; s<a.length; ++s) {
            const l=a[s]; const c=D('div', [l.node], 'CodeMirror-linewidget'+(l.className?' '+l.className:'')); l.handleMouseEvents||c.setAttribute('cm-ignore-events', 'true'), wn(l, c, n, r), e.display.input.setUneditable(c), i&&l.above?o.insertBefore(c, n.gutter||n.text):o.appendChild(c), ln(l, 'redraw');
          }
        }
      } function wn(e, t, n, r) {
        if (e.noHScroll) {
          (n.alignable||(n.alignable=[])).push(t); let i=r.wrapperWidth; t.style.left=r.fixedPos+'px', e.coverGutter||(i-=r.gutterTotalWidth, t.style.paddingLeft=r.gutterTotalWidth+'px'), t.style.width=i+'px';
        }e.coverGutter&&(t.style.zIndex=5, t.style.position='relative', e.noHScroll||(t.style.marginLeft=-r.gutterTotalWidth+'px'));
      } function xn(e) {
        if (null!=e.height) return e.height; const t=e.doc.cm; if (!t) return 0; if (!N(document.body, e.node)) {
          let n='position: relative;'; e.coverGutter&&(n+='margin-left: -'+t.display.gutters.offsetWidth+'px;'), e.noHScroll&&(n+='width: '+t.display.wrapper.clientWidth+'px;'), O(t.display.measure, D('div', [e.node], null, n));
        } return e.height=e.node.parentNode.offsetHeight;
      } function kn(e, t) {
        for (let n=_e(t); n!=e.wrapper; n=n.parentNode) if (!n||1==n.nodeType&&'true'==n.getAttribute('cm-ignore-events')||n.parentNode==e.sizer&&n!=e.mover) return !0;
      } function _n(e) {
        return e.lineSpace.offsetTop;
      } function Sn(e) {
        return e.mover.offsetHeight-e.lineSpace.offsetHeight;
      } function Cn(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH; const t=O(e.measure, D('pre', 'x', 'CodeMirror-line-like')); const n=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle; const r={left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight)}; return isNaN(r.left)||isNaN(r.right)||(e.cachedPaddingH=r), r;
      } function Mn(e) {
        return 50-e.display.nativeBarWidth;
      } function Tn(e) {
        return e.display.scroller.clientWidth-Mn(e)-e.display.barWidth;
      } function On(e) {
        return e.display.scroller.clientHeight-Mn(e)-e.display.barHeight;
      } function Dn(e, t, n) {
        if (e.line==t) return {map: e.measure.map, cache: e.measure.cache}; for (let r=0; r<e.rest.length; r++) if (e.rest[r]==t) return {map: e.measure.maps[r], cache: e.measure.caches[r]}; for (let i=0; i<e.rest.length; i++) if (Ge(e.rest[i])>n) return {map: e.measure.maps[i], cache: e.measure.caches[i], before: !0};
      } function En(e, t, n, r) {
        return Ln(e, An(e, t), n, r);
      } function Nn(e, t) {
        if (t>=e.display.viewFrom&&t<e.display.viewTo) return e.display.view[ur(e, t)]; const n=e.display.externalMeasured; return n&&t>=n.lineN&&t<n.lineN+n.size?n:void 0;
      } function An(e, t) {
        const n=Ge(t); let r=Nn(e, n); r&&!r.text?r=null:r&&r.changes&&(un(e, r, n, or(e)), e.curOp.forceUpdate=!0), r||(r=function(e, t) {
          const n=Ge(t=Pt(t)); const r=e.display.externalMeasured=new rn(e.doc, t, n); r.lineN=n; const i=r.built=Xt(e, r); return r.text=i.pre, O(e.display.lineMeasure, i.pre), r;
        }(e, t)); const i=Dn(r, t, n); return {line: t, view: r, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1};
      } function Ln(e, t, n, r, i) {
        t.before&&(n=-1); let o; const l=n+(r||''); return t.cache.hasOwnProperty(l)?o=t.cache[l]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()), t.hasHeights||(function(e, t, n) {
          const r=e.options.lineWrapping; const i=r&&Tn(e); if (!t.measure.heights||r&&t.measure.width!=i) {
            const o=t.measure.heights=[]; if (r) {
              t.measure.width=i; for (let s=t.text.firstChild.getClientRects(), a=0; a<s.length-1; a++) {
                const l=s[a]; const c=s[a+1]; Math.abs(l.bottom-c.bottom)>2&&o.push((l.bottom+c.top)/2-n.top);
              }
            }o.push(n.bottom-n.top);
          }
        }(e, t.view, t.rect), t.hasHeights=!0), (o=function(e, t, n, r) {
          let i; const o=qn(t.map, n, r); const l=o.node; let c=o.start; let u=o.end; let d=o.collapse; if (3==l.nodeType) {
            for (let h=0; h<4; h++) {
              for (;c&&re(t.line.text.charAt(o.coverStart+c));)--c; for (;o.coverStart+u<o.coverEnd&&re(t.line.text.charAt(o.coverStart+u));)++u; if ((i=s&&a<9&&0==c&&u==o.coverEnd-o.coverStart?l.parentNode.getBoundingClientRect():Fn(C(l, c, u).getClientRects(), r)).left||i.right||0==c) break; u=c, c-=1, d='right';
            }s&&a<11&&(i=function(e, t) {
              if (!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e) {
                if (null!=ze) return ze; const t=O(e, D('span', 'x')); const n=t.getBoundingClientRect(); const r=C(t, 0, 1).getBoundingClientRect(); return ze=Math.abs(n.left-r.left)>1;
              }(e)) return t; const n=screen.logicalXDPI/screen.deviceXDPI; const r=screen.logicalYDPI/screen.deviceYDPI; return {left: t.left*n, right: t.right*n, top: t.top*r, bottom: t.bottom*r};
            }(e.display.measure, i));
          } else {
            let p; c>0&&(d=r='right'), i=e.options.lineWrapping&&(p=l.getClientRects()).length>1?p['right'==r?p.length-1:0]:l.getBoundingClientRect();
          } if (s&&a<9&&!c&&(!i||!i.left&&!i.right)) {
            const f=l.parentNode.getClientRects()[0]; i=f?{left: f.left, right: f.left+ir(e.display), top: f.top, bottom: f.bottom}:In;
          } for (var m=i.top-t.rect.top, g=i.bottom-t.rect.top, v=(m+g)/2, y=t.view.measure.heights, b=0; b<y.length-1&&!(v<y[b]); b++);const w=b?y[b-1]:0; const x=y[b]; const k={left: ('right'==d?i.right:i.left)-t.rect.left, right: ('left'==d?i.left:i.right)-t.rect.left, top: w, bottom: x}; return i.left||i.right||(k.bogus=!0), e.options.singleCursorHeightPerLine||(k.rtop=m, k.rbottom=g), k;
        }(e, t, n, r)).bogus||(t.cache[l]=o)), {left: o.left, right: o.right, top: i?o.rtop:o.top, bottom: i?o.rbottom:o.bottom};
      } let zn; var In={left: 0, right: 0, top: 0, bottom: 0}; function qn(e, t, n) {
        for (var r, i, o, s, a, l, c=0; c<e.length; c+=3) {
          if (a=e[c], l=e[c+1], t<a?(i=0, o=1, s='left'):t<l?o=1+(i=t-a):(c==e.length-3||t==l&&e[c+3]>t)&&(i=(o=l-a)-1, t>=l&&(s='right')), null!=i) {
            if (r=e[c+2], a==l&&n==(r.insertLeft?'left':'right')&&(s=n), 'left'==n&&0==i) for (;c&&e[c-2]==e[c-3]&&e[c-1].insertLeft;)r=e[2+(c-=3)], s='left'; if ('right'==n&&i==l-a) for (;c<e.length-3&&e[c+3]==e[c+4]&&!e[c+5].insertLeft;)r=e[(c+=3)+2], s='right'; break;
          }
        } return {node: r, start: i, end: o, collapse: s, coverStart: a, coverEnd: l};
      } function Fn(e, t) {
        let n=In; if ('left'==t) for (let r=0; r<e.length&&(n=e[r]).left==n.right; r++);else for (let i=e.length-1; i>=0&&(n=e[i]).left==n.right; i--);return n;
      } function Pn(e) {
        if (e.measure&&(e.measure.cache={}, e.measure.heights=null, e.rest)) for (let t=0; t<e.rest.length; t++)e.measure.caches[t]={};
      } function Rn(e) {
        e.display.externalMeasure=null, T(e.display.lineMeasure); for (let t=0; t<e.display.view.length; t++)Pn(e.display.view[t]);
      } function Bn(e) {
        Rn(e), e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null, e.options.lineWrapping||(e.display.maxLineChanged=!0), e.display.lineNumChars=null;
      } function jn() {
        return u&&g?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft;
      } function Wn() {
        return u&&g?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop;
      } function Hn(e) {
        let t=0; if (e.widgets) for (let n=0; n<e.widgets.length; ++n)e.widgets[n].above&&(t+=xn(e.widgets[n])); return t;
      } function Vn(e, t, n, r, i) {
        if (!i) {
          const o=Hn(t); n.top+=o, n.bottom+=o;
        } if ('line'==r) return n; r||(r='local'); let s=Ht(t); if ('local'==r?s+=_n(e.display):s-=e.display.viewOffset, 'page'==r||'window'==r) {
          const a=e.display.lineSpace.getBoundingClientRect(); s+=a.top+('window'==r?0:Wn()); const l=a.left+('window'==r?0:jn()); n.left+=l, n.right+=l;
        } return n.top+=s, n.bottom+=s, n;
      } function $n(e, t, n) {
        if ('div'==n) return t; let r=t.left; let i=t.top; if ('page'==n)r-=jn(), i-=Wn(); else if ('local'==n||!n) {
          const o=e.display.sizer.getBoundingClientRect(); r+=o.left, i+=o.top;
        } const s=e.display.lineSpace.getBoundingClientRect(); return {left: r-s.left, top: i-s.top};
      } function Un(e, t, n, r, i) {
        return r||(r=Ue(e.doc, t.line)), Vn(e, r, En(e, r, t.ch, i), n);
      } function Kn(e, t, n, r, i, o) {
        function s(t, s) {
          const a=Ln(e, i, t, s?'right':'left', o); return s?a.left=a.right:a.right=a.left, Vn(e, r, a, n);
        }r=r||Ue(e.doc, t.line), i||(i=An(e, r)); const a=ce(r, e.doc.direction); let l=t.ch; let c=t.sticky; if (l>=r.text.length?(l=r.text.length, c='before'):l<=0&&(l=0, c='after'), !a) return s('before'==c?l-1:l, 'before'==c); function u(e, t, n) {
          return s(n?e-1:e, 1==a[t].level!=n);
        } const d=ae(a, l, c); const h=se; const p=u(l, d, 'before'==c); return null!=h&&(p.other=u(l, h, 'before'!=c)), p;
      } function Jn(e, t) {
        let n=0; t=at(e.doc, t), e.options.lineWrapping||(n=ir(e.display)*t.ch); const r=Ue(e.doc, t.line); const i=Ht(r)+_n(e.display); return {left: n, right: n, top: i, bottom: i+r.height};
      } function Yn(e, t, n, r, i) {
        const o=et(e, t, n); return o.xRel=i, r&&(o.outside=r), o;
      } function Gn(e, t, n) {
        const r=e.doc; if ((n+=e.display.viewOffset)<0) return Yn(r.first, 0, null, -1, -1); let i=Xe(r, n); const o=r.first+r.size-1; if (i>o) return Yn(r.first+r.size-1, Ue(r, o).text.length, null, 1, 1); t<0&&(t=0); for (let s=Ue(r, i); ;) {
          const a=er(e, s, i, t, n); const l=qt(s, a.ch+(a.xRel>0||a.outside>0?1:0)); if (!l) return a; const c=l.find(1); if (c.line==i) return c; s=Ue(r, i=c.line);
        }
      } function Xn(e, t, n, r) {
        r-=Hn(t); let i=t.text.length; const o=oe((function(t) {
          return Ln(e, n, t-1).bottom<=r;
        }), i, 0); return {begin: o, end: i=oe((function(t) {
          return Ln(e, n, t).top>r;
        }), o, i)};
      } function Zn(e, t, n, r) {
        return n||(n=An(e, t)), Xn(e, t, n, Vn(e, t, Ln(e, n, r), 'line').top);
      } function Qn(e, t, n, r) {
        return !(e.bottom<=n)&&(e.top>n||(r?e.left:e.right)>t);
      } function er(e, t, n, r, i) {
        i-=Ht(t); const o=An(e, t); const s=Hn(t); let a=0; let l=t.text.length; let c=!0; const u=ce(t, e.doc.direction); if (u) {
          const d=(e.options.lineWrapping?nr:tr)(e, t, n, o, u, r, i); a=(c=1!=d.level)?d.from:d.to-1, l=c?d.to:d.from-1;
        } let h; let p; let f=null; let m=null; let g=oe((function(t) {
          const n=Ln(e, o, t); return n.top+=s, n.bottom+=s, !!Qn(n, r, i, !1)&&(n.top<=i&&n.left<=r&&(f=t, m=n), !0);
        }), a, l); let v=!1; if (m) {
          const y=r-m.left<m.right-r; const b=y==c; g=f+(b?0:1), p=b?'after':'before', h=y?m.left:m.right;
        } else {
          c||g!=l&&g!=a||g++, p=0==g?'after':g==t.text.length?'before':Ln(e, o, g-(c?1:0)).bottom+s<=i==c?'after':'before'; const w=Kn(e, et(n, g, p), 'line', t, o); h=w.left, v=i<w.top?-1:i>=w.bottom?1:0;
        } return Yn(n, g=ie(t.text, g, 1), p, v, r-h);
      } function tr(e, t, n, r, i, o, s) {
        const a=oe((function(a) {
          const l=i[a]; const c=1!=l.level; return Qn(Kn(e, et(n, c?l.to:l.from, c?'before':'after'), 'line', t, r), o, s, !0);
        }), 0, i.length-1); let l=i[a]; if (a>0) {
          const c=1!=l.level; const u=Kn(e, et(n, c?l.from:l.to, c?'after':'before'), 'line', t, r); Qn(u, o, s, !0)&&u.top>s&&(l=i[a-1]);
        } return l;
      } function nr(e, t, n, r, i, o, s) {
        const a=Xn(e, t, r, s); const l=a.begin; let c=a.end; /\s/.test(t.text.charAt(c-1))&&c--; for (var u=null, d=null, h=0; h<i.length; h++) {
          const p=i[h]; if (!(p.from>=c||p.to<=l)) {
            const f=Ln(e, r, 1!=p.level?Math.min(c, p.to)-1:Math.max(l, p.from)).right; const m=f<o?o-f+1e9:f-o; (!u||d>m)&&(u=p, d=m);
          }
        } return u||(u=i[i.length-1]), u.from<l&&(u={from: l, to: u.to, level: u.level}), u.to>c&&(u={from: u.from, to: c, level: u.level}), u;
      } function rr(e) {
        if (null!=e.cachedTextHeight) return e.cachedTextHeight; if (null==zn) {
          zn=D('pre', null, 'CodeMirror-line-like'); for (let t=0; t<49; ++t)zn.appendChild(document.createTextNode('x')), zn.appendChild(D('br')); zn.appendChild(document.createTextNode('x'));
        }O(e.measure, zn); const n=zn.offsetHeight/50; return n>3&&(e.cachedTextHeight=n), T(e.measure), n||1;
      } function ir(e) {
        if (null!=e.cachedCharWidth) return e.cachedCharWidth; const t=D('span', 'xxxxxxxxxx'); const n=D('pre', [t], 'CodeMirror-line-like'); O(e.measure, n); const r=t.getBoundingClientRect(); const i=(r.right-r.left)/10; return i>2&&(e.cachedCharWidth=i), i||10;
      } function or(e) {
        for (var t=e.display, n={}, r={}, i=t.gutters.clientLeft, o=t.gutters.firstChild, s=0; o; o=o.nextSibling, ++s) {
          const a=e.display.gutterSpecs[s].className; n[a]=o.offsetLeft+o.clientLeft+i, r[a]=o.clientWidth;
        } return {fixedPos: sr(t), gutterTotalWidth: t.gutters.offsetWidth, gutterLeft: n, gutterWidth: r, wrapperWidth: t.wrapper.clientWidth};
      } function sr(e) {
        return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left;
      } function ar(e) {
        const t=rr(e.display); const n=e.options.lineWrapping; const r=n&&Math.max(5, e.display.scroller.clientWidth/ir(e.display)-3); return function(i) {
          if (jt(e.doc, i)) return 0; let o=0; if (i.widgets) for (let s=0; s<i.widgets.length; s++)i.widgets[s].height&&(o+=i.widgets[s].height); return n?o+(Math.ceil(i.text.length/r)||1)*t:o+t;
        };
      } function lr(e) {
        const t=e.doc; const n=ar(e); t.iter((function(e) {
          const t=n(e); t!=e.height&&Ye(e, t);
        }));
      } function cr(e, t, n, r) {
        const i=e.display; if (!n&&'true'==_e(t).getAttribute('cm-not-content')) return null; let o; let s; const a=i.lineSpace.getBoundingClientRect(); try {
          o=t.clientX-a.left, s=t.clientY-a.top;
        } catch (e) {
          return null;
        } let l; let c=Gn(e, o, s); if (r&&c.xRel>0&&(l=Ue(e.doc, c.line).text).length==c.ch) {
          const u=P(l, l.length, e.options.tabSize)-l.length; c=et(c.line, Math.max(0, Math.round((o-Cn(e.display).left)/ir(e.display))-u));
        } return c;
      } function ur(e, t) {
        if (t>=e.display.viewTo) return null; if ((t-=e.display.viewFrom)<0) return null; for (let n=e.display.view, r=0; r<n.length; r++) if ((t-=n[r].size)<0) return r;
      } function dr(e, t, n, r) {
        null==t&&(t=e.doc.first), null==n&&(n=e.doc.first+e.doc.size), r||(r=0); const i=e.display; if (r&&n<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t), e.curOp.viewChanged=!0, t>=i.viewTo)kt&&Rt(e.doc, t)<i.viewTo&&pr(e); else if (n<=i.viewFrom)kt&&Bt(e.doc, n+r)>i.viewFrom?pr(e):(i.viewFrom+=r, i.viewTo+=r); else if (t<=i.viewFrom&&n>=i.viewTo)pr(e); else if (t<=i.viewFrom) {
          const o=fr(e, n, n+r, 1); o?(i.view=i.view.slice(o.index), i.viewFrom=o.lineN, i.viewTo+=r):pr(e);
        } else if (n>=i.viewTo) {
          const s=fr(e, t, t, -1); s?(i.view=i.view.slice(0, s.index), i.viewTo=s.lineN):pr(e);
        } else {
          const a=fr(e, t, t, -1); const l=fr(e, n, n+r, 1); a&&l?(i.view=i.view.slice(0, a.index).concat(on(e, a.lineN, l.lineN)).concat(i.view.slice(l.index)), i.viewTo+=r):pr(e);
        } const c=i.externalMeasured; c&&(n<c.lineN?c.lineN+=r:t<c.lineN+c.size&&(i.externalMeasured=null));
      } function hr(e, t, n) {
        e.curOp.viewChanged=!0; const r=e.display; const i=e.display.externalMeasured; if (i&&t>=i.lineN&&t<i.lineN+i.size&&(r.externalMeasured=null), !(t<r.viewFrom||t>=r.viewTo)) {
          const o=r.view[ur(e, t)]; if (null!=o.node) {
            const s=o.changes||(o.changes=[]); -1==B(s, n)&&s.push(n);
          }
        }
      } function pr(e) {
        e.display.viewFrom=e.display.viewTo=e.doc.first, e.display.view=[], e.display.viewOffset=0;
      } function fr(e, t, n, r) {
        let i; let o=ur(e, t); const s=e.display.view; if (!kt||n==e.doc.first+e.doc.size) return {index: o, lineN: n}; for (var a=e.display.viewFrom, l=0; l<o; l++)a+=s[l].size; if (a!=t) {
          if (r>0) {
            if (o==s.length-1) return null; i=a+s[o].size-t, o++;
          } else i=a-t; t+=i, n+=i;
        } for (;Rt(e.doc, n)!=n;) {
          if (o==(r<0?0:s.length-1)) return null; n+=r*s[o-(r<0?1:0)].size, o+=r;
        } return {index: o, lineN: n};
      } function mr(e) {
        for (var t=e.display.view, n=0, r=0; r<t.length; r++) {
          const i=t[r]; i.hidden||i.node&&!i.changes||++n;
        } return n;
      } function gr(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      } function vr(e, t) {
        void 0===t&&(t=!0); for (var n=e.doc, r={}, i=r.cursors=document.createDocumentFragment(), o=r.selection=document.createDocumentFragment(), s=0; s<n.sel.ranges.length; s++) {
          if (t||s!=n.sel.primIndex) {
            const a=n.sel.ranges[s]; if (!(a.from().line>=e.display.viewTo||a.to().line<e.display.viewFrom)) {
              const l=a.empty(); (l||e.options.showCursorWhenSelecting)&&yr(e, a.head, i), l||wr(e, a, o);
            }
          }
        } return r;
      } function yr(e, t, n) {
        const r=Kn(e, t, 'div', null, null, !e.options.singleCursorHeightPerLine); const i=n.appendChild(D('div', ' ', 'CodeMirror-cursor')); if (i.style.left=r.left+'px', i.style.top=r.top+'px', i.style.height=Math.max(0, r.bottom-r.top)*e.options.cursorHeight+'px', r.other) {
          const o=n.appendChild(D('div', ' ', 'CodeMirror-cursor CodeMirror-secondarycursor')); o.style.display='', o.style.left=r.other.left+'px', o.style.top=r.other.top+'px', o.style.height=.85*(r.other.bottom-r.other.top)+'px';
        }
      } function br(e, t) {
        return e.top-t.top||e.left-t.left;
      } function wr(e, t, n) {
        const r=e.display; const i=e.doc; const o=document.createDocumentFragment(); const s=Cn(e.display); const a=s.left; const l=Math.max(r.sizerWidth, Tn(e)-r.sizer.offsetLeft)-s.right; const c='ltr'==i.direction; function u(e, t, n, r) {
          t<0&&(t=0), t=Math.round(t), r=Math.round(r), o.appendChild(D('div', null, 'CodeMirror-selected', 'position: absolute; left: '+e+'px;\n                             top: '+t+'px; width: '+(null==n?l-e:n)+'px;\n                             height: '+(r-t)+'px'));
        } function d(t, n, r) {
          let o; let s; const d=Ue(i, t); const h=d.text.length; function p(n, r) {
            return Un(e, et(t, n), 'div', d, r);
          } function f(t, n, r) {
            const i=Zn(e, d, null, t); const o='ltr'==n==('after'==r)?'left':'right'; return p('after'==r?i.begin:i.end-(/\s/.test(d.text.charAt(i.end-1))?2:1), o)[o];
          } const m=ce(d, i.direction); return function(e, t, n, r) {
            if (!e) return r(t, n, 'ltr', 0); for (var i=!1, o=0; o<e.length; ++o) {
              const s=e[o]; (s.from<n&&s.to>t||t==n&&s.to==t)&&(r(Math.max(s.from, t), Math.min(s.to, n), 1==s.level?'rtl':'ltr', o), i=!0);
            }i||r(t, n, 'ltr');
          }(m, n||0, null==r?h:r, (function(e, t, i, d) {
            const g='ltr'==i; const v=p(e, g?'left':'right'); const y=p(t-1, g?'right':'left'); const b=null==n&&0==e; const w=null==r&&t==h; const x=0==d; const k=!m||d==m.length-1; if (y.top-v.top<=3) {
              const _=(c?w:b)&&k; const S=(c?b:w)&&x?a:(g?v:y).left; const C=_?l:(g?y:v).right; u(S, v.top, C-S, v.bottom);
            } else {
              let M; let T; let O; let D; g?(M=c&&b&&x?a:v.left, T=c?l:f(e, i, 'before'), O=c?a:f(t, i, 'after'), D=c&&w&&k?l:y.right):(M=c?f(e, i, 'before'):a, T=!c&&b&&x?l:v.right, O=!c&&w&&k?a:y.left, D=c?f(t, i, 'after'):l), u(M, v.top, T-M, v.bottom), v.bottom<y.top&&u(a, v.bottom, null, y.top), u(O, y.top, D-O, y.bottom);
            }(!o||br(v, o)<0)&&(o=v), br(y, o)<0&&(o=y), (!s||br(v, s)<0)&&(s=v), br(y, s)<0&&(s=y);
          })), {start: o, end: s};
        } const h=t.from(); const p=t.to(); if (h.line==p.line)d(h.line, h.ch, p.ch); else {
          const f=Ue(i, h.line); const m=Ue(i, p.line); const g=Pt(f)==Pt(m); const v=d(h.line, h.ch, g?f.text.length+1:null).end; const y=d(p.line, g?0:null, p.ch).start; g&&(v.top<y.top-2?(u(v.right, v.top, null, v.bottom), u(a, y.top, y.left, y.bottom)):u(v.right, v.top, y.left-v.right, v.bottom)), v.bottom<y.top&&u(a, v.bottom, null, y.top);
        }n.appendChild(o);
      } function xr(e) {
        if (e.state.focused) {
          const t=e.display; clearInterval(t.blinker); let n=!0; t.cursorDiv.style.visibility='', e.options.cursorBlinkRate>0?t.blinker=setInterval((function() {
            e.hasFocus()||Cr(e), t.cursorDiv.style.visibility=(n=!n)?'':'hidden';
          }), e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility='hidden');
        }
      } function kr(e) {
        e.hasFocus()||(e.display.input.focus(), e.state.focused||Sr(e));
      } function _r(e) {
        e.state.delayingBlurEvent=!0, setTimeout((function() {
          e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1, e.state.focused&&Cr(e));
        }), 100);
      } function Sr(e, t) {
        e.state.delayingBlurEvent&&!e.state.draggingText&&(e.state.delayingBlurEvent=!1), 'nocursor'!=e.options.readOnly&&(e.state.focused||(fe(e, 'focus', e, t), e.state.focused=!0, L(e.display.wrapper, 'CodeMirror-focused'), e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(), l&&setTimeout((function() {
          return e.display.input.reset(!0);
        }), 20)), e.display.input.receivedFocus()), xr(e));
      } function Cr(e, t) {
        e.state.delayingBlurEvent||(e.state.focused&&(fe(e, 'blur', e, t), e.state.focused=!1, M(e.display.wrapper, 'CodeMirror-focused')), clearInterval(e.display.blinker), setTimeout((function() {
          e.state.focused||(e.display.shift=!1);
        }), 150));
      } function Mr(e) {
        for (let t=e.display, n=t.lineDiv.offsetTop, r=0; r<t.view.length; r++) {
          const i=t.view[r]; const o=e.options.lineWrapping; let l=void 0; let c=0; if (!i.hidden) {
            if (s&&a<8) {
              const u=i.node.offsetTop+i.node.offsetHeight; l=u-n, n=u;
            } else {
              const d=i.node.getBoundingClientRect(); l=d.bottom-d.top, !o&&i.text.firstChild&&(c=i.text.firstChild.getBoundingClientRect().right-d.left-1);
            } const h=i.line.height-l; if ((h>.005||h<-.005)&&(Ye(i.line, l), Tr(i.line), i.rest)) for (let p=0; p<i.rest.length; p++)Tr(i.rest[p]); if (c>e.display.sizerWidth) {
              const f=Math.ceil(c/ir(e.display)); f>e.display.maxLineLength&&(e.display.maxLineLength=f, e.display.maxLine=i.line, e.display.maxLineChanged=!0);
            }
          }
        }
      } function Tr(e) {
        if (e.widgets) {
          for (let t=0; t<e.widgets.length; ++t) {
            const n=e.widgets[t]; const r=n.node.parentNode; r&&(n.height=r.offsetHeight);
          }
        }
      } function Or(e, t, n) {
        let r=n&&null!=n.top?Math.max(0, n.top):e.scroller.scrollTop; r=Math.floor(r-_n(e)); const i=n&&null!=n.bottom?n.bottom:r+e.wrapper.clientHeight; let o=Xe(t, r); let s=Xe(t, i); if (n&&n.ensure) {
          const a=n.ensure.from.line; const l=n.ensure.to.line; a<o?(o=a, s=Xe(t, Ht(Ue(t, a))+e.wrapper.clientHeight)):Math.min(l, t.lastLine())>=s&&(o=Xe(t, Ht(Ue(t, l))-e.wrapper.clientHeight), s=l);
        } return {from: o, to: Math.max(s, o+1)};
      } function Dr(e, t) {
        const n=e.display; const r=rr(e.display); t.top<0&&(t.top=0); const i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:n.scroller.scrollTop; const o=On(e); const s={}; t.bottom-t.top>o&&(t.bottom=t.top+o); const a=e.doc.height+Sn(n); const l=t.top<r; const c=t.bottom>a-r; if (t.top<i)s.scrollTop=l?0:t.top; else if (t.bottom>i+o) {
          const u=Math.min(t.top, (c?a:t.bottom)-o); u!=i&&(s.scrollTop=u);
        } const d=e.options.fixedGutter?0:n.gutters.offsetWidth; const h=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:n.scroller.scrollLeft-d; const p=Tn(e)-n.gutters.offsetWidth; const f=t.right-t.left>p; return f&&(t.right=t.left+p), t.left<10?s.scrollLeft=0:t.left<h?s.scrollLeft=Math.max(0, t.left+d-(f?0:10)):t.right>p+h-3&&(s.scrollLeft=t.right+(f?0:10)-p), s;
      } function Er(e, t) {
        null!=t&&(Lr(e), e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t);
      } function Nr(e) {
        Lr(e); const t=e.getCursor(); e.curOp.scrollToPos={from: t, to: t, margin: e.options.cursorScrollMargin};
      } function Ar(e, t, n) {
        null==t&&null==n||Lr(e), null!=t&&(e.curOp.scrollLeft=t), null!=n&&(e.curOp.scrollTop=n);
      } function Lr(e) {
        const t=e.curOp.scrollToPos; t&&(e.curOp.scrollToPos=null, zr(e, Jn(e, t.from), Jn(e, t.to), t.margin));
      } function zr(e, t, n, r) {
        const i=Dr(e, {left: Math.min(t.left, n.left), top: Math.min(t.top, n.top)-r, right: Math.max(t.right, n.right), bottom: Math.max(t.bottom, n.bottom)+r}); Ar(e, i.scrollLeft, i.scrollTop);
      } function Ir(e, t) {
        Math.abs(e.doc.scrollTop-t)<2||(n||li(e, {top: t}), qr(e, t, !0), n&&li(e), ri(e, 100));
      } function qr(e, t, n) {
        t=Math.max(0, Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop!=t||n)&&(e.doc.scrollTop=t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t));
      } function Fr(e, t, n, r) {
        t=Math.max(0, Math.min(t, e.display.scroller.scrollWidth-e.display.scroller.clientWidth)), (n?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!r||(e.doc.scrollLeft=t, di(e), e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t), e.display.scrollbars.setScrollLeft(t));
      } function Pr(e) {
        const t=e.display; const n=t.gutters.offsetWidth; const r=Math.round(e.doc.height+Sn(e.display)); return {clientHeight: t.scroller.clientHeight, viewHeight: t.wrapper.clientHeight, scrollWidth: t.scroller.scrollWidth, clientWidth: t.scroller.clientWidth, viewWidth: t.wrapper.clientWidth, barLeft: e.options.fixedGutter?n:0, docHeight: r, scrollHeight: r+Mn(e)+t.barHeight, nativeBarWidth: t.nativeBarWidth, gutterWidth: n};
      } const Rr=function(e, t, n) {
        this.cm=n; const r=this.vert=D('div', [D('div', null, null, 'min-width: 1px')], 'CodeMirror-vscrollbar'); const i=this.horiz=D('div', [D('div', null, null, 'height: 100%; min-height: 1px')], 'CodeMirror-hscrollbar'); r.tabIndex=i.tabIndex=-1, e(r), e(i), de(r, 'scroll', (function() {
          r.clientHeight&&t(r.scrollTop, 'vertical');
        })), de(i, 'scroll', (function() {
          i.clientWidth&&t(i.scrollLeft, 'horizontal');
        })), this.checkedZeroWidth=!1, s&&a<8&&(this.horiz.style.minHeight=this.vert.style.minWidth='18px');
      }; Rr.prototype.update=function(e) {
        const t=e.scrollWidth>e.clientWidth+1; const n=e.scrollHeight>e.clientHeight+1; const r=e.nativeBarWidth; if (n) {
          this.vert.style.display='block', this.vert.style.bottom=t?r+'px':'0'; const i=e.viewHeight-(t?r:0); this.vert.firstChild.style.height=Math.max(0, e.scrollHeight-e.clientHeight+i)+'px';
        } else this.vert.style.display='', this.vert.firstChild.style.height='0'; if (t) {
          this.horiz.style.display='block', this.horiz.style.right=n?r+'px':'0', this.horiz.style.left=e.barLeft+'px'; const o=e.viewWidth-e.barLeft-(n?r:0); this.horiz.firstChild.style.width=Math.max(0, e.scrollWidth-e.clientWidth+o)+'px';
        } else this.horiz.style.display='', this.horiz.firstChild.style.width='0'; return !this.checkedZeroWidth&&e.clientHeight>0&&(0==r&&this.zeroWidthHack(), this.checkedZeroWidth=!0), {right: n?r:0, bottom: t?r:0};
      }, Rr.prototype.setScrollLeft=function(e) {
        this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e), this.disableHoriz&&this.enableZeroWidthBar(this.horiz, this.disableHoriz, 'horiz');
      }, Rr.prototype.setScrollTop=function(e) {
        this.vert.scrollTop!=e&&(this.vert.scrollTop=e), this.disableVert&&this.enableZeroWidthBar(this.vert, this.disableVert, 'vert');
      }, Rr.prototype.zeroWidthHack=function() {
        const e=y&&!p?'12px':'18px'; this.horiz.style.height=this.vert.style.width=e, this.horiz.style.pointerEvents=this.vert.style.pointerEvents='none', this.disableHoriz=new R, this.disableVert=new R;
      }, Rr.prototype.enableZeroWidthBar=function(e, t, n) {
        e.style.pointerEvents='auto', t.set(1e3, (function r() {
          const i=e.getBoundingClientRect(); ('vert'==n?document.elementFromPoint(i.right-1, (i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2, i.bottom-1))!=e?e.style.pointerEvents='none':t.set(1e3, r);
        }));
      }, Rr.prototype.clear=function() {
        const e=this.horiz.parentNode; e.removeChild(this.horiz), e.removeChild(this.vert);
      }; const Br=function() {}; function jr(e, t) {
        t||(t=Pr(e)); let n=e.display.barWidth; let r=e.display.barHeight; Wr(e, t); for (let i=0; i<4&&n!=e.display.barWidth||r!=e.display.barHeight; i++)n!=e.display.barWidth&&e.options.lineWrapping&&Mr(e), Wr(e, Pr(e)), n=e.display.barWidth, r=e.display.barHeight;
      } function Wr(e, t) {
        const n=e.display; const r=n.scrollbars.update(t); n.sizer.style.paddingRight=(n.barWidth=r.right)+'px', n.sizer.style.paddingBottom=(n.barHeight=r.bottom)+'px', n.heightForcer.style.borderBottom=r.bottom+'px solid transparent', r.right&&r.bottom?(n.scrollbarFiller.style.display='block', n.scrollbarFiller.style.height=r.bottom+'px', n.scrollbarFiller.style.width=r.right+'px'):n.scrollbarFiller.style.display='', r.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(n.gutterFiller.style.display='block', n.gutterFiller.style.height=r.bottom+'px', n.gutterFiller.style.width=t.gutterWidth+'px'):n.gutterFiller.style.display='';
      }Br.prototype.update=function() {
        return {bottom: 0, right: 0};
      }, Br.prototype.setScrollLeft=function() {}, Br.prototype.setScrollTop=function() {}, Br.prototype.clear=function() {}; const Hr={native: Rr, null: Br}; function Vr(e) {
        e.display.scrollbars&&(e.display.scrollbars.clear(), e.display.scrollbars.addClass&&M(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars=new Hr[e.options.scrollbarStyle]((function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), de(t, 'mousedown', (function() {
            e.state.focused&&setTimeout((function() {
              return e.display.input.focus();
            }), 0);
          })), t.setAttribute('cm-not-content', 'true');
        }), (function(t, n) {
'horizontal'==n?Fr(e, t):Ir(e, t);
        }), e), e.display.scrollbars.addClass&&L(e.display.wrapper, e.display.scrollbars.addClass);
      } let $r=0; function Ur(e) {
        let t; e.curOp={cm: e, viewChanged: !1, startHeight: e.doc.height, forceUpdate: !1, updateInput: 0, typing: !1, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: !1, updateMaxLine: !1, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: !1, id: ++$r}, t=e.curOp, sn?sn.ops.push(t):t.ownsGroup=sn={ops: [t], delayedCallbacks: []};
      } function Kr(e) {
        const t=e.curOp; t&&function(e, t) {
          const n=e.ownsGroup; if (n) {
            try {
              !function(e) {
                const t=e.delayedCallbacks; let n=0; do {
                  for (;n<t.length; n++)t[n].call(null); for (let r=0; r<e.ops.length; r++) {
                    const i=e.ops[r]; if (i.cursorActivityHandlers) for (;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
                  }
                } while (n<t.length);
              }(n);
            } finally {
              sn=null, t(n);
            }
          }
        }(t, (function(e) {
          for (let t=0; t<e.ops.length; t++)e.ops[t].cm.curOp=null; !function(e) {
            for (var t=e.ops, n=0; n<t.length; n++)Jr(t[n]); for (let r=0; r<t.length; r++)Yr(t[r]); for (let i=0; i<t.length; i++)Gr(t[i]); for (let o=0; o<t.length; o++)Xr(t[o]); for (let s=0; s<t.length; s++)Zr(t[s]);
          }(e);
        }));
      } function Jr(e) {
        const t=e.cm; const n=t.display; (function(e) {
          const t=e.display; !t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth, t.heightForcer.style.height=Mn(e)+'px', t.sizer.style.marginBottom=-t.nativeBarWidth+'px', t.sizer.style.borderRightWidth=Mn(e)+'px', t.scrollbarsClipped=!0);
        })(t), e.updateMaxLine&&$t(t), e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<n.viewFrom||e.scrollToPos.to.line>=n.viewTo)||n.maxLineChanged&&t.options.lineWrapping, e.update=e.mustUpdate&&new oi(t, e.mustUpdate&&{top: e.scrollTop, ensure: e.scrollToPos}, e.forceUpdate);
      } function Yr(e) {
        e.updatedDisplay=e.mustUpdate&&si(e.cm, e.update);
      } function Gr(e) {
        const t=e.cm; const n=t.display; e.updatedDisplay&&Mr(t), e.barMeasure=Pr(t), n.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=En(t, n.maxLine, n.maxLine.text.length).left+3, t.display.sizerWidth=e.adjustWidthTo, e.barMeasure.scrollWidth=Math.max(n.scroller.clientWidth, n.sizer.offsetLeft+e.adjustWidthTo+Mn(t)+t.display.barWidth), e.maxScrollLeft=Math.max(0, n.sizer.offsetLeft+e.adjustWidthTo-Tn(t))), (e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=n.input.prepareSelection());
      } function Xr(e) {
        const t=e.cm; null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+'px', e.maxScrollLeft<t.doc.scrollLeft&&Fr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged=!1); const n=e.focus&&e.focus==A(); e.preparedSelection&&t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay||e.startHeight!=t.doc.height)&&jr(t, e.barMeasure), e.updatedDisplay&&ui(t, e.barMeasure), e.selectionChanged&&xr(t), t.state.focused&&e.updateInput&&t.display.input.reset(e.typing), n&&kr(e.cm);
      } function Zr(e) {
        const t=e.cm; const n=t.display; const r=t.doc; e.updatedDisplay&&ai(t, e.update), null==n.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(n.wheelStartX=n.wheelStartY=null), null!=e.scrollTop&&qr(t, e.scrollTop, e.forceScroll), null!=e.scrollLeft&&Fr(t, e.scrollLeft, !0, !0), e.scrollToPos&&function(e, t) {
          if (!me(e, 'scrollCursorIntoView')) {
            const n=e.display; const r=n.sizer.getBoundingClientRect(); let i=null; if (t.top+r.top<0?i=!0:t.bottom+r.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1), null!=i&&!f) {
              const o=D('div', '​', null, 'position: absolute;\n                         top: '+(t.top-n.viewOffset-_n(e.display))+'px;\n                         height: '+(t.bottom-t.top+Mn(e)+n.barHeight)+'px;\n                         left: '+t.left+'px; width: '+Math.max(2, t.right-t.left)+'px;'); e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
            }
          }
        }(t, function(e, t, n, r) {
          let i; null==r&&(r=0), e.options.lineWrapping||t!=n||(n='before'==(t=t.ch?et(t.line, 'before'==t.sticky?t.ch-1:t.ch, 'after'):t).sticky?et(t.line, t.ch+1, 'before'):t); for (let o=0; o<5; o++) {
            let s=!1; const a=Kn(e, t); const l=n&&n!=t?Kn(e, n):a; const c=Dr(e, i={left: Math.min(a.left, l.left), top: Math.min(a.top, l.top)-r, right: Math.max(a.left, l.left), bottom: Math.max(a.bottom, l.bottom)+r}); const u=e.doc.scrollTop; const d=e.doc.scrollLeft; if (null!=c.scrollTop&&(Ir(e, c.scrollTop), Math.abs(e.doc.scrollTop-u)>1&&(s=!0)), null!=c.scrollLeft&&(Fr(e, c.scrollLeft), Math.abs(e.doc.scrollLeft-d)>1&&(s=!0)), !s) break;
          } return i;
        }(t, at(r, e.scrollToPos.from), at(r, e.scrollToPos.to), e.scrollToPos.margin)); const i=e.maybeHiddenMarkers; const o=e.maybeUnhiddenMarkers; if (i) for (let s=0; s<i.length; ++s)i[s].lines.length||fe(i[s], 'hide'); if (o) for (let a=0; a<o.length; ++a)o[a].lines.length&&fe(o[a], 'unhide'); n.wrapper.offsetHeight&&(r.scrollTop=t.display.scroller.scrollTop), e.changeObjs&&fe(t, 'changes', t, e.changeObjs), e.update&&e.update.finish();
      } function Qr(e, t) {
        if (e.curOp) return t(); Ur(e); try {
          return t();
        } finally {
          Kr(e);
        }
      } function ei(e, t) {
        return function() {
          if (e.curOp) return t.apply(e, arguments); Ur(e); try {
            return t.apply(e, arguments);
          } finally {
            Kr(e);
          }
        };
      } function ti(e) {
        return function() {
          if (this.curOp) return e.apply(this, arguments); Ur(this); try {
            return e.apply(this, arguments);
          } finally {
            Kr(this);
          }
        };
      } function ni(e) {
        return function() {
          const t=this.cm; if (!t||t.curOp) return e.apply(this, arguments); Ur(t); try {
            return e.apply(this, arguments);
          } finally {
            Kr(t);
          }
        };
      } function ri(e, t) {
        e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t, q(ii, e));
      } function ii(e) {
        const t=e.doc; if (!(t.highlightFrontier>=e.display.viewTo)) {
          const n=+new Date+e.options.workTime; const r=pt(e, t.highlightFrontier); const i=[]; t.iter(r.line, Math.min(t.first+t.size, e.display.viewTo+500), (function(o) {
            if (r.line>=e.display.viewFrom) {
              const s=o.styles; const a=o.text.length>e.options.maxHighlightLength?We(t.mode, r.state):null; const l=dt(e, o, r, !0); a&&(r.state=a), o.styles=l.styles; const c=o.styleClasses; const u=l.classes; u?o.styleClasses=u:c&&(o.styleClasses=null); for (var d=!s||s.length!=o.styles.length||c!=u&&(!c||!u||c.bgClass!=u.bgClass||c.textClass!=u.textClass), h=0; !d&&h<s.length; ++h)d=s[h]!=o.styles[h]; d&&i.push(r.line), o.stateAfter=r.save(), r.nextLine();
            } else o.text.length<=e.options.maxHighlightLength&&ft(e, o.text, r), o.stateAfter=r.line%5==0?r.save():null, r.nextLine(); if (+new Date>n) return ri(e, e.options.workDelay), !0;
          })), t.highlightFrontier=r.line, t.modeFrontier=Math.max(t.modeFrontier, r.line), i.length&&Qr(e, (function() {
            for (let t=0; t<i.length; t++)hr(e, i[t], 'text');
          }));
        }
      } var oi=function(e, t, n) {
        const r=e.display; this.viewport=t, this.visible=Or(r, e.doc, t), this.editorIsHidden=!r.wrapper.offsetWidth, this.wrapperHeight=r.wrapper.clientHeight, this.wrapperWidth=r.wrapper.clientWidth, this.oldDisplayWidth=Tn(e), this.force=n, this.dims=or(e), this.events=[];
      }; function si(e, t) {
        const n=e.display; const r=e.doc; if (t.editorIsHidden) return pr(e), !1; if (!t.force&&t.visible.from>=n.viewFrom&&t.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==mr(e)) return !1; hi(e)&&(pr(e), t.dims=or(e)); const i=r.first+r.size; let o=Math.max(t.visible.from-e.options.viewportMargin, r.first); let s=Math.min(i, t.visible.to+e.options.viewportMargin); n.viewFrom<o&&o-n.viewFrom<20&&(o=Math.max(r.first, n.viewFrom)), n.viewTo>s&&n.viewTo-s<20&&(s=Math.min(i, n.viewTo)), kt&&(o=Rt(e.doc, o), s=Bt(e.doc, s)); const a=o!=n.viewFrom||s!=n.viewTo||n.lastWrapHeight!=t.wrapperHeight||n.lastWrapWidth!=t.wrapperWidth; (function(e, t, n) {
          const r=e.display; 0==r.view.length||t>=r.viewTo||n<=r.viewFrom?(r.view=on(e, t, n), r.viewFrom=t):(r.viewFrom>t?r.view=on(e, t, r.viewFrom).concat(r.view):r.viewFrom<t&&(r.view=r.view.slice(ur(e, t))), r.viewFrom=t, r.viewTo<n?r.view=r.view.concat(on(e, r.viewTo, n)):r.viewTo>n&&(r.view=r.view.slice(0, ur(e, n)))), r.viewTo=n;
        })(e, o, s), n.viewOffset=Ht(Ue(e.doc, n.viewFrom)), e.display.mover.style.top=n.viewOffset+'px'; const c=mr(e); if (!a&&0==c&&!t.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)) return !1; const u=function(e) {
          if (e.hasFocus()) return null; const t=A(); if (!t||!N(e.display.lineDiv, t)) return null; const n={activeElt: t}; if (window.getSelection) {
            const r=window.getSelection(); r.anchorNode&&r.extend&&N(e.display.lineDiv, r.anchorNode)&&(n.anchorNode=r.anchorNode, n.anchorOffset=r.anchorOffset, n.focusNode=r.focusNode, n.focusOffset=r.focusOffset);
          } return n;
        }(e); return c>4&&(n.lineDiv.style.display='none'), function(e, t, n) {
          const r=e.display; const i=e.options.lineNumbers; const o=r.lineDiv; let s=o.firstChild; function a(t) {
            const n=t.nextSibling; return l&&y&&e.display.currentWheelTarget==t?t.style.display='none':t.parentNode.removeChild(t), n;
          } for (let c=r.view, u=r.viewFrom, d=0; d<c.length; d++) {
            const h=c[d]; if (h.hidden);else if (h.node&&h.node.parentNode==o) {
              for (;s!=h.node;)s=a(s); let p=i&&null!=t&&t<=u&&h.lineNumber; h.changes&&(B(h.changes, 'gutter')>-1&&(p=!1), un(e, h, u, n)), p&&(T(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(Qe(e.options, u)))), s=h.node.nextSibling;
            } else {
              const f=vn(e, h, u, n); o.insertBefore(f, s);
            }u+=h.size;
          } for (;s;)s=a(s);
        }(e, n.updateLineNumbers, t.dims), c>4&&(n.lineDiv.style.display=''), n.renderedView=n.view, function(e) {
          if (e&&e.activeElt&&e.activeElt!=A()&&(e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName)&&e.anchorNode&&N(document.body, e.anchorNode)&&N(document.body, e.focusNode))) {
            const t=window.getSelection(); const n=document.createRange(); n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n), t.extend(e.focusNode, e.focusOffset);
          }
        }(u), T(n.cursorDiv), T(n.selectionDiv), n.gutters.style.height=n.sizer.style.minHeight=0, a&&(n.lastWrapHeight=t.wrapperHeight, n.lastWrapWidth=t.wrapperWidth, ri(e, 400)), n.updateLineNumbers=null, !0;
      } function ai(e, t) {
        for (let n=t.viewport, r=!0; ;r=!1) {
          if (r&&e.options.lineWrapping&&t.oldDisplayWidth!=Tn(e))r&&(t.visible=Or(e.display, e.doc, n)); else if (n&&null!=n.top&&(n={top: Math.min(e.doc.height+Sn(e.display)-On(e), n.top)}), t.visible=Or(e.display, e.doc, n), t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo) break; if (!si(e, t)) break; Mr(e); const i=Pr(e); gr(e), jr(e, i), ui(e, i), t.force=!1;
        }t.signal(e, 'update', e), e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e, 'viewportChange', e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom=e.display.viewFrom, e.display.reportedViewTo=e.display.viewTo);
      } function li(e, t) {
        const n=new oi(e, t); if (si(e, n)) {
          Mr(e), ai(e, n); const r=Pr(e); gr(e), jr(e, r), ui(e, r), n.finish();
        }
      } function ci(e) {
        const t=e.gutters.offsetWidth; e.sizer.style.marginLeft=t+'px';
      } function ui(e, t) {
        e.display.sizer.style.minHeight=t.docHeight+'px', e.display.heightForcer.style.top=t.docHeight+'px', e.display.gutters.style.height=t.docHeight+e.display.barHeight+Mn(e)+'px';
      } function di(e) {
        const t=e.display; const n=t.view; if (t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter) {
          for (var r=sr(t)-t.scroller.scrollLeft+e.doc.scrollLeft, i=t.gutters.offsetWidth, o=r+'px', s=0; s<n.length; s++) {
            if (!n[s].hidden) {
              e.options.fixedGutter&&(n[s].gutter&&(n[s].gutter.style.left=o), n[s].gutterBackground&&(n[s].gutterBackground.style.left=o)); const a=n[s].alignable; if (a) for (let l=0; l<a.length; l++)a[l].style.left=o;
            }
          }e.options.fixedGutter&&(t.gutters.style.left=r+i+'px');
        }
      } function hi(e) {
        if (!e.options.lineNumbers) return !1; const t=e.doc; const n=Qe(e.options, t.first+t.size-1); const r=e.display; if (n.length!=r.lineNumChars) {
          const i=r.measure.appendChild(D('div', [D('div', n)], 'CodeMirror-linenumber CodeMirror-gutter-elt')); const o=i.firstChild.offsetWidth; const s=i.offsetWidth-o; return r.lineGutter.style.width='', r.lineNumInnerWidth=Math.max(o, r.lineGutter.offsetWidth-s)+1, r.lineNumWidth=r.lineNumInnerWidth+s, r.lineNumChars=r.lineNumInnerWidth?n.length:-1, r.lineGutter.style.width=r.lineNumWidth+'px', ci(e.display), !0;
        } return !1;
      } function pi(e, t) {
        for (var n=[], r=!1, i=0; i<e.length; i++) {
          let o=e[i]; let s=null; if ('string'!=typeof o&&(s=o.style, o=o.className), 'CodeMirror-linenumbers'==o) {
            if (!t) continue; r=!0;
          }n.push({className: o, style: s});
        } return t&&!r&&n.push({className: 'CodeMirror-linenumbers', style: null}), n;
      } function fi(e) {
        const t=e.gutters; const n=e.gutterSpecs; T(t), e.lineGutter=null; for (let r=0; r<n.length; ++r) {
          const i=n[r]; const o=i.className; const s=i.style; const a=t.appendChild(D('div', null, 'CodeMirror-gutter '+o)); s&&(a.style.cssText=s), 'CodeMirror-linenumbers'==o&&(e.lineGutter=a, a.style.width=(e.lineNumWidth||1)+'px');
        }t.style.display=n.length?'':'none', ci(e);
      } function mi(e) {
        fi(e.display), dr(e), di(e);
      } function gi(e, t, r, i) {
        const o=this; this.input=r, o.scrollbarFiller=D('div', null, 'CodeMirror-scrollbar-filler'), o.scrollbarFiller.setAttribute('cm-not-content', 'true'), o.gutterFiller=D('div', null, 'CodeMirror-gutter-filler'), o.gutterFiller.setAttribute('cm-not-content', 'true'), o.lineDiv=E('div', null, 'CodeMirror-code'), o.selectionDiv=D('div', null, null, 'position: relative; z-index: 1'), o.cursorDiv=D('div', null, 'CodeMirror-cursors'), o.measure=D('div', null, 'CodeMirror-measure'), o.lineMeasure=D('div', null, 'CodeMirror-measure'), o.lineSpace=E('div', [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, 'position: relative; outline: none'); const c=E('div', [o.lineSpace], 'CodeMirror-lines'); o.mover=D('div', [c], null, 'position: relative'), o.sizer=D('div', [o.mover], 'CodeMirror-sizer'), o.sizerWidth=null, o.heightForcer=D('div', null, null, 'position: absolute; height: 50px; width: 1px;'), o.gutters=D('div', null, 'CodeMirror-gutters'), o.lineGutter=null, o.scroller=D('div', [o.sizer, o.heightForcer, o.gutters], 'CodeMirror-scroll'), o.scroller.setAttribute('tabIndex', '-1'), o.wrapper=D('div', [o.scrollbarFiller, o.gutterFiller, o.scroller], 'CodeMirror'), s&&a<8&&(o.gutters.style.zIndex=-1, o.scroller.style.paddingRight=0), l||n&&v||(o.scroller.draggable=!0), e&&(e.appendChild?e.appendChild(o.wrapper):e(o.wrapper)), o.viewFrom=o.viewTo=t.first, o.reportedViewFrom=o.reportedViewTo=t.first, o.view=[], o.renderedView=null, o.externalMeasured=null, o.viewOffset=0, o.lastWrapHeight=o.lastWrapWidth=0, o.updateLineNumbers=null, o.nativeBarWidth=o.barHeight=o.barWidth=0, o.scrollbarsClipped=!1, o.lineNumWidth=o.lineNumInnerWidth=o.lineNumChars=null, o.alignWidgets=!1, o.cachedCharWidth=o.cachedTextHeight=o.cachedPaddingH=null, o.maxLine=null, o.maxLineLength=0, o.maxLineChanged=!1, o.wheelDX=o.wheelDY=o.wheelStartX=o.wheelStartY=null, o.shift=!1, o.selForContextMenu=null, o.activeTouch=null, o.gutterSpecs=pi(i.gutters, i.lineNumbers), fi(o), r.init(o);
      }oi.prototype.signal=function(e, t) {
        ve(e, t)&&this.events.push(arguments);
      }, oi.prototype.finish=function() {
        for (let e=0; e<this.events.length; e++)fe.apply(null, this.events[e]);
      }; let vi=0; let yi=null; function bi(e) {
        let t=e.wheelDeltaX; let n=e.wheelDeltaY; return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail), null==n&&e.detail&&e.axis==e.VERTICAL_AXIS?n=e.detail:null==n&&(n=e.wheelDelta), {x: t, y: n};
      } function wi(e) {
        const t=bi(e); return t.x*=yi, t.y*=yi, t;
      } function xi(e, t) {
        const r=bi(t); const i=r.x; const o=r.y; const s=e.display; const a=s.scroller; const c=a.scrollWidth>a.clientWidth; const u=a.scrollHeight>a.clientHeight; if (i&&c||o&&u) {
          if (o&&y&&l) {
            e:for (let h=t.target, p=s.view; h!=a; h=h.parentNode) {
              for (let f=0; f<p.length; f++) {
                if (p[f].node==h) {
                  e.display.currentWheelTarget=h; break e;
                }
              }
            }
          } if (i&&!n&&!d&&null!=yi) return o&&u&&Ir(e, Math.max(0, a.scrollTop+o*yi)), Fr(e, Math.max(0, a.scrollLeft+i*yi)), (!o||o&&u)&&be(t), void(s.wheelStartX=null); if (o&&null!=yi) {
            const m=o*yi; let g=e.doc.scrollTop; let v=g+s.wrapper.clientHeight; m<0?g=Math.max(0, g+m-50):v=Math.min(e.doc.height, v+m+50), li(e, {top: g, bottom: v});
          }vi<20&&(null==s.wheelStartX?(s.wheelStartX=a.scrollLeft, s.wheelStartY=a.scrollTop, s.wheelDX=i, s.wheelDY=o, setTimeout((function() {
            if (null!=s.wheelStartX) {
              const e=a.scrollLeft-s.wheelStartX; const t=a.scrollTop-s.wheelStartY; const n=t&&s.wheelDY&&t/s.wheelDY||e&&s.wheelDX&&e/s.wheelDX; s.wheelStartX=s.wheelStartY=null, n&&(yi=(yi*vi+n)/(vi+1), ++vi);
            }
          }), 200)):(s.wheelDX+=i, s.wheelDY+=o));
        }
      }s?yi=-.53:n?yi=15:u?yi=-.7:h&&(yi=-1/3); const ki=function(e, t) {
        this.ranges=e, this.primIndex=t;
      }; ki.prototype.primary=function() {
        return this.ranges[this.primIndex];
      }, ki.prototype.equals=function(e) {
        if (e==this) return !0; if (e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length) return !1; for (let t=0; t<this.ranges.length; t++) {
          const n=this.ranges[t]; const r=e.ranges[t]; if (!nt(n.anchor, r.anchor)||!nt(n.head, r.head)) return !1;
        } return !0;
      }, ki.prototype.deepCopy=function() {
        for (var e=[], t=0; t<this.ranges.length; t++)e[t]=new _i(rt(this.ranges[t].anchor), rt(this.ranges[t].head)); return new ki(e, this.primIndex);
      }, ki.prototype.somethingSelected=function() {
        for (let e=0; e<this.ranges.length; e++) if (!this.ranges[e].empty()) return !0; return !1;
      }, ki.prototype.contains=function(e, t) {
        t||(t=e); for (let n=0; n<this.ranges.length; n++) {
          const r=this.ranges[n]; if (tt(t, r.from())>=0&&tt(e, r.to())<=0) return n;
        } return -1;
      }; var _i=function(e, t) {
        this.anchor=e, this.head=t;
      }; function Si(e, t, n) {
        const r=e&&e.options.selectionsMayTouch; const i=t[n]; t.sort((function(e, t) {
          return tt(e.from(), t.from());
        })), n=B(t, i); for (let o=1; o<t.length; o++) {
          const s=t[o]; const a=t[o-1]; const l=tt(a.to(), s.from()); if (r&&!s.empty()?l>0:l>=0) {
            const c=ot(a.from(), s.from()); const u=it(a.to(), s.to()); const d=a.empty()?s.from()==s.head:a.from()==a.head; o<=n&&--n, t.splice(--o, 2, new _i(d?u:c, d?c:u));
          }
        } return new ki(t, n);
      } function Ci(e, t) {
        return new ki([new _i(e, t||e)], 0);
      } function Mi(e) {
        return e.text?et(e.from.line+e.text.length-1, J(e.text).length+(1==e.text.length?e.from.ch:0)):e.to;
      } function Ti(e, t) {
        if (tt(e, t.from)<0) return e; if (tt(e, t.to)<=0) return Mi(t); const n=e.line+t.text.length-(t.to.line-t.from.line)-1; let r=e.ch; return e.line==t.to.line&&(r+=Mi(t).ch-t.to.ch), et(n, r);
      } function Oi(e, t) {
        for (var n=[], r=0; r<e.sel.ranges.length; r++) {
          const i=e.sel.ranges[r]; n.push(new _i(Ti(i.anchor, t), Ti(i.head, t)));
        } return Si(e.cm, n, e.sel.primIndex);
      } function Di(e, t, n) {
        return e.line==t.line?et(n.line, e.ch-t.ch+n.ch):et(n.line+(e.line-t.line), e.ch);
      } function Ei(e) {
        e.doc.mode=Re(e.options, e.doc.modeOption), Ni(e);
      } function Ni(e) {
        e.doc.iter((function(e) {
          e.stateAfter&&(e.stateAfter=null), e.styles&&(e.styles=null);
        })), e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first, ri(e, 100), e.state.modeGen++, e.curOp&&dr(e);
      } function Ai(e, t) {
        return 0==t.from.ch&&0==t.to.ch&&''==J(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore);
      } function Li(e, t, n, r) {
        function i(e) {
          return n?n[e]:null;
        } function o(e, n, i) {
          (function(e, t, n, r) {
            e.text=t, e.stateAfter&&(e.stateAfter=null), e.styles&&(e.styles=null), null!=e.order&&(e.order=null), Ot(e), Dt(e, n); const i=r?r(e):1; i!=e.height&&Ye(e, i);
          })(e, n, i, r), ln(e, 'change', e, t);
        } function s(e, t) {
          for (var n=[], o=e; o<t; ++o)n.push(new Ut(c[o], i(o), r)); return n;
        } const a=t.from; const l=t.to; var c=t.text; const u=Ue(e, a.line); const d=Ue(e, l.line); const h=J(c); const p=i(c.length-1); const f=l.line-a.line; if (t.full)e.insert(0, s(0, c.length)), e.remove(c.length, e.size-c.length); else if (Ai(e, t)) {
          const m=s(0, c.length-1); o(d, d.text, p), f&&e.remove(a.line, f), m.length&&e.insert(a.line, m);
        } else if (u==d) {
          if (1==c.length)o(u, u.text.slice(0, a.ch)+h+u.text.slice(l.ch), p); else {
            const g=s(1, c.length-1); g.push(new Ut(h+u.text.slice(l.ch), p, r)), o(u, u.text.slice(0, a.ch)+c[0], i(0)), e.insert(a.line+1, g);
          }
        } else if (1==c.length)o(u, u.text.slice(0, a.ch)+c[0]+d.text.slice(l.ch), i(0)), e.remove(a.line+1, f); else {
          o(u, u.text.slice(0, a.ch)+c[0], i(0)), o(d, h+d.text.slice(l.ch), p); const v=s(1, c.length-1); f>1&&e.remove(a.line+1, f-1), e.insert(a.line+1, v);
        }ln(e, 'change', e, t);
      } function zi(e, t, n) {
        !function e(r, i, o) {
          if (r.linked) {
            for (let s=0; s<r.linked.length; ++s) {
              const a=r.linked[s]; if (a.doc!=i) {
                const l=o&&a.sharedHist; n&&!l||(t(a.doc, l), e(a.doc, r, l));
              }
            }
          }
        }(e, null, !0);
      } function Ii(e, t) {
        if (t.cm) throw new Error('This document is already in use.'); e.doc=t, t.cm=e, lr(e), Ei(e), qi(e), e.options.lineWrapping||$t(e), e.options.mode=t.modeOption, dr(e);
      } function qi(e) {
        ('rtl'==e.doc.direction?L:M)(e.display.lineDiv, 'CodeMirror-rtl');
      } function Fi(e) {
        this.done=[], this.undone=[], this.undoDepth=1/0, this.lastModTime=this.lastSelTime=0, this.lastOp=this.lastSelOp=null, this.lastOrigin=this.lastSelOrigin=null, this.generation=this.maxGeneration=e||1;
      } function Pi(e, t) {
        const n={from: rt(t.from), to: Mi(t), text: Ke(e, t.from, t.to)}; return Hi(e, n, t.from.line, t.to.line+1), zi(e, (function(e) {
          return Hi(e, n, t.from.line, t.to.line+1);
        }), !0), n;
      } function Ri(e) {
        for (;e.length&&J(e).ranges;)e.pop();
      } function Bi(e, t, n, r) {
        const i=e.history; i.undone.length=0; let o; let s; const a=+new Date; if ((i.lastOp==r||i.lastOrigin==t.origin&&t.origin&&('+'==t.origin.charAt(0)&&i.lastModTime>a-(e.cm?e.cm.options.historyEventDelay:500)||'*'==t.origin.charAt(0)))&&(o=function(e, t) {
          return t?(Ri(e.done), J(e.done)):e.done.length&&!J(e.done).ranges?J(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(), J(e.done)):void 0;
        }(i, i.lastOp==r)))s=J(o.changes), 0==tt(t.from, t.to)&&0==tt(t.from, s.to)?s.to=Mi(t):o.changes.push(Pi(e, t)); else {
          const l=J(i.done); for (l&&l.ranges||Wi(e.sel, i.done), o={changes: [Pi(e, t)], generation: i.generation}, i.done.push(o); i.done.length>i.undoDepth;)i.done.shift(), i.done[0].ranges||i.done.shift();
        }i.done.push(n), i.generation=++i.maxGeneration, i.lastModTime=i.lastSelTime=a, i.lastOp=i.lastSelOp=r, i.lastOrigin=i.lastSelOrigin=t.origin, s||fe(e, 'historyAdded');
      } function ji(e, t, n, r) {
        const i=e.history; const o=r&&r.origin; n==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||function(e, t, n, r) {
          const i=t.charAt(0); return '*'==i||'+'==i&&n.ranges.length==r.ranges.length&&n.somethingSelected()==r.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500);
        }(e, o, J(i.done), t))?i.done[i.done.length-1]=t:Wi(t, i.done), i.lastSelTime=+new Date, i.lastSelOrigin=o, i.lastSelOp=n, r&&!1!==r.clearRedo&&Ri(i.undone);
      } function Wi(e, t) {
        const n=J(t); n&&n.ranges&&n.equals(e)||t.push(e);
      } function Hi(e, t, n, r) {
        let i=t['spans_'+e.id]; let o=0; e.iter(Math.max(e.first, n), Math.min(e.first+e.size, r), (function(n) {
          n.markedSpans&&((i||(i=t['spans_'+e.id]={}))[o]=n.markedSpans), ++o;
        }));
      } function Vi(e) {
        if (!e) return null; for (var t, n=0; n<e.length; ++n)e[n].marker.explicitlyCleared?t||(t=e.slice(0, n)):t&&t.push(e[n]); return t?t.length?t:null:e;
      } function $i(e, t) {
        const n=function(e, t) {
          const n=t['spans_'+e.id]; if (!n) return null; for (var r=[], i=0; i<t.text.length; ++i)r.push(Vi(n[i])); return r;
        }(e, t); const r=Mt(e, t); if (!n) return r; if (!r) return n; for (let i=0; i<n.length; ++i) {
          const o=n[i]; const s=r[i]; if (o&&s) {
            e:for (let a=0; a<s.length; ++a) {
              for (var l=s[a], c=0; c<o.length; ++c) if (o[c].marker==l.marker) continue e; o.push(l);
            }
          } else s&&(n[i]=s);
        } return n;
      } function Ui(e, t, n) {
        for (var r=[], i=0; i<e.length; ++i) {
          const o=e[i]; if (o.ranges)r.push(n?ki.prototype.deepCopy.call(o):o); else {
            const s=o.changes; const a=[]; r.push({changes: a}); for (let l=0; l<s.length; ++l) {
              const c=s[l]; let u=void 0; if (a.push({from: c.from, to: c.to, text: c.text}), t) for (const d in c)(u=d.match(/^spans_(\d+)$/))&&B(t, Number(u[1]))>-1&&(J(a)[d]=c[d], delete c[d]);
            }
          }
        } return r;
      } function Ki(e, t, n, r) {
        if (r) {
          let i=e.anchor; if (n) {
            const o=tt(t, i)<0; o!=tt(n, i)<0?(i=t, t=n):o!=tt(t, n)<0&&(t=n);
          } return new _i(i, t);
        } return new _i(n||t, t);
      } function Ji(e, t, n, r, i) {
        null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)), Qi(e, new ki([Ki(e.sel.primary(), t, n, i)], 0), r);
      } function Yi(e, t, n) {
        for (var r=[], i=e.cm&&(e.cm.display.shift||e.extend), o=0; o<e.sel.ranges.length; o++)r[o]=Ki(e.sel.ranges[o], t[o], null, i); Qi(e, Si(e.cm, r, e.sel.primIndex), n);
      } function Gi(e, t, n, r) {
        const i=e.sel.ranges.slice(0); i[t]=n, Qi(e, Si(e.cm, i, e.sel.primIndex), r);
      } function Xi(e, t, n, r) {
        Qi(e, Ci(t, n), r);
      } function Zi(e, t, n) {
        const r=e.history.done; const i=J(r); i&&i.ranges?(r[r.length-1]=t, eo(e, t, n)):Qi(e, t, n);
      } function Qi(e, t, n) {
        eo(e, t, n), ji(e, e.sel, e.cm?e.cm.curOp.id:NaN, n);
      } function eo(e, t, n) {
        (ve(e, 'beforeSelectionChange')||e.cm&&ve(e.cm, 'beforeSelectionChange'))&&(t=function(e, t, n) {
          const r={ranges: t.ranges, update: function(t) {
            this.ranges=[]; for (let n=0; n<t.length; n++) this.ranges[n]=new _i(at(e, t[n].anchor), at(e, t[n].head));
          }, origin: n&&n.origin}; return fe(e, 'beforeSelectionChange', e, r), e.cm&&fe(e.cm, 'beforeSelectionChange', e.cm, r), r.ranges!=t.ranges?Si(e.cm, r.ranges, r.ranges.length-1):t;
        }(e, t, n)); const r=n&&n.bias||(tt(t.primary().head, e.sel.primary().head)<0?-1:1); to(e, ro(e, t, r, !0)), n&&!1===n.scroll||!e.cm||Nr(e.cm);
      } function to(e, t) {
        t.equals(e.sel)||(e.sel=t, e.cm&&(e.cm.curOp.updateInput=1, e.cm.curOp.selectionChanged=!0, ge(e.cm)), ln(e, 'cursorActivity', e));
      } function no(e) {
        to(e, ro(e, e.sel, null, !1));
      } function ro(e, t, n, r) {
        for (var i, o=0; o<t.ranges.length; o++) {
          const s=t.ranges[o]; const a=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[o]; const l=oo(e, s.anchor, a&&a.anchor, n, r); const c=oo(e, s.head, a&&a.head, n, r); (i||l!=s.anchor||c!=s.head)&&(i||(i=t.ranges.slice(0, o)), i[o]=new _i(l, c));
        } return i?Si(e.cm, i, t.primIndex):t;
      } function io(e, t, n, r, i) {
        const o=Ue(e, t.line); if (o.markedSpans) {
          for (let s=0; s<o.markedSpans.length; ++s) {
            const a=o.markedSpans[s]; const l=a.marker; const c='selectLeft'in l?!l.selectLeft:l.inclusiveLeft; const u='selectRight'in l?!l.selectRight:l.inclusiveRight; if ((null==a.from||(c?a.from<=t.ch:a.from<t.ch))&&(null==a.to||(u?a.to>=t.ch:a.to>t.ch))) {
              if (i&&(fe(l, 'beforeCursorEnter'), l.explicitlyCleared)) {
                if (o.markedSpans) {
                  --s; continue;
                } break;
              } if (!l.atomic) continue; if (n) {
                let d=l.find(r<0?1:-1); let h=void 0; if ((r<0?u:c)&&(d=so(e, d, -r, d&&d.line==t.line?o:null)), d&&d.line==t.line&&(h=tt(d, n))&&(r<0?h<0:h>0)) return io(e, d, t, r, i);
              } let p=l.find(r<0?-1:1); return (r<0?c:u)&&(p=so(e, p, r, p.line==t.line?o:null)), p?io(e, p, t, r, i):null;
            }
          }
        } return t;
      } function oo(e, t, n, r, i) {
        const o=r||1; return io(e, t, n, o, i)||!i&&io(e, t, n, o, !0)||io(e, t, n, -o, i)||!i&&io(e, t, n, -o, !0)||(e.cantEdit=!0, et(e.first, 0));
      } function so(e, t, n, r) {
        return n<0&&0==t.ch?t.line>e.first?at(e, et(t.line-1)):null:n>0&&t.ch==(r||Ue(e, t.line)).text.length?t.line<e.first+e.size-1?et(t.line+1, 0):null:new et(t.line, t.ch+n);
      } function ao(e) {
        e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), W);
      } function lo(e, t, n) {
        var r={canceled: !1, from: t.from, to: t.to, text: t.text, origin: t.origin, cancel: function() {
          return r.canceled=!0;
        }}; return n&&(r.update=function(t, n, i, o) {
          t&&(r.from=at(e, t)), n&&(r.to=at(e, n)), i&&(r.text=i), void 0!==o&&(r.origin=o);
        }), fe(e, 'beforeChange', e, r), e.cm&&fe(e.cm, 'beforeChange', e.cm, r), r.canceled?(e.cm&&(e.cm.curOp.updateInput=2), null):{from: r.from, to: r.to, text: r.text, origin: r.origin};
      } function co(e, t, n) {
        if (e.cm) {
          if (!e.cm.curOp) return ei(e.cm, co)(e, t, n); if (e.cm.state.suppressEdits) return;
        } if (!(ve(e, 'beforeChange')||e.cm&&ve(e.cm, 'beforeChange'))||(t=lo(e, t, !0))) {
          const r=xt&&!n&&function(e, t, n) {
            let r=null; if (e.iter(t.line, n.line+1, (function(e) {
              if (e.markedSpans) {
                for (let t=0; t<e.markedSpans.length; ++t) {
                  const n=e.markedSpans[t].marker; !n.readOnly||r&&-1!=B(r, n)||(r||(r=[])).push(n);
                }
              }
            })), !r) return null; for (var i=[{from: t, to: n}], o=0; o<r.length; ++o) {
              for (let s=r[o], a=s.find(0), l=0; l<i.length; ++l) {
                const c=i[l]; if (!(tt(c.to, a.from)<0||tt(c.from, a.to)>0)) {
                  const u=[l, 1]; const d=tt(c.from, a.from); const h=tt(c.to, a.to); (d<0||!s.inclusiveLeft&&!d)&&u.push({from: c.from, to: a.from}), (h>0||!s.inclusiveRight&&!h)&&u.push({from: a.to, to: c.to}), i.splice.apply(i, u), l+=u.length-3;
                }
              }
            } return i;
          }(e, t.from, t.to); if (r) for (let i=r.length-1; i>=0; --i)uo(e, {from: r[i].from, to: r[i].to, text: i?['']:t.text, origin: t.origin}); else uo(e, t);
        }
      } function uo(e, t) {
        if (1!=t.text.length||''!=t.text[0]||0!=tt(t.from, t.to)) {
          const n=Oi(e, t); Bi(e, t, n, e.cm?e.cm.curOp.id:NaN), fo(e, t, n, Mt(e, t)); const r=[]; zi(e, (function(e, n) {
            n||-1!=B(r, e.history)||(yo(e.history, t), r.push(e.history)), fo(e, t, null, Mt(e, t));
          }));
        }
      } function ho(e, t, n) {
        const r=e.cm&&e.cm.state.suppressEdits; if (!r||n) {
          for (var i, o=e.history, s=e.sel, a='undo'==t?o.done:o.undone, l='undo'==t?o.undone:o.done, c=0; c<a.length&&(i=a[c], n?!i.ranges||i.equals(e.sel):i.ranges); c++);if (c!=a.length) {
            for (o.lastOrigin=o.lastSelOrigin=null; ;) {
              if (!(i=a.pop()).ranges) {
                if (r) return void a.push(i); break;
              } if (Wi(i, l), n&&!i.equals(e.sel)) return void Qi(e, i, {clearRedo: !1}); s=i;
            } const u=[]; Wi(s, l), l.push({changes: u, generation: o.generation}), o.generation=i.generation||++o.maxGeneration; for (var d=ve(e, 'beforeChange')||e.cm&&ve(e.cm, 'beforeChange'), h=function(n) {
                const r=i.changes[n]; if (r.origin=t, d&&!lo(e, r, !1)) return a.length=0, {}; u.push(Pi(e, r)); const o=n?Oi(e, r):J(a); fo(e, r, o, $i(e, r)), !n&&e.cm&&e.cm.scrollIntoView({from: r.from, to: Mi(r)}); const s=[]; zi(e, (function(e, t) {
                  t||-1!=B(s, e.history)||(yo(e.history, r), s.push(e.history)), fo(e, r, null, $i(e, r));
                }));
              }, p=i.changes.length-1; p>=0; --p) {
              const f=h(p); if (f) return f.v;
            }
          }
        }
      } function po(e, t) {
        if (0!=t&&(e.first+=t, e.sel=new ki(Y(e.sel.ranges, (function(e) {
          return new _i(et(e.anchor.line+t, e.anchor.ch), et(e.head.line+t, e.head.ch));
        })), e.sel.primIndex), e.cm)) {
          dr(e.cm, e.first, e.first-t, t); for (let n=e.cm.display, r=n.viewFrom; r<n.viewTo; r++)hr(e.cm, r, 'gutter');
        }
      } function fo(e, t, n, r) {
        if (e.cm&&!e.cm.curOp) return ei(e.cm, fo)(e, t, n, r); if (t.to.line<e.first)po(e, t.text.length-1-(t.to.line-t.from.line)); else if (!(t.from.line>e.lastLine())) {
          if (t.from.line<e.first) {
            const i=t.text.length-1-(e.first-t.from.line); po(e, i), t={from: et(e.first, 0), to: et(t.to.line+i, t.to.ch), text: [J(t.text)], origin: t.origin};
          } const o=e.lastLine(); t.to.line>o&&(t={from: t.from, to: et(o, Ue(e, o).text.length), text: [t.text[0]], origin: t.origin}), t.removed=Ke(e, t.from, t.to), n||(n=Oi(e, t)), e.cm?function(e, t, n) {
            const r=e.doc; const i=e.display; const o=t.from; const s=t.to; let a=!1; let l=o.line; e.options.lineWrapping||(l=Ge(Pt(Ue(r, o.line))), r.iter(l, s.line+1, (function(e) {
              if (e==i.maxLine) return a=!0, !0;
            }))), r.sel.contains(t.from, t.to)>-1&&ge(e), Li(r, t, n, ar(e)), e.options.lineWrapping||(r.iter(l, o.line+t.text.length, (function(e) {
              const t=Vt(e); t>i.maxLineLength&&(i.maxLine=e, i.maxLineLength=t, i.maxLineChanged=!0, a=!1);
            })), a&&(e.curOp.updateMaxLine=!0)), function(e, t) {
              if (e.modeFrontier=Math.min(e.modeFrontier, t), !(e.highlightFrontier<t-10)) {
                for (var n=e.first, r=t-1; r>n; r--) {
                  const i=Ue(e, r).stateAfter; if (i&&(!(i instanceof ct)||r+i.lookAhead<t)) {
                    n=r+1; break;
                  }
                }e.highlightFrontier=Math.min(e.highlightFrontier, n);
              }
            }(r, o.line), ri(e, 400); const c=t.text.length-(s.line-o.line)-1; t.full?dr(e):o.line!=s.line||1!=t.text.length||Ai(e.doc, t)?dr(e, o.line, s.line+1, c):hr(e, o.line, 'text'); const u=ve(e, 'changes'); const d=ve(e, 'change'); if (d||u) {
              const h={from: o, to: s, text: t.text, removed: t.removed, origin: t.origin}; d&&ln(e, 'change', e, h), u&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(h);
            }e.display.selForContextMenu=null;
          }(e.cm, t, r):Li(e, t, r), eo(e, n, W), e.cantEdit&&oo(e, et(e.firstLine(), 0))&&(e.cantEdit=!1);
        }
      } function mo(e, t, n, r, i) {
        let o; r||(r=n), tt(r, n)<0&&(n=(o=[r, n])[0], r=o[1]), 'string'==typeof t&&(t=e.splitLines(t)), co(e, {from: n, to: r, text: t, origin: i});
      } function go(e, t, n, r) {
n<e.line?e.line+=r:t<e.line&&(e.line=t, e.ch=0);
      } function vo(e, t, n, r) {
        for (let i=0; i<e.length; ++i) {
          let o=e[i]; let s=!0; if (o.ranges) {
            o.copied||((o=e[i]=o.deepCopy()).copied=!0); for (let a=0; a<o.ranges.length; a++)go(o.ranges[a].anchor, t, n, r), go(o.ranges[a].head, t, n, r);
          } else {
            for (let l=0; l<o.changes.length; ++l) {
              const c=o.changes[l]; if (n<c.from.line)c.from=et(c.from.line+r, c.from.ch), c.to=et(c.to.line+r, c.to.ch); else if (t<=c.to.line) {
                s=!1; break;
              }
            }s||(e.splice(0, i+1), i=0);
          }
        }
      } function yo(e, t) {
        const n=t.from.line; const r=t.to.line; const i=t.text.length-(r-n)-1; vo(e.done, n, r, i), vo(e.undone, n, r, i);
      } function bo(e, t, n, r) {
        let i=t; let o=t; return 'number'==typeof t?o=Ue(e, st(e, t)):i=Ge(t), null==i?null:(r(o, i)&&e.cm&&hr(e.cm, i, n), o);
      } function wo(e) {
        this.lines=e, this.parent=null; for (var t=0, n=0; n<e.length; ++n)e[n].parent=this, t+=e[n].height; this.height=t;
      } function xo(e) {
        this.children=e; for (var t=0, n=0, r=0; r<e.length; ++r) {
          const i=e[r]; t+=i.chunkSize(), n+=i.height, i.parent=this;
        } this.size=t, this.height=n, this.parent=null;
      }_i.prototype.from=function() {
        return ot(this.anchor, this.head);
      }, _i.prototype.to=function() {
        return it(this.anchor, this.head);
      }, _i.prototype.empty=function() {
        return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch;
      }, wo.prototype={chunkSize: function() {
        return this.lines.length;
      }, removeInner: function(e, t) {
        for (let n=e, r=e+t; n<r; ++n) {
          const i=this.lines[n]; this.height-=i.height, Kt(i), ln(i, 'delete');
        } this.lines.splice(e, t);
      }, collapse: function(e) {
        e.push.apply(e, this.lines);
      }, insertInner: function(e, t, n) {
        this.height+=n, this.lines=this.lines.slice(0, e).concat(t).concat(this.lines.slice(e)); for (let r=0; r<t.length; ++r)t[r].parent=this;
      }, iterN: function(e, t, n) {
        for (let r=e+t; e<r; ++e) if (n(this.lines[e])) return !0;
      }}, xo.prototype={chunkSize: function() {
        return this.size;
      }, removeInner: function(e, t) {
        this.size-=t; for (let n=0; n<this.children.length; ++n) {
          const r=this.children[n]; const i=r.chunkSize(); if (e<i) {
            const o=Math.min(t, i-e); const s=r.height; if (r.removeInner(e, o), this.height-=s-r.height, i==o&&(this.children.splice(n--, 1), r.parent=null), 0==(t-=o)) break; e=0;
          } else e-=i;
        } if (this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof wo))) {
          const a=[]; this.collapse(a), this.children=[new wo(a)], this.children[0].parent=this;
        }
      }, collapse: function(e) {
        for (let t=0; t<this.children.length; ++t) this.children[t].collapse(e);
      }, insertInner: function(e, t, n) {
        this.size+=t.length, this.height+=n; for (let r=0; r<this.children.length; ++r) {
          const i=this.children[r]; const o=i.chunkSize(); if (e<=o) {
            if (i.insertInner(e, t, n), i.lines&&i.lines.length>50) {
              for (var s=i.lines.length%25+25, a=s; a<i.lines.length;) {
                const l=new wo(i.lines.slice(a, a+=25)); i.height-=l.height, this.children.splice(++r, 0, l), l.parent=this;
              }i.lines=i.lines.slice(0, s), this.maybeSpill();
            } break;
          }e-=o;
        }
      }, maybeSpill: function() {
        if (!(this.children.length<=10)) {
          let e=this; do {
            const t=new xo(e.children.splice(e.children.length-5, 5)); if (e.parent) {
              e.size-=t.size, e.height-=t.height; const n=B(e.parent.children, e); e.parent.children.splice(n+1, 0, t);
            } else {
              const r=new xo(e.children); r.parent=e, e.children=[r, t], e=r;
            }t.parent=e.parent;
          } while (e.children.length>10); e.parent.maybeSpill();
        }
      }, iterN: function(e, t, n) {
        for (let r=0; r<this.children.length; ++r) {
          const i=this.children[r]; const o=i.chunkSize(); if (e<o) {
            const s=Math.min(t, o-e); if (i.iterN(e, s, n)) return !0; if (0==(t-=s)) break; e=0;
          } else e-=o;
        }
      }}; const ko=function(e, t, n) {
        if (n) for (const r in n)n.hasOwnProperty(r)&&(this[r]=n[r]); this.doc=e, this.node=t;
      }; function _o(e, t, n) {
        Ht(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Er(e, n);
      }ko.prototype.clear=function() {
        const e=this.doc.cm; const t=this.line.widgets; const n=this.line; const r=Ge(n); if (null!=r&&t) {
          for (let i=0; i<t.length; ++i)t[i]==this&&t.splice(i--, 1); t.length||(n.widgets=null); const o=xn(this); Ye(n, Math.max(0, n.height-o)), e&&(Qr(e, (function() {
            _o(e, n, -o), hr(e, r, 'widget');
          })), ln(e, 'lineWidgetCleared', e, this, r));
        }
      }, ko.prototype.changed=function() {
        const e=this; const t=this.height; const n=this.doc.cm; const r=this.line; this.height=null; const i=xn(this)-t; i&&(jt(this.doc, r)||Ye(r, r.height+i), n&&Qr(n, (function() {
          n.curOp.forceUpdate=!0, _o(n, r, i), ln(n, 'lineWidgetChanged', n, e, Ge(r));
        })));
      }, ye(ko); let So=0; const Co=function(e, t) {
        this.lines=[], this.type=t, this.doc=e, this.id=++So;
      }; function Mo(e, t, n, r, i) {
        if (r&&r.shared) {
          return function(e, t, n, r, i) {
            (r=F(r)).shared=!1; const o=[Mo(e, t, n, r, i)]; let s=o[0]; const a=r.widgetNode; return zi(e, (function(e) {
              a&&(r.widgetNode=a.cloneNode(!0)), o.push(Mo(e, at(e, t), at(e, n), r, i)); for (let l=0; l<e.linked.length; ++l) if (e.linked[l].isParent) return; s=J(o);
            })), new To(o, s);
          }(e, t, n, r, i);
        } if (e.cm&&!e.cm.curOp) return ei(e.cm, Mo)(e, t, n, r, i); const o=new Co(e, i); const s=tt(t, n); if (r&&F(r, o, !1), s>0||0==s&&!1!==o.clearWhenEmpty) return o; if (o.replacedWith&&(o.collapsed=!0, o.widgetNode=E('span', [o.replacedWith], 'CodeMirror-widget'), r.handleMouseEvents||o.widgetNode.setAttribute('cm-ignore-events', 'true'), r.insertLeft&&(o.widgetNode.insertLeft=!0)), o.collapsed) {
          if (Ft(e, t.line, t, n, o)||t.line!=n.line&&Ft(e, n.line, t, n, o)) throw new Error('Inserting collapsed marker partially overlapping an existing one'); kt=!0;
        }o.addToHistory&&Bi(e, {from: t, to: n, origin: 'markText'}, e.sel, NaN); let a; let l=t.line; const c=e.cm; if (e.iter(l, n.line+1, (function(e) {
          c&&o.collapsed&&!c.options.lineWrapping&&Pt(e)==c.display.maxLine&&(a=!0), o.collapsed&&l!=t.line&&Ye(e, 0), function(e, t) {
            e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t], t.marker.attachLine(e);
          }(e, new _t(o, l==t.line?t.ch:null, l==n.line?n.ch:null)), ++l;
        })), o.collapsed&&e.iter(t.line, n.line+1, (function(t) {
          jt(e, t)&&Ye(t, 0);
        })), o.clearOnEnter&&de(o, 'beforeCursorEnter', (function() {
          return o.clear();
        })), o.readOnly&&(xt=!0, (e.history.done.length||e.history.undone.length)&&e.clearHistory()), o.collapsed&&(o.id=++So, o.atomic=!0), c) {
          if (a&&(c.curOp.updateMaxLine=!0), o.collapsed)dr(c, t.line, n.line+1); else if (o.className||o.startStyle||o.endStyle||o.css||o.attributes||o.title) for (let u=t.line; u<=n.line; u++)hr(c, u, 'text'); o.atomic&&no(c.doc), ln(c, 'markerAdded', c, o);
        } return o;
      }Co.prototype.clear=function() {
        if (!this.explicitlyCleared) {
          const e=this.doc.cm; const t=e&&!e.curOp; if (t&&Ur(e), ve(this, 'clear')) {
            const n=this.find(); n&&ln(this, 'clear', n.from, n.to);
          } for (var r=null, i=null, o=0; o<this.lines.length; ++o) {
            const s=this.lines[o]; const a=St(s.markedSpans, this); e&&!this.collapsed?hr(e, Ge(s), 'text'):e&&(null!=a.to&&(i=Ge(s)), null!=a.from&&(r=Ge(s))), s.markedSpans=Ct(s.markedSpans, a), null==a.from&&this.collapsed&&!jt(this.doc, s)&&e&&Ye(s, rr(e.display));
          } if (e&&this.collapsed&&!e.options.lineWrapping) {
            for (let l=0; l<this.lines.length; ++l) {
              const c=Pt(this.lines[l]); const u=Vt(c); u>e.display.maxLineLength&&(e.display.maxLine=c, e.display.maxLineLength=u, e.display.maxLineChanged=!0);
            }
          }null!=r&&e&&this.collapsed&&dr(e, r, i+1), this.lines.length=0, this.explicitlyCleared=!0, this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1, e&&no(e.doc)), e&&ln(e, 'markerCleared', e, this, r, i), t&&Kr(e), this.parent&&this.parent.clear();
        }
      }, Co.prototype.find=function(e, t) {
        let n; let r; null==e&&'bookmark'==this.type&&(e=1); for (let i=0; i<this.lines.length; ++i) {
          const o=this.lines[i]; const s=St(o.markedSpans, this); if (null!=s.from&&(n=et(t?o:Ge(o), s.from), -1==e)) return n; if (null!=s.to&&(r=et(t?o:Ge(o), s.to), 1==e)) return r;
        } return n&&{from: n, to: r};
      }, Co.prototype.changed=function() {
        const e=this; const t=this.find(-1, !0); const n=this; const r=this.doc.cm; t&&r&&Qr(r, (function() {
          const i=t.line; const o=Ge(t.line); const s=Nn(r, o); if (s&&(Pn(s), r.curOp.selectionChanged=r.curOp.forceUpdate=!0), r.curOp.updateMaxLine=!0, !jt(n.doc, i)&&null!=n.height) {
            const a=n.height; n.height=null; const l=xn(n)-a; l&&Ye(i, i.height+l);
          }ln(r, 'markerChanged', r, e);
        }));
      }, Co.prototype.attachLine=function(e) {
        if (!this.lines.length&&this.doc.cm) {
          const t=this.doc.cm.curOp; t.maybeHiddenMarkers&&-1!=B(t.maybeHiddenMarkers, this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this);
        } this.lines.push(e);
      }, Co.prototype.detachLine=function(e) {
        if (this.lines.splice(B(this.lines, e), 1), !this.lines.length&&this.doc.cm) {
          const t=this.doc.cm.curOp; (t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this);
        }
      }, ye(Co); var To=function(e, t) {
        this.markers=e, this.primary=t; for (let n=0; n<e.length; ++n)e[n].parent=this;
      }; function Oo(e) {
        return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), (function(e) {
          return e.parent;
        }));
      } function Do(e) {
        for (let t=function(t) {
            const n=e[t]; const r=[n.primary.doc]; zi(n.primary.doc, (function(e) {
              return r.push(e);
            })); for (let i=0; i<n.markers.length; i++) {
              const o=n.markers[i]; -1==B(r, o.doc)&&(o.parent=null, n.markers.splice(i--, 1));
            }
          }, n=0; n<e.length; n++)t(n);
      }To.prototype.clear=function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared=!0; for (let e=0; e<this.markers.length; ++e) this.markers[e].clear(); ln(this, 'clear');
        }
      }, To.prototype.find=function(e, t) {
        return this.primary.find(e, t);
      }, ye(To); let Eo=0; var No=function(e, t, n, r, i) {
        if (!(this instanceof No)) return new No(e, t, n, r, i); null==n&&(n=0), xo.call(this, [new wo([new Ut('', null)])]), this.first=n, this.scrollTop=this.scrollLeft=0, this.cantEdit=!1, this.cleanGeneration=1, this.modeFrontier=this.highlightFrontier=n; const o=et(n, 0); this.sel=Ci(o), this.history=new Fi(null), this.id=++Eo, this.modeOption=t, this.lineSep=r, this.direction='rtl'==i?'rtl':'ltr', this.extend=!1, 'string'==typeof e&&(e=this.splitLines(e)), Li(this, {from: o, to: o, text: e}), Qi(this, Ci(o), W);
      }; No.prototype=X(xo.prototype, {constructor: No, iter: function(e, t, n) {
n?this.iterN(e-this.first, t-e, n):this.iterN(this.first, this.first+this.size, e);
      }, insert: function(e, t) {
        for (var n=0, r=0; r<t.length; ++r)n+=t[r].height; this.insertInner(e-this.first, t, n);
      }, remove: function(e, t) {
        this.removeInner(e-this.first, t);
      }, getValue: function(e) {
        const t=Je(this, this.first, this.first+this.size); return !1===e?t:t.join(e||this.lineSeparator());
      }, setValue: ni((function(e) {
        const t=et(this.first, 0); const n=this.first+this.size-1; co(this, {from: t, to: et(n, Ue(this, n).text.length), text: this.splitLines(e), origin: 'setValue', full: !0}, !0), this.cm&&Ar(this.cm, 0, 0), Qi(this, Ci(t), W);
      })), replaceRange: function(e, t, n, r) {
        mo(this, e, t=at(this, t), n=n?at(this, n):t, r);
      }, getRange: function(e, t, n) {
        const r=Ke(this, at(this, e), at(this, t)); return !1===n?r:r.join(n||this.lineSeparator());
      }, getLine: function(e) {
        const t=this.getLineHandle(e); return t&&t.text;
      }, getLineHandle: function(e) {
        if (Ze(this, e)) return Ue(this, e);
      }, getLineNumber: function(e) {
        return Ge(e);
      }, getLineHandleVisualStart: function(e) {
        return 'number'==typeof e&&(e=Ue(this, e)), Pt(e);
      }, lineCount: function() {
        return this.size;
      }, firstLine: function() {
        return this.first;
      }, lastLine: function() {
        return this.first+this.size-1;
      }, clipPos: function(e) {
        return at(this, e);
      }, getCursor: function(e) {
        const t=this.sel.primary(); return null==e||'head'==e?t.head:'anchor'==e?t.anchor:'end'==e||'to'==e||!1===e?t.to():t.from();
      }, listSelections: function() {
        return this.sel.ranges;
      }, somethingSelected: function() {
        return this.sel.somethingSelected();
      }, setCursor: ni((function(e, t, n) {
        Xi(this, at(this, 'number'==typeof e?et(e, t||0):e), null, n);
      })), setSelection: ni((function(e, t, n) {
        Xi(this, at(this, e), at(this, t||e), n);
      })), extendSelection: ni((function(e, t, n) {
        Ji(this, at(this, e), t&&at(this, t), n);
      })), extendSelections: ni((function(e, t) {
        Yi(this, lt(this, e), t);
      })), extendSelectionsBy: ni((function(e, t) {
        Yi(this, lt(this, Y(this.sel.ranges, e)), t);
      })), setSelections: ni((function(e, t, n) {
        if (e.length) {
          for (var r=[], i=0; i<e.length; i++)r[i]=new _i(at(this, e[i].anchor), at(this, e[i].head)); null==t&&(t=Math.min(e.length-1, this.sel.primIndex)), Qi(this, Si(this.cm, r, t), n);
        }
      })), addSelection: ni((function(e, t, n) {
        const r=this.sel.ranges.slice(0); r.push(new _i(at(this, e), at(this, t||e))), Qi(this, Si(this.cm, r, r.length-1), n);
      })), getSelection: function(e) {
        for (var t, n=this.sel.ranges, r=0; r<n.length; r++) {
          const i=Ke(this, n[r].from(), n[r].to()); t=t?t.concat(i):i;
        } return !1===e?t:t.join(e||this.lineSeparator());
      }, getSelections: function(e) {
        for (var t=[], n=this.sel.ranges, r=0; r<n.length; r++) {
          let i=Ke(this, n[r].from(), n[r].to()); !1!==e&&(i=i.join(e||this.lineSeparator())), t[r]=i;
        } return t;
      }, replaceSelection: function(e, t, n) {
        for (var r=[], i=0; i<this.sel.ranges.length; i++)r[i]=e; this.replaceSelections(r, t, n||'+input');
      }, replaceSelections: ni((function(e, t, n) {
        for (var r=[], i=this.sel, o=0; o<i.ranges.length; o++) {
          const s=i.ranges[o]; r[o]={from: s.from(), to: s.to(), text: this.splitLines(e[o]), origin: n};
        } for (var a=t&&'end'!=t&&function(e, t, n) {
            for (var r=[], i=et(e.first, 0), o=i, s=0; s<t.length; s++) {
              const a=t[s]; const l=Di(a.from, i, o); const c=Di(Mi(a), i, o); if (i=a.to, o=c, 'around'==n) {
                const u=e.sel.ranges[s]; const d=tt(u.head, u.anchor)<0; r[s]=new _i(d?c:l, d?l:c);
              } else r[s]=new _i(l, l);
            } return new ki(r, e.sel.primIndex);
          }(this, r, t), l=r.length-1; l>=0; l--)co(this, r[l]); a?Zi(this, a):this.cm&&Nr(this.cm);
      })), undo: ni((function() {
        ho(this, 'undo');
      })), redo: ni((function() {
        ho(this, 'redo');
      })), undoSelection: ni((function() {
        ho(this, 'undo', !0);
      })), redoSelection: ni((function() {
        ho(this, 'redo', !0);
      })), setExtending: function(e) {
        this.extend=e;
      }, getExtending: function() {
        return this.extend;
      }, historySize: function() {
        for (var e=this.history, t=0, n=0, r=0; r<e.done.length; r++)e.done[r].ranges||++t; for (let i=0; i<e.undone.length; i++)e.undone[i].ranges||++n; return {undo: t, redo: n};
      }, clearHistory: function() {
        const e=this; this.history=new Fi(this.history.maxGeneration), zi(this, (function(t) {
          return t.history=e.history;
        }), !0);
      }, markClean: function() {
        this.cleanGeneration=this.changeGeneration(!0);
      }, changeGeneration: function(e) {
        return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null), this.history.generation;
      }, isClean: function(e) {
        return this.history.generation==(e||this.cleanGeneration);
      }, getHistory: function() {
        return {done: Ui(this.history.done), undone: Ui(this.history.undone)};
      }, setHistory: function(e) {
        const t=this.history=new Fi(this.history.maxGeneration); t.done=Ui(e.done.slice(0), null, !0), t.undone=Ui(e.undone.slice(0), null, !0);
      }, setGutterMarker: ni((function(e, t, n) {
        return bo(this, e, 'gutter', (function(e) {
          const r=e.gutterMarkers||(e.gutterMarkers={}); return r[t]=n, !n&&te(r)&&(e.gutterMarkers=null), !0;
        }));
      })), clearGutter: ni((function(e) {
        const t=this; this.iter((function(n) {
          n.gutterMarkers&&n.gutterMarkers[e]&&bo(t, n, 'gutter', (function() {
            return n.gutterMarkers[e]=null, te(n.gutterMarkers)&&(n.gutterMarkers=null), !0;
          }));
        }));
      })), lineInfo: function(e) {
        let t; if ('number'==typeof e) {
          if (!Ze(this, e)) return null; if (t=e, !(e=Ue(this, e))) return null;
        } else if (null==(t=Ge(e))) return null; return {line: t, handle: e, text: e.text, gutterMarkers: e.gutterMarkers, textClass: e.textClass, bgClass: e.bgClass, wrapClass: e.wrapClass, widgets: e.widgets};
      }, addLineClass: ni((function(e, t, n) {
        return bo(this, e, 'gutter'==t?'gutter':'class', (function(e) {
          const r='text'==t?'textClass':'background'==t?'bgClass':'gutter'==t?'gutterClass':'wrapClass'; if (e[r]) {
            if (S(n).test(e[r])) return !1; e[r]+=' '+n;
          } else e[r]=n; return !0;
        }));
      })), removeLineClass: ni((function(e, t, n) {
        return bo(this, e, 'gutter'==t?'gutter':'class', (function(e) {
          const r='text'==t?'textClass':'background'==t?'bgClass':'gutter'==t?'gutterClass':'wrapClass'; const i=e[r]; if (!i) return !1; if (null==n)e[r]=null; else {
            const o=i.match(S(n)); if (!o) return !1; const s=o.index+o[0].length; e[r]=i.slice(0, o.index)+(o.index&&s!=i.length?' ':'')+i.slice(s)||null;
          } return !0;
        }));
      })), addLineWidget: ni((function(e, t, n) {
        return function(e, t, n, r) {
          const i=new ko(e, n, r); const o=e.cm; return o&&i.noHScroll&&(o.display.alignWidgets=!0), bo(e, t, 'widget', (function(t) {
            const n=t.widgets||(t.widgets=[]); if (null==i.insertAt?n.push(i):n.splice(Math.min(n.length, Math.max(0, i.insertAt)), 0, i), i.line=t, o&&!jt(e, t)) {
              const r=Ht(t)<e.scrollTop; Ye(t, t.height+xn(i)), r&&Er(o, i.height), o.curOp.forceUpdate=!0;
            } return !0;
          })), o&&ln(o, 'lineWidgetAdded', o, i, 'number'==typeof t?t:Ge(t)), i;
        }(this, e, t, n);
      })), removeLineWidget: function(e) {
        e.clear();
      }, markText: function(e, t, n) {
        return Mo(this, at(this, e), at(this, t), n, n&&n.type||'range');
      }, setBookmark: function(e, t) {
        const n={replacedWith: t&&(null==t.nodeType?t.widget:t), insertLeft: t&&t.insertLeft, clearWhenEmpty: !1, shared: t&&t.shared, handleMouseEvents: t&&t.handleMouseEvents}; return Mo(this, e=at(this, e), e, n, 'bookmark');
      }, findMarksAt: function(e) {
        const t=[]; const n=Ue(this, (e=at(this, e)).line).markedSpans; if (n) {
          for (let r=0; r<n.length; ++r) {
            const i=n[r]; (null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker);
          }
        } return t;
      }, findMarks: function(e, t, n) {
        e=at(this, e), t=at(this, t); const r=[]; let i=e.line; return this.iter(e.line, t.line+1, (function(o) {
          const s=o.markedSpans; if (s) {
            for (let a=0; a<s.length; a++) {
              const l=s[a]; null!=l.to&&i==e.line&&e.ch>=l.to||null==l.from&&i!=e.line||null!=l.from&&i==t.line&&l.from>=t.ch||n&&!n(l.marker)||r.push(l.marker.parent||l.marker);
            }
          }++i;
        })), r;
      }, getAllMarks: function() {
        const e=[]; return this.iter((function(t) {
          const n=t.markedSpans; if (n) for (let r=0; r<n.length; ++r)null!=n[r].from&&e.push(n[r].marker);
        })), e;
      }, posFromIndex: function(e) {
        let t; let n=this.first; const r=this.lineSeparator().length; return this.iter((function(i) {
          const o=i.text.length+r; if (o>e) return t=e, !0; e-=o, ++n;
        })), at(this, et(n, t));
      }, indexFromPos: function(e) {
        let t=(e=at(this, e)).ch; if (e.line<this.first||e.ch<0) return 0; const n=this.lineSeparator().length; return this.iter(this.first, e.line, (function(e) {
          t+=e.text.length+n;
        })), t;
      }, copy: function(e) {
        const t=new No(Je(this, this.first, this.first+this.size), this.modeOption, this.first, this.lineSep, this.direction); return t.scrollTop=this.scrollTop, t.scrollLeft=this.scrollLeft, t.sel=this.sel, t.extend=!1, e&&(t.history.undoDepth=this.history.undoDepth, t.setHistory(this.getHistory())), t;
      }, linkedDoc: function(e) {
        e||(e={}); let t=this.first; let n=this.first+this.size; null!=e.from&&e.from>t&&(t=e.from), null!=e.to&&e.to<n&&(n=e.to); const r=new No(Je(this, t, n), e.mode||this.modeOption, t, this.lineSep, this.direction); return e.sharedHist&&(r.history=this.history), (this.linked||(this.linked=[])).push({doc: r, sharedHist: e.sharedHist}), r.linked=[{doc: this, isParent: !0, sharedHist: e.sharedHist}], function(e, t) {
          for (let n=0; n<t.length; n++) {
            const r=t[n]; const i=r.find(); const o=e.clipPos(i.from); const s=e.clipPos(i.to); if (tt(o, s)) {
              const a=Mo(e, o, s, r.primary, r.primary.type); r.markers.push(a), a.parent=r;
            }
          }
        }(r, Oo(this)), r;
      }, unlinkDoc: function(e) {
        if (e instanceof Ts&&(e=e.doc), this.linked) {
          for (let t=0; t<this.linked.length; ++t) {
            if (this.linked[t].doc==e) {
              this.linked.splice(t, 1), e.unlinkDoc(this), Do(Oo(this)); break;
            }
          }
        } if (e.history==this.history) {
          const n=[e.id]; zi(e, (function(e) {
            return n.push(e.id);
          }), !0), e.history=new Fi(null), e.history.done=Ui(this.history.done, n), e.history.undone=Ui(this.history.undone, n);
        }
      }, iterLinkedDocs: function(e) {
        zi(this, e);
      }, getMode: function() {
        return this.mode;
      }, getEditor: function() {
        return this.cm;
      }, splitLines: function(e) {
        return this.lineSep?e.split(this.lineSep):Ne(e);
      }, lineSeparator: function() {
        return this.lineSep||'\n';
      }, setDirection: ni((function(e) {
        let t; 'rtl'!=e&&(e='ltr'), e!=this.direction&&(this.direction=e, this.iter((function(e) {
          return e.order=null;
        })), this.cm&&Qr(t=this.cm, (function() {
          qi(t), dr(t);
        })));
      }))}), No.prototype.eachLine=No.prototype.iter; let Ao=0; function Lo(e) {
        const t=this; if (zo(t), !me(t, e)&&!kn(t.display, e)) {
          be(e), s&&(Ao=+new Date); let n=cr(t, e, !0); const r=e.dataTransfer.files; if (n&&!t.isReadOnly()) {
            if (r&&r.length&&window.FileReader&&window.File) {
              for (var i=r.length, o=Array(i), a=0, l=function() {
                  ++a==i&&ei(t, (function() {
                    const e={from: n=at(t.doc, n), to: n, text: t.doc.splitLines(o.filter((function(e) {
                      return null!=e;
                    })).join(t.doc.lineSeparator())), origin: 'paste'}; co(t.doc, e), Zi(t.doc, Ci(at(t.doc, n), at(t.doc, Mi(e))));
                  }))();
                }, c=function(e, n) {
                  if (t.options.allowDropFileTypes&&-1==B(t.options.allowDropFileTypes, e.type))l(); else {
                    const r=new FileReader; r.onerror=function() {
                      return l();
                    }, r.onload=function() {
                      const e=r.result; /[\x00-\x08\x0e-\x1f]{2}/.test(e)||(o[n]=e), l();
                    }, r.readAsText(e);
                  }
                }, u=0; u<r.length; u++)c(r[u], u);
            } else {
              if (t.state.draggingText&&t.doc.sel.contains(n)>-1) {
                return t.state.draggingText(e), void setTimeout((function() {
                  return t.display.input.focus();
                }), 20);
              } try {
                const d=e.dataTransfer.getData('Text'); if (d) {
                  let h; if (t.state.draggingText&&!t.state.draggingText.copy&&(h=t.listSelections()), eo(t.doc, Ci(n, n)), h) for (let p=0; p<h.length; ++p)mo(t.doc, '', h[p].anchor, h[p].head, 'drag'); t.replaceSelection(d, 'around', 'paste'), t.display.input.focus();
                }
              } catch (e) {}
            }
          }
        }
      } function zo(e) {
        e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor=null);
      } function Io(e) {
        if (document.getElementsByClassName) {
          for (var t=document.getElementsByClassName('CodeMirror'), n=[], r=0; r<t.length; r++) {
            const i=t[r].CodeMirror; i&&n.push(i);
          }n.length&&n[0].operation((function() {
            for (let t=0; t<n.length; t++)e(n[t]);
          }));
        }
      } let qo=!1; function Fo() {
        let e; qo||(de(window, 'resize', (function() {
          null==e&&(e=setTimeout((function() {
            e=null, Io(Po);
          }), 100));
        })), de(window, 'blur', (function() {
          return Io(Cr);
        })), qo=!0);
      } function Po(e) {
        const t=e.display; t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null, t.scrollbarsClipped=!1, e.setSize();
      } for (var Ro={3: 'Pause', 8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Ctrl', 18: 'Alt', 19: 'Pause', 20: 'CapsLock', 27: 'Esc', 32: 'Space', 33: 'PageUp', 34: 'PageDown', 35: 'End', 36: 'Home', 37: 'Left', 38: 'Up', 39: 'Right', 40: 'Down', 44: 'PrintScrn', 45: 'Insert', 46: 'Delete', 59: ';', 61: '=', 91: 'Mod', 92: 'Mod', 93: 'Mod', 106: '*', 107: '=', 109: '-', 110: '.', 111: '/', 145: 'ScrollLock', 173: '-', 186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: '\'', 224: 'Mod', 63232: 'Up', 63233: 'Down', 63234: 'Left', 63235: 'Right', 63272: 'Delete', 63273: 'Home', 63275: 'End', 63276: 'PageUp', 63277: 'PageDown', 63302: 'Insert'}, Bo=0; Bo<10; Bo++)Ro[Bo+48]=Ro[Bo+96]=String(Bo); for (let jo=65; jo<=90; jo++)Ro[jo]=String.fromCharCode(jo); for (let Wo=1; Wo<=12; Wo++)Ro[Wo+111]=Ro[Wo+63235]='F'+Wo; const Ho={}; function Vo(e) {
        let t; let n; let r; let i; const o=e.split(/-(?!$)/); e=o[o.length-1]; for (let s=0; s<o.length-1; s++) {
          const a=o[s]; if (/^(cmd|meta|m)$/i.test(a))i=!0; else if (/^a(lt)?$/i.test(a))t=!0; else if (/^(c|ctrl|control)$/i.test(a))n=!0; else {
            if (!/^s(hift)?$/i.test(a)) throw new Error('Unrecognized modifier name: '+a); r=!0;
          }
        } return t&&(e='Alt-'+e), n&&(e='Ctrl-'+e), i&&(e='Cmd-'+e), r&&(e='Shift-'+e), e;
      } function $o(e) {
        const t={}; for (const n in e) {
          if (e.hasOwnProperty(n)) {
            const r=e[n]; if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue; if ('...'==r) {
              delete e[n]; continue;
            } for (let i=Y(n.split(' '), Vo), o=0; o<i.length; o++) {
              let s=void 0; let a=void 0; o==i.length-1?(a=i.join(' '), s=r):(a=i.slice(0, o+1).join(' '), s='...'); const l=t[a]; if (l) {
                if (l!=s) throw new Error('Inconsistent bindings for '+a);
              } else t[a]=s;
            } delete e[n];
          }
        } for (const c in t)e[c]=t[c]; return e;
      } function Uo(e, t, n, r) {
        const i=(t=Go(t)).call?t.call(e, r):t[e]; if (!1===i) return 'nothing'; if ('...'===i) return 'multi'; if (null!=i&&n(i)) return 'handled'; if (t.fallthrough) {
          if ('[object Array]'!=Object.prototype.toString.call(t.fallthrough)) return Uo(e, t.fallthrough, n, r); for (let o=0; o<t.fallthrough.length; o++) {
            const s=Uo(e, t.fallthrough[o], n, r); if (s) return s;
          }
        }
      } function Ko(e) {
        const t='string'==typeof e?e:Ro[e.keyCode]; return 'Ctrl'==t||'Alt'==t||'Shift'==t||'Mod'==t;
      } function Jo(e, t, n) {
        const r=e; return t.altKey&&'Alt'!=r&&(e='Alt-'+e), (k?t.metaKey:t.ctrlKey)&&'Ctrl'!=r&&(e='Ctrl-'+e), (k?t.ctrlKey:t.metaKey)&&'Mod'!=r&&(e='Cmd-'+e), !n&&t.shiftKey&&'Shift'!=r&&(e='Shift-'+e), e;
      } function Yo(e, t) {
        if (d&&34==e.keyCode&&e.char) return !1; let n=Ro[e.keyCode]; return null!=n&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(n=e.code), Jo(n, e, t));
      } function Go(e) {
        return 'string'==typeof e?Ho[e]:e;
      } function Xo(e, t) {
        for (var n=e.doc.sel.ranges, r=[], i=0; i<n.length; i++) {
          for (var o=t(n[i]); r.length&&tt(o.from, J(r).to)<=0;) {
            const s=r.pop(); if (tt(s.from, o.from)<0) {
              o.from=s.from; break;
            }
          }r.push(o);
        }Qr(e, (function() {
          for (let t=r.length-1; t>=0; t--)mo(e.doc, '', r[t].from, r[t].to, '+delete'); Nr(e);
        }));
      } function Zo(e, t, n) {
        const r=ie(e.text, t+n, n); return r<0||r>e.text.length?null:r;
      } function Qo(e, t, n) {
        const r=Zo(e, t.ch, n); return null==r?null:new et(t.line, r, n<0?'after':'before');
      } function es(e, t, n, r, i) {
        if (e) {
          'rtl'==t.doc.direction&&(i=-i); const o=ce(n, t.doc.direction); if (o) {
            let s; const a=i<0?J(o):o[0]; const l=i<0==(1==a.level)?'after':'before'; if (a.level>0||'rtl'==t.doc.direction) {
              const c=An(t, n); s=i<0?n.text.length-1:0; const u=Ln(t, c, s).top; s=oe((function(e) {
                return Ln(t, c, e).top==u;
              }), i<0==(1==a.level)?a.from:a.to-1, s), 'before'==l&&(s=Zo(n, s, 1));
            } else s=i<0?a.to:a.from; return new et(r, s, l);
          }
        } return new et(r, i<0?n.text.length:0, i<0?'before':'after');
      }Ho.basic={'Left': 'goCharLeft', 'Right': 'goCharRight', 'Up': 'goLineUp', 'Down': 'goLineDown', 'End': 'goLineEnd', 'Home': 'goLineStartSmart', 'PageUp': 'goPageUp', 'PageDown': 'goPageDown', 'Delete': 'delCharAfter', 'Backspace': 'delCharBefore', 'Shift-Backspace': 'delCharBefore', 'Tab': 'defaultTab', 'Shift-Tab': 'indentAuto', 'Enter': 'newlineAndIndent', 'Insert': 'toggleOverwrite', 'Esc': 'singleSelection'}, Ho.pcDefault={'Ctrl-A': 'selectAll', 'Ctrl-D': 'deleteLine', 'Ctrl-Z': 'undo', 'Shift-Ctrl-Z': 'redo', 'Ctrl-Y': 'redo', 'Ctrl-Home': 'goDocStart', 'Ctrl-End': 'goDocEnd', 'Ctrl-Up': 'goLineUp', 'Ctrl-Down': 'goLineDown', 'Ctrl-Left': 'goGroupLeft', 'Ctrl-Right': 'goGroupRight', 'Alt-Left': 'goLineStart', 'Alt-Right': 'goLineEnd', 'Ctrl-Backspace': 'delGroupBefore', 'Ctrl-Delete': 'delGroupAfter', 'Ctrl-S': 'save', 'Ctrl-F': 'find', 'Ctrl-G': 'findNext', 'Shift-Ctrl-G': 'findPrev', 'Shift-Ctrl-F': 'replace', 'Shift-Ctrl-R': 'replaceAll', 'Ctrl-[': 'indentLess', 'Ctrl-]': 'indentMore', 'Ctrl-U': 'undoSelection', 'Shift-Ctrl-U': 'redoSelection', 'Alt-U': 'redoSelection', 'fallthrough': 'basic'}, Ho.emacsy={'Ctrl-F': 'goCharRight', 'Ctrl-B': 'goCharLeft', 'Ctrl-P': 'goLineUp', 'Ctrl-N': 'goLineDown', 'Alt-F': 'goWordRight', 'Alt-B': 'goWordLeft', 'Ctrl-A': 'goLineStart', 'Ctrl-E': 'goLineEnd', 'Ctrl-V': 'goPageDown', 'Shift-Ctrl-V': 'goPageUp', 'Ctrl-D': 'delCharAfter', 'Ctrl-H': 'delCharBefore', 'Alt-D': 'delWordAfter', 'Alt-Backspace': 'delWordBefore', 'Ctrl-K': 'killLine', 'Ctrl-T': 'transposeChars', 'Ctrl-O': 'openLine'}, Ho.macDefault={'Cmd-A': 'selectAll', 'Cmd-D': 'deleteLine', 'Cmd-Z': 'undo', 'Shift-Cmd-Z': 'redo', 'Cmd-Y': 'redo', 'Cmd-Home': 'goDocStart', 'Cmd-Up': 'goDocStart', 'Cmd-End': 'goDocEnd', 'Cmd-Down': 'goDocEnd', 'Alt-Left': 'goGroupLeft', 'Alt-Right': 'goGroupRight', 'Cmd-Left': 'goLineLeft', 'Cmd-Right': 'goLineRight', 'Alt-Backspace': 'delGroupBefore', 'Ctrl-Alt-Backspace': 'delGroupAfter', 'Alt-Delete': 'delGroupAfter', 'Cmd-S': 'save', 'Cmd-F': 'find', 'Cmd-G': 'findNext', 'Shift-Cmd-G': 'findPrev', 'Cmd-Alt-F': 'replace', 'Shift-Cmd-Alt-F': 'replaceAll', 'Cmd-[': 'indentLess', 'Cmd-]': 'indentMore', 'Cmd-Backspace': 'delWrappedLineLeft', 'Cmd-Delete': 'delWrappedLineRight', 'Cmd-U': 'undoSelection', 'Shift-Cmd-U': 'redoSelection', 'Ctrl-Up': 'goDocStart', 'Ctrl-Down': 'goDocEnd', 'fallthrough': ['basic', 'emacsy']}, Ho.default=y?Ho.macDefault:Ho.pcDefault; const ts={selectAll: ao, singleSelection: function(e) {
        return e.setSelection(e.getCursor('anchor'), e.getCursor('head'), W);
      }, killLine: function(e) {
        return Xo(e, (function(t) {
          if (t.empty()) {
            const n=Ue(e.doc, t.head.line).text.length; return t.head.ch==n&&t.head.line<e.lastLine()?{from: t.head, to: et(t.head.line+1, 0)}:{from: t.head, to: et(t.head.line, n)};
          } return {from: t.from(), to: t.to()};
        }));
      }, deleteLine: function(e) {
        return Xo(e, (function(t) {
          return {from: et(t.from().line, 0), to: at(e.doc, et(t.to().line+1, 0))};
        }));
      }, delLineLeft: function(e) {
        return Xo(e, (function(e) {
          return {from: et(e.from().line, 0), to: e.from()};
        }));
      }, delWrappedLineLeft: function(e) {
        return Xo(e, (function(t) {
          const n=e.charCoords(t.head, 'div').top+5; return {from: e.coordsChar({left: 0, top: n}, 'div'), to: t.from()};
        }));
      }, delWrappedLineRight: function(e) {
        return Xo(e, (function(t) {
          const n=e.charCoords(t.head, 'div').top+5; const r=e.coordsChar({left: e.display.lineDiv.offsetWidth+100, top: n}, 'div'); return {from: t.from(), to: r};
        }));
      }, undo: function(e) {
        return e.undo();
      }, redo: function(e) {
        return e.redo();
      }, undoSelection: function(e) {
        return e.undoSelection();
      }, redoSelection: function(e) {
        return e.redoSelection();
      }, goDocStart: function(e) {
        return e.extendSelection(et(e.firstLine(), 0));
      }, goDocEnd: function(e) {
        return e.extendSelection(et(e.lastLine()));
      }, goLineStart: function(e) {
        return e.extendSelectionsBy((function(t) {
          return ns(e, t.head.line);
        }), {origin: '+move', bias: 1});
      }, goLineStartSmart: function(e) {
        return e.extendSelectionsBy((function(t) {
          return rs(e, t.head);
        }), {origin: '+move', bias: 1});
      }, goLineEnd: function(e) {
        return e.extendSelectionsBy((function(t) {
          return function(e, t) {
            const n=Ue(e.doc, t); const r=function(e) {
              for (var t; t=It(e);)e=t.find(1, !0).line; return e;
            }(n); return r!=n&&(t=Ge(r)), es(!0, e, n, t, -1);
          }(e, t.head.line);
        }), {origin: '+move', bias: -1});
      }, goLineRight: function(e) {
        return e.extendSelectionsBy((function(t) {
          const n=e.cursorCoords(t.head, 'div').top+5; return e.coordsChar({left: e.display.lineDiv.offsetWidth+100, top: n}, 'div');
        }), V);
      }, goLineLeft: function(e) {
        return e.extendSelectionsBy((function(t) {
          const n=e.cursorCoords(t.head, 'div').top+5; return e.coordsChar({left: 0, top: n}, 'div');
        }), V);
      }, goLineLeftSmart: function(e) {
        return e.extendSelectionsBy((function(t) {
          const n=e.cursorCoords(t.head, 'div').top+5; const r=e.coordsChar({left: 0, top: n}, 'div'); return r.ch<e.getLine(r.line).search(/\S/)?rs(e, t.head):r;
        }), V);
      }, goLineUp: function(e) {
        return e.moveV(-1, 'line');
      }, goLineDown: function(e) {
        return e.moveV(1, 'line');
      }, goPageUp: function(e) {
        return e.moveV(-1, 'page');
      }, goPageDown: function(e) {
        return e.moveV(1, 'page');
      }, goCharLeft: function(e) {
        return e.moveH(-1, 'char');
      }, goCharRight: function(e) {
        return e.moveH(1, 'char');
      }, goColumnLeft: function(e) {
        return e.moveH(-1, 'column');
      }, goColumnRight: function(e) {
        return e.moveH(1, 'column');
      }, goWordLeft: function(e) {
        return e.moveH(-1, 'word');
      }, goGroupRight: function(e) {
        return e.moveH(1, 'group');
      }, goGroupLeft: function(e) {
        return e.moveH(-1, 'group');
      }, goWordRight: function(e) {
        return e.moveH(1, 'word');
      }, delCharBefore: function(e) {
        return e.deleteH(-1, 'codepoint');
      }, delCharAfter: function(e) {
        return e.deleteH(1, 'char');
      }, delWordBefore: function(e) {
        return e.deleteH(-1, 'word');
      }, delWordAfter: function(e) {
        return e.deleteH(1, 'word');
      }, delGroupBefore: function(e) {
        return e.deleteH(-1, 'group');
      }, delGroupAfter: function(e) {
        return e.deleteH(1, 'group');
      }, indentAuto: function(e) {
        return e.indentSelection('smart');
      }, indentMore: function(e) {
        return e.indentSelection('add');
      }, indentLess: function(e) {
        return e.indentSelection('subtract');
      }, insertTab: function(e) {
        return e.replaceSelection('\t');
      }, insertSoftTab: function(e) {
        for (var t=[], n=e.listSelections(), r=e.options.tabSize, i=0; i<n.length; i++) {
          const o=n[i].from(); const s=P(e.getLine(o.line), o.ch, r); t.push(K(r-s%r));
        }e.replaceSelections(t);
      }, defaultTab: function(e) {
e.somethingSelected()?e.indentSelection('add'):e.execCommand('insertTab');
      }, transposeChars: function(e) {
        return Qr(e, (function() {
          for (var t=e.listSelections(), n=[], r=0; r<t.length; r++) {
            if (t[r].empty()) {
              let i=t[r].head; const o=Ue(e.doc, i.line).text; if (o) {
                if (i.ch==o.length&&(i=new et(i.line, i.ch-1)), i.ch>0)i=new et(i.line, i.ch+1), e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2), et(i.line, i.ch-2), i, '+transpose'); else if (i.line>e.doc.first) {
                  const s=Ue(e.doc, i.line-1).text; s&&(i=new et(i.line, 1), e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+s.charAt(s.length-1), et(i.line-1, s.length-1), i, '+transpose'));
                }
              }n.push(new _i(i, i));
            }
          }e.setSelections(n);
        }));
      }, newlineAndIndent: function(e) {
        return Qr(e, (function() {
          for (var t=e.listSelections(), n=t.length-1; n>=0; n--)e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, '+input'); t=e.listSelections(); for (let r=0; r<t.length; r++)e.indentLine(t[r].from().line, null, !0); Nr(e);
        }));
      }, openLine: function(e) {
        return e.replaceSelection('\n', 'start');
      }, toggleOverwrite: function(e) {
        return e.toggleOverwrite();
      }}; function ns(e, t) {
        const n=Ue(e.doc, t); const r=Pt(n); return r!=n&&(t=Ge(r)), es(!0, e, r, t, 1);
      } function rs(e, t) {
        const n=ns(e, t.line); const r=Ue(e.doc, n.line); const i=ce(r, e.doc.direction); if (!i||0==i[0].level) {
          const o=Math.max(n.ch, r.text.search(/\S/)); const s=t.line==n.line&&t.ch<=o&&t.ch; return et(n.line, s?0:o, n.sticky);
        } return n;
      } function is(e, t, n) {
        if ('string'==typeof t&&!(t=ts[t])) return !1; e.display.input.ensurePolled(); const r=e.display.shift; let i=!1; try {
          e.isReadOnly()&&(e.state.suppressEdits=!0), n&&(e.display.shift=!1), i=t(e)!=j;
        } finally {
          e.display.shift=r, e.state.suppressEdits=!1;
        } return i;
      } const os=new R; function ss(e, t, n, r) {
        const i=e.state.keySeq; if (i) {
          if (Ko(t)) return 'handled'; if (/\'$/.test(t)?e.state.keySeq=null:os.set(50, (function() {
            e.state.keySeq==i&&(e.state.keySeq=null, e.display.input.reset());
          })), as(e, i+' '+t, n, r)) return !0;
        } return as(e, t, n, r);
      } function as(e, t, n, r) {
        const i=function(e, t, n) {
          for (let r=0; r<e.state.keyMaps.length; r++) {
            const i=Uo(t, e.state.keyMaps[r], n, e); if (i) return i;
          } return e.options.extraKeys&&Uo(t, e.options.extraKeys, n, e)||Uo(t, e.options.keyMap, n, e);
        }(e, t, r); return 'multi'==i&&(e.state.keySeq=t), 'handled'==i&&ln(e, 'keyHandled', e, t, n), 'handled'!=i&&'multi'!=i||(be(n), xr(e)), !!i;
      } function ls(e, t) {
        const n=Yo(t, !0); return !!n&&(t.shiftKey&&!e.state.keySeq?ss(e, 'Shift-'+n, t, (function(t) {
          return is(e, t, !0);
        }))||ss(e, n, t, (function(t) {
          if ('string'==typeof t?/^go[A-Z]/.test(t):t.motion) return is(e, t);
        })):ss(e, n, t, (function(t) {
          return is(e, t);
        })));
      } let cs=null; function us(e) {
        const t=this; if (!(e.target&&e.target!=t.display.input.getField()||(t.curOp.focus=A(), me(t, e)))) {
          s&&a<11&&27==e.keyCode&&(e.returnValue=!1); const r=e.keyCode; t.display.shift=16==r||e.shiftKey; const i=ls(t, e); d&&(cs=i?r:null, i||88!=r||Le||!(y?e.metaKey:e.ctrlKey)||t.replaceSelection('', null, 'cut')), n&&!y&&!i&&46==r&&e.shiftKey&&!e.ctrlKey&&document.execCommand&&document.execCommand('cut'), 18!=r||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e) {
            const t=e.display.lineDiv; function n(e) {
              18!=e.keyCode&&e.altKey||(M(t, 'CodeMirror-crosshair'), pe(document, 'keyup', n), pe(document, 'mouseover', n));
            }L(t, 'CodeMirror-crosshair'), de(document, 'keyup', n), de(document, 'mouseover', n);
          }(t);
        }
      } function ds(e) {
        16==e.keyCode&&(this.doc.sel.shift=!1), me(this, e);
      } function hs(e) {
        const t=this; if (!(e.target&&e.target!=t.display.input.getField()||kn(t.display, e)||me(t, e)||e.ctrlKey&&!e.altKey||y&&e.metaKey)) {
          const n=e.keyCode; const r=e.charCode; if (d&&n==cs) return cs=null, void be(e); if (!d||e.which&&!(e.which<10)||!ls(t, e)) {
            const i=String.fromCharCode(null==r?n:r); '\b'!=i&&(function(e, t, n) {
              return ss(e, '\''+n+'\'', t, (function(t) {
                return is(e, t, !0);
              }));
            }(t, e, i)||t.display.input.onKeyPress(e));
          }
        }
      } let ps; let fs; const ms=function(e, t, n) {
        this.time=e, this.pos=t, this.button=n;
      }; function gs(e) {
        const t=this; const n=t.display; if (!(me(t, e)||n.activeTouch&&n.input.supportsTouch())) {
          if (n.input.ensurePolled(), n.shift=e.shiftKey, kn(n, e)) {
            l||(n.scroller.draggable=!1, setTimeout((function() {
              return n.scroller.draggable=!0;
            }), 100));
          } else if (!bs(t, e)) {
            const r=cr(t, e); const i=Se(e); const o=r?function(e, t) {
              const n=+new Date; return fs&&fs.compare(n, e, t)?(ps=fs=null, 'triple'):ps&&ps.compare(n, e, t)?(fs=new ms(n, e, t), ps=null, 'double'):(ps=new ms(n, e, t), fs=null, 'single');
            }(r, i):'single'; window.focus(), 1==i&&t.state.selectingText&&t.state.selectingText(e), r&&function(e, t, n, r, i) {
              let o='Click'; return 'double'==r?o='Double'+o:'triple'==r&&(o='Triple'+o), ss(e, Jo(o=(1==t?'Left':2==t?'Middle':'Right')+o, i), i, (function(t) {
                if ('string'==typeof t&&(t=ts[t]), !t) return !1; let r=!1; try {
                  e.isReadOnly()&&(e.state.suppressEdits=!0), r=t(e, n)!=j;
                } finally {
                  e.state.suppressEdits=!1;
                } return r;
              }));
            }(t, i, r, o, e)||(1==i?r?function(e, t, n, r) {
s?setTimeout(q(kr, e), 0):e.curOp.focus=A(); let i; const o=function(e, t, n) {
  const r=e.getOption('configureMouse'); const i=r?r(e, t, n):{}; if (null==i.unit) {
    const o=b?n.shiftKey&&n.metaKey:n.altKey; i.unit=o?'rectangle':'single'==t?'char':'double'==t?'word':'line';
  } return (null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||n.shiftKey), null==i.addNew&&(i.addNew=y?n.metaKey:n.ctrlKey), null==i.moveOnDrag&&(i.moveOnDrag=!(y?n.altKey:n.ctrlKey)), i;
}(e, n, r); const c=e.doc.sel; e.options.dragDrop&&Te&&!e.isReadOnly()&&'single'==n&&(i=c.contains(t))>-1&&(tt((i=c.ranges[i]).from(), t)<0||t.xRel>0)&&(tt(i.to(), t)>0||t.xRel<0)?function(e, t, n, r) {
  const i=e.display; let o=!1; var c=ei(e, (function(t) {
    l&&(i.scroller.draggable=!1), e.state.draggingText=!1, e.state.delayingBlurEvent&&(e.hasFocus()?e.state.delayingBlurEvent=!1:_r(e)), pe(i.wrapper.ownerDocument, 'mouseup', c), pe(i.wrapper.ownerDocument, 'mousemove', u), pe(i.scroller, 'dragstart', d), pe(i.scroller, 'drop', c), o||(be(t), r.addNew||Ji(e.doc, n, null, null, r.extend), l&&!h||s&&9==a?setTimeout((function() {
      i.wrapper.ownerDocument.body.focus({preventScroll: !0}), i.input.focus();
    }), 20):i.input.focus());
  })); var u=function(e) {
    o=o||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10;
  }; var d=function() {
    return o=!0;
  }; l&&(i.scroller.draggable=!0), e.state.draggingText=c, c.copy=!r.moveOnDrag, de(i.wrapper.ownerDocument, 'mouseup', c), de(i.wrapper.ownerDocument, 'mousemove', u), de(i.scroller, 'dragstart', d), de(i.scroller, 'drop', c), e.state.delayingBlurEvent=!0, setTimeout((function() {
    return i.input.focus();
  }), 20), i.scroller.dragDrop&&i.scroller.dragDrop();
}(e, r, t, o):function(e, t, n, r) {
  s&&_r(e); const i=e.display; const o=e.doc; be(t); let a; let l; let c=o.sel; const u=c.ranges; if (r.addNew&&!r.extend?(l=o.sel.contains(n), a=l>-1?u[l]:new _i(n, n)):(a=o.sel.primary(), l=o.sel.primIndex), 'rectangle'==r.unit)r.addNew||(a=new _i(n, n)), n=cr(e, t, !0, !0), l=-1; else {
    const d=vs(e, n, r.unit); a=r.extend?Ki(a, d.anchor, d.head, r.extend):d;
  }r.addNew?-1==l?(l=u.length, Qi(o, Si(e, u.concat([a]), l), {scroll: !1, origin: '*mouse'})):u.length>1&&u[l].empty()&&'char'==r.unit&&!r.extend?(Qi(o, Si(e, u.slice(0, l).concat(u.slice(l+1)), 0), {scroll: !1, origin: '*mouse'}), c=o.sel):Gi(o, l, a, H):(l=0, Qi(o, new ki([a], 0), H), c=o.sel); let h=n; function p(t) {
    if (0!=tt(h, t)) {
      if (h=t, 'rectangle'==r.unit) {
        for (var i=[], s=e.options.tabSize, u=P(Ue(o, n.line).text, n.ch, s), d=P(Ue(o, t.line).text, t.ch, s), p=Math.min(u, d), f=Math.max(u, d), m=Math.min(n.line, t.line), g=Math.min(e.lastLine(), Math.max(n.line, t.line)); m<=g; m++) {
          const v=Ue(o, m).text; const y=$(v, p, s); p==f?i.push(new _i(et(m, y), et(m, y))):v.length>y&&i.push(new _i(et(m, y), et(m, $(v, f, s))));
        }i.length||i.push(new _i(n, n)), Qi(o, Si(e, c.ranges.slice(0, l).concat(i), l), {origin: '*mouse', scroll: !1}), e.scrollIntoView(t);
      } else {
        let b; const w=a; const x=vs(e, t, r.unit); let k=w.anchor; tt(x.anchor, k)>0?(b=x.head, k=ot(w.from(), x.anchor)):(b=x.anchor, k=it(w.to(), x.head)); const _=c.ranges.slice(0); _[l]=function(e, t) {
          const n=t.anchor; const r=t.head; const i=Ue(e.doc, n.line); if (0==tt(n, r)&&n.sticky==r.sticky) return t; const o=ce(i); if (!o) return t; const s=ae(o, n.ch, n.sticky); const a=o[s]; if (a.from!=n.ch&&a.to!=n.ch) return t; let l; const c=s+(a.from==n.ch==(1!=a.level)?0:1); if (0==c||c==o.length) return t; if (r.line!=n.line)l=(r.line-n.line)*('ltr'==e.doc.direction?1:-1)>0; else {
            const u=ae(o, r.ch, r.sticky); const d=u-s||(r.ch-n.ch)*(1==a.level?-1:1); l=u==c-1||u==c?d<0:d>0;
          } const h=o[c+(l?-1:0)]; const p=l==(1==h.level); const f=p?h.from:h.to; const m=p?'after':'before'; return n.ch==f&&n.sticky==m?t:new _i(new et(n.line, f, m), r);
        }(e, new _i(at(o, k), b)), Qi(o, Si(e, _, l), H);
      }
    }
  } const f=i.wrapper.getBoundingClientRect(); let m=0; function g(t) {
    const n=++m; const s=cr(e, t, !0, 'rectangle'==r.unit); if (s) {
      if (0!=tt(s, h)) {
        e.curOp.focus=A(), p(s); const a=Or(i, o); (s.line>=a.to||s.line<a.from)&&setTimeout(ei(e, (function() {
          m==n&&g(t);
        })), 150);
      } else {
        const l=t.clientY<f.top?-20:t.clientY>f.bottom?20:0; l&&setTimeout(ei(e, (function() {
          m==n&&(i.scroller.scrollTop+=l, g(t));
        })), 50);
      }
    }
  } function v(t) {
    e.state.selectingText=!1, m=1/0, t&&(be(t), i.input.focus()), pe(i.wrapper.ownerDocument, 'mousemove', y), pe(i.wrapper.ownerDocument, 'mouseup', b), o.history.lastSelOrigin=null;
  } var y=ei(e, (function(e) {
0!==e.buttons&&Se(e)?g(e):v(e);
  })); var b=ei(e, v); e.state.selectingText=b, de(i.wrapper.ownerDocument, 'mousemove', y), de(i.wrapper.ownerDocument, 'mouseup', b);
}(e, r, t, o);
            }(t, r, o, e):_e(e)==n.scroller&&be(e):2==i?(r&&Ji(t.doc, r), setTimeout((function() {
              return n.input.focus();
            }), 20)):3==i&&(_?t.display.input.onContextMenu(e):_r(t)));
          }
        }
      } function vs(e, t, n) {
        if ('char'==n) return new _i(t, t); if ('word'==n) return e.findWordAt(t); if ('line'==n) return new _i(et(t.line, 0), at(e.doc, et(t.line+1, 0))); const r=n(e, t); return new _i(r.from, r.to);
      } function ys(e, t, n, r) {
        let i; let o; if (t.touches)i=t.touches[0].clientX, o=t.touches[0].clientY; else {
          try {
            i=t.clientX, o=t.clientY;
          } catch (e) {
            return !1;
          }
        } if (i>=Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1; r&&be(t); const s=e.display; const a=s.lineDiv.getBoundingClientRect(); if (o>a.bottom||!ve(e, n)) return xe(t); o-=a.top-s.viewOffset; for (let l=0; l<e.display.gutterSpecs.length; ++l) {
          const c=s.gutters.childNodes[l]; if (c&&c.getBoundingClientRect().right>=i) return fe(e, n, e, Xe(e.doc, o), e.display.gutterSpecs[l].className, t), xe(t);
        }
      } function bs(e, t) {
        return ys(e, t, 'gutterClick', !0);
      } function ws(e, t) {
        kn(e.display, t)||function(e, t) {
          return !!ve(e, 'gutterContextMenu')&&ys(e, t, 'gutterContextMenu', !1);
        }(e, t)||me(e, t, 'contextmenu')||_||e.display.input.onContextMenu(t);
      } function xs(e) {
        e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g, '')+e.options.theme.replace(/(^|\s)\s*/g, ' cm-s-'), Bn(e);
      }ms.prototype.compare=function(e, t, n) {
        return this.time+400>e&&0==tt(t, this.pos)&&n==this.button;
      }; const ks={toString: function() {
        return 'CodeMirror.Init';
      }}; const _s={}; const Ss={}; function Cs(e, t, n) {
        if (!t!=!(n&&n!=ks)) {
          const r=e.display.dragFunctions; const i=t?de:pe; i(e.display.scroller, 'dragstart', r.start), i(e.display.scroller, 'dragenter', r.enter), i(e.display.scroller, 'dragover', r.over), i(e.display.scroller, 'dragleave', r.leave), i(e.display.scroller, 'drop', r.drop);
        }
      } function Ms(e) {
e.options.lineWrapping?(L(e.display.wrapper, 'CodeMirror-wrap'), e.display.sizer.style.minWidth='', e.display.sizerWidth=null):(M(e.display.wrapper, 'CodeMirror-wrap'), $t(e)), lr(e), dr(e), Bn(e), setTimeout((function() {
          return jr(e);
        }), 100);
      } function Ts(e, t) {
        const n=this; if (!(this instanceof Ts)) return new Ts(e, t); this.options=t=t?F(t):{}, F(_s, t, !1); let r=t.value; 'string'==typeof r?r=new No(r, t.mode, null, t.lineSeparator, t.direction):t.mode&&(r.modeOption=t.mode), this.doc=r; const i=new Ts.inputStyles[t.inputStyle](this); const o=this.display=new gi(e, r, i, t); for (const c in o.wrapper.CodeMirror=this, xs(this), t.lineWrapping&&(this.display.wrapper.className+=' CodeMirror-wrap'), Vr(this), this.state={keyMaps: [], overlays: [], modeGen: 0, overwrite: !1, delayingBlurEvent: !1, focused: !1, suppressEdits: !1, pasteIncoming: -1, cutIncoming: -1, selectingText: !1, draggingText: !1, highlight: new R, keySeq: null, specialChars: null}, t.autofocus&&!v&&o.input.focus(), s&&a<11&&setTimeout((function() {
          return n.display.input.reset(!0);
        }), 20), function(e) {
          const t=e.display; de(t.scroller, 'mousedown', ei(e, gs)), de(t.scroller, 'dblclick', s&&a<11?ei(e, (function(t) {
            if (!me(e, t)) {
              const n=cr(e, t); if (n&&!bs(e, t)&&!kn(e.display, t)) {
                be(t); const r=e.findWordAt(n); Ji(e.doc, r.anchor, r.head);
              }
            }
          })):function(t) {
            return me(e, t)||be(t);
          }), de(t.scroller, 'contextmenu', (function(t) {
            return ws(e, t);
          })), de(t.input.getField(), 'contextmenu', (function(n) {
            t.scroller.contains(n.target)||ws(e, n);
          })); let n; let r={end: 0}; function i() {
            t.activeTouch&&(n=setTimeout((function() {
              return t.activeTouch=null;
            }), 1e3), (r=t.activeTouch).end=+new Date);
          } function o(e) {
            if (1!=e.touches.length) return !1; const t=e.touches[0]; return t.radiusX<=1&&t.radiusY<=1;
          } function l(e, t) {
            if (null==t.left) return !0; const n=t.left-e.left; const r=t.top-e.top; return n*n+r*r>400;
          }de(t.scroller, 'touchstart', (function(i) {
            if (!me(e, i)&&!o(i)&&!bs(e, i)) {
              t.input.ensurePolled(), clearTimeout(n); const s=+new Date; t.activeTouch={start: s, moved: !1, prev: s-r.end<=300?r:null}, 1==i.touches.length&&(t.activeTouch.left=i.touches[0].pageX, t.activeTouch.top=i.touches[0].pageY);
            }
          })), de(t.scroller, 'touchmove', (function() {
            t.activeTouch&&(t.activeTouch.moved=!0);
          })), de(t.scroller, 'touchend', (function(n) {
            const r=t.activeTouch; if (r&&!kn(t, n)&&null!=r.left&&!r.moved&&new Date-r.start<300) {
              let o; const s=e.coordsChar(t.activeTouch, 'page'); o=!r.prev||l(r, r.prev)?new _i(s, s):!r.prev.prev||l(r, r.prev.prev)?e.findWordAt(s):new _i(et(s.line, 0), at(e.doc, et(s.line+1, 0))), e.setSelection(o.anchor, o.head), e.focus(), be(n);
            }i();
          })), de(t.scroller, 'touchcancel', i), de(t.scroller, 'scroll', (function() {
            t.scroller.clientHeight&&(Ir(e, t.scroller.scrollTop), Fr(e, t.scroller.scrollLeft, !0), fe(e, 'scroll', e));
          })), de(t.scroller, 'mousewheel', (function(t) {
            return xi(e, t);
          })), de(t.scroller, 'DOMMouseScroll', (function(t) {
            return xi(e, t);
          })), de(t.wrapper, 'scroll', (function() {
            return t.wrapper.scrollTop=t.wrapper.scrollLeft=0;
          })), t.dragFunctions={enter: function(t) {
            me(e, t)||ke(t);
          }, over: function(t) {
            me(e, t)||(function(e, t) {
              const n=cr(e, t); if (n) {
                const r=document.createDocumentFragment(); yr(e, n, r), e.display.dragCursor||(e.display.dragCursor=D('div', null, 'CodeMirror-cursors CodeMirror-dragcursors'), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), O(e.display.dragCursor, r);
              }
            }(e, t), ke(t));
          }, start: function(t) {
            return function(e, t) {
              if (s&&(!e.state.draggingText||+new Date-Ao<100))ke(t); else if (!me(e, t)&&!kn(e.display, t)&&(t.dataTransfer.setData('Text', e.getSelection()), t.dataTransfer.effectAllowed='copyMove', t.dataTransfer.setDragImage&&!h)) {
                const n=D('img', null, null, 'position: fixed; left: 0; top: 0;'); n.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', d&&(n.width=n.height=1, e.display.wrapper.appendChild(n), n._top=n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), d&&n.parentNode.removeChild(n);
              }
            }(e, t);
          }, drop: ei(e, Lo), leave: function(t) {
            me(e, t)||zo(e);
          }}; const c=t.input.getField(); de(c, 'keyup', (function(t) {
            return ds.call(e, t);
          })), de(c, 'keydown', ei(e, us)), de(c, 'keypress', ei(e, hs)), de(c, 'focus', (function(t) {
            return Sr(e, t);
          })), de(c, 'blur', (function(t) {
            return Cr(e, t);
          }));
        }(this), Fo(), Ur(this), this.curOp.forceUpdate=!0, Ii(this, r), t.autofocus&&!v||this.hasFocus()?setTimeout((function() {
          n.hasFocus()&&!n.state.focused&&Sr(n);
        }), 20):Cr(this), Ss)Ss.hasOwnProperty(c)&&Ss[c](this, t[c], ks); hi(this), t.finishInit&&t.finishInit(this); for (let u=0; u<Os.length; ++u)Os[u](this); Kr(this), l&&t.lineWrapping&&'optimizelegibility'==getComputedStyle(o.lineDiv).textRendering&&(o.lineDiv.style.textRendering='auto');
      }Ts.defaults=_s, Ts.optionHandlers=Ss; var Os=[]; function Ds(e, t, n, r) {
        let i; const o=e.doc; null==n&&(n='add'), 'smart'==n&&(o.mode.indent?i=pt(e, t).state:n='prev'); const s=e.options.tabSize; const a=Ue(o, t); const l=P(a.text, null, s); a.stateAfter&&(a.stateAfter=null); let c; const u=a.text.match(/^\s*/)[0]; if (r||/\S/.test(a.text)) {
          if ('smart'==n&&((c=o.mode.indent(i, a.text.slice(u.length), a.text))==j||c>150)) {
            if (!r) return; n='prev';
          }
        } else c=0, n='not'; 'prev'==n?c=t>o.first?P(Ue(o, t-1).text, null, s):0:'add'==n?c=l+e.options.indentUnit:'subtract'==n?c=l-e.options.indentUnit:'number'==typeof n&&(c=l+n), c=Math.max(0, c); let d=''; let h=0; if (e.options.indentWithTabs) for (let p=Math.floor(c/s); p; --p)h+=s, d+='\t'; if (h<c&&(d+=K(c-h)), d!=u) return mo(o, d, et(t, 0), et(t, u.length), '+input'), a.stateAfter=null, !0; for (let f=0; f<o.sel.ranges.length; f++) {
          const m=o.sel.ranges[f]; if (m.head.line==t&&m.head.ch<u.length) {
            const g=et(t, u.length); Gi(o, f, new _i(g, g)); break;
          }
        }
      }Ts.defineInitHook=function(e) {
        return Os.push(e);
      }; let Es=null; function Ns(e) {
        Es=e;
      } function As(e, t, n, r, i) {
        const o=e.doc; e.display.shift=!1, r||(r=o.sel); const s=+new Date-200; const a='paste'==i||e.state.pasteIncoming>s; const l=Ne(t); let c=null; if (a&&r.ranges.length>1) {
          if (Es&&Es.text.join('\n')==t) {
            if (r.ranges.length%Es.text.length==0) {
              c=[]; for (let u=0; u<Es.text.length; u++)c.push(o.splitLines(Es.text[u]));
            }
          } else {
            l.length==r.ranges.length&&e.options.pasteLinesPerSelection&&(c=Y(l, (function(e) {
              return [e];
            })));
          }
        } for (var d=e.curOp.updateInput, h=r.ranges.length-1; h>=0; h--) {
          const p=r.ranges[h]; let f=p.from(); let m=p.to(); p.empty()&&(n&&n>0?f=et(f.line, f.ch-n):e.state.overwrite&&!a?m=et(m.line, Math.min(Ue(o, m.line).text.length, m.ch+J(l).length)):a&&Es&&Es.lineWise&&Es.text.join('\n')==l.join('\n')&&(f=m=et(f.line, 0))); const g={from: f, to: m, text: c?c[h%c.length]:l, origin: i||(a?'paste':e.state.cutIncoming>s?'cut':'+input')}; co(e.doc, g), ln(e, 'inputRead', e, g);
        }t&&!a&&zs(e, t), Nr(e), e.curOp.updateInput<2&&(e.curOp.updateInput=d), e.curOp.typing=!0, e.state.pasteIncoming=e.state.cutIncoming=-1;
      } function Ls(e, t) {
        const n=e.clipboardData&&e.clipboardData.getData('Text'); if (n) {
          return e.preventDefault(), t.isReadOnly()||t.options.disableInput||Qr(t, (function() {
            return As(t, n, 0, null, 'paste');
          })), !0;
        }
      } function zs(e, t) {
        if (e.options.electricChars&&e.options.smartIndent) {
          for (let n=e.doc.sel, r=n.ranges.length-1; r>=0; r--) {
            const i=n.ranges[r]; if (!(i.head.ch>100||r&&n.ranges[r-1].head.line==i.head.line)) {
              const o=e.getModeAt(i.head); let s=!1; if (o.electricChars) {
                for (let a=0; a<o.electricChars.length; a++) {
                  if (t.indexOf(o.electricChars.charAt(a))>-1) {
                    s=Ds(e, i.head.line, 'smart'); break;
                  }
                }
              } else o.electricInput&&o.electricInput.test(Ue(e.doc, i.head.line).text.slice(0, i.head.ch))&&(s=Ds(e, i.head.line, 'smart')); s&&ln(e, 'electricInput', e, i.head.line);
            }
          }
        }
      } function Is(e) {
        for (var t=[], n=[], r=0; r<e.doc.sel.ranges.length; r++) {
          const i=e.doc.sel.ranges[r].head.line; const o={anchor: et(i, 0), head: et(i+1, 0)}; n.push(o), t.push(e.getRange(o.anchor, o.head));
        } return {text: t, ranges: n};
      } function qs(e, t, n, r) {
        e.setAttribute('autocorrect', n?'':'off'), e.setAttribute('autocapitalize', r?'':'off'), e.setAttribute('spellcheck', !!t);
      } function Fs() {
        const e=D('textarea', null, null, 'position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none'); const t=D('div', [e], null, 'overflow: hidden; position: relative; width: 3px; height: 0px;'); return l?e.style.width='1000px':e.setAttribute('wrap', 'off'), m&&(e.style.border='1px solid black'), qs(e), t;
      } function Ps(e, t, n, r, i) {
        const o=t; const s=n; let a=Ue(e, t.line); const l=i&&'rtl'==e.direction?-n:n; function c(o) {
          let s; let c; if ('codepoint'==r) {
            const u=a.text.charCodeAt(t.ch+(r>0?0:-1)); s=isNaN(u)?null:new et(t.line, Math.max(0, Math.min(a.text.length, t.ch+n*(u>=55296&&u<56320?2:1))), -n);
          } else {
            s=i?function(e, t, n, r) {
              const i=ce(t, e.doc.direction); if (!i) return Qo(t, n, r); n.ch>=t.text.length?(n.ch=t.text.length, n.sticky='before'):n.ch<=0&&(n.ch=0, n.sticky='after'); const o=ae(i, n.ch, n.sticky); const s=i[o]; if ('ltr'==e.doc.direction&&s.level%2==0&&(r>0?s.to>n.ch:s.from<n.ch)) return Qo(t, n, r); let a; const l=function(e, n) {
                return Zo(t, e instanceof et?e.ch:e, n);
              }; const c=function(n) {
                return e.options.lineWrapping?(a=a||An(e, t), Zn(e, t, a, n)):{begin: 0, end: t.text.length};
              }; const u=c('before'==n.sticky?l(n, -1):n.ch); if ('rtl'==e.doc.direction||1==s.level) {
                const d=1==s.level==r<0; const h=l(n, d?1:-1); if (null!=h&&(d?h<=s.to&&h<=u.end:h>=s.from&&h>=u.begin)) {
                  const p=d?'before':'after'; return new et(n.line, h, p);
                }
              } const f=function(e, t, r) {
                for (let o=function(e, t) {
                  return t?new et(n.line, l(e, 1), 'before'):new et(n.line, e, 'after');
                }; e>=0&&e<i.length; e+=t) {
                  const s=i[e]; const a=t>0==(1!=s.level); let c=a?r.begin:l(r.end, -1); if (s.from<=c&&c<s.to) return o(c, a); if (c=a?s.from:l(s.to, -1), r.begin<=c&&c<r.end) return o(c, a);
                }
              }; let m=f(o+r, r, u); if (m) return m; const g=r>0?u.end:l(u.begin, -1); return null==g||r>0&&g==t.text.length||!(m=f(r>0?0:i.length-1, r, c(g)))?null:m;
            }(e.cm, a, t, n):Qo(a, t, n);
          } if (null==s) {
            if (o||((c=t.line+l)<e.first||c>=e.first+e.size||(t=new et(c, t.ch, t.sticky), !(a=Ue(e, c))))) return !1; t=es(i, e.cm, a, t.line, l);
          } else t=s; return !0;
        } if ('char'==r||'codepoint'==r)c(); else if ('column'==r)c(!0); else if ('word'==r||'group'==r) {
          for (let u=null, d='group'==r, h=e.cm&&e.cm.getHelper(t, 'wordChars'), p=!0; !(n<0)||c(!p); p=!1) {
            const f=a.text.charAt(t.ch)||'\n'; let m=ee(f, h)?'w':d&&'\n'==f?'n':!d||/\s/.test(f)?null:'p'; if (!d||p||m||(m='s'), u&&u!=m) {
              n<0&&(n=1, c(), t.sticky='after'); break;
            } if (m&&(u=m), n>0&&!c(!p)) break;
          }
        } const g=oo(e, t, o, s, !0); return nt(o, g)&&(g.hitSide=!0), g;
      } function Rs(e, t, n, r) {
        let i; let o; const s=e.doc; const a=t.left; if ('page'==r) {
          const l=Math.min(e.display.wrapper.clientHeight, window.innerHeight||document.documentElement.clientHeight); const c=Math.max(l-.5*rr(e.display), 3); i=(n>0?t.bottom:t.top)+n*c;
        } else 'line'==r&&(i=n>0?t.bottom+3:t.top-3); for (;(o=Gn(e, a, i)).outside;) {
          if (n<0?i<=0:i>=s.height) {
            o.hitSide=!0; break;
          }i+=5*n;
        } return o;
      } const Bs=function(e) {
        this.cm=e, this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null, this.polling=new R, this.composing=null, this.gracePeriod=!1, this.readDOMTimeout=null;
      }; function js(e, t) {
        const n=Nn(e, t.line); if (!n||n.hidden) return null; const r=Ue(e.doc, t.line); const i=Dn(n, r, t.line); const o=ce(r, e.doc.direction); let s='left'; o&&(s=ae(o, t.ch)%2?'right':'left'); const a=qn(i.map, t.ch, s); return a.offset='right'==a.collapse?a.end:a.start, a;
      } function Ws(e, t) {
        return t&&(e.bad=!0), e;
      } function Hs(e, t, n) {
        let r; if (t==e.display.lineDiv) {
          if (!(r=e.display.lineDiv.childNodes[n])) return Ws(e.clipPos(et(e.display.viewTo-1)), !0); t=null, n=0;
        } else {
          for (r=t; ;r=r.parentNode) {
            if (!r||r==e.display.lineDiv) return null; if (r.parentNode&&r.parentNode==e.display.lineDiv) break;
          }
        } for (let i=0; i<e.display.view.length; i++) {
          const o=e.display.view[i]; if (o.node==r) return Vs(o, t, n);
        }
      } function Vs(e, t, n) {
        const r=e.text.firstChild; let i=!1; if (!t||!N(r, t)) return Ws(et(Ge(e.line), 0), !0); if (t==r&&(i=!0, t=r.childNodes[n], n=0, !t)) {
          const o=e.rest?J(e.rest):e.line; return Ws(et(Ge(o), o.text.length), i);
        } let s=3==t.nodeType?t:null; let a=t; for (s||1!=t.childNodes.length||3!=t.firstChild.nodeType||(s=t.firstChild, n&&(n=s.nodeValue.length)); a.parentNode!=r;)a=a.parentNode; const l=e.measure; const c=l.maps; function u(t, n, r) {
          for (let i=-1; i<(c?c.length:0); i++) {
            for (let o=i<0?l.map:c[i], s=0; s<o.length; s+=3) {
              const a=o[s+2]; if (a==t||a==n) {
                const u=Ge(i<0?e.line:e.rest[i]); let d=o[s]+r; return (r<0||a!=t)&&(d=o[s+(r?1:0)]), et(u, d);
              }
            }
          }
        } let d=u(s, a, n); if (d) return Ws(d, i); for (let h=a.nextSibling, p=s?s.nodeValue.length-n:0; h; h=h.nextSibling) {
          if (d=u(h, h.firstChild, 0)) return Ws(et(d.line, d.ch-p), i); p+=h.textContent.length;
        } for (let f=a.previousSibling, m=n; f; f=f.previousSibling) {
          if (d=u(f, f.firstChild, -1)) return Ws(et(d.line, d.ch+m), i); m+=f.textContent.length;
        }
      }Bs.prototype.init=function(e) {
        const t=this; const n=this; const r=n.cm; const i=n.div=e.lineDiv; function o(e) {
          for (let t=e.target; t; t=t.parentNode) {
            if (t==i) return !0; if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break;
          } return !1;
        } function s(e) {
          if (o(e)&&!me(r, e)) {
            if (r.somethingSelected())Ns({lineWise: !1, text: r.getSelections()}), 'cut'==e.type&&r.replaceSelection('', null, 'cut'); else {
              if (!r.options.lineWiseCopyCut) return; const t=Is(r); Ns({lineWise: !0, text: t.text}), 'cut'==e.type&&r.operation((function() {
                r.setSelections(t.ranges, 0, W), r.replaceSelection('', null, 'cut');
              }));
            } if (e.clipboardData) {
              e.clipboardData.clearData(); const s=Es.text.join('\n'); if (e.clipboardData.setData('Text', s), e.clipboardData.getData('Text')==s) return void e.preventDefault();
            } const a=Fs(); const l=a.firstChild; r.display.lineSpace.insertBefore(a, r.display.lineSpace.firstChild), l.value=Es.text.join('\n'); const c=document.activeElement; I(l), setTimeout((function() {
              r.display.lineSpace.removeChild(a), c.focus(), c==i&&n.showPrimarySelection();
            }), 50);
          }
        }qs(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize), de(i, 'paste', (function(e) {
          !o(e)||me(r, e)||Ls(e, r)||a<=11&&setTimeout(ei(r, (function() {
            return t.updateFromDOM();
          })), 20);
        })), de(i, 'compositionstart', (function(e) {
          t.composing={data: e.data, done: !1};
        })), de(i, 'compositionupdate', (function(e) {
          t.composing||(t.composing={data: e.data, done: !1});
        })), de(i, 'compositionend', (function(e) {
          t.composing&&(e.data!=t.composing.data&&t.readFromDOMSoon(), t.composing.done=!0);
        })), de(i, 'touchstart', (function() {
          return n.forceCompositionEnd();
        })), de(i, 'input', (function() {
          t.composing||t.readFromDOMSoon();
        })), de(i, 'copy', s), de(i, 'cut', s);
      }, Bs.prototype.screenReaderLabelChanged=function(e) {
e?this.div.setAttribute('aria-label', e):this.div.removeAttribute('aria-label');
      }, Bs.prototype.prepareSelection=function() {
        const e=vr(this.cm, !1); return e.focus=document.activeElement==this.div, e;
      }, Bs.prototype.showSelection=function(e, t) {
        e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(), this.showMultipleSelections(e));
      }, Bs.prototype.getSelection=function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, Bs.prototype.showPrimarySelection=function() {
        const e=this.getSelection(); const t=this.cm; const r=t.doc.sel.primary(); const i=r.from(); const o=r.to(); if (t.display.viewTo==t.display.viewFrom||i.line>=t.display.viewTo||o.line<t.display.viewFrom)e.removeAllRanges(); else {
          const s=Hs(t, e.anchorNode, e.anchorOffset); const a=Hs(t, e.focusNode, e.focusOffset); if (!s||s.bad||!a||a.bad||0!=tt(ot(s, a), i)||0!=tt(it(s, a), o)) {
            const l=t.display.view; const c=i.line>=t.display.viewFrom&&js(t, i)||{node: l[0].measure.map[2], offset: 0}; let u=o.line<t.display.viewTo&&js(t, o); if (!u) {
              const d=l[l.length-1].measure; const h=d.maps?d.maps[d.maps.length-1]:d.map; u={node: h[h.length-1], offset: h[h.length-2]-h[h.length-3]};
            } if (c&&u) {
              let p; const f=e.rangeCount&&e.getRangeAt(0); try {
                p=C(c.node, c.offset, u.offset, u.node);
              } catch (e) {}p&&(!n&&t.state.focused?(e.collapse(c.node, c.offset), p.collapsed||(e.removeAllRanges(), e.addRange(p))):(e.removeAllRanges(), e.addRange(p)), f&&null==e.anchorNode?e.addRange(f):n&&this.startGracePeriod()), this.rememberSelection();
            } else e.removeAllRanges();
          }
        }
      }, Bs.prototype.startGracePeriod=function() {
        const e=this; clearTimeout(this.gracePeriod), this.gracePeriod=setTimeout((function() {
          e.gracePeriod=!1, e.selectionChanged()&&e.cm.operation((function() {
            return e.cm.curOp.selectionChanged=!0;
          }));
        }), 20);
      }, Bs.prototype.showMultipleSelections=function(e) {
        O(this.cm.display.cursorDiv, e.cursors), O(this.cm.display.selectionDiv, e.selection);
      }, Bs.prototype.rememberSelection=function() {
        const e=this.getSelection(); this.lastAnchorNode=e.anchorNode, this.lastAnchorOffset=e.anchorOffset, this.lastFocusNode=e.focusNode, this.lastFocusOffset=e.focusOffset;
      }, Bs.prototype.selectionInEditor=function() {
        const e=this.getSelection(); if (!e.rangeCount) return !1; const t=e.getRangeAt(0).commonAncestorContainer; return N(this.div, t);
      }, Bs.prototype.focus=function() {
        'nocursor'!=this.cm.options.readOnly&&(this.selectionInEditor()&&document.activeElement==this.div||this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, Bs.prototype.blur=function() {
        this.div.blur();
      }, Bs.prototype.getField=function() {
        return this.div;
      }, Bs.prototype.supportsTouch=function() {
        return !0;
      }, Bs.prototype.receivedFocus=function() {
        const e=this; this.selectionInEditor()?this.pollSelection():Qr(this.cm, (function() {
          return e.cm.curOp.selectionChanged=!0;
        })), this.polling.set(this.cm.options.pollInterval, (function t() {
          e.cm.state.focused&&(e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t));
        }));
      }, Bs.prototype.selectionChanged=function() {
        const e=this.getSelection(); return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset;
      }, Bs.prototype.pollSelection=function() {
        if (null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()) {
          const e=this.getSelection(); const t=this.cm; if (g&&u&&this.cm.display.gutterSpecs.length&&function(e) {
            for (let t=e; t; t=t.parentNode) if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0; return !1;
          }(e.anchorNode)) return this.cm.triggerOnKeyDown({type: 'keydown', keyCode: 8, preventDefault: Math.abs}), this.blur(), void this.focus(); if (!this.composing) {
            this.rememberSelection(); const n=Hs(t, e.anchorNode, e.anchorOffset); const r=Hs(t, e.focusNode, e.focusOffset); n&&r&&Qr(t, (function() {
              Qi(t.doc, Ci(n, r), W), (n.bad||r.bad)&&(t.curOp.selectionChanged=!0);
            }));
          }
        }
      }, Bs.prototype.pollContent=function() {
        null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout), this.readDOMTimeout=null); let e; let t; let n; const r=this.cm; const i=r.display; const o=r.doc.sel.primary(); let s=o.from(); let a=o.to(); if (0==s.ch&&s.line>r.firstLine()&&(s=et(s.line-1, Ue(r.doc, s.line-1).length)), a.ch==Ue(r.doc, a.line).text.length&&a.line<r.lastLine()&&(a=et(a.line+1, 0)), s.line<i.viewFrom||a.line>i.viewTo-1) return !1; s.line==i.viewFrom||0==(e=ur(r, s.line))?(t=Ge(i.view[0].line), n=i.view[0].node):(t=Ge(i.view[e].line), n=i.view[e-1].node.nextSibling); let l; let c; const u=ur(r, a.line); if (u==i.view.length-1?(l=i.viewTo-1, c=i.lineDiv.lastChild):(l=Ge(i.view[u+1].line)-1, c=i.view[u+1].node.previousSibling), !n) return !1; for (var d=r.doc.splitLines(function(e, t, n, r, i) {
            let o=''; let s=!1; const a=e.doc.lineSeparator(); let l=!1; function c() {
              s&&(o+=a, l&&(o+=a), s=l=!1);
            } function u(e) {
              e&&(c(), o+=e);
            } function d(t) {
              if (1==t.nodeType) {
                const n=t.getAttribute('cm-text'); if (n) return void u(n); let o; const h=t.getAttribute('cm-marker'); if (h) {
                  const p=e.findMarks(et(r, 0), et(i+1, 0), (g=+h, function(e) {
                    return e.id==g;
                  })); return void(p.length&&(o=p[0].find(0))&&u(Ke(e.doc, o.from, o.to).join(a)));
                } if ('false'==t.getAttribute('contenteditable')) return; const f=/^(pre|div|p|li|table|br)$/i.test(t.nodeName); if (!/^br$/i.test(t.nodeName)&&0==t.textContent.length) return; f&&c(); for (let m=0; m<t.childNodes.length; m++)d(t.childNodes[m]); /^(pre|p)$/i.test(t.nodeName)&&(l=!0), f&&(s=!0);
              } else 3==t.nodeType&&u(t.nodeValue.replace(/\u200b/g, '').replace(/\u00a0/g, ' ')); let g;
            } for (;d(t), t!=n;)t=t.nextSibling, l=!1; return o;
          }(r, n, c, t, l)), h=Ke(r.doc, et(t, 0), et(l, Ue(r.doc, l).text.length)); d.length>1&&h.length>1;) {
          if (J(d)==J(h))d.pop(), h.pop(), l--; else {
            if (d[0]!=h[0]) break; d.shift(), h.shift(), t++;
          }
        } for (var p=0, f=0, m=d[0], g=h[0], v=Math.min(m.length, g.length); p<v&&m.charCodeAt(p)==g.charCodeAt(p);)++p; for (var y=J(d), b=J(h), w=Math.min(y.length-(1==d.length?p:0), b.length-(1==h.length?p:0)); f<w&&y.charCodeAt(y.length-f-1)==b.charCodeAt(b.length-f-1);)++f; if (1==d.length&&1==h.length&&t==s.line) for (;p&&p>s.ch&&y.charCodeAt(y.length-f-1)==b.charCodeAt(b.length-f-1);)p--, f++; d[d.length-1]=y.slice(0, y.length-f).replace(/^\u200b+/, ''), d[0]=d[0].slice(p).replace(/\u200b+$/, ''); const x=et(t, p); const k=et(l, h.length?J(h).length-f:0); return d.length>1||d[0]||tt(x, k)?(mo(r.doc, d, x, k, '+input'), !0):void 0;
      }, Bs.prototype.ensurePolled=function() {
        this.forceCompositionEnd();
      }, Bs.prototype.reset=function() {
        this.forceCompositionEnd();
      }, Bs.prototype.forceCompositionEnd=function() {
        this.composing&&(clearTimeout(this.readDOMTimeout), this.composing=null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, Bs.prototype.readFromDOMSoon=function() {
        const e=this; null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function() {
          if (e.readDOMTimeout=null, e.composing) {
            if (!e.composing.done) return; e.composing=null;
          }e.updateFromDOM();
        }), 80));
      }, Bs.prototype.updateFromDOM=function() {
        const e=this; !this.cm.isReadOnly()&&this.pollContent()||Qr(this.cm, (function() {
          return dr(e.cm);
        }));
      }, Bs.prototype.setUneditable=function(e) {
        e.contentEditable='false';
      }, Bs.prototype.onKeyPress=function(e) {
        0==e.charCode||this.composing||(e.preventDefault(), this.cm.isReadOnly()||ei(this.cm, As)(this.cm, String.fromCharCode(null==e.charCode?e.keyCode:e.charCode), 0));
      }, Bs.prototype.readOnlyChanged=function(e) {
        this.div.contentEditable=String('nocursor'!=e);
      }, Bs.prototype.onContextMenu=function() {}, Bs.prototype.resetPosition=function() {}, Bs.prototype.needsContentAttribute=!0; const $s=function(e) {
        this.cm=e, this.prevInput='', this.pollingFast=!1, this.polling=new R, this.hasSelection=!1, this.composing=null;
      }; $s.prototype.init=function(e) {
        const t=this; const n=this; const r=this.cm; this.createField(e); const i=this.textarea; function o(e) {
          if (!me(r, e)) {
            if (r.somethingSelected())Ns({lineWise: !1, text: r.getSelections()}); else {
              if (!r.options.lineWiseCopyCut) return; const t=Is(r); Ns({lineWise: !0, text: t.text}), 'cut'==e.type?r.setSelections(t.ranges, null, W):(n.prevInput='', i.value=t.text.join('\n'), I(i));
            }'cut'==e.type&&(r.state.cutIncoming=+new Date);
          }
        }e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), m&&(i.style.width='0px'), de(i, 'input', (function() {
          s&&a>=9&&t.hasSelection&&(t.hasSelection=null), n.poll();
        })), de(i, 'paste', (function(e) {
          me(r, e)||Ls(e, r)||(r.state.pasteIncoming=+new Date, n.fastPoll());
        })), de(i, 'cut', o), de(i, 'copy', o), de(e.scroller, 'paste', (function(t) {
          if (!kn(e, t)&&!me(r, t)) {
            if (!i.dispatchEvent) return r.state.pasteIncoming=+new Date, void n.focus(); const o=new Event('paste'); o.clipboardData=t.clipboardData, i.dispatchEvent(o);
          }
        })), de(e.lineSpace, 'selectstart', (function(t) {
          kn(e, t)||be(t);
        })), de(i, 'compositionstart', (function() {
          const e=r.getCursor('from'); n.composing&&n.composing.range.clear(), n.composing={start: e, range: r.markText(e, r.getCursor('to'), {className: 'CodeMirror-composing'})};
        })), de(i, 'compositionend', (function() {
          n.composing&&(n.poll(), n.composing.range.clear(), n.composing=null);
        }));
      }, $s.prototype.createField=function(e) {
        this.wrapper=Fs(), this.textarea=this.wrapper.firstChild;
      }, $s.prototype.screenReaderLabelChanged=function(e) {
e?this.textarea.setAttribute('aria-label', e):this.textarea.removeAttribute('aria-label');
      }, $s.prototype.prepareSelection=function() {
        const e=this.cm; const t=e.display; const n=e.doc; const r=vr(e); if (e.options.moveInputWithCursor) {
          const i=Kn(e, n.sel.primary().head, 'div'); const o=t.wrapper.getBoundingClientRect(); const s=t.lineDiv.getBoundingClientRect(); r.teTop=Math.max(0, Math.min(t.wrapper.clientHeight-10, i.top+s.top-o.top)), r.teLeft=Math.max(0, Math.min(t.wrapper.clientWidth-10, i.left+s.left-o.left));
        } return r;
      }, $s.prototype.showSelection=function(e) {
        const t=this.cm.display; O(t.cursorDiv, e.cursors), O(t.selectionDiv, e.selection), null!=e.teTop&&(this.wrapper.style.top=e.teTop+'px', this.wrapper.style.left=e.teLeft+'px');
      }, $s.prototype.reset=function(e) {
        if (!this.contextMenuPending&&!this.composing) {
          const t=this.cm; if (t.somethingSelected()) {
            this.prevInput=''; const n=t.getSelection(); this.textarea.value=n, t.state.focused&&I(this.textarea), s&&a>=9&&(this.hasSelection=n);
          } else e||(this.prevInput=this.textarea.value='', s&&a>=9&&(this.hasSelection=null));
        }
      }, $s.prototype.getField=function() {
        return this.textarea;
      }, $s.prototype.supportsTouch=function() {
        return !1;
      }, $s.prototype.focus=function() {
        if ('nocursor'!=this.cm.options.readOnly&&(!v||A()!=this.textarea)) {
          try {
            this.textarea.focus();
          } catch (e) {}
        }
      }, $s.prototype.blur=function() {
        this.textarea.blur();
      }, $s.prototype.resetPosition=function() {
        this.wrapper.style.top=this.wrapper.style.left=0;
      }, $s.prototype.receivedFocus=function() {
        this.slowPoll();
      }, $s.prototype.slowPoll=function() {
        const e=this; this.pollingFast||this.polling.set(this.cm.options.pollInterval, (function() {
          e.poll(), e.cm.state.focused&&e.slowPoll();
        }));
      }, $s.prototype.fastPoll=function() {
        let e=!1; const t=this; t.pollingFast=!0, t.polling.set(20, (function n() {
t.poll()||e?(t.pollingFast=!1, t.slowPoll()):(e=!0, t.polling.set(60, n));
        }));
      }, $s.prototype.poll=function() {
        const e=this; const t=this.cm; const n=this.textarea; let r=this.prevInput; if (this.contextMenuPending||!t.state.focused||Ae(n)&&!r&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq) return !1; const i=n.value; if (i==r&&!t.somethingSelected()) return !1; if (s&&a>=9&&this.hasSelection===i||y&&/[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1; if (t.doc.sel==t.display.selForContextMenu) {
          const o=i.charCodeAt(0); if (8203!=o||r||(r='​'), 8666==o) return this.reset(), this.cm.execCommand('undo');
        } for (var l=0, c=Math.min(r.length, i.length); l<c&&r.charCodeAt(l)==i.charCodeAt(l);)++l; return Qr(t, (function() {
          As(t, i.slice(l), r.length-l, null, e.composing?'*compose':null), i.length>1e3||i.indexOf('\n')>-1?n.value=e.prevInput='':e.prevInput=i, e.composing&&(e.composing.range.clear(), e.composing.range=t.markText(e.composing.start, t.getCursor('to'), {className: 'CodeMirror-composing'}));
        })), !0;
      }, $s.prototype.ensurePolled=function() {
        this.pollingFast&&this.poll()&&(this.pollingFast=!1);
      }, $s.prototype.onKeyPress=function() {
        s&&a>=9&&(this.hasSelection=null), this.fastPoll();
      }, $s.prototype.onContextMenu=function(e) {
        const t=this; const n=t.cm; const r=n.display; const i=t.textarea; t.contextMenuPending&&t.contextMenuPending(); const o=cr(n, e); const c=r.scroller.scrollTop; if (o&&!d) {
          n.options.resetSelectionOnContextMenu&&-1==n.doc.sel.contains(o)&&ei(n, Qi)(n.doc, Ci(o), W); let u; var h=i.style.cssText; var p=t.wrapper.style.cssText; const f=t.wrapper.offsetParent.getBoundingClientRect(); if (t.wrapper.style.cssText='position: static', i.style.cssText='position: absolute; width: 30px; height: 30px;\n      top: '+(e.clientY-f.top-5)+'px; left: '+(e.clientX-f.left-5)+'px;\n      z-index: 1000; background: '+(s?'rgba(255, 255, 255, .05)':'transparent')+';\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);', l&&(u=window.scrollY), r.input.focus(), l&&window.scrollTo(null, u), r.input.reset(), n.somethingSelected()||(i.value=t.prevInput=' '), t.contextMenuPending=v, r.selForContextMenu=n.doc.sel, clearTimeout(r.detectingSelectAll), s&&a>=9&&g(), _) {
            ke(e); var m=function() {
              pe(window, 'mouseup', m), setTimeout(v, 20);
            }; de(window, 'mouseup', m);
          } else setTimeout(v, 50);
        } function g() {
          if (null!=i.selectionStart) {
            const e=n.somethingSelected(); const o='​'+(e?i.value:''); i.value='⇚', i.value=o, t.prevInput=e?'':'​', i.selectionStart=1, i.selectionEnd=o.length, r.selForContextMenu=n.doc.sel;
          }
        } function v() {
          if (t.contextMenuPending==v&&(t.contextMenuPending=!1, t.wrapper.style.cssText=p, i.style.cssText=h, s&&a<9&&r.scrollbars.setScrollTop(r.scroller.scrollTop=c), null!=i.selectionStart)) {
            (!s||s&&a<9)&&g(); let e=0; var o=function() {
r.selForContextMenu==n.doc.sel&&0==i.selectionStart&&i.selectionEnd>0&&'​'==t.prevInput?ei(n, ao)(n):e++<10?r.detectingSelectAll=setTimeout(o, 500):(r.selForContextMenu=null, r.input.reset());
            }; r.detectingSelectAll=setTimeout(o, 200);
          }
        }
      }, $s.prototype.readOnlyChanged=function(e) {
        e||this.reset(), this.textarea.disabled='nocursor'==e, this.textarea.readOnly=!!e;
      }, $s.prototype.setUneditable=function() {}, $s.prototype.needsContentAttribute=!1, function(e) {
        const t=e.optionHandlers; function n(n, r, i, o) {
          e.defaults[n]=r, i&&(t[n]=o?function(e, t, n) {
            n!=ks&&i(e, t, n);
          }:i);
        }e.defineOption=n, e.Init=ks, n('value', '', (function(e, t) {
          return e.setValue(t);
        }), !0), n('mode', null, (function(e, t) {
          e.doc.modeOption=t, Ei(e);
        }), !0), n('indentUnit', 2, Ei, !0), n('indentWithTabs', !1), n('smartIndent', !0), n('tabSize', 4, (function(e) {
          Ni(e), Bn(e), dr(e);
        }), !0), n('lineSeparator', null, (function(e, t) {
          if (e.doc.lineSep=t, t) {
            const n=[]; let r=e.doc.first; e.doc.iter((function(e) {
              for (let i=0; ;) {
                const o=e.text.indexOf(t, i); if (-1==o) break; i=o+t.length, n.push(et(r, o));
              }r++;
            })); for (let i=n.length-1; i>=0; i--)mo(e.doc, t, n[i], et(n[i].line, n[i].ch+t.length));
          }
        })), n('specialChars', /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, (function(e, t, n) {
          e.state.specialChars=new RegExp(t.source+(t.test('\t')?'':'|\t'), 'g'), n!=ks&&e.refresh();
        })), n('specialCharPlaceholder', Zt, (function(e) {
          return e.refresh();
        }), !0), n('electricChars', !0), n('inputStyle', v?'contenteditable':'textarea', (function() {
          throw new Error('inputStyle can not (yet) be changed in a running editor');
        }), !0), n('spellcheck', !1, (function(e, t) {
          return e.getInputField().spellcheck=t;
        }), !0), n('autocorrect', !1, (function(e, t) {
          return e.getInputField().autocorrect=t;
        }), !0), n('autocapitalize', !1, (function(e, t) {
          return e.getInputField().autocapitalize=t;
        }), !0), n('rtlMoveVisually', !w), n('wholeLineUpdateBefore', !0), n('theme', 'default', (function(e) {
          xs(e), mi(e);
        }), !0), n('keyMap', 'default', (function(e, t, n) {
          const r=Go(t); const i=n!=ks&&Go(n); i&&i.detach&&i.detach(e, r), r.attach&&r.attach(e, i||null);
        })), n('extraKeys', null), n('configureMouse', null), n('lineWrapping', !1, Ms, !0), n('gutters', [], (function(e, t) {
          e.display.gutterSpecs=pi(t, e.options.lineNumbers), mi(e);
        }), !0), n('fixedGutter', !0, (function(e, t) {
          e.display.gutters.style.left=t?sr(e.display)+'px':'0', e.refresh();
        }), !0), n('coverGutterNextToScrollbar', !1, (function(e) {
          return jr(e);
        }), !0), n('scrollbarStyle', 'native', (function(e) {
          Vr(e), jr(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
        }), !0), n('lineNumbers', !1, (function(e, t) {
          e.display.gutterSpecs=pi(e.options.gutters, t), mi(e);
        }), !0), n('firstLineNumber', 1, mi, !0), n('lineNumberFormatter', (function(e) {
          return e;
        }), mi, !0), n('showCursorWhenSelecting', !1, gr, !0), n('resetSelectionOnContextMenu', !0), n('lineWiseCopyCut', !0), n('pasteLinesPerSelection', !0), n('selectionsMayTouch', !1), n('readOnly', !1, (function(e, t) {
          'nocursor'==t&&(Cr(e), e.display.input.blur()), e.display.input.readOnlyChanged(t);
        })), n('screenReaderLabel', null, (function(e, t) {
          t=''===t?null:t, e.display.input.screenReaderLabelChanged(t);
        })), n('disableInput', !1, (function(e, t) {
          t||e.display.input.reset();
        }), !0), n('dragDrop', !0, Cs), n('allowDropFileTypes', null), n('cursorBlinkRate', 530), n('cursorScrollMargin', 0), n('cursorHeight', 1, gr, !0), n('singleCursorHeightPerLine', !0, gr, !0), n('workTime', 100), n('workDelay', 100), n('flattenSpans', !0, Ni, !0), n('addModeClass', !1, Ni, !0), n('pollInterval', 100), n('undoDepth', 200, (function(e, t) {
          return e.doc.history.undoDepth=t;
        })), n('historyEventDelay', 1250), n('viewportMargin', 10, (function(e) {
          return e.refresh();
        }), !0), n('maxHighlightLength', 1e4, Ni, !0), n('moveInputWithCursor', !0, (function(e, t) {
          t||e.display.input.resetPosition();
        })), n('tabindex', null, (function(e, t) {
          return e.display.input.getField().tabIndex=t||'';
        })), n('autofocus', null), n('direction', 'ltr', (function(e, t) {
          return e.doc.setDirection(t);
        }), !0), n('phrases', null);
      }(Ts), function(e) {
        const t=e.optionHandlers; const n=e.helpers={}; e.prototype={constructor: e, focus: function() {
          window.focus(), this.display.input.focus();
        }, setOption: function(e, n) {
          const r=this.options; const i=r[e]; r[e]==n&&'mode'!=e||(r[e]=n, t.hasOwnProperty(e)&&ei(this, t[e])(this, n, i), fe(this, 'optionChange', this, e));
        }, getOption: function(e) {
          return this.options[e];
        }, getDoc: function() {
          return this.doc;
        }, addKeyMap: function(e, t) {
          this.state.keyMaps[t?'push':'unshift'](Go(e));
        }, removeKeyMap: function(e) {
          for (let t=this.state.keyMaps, n=0; n<t.length; ++n) if (t[n]==e||t[n].name==e) return t.splice(n, 1), !0;
        }, addOverlay: ti((function(t, n) {
          const r=t.token?t:e.getMode(this.options, t); if (r.startState) throw new Error('Overlays may not be stateful.'); (function(e, t, n) {
            for (var r=0, i=n(t); r<e.length&&n(e[r])<=i;)r++; e.splice(r, 0, t);
          })(this.state.overlays, {mode: r, modeSpec: t, opaque: n&&n.opaque, priority: n&&n.priority||0}, (function(e) {
            return e.priority;
          })), this.state.modeGen++, dr(this);
        })), removeOverlay: ti((function(e) {
          for (let t=this.state.overlays, n=0; n<t.length; ++n) {
            const r=t[n].modeSpec; if (r==e||'string'==typeof e&&r.name==e) return t.splice(n, 1), this.state.modeGen++, void dr(this);
          }
        })), indentLine: ti((function(e, t, n) {
          'string'!=typeof t&&'number'!=typeof t&&(t=null==t?this.options.smartIndent?'smart':'prev':t?'add':'subtract'), Ze(this.doc, e)&&Ds(this, e, t, n);
        })), indentSelection: ti((function(e) {
          for (let t=this.doc.sel.ranges, n=-1, r=0; r<t.length; r++) {
            const i=t[r]; if (i.empty())i.head.line>n&&(Ds(this, i.head.line, e, !0), n=i.head.line, r==this.doc.sel.primIndex&&Nr(this)); else {
              const o=i.from(); const s=i.to(); const a=Math.max(n, o.line); n=Math.min(this.lastLine(), s.line-(s.ch?0:1))+1; for (let l=a; l<n; ++l)Ds(this, l, e); const c=this.doc.sel.ranges; 0==o.ch&&t.length==c.length&&c[r].from().ch>0&&Gi(this.doc, r, new _i(o, c[r].to()), W);
            }
          }
        })), getTokenAt: function(e, t) {
          return yt(this, e, t);
        }, getLineTokens: function(e, t) {
          return yt(this, et(e), t, !0);
        }, getTokenTypeAt: function(e) {
          e=at(this.doc, e); let t; const n=ht(this, Ue(this.doc, e.line)); let r=0; let i=(n.length-1)/2; const o=e.ch; if (0==o)t=n[2]; else {
            for (;;) {
              const s=r+i>>1; if ((s?n[2*s-1]:0)>=o)i=s; else {
                if (!(n[2*s+1]<o)) {
                  t=n[2*s+2]; break;
                }r=s+1;
              }
            }
          } const a=t?t.indexOf('overlay '):-1; return a<0?t:0==a?null:t.slice(0, a-1);
        }, getModeAt: function(t) {
          const n=this.doc.mode; return n.innerMode?e.innerMode(n, this.getTokenAt(t).state).mode:n;
        }, getHelper: function(e, t) {
          return this.getHelpers(e, t)[0];
        }, getHelpers: function(e, t) {
          const r=[]; if (!n.hasOwnProperty(t)) return r; const i=n[t]; const o=this.getModeAt(e); if ('string'==typeof o[t])i[o[t]]&&r.push(i[o[t]]); else if (o[t]) {
            for (let s=0; s<o[t].length; s++) {
              const a=i[o[t][s]]; a&&r.push(a);
            }
          } else o.helperType&&i[o.helperType]?r.push(i[o.helperType]):i[o.name]&&r.push(i[o.name]); for (let l=0; l<i._global.length; l++) {
            const c=i._global[l]; c.pred(o, this)&&-1==B(r, c.val)&&r.push(c.val);
          } return r;
        }, getStateAfter: function(e, t) {
          const n=this.doc; return pt(this, (e=st(n, null==e?n.first+n.size-1:e))+1, t).state;
        }, cursorCoords: function(e, t) {
          const n=this.doc.sel.primary(); return Kn(this, null==e?n.head:'object'==typeof e?at(this.doc, e):e?n.from():n.to(), t||'page');
        }, charCoords: function(e, t) {
          return Un(this, at(this.doc, e), t||'page');
        }, coordsChar: function(e, t) {
          return Gn(this, (e=$n(this, e, t||'page')).left, e.top);
        }, lineAtHeight: function(e, t) {
          return e=$n(this, {top: e, left: 0}, t||'page').top, Xe(this.doc, e+this.display.viewOffset);
        }, heightAtLine: function(e, t, n) {
          let r; let i=!1; if ('number'==typeof e) {
            const o=this.doc.first+this.doc.size-1; e<this.doc.first?e=this.doc.first:e>o&&(e=o, i=!0), r=Ue(this.doc, e);
          } else r=e; return Vn(this, r, {top: 0, left: 0}, t||'page', n||i).top+(i?this.doc.height-Ht(r):0);
        }, defaultTextHeight: function() {
          return rr(this.display);
        }, defaultCharWidth: function() {
          return ir(this.display);
        }, getViewport: function() {
          return {from: this.display.viewFrom, to: this.display.viewTo};
        }, addWidget: function(e, t, n, r, i) {
          let o; let s; let a; const l=this.display; let c=(e=Kn(this, at(this.doc, e))).bottom; let u=e.left; if (t.style.position='absolute', t.setAttribute('cm-ignore-events', 'true'), this.display.input.setUneditable(t), l.sizer.appendChild(t), 'over'==r)c=e.top; else if ('above'==r||'near'==r) {
            const d=Math.max(l.wrapper.clientHeight, this.doc.height); const h=Math.max(l.sizer.clientWidth, l.lineSpace.clientWidth); ('above'==r||e.bottom+t.offsetHeight>d)&&e.top>t.offsetHeight?c=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=d&&(c=e.bottom), u+t.offsetWidth>h&&(u=h-t.offsetWidth);
          }t.style.top=c+'px', t.style.left=t.style.right='', 'right'==i?(u=l.sizer.clientWidth-t.offsetWidth, t.style.right='0px'):('left'==i?u=0:'middle'==i&&(u=(l.sizer.clientWidth-t.offsetWidth)/2), t.style.left=u+'px'), n&&(o=this, s={left: u, top: c, right: u+t.offsetWidth, bottom: c+t.offsetHeight}, null!=(a=Dr(o, s)).scrollTop&&Ir(o, a.scrollTop), null!=a.scrollLeft&&Fr(o, a.scrollLeft));
        }, triggerOnKeyDown: ti(us), triggerOnKeyPress: ti(hs), triggerOnKeyUp: ds, triggerOnMouseDown: ti(gs), execCommand: function(e) {
          if (ts.hasOwnProperty(e)) return ts[e].call(null, this);
        }, triggerElectric: ti((function(e) {
          zs(this, e);
        })), findPosH: function(e, t, n, r) {
          let i=1; t<0&&(i=-1, t=-t); for (var o=at(this.doc, e), s=0; s<t&&!(o=Ps(this.doc, o, i, n, r)).hitSide; ++s);return o;
        }, moveH: ti((function(e, t) {
          const n=this; this.extendSelectionsBy((function(r) {
            return n.display.shift||n.doc.extend||r.empty()?Ps(n.doc, r.head, e, t, n.options.rtlMoveVisually):e<0?r.from():r.to();
          }), V);
        })), deleteH: ti((function(e, t) {
          const n=this.doc.sel; const r=this.doc; n.somethingSelected()?r.replaceSelection('', null, '+delete'):Xo(this, (function(n) {
            const i=Ps(r, n.head, e, t, !1); return e<0?{from: i, to: n.head}:{from: n.head, to: i};
          }));
        })), findPosV: function(e, t, n, r) {
          let i=1; let o=r; t<0&&(i=-1, t=-t); for (var s=at(this.doc, e), a=0; a<t; ++a) {
            const l=Kn(this, s, 'div'); if (null==o?o=l.left:l.left=o, (s=Rs(this, l, i, n)).hitSide) break;
          } return s;
        }, moveV: ti((function(e, t) {
          const n=this; const r=this.doc; const i=[]; const o=!this.display.shift&&!r.extend&&r.sel.somethingSelected(); if (r.extendSelectionsBy((function(s) {
            if (o) return e<0?s.from():s.to(); const a=Kn(n, s.head, 'div'); null!=s.goalColumn&&(a.left=s.goalColumn), i.push(a.left); const l=Rs(n, a, e, t); return 'page'==t&&s==r.sel.primary()&&Er(n, Un(n, l, 'div').top-a.top), l;
          }), V), i.length) for (let s=0; s<r.sel.ranges.length; s++)r.sel.ranges[s].goalColumn=i[s];
        })), findWordAt: function(e) {
          const t=Ue(this.doc, e.line).text; let n=e.ch; let r=e.ch; if (t) {
            const i=this.getHelper(e, 'wordChars'); 'before'!=e.sticky&&r!=t.length||!n?++r:--n; for (var o=t.charAt(n), s=ee(o, i)?function(e) {
              return ee(e, i);
            }:/\s/.test(o)?function(e) {
              return /\s/.test(e);
            }:function(e) {
              return !/\s/.test(e)&&!ee(e);
            }; n>0&&s(t.charAt(n-1));)--n; for (;r<t.length&&s(t.charAt(r));)++r;
          } return new _i(et(e.line, n), et(e.line, r));
        }, toggleOverwrite: function(e) {
          null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?L(this.display.cursorDiv, 'CodeMirror-overwrite'):M(this.display.cursorDiv, 'CodeMirror-overwrite'), fe(this, 'overwriteToggle', this, this.state.overwrite));
        }, hasFocus: function() {
          return this.display.input.getField()==A();
        }, isReadOnly: function() {
          return !(!this.options.readOnly&&!this.doc.cantEdit);
        }, scrollTo: ti((function(e, t) {
          Ar(this, e, t);
        })), getScrollInfo: function() {
          const e=this.display.scroller; return {left: e.scrollLeft, top: e.scrollTop, height: e.scrollHeight-Mn(this)-this.display.barHeight, width: e.scrollWidth-Mn(this)-this.display.barWidth, clientHeight: On(this), clientWidth: Tn(this)};
        }, scrollIntoView: ti((function(e, t) {
null==e?(e={from: this.doc.sel.primary().head, to: null}, null==t&&(t=this.options.cursorScrollMargin)):'number'==typeof e?e={from: et(e, 0), to: null}:null==e.from&&(e={from: e, to: null}), e.to||(e.to=e.from), e.margin=t||0, null!=e.from.line?function(e, t) {
  Lr(e), e.curOp.scrollToPos=t;
}(this, e):zr(this, e.from, e.to, e.margin);
        })), setSize: ti((function(e, t) {
          const n=this; const r=function(e) {
            return 'number'==typeof e||/^\d+$/.test(String(e))?e+'px':e;
          }; null!=e&&(this.display.wrapper.style.width=r(e)), null!=t&&(this.display.wrapper.style.height=r(t)), this.options.lineWrapping&&Rn(this); let i=this.display.viewFrom; this.doc.iter(i, this.display.viewTo, (function(e) {
            if (e.widgets) {
              for (let t=0; t<e.widgets.length; t++) {
                if (e.widgets[t].noHScroll) {
                  hr(n, i, 'widget'); break;
                }
              }
            }++i;
          })), this.curOp.forceUpdate=!0, fe(this, 'refresh', this);
        })), operation: function(e) {
          return Qr(this, e);
        }, startOperation: function() {
          return Ur(this);
        }, endOperation: function() {
          return Kr(this);
        }, refresh: ti((function() {
          const e=this.display.cachedTextHeight; dr(this), this.curOp.forceUpdate=!0, Bn(this), Ar(this, this.doc.scrollLeft, this.doc.scrollTop), ci(this.display), (null==e||Math.abs(e-rr(this.display))>.5||this.options.lineWrapping)&&lr(this), fe(this, 'refresh', this);
        })), swapDoc: ti((function(e) {
          const t=this.doc; return t.cm=null, this.state.selectingText&&this.state.selectingText(), Ii(this, e), Bn(this), this.display.input.reset(), Ar(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll=!0, ln(this, 'swapDoc', this, t), t;
        })), phrase: function(e) {
          const t=this.options.phrases; return t&&Object.prototype.hasOwnProperty.call(t, e)?t[e]:e;
        }, getInputField: function() {
          return this.display.input.getField();
        }, getWrapperElement: function() {
          return this.display.wrapper;
        }, getScrollerElement: function() {
          return this.display.scroller;
        }, getGutterElement: function() {
          return this.display.gutters;
        }}, ye(e), e.registerHelper=function(t, r, i) {
          n.hasOwnProperty(t)||(n[t]=e[t]={_global: []}), n[t][r]=i;
        }, e.registerGlobalHelper=function(t, r, i, o) {
          e.registerHelper(t, r, o), n[t]._global.push({pred: i, val: o});
        };
      }(Ts); const Us='iter insert remove copy getEditor constructor'.split(' '); for (const Ks in No.prototype) {
        No.prototype.hasOwnProperty(Ks)&&B(Us, Ks)<0&&(Ts.prototype[Ks]=function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(No.prototype[Ks]));
      } return ye(No), Ts.inputStyles={textarea: $s, contenteditable: Bs}, Ts.defineMode=function(e) {
        Ts.defaults.mode||'null'==e||(Ts.defaults.mode=e), Fe.apply(this, arguments);
      }, Ts.defineMIME=function(e, t) {
        qe[e]=t;
      }, Ts.defineMode('null', (function() {
        return {token: function(e) {
          return e.skipToEnd();
        }};
      })), Ts.defineMIME('text/plain', 'null'), Ts.defineExtension=function(e, t) {
        Ts.prototype[e]=t;
      }, Ts.defineDocExtension=function(e, t) {
        No.prototype[e]=t;
      }, Ts.fromTextArea=function(e, t) {
        if ((t=t?F(t):{}).value=e.value, !t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex), !t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder), null==t.autofocus) {
          const n=A(); t.autofocus=n==e||null!=e.getAttribute('autofocus')&&n==document.body;
        } function r() {
          e.value=a.getValue();
        } let i; if (e.form&&(de(e.form, 'submit', r), !t.leaveSubmitMethodAlone)) {
          const o=e.form; i=o.submit; try {
            var s=o.submit=function() {
              r(), o.submit=i, o.submit(), o.submit=s;
            };
          } catch (e) {}
        }t.finishInit=function(n) {
          n.save=r, n.getTextArea=function() {
            return e;
          }, n.toTextArea=function() {
            n.toTextArea=isNaN, r(), e.parentNode.removeChild(n.getWrapperElement()), e.style.display='', e.form&&(pe(e.form, 'submit', r), t.leaveSubmitMethodAlone||'function'!=typeof e.form.submit||(e.form.submit=i));
          };
        }, e.style.display='none'; var a=Ts((function(t) {
          return e.parentNode.insertBefore(t, e.nextSibling);
        }), t); return a;
      }, function(e) {
        e.off=pe, e.on=de, e.wheelEventPixels=wi, e.Doc=No, e.splitLines=Ne, e.countColumn=P, e.findColumn=$, e.isWordChar=Q, e.Pass=j, e.signal=fe, e.Line=Ut, e.changeEnd=Mi, e.scrollbarModel=Hr, e.Pos=et, e.cmpPos=tt, e.modes=Ie, e.mimeModes=qe, e.resolveMode=Pe, e.getMode=Re, e.modeExtensions=Be, e.extendMode=je, e.copyState=We, e.startState=Ve, e.innerMode=He, e.commands=ts, e.keyMap=Ho, e.keyName=Yo, e.isModifierKey=Ko, e.lookupKey=Uo, e.normalizeKeyMap=$o, e.StringStream=$e, e.SharedTextMarker=To, e.TextMarker=Co, e.LineWidget=ko, e.e_preventDefault=be, e.e_stopPropagation=we, e.e_stop=ke, e.addClass=L, e.contains=N, e.rmClass=M, e.keyNames=Ro;
      }(Ts), Ts.version='5.58.3', Ts;
    }();
  }, 762: (e, t, n)=>{
    !function(e) {
      'use strict'; function t(e, t, n, r, i, o) {
        this.indented=e, this.column=t, this.type=n, this.info=r, this.align=i, this.prev=o;
      } function n(e, n, r, i) {
        let o=e.indented; return e.context&&'statement'==e.context.type&&'statement'!=r&&(o=e.context.indented), e.context=new t(o, n, r, i, null, e.context);
      } function r(e) {
        const t=e.context.type; return ')'!=t&&']'!=t&&'}'!=t||(e.indented=e.context.indented), e.context=e.context.prev;
      } function i(e, t, n) {
        return 'variable'==t.prevToken||'type'==t.prevToken||!!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, n))||!(!t.typeAtEndOfLine||e.column()!=e.indentation())||void 0;
      } function o(e) {
        for (;;) {
          if (!e||'top'==e.type) return !0; if ('}'==e.type&&'namespace'!=e.prev.info) return !1; e=e.prev;
        }
      } function s(e) {
        for (var t={}, n=e.split(' '), r=0; r<n.length; ++r)t[n[r]]=!0; return t;
      } function a(e, t) {
        return 'function'==typeof e?e(t):e.propertyIsEnumerable(t);
      }e.defineMode('clike', (function(s, l) {
        let c; let u; const d=s.indentUnit; const h=l.statementIndentUnit||d; const p=l.dontAlignCalls; const f=l.keywords||{}; const m=l.types||{}; const g=l.builtin||{}; const v=l.blockKeywords||{}; const y=l.defKeywords||{}; const b=l.atoms||{}; const w=l.hooks||{}; const x=l.multiLineStrings; const k=!1!==l.indentStatements; const _=!1!==l.indentSwitch; const S=l.namespaceSeparator; const C=l.isPunctuationChar||/[\[\]{}\(\),;\:\.]/; const M=l.numberStart||/[\d\.]/; const T=l.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i; const O=l.isOperatorChar||/[+\-*&%=<>!?|\/]/; const D=l.isIdentifierChar||/[\w\$_\xa1-\uffff]/; const E=l.isReservedIdentifier||!1; function N(e, t) {
          let n; const r=e.next(); if (w[r]) {
            const i=w[r](e, t); if (!1!==i) return i;
          } if ('"'==r||'\''==r) {
            return t.tokenize=(n=r, function(e, t) {
              for (var r, i=!1, o=!1; null!=(r=e.next());) {
                if (r==n&&!i) {
                  o=!0; break;
                }i=!i&&'\\'==r;
              } return (o||!i&&!x)&&(t.tokenize=null), 'string';
            }), t.tokenize(e, t);
          } if (M.test(r)) {
            if (e.backUp(1), e.match(T)) return 'number'; e.next();
          } if (C.test(r)) return c=r, null; if ('/'==r) {
            if (e.eat('*')) return t.tokenize=A, A(e, t); if (e.eat('/')) return e.skipToEnd(), 'comment';
          } if (O.test(r)) {
            for (;!e.match(/^\/[\/*]/, !1)&&e.eat(O););return 'operator';
          } if (e.eatWhile(D), S) for (;e.match(S);)e.eatWhile(D); const o=e.current(); return a(f, o)?(a(v, o)&&(c='newstatement'), a(y, o)&&(u=!0), 'keyword'):a(m, o)?'type':a(g, o)||E&&E(o)?(a(v, o)&&(c='newstatement'), 'builtin'):a(b, o)?'atom':'variable';
        } function A(e, t) {
          for (var n, r=!1; n=e.next();) {
            if ('/'==n&&r) {
              t.tokenize=null; break;
            }r='*'==n;
          } return 'comment';
        } function L(e, t) {
          l.typeFirstDefinitions&&e.eol()&&o(t.context)&&(t.typeAtEndOfLine=i(e, t, e.pos));
        } return {startState: function(e) {
          return {tokenize: null, context: new t((e||0)-d, 0, 'top', null, !1), indented: 0, startOfLine: !0, prevToken: null};
        }, token: function(e, t) {
          let s=t.context; if (e.sol()&&(null==s.align&&(s.align=!1), t.indented=e.indentation(), t.startOfLine=!0), e.eatSpace()) return L(e, t), null; c=u=null; let a=(t.tokenize||N)(e, t); if ('comment'==a||'meta'==a) return a; if (null==s.align&&(s.align=!0), ';'==c||':'==c||','==c&&e.match(/^\s*(?:\/\/.*)?$/, !1)) for (;'statement'==t.context.type;)r(t); else if ('{'==c)n(t, e.column(), '}'); else if ('['==c)n(t, e.column(), ']'); else if ('('==c)n(t, e.column(), ')'); else if ('}'==c) {
            for (;'statement'==s.type;)s=r(t); for ('}'==s.type&&(s=r(t)); 'statement'==s.type;)s=r(t);
          } else c==s.type?r(t):k&&(('}'==s.type||'top'==s.type)&&';'!=c||'statement'==s.type&&'newstatement'==c)&&n(t, e.column(), 'statement', e.current()); if ('variable'==a&&('def'==t.prevToken||l.typeFirstDefinitions&&i(e, t, e.start)&&o(t.context)&&e.match(/^\s*\(/, !1))&&(a='def'), w.token) {
            const d=w.token(e, t, a); void 0!==d&&(a=d);
          } return 'def'==a&&!1===l.styleDefs&&(a='variable'), t.startOfLine=!1, t.prevToken=u?'def':a||c, L(e, t), a;
        }, indent: function(t, n) {
          if (t.tokenize!=N&&null!=t.tokenize||t.typeAtEndOfLine) return e.Pass; let r=t.context; const i=n&&n.charAt(0); const o=i==r.type; if ('statement'==r.type&&'}'==i&&(r=r.prev), l.dontIndentStatements) for (;'statement'==r.type&&l.dontIndentStatements.test(r.info);)r=r.prev; if (w.indent) {
            const s=w.indent(t, r, n, d); if ('number'==typeof s) return s;
          } const a=r.prev&&'switch'==r.prev.info; if (l.allmanIndentation&&/[{(]/.test(i)) {
            for (;'top'!=r.type&&'}'!=r.type;)r=r.prev; return r.indented;
          } return 'statement'==r.type?r.indented+('{'==i?0:h):!r.align||p&&')'==r.type?')'!=r.type||o?r.indented+(o?0:d)+(o||!a||/^(?:case|default)\b/.test(n)?0:d):r.indented+h:r.column+(o?0:1);
        }, electricInput: _?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/, blockCommentStart: '/*', blockCommentEnd: '*/', blockCommentContinue: ' * ', lineComment: '//', fold: 'brace'};
      })); const l='auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran'; const c='alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq'; const u='bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available'; const d='FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT'; const h=s('int long char short double float unsigned signed void bool'); const p=s('SEL instancetype id Class Protocol BOOL'); function f(e) {
        return a(h, e)||/.+_t$/.test(e);
      } function m(e) {
        return f(e)||a(p, e);
      } const g='case do else for if switch while struct enum union'; const v='struct enum union'; function y(e, t) {
        if (!t.startOfLine) return !1; for (var n, r=null; n=e.peek();) {
          if ('\\'==n&&e.match(/^.$/)) {
            r=y; break;
          } if ('/'==n&&e.match(/^\/[\/\*]/, !1)) break; e.next();
        } return t.tokenize=r, 'meta';
      } function b(e, t) {
        return 'type'==t.prevToken&&'type';
      } function w(e) {
        return !(!e||e.length<2||'_'!=e[0]||'_'!=e[1]&&e[1]===e[1].toLowerCase());
      } function x(e) {
        return e.eatWhile(/[\w\.']/), 'number';
      } function k(e, t) {
        if (e.backUp(1), e.match(/(R|u8R|uR|UR|LR)/)) {
          const n=e.match(/"([^\s\\()]{0,16})\(/); return !!n&&(t.cpp11RawStringDelim=n[1], t.tokenize=C, C(e, t));
        } return e.match(/(u8|u|U|L)/)?!!e.match(/["']/, !1)&&'string':(e.next(), !1);
      } function _(e) {
        const t=/(\w+)::~?(\w+)$/.exec(e); return t&&t[1]==t[2];
      } function S(e, t) {
        for (var n; null!=(n=e.next());) {
          if ('"'==n&&!e.eat('"')) {
            t.tokenize=null; break;
          }
        } return 'string';
      } function C(e, t) {
        const n=t.cpp11RawStringDelim.replace(/[^\w\s]/g, '\\$&'); return e.match(new RegExp('.*?\\)'+n+'"'))?t.tokenize=null:e.skipToEnd(), 'string';
      } function M(t, n) {
        'string'==typeof t&&(t=[t]); const r=[]; function i(e) {
          if (e) for (const t in e)e.hasOwnProperty(t)&&r.push(t);
        }i(n.keywords), i(n.types), i(n.builtin), i(n.atoms), r.length&&(n.helperType=t[0], e.registerHelper('hintWords', t[0], r)); for (let o=0; o<t.length; ++o)e.defineMIME(t[o], n);
      } function T(e, t) {
        for (let n=!1; !e.eol();) {
          if (!n&&e.match('"""')) {
            t.tokenize=null; break;
          }n='\\'==e.next()&&!n;
        } return 'string';
      } function O(e) {
        return function(t, n) {
          for (var r; r=t.next();) {
            if ('*'==r&&t.eat('/')) {
              if (1==e) {
                n.tokenize=null; break;
              } return n.tokenize=O(e-1), n.tokenize(t, n);
            } if ('/'==r&&t.eat('*')) return n.tokenize=O(e+1), n.tokenize(t, n);
          } return 'comment';
        };
      }M(['text/x-csrc', 'text/x-c', 'text/x-chdr'], {name: 'clike', keywords: s(l), types: f, blockKeywords: s(g), defKeywords: s(v), typeFirstDefinitions: !0, atoms: s('NULL true false'), isReservedIdentifier: w, hooks: {'#': y, '*': b}, modeProps: {fold: ['brace', 'include']}}), M(['text/x-c++src', 'text/x-c++hdr'], {name: 'clike', keywords: s(l+' '+c), types: f, blockKeywords: s(g+' class try catch'), defKeywords: s(v+' class namespace'), typeFirstDefinitions: !0, atoms: s('true false NULL nullptr'), dontIndentStatements: /^template$/, isIdentifierChar: /[\w\$_~\xa1-\uffff]/, isReservedIdentifier: w, hooks: {'#': y, '*': b, 'u': k, 'U': k, 'L': k, 'R': k, '0': x, '1': x, '2': x, '3': x, '4': x, '5': x, '6': x, '7': x, '8': x, '9': x, 'token': function(e, t, n) {
        if ('variable'==n&&'('==e.peek()&&(';'==t.prevToken||null==t.prevToken||'}'==t.prevToken)&&_(e.current())) return 'def';
      }}, namespaceSeparator: '::', modeProps: {fold: ['brace', 'include']}}), M('text/x-java', {name: 'clike', keywords: s('abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface'), types: s('byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void'), blockKeywords: s('catch class do else finally for if switch try while'), defKeywords: s('class interface enum @interface'), typeFirstDefinitions: !0, atoms: s('true false null'), number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i, hooks: {'@': function(e) {
        return !e.match('interface', !1)&&(e.eatWhile(/[\w\$_]/), 'meta');
      }}, modeProps: {fold: ['brace', 'import']}}), M('text/x-csharp', {name: 'clike', keywords: s('abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield'), types: s('Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong'), blockKeywords: s('catch class do else finally for foreach if struct switch try while'), defKeywords: s('class interface namespace struct var'), typeFirstDefinitions: !0, atoms: s('true false null'), hooks: {'@': function(e, t) {
        return e.eat('"')?(t.tokenize=S, S(e, t)):(e.eatWhile(/[\w\$_]/), 'meta');
      }}}), M('text/x-scala', {name: 'clike', keywords: s('abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble'), types: s('AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void'), multiLineStrings: !0, blockKeywords: s('catch class enum do else finally for forSome if match switch try while'), defKeywords: s('class enum def object package trait type val var'), atoms: s('true false null'), indentStatements: !1, indentSwitch: !1, isOperatorChar: /[+\-*&%=<>!?|\/#:@]/, hooks: {'@': function(e) {
        return e.eatWhile(/[\w\$_]/), 'meta';
      }, '"': function(e, t) {
        return !!e.match('""')&&(t.tokenize=T, t.tokenize(e, t));
      }, '\'': function(e) {
        return e.eatWhile(/[\w\$_\xa1-\uffff]/), 'atom';
      }, '=': function(e, n) {
        const r=n.context; return !('}'!=r.type||!r.align||!e.eat('>'))&&(n.context=new t(r.indented, r.column, r.type, r.info, null, r.prev), 'operator');
      }, '/': function(e, t) {
        return !!e.eat('*')&&(t.tokenize=O(1), t.tokenize(e, t));
      }}, modeProps: {closeBrackets: {pairs: '()[]{}""', triples: '"'}}}), M('text/x-kotlin', {name: 'clike', keywords: s('package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam'), types: s('Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit'), intendSwitch: !1, indentStatements: !1, multiLineStrings: !0, number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i, blockKeywords: s('catch class do else finally for if where try while enum'), defKeywords: s('class val var object interface fun'), atoms: s('true false null this'), hooks: {'@': function(e) {
        return e.eatWhile(/[\w\$_]/), 'meta';
      }, '*': function(e, t) {
        return '.'==t.prevToken?'variable':'operator';
      }, '"': function(e, t) {
        return t.tokenize=(n=e.match('""'), function(e, t) {
          for (var r, i=!1, o=!1; !e.eol();) {
            if (!n&&!i&&e.match('"')) {
              o=!0; break;
            } if (n&&e.match('"""')) {
              o=!0; break;
            }r=e.next(), !i&&'$'==r&&e.match('{')&&e.skipTo('}'), i=!i&&'\\'==r&&!n;
          } return !o&&n||(t.tokenize=null), 'string';
        }), t.tokenize(e, t); let n;
      }, '/': function(e, t) {
        return !!e.eat('*')&&(t.tokenize=O(1), t.tokenize(e, t));
      }, 'indent': function(e, t, n, r) {
        const i=n&&n.charAt(0); return '}'!=e.prevToken&&')'!=e.prevToken||''!=n?'operator'==e.prevToken&&'}'!=n&&'}'!=e.context.type||'variable'==e.prevToken&&'.'==i||('}'==e.prevToken||')'==e.prevToken)&&'.'==i?2*r+t.indented:t.align&&'}'==t.type?t.indented+(e.context.type==(n||'').charAt(0)?0:r):void 0:e.indented;
      }}, modeProps: {closeBrackets: {triples: '"'}}}), M(['x-shader/x-vertex', 'x-shader/x-fragment'], {name: 'clike', keywords: s('sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout'), types: s('float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4'), blockKeywords: s('for while do if else struct'), builtin: s('radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4'), atoms: s('true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers'), indentSwitch: !1, hooks: {'#': y}, modeProps: {fold: ['brace', 'include']}}), M('text/x-nesc', {name: 'clike', keywords: s(l+' as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends'), types: f, blockKeywords: s(g), atoms: s('null true false'), hooks: {'#': y}, modeProps: {fold: ['brace', 'include']}}), M('text/x-objectivec', {name: 'clike', keywords: s(l+' '+u), types: m, builtin: s(d), blockKeywords: s(g+' @synthesize @try @catch @finally @autoreleasepool @synchronized'), defKeywords: s(v+' @interface @implementation @protocol @class'), dontIndentStatements: /^@.*$/, typeFirstDefinitions: !0, atoms: s('YES NO NULL Nil nil true false nullptr'), isReservedIdentifier: w, hooks: {'#': y, '*': b}, modeProps: {fold: ['brace', 'include']}}), M('text/x-objectivec++', {name: 'clike', keywords: s(l+' '+u+' '+c), types: m, builtin: s(d), blockKeywords: s(g+' @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch'), defKeywords: s(v+' @interface @implementation @protocol @class class namespace'), dontIndentStatements: /^@.*$|^template$/, typeFirstDefinitions: !0, atoms: s('YES NO NULL Nil nil true false nullptr'), isReservedIdentifier: w, hooks: {'#': y, '*': b, 'u': k, 'U': k, 'L': k, 'R': k, '0': x, '1': x, '2': x, '3': x, '4': x, '5': x, '6': x, '7': x, '8': x, '9': x, 'token': function(e, t, n) {
        if ('variable'==n&&'('==e.peek()&&(';'==t.prevToken||null==t.prevToken||'}'==t.prevToken)&&_(e.current())) return 'def';
      }}, namespaceSeparator: '::', modeProps: {fold: ['brace', 'include']}}), M('text/x-squirrel', {name: 'clike', keywords: s('base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static'), types: f, blockKeywords: s('case catch class else for foreach if switch try while'), defKeywords: s('function local class'), typeFirstDefinitions: !0, atoms: s('true false null'), hooks: {'#': y}, modeProps: {fold: ['brace', 'include']}}); let D=null; function E(e) {
        return function(t, n) {
          for (var r, i=!1, o=!1; !t.eol();) {
            if (!i&&t.match('"')&&('single'==e||t.match('""'))) {
              o=!0; break;
            } if (!i&&t.match('``')) {
              D=E(e), o=!0; break;
            }r=t.next(), i='single'==e&&!i&&'\\'==r;
          } return o&&(n.tokenize=null), 'string';
        };
      }M('text/x-ceylon', {name: 'clike', keywords: s('abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while'), types: function(e) {
        const t=e.charAt(0); return t===t.toUpperCase()&&t!==t.toLowerCase();
      }, blockKeywords: s('case catch class dynamic else finally for function if interface module new object switch try while'), defKeywords: s('class dynamic function interface module object package value'), builtin: s('abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable'), isPunctuationChar: /[\[\]{}\(\),;\:\.`]/, isOperatorChar: /[+\-*&%=<>!?|^~:\/]/, numberStart: /[\d#$]/, number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i, multiLineStrings: !0, typeFirstDefinitions: !0, atoms: s('true false null larger smaller equal empty finished'), indentSwitch: !1, styleDefs: !1, hooks: {'@': function(e) {
        return e.eatWhile(/[\w\$_]/), 'meta';
      }, '"': function(e, t) {
        return t.tokenize=E(e.match('""')?'triple':'single'), t.tokenize(e, t);
      }, '`': function(e, t) {
        return !(!D||!e.match('`'))&&(t.tokenize=D, D=null, t.tokenize(e, t));
      }, '\'': function(e) {
        return e.eatWhile(/[\w\$_\xa1-\uffff]/), 'atom';
      }, 'token': function(e, t, n) {
        if (('variable'==n||'type'==n)&&'.'==t.prevToken) return 'variable-2';
      }}, modeProps: {fold: ['brace', 'import'], closeBrackets: {triples: '"'}}});
    }(n(631));
  }, 629: (e, t, n)=>{
    !function(e) {
      'use strict'; function t(e) {
        for (var t={}, n=0; n<e.length; ++n)t[e[n].toLowerCase()]=!0; return t;
      }e.defineMode('css', (function(t, n) {
        const r=n.inline; n.propertyKeywords||(n=e.resolveMode('text/css')); let i; let o; const s=t.indentUnit; const a=n.tokenHooks; const l=n.documentTypes||{}; const c=n.mediaTypes||{}; const u=n.mediaFeatures||{}; const d=n.mediaValueKeywords||{}; const h=n.propertyKeywords||{}; const p=n.nonStandardPropertyKeywords||{}; const f=n.fontProperties||{}; const m=n.counterDescriptors||{}; const g=n.colorKeywords||{}; const v=n.valueKeywords||{}; const y=n.allowNested; const b=n.lineComment; const w=!0===n.supportsAtComponent; const x=!1!==t.highlightNonStandardPropertyKeywords; function k(e, t) {
          return i=t, e;
        } function _(e, t) {
          const n=e.next(); if (a[n]) {
            const r=a[n](e, t); if (!1!==r) return r;
          } return '@'==n?(e.eatWhile(/[\w\\\-]/), k('def', e.current())):'='==n||('~'==n||'|'==n)&&e.eat('=')?k(null, 'compare'):'"'==n||'\''==n?(t.tokenize=S(n), t.tokenize(e, t)):'#'==n?(e.eatWhile(/[\w\\\-]/), k('atom', 'hash')):'!'==n?(e.match(/^\s*\w*/), k('keyword', 'important')):/\d/.test(n)||'.'==n&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/), k('number', 'unit')):'-'!==n?/[,+>*\/]/.test(n)?k(null, 'select-op'):'.'==n&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?k('qualifier', 'qualifier'):/[:;{}\[\]\(\)]/.test(n)?k(null, n):e.match(/[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/.test(e.current().toLowerCase())&&(t.tokenize=C), k('variable callee', 'variable')):/[\w\\\-]/.test(n)?(e.eatWhile(/[\w\\\-]/), k('property', 'word')):k(null, null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/), k('number', 'unit')):e.match(/^-[\w\\\-]*/)?(e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1)?k('variable-2', 'variable-definition'):k('variable-2', 'variable')):e.match(/^\w+-/)?k('meta', 'meta'):void 0;
        } function S(e) {
          return function(t, n) {
            for (var r, i=!1; null!=(r=t.next());) {
              if (r==e&&!i) {
                ')'==e&&t.backUp(1); break;
              }i=!i&&'\\'==r;
            } return (r==e||!i&&')'!=e)&&(n.tokenize=null), k('string', 'string');
          };
        } function C(e, t) {
          return e.next(), e.match(/\s*[\"\')]/, !1)?t.tokenize=null:t.tokenize=S(')'), k(null, '(');
        } function M(e, t, n) {
          this.type=e, this.indent=t, this.prev=n;
        } function T(e, t, n, r) {
          return e.context=new M(n, t.indentation()+(!1===r?0:s), e.context), n;
        } function O(e) {
          return e.context.prev&&(e.context=e.context.prev), e.context.type;
        } function D(e, t, n) {
          return A[n.context.type](e, t, n);
        } function E(e, t, n, r) {
          for (let i=r||1; i>0; i--)n.context=n.context.prev; return D(e, t, n);
        } function N(e) {
          const t=e.current().toLowerCase(); o=v.hasOwnProperty(t)?'atom':g.hasOwnProperty(t)?'keyword':'variable';
        } var A={top: function(e, t, n) {
          if ('{'==e) return T(n, t, 'block'); if ('}'==e&&n.context.prev) return O(n); if (w&&/@component/i.test(e)) return T(n, t, 'atComponentBlock'); if (/^@(-moz-)?document$/i.test(e)) return T(n, t, 'documentTypes'); if (/^@(media|supports|(-moz-)?document|import)$/i.test(e)) return T(n, t, 'atBlock'); if (/^@(font-face|counter-style)/i.test(e)) return n.stateArg=e, 'restricted_atBlock_before'; if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e)) return 'keyframes'; if (e&&'@'==e.charAt(0)) return T(n, t, 'at'); if ('hash'==e)o='builtin'; else if ('word'==e)o='tag'; else {
            if ('variable-definition'==e) return 'maybeprop'; if ('interpolation'==e) return T(n, t, 'interpolation'); if (':'==e) return 'pseudo'; if (y&&'('==e) return T(n, t, 'parens');
          } return n.context.type;
        }, block: function(e, t, n) {
          if ('word'==e) {
            const r=t.current().toLowerCase(); return h.hasOwnProperty(r)?(o='property', 'maybeprop'):p.hasOwnProperty(r)?(o=x?'string-2':'property', 'maybeprop'):y?(o=t.match(/^\s*:(?:\s|$)/, !1)?'property':'tag', 'block'):(o+=' error', 'maybeprop');
          } return 'meta'==e?'block':y||'hash'!=e&&'qualifier'!=e?A.top(e, t, n):(o='error', 'block');
        }, maybeprop: function(e, t, n) {
          return ':'==e?T(n, t, 'prop'):D(e, t, n);
        }, prop: function(e, t, n) {
          if (';'==e) return O(n); if ('{'==e&&y) return T(n, t, 'propBlock'); if ('}'==e||'{'==e) return E(e, t, n); if ('('==e) return T(n, t, 'parens'); if ('hash'!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
            if ('word'==e)N(t); else if ('interpolation'==e) return T(n, t, 'interpolation');
          } else o+=' error'; return 'prop';
        }, propBlock: function(e, t, n) {
          return '}'==e?O(n):'word'==e?(o='property', 'maybeprop'):n.context.type;
        }, parens: function(e, t, n) {
          return '{'==e||'}'==e?E(e, t, n):')'==e?O(n):'('==e?T(n, t, 'parens'):'interpolation'==e?T(n, t, 'interpolation'):('word'==e&&N(t), 'parens');
        }, pseudo: function(e, t, n) {
          return 'meta'==e?'pseudo':'word'==e?(o='variable-3', n.context.type):D(e, t, n);
        }, documentTypes: function(e, t, n) {
          return 'word'==e&&l.hasOwnProperty(t.current())?(o='tag', n.context.type):A.atBlock(e, t, n);
        }, atBlock: function(e, t, n) {
          if ('('==e) return T(n, t, 'atBlock_parens'); if ('}'==e||';'==e) return E(e, t, n); if ('{'==e) return O(n)&&T(n, t, y?'block':'top'); if ('interpolation'==e) return T(n, t, 'interpolation'); if ('word'==e) {
            const r=t.current().toLowerCase(); o='only'==r||'not'==r||'and'==r||'or'==r?'keyword':c.hasOwnProperty(r)?'attribute':u.hasOwnProperty(r)?'property':d.hasOwnProperty(r)?'keyword':h.hasOwnProperty(r)?'property':p.hasOwnProperty(r)?x?'string-2':'property':v.hasOwnProperty(r)?'atom':g.hasOwnProperty(r)?'keyword':'error';
          } return n.context.type;
        }, atComponentBlock: function(e, t, n) {
          return '}'==e?E(e, t, n):'{'==e?O(n)&&T(n, t, y?'block':'top', !1):('word'==e&&(o='error'), n.context.type);
        }, atBlock_parens: function(e, t, n) {
          return ')'==e?O(n):'{'==e||'}'==e?E(e, t, n, 2):A.atBlock(e, t, n);
        }, restricted_atBlock_before: function(e, t, n) {
          return '{'==e?T(n, t, 'restricted_atBlock'):'word'==e&&'@counter-style'==n.stateArg?(o='variable', 'restricted_atBlock_before'):D(e, t, n);
        }, restricted_atBlock: function(e, t, n) {
          return '}'==e?(n.stateArg=null, O(n)):'word'==e?(o='@font-face'==n.stateArg&&!f.hasOwnProperty(t.current().toLowerCase())||'@counter-style'==n.stateArg&&!m.hasOwnProperty(t.current().toLowerCase())?'error':'property', 'maybeprop'):'restricted_atBlock';
        }, keyframes: function(e, t, n) {
          return 'word'==e?(o='variable', 'keyframes'):'{'==e?T(n, t, 'top'):D(e, t, n);
        }, at: function(e, t, n) {
          return ';'==e?O(n):'{'==e||'}'==e?E(e, t, n):('word'==e?o='tag':'hash'==e&&(o='builtin'), 'at');
        }, interpolation: function(e, t, n) {
          return '}'==e?O(n):'{'==e||';'==e?E(e, t, n):('word'==e?o='variable':'variable'!=e&&'('!=e&&')'!=e&&(o='error'), 'interpolation');
        }}; return {startState: function(e) {
          return {tokenize: null, state: r?'block':'top', stateArg: null, context: new M(r?'block':'top', e||0, null)};
        }, token: function(e, t) {
          if (!t.tokenize&&e.eatSpace()) return null; let n=(t.tokenize||_)(e, t); return n&&'object'==typeof n&&(i=n[1], n=n[0]), o=n, 'comment'!=i&&(t.state=A[t.state](i, e, t)), o;
        }, indent: function(e, t) {
          let n=e.context; const r=t&&t.charAt(0); let i=n.indent; return 'prop'!=n.type||'}'!=r&&')'!=r||(n=n.prev), n.prev&&('}'!=r||'block'!=n.type&&'top'!=n.type&&'interpolation'!=n.type&&'restricted_atBlock'!=n.type?(')'!=r||'parens'!=n.type&&'atBlock_parens'!=n.type)&&('{'!=r||'at'!=n.type&&'atBlock'!=n.type)||(i=Math.max(0, n.indent-s)):i=(n=n.prev).indent), i;
        }, electricChars: '}', blockCommentStart: '/*', blockCommentEnd: '*/', blockCommentContinue: ' * ', lineComment: b, fold: 'brace'};
      })); const n=['domain', 'regexp', 'url', 'url-prefix']; const r=t(n); const i=['all', 'aural', 'braille', 'handheld', 'print', 'projection', 'screen', 'tty', 'tv', 'embossed']; const o=t(i); const s=['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'device-width', 'min-device-width', 'max-device-width', 'device-height', 'min-device-height', 'max-device-height', 'aspect-ratio', 'min-aspect-ratio', 'max-aspect-ratio', 'device-aspect-ratio', 'min-device-aspect-ratio', 'max-device-aspect-ratio', 'color', 'min-color', 'max-color', 'color-index', 'min-color-index', 'max-color-index', 'monochrome', 'min-monochrome', 'max-monochrome', 'resolution', 'min-resolution', 'max-resolution', 'scan', 'grid', 'orientation', 'device-pixel-ratio', 'min-device-pixel-ratio', 'max-device-pixel-ratio', 'pointer', 'any-pointer', 'hover', 'any-hover', 'prefers-color-scheme']; const a=t(s); const l=['landscape', 'portrait', 'none', 'coarse', 'fine', 'on-demand', 'hover', 'interlace', 'progressive', 'dark', 'light']; const c=t(l); const u=['align-content', 'align-items', 'align-self', 'alignment-adjust', 'alignment-baseline', 'all', 'anchor-point', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'azimuth', 'backdrop-filter', 'backface-visibility', 'background', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-position-x', 'background-position-y', 'background-repeat', 'background-size', 'baseline-shift', 'binding', 'bleed', 'block-size', 'bookmark-label', 'bookmark-level', 'bookmark-state', 'bookmark-target', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'color', 'color-profile', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'contain', 'content', 'counter-increment', 'counter-reset', 'crop', 'cue', 'cue-after', 'cue-before', 'cursor', 'direction', 'display', 'dominant-baseline', 'drop-initial-after-adjust', 'drop-initial-after-align', 'drop-initial-before-adjust', 'drop-initial-before-align', 'drop-initial-size', 'drop-initial-value', 'elevation', 'empty-cells', 'fit', 'fit-position', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'float-offset', 'flow-from', 'flow-into', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-optical-sizing', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-variation-settings', 'font-weight', 'gap', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-gap', 'grid-row', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'hanging-punctuation', 'height', 'hyphens', 'icon', 'image-orientation', 'image-rendering', 'image-resolution', 'inline-box-align', 'inset', 'inset-block', 'inset-block-end', 'inset-block-start', 'inset-inline', 'inset-inline-end', 'inset-inline-start', 'isolation', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'line-break', 'line-height', 'line-height-step', 'line-stacking', 'line-stacking-ruby', 'line-stacking-shift', 'line-stacking-strategy', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'marks', 'marquee-direction', 'marquee-loop', 'marquee-play-count', 'marquee-speed', 'marquee-style', 'mask-clip', 'mask-composite', 'mask-image', 'mask-mode', 'mask-origin', 'mask-position', 'mask-repeat', 'mask-size', 'mask-type', 'max-block-size', 'max-height', 'max-inline-size', 'max-width', 'min-block-size', 'min-height', 'min-inline-size', 'min-width', 'mix-blend-mode', 'move-to', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'object-fit', 'object-position', 'offset', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-position', 'offset-rotate', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-style', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page', 'page-break-after', 'page-break-before', 'page-break-inside', 'page-policy', 'pause', 'pause-after', 'pause-before', 'perspective', 'perspective-origin', 'pitch', 'pitch-range', 'place-content', 'place-items', 'place-self', 'play-during', 'position', 'presentation-level', 'punctuation-trim', 'quotes', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-fragment', 'rendering-intent', 'resize', 'rest', 'rest-after', 'rest-before', 'richness', 'right', 'rotate', 'rotation', 'rotation-point', 'row-gap', 'ruby-align', 'ruby-overhang', 'ruby-position', 'ruby-span', 'scale', 'scroll-behavior', 'scroll-margin', 'scroll-margin-block', 'scroll-margin-block-end', 'scroll-margin-block-start', 'scroll-margin-bottom', 'scroll-margin-inline', 'scroll-margin-inline-end', 'scroll-margin-inline-start', 'scroll-margin-left', 'scroll-margin-right', 'scroll-margin-top', 'scroll-padding', 'scroll-padding-block', 'scroll-padding-block-end', 'scroll-padding-block-start', 'scroll-padding-bottom', 'scroll-padding-inline', 'scroll-padding-inline-end', 'scroll-padding-inline-start', 'scroll-padding-left', 'scroll-padding-right', 'scroll-padding-top', 'scroll-snap-align', 'scroll-snap-type', 'shape-image-threshold', 'shape-inside', 'shape-margin', 'shape-outside', 'size', 'speak', 'speak-as', 'speak-header', 'speak-numeral', 'speak-punctuation', 'speech-rate', 'stress', 'string-set', 'tab-size', 'table-layout', 'target', 'target-name', 'target-new', 'target-position', 'text-align', 'text-align-last', 'text-combine-upright', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-skip-ink', 'text-decoration-style', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-height', 'text-indent', 'text-justify', 'text-orientation', 'text-outline', 'text-overflow', 'text-rendering', 'text-shadow', 'text-size-adjust', 'text-space-collapse', 'text-transform', 'text-underline-position', 'text-wrap', 'top', 'touch-action', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'translate', 'unicode-bidi', 'user-select', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'volume', 'white-space', 'widows', 'width', 'will-change', 'word-break', 'word-spacing', 'word-wrap', 'writing-mode', 'z-index', 'clip-path', 'clip-rule', 'mask', 'enable-background', 'filter', 'flood-color', 'flood-opacity', 'lighting-color', 'stop-color', 'stop-opacity', 'pointer-events', 'color-interpolation', 'color-interpolation-filters', 'color-rendering', 'fill', 'fill-opacity', 'fill-rule', 'image-rendering', 'marker', 'marker-end', 'marker-mid', 'marker-start', 'paint-order', 'shape-rendering', 'stroke', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-rendering', 'baseline-shift', 'dominant-baseline', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'text-anchor', 'writing-mode']; const d=t(u); const h=['border-block', 'border-block-color', 'border-block-end', 'border-block-end-color', 'border-block-end-style', 'border-block-end-width', 'border-block-start', 'border-block-start-color', 'border-block-start-style', 'border-block-start-width', 'border-block-style', 'border-block-width', 'border-inline', 'border-inline-color', 'border-inline-end', 'border-inline-end-color', 'border-inline-end-style', 'border-inline-end-width', 'border-inline-start', 'border-inline-start-color', 'border-inline-start-style', 'border-inline-start-width', 'border-inline-style', 'border-inline-width', 'margin-block', 'margin-block-end', 'margin-block-start', 'margin-inline', 'margin-inline-end', 'margin-inline-start', 'padding-block', 'padding-block-end', 'padding-block-start', 'padding-inline', 'padding-inline-end', 'padding-inline-start', 'scroll-snap-stop', 'scrollbar-3d-light-color', 'scrollbar-arrow-color', 'scrollbar-base-color', 'scrollbar-dark-shadow-color', 'scrollbar-face-color', 'scrollbar-highlight-color', 'scrollbar-shadow-color', 'scrollbar-track-color', 'searchfield-cancel-button', 'searchfield-decoration', 'searchfield-results-button', 'searchfield-results-decoration', 'shape-inside', 'zoom']; const p=t(h); const f=t(['font-display', 'font-family', 'src', 'unicode-range', 'font-variant', 'font-feature-settings', 'font-stretch', 'font-weight', 'font-style']); const m=t(['additive-symbols', 'fallback', 'negative', 'pad', 'prefix', 'range', 'speak-as', 'suffix', 'symbols', 'system']); const g=['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']; const v=t(g); const y=['above', 'absolute', 'activeborder', 'additive', 'activecaption', 'afar', 'after-white-space', 'ahead', 'alias', 'all', 'all-scroll', 'alphabetic', 'alternate', 'always', 'amharic', 'amharic-abegede', 'antialiased', 'appworkspace', 'arabic-indic', 'armenian', 'asterisks', 'attr', 'auto', 'auto-flow', 'avoid', 'avoid-column', 'avoid-page', 'avoid-region', 'axis-pan', 'background', 'backwards', 'baseline', 'below', 'bidi-override', 'binary', 'bengali', 'blink', 'block', 'block-axis', 'bold', 'bolder', 'border', 'border-box', 'both', 'bottom', 'break', 'break-all', 'break-word', 'bullets', 'button', 'button-bevel', 'buttonface', 'buttonhighlight', 'buttonshadow', 'buttontext', 'calc', 'cambodian', 'capitalize', 'caps-lock-indicator', 'caption', 'captiontext', 'caret', 'cell', 'center', 'checkbox', 'circle', 'cjk-decimal', 'cjk-earthly-branch', 'cjk-heavenly-stem', 'cjk-ideographic', 'clear', 'clip', 'close-quote', 'col-resize', 'collapse', 'color', 'color-burn', 'color-dodge', 'column', 'column-reverse', 'compact', 'condensed', 'contain', 'content', 'contents', 'content-box', 'context-menu', 'continuous', 'copy', 'counter', 'counters', 'cover', 'crop', 'cross', 'crosshair', 'currentcolor', 'cursive', 'cyclic', 'darken', 'dashed', 'decimal', 'decimal-leading-zero', 'default', 'default-button', 'dense', 'destination-atop', 'destination-in', 'destination-out', 'destination-over', 'devanagari', 'difference', 'disc', 'discard', 'disclosure-closed', 'disclosure-open', 'document', 'dot-dash', 'dot-dot-dash', 'dotted', 'double', 'down', 'e-resize', 'ease', 'ease-in', 'ease-in-out', 'ease-out', 'element', 'ellipse', 'ellipsis', 'embed', 'end', 'ethiopic', 'ethiopic-abegede', 'ethiopic-abegede-am-et', 'ethiopic-abegede-gez', 'ethiopic-abegede-ti-er', 'ethiopic-abegede-ti-et', 'ethiopic-halehame-aa-er', 'ethiopic-halehame-aa-et', 'ethiopic-halehame-am-et', 'ethiopic-halehame-gez', 'ethiopic-halehame-om-et', 'ethiopic-halehame-sid-et', 'ethiopic-halehame-so-et', 'ethiopic-halehame-ti-er', 'ethiopic-halehame-ti-et', 'ethiopic-halehame-tig', 'ethiopic-numeric', 'ew-resize', 'exclusion', 'expanded', 'extends', 'extra-condensed', 'extra-expanded', 'fantasy', 'fast', 'fill', 'fill-box', 'fixed', 'flat', 'flex', 'flex-end', 'flex-start', 'footnotes', 'forwards', 'from', 'geometricPrecision', 'georgian', 'graytext', 'grid', 'groove', 'gujarati', 'gurmukhi', 'hand', 'hangul', 'hangul-consonant', 'hard-light', 'hebrew', 'help', 'hidden', 'hide', 'higher', 'highlight', 'highlighttext', 'hiragana', 'hiragana-iroha', 'horizontal', 'hsl', 'hsla', 'hue', 'icon', 'ignore', 'inactiveborder', 'inactivecaption', 'inactivecaptiontext', 'infinite', 'infobackground', 'infotext', 'inherit', 'initial', 'inline', 'inline-axis', 'inline-block', 'inline-flex', 'inline-grid', 'inline-table', 'inset', 'inside', 'intrinsic', 'invert', 'italic', 'japanese-formal', 'japanese-informal', 'justify', 'kannada', 'katakana', 'katakana-iroha', 'keep-all', 'khmer', 'korean-hangul-formal', 'korean-hanja-formal', 'korean-hanja-informal', 'landscape', 'lao', 'large', 'larger', 'left', 'level', 'lighter', 'lighten', 'line-through', 'linear', 'linear-gradient', 'lines', 'list-item', 'listbox', 'listitem', 'local', 'logical', 'loud', 'lower', 'lower-alpha', 'lower-armenian', 'lower-greek', 'lower-hexadecimal', 'lower-latin', 'lower-norwegian', 'lower-roman', 'lowercase', 'ltr', 'luminosity', 'malayalam', 'manipulation', 'match', 'matrix', 'matrix3d', 'media-controls-background', 'media-current-time-display', 'media-fullscreen-button', 'media-mute-button', 'media-play-button', 'media-return-to-realtime-button', 'media-rewind-button', 'media-seek-back-button', 'media-seek-forward-button', 'media-slider', 'media-sliderthumb', 'media-time-remaining-display', 'media-volume-slider', 'media-volume-slider-container', 'media-volume-sliderthumb', 'medium', 'menu', 'menulist', 'menulist-button', 'menulist-text', 'menulist-textfield', 'menutext', 'message-box', 'middle', 'min-intrinsic', 'mix', 'mongolian', 'monospace', 'move', 'multiple', 'multiple_mask_images', 'multiply', 'myanmar', 'n-resize', 'narrower', 'ne-resize', 'nesw-resize', 'no-close-quote', 'no-drop', 'no-open-quote', 'no-repeat', 'none', 'normal', 'not-allowed', 'nowrap', 'ns-resize', 'numbers', 'numeric', 'nw-resize', 'nwse-resize', 'oblique', 'octal', 'opacity', 'open-quote', 'optimizeLegibility', 'optimizeSpeed', 'oriya', 'oromo', 'outset', 'outside', 'outside-shape', 'overlay', 'overline', 'padding', 'padding-box', 'painted', 'page', 'paused', 'persian', 'perspective', 'pinch-zoom', 'plus-darker', 'plus-lighter', 'pointer', 'polygon', 'portrait', 'pre', 'pre-line', 'pre-wrap', 'preserve-3d', 'progress', 'push-button', 'radial-gradient', 'radio', 'read-only', 'read-write', 'read-write-plaintext-only', 'rectangle', 'region', 'relative', 'repeat', 'repeating-linear-gradient', 'repeating-radial-gradient', 'repeat-x', 'repeat-y', 'reset', 'reverse', 'rgb', 'rgba', 'ridge', 'right', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'round', 'row', 'row-resize', 'row-reverse', 'rtl', 'run-in', 'running', 's-resize', 'sans-serif', 'saturation', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'screen', 'scroll', 'scrollbar', 'scroll-position', 'se-resize', 'searchfield', 'searchfield-cancel-button', 'searchfield-decoration', 'searchfield-results-button', 'searchfield-results-decoration', 'self-start', 'self-end', 'semi-condensed', 'semi-expanded', 'separate', 'serif', 'show', 'sidama', 'simp-chinese-formal', 'simp-chinese-informal', 'single', 'skew', 'skewX', 'skewY', 'skip-white-space', 'slide', 'slider-horizontal', 'slider-vertical', 'sliderthumb-horizontal', 'sliderthumb-vertical', 'slow', 'small', 'small-caps', 'small-caption', 'smaller', 'soft-light', 'solid', 'somali', 'source-atop', 'source-in', 'source-out', 'source-over', 'space', 'space-around', 'space-between', 'space-evenly', 'spell-out', 'square', 'square-button', 'start', 'static', 'status-bar', 'stretch', 'stroke', 'stroke-box', 'sub', 'subpixel-antialiased', 'svg_masks', 'super', 'sw-resize', 'symbolic', 'symbols', 'system-ui', 'table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group', 'tamil', 'telugu', 'text', 'text-bottom', 'text-top', 'textarea', 'textfield', 'thai', 'thick', 'thin', 'threeddarkshadow', 'threedface', 'threedhighlight', 'threedlightshadow', 'threedshadow', 'tibetan', 'tigre', 'tigrinya-er', 'tigrinya-er-abegede', 'tigrinya-et', 'tigrinya-et-abegede', 'to', 'top', 'trad-chinese-formal', 'trad-chinese-informal', 'transform', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'transparent', 'ultra-condensed', 'ultra-expanded', 'underline', 'unidirectional-pan', 'unset', 'up', 'upper-alpha', 'upper-armenian', 'upper-greek', 'upper-hexadecimal', 'upper-latin', 'upper-norwegian', 'upper-roman', 'uppercase', 'urdu', 'url', 'var', 'vertical', 'vertical-text', 'view-box', 'visible', 'visibleFill', 'visiblePainted', 'visibleStroke', 'visual', 'w-resize', 'wait', 'wave', 'wider', 'window', 'windowframe', 'windowtext', 'words', 'wrap', 'wrap-reverse', 'x-large', 'x-small', 'xor', 'xx-large', 'xx-small']; const b=t(y); const w=n.concat(i).concat(s).concat(l).concat(u).concat(h).concat(g).concat(y); function x(e, t) {
        for (var n, r=!1; null!=(n=e.next());) {
          if (r&&'/'==n) {
            t.tokenize=null; break;
          }r='*'==n;
        } return ['comment', 'comment'];
      }e.registerHelper('hintWords', 'css', w), e.defineMIME('text/css', {documentTypes: r, mediaTypes: o, mediaFeatures: a, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: p, fontProperties: f, counterDescriptors: m, colorKeywords: v, valueKeywords: b, tokenHooks: {'/': function(e, t) {
        return !!e.eat('*')&&(t.tokenize=x, x(e, t));
      }}, name: 'css'}), e.defineMIME('text/x-scss', {mediaTypes: o, mediaFeatures: a, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: p, colorKeywords: v, valueKeywords: b, fontProperties: f, allowNested: !0, lineComment: '//', tokenHooks: {'/': function(e, t) {
        return e.eat('/')?(e.skipToEnd(), ['comment', 'comment']):e.eat('*')?(t.tokenize=x, x(e, t)):['operator', 'operator'];
      }, ':': function(e) {
        return !!e.match(/\s*\{/, !1)&&[null, null];
      }, '$': function(e) {
        return e.match(/^[\w-]+/), e.match(/^\s*:/, !1)?['variable-2', 'variable-definition']:['variable-2', 'variable'];
      }, '#': function(e) {
        return !!e.eat('{')&&[null, 'interpolation'];
      }}, name: 'css', helperType: 'scss'}), e.defineMIME('text/x-less', {mediaTypes: o, mediaFeatures: a, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: p, colorKeywords: v, valueKeywords: b, fontProperties: f, allowNested: !0, lineComment: '//', tokenHooks: {'/': function(e, t) {
        return e.eat('/')?(e.skipToEnd(), ['comment', 'comment']):e.eat('*')?(t.tokenize=x, x(e, t)):['operator', 'operator'];
      }, '@': function(e) {
        return e.eat('{')?[null, 'interpolation']:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1)&&(e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1)?['variable-2', 'variable-definition']:['variable-2', 'variable']);
      }, '&': function() {
        return ['atom', 'atom'];
      }}, name: 'css', helperType: 'less'}), e.defineMIME('text/x-gss', {documentTypes: r, mediaTypes: o, mediaFeatures: a, propertyKeywords: d, nonStandardPropertyKeywords: p, fontProperties: f, counterDescriptors: m, colorKeywords: v, valueKeywords: b, supportsAtComponent: !0, tokenHooks: {'/': function(e, t) {
        return !!e.eat('*')&&(t.tokenize=x, x(e, t));
      }}, name: 'css', helperType: 'gss'});
    }(n(631));
  }, 258: (e, t, n)=>{
    !function(e) {
      'use strict'; const t='from'; const n=new RegExp('^(\\s*)\\b('+t+')\\b', 'i'); const r=['run', 'cmd', 'entrypoint', 'shell']; const i=new RegExp('^(\\s*)('+r.join('|')+')(\\s+\\[)', 'i'); const o='expose'; const s=new RegExp('^(\\s*)('+o+')(\\s+)', 'i'); const a='('+[t, o].concat(r).concat(['arg', 'from', 'maintainer', 'label', 'env', 'add', 'copy', 'volume', 'user', 'workdir', 'onbuild', 'stopsignal', 'healthcheck', 'shell']).join('|')+')'; const l=new RegExp('^(\\s*)'+a+'(\\s*)(#.*)?$', 'i'); const c=new RegExp('^(\\s*)'+a+'(\\s+)', 'i'); e.defineSimpleMode('dockerfile', {start: [{regex: /^\s*#.*$/, sol: !0, token: 'comment'}, {regex: n, token: [null, 'keyword'], sol: !0, next: 'from'}, {regex: l, token: [null, 'keyword', null, 'error'], sol: !0}, {regex: i, token: [null, 'keyword', null], sol: !0, next: 'array'}, {regex: s, token: [null, 'keyword', null], sol: !0, next: 'expose'}, {regex: c, token: [null, 'keyword', null], sol: !0, next: 'arguments'}, {regex: /./, token: null}], from: [{regex: /\s*$/, token: null, next: 'start'}, {regex: /(\s*)(#.*)$/, token: [null, 'error'], next: 'start'}, {regex: /(\s*\S+\s+)(as)/i, token: [null, 'keyword'], next: 'start'}, {token: null, next: 'start'}], single: [{regex: /(?:[^\\']|\\.)/, token: 'string'}, {regex: /'/, token: 'string', pop: !0}], double: [{regex: /(?:[^\\"]|\\.)/, token: 'string'}, {regex: /"/, token: 'string', pop: !0}], array: [{regex: /\]/, token: null, next: 'start'}, {regex: /"(?:[^\\"]|\\.)*"?/, token: 'string'}], expose: [{regex: /\d+$/, token: 'number', next: 'start'}, {regex: /[^\d]+$/, token: null, next: 'start'}, {regex: /\d+/, token: 'number'}, {regex: /[^\d]+/, token: null}, {token: null, next: 'start'}], arguments: [{regex: /^\s*#.*$/, sol: !0, token: 'comment'}, {regex: /"(?:[^\\"]|\\.)*"?$/, token: 'string', next: 'start'}, {regex: /"/, token: 'string', push: 'double'}, {regex: /'(?:[^\\']|\\.)*'?$/, token: 'string', next: 'start'}, {regex: /'/, token: 'string', push: 'single'}, {regex: /[^#"']+[\\`]$/, token: null}, {regex: /[^#"']+$/, token: null, next: 'start'}, {regex: /[^#"']+/, token: null}, {token: null, next: 'start'}], meta: {lineComment: '#'}}), e.defineMIME('text/x-dockerfile', 'dockerfile');
    }(n(631), n(790));
  }, 425: (e, t, n)=>{
    !function(e) {
      'use strict'; const t=/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i; e.defineMode('gfm', (function(n, r) {
        let i=0; const o={startState: function() {
          return {code: !1, codeBlock: !1, ateSpace: !1};
        }, copyState: function(e) {
          return {code: e.code, codeBlock: e.codeBlock, ateSpace: e.ateSpace};
        }, token: function(e, n) {
          if (n.combineTokens=null, n.codeBlock) return e.match(/^```+/)?(n.codeBlock=!1, null):(e.skipToEnd(), null); if (e.sol()&&(n.code=!1), e.sol()&&e.match(/^```+/)) return e.skipToEnd(), n.codeBlock=!0, null; if ('`'===e.peek()) {
            e.next(); const o=e.pos; e.eatWhile('`'); const s=1+e.pos-o; return n.code?s===i&&(n.code=!1):(i=s, n.code=!0), null;
          } if (n.code) return e.next(), null; if (e.eatSpace()) return n.ateSpace=!0, null; if ((e.sol()||n.ateSpace)&&(n.ateSpace=!1, !1!==r.gitHubSpice)) {
            if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/)) return n.combineTokens=!0, 'link'; if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return n.combineTokens=!0, 'link';
          } return e.match(t)&&']('!=e.string.slice(e.start-2, e.start)&&(0==e.start||/\W/.test(e.string.charAt(e.start-1)))?(n.combineTokens=!0, 'link'):(e.next(), null);
        }, blankLine: function(e) {
          return e.code=!1, null;
        }}; const s={taskLists: !0, strikethrough: !0, emoji: !0}; for (const a in r)s[a]=r[a]; return s.name='markdown', e.overlayMode(e.getMode(n, s), o);
      }), 'markdown'), e.defineMIME('text/x-gfm', 'gfm');
    }(n(631), n(47), n(146));
  }, 531: (e, t, n)=>{
    !function(e) {
      'use strict'; const t={script: [['lang', /(javascript|babel)/i, 'javascript'], ['type', /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, 'javascript'], ['type', /./, 'text/plain'], [null, null, 'javascript']], style: [['lang', /^css$/i, 'css'], ['type', /^(text\/)?(x-)?(stylesheet|css)$/i, 'css'], ['type', /./, 'text/plain'], [null, null, 'css']]}; const n={}; function r(e, t) {
        const r=e.match(function(e) {
          return n[e]||(n[e]=new RegExp('\\s+'+e+'\\s*=\\s*(\'|")?([^\'"]+)(\'|")?\\s*'));
        }(t)); return r?/^\s*(.*?)\s*$/.exec(r[2])[1]:'';
      } function i(e, t) {
        return new RegExp((t?'^':'')+'</s*'+e+'s*>', 'i');
      } function o(e, t) {
        for (const n in e) for (let r=t[n]||(t[n]=[]), i=e[n], o=i.length-1; o>=0; o--)r.unshift(i[o]);
      }e.defineMode('htmlmixed', (function(n, s) {
        const a=e.getMode(n, {name: 'xml', htmlMode: !0, multilineTagIndentFactor: s.multilineTagIndentFactor, multilineTagIndentPastTag: s.multilineTagIndentPastTag, allowMissingTagName: s.allowMissingTagName}); const l={}; const c=s&&s.tags; const u=s&&s.scriptTypes; if (o(t, l), c&&o(c, l), u) for (let d=u.length-1; d>=0; d--)l.script.unshift(['type', u[d].matches, u[d].mode]); function h(t, o) {
          let s; const c=a.token(t, o.htmlState); const u=/\btag\b/.test(c); if (u&&!/[<>\s\/]/.test(t.current())&&(s=o.htmlState.tagName&&o.htmlState.tagName.toLowerCase())&&l.hasOwnProperty(s))o.inTag=s+' '; else if (o.inTag&&u&&/>$/.test(t.current())) {
            const d=/^([\S]+) (.*)/.exec(o.inTag); o.inTag=null; const p='>'==t.current()&&function(e, t) {
              for (let n=0; n<e.length; n++) {
                const i=e[n]; if (!i[0]||i[1].test(r(t, i[0]))) return i[2];
              }
            }(l[d[1]], d[2]); const f=e.getMode(n, p); const m=i(d[1], !0); const g=i(d[1], !1); o.token=function(e, t) {
              return e.match(m, !1)?(t.token=h, t.localState=t.localMode=null, null):function(e, t, n) {
                const r=e.current(); const i=r.search(t); return i>-1?e.backUp(r.length-i):r.match(/<\/?$/)&&(e.backUp(r.length), e.match(t, !1)||e.match(r)), n;
              }(e, g, t.localMode.token(e, t.localState));
            }, o.localMode=f, o.localState=e.startState(f, a.indent(o.htmlState, '', ''));
          } else o.inTag&&(o.inTag+=t.current(), t.eol()&&(o.inTag+=' ')); return c;
        } return {startState: function() {
          return {token: h, inTag: null, localMode: null, localState: null, htmlState: e.startState(a)};
        }, copyState: function(t) {
          let n; return t.localState&&(n=e.copyState(t.localMode, t.localState)), {token: t.token, inTag: t.inTag, localMode: t.localMode, localState: n, htmlState: e.copyState(a, t.htmlState)};
        }, token: function(e, t) {
          return t.token(e, t);
        }, indent: function(t, n, r) {
          return !t.localMode||/^\s*<\//.test(n)?a.indent(t.htmlState, n, r):t.localMode.indent?t.localMode.indent(t.localState, n, r):e.Pass;
        }, innerMode: function(e) {
          return {state: e.localState||e.htmlState, mode: e.localMode||a};
        }};
      }), 'xml', 'javascript', 'css'), e.defineMIME('text/html', 'htmlmixed');
    }(n(631), n(589), n(876), n(629));
  }, 411: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('http', (function() {
        function e(e, t) {
          return e.skipToEnd(), t.cur=s, 'error';
        } function t(t, r) {
          return t.match(/^HTTP\/\d\.\d/)?(r.cur=n, 'keyword'):t.match(/^[A-Z]+/)&&/[ \t]/.test(t.peek())?(r.cur=i, 'keyword'):e(t, r);
        } function n(t, n) {
          const i=t.match(/^\d+/); if (!i) return e(t, n); n.cur=r; const o=Number(i[0]); return o>=100&&o<200?'positive informational':o>=200&&o<300?'positive success':o>=300&&o<400?'positive redirect':o>=400&&o<500?'negative client-error':o>=500&&o<600?'negative server-error':'error';
        } function r(e, t) {
          return e.skipToEnd(), t.cur=s, null;
        } function i(e, t) {
          return e.eatWhile(/\S/), t.cur=o, 'string-2';
        } function o(t, n) {
          return t.match(/^HTTP\/\d\.\d$/)?(n.cur=s, 'keyword'):e(t, n);
        } function s(e) {
          return e.sol()&&!e.eat(/[ \t]/)?e.match(/^.*?:/)?'atom':(e.skipToEnd(), 'error'):(e.skipToEnd(), 'string');
        } function a(e) {
          return e.skipToEnd(), null;
        } return {token: function(e, t) {
          const n=t.cur; return n!=s&&n!=a&&e.eatSpace()?null:n(e, t);
        }, blankLine: function(e) {
          e.cur=a;
        }, startState: function() {
          return {cur: t};
        }};
      })), e.defineMIME('message/http', 'http');
    }(n(631));
  }, 876: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('javascript', (function(t, n) {
        let r; let i; const o=t.indentUnit; const s=n.statementIndent; const a=n.jsonld; const l=n.json||a; const c=n.typescript; const u=n.wordCharacters||/[\w$\xa1-\uffff]/; const d=function() {
          function e(e) {
            return {type: e, style: 'keyword'};
          } const t=e('keyword a'); const n=e('keyword b'); const r=e('keyword c'); const i=e('keyword d'); const o=e('operator'); const s={type: 'atom', style: 'atom'}; return {if: e('if'), while: t, with: t, else: n, do: n, try: n, finally: n, return: i, break: i, continue: i, new: e('new'), delete: r, void: r, throw: r, debugger: e('debugger'), var: e('var'), const: e('var'), let: e('var'), function: e('function'), catch: e('catch'), for: e('for'), switch: e('switch'), case: e('case'), default: e('default'), in: o, typeof: o, instanceof: o, true: s, false: s, null: s, undefined: s, NaN: s, Infinity: s, this: e('this'), class: e('class'), super: e('atom'), yield: r, export: e('export'), import: e('import'), extends: r, await: r};
        }(); const h=/[+\-*&%=<>!?|~^@]/; const p=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/; function f(e, t, n) {
          return r=e, i=n, t;
        } function m(e, t) {
          let n; const r=e.next(); if ('"'==r||'\''==r) {
            return t.tokenize=(n=r, function(e, t) {
              let r; let i=!1; if (a&&'@'==e.peek()&&e.match(p)) return t.tokenize=m, f('jsonld-keyword', 'meta'); for (;null!=(r=e.next())&&(r!=n||i);)i=!i&&'\\'==r; return i||(t.tokenize=m), f('string', 'string');
            }), t.tokenize(e, t);
          } if ('.'==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return f('number', 'number'); if ('.'==r&&e.match('..')) return f('spread', 'meta'); if (/[\[\]{}\(\),;\:\.]/.test(r)) return f(r); if ('='==r&&e.eat('>')) return f('=>', 'operator'); if ('0'==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return f('number', 'number'); if (/\d/.test(r)) return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), f('number', 'number'); if ('/'==r) {
            return e.eat('*')?(t.tokenize=g, g(e, t)):e.eat('/')?(e.skipToEnd(), f('comment', 'comment')):Je(e, t, 1)?(function(e) {
              for (var t, n=!1, r=!1; null!=(t=e.next());) {
                if (!n) {
                  if ('/'==t&&!r) return; '['==t?r=!0:r&&']'==t&&(r=!1);
                }n=!n&&'\\'==t;
              }
            }(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), f('regexp', 'string-2')):(e.eat('='), f('operator', 'operator', e.current()));
          } if ('`'==r) return t.tokenize=v, v(e, t); if ('#'==r&&'!'==e.peek()) return e.skipToEnd(), f('meta', 'meta'); if ('#'==r&&e.eatWhile(u)) return f('variable', 'property'); if ('<'==r&&e.match('!--')||'-'==r&&e.match('->')&&!/\S/.test(e.string.slice(0, e.start))) return e.skipToEnd(), f('comment', 'comment'); if (h.test(r)) return '>'==r&&t.lexical&&'>'==t.lexical.type||(e.eat('=')?'!'!=r&&'='!=r||e.eat('='):/[<>*+\-|&?]/.test(r)&&(e.eat(r), '>'==r&&e.eat(r))), '?'==r&&e.eat('.')?f('.'):f('operator', 'operator', e.current()); if (u.test(r)) {
            e.eatWhile(u); const i=e.current(); if ('.'!=t.lastType) {
              if (d.propertyIsEnumerable(i)) {
                const o=d[i]; return f(o.type, o.style, i);
              } if ('async'==i&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1)) return f('async', 'keyword', i);
            } return f('variable', 'variable', i);
          }
        } function g(e, t) {
          for (var n, r=!1; n=e.next();) {
            if ('/'==n&&r) {
              t.tokenize=m; break;
            }r='*'==n;
          } return f('comment', 'comment');
        } function v(e, t) {
          for (var n, r=!1; null!=(n=e.next());) {
            if (!r&&('`'==n||'$'==n&&e.eat('{'))) {
              t.tokenize=m; break;
            }r=!r&&'\\'==n;
          } return f('quasi', 'string-2', e.current());
        } function y(e, t) {
          t.fatArrowAt&&(t.fatArrowAt=null); let n=e.string.indexOf('=>', e.start); if (!(n<0)) {
            if (c) {
              const r=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, n)); r&&(n=r.index);
            } for (var i=0, o=!1, s=n-1; s>=0; --s) {
              const a=e.string.charAt(s); const l='([{}])'.indexOf(a); if (l>=0&&l<3) {
                if (!i) {
                  ++s; break;
                } if (0==--i) {
                  '('==a&&(o=!0); break;
                }
              } else if (l>=3&&l<6)++i; else if (u.test(a))o=!0; else if (/["'\/`]/.test(a)) {
                for (;;--s) {
                  if (0==s) return; if (e.string.charAt(s-1)==a&&'\\'!=e.string.charAt(s-2)) {
                    s--; break;
                  }
                }
              } else if (o&&!i) {
                ++s; break;
              }
            }o&&!i&&(t.fatArrowAt=s);
          }
        } const b={'atom': !0, 'number': !0, 'variable': !0, 'string': !0, 'regexp': !0, 'this': !0, 'jsonld-keyword': !0}; function w(e, t, n, r, i, o) {
          this.indented=e, this.column=t, this.type=n, this.prev=i, this.info=o, null!=r&&(this.align=r);
        } function x(e, t) {
          for (var n=e.localVars; n; n=n.next) if (n.name==t) return !0; for (let r=e.context; r; r=r.prev) for (n=r.vars; n; n=n.next) if (n.name==t) return !0;
        } const k={state: null, column: null, marked: null, cc: null}; function _() {
          for (let e=arguments.length-1; e>=0; e--)k.cc.push(arguments[e]);
        } function S() {
          return _.apply(null, arguments), !0;
        } function C(e, t) {
          for (let n=t; n; n=n.next) if (n.name==e) return !0; return !1;
        } function M(e) {
          const t=k.state; if (k.marked='def', t.context) {
            if ('var'==t.lexical.info&&t.context&&t.context.block) {
              const r=T(e, t.context); if (null!=r) return void(t.context=r);
            } else if (!C(e, t.localVars)) return void(t.localVars=new E(e, t.localVars));
          } n.globalVars&&!C(e, t.globalVars)&&(t.globalVars=new E(e, t.globalVars));
        } function T(e, t) {
          if (t) {
            if (t.block) {
              const n=T(e, t.prev); return n?n==t.prev?t:new D(n, t.vars, !0):null;
            } return C(e, t.vars)?t:new D(t.prev, new E(e, t.vars), !1);
          } return null;
        } function O(e) {
          return 'public'==e||'private'==e||'protected'==e||'abstract'==e||'readonly'==e;
        } function D(e, t, n) {
          this.prev=e, this.vars=t, this.block=n;
        } function E(e, t) {
          this.name=e, this.next=t;
        } const N=new E('this', new E('arguments', null)); function A() {
          k.state.context=new D(k.state.context, k.state.localVars, !1), k.state.localVars=N;
        } function L() {
          k.state.context=new D(k.state.context, k.state.localVars, !0), k.state.localVars=null;
        } function z() {
          k.state.localVars=k.state.context.vars, k.state.context=k.state.context.prev;
        } function I(e, t) {
          const n=function() {
            const n=k.state; let r=n.indented; if ('stat'==n.lexical.type)r=n.lexical.indented; else for (let i=n.lexical; i&&')'==i.type&&i.align; i=i.prev)r=i.indented; n.lexical=new w(r, k.stream.column(), e, null, n.lexical, t);
          }; return n.lex=!0, n;
        } function q() {
          const e=k.state; e.lexical.prev&&(')'==e.lexical.type&&(e.indented=e.lexical.indented), e.lexical=e.lexical.prev);
        } function F(e) {
          return function t(n) {
            return n==e?S():';'==e||'}'==n||')'==n||']'==n?_():S(t);
          };
        } function P(e, t) {
          return 'var'==e?S(I('vardef', t), be, F(';'), q):'keyword a'==e?S(I('form'), W, P, q):'keyword b'==e?S(I('form'), P, q):'keyword d'==e?k.stream.match(/^\s*$/, !1)?S():S(I('stat'), V, F(';'), q):'debugger'==e?S(F(';')):'{'==e?S(I('}'), L, se, q, z):';'==e?S():'if'==e?('else'==k.state.lexical.info&&k.state.cc[k.state.cc.length-1]==q&&k.state.cc.pop()(), S(I('form'), W, P, q, Ce)):'function'==e?S(De):'for'==e?S(I('form'), Me, P, q):'class'==e||c&&'interface'==t?(k.marked='keyword', S(I('form', 'class'==e?e:t), ze, q)):'variable'==e?c&&'declare'==t?(k.marked='keyword', S(P)):c&&('module'==t||'enum'==t||'type'==t)&&k.stream.match(/^\s*\w/, !1)?(k.marked='keyword', 'enum'==t?S(Ue):'type'==t?S(Ne, F('operator'), de, F(';')):S(I('form'), we, F('{'), I('}'), se, q, q)):c&&'namespace'==t?(k.marked='keyword', S(I('form'), B, P, q)):c&&'abstract'==t?(k.marked='keyword', S(P)):S(I('stat'), Q):'switch'==e?S(I('form'), W, F('{'), I('}', 'switch'), L, se, q, q, z):'case'==e?S(B, F(':')):'default'==e?S(F(':')):'catch'==e?S(I('form'), A, R, P, q, z):'export'==e?S(I('stat'), Pe, q):'import'==e?S(I('stat'), Be, q):'async'==e?S(P):'@'==t?S(B, P):_(I('stat'), B, F(';'), q);
        } function R(e) {
          if ('('==e) return S(Ae, F(')'));
        } function B(e, t) {
          return H(e, t, !1);
        } function j(e, t) {
          return H(e, t, !0);
        } function W(e) {
          return '('!=e?_():S(I(')'), V, F(')'), q);
        } function H(e, t, n) {
          if (k.state.fatArrowAt==k.stream.start) {
            const r=n?G:Y; if ('('==e) return S(A, I(')'), ie(Ae, ')'), q, F('=>'), r, z); if ('variable'==e) return _(A, we, F('=>'), r, z);
          } const i=n?U:$; return b.hasOwnProperty(e)?S(i):'function'==e?S(De, i):'class'==e||c&&'interface'==t?(k.marked='keyword', S(I('form'), Le, q)):'keyword c'==e||'async'==e?S(n?j:B):'('==e?S(I(')'), V, F(')'), q, i):'operator'==e||'spread'==e?S(n?j:B):'['==e?S(I(']'), $e, q, i):'{'==e?oe(te, '}', null, i):'quasi'==e?_(K, i):'new'==e?S(function(e) {
            return function(t) {
              return '.'==t?S(e?Z:X):'variable'==t&&c?S(ge, e?U:$):_(e?j:B);
            };
          }(n)):'import'==e?S(B):S();
        } function V(e) {
          return e.match(/[;\}\)\],]/)?_():_(B);
        } function $(e, t) {
          return ','==e?S(V):U(e, t, !1);
        } function U(e, t, n) {
          const r=0==n?$:U; const i=0==n?B:j; return '=>'==e?S(A, n?G:Y, z):'operator'==e?/\+\+|--/.test(t)||c&&'!'==t?S(r):c&&'<'==t&&k.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1)?S(I('>'), ie(de, '>'), q, r):'?'==t?S(B, F(':'), i):S(i):'quasi'==e?_(K, r):';'!=e?'('==e?oe(j, ')', 'call', r):'.'==e?S(ee, r):'['==e?S(I(']'), V, F(']'), q, r):c&&'as'==t?(k.marked='keyword', S(de, r)):'regexp'==e?(k.state.lastType=k.marked='operator', k.stream.backUp(k.stream.pos-k.stream.start-1), S(i)):void 0:void 0;
        } function K(e, t) {
          return 'quasi'!=e?_():'${'!=t.slice(t.length-2)?S(K):S(B, J);
        } function J(e) {
          if ('}'==e) return k.marked='string-2', k.state.tokenize=v, S(K);
        } function Y(e) {
          return y(k.stream, k.state), _('{'==e?P:B);
        } function G(e) {
          return y(k.stream, k.state), _('{'==e?P:j);
        } function X(e, t) {
          if ('target'==t) return k.marked='keyword', S($);
        } function Z(e, t) {
          if ('target'==t) return k.marked='keyword', S(U);
        } function Q(e) {
          return ':'==e?S(q, P):_($, F(';'), q);
        } function ee(e) {
          if ('variable'==e) return k.marked='property', S();
        } function te(e, t) {
          return 'async'==e?(k.marked='property', S(te)):'variable'==e||'keyword'==k.style?(k.marked='property', 'get'==t||'set'==t?S(ne):(c&&k.state.fatArrowAt==k.stream.start&&(n=k.stream.match(/^\s*:\s*/, !1))&&(k.state.fatArrowAt=k.stream.pos+n[0].length), S(re))):'number'==e||'string'==e?(k.marked=a?'property':k.style+' property', S(re)):'jsonld-keyword'==e?S(re):c&&O(t)?(k.marked='keyword', S(te)):'['==e?S(B, ae, F(']'), re):'spread'==e?S(j, re):'*'==t?(k.marked='keyword', S(te)):':'==e?_(re):void 0; let n;
        } function ne(e) {
          return 'variable'!=e?_(re):(k.marked='property', S(De));
        } function re(e) {
          return ':'==e?S(j):'('==e?_(De):void 0;
        } function ie(e, t, n) {
          function r(i, o) {
            if (n?n.indexOf(i)>-1:','==i) {
              const s=k.state.lexical; return 'call'==s.info&&(s.pos=(s.pos||0)+1), S((function(n, r) {
                return n==t||r==t?_():_(e);
              }), r);
            } return i==t||o==t?S():n&&n.indexOf(';')>-1?_(e):S(F(t));
          } return function(n, i) {
            return n==t||i==t?S():_(e, r);
          };
        } function oe(e, t, n) {
          for (let r=3; r<arguments.length; r++)k.cc.push(arguments[r]); return S(I(t, n), ie(e, t), q);
        } function se(e) {
          return '}'==e?S():_(P, se);
        } function ae(e, t) {
          if (c) {
            if (':'==e) return S(de); if ('?'==t) return S(ae);
          }
        } function le(e, t) {
          if (c&&(':'==e||'in'==t)) return S(de);
        } function ce(e) {
          if (c&&':'==e) return k.stream.match(/^\s*\w+\s+is\b/, !1)?S(B, ue, de):S(de);
        } function ue(e, t) {
          if ('is'==t) return k.marked='keyword', S();
        } function de(e, t) {
          return 'keyof'==t||'typeof'==t||'infer'==t?(k.marked='keyword', S('typeof'==t?j:de)):'variable'==e||'void'==t?(k.marked='type', S(me)):'|'==t||'&'==t?S(de):'string'==e||'number'==e||'atom'==e?S(me):'['==e?S(I(']'), ie(de, ']', ','), q, me):'{'==e?S(I('}'), ie(pe, '}', ',;'), q, me):'('==e?S(ie(fe, ')'), he, me):'<'==e?S(ie(de, '>'), de):void 0;
        } function he(e) {
          if ('=>'==e) return S(de);
        } function pe(e, t) {
          return 'variable'==e||'keyword'==k.style?(k.marked='property', S(pe)):'?'==t||'number'==e||'string'==e?S(pe):':'==e?S(de):'['==e?S(F('variable'), le, F(']'), pe):'('==e?_(Ee, pe):void 0;
        } function fe(e, t) {
          return 'variable'==e&&k.stream.match(/^\s*[?:]/, !1)||'?'==t?S(fe):':'==e?S(de):'spread'==e?S(fe):_(de);
        } function me(e, t) {
          return '<'==t?S(I('>'), ie(de, '>'), q, me):'|'==t||'.'==e||'&'==t?S(de):'['==e?S(de, F(']'), me):'extends'==t||'implements'==t?(k.marked='keyword', S(de)):'?'==t?S(de, F(':'), de):void 0;
        } function ge(e, t) {
          if ('<'==t) return S(I('>'), ie(de, '>'), q, me);
        } function ve() {
          return _(de, ye);
        } function ye(e, t) {
          if ('='==t) return S(de);
        } function be(e, t) {
          return 'enum'==t?(k.marked='keyword', S(Ue)):_(we, ae, _e, Se);
        } function we(e, t) {
          return c&&O(t)?(k.marked='keyword', S(we)):'variable'==e?(M(t), S()):'spread'==e?S(we):'['==e?oe(ke, ']'):'{'==e?oe(xe, '}'):void 0;
        } function xe(e, t) {
          return 'variable'!=e||k.stream.match(/^\s*:/, !1)?('variable'==e&&(k.marked='property'), 'spread'==e?S(we):'}'==e?_():'['==e?S(B, F(']'), F(':'), xe):S(F(':'), we, _e)):(M(t), S(_e));
        } function ke() {
          return _(we, _e);
        } function _e(e, t) {
          if ('='==t) return S(j);
        } function Se(e) {
          if (','==e) return S(be);
        } function Ce(e, t) {
          if ('keyword b'==e&&'else'==t) return S(I('form', 'else'), P, q);
        } function Me(e, t) {
          return 'await'==t?S(Me):'('==e?S(I(')'), Te, q):void 0;
        } function Te(e) {
          return 'var'==e?S(be, Oe):'variable'==e?S(Oe):_(Oe);
        } function Oe(e, t) {
          return ')'==e?S():';'==e?S(Oe):'in'==t||'of'==t?(k.marked='keyword', S(B, Oe)):_(B, Oe);
        } function De(e, t) {
          return '*'==t?(k.marked='keyword', S(De)):'variable'==e?(M(t), S(De)):'('==e?S(A, I(')'), ie(Ae, ')'), q, ce, P, z):c&&'<'==t?S(I('>'), ie(ve, '>'), q, De):void 0;
        } function Ee(e, t) {
          return '*'==t?(k.marked='keyword', S(Ee)):'variable'==e?(M(t), S(Ee)):'('==e?S(A, I(')'), ie(Ae, ')'), q, ce, z):c&&'<'==t?S(I('>'), ie(ve, '>'), q, Ee):void 0;
        } function Ne(e, t) {
          return 'keyword'==e||'variable'==e?(k.marked='type', S(Ne)):'<'==t?S(I('>'), ie(ve, '>'), q):void 0;
        } function Ae(e, t) {
          return '@'==t&&S(B, Ae), 'spread'==e?S(Ae):c&&O(t)?(k.marked='keyword', S(Ae)):c&&'this'==e?S(ae, _e):_(we, ae, _e);
        } function Le(e, t) {
          return 'variable'==e?ze(e, t):Ie(e, t);
        } function ze(e, t) {
          if ('variable'==e) return M(t), S(Ie);
        } function Ie(e, t) {
          return '<'==t?S(I('>'), ie(ve, '>'), q, Ie):'extends'==t||'implements'==t||c&&','==e?('implements'==t&&(k.marked='keyword'), S(c?de:B, Ie)):'{'==e?S(I('}'), qe, q):void 0;
        } function qe(e, t) {
          return 'async'==e||'variable'==e&&('static'==t||'get'==t||'set'==t||c&&O(t))&&k.stream.match(/^\s+[\w$\xa1-\uffff]/, !1)?(k.marked='keyword', S(qe)):'variable'==e||'keyword'==k.style?(k.marked='property', S(Fe, qe)):'number'==e||'string'==e?S(Fe, qe):'['==e?S(B, ae, F(']'), Fe, qe):'*'==t?(k.marked='keyword', S(qe)):c&&'('==e?_(Ee, qe):';'==e||','==e?S(qe):'}'==e?S():'@'==t?S(B, qe):void 0;
        } function Fe(e, t) {
          if ('?'==t) return S(Fe); if (':'==e) return S(de, _e); if ('='==t) return S(j); const n=k.state.lexical.prev; return _(n&&'interface'==n.info?Ee:De);
        } function Pe(e, t) {
          return '*'==t?(k.marked='keyword', S(Ve, F(';'))):'default'==t?(k.marked='keyword', S(B, F(';'))):'{'==e?S(ie(Re, '}'), Ve, F(';')):_(P);
        } function Re(e, t) {
          return 'as'==t?(k.marked='keyword', S(F('variable'))):'variable'==e?_(j, Re):void 0;
        } function Be(e) {
          return 'string'==e?S():'('==e?_(B):_(je, We, Ve);
        } function je(e, t) {
          return '{'==e?oe(je, '}'):('variable'==e&&M(t), '*'==t&&(k.marked='keyword'), S(He));
        } function We(e) {
          if (','==e) return S(je, We);
        } function He(e, t) {
          if ('as'==t) return k.marked='keyword', S(je);
        } function Ve(e, t) {
          if ('from'==t) return k.marked='keyword', S(B);
        } function $e(e) {
          return ']'==e?S():_(ie(j, ']'));
        } function Ue() {
          return _(I('form'), we, F('{'), I('}'), ie(Ke, '}'), q, q);
        } function Ke() {
          return _(we, _e);
        } function Je(e, t, n) {
          return t.tokenize==m&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||'quasi'==t.lastType&&/\{\s*$/.test(e.string.slice(0, e.pos-(n||0)));
        } return z.lex=!0, q.lex=!0, {startState: function(e) {
          const t={tokenize: m, lastType: 'sof', cc: [], lexical: new w((e||0)-o, 0, 'block', !1), localVars: n.localVars, context: n.localVars&&new D(null, null, !1), indented: e||0}; return n.globalVars&&'object'==typeof n.globalVars&&(t.globalVars=n.globalVars), t;
        }, token: function(e, t) {
          if (e.sol()&&(t.lexical.hasOwnProperty('align')||(t.lexical.align=!1), t.indented=e.indentation(), y(e, t)), t.tokenize!=g&&e.eatSpace()) return null; const n=t.tokenize(e, t); return 'comment'==r?n:(t.lastType='operator'!=r||'++'!=i&&'--'!=i?r:'incdec', function(e, t, n, r, i) {
            const o=e.cc; for (k.state=e, k.stream=i, k.marked=null, k.cc=o, k.style=t, e.lexical.hasOwnProperty('align')||(e.lexical.align=!0); ;) {
              if ((o.length?o.pop():l?B:P)(n, r)) {
                for (;o.length&&o[o.length-1].lex;)o.pop()(); return k.marked?k.marked:'variable'==n&&x(e, r)?'variable-2':t;
              }
            }
          }(t, n, r, i, e));
        }, indent: function(t, r) {
          if (t.tokenize==g||t.tokenize==v) return e.Pass; if (t.tokenize!=m) return 0; let i; const a=r&&r.charAt(0); let l=t.lexical; if (!/^\s*else\b/.test(r)) {
            for (let c=t.cc.length-1; c>=0; --c) {
              const u=t.cc[c]; if (u==q)l=l.prev; else if (u!=Ce) break;
            }
          } for (;('stat'==l.type||'form'==l.type)&&('}'==a||(i=t.cc[t.cc.length-1])&&(i==$||i==U)&&!/^[,\.=+\-*:?[\(]/.test(r));)l=l.prev; s&&')'==l.type&&'stat'==l.prev.type&&(l=l.prev); const d=l.type; const p=a==d; return 'vardef'==d?l.indented+('operator'==t.lastType||','==t.lastType?l.info.length+1:0):'form'==d&&'{'==a?l.indented:'form'==d?l.indented+o:'stat'==d?l.indented+(function(e, t) {
            return 'operator'==e.lastType||','==e.lastType||h.test(t.charAt(0))||/[,.]/.test(t.charAt(0));
          }(t, r)?s||o:0):'switch'!=l.info||p||0==n.doubleIndentSwitch?l.align?l.column+(p?0:1):l.indented+(p?0:o):l.indented+(/^(?:case|default)\b/.test(r)?o:2*o);
        }, electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, blockCommentStart: l?null:'/*', blockCommentEnd: l?null:'*/', blockCommentContinue: l?null:' * ', lineComment: l?null:'//', fold: 'brace', closeBrackets: '()[]{}\'\'""``', helperType: l?'json':'javascript', jsonldMode: a, jsonMode: l, expressionAllowed: Je, skipExpression: function(e) {
          const t=e.cc[e.cc.length-1]; t!=B&&t!=j||e.cc.pop();
        }};
      })), e.registerHelper('wordChars', 'javascript', /[\w$]/), e.defineMIME('text/javascript', 'javascript'), e.defineMIME('text/ecmascript', 'javascript'), e.defineMIME('application/javascript', 'javascript'), e.defineMIME('application/x-javascript', 'javascript'), e.defineMIME('application/ecmascript', 'javascript'), e.defineMIME('application/json', {name: 'javascript', json: !0}), e.defineMIME('application/x-json', {name: 'javascript', json: !0}), e.defineMIME('application/ld+json', {name: 'javascript', jsonld: !0}), e.defineMIME('text/typescript', {name: 'javascript', typescript: !0}), e.defineMIME('application/typescript', {name: 'javascript', typescript: !0});
    }(n(631));
  }, 47: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('markdown', (function(t, n) {
        const r=e.getMode(t, 'text/html'); const i='null'==r.name; void 0===n.highlightFormatting&&(n.highlightFormatting=!1), void 0===n.maxBlockquoteDepth&&(n.maxBlockquoteDepth=0), void 0===n.taskLists&&(n.taskLists=!1), void 0===n.strikethrough&&(n.strikethrough=!1), void 0===n.emoji&&(n.emoji=!1), void 0===n.fencedCodeBlockHighlighting&&(n.fencedCodeBlockHighlighting=!0), void 0===n.fencedCodeBlockDefaultMode&&(n.fencedCodeBlockDefaultMode='text/plain'), void 0===n.xml&&(n.xml=!0), void 0===n.tokenTypeOverrides&&(n.tokenTypeOverrides={}); const o={header: 'header', code: 'comment', quote: 'quote', list1: 'variable-2', list2: 'variable-3', list3: 'keyword', hr: 'hr', image: 'image', imageAltText: 'image-alt-text', imageMarker: 'image-marker', formatting: 'formatting', linkInline: 'link', linkEmail: 'link', linkText: 'link', linkHref: 'string', em: 'em', strong: 'strong', strikethrough: 'strikethrough', emoji: 'builtin'}; for (const s in o)o.hasOwnProperty(s)&&n.tokenTypeOverrides[s]&&(o[s]=n.tokenTypeOverrides[s]); const a=/^([*\-_])(?:\s*\1){2,}\s*$/; const l=/^(?:[*\-+]|^[0-9]+([.)]))\s+/; const c=/^\[(x| )\](?=\s)/i; const u=n.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/; const d=/^ {0,3}(?:\={1,}|-{2,})\s*$/; const h=/^[^#!\[\]*_\\<>` "'(~:]+/; const p=/^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/; const f=/^\s*\[[^\]]+?\]:.*$/; const m=/[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/; function g(e, t, n) {
          return t.f=t.inline=n, n(e, t);
        } function v(e, t, n) {
          return t.f=t.block=n, n(e, t);
        } function y(t) {
          if (t.linkTitle=!1, t.linkHref=!1, t.linkText=!1, t.em=!1, t.strong=!1, t.strikethrough=!1, t.quote=0, t.indentedCode=!1, t.f==w) {
            let n=i; if (!n) {
              const o=e.innerMode(r, t.htmlState); n='xml'==o.mode.name&&null===o.state.tagStart&&!o.state.context&&o.state.tokenize.isInText;
            }n&&(t.f=S, t.block=b, t.htmlState=null);
          } return t.trailingSpace=0, t.trailingSpaceNewLine=!1, t.prevLine=t.thisLine, t.thisLine={stream: null}, null;
        } function b(r, i) {
          let s; const h=r.column()===i.indentation; const m=!(s=i.prevLine.stream)||!/\S/.test(s.string); const v=i.indentedCode; const y=i.prevLine.hr; const b=!1!==i.list; const w=(i.listStack[i.listStack.length-1]||0)+3; i.indentedCode=!1; const _=i.indentation; if (null===i.indentationDiff&&(i.indentationDiff=i.indentation, b)) {
            for (i.list=null; _<i.listStack[i.listStack.length-1];)i.listStack.pop(), i.listStack.length?i.indentation=i.listStack[i.listStack.length-1]:i.list=!1; !1!==i.list&&(i.indentationDiff=_-i.listStack[i.listStack.length-1]);
          } const S=!(m||y||i.prevLine.header||b&&v||i.prevLine.fencedCodeEnd); const C=(!1===i.list||y||m)&&i.indentation<=w&&r.match(a); let M=null; if (i.indentationDiff>=4&&(v||i.prevLine.fencedCodeEnd||i.prevLine.header||m)) return r.skipToEnd(), i.indentedCode=!0, o.code; if (r.eatSpace()) return null; if (h&&i.indentation<=w&&(M=r.match(u))&&M[1].length<=6) return i.quote=0, i.header=M[1].length, i.thisLine.header=!0, n.highlightFormatting&&(i.formatting='header'), i.f=i.inline, k(i); if (i.indentation<=w&&r.eat('>')) return i.quote=h?1:i.quote+1, n.highlightFormatting&&(i.formatting='quote'), r.eatSpace(), k(i); if (!C&&!i.setext&&h&&i.indentation<=w&&(M=r.match(l))) {
            const T=M[1]?'ol':'ul'; return i.indentation=_+r.current().length, i.list=!0, i.quote=0, i.listStack.push(i.indentation), i.em=!1, i.strong=!1, i.code=!1, i.strikethrough=!1, n.taskLists&&r.match(c, !1)&&(i.taskList=!0), i.f=i.inline, n.highlightFormatting&&(i.formatting=['list', 'list-'+T]), k(i);
          } return h&&i.indentation<=w&&(M=r.match(p, !0))?(i.quote=0, i.fencedEndRE=new RegExp(M[1]+'+ *$'), i.localMode=n.fencedCodeBlockHighlighting&&function(n) {
            if (e.findModeByName) {
              const r=e.findModeByName(n); r&&(n=r.mime||r.mimes[0]);
            } const i=e.getMode(t, n); return 'null'==i.name?null:i;
          }(M[2]||n.fencedCodeBlockDefaultMode), i.localMode&&(i.localState=e.startState(i.localMode)), i.f=i.block=x, n.highlightFormatting&&(i.formatting='code-block'), i.code=-1, k(i)):i.setext||!(S&&b||i.quote||!1!==i.list||i.code||C||f.test(r.string))&&(M=r.lookAhead(1))&&(M=M.match(d))?(i.setext?(i.header=i.setext, i.setext=0, r.skipToEnd(), n.highlightFormatting&&(i.formatting='header')):(i.header='='==M[0].charAt(0)?1:2, i.setext=i.header), i.thisLine.header=!0, i.f=i.inline, k(i)):C?(r.skipToEnd(), i.hr=!0, i.thisLine.hr=!0, o.hr):'['===r.peek()?g(r, i, O):g(r, i, i.inline);
        } function w(t, n) {
          const o=r.token(t, n.htmlState); if (!i) {
            const s=e.innerMode(r, n.htmlState); ('xml'==s.mode.name&&null===s.state.tagStart&&!s.state.context&&s.state.tokenize.isInText||n.md_inside&&t.current().indexOf('>')>-1)&&(n.f=S, n.block=b, n.htmlState=null);
          } return o;
        } function x(e, t) {
          let r; const i=t.listStack[t.listStack.length-1]||0; const s=t.indentation<i; const a=i+3; return t.fencedEndRE&&t.indentation<=a&&(s||e.match(t.fencedEndRE))?(n.highlightFormatting&&(t.formatting='code-block'), s||(r=k(t)), t.localMode=t.localState=null, t.block=b, t.f=S, t.fencedEndRE=null, t.code=0, t.thisLine.fencedCodeEnd=!0, s?v(e, t, t.block):r):t.localMode?t.localMode.token(e, t.localState):(e.skipToEnd(), o.code);
        } function k(e) {
          const t=[]; if (e.formatting) {
            t.push(o.formatting), 'string'==typeof e.formatting&&(e.formatting=[e.formatting]); for (let r=0; r<e.formatting.length; r++)t.push(o.formatting+'-'+e.formatting[r]), 'header'===e.formatting[r]&&t.push(o.formatting+'-'+e.formatting[r]+'-'+e.header), 'quote'===e.formatting[r]&&(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(o.formatting+'-'+e.formatting[r]+'-'+e.quote):t.push('error'));
          } if (e.taskOpen) return t.push('meta'), t.length?t.join(' '):null; if (e.taskClosed) return t.push('property'), t.length?t.join(' '):null; if (e.linkHref?t.push(o.linkHref, 'url'):(e.strong&&t.push(o.strong), e.em&&t.push(o.em), e.strikethrough&&t.push(o.strikethrough), e.emoji&&t.push(o.emoji), e.linkText&&t.push(o.linkText), e.code&&t.push(o.code), e.image&&t.push(o.image), e.imageAltText&&t.push(o.imageAltText, 'link'), e.imageMarker&&t.push(o.imageMarker)), e.header&&t.push(o.header, o.header+'-'+e.header), e.quote&&(t.push(o.quote), !n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(o.quote+'-'+e.quote):t.push(o.quote+'-'+n.maxBlockquoteDepth)), !1!==e.list) {
            const i=(e.listStack.length-1)%3; i?1===i?t.push(o.list2):t.push(o.list3):t.push(o.list1);
          } return e.trailingSpaceNewLine?t.push('trailing-space-new-line'):e.trailingSpace&&t.push('trailing-space-'+(e.trailingSpace%2?'a':'b')), t.length?t.join(' '):null;
        } function _(e, t) {
          if (e.match(h, !0)) return k(t);
        } function S(t, i) {
          const s=i.text(t, i); if (void 0!==s) return s; if (i.list) return i.list=null, k(i); if (i.taskList) return ' '===t.match(c, !0)[1]?i.taskOpen=!0:i.taskClosed=!0, n.highlightFormatting&&(i.formatting='task'), i.taskList=!1, k(i); if (i.taskOpen=!1, i.taskClosed=!1, i.header&&t.match(/^#+$/, !0)) return n.highlightFormatting&&(i.formatting='header'), k(i); const a=t.next(); if (i.linkTitle) {
            i.linkTitle=!1; let l=a; '('===a&&(l=')'); const u='^\\s*(?:[^'+(l=(l+'').replace(/([.?*+^\[\]\\(){}|-])/g, '\\$1'))+'\\\\]+|\\\\\\\\|\\\\.)'+l; if (t.match(new RegExp(u), !0)) return o.linkHref;
          } if ('`'===a) {
            const d=i.formatting; n.highlightFormatting&&(i.formatting='code'), t.eatWhile('`'); const h=t.current().length; if (0!=i.code||i.quote&&1!=h) {
              if (h==i.code) {
                var p=k(i); return i.code=0, p;
              } return i.formatting=d, k(i);
            } return i.code=h, k(i);
          } if (i.code) return k(i); if ('\\'===a&&(t.next(), n.highlightFormatting)) {
            var f=k(i); const g=o.formatting+'-escape'; return f?f+' '+g:g;
          } if ('!'===a&&t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return i.imageMarker=!0, i.image=!0, n.highlightFormatting&&(i.formatting='image'), k(i); if ('['===a&&i.imageMarker&&t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return i.imageMarker=!1, i.imageAltText=!0, n.highlightFormatting&&(i.formatting='image'), k(i); if (']'===a&&i.imageAltText) {
            n.highlightFormatting&&(i.formatting='image'); f=k(i); return i.imageAltText=!1, i.image=!1, i.inline=i.f=M, f;
          } if ('['===a&&!i.image) return i.linkText&&t.match(/^.*?\]/)||(i.linkText=!0, n.highlightFormatting&&(i.formatting='link')), k(i); if (']'===a&&i.linkText) {
            n.highlightFormatting&&(i.formatting='link'); f=k(i); return i.linkText=!1, i.inline=i.f=t.match(/\(.*?\)| ?\[.*?\]/, !1)?M:S, f;
          } if ('<'===a&&t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return i.f=i.inline=C, n.highlightFormatting&&(i.formatting='link'), (f=k(i))?f+=' ':f='', f+o.linkInline; if ('<'===a&&t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return i.f=i.inline=C, n.highlightFormatting&&(i.formatting='link'), (f=k(i))?f+=' ':f='', f+o.linkEmail; if (n.xml&&'<'===a&&t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, !1)) {
            const y=t.string.indexOf('>', t.pos); if (-1!=y) {
              const b=t.string.substring(t.start, y); /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(b)&&(i.md_inside=!0);
            } return t.backUp(1), i.htmlState=e.startState(r), v(t, i, w);
          } if (n.xml&&'<'===a&&t.match(/^\/\w*?>/)) return i.md_inside=!1, 'tag'; if ('*'===a||'_'===a) {
            for (var x=1, _=1==t.pos?' ':t.string.charAt(t.pos-2); x<3&&t.eat(a);)x++; const T=t.peek()||' '; const O=!/\s/.test(T)&&(!m.test(T)||/\s/.test(_)||m.test(_)); const D=!/\s/.test(_)&&(!m.test(_)||/\s/.test(T)||m.test(T)); let E=null; let N=null; if (x%2&&(i.em||!O||'*'!==a&&D&&!m.test(_)?i.em!=a||!D||'*'!==a&&O&&!m.test(T)||(E=!1):E=!0), x>1&&(i.strong||!O||'*'!==a&&D&&!m.test(_)?i.strong!=a||!D||'*'!==a&&O&&!m.test(T)||(N=!1):N=!0), null!=N||null!=E) return n.highlightFormatting&&(i.formatting=null==E?'strong':null==N?'em':'strong em'), !0===E&&(i.em=a), !0===N&&(i.strong=a), p=k(i), !1===E&&(i.em=!1), !1===N&&(i.strong=!1), p;
          } else if (' '===a&&(t.eat('*')||t.eat('_'))) {
            if (' '===t.peek()) return k(i); t.backUp(1);
          } if (n.strikethrough) {
            if ('~'===a&&t.eatWhile(a)) {
              if (i.strikethrough) return n.highlightFormatting&&(i.formatting='strikethrough'), p=k(i), i.strikethrough=!1, p; if (t.match(/^[^\s]/, !1)) return i.strikethrough=!0, n.highlightFormatting&&(i.formatting='strikethrough'), k(i);
            } else if (' '===a&&t.match(/^~~/, !0)) {
              if (' '===t.peek()) return k(i); t.backUp(2);
            }
          } if (n.emoji&&':'===a&&t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
            i.emoji=!0, n.highlightFormatting&&(i.formatting='emoji'); const A=k(i); return i.emoji=!1, A;
          } return ' '===a&&(t.match(/^ +$/, !1)?i.trailingSpace++:i.trailingSpace&&(i.trailingSpaceNewLine=!0)), k(i);
        } function C(e, t) {
          if ('>'===e.next()) {
            t.f=t.inline=S, n.highlightFormatting&&(t.formatting='link'); let r=k(t); return r?r+=' ':r='', r+o.linkInline;
          } return e.match(/^[^>]+/, !0), o.linkInline;
        } function M(e, t) {
          if (e.eatSpace()) return null; let r; const i=e.next(); return '('===i||'['===i?(t.f=t.inline=(r='('===i?')':']', function(e, t) {
            if (e.next()===r) {
              t.f=t.inline=S, n.highlightFormatting&&(t.formatting='link-string'); const i=k(t); return t.linkHref=!1, i;
            } return e.match(T[r]), t.linkHref=!0, k(t);
          }), n.highlightFormatting&&(t.formatting='link-string'), t.linkHref=!0, k(t)):'error';
        } var T={')': /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/, ']': /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/}; function O(e, t) {
          return e.match(/^([^\]\\]|\\.)*\]:/, !1)?(t.f=D, e.next(), n.highlightFormatting&&(t.formatting='link'), t.linkText=!0, k(t)):g(e, t, S);
        } function D(e, t) {
          if (e.match(/^\]:/, !0)) {
            t.f=t.inline=E, n.highlightFormatting&&(t.formatting='link'); const r=k(t); return t.linkText=!1, r;
          } return e.match(/^([^\]\\]|\\.)+/, !0), o.linkText;
        } function E(e, t) {
          return e.eatSpace()?null:(e.match(/^[^\s]+/, !0), void 0===e.peek()?t.linkTitle=!0:e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f=t.inline=S, o.linkHref+' url');
        } var N={startState: function() {
          return {f: b, prevLine: {stream: null}, thisLine: {stream: null}, block: b, htmlState: null, indentation: 0, inline: S, text: _, formatting: !1, linkText: !1, linkHref: !1, linkTitle: !1, code: 0, em: !1, strong: !1, header: 0, setext: 0, hr: !1, taskList: !1, list: !1, listStack: [], quote: 0, trailingSpace: 0, trailingSpaceNewLine: !1, strikethrough: !1, emoji: !1, fencedEndRE: null};
        }, copyState: function(t) {
          return {f: t.f, prevLine: t.prevLine, thisLine: t.thisLine, block: t.block, htmlState: t.htmlState&&e.copyState(r, t.htmlState), indentation: t.indentation, localMode: t.localMode, localState: t.localMode?e.copyState(t.localMode, t.localState):null, inline: t.inline, text: t.text, formatting: !1, linkText: t.linkText, linkTitle: t.linkTitle, linkHref: t.linkHref, code: t.code, em: t.em, strong: t.strong, strikethrough: t.strikethrough, emoji: t.emoji, header: t.header, setext: t.setext, hr: t.hr, taskList: t.taskList, list: t.list, listStack: t.listStack.slice(0), quote: t.quote, indentedCode: t.indentedCode, trailingSpace: t.trailingSpace, trailingSpaceNewLine: t.trailingSpaceNewLine, md_inside: t.md_inside, fencedEndRE: t.fencedEndRE};
        }, token: function(e, t) {
          if (t.formatting=!1, e!=t.thisLine.stream) {
            if (t.header=0, t.hr=!1, e.match(/^\s*$/, !0)) return y(t), null; if (t.prevLine=t.thisLine, t.thisLine={stream: e}, t.taskList=!1, t.trailingSpace=0, t.trailingSpaceNewLine=!1, !t.localState&&(t.f=t.block, t.f!=w)) {
              const n=e.match(/^\s*/, !0)[0].replace(/\t/g, '    ').length; if (t.indentation=n, t.indentationDiff=null, n>0) return null;
            }
          } return t.f(e, t);
        }, innerMode: function(e) {
          return e.block==w?{state: e.htmlState, mode: r}:e.localState?{state: e.localState, mode: e.localMode}:{state: e, mode: N};
        }, indent: function(t, n, i) {
          return t.block==w&&r.indent?r.indent(t.htmlState, n, i):t.localState&&t.localMode.indent?t.localMode.indent(t.localState, n, i):e.Pass;
        }, blankLine: y, getType: k, blockCommentStart: '\x3c!--', blockCommentEnd: '--\x3e', closeBrackets: '()[]{}\'\'""``', fold: 'markdown'}; return N;
      }), 'xml'), e.defineMIME('text/markdown', 'markdown'), e.defineMIME('text/x-markdown', 'markdown');
    }(n(631), n(589), n(539));
  }, 539: (e, t, n)=>{
    !function(e) {
      'use strict'; e.modeInfo=[{name: 'APL', mime: 'text/apl', mode: 'apl', ext: ['dyalog', 'apl']}, {name: 'PGP', mimes: ['application/pgp', 'application/pgp-encrypted', 'application/pgp-keys', 'application/pgp-signature'], mode: 'asciiarmor', ext: ['asc', 'pgp', 'sig']}, {name: 'ASN.1', mime: 'text/x-ttcn-asn', mode: 'asn.1', ext: ['asn', 'asn1']}, {name: 'Asterisk', mime: 'text/x-asterisk', mode: 'asterisk', file: /^extensions\.conf$/i}, {name: 'Brainfuck', mime: 'text/x-brainfuck', mode: 'brainfuck', ext: ['b', 'bf']}, {name: 'C', mime: 'text/x-csrc', mode: 'clike', ext: ['c', 'h', 'ino']}, {name: 'C++', mime: 'text/x-c++src', mode: 'clike', ext: ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'h++', 'hh', 'hxx'], alias: ['cpp']}, {name: 'Cobol', mime: 'text/x-cobol', mode: 'cobol', ext: ['cob', 'cpy']}, {name: 'C#', mime: 'text/x-csharp', mode: 'clike', ext: ['cs'], alias: ['csharp', 'cs']}, {name: 'Clojure', mime: 'text/x-clojure', mode: 'clojure', ext: ['clj', 'cljc', 'cljx']}, {name: 'ClojureScript', mime: 'text/x-clojurescript', mode: 'clojure', ext: ['cljs']}, {name: 'Closure Stylesheets (GSS)', mime: 'text/x-gss', mode: 'css', ext: ['gss']}, {name: 'CMake', mime: 'text/x-cmake', mode: 'cmake', ext: ['cmake', 'cmake.in'], file: /^CMakeLists\.txt$/}, {name: 'CoffeeScript', mimes: ['application/vnd.coffeescript', 'text/coffeescript', 'text/x-coffeescript'], mode: 'coffeescript', ext: ['coffee'], alias: ['coffee', 'coffee-script']}, {name: 'Common Lisp', mime: 'text/x-common-lisp', mode: 'commonlisp', ext: ['cl', 'lisp', 'el'], alias: ['lisp']}, {name: 'Cypher', mime: 'application/x-cypher-query', mode: 'cypher', ext: ['cyp', 'cypher']}, {name: 'Cython', mime: 'text/x-cython', mode: 'python', ext: ['pyx', 'pxd', 'pxi']}, {name: 'Crystal', mime: 'text/x-crystal', mode: 'crystal', ext: ['cr']}, {name: 'CSS', mime: 'text/css', mode: 'css', ext: ['css']}, {name: 'CQL', mime: 'text/x-cassandra', mode: 'sql', ext: ['cql']}, {name: 'D', mime: 'text/x-d', mode: 'd', ext: ['d']}, {name: 'Dart', mimes: ['application/dart', 'text/x-dart'], mode: 'dart', ext: ['dart']}, {name: 'diff', mime: 'text/x-diff', mode: 'diff', ext: ['diff', 'patch']}, {name: 'Django', mime: 'text/x-django', mode: 'django'}, {name: 'Dockerfile', mime: 'text/x-dockerfile', mode: 'dockerfile', file: /^Dockerfile$/}, {name: 'DTD', mime: 'application/xml-dtd', mode: 'dtd', ext: ['dtd']}, {name: 'Dylan', mime: 'text/x-dylan', mode: 'dylan', ext: ['dylan', 'dyl', 'intr']}, {name: 'EBNF', mime: 'text/x-ebnf', mode: 'ebnf'}, {name: 'ECL', mime: 'text/x-ecl', mode: 'ecl', ext: ['ecl']}, {name: 'edn', mime: 'application/edn', mode: 'clojure', ext: ['edn']}, {name: 'Eiffel', mime: 'text/x-eiffel', mode: 'eiffel', ext: ['e']}, {name: 'Elm', mime: 'text/x-elm', mode: 'elm', ext: ['elm']}, {name: 'Embedded Javascript', mime: 'application/x-ejs', mode: 'htmlembedded', ext: ['ejs']}, {name: 'Embedded Ruby', mime: 'application/x-erb', mode: 'htmlembedded', ext: ['erb']}, {name: 'Erlang', mime: 'text/x-erlang', mode: 'erlang', ext: ['erl']}, {name: 'Esper', mime: 'text/x-esper', mode: 'sql'}, {name: 'Factor', mime: 'text/x-factor', mode: 'factor', ext: ['factor']}, {name: 'FCL', mime: 'text/x-fcl', mode: 'fcl'}, {name: 'Forth', mime: 'text/x-forth', mode: 'forth', ext: ['forth', 'fth', '4th']}, {name: 'Fortran', mime: 'text/x-fortran', mode: 'fortran', ext: ['f', 'for', 'f77', 'f90', 'f95']}, {name: 'F#', mime: 'text/x-fsharp', mode: 'mllike', ext: ['fs'], alias: ['fsharp']}, {name: 'Gas', mime: 'text/x-gas', mode: 'gas', ext: ['s']}, {name: 'Gherkin', mime: 'text/x-feature', mode: 'gherkin', ext: ['feature']}, {name: 'GitHub Flavored Markdown', mime: 'text/x-gfm', mode: 'gfm', file: /^(readme|contributing|history)\.md$/i}, {name: 'Go', mime: 'text/x-go', mode: 'go', ext: ['go']}, {name: 'Groovy', mime: 'text/x-groovy', mode: 'groovy', ext: ['groovy', 'gradle'], file: /^Jenkinsfile$/}, {name: 'HAML', mime: 'text/x-haml', mode: 'haml', ext: ['haml']}, {name: 'Haskell', mime: 'text/x-haskell', mode: 'haskell', ext: ['hs']}, {name: 'Haskell (Literate)', mime: 'text/x-literate-haskell', mode: 'haskell-literate', ext: ['lhs']}, {name: 'Haxe', mime: 'text/x-haxe', mode: 'haxe', ext: ['hx']}, {name: 'HXML', mime: 'text/x-hxml', mode: 'haxe', ext: ['hxml']}, {name: 'ASP.NET', mime: 'application/x-aspx', mode: 'htmlembedded', ext: ['aspx'], alias: ['asp', 'aspx']}, {name: 'HTML', mime: 'text/html', mode: 'htmlmixed', ext: ['html', 'htm', 'handlebars', 'hbs'], alias: ['xhtml']}, {name: 'HTTP', mime: 'message/http', mode: 'http'}, {name: 'IDL', mime: 'text/x-idl', mode: 'idl', ext: ['pro']}, {name: 'Pug', mime: 'text/x-pug', mode: 'pug', ext: ['jade', 'pug'], alias: ['jade']}, {name: 'Java', mime: 'text/x-java', mode: 'clike', ext: ['java']}, {name: 'Java Server Pages', mime: 'application/x-jsp', mode: 'htmlembedded', ext: ['jsp'], alias: ['jsp']}, {name: 'JavaScript', mimes: ['text/javascript', 'text/ecmascript', 'application/javascript', 'application/x-javascript', 'application/ecmascript'], mode: 'javascript', ext: ['js'], alias: ['ecmascript', 'js', 'node']}, {name: 'JSON', mimes: ['application/json', 'application/x-json'], mode: 'javascript', ext: ['json', 'map'], alias: ['json5']}, {name: 'JSON-LD', mime: 'application/ld+json', mode: 'javascript', ext: ['jsonld'], alias: ['jsonld']}, {name: 'JSX', mime: 'text/jsx', mode: 'jsx', ext: ['jsx']}, {name: 'Jinja2', mime: 'text/jinja2', mode: 'jinja2', ext: ['j2', 'jinja', 'jinja2']}, {name: 'Julia', mime: 'text/x-julia', mode: 'julia', ext: ['jl']}, {name: 'Kotlin', mime: 'text/x-kotlin', mode: 'clike', ext: ['kt']}, {name: 'LESS', mime: 'text/x-less', mode: 'css', ext: ['less']}, {name: 'LiveScript', mime: 'text/x-livescript', mode: 'livescript', ext: ['ls'], alias: ['ls']}, {name: 'Lua', mime: 'text/x-lua', mode: 'lua', ext: ['lua']}, {name: 'Markdown', mime: 'text/x-markdown', mode: 'markdown', ext: ['markdown', 'md', 'mkd']}, {name: 'mIRC', mime: 'text/mirc', mode: 'mirc'}, {name: 'MariaDB SQL', mime: 'text/x-mariadb', mode: 'sql'}, {name: 'Mathematica', mime: 'text/x-mathematica', mode: 'mathematica', ext: ['m', 'nb', 'wl', 'wls']}, {name: 'Modelica', mime: 'text/x-modelica', mode: 'modelica', ext: ['mo']}, {name: 'MUMPS', mime: 'text/x-mumps', mode: 'mumps', ext: ['mps']}, {name: 'MS SQL', mime: 'text/x-mssql', mode: 'sql'}, {name: 'mbox', mime: 'application/mbox', mode: 'mbox', ext: ['mbox']}, {name: 'MySQL', mime: 'text/x-mysql', mode: 'sql'}, {name: 'Nginx', mime: 'text/x-nginx-conf', mode: 'nginx', file: /nginx.*\.conf$/i}, {name: 'NSIS', mime: 'text/x-nsis', mode: 'nsis', ext: ['nsh', 'nsi']}, {name: 'NTriples', mimes: ['application/n-triples', 'application/n-quads', 'text/n-triples'], mode: 'ntriples', ext: ['nt', 'nq']}, {name: 'Objective-C', mime: 'text/x-objectivec', mode: 'clike', ext: ['m'], alias: ['objective-c', 'objc']}, {name: 'Objective-C++', mime: 'text/x-objectivec++', mode: 'clike', ext: ['mm'], alias: ['objective-c++', 'objc++']}, {name: 'OCaml', mime: 'text/x-ocaml', mode: 'mllike', ext: ['ml', 'mli', 'mll', 'mly']}, {name: 'Octave', mime: 'text/x-octave', mode: 'octave', ext: ['m']}, {name: 'Oz', mime: 'text/x-oz', mode: 'oz', ext: ['oz']}, {name: 'Pascal', mime: 'text/x-pascal', mode: 'pascal', ext: ['p', 'pas']}, {name: 'PEG.js', mime: 'null', mode: 'pegjs', ext: ['jsonld']}, {name: 'Perl', mime: 'text/x-perl', mode: 'perl', ext: ['pl', 'pm']}, {name: 'PHP', mimes: ['text/x-php', 'application/x-httpd-php', 'application/x-httpd-php-open'], mode: 'php', ext: ['php', 'php3', 'php4', 'php5', 'php7', 'phtml']}, {name: 'Pig', mime: 'text/x-pig', mode: 'pig', ext: ['pig']}, {name: 'Plain Text', mime: 'text/plain', mode: 'null', ext: ['txt', 'text', 'conf', 'def', 'list', 'log']}, {name: 'PLSQL', mime: 'text/x-plsql', mode: 'sql', ext: ['pls']}, {name: 'PostgreSQL', mime: 'text/x-pgsql', mode: 'sql'}, {name: 'PowerShell', mime: 'application/x-powershell', mode: 'powershell', ext: ['ps1', 'psd1', 'psm1']}, {name: 'Properties files', mime: 'text/x-properties', mode: 'properties', ext: ['properties', 'ini', 'in'], alias: ['ini', 'properties']}, {name: 'ProtoBuf', mime: 'text/x-protobuf', mode: 'protobuf', ext: ['proto']}, {name: 'Python', mime: 'text/x-python', mode: 'python', ext: ['BUILD', 'bzl', 'py', 'pyw'], file: /^(BUCK|BUILD)$/}, {name: 'Puppet', mime: 'text/x-puppet', mode: 'puppet', ext: ['pp']}, {name: 'Q', mime: 'text/x-q', mode: 'q', ext: ['q']}, {name: 'R', mime: 'text/x-rsrc', mode: 'r', ext: ['r', 'R'], alias: ['rscript']}, {name: 'reStructuredText', mime: 'text/x-rst', mode: 'rst', ext: ['rst'], alias: ['rst']}, {name: 'RPM Changes', mime: 'text/x-rpm-changes', mode: 'rpm'}, {name: 'RPM Spec', mime: 'text/x-rpm-spec', mode: 'rpm', ext: ['spec']}, {name: 'Ruby', mime: 'text/x-ruby', mode: 'ruby', ext: ['rb'], alias: ['jruby', 'macruby', 'rake', 'rb', 'rbx']}, {name: 'Rust', mime: 'text/x-rustsrc', mode: 'rust', ext: ['rs']}, {name: 'SAS', mime: 'text/x-sas', mode: 'sas', ext: ['sas']}, {name: 'Sass', mime: 'text/x-sass', mode: 'sass', ext: ['sass']}, {name: 'Scala', mime: 'text/x-scala', mode: 'clike', ext: ['scala']}, {name: 'Scheme', mime: 'text/x-scheme', mode: 'scheme', ext: ['scm', 'ss']}, {name: 'SCSS', mime: 'text/x-scss', mode: 'css', ext: ['scss']}, {name: 'Shell', mimes: ['text/x-sh', 'application/x-sh'], mode: 'shell', ext: ['sh', 'ksh', 'bash'], alias: ['bash', 'sh', 'zsh'], file: /^PKGBUILD$/}, {name: 'Sieve', mime: 'application/sieve', mode: 'sieve', ext: ['siv', 'sieve']}, {name: 'Slim', mimes: ['text/x-slim', 'application/x-slim'], mode: 'slim', ext: ['slim']}, {name: 'Smalltalk', mime: 'text/x-stsrc', mode: 'smalltalk', ext: ['st']}, {name: 'Smarty', mime: 'text/x-smarty', mode: 'smarty', ext: ['tpl']}, {name: 'Solr', mime: 'text/x-solr', mode: 'solr'}, {name: 'SML', mime: 'text/x-sml', mode: 'mllike', ext: ['sml', 'sig', 'fun', 'smackspec']}, {name: 'Soy', mime: 'text/x-soy', mode: 'soy', ext: ['soy'], alias: ['closure template']}, {name: 'SPARQL', mime: 'application/sparql-query', mode: 'sparql', ext: ['rq', 'sparql'], alias: ['sparul']}, {name: 'Spreadsheet', mime: 'text/x-spreadsheet', mode: 'spreadsheet', alias: ['excel', 'formula']}, {name: 'SQL', mime: 'text/x-sql', mode: 'sql', ext: ['sql']}, {name: 'SQLite', mime: 'text/x-sqlite', mode: 'sql'}, {name: 'Squirrel', mime: 'text/x-squirrel', mode: 'clike', ext: ['nut']}, {name: 'Stylus', mime: 'text/x-styl', mode: 'stylus', ext: ['styl']}, {name: 'Swift', mime: 'text/x-swift', mode: 'swift', ext: ['swift']}, {name: 'sTeX', mime: 'text/x-stex', mode: 'stex'}, {name: 'LaTeX', mime: 'text/x-latex', mode: 'stex', ext: ['text', 'ltx', 'tex'], alias: ['tex']}, {name: 'SystemVerilog', mime: 'text/x-systemverilog', mode: 'verilog', ext: ['v', 'sv', 'svh']}, {name: 'Tcl', mime: 'text/x-tcl', mode: 'tcl', ext: ['tcl']}, {name: 'Textile', mime: 'text/x-textile', mode: 'textile', ext: ['textile']}, {name: 'TiddlyWiki', mime: 'text/x-tiddlywiki', mode: 'tiddlywiki'}, {name: 'Tiki wiki', mime: 'text/tiki', mode: 'tiki'}, {name: 'TOML', mime: 'text/x-toml', mode: 'toml', ext: ['toml']}, {name: 'Tornado', mime: 'text/x-tornado', mode: 'tornado'}, {name: 'troff', mime: 'text/troff', mode: 'troff', ext: ['1', '2', '3', '4', '5', '6', '7', '8', '9']}, {name: 'TTCN', mime: 'text/x-ttcn', mode: 'ttcn', ext: ['ttcn', 'ttcn3', 'ttcnpp']}, {name: 'TTCN_CFG', mime: 'text/x-ttcn-cfg', mode: 'ttcn-cfg', ext: ['cfg']}, {name: 'Turtle', mime: 'text/turtle', mode: 'turtle', ext: ['ttl']}, {name: 'TypeScript', mime: 'application/typescript', mode: 'javascript', ext: ['ts'], alias: ['ts']}, {name: 'TypeScript-JSX', mime: 'text/typescript-jsx', mode: 'jsx', ext: ['tsx'], alias: ['tsx']}, {name: 'Twig', mime: 'text/x-twig', mode: 'twig'}, {name: 'Web IDL', mime: 'text/x-webidl', mode: 'webidl', ext: ['webidl']}, {name: 'VB.NET', mime: 'text/x-vb', mode: 'vb', ext: ['vb']}, {name: 'VBScript', mime: 'text/vbscript', mode: 'vbscript', ext: ['vbs']}, {name: 'Velocity', mime: 'text/velocity', mode: 'velocity', ext: ['vtl']}, {name: 'Verilog', mime: 'text/x-verilog', mode: 'verilog', ext: ['v']}, {name: 'VHDL', mime: 'text/x-vhdl', mode: 'vhdl', ext: ['vhd', 'vhdl']}, {name: 'Vue.js Component', mimes: ['script/x-vue', 'text/x-vue'], mode: 'vue', ext: ['vue']}, {name: 'XML', mimes: ['application/xml', 'text/xml'], mode: 'xml', ext: ['xml', 'xsl', 'xsd', 'svg'], alias: ['rss', 'wsdl', 'xsd']}, {name: 'XQuery', mime: 'application/xquery', mode: 'xquery', ext: ['xy', 'xquery']}, {name: 'Yacas', mime: 'text/x-yacas', mode: 'yacas', ext: ['ys']}, {name: 'YAML', mimes: ['text/x-yaml', 'text/yaml'], mode: 'yaml', ext: ['yaml', 'yml'], alias: ['yml']}, {name: 'Z80', mime: 'text/x-z80', mode: 'z80', ext: ['z80']}, {name: 'mscgen', mime: 'text/x-mscgen', mode: 'mscgen', ext: ['mscgen', 'mscin', 'msc']}, {name: 'xu', mime: 'text/x-xu', mode: 'mscgen', ext: ['xu']}, {name: 'msgenny', mime: 'text/x-msgenny', mode: 'mscgen', ext: ['msgenny']}, {name: 'WebAssembly', mime: 'text/webassembly', mode: 'wast', ext: ['wat', 'wast']}]; for (let t=0; t<e.modeInfo.length; t++) {
        const n=e.modeInfo[t]; n.mimes&&(n.mime=n.mimes[0]);
      }e.findModeByMIME=function(t) {
        t=t.toLowerCase(); for (let n=0; n<e.modeInfo.length; n++) {
          const r=e.modeInfo[n]; if (r.mime==t) return r; if (r.mimes) for (let i=0; i<r.mimes.length; i++) if (r.mimes[i]==t) return r;
        } return /\+xml$/.test(t)?e.findModeByMIME('application/xml'):/\+json$/.test(t)?e.findModeByMIME('application/json'):void 0;
      }, e.findModeByExtension=function(t) {
        t=t.toLowerCase(); for (let n=0; n<e.modeInfo.length; n++) {
          const r=e.modeInfo[n]; if (r.ext) for (let i=0; i<r.ext.length; i++) if (r.ext[i]==t) return r;
        }
      }, e.findModeByFileName=function(t) {
        for (let n=0; n<e.modeInfo.length; n++) {
          const r=e.modeInfo[n]; if (r.file&&r.file.test(t)) return r;
        } const i=t.lastIndexOf('.'); const o=i>-1&&t.substring(i+1, t.length); if (o) return e.findModeByExtension(o);
      }, e.findModeByName=function(t) {
        t=t.toLowerCase(); for (let n=0; n<e.modeInfo.length; n++) {
          const r=e.modeInfo[n]; if (r.name.toLowerCase()==t) return r; if (r.alias) for (let i=0; i<r.alias.length; i++) if (r.alias[i].toLowerCase()==t) return r;
        }
      };
    }(n(631));
  }, 131: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('nginx', (function(e) {
        function t(e) {
          for (var t={}, n=e.split(' '), r=0; r<n.length; ++r)t[n[r]]=!0; return t;
        } let n; const r=t('break return rewrite set accept_mutex accept_mutex_delay access_log add_after_body add_before_body add_header addition_types aio alias allow ancient_browser ancient_browser_value auth_basic auth_basic_user_file auth_http auth_http_header auth_http_timeout autoindex autoindex_exact_size autoindex_localtime charset charset_types client_body_buffer_size client_body_in_file_only client_body_in_single_buffer client_body_temp_path client_body_timeout client_header_buffer_size client_header_timeout client_max_body_size connection_pool_size create_full_put_path daemon dav_access dav_methods debug_connection debug_points default_type degradation degrade deny devpoll_changes devpoll_events directio directio_alignment empty_gif env epoll_events error_log eventport_events expires fastcgi_bind fastcgi_buffer_size fastcgi_buffers fastcgi_busy_buffers_size fastcgi_cache fastcgi_cache_key fastcgi_cache_methods fastcgi_cache_min_uses fastcgi_cache_path fastcgi_cache_use_stale fastcgi_cache_valid fastcgi_catch_stderr fastcgi_connect_timeout fastcgi_hide_header fastcgi_ignore_client_abort fastcgi_ignore_headers fastcgi_index fastcgi_intercept_errors fastcgi_max_temp_file_size fastcgi_next_upstream fastcgi_param fastcgi_pass_header fastcgi_pass_request_body fastcgi_pass_request_headers fastcgi_read_timeout fastcgi_send_lowat fastcgi_send_timeout fastcgi_split_path_info fastcgi_store fastcgi_store_access fastcgi_temp_file_write_size fastcgi_temp_path fastcgi_upstream_fail_timeout fastcgi_upstream_max_fails flv geoip_city geoip_country google_perftools_profiles gzip gzip_buffers gzip_comp_level gzip_disable gzip_hash gzip_http_version gzip_min_length gzip_no_buffer gzip_proxied gzip_static gzip_types gzip_vary gzip_window if_modified_since ignore_invalid_headers image_filter image_filter_buffer image_filter_jpeg_quality image_filter_transparency imap_auth imap_capabilities imap_client_buffer index ip_hash keepalive_requests keepalive_timeout kqueue_changes kqueue_events large_client_header_buffers limit_conn limit_conn_log_level limit_rate limit_rate_after limit_req limit_req_log_level limit_req_zone limit_zone lingering_time lingering_timeout lock_file log_format log_not_found log_subrequest map_hash_bucket_size map_hash_max_size master_process memcached_bind memcached_buffer_size memcached_connect_timeout memcached_next_upstream memcached_read_timeout memcached_send_timeout memcached_upstream_fail_timeout memcached_upstream_max_fails merge_slashes min_delete_depth modern_browser modern_browser_value msie_padding msie_refresh multi_accept open_file_cache open_file_cache_errors open_file_cache_events open_file_cache_min_uses open_file_cache_valid open_log_file_cache output_buffers override_charset perl perl_modules perl_require perl_set pid pop3_auth pop3_capabilities port_in_redirect postpone_gzipping postpone_output protocol proxy proxy_bind proxy_buffer proxy_buffer_size proxy_buffering proxy_buffers proxy_busy_buffers_size proxy_cache proxy_cache_key proxy_cache_methods proxy_cache_min_uses proxy_cache_path proxy_cache_use_stale proxy_cache_valid proxy_connect_timeout proxy_headers_hash_bucket_size proxy_headers_hash_max_size proxy_hide_header proxy_ignore_client_abort proxy_ignore_headers proxy_intercept_errors proxy_max_temp_file_size proxy_method proxy_next_upstream proxy_pass_error_message proxy_pass_header proxy_pass_request_body proxy_pass_request_headers proxy_read_timeout proxy_redirect proxy_send_lowat proxy_send_timeout proxy_set_body proxy_set_header proxy_ssl_session_reuse proxy_store proxy_store_access proxy_temp_file_write_size proxy_temp_path proxy_timeout proxy_upstream_fail_timeout proxy_upstream_max_fails random_index read_ahead real_ip_header recursive_error_pages request_pool_size reset_timedout_connection resolver resolver_timeout rewrite_log rtsig_overflow_events rtsig_overflow_test rtsig_overflow_threshold rtsig_signo satisfy secure_link_secret send_lowat send_timeout sendfile sendfile_max_chunk server_name_in_redirect server_names_hash_bucket_size server_names_hash_max_size server_tokens set_real_ip_from smtp_auth smtp_capabilities smtp_client_buffer smtp_greeting_delay so_keepalive source_charset ssi ssi_ignore_recycled_buffers ssi_min_file_chunk ssi_silent_errors ssi_types ssi_value_length ssl ssl_certificate ssl_certificate_key ssl_ciphers ssl_client_certificate ssl_crl ssl_dhparam ssl_engine ssl_prefer_server_ciphers ssl_protocols ssl_session_cache ssl_session_timeout ssl_verify_client ssl_verify_depth starttls stub_status sub_filter sub_filter_once sub_filter_types tcp_nodelay tcp_nopush thread_stack_size timeout timer_resolution types_hash_bucket_size types_hash_max_size underscores_in_headers uninitialized_variable_warn use user userid userid_domain userid_expires userid_mark userid_name userid_p3p userid_path userid_service valid_referers variables_hash_bucket_size variables_hash_max_size worker_connections worker_cpu_affinity worker_priority worker_processes worker_rlimit_core worker_rlimit_nofile worker_rlimit_sigpending worker_threads working_directory xclient xml_entities xslt_stylesheet xslt_typesdrew@li229-23'); const i=t('http mail events server types location upstream charset_map limit_except if geo map'); const o=t('include root server server_name listen internal proxy_pass memcached_pass fastcgi_pass try_files'); const s=e.indentUnit; function a(e, t) {
          return n=t, e;
        } function l(e, t) {
          e.eatWhile(/[\w\$_]/); const n=e.current(); if (r.propertyIsEnumerable(n)) return 'keyword'; if (i.propertyIsEnumerable(n)) return 'variable-2'; if (o.propertyIsEnumerable(n)) return 'string-2'; let s; const d=e.next(); return '@'==d?(e.eatWhile(/[\w\\\-]/), a('meta', e.current())):'/'==d&&e.eat('*')?(t.tokenize=c, c(e, t)):'<'==d&&e.eat('!')?(t.tokenize=u, u(e, t)):'='!=d?'~'!=d&&'|'!=d||!e.eat('=')?'"'==d||'\''==d?(t.tokenize=(s=d, function(e, t) {
            for (var n, r=!1; null!=(n=e.next())&&(n!=s||r);)r=!r&&'\\'==n; return r||(t.tokenize=l), a('string', 'string');
          }), t.tokenize(e, t)):'#'==d?(e.skipToEnd(), a('comment', 'comment')):'!'==d?(e.match(/^\s*\w*/), a('keyword', 'important')):/\d/.test(d)?(e.eatWhile(/[\w.%]/), a('number', 'unit')):/[,.+>*\/]/.test(d)?a(null, 'select-op'):/[;{}:\[\]]/.test(d)?a(null, d):(e.eatWhile(/[\w\\\-]/), a('variable', 'variable')):a(null, 'compare'):void a(null, 'compare');
        } function c(e, t) {
          for (var n, r=!1; null!=(n=e.next());) {
            if (r&&'/'==n) {
              t.tokenize=l; break;
            }r='*'==n;
          } return a('comment', 'comment');
        } function u(e, t) {
          for (var n, r=0; null!=(n=e.next());) {
            if (r>=2&&'>'==n) {
              t.tokenize=l; break;
            }r='-'==n?r+1:0;
          } return a('comment', 'comment');
        } return {startState: function(e) {
          return {tokenize: l, baseIndent: e||0, stack: []};
        }, token: function(e, t) {
          if (e.eatSpace()) return null; n=null; let r=t.tokenize(e, t); const i=t.stack[t.stack.length-1]; return 'hash'==n&&'rule'==i?r='atom':'variable'==r&&('rule'==i?r='number':i&&'@media{'!=i||(r='tag')), 'rule'==i&&/^[\{\};]$/.test(n)&&t.stack.pop(), '{'==n?'@media'==i?t.stack[t.stack.length-1]='@media{':t.stack.push('{'):'}'==n?t.stack.pop():'@media'==n?t.stack.push('@media'):'{'==i&&'comment'!=n&&t.stack.push('rule'), r;
        }, indent: function(e, t) {
          let n=e.stack.length; return /^\}/.test(t)&&(n-='rule'==e.stack[e.stack.length-1]?2:1), e.baseIndent+n*s;
        }, electricChars: '}'};
      })), e.defineMIME('text/x-nginx-conf', 'nginx');
    }(n(631));
  }, 702: (e, t, n)=>{
    !function(e) {
      'use strict'; function t(e) {
        for (var t={}, n=e.split(' '), r=0; r<n.length; ++r)t[n[r]]=!0; return t;
      } function n(e, t, i) {
        return 0==e.length?r(t):function(o, s) {
          for (let a=e[0], l=0; l<a.length; l++) if (o.match(a[l][0])) return s.tokenize=n(e.slice(1), t), a[l][1]; return s.tokenize=r(t, i), 'string';
        };
      } function r(e, t) {
        return function(r, i) {
          return function(e, t, r, i) {
            if (!1!==i&&e.match('${', !1)||e.match('{$', !1)) return t.tokenize=null, 'string'; if (!1!==i&&e.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*/)) return e.match('[', !1)&&(t.tokenize=n([[['[', null]], [[/\d[\w\.]*/, 'number'], [/\$[a-zA-Z_][a-zA-Z0-9_]*/, 'variable-2'], [/[\w\$]+/, 'variable']], [[']', null]]], r, i)), e.match(/\-\>\w/, !1)&&(t.tokenize=n([[['->', null]], [[/[\w]+/, 'variable']]], r, i)), 'variable-2'; for (let o=!1; !e.eol()&&(o||!1===i||!e.match('{$', !1)&&!e.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, !1));) {
              if (!o&&e.match(r)) {
                t.tokenize=null, t.tokStack.pop(), t.tokStack.pop(); break;
              }o='\\'==e.next()&&!o;
            } return 'string';
          }(r, i, e, t);
        };
      } const i='abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent yield insteadof finally'; const o='true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__'; const s='func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents file_put_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists array_intersect_key array_combine array_column pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once json_decode json_encode json_last_error json_last_error_msg curl_close curl_copy_handle curl_errno curl_error curl_escape curl_exec curl_file_create curl_getinfo curl_init curl_multi_add_handle curl_multi_close curl_multi_exec curl_multi_getcontent curl_multi_info_read curl_multi_init curl_multi_remove_handle curl_multi_select curl_multi_setopt curl_multi_strerror curl_pause curl_reset curl_setopt_array curl_setopt curl_share_close curl_share_init curl_share_setopt curl_strerror curl_unescape curl_version mysqli_affected_rows mysqli_autocommit mysqli_change_user mysqli_character_set_name mysqli_close mysqli_commit mysqli_connect_errno mysqli_connect_error mysqli_connect mysqli_data_seek mysqli_debug mysqli_dump_debug_info mysqli_errno mysqli_error_list mysqli_error mysqli_fetch_all mysqli_fetch_array mysqli_fetch_assoc mysqli_fetch_field_direct mysqli_fetch_field mysqli_fetch_fields mysqli_fetch_lengths mysqli_fetch_object mysqli_fetch_row mysqli_field_count mysqli_field_seek mysqli_field_tell mysqli_free_result mysqli_get_charset mysqli_get_client_info mysqli_get_client_stats mysqli_get_client_version mysqli_get_connection_stats mysqli_get_host_info mysqli_get_proto_info mysqli_get_server_info mysqli_get_server_version mysqli_info mysqli_init mysqli_insert_id mysqli_kill mysqli_more_results mysqli_multi_query mysqli_next_result mysqli_num_fields mysqli_num_rows mysqli_options mysqli_ping mysqli_prepare mysqli_query mysqli_real_connect mysqli_real_escape_string mysqli_real_query mysqli_reap_async_query mysqli_refresh mysqli_rollback mysqli_select_db mysqli_set_charset mysqli_set_local_infile_default mysqli_set_local_infile_handler mysqli_sqlstate mysqli_ssl_set mysqli_stat mysqli_stmt_init mysqli_store_result mysqli_thread_id mysqli_thread_safe mysqli_use_result mysqli_warning_count'; e.registerHelper('hintWords', 'php', [i, o, s].join(' ').split(' ')), e.registerHelper('wordChars', 'php', /[\w$]/); const a={name: 'clike', helperType: 'php', keywords: t(i), blockKeywords: t('catch do else elseif for foreach if switch try while finally'), defKeywords: t('class function interface namespace trait'), atoms: t(o), builtin: t(s), multiLineStrings: !0, hooks: {'$': function(e) {
        return e.eatWhile(/[\w\$_]/), 'variable-2';
      }, '<': function(e, t) {
        let n; if (n=e.match(/<<\s*/)) {
          const i=e.eat(/['"]/); e.eatWhile(/[\w\.]/); const o=e.current().slice(n[0].length+(i?2:1)); if (i&&e.eat(i), o) return (t.tokStack||(t.tokStack=[])).push(o, 0), t.tokenize=r(o, '\''!=i), 'string';
        } return !1;
      }, '#': function(e) {
        for (;!e.eol()&&!e.match('?>', !1);)e.next(); return 'comment';
      }, '/': function(e) {
        if (e.eat('/')) {
          for (;!e.eol()&&!e.match('?>', !1);)e.next(); return 'comment';
        } return !1;
      }, '"': function(e, t) {
        return (t.tokStack||(t.tokStack=[])).push('"', 0), t.tokenize=r('"'), 'string';
      }, '{': function(e, t) {
        return t.tokStack&&t.tokStack.length&&t.tokStack[t.tokStack.length-1]++, !1;
      }, '}': function(e, t) {
        return t.tokStack&&t.tokStack.length>0&&!--t.tokStack[t.tokStack.length-1]&&(t.tokenize=r(t.tokStack[t.tokStack.length-2])), !1;
      }}}; e.defineMode('php', (function(t, n) {
        const r=e.getMode(t, n&&n.htmlMode||'text/html'); const i=e.getMode(t, a); return {startState: function() {
          const t=e.startState(r); const o=n.startOpen?e.startState(i):null; return {html: t, php: o, curMode: n.startOpen?i:r, curState: n.startOpen?o:t, pending: null};
        }, copyState: function(t) {
          let n; const o=t.html; const s=e.copyState(r, o); const a=t.php; const l=a&&e.copyState(i, a); return n=t.curMode==r?s:l, {html: s, php: l, curMode: t.curMode, curState: n, pending: t.pending};
        }, token: function(t, n) {
          const o=n.curMode==i; if (t.sol()&&n.pending&&'"'!=n.pending&&'\''!=n.pending&&(n.pending=null), o) return o&&null==n.php.tokenize&&t.match('?>')?(n.curMode=r, n.curState=n.html, n.php.context.prev||(n.php=null), 'meta'):i.token(t, n.curState); if (t.match(/^<\?\w*/)) return n.curMode=i, n.php||(n.php=e.startState(i, r.indent(n.html, '', ''))), n.curState=n.php, 'meta'; if ('"'==n.pending||'\''==n.pending) {
            for (;!t.eol()&&t.next()!=n.pending;);var s='string';
          } else n.pending&&t.pos<n.pending.end?(t.pos=n.pending.end, s=n.pending.style):s=r.token(t, n.curState); n.pending&&(n.pending=null); let a; const l=t.current(); const c=l.search(/<\?/); return -1!=c&&('string'==s&&(a=l.match(/[\'\"]$/))&&!/\?>/.test(l)?n.pending=a[0]:n.pending={end: t.pos, style: s}, t.backUp(l.length-c)), s;
        }, indent: function(e, t, n) {
          return e.curMode!=i&&/^\s*<\//.test(t)||e.curMode==i&&/^\?>/.test(t)?r.indent(e.html, t, n):e.curMode.indent(e.curState, t, n);
        }, blockCommentStart: '/*', blockCommentEnd: '*/', lineComment: '//', innerMode: function(e) {
          return {state: e.curState, mode: e.curMode};
        }};
      }), 'htmlmixed', 'clike'), e.defineMIME('application/x-httpd-php', 'php'), e.defineMIME('application/x-httpd-php-open', {name: 'php', startOpen: !0}), e.defineMIME('text/x-php', a);
    }(n(631), n(531), n(762));
  }, 354: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('pug', (function(t) {
        const n='keyword'; const r={'{': '}', '(': ')', '[': ']'}; const i=e.getMode(t, 'javascript'); function o() {
          this.javaScriptLine=!1, this.javaScriptLineExcludesColon=!1, this.javaScriptArguments=!1, this.javaScriptArgumentsDepth=0, this.isInterpolating=!1, this.interpolationNesting=0, this.jsState=e.startState(i), this.restOfLine='', this.isIncludeFiltered=!1, this.isEach=!1, this.lastTag='', this.scriptType='', this.isAttrs=!1, this.attrsNest=[], this.inAttributeName=!0, this.attributeIsType=!1, this.attrValue='', this.indentOf=1/0, this.indentToken='', this.innerMode=null, this.innerState=null, this.innerModeForLine=!1;
        } function s(e, t) {
          if (e.match('#{')) return t.isInterpolating=!0, t.interpolationNesting=0, 'punctuation';
        } function a(n, r) {
          let i; if (n.match(/^:([\w\-]+)/)) return t&&t.innerModes&&(i=t.innerModes(n.current().substring(1))), i||(i=n.current().substring(1)), 'string'==typeof i&&(i=e.getMode(t, i)), c(n, r, i), 'atom';
        } function l(t, n) {
          if (n.isAttrs) {
            if (r[t.peek()]&&n.attrsNest.push(r[t.peek()]), n.attrsNest[n.attrsNest.length-1]===t.peek())n.attrsNest.pop(); else if (t.eat(')')) return n.isAttrs=!1, 'punctuation'; if (n.inAttributeName&&t.match(/^[^=,\)!]+/)) return '='!==t.peek()&&'!'!==t.peek()||(n.inAttributeName=!1, n.jsState=e.startState(i), 'script'===n.lastTag&&'type'===t.current().trim().toLowerCase()?n.attributeIsType=!0:n.attributeIsType=!1), 'attribute'; const o=i.token(t, n.jsState); if (n.attributeIsType&&'string'===o&&(n.scriptType=t.current().toString()), 0===n.attrsNest.length&&('string'===o||'variable'===o||'keyword'===o)) {
              try {
                return Function('', 'var x '+n.attrValue.replace(/,\s*$/, '').replace(/^!/, '')), n.inAttributeName=!0, n.attrValue='', t.backUp(t.current().length), l(t, n);
              } catch (e) {}
            } return n.attrValue+=t.current(), o||!0;
          }
        } function c(n, r, i) {
          i=e.mimeModes[i]||i, i=t.innerModes&&t.innerModes(i)||i, i=e.mimeModes[i]||i, i=e.getMode(t, i), r.indentOf=n.indentation(), i&&'null'!==i.name?r.innerMode=i:r.indentToken='string';
        } function u(t, n, r) {
          if (t.indentation()>n.indentOf||n.innerModeForLine&&!t.sol()||r) {
            return n.innerMode?(n.innerState||(n.innerState=n.innerMode.startState?e.startState(n.innerMode, t.indentation()):{}), t.hideFirstChars(n.indentOf+2, (function() {
              return n.innerMode.token(t, n.innerState)||!0;
            }))):(t.skipToEnd(), n.indentToken);
          } t.sol()&&(n.indentOf=1/0, n.indentToken=null, n.innerMode=null, n.innerState=null);
        } return o.prototype.copy=function() {
          const t=new o; return t.javaScriptLine=this.javaScriptLine, t.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon, t.javaScriptArguments=this.javaScriptArguments, t.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth, t.isInterpolating=this.isInterpolating, t.interpolationNesting=this.interpolationNesting, t.jsState=e.copyState(i, this.jsState), t.innerMode=this.innerMode, this.innerMode&&this.innerState&&(t.innerState=e.copyState(this.innerMode, this.innerState)), t.restOfLine=this.restOfLine, t.isIncludeFiltered=this.isIncludeFiltered, t.isEach=this.isEach, t.lastTag=this.lastTag, t.scriptType=this.scriptType, t.isAttrs=this.isAttrs, t.attrsNest=this.attrsNest.slice(), t.inAttributeName=this.inAttributeName, t.attributeIsType=this.attributeIsType, t.attrValue=this.attrValue, t.indentOf=this.indentOf, t.indentToken=this.indentToken, t.innerModeForLine=this.innerModeForLine, t;
        }, {startState: function() {
          return new o;
        }, copyState: function(e) {
          return e.copy();
        }, token: function(e, t) {
          const r=u(e, t)||function(e, t) {
            if (e.sol()&&(t.restOfLine=''), t.restOfLine) {
              e.skipToEnd(); const n=t.restOfLine; return t.restOfLine='', n;
            }
          }(e, t)||function(e, t) {
            if (t.isInterpolating) {
              if ('}'===e.peek()) {
                if (t.interpolationNesting--, t.interpolationNesting<0) return e.next(), t.isInterpolating=!1, 'punctuation';
              } else '{'===e.peek()&&t.interpolationNesting++; return i.token(e, t.jsState)||!0;
            }
          }(e, t)||function(e, t) {
            if (t.isIncludeFiltered) {
              const n=a(e, t); return t.isIncludeFiltered=!1, t.restOfLine='string', n;
            }
          }(e, t)||function(e, t) {
            if (t.isEach) {
              if (e.match(/^ in\b/)) return t.javaScriptLine=!0, t.isEach=!1, n; if (e.sol()||e.eol())t.isEach=!1; else if (e.next()) {
                for (;!e.match(/^ in\b/, !1)&&e.next(););return 'variable';
              }
            }
          }(e, t)||l(e, t)||function(e, t) {
            if (e.sol()&&(t.javaScriptLine=!1, t.javaScriptLineExcludesColon=!1), t.javaScriptLine) {
              if (t.javaScriptLineExcludesColon&&':'===e.peek()) return t.javaScriptLine=!1, void(t.javaScriptLineExcludesColon=!1); const n=i.token(e, t.jsState); return e.eol()&&(t.javaScriptLine=!1), n||!0;
            }
          }(e, t)||function(e, t) {
            if (t.javaScriptArguments) return 0===t.javaScriptArgumentsDepth&&'('!==e.peek()?void(t.javaScriptArguments=!1):('('===e.peek()?t.javaScriptArgumentsDepth++:')'===e.peek()&&t.javaScriptArgumentsDepth--, 0===t.javaScriptArgumentsDepth?void(t.javaScriptArguments=!1):i.token(e, t.jsState)||!0);
          }(e, t)||function(e, t) {
            if (t.mixinCallAfter) return t.mixinCallAfter=!1, e.match(/^\( *[-\w]+ *=/, !1)||(t.javaScriptArguments=!0, t.javaScriptArgumentsDepth=0), !0;
          }(e, t)||function(e) {
            if (e.match(/^yield\b/)) return 'keyword';
          }(e)||function(e) {
            if (e.match(/^(?:doctype) *([^\n]+)?/)) return 'meta';
          }(e)||s(e, t)||function(e, t) {
            if (e.match(/^case\b/)) return t.javaScriptLine=!0, n;
          }(e, t)||function(e, t) {
            if (e.match(/^when\b/)) return t.javaScriptLine=!0, t.javaScriptLineExcludesColon=!0, n;
          }(e, t)||function(e) {
            if (e.match(/^default\b/)) return n;
          }(e)||function(e, t) {
            if (e.match(/^extends?\b/)) return t.restOfLine='string', n;
          }(e, t)||function(e, t) {
            if (e.match(/^append\b/)) return t.restOfLine='variable', n;
          }(e, t)||function(e, t) {
            if (e.match(/^prepend\b/)) return t.restOfLine='variable', n;
          }(e, t)||function(e, t) {
            if (e.match(/^block\b *(?:(prepend|append)\b)?/)) return t.restOfLine='variable', n;
          }(e, t)||function(e, t) {
            if (e.match(/^include\b/)) return t.restOfLine='string', n;
          }(e, t)||function(e, t) {
            if (e.match(/^include:([a-zA-Z0-9\-]+)/, !1)&&e.match('include')) return t.isIncludeFiltered=!0, n;
          }(e, t)||function(e, t) {
            if (e.match(/^mixin\b/)) return t.javaScriptLine=!0, n;
          }(e, t)||function(e, t) {
            return e.match(/^\+([-\w]+)/)?(e.match(/^\( *[-\w]+ *=/, !1)||(t.javaScriptArguments=!0, t.javaScriptArgumentsDepth=0), 'variable'):e.match(/^\+#{/, !1)?(e.next(), t.mixinCallAfter=!0, s(e, t)):void 0;
          }(e, t)||function(e, t) {
            if (e.match(/^(if|unless|else if|else)\b/)) return t.javaScriptLine=!0, n;
          }(e, t)||function(e, t) {
            if (e.match(/^(- *)?(each|for)\b/)) return t.isEach=!0, n;
          }(e, t)||function(e, t) {
            if (e.match(/^while\b/)) return t.javaScriptLine=!0, n;
          }(e, t)||function(e, t) {
            let n; if (n=e.match(/^(\w(?:[-:\w]*\w)?)\/?/)) return t.lastTag=n[1].toLowerCase(), 'script'===t.lastTag&&(t.scriptType='application/javascript'), 'tag';
          }(e, t)||a(e, t)||function(e, t) {
            if (e.match(/^(!?=|-)/)) return t.javaScriptLine=!0, 'punctuation';
          }(e, t)||function(e) {
            if (e.match(/^#([\w-]+)/)) return 'builtin';
          }(e)||function(e) {
            if (e.match(/^\.([\w-]+)/)) return 'qualifier';
          }(e)||function(e, t) {
            if ('('==e.peek()) return e.next(), t.isAttrs=!0, t.attrsNest=[], t.inAttributeName=!0, t.attrValue='', t.attributeIsType=!1, 'punctuation';
          }(e, t)||function(e, t) {
            if (e.match(/^&attributes\b/)) return t.javaScriptArguments=!0, t.javaScriptArgumentsDepth=0, 'keyword';
          }(e, t)||function(e) {
            if (e.sol()&&e.eatSpace()) return 'indent';
          }(e)||function(e, t) {
            return e.match(/^(?:\| ?| )([^\n]+)/)?'string':e.match(/^(<[^\n]*)/, !1)?(c(e, t, 'htmlmixed'), t.innerModeForLine=!0, u(e, t, !0)):void 0;
          }(e, t)||function(e, t) {
            if (e.match(/^ *\/\/(-)?([^\n]*)/)) return t.indentOf=e.indentation(), t.indentToken='comment', 'comment';
          }(e, t)||function(e) {
            if (e.match(/^: */)) return 'colon';
          }(e)||function(e, t) {
            if (e.eat('.')) {
              let n=null; return 'script'===t.lastTag&&-1!=t.scriptType.toLowerCase().indexOf('javascript')?n=t.scriptType.toLowerCase().replace(/"|'/g, ''):'style'===t.lastTag&&(n='css'), c(e, t, n), 'dot';
            }
          }(e, t)||function(e) {
            return e.next(), null;
          }(e); return !0===r?null:r;
        }};
      }), 'javascript', 'css', 'htmlmixed'), e.defineMIME('text/x-pug', 'pug'), e.defineMIME('text/x-jade', 'pug');
    }(n(631), n(876), n(629), n(531));
  }, 149: (e, t, n)=>{
    !function(e) {
      'use strict'; e.defineMode('shell', (function() {
        const t={}; function n(e, n) {
          for (let r=0; r<n.length; r++)t[n[r]]=e;
        } const r=['true', 'false']; const i=['if', 'then', 'do', 'else', 'elif', 'while', 'until', 'for', 'in', 'esac', 'fi', 'fin', 'fil', 'done', 'exit', 'set', 'unset', 'export', 'function']; const o=['ab', 'awk', 'bash', 'beep', 'cat', 'cc', 'cd', 'chown', 'chmod', 'chroot', 'clear', 'cp', 'curl', 'cut', 'diff', 'echo', 'find', 'gawk', 'gcc', 'get', 'git', 'grep', 'hg', 'kill', 'killall', 'ln', 'ls', 'make', 'mkdir', 'openssl', 'mv', 'nc', 'nl', 'node', 'npm', 'ping', 'ps', 'restart', 'rm', 'rmdir', 'sed', 'service', 'sh', 'shopt', 'shred', 'source', 'sort', 'sleep', 'ssh', 'start', 'stop', 'su', 'sudo', 'svn', 'tee', 'telnet', 'top', 'touch', 'vi', 'vim', 'wall', 'wc', 'wget', 'who', 'write', 'yes', 'zsh']; function s(e, n) {
          if (e.eatSpace()) return null; let r; const i=e.sol(); const o=e.next(); if ('\\'===o) return e.next(), null; if ('\''===o||'"'===o||'`'===o) return n.tokens.unshift(a(o, '`'===o?'quote':'string')), u(e, n); if ('#'===o) return i&&e.eat('!')?(e.skipToEnd(), 'meta'):(e.skipToEnd(), 'comment'); if ('$'===o) return n.tokens.unshift(c), u(e, n); if ('+'===o||'='===o) return 'operator'; if ('-'===o) return e.eat('-'), e.eatWhile(/\w/), 'attribute'; if ('<'==o) {
            const s=e.match(/^<-?\s+(.*)/); if (s) {
              return n.tokens.unshift((r=s[1], function(e, t) {
                return e.sol()&&e.string==r&&t.tokens.shift(), e.skipToEnd(), 'string-2';
              })), 'string-2';
            }
          } if (/\d/.test(o)&&(e.eatWhile(/\d/), e.eol()||!/\w/.test(e.peek()))) return 'number'; e.eatWhile(/[\w-]/); const l=e.current(); return '='===e.peek()&&/\w+/.test(l)?'def':t.hasOwnProperty(l)?t[l]:null;
        } function a(e, t) {
          const n='('==e?')':'{'==e?'}':e; return function(r, i) {
            for (var o, s=!1; null!=(o=r.next());) {
              if (o===n&&!s) {
                i.tokens.shift(); break;
              } if ('$'===o&&!s&&'\''!==e&&r.peek()!=n) {
                s=!0, r.backUp(1), i.tokens.unshift(c); break;
              } if (!s&&e!==n&&o===e) return i.tokens.unshift(a(e, t)), u(r, i); if (!s&&/['"]/.test(o)&&!/['"]/.test(e)) {
                i.tokens.unshift(l(o, 'string')), r.backUp(1); break;
              }s=!s&&'\\'===o;
            } return t;
          };
        } function l(e, t) {
          return function(n, r) {
            return r.tokens[0]=a(e, t), n.next(), u(n, r);
          };
        }e.registerHelper('hintWords', 'shell', r.concat(i, o)), n('atom', r), n('keyword', i), n('builtin', o); var c=function(e, t) {
          t.tokens.length>1&&e.eat('$'); const n=e.next(); return /['"({]/.test(n)?(t.tokens[0]=a(n, '('==n?'quote':'{'==n?'def':'string'), u(e, t)):(/\d/.test(n)||e.eatWhile(/\w/), t.tokens.shift(), 'def');
        }; function u(e, t) {
          return (t.tokens[0]||s)(e, t);
        } return {startState: function() {
          return {tokens: []};
        }, token: function(e, t) {
          return u(e, t);
        }, closeBrackets: '()[]{}\'\'""``', lineComment: '#', fold: 'brace'};
      })), e.defineMIME('text/x-sh', 'shell'), e.defineMIME('application/x-sh', 'shell');
    }(n(631));
  }, 86: (e, t, n)=>{
    !function(e) {
      'use strict'; function t(e) {
        for (var t; null!=(t=e.next());) if ('`'==t&&!e.eat('`')) return 'variable-2'; return e.backUp(e.current().length-1), e.eatWhile(/\w/)?'variable-2':null;
      } function n(e) {
        return e.eat('@')&&(e.match(/^session\./), e.match(/^local\./), e.match(/^global\./)), e.eat('\'')?(e.match(/^.*'/), 'variable-2'):e.eat('"')?(e.match(/^.*"/), 'variable-2'):e.eat('`')?(e.match(/^.*`/), 'variable-2'):e.match(/^[0-9a-zA-Z$\.\_]+/)?'variable-2':null;
      } function r(e) {
        return e.eat('N')?'atom':e.match(/^[a-zA-Z.#!?]/)?'variable-2':null;
      }e.defineMode('sql', (function(t, n) {
        const r=n.client||{}; const a=n.atoms||{false: !0, true: !0, null: !0}; const l=n.builtin||o(s); const c=n.keywords||o(i); const u=n.operatorChars||/^[*+\-%<>!=&|~^\/]/; const d=n.support||{}; const h=n.hooks||{}; const p=n.dateSQL||{date: !0, time: !0, timestamp: !0}; const f=!1!==n.backslashStringEscapes; const m=n.brackets||/^[\{}\(\)\[\]]/; const g=n.punctuation||/^[;.,:]/; function v(e, t) {
          const n=e.next(); if (h[n]) {
            const i=h[n](e, t); if (!1!==i) return i;
          } if (d.hexNumber&&('0'==n&&e.match(/^[xX][0-9a-fA-F]+/)||('x'==n||'X'==n)&&e.match(/^'[0-9a-fA-F]+'/))) return 'number'; if (d.binaryNumber&&(('b'==n||'B'==n)&&e.match(/^'[01]+'/)||'0'==n&&e.match(/^b[01]+/))) return 'number'; if (n.charCodeAt(0)>47&&n.charCodeAt(0)<58) return e.match(/^[0-9]*(\.[0-9]+)?([eE][-+]?[0-9]+)?/), d.decimallessFloat&&e.match(/^\.(?!\.)/), 'number'; if ('?'==n&&(e.eatSpace()||e.eol()||e.eat(';'))) return 'variable-3'; if ('\''==n||'"'==n&&d.doubleQuote) return t.tokenize=y(n), t.tokenize(e, t); if ((d.nCharCast&&('n'==n||'N'==n)||d.charsetCast&&'_'==n&&e.match(/[a-z][a-z0-9]*/i))&&('\''==e.peek()||'"'==e.peek())) return 'keyword'; if (d.escapeConstant&&('e'==n||'E'==n)&&('\''==e.peek()||'"'==e.peek()&&d.doubleQuote)) {
            return t.tokenize=function(e, t) {
              return (t.tokenize=y(e.next(), !0))(e, t);
            }, 'keyword';
          } if (d.commentSlashSlash&&'/'==n&&e.eat('/')) return e.skipToEnd(), 'comment'; if (d.commentHash&&'#'==n||'-'==n&&e.eat('-')&&(!d.commentSpaceRequired||e.eat(' '))) return e.skipToEnd(), 'comment'; if ('/'==n&&e.eat('*')) return t.tokenize=b(1), t.tokenize(e, t); if ('.'!=n) {
            if (u.test(n)) return e.eatWhile(u), 'operator'; if (m.test(n)) return 'bracket'; if (g.test(n)) return e.eatWhile(g), 'punctuation'; if ('{'==n&&(e.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/)||e.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))) return 'number'; e.eatWhile(/^[_\w\d]/); const o=e.current().toLowerCase(); return p.hasOwnProperty(o)&&(e.match(/^( )+'[^']*'/)||e.match(/^( )+"[^"]*"/))?'number':a.hasOwnProperty(o)?'atom':l.hasOwnProperty(o)?'builtin':c.hasOwnProperty(o)?'keyword':r.hasOwnProperty(o)?'string-2':null;
          } return d.zerolessFloat&&e.match(/^(?:\d+(?:e[+-]?\d+)?)/i)?'number':e.match(/^\.+/)?null:d.ODBCdotTable&&e.match(/^[\w\d_$#]+/)?'variable-2':void 0;
        } function y(e, t) {
          return function(n, r) {
            for (var i, o=!1; null!=(i=n.next());) {
              if (i==e&&!o) {
                r.tokenize=v; break;
              }o=(f||t)&&!o&&'\\'==i;
            } return 'string';
          };
        } function b(e) {
          return function(t, n) {
            const r=t.match(/^.*?(\/\*|\*\/)/); return r?'/*'==r[1]?n.tokenize=b(e+1):n.tokenize=e>1?b(e-1):v:t.skipToEnd(), 'comment';
          };
        } function w(e, t, n) {
          t.context={prev: t.context, indent: e.indentation(), col: e.column(), type: n};
        } return {startState: function() {
          return {tokenize: v, context: null};
        }, token: function(e, t) {
          if (e.sol()&&t.context&&null==t.context.align&&(t.context.align=!1), t.tokenize==v&&e.eatSpace()) return null; const n=t.tokenize(e, t); if ('comment'==n) return n; t.context&&null==t.context.align&&(t.context.align=!0); const r=e.current(); return '('==r?w(e, t, ')'):'['==r?w(e, t, ']'):t.context&&t.context.type==r&&function(e) {
            e.indent=e.context.indent, e.context=e.context.prev;
          }(t), n;
        }, indent: function(n, r) {
          const i=n.context; if (!i) return e.Pass; const o=r.charAt(0)==i.type; return i.align?i.col+(o?0:1):i.indent+(o?0:t.indentUnit);
        }, blockCommentStart: '/*', blockCommentEnd: '*/', lineComment: d.commentSlashSlash?'//':d.commentHash?'#':'--', closeBrackets: '()[]{}\'\'""``'};
      })); var i='alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit '; function o(e) {
        for (var t={}, n=e.split(' '), r=0; r<n.length; ++r)t[n[r]]=!0; return t;
      } var s='bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric'; e.defineMIME('text/x-sql', {name: 'sql', keywords: o(i+'begin'), builtin: o(s), atoms: o('false true null unknown'), dateSQL: o('date time timestamp'), support: o('ODBCdotTable doubleQuote binaryNumber hexNumber')}), e.defineMIME('text/x-mssql', {name: 'sql', client: o('$partition binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id'), keywords: o(i+'begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx updlock with'), builtin: o('bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table '), atoms: o('is not null like and or in left right between inner outer join all any some cross unpivot pivot exists'), operatorChars: /^[*+\-%<>!=^\&|\/]/, brackets: /^[\{}\(\)]/, punctuation: /^[;.,:/]/, backslashStringEscapes: !1, dateSQL: o('date datetimeoffset datetime2 smalldatetime datetime time'), hooks: {'@': n}}), e.defineMIME('text/x-mysql', {name: 'sql', client: o('charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee'), keywords: o(i+'accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group group_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat'), builtin: o('bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric'), atoms: o('false true null unknown'), operatorChars: /^[*+\-%<>!=&|^]/, dateSQL: o('date time timestamp'), support: o('ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired'), hooks: {'@': n, '`': t, '\\': r}}), e.defineMIME('text/x-mariadb', {name: 'sql', client: o('charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee'), keywords: o(i+'accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat'), builtin: o('bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric'), atoms: o('false true null unknown'), operatorChars: /^[*+\-%<>!=&|^]/, dateSQL: o('date time timestamp'), support: o('ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired'), hooks: {'@': n, '`': t, '\\': r}}), e.defineMIME('text/x-sqlite', {name: 'sql', client: o('auth backup bail binary changes check clone databases dbinfo dump echo eqp exit explain fullschema headers help import imposter indexes iotrace limit lint load log mode nullvalue once open output print prompt quit read restore save scanstats schema separator session shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width'), keywords: o(i+'abort action add after all analyze attach autoincrement before begin cascade case cast check collate column commit conflict constraint cross current_date current_time current_timestamp database default deferrable deferred detach each else end escape except exclusive exists explain fail for foreign full glob if ignore immediate index indexed initially inner instead intersect isnull key left limit match natural no notnull null of offset outer plan pragma primary query raise recursive references regexp reindex release rename replace restrict right rollback row savepoint temp temporary then to transaction trigger unique using vacuum view virtual when with without'), builtin: o('bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text clob bigint int int2 int8 integer float double char varchar date datetime year unsigned signed numeric real'), atoms: o('null current_date current_time current_timestamp'), operatorChars: /^[*+\-%<>!=&|/~]/, dateSQL: o('date time timestamp datetime'), support: o('decimallessFloat zerolessFloat'), identifierQuote: '"', hooks: {'@': n, ':': n, '?': n, '$': n, '"': function(e) {
        for (var t; null!=(t=e.next());) if ('"'==t&&!e.eat('"')) return 'variable-2'; return e.backUp(e.current().length-1), e.eatWhile(/\w/)?'variable-2':null;
      }, '`': t}}), e.defineMIME('text/x-cassandra', {name: 'sql', client: {}, keywords: o('add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime'), builtin: o('ascii bigint blob boolean counter decimal double float frozen inet int list map static text timestamp timeuuid tuple uuid varchar varint'), atoms: o('false true infinity NaN'), operatorChars: /^[<>=]/, dateSQL: {}, support: o('commentSlashSlash decimallessFloat'), hooks: {}}), e.defineMIME('text/x-plsql', {name: 'sql', client: o('appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap'), keywords: o('abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work'), builtin: o('abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least length lengthb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml'), operatorChars: /^[*\/+\-%<>!=~]/, dateSQL: o('date time timestamp'), support: o('doubleQuote nCharCast zerolessFloat binaryNumber hexNumber')}), e.defineMIME('text/x-hive', {name: 'sql', keywords: o('select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with admin authorization char compact compactions conf cube current current_date current_timestamp day decimal defined dependency directories elem_type exchange file following for grouping hour ignore inner interval jar less logical macro minute month more none noscan over owner partialscan preceding pretty principals protection reload rewrite role roles rollup rows second server sets skewed transactions truncate unbounded unset uri user values window year'), builtin: o('bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype key_type utctimestamp value_type varchar'), atoms: o('false true null unknown'), operatorChars: /^[*+\-%<>!=]/, dateSQL: o('date timestamp'), support: o('ODBCdotTable doubleQuote binaryNumber hexNumber')}), e.defineMIME('text/x-pgsql', {name: 'sql', client: o('source'), keywords: o(i+'a abort abs absent absolute access according action ada add admin after aggregate alias all allocate also alter always analyse analyze and any are array array_agg array_max_cardinality as asc asensitive assert assertion assignment asymmetric at atomic attach attribute attributes authorization avg backward base64 before begin begin_frame begin_partition bernoulli between bigint binary bit bit_length blob blocked bom boolean both breadth by c cache call called cardinality cascade cascaded case cast catalog catalog_name ceil ceiling chain char char_length character character_length character_set_catalog character_set_name character_set_schema characteristics characters check checkpoint class class_origin clob close cluster coalesce cobol collate collation collation_catalog collation_name collation_schema collect column column_name columns command_function command_function_code comment comments commit committed concurrently condition condition_number configuration conflict connect connection connection_name constant constraint constraint_catalog constraint_name constraint_schema constraints constructor contains content continue control conversion convert copy corr corresponding cost count covar_pop covar_samp create cross csv cube cume_dist current current_catalog current_date current_default_transform_group current_path current_role current_row current_schema current_time current_timestamp current_transform_group_for_type current_user cursor cursor_name cycle data database datalink datatype date datetime_interval_code datetime_interval_precision day db deallocate debug dec decimal declare default defaults deferrable deferred defined definer degree delete delimiter delimiters dense_rank depends depth deref derived desc describe descriptor detach detail deterministic diagnostics dictionary disable discard disconnect dispatch distinct dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue do document domain double drop dump dynamic dynamic_function dynamic_function_code each element else elseif elsif empty enable encoding encrypted end end_frame end_partition endexec enforced enum equals errcode error escape event every except exception exclude excluding exclusive exec execute exists exit exp explain expression extension external extract false family fetch file filter final first first_value flag float floor following for force foreach foreign fortran forward found frame_row free freeze from fs full function functions fusion g general generated get global go goto grant granted greatest group grouping groups handler having header hex hierarchy hint hold hour id identity if ignore ilike immediate immediately immutable implementation implicit import in include including increment indent index indexes indicator info inherit inherits initially inline inner inout input insensitive insert instance instantiable instead int integer integrity intersect intersection interval into invoker is isnull isolation join k key key_member key_type label lag language large last last_value lateral lead leading leakproof least left length level library like like_regex limit link listen ln load local localtime localtimestamp location locator lock locked log logged loop lower m map mapping match matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text method min minute minvalue mod mode modifies module month more move multiset mumps name names namespace national natural nchar nclob nesting new next nfc nfd nfkc nfkd nil no none normalize normalized not nothing notice notify notnull nowait nth_value ntile null nullable nullif nulls number numeric object occurrences_regex octet_length octets of off offset oids old on only open operator option options or order ordering ordinality others out outer output over overlaps overlay overriding owned owner p pad parallel parameter parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partial partition pascal passing passthrough password path percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding precision prepare prepared preserve primary print_strict_params prior privileges procedural procedure procedures program public publication query quote raise range rank read reads real reassign recheck recovery recursive ref references referencing refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex relative release rename repeatable replace replica requiring reset respect restart restore restrict result result_oid return returned_cardinality returned_length returned_octet_length returned_sqlstate returning returns reverse revoke right role rollback rollup routine routine_catalog routine_name routine_schema routines row row_count row_number rows rowtype rule savepoint scale schema schema_name schemas scope scope_catalog scope_name scope_schema scroll search second section security select selective self sensitive sequence sequences serializable server server_name session session_user set setof sets share show similar simple size skip slice smallint snapshot some source space specific specific_name specifictype sql sqlcode sqlerror sqlexception sqlstate sqlwarning sqrt stable stacked standalone start state statement static statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time system_user t table table_name tables tablesample tablespace temp template temporary text then ties time timestamp timezone_hour timezone_minute to token top_level_count trailing transaction transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex translation treat trigger trigger_catalog trigger_name trigger_schema trim trim_array true truncate trusted type types uescape unbounded uncommitted under unencrypted union unique unknown unlink unlisten unlogged unnamed unnest until untyped update upper uri usage use_column use_variable user user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema using vacuum valid validate validator value value_of values var_pop var_samp varbinary varchar variable_conflict variadic varying verbose version versioning view views volatile warning when whenever where while whitespace width_bucket window with within without work wrapper write xml xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate year yes zone'), builtin: o('bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml'), atoms: o('false true null unknown'), operatorChars: /^[*\/+\-%<>!=&|^\/#@?~]/, backslashStringEscapes: !1, dateSQL: o('date time timestamp'), support: o('ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast escapeConstant')}), e.defineMIME('text/x-gql', {name: 'sql', keywords: o('ancestor and asc by contains desc descendant distinct from group has in is limit offset on order select superset where'), atoms: o('false true'), builtin: o('blob datetime first key __key__ string integer double boolean null'), operatorChars: /^[*+\-%<>!=]/}), e.defineMIME('text/x-gpsql', {name: 'sql', client: o('source'), keywords: o('abort absolute access action active add admin after aggregate all also alter always analyse analyze and any array as asc assertion assignment asymmetric at authorization backward before begin between bigint binary bit boolean both by cache called cascade cascaded case cast chain char character characteristics check checkpoint class close cluster coalesce codegen collate column comment commit committed concurrency concurrently configuration connection constraint constraints contains content continue conversion copy cost cpu_rate_limit create createdb createexttable createrole createuser cross csv cube current current_catalog current_date current_role current_schema current_time current_timestamp current_user cursor cycle data database day deallocate dec decimal declare decode default defaults deferrable deferred definer delete delimiter delimiters deny desc dictionary disable discard distinct distributed do document domain double drop dxl each else enable encoding encrypted end enum errors escape every except exchange exclude excluding exclusive execute exists explain extension external extract false family fetch fields filespace fill filter first float following for force foreign format forward freeze from full function global grant granted greatest group group_id grouping handler hash having header hold host hour identity if ignore ilike immediate immutable implicit in including inclusive increment index indexes inherit inherits initially inline inner inout input insensitive insert instead int integer intersect interval into invoker is isnull isolation join key language large last leading least left level like limit list listen load local localtime localtimestamp location lock log login mapping master match maxvalue median merge minute minvalue missing mode modifies modify month move name names national natural nchar new newline next no nocreatedb nocreateexttable nocreaterole nocreateuser noinherit nologin none noovercommit nosuperuser not nothing notify notnull nowait null nullif nulls numeric object of off offset oids old on only operator option options or order ordered others out outer over overcommit overlaps overlay owned owner parser partial partition partitions passing password percent percentile_cont percentile_disc placing plans position preceding precision prepare prepared preserve primary prior privileges procedural procedure protocol queue quote randomly range read readable reads real reassign recheck recursive ref references reindex reject relative release rename repeatable replace replica reset resource restart restrict returning returns revoke right role rollback rollup rootpartition row rows rule savepoint scatter schema scroll search second security segment select sequence serializable session session_user set setof sets share show similar simple smallint some split sql stable standalone start statement statistics stdin stdout storage strict strip subpartition subpartitions substring superuser symmetric sysid system table tablespace temp template temporary text then threshold ties time timestamp to trailing transaction treat trigger trim true truncate trusted type unbounded uncommitted unencrypted union unique unknown unlisten until update user using vacuum valid validation validator value values varchar variadic varying verbose version view volatile web when where whitespace window with within without work writable write xml xmlattributes xmlconcat xmlelement xmlexists xmlforest xmlparse xmlpi xmlroot xmlserialize year yes zone'), builtin: o('bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml'), atoms: o('false true null unknown'), operatorChars: /^[*+\-%<>!=&|^\/#@?~]/, dateSQL: o('date time timestamp'), support: o('ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast')}), e.defineMIME('text/x-sparksql', {name: 'sql', keywords: o('add after all alter analyze and anti archive array as asc at between bucket buckets by cache cascade case cast change clear cluster clustered codegen collection column columns comment commit compact compactions compute concatenate cost create cross cube current current_date current_timestamp database databases datata dbproperties defined delete delimited deny desc describe dfs directories distinct distribute drop else end escaped except exchange exists explain export extended external false fields fileformat first following for format formatted from full function functions global grant group grouping having if ignore import in index indexes inner inpath inputformat insert intersect interval into is items join keys last lateral lazy left like limit lines list load local location lock locks logical macro map minus msck natural no not null nulls of on optimize option options or order out outer outputformat over overwrite partition partitioned partitions percent preceding principals purge range recordreader recordwriter recover reduce refresh regexp rename repair replace reset restrict revoke right rlike role roles rollback rollup row rows schema schemas select semi separated serde serdeproperties set sets show skewed sort sorted start statistics stored stratify struct table tables tablesample tblproperties temp temporary terminated then to touch transaction transactions transform true truncate unarchive unbounded uncache union unlock unset use using values view when where window with'), builtin: o('tinyint smallint int bigint boolean float double string binary timestamp decimal array map struct uniontype delimited serde sequencefile textfile rcfile inputformat outputformat'), atoms: o('false true null'), operatorChars: /^[*\/+\-%<>!=~&|^]/, dateSQL: o('date time timestamp'), support: o('ODBCdotTable doubleQuote zerolessFloat')}), e.defineMIME('text/x-esper', {name: 'sql', client: o('source'), keywords: o('alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit after all and as at asc avedev avg between by case cast coalesce count create current_timestamp day days delete define desc distinct else end escape events every exists false first from full group having hour hours in inner insert instanceof into irstream is istream join last lastweekday left limit like max match_recognize matches median measures metadatasql min minute minutes msec millisecond milliseconds not null offset on or order outer output partition pattern prev prior regexp retain-union retain-intersection right rstream sec second seconds select set some snapshot sql stddev sum then true unidirectional until update variable weekday when where window'), builtin: {}, atoms: o('false true null'), operatorChars: /^[*+\-%<>!=&|^\/#@?~]/, dateSQL: o('time'), support: o('decimallessFloat zerolessFloat binaryNumber hexNumber')});
    }(n(631));
  }, 589: (e, t, n)=>{
    !function(e) {
      'use strict'; const t={autoSelfClosers: {area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0, menuitem: !0}, implicitlyClosed: {dd: !0, li: !0, optgroup: !0, option: !0, p: !0, rp: !0, rt: !0, tbody: !0, td: !0, tfoot: !0, th: !0, tr: !0}, contextGrabbers: {dd: {dd: !0, dt: !0}, dt: {dd: !0, dt: !0}, li: {li: !0}, option: {option: !0, optgroup: !0}, optgroup: {optgroup: !0}, p: {address: !0, article: !0, aside: !0, blockquote: !0, dir: !0, div: !0, dl: !0, fieldset: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, menu: !0, nav: !0, ol: !0, p: !0, pre: !0, section: !0, table: !0, ul: !0}, rp: {rp: !0, rt: !0}, rt: {rp: !0, rt: !0}, tbody: {tbody: !0, tfoot: !0}, td: {td: !0, th: !0}, tfoot: {tbody: !0}, th: {td: !0, th: !0}, thead: {tbody: !0, tfoot: !0}, tr: {tr: !0}}, doNotIndent: {pre: !0}, allowUnquoted: !0, allowMissing: !0, caseFold: !0}; const n={autoSelfClosers: {}, implicitlyClosed: {}, contextGrabbers: {}, doNotIndent: {}, allowUnquoted: !1, allowMissing: !1, allowMissingTagName: !1, caseFold: !1}; e.defineMode('xml', (function(r, i) {
        let o; let s; const a=r.indentUnit; const l={}; const c=i.htmlMode?t:n; for (var u in c)l[u]=c[u]; for (var u in i)l[u]=i[u]; function d(e, t) {
          function n(n) {
            return t.tokenize=n, n(e, t);
          } const r=e.next(); return '<'==r?e.eat('!')?e.eat('[')?e.match('CDATA[')?n(p('atom', ']]>')):null:e.match('--')?n(p('comment', '--\x3e')):e.match('DOCTYPE', !0, !0)?(e.eatWhile(/[\w\._\-]/), n(f(1))):null:e.eat('?')?(e.eatWhile(/[\w\._\-]/), t.tokenize=p('meta', '?>'), 'meta'):(o=e.eat('/')?'closeTag':'openTag', t.tokenize=h, 'tag bracket'):'&'==r?(e.eat('#')?e.eat('x')?e.eatWhile(/[a-fA-F\d]/)&&e.eat(';'):e.eatWhile(/[\d]/)&&e.eat(';'):e.eatWhile(/[\w\.\-:]/)&&e.eat(';'))?'atom':'error':(e.eatWhile(/[^&<]/), null);
        } function h(e, t) {
          let n; let r; const i=e.next(); if ('>'==i||'/'==i&&e.eat('>')) return t.tokenize=d, o='>'==i?'endTag':'selfcloseTag', 'tag bracket'; if ('='==i) return o='equals', null; if ('<'==i) {
            t.tokenize=d, t.state=y, t.tagName=t.tagStart=null; const s=t.tokenize(e, t); return s?s+' tag error':'tag error';
          } return /[\'\"]/.test(i)?(t.tokenize=(n=i, (r=function(e, t) {
            for (;!e.eol();) {
              if (e.next()==n) {
                t.tokenize=h; break;
              }
            } return 'string';
          }).isInAttribute=!0, r), t.stringStartCol=e.column(), t.tokenize(e, t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 'word');
        } function p(e, t) {
          return function(n, r) {
            for (;!n.eol();) {
              if (n.match(t)) {
                r.tokenize=d; break;
              }n.next();
            } return e;
          };
        } function f(e) {
          return function(t, n) {
            for (var r; null!=(r=t.next());) {
              if ('<'==r) return n.tokenize=f(e+1), n.tokenize(t, n); if ('>'==r) {
                if (1==e) {
                  n.tokenize=d; break;
                } return n.tokenize=f(e-1), n.tokenize(t, n);
              }
            } return 'meta';
          };
        } function m(e, t, n) {
          this.prev=e.context, this.tagName=t||'', this.indent=e.indented, this.startOfLine=n, (l.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0);
        } function g(e) {
          e.context&&(e.context=e.context.prev);
        } function v(e, t) {
          for (var n; ;) {
            if (!e.context) return; if (n=e.context.tagName, !l.contextGrabbers.hasOwnProperty(n)||!l.contextGrabbers[n].hasOwnProperty(t)) return; g(e);
          }
        } function y(e, t, n) {
          return 'openTag'==e?(n.tagStart=t.column(), b):'closeTag'==e?w:y;
        } function b(e, t, n) {
          return 'word'==e?(n.tagName=t.current(), s='tag', _):l.allowMissingTagName&&'endTag'==e?(s='tag bracket', _(e, 0, n)):(s='error', b);
        } function w(e, t, n) {
          if ('word'==e) {
            const r=t.current(); return n.context&&n.context.tagName!=r&&l.implicitlyClosed.hasOwnProperty(n.context.tagName)&&g(n), n.context&&n.context.tagName==r||!1===l.matchClosing?(s='tag', x):(s='tag error', k);
          } return l.allowMissingTagName&&'endTag'==e?(s='tag bracket', x(e, 0, n)):(s='error', k);
        } function x(e, t, n) {
          return 'endTag'!=e?(s='error', x):(g(n), y);
        } function k(e, t, n) {
          return s='error', x(e, 0, n);
        } function _(e, t, n) {
          if ('word'==e) return s='attribute', S; if ('endTag'==e||'selfcloseTag'==e) {
            const r=n.tagName; const i=n.tagStart; return n.tagName=n.tagStart=null, 'selfcloseTag'==e||l.autoSelfClosers.hasOwnProperty(r)?v(n, r):(v(n, r), n.context=new m(n, r, i==n.indented)), y;
          } return s='error', _;
        } function S(e, t, n) {
          return 'equals'==e?C:(l.allowMissing||(s='error'), _(e, 0, n));
        } function C(e, t, n) {
          return 'string'==e?M:'word'==e&&l.allowUnquoted?(s='string', _):(s='error', _(e, 0, n));
        } function M(e, t, n) {
          return 'string'==e?M:_(e, 0, n);
        } return d.isInText=!0, {startState: function(e) {
          const t={tokenize: d, state: y, indented: e||0, tagName: null, tagStart: null, context: null}; return null!=e&&(t.baseIndent=e), t;
        }, token: function(e, t) {
          if (!t.tagName&&e.sol()&&(t.indented=e.indentation()), e.eatSpace()) return null; o=null; let n=t.tokenize(e, t); return (n||o)&&'comment'!=n&&(s=null, t.state=t.state(o||n, e, t), s&&(n='error'==s?n+' error':s)), n;
        }, indent: function(t, n, r) {
          let i=t.context; if (t.tokenize.isInAttribute) return t.tagStart==t.indented?t.stringStartCol+1:t.indented+a; if (i&&i.noIndent) return e.Pass; if (t.tokenize!=h&&t.tokenize!=d) return r?r.match(/^(\s*)/)[0].length:0; if (t.tagName) return !1!==l.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+a*(l.multilineTagIndentFactor||1); if (l.alignCDATA&&/<!\[CDATA\[/.test(n)) return 0; const o=n&&/^<(\/)?([\w_:\.-]*)/.exec(n); if (o&&o[1]) {
            for (;i;) {
              if (i.tagName==o[2]) {
                i=i.prev; break;
              } if (!l.implicitlyClosed.hasOwnProperty(i.tagName)) break; i=i.prev;
            }
          } else if (o) {
            for (;i;) {
              const s=l.contextGrabbers[i.tagName]; if (!s||!s.hasOwnProperty(o[2])) break; i=i.prev;
            }
          } for (;i&&i.prev&&!i.startOfLine;)i=i.prev; return i?i.indent+a:t.baseIndent||0;
        }, electricInput: /<\/[\s\w:]+>$/, blockCommentStart: '\x3c!--', blockCommentEnd: '--\x3e', configuration: l.htmlMode?'html':'xml', helperType: l.htmlMode?'html':'xml', skipAttribute: function(e) {
          e.state==C&&(e.state=_);
        }, xmlCurrentTag: function(e) {
          return e.tagName?{name: e.tagName, close: 'closeTag'==e.type}:null;
        }, xmlCurrentContext: function(e) {
          for (var t=[], n=e.context; n; n=n.prev)t.push(n.tagName); return t.reverse();
        }};
      })), e.defineMIME('text/xml', 'xml'), e.defineMIME('application/xml', 'xml'), e.mimeModes.hasOwnProperty('text/html')||e.defineMIME('text/html', {name: 'xml', htmlMode: !0});
    }(n(631));
  }, 405: (e, t, n)=>{
    'use strict'; function r() {
      let e=arguments[0]; 'string'==typeof e&&(e=document.createElement(e)); let t=1; const n=arguments[1]; if (n&&'object'==typeof n&&null==n.nodeType&&!Array.isArray(n)) {
        for (const r in n) {
          if (Object.prototype.hasOwnProperty.call(n, r)) {
            const o=n[r]; 'string'==typeof o?e.setAttribute(r, o):null!=o&&(e[r]=o);
          }
        }t++;
      } for (;t<arguments.length; t++)i(e, arguments[t]); return e;
    } function i(e, t) {
      if ('string'==typeof t)e.appendChild(document.createTextNode(t)); else if (null==t);else if (null!=t.nodeType)e.appendChild(t); else {
        if (!Array.isArray(t)) throw new RangeError('Unsupported child node: '+t); for (let n=0; n<t.length; n++)i(e, t[n]);
      }
    }n.d(t, {Z: ()=>r});
  }, 448: (e, t)=>{
    const n='undefined'==typeof performance?null:performance; const r='undefined'==typeof crypto?null:crypto; const i=null!==r?(e)=>{
      const t=new ArrayBuffer(e); const n=new Uint8Array(t); return r.getRandomValues(n), t;
    }:(e)=>{
      const t=new ArrayBuffer(e); const n=new Uint8Array(t); for (let t=0; t<e; t++)n[t]=Math.ceil(4294967295*Math.random()>>>0); return t;
    }; t.S=n, t.n=i;
  }, 778: (e, t, n)=>{
    'use strict'; n.d(t, {YR: ()=>M, QF: ()=>w, uo: ()=>f, Ig: ()=>d, MI: ()=>u, xb: ()=>h, N0: ()=>m, uJ: ()=>y, w9: ()=>b, ym: ()=>v}); const r=n(81); const i=n(638); const o=n(922); function s(e, t) {
      return !e.selection.empty&&(t&&t(e.tr.deleteSelection().scrollIntoView()), !0);
    } function a(e, t) {
      for (;e; e='start'==t?e.firstChild:e.lastChild) if (e.isTextblock) return !0; return !1;
    } function l(e) {
      if (!e.parent.type.spec.isolating) {
        for (let t=e.depth-1; t>=0; t--) {
          if (e.index(t)>0) return e.doc.resolve(e.before(t+1)); if (e.node(t).type.spec.isolating) break;
        }
      } return null;
    } function c(e) {
      if (!e.parent.type.spec.isolating) {
        for (let t=e.depth-1; t>=0; t--) {
          const n=e.node(t); if (e.index(t)+1<n.childCount) return e.doc.resolve(e.after(t+1)); if (n.type.spec.isolating) break;
        }
      } return null;
    } function u(e, t) {
      let n; const i=e.selection; const s=i instanceof o.qv; if (s) {
        if (i.node.isTextblock||!(0, r.Mn)(e.doc, i.from)) return !1; n=i.from;
      } else if (null==(n=(0, r.GJ)(e.doc, i.from, -1))) return !1; if (t) {
        const a=e.tr.join(n); s&&a.setSelection(o.qv.create(a.doc, n-e.doc.resolve(n).nodeBefore.nodeSize)), t(a.scrollIntoView());
      } return !0;
    } function d(e, t) {
      let n; const i=e.selection; if (i instanceof o.qv) {
        if (i.node.isTextblock||!(0, r.Mn)(e.doc, i.to)) return !1; n=i.to;
      } else if (null==(n=(0, r.GJ)(e.doc, i.to, 1))) return !1; return t&&t(e.tr.join(n).scrollIntoView()), !0;
    } function h(e, t) {
      const n=e.selection; const i=n.$from; const o=n.$to; const s=i.blockRange(o); const a=s&&(0, r.k9)(s); return null!=a&&(t&&t(e.tr.lift(s, a).scrollIntoView()), !0);
    } function p(e) {
      for (let t=0; t<e.edgeCount; t++) {
        const n=e.edge(t).type; if (n.isTextblock&&!n.hasRequiredAttrs()) return n;
      } return null;
    } function f(e, t) {
      const n=e.selection; const r=n.$head; const i=n.$anchor; if (!r.parent.type.spec.code||!r.sameParent(i)) return !1; const s=r.node(-1); const a=r.indexAfter(-1); const l=p(s.contentMatchAt(a)); if (!s.canReplaceWith(a, a, l)) return !1; if (t) {
        const c=r.after(); const u=e.tr.replaceWith(c, c, l.createAndFill()); u.setSelection(o.Y1.near(u.doc.resolve(c), 1)), t(u.scrollIntoView());
      } return !0;
    } function m(e, t) {
      let n; const r=e.selection; const i=r.$from; const s=r.to; const a=i.sharedDepth(s); return 0!=a&&(n=i.before(a), t&&t(e.tr.setSelection(o.qv.create(e.doc, n))), !0);
    } function g(e, t, n) {
      let s; let a; const l=t.nodeBefore; const c=t.nodeAfter; if (l.type.spec.isolating||c.type.spec.isolating) return !1; if (function(e, t, n) {
        const i=t.nodeBefore; const o=t.nodeAfter; const s=t.index(); return !(!(i&&o&&i.type.compatibleContent(o.type))||(!i.content.size&&t.parent.canReplace(s-1, s)?(n&&n(e.tr.delete(t.pos-i.nodeSize, t.pos).scrollIntoView()), 0):!t.parent.canReplace(s, s+1)||!o.isTextblock&&!(0, r.Mn)(e.doc, t.pos)||(n&&n(e.tr.clearIncompatible(t.pos, i.type, i.contentMatchAt(i.childCount)).join(t.pos).scrollIntoView()), 0)));
      }(e, t, n)) return !0; if (t.parent.canReplace(t.index(), t.index()+1)&&(s=(a=l.contentMatchAt(l.childCount)).findWrapping(c.type))&&a.matchType(s[0]||c.type).validEnd) {
        if (n) {
          for (var u=t.pos+c.nodeSize, d=i.HY.empty, h=s.length-1; h>=0; h--)d=i.HY.from(s[h].create(null, d)); d=i.HY.from(l.copy(d)); const p=e.tr.step(new r.FC(t.pos-1, u, t.pos, u, new i.p2(d, 1, 0), s.length, !0)); const f=u+2*s.length; (0, r.Mn)(p.doc, f)&&p.join(f), n(p.scrollIntoView());
        } return !0;
      } const m=o.Y1.findFrom(t, 1); const g=m&&m.$from.blockRange(m.$to); const v=g&&(0, r.k9)(g); return null!=v&&v>=t.depth&&(n&&n(e.tr.lift(g, v).scrollIntoView()), !0);
    } function v(e, t) {
      return function(n, i) {
        const o=n.selection; const s=o.$from; const a=o.$to; const l=s.blockRange(a); const c=l&&(0, r.nd)(l, e, t); return !!c&&(i&&i(n.tr.wrap(l, c).scrollIntoView()), !0);
      };
    } function y(e, t) {
      return function(n, r) {
        const i=n.selection; const o=i.from; const s=i.to; let a=!1; return n.doc.nodesBetween(o, s, (function(r, i) {
          if (a) return !1; if (r.isTextblock&&!r.hasMarkup(e, t)) {
            if (r.type==e)a=!0; else {
              const o=n.doc.resolve(i); const s=o.index(); a=o.parent.canReplaceWith(s, s+1, e);
            }
          }
        })), !!a&&(r&&r(n.tr.setBlockType(o, s, e, t).scrollIntoView()), !0);
      };
    } function b(e, t) {
      return function(n, r) {
        const i=n.selection; const o=i.empty; const s=i.$cursor; const a=i.ranges; if (o&&!s||!function(e, t, n) {
          for (let r=function(r) {
              const i=t[r]; const o=i.$from; const s=i.$to; let a=0==o.depth&&e.type.allowsMarkType(n); if (e.nodesBetween(o.pos, s.pos, (function(e) {
                if (a) return !1; a=e.inlineContent&&e.type.allowsMarkType(n);
              })), a) return {v: !0};
            }, i=0; i<t.length; i++) {
            const o=r(i); if (o) return o.v;
          } return !1;
        }(n.doc, a, e)) return !1; if (r) {
          if (s)e.isInSet(n.storedMarks||s.marks())?r(n.tr.removeStoredMark(e)):r(n.tr.addStoredMark(e.create(t))); else {
            for (var l=!1, c=n.tr, u=0; !l&&u<a.length; u++) {
              const d=a[u]; const h=d.$from; const p=d.$to; l=n.doc.rangeHasMark(h.pos, p.pos, e);
            } for (let f=0; f<a.length; f++) {
              const m=a[f]; const g=m.$from; const v=m.$to; l?c.removeMark(g.pos, v.pos, e):c.addMark(g.pos, v.pos, e.create(t));
            }r(c.scrollIntoView());
          }
        } return !0;
      };
    } function w() {
      for (var e=[], t=arguments.length; t--;)e[t]=arguments[t]; return function(t, n, r) {
        for (let i=0; i<e.length; i++) if (e[i](t, n, r)) return !0; return !1;
      };
    } const x=w(s, (function(e, t, n) {
      const i=e.selection.$cursor; if (!i||(n?!n.endOfTextblock('backward', e):i.parentOffset>0)) return !1; const s=l(i); if (!s) {
        const c=i.blockRange(); const u=c&&(0, r.k9)(c); return null!=u&&(t&&t(e.tr.lift(c, u).scrollIntoView()), !0);
      } const d=s.nodeBefore; if (!d.type.spec.isolating&&g(e, s, t)) return !0; if (0==i.parent.content.size&&(a(d, 'end')||o.qv.isSelectable(d))) {
        if (t) {
          const h=e.tr.deleteRange(i.before(), i.after()); h.setSelection(a(d, 'end')?o.Y1.findFrom(h.doc.resolve(h.mapping.map(s.pos, -1)), -1):o.qv.create(h.doc, s.pos-d.nodeSize)), t(h.scrollIntoView());
        } return !0;
      } return !(!d.isAtom||s.depth!=i.depth-1||(t&&t(e.tr.delete(s.pos-d.nodeSize, s.pos).scrollIntoView()), 0));
    }), (function(e, t, n) {
      const r=e.selection; const i=r.$head; let s=i; if (!r.empty) return !1; if (i.parent.isTextblock) {
        if (n?!n.endOfTextblock('backward', e):i.parentOffset>0) return !1; s=l(i);
      } const a=s&&s.nodeBefore; return !(!a||!o.qv.isSelectable(a)||(t&&t(e.tr.setSelection(o.qv.create(e.doc, s.pos-a.nodeSize)).scrollIntoView()), 0));
    })); const k=w(s, (function(e, t, n) {
      const r=e.selection.$cursor; if (!r||(n?!n.endOfTextblock('forward', e):r.parentOffset<r.parent.content.size)) return !1; const i=c(r); if (!i) return !1; const s=i.nodeAfter; if (g(e, i, t)) return !0; if (0==r.parent.content.size&&(a(s, 'start')||o.qv.isSelectable(s))) {
        if (t) {
          const l=e.tr.deleteRange(r.before(), r.after()); l.setSelection(a(s, 'start')?o.Y1.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1):o.qv.create(l.doc, l.mapping.map(i.pos))), t(l.scrollIntoView());
        } return !0;
      } return !(!s.isAtom||i.depth!=r.depth-1||(t&&t(e.tr.delete(i.pos, i.pos+s.nodeSize).scrollIntoView()), 0));
    }), (function(e, t, n) {
      const r=e.selection; const i=r.$head; let s=i; if (!r.empty) return !1; if (i.parent.isTextblock) {
        if (n?!n.endOfTextblock('forward', e):i.parentOffset<i.parent.content.size) return !1; s=c(i);
      } const a=s&&s.nodeAfter; return !(!a||!o.qv.isSelectable(a)||(t&&t(e.tr.setSelection(o.qv.create(e.doc, s.pos)).scrollIntoView()), 0));
    })); const _={'Enter': w((function(e, t) {
      const n=e.selection; const r=n.$head; const i=n.$anchor; return !(!r.parent.type.spec.code||!r.sameParent(i)||(t&&t(e.tr.insertText('\n').scrollIntoView()), 0));
    }), (function(e, t) {
      const n=e.selection; const r=n.$from; const i=n.$to; if (r.parent.inlineContent||i.parent.inlineContent) return !1; const s=p(r.parent.contentMatchAt(i.indexAfter())); if (!s||!s.isTextblock) return !1; if (t) {
        const a=(!r.parentOffset&&i.index()<i.parent.childCount?r:i).pos; const l=e.tr.insert(a, s.createAndFill()); l.setSelection(o.Bs.create(l.doc, a+1)), t(l.scrollIntoView());
      } return !0;
    }), (function(e, t) {
      const n=e.selection.$cursor; if (!n||n.parent.content.size) return !1; if (n.depth>1&&n.after()!=n.end(-1)) {
        const i=n.before(); if ((0, r.Ax)(e.doc, i)) return t&&t(e.tr.split(i).scrollIntoView()), !0;
      } const o=n.blockRange(); const s=o&&(0, r.k9)(o); return null!=s&&(t&&t(e.tr.lift(o, s).scrollIntoView()), !0);
    }), (function(e, t) {
      const n=e.selection; const s=n.$from; const a=n.$to; if (e.selection instanceof o.qv&&e.selection.node.isBlock) return !(!s.parentOffset||!(0, r.Ax)(e.doc, s.pos)||(t&&t(e.tr.split(s.pos).scrollIntoView()), 0)); if (!s.parent.isBlock) return !1; if (t) {
        const l=a.parentOffset==a.parent.content.size; const c=e.tr; e.selection instanceof o.Bs&&c.deleteSelection(); const u=0==s.depth?null:p(s.node(-1).contentMatchAt(s.indexAfter(-1))); let d=l&&u?[{type: u}]:null; let h=(0, r.Ax)(c.doc, c.mapping.map(s.pos), 1, d); d||h||!(0, r.Ax)(c.doc, c.mapping.map(s.pos), 1, u&&[{type: u}])||(d=[{type: u}], h=!0), h&&(c.split(c.mapping.map(s.pos), 1, d), l||s.parentOffset||s.parent.type==u||!s.node(-1).canReplace(s.index(-1), s.indexAfter(-1), i.HY.from(u.create(), s.parent))||c.setNodeMarkup(c.mapping.map(s.before()), u)), t(c.scrollIntoView());
      } return !0;
    })), 'Mod-Enter': f, 'Backspace': x, 'Mod-Backspace': x, 'Delete': k, 'Mod-Delete': k, 'Mod-a': function(e, t) {
      return t&&t(e.tr.setSelection(new o.C1(e.doc))), !0;
    }}; const S={'Ctrl-h': _.Backspace, 'Alt-Backspace': _['Mod-Backspace'], 'Ctrl-d': _.Delete, 'Ctrl-Alt-Backspace': _['Mod-Delete'], 'Alt-Delete': _['Mod-Delete'], 'Alt-d': _['Mod-Delete']}; for (const C in _)S[C]=_[C]; var M=('undefined'!=typeof navigator?/Mac/.test(navigator.platform):'undefined'!=typeof os&&'darwin'==os.platform())?S:_;
  }, 189: (e, t, n)=>{
    'use strict'; n.d(t, {m8: ()=>k, KX: ()=>S, Yw: ()=>_}); const r=200; const i=function() {}; i.prototype.append=function(e) {
      return e.length?(e=i.from(e), !this.length&&e||e.length<r&&this.leafAppend(e)||this.length<r&&e.leafPrepend(this)||this.appendInner(e)):this;
    }, i.prototype.prepend=function(e) {
      return e.length?i.from(e).append(this):this;
    }, i.prototype.appendInner=function(e) {
      return new s(this, e);
    }, i.prototype.slice=function(e, t) {
      return void 0===e&&(e=0), void 0===t&&(t=this.length), e>=t?i.empty:this.sliceInner(Math.max(0, e), Math.min(this.length, t));
    }, i.prototype.get=function(e) {
      if (!(e<0||e>=this.length)) return this.getInner(e);
    }, i.prototype.forEach=function(e, t, n) {
      void 0===t&&(t=0), void 0===n&&(n=this.length), t<=n?this.forEachInner(e, t, n, 0):this.forEachInvertedInner(e, t, n, 0);
    }, i.prototype.map=function(e, t, n) {
      void 0===t&&(t=0), void 0===n&&(n=this.length); const r=[]; return this.forEach((function(t, n) {
        return r.push(e(t, n));
      }), t, n), r;
    }, i.from=function(e) {
      return e instanceof i?e:e&&e.length?new o(e):i.empty;
    }; var o=function(e) {
      function t(t) {
        e.call(this), this.values=t;
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={length: {configurable: !0}, depth: {configurable: !0}}; return t.prototype.flatten=function() {
        return this.values;
      }, t.prototype.sliceInner=function(e, n) {
        return 0==e&&n==this.length?this:new t(this.values.slice(e, n));
      }, t.prototype.getInner=function(e) {
        return this.values[e];
      }, t.prototype.forEachInner=function(e, t, n, r) {
        for (let i=t; i<n; i++) if (!1===e(this.values[i], r+i)) return !1;
      }, t.prototype.forEachInvertedInner=function(e, t, n, r) {
        for (let i=t-1; i>=n; i--) if (!1===e(this.values[i], r+i)) return !1;
      }, t.prototype.leafAppend=function(e) {
        if (this.length+e.length<=r) return new t(this.values.concat(e.flatten()));
      }, t.prototype.leafPrepend=function(e) {
        if (this.length+e.length<=r) return new t(e.flatten().concat(this.values));
      }, n.length.get=function() {
        return this.values.length;
      }, n.depth.get=function() {
        return 0;
      }, Object.defineProperties(t.prototype, n), t;
    }(i); i.empty=new o([]); var s=function(e) {
      function t(t, n) {
        e.call(this), this.left=t, this.right=n, this.length=t.length+n.length, this.depth=Math.max(t.depth, n.depth)+1;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.flatten=function() {
        return this.left.flatten().concat(this.right.flatten());
      }, t.prototype.getInner=function(e) {
        return e<this.left.length?this.left.get(e):this.right.get(e-this.left.length);
      }, t.prototype.forEachInner=function(e, t, n, r) {
        const i=this.left.length; return !(t<i&&!1===this.left.forEachInner(e, t, Math.min(n, i), r))&&!(n>i&&!1===this.right.forEachInner(e, Math.max(t-i, 0), Math.min(this.length, n)-i, r+i))&&void 0;
      }, t.prototype.forEachInvertedInner=function(e, t, n, r) {
        const i=this.left.length; return !(t>i&&!1===this.right.forEachInvertedInner(e, t-i, Math.max(n, i)-i, r+i))&&!(n<i&&!1===this.left.forEachInvertedInner(e, Math.min(t, i), n, r))&&void 0;
      }, t.prototype.sliceInner=function(e, t) {
        if (0==e&&t==this.length) return this; const n=this.left.length; return t<=n?this.left.slice(e, t):e>=n?this.right.slice(e-n, t-n):this.left.slice(e, n).append(this.right.slice(0, t-n));
      }, t.prototype.leafAppend=function(e) {
        const n=this.right.leafAppend(e); if (n) return new t(this.left, n);
      }, t.prototype.leafPrepend=function(e) {
        const n=this.left.leafPrepend(e); if (n) return new t(n, this.right);
      }, t.prototype.appendInner=function(e) {
        return this.left.depth>=Math.max(this.right.depth, e.depth)+1?new t(this.left, new t(this.right, e)):new t(this, e);
      }, t;
    }(i); const a=i; const l=n(81); const c=n(922); const u=function(e, t) {
      this.items=e, this.eventCount=t;
    }; u.prototype.popEvent=function(e, t) {
      const n=this; if (0==this.eventCount) return null; for (var r, i, o=this.items.length; ;o--) {
        if (this.items.get(o-1).selection) {
          --o; break;
        }
      }t&&(r=this.remapping(o, this.items.length), i=r.maps.length); let s; let a; const l=e.tr; const c=[]; const h=[]; return this.items.forEach((function(e, t) {
        if (!e.step) return r||(r=n.remapping(o, t+1), i=r.maps.length), i--, void h.push(e); if (r) {
          h.push(new d(e.map)); let p; const f=e.step.map(r.slice(i)); f&&l.maybeStep(f).doc&&(p=l.mapping.maps[l.mapping.maps.length-1], c.push(new d(p, null, null, c.length+h.length))), i--, p&&r.appendMap(p, i);
        } else l.maybeStep(e.step); return e.selection?(s=r?e.selection.map(r.slice(i)):e.selection, a=new u(n.items.slice(0, o).append(h.reverse().concat(c)), n.eventCount-1), !1):void 0;
      }), this.items.length, 0), {remaining: a, transform: l, selection: s};
    }, u.prototype.addTransform=function(e, t, n, r) {
      for (var i=[], o=this.eventCount, s=this.items, a=!r&&s.length?s.get(s.length-1):null, l=0; l<e.steps.length; l++) {
        var c; const h=e.steps[l].invert(e.docs[l]); let f=new d(e.mapping.maps[l], h, t); (c=a&&a.merge(f))&&(f=c, l?i.pop():s=s.slice(0, s.length-1)), i.push(f), t&&(o++, t=null), r||(a=f);
      } let m; let g; let v; const y=o-n.depth; return y>p&&(g=y, (m=s).forEach((function(e, t) {
        if (e.selection&&0==g--) return v=t, !1;
      })), s=m.slice(v), o-=y), new u(s.append(i), o);
    }, u.prototype.remapping=function(e, t) {
      const n=new l.vs; return this.items.forEach((function(t, r) {
        const i=null!=t.mirrorOffset&&r-t.mirrorOffset>=e?n.maps.length-t.mirrorOffset:null; n.appendMap(t.map, i);
      }), e, t), n;
    }, u.prototype.addMaps=function(e) {
      return 0==this.eventCount?this:new u(this.items.append(e.map((function(e) {
        return new d(e);
      }))), this.eventCount);
    }, u.prototype.rebased=function(e, t) {
      if (!this.eventCount) return this; const n=[]; const r=Math.max(0, this.items.length-t); const i=e.mapping; let o=e.steps.length; let s=this.eventCount; this.items.forEach((function(e) {
        e.selection&&s--;
      }), r); let a=t; this.items.forEach((function(t) {
        const r=i.getMirror(--a); if (null!=r) {
          o=Math.min(o, r); const l=i.maps[r]; if (t.step) {
            const c=e.steps[r].invert(e.docs[r]); const u=t.selection&&t.selection.map(i.slice(a+1, r)); u&&s++, n.push(new d(l, c, u));
          } else n.push(new d(l));
        }
      }), r); for (var l=[], c=t; c<o; c++)l.push(new d(i.maps[c])); const h=this.items.slice(0, r).append(l).append(n); let p=new u(h, s); return p.emptyItemCount()>500&&(p=p.compress(this.items.length-n.length)), p;
    }, u.prototype.emptyItemCount=function() {
      let e=0; return this.items.forEach((function(t) {
        t.step||e++;
      })), e;
    }, u.prototype.compress=function(e) {
      void 0===e&&(e=this.items.length); const t=this.remapping(0, e); let n=t.maps.length; const r=[]; let i=0; return this.items.forEach((function(o, s) {
        if (s>=e)r.push(o), o.selection&&i++; else if (o.step) {
          const a=o.step.map(t.slice(n)); const l=a&&a.getMap(); if (n--, l&&t.appendMap(l, n), a) {
            const c=o.selection&&o.selection.map(t.slice(n)); c&&i++; let u; const h=new d(l.invert(), a, c); const p=r.length-1; (u=r.length&&r[p].merge(h))?r[p]=u:r.push(h);
          }
        } else o.map&&n--;
      }), this.items.length, 0), new u(a.from(r.reverse()), i);
    }, u.empty=new u(a.empty, 0); var d=function(e, t, n, r) {
      this.map=e, this.step=t, this.selection=n, this.mirrorOffset=r;
    }; d.prototype.merge=function(e) {
      if (this.step&&e.step&&!e.selection) {
        const t=e.step.merge(this.step); if (t) return new d(t.getMap().invert(), t, this.selection);
      }
    }; const h=function(e, t, n, r) {
      this.done=e, this.undone=t, this.prevRanges=n, this.prevTime=r;
    }; var p=20; function f(e) {
      const t=[]; return e.forEach((function(e, n, r, i) {
        return t.push(r, i);
      })), t;
    } function m(e, t) {
      if (!e) return null; for (var n=[], r=0; r<e.length; r+=2) {
        const i=t.map(e[r], 1); const o=t.map(e[r+1], -1); i<=o&&n.push(i, o);
      } return n;
    } function g(e, t, n, r) {
      const i=b(t); const o=w.get(t).spec.config; const s=(r?e.undone:e.done).popEvent(t, i); if (s) {
        const a=s.selection.resolve(s.transform.doc); const l=(r?e.done:e.undone).addTransform(s.transform, t.selection.getBookmark(), o, i); const c=new h(r?l:s.remaining, r?s.remaining:l, null, 0); n(s.transform.setSelection(a).setMeta(w, {redo: r, historyState: c}).scrollIntoView());
      }
    } let v=!1; let y=null; function b(e) {
      const t=e.plugins; if (y!=t) {
        v=!1, y=t; for (let n=0; n<t.length; n++) {
          if (t[n].spec.historyPreserveItems) {
            v=!0; break;
          }
        }
      } return v;
    } var w=new c.H$('history'); const x=new c.H$('closeHistory'); function k(e) {
      return e={depth: e&&e.depth||100, newGroupDelay: e&&e.newGroupDelay||500}, new c.Sy({key: w, state: {init: function() {
        return new h(u.empty, u.empty, null, 0);
      }, apply: function(t, n, r) {
        return function(e, t, n, r) {
          let i; const o=n.getMeta(w); if (o) return o.historyState; n.getMeta(x)&&(e=new h(e.done, e.undone, null, 0)); const s=n.getMeta('appendedTransaction'); if (0==n.steps.length) return e; if (s&&s.getMeta(w)) return s.getMeta(w).redo?new h(e.done.addTransform(n, null, r, b(t)), e.undone, f(n.mapping.maps[n.steps.length-1]), e.prevTime):new h(e.done, e.undone.addTransform(n, null, r, b(t)), null, e.prevTime); if (!1===n.getMeta('addToHistory')||s&&!1===s.getMeta('addToHistory')) return (i=n.getMeta('rebased'))?new h(e.done.rebased(n, i), e.undone.rebased(n, i), m(e.prevRanges, n.mapping), e.prevTime):new h(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), m(e.prevRanges, n.mapping), e.prevTime); const a=0==e.prevTime||!s&&(e.prevTime<(n.time||0)-r.newGroupDelay||!function(e, t) {
            if (!t) return !1; if (!e.docChanged) return !0; let n=!1; return e.mapping.maps[0].forEach((function(e, r) {
              for (let i=0; i<t.length; i+=2)e<=t[i+1]&&r>=t[i]&&(n=!0);
            })), n;
          }(n, e.prevRanges)); const l=s?m(e.prevRanges, n.mapping):f(n.mapping.maps[n.steps.length-1]); return new h(e.done.addTransform(n, a?t.selection.getBookmark():null, r, b(t)), u.empty, l, n.time);
        }(n, r, t, e);
      }}, config: e});
    } function _(e, t) {
      const n=w.getState(e); return !(!n||0==n.done.eventCount||(t&&g(n, e, t, !1), 0));
    } function S(e, t) {
      const n=w.getState(e); return !(!n||0==n.undone.eventCount||(t&&g(n, e, t, !0), 0));
    }
  }, 896: (e, t, n)=>{
    'use strict'; n.d(t, {LH: ()=>u, pR: ()=>c, Hw: ()=>s, yR: ()=>d, zK: ()=>p, dU: ()=>l, S0: ()=>h}); const r=n(922); const i=n(81); const o=function(e, t) {
      let n; this.match=e, this.handler='string'==typeof t?(n=t, function(e, t, r, i) {
        let o=n; if (t[1]) {
          const s=t[0].lastIndexOf(t[1]); o+=t[0].slice(s+t[1].length); const a=(r+=s)-i; a>0&&(o=t[0].slice(s-a, s)+o, r=i);
        } return e.tr.insertText(o, r, i);
      }):t;
    }; function s(e) {
      const t=e.rules; var n=new r.Sy({state: {init: function() {
        return null;
      }, apply: function(e, t) {
        return e.getMeta(this)||(e.selectionSet||e.docChanged?null:t);
      }}, props: {handleTextInput: function(e, r, i, o) {
        return a(e, r, i, o, t, n);
      }, handleDOMEvents: {compositionend: function(e) {
        setTimeout((function() {
          const r=e.state.selection.$cursor; r&&a(e, r.pos, r.pos, '', t, n);
        }));
      }}}, isInputRules: !0}); return n;
    } function a(e, t, n, r, i, o) {
      if (e.composing) return !1; const s=e.state; const a=s.doc.resolve(t); if (a.parent.type.spec.code) return !1; for (let l=a.parent.textBetween(Math.max(0, a.parentOffset-500), a.parentOffset, null, '￼')+r, c=0; c<i.length; c++) {
        const u=i[c].match.exec(l); const d=u&&i[c].handler(s, u, t-(u[0].length-r.length), n); if (d) return e.dispatch(d.setMeta(o, {transform: d, from: t, to: n, text: r})), !0;
      } return !1;
    } function l(e, t) {
      for (let n=e.plugins, r=0; r<n.length; r++) {
        const i=n[r]; let o=void 0; if (i.spec.isInputRules&&(o=i.getState(e))) {
          if (t) {
            for (var s=e.tr, a=o.transform, l=a.steps.length-1; l>=0; l--)s.step(a.steps[l].invert(a.docs[l])); if (o.text) {
              const c=s.doc.resolve(o.from).marks(); s.replaceWith(o.from, o.to, e.schema.text(o.text, c));
            } else s.delete(o.from, o.to); t(s);
          } return !0;
        }
      } return !1;
    } var c=new o(/--$/, '—'); var u=new o(/\.\.\.$/, '…'); var d=[new o(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, '“'), new o(/"$/, '”'), new o(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, '‘'), new o(/'$/, '’')]; function h(e, t, n, r) {
      return new o(e, (function(e, o, s, a) {
        const l=n instanceof Function?n(o):n; const c=e.tr.delete(s, a); const u=c.doc.resolve(s).blockRange(); const d=u&&(0, i.nd)(u, t, l); if (!d) return null; c.wrap(u, d); const h=c.doc.resolve(s-1).nodeBefore; return h&&h.type==t&&(0, i.Mn)(c.doc, s-1)&&(!r||r(o, h))&&c.join(s-1), c;
      }));
    } function p(e, t, n) {
      return new o(e, (function(e, r, i, o) {
        const s=e.doc.resolve(i); const a=n instanceof Function?n(r):n; return s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), t)?e.tr.delete(i, o).setBlockType(i, i, t, a):null;
      }));
    }
  }, 751: (e, t, n)=>{
    'use strict'; n.d(t, {$: ()=>y, h: ()=>v}); for (var r={8: 'Backspace', 9: 'Tab', 10: 'Enter', 12: 'NumLock', 13: 'Enter', 16: 'Shift', 17: 'Control', 18: 'Alt', 20: 'CapsLock', 27: 'Escape', 32: ' ', 33: 'PageUp', 34: 'PageDown', 35: 'End', 36: 'Home', 37: 'ArrowLeft', 38: 'ArrowUp', 39: 'ArrowRight', 40: 'ArrowDown', 44: 'PrintScreen', 45: 'Insert', 46: 'Delete', 59: ';', 61: '=', 91: 'Meta', 92: 'Meta', 106: '*', 107: '+', 108: ',', 109: '-', 110: '.', 111: '/', 144: 'NumLock', 145: 'ScrollLock', 160: 'Shift', 161: 'Shift', 162: 'Control', 163: 'Control', 164: 'Alt', 165: 'Alt', 173: '-', 186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: '\'', 229: 'q'}, i={48: ')', 49: '!', 50: '@', 51: '#', 52: '$', 53: '%', 54: '^', 55: '&', 56: '*', 57: '(', 59: ':', 61: '+', 173: '_', 186: ':', 187: '+', 188: '<', 189: '_', 190: '>', 191: '?', 192: '~', 219: '{', 220: '|', 221: '}', 222: '"', 229: 'Q'}, o='undefined'!=typeof navigator&&/Chrome\/(\d+)/.exec(navigator.userAgent), s='undefined'!=typeof navigator&&/Apple Computer/.test(navigator.vendor), a='undefined'!=typeof navigator&&/Gecko\/\d+/.test(navigator.userAgent), l='undefined'!=typeof navigator&&/Mac/.test(navigator.platform), c='undefined'!=typeof navigator&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), u=o&&(l||+o[1]<57)||a&&l, d=0; d<10; d++)r[48+d]=r[96+d]=String(d); for (d=1; d<=24; d++)r[d+111]='F'+d; for (d=65; d<=90; d++)r[d]=String.fromCharCode(d+32), i[d]=String.fromCharCode(d); for (const h in r)i.hasOwnProperty(h)||(i[h]=r[h]); const p=n(922); const f='undefined'!=typeof navigator&&/Mac/.test(navigator.platform); function m(e) {
      let t; let n; let r; let i; const o=e.split(/-(?!$)/); let s=o[o.length-1]; 'Space'==s&&(s=' '); for (let a=0; a<o.length-1; a++) {
        const l=o[a]; if (/^(cmd|meta|m)$/i.test(l))i=!0; else if (/^a(lt)?$/i.test(l))t=!0; else if (/^(c|ctrl|control)$/i.test(l))n=!0; else if (/^s(hift)?$/i.test(l))r=!0; else {
          if (!/^mod$/i.test(l)) throw new Error('Unrecognized modifier name: '+l); f?i=!0:n=!0;
        }
      } return t&&(s='Alt-'+s), n&&(s='Ctrl-'+s), i&&(s='Meta-'+s), r&&(s='Shift-'+s), s;
    } function g(e, t, n) {
      return t.altKey&&(e='Alt-'+e), t.ctrlKey&&(e='Ctrl-'+e), t.metaKey&&(e='Meta-'+e), !1!==n&&t.shiftKey&&(e='Shift-'+e), e;
    } function v(e) {
      return new p.Sy({props: {handleKeyDown: y(e)}});
    } function y(e) {
      const t=function(e) {
        const t=Object.create(null); for (const n in e)t[m(n)]=e[n]; return t;
      }(e); return function(e, n) {
        let o; const a=function(e) {
          let t=!(u&&(e.ctrlKey||e.altKey||e.metaKey)||(s||c)&&e.shiftKey&&e.key&&1==e.key.length)&&e.key||(e.shiftKey?i:r)[e.keyCode]||e.key||'Unidentified'; return 'Esc'==t&&(t='Escape'), 'Del'==t&&(t='Delete'), 'Left'==t&&(t='ArrowLeft'), 'Up'==t&&(t='ArrowUp'), 'Right'==t&&(t='ArrowRight'), 'Down'==t&&(t='ArrowDown'), t;
        }(n); const l=1==a.length&&' '!=a; const d=t[g(a, n, !l)]; if (d&&d(e.state, e.dispatch, e)) return !0; if (l&&(n.shiftKey||n.altKey||n.metaKey||a.charCodeAt(0)>127)&&(o=r[n.keyCode])&&o!=a) {
          const h=t[g(o, n, !0)]; if (h&&h(e.state, e.dispatch, e)) return !0;
        } else if (l&&n.shiftKey) {
          const p=t[g(a, n, !0)]; if (p&&p(e.state, e.dispatch, e)) return !0;
        } return !1;
      };
    }
  }, 638: (e, t, n)=>{
    'use strict'; function r(e) {
      this.content=e;
    }n.d(t, {aw: ()=>se, PW: ()=>ye, HY: ()=>a, vc: ()=>h, ZU: ()=>re, NB: ()=>I, Ts: ()=>A, e4: ()=>p, V_: ()=>ie, p2: ()=>f}), r.prototype={constructor: r, find: function(e) {
      for (let t=0; t<this.content.length; t+=2) if (this.content[t]===e) return t; return -1;
    }, get: function(e) {
      const t=this.find(e); return -1==t?void 0:this.content[t+1];
    }, update: function(e, t, n) {
      const i=n&&n!=e?this.remove(n):this; const o=i.find(e); const s=i.content.slice(); return -1==o?s.push(n||e, t):(s[o+1]=t, n&&(s[o]=n)), new r(s);
    }, remove: function(e) {
      const t=this.find(e); if (-1==t) return this; const n=this.content.slice(); return n.splice(t, 2), new r(n);
    }, addToStart: function(e, t) {
      return new r([e, t].concat(this.remove(e).content));
    }, addToEnd: function(e, t) {
      const n=this.remove(e).content.slice(); return n.push(e, t), new r(n);
    }, addBefore: function(e, t, n) {
      const i=this.remove(t); const o=i.content.slice(); const s=i.find(e); return o.splice(-1==s?o.length:s, 0, t, n), new r(o);
    }, forEach: function(e) {
      for (let t=0; t<this.content.length; t+=2)e(this.content[t], this.content[t+1]);
    }, prepend: function(e) {
      return (e=r.from(e)).size?new r(e.content.concat(this.subtract(e).content)):this;
    }, append: function(e) {
      return (e=r.from(e)).size?new r(this.subtract(e).content.concat(e.content)):this;
    }, subtract: function(e) {
      let t=this; e=r.from(e); for (let n=0; n<e.content.length; n+=2)t=t.remove(e.content[n]); return t;
    }, get size() {
      return this.content.length>>1;
    }}, r.from=function(e) {
      if (e instanceof r) return e; const t=[]; if (e) for (const n in e)t.push(n, e[n]); return new r(t);
    }; const i=r; function o(e, t, n) {
      for (let r=0; ;r++) {
        if (r==e.childCount||r==t.childCount) return e.childCount==t.childCount?null:n; const i=e.child(r); const s=t.child(r); if (i!=s) {
          if (!i.sameMarkup(s)) return n; if (i.isText&&i.text!=s.text) {
            for (let a=0; i.text[a]==s.text[a]; a++)n++; return n;
          } if (i.content.size||s.content.size) {
            const l=o(i.content, s.content, n+1); if (null!=l) return l;
          }n+=i.nodeSize;
        } else n+=i.nodeSize;
      }
    } function s(e, t, n, r) {
      for (let i=e.childCount, o=t.childCount; ;) {
        if (0==i||0==o) return i==o?null:{a: n, b: r}; const a=e.child(--i); const l=t.child(--o); const c=a.nodeSize; if (a!=l) {
          if (!a.sameMarkup(l)) return {a: n, b: r}; if (a.isText&&a.text!=l.text) {
            for (let u=0, d=Math.min(a.text.length, l.text.length); u<d&&a.text[a.text.length-u-1]==l.text[l.text.length-u-1];)u++, n--, r--; return {a: n, b: r};
          } if (a.content.size||l.content.size) {
            const h=s(a.content, l.content, n-1, r-1); if (h) return h;
          }n-=c, r-=c;
        } else n-=c, r-=c;
      }
    } var a=function(e, t) {
      if (this.content=e, this.size=t||0, null==t) for (let n=0; n<e.length; n++) this.size+=e[n].nodeSize;
    }; const l={firstChild: {configurable: !0}, lastChild: {configurable: !0}, childCount: {configurable: !0}}; a.prototype.nodesBetween=function(e, t, n, r, i) {
      void 0===r&&(r=0); for (let o=0, s=0; s<t; o++) {
        const a=this.content[o]; const l=s+a.nodeSize; if (l>e&&!1!==n(a, r+s, i, o)&&a.content.size) {
          const c=s+1; a.nodesBetween(Math.max(0, e-c), Math.min(a.content.size, t-c), n, r+c);
        }s=l;
      }
    }, a.prototype.descendants=function(e) {
      this.nodesBetween(0, this.size, e);
    }, a.prototype.textBetween=function(e, t, n, r) {
      let i=''; let o=!0; return this.nodesBetween(e, t, (function(s, a) {
s.isText?(i+=s.text.slice(Math.max(e, a)-a, t-a), o=!n):s.isLeaf&&r?(i+=r, o=!n):!o&&s.isBlock&&(i+=n, o=!0);
      }), 0), i;
    }, a.prototype.append=function(e) {
      if (!e.size) return this; if (!this.size) return e; const t=this.lastChild; const n=e.firstChild; const r=this.content.slice(); let i=0; for (t.isText&&t.sameMarkup(n)&&(r[r.length-1]=t.withText(t.text+n.text), i=1); i<e.content.length; i++)r.push(e.content[i]); return new a(r, this.size+e.size);
    }, a.prototype.cut=function(e, t) {
      if (null==t&&(t=this.size), 0==e&&t==this.size) return this; const n=[]; let r=0; if (t>e) {
        for (let i=0, o=0; o<t; i++) {
          let s=this.content[i]; const l=o+s.nodeSize; l>e&&((o<e||l>t)&&(s=s.isText?s.cut(Math.max(0, e-o), Math.min(s.text.length, t-o)):s.cut(Math.max(0, e-o-1), Math.min(s.content.size, t-o-1))), n.push(s), r+=s.nodeSize), o=l;
        }
      } return new a(n, r);
    }, a.prototype.cutByIndex=function(e, t) {
      return e==t?a.empty:0==e&&t==this.content.length?this:new a(this.content.slice(e, t));
    }, a.prototype.replaceChild=function(e, t) {
      const n=this.content[e]; if (n==t) return this; const r=this.content.slice(); const i=this.size+t.nodeSize-n.nodeSize; return r[e]=t, new a(r, i);
    }, a.prototype.addToStart=function(e) {
      return new a([e].concat(this.content), this.size+e.nodeSize);
    }, a.prototype.addToEnd=function(e) {
      return new a(this.content.concat(e), this.size+e.nodeSize);
    }, a.prototype.eq=function(e) {
      if (this.content.length!=e.content.length) return !1; for (let t=0; t<this.content.length; t++) if (!this.content[t].eq(e.content[t])) return !1; return !0;
    }, l.firstChild.get=function() {
      return this.content.length?this.content[0]:null;
    }, l.lastChild.get=function() {
      return this.content.length?this.content[this.content.length-1]:null;
    }, l.childCount.get=function() {
      return this.content.length;
    }, a.prototype.child=function(e) {
      const t=this.content[e]; if (!t) throw new RangeError('Index '+e+' out of range for '+this); return t;
    }, a.prototype.maybeChild=function(e) {
      return this.content[e];
    }, a.prototype.forEach=function(e) {
      for (let t=0, n=0; t<this.content.length; t++) {
        const r=this.content[t]; e(r, n, t), n+=r.nodeSize;
      }
    }, a.prototype.findDiffStart=function(e, t) {
      return void 0===t&&(t=0), o(this, e, t);
    }, a.prototype.findDiffEnd=function(e, t, n) {
      return void 0===t&&(t=this.size), void 0===n&&(n=e.size), s(this, e, t, n);
    }, a.prototype.findIndex=function(e, t) {
      if (void 0===t&&(t=-1), 0==e) return u(0, e); if (e==this.size) return u(this.content.length, e); if (e> this.size||e<0) throw new RangeError('Position '+e+' outside of fragment ('+this+')'); for (let n=0, r=0; ;n++) {
        const i=r+this.child(n).nodeSize; if (i>=e) return i==e||t>0?u(n+1, i):u(n, r); r=i;
      }
    }, a.prototype.toString=function() {
      return '<'+this.toStringInner()+'>';
    }, a.prototype.toStringInner=function() {
      return this.content.join(', ');
    }, a.prototype.toJSON=function() {
      return this.content.length?this.content.map((function(e) {
        return e.toJSON();
      })):null;
    }, a.fromJSON=function(e, t) {
      if (!t) return a.empty; if (!Array.isArray(t)) throw new RangeError('Invalid input for Fragment.fromJSON'); return new a(t.map(e.nodeFromJSON));
    }, a.fromArray=function(e) {
      if (!e.length) return a.empty; for (var t, n=0, r=0; r<e.length; r++) {
        const i=e[r]; n+=i.nodeSize, r&&i.isText&&e[r-1].sameMarkup(i)?(t||(t=e.slice(0, r)), t[t.length-1]=i.withText(t[t.length-1].text+i.text)):t&&t.push(i);
      } return new a(t||e, n);
    }, a.from=function(e) {
      if (!e) return a.empty; if (e instanceof a) return e; if (Array.isArray(e)) return this.fromArray(e); if (e.attrs) return new a([e], e.nodeSize); throw new RangeError('Can not convert '+e+' to a Fragment'+(e.nodesBetween?' (looks like multiple versions of prosemirror-model were loaded)':''));
    }, Object.defineProperties(a.prototype, l); const c={index: 0, offset: 0}; function u(e, t) {
      return c.index=e, c.offset=t, c;
    } function d(e, t) {
      if (e===t) return !0; if (!e||'object'!=typeof e||!t||'object'!=typeof t) return !1; const n=Array.isArray(e); if (Array.isArray(t)!=n) return !1; if (n) {
        if (e.length!=t.length) return !1; for (let r=0; r<e.length; r++) if (!d(e[r], t[r])) return !1;
      } else {
        for (const i in e) if (!(i in t)||!d(e[i], t[i])) return !1; for (const o in t) if (!(o in e)) return !1;
      } return !0;
    }a.empty=new a([], 0); var h=function(e, t) {
      this.type=e, this.attrs=t;
    }; function p(e) {
      const t=Error.call(this, e); return t.__proto__=p.prototype, t;
    }h.prototype.addToSet=function(e) {
      for (var t, n=!1, r=0; r<e.length; r++) {
        const i=e[r]; if (this.eq(i)) return e; if (this.type.excludes(i.type))t||(t=e.slice(0, r)); else {
          if (i.type.excludes(this.type)) return e; !n&&i.type.rank> this.type.rank&&(t||(t=e.slice(0, r)), t.push(this), n=!0), t&&t.push(i);
        }
      } return t||(t=e.slice()), n||t.push(this), t;
    }, h.prototype.removeFromSet=function(e) {
      for (let t=0; t<e.length; t++) if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t+1)); return e;
    }, h.prototype.isInSet=function(e) {
      for (let t=0; t<e.length; t++) if (this.eq(e[t])) return !0; return !1;
    }, h.prototype.eq=function(e) {
      return this==e||this.type==e.type&&d(this.attrs, e.attrs);
    }, h.prototype.toJSON=function() {
      const e={type: this.type.name}; for (const t in this.attrs) {
        e.attrs=this.attrs; break;
      } return e;
    }, h.fromJSON=function(e, t) {
      if (!t) throw new RangeError('Invalid input for Mark.fromJSON'); const n=e.marks[t.type]; if (!n) throw new RangeError('There is no mark type '+t.type+' in this schema'); return n.create(t.attrs);
    }, h.sameSet=function(e, t) {
      if (e==t) return !0; if (e.length!=t.length) return !1; for (let n=0; n<e.length; n++) if (!e[n].eq(t[n])) return !1; return !0;
    }, h.setFrom=function(e) {
      if (!e||0==e.length) return h.none; if (e instanceof h) return [e]; const t=e.slice(); return t.sort((function(e, t) {
        return e.type.rank-t.type.rank;
      })), t;
    }, h.none=[], p.prototype=Object.create(Error.prototype), p.prototype.constructor=p, p.prototype.name='ReplaceError'; var f=function(e, t, n) {
      this.content=e, this.openStart=t, this.openEnd=n;
    }; const m={size: {configurable: !0}}; function g(e, t, n) {
      const r=e.findIndex(t); const i=r.index; const o=r.offset; const s=e.maybeChild(i); const a=e.findIndex(n); const l=a.index; const c=a.offset; if (o==t||s.isText) {
        if (c!=n&&!e.child(l).isText) throw new RangeError('Removing non-flat range'); return e.cut(0, t).append(e.cut(n));
      } if (i!=l) throw new RangeError('Removing non-flat range'); return e.replaceChild(i, s.copy(g(s.content, t-o-1, n-o-1)));
    } function v(e, t, n, r) {
      const i=e.findIndex(t); const o=i.index; const s=i.offset; const a=e.maybeChild(o); if (s==t||a.isText) return r&&!r.canReplace(o, o, n)?null:e.cut(0, t).append(n).append(e.cut(t)); const l=v(a.content, t-s-1, n); return l&&e.replaceChild(o, a.copy(l));
    } function y(e, t, n) {
      if (n.openStart>e.depth) throw new p('Inserted content deeper than insertion position'); if (e.depth-n.openStart!=t.depth-n.openEnd) throw new p('Inconsistent open depths'); return b(e, t, n, 0);
    } function b(e, t, n, r) {
      const i=e.index(r); const o=e.node(r); if (i==t.index(r)&&r<e.depth-n.openStart) {
        const s=b(e, t, n, r+1); return o.copy(o.content.replaceChild(i, s));
      } if (n.content.size) {
        if (n.openStart||n.openEnd||e.depth!=r||t.depth!=r) {
          const l=function(e, t) {
            for (var n=t.depth-e.openStart, r=t.node(n).copy(e.content), i=n-1; i>=0; i--)r=t.node(i).copy(a.from(r)); return {start: r.resolveNoCache(e.openStart+n), end: r.resolveNoCache(r.content.size-e.openEnd-n)};
          }(n, e); return S(o, C(e, l.start, l.end, t, r));
        } const c=e.parent; const u=c.content; return S(c, u.cut(0, e.parentOffset).append(n.content).append(u.cut(t.parentOffset)));
      } return S(o, M(e, t, r));
    } function w(e, t) {
      if (!t.type.compatibleContent(e.type)) throw new p('Cannot join '+t.type.name+' onto '+e.type.name);
    } function x(e, t, n) {
      const r=e.node(n); return w(r, t.node(n)), r;
    } function k(e, t) {
      const n=t.length-1; n>=0&&e.isText&&e.sameMarkup(t[n])?t[n]=e.withText(t[n].text+e.text):t.push(e);
    } function _(e, t, n, r) {
      const i=(t||e).node(n); let o=0; const s=t?t.index(n):i.childCount; e&&(o=e.index(n), e.depth>n?o++:e.textOffset&&(k(e.nodeAfter, r), o++)); for (let a=o; a<s; a++)k(i.child(a), r); t&&t.depth==n&&t.textOffset&&k(t.nodeBefore, r);
    } function S(e, t) {
      if (!e.type.validContent(t)) throw new p('Invalid content for node '+e.type.name); return e.copy(t);
    } function C(e, t, n, r, i) {
      const o=e.depth>i&&x(e, t, i+1); const s=r.depth>i&&x(n, r, i+1); const l=[]; return _(null, e, i, l), o&&s&&t.index(i)==n.index(i)?(w(o, s), k(S(o, C(e, t, n, r, i+1)), l)):(o&&k(S(o, M(e, t, i+1)), l), _(t, n, i, l), s&&k(S(s, M(n, r, i+1)), l)), _(r, null, i, l), new a(l);
    } function M(e, t, n) {
      const r=[]; return _(null, e, n, r), e.depth>n&&k(S(x(e, t, n+1), M(e, t, n+1)), r), _(t, null, n, r), new a(r);
    }m.size.get=function() {
      return this.content.size-this.openStart-this.openEnd;
    }, f.prototype.insertAt=function(e, t) {
      const n=v(this.content, e+this.openStart, t, null); return n&&new f(n, this.openStart, this.openEnd);
    }, f.prototype.removeBetween=function(e, t) {
      return new f(g(this.content, e+this.openStart, t+this.openStart), this.openStart, this.openEnd);
    }, f.prototype.eq=function(e) {
      return this.content.eq(e.content)&&this.openStart==e.openStart&&this.openEnd==e.openEnd;
    }, f.prototype.toString=function() {
      return this.content+'('+this.openStart+','+this.openEnd+')';
    }, f.prototype.toJSON=function() {
      if (!this.content.size) return null; const e={content: this.content.toJSON()}; return this.openStart>0&&(e.openStart=this.openStart), this.openEnd>0&&(e.openEnd=this.openEnd), e;
    }, f.fromJSON=function(e, t) {
      if (!t) return f.empty; const n=t.openStart||0; const r=t.openEnd||0; if ('number'!=typeof n||'number'!=typeof r) throw new RangeError('Invalid input for Slice.fromJSON'); return new f(a.fromJSON(e, t.content), n, r);
    }, f.maxOpen=function(e, t) {
      void 0===t&&(t=!0); for (var n=0, r=0, i=e.firstChild; i&&!i.isLeaf&&(t||!i.type.spec.isolating); i=i.firstChild)n++; for (let o=e.lastChild; o&&!o.isLeaf&&(t||!o.type.spec.isolating); o=o.lastChild)r++; return new f(e, n, r);
    }, Object.defineProperties(f.prototype, m), f.empty=new f(a.empty, 0, 0); const T=function(e, t, n) {
      this.pos=e, this.path=t, this.depth=t.length/3-1, this.parentOffset=n;
    }; const O={parent: {configurable: !0}, doc: {configurable: !0}, textOffset: {configurable: !0}, nodeAfter: {configurable: !0}, nodeBefore: {configurable: !0}}; T.prototype.resolveDepth=function(e) {
      return null==e?this.depth:e<0?this.depth+e:e;
    }, O.parent.get=function() {
      return this.node(this.depth);
    }, O.doc.get=function() {
      return this.node(0);
    }, T.prototype.node=function(e) {
      return this.path[3*this.resolveDepth(e)];
    }, T.prototype.index=function(e) {
      return this.path[3*this.resolveDepth(e)+1];
    }, T.prototype.indexAfter=function(e) {
      return e=this.resolveDepth(e), this.index(e)+(e!=this.depth||this.textOffset?1:0);
    }, T.prototype.start=function(e) {
      return 0==(e=this.resolveDepth(e))?0:this.path[3*e-1]+1;
    }, T.prototype.end=function(e) {
      return e=this.resolveDepth(e), this.start(e)+this.node(e).content.size;
    }, T.prototype.before=function(e) {
      if (!(e=this.resolveDepth(e))) throw new RangeError('There is no position before the top-level node'); return e==this.depth+1?this.pos:this.path[3*e-1];
    }, T.prototype.after=function(e) {
      if (!(e=this.resolveDepth(e))) throw new RangeError('There is no position after the top-level node'); return e==this.depth+1?this.pos:this.path[3*e-1]+this.path[3*e].nodeSize;
    }, O.textOffset.get=function() {
      return this.pos-this.path[this.path.length-1];
    }, O.nodeAfter.get=function() {
      const e=this.parent; const t=this.index(this.depth); if (t==e.childCount) return null; const n=this.pos-this.path[this.path.length-1]; const r=e.child(t); return n?e.child(t).cut(n):r;
    }, O.nodeBefore.get=function() {
      const e=this.index(this.depth); const t=this.pos-this.path[this.path.length-1]; return t?this.parent.child(e).cut(0, t):0==e?null:this.parent.child(e-1);
    }, T.prototype.posAtIndex=function(e, t) {
      t=this.resolveDepth(t); for (var n=this.path[3*t], r=0==t?0:this.path[3*t-1]+1, i=0; i<e; i++)r+=n.child(i).nodeSize; return r;
    }, T.prototype.marks=function() {
      const e=this.parent; const t=this.index(); if (0==e.content.size) return h.none; if (this.textOffset) return e.child(t).marks; let n=e.maybeChild(t-1); let r=e.maybeChild(t); if (!n) {
        const i=n; n=r, r=i;
      } for (var o=n.marks, s=0; s<o.length; s++)!1!==o[s].type.spec.inclusive||r&&o[s].isInSet(r.marks)||(o=o[s--].removeFromSet(o)); return o;
    }, T.prototype.marksAcross=function(e) {
      const t=this.parent.maybeChild(this.index()); if (!t||!t.isInline) return null; for (var n=t.marks, r=e.parent.maybeChild(e.index()), i=0; i<n.length; i++)!1!==n[i].type.spec.inclusive||r&&n[i].isInSet(r.marks)||(n=n[i--].removeFromSet(n)); return n;
    }, T.prototype.sharedDepth=function(e) {
      for (let t=this.depth; t>0; t--) if (this.start(t)<=e&&this.end(t)>=e) return t; return 0;
    }, T.prototype.blockRange=function(e, t) {
      if (void 0===e&&(e=this), e.pos<this.pos) return e.blockRange(this); for (let n=this.depth-(this.parent.inlineContent||this.pos==e.pos?1:0); n>=0; n--) if (e.pos<=this.end(n)&&(!t||t(this.node(n)))) return new A(this, e, n);
    }, T.prototype.sameParent=function(e) {
      return this.pos-this.parentOffset==e.pos-e.parentOffset;
    }, T.prototype.max=function(e) {
      return e.pos> this.pos?e:this;
    }, T.prototype.min=function(e) {
      return e.pos<this.pos?e:this;
    }, T.prototype.toString=function() {
      for (var e='', t=1; t<=this.depth; t++)e+=(e?'/':'')+this.node(t).type.name+'_'+this.index(t-1); return e+':'+this.parentOffset;
    }, T.resolve=function(e, t) {
      if (!(t>=0&&t<=e.content.size)) throw new RangeError('Position '+t+' out of range'); for (var n=[], r=0, i=t, o=e; ;) {
        const s=o.content.findIndex(i); const a=s.index; const l=s.offset; const c=i-l; if (n.push(o, a, r+l), !c) break; if ((o=o.child(a)).isText) break; i=c-1, r+=l+1;
      } return new T(t, n, i);
    }, T.resolveCached=function(e, t) {
      for (let n=0; n<D.length; n++) {
        const r=D[n]; if (r.pos==t&&r.doc==e) return r;
      } const i=D[E]=T.resolve(e, t); return E=(E+1)%N, i;
    }, Object.defineProperties(T.prototype, O); var D=[]; var E=0; var N=12; var A=function(e, t, n) {
      this.$from=e, this.$to=t, this.depth=n;
    }; const L={start: {configurable: !0}, end: {configurable: !0}, parent: {configurable: !0}, startIndex: {configurable: !0}, endIndex: {configurable: !0}}; L.start.get=function() {
      return this.$from.before(this.depth+1);
    }, L.end.get=function() {
      return this.$to.after(this.depth+1);
    }, L.parent.get=function() {
      return this.$from.node(this.depth);
    }, L.startIndex.get=function() {
      return this.$from.index(this.depth);
    }, L.endIndex.get=function() {
      return this.$to.indexAfter(this.depth);
    }, Object.defineProperties(A.prototype, L); const z=Object.create(null); var I=function(e, t, n, r) {
      this.type=e, this.attrs=t, this.content=n||a.empty, this.marks=r||h.none;
    }; const q={nodeSize: {configurable: !0}, childCount: {configurable: !0}, textContent: {configurable: !0}, firstChild: {configurable: !0}, lastChild: {configurable: !0}, isBlock: {configurable: !0}, isTextblock: {configurable: !0}, inlineContent: {configurable: !0}, isInline: {configurable: !0}, isText: {configurable: !0}, isLeaf: {configurable: !0}, isAtom: {configurable: !0}}; q.nodeSize.get=function() {
      return this.isLeaf?1:2+this.content.size;
    }, q.childCount.get=function() {
      return this.content.childCount;
    }, I.prototype.child=function(e) {
      return this.content.child(e);
    }, I.prototype.maybeChild=function(e) {
      return this.content.maybeChild(e);
    }, I.prototype.forEach=function(e) {
      this.content.forEach(e);
    }, I.prototype.nodesBetween=function(e, t, n, r) {
      void 0===r&&(r=0), this.content.nodesBetween(e, t, n, r, this);
    }, I.prototype.descendants=function(e) {
      this.nodesBetween(0, this.content.size, e);
    }, q.textContent.get=function() {
      return this.textBetween(0, this.content.size, '');
    }, I.prototype.textBetween=function(e, t, n, r) {
      return this.content.textBetween(e, t, n, r);
    }, q.firstChild.get=function() {
      return this.content.firstChild;
    }, q.lastChild.get=function() {
      return this.content.lastChild;
    }, I.prototype.eq=function(e) {
      return this==e||this.sameMarkup(e)&&this.content.eq(e.content);
    }, I.prototype.sameMarkup=function(e) {
      return this.hasMarkup(e.type, e.attrs, e.marks);
    }, I.prototype.hasMarkup=function(e, t, n) {
      return this.type==e&&d(this.attrs, t||e.defaultAttrs||z)&&h.sameSet(this.marks, n||h.none);
    }, I.prototype.copy=function(e) {
      return void 0===e&&(e=null), e==this.content?this:new this.constructor(this.type, this.attrs, e, this.marks);
    }, I.prototype.mark=function(e) {
      return e==this.marks?this:new this.constructor(this.type, this.attrs, this.content, e);
    }, I.prototype.cut=function(e, t) {
      return 0==e&&t==this.content.size?this:this.copy(this.content.cut(e, t));
    }, I.prototype.slice=function(e, t, n) {
      if (void 0===t&&(t=this.content.size), void 0===n&&(n=!1), e==t) return f.empty; const r=this.resolve(e); const i=this.resolve(t); const o=n?0:r.sharedDepth(t); const s=r.start(o); const a=r.node(o).content.cut(r.pos-s, i.pos-s); return new f(a, r.depth-o, i.depth-o);
    }, I.prototype.replace=function(e, t, n) {
      return y(this.resolve(e), this.resolve(t), n);
    }, I.prototype.nodeAt=function(e) {
      for (let t=this; ;) {
        const n=t.content.findIndex(e); const r=n.index; const i=n.offset; if (!(t=t.maybeChild(r))) return null; if (i==e||t.isText) return t; e-=i+1;
      }
    }, I.prototype.childAfter=function(e) {
      const t=this.content.findIndex(e); const n=t.index; const r=t.offset; return {node: this.content.maybeChild(n), index: n, offset: r};
    }, I.prototype.childBefore=function(e) {
      if (0==e) return {node: null, index: 0, offset: 0}; const t=this.content.findIndex(e); const n=t.index; const r=t.offset; if (r<e) return {node: this.content.child(n), index: n, offset: r}; const i=this.content.child(n-1); return {node: i, index: n-1, offset: r-i.nodeSize};
    }, I.prototype.resolve=function(e) {
      return T.resolveCached(this, e);
    }, I.prototype.resolveNoCache=function(e) {
      return T.resolve(this, e);
    }, I.prototype.rangeHasMark=function(e, t, n) {
      let r=!1; return t>e&&this.nodesBetween(e, t, (function(e) {
        return n.isInSet(e.marks)&&(r=!0), !r;
      })), r;
    }, q.isBlock.get=function() {
      return this.type.isBlock;
    }, q.isTextblock.get=function() {
      return this.type.isTextblock;
    }, q.inlineContent.get=function() {
      return this.type.inlineContent;
    }, q.isInline.get=function() {
      return this.type.isInline;
    }, q.isText.get=function() {
      return this.type.isText;
    }, q.isLeaf.get=function() {
      return this.type.isLeaf;
    }, q.isAtom.get=function() {
      return this.type.isAtom;
    }, I.prototype.toString=function() {
      if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this); let e=this.type.name; return this.content.size&&(e+='('+this.content.toStringInner()+')'), P(this.marks, e);
    }, I.prototype.contentMatchAt=function(e) {
      const t=this.type.contentMatch.matchFragment(this.content, 0, e); if (!t) throw new Error('Called contentMatchAt on a node with invalid content'); return t;
    }, I.prototype.canReplace=function(e, t, n, r, i) {
      void 0===n&&(n=a.empty), void 0===r&&(r=0), void 0===i&&(i=n.childCount); const o=this.contentMatchAt(e).matchFragment(n, r, i); const s=o&&o.matchFragment(this.content, t); if (!s||!s.validEnd) return !1; for (let l=r; l<i; l++) if (!this.type.allowsMarks(n.child(l).marks)) return !1; return !0;
    }, I.prototype.canReplaceWith=function(e, t, n, r) {
      if (r&&!this.type.allowsMarks(r)) return !1; const i=this.contentMatchAt(e).matchType(n); const o=i&&i.matchFragment(this.content, t); return !!o&&o.validEnd;
    }, I.prototype.canAppend=function(e) {
      return e.content.size?this.canReplace(this.childCount, this.childCount, e.content):this.type.compatibleContent(e.type);
    }, I.prototype.check=function() {
      if (!this.type.validContent(this.content)) throw new RangeError('Invalid content for node '+this.type.name+': '+this.content.toString().slice(0, 50)); this.content.forEach((function(e) {
        return e.check();
      }));
    }, I.prototype.toJSON=function() {
      const e={type: this.type.name}; for (const t in this.attrs) {
        e.attrs=this.attrs; break;
      } return this.content.size&&(e.content=this.content.toJSON()), this.marks.length&&(e.marks=this.marks.map((function(e) {
        return e.toJSON();
      }))), e;
    }, I.fromJSON=function(e, t) {
      if (!t) throw new RangeError('Invalid input for Node.fromJSON'); let n=null; if (t.marks) {
        if (!Array.isArray(t.marks)) throw new RangeError('Invalid mark data for Node.fromJSON'); n=t.marks.map(e.markFromJSON);
      } if ('text'==t.type) {
        if ('string'!=typeof t.text) throw new RangeError('Invalid text node in JSON'); return e.text(t.text, n);
      } const r=a.fromJSON(e, t.content); return e.nodeType(t.type).create(t.attrs, r, n);
    }, Object.defineProperties(I.prototype, q); const F=function(e) {
      function t(t, n, r, i) {
        if (e.call(this, t, n, null, i), !r) throw new RangeError('Empty text nodes are not allowed'); this.text=r;
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={textContent: {configurable: !0}, nodeSize: {configurable: !0}}; return t.prototype.toString=function() {
        return this.type.spec.toDebugString?this.type.spec.toDebugString(this):P(this.marks, JSON.stringify(this.text));
      }, n.textContent.get=function() {
        return this.text;
      }, t.prototype.textBetween=function(e, t) {
        return this.text.slice(e, t);
      }, n.nodeSize.get=function() {
        return this.text.length;
      }, t.prototype.mark=function(e) {
        return e==this.marks?this:new t(this.type, this.attrs, this.text, e);
      }, t.prototype.withText=function(e) {
        return e==this.text?this:new t(this.type, this.attrs, e, this.marks);
      }, t.prototype.cut=function(e, t) {
        return void 0===e&&(e=0), void 0===t&&(t=this.text.length), 0==e&&t==this.text.length?this:this.withText(this.text.slice(e, t));
      }, t.prototype.eq=function(e) {
        return this.sameMarkup(e)&&this.text==e.text;
      }, t.prototype.toJSON=function() {
        const t=e.prototype.toJSON.call(this); return t.text=this.text, t;
      }, Object.defineProperties(t.prototype, n), t;
    }(I); function P(e, t) {
      for (let n=e.length-1; n>=0; n--)t=e[n].type.name+'('+t+')'; return t;
    } const R=function(e) {
      this.validEnd=e, this.next=[], this.wrapCache=[];
    }; const B={inlineContent: {configurable: !0}, defaultType: {configurable: !0}, edgeCount: {configurable: !0}}; R.parse=function(e, t) {
      const n=new j(e, t); if (null==n.next) return R.empty; const r=H(n); n.next&&n.err('Unexpected trailing text'); let i; let o; const s=(i=function(e) {
        const t=[[]]; return i(function e(t, o) {
          if ('choice'==t.type) {
            return t.exprs.reduce((function(t, n) {
              return t.concat(e(n, o));
            }), []);
          } if ('seq'==t.type) {
            for (let s=0; ;s++) {
              const a=e(t.exprs[s], o); if (s==t.exprs.length-1) return a; i(a, o=n());
            }
          } else {
            if ('star'==t.type) {
              const l=n(); return r(o, l), i(e(t.expr, l), l), [r(l)];
            } if ('plus'==t.type) {
              const c=n(); return i(e(t.expr, o), c), i(e(t.expr, c), c), [r(c)];
            } if ('opt'==t.type) return [r(o)].concat(e(t.expr, o)); if ('range'==t.type) {
              for (var u=o, d=0; d<t.min; d++) {
                const h=n(); i(e(t.expr, u), h), u=h;
              } if (-1==t.max)i(e(t.expr, u), u); else {
                for (let p=t.min; p<t.max; p++) {
                  const f=n(); r(u, f), i(e(t.expr, u), f), u=f;
                }
              } return [r(u)];
            } if ('name'==t.type) return [r(o, null, t.value)];
          }
        }(e, 0), n()), t; function n() {
          return t.push([])-1;
        } function r(e, n, r) {
          const i={term: r, to: n}; return t[e].push(i), i;
        } function i(e, t) {
          e.forEach((function(e) {
            return e.to=t;
          }));
        }
      }(r), o=Object.create(null), function e(t) {
        const n=[]; t.forEach((function(e) {
          i[e].forEach((function(e) {
            const t=e.term; const r=e.to; if (t) {
              const o=n.indexOf(t); let s=o>-1&&n[o+1]; Y(i, r).forEach((function(e) {
                s||n.push(t, s=[]), -1==s.indexOf(e)&&s.push(e);
              }));
            }
          }));
        })); for (var r=o[t.join(',')]=new R(t.indexOf(i.length-1)>-1), s=0; s<n.length; s+=2) {
          const a=n[s+1].sort(J); r.next.push(n[s], o[a.join(',')]||e(a));
        } return r;
      }(Y(i, 0))); return function(e, t) {
        for (let n=0, r=[e]; n<r.length; n++) {
          for (var i=r[n], o=!i.validEnd, s=[], a=0; a<i.next.length; a+=2) {
            const l=i.next[a]; const c=i.next[a+1]; s.push(l.name), !o||l.isText||l.hasRequiredAttrs()||(o=!1), -1==r.indexOf(c)&&r.push(c);
          }o&&t.err('Only non-generatable nodes ('+s.join(', ')+') in a required position (see https://prosemirror.net/docs/guide/#generatable)');
        }
      }(s, n), s;
    }, R.prototype.matchType=function(e) {
      for (let t=0; t<this.next.length; t+=2) if (this.next[t]==e) return this.next[t+1]; return null;
    }, R.prototype.matchFragment=function(e, t, n) {
      void 0===t&&(t=0), void 0===n&&(n=e.childCount); for (var r=this, i=t; r&&i<n; i++)r=r.matchType(e.child(i).type); return r;
    }, B.inlineContent.get=function() {
      const e=this.next[0]; return !!e&&e.isInline;
    }, B.defaultType.get=function() {
      for (let e=0; e<this.next.length; e+=2) {
        const t=this.next[e]; if (!t.isText&&!t.hasRequiredAttrs()) return t;
      }
    }, R.prototype.compatible=function(e) {
      for (let t=0; t<this.next.length; t+=2) for (let n=0; n<e.next.length; n+=2) if (this.next[t]==e.next[n]) return !0; return !1;
    }, R.prototype.fillBefore=function(e, t, n) {
      void 0===t&&(t=!1), void 0===n&&(n=0); const r=[this]; return function i(o, s) {
        const l=o.matchFragment(e, n); if (l&&(!t||l.validEnd)) {
          return a.from(s.map((function(e) {
            return e.createAndFill();
          })));
        } for (let c=0; c<o.next.length; c+=2) {
          const u=o.next[c]; const d=o.next[c+1]; if (!u.isText&&!u.hasRequiredAttrs()&&-1==r.indexOf(d)) {
            r.push(d); const h=i(d, s.concat(u)); if (h) return h;
          }
        }
      }(this, []);
    }, R.prototype.findWrapping=function(e) {
      for (let t=0; t<this.wrapCache.length; t+=2) if (this.wrapCache[t]==e) return this.wrapCache[t+1]; const n=this.computeWrapping(e); return this.wrapCache.push(e, n), n;
    }, R.prototype.computeWrapping=function(e) {
      for (let t=Object.create(null), n=[{match: this, type: null, via: null}]; n.length;) {
        const r=n.shift(); const i=r.match; if (i.matchType(e)) {
          for (var o=[], s=r; s.type; s=s.via)o.push(s.type); return o.reverse();
        } for (let a=0; a<i.next.length; a+=2) {
          const l=i.next[a]; l.isLeaf||l.hasRequiredAttrs()||l.name in t||r.type&&!i.next[a+1].validEnd||(n.push({match: l.contentMatch, type: l, via: r}), t[l.name]=!0);
        }
      }
    }, B.edgeCount.get=function() {
      return this.next.length>>1;
    }, R.prototype.edge=function(e) {
      const t=e<<1; if (t>=this.next.length) throw new RangeError('There\'s no '+e+'th edge in this content match'); return {type: this.next[t], next: this.next[t+1]};
    }, R.prototype.toString=function() {
      const e=[]; return function t(n) {
        e.push(n); for (let r=1; r<n.next.length; r+=2)-1==e.indexOf(n.next[r])&&t(n.next[r]);
      }(this), e.map((function(t, n) {
        for (var r=n+(t.validEnd?'*':' ')+' ', i=0; i<t.next.length; i+=2)r+=(i?', ':'')+t.next[i].name+'->'+e.indexOf(t.next[i+1]); return r;
      })).join('\n');
    }, Object.defineProperties(R.prototype, B), R.empty=new R(!0); var j=function(e, t) {
      this.string=e, this.nodeTypes=t, this.inline=null, this.pos=0, this.tokens=e.split(/\s*(?=\b|\W|$)/), ''==this.tokens[this.tokens.length-1]&&this.tokens.pop(), ''==this.tokens[0]&&this.tokens.unshift();
    }; const W={next: {configurable: !0}}; function H(e) {
      const t=[]; do {
        t.push(V(e));
      } while (e.eat('|')); return 1==t.length?t[0]:{type: 'choice', exprs: t};
    } function V(e) {
      const t=[]; do {
        t.push($(e));
      } while (e.next&&')'!=e.next&&'|'!=e.next); return 1==t.length?t[0]:{type: 'seq', exprs: t};
    } function $(e) {
      for (var t=function(e) {
        if (e.eat('(')) {
          const t=H(e); return e.eat(')')||e.err('Missing closing paren'), t;
        } if (!/\W/.test(e.next)) {
          const n=function(e, t) {
            const n=e.nodeTypes; const r=n[t]; if (r) return [r]; const i=[]; for (const o in n) {
              const s=n[o]; s.groups.indexOf(t)>-1&&i.push(s);
            } return 0==i.length&&e.err('No node type or group \''+t+'\' found'), i;
          }(e, e.next).map((function(t) {
            return null==e.inline?e.inline=t.isInline:e.inline!=t.isInline&&e.err('Mixing inline and block content'), {type: 'name', value: t};
          })); return e.pos++, 1==n.length?n[0]:{type: 'choice', exprs: n};
        }e.err('Unexpected token \''+e.next+'\'');
      }(e); ;) {
        if (e.eat('+'))t={type: 'plus', expr: t}; else if (e.eat('*'))t={type: 'star', expr: t}; else if (e.eat('?'))t={type: 'opt', expr: t}; else {
          if (!e.eat('{')) break; t=K(e, t);
        }
      } return t;
    } function U(e) {
      /\D/.test(e.next)&&e.err('Expected number, got \''+e.next+'\''); const t=Number(e.next); return e.pos++, t;
    } function K(e, t) {
      const n=U(e); let r=n; return e.eat(',')&&(r='}'!=e.next?U(e):-1), e.eat('}')||e.err('Unclosed braced range'), {type: 'range', min: n, max: r, expr: t};
    } function J(e, t) {
      return t-e;
    } function Y(e, t) {
      const n=[]; return function t(r) {
        const i=e[r]; if (1==i.length&&!i[0].term) return t(i[0].to); n.push(r); for (let o=0; o<i.length; o++) {
          const s=i[o]; const a=s.term; const l=s.to; a||-1!=n.indexOf(l)||t(l);
        }
      }(t), n.sort(J);
    } function G(e) {
      const t=Object.create(null); for (const n in e) {
        const r=e[n]; if (!r.hasDefault) return null; t[n]=r.default;
      } return t;
    } function X(e, t) {
      const n=Object.create(null); for (const r in e) {
        let i=t&&t[r]; if (void 0===i) {
          const o=e[r]; if (!o.hasDefault) throw new RangeError('No value supplied for attribute '+r); i=o.default;
        }n[r]=i;
      } return n;
    } function Z(e) {
      const t=Object.create(null); if (e) for (const n in e)t[n]=new te(e[n]); return t;
    }W.next.get=function() {
      return this.tokens[this.pos];
    }, j.prototype.eat=function(e) {
      return this.next==e&&(this.pos++||!0);
    }, j.prototype.err=function(e) {
      throw new SyntaxError(e+' (in content expression \''+this.string+'\')');
    }, Object.defineProperties(j.prototype, W); const Q=function(e, t, n) {
      this.name=e, this.schema=t, this.spec=n, this.groups=n.group?n.group.split(' '):[], this.attrs=Z(n.attrs), this.defaultAttrs=G(this.attrs), this.contentMatch=null, this.markSet=null, this.inlineContent=null, this.isBlock=!(n.inline||'text'==e), this.isText='text'==e;
    }; const ee={isInline: {configurable: !0}, isTextblock: {configurable: !0}, isLeaf: {configurable: !0}, isAtom: {configurable: !0}}; ee.isInline.get=function() {
      return !this.isBlock;
    }, ee.isTextblock.get=function() {
      return this.isBlock&&this.inlineContent;
    }, ee.isLeaf.get=function() {
      return this.contentMatch==R.empty;
    }, ee.isAtom.get=function() {
      return this.isLeaf||this.spec.atom;
    }, Q.prototype.hasRequiredAttrs=function() {
      for (const e in this.attrs) if (this.attrs[e].isRequired) return !0; return !1;
    }, Q.prototype.compatibleContent=function(e) {
      return this==e||this.contentMatch.compatible(e.contentMatch);
    }, Q.prototype.computeAttrs=function(e) {
      return !e&&this.defaultAttrs?this.defaultAttrs:X(this.attrs, e);
    }, Q.prototype.create=function(e, t, n) {
      if (this.isText) throw new Error('NodeType.create can\'t construct text nodes'); return new I(this, this.computeAttrs(e), a.from(t), h.setFrom(n));
    }, Q.prototype.createChecked=function(e, t, n) {
      if (t=a.from(t), !this.validContent(t)) throw new RangeError('Invalid content for node '+this.name); return new I(this, this.computeAttrs(e), t, h.setFrom(n));
    }, Q.prototype.createAndFill=function(e, t, n) {
      if (e=this.computeAttrs(e), (t=a.from(t)).size) {
        const r=this.contentMatch.fillBefore(t); if (!r) return null; t=r.append(t);
      } const i=this.contentMatch.matchFragment(t).fillBefore(a.empty, !0); return i?new I(this, e, t.append(i), h.setFrom(n)):null;
    }, Q.prototype.validContent=function(e) {
      const t=this.contentMatch.matchFragment(e); if (!t||!t.validEnd) return !1; for (let n=0; n<e.childCount; n++) if (!this.allowsMarks(e.child(n).marks)) return !1; return !0;
    }, Q.prototype.allowsMarkType=function(e) {
      return null==this.markSet||this.markSet.indexOf(e)>-1;
    }, Q.prototype.allowsMarks=function(e) {
      if (null==this.markSet) return !0; for (let t=0; t<e.length; t++) if (!this.allowsMarkType(e[t].type)) return !1; return !0;
    }, Q.prototype.allowedMarks=function(e) {
      if (null==this.markSet) return e; for (var t, n=0; n<e.length; n++) this.allowsMarkType(e[n].type)?t&&t.push(e[n]):t||(t=e.slice(0, n)); return t?t.length?t:h.empty:e;
    }, Q.compile=function(e, t) {
      const n=Object.create(null); e.forEach((function(e, r) {
        return n[e]=new Q(e, t, r);
      })); const r=t.spec.topNode||'doc'; if (!n[r]) throw new RangeError('Schema is missing its top node type (\''+r+'\')'); if (!n.text) throw new RangeError('Every schema needs a \'text\' type'); for (const i in n.text.attrs) throw new RangeError('The text node type should not have attributes'); return n;
    }, Object.defineProperties(Q.prototype, ee); var te=function(e) {
      this.hasDefault=Object.prototype.hasOwnProperty.call(e, 'default'), this.default=e.default;
    }; const ne={isRequired: {configurable: !0}}; ne.isRequired.get=function() {
      return !this.hasDefault;
    }, Object.defineProperties(te.prototype, ne); var re=function(e, t, n, r) {
      this.name=e, this.schema=n, this.spec=r, this.attrs=Z(r.attrs), this.rank=t, this.excluded=null; const i=G(this.attrs); this.instance=i&&new h(this, i);
    }; re.prototype.create=function(e) {
      return !e&&this.instance?this.instance:new h(this, X(this.attrs, e));
    }, re.compile=function(e, t) {
      const n=Object.create(null); let r=0; return e.forEach((function(e, i) {
        return n[e]=new re(e, r++, t, i);
      })), n;
    }, re.prototype.removeFromSet=function(e) {
      for (let t=0; t<e.length; t++) if (e[t].type==this) return e.slice(0, t).concat(e.slice(t+1)); return e;
    }, re.prototype.isInSet=function(e) {
      for (let t=0; t<e.length; t++) if (e[t].type==this) return e[t];
    }, re.prototype.excludes=function(e) {
      return this.excluded.indexOf(e)>-1;
    }; var ie=function(e) {
      for (const t in this.spec={}, e) this.spec[t]=e[t]; this.spec.nodes=i.from(e.nodes), this.spec.marks=i.from(e.marks), this.nodes=Q.compile(this.spec.nodes, this), this.marks=re.compile(this.spec.marks, this); const n=Object.create(null); for (const r in this.nodes) {
        if (r in this.marks) throw new RangeError(r+' can not be both a node and a mark'); const o=this.nodes[r]; const s=o.spec.content||''; const a=o.spec.marks; o.contentMatch=n[s]||(n[s]=R.parse(s, this.nodes)), o.inlineContent=o.contentMatch.inlineContent, o.markSet='_'==a?null:a?oe(this, a.split(' ')):''!=a&&o.inlineContent?null:[];
      } for (const l in this.marks) {
        const c=this.marks[l]; const u=c.spec.excludes; c.excluded=null==u?[c]:''==u?[]:oe(this, u.split(' '));
      } this.nodeFromJSON=this.nodeFromJSON.bind(this), this.markFromJSON=this.markFromJSON.bind(this), this.topNodeType=this.nodes[this.spec.topNode||'doc'], this.cached=Object.create(null), this.cached.wrappings=Object.create(null);
    }; function oe(e, t) {
      for (var n=[], r=0; r<t.length; r++) {
        const i=t[r]; const o=e.marks[i]; let s=o; if (o)n.push(o); else {
          for (const a in e.marks) {
            const l=e.marks[a]; ('_'==i||l.spec.group&&l.spec.group.split(' ').indexOf(i)>-1)&&n.push(s=l);
          }
        } if (!s) throw new SyntaxError('Unknown mark type: \''+t[r]+'\'');
      } return n;
    }ie.prototype.node=function(e, t, n, r) {
      if ('string'==typeof e)e=this.nodeType(e); else {
        if (!(e instanceof Q)) throw new RangeError('Invalid node type: '+e); if (e.schema!=this) throw new RangeError('Node type from different schema used ('+e.name+')');
      } return e.createChecked(t, n, r);
    }, ie.prototype.text=function(e, t) {
      const n=this.nodes.text; return new F(n, n.defaultAttrs, e, h.setFrom(t));
    }, ie.prototype.mark=function(e, t) {
      return 'string'==typeof e&&(e=this.marks[e]), e.create(t);
    }, ie.prototype.nodeFromJSON=function(e) {
      return I.fromJSON(this, e);
    }, ie.prototype.markFromJSON=function(e) {
      return h.fromJSON(this, e);
    }, ie.prototype.nodeType=function(e) {
      const t=this.nodes[e]; if (!t) throw new RangeError('Unknown node type: '+e); return t;
    }; var se=function(e, t) {
      const n=this; this.schema=e, this.rules=t, this.tags=[], this.styles=[], t.forEach((function(e) {
e.tag?n.tags.push(e):e.style&&n.styles.push(e);
      })), this.normalizeLists=!this.tags.some((function(t) {
        if (!/^(ul|ol)\b/.test(t.tag)||!t.node) return !1; const n=e.nodes[t.node]; return n.contentMatch.matchType(n);
      }));
    }; se.prototype.parse=function(e, t) {
      void 0===t&&(t={}); const n=new he(this, t, !1); return n.addAll(e, null, t.from, t.to), n.finish();
    }, se.prototype.parseSlice=function(e, t) {
      void 0===t&&(t={}); const n=new he(this, t, !0); return n.addAll(e, null, t.from, t.to), f.maxOpen(n.finish());
    }, se.prototype.matchTag=function(e, t) {
      for (let n=0; n<this.tags.length; n++) {
        const r=this.tags[n]; if (fe(e, r.tag)&&(void 0===r.namespace||e.namespaceURI==r.namespace)&&(!r.context||t.matchesContext(r.context))) {
          if (r.getAttrs) {
            const i=r.getAttrs(e); if (!1===i) continue; r.attrs=i;
          } return r;
        }
      }
    }, se.prototype.matchStyle=function(e, t, n) {
      for (let r=0; r<this.styles.length; r++) {
        const i=this.styles[r]; if (!(0!=i.style.indexOf(e)||i.context&&!n.matchesContext(i.context)||i.style.length>e.length&&(61!=i.style.charCodeAt(e.length)||i.style.slice(e.length+1)!=t))) {
          if (i.getAttrs) {
            const o=i.getAttrs(t); if (!1===o) continue; i.attrs=o;
          } return i;
        }
      }
    }, se.schemaRules=function(e) {
      const t=[]; function n(e) {
        for (var n=null==e.priority?50:e.priority, r=0; r<t.length; r++) {
          const i=t[r]; if ((null==i.priority?50:i.priority)<n) break;
        }t.splice(r, 0, e);
      } let r; const i=function(t) {
        const r=e.marks[t].spec.parseDOM; r&&r.forEach((function(e) {
          n(e=me(e)), e.mark=t;
        }));
      }; for (const o in e.marks)i(o); for (var s in e.nodes) {
        r=void 0, (r=e.nodes[s].spec.parseDOM)&&r.forEach((function(e) {
          n(e=me(e)), e.node=s;
        }));
      } return t;
    }, se.fromSchema=function(e) {
      return e.cached.domParser||(e.cached.domParser=new se(e, se.schemaRules(e)));
    }; const ae={address: !0, article: !0, aside: !0, blockquote: !0, canvas: !0, dd: !0, div: !0, dl: !0, fieldset: !0, figcaption: !0, figure: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, li: !0, noscript: !0, ol: !0, output: !0, p: !0, pre: !0, section: !0, table: !0, tfoot: !0, ul: !0}; const le={head: !0, noscript: !0, object: !0, script: !0, style: !0, title: !0}; const ce={ol: !0, ul: !0}; function ue(e) {
      return (e?1:0)|('full'===e?2:0);
    } const de=function(e, t, n, r, i, o, s) {
      this.type=e, this.attrs=t, this.solid=i, this.match=o||(4&s?null:e.contentMatch), this.options=s, this.content=[], this.marks=n, this.activeMarks=h.none, this.pendingMarks=r, this.stashMarks=[];
    }; de.prototype.findWrapping=function(e) {
      if (!this.match) {
        if (!this.type) return []; const t=this.type.contentMatch.fillBefore(a.from(e)); if (!t) {
          let n; const r=this.type.contentMatch; return (n=r.findWrapping(e.type))?(this.match=r, n):null;
        } this.match=this.type.contentMatch.matchFragment(t);
      } return this.match.findWrapping(e.type);
    }, de.prototype.finish=function(e) {
      if (!(1&this.options)) {
        let t; const n=this.content[this.content.length-1]; n&&n.isText&&(t=/[ \t\r\n\u000c]+$/.exec(n.text))&&(n.text.length==t[0].length?this.content.pop():this.content[this.content.length-1]=n.withText(n.text.slice(0, n.text.length-t[0].length)));
      } let r=a.from(this.content); return !e&&this.match&&(r=r.append(this.match.fillBefore(a.empty, !0))), this.type?this.type.create(this.attrs, r, this.marks):r;
    }, de.prototype.popFromStashMark=function(e) {
      for (let t=this.stashMarks.length-1; t>=0; t--) if (this.stashMarks[t].type==e) return this.stashMarks.splice(t, 1)[0];
    }, de.prototype.applyPending=function(e) {
      for (let t=0, n=this.pendingMarks; t<n.length; t++) {
        const r=n[t]; if ((this.type?this.type.allowsMarkType(r.type):ge(r.type, e))&&!r.isInSet(this.activeMarks)) {
          const i=ve(r, this.activeMarks); i&&this.stashMarks.push(i), this.activeMarks=r.addToSet(this.activeMarks), this.pendingMarks=r.removeFromSet(this.pendingMarks);
        }
      }
    }; var he=function(e, t, n) {
      this.parser=e, this.options=t, this.isOpen=n; let r; const i=t.topNode; const o=ue(t.preserveWhitespace)|(n?4:0); r=i?new de(i.type, i.attrs, h.none, h.none, !0, t.topMatch||i.type.contentMatch, o):new de(n?null:e.schema.topNodeType, null, h.none, h.none, !0, null, o), this.nodes=[r], this.open=0, this.find=t.findPositions, this.needsBlock=!1;
    }; const pe={top: {configurable: !0}, currentPos: {configurable: !0}}; function fe(e, t) {
      return (e.matches||e.msMatchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector).call(e, t);
    } function me(e) {
      const t={}; for (const n in e)t[n]=e[n]; return t;
    } function ge(e, t) {
      const n=t.schema.nodes; const r=function(r) {
        const i=n[r]; if (i.allowsMarkType(e)) {
          const o=[]; var s=function(e) {
            o.push(e); for (let n=0; n<e.edgeCount; n++) {
              const r=e.edge(n); const i=r.type; const a=r.next; if (i==t) return !0; if (o.indexOf(a)<0&&s(a)) return !0;
            }
          }; return s(i.contentMatch)?{v: !0}:void 0;
        }
      }; for (const i in n) {
        const o=r(i); if (o) return o.v;
      }
    } function ve(e, t) {
      for (let n=0; n<t.length; n++) if (e.type==t[n].type) return t[n];
    }pe.top.get=function() {
      return this.nodes[this.open];
    }, he.prototype.addDOM=function(e) {
      if (3==e.nodeType) this.addTextNode(e); else if (1==e.nodeType) {
        const t=e.getAttribute('style'); const n=t?this.readStyles(function(e) {
          for (var t, n=/\s*([\w-]+)\s*:\s*([^;]+)/g, r=[]; t=n.exec(e);)r.push(t[1], t[2].trim()); return r;
        }(t)):null; const r=this.top; if (null!=n) for (let i=0; i<n.length; i++) this.addPendingMark(n[i]); if (this.addElement(e), null!=n) for (let o=0; o<n.length; o++) this.removePendingMark(n[o], r);
      }
    }, he.prototype.addTextNode=function(e) {
      let t=e.nodeValue; const n=this.top; if ((n.type?n.type.inlineContent:n.content.length&&n.content[0].isInline)||/[^ \t\r\n\u000c]/.test(t)) {
        if (1&n.options)2&n.options||(t=t.replace(/\r?\n|\r/g, ' ')); else if (t=t.replace(/[ \t\r\n\u000c]+/g, ' '), /^[ \t\r\n\u000c]/.test(t)&&this.open==this.nodes.length-1) {
          const r=n.content[n.content.length-1]; const i=e.previousSibling; (!r||i&&'BR'==i.nodeName||r.isText&&/[ \t\r\n\u000c]$/.test(r.text))&&(t=t.slice(1));
        }t&&this.insertNode(this.parser.schema.text(t)), this.findInText(e);
      } else this.findInside(e);
    }, he.prototype.addElement=function(e) {
      const t=e.nodeName.toLowerCase(); ce.hasOwnProperty(t)&&this.parser.normalizeLists&&function(e) {
        for (let t=e.firstChild, n=null; t; t=t.nextSibling) {
          const r=1==t.nodeType?t.nodeName.toLowerCase():null; r&&ce.hasOwnProperty(r)&&n?(n.appendChild(t), t=n):'li'==r?n=t:r&&(n=null);
        }
      }(e); const n=this.options.ruleFromNode&&this.options.ruleFromNode(e)||this.parser.matchTag(e, this); if (n?n.ignore:le.hasOwnProperty(t)) this.findInside(e); else if (!n||n.skip||n.closeParent) {
n&&n.closeParent?this.open=Math.max(0, this.open-1):n&&n.skip.nodeType&&(e=n.skip); let r; const i=this.top; const o=this.needsBlock; if (ae.hasOwnProperty(t))r=!0, i.type||(this.needsBlock=!0); else if (!e.firstChild) return void this.leafFallback(e); this.addAll(e), r&&this.sync(i), this.needsBlock=o;
      } else this.addElementByRule(e, n);
    }, he.prototype.leafFallback=function(e) {
      'BR'==e.nodeName&&this.top.type&&this.top.type.inlineContent&&this.addTextNode(e.ownerDocument.createTextNode('\n'));
    }, he.prototype.readStyles=function(e) {
      for (var t=h.none, n=0; n<e.length; n+=2) {
        const r=this.parser.matchStyle(e[n], e[n+1], this); if (r) {
          if (r.ignore) return null; t=this.parser.schema.marks[r.mark].create(r.attrs).addToSet(t);
        }
      } return t;
    }, he.prototype.addElementByRule=function(e, t) {
      let n; let r; let i; const o=this; t.node?(r=this.parser.schema.nodes[t.node]).isLeaf?this.insertNode(r.create(t.attrs))||this.leafFallback(e):n=this.enter(r, t.attrs, t.preserveWhitespace):(i=this.parser.schema.marks[t.mark].create(t.attrs), this.addPendingMark(i)); const s=this.top; if (r&&r.isLeaf) this.findInside(e); else if (t.getContent) {
        this.findInside(e), t.getContent(e, this.parser.schema).forEach((function(e) {
          return o.insertNode(e);
        }));
      } else {
        let a=t.contentElement; 'string'==typeof a?a=e.querySelector(a):'function'==typeof a&&(a=a(e)), a||(a=e), this.findAround(e, a, !0), this.addAll(a, n);
      }n&&(this.sync(s), this.open--), i&&this.removePendingMark(i, s);
    }, he.prototype.addAll=function(e, t, n, r) {
      for (var i=n||0, o=n?e.childNodes[n]:e.firstChild, s=null==r?null:e.childNodes[r]; o!=s; o=o.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(o), t&&ae.hasOwnProperty(o.nodeName.toLowerCase())&&this.sync(t); this.findAtPoint(e, i);
    }, he.prototype.findPlace=function(e) {
      for (var t, n, r=this.open; r>=0; r--) {
        const i=this.nodes[r]; const o=i.findWrapping(e); if (o&&(!t||t.length>o.length)&&(t=o, n=i, !o.length)) break; if (i.solid) break;
      } if (!t) return !1; this.sync(n); for (let s=0; s<t.length; s++) this.enterInner(t[s], null, !1); return !0;
    }, he.prototype.insertNode=function(e) {
      if (e.isInline&&this.needsBlock&&!this.top.type) {
        const t=this.textblockFromContext(); t&&this.enterInner(t);
      } if (this.findPlace(e)) {
        this.closeExtra(); const n=this.top; n.applyPending(e.type), n.match&&(n.match=n.match.matchType(e.type)); for (var r=n.activeMarks, i=0; i<e.marks.length; i++)n.type&&!n.type.allowsMarkType(e.marks[i].type)||(r=e.marks[i].addToSet(r)); return n.content.push(e.mark(r)), !0;
      } return !1;
    }, he.prototype.enter=function(e, t, n) {
      const r=this.findPlace(e.create(t)); return r&&this.enterInner(e, t, !0, n), r;
    }, he.prototype.enterInner=function(e, t, n, r) {
      this.closeExtra(); const i=this.top; i.applyPending(e), i.match=i.match&&i.match.matchType(e, t); let o=null==r?-5&i.options:ue(r); 4&i.options&&0==i.content.length&&(o|=4), this.nodes.push(new de(e, t, i.activeMarks, i.pendingMarks, n, null, o)), this.open++;
    }, he.prototype.closeExtra=function(e) {
      let t=this.nodes.length-1; if (t> this.open) {
        for (;t> this.open; t--) this.nodes[t-1].content.push(this.nodes[t].finish(e)); this.nodes.length=this.open+1;
      }
    }, he.prototype.finish=function() {
      return this.open=0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen||this.options.topOpen);
    }, he.prototype.sync=function(e) {
      for (let t=this.open; t>=0; t--) if (this.nodes[t]==e) return void(this.open=t);
    }, pe.currentPos.get=function() {
      this.closeExtra(); for (var e=0, t=this.open; t>=0; t--) {
        for (let n=this.nodes[t].content, r=n.length-1; r>=0; r--)e+=n[r].nodeSize; t&&e++;
      } return e;
    }, he.prototype.findAtPoint=function(e, t) {
      if (this.find) for (let n=0; n<this.find.length; n++) this.find[n].node==e&&this.find[n].offset==t&&(this.find[n].pos=this.currentPos);
    }, he.prototype.findInside=function(e) {
      if (this.find) for (let t=0; t<this.find.length; t++)null==this.find[t].pos&&1==e.nodeType&&e.contains(this.find[t].node)&&(this.find[t].pos=this.currentPos);
    }, he.prototype.findAround=function(e, t, n) {
      if (e!=t&&this.find) for (let r=0; r<this.find.length; r++)null==this.find[r].pos&&1==e.nodeType&&e.contains(this.find[r].node)&&t.compareDocumentPosition(this.find[r].node)&(n?2:4)&&(this.find[r].pos=this.currentPos);
    }, he.prototype.findInText=function(e) {
      if (this.find) for (let t=0; t<this.find.length; t++) this.find[t].node==e&&(this.find[t].pos=this.currentPos-(e.nodeValue.length-this.find[t].offset));
    }, he.prototype.matchesContext=function(e) {
      const t=this; if (e.indexOf('|')>-1) return e.split(/\s*\|\s*/).some(this.matchesContext, this); const n=e.split('/'); const r=this.options.context; const i=!(this.isOpen||r&&r.parent.type!=this.nodes[0].type); const o=-(r?r.depth+1:0)+(i?0:1); var s=function(e, a) {
        for (;e>=0; e--) {
          const l=n[e]; if (''==l) {
            if (e==n.length-1||0==e) continue; for (;a>=o; a--) if (s(e-1, a)) return !0; return !1;
          } const c=a>0||0==a&&i?t.nodes[a].type:r&&a>=o?r.node(a-o).type:null; if (!c||c.name!=l&&-1==c.groups.indexOf(l)) return !1; a--;
        } return !0;
      }; return s(n.length-1, this.open);
    }, he.prototype.textblockFromContext=function() {
      const e=this.options.context; if (e) {
        for (let t=e.depth; t>=0; t--) {
          const n=e.node(t).contentMatchAt(e.indexAfter(t)).defaultType; if (n&&n.isTextblock&&n.defaultAttrs) return n;
        }
      } for (const r in this.parser.schema.nodes) {
        const i=this.parser.schema.nodes[r]; if (i.isTextblock&&i.defaultAttrs) return i;
      }
    }, he.prototype.addPendingMark=function(e) {
      const t=ve(e, this.top.pendingMarks); t&&this.top.stashMarks.push(t), this.top.pendingMarks=e.addToSet(this.top.pendingMarks);
    }, he.prototype.removePendingMark=function(e, t) {
      for (let n=this.open; n>=0; n--) {
        const r=this.nodes[n]; if (r.pendingMarks.lastIndexOf(e)>-1)r.pendingMarks=e.removeFromSet(r.pendingMarks); else {
          r.activeMarks=e.removeFromSet(r.activeMarks); const i=r.popFromStashMark(e.type); i&&(r.activeMarks=i.addToSet(r.activeMarks));
        } if (r==t) break;
      }
    }, Object.defineProperties(he.prototype, pe); var ye=function(e, t) {
      this.nodes=e||{}, this.marks=t||{};
    }; function be(e) {
      const t={}; for (const n in e) {
        const r=e[n].spec.toDOM; r&&(t[n]=r);
      } return t;
    } function we(e) {
      return e.document||window.document;
    }ye.prototype.serializeFragment=function(e, t, n) {
      const r=this; void 0===t&&(t={}), n||(n=we(t).createDocumentFragment()); let i=n; let o=null; return e.forEach((function(e) {
        if (o||e.marks.length) {
          o||(o=[]); for (var n=0, s=0; n<o.length&&s<e.marks.length;) {
            const a=e.marks[s]; if (r.marks[a.type.name]) {
              if (!a.eq(o[n])||!1===a.type.spec.spanning) break; n+=2, s++;
            } else s++;
          } for (;n<o.length;)i=o.pop(), o.pop(); for (;s<e.marks.length;) {
            const l=e.marks[s++]; const c=r.serializeMark(l, e.isInline, t); c&&(o.push(l, i), i.appendChild(c.dom), i=c.contentDOM||c.dom);
          }
        }i.appendChild(r.serializeNode(e, t));
      })), n;
    }, ye.prototype.serializeNode=function(e, t) {
      void 0===t&&(t={}); const n=ye.renderSpec(we(t), this.nodes[e.type.name](e)); const r=n.dom; const i=n.contentDOM; if (i) {
        if (e.isLeaf) throw new RangeError('Content hole not allowed in a leaf node spec'); t.onContent?t.onContent(e, i, t):this.serializeFragment(e.content, t, i);
      } return r;
    }, ye.prototype.serializeNodeAndMarks=function(e, t) {
      void 0===t&&(t={}); for (var n=this.serializeNode(e, t), r=e.marks.length-1; r>=0; r--) {
        const i=this.serializeMark(e.marks[r], e.isInline, t); i&&((i.contentDOM||i.dom).appendChild(n), n=i.dom);
      } return n;
    }, ye.prototype.serializeMark=function(e, t, n) {
      void 0===n&&(n={}); const r=this.marks[e.type.name]; return r&&ye.renderSpec(we(n), r(e, t));
    }, ye.renderSpec=function(e, t, n) {
      if (void 0===n&&(n=null), 'string'==typeof t) return {dom: e.createTextNode(t)}; if (null!=t.nodeType) return {dom: t}; if (t.dom&&null!=t.dom.nodeType) return t; let r=t[0]; const i=r.indexOf(' '); i>0&&(n=r.slice(0, i), r=r.slice(i+1)); let o=null; const s=n?e.createElementNS(n, r):e.createElement(r); const a=t[1]; let l=1; if (a&&'object'==typeof a&&null==a.nodeType&&!Array.isArray(a)) {
        for (const c in l=2, a) {
          if (null!=a[c]) {
            const u=c.indexOf(' '); u>0?s.setAttributeNS(c.slice(0, u), c.slice(u+1), a[c]):s.setAttribute(c, a[c]);
          }
        }
      } for (let d=l; d<t.length; d++) {
        const h=t[d]; if (0===h) {
          if (d<t.length-1||d>l) throw new RangeError('Content hole must be the only child of its parent node'); return {dom: s, contentDOM: s};
        } const p=ye.renderSpec(e, h, n); const f=p.dom; const m=p.contentDOM; if (s.appendChild(f), m) {
          if (o) throw new RangeError('Multiple content holes'); o=m;
        }
      } return {dom: s, contentDOM: o};
    }, ye.fromSchema=function(e) {
      return e.cached.domSerializer||(e.cached.domSerializer=new ye(this.nodesFromSchema(e), this.marksFromSchema(e)));
    }, ye.nodesFromSchema=function(e) {
      const t=be(e.nodes); return t.text||(t.text=function(e) {
        return e.text;
      }), t;
    }, ye.marksFromSchema=function(e) {
      return be(e.marks);
    };
  }, 465: (e, t, n)=>{
    'use strict'; n.d(t, {IB: ()=>a, bw: ()=>l, s6: ()=>s, KI: ()=>o}); const r=n(81); const i=n(638); function o(e, t) {
      return function(n, o) {
        const s=n.selection; const a=s.$from; const l=s.$to; let c=a.blockRange(l); let u=!1; let d=c; if (!c) return !1; if (c.depth>=2&&a.node(c.depth-1).type.compatibleContent(e)&&0==c.startIndex) {
          if (0==a.index(c.depth-1)) return !1; const h=n.doc.resolve(c.start-2); d=new i.Ts(h, h, c.depth), c.endIndex<c.parent.childCount&&(c=new i.Ts(a, n.doc.resolve(l.end(c.depth)), c.depth)), u=!0;
        } const p=(0, r.nd)(d, e, t, c); return !!p&&(o&&o(function(e, t, n, o, s) {
          for (var a=i.HY.empty, l=n.length-1; l>=0; l--)a=i.HY.from(n[l].type.create(n[l].attrs, a)); e.step(new r.FC(t.start-(o?2:0), t.end, t.start, t.end, new i.p2(a, 0, 0), n.length, !0)); for (var c=0, u=0; u<n.length; u++)n[u].type==s&&(c=u+1); for (let d=n.length-c, h=t.start+n.length-(o?2:0), p=t.parent, f=t.startIndex, m=t.endIndex, g=!0; f<m; f++, g=!1)!g&&(0, r.Ax)(e.doc, h, d)&&(e.split(h, d), h+=2*d), h+=p.child(f).nodeSize; return e;
        }(n.tr, c, p, u, e).scrollIntoView()), !0);
      };
    } function s(e) {
      return function(t, n) {
        const o=t.selection; const s=o.$from; const a=o.$to; const l=o.node; if (l&&l.isBlock||s.depth<2||!s.sameParent(a)) return !1; const c=s.node(-1); if (c.type!=e) return !1; if (0==s.parent.content.size&&s.node(-1).childCount==s.indexAfter(-1)) {
          if (2==s.depth||s.node(-3).type!=e||s.index(-2)!=s.node(-2).childCount-1) return !1; if (n) {
            for (var u=i.HY.empty, d=s.index(-1)>0, h=s.depth-(d?1:2); h>=s.depth-3; h--)u=i.HY.from(s.node(h).copy(u)); u=u.append(i.HY.from(e.createAndFill())); const p=t.tr.replace(s.before(d?null:-1), s.after(-3), new i.p2(u, d?3:2, 2)); p.setSelection(t.selection.constructor.near(p.doc.resolve(s.pos+(d?3:2)))), n(p.scrollIntoView());
          } return !0;
        } const f=a.pos==s.end()?c.contentMatchAt(0).defaultType:null; const m=t.tr.delete(s.pos, a.pos); const g=f&&[null, {type: f}]; return !!(0, r.Ax)(m.doc, s.pos, 2, g)&&(n&&n(m.split(s.pos, 2, g).scrollIntoView()), !0);
      };
    } function a(e) {
      return function(t, n) {
        const o=t.selection; const s=o.$from; const a=o.$to; const l=s.blockRange(a, (function(t) {
          return t.childCount&&t.firstChild.type==e;
        })); return !!l&&(!n||(s.node(l.depth-1).type==e?function(e, t, n, o) {
          const s=e.tr; const a=o.end; const l=o.$to.end(o.depth); return a<l&&(s.step(new r.FC(a-1, l, a, l, new i.p2(i.HY.from(n.create(null, o.parent.copy())), 1, 0), 1, !0)), o=new i.Ts(s.doc.resolve(o.$from.pos), s.doc.resolve(l), o.depth)), t(s.lift(o, (0, r.k9)(o)).scrollIntoView()), !0;
        }(t, n, e, l):function(e, t, n) {
          for (var o=e.tr, s=n.parent, a=n.end, l=n.endIndex-1, c=n.startIndex; l>c; l--)a-=s.child(l).nodeSize, o.delete(a-1, a+1); const u=o.doc.resolve(n.start); const d=u.nodeAfter; const h=0==n.startIndex; const p=n.endIndex==s.childCount; const f=u.node(-1); const m=u.index(-1); if (!f.canReplace(m+(h?0:1), m+1, d.content.append(p?i.HY.empty:i.HY.from(s)))) return !1; const g=u.pos; const v=g+d.nodeSize; return o.step(new r.FC(g-(h?1:0), v+(p?1:0), g+1, v-1, new i.p2((h?i.HY.empty:i.HY.from(s.copy(i.HY.empty))).append(p?i.HY.empty:i.HY.from(s.copy(i.HY.empty))), h?0:1, p?0:1), h?0:1)), t(o.scrollIntoView()), !0;
        }(t, n, l)));
      };
    } function l(e) {
      return function(t, n) {
        const o=t.selection; const s=o.$from; const a=o.$to; const l=s.blockRange(a, (function(t) {
          return t.childCount&&t.firstChild.type==e;
        })); if (!l) return !1; const c=l.startIndex; if (0==c) return !1; const u=l.parent; const d=u.child(c-1); if (d.type!=e) return !1; if (n) {
          const h=d.lastChild&&d.lastChild.type==u.type; const p=i.HY.from(h?e.create():null); const f=new i.p2(i.HY.from(e.create(null, i.HY.from(u.type.create(null, p)))), h?3:1, 0); const m=l.start; const g=l.end; n(t.tr.step(new r.FC(m-(h?3:1), g, m, g, f, 1, !0)).scrollIntoView());
        } return !0;
      };
    }
  }, 922: (e, t, n)=>{
    'use strict'; n.d(t, {C1: ()=>p, yy: ()=>k, qv: ()=>d, Sy: ()=>M, H$: ()=>D, Y1: ()=>s, Bs: ()=>c}); const r=n(638); const i=n(81); const o=Object.create(null); var s=function(e, t, n) {
      this.ranges=n||[new l(e.min(t), e.max(t))], this.$anchor=e, this.$head=t;
    }; const a={anchor: {configurable: !0}, head: {configurable: !0}, from: {configurable: !0}, to: {configurable: !0}, $from: {configurable: !0}, $to: {configurable: !0}, empty: {configurable: !0}}; a.anchor.get=function() {
      return this.$anchor.pos;
    }, a.head.get=function() {
      return this.$head.pos;
    }, a.from.get=function() {
      return this.$from.pos;
    }, a.to.get=function() {
      return this.$to.pos;
    }, a.$from.get=function() {
      return this.ranges[0].$from;
    }, a.$to.get=function() {
      return this.ranges[0].$to;
    }, a.empty.get=function() {
      for (let e=this.ranges, t=0; t<e.length; t++) if (e[t].$from.pos!=e[t].$to.pos) return !1; return !0;
    }, s.prototype.content=function() {
      return this.$from.node(0).slice(this.from, this.to, !0);
    }, s.prototype.replace=function(e, t) {
      void 0===t&&(t=r.p2.empty); for (var n=t.content.lastChild, i=null, o=0; o<t.openEnd; o++)i=n, n=n.lastChild; for (let s=e.steps.length, a=this.ranges, l=0; l<a.length; l++) {
        const c=a[l]; const u=c.$from; const d=c.$to; const h=e.mapping.slice(s); e.replaceRange(h.map(u.pos), h.map(d.pos), l?r.p2.empty:t), 0==l&&g(e, s, (n?n.isInline:i&&i.isTextblock)?-1:1);
      }
    }, s.prototype.replaceWith=function(e, t) {
      for (let n=e.steps.length, r=this.ranges, i=0; i<r.length; i++) {
        const o=r[i]; const s=o.$from; const a=o.$to; const l=e.mapping.slice(n); const c=l.map(s.pos); const u=l.map(a.pos); i?e.deleteRange(c, u):(e.replaceRangeWith(c, u, t), g(e, n, t.isInline?-1:1));
      }
    }, s.findFrom=function(e, t, n) {
      const r=e.parent.inlineContent?new c(e):m(e.node(0), e.parent, e.pos, e.index(), t, n); if (r) return r; for (let i=e.depth-1; i>=0; i--) {
        const o=t<0?m(e.node(0), e.node(i), e.before(i+1), e.index(i), t, n):m(e.node(0), e.node(i), e.after(i+1), e.index(i)+1, t, n); if (o) return o;
      }
    }, s.near=function(e, t) {
      return void 0===t&&(t=1), this.findFrom(e, t)||this.findFrom(e, -t)||new p(e.node(0));
    }, s.atStart=function(e) {
      return m(e, e, 0, 0, 1)||new p(e);
    }, s.atEnd=function(e) {
      return m(e, e, e.content.size, e.childCount, -1)||new p(e);
    }, s.fromJSON=function(e, t) {
      if (!t||!t.type) throw new RangeError('Invalid input for Selection.fromJSON'); const n=o[t.type]; if (!n) throw new RangeError('No selection type '+t.type+' defined'); return n.fromJSON(e, t);
    }, s.jsonID=function(e, t) {
      if (e in o) throw new RangeError('Duplicate use of selection JSON ID '+e); return o[e]=t, t.prototype.jsonID=e, t;
    }, s.prototype.getBookmark=function() {
      return c.between(this.$anchor, this.$head).getBookmark();
    }, Object.defineProperties(s.prototype, a), s.prototype.visible=!0; var l=function(e, t) {
      this.$from=e, this.$to=t;
    }; var c=function(e) {
      function t(t, n) {
        void 0===n&&(n=t), e.call(this, t, n);
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={$cursor: {configurable: !0}}; return n.$cursor.get=function() {
        return this.$anchor.pos==this.$head.pos?this.$head:null;
      }, t.prototype.map=function(n, r) {
        const i=n.resolve(r.map(this.head)); if (!i.parent.inlineContent) return e.near(i); const o=n.resolve(r.map(this.anchor)); return new t(o.parent.inlineContent?o:i, i);
      }, t.prototype.replace=function(t, n) {
        if (void 0===n&&(n=r.p2.empty), e.prototype.replace.call(this, t, n), n==r.p2.empty) {
          const i=this.$from.marksAcross(this.$to); i&&t.ensureMarks(i);
        }
      }, t.prototype.eq=function(e) {
        return e instanceof t&&e.anchor==this.anchor&&e.head==this.head;
      }, t.prototype.getBookmark=function() {
        return new u(this.anchor, this.head);
      }, t.prototype.toJSON=function() {
        return {type: 'text', anchor: this.anchor, head: this.head};
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.anchor||'number'!=typeof n.head) throw new RangeError('Invalid input for TextSelection.fromJSON'); return new t(e.resolve(n.anchor), e.resolve(n.head));
      }, t.create=function(e, t, n) {
        void 0===n&&(n=t); const r=e.resolve(t); return new this(r, n==t?r:e.resolve(n));
      }, t.between=function(n, r, i) {
        const o=n.pos-r.pos; if (i&&!o||(i=o>=0?1:-1), !r.parent.inlineContent) {
          const s=e.findFrom(r, i, !0)||e.findFrom(r, -i, !0); if (!s) return e.near(r, i); r=s.$head;
        } return n.parent.inlineContent||(0==o||(n=(e.findFrom(n, -i, !0)||e.findFrom(n, i, !0)).$anchor).pos<r.pos!=o<0)&&(n=r), new t(n, r);
      }, Object.defineProperties(t.prototype, n), t;
    }(s); s.jsonID('text', c); var u=function(e, t) {
      this.anchor=e, this.head=t;
    }; u.prototype.map=function(e) {
      return new u(e.map(this.anchor), e.map(this.head));
    }, u.prototype.resolve=function(e) {
      return c.between(e.resolve(this.anchor), e.resolve(this.head));
    }; var d=function(e) {
      function t(t) {
        const n=t.nodeAfter; const r=t.node(0).resolve(t.pos+n.nodeSize); e.call(this, t, r), this.node=n;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.map=function(n, r) {
        const i=r.mapResult(this.anchor); const o=i.deleted; const s=i.pos; const a=n.resolve(s); return o?e.near(a):new t(a);
      }, t.prototype.content=function() {
        return new r.p2(r.HY.from(this.node), 0, 0);
      }, t.prototype.eq=function(e) {
        return e instanceof t&&e.anchor==this.anchor;
      }, t.prototype.toJSON=function() {
        return {type: 'node', anchor: this.anchor};
      }, t.prototype.getBookmark=function() {
        return new h(this.anchor);
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.anchor) throw new RangeError('Invalid input for NodeSelection.fromJSON'); return new t(e.resolve(n.anchor));
      }, t.create=function(e, t) {
        return new this(e.resolve(t));
      }, t.isSelectable=function(e) {
        return !e.isText&&!1!==e.type.spec.selectable;
      }, t;
    }(s); d.prototype.visible=!1, s.jsonID('node', d); var h=function(e) {
      this.anchor=e;
    }; h.prototype.map=function(e) {
      const t=e.mapResult(this.anchor); const n=t.deleted; const r=t.pos; return n?new u(r, r):new h(r);
    }, h.prototype.resolve=function(e) {
      const t=e.resolve(this.anchor); const n=t.nodeAfter; return n&&d.isSelectable(n)?new d(t):s.near(t);
    }; var p=function(e) {
      function t(t) {
        e.call(this, t.resolve(0), t.resolve(t.content.size));
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.replace=function(t, n) {
        if (void 0===n&&(n=r.p2.empty), n==r.p2.empty) {
          t.delete(0, t.doc.content.size); const i=e.atStart(t.doc); i.eq(t.selection)||t.setSelection(i);
        } else e.prototype.replace.call(this, t, n);
      }, t.prototype.toJSON=function() {
        return {type: 'all'};
      }, t.fromJSON=function(e) {
        return new t(e);
      }, t.prototype.map=function(e) {
        return new t(e);
      }, t.prototype.eq=function(e) {
        return e instanceof t;
      }, t.prototype.getBookmark=function() {
        return f;
      }, t;
    }(s); s.jsonID('all', p); var f={map: function() {
      return this;
    }, resolve: function(e) {
      return new p(e);
    }}; function m(e, t, n, r, i, o) {
      if (t.inlineContent) return c.create(e, n); for (let s=r-(i>0?0:1); i>0?s<t.childCount:s>=0; s+=i) {
        const a=t.child(s); if (a.isAtom) {
          if (!o&&d.isSelectable(a)) return d.create(e, n-(i<0?a.nodeSize:0));
        } else {
          const l=m(e, a, n+i, i<0?a.childCount:0, i, o); if (l) return l;
        }n+=a.nodeSize*i;
      }
    } function g(e, t, n) {
      const r=e.steps.length-1; if (!(r<t)) {
        let o; const a=e.steps[r]; (a instanceof i.Pu||a instanceof i.FC)&&(e.mapping.maps[r].forEach((function(e, t, n, r) {
          null==o&&(o=r);
        })), e.setSelection(s.near(e.doc.resolve(o), n)));
      }
    } const v=function(e) {
      function t(t) {
        e.call(this, t.doc), this.time=Date.now(), this.curSelection=t.selection, this.curSelectionFor=0, this.storedMarks=t.storedMarks, this.updated=0, this.meta=Object.create(null);
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={selection: {configurable: !0}, selectionSet: {configurable: !0}, storedMarksSet: {configurable: !0}, isGeneric: {configurable: !0}, scrolledIntoView: {configurable: !0}}; return n.selection.get=function() {
        return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor=this.steps.length), this.curSelection;
      }, t.prototype.setSelection=function(e) {
        if (e.$from.doc!=this.doc) throw new RangeError('Selection passed to setSelection must point at the current document'); return this.curSelection=e, this.curSelectionFor=this.steps.length, this.updated=-3&(1|this.updated), this.storedMarks=null, this;
      }, n.selectionSet.get=function() {
        return (1&this.updated)>0;
      }, t.prototype.setStoredMarks=function(e) {
        return this.storedMarks=e, this.updated|=2, this;
      }, t.prototype.ensureMarks=function(e) {
        return r.vc.sameSet(this.storedMarks||this.selection.$from.marks(), e)||this.setStoredMarks(e), this;
      }, t.prototype.addStoredMark=function(e) {
        return this.ensureMarks(e.addToSet(this.storedMarks||this.selection.$head.marks()));
      }, t.prototype.removeStoredMark=function(e) {
        return this.ensureMarks(e.removeFromSet(this.storedMarks||this.selection.$head.marks()));
      }, n.storedMarksSet.get=function() {
        return (2&this.updated)>0;
      }, t.prototype.addStep=function(t, n) {
        e.prototype.addStep.call(this, t, n), this.updated=-3&this.updated, this.storedMarks=null;
      }, t.prototype.setTime=function(e) {
        return this.time=e, this;
      }, t.prototype.replaceSelection=function(e) {
        return this.selection.replace(this, e), this;
      }, t.prototype.replaceSelectionWith=function(e, t) {
        const n=this.selection; return !1!==t&&(e=e.mark(this.storedMarks||(n.empty?n.$from.marks():n.$from.marksAcross(n.$to)||r.vc.none))), n.replaceWith(this, e), this;
      }, t.prototype.deleteSelection=function() {
        return this.selection.replace(this), this;
      }, t.prototype.insertText=function(e, t, n) {
        void 0===n&&(n=t); const r=this.doc.type.schema; if (null==t) return e?this.replaceSelectionWith(r.text(e), !0):this.deleteSelection(); if (!e) return this.deleteRange(t, n); let i=this.storedMarks; if (!i) {
          const o=this.doc.resolve(t); i=n==t?o.marks():o.marksAcross(this.doc.resolve(n));
        } return this.replaceRangeWith(t, n, r.text(e, i)), this.selection.empty||this.setSelection(s.near(this.selection.$to)), this;
      }, t.prototype.setMeta=function(e, t) {
        return this.meta['string'==typeof e?e:e.key]=t, this;
      }, t.prototype.getMeta=function(e) {
        return this.meta['string'==typeof e?e:e.key];
      }, n.isGeneric.get=function() {
        for (const e in this.meta) return !1; return !0;
      }, t.prototype.scrollIntoView=function() {
        return this.updated|=4, this;
      }, n.scrolledIntoView.get=function() {
        return (4&this.updated)>0;
      }, Object.defineProperties(t.prototype, n), t;
    }(i.wx); function y(e, t) {
      return t&&e?e.bind(t):e;
    } const b=function(e, t, n) {
      this.name=e, this.init=y(t.init, n), this.apply=y(t.apply, n);
    }; const w=[new b('doc', {init: function(e) {
      return e.doc||e.schema.topNodeType.createAndFill();
    }, apply: function(e) {
      return e.doc;
    }}), new b('selection', {init: function(e, t) {
      return e.selection||s.atStart(t.doc);
    }, apply: function(e) {
      return e.selection;
    }}), new b('storedMarks', {init: function(e) {
      return e.storedMarks||null;
    }, apply: function(e, t, n, r) {
      return r.selection.$cursor?e.storedMarks:null;
    }}), new b('scrollToSelection', {init: function() {
      return 0;
    }, apply: function(e, t) {
      return e.scrolledIntoView?t+1:t;
    }})]; const x=function(e, t) {
      const n=this; this.schema=e, this.fields=w.concat(), this.plugins=[], this.pluginsByKey=Object.create(null), t&&t.forEach((function(e) {
        if (n.pluginsByKey[e.key]) throw new RangeError('Adding different instances of a keyed plugin ('+e.key+')'); n.plugins.push(e), n.pluginsByKey[e.key]=e, e.spec.state&&n.fields.push(new b(e.key, e.spec.state, e));
      }));
    }; var k=function(e) {
      this.config=e;
    }; const _={schema: {configurable: !0}, plugins: {configurable: !0}, tr: {configurable: !0}}; _.schema.get=function() {
      return this.config.schema;
    }, _.plugins.get=function() {
      return this.config.plugins;
    }, k.prototype.apply=function(e) {
      return this.applyTransaction(e).state;
    }, k.prototype.filterTransaction=function(e, t) {
      void 0===t&&(t=-1); for (let n=0; n<this.config.plugins.length; n++) {
        if (n!=t) {
          const r=this.config.plugins[n]; if (r.spec.filterTransaction&&!r.spec.filterTransaction.call(r, e, this)) return !1;
        }
      } return !0;
    }, k.prototype.applyTransaction=function(e) {
      if (!this.filterTransaction(e)) return {state: this, transactions: []}; for (let t=[e], n=this.applyInner(e), r=null; ;) {
        for (var i=!1, o=0; o<this.config.plugins.length; o++) {
          const s=this.config.plugins[o]; if (s.spec.appendTransaction) {
            const a=r?r[o].n:0; const l=r?r[o].state:this; const c=a<t.length&&s.spec.appendTransaction.call(s, a?t.slice(a):t, l, n); if (c&&n.filterTransaction(c, o)) {
              if (c.setMeta('appendedTransaction', e), !r) {
                r=[]; for (let u=0; u<this.config.plugins.length; u++)r.push(u<o?{state: n, n: t.length}:{state: this, n: 0});
              }t.push(c), n=n.applyInner(c), i=!0;
            }r&&(r[o]={state: n, n: t.length});
          }
        } if (!i) return {state: n, transactions: t};
      }
    }, k.prototype.applyInner=function(e) {
      if (!e.before.eq(this.doc)) throw new RangeError('Applying a mismatched transaction'); for (var t=new k(this.config), n=this.config.fields, r=0; r<n.length; r++) {
        const i=n[r]; t[i.name]=i.apply(e, this[i.name], this, t);
      } for (let o=0; o<S.length; o++)S[o](this, e, t); return t;
    }, _.tr.get=function() {
      return new v(this);
    }, k.create=function(e) {
      for (var t=new x(e.schema||e.doc.type.schema, e.plugins), n=new k(t), r=0; r<t.fields.length; r++)n[t.fields[r].name]=t.fields[r].init(e, n); return n;
    }, k.prototype.reconfigure=function(e) {
      for (var t=new x(e.schema||this.schema, e.plugins), n=t.fields, r=new k(t), i=0; i<n.length; i++) {
        const o=n[i].name; r[o]=this.hasOwnProperty(o)?this[o]:n[i].init(e, r);
      } return r;
    }, k.prototype.toJSON=function(e) {
      const t={doc: this.doc.toJSON(), selection: this.selection.toJSON()}; if (this.storedMarks&&(t.storedMarks=this.storedMarks.map((function(e) {
        return e.toJSON();
      }))), e&&'object'==typeof e) {
        for (const n in e) {
          if ('doc'==n||'selection'==n) throw new RangeError('The JSON fields `doc` and `selection` are reserved'); const r=e[n]; const i=r.spec.state; i&&i.toJSON&&(t[n]=i.toJSON.call(r, this[r.key]));
        }
      } return t;
    }, k.fromJSON=function(e, t, n) {
      if (!t) throw new RangeError('Invalid input for EditorState.fromJSON'); if (!e.schema) throw new RangeError('Required config field \'schema\' missing'); const i=new x(e.schema, e.plugins); const o=new k(i); return i.fields.forEach((function(i) {
        if ('doc'==i.name)o.doc=r.NB.fromJSON(e.schema, t.doc); else if ('selection'==i.name)o.selection=s.fromJSON(o.doc, t.selection); else if ('storedMarks'==i.name)t.storedMarks&&(o.storedMarks=t.storedMarks.map(e.schema.markFromJSON)); else {
          if (n) {
            for (const a in n) {
              const l=n[a]; const c=l.spec.state; if (l.key==i.name&&c&&c.fromJSON&&Object.prototype.hasOwnProperty.call(t, a)) return void(o[i.name]=c.fromJSON.call(l, e, t[a], o));
            }
          }o[i.name]=i.init(e, o);
        }
      })), o;
    }, k.addApplyListener=function(e) {
      S.push(e);
    }, k.removeApplyListener=function(e) {
      const t=S.indexOf(e); t>-1&&S.splice(t, 1);
    }, Object.defineProperties(k.prototype, _); var S=[]; function C(e, t, n) {
      for (const r in e) {
        let i=e[r]; i instanceof Function?i=i.bind(t):'handleDOMEvents'==r&&(i=C(i, t, {})), n[r]=i;
      } return n;
    } var M=function(e) {
      this.props={}, e.props&&C(e.props, this, this.props), this.spec=e, this.key=e.key?e.key.key:O('plugin');
    }; M.prototype.getState=function(e) {
      return e[this.key];
    }; const T=Object.create(null); function O(e) {
      return e in T?e+'$'+ ++T[e]:(T[e]=0, e+'$');
    } var D=function(e) {
      void 0===e&&(e='key'), this.key=O(e);
    }; D.prototype.get=function(e) {
      return e.config.pluginsByKey[this.key];
    }, D.prototype.getState=function(e) {
      return e[this.key];
    };
  }, 81: (e, t, n)=>{
    'use strict'; n.d(t, {vs: ()=>l, FC: ()=>v, Pu: ()=>g, wx: ()=>u, Mn: ()=>S, Ax: ()=>_, nj: ()=>T, nd: ()=>x, GJ: ()=>M, k9: ()=>w}); const r=n(638); const i=Math.pow(2, 16); function o(e) {
      return 65535&e;
    } const s=function(e, t, n) {
      void 0===t&&(t=!1), void 0===n&&(n=null), this.pos=e, this.deleted=t, this.recover=n;
    }; const a=function(e, t) {
      void 0===t&&(t=!1), this.ranges=e, this.inverted=t;
    }; a.prototype.recover=function(e) {
      let t=0; const n=o(e); if (!this.inverted) for (let r=0; r<n; r++)t+=this.ranges[3*r+2]-this.ranges[3*r+1]; return this.ranges[3*n]+t+function(e) {
        return (e-(65535&e))/i;
      }(e);
    }, a.prototype.mapResult=function(e, t) {
      return void 0===t&&(t=1), this._map(e, t, !1);
    }, a.prototype.map=function(e, t) {
      return void 0===t&&(t=1), this._map(e, t, !0);
    }, a.prototype._map=function(e, t, n) {
      for (var r=0, o=this.inverted?2:1, a=this.inverted?1:2, l=0; l<this.ranges.length; l+=3) {
        const c=this.ranges[l]-(this.inverted?r:0); if (c>e) break; const u=this.ranges[l+o]; const d=this.ranges[l+a]; const h=c+u; if (e<=h) {
          const p=c+r+((u?e==c?-1:e==h?1:t:t)<0?0:d); return n?p:new s(p, t<0?e!=c:e!=h, e==(t<0?c:h)?null:l/3+(e-c)*i);
        }r+=d-u;
      } return n?e+r:new s(e+r);
    }, a.prototype.touches=function(e, t) {
      for (let n=0, r=o(t), i=this.inverted?2:1, s=this.inverted?1:2, a=0; a<this.ranges.length; a+=3) {
        const l=this.ranges[a]-(this.inverted?n:0); if (l>e) break; const c=this.ranges[a+i]; if (e<=l+c&&a==3*r) return !0; n+=this.ranges[a+s]-c;
      } return !1;
    }, a.prototype.forEach=function(e) {
      for (let t=this.inverted?2:1, n=this.inverted?1:2, r=0, i=0; r<this.ranges.length; r+=3) {
        const o=this.ranges[r]; const s=o-(this.inverted?i:0); const a=o+(this.inverted?0:i); const l=this.ranges[r+t]; const c=this.ranges[r+n]; e(s, s+l, a, a+c), i+=c-l;
      }
    }, a.prototype.invert=function() {
      return new a(this.ranges, !this.inverted);
    }, a.prototype.toString=function() {
      return (this.inverted?'-':'')+JSON.stringify(this.ranges);
    }, a.offset=function(e) {
      return 0==e?a.empty:new a(e<0?[0, -e, 0]:[0, 0, e]);
    }, a.empty=new a([]); var l=function(e, t, n, r) {
      this.maps=e||[], this.from=n||0, this.to=null==r?this.maps.length:r, this.mirror=t;
    }; function c(e) {
      const t=Error.call(this, e); return t.__proto__=c.prototype, t;
    }l.prototype.slice=function(e, t) {
      return void 0===e&&(e=0), void 0===t&&(t=this.maps.length), new l(this.maps, this.mirror, e, t);
    }, l.prototype.copy=function() {
      return new l(this.maps.slice(), this.mirror&&this.mirror.slice(), this.from, this.to);
    }, l.prototype.appendMap=function(e, t) {
      this.to=this.maps.push(e), null!=t&&this.setMirror(this.maps.length-1, t);
    }, l.prototype.appendMapping=function(e) {
      for (let t=0, n=this.maps.length; t<e.maps.length; t++) {
        const r=e.getMirror(t); this.appendMap(e.maps[t], null!=r&&r<t?n+r:null);
      }
    }, l.prototype.getMirror=function(e) {
      if (this.mirror) for (let t=0; t<this.mirror.length; t++) if (this.mirror[t]==e) return this.mirror[t+(t%2?-1:1)];
    }, l.prototype.setMirror=function(e, t) {
      this.mirror||(this.mirror=[]), this.mirror.push(e, t);
    }, l.prototype.appendMappingInverted=function(e) {
      for (let t=e.maps.length-1, n=this.maps.length+e.maps.length; t>=0; t--) {
        const r=e.getMirror(t); this.appendMap(e.maps[t].invert(), null!=r&&r>t?n-r-1:null);
      }
    }, l.prototype.invert=function() {
      const e=new l; return e.appendMappingInverted(this), e;
    }, l.prototype.map=function(e, t) {
      if (void 0===t&&(t=1), this.mirror) return this._map(e, t, !0); for (let n=this.from; n<this.to; n++)e=this.maps[n].map(e, t); return e;
    }, l.prototype.mapResult=function(e, t) {
      return void 0===t&&(t=1), this._map(e, t, !1);
    }, l.prototype._map=function(e, t, n) {
      for (var r=!1, i=this.from; i<this.to; i++) {
        const o=this.maps[i].mapResult(e, t); if (null!=o.recover) {
          const a=this.getMirror(i); if (null!=a&&a>i&&a<this.to) {
            i=a, e=this.maps[a].recover(o.recover); continue;
          }
        }o.deleted&&(r=!0), e=o.pos;
      } return n?e:new s(e, r);
    }, c.prototype=Object.create(Error.prototype), c.prototype.constructor=c, c.prototype.name='TransformError'; var u=function(e) {
      this.doc=e, this.steps=[], this.docs=[], this.mapping=new l;
    }; const d={before: {configurable: !0}, docChanged: {configurable: !0}}; function h() {
      throw new Error('Override me');
    }d.before.get=function() {
      return this.docs.length?this.docs[0]:this.doc;
    }, u.prototype.step=function(e) {
      const t=this.maybeStep(e); if (t.failed) throw new c(t.failed); return this;
    }, u.prototype.maybeStep=function(e) {
      const t=e.apply(this.doc); return t.failed||this.addStep(e, t.doc), t;
    }, d.docChanged.get=function() {
      return this.steps.length>0;
    }, u.prototype.addStep=function(e, t) {
      this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc=t;
    }, Object.defineProperties(u.prototype, d); const p=Object.create(null); const f=function() {}; f.prototype.apply=function(e) {
      return h();
    }, f.prototype.getMap=function() {
      return a.empty;
    }, f.prototype.invert=function(e) {
      return h();
    }, f.prototype.map=function(e) {
      return h();
    }, f.prototype.merge=function(e) {
      return null;
    }, f.prototype.toJSON=function() {
      return h();
    }, f.fromJSON=function(e, t) {
      if (!t||!t.stepType) throw new RangeError('Invalid input for Step.fromJSON'); const n=p[t.stepType]; if (!n) throw new RangeError('No step type '+t.stepType+' defined'); return n.fromJSON(e, t);
    }, f.jsonID=function(e, t) {
      if (e in p) throw new RangeError('Duplicate use of step JSON ID '+e); return p[e]=t, t.prototype.jsonID=e, t;
    }; const m=function(e, t) {
      this.doc=e, this.failed=t;
    }; m.ok=function(e) {
      return new m(e, null);
    }, m.fail=function(e) {
      return new m(null, e);
    }, m.fromReplace=function(e, t, n, i) {
      try {
        return m.ok(e.replace(t, n, i));
      } catch (e) {
        if (e instanceof r.e4) return m.fail(e.message); throw e;
      }
    }; var g=function(e) {
      function t(t, n, r, i) {
        e.call(this), this.from=t, this.to=n, this.slice=r, this.structure=!!i;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.apply=function(e) {
        return this.structure&&y(e, this.from, this.to)?m.fail('Structure replace would overwrite content'):m.fromReplace(e, this.from, this.to, this.slice);
      }, t.prototype.getMap=function() {
        return new a([this.from, this.to-this.from, this.slice.size]);
      }, t.prototype.invert=function(e) {
        return new t(this.from, this.from+this.slice.size, e.slice(this.from, this.to));
      }, t.prototype.map=function(e) {
        const n=e.mapResult(this.from, 1); const r=e.mapResult(this.to, -1); return n.deleted&&r.deleted?null:new t(n.pos, Math.max(n.pos, r.pos), this.slice);
      }, t.prototype.merge=function(e) {
        if (!(e instanceof t)||e.structure!=this.structure) return null; if (this.from+this.slice.size!=e.from||this.slice.openEnd||e.slice.openStart) {
          if (e.to!=this.from||this.slice.openStart||e.slice.openEnd) return null; const n=this.slice.size+e.slice.size==0?r.p2.empty:new r.p2(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd); return new t(e.from, this.to, n, this.structure);
        } const i=this.slice.size+e.slice.size==0?r.p2.empty:new r.p2(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd); return new t(this.from, this.to+(e.to-e.from), i, this.structure);
      }, t.prototype.toJSON=function() {
        const e={stepType: 'replace', from: this.from, to: this.to}; return this.slice.size&&(e.slice=this.slice.toJSON()), this.structure&&(e.structure=!0), e;
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.from||'number'!=typeof n.to) throw new RangeError('Invalid input for ReplaceStep.fromJSON'); return new t(n.from, n.to, r.p2.fromJSON(e, n.slice), !!n.structure);
      }, t;
    }(f); f.jsonID('replace', g); var v=function(e) {
      function t(t, n, r, i, o, s, a) {
        e.call(this), this.from=t, this.to=n, this.gapFrom=r, this.gapTo=i, this.slice=o, this.insert=s, this.structure=!!a;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.apply=function(e) {
        if (this.structure&&(y(e, this.from, this.gapFrom)||y(e, this.gapTo, this.to))) return m.fail('Structure gap-replace would overwrite content'); const t=e.slice(this.gapFrom, this.gapTo); if (t.openStart||t.openEnd) return m.fail('Gap is not a flat range'); const n=this.slice.insertAt(this.insert, t.content); return n?m.fromReplace(e, this.from, this.to, n):m.fail('Content does not fit in gap');
      }, t.prototype.getMap=function() {
        return new a([this.from, this.gapFrom-this.from, this.insert, this.gapTo, this.to-this.gapTo, this.slice.size-this.insert]);
      }, t.prototype.invert=function(e) {
        const n=this.gapTo-this.gapFrom; return new t(this.from, this.from+this.slice.size+n, this.from+this.insert, this.from+this.insert+n, e.slice(this.from, this.to).removeBetween(this.gapFrom-this.from, this.gapTo-this.from), this.gapFrom-this.from, this.structure);
      }, t.prototype.map=function(e) {
        const n=e.mapResult(this.from, 1); const r=e.mapResult(this.to, -1); const i=e.map(this.gapFrom, -1); const o=e.map(this.gapTo, 1); return n.deleted&&r.deleted||i<n.pos||o>r.pos?null:new t(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
      }, t.prototype.toJSON=function() {
        const e={stepType: 'replaceAround', from: this.from, to: this.to, gapFrom: this.gapFrom, gapTo: this.gapTo, insert: this.insert}; return this.slice.size&&(e.slice=this.slice.toJSON()), this.structure&&(e.structure=!0), e;
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.from||'number'!=typeof n.to||'number'!=typeof n.gapFrom||'number'!=typeof n.gapTo||'number'!=typeof n.insert) throw new RangeError('Invalid input for ReplaceAroundStep.fromJSON'); return new t(n.from, n.to, n.gapFrom, n.gapTo, r.p2.fromJSON(e, n.slice), n.insert, !!n.structure);
      }, t;
    }(f); function y(e, t, n) {
      for (var r=e.resolve(t), i=n-t, o=r.depth; i>0&&o>0&&r.indexAfter(o)==r.node(o).childCount;)o--, i--; if (i>0) {
        for (let s=r.node(o).maybeChild(r.indexAfter(o)); i>0;) {
          if (!s||s.isLeaf) return !0; s=s.firstChild, i--;
        }
      } return !1;
    } function b(e, t, n) {
      return (0==t||e.canReplace(t, e.childCount))&&(n==e.childCount||e.canReplace(0, n));
    } function w(e) {
      for (let t=e.parent.content.cutByIndex(e.startIndex, e.endIndex), n=e.depth; ;--n) {
        const r=e.$from.node(n); const i=e.$from.index(n); const o=e.$to.indexAfter(n); if (n<e.depth&&r.canReplace(i, o, t)) return n; if (0==n||r.type.spec.isolating||!b(r, i, o)) break;
      }
    } function x(e, t, n, r) {
      void 0===r&&(r=e); const i=function(e, t) {
        const n=e.parent; const r=e.startIndex; const i=e.endIndex; const o=n.contentMatchAt(r).findWrapping(t); if (!o) return null; const s=o.length?o[0]:t; return n.canReplaceWith(r, i, s)?o:null;
      }(e, t); const o=i&&function(e, t) {
        const n=e.parent; const r=e.startIndex; const i=e.endIndex; const o=n.child(r); const s=t.contentMatch.findWrapping(o.type); if (!s) return null; for (var a=(s.length?s[s.length-1]:t).contentMatch, l=r; a&&l<i; l++)a=a.matchType(n.child(l).type); return a&&a.validEnd?s:null;
      }(r, t); return o?i.map(k).concat({type: t, attrs: n}).concat(o.map(k)):null;
    } function k(e) {
      return {type: e, attrs: null};
    } function _(e, t, n, r) {
      void 0===n&&(n=1); const i=e.resolve(t); const o=i.depth-n; const s=r&&r[r.length-1]||i.parent; if (o<0||i.parent.type.spec.isolating||!i.parent.canReplace(i.index(), i.parent.childCount)||!s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1; for (let a=i.depth-1, l=n-2; a>o; a--, l--) {
        const c=i.node(a); const u=i.index(a); if (c.type.spec.isolating) return !1; let d=c.content.cutByIndex(u, c.childCount); const h=r&&r[l]||c; if (h!=c&&(d=d.replaceChild(0, h.type.create(h.attrs))), !c.canReplace(u+1, c.childCount)||!h.type.validContent(d)) return !1;
      } const p=i.indexAfter(o); const f=r&&r[0]; return i.node(o).canReplaceWith(p, p, f?f.type:i.node(o+1).type);
    } function S(e, t) {
      const n=e.resolve(t); const r=n.index(); return C(n.nodeBefore, n.nodeAfter)&&n.parent.canReplace(r, r+1);
    } function C(e, t) {
      return e&&t&&!e.isLeaf&&e.canAppend(t);
    } function M(e, t, n) {
      void 0===n&&(n=-1); for (let r=e.resolve(t), i=r.depth; ;i--) {
        let o=void 0; let s=void 0; let a=r.index(i); if (i==r.depth?(o=r.nodeBefore, s=r.nodeAfter):n>0?(o=r.node(i+1), a++, s=r.node(i).maybeChild(a)):(o=r.node(i).maybeChild(a-1), s=r.node(i+1)), o&&!o.isTextblock&&C(o, s)&&r.node(i).canReplace(a, a+1)) return t; if (0==i) break; t=n<0?r.before(i):r.after(i);
      }
    } function T(e, t, n) {
      const r=e.resolve(t); if (!n.content.size) return t; for (var i=n.content, o=0; o<n.openStart; o++)i=i.firstChild.content; for (let s=1; s<=(0==n.openStart&&n.size?2:1); s++) {
        for (let a=r.depth; a>=0; a--) {
          const l=a==r.depth?0:r.pos<=(r.start(a+1)+r.end(a+1))/2?-1:1; const c=r.index(a)+(l>0?1:0); if (1==s?r.node(a).canReplace(c, c, i):r.node(a).contentMatchAt(c).findWrapping(i.firstChild.type)) return 0==l?r.pos:l<0?r.before(a+1):r.after(a+1);
        }
      } return null;
    } function O(e, t, n) {
      for (var i=[], o=0; o<e.childCount; o++) {
        let s=e.child(o); s.content.size&&(s=s.copy(O(s.content, t, s))), s.isInline&&(s=t(s, n, o)), i.push(s);
      } return r.HY.fromArray(i);
    }f.jsonID('replaceAround', v), u.prototype.lift=function(e, t) {
      for (var n=e.$from, i=e.$to, o=e.depth, s=n.before(o+1), a=i.after(o+1), l=s, c=a, u=r.HY.empty, d=0, h=o, p=!1; h>t; h--)p||n.index(h)>0?(p=!0, u=r.HY.from(n.node(h).copy(u)), d++):l--; for (var f=r.HY.empty, m=0, g=o, y=!1; g>t; g--)y||i.after(g+1)<i.end(g)?(y=!0, f=r.HY.from(i.node(g).copy(f)), m++):c++; return this.step(new v(l, c, s, a, new r.p2(u.append(f), d, m), u.size-d, !0));
    }, u.prototype.wrap=function(e, t) {
      for (var n=r.HY.empty, i=t.length-1; i>=0; i--)n=r.HY.from(t[i].type.create(t[i].attrs, n)); const o=e.start; const s=e.end; return this.step(new v(o, s, o, s, new r.p2(n, 0, 0), t.length, !0));
    }, u.prototype.setBlockType=function(e, t, n, i) {
      const o=this; if (void 0===t&&(t=e), !n.isTextblock) throw new RangeError('Type given to setBlockType should be a textblock'); const s=this.steps.length; return this.doc.nodesBetween(e, t, (function(e, t) {
        if (e.isTextblock&&!e.hasMarkup(n, i)&&function(e, t, n) {
          const r=e.resolve(t); const i=r.index(); return r.parent.canReplaceWith(i, i+1, n);
        }(o.doc, o.mapping.slice(s).map(t), n)) {
          o.clearIncompatible(o.mapping.slice(s).map(t, 1), n); const a=o.mapping.slice(s); const l=a.map(t, 1); const c=a.map(t+e.nodeSize, 1); return o.step(new v(l, c, l+1, c-1, new r.p2(r.HY.from(n.create(i, null, e.marks)), 0, 0), 1, !0)), !1;
        }
      })), this;
    }, u.prototype.setNodeMarkup=function(e, t, n, i) {
      const o=this.doc.nodeAt(e); if (!o) throw new RangeError('No node at given position'); t||(t=o.type); const s=t.create(n, null, i||o.marks); if (o.isLeaf) return this.replaceWith(e, e+o.nodeSize, s); if (!t.validContent(o.content)) throw new RangeError('Invalid content for node type '+t.name); return this.step(new v(e, e+o.nodeSize, e+1, e+o.nodeSize-1, new r.p2(r.HY.from(s), 0, 0), 1, !0));
    }, u.prototype.split=function(e, t, n) {
      void 0===t&&(t=1); for (var i=this.doc.resolve(e), o=r.HY.empty, s=r.HY.empty, a=i.depth, l=i.depth-t, c=t-1; a>l; a--, c--) {
        o=r.HY.from(i.node(a).copy(o)); const u=n&&n[c]; s=r.HY.from(u?u.type.create(u.attrs, s):i.node(a).copy(s));
      } return this.step(new g(e, e, new r.p2(o.append(s), t, t), !0));
    }, u.prototype.join=function(e, t) {
      void 0===t&&(t=1); const n=new g(e-t, e+t, r.p2.empty, !0); return this.step(n);
    }; const D=function(e) {
      function t(t, n, r) {
        e.call(this), this.from=t, this.to=n, this.mark=r;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.apply=function(e) {
        const t=this; const n=e.slice(this.from, this.to); const i=e.resolve(this.from); const o=i.node(i.sharedDepth(this.to)); const s=new r.p2(O(n.content, (function(e, n) {
          return n.type.allowsMarkType(t.mark.type)?e.mark(t.mark.addToSet(e.marks)):e;
        }), o), n.openStart, n.openEnd); return m.fromReplace(e, this.from, this.to, s);
      }, t.prototype.invert=function() {
        return new E(this.from, this.to, this.mark);
      }, t.prototype.map=function(e) {
        const n=e.mapResult(this.from, 1); const r=e.mapResult(this.to, -1); return n.deleted&&r.deleted||n.pos>=r.pos?null:new t(n.pos, r.pos, this.mark);
      }, t.prototype.merge=function(e) {
        if (e instanceof t&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from) return new t(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark);
      }, t.prototype.toJSON=function() {
        return {stepType: 'addMark', mark: this.mark.toJSON(), from: this.from, to: this.to};
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.from||'number'!=typeof n.to) throw new RangeError('Invalid input for AddMarkStep.fromJSON'); return new t(n.from, n.to, e.markFromJSON(n.mark));
      }, t;
    }(f); f.jsonID('addMark', D); var E=function(e) {
      function t(t, n, r) {
        e.call(this), this.from=t, this.to=n, this.mark=r;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.apply=function(e) {
        const t=this; const n=e.slice(this.from, this.to); const i=new r.p2(O(n.content, (function(e) {
          return e.mark(t.mark.removeFromSet(e.marks));
        })), n.openStart, n.openEnd); return m.fromReplace(e, this.from, this.to, i);
      }, t.prototype.invert=function() {
        return new D(this.from, this.to, this.mark);
      }, t.prototype.map=function(e) {
        const n=e.mapResult(this.from, 1); const r=e.mapResult(this.to, -1); return n.deleted&&r.deleted||n.pos>=r.pos?null:new t(n.pos, r.pos, this.mark);
      }, t.prototype.merge=function(e) {
        if (e instanceof t&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from) return new t(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark);
      }, t.prototype.toJSON=function() {
        return {stepType: 'removeMark', mark: this.mark.toJSON(), from: this.from, to: this.to};
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.from||'number'!=typeof n.to) throw new RangeError('Invalid input for RemoveMarkStep.fromJSON'); return new t(n.from, n.to, e.markFromJSON(n.mark));
      }, t;
    }(f); function N(e, t, n) {
      return !n.openStart&&!n.openEnd&&e.start()==t.start()&&e.parent.canReplace(e.index(), t.index(), n.content);
    }f.jsonID('removeMark', E), u.prototype.addMark=function(e, t, n) {
      const r=this; const i=[]; const o=[]; let s=null; let a=null; return this.doc.nodesBetween(e, t, (function(r, l, c) {
        if (r.isInline) {
          const u=r.marks; if (!n.isInSet(u)&&c.type.allowsMarkType(n.type)) {
            for (var d=Math.max(l, e), h=Math.min(l+r.nodeSize, t), p=n.addToSet(u), f=0; f<u.length; f++)u[f].isInSet(p)||(s&&s.to==d&&s.mark.eq(u[f])?s.to=h:i.push(s=new E(d, h, u[f]))); a&&a.to==d?a.to=h:o.push(a=new D(d, h, n));
          }
        }
      })), i.forEach((function(e) {
        return r.step(e);
      })), o.forEach((function(e) {
        return r.step(e);
      })), this;
    }, u.prototype.removeMark=function(e, t, n) {
      const i=this; void 0===n&&(n=null); const o=[]; let s=0; return this.doc.nodesBetween(e, t, (function(i, a) {
        if (i.isInline) {
          s++; let l=null; if (n instanceof r.ZU) {
            const c=n.isInSet(i.marks); c&&(l=[c]);
          } else n?n.isInSet(i.marks)&&(l=[n]):l=i.marks; if (l&&l.length) {
            for (let u=Math.min(a+i.nodeSize, t), d=0; d<l.length; d++) {
              for (var h=l[d], p=void 0, f=0; f<o.length; f++) {
                const m=o[f]; m.step==s-1&&h.eq(o[f].style)&&(p=m);
              }p?(p.to=u, p.step=s):o.push({style: h, from: Math.max(a, e), to: u, step: s});
            }
          }
        }
      })), o.forEach((function(e) {
        return i.step(new E(e.from, e.to, e.style));
      })), this;
    }, u.prototype.clearIncompatible=function(e, t, n) {
      void 0===n&&(n=t.contentMatch); for (var i=this.doc.nodeAt(e), o=[], s=e+1, a=0; a<i.childCount; a++) {
        const l=i.child(a); const c=s+l.nodeSize; const u=n.matchType(l.type, l.attrs); if (u) {
          n=u; for (let d=0; d<l.marks.length; d++)t.allowsMarkType(l.marks[d].type)||this.step(new E(s, c, l.marks[d]));
        } else o.push(new g(s, c, r.p2.empty)); s=c;
      } if (!n.validEnd) {
        const h=n.fillBefore(r.HY.empty, !0); this.replace(s, s, new r.p2(h, 0, 0));
      } for (let p=o.length-1; p>=0; p--) this.step(o[p]); return this;
    }, u.prototype.replace=function(e, t, n) {
      void 0===t&&(t=e), void 0===n&&(n=r.p2.empty); const i=function(e, t, n, i) {
        if (void 0===n&&(n=t), void 0===i&&(i=r.p2.empty), t==n&&!i.size) return null; const o=e.resolve(t); const s=e.resolve(n); return N(o, s, i)?new g(t, n, i):new A(o, s, i).fit();
      }(this.doc, e, t, n); return i&&this.step(i), this;
    }, u.prototype.replaceWith=function(e, t, n) {
      return this.replace(e, t, new r.p2(r.HY.from(n), 0, 0));
    }, u.prototype.delete=function(e, t) {
      return this.replace(e, t, r.p2.empty);
    }, u.prototype.insert=function(e, t) {
      return this.replaceWith(e, e, t);
    }; var A=function(e, t, n) {
      this.$to=t, this.$from=e, this.unplaced=n, this.frontier=[]; for (let i=0; i<=e.depth; i++) {
        const o=e.node(i); this.frontier.push({type: o.type, match: o.contentMatchAt(e.indexAfter(i))});
      } this.placed=r.HY.empty; for (let s=e.depth; s>0; s--) this.placed=r.HY.from(e.node(s).copy(this.placed));
    }; const L={depth: {configurable: !0}}; function z(e, t, n) {
      return 0==t?e.cutByIndex(n):e.replaceChild(0, e.firstChild.copy(z(e.firstChild.content, t-1, n)));
    } function I(e, t, n) {
      return 0==t?e.append(n):e.replaceChild(e.childCount-1, e.lastChild.copy(I(e.lastChild.content, t-1, n)));
    } function q(e, t) {
      for (let n=0; n<t; n++)e=e.firstChild.content; return e;
    } function F(e, t, n) {
      if (t<=0) return e; let i=e.content; return t>1&&(i=i.replaceChild(0, F(i.firstChild, t-1, 1==i.childCount?n-1:0))), t>0&&(i=e.type.contentMatch.fillBefore(i).append(i), n<=0&&(i=i.append(e.type.contentMatch.matchFragment(i).fillBefore(r.HY.empty, !0)))), e.copy(i);
    } function P(e, t, n, r, i) {
      const o=e.node(t); const s=i?e.indexAfter(t):e.index(t); if (s==o.childCount&&!n.compatibleContent(o.type)) return null; const a=r.fillBefore(o.content, !0, s); return a&&!function(e, t, n) {
        for (let r=n; r<t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0; return !1;
      }(n, o.content, s)?a:null;
    } function R(e, t, n, i, o) {
      if (t<n) {
        const s=e.firstChild; e=e.replaceChild(0, s.copy(R(s.content, t+1, n, i, s)));
      } if (t>i) {
        const a=o.contentMatchAt(0); const l=a.fillBefore(e).append(e); e=l.append(a.matchFragment(l).fillBefore(r.HY.empty, !0));
      } return e;
    } function B(e, t) {
      for (var n=[], r=Math.min(e.depth, t.depth); r>=0; r--) {
        const i=e.start(r); if (i<e.pos-(e.depth-r)||t.end(r)>t.pos+(t.depth-r)||e.node(r).type.spec.isolating||t.node(r).type.spec.isolating) break; i==t.start(r)&&n.push(r);
      } return n;
    }L.depth.get=function() {
      return this.frontier.length-1;
    }, A.prototype.fit=function() {
      for (;this.unplaced.size;) {
        const e=this.findFittable(); e?this.placeNodes(e):this.openMore()||this.dropNode();
      } const t=this.mustMoveInline(); const n=this.placed.size-this.depth-this.$from.depth; const i=this.$from; const o=this.close(t<0?this.$to:i.doc.resolve(t)); if (!o) return null; for (var s=this.placed, a=i.depth, l=o.depth; a&&l&&1==s.childCount;)s=s.firstChild.content, a--, l--; const c=new r.p2(s, a, l); return t>-1?new v(i.pos, t, this.$to.pos, this.$to.end(), c, n):c.size||i.pos!=this.$to.pos?new g(i.pos, o.pos, c):void 0;
    }, A.prototype.findFittable=function() {
      for (let e=1; e<=2; e++) {
        for (let t=this.unplaced.openStart; t>=0; t--) {
          for (let n=void 0, i=(t?(n=q(this.unplaced.content, t-1).firstChild).content:this.unplaced.content).firstChild, o=this.depth; o>=0; o--) {
            const s=this.frontier[o]; const a=s.type; const l=s.match; let c=void 0; let u=void 0; if (1==e&&(i?l.matchType(i.type)||(u=l.fillBefore(r.HY.from(i), !1)):a.compatibleContent(n.type))) return {sliceDepth: t, frontierDepth: o, parent: n, inject: u}; if (2==e&&i&&(c=l.findWrapping(i.type))) return {sliceDepth: t, frontierDepth: o, parent: n, wrap: c}; if (n&&l.matchType(n.type)) break;
          }
        }
      }
    }, A.prototype.openMore=function() {
      const e=this.unplaced; const t=e.content; const n=e.openStart; const i=e.openEnd; const o=q(t, n); return !(!o.childCount||o.firstChild.isLeaf||(this.unplaced=new r.p2(t, n+1, Math.max(i, o.size+n>=t.size-i?n+1:0)), 0));
    }, A.prototype.dropNode=function() {
      const e=this.unplaced; const t=e.content; const n=e.openStart; const i=e.openEnd; const o=q(t, n); if (o.childCount<=1&&n>0) {
        const s=t.size-n<=n+o.size; this.unplaced=new r.p2(z(t, n-1, 1), n-1, s?n-1:i);
      } else this.unplaced=new r.p2(z(t, n, 1), n, i);
    }, A.prototype.placeNodes=function(e) {
      for (var t=e.sliceDepth, n=e.frontierDepth, i=e.parent, o=e.inject, s=e.wrap; this.depth>n;) this.closeFrontierNode(); if (s) for (let a=0; a<s.length; a++) this.openFrontierNode(s[a]); const l=this.unplaced; const c=i?i.content:l.content; const u=l.openStart-t; let d=0; const h=[]; const p=this.frontier[n]; let f=p.match; const m=p.type; if (o) {
        for (let g=0; g<o.childCount; g++)h.push(o.child(g)); f=f.matchFragment(o);
      } for (var v=c.size+t-(l.content.size-l.openEnd); d<c.childCount;) {
        const y=c.child(d); const b=f.matchType(y.type); if (!b) break; (++d>1||0==u||y.content.size)&&(f=b, h.push(F(y.mark(m.allowedMarks(y.marks)), 1==d?u:0, d==c.childCount?v:-1)));
      } const w=d==c.childCount; w||(v=-1), this.placed=I(this.placed, n, r.HY.from(h)), this.frontier[n].match=f, w&&v<0&&i&&i.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode(); for (let x=0, k=c; x<v; x++) {
        const _=k.lastChild; this.frontier.push({type: _.type, match: _.contentMatchAt(_.childCount)}), k=_.content;
      } this.unplaced=w?0==t?r.p2.empty:new r.p2(z(l.content, t-1, 1), t-1, v<0?l.openEnd:t-1):new r.p2(z(l.content, t, d), l.openStart, l.openEnd);
    }, A.prototype.mustMoveInline=function() {
      if (!this.$to.parent.isTextblock||this.$to.end()==this.$to.pos) return -1; let e; const t=this.frontier[this.depth]; if (!t.type.isTextblock||!P(this.$to, this.$to.depth, t.type, t.match, !1)||this.$to.depth==this.depth&&(e=this.findCloseLevel(this.$to))&&e.depth==this.depth) return -1; for (var n=this.$to.depth, r=this.$to.after(n); n>1&&r==this.$to.end(--n);)++r; return r;
    }, A.prototype.findCloseLevel=function(e) {
      e:for (let t=Math.min(this.depth, e.depth); t>=0; t--) {
        const n=this.frontier[t]; const r=n.match; const i=n.type; const o=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)); const s=P(e, t, i, r, o); if (s) {
          for (let a=t-1; a>=0; a--) {
            const l=this.frontier[a]; const c=l.match; const u=P(e, a, l.type, c, !0); if (!u||u.childCount) continue e;
          } return {depth: t, fit: s, move: o?e.doc.resolve(e.after(t+1)):e};
        }
      }
    }, A.prototype.close=function(e) {
      const t=this.findCloseLevel(e); if (!t) return null; for (;this.depth>t.depth;) this.closeFrontierNode(); t.fit.childCount&&(this.placed=I(this.placed, t.depth, t.fit)), e=t.move; for (let n=t.depth+1; n<=e.depth; n++) {
        const r=e.node(n); const i=r.type.contentMatch.fillBefore(r.content, !0, e.index(n)); this.openFrontierNode(r.type, r.attrs, i);
      } return e;
    }, A.prototype.openFrontierNode=function(e, t, n) {
      const i=this.frontier[this.depth]; i.match=i.match.matchType(e), this.placed=I(this.placed, this.depth, r.HY.from(e.create(t, n))), this.frontier.push({type: e, match: e.contentMatch});
    }, A.prototype.closeFrontierNode=function() {
      const e=this.frontier.pop().match.fillBefore(r.HY.empty, !0); e.childCount&&(this.placed=I(this.placed, this.frontier.length, e));
    }, Object.defineProperties(A.prototype, L), u.prototype.replaceRange=function(e, t, n) {
      if (!n.size) return this.deleteRange(e, t); const i=this.doc.resolve(e); const o=this.doc.resolve(t); if (N(i, o, n)) return this.step(new g(e, t, n)); const s=B(i, this.doc.resolve(t)); 0==s[s.length-1]&&s.pop(); let a=-(i.depth+1); s.unshift(a); for (let l=i.depth, c=i.pos-1; l>0; l--, c--) {
        const u=i.node(l).type.spec; if (u.defining||u.isolating) break; s.indexOf(l)>-1?a=l:i.before(l)==c&&s.splice(1, 0, -l);
      } for (var d=s.indexOf(a), h=[], p=n.openStart, f=n.content, m=0; ;m++) {
        const v=f.firstChild; if (h.push(v), m==n.openStart) break; f=v.content;
      }p>0&&h[p-1].type.spec.defining&&i.node(d).type!=h[p-1].type?p-=1:p>=2&&h[p-1].isTextblock&&h[p-2].type.spec.defining&&i.node(d).type!=h[p-2].type&&(p-=2); for (let y=n.openStart; y>=0; y--) {
        const b=(y+p+1)%(n.openStart+1); const w=h[b]; if (w) {
          for (let x=0; x<s.length; x++) {
            let k=s[(x+d)%s.length]; let _=!0; k<0&&(_=!1, k=-k); const S=i.node(k-1); const C=i.index(k-1); if (S.canReplaceWith(C, C, w.type, w.marks)) return this.replace(i.before(k), _?o.after(k):t, new r.p2(R(n.content, 0, n.openStart, b), b, n.openEnd));
          }
        }
      } for (let M=this.steps.length, T=s.length-1; T>=0&&(this.replace(e, t, n), !(this.steps.length>M)); T--) {
        const O=s[T]; T<0||(e=i.before(O), t=o.after(O));
      } return this;
    }, u.prototype.replaceRangeWith=function(e, t, n) {
      if (!n.isInline&&e==t&&this.doc.resolve(e).parent.content.size) {
        const i=function(e, t, n) {
          const r=e.resolve(t); if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t; if (0==r.parentOffset) {
            for (let i=r.depth-1; i>=0; i--) {
              const o=r.index(i); if (r.node(i).canReplaceWith(o, o, n)) return r.before(i+1); if (o>0) return null;
            }
          } if (r.parentOffset==r.parent.content.size) {
            for (let s=r.depth-1; s>=0; s--) {
              const a=r.indexAfter(s); if (r.node(s).canReplaceWith(a, a, n)) return r.after(s+1); if (a<r.node(s).childCount) return null;
            }
          }
        }(this.doc, e, n.type); null!=i&&(e=t=i);
      } return this.replaceRange(e, t, new r.p2(r.HY.from(n), 0, 0));
    }, u.prototype.deleteRange=function(e, t) {
      for (var n=this.doc.resolve(e), r=this.doc.resolve(t), i=B(n, r), o=0; o<i.length; o++) {
        const s=i[o]; const a=o==i.length-1; if (a&&0==s||n.node(s).type.contentMatch.validEnd) return this.delete(n.start(s), r.end(s)); if (s>0&&(a||n.node(s-1).canReplace(n.index(s-1), r.indexAfter(s-1)))) return this.delete(n.before(s), r.after(s));
      } for (let l=1; l<=n.depth&&l<=r.depth; l++) if (e-n.start(l)==n.depth-l&&t>n.end(l)&&r.end(l)-t!=r.depth-l) return this.delete(n.before(l), t); return this.delete(e, t);
    };
  }, 780: (e, t, n)=>{
    'use strict'; n.d(t, {p: ()=>Ct, EH: ()=>Dt, tk: ()=>Bt}); const r=n(922); const i=n(638); const o=n(81); const s={}; if ('undefined'!=typeof navigator&&'undefined'!=typeof document) {
      const a=/Edge\/(\d+)/.exec(navigator.userAgent); const l=/MSIE \d/.test(navigator.userAgent); const c=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent); s.mac=/Mac/.test(navigator.platform); const u=s.ie=!!(l||c||a); s.ie_version=l?document.documentMode||6:c?+c[1]:a?+a[1]:null, s.gecko=!u&&/gecko\/(\d+)/i.test(navigator.userAgent), s.gecko_version=s.gecko&&+(/Firefox\/(\d+)/.exec(navigator.userAgent)||[0, 0])[1]; const d=!u&&/Chrome\/(\d+)/.exec(navigator.userAgent); s.chrome=!!d, s.chrome_version=d&&+d[1], s.ios=!u&&/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent), s.android=/Android \d/.test(navigator.userAgent), s.webkit='webkitFontSmoothing'in document.documentElement.style, s.safari=/Apple Computer/.test(navigator.vendor), s.webkit_version=s.webkit&&+(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent)||[0, 0])[1];
    } const h=function(e) {
      for (let t=0; ;t++) if (!(e=e.previousSibling)) return t;
    }; const p=function(e) {
      const t=e.parentNode; return t&&11==t.nodeType?t.host:t;
    }; let f=null; const m=function(e, t, n) {
      const r=f||(f=document.createRange()); return r.setEnd(e, null==n?e.nodeValue.length:n), r.setStart(e, t||0), r;
    }; const g=function(e, t, n, r) {
      return n&&(y(e, t, n, r, -1)||y(e, t, n, r, 1));
    }; const v=/^(img|br|input|textarea|hr)$/i; function y(e, t, n, r, i) {
      for (;;) {
        if (e==n&&t==r) return !0; if (t==(i<0?0:b(e))) {
          const o=e.parentNode; if (1!=o.nodeType||w(e)||v.test(e.nodeName)||'false'==e.contentEditable) return !1; t=h(e)+(i<0?0:1), e=o;
        } else {
          if (1!=e.nodeType) return !1; if ('false'==(e=e.childNodes[t+(i<0?-1:0)]).contentEditable) return !1; t=i<0?b(e):0;
        }
      }
    } function b(e) {
      return 3==e.nodeType?e.nodeValue.length:e.childNodes.length;
    } function w(e) {
      for (var t, n=e; n&&!(t=n.pmViewDesc); n=n.parentNode);return t&&t.node&&t.node.isBlock&&(t.dom==e||t.contentDOM==e);
    } const x=function(e) {
      let t=e.isCollapsed; return t&&s.chrome&&e.rangeCount&&!e.getRangeAt(0).collapsed&&(t=!1), t;
    }; function k(e, t) {
      const n=document.createEvent('Event'); return n.initEvent('keydown', !0, !0), n.keyCode=e, n.key=n.code=t, n;
    } function _(e) {
      return {left: 0, right: e.documentElement.clientWidth, top: 0, bottom: e.documentElement.clientHeight};
    } function S(e, t) {
      return 'number'==typeof e?e:e[t];
    } function C(e) {
      const t=e.getBoundingClientRect(); return {left: t.left, right: t.left+e.clientWidth, top: t.top, bottom: t.top+e.clientHeight};
    } function M(e, t, n) {
      for (let r=e.someProp('scrollThreshold')||0, i=e.someProp('scrollMargin')||5, o=e.dom.ownerDocument, s=n||e.dom; s; s=p(s)) {
        if (1==s.nodeType) {
          const a=s==o.body||1!=s.nodeType; const l=a?_(o):C(s); let c=0; let u=0; if (t.top<l.top+S(r, 'top')?u=-(l.top-t.top+S(i, 'top')):t.bottom>l.bottom-S(r, 'bottom')&&(u=t.bottom-l.bottom+S(i, 'bottom')), t.left<l.left+S(r, 'left')?c=-(l.left-t.left+S(i, 'left')):t.right>l.right-S(r, 'right')&&(c=t.right-l.right+S(i, 'right')), c||u) {
            if (a)o.defaultView.scrollBy(c, u); else {
              const d=s.scrollLeft; const h=s.scrollTop; u&&(s.scrollTop+=u), c&&(s.scrollLeft+=c); const f=s.scrollLeft-d; const m=s.scrollTop-h; t={left: t.left-f, top: t.top-m, right: t.right-f, bottom: t.bottom-m};
            }
          } if (a) break;
        }
      }
    } function T(e) {
      for (var t=[], n=e.ownerDocument; e&&(t.push({dom: e, top: e.scrollTop, left: e.scrollLeft}), e!=n); e=p(e));return t;
    } function O(e, t) {
      for (let n=0; n<e.length; n++) {
        const r=e[n]; const i=r.dom; const o=r.top; const s=r.left; i.scrollTop!=o+t&&(i.scrollTop=o+t), i.scrollLeft!=s&&(i.scrollLeft=s);
      }
    } let D=null; function E(e, t) {
      for (var n, r, i=2e8, o=0, s=t.top, a=t.top, l=e.firstChild, c=0; l; l=l.nextSibling, c++) {
        let u=void 0; if (1==l.nodeType)u=l.getClientRects(); else {
          if (3!=l.nodeType) continue; u=m(l).getClientRects();
        } for (let d=0; d<u.length; d++) {
          const h=u[d]; if (h.top<=s&&h.bottom>=a) {
            s=Math.max(h.bottom, s), a=Math.min(h.top, a); const p=h.left>t.left?h.left-t.left:h.right<t.left?t.left-h.right:0; if (p<i) {
              n=l, i=p, r=p&&3==n.nodeType?{left: h.right<t.left?h.right:h.left, top: t.top}:t, 1==l.nodeType&&p&&(o=c+(t.left>=(h.left+h.right)/2?1:0)); continue;
            }
          }!n&&(t.left>=h.right&&t.top>=h.top||t.left>=h.left&&t.top>=h.bottom)&&(o=c+1);
        }
      } return n&&3==n.nodeType?function(e, t) {
        for (let n=e.nodeValue.length, r=document.createRange(), i=0; i<n; i++) {
          r.setEnd(e, i+1), r.setStart(e, i); const o=z(r, 1); if (o.top!=o.bottom&&N(t, o)) return {node: e, offset: i+(t.left>=(o.left+o.right)/2?1:0)};
        } return {node: e, offset: 0};
      }(n, r):!n||i&&1==n.nodeType?{node: e, offset: o}:E(n, r);
    } function N(e, t) {
      return e.left>=t.left-1&&e.left<=t.right+1&&e.top>=t.top-1&&e.top<=t.bottom+1;
    } function A(e, t, n) {
      const r=e.childNodes.length; if (r&&n.top<n.bottom) {
        for (let i=Math.max(0, Math.min(r-1, Math.floor(r*(t.top-n.top)/(n.bottom-n.top))-2)), o=i; ;) {
          const s=e.childNodes[o]; if (1==s.nodeType) {
            for (let a=s.getClientRects(), l=0; l<a.length; l++) {
              const c=a[l]; if (N(t, c)) return A(s, t, c);
            }
          } if ((o=(o+1)%r)==i) break;
        }
      } return e;
    } function L(e, t) {
      let n; let r; let i; let o; const a=e.root; if (a.caretPositionFromPoint) {
        try {
          const l=a.caretPositionFromPoint(t.left, t.top); l&&(i=(n=l).offsetNode, o=n.offset);
        } catch (e) {}
      } if (!i&&a.caretRangeFromPoint) {
        const c=a.caretRangeFromPoint(t.left, t.top); c&&(i=(r=c).startContainer, o=r.startOffset);
      } let u; let d=a.elementFromPoint(t.left, t.top+1); if (!d||!e.dom.contains(1!=d.nodeType?d.parentNode:d)) {
        const h=e.dom.getBoundingClientRect(); if (!N(t, h)) return null; if (!(d=A(e.dom, t, h))) return null;
      } if (s.safari&&d.draggable&&(i=o=null), d=function(e, t) {
        const n=e.parentNode; return n&&/^li$/i.test(n.nodeName)&&t.left<e.getBoundingClientRect().left?n:e;
      }(d, t), i) {
        if (s.gecko&&1==i.nodeType&&(o=Math.min(o, i.childNodes.length))<i.childNodes.length) {
          let p; const f=i.childNodes[o]; 'IMG'==f.nodeName&&(p=f.getBoundingClientRect()).right<=t.left&&p.bottom>t.top&&o++;
        }i==e.dom&&o==i.childNodes.length-1&&1==i.lastChild.nodeType&&t.top>i.lastChild.getBoundingClientRect().bottom?u=e.state.doc.content.size:0!=o&&1==i.nodeType&&'BR'==i.childNodes[o-1].nodeName||(u=function(e, t, n, r) {
          for (var i=-1, o=t; o!=e.dom;) {
            const s=e.docView.nearestDesc(o, !0); if (!s) return null; if (s.node.isBlock&&s.parent) {
              const a=s.dom.getBoundingClientRect(); if (a.left>r.left||a.top>r.top)i=s.posBefore; else {
                if (!(a.right<r.left||a.bottom<r.top)) break; i=s.posAfter;
              }
            }o=s.dom.parentNode;
          } return i>-1?i:e.docView.posFromDOM(t, n);
        }(e, i, o, t));
      }null==u&&(u=function(e, t, n) {
        const r=E(t, n); const i=r.node; const o=r.offset; let s=-1; if (1==i.nodeType&&!i.firstChild) {
          const a=i.getBoundingClientRect(); s=a.left!=a.right&&n.left>(a.left+a.right)/2?1:-1;
        } return e.docView.posFromDOM(i, o, s);
      }(e, d, t)); const m=e.docView.nearestDesc(d, !0); return {pos: u, inside: m?m.posAtStart-m.border:-1};
    } function z(e, t) {
      const n=e.getClientRects(); return n.length?n[t<0?0:n.length-1]:e.getBoundingClientRect();
    } const I=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/; function q(e, t, n) {
      const r=e.docView.domFromPos(t); let i=r.node; let o=r.offset; const a=e.state.doc.resolve(t); const l=a.parent.inlineContent; const c=s.webkit||s.gecko; if (3==i.nodeType&&c&&I.test(i.nodeValue)) {
        const u=z(m(i, o, o), n); if (s.gecko&&o&&/\s/.test(i.nodeValue[o-1])&&o<i.nodeValue.length) {
          const d=z(m(i, o-1, o-1), -1); if (d.top==u.top) {
            const p=z(m(i, o, o+1), -1); if (p.top!=u.top) return F(p, p.left<d.left);
          }
        } return u;
      } if (l) {
        for (var f=a.depth?e.docView.domAfterPos(a.before()):e.dom; n<0&&!o&&i!=f;)o=h(i), i=i.parentNode; for (;n>=0&&o==b(i)&&i!=f;)o=h(i)+1, i=i.parentNode;
      } if (3==i.nodeType) return n<0?F(z(m(i, o-1, o), 1), !1):F(z(m(i, o, o+1), -1), !0); if (!l) {
        if (o&&(n<0||o==b(i))) {
          const g=i.childNodes[o-1]; if (1==g.nodeType) return P(g.getBoundingClientRect(), !1);
        } if (o<b(i)) {
          const v=i.childNodes[o]; if (1==v.nodeType) return P(v.getBoundingClientRect(), !0);
        } return P(i.getBoundingClientRect(), n>=0);
      } if (o&&(n<0||o==b(i))) {
        const y=i.childNodes[o-1]; const w=3==y.nodeType?m(y, b(y)-(c?0:1)):1==y.nodeType&&'BR'!=y.nodeName?y:null; if (w) return F(z(w, 1), !1);
      } if (o<b(i)) {
        const x=i.childNodes[o]; const k=3==x.nodeType?m(x, 0, c?0:1):1==x.nodeType?x:null; if (k) return F(z(k, -1), !0);
      } return F(z(3==i.nodeType?m(i):i, -n), n>=0);
    } function F(e, t) {
      if (0==e.width) return e; const n=t?e.left:e.right; return {top: e.top, bottom: e.bottom, left: n, right: n};
    } function P(e, t) {
      if (0==e.height) return e; const n=t?e.top:e.bottom; return {top: n, bottom: n, left: e.left, right: e.right};
    } function R(e, t, n) {
      const r=e.state; const i=e.root.activeElement; r!=t&&e.updateState(t), i!=e.dom&&e.focus(); try {
        return n();
      } finally {
        r!=t&&e.updateState(r), i!=e.dom&&i&&i.focus();
      }
    } const B=/[\u0590-\u08ac]/; let j=null; let W=null; let H=!1; const V=function(e, t, n, r) {
      this.parent=e, this.children=t, this.dom=n, n.pmViewDesc=this, this.contentDOM=r, this.dirty=0;
    }; const $={beforePosition: {configurable: !0}, size: {configurable: !0}, border: {configurable: !0}, posBefore: {configurable: !0}, posAtStart: {configurable: !0}, posAfter: {configurable: !0}, posAtEnd: {configurable: !0}, contentLost: {configurable: !0}}; V.prototype.matchesWidget=function() {
      return !1;
    }, V.prototype.matchesMark=function() {
      return !1;
    }, V.prototype.matchesNode=function() {
      return !1;
    }, V.prototype.matchesHack=function() {
      return !1;
    }, $.beforePosition.get=function() {
      return !1;
    }, V.prototype.parseRule=function() {
      return null;
    }, V.prototype.stopEvent=function() {
      return !1;
    }, $.size.get=function() {
      for (var e=0, t=0; t<this.children.length; t++)e+=this.children[t].size; return e;
    }, $.border.get=function() {
      return 0;
    }, V.prototype.destroy=function() {
      this.parent=null, this.dom.pmViewDesc==this&&(this.dom.pmViewDesc=null); for (let e=0; e<this.children.length; e++) this.children[e].destroy();
    }, V.prototype.posBeforeChild=function(e) {
      for (let t=0, n=this.posAtStart; t<this.children.length; t++) {
        const r=this.children[t]; if (r==e) return n; n+=r.size;
      }
    }, $.posBefore.get=function() {
      return this.parent.posBeforeChild(this);
    }, $.posAtStart.get=function() {
      return this.parent?this.parent.posBeforeChild(this)+this.border:0;
    }, $.posAfter.get=function() {
      return this.posBefore+this.size;
    }, $.posAtEnd.get=function() {
      return this.posAtStart+this.size-2*this.border;
    }, V.prototype.localPosFromDOM=function(e, t, n) {
      if (this.contentDOM&&this.contentDOM.contains(1==e.nodeType?e:e.parentNode)) {
        if (n<0) {
          let r; let i; if (e==this.contentDOM)r=e.childNodes[t-1]; else {
            for (;e.parentNode!=this.contentDOM;)e=e.parentNode; r=e.previousSibling;
          } for (;r&&(!(i=r.pmViewDesc)||i.parent!=this);)r=r.previousSibling; return r?this.posBeforeChild(i)+i.size:this.posAtStart;
        } let o; let s; if (e==this.contentDOM)o=e.childNodes[t]; else {
          for (;e.parentNode!=this.contentDOM;)e=e.parentNode; o=e.nextSibling;
        } for (;o&&(!(s=o.pmViewDesc)||s.parent!=this);)o=o.nextSibling; return o?this.posBeforeChild(s):this.posAtEnd;
      } let a; if (this.contentDOM&&this.contentDOM!=this.dom&&this.dom.contains(this.contentDOM))a=2&e.compareDocumentPosition(this.contentDOM); else if (this.dom.firstChild) {
        if (0==t) {
          for (let l=e; ;l=l.parentNode) {
            if (l==this.dom) {
              a=!1; break;
            } if (l.parentNode.firstChild!=l) break;
          }
        } if (null==a&&t==e.childNodes.length) {
          for (let c=e; ;c=c.parentNode) {
            if (c==this.dom) {
              a=!0; break;
            } if (c.parentNode.lastChild!=c) break;
          }
        }
      } return (null==a?n>0:a)?this.posAtEnd:this.posAtStart;
    }, V.prototype.nearestDesc=function(e, t) {
      for (let n=!0, r=e; r; r=r.parentNode) {
        const i=this.getDesc(r); if (i&&(!t||i.node)) {
          if (!n||!i.nodeDOM||(1==i.nodeDOM.nodeType?i.nodeDOM.contains(1==e.nodeType?e:e.parentNode):i.nodeDOM==e)) return i; n=!1;
        }
      }
    }, V.prototype.getDesc=function(e) {
      for (let t=e.pmViewDesc, n=t; n; n=n.parent) if (n==this) return t;
    }, V.prototype.posFromDOM=function(e, t, n) {
      for (let r=e; r; r=r.parentNode) {
        const i=this.getDesc(r); if (i) return i.localPosFromDOM(e, t, n);
      } return -1;
    }, V.prototype.descAt=function(e) {
      for (let t=0, n=0; t<this.children.length; t++) {
        let r=this.children[t]; const i=n+r.size; if (n==e&&i!=n) {
          for (;!r.border&&r.children.length;)r=r.children[0]; return r;
        } if (e<i) return r.descAt(e-n-r.border); n=i;
      }
    }, V.prototype.domFromPos=function(e) {
      if (!this.contentDOM) return {node: this.dom, offset: 0}; for (let t=0, n=0; ;n++) {
        if (t==e) {
          for (;n<this.children.length&&(this.children[n].beforePosition||this.children[n].dom.parentNode!=this.contentDOM);)n++; return {node: this.contentDOM, offset: n==this.children.length?this.contentDOM.childNodes.length:h(this.children[n].dom)};
        } if (n==this.children.length) throw new Error('Invalid position '+e); const r=this.children[n]; const i=t+r.size; if (e<i) return r.domFromPos(e-t-r.border); t=i;
      }
    }, V.prototype.parseRange=function(e, t, n) {
      if (void 0===n&&(n=0), 0==this.children.length) return {node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length}; for (var r=-1, i=-1, o=n, s=0; ;s++) {
        const a=this.children[s]; const l=o+a.size; if (-1==r&&e<=l) {
          const c=o+a.border; if (e>=c&&t<=l-a.border&&a.node&&a.contentDOM&&this.contentDOM.contains(a.contentDOM)) return a.parseRange(e, t, c); e=o; for (let u=s; u>0; u--) {
            const d=this.children[u-1]; if (d.size&&d.dom.parentNode==this.contentDOM&&!d.emptyChildAt(1)) {
              r=h(d.dom)+1; break;
            }e-=d.size;
          }-1==r&&(r=0);
        } if (r>-1&&(l>t||s==this.children.length-1)) {
          t=l; for (let p=s+1; p<this.children.length; p++) {
            const f=this.children[p]; if (f.size&&f.dom.parentNode==this.contentDOM&&!f.emptyChildAt(-1)) {
              i=h(f.dom); break;
            }t+=f.size;
          }-1==i&&(i=this.contentDOM.childNodes.length); break;
        }o=l;
      } return {node: this.contentDOM, from: e, to: t, fromOffset: r, toOffset: i};
    }, V.prototype.emptyChildAt=function(e) {
      if (this.border||!this.contentDOM||!this.children.length) return !1; const t=this.children[e<0?0:this.children.length-1]; return 0==t.size||t.emptyChildAt(e);
    }, V.prototype.domAfterPos=function(e) {
      const t=this.domFromPos(e); const n=t.node; const r=t.offset; if (1!=n.nodeType||r==n.childNodes.length) throw new RangeError('No node after pos '+e); return n.childNodes[r];
    }, V.prototype.setSelection=function(e, t, n, r) {
      for (let i=Math.min(e, t), o=Math.max(e, t), a=0, l=0; a<this.children.length; a++) {
        const c=this.children[a]; const u=l+c.size; if (i>l&&o<u) return c.setSelection(e-l-c.border, t-l-c.border, n, r); l=u;
      } let d=this.domFromPos(e); let h=this.domFromPos(t); const p=n.getSelection(); let f=!1; if ((s.gecko||s.safari)&&e==t) {
        if (3==d.node.nodeType)f=d.offset&&'\n'==d.node.nodeValue[d.offset-1]; else {
          const m=d.node.childNodes[d.offset-1]; f=m&&('BR'==m.nodeName||'false'==m.contentEditable);
        }
      } if (r||f&&s.safari||!g(d.node, d.offset, p.anchorNode, p.anchorOffset)||!g(h.node, h.offset, p.focusNode, p.focusOffset)) {
        let v=!1; if ((p.extend||e==t)&&!f) {
          p.collapse(d.node, d.offset); try {
            e!=t&&p.extend(h.node, h.offset), v=!0;
          } catch (e) {
            if (!(e instanceof DOMException)) throw e;
          }
        } if (!v) {
          if (e>t) {
            const y=d; d=h, h=y;
          } const b=document.createRange(); b.setEnd(h.node, h.offset), b.setStart(d.node, d.offset), p.removeAllRanges(), p.addRange(b);
        }
      }
    }, V.prototype.ignoreMutation=function(e) {
      return !this.contentDOM&&'selection'!=e.type;
    }, $.contentLost.get=function() {
      return this.contentDOM&&this.contentDOM!=this.dom&&!this.dom.contains(this.contentDOM);
    }, V.prototype.markDirty=function(e, t) {
      for (let n=0, r=0; r<this.children.length; r++) {
        const i=this.children[r]; const o=n+i.size; if (n==o?e<=o&&t>=n:e<o&&t>n) {
          const s=n+i.border; const a=o-i.border; if (e>=s&&t<=a) return this.dirty=e==n||t==o?2:1, void(e!=s||t!=a||!i.contentLost&&i.dom.parentNode==this.contentDOM?i.markDirty(e-s, t-s):i.dirty=3); i.dirty=3;
        }n=o;
      } this.dirty=2;
    }, V.prototype.markParentsDirty=function() {
      for (let e=1, t=this.parent; t; t=t.parent, e++) {
        const n=1==e?2:1; t.dirty<n&&(t.dirty=n);
      }
    }, Object.defineProperties(V.prototype, $); const U=[]; const K=function(e) {
      function t(t, n, r, i) {
        let o; let s=n.type.toDOM; if ('function'==typeof s&&(s=s(r, (function() {
          return o?o.parent?o.parent.posBeforeChild(o):void 0:i;
        }))), !n.type.spec.raw) {
          if (1!=s.nodeType) {
            const a=document.createElement('span'); a.appendChild(s), s=a;
          }s.contentEditable=!1, s.classList.add('ProseMirror-widget');
        }e.call(this, t, U, s, null), this.widget=n, o=this;
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={beforePosition: {configurable: !0}}; return n.beforePosition.get=function() {
        return this.widget.type.side<0;
      }, t.prototype.matchesWidget=function(e) {
        return 0==this.dirty&&e.type.eq(this.widget.type);
      }, t.prototype.parseRule=function() {
        return {ignore: !0};
      }, t.prototype.stopEvent=function(e) {
        const t=this.widget.spec.stopEvent; return !!t&&t(e);
      }, t.prototype.ignoreMutation=function(e) {
        return 'selection'!=e.type||this.widget.spec.ignoreSelection;
      }, Object.defineProperties(t.prototype, n), t;
    }(V); const J=function(e) {
      function t(t, n, r, i) {
        e.call(this, t, U, n, null), this.textDOM=r, this.text=i;
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={size: {configurable: !0}}; return n.size.get=function() {
        return this.text.length;
      }, t.prototype.localPosFromDOM=function(e, t) {
        return e!=this.textDOM?this.posAtStart+(t?this.size:0):this.posAtStart+t;
      }, t.prototype.domFromPos=function(e) {
        return {node: this.textDOM, offset: e};
      }, t.prototype.ignoreMutation=function(e) {
        return 'characterData'===e.type&&e.target.nodeValue==e.oldValue;
      }, Object.defineProperties(t.prototype, n), t;
    }(V); const Y=function(e) {
      function t(t, n, r, i) {
        e.call(this, t, [], r, i), this.mark=n;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.create=function(e, n, r, o) {
        const s=o.nodeViews[n.type.name]; let a=s&&s(n, o, r); return a&&a.dom||(a=i.PW.renderSpec(document, n.type.spec.toDOM(n, r))), new t(e, n, a.dom, a.contentDOM||a.dom);
      }, t.prototype.parseRule=function() {
        return {mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM};
      }, t.prototype.matchesMark=function(e) {
        return 3!=this.dirty&&this.mark.eq(e);
      }, t.prototype.markDirty=function(t, n) {
        if (e.prototype.markDirty.call(this, t, n), 0!=this.dirty) {
          for (var r=this.parent; !r.node;)r=r.parent; r.dirty<this.dirty&&(r.dirty=this.dirty), this.dirty=0;
        }
      }, t.prototype.slice=function(e, n, r) {
        const i=t.create(this.parent, this.mark, !0, r); let o=this.children; const s=this.size; n<s&&(o=he(o, n, s, r)), e>0&&(o=he(o, 0, e, r)); for (let a=0; a<o.length; a++)o[a].parent=i; return i.children=o, i;
      }, t;
    }(V); const G=function(e) {
      function t(t, n, r, i, o, s, a, l, c) {
        e.call(this, t, n.isLeaf?U:[], o, s), this.nodeDOM=a, this.node=n, this.outerDeco=r, this.innerDeco=i, s&&this.updateChildren(l, c);
      }e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t; const n={size: {configurable: !0}, border: {configurable: !0}}; return t.create=function(e, n, r, o, s, a) {
        let l; let c; const u=s.nodeViews[n.type.name]; const d=u&&u(n, s, (function() {
          return c?c.parent?c.parent.posBeforeChild(c):void 0:a;
        }), r); let h=d&&d.dom; let p=d&&d.contentDOM; if (n.isText) {
          if (h) {
            if (3!=h.nodeType) throw new RangeError('Text must be rendered as a DOM text node');
          } else h=document.createTextNode(n.text);
        } else h||(h=(l=i.PW.renderSpec(document, n.type.spec.toDOM(n))).dom, p=l.contentDOM); p||n.isText||'BR'==h.nodeName||(h.hasAttribute('contenteditable')||(h.contentEditable=!1), n.type.spec.draggable&&(h.draggable=!0)); const f=h; return h=ae(h, r, n), d?c=new ee(e, n, r, o, h, p, f, d, s, a+1):n.isText?new Z(e, n, r, o, h, f, s):new t(e, n, r, o, h, p, f, s, a+1);
      }, t.prototype.parseRule=function() {
        const e=this; if (this.node.type.spec.reparseInView) return null; const t={node: this.node.type.name, attrs: this.node.attrs}; return this.node.type.spec.code&&(t.preserveWhitespace='full'), this.contentDOM&&!this.contentLost?t.contentElement=this.contentDOM:t.getContent=function() {
          return e.contentDOM?i.HY.empty:e.node.content;
        }, t;
      }, t.prototype.matchesNode=function(e, t, n) {
        return 0==this.dirty&&e.eq(this.node)&&le(t, this.outerDeco)&&n.eq(this.innerDeco);
      }, n.size.get=function() {
        return this.node.nodeSize;
      }, n.border.get=function() {
        return this.node.isLeaf?0:1;
      }, t.prototype.updateChildren=function(e, t) {
        const n=this; const r=this.node.inlineContent; let o=t; const a=r&&e.composing&&this.localCompositionNode(e, t); const l=new ue(this, a&&a.node); !function(e, t, n, r) {
          const i=t.locals(e); let o=0; if (0!=i.length) {
            for (let s=0, a=[], l=null, c=0; ;) {
              if (s<i.length&&i[s].to==o) {
                for (var u=i[s++], d=void 0; s<i.length&&i[s].to==o;)(d||(d=[u])).push(i[s++]); if (d) {
                  d.sort(de); for (let h=0; h<d.length; h++)n(d[h], c, !!l);
                } else n(u, c, !!l);
              } let p=void 0; let f=void 0; if (l)f=-1, p=l, l=null; else {
                if (!(c<e.childCount)) break; f=c, p=e.child(c++);
              } for (let m=0; m<a.length; m++)a[m].to<=o&&a.splice(m--, 1); for (;s<i.length&&i[s].from<=o&&i[s].to>o;)a.push(i[s++]); let g=o+p.nodeSize; if (p.isText) {
                let v=g; s<i.length&&i[s].from<v&&(v=i[s].from); for (let y=0; y<a.length; y++)a[y].to<v&&(v=a[y].to); v<g&&(l=p.cut(v-o), p=p.cut(0, v-o), g=v, f=-1);
              }r(p, a.length?p.isInline&&!p.isLeaf?a.filter((function(e) {
                return !e.inline;
              })):a.slice():U, t.forChild(o, p), f), o=g;
            }
          } else {
            for (let b=0; b<e.childCount; b++) {
              const w=e.child(b); r(w, i, t.forChild(o, w), b), o+=w.nodeSize;
            }
          }
        }(this.node, this.innerDeco, (function(t, s, a) {
t.spec.marks?l.syncToMarks(t.spec.marks, r, e):t.type.side>=0&&!a&&l.syncToMarks(s==n.node.childCount?i.vc.none:n.node.child(s).marks, r, e), l.placeWidget(t, e, o);
        }), (function(t, n, i, s) {
          l.syncToMarks(t.marks, r, e), l.findNodeMatch(t, n, i, s)||l.updateNextNode(t, n, i, e, s)||l.addNode(t, n, i, e, o), o+=t.nodeSize;
        })), l.syncToMarks(U, r, e), this.node.isTextblock&&l.addTextblockHacks(), l.destroyRest(), (l.changed||2==this.dirty)&&(a&&this.protectLocalComposition(e, a), te(this.contentDOM, this.children, e), s.ios&&function(e) {
          if ('UL'==e.nodeName||'OL'==e.nodeName) {
            const t=e.style.cssText; e.style.cssText=t+'; list-style: square !important', window.getComputedStyle(e).listStyle, e.style.cssText=t;
          }
        }(this.dom));
      }, t.prototype.localCompositionNode=function(e, t) {
        const n=e.state.selection; const i=n.from; const o=n.to; if (!(!(e.state.selection instanceof r.Bs)||i<t||o>t+this.node.content.size)) {
          const s=e.root.getSelection(); const a=function(e, t) {
            for (;;) {
              if (3==e.nodeType) return e; if (1==e.nodeType&&t>0) {
                if (e.childNodes.length>t&&3==e.childNodes[t].nodeType) return e.childNodes[t]; t=b(e=e.childNodes[t-1]);
              } else {
                if (!(1==e.nodeType&&t<e.childNodes.length)) return null; e=e.childNodes[t], t=0;
              }
            }
          }(s.focusNode, s.focusOffset); if (a&&this.dom.contains(a.parentNode)) {
            const l=a.nodeValue; const c=function(e, t, n, r) {
              for (let i=0, o=0; i<e.childCount&&o<=r;) {
                const s=e.child(i++); const a=o; if (o+=s.nodeSize, s.isText) {
                  for (var l=s.text; i<e.childCount;) {
                    const c=e.child(i++); if (o+=c.nodeSize, !c.isText) break; l+=c.text;
                  } if (o>=n) {
                    const u=l.lastIndexOf(t, r-a); if (u>=0&&u+t.length+a>=n) return a+u;
                  }
                }
              } return -1;
            }(this.node.content, l, i-t, o-t); return c<0?null:{node: a, pos: c, text: l};
          }
        }
      }, t.prototype.protectLocalComposition=function(e, t) {
        const n=t.node; const r=t.pos; const i=t.text; if (!this.getDesc(n)) {
          for (var o=n; o.parentNode!=this.contentDOM; o=o.parentNode) {
            for (;o.previousSibling;)o.parentNode.removeChild(o.previousSibling); for (;o.nextSibling;)o.parentNode.removeChild(o.nextSibling); o.pmViewDesc&&(o.pmViewDesc=null);
          } const s=new J(this, o, n, i); e.compositionNodes.push(s), this.children=he(this.children, r, r+i.length, e, s);
        }
      }, t.prototype.update=function(e, t, n, r) {
        return !(3==this.dirty||!e.sameMarkup(this.node)||(this.updateInner(e, t, n, r), 0));
      }, t.prototype.updateInner=function(e, t, n, r) {
        this.updateOuterDeco(t), this.node=e, this.innerDeco=n, this.contentDOM&&this.updateChildren(r, this.posAtStart), this.dirty=0;
      }, t.prototype.updateOuterDeco=function(e) {
        if (!le(e, this.outerDeco)) {
          const t=1!=this.nodeDOM.nodeType; const n=this.dom; this.dom=oe(this.dom, this.nodeDOM, ie(this.outerDeco, this.node, t), ie(e, this.node, t)), this.dom!=n&&(n.pmViewDesc=null, this.dom.pmViewDesc=this), this.outerDeco=e;
        }
      }, t.prototype.selectNode=function() {
        this.nodeDOM.classList.add('ProseMirror-selectednode'), !this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!0);
      }, t.prototype.deselectNode=function() {
        this.nodeDOM.classList.remove('ProseMirror-selectednode'), !this.contentDOM&&this.node.type.spec.draggable||this.dom.removeAttribute('draggable');
      }, Object.defineProperties(t.prototype, n), t;
    }(V); function X(e, t, n, r, i) {
      return ae(r, t, e), new G(null, e, t, n, r, r, r, i, 0);
    } var Z=function(e) {
      function t(t, n, r, i, o, s, a) {
        e.call(this, t, n, r, i, o, null, s, a);
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.parseRule=function() {
        for (var e=this.nodeDOM.parentNode; e&&e!=this.dom&&!e.pmIsDeco;)e=e.parentNode; return {skip: e||!0};
      }, t.prototype.update=function(e, t, n, r) {
        return !(3==this.dirty||0!=this.dirty&&!this.inParent()||!e.sameMarkup(this.node)||(this.updateOuterDeco(t), 0==this.dirty&&e.text==this.node.text||e.text==this.nodeDOM.nodeValue||(this.nodeDOM.nodeValue=e.text, r.trackWrites==this.nodeDOM&&(r.trackWrites=null)), this.node=e, this.dirty=0, 0));
      }, t.prototype.inParent=function() {
        for (let e=this.parent.contentDOM, t=this.nodeDOM; t; t=t.parentNode) if (t==e) return !0; return !1;
      }, t.prototype.domFromPos=function(e) {
        return {node: this.nodeDOM, offset: e};
      }, t.prototype.localPosFromDOM=function(t, n, r) {
        return t==this.nodeDOM?this.posAtStart+Math.min(n, this.node.text.length):e.prototype.localPosFromDOM.call(this, t, n, r);
      }, t.prototype.ignoreMutation=function(e) {
        return 'characterData'!=e.type&&'selection'!=e.type;
      }, t.prototype.slice=function(e, n, r) {
        const i=this.node.cut(e, n); const o=document.createTextNode(i.text); return new t(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
      }, t;
    }(G); const Q=function(e) {
      function t() {
        e.apply(this, arguments);
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.parseRule=function() {
        return {ignore: !0};
      }, t.prototype.matchesHack=function() {
        return 0==this.dirty;
      }, t;
    }(V); var ee=function(e) {
      function t(t, n, r, i, o, s, a, l, c, u) {
        e.call(this, t, n, r, i, o, s, a, c, u), this.spec=l;
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.update=function(t, n, r, i) {
        if (3==this.dirty) return !1; if (this.spec.update) {
          const o=this.spec.update(t, n); return o&&this.updateInner(t, n, r, i), o;
        } return !(!this.contentDOM&&!t.isLeaf)&&e.prototype.update.call(this, t, n, r, i);
      }, t.prototype.selectNode=function() {
this.spec.selectNode?this.spec.selectNode():e.prototype.selectNode.call(this);
      }, t.prototype.deselectNode=function() {
this.spec.deselectNode?this.spec.deselectNode():e.prototype.deselectNode.call(this);
      }, t.prototype.setSelection=function(t, n, r, i) {
this.spec.setSelection?this.spec.setSelection(t, n, r):e.prototype.setSelection.call(this, t, n, r, i);
      }, t.prototype.destroy=function() {
        this.spec.destroy&&this.spec.destroy(), e.prototype.destroy.call(this);
      }, t.prototype.stopEvent=function(e) {
        return !!this.spec.stopEvent&&this.spec.stopEvent(e);
      }, t.prototype.ignoreMutation=function(t) {
        return this.spec.ignoreMutation?this.spec.ignoreMutation(t):e.prototype.ignoreMutation.call(this, t);
      }, t;
    }(G); function te(e, t, n) {
      for (var r=e.firstChild, i=!1, o=0; o<t.length; o++) {
        const s=t[o]; const a=s.dom; if (a.parentNode==e) {
          for (;a!=r;)r=ce(r), i=!0; r=r.nextSibling;
        } else i=!0, e.insertBefore(a, r); if (s instanceof Y) {
          const l=r?r.previousSibling:e.lastChild; te(s.contentDOM, s.children, n), r=l?l.nextSibling:e.firstChild;
        }
      } for (;r;)r=ce(r), i=!0; i&&n.trackWrites==e&&(n.trackWrites=null);
    } function ne(e) {
      e&&(this.nodeName=e);
    }ne.prototype=Object.create(null); const re=[new ne]; function ie(e, t, n) {
      if (0==e.length) return re; for (var r=n?re[0]:new ne, i=[r], o=0; o<e.length; o++) {
        const s=e[o].type.attrs; if (s) {
          for (const a in s.nodeName&&i.push(r=new ne(s.nodeName)), s) {
            const l=s[a]; null!=l&&(n&&1==i.length&&i.push(r=new ne(t.isInline?'span':'div')), 'class'==a?r.class=(r.class?r.class+' ':'')+l:'style'==a?r.style=(r.style?r.style+';':'')+l:'nodeName'!=a&&(r[a]=l));
          }
        }
      } return i;
    } function oe(e, t, n, r) {
      if (n==re&&r==re) return t; for (var i=t, o=0; o<r.length; o++) {
        const s=r[o]; let a=n[o]; if (o) {
          let l=void 0; a&&a.nodeName==s.nodeName&&i!=e&&(l=i.parentNode)&&l.tagName.toLowerCase()==s.nodeName||((l=document.createElement(s.nodeName)).pmIsDeco=!0, l.appendChild(i), a=re[0]), i=l;
        }se(i, a||re[0], s);
      } return i;
    } function se(e, t, n) {
      for (const r in t)'class'==r||'style'==r||'nodeName'==r||r in n||e.removeAttribute(r); for (const i in n)'class'!=i&&'style'!=i&&'nodeName'!=i&&n[i]!=t[i]&&e.setAttribute(i, n[i]); if (t.class!=n.class) {
        for (var o=t.class?t.class.split(' '):U, s=n.class?n.class.split(' '):U, a=0; a<o.length; a++)-1==s.indexOf(o[a])&&e.classList.remove(o[a]); for (let l=0; l<s.length; l++)-1==o.indexOf(s[l])&&e.classList.add(s[l]);
      } if (t.style!=n.style) {
        if (t.style) for (var c, u=/\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g; c=u.exec(t.style);)e.style.removeProperty(c[1]); n.style&&(e.style.cssText+=n.style);
      }
    } function ae(e, t, n) {
      return oe(e, e, re, ie(t, n, 1!=e.nodeType));
    } function le(e, t) {
      if (e.length!=t.length) return !1; for (let n=0; n<e.length; n++) if (!e[n].type.eq(t[n].type)) return !1; return !0;
    } function ce(e) {
      const t=e.nextSibling; return e.parentNode.removeChild(e), t;
    } var ue=function(e, t) {
      this.top=e, this.lock=t, this.index=0, this.stack=[], this.changed=!1; const n=function(e, t) {
        for (var n=[], r=e.childCount, i=t.length-1; r>0&&i>=0; i--) {
          const o=t[i]; const s=o.node; if (s) {
            if (s!=e.child(r-1)) break; n.push(o), --r;
          }
        } return {nodes: n.reverse(), offset: r};
      }(e.node.content, e.children); this.preMatched=n.nodes, this.preMatchOffset=n.offset;
    }; function de(e, t) {
      return e.type.side-t.type.side;
    } function he(e, t, n, r, i) {
      for (var o=[], s=0, a=0; s<e.length; s++) {
        const l=e[s]; const c=a; const u=a+=l.size; c>=n||u<=t?o.push(l):(c<t&&o.push(l.slice(0, t-c, r)), i&&(o.push(i), i=null), u>n&&o.push(l.slice(n-c, l.size, r)));
      } return o;
    } function pe(e, t) {
      const n=e.root.getSelection(); const i=e.state.doc; if (!n.focusNode) return null; let o=e.docView.nearestDesc(n.focusNode); const s=o&&0==o.size; const a=e.docView.posFromDOM(n.focusNode, n.focusOffset); if (a<0) return null; let l; let c; const u=i.resolve(a); if (x(n)) {
        for (l=u; o&&!o.node;)o=o.parent; if (o&&o.node.isAtom&&r.qv.isSelectable(o.node)&&o.parent&&(!o.node.isInline||!function(e, t, n) {
          for (let r=0==t, i=t==b(e); r||i;) {
            if (e==n) return !0; const o=h(e); if (!(e=e.parentNode)) return !1; r=r&&0==o, i=i&&o==b(e);
          }
        }(n.focusNode, n.focusOffset, o.dom))) {
          const d=o.posBefore; c=new r.qv(a==d?u:i.resolve(d));
        }
      } else {
        const p=e.docView.posFromDOM(n.anchorNode, n.anchorOffset); if (p<0) return null; l=i.resolve(p);
      } return c||(c=xe(e, l, u, 'pointer'==t||e.state.selection.head<u.pos&&!s?1:-1)), c;
    } function fe(e, t) {
      const n=e.state.selection; if (be(e, n), e.editable?e.hasFocus():ke(e)&&document.activeElement&&document.activeElement.contains(e.dom)) {
        if (e.domObserver.disconnectSelection(), e.cursorWrapper) {
          !function(e) {
            const t=e.root.getSelection(); const n=document.createRange(); const r=e.cursorWrapper.dom; const i='IMG'==r.nodeName; i?n.setEnd(r.parentNode, h(r)+1):n.setEnd(r, 0), n.collapse(!1), t.removeAllRanges(), t.addRange(n), !i&&!e.state.selection.visible&&s.ie&&s.ie_version<=11&&(r.disabled=!0, r.disabled=!1);
          }(e);
        } else {
          let i; let o; const a=n.anchor; const l=n.head; !me||n instanceof r.Bs||(n.$from.parent.inlineContent||(i=ge(e, n.from)), n.empty||n.$from.parent.inlineContent||(o=ge(e, n.to))), e.docView.setSelection(a, l, e.root, t), me&&(i&&ye(i), o&&ye(o)), n.visible?e.dom.classList.remove('ProseMirror-hideselection'):(e.dom.classList.add('ProseMirror-hideselection'), 'onselectionchange'in document&&function(e) {
            const t=e.dom.ownerDocument; t.removeEventListener('selectionchange', e.hideSelectionGuard); const n=e.root.getSelection(); const r=n.anchorNode; const i=n.anchorOffset; t.addEventListener('selectionchange', e.hideSelectionGuard=function() {
              n.anchorNode==r&&n.anchorOffset==i||(t.removeEventListener('selectionchange', e.hideSelectionGuard), e.dom.classList.remove('ProseMirror-hideselection'));
            });
          }(e));
        }e.domObserver.setCurSelection(), e.domObserver.connectSelection();
      }
    }ue.prototype.getPreMatch=function(e) {
      return e>=this.preMatchOffset?this.preMatched[e-this.preMatchOffset]:null;
    }, ue.prototype.destroyBetween=function(e, t) {
      if (e!=t) {
        for (let n=e; n<t; n++) this.top.children[n].destroy(); this.top.children.splice(e, t-e), this.changed=!0;
      }
    }, ue.prototype.destroyRest=function() {
      this.destroyBetween(this.index, this.top.children.length);
    }, ue.prototype.syncToMarks=function(e, t, n) {
      for (var r=0, i=this.stack.length>>1, o=Math.min(i, e.length); r<o&&(r==i-1?this.top:this.stack[r+1<<1]).matchesMark(e[r])&&!1!==e[r].type.spec.spanning;)r++; for (;r<i;) this.destroyRest(), this.top.dirty=0, this.index=this.stack.pop(), this.top=this.stack.pop(), i--; for (;i<e.length;) {
        this.stack.push(this.top, this.index+1); for (var s=-1, a=this.index; a<Math.min(this.index+3, this.top.children.length); a++) {
          if (this.top.children[a].matchesMark(e[i])) {
            s=a; break;
          }
        } if (s>-1)s> this.index&&(this.changed=!0, this.destroyBetween(this.index, s)), this.top=this.top.children[this.index]; else {
          const l=Y.create(this.top, e[i], t, n); this.top.children.splice(this.index, 0, l), this.top=l, this.changed=!0;
        } this.index=0, i++;
      }
    }, ue.prototype.findNodeMatch=function(e, t, n, r) {
      let i=-1; const o=r<0?void 0:this.getPreMatch(r); const s=this.top.children; if (o&&o.matchesNode(e, t, n))i=s.indexOf(o); else {
        for (let a=this.index, l=Math.min(s.length, a+5); a<l; a++) {
          const c=s[a]; if (c.matchesNode(e, t, n)&&this.preMatched.indexOf(c)<0) {
            i=a; break;
          }
        }
      } return !(i<0||(this.destroyBetween(this.index, i), this.index++, 0));
    }, ue.prototype.updateNextNode=function(e, t, n, r, i) {
      for (let o=this.index; o<this.top.children.length; o++) {
        const s=this.top.children[o]; if (s instanceof G) {
          const a=this.preMatched.indexOf(s); if (a>-1&&a+this.preMatchOffset!=i) return !1; const l=s.dom; if ((!this.lock||!(l==this.lock||1==l.nodeType&&l.contains(this.lock.parentNode))||e.isText&&s.node&&s.node.isText&&s.nodeDOM.nodeValue==e.text&&3!=s.dirty&&le(t, s.outerDeco))&&s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom!=l&&(this.changed=!0), this.index++, !0; break;
        }
      } return !1;
    }, ue.prototype.addNode=function(e, t, n, r, i) {
      this.top.children.splice(this.index++, 0, G.create(this.top, e, t, n, r, i)), this.changed=!0;
    }, ue.prototype.placeWidget=function(e, t, n) {
      const r=this.index<this.top.children.length?this.top.children[this.index]:null; if (!r||!r.matchesWidget(e)||e!=r.widget&&r.widget.type.toDOM.parentNode) {
        const i=new K(this.top, e, t, n); this.top.children.splice(this.index++, 0, i), this.changed=!0;
      } else this.index++;
    }, ue.prototype.addTextblockHacks=function() {
      for (var e=this.top.children[this.index-1]; e instanceof Y;)e=e.children[e.children.length-1]; if (!e||!(e instanceof Z)||/\n$/.test(e.node.text)) {
        if (this.index<this.top.children.length&&this.top.children[this.index].matchesHack()) this.index++; else {
          const t=document.createElement('br'); this.top.children.splice(this.index++, 0, new Q(this.top, U, t, null)), this.changed=!0;
        }
      }
    }; var me=s.safari||s.chrome&&s.chrome_version<63; function ge(e, t) {
      const n=e.docView.domFromPos(t); const r=n.node; const i=n.offset; const o=i<r.childNodes.length?r.childNodes[i]:null; const a=i?r.childNodes[i-1]:null; if (s.safari&&o&&'false'==o.contentEditable) return ve(o); if (!(o&&'false'!=o.contentEditable||a&&'false'!=a.contentEditable)) {
        if (o) return ve(o); if (a) return ve(a);
      }
    } function ve(e) {
      return e.contentEditable='true', s.safari&&e.draggable&&(e.draggable=!1, e.wasDraggable=!0), e;
    } function ye(e) {
      e.contentEditable='false', e.wasDraggable&&(e.draggable=!0, e.wasDraggable=null);
    } function be(e, t) {
      if (t instanceof r.qv) {
        const n=e.docView.descAt(t.from); n!=e.lastSelectedViewDesc&&(we(e), n&&n.selectNode(), e.lastSelectedViewDesc=n);
      } else we(e);
    } function we(e) {
      e.lastSelectedViewDesc&&(e.lastSelectedViewDesc.parent&&e.lastSelectedViewDesc.deselectNode(), e.lastSelectedViewDesc=null);
    } function xe(e, t, n, i) {
      return e.someProp('createSelectionBetween', (function(r) {
        return r(e, t, n);
      }))||r.Bs.between(t, n, i);
    } function ke(e) {
      const t=e.root.getSelection(); if (!t.anchorNode) return !1; try {
        return e.dom.contains(3==t.anchorNode.nodeType?t.anchorNode.parentNode:t.anchorNode)&&(e.editable||e.dom.contains(3==t.focusNode.nodeType?t.focusNode.parentNode:t.focusNode));
      } catch (e) {
        return !1;
      }
    } function _e(e, t) {
      const n=e.selection; const i=n.$anchor; const o=n.$head; const s=t>0?i.max(o):i.min(o); const a=s.parent.inlineContent?s.depth?e.doc.resolve(t>0?s.after():s.before()):null:s; return a&&r.Y1.findFrom(a, t);
    } function Se(e, t) {
      return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
    } function Ce(e, t, n) {
      const i=e.state.selection; if (!(i instanceof r.Bs)) {
        if (i instanceof r.qv&&i.node.isInline) return Se(e, new r.Bs(t>0?i.$to:i.$from)); const o=_e(e.state, t); return !!o&&Se(e, o);
      } if (!i.empty||n.indexOf('s')>-1) return !1; if (e.endOfTextblock(t>0?'right':'left')) {
        const a=_e(e.state, t); return !!(a&&a instanceof r.qv)&&Se(e, a);
      } if (!(s.mac&&n.indexOf('m')>-1)) {
        let l; const c=i.$head; const u=c.textOffset?null:t<0?c.nodeBefore:c.nodeAfter; if (!u||u.isText) return !1; const d=t<0?c.pos-u.nodeSize:c.pos; return !!(u.isAtom||(l=e.docView.descAt(d))&&!l.contentDOM)&&(r.qv.isSelectable(u)?Se(e, new r.qv(t<0?e.state.doc.resolve(c.pos-u.nodeSize):c)):!!s.webkit&&Se(e, new r.Bs(e.state.doc.resolve(t<0?d:d+u.nodeSize))));
      }
    } function Me(e) {
      return 3==e.nodeType?e.nodeValue.length:e.childNodes.length;
    } function Te(e) {
      const t=e.pmViewDesc; return t&&0==t.size&&(e.nextSibling||'BR'!=e.nodeName);
    } function Oe(e) {
      const t=e.root.getSelection(); let n=t.focusNode; let r=t.focusOffset; if (n) {
        let i; let o; let a=!1; for (s.gecko&&1==n.nodeType&&r<Me(n)&&Te(n.childNodes[r])&&(a=!0); ;) {
          if (r>0) {
            if (1!=n.nodeType) break; const l=n.childNodes[r-1]; if (Te(l))i=n, o=--r; else {
              if (3!=l.nodeType) break; r=(n=l).nodeValue.length;
            }
          } else {
            if (Ee(n)) break; for (var c=n.previousSibling; c&&Te(c);)i=n.parentNode, o=h(c), c=c.previousSibling; if (c)r=Me(n=c); else {
              if ((n=n.parentNode)==e.dom) break; r=0;
            }
          }
        }a?Ne(e, t, n, r):i&&Ne(e, t, i, o);
      }
    } function De(e) {
      const t=e.root.getSelection(); let n=t.focusNode; let r=t.focusOffset; if (n) {
        for (var i, o, s=Me(n); ;) {
          if (r<s) {
            if (1!=n.nodeType) break; if (!Te(n.childNodes[r])) break; i=n, o=++r;
          } else {
            if (Ee(n)) break; for (var a=n.nextSibling; a&&Te(a);)i=a.parentNode, o=h(a)+1, a=a.nextSibling; if (a)r=0, s=Me(n=a); else {
              if ((n=n.parentNode)==e.dom) break; r=s=0;
            }
          }
        }i&&Ne(e, t, i, o);
      }
    } function Ee(e) {
      const t=e.pmViewDesc; return t&&t.node&&t.node.isBlock;
    } function Ne(e, t, n, r) {
      if (x(t)) {
        const i=document.createRange(); i.setEnd(n, r), i.setStart(n, r), t.removeAllRanges(), t.addRange(i);
      } else t.extend&&t.extend(n, r); e.domObserver.setCurSelection(); const o=e.state; setTimeout((function() {
        e.state==o&&fe(e);
      }), 50);
    } function Ae(e, t, n) {
      const i=e.state.selection; if (i instanceof r.Bs&&!i.empty||n.indexOf('s')>-1) return !1; if (s.mac&&n.indexOf('m')>-1) return !1; const o=i.$from; const a=i.$to; if (!o.parent.inlineContent||e.endOfTextblock(t<0?'up':'down')) {
        const l=_e(e.state, t); if (l&&l instanceof r.qv) return Se(e, l);
      } if (!o.parent.inlineContent) {
        const c=r.Y1.findFrom(t<0?o:a, t); return !c||Se(e, c);
      } return !1;
    } function Le(e, t) {
      if (!(e.state.selection instanceof r.Bs)) return !0; const n=e.state.selection; const i=n.$head; const o=n.$anchor; const s=n.empty; if (!i.sameParent(o)) return !0; if (!s) return !1; if (e.endOfTextblock(t>0?'forward':'backward')) return !0; const a=!i.textOffset&&(t<0?i.nodeBefore:i.nodeAfter); if (a&&!a.isText) {
        const l=e.state.tr; return t<0?l.delete(i.pos-a.nodeSize, i.pos):l.delete(i.pos, i.pos+a.nodeSize), e.dispatch(l), !0;
      } return !1;
    } function ze(e, t, n) {
      e.domObserver.stop(), t.contentEditable=n, e.domObserver.start();
    } function Ie(e) {
      const t=e.pmViewDesc; if (t) return t.parseRule(); if ('BR'==e.nodeName&&e.parentNode) {
        if (s.safari&&/^(ul|ol)$/i.test(e.parentNode.nodeName)) {
          const n=document.createElement('div'); return n.appendChild(document.createElement('li')), {skip: n};
        } if (e.parentNode.lastChild==e||s.safari&&/^(tr|table)$/i.test(e.parentNode.nodeName)) return {ignore: !0};
      } else if ('IMG'==e.nodeName&&e.getAttribute('mark-placeholder')) return {ignore: !0};
    } function qe(e, t, n) {
      return Math.max(n.anchor, n.head)>t.content.size?null:xe(e, t.resolve(n.anchor), t.resolve(n.head));
    } function Fe(e, t, n) {
      for (var r=e.depth, i=t?e.end():e.pos; r>0&&(t||e.indexAfter(r)==e.node(r).childCount);)r--, i++, t=!1; if (n) for (let o=e.node(r).maybeChild(e.indexAfter(r)); o&&!o.isLeaf;)o=o.firstChild, i++; return i;
    } function Pe(e, t) {
      for (var n=[], r=t.content, o=t.openStart, s=t.openEnd; o>1&&s>1&&1==r.childCount&&1==r.firstChild.childCount;) {
        o--, s--; const a=r.firstChild; n.push(a.type.name, a.attrs!=a.type.defaultAttrs?a.attrs:null), r=a.content;
      } const l=e.someProp('clipboardSerializer')||i.PW.fromSchema(e.state.schema); const c=Ue(); const u=c.createElement('div'); u.appendChild(l.serializeFragment(r, {document: c})); for (var d, h=u.firstChild; h&&1==h.nodeType&&(d=Ve[h.nodeName.toLowerCase()]);) {
        for (let p=d.length-1; p>=0; p--) {
          for (var f=c.createElement(d[p]); u.firstChild;)f.appendChild(u.firstChild); u.appendChild(f);
        }h=u.firstChild;
      } return h&&1==h.nodeType&&h.setAttribute('data-pm-slice', o+' '+s+' '+JSON.stringify(n)), {dom: u, text: e.someProp('clipboardTextSerializer', (function(e) {
        return e(t);
      }))||t.content.textBetween(0, t.content.size, '\n\n')};
    } function Re(e, t, n, r, o) {
      let s; let a; const l=o.parent.type.spec.code; if (!n&&!t) return null; const c=t&&(r||l||!n); if (c) {
        if (e.someProp('transformPastedText', (function(e) {
          t=e(t, l||r);
        })), l) return new i.p2(i.HY.from(e.state.schema.text(t)), 0, 0); const u=e.someProp('clipboardTextParser', (function(e) {
          return e(t, o, r);
        })); u?a=u:(s=document.createElement('div'), t.trim().split(/(?:\r\n?|\n)+/).forEach((function(e) {
          s.appendChild(document.createElement('p')).textContent=e;
        })));
      } else {
        e.someProp('transformPastedHTML', (function(e) {
          n=e(n);
        })), s=function(e) {
          const t=/(\s*<meta [^>]*>)*/.exec(e); t&&(e=e.slice(t[0].length)); let n; let r=Ue().createElement('div'); const i=/(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(e); let o=0; (n=i&&Ve[i[1].toLowerCase()])&&(e=n.map((function(e) {
            return '<'+e+'>';
          })).join('')+e+n.map((function(e) {
            return '</'+e+'>';
          })).reverse().join(''), o=n.length), r.innerHTML=e; for (let s=0; s<o; s++)r=r.firstChild; return r;
        }(n);
      } const d=s&&s.querySelector('[data-pm-slice]'); const h=d&&/^(\d+) (\d+) (.*)/.exec(d.getAttribute('data-pm-slice')); if (!a) {
        const p=e.someProp('clipboardParser')||e.someProp('domParser')||i.aw.fromSchema(e.state.schema); a=p.parseSlice(s, {preserveWhitespace: !(!c&&!h), context: o});
      } return a=h?function(e, t) {
        if (!e.size) return e; let n; const r=e.content.firstChild.type.schema; try {
          n=JSON.parse(t);
        } catch (t) {
          return e;
        } for (var o=e.content, s=e.openStart, a=e.openEnd, l=n.length-2; l>=0; l-=2) {
          const c=r.nodes[n[l]]; if (!c||c.hasRequiredAttrs()) break; o=i.HY.from(c.create(n[l+1], o)), s++, a++;
        } return new i.p2(o, s, a);
      }(function(e, t, n) {
        return t<e.openStart&&(e=new i.p2(He(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n<e.openEnd&&(e=new i.p2(He(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
      }(a, +h[1], +h[2]), h[3]):i.p2.maxOpen(function(e, t) {
        if (e.childCount<2) return e; for (let n=function(n) {
            let r=t.node(n).contentMatchAt(t.index(n)); let o=void 0; let s=[]; if (e.forEach((function(e) {
              if (s) {
                let t; const n=r.findWrapping(e.type); if (!n) return s=null; if (t=s.length&&o.length&&je(n, o, e, s[s.length-1], 0))s[s.length-1]=t; else {
                  s.length&&(s[s.length-1]=We(s[s.length-1], o.length)); const i=Be(e, n); s.push(i), r=r.matchType(i.type, i.attrs), o=n;
                }
              }
            })), s) return {v: i.HY.from(s)};
          }, r=t.depth; r>=0; r--) {
          const o=n(r); if (o) return o.v;
        } return e;
      }(a.content, o), !1), e.someProp('transformPasted', (function(e) {
        a=e(a);
      })), a;
    } function Be(e, t, n) {
      void 0===n&&(n=0); for (let r=t.length-1; r>=n; r--)e=t[r].create(null, i.HY.from(e)); return e;
    } function je(e, t, n, r, o) {
      if (o<e.length&&o<t.length&&e[o]==t[o]) {
        const s=je(e, t, n, r.lastChild, o+1); if (s) return r.copy(r.content.replaceChild(r.childCount-1, s)); if (r.contentMatchAt(r.childCount).matchType(o==e.length-1?n.type:e[o+1])) return r.copy(r.content.append(i.HY.from(Be(n, e, o+1))));
      }
    } function We(e, t) {
      if (0==t) return e; const n=e.content.replaceChild(e.childCount-1, We(e.lastChild, t-1)); const r=e.contentMatchAt(e.childCount).fillBefore(i.HY.empty, !0); return e.copy(n.append(r));
    } function He(e, t, n, r, o, s) {
      const a=t<0?e.firstChild:e.lastChild; let l=a.content; return o<r-1&&(l=He(l, t, n, r, o+1, s)), o>=n&&(l=t<0?a.contentMatchAt(0).fillBefore(l, e.childCount>1||s<=o).append(l):l.append(a.contentMatchAt(a.childCount).fillBefore(i.HY.empty, !0))), e.replaceChild(t<0?0:e.childCount-1, a.copy(l));
    } var Ve={thead: ['table'], tbody: ['table'], tfoot: ['table'], caption: ['table'], colgroup: ['table'], col: ['table', 'colgroup'], tr: ['table', 'tbody'], td: ['table', 'tbody', 'tr'], th: ['table', 'tbody', 'tr']}; let $e=null; function Ue() {
      return $e||($e=document.implementation.createHTMLDocument('title'));
    } const Ke={childList: !0, characterData: !0, characterDataOldValue: !0, attributes: !0, attributeOldValue: !0, subtree: !0}; const Je=s.ie&&s.ie_version<=11; const Ye=function() {
      this.anchorNode=this.anchorOffset=this.focusNode=this.focusOffset=null;
    }; Ye.prototype.set=function(e) {
      this.anchorNode=e.anchorNode, this.anchorOffset=e.anchorOffset, this.focusNode=e.focusNode, this.focusOffset=e.focusOffset;
    }, Ye.prototype.eq=function(e) {
      return e.anchorNode==this.anchorNode&&e.anchorOffset==this.anchorOffset&&e.focusNode==this.focusNode&&e.focusOffset==this.focusOffset;
    }; const Ge=function(e, t) {
      const n=this; this.view=e, this.handleDOMChange=t, this.queue=[], this.flushingSoon=-1, this.observer=window.MutationObserver&&new window.MutationObserver((function(e) {
        for (let t=0; t<e.length; t++)n.queue.push(e[t]); s.ie&&s.ie_version<=11&&e.some((function(e) {
          return 'childList'==e.type&&e.removedNodes.length||'characterData'==e.type&&e.oldValue.length>e.target.nodeValue.length;
        }))?n.flushSoon():n.flush();
      })), this.currentSelection=new Ye, Je&&(this.onCharData=function(e) {
        n.queue.push({target: e.target, type: 'characterData', oldValue: e.prevValue}), n.flushSoon();
      }), this.onSelectionChange=this.onSelectionChange.bind(this), this.suppressingSelectionUpdates=!1;
    }; Ge.prototype.flushSoon=function() {
      const e=this; this.flushingSoon<0&&(this.flushingSoon=window.setTimeout((function() {
        e.flushingSoon=-1, e.flush();
      }), 20));
    }, Ge.prototype.forceFlush=function() {
      this.flushingSoon>-1&&(window.clearTimeout(this.flushingSoon), this.flushingSoon=-1, this.flush());
    }, Ge.prototype.start=function() {
      this.observer&&this.observer.observe(this.view.dom, Ke), Je&&this.view.dom.addEventListener('DOMCharacterDataModified', this.onCharData), this.connectSelection();
    }, Ge.prototype.stop=function() {
      const e=this; if (this.observer) {
        const t=this.observer.takeRecords(); if (t.length) {
          for (let n=0; n<t.length; n++) this.queue.push(t[n]); window.setTimeout((function() {
            return e.flush();
          }), 20);
        } this.observer.disconnect();
      }Je&&this.view.dom.removeEventListener('DOMCharacterDataModified', this.onCharData), this.disconnectSelection();
    }, Ge.prototype.connectSelection=function() {
      this.view.dom.ownerDocument.addEventListener('selectionchange', this.onSelectionChange);
    }, Ge.prototype.disconnectSelection=function() {
      this.view.dom.ownerDocument.removeEventListener('selectionchange', this.onSelectionChange);
    }, Ge.prototype.suppressSelectionUpdates=function() {
      const e=this; this.suppressingSelectionUpdates=!0, setTimeout((function() {
        return e.suppressingSelectionUpdates=!1;
      }), 50);
    }, Ge.prototype.onSelectionChange=function() {
      if ((!(e=this.view).editable||e.root.activeElement==e.dom)&&ke(e)) {
        var e; if (this.suppressingSelectionUpdates) return fe(this.view); if (s.ie&&s.ie_version<=11&&!this.view.state.selection.empty) {
          const t=this.view.root.getSelection(); if (t.focusNode&&g(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset)) return this.flushSoon();
        } this.flush();
      }
    }, Ge.prototype.setCurSelection=function() {
      this.currentSelection.set(this.view.root.getSelection());
    }, Ge.prototype.ignoreSelectionChange=function(e) {
      if (0==e.rangeCount) return !0; const t=e.getRangeAt(0).commonAncestorContainer; const n=this.view.docView.nearestDesc(t); return n&&n.ignoreMutation({type: 'selection', target: 3==t.nodeType?t.parentNode:t})?(this.setCurSelection(), !0):void 0;
    }, Ge.prototype.flush=function() {
      if (this.view.docView&&!(this.flushingSoon>-1)) {
        let e=this.observer?this.observer.takeRecords():[]; this.queue.length&&(e=this.queue.concat(e), this.queue.length=0); const t=this.view.root.getSelection(); const n=!this.suppressingSelectionUpdates&&!this.currentSelection.eq(t)&&ke(this.view)&&!this.ignoreSelectionChange(t); let r=-1; let i=-1; let o=!1; const a=[]; if (this.view.editable) {
          for (let l=0; l<e.length; l++) {
            const c=this.registerMutation(e[l], a); c&&(r=r<0?c.from:Math.min(c.from, r), i=i<0?c.to:Math.max(c.to, i), c.typeOver&&(o=!0));
          }
        } if (s.gecko&&a.length>1) {
          const u=a.filter((function(e) {
            return 'BR'==e.nodeName;
          })); if (2==u.length) {
            const d=u[0]; const h=u[1]; d.parentNode&&d.parentNode.parentNode==h.parentNode?h.remove():d.remove();
          }
        }(r>-1||n)&&(r>-1&&(this.view.docView.markDirty(r, i), p=this.view, Xe||(Xe=!0, 'normal'==getComputedStyle(p.dom).whiteSpace&&console.warn('ProseMirror expects the CSS white-space property to be set, preferably to \'pre-wrap\'. It is recommended to load style/prosemirror.css from the prosemirror-view package.'))), this.handleDOMChange(r, i, o, a), this.view.docView.dirty?this.view.updateState(this.view.state):this.currentSelection.eq(t)||fe(this.view));
      } let p;
    }, Ge.prototype.registerMutation=function(e, t) {
      if (t.indexOf(e.target)>-1) return null; const n=this.view.docView.nearestDesc(e.target); if ('attributes'==e.type&&(n==this.view.docView||'contenteditable'==e.attributeName||'style'==e.attributeName&&!e.oldValue&&!e.target.getAttribute('style'))) return null; if (!n||n.ignoreMutation(e)) return null; if ('childList'==e.type) {
        let r=e.previousSibling; let i=e.nextSibling; if (s.ie&&s.ie_version<=11&&e.addedNodes.length) {
          for (let o=0; o<e.addedNodes.length; o++) {
            const a=e.addedNodes[o]; const l=a.previousSibling; const c=a.nextSibling; (!l||Array.prototype.indexOf.call(e.addedNodes, l)<0)&&(r=l), (!c||Array.prototype.indexOf.call(e.addedNodes, c)<0)&&(i=c);
          }
        } for (var u=r&&r.parentNode==e.target?h(r)+1:0, d=n.localPosFromDOM(e.target, u, -1), p=i&&i.parentNode==e.target?h(i):e.target.childNodes.length, f=0; f<e.addedNodes.length; f++)t.push(e.addedNodes[f]); return {from: d, to: n.localPosFromDOM(e.target, p, 1)};
      } return 'attributes'==e.type?{from: n.posAtStart-n.border, to: n.posAtEnd+n.border}:{from: n.posAtStart, to: n.posAtEnd, typeOver: e.target.nodeValue==e.oldValue};
    }; var Xe=!1; const Ze={}; const Qe={}; function et(e, t) {
      e.lastSelectionOrigin=t, e.lastSelectionTime=Date.now();
    } function tt(e) {
      e.someProp('handleDOMEvents', (function(t) {
        for (const n in t) {
          e.eventHandlers[n]||e.dom.addEventListener(n, e.eventHandlers[n]=function(t) {
            return nt(e, t);
          });
        }
      }));
    } function nt(e, t) {
      return e.someProp('handleDOMEvents', (function(n) {
        const r=n[t.type]; return !!r&&(r(e, t)||t.defaultPrevented);
      }));
    } function rt(e) {
      return {left: e.clientX, top: e.clientY};
    } function it(e, t, n, r, i) {
      if (-1==r) return !1; for (var o=e.state.doc.resolve(r), s=function(r) {
          if (e.someProp(t, (function(t) {
            return r>o.depth?t(e, n, o.nodeAfter, o.before(r), i, !0):t(e, n, o.node(r), o.before(r), i, !1);
          }))) return {v: !0};
        }, a=o.depth+1; a>0; a--) {
        const l=s(a); if (l) return l.v;
      } return !1;
    } function ot(e, t, n) {
      e.focused||e.focus(); const r=e.state.tr.setSelection(t); 'pointer'==n&&r.setMeta('pointer', !0), e.dispatch(r);
    } function st(e, t, n, r) {
      return it(e, 'handleDoubleClickOn', t, n, r)||e.someProp('handleDoubleClick', (function(n) {
        return n(e, t, r);
      }));
    } function at(e, t, n, i) {
      return it(e, 'handleTripleClickOn', t, n, i)||e.someProp('handleTripleClick', (function(n) {
        return n(e, t, i);
      }))||function(e, t) {
        const n=e.state.doc; if (-1==t) return !!n.inlineContent&&(ot(e, r.Bs.create(n, 0, n.content.size), 'pointer'), !0); for (let i=n.resolve(t), o=i.depth+1; o>0; o--) {
          const s=o>i.depth?i.nodeAfter:i.node(o); const a=i.before(o); if (s.inlineContent)ot(e, r.Bs.create(n, a+1, a+1+s.content.size), 'pointer'); else {
            if (!r.qv.isSelectable(s)) continue; ot(e, r.qv.create(n, a), 'pointer');
          } return !0;
        }
      }(e, n);
    } function lt(e) {
      return mt(e);
    }Qe.keydown=function(e, t) {
      if (e.shiftKey=16==t.keyCode||t.shiftKey, !dt(e, t)) {
        if (e.domObserver.forceFlush(), e.lastKeyCode=t.keyCode, e.lastKeyCodeTime=Date.now(), !s.ios||13!=t.keyCode||t.ctrlKey||t.altKey||t.metaKey) {
e.someProp('handleKeyDown', (function(n) {
  return n(e, t);
}))||function(e, t) {
  const n=t.keyCode; const r=function(e) {
    let t=''; return e.ctrlKey&&(t+='c'), e.metaKey&&(t+='m'), e.altKey&&(t+='a'), e.shiftKey&&(t+='s'), t;
  }(t); return 8==n||s.mac&&72==n&&'c'==r?Le(e, -1)||Oe(e):46==n||s.mac&&68==n&&'c'==r?Le(e, 1)||De(e):13==n||27==n||(37==n?Ce(e, -1, r)||Oe(e):39==n?Ce(e, 1, r)||De(e):38==n?Ae(e, -1, r)||Oe(e):40==n?function(e) {
    if (s.safari&&!(e.state.selection.$head.parentOffset>0)) {
      const t=e.root.getSelection(); const n=t.focusNode; const r=t.focusOffset; if (n&&1==n.nodeType&&0==r&&n.firstChild&&'false'==n.firstChild.contentEditable) {
        const i=n.firstChild; ze(e, i, !0), setTimeout((function() {
          return ze(e, i, !1);
        }), 20);
      }
    }
  }(e)||Ae(e, 1, r)||De(e):r==(s.mac?'m':'c')&&(66==n||73==n||89==n||90==n));
}(e, t)?t.preventDefault():et(e, 'key');
        } else {
          const n=Date.now(); e.lastIOSEnter=n, e.lastIOSEnterFallbackTimeout=setTimeout((function() {
            e.lastIOSEnter==n&&(e.someProp('handleKeyDown', (function(t) {
              return t(e, k(13, 'Enter'));
            })), e.lastIOSEnter=0);
          }), 200);
        }
      }
    }, Qe.keyup=function(e, t) {
      16==t.keyCode&&(e.shiftKey=!1);
    }, Qe.keypress=function(e, t) {
      if (!(dt(e, t)||!t.charCode||t.ctrlKey&&!t.altKey||s.mac&&t.metaKey)) {
        if (e.someProp('handleKeyPress', (function(n) {
          return n(e, t);
        })))t.preventDefault(); else {
          const n=e.state.selection; if (!(n instanceof r.Bs&&n.$from.sameParent(n.$to))) {
            const i=String.fromCharCode(t.charCode); e.someProp('handleTextInput', (function(t) {
              return t(e, n.$from.pos, n.$to.pos, i);
            }))||e.dispatch(e.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
          }
        }
      }
    }; const ct=s.mac?'metaKey':'ctrlKey'; Ze.mousedown=function(e, t) {
      e.shiftKey=t.shiftKey; const n=lt(e); const r=Date.now(); let i='singleClick'; r-e.lastClick.time<500&&function(e, t) {
        const n=t.x-e.clientX; const r=t.y-e.clientY; return n*n+r*r<100;
      }(t, e.lastClick)&&!t[ct]&&('singleClick'==e.lastClick.type?i='doubleClick':'doubleClick'==e.lastClick.type&&(i='tripleClick')), e.lastClick={time: r, x: t.clientX, y: t.clientY, type: i}; const o=e.posAtCoords(rt(t)); o&&('singleClick'==i?e.mouseDown=new ut(e, o, t, n):('doubleClick'==i?st:at)(e, o.pos, o.inside, t)?t.preventDefault():et(e, 'pointer'));
    }; var ut=function(e, t, n, i) {
      let o; let a; const l=this; if (this.view=e, this.startDoc=e.state.doc, this.pos=t, this.event=n, this.flushed=i, this.selectNode=n[ct], this.allowDefault=n.shiftKey, t.inside>-1)o=e.state.doc.nodeAt(t.inside), a=t.inside; else {
        const c=e.state.doc.resolve(t.pos); o=c.parent, a=c.depth?c.before():0;
      } this.mightDrag=null; const u=i?null:n.target; const d=u?e.docView.nearestDesc(u, !0):null; this.target=d?d.dom:null, (o.type.spec.draggable&&!1!==o.type.spec.selectable||e.state.selection instanceof r.qv&&a==e.state.selection.from)&&(this.mightDrag={node: o, pos: a, addAttr: this.target&&!this.target.draggable, setUneditable: this.target&&s.gecko&&!this.target.hasAttribute('contentEditable')}), this.target&&this.mightDrag&&(this.mightDrag.addAttr||this.mightDrag.setUneditable)&&(this.view.domObserver.stop(), this.mightDrag.addAttr&&(this.target.draggable=!0), this.mightDrag.setUneditable&&setTimeout((function() {
        return l.target.setAttribute('contentEditable', 'false');
      }), 20), this.view.domObserver.start()), e.root.addEventListener('mouseup', this.up=this.up.bind(this)), e.root.addEventListener('mousemove', this.move=this.move.bind(this)), et(e, 'pointer');
    }; function dt(e, t) {
      return !!e.composing||!!(s.safari&&Math.abs(t.timeStamp-e.compositionEndedAt)<500)&&(e.compositionEndedAt=-2e8, !0);
    }ut.prototype.done=function() {
      this.view.root.removeEventListener('mouseup', this.up), this.view.root.removeEventListener('mousemove', this.move), this.mightDrag&&this.target&&(this.view.domObserver.stop(), this.mightDrag.addAttr&&this.target.removeAttribute('draggable'), this.mightDrag.setUneditable&&this.target.removeAttribute('contentEditable'), this.view.domObserver.start()), this.view.mouseDown=null;
    }, ut.prototype.up=function(e) {
      if (this.done(), this.view.dom.contains(3==e.target.nodeType?e.target.parentNode:e.target)) {
        let t=this.pos; this.view.state.doc!=this.startDoc&&(t=this.view.posAtCoords(rt(e))), this.allowDefault||!t?et(this.view, 'pointer'):function(e, t, n, i, o) {
          return it(e, 'handleClickOn', t, n, i)||e.someProp('handleClick', (function(n) {
            return n(e, t, i);
          }))||(o?function(e, t) {
            if (-1==t) return !1; let n; let i; const o=e.state.selection; o instanceof r.qv&&(n=o.node); for (let s=e.state.doc.resolve(t), a=s.depth+1; a>0; a--) {
              const l=a>s.depth?s.nodeAfter:s.node(a); if (r.qv.isSelectable(l)) {
                i=n&&o.$from.depth>0&&a>=o.$from.depth&&s.before(o.$from.depth+1)==o.$from.pos?s.before(o.$from.depth):s.before(a); break;
              }
            } return null!=i&&(ot(e, r.qv.create(e.state.doc, i), 'pointer'), !0);
          }(e, n):function(e, t) {
            if (-1==t) return !1; const n=e.state.doc.resolve(t); const i=n.nodeAfter; return !!(i&&i.isAtom&&r.qv.isSelectable(i))&&(ot(e, new r.qv(n), 'pointer'), !0);
          }(e, n));
        }(this.view, t.pos, t.inside, e, this.selectNode)?e.preventDefault():this.flushed||s.safari&&this.mightDrag&&!this.mightDrag.node.isAtom||s.chrome&&!(this.view.state.selection instanceof r.Bs)&&(t.pos==this.view.state.selection.from||t.pos==this.view.state.selection.to)?(ot(this.view, r.Y1.near(this.view.state.doc.resolve(t.pos)), 'pointer'), e.preventDefault()):et(this.view, 'pointer');
      }
    }, ut.prototype.move=function(e) {
      !this.allowDefault&&(Math.abs(this.event.x-e.clientX)>4||Math.abs(this.event.y-e.clientY)>4)&&(this.allowDefault=!0), et(this.view, 'pointer');
    }, Ze.touchdown=function(e) {
      lt(e), et(e, 'pointer');
    }, Ze.contextmenu=function(e) {
      return lt(e);
    }; const ht=s.android?5e3:-1; function pt(e, t) {
      clearTimeout(e.composingTimeout), t>-1&&(e.composingTimeout=setTimeout((function() {
        return mt(e);
      }), t));
    } function ft(e) {
      for (e.composing=!1; e.compositionNodes.length>0;)e.compositionNodes.pop().markParentsDirty();
    } function mt(e, t) {
      if (e.domObserver.forceFlush(), ft(e), t||e.docView.dirty) {
        const n=pe(e); return n&&!n.eq(e.state.selection)?e.dispatch(e.state.tr.setSelection(n)):e.updateState(e.state), !0;
      } return !1;
    }Qe.compositionstart=Qe.compositionupdate=function(e) {
      if (!e.composing) {
        e.domObserver.flush(); const t=e.state; const n=t.selection.$from; if (t.selection.empty&&(t.storedMarks||!n.textOffset&&n.parentOffset&&n.nodeBefore.marks.some((function(e) {
          return !1===e.type.spec.inclusive;
        }))))e.markCursor=e.state.storedMarks||n.marks(), mt(e, !0), e.markCursor=null; else if (mt(e), s.gecko&&t.selection.empty&&n.parentOffset&&!n.textOffset&&n.nodeBefore.marks.length) {
          for (let r=e.root.getSelection(), i=r.focusNode, o=r.focusOffset; i&&1==i.nodeType&&0!=o;) {
            const a=o<0?i.lastChild:i.childNodes[o-1]; if (!a) break; if (3==a.nodeType) {
              r.collapse(a, a.nodeValue.length); break;
            }i=a, o=-1;
          }
        }e.composing=!0;
      }pt(e, ht);
    }, Qe.compositionend=function(e, t) {
      e.composing&&(e.composing=!1, e.compositionEndedAt=t.timeStamp, pt(e, 20));
    }; const gt=s.ie&&s.ie_version<15||s.ios&&s.webkit_version<604; function vt(e, t, n, r) {
      const o=Re(e, t, n, e.shiftKey, e.state.selection.$from); if (!e.someProp('handlePaste', (function(t) {
        return t(e, r, o||i.p2.empty);
      }))&&o) {
        const s=function(e) {
          return 0==e.openStart&&0==e.openEnd&&1==e.content.childCount?e.content.firstChild:null;
        }(o); const a=s?e.state.tr.replaceSelectionWith(s, e.shiftKey):e.state.tr.replaceSelection(o); e.dispatch(a.scrollIntoView().setMeta('paste', !0).setMeta('uiEvent', 'paste'));
      }
    }Ze.copy=Qe.cut=function(e, t) {
      const n=e.state.selection; const r='cut'==t.type; if (!n.empty) {
        const i=gt?null:t.clipboardData; const o=Pe(e, n.content()); const s=o.dom; const a=o.text; i?(t.preventDefault(), i.clearData(), i.setData('text/html', s.innerHTML), i.setData('text/plain', a)):function(e, t) {
          if (e.dom.parentNode) {
            const n=e.dom.parentNode.appendChild(document.createElement('div')); n.appendChild(t), n.style.cssText='position: fixed; left: -10000px; top: 10px'; const r=getSelection(); const i=document.createRange(); i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout((function() {
              n.parentNode&&n.parentNode.removeChild(n), e.focus();
            }), 50);
          }
        }(e, s), r&&e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta('uiEvent', 'cut'));
      }
    }, Qe.paste=function(e, t) {
      const n=gt?null:t.clipboardData; const r=n&&n.getData('text/html'); const i=n&&n.getData('text/plain'); n&&(r||i||n.files.length)?(vt(e, i, r, t), t.preventDefault()):function(e, t) {
        if (e.dom.parentNode) {
          const n=e.shiftKey||e.state.selection.$from.parent.type.spec.code; const r=e.dom.parentNode.appendChild(document.createElement(n?'textarea':'div')); n||(r.contentEditable='true'), r.style.cssText='position: fixed; left: -10000px; top: 10px', r.focus(), setTimeout((function() {
            e.focus(), r.parentNode&&r.parentNode.removeChild(r), n?vt(e, r.value, null, t):vt(e, r.textContent, r.innerHTML, t);
          }), 50);
        }
      }(e, t);
    }; const yt=function(e, t) {
      this.slice=e, this.move=t;
    }; const bt=s.mac?'altKey':'ctrlKey'; for (const wt in Ze.dragstart=function(e, t) {
      const n=e.mouseDown; if (n&&n.done(), t.dataTransfer) {
        const i=e.state.selection; const o=i.empty?null:e.posAtCoords(rt(t)); if (o&&o.pos>=i.from&&o.pos<=(i instanceof r.qv?i.to-1:i.to));else if (n&&n.mightDrag)e.dispatch(e.state.tr.setSelection(r.qv.create(e.state.doc, n.mightDrag.pos))); else if (t.target&&1==t.target.nodeType) {
          const s=e.docView.nearestDesc(t.target, !0); if (!s||!s.node.type.spec.draggable||s==e.docView) return; e.dispatch(e.state.tr.setSelection(r.qv.create(e.state.doc, s.posBefore)));
        } const a=e.state.selection.content(); const l=Pe(e, a); const c=l.dom; const u=l.text; t.dataTransfer.clearData(), t.dataTransfer.setData(gt?'Text':'text/html', c.innerHTML), gt||t.dataTransfer.setData('text/plain', u), e.dragging=new yt(a, !t[bt]);
      }
    }, Ze.dragend=function(e) {
      const t=e.dragging; window.setTimeout((function() {
        e.dragging==t&&(e.dragging=null);
      }), 50);
    }, Qe.dragover=Qe.dragenter=function(e, t) {
      return t.preventDefault();
    }, Qe.drop=function(e, t) {
      const n=e.dragging; if (e.dragging=null, t.dataTransfer) {
        const s=e.posAtCoords(rt(t)); if (s) {
          const a=e.state.doc.resolve(s.pos); if (a) {
            const l=n&&n.slice||Re(e, t.dataTransfer.getData(gt?'Text':'text/plain'), gt?null:t.dataTransfer.getData('text/html'), !1, a); const c=n&&!t[bt]; if (e.someProp('handleDrop', (function(n) {
              return n(e, t, l||i.p2.empty, c);
            })))t.preventDefault(); else if (l) {
              t.preventDefault(); let u=l?(0, o.nj)(e.state.doc, a.pos, l):a.pos; null==u&&(u=a.pos); const d=e.state.tr; c&&d.deleteSelection(); const h=d.mapping.map(u); const p=0==l.openStart&&0==l.openEnd&&1==l.content.childCount; const f=d.doc; if (p?d.replaceRangeWith(h, h, l.content.firstChild):d.replaceRange(h, h, l), !d.doc.eq(f)) {
                const m=d.doc.resolve(h); if (p&&r.qv.isSelectable(l.content.firstChild)&&m.nodeAfter&&m.nodeAfter.sameMarkup(l.content.firstChild))d.setSelection(new r.qv(m)); else {
                  let g=d.mapping.map(u); d.mapping.maps[d.mapping.maps.length-1].forEach((function(e, t, n, r) {
                    return g=r;
                  })), d.setSelection(xe(e, m, d.doc.resolve(g)));
                }e.focus(), e.dispatch(d.setMeta('uiEvent', 'drop'));
              }
            }
          }
        }
      }
    }, Ze.focus=function(e) {
      e.focused||(e.domObserver.stop(), e.dom.classList.add('ProseMirror-focused'), e.domObserver.start(), e.focused=!0, setTimeout((function() {
        e.docView&&e.hasFocus()&&!e.domObserver.currentSelection.eq(e.root.getSelection())&&fe(e);
      }), 20));
    }, Ze.blur=function(e) {
      e.focused&&(e.domObserver.stop(), e.dom.classList.remove('ProseMirror-focused'), e.domObserver.start(), e.domObserver.currentSelection.set({}), e.focused=!1);
    }, Ze.beforeinput=function(e, t) {
      if (s.chrome&&s.android&&'deleteContentBackward'==t.inputType) {
        const n=e.domChangeCount; setTimeout((function() {
          if (e.domChangeCount==n&&(e.dom.blur(), e.focus(), !e.someProp('handleKeyDown', (function(t) {
            return t(e, k(8, 'Backspace'));
          })))) {
            const t=e.state.selection.$cursor; t&&t.pos>0&&e.dispatch(e.state.tr.delete(t.pos-1, t.pos).scrollIntoView());
          }
        }), 50);
      }
    }, Qe)Ze[wt]=Qe[wt]; function xt(e, t) {
      if (e==t) return !0; for (const n in e) if (e[n]!==t[n]) return !1; for (const r in t) if (!(r in e)) return !1; return !0;
    } const kt=function(e, t) {
      this.spec=t||Ot, this.side=this.spec.side||0, this.toDOM=e;
    }; kt.prototype.map=function(e, t, n, r) {
      const i=e.mapResult(t.from+r, this.side<0?-1:1); const o=i.pos; return i.deleted?null:new Ct(o-n, o-n, this);
    }, kt.prototype.valid=function() {
      return !0;
    }, kt.prototype.eq=function(e) {
      return this==e||e instanceof kt&&(this.spec.key&&this.spec.key==e.spec.key||this.toDOM==e.toDOM&&xt(this.spec, e.spec));
    }; const _t=function(e, t) {
      this.spec=t||Ot, this.attrs=e;
    }; _t.prototype.map=function(e, t, n, r) {
      const i=e.map(t.from+r, this.spec.inclusiveStart?-1:1)-n; const o=e.map(t.to+r, this.spec.inclusiveEnd?1:-1)-n; return i>=o?null:new Ct(i, o, this);
    }, _t.prototype.valid=function(e, t) {
      return t.from<t.to;
    }, _t.prototype.eq=function(e) {
      return this==e||e instanceof _t&&xt(this.attrs, e.attrs)&&xt(this.spec, e.spec);
    }, _t.is=function(e) {
      return e.type instanceof _t;
    }; const St=function(e, t) {
      this.spec=t||Ot, this.attrs=e;
    }; St.prototype.map=function(e, t, n, r) {
      const i=e.mapResult(t.from+r, 1); if (i.deleted) return null; const o=e.mapResult(t.to+r, -1); return o.deleted||o.pos<=i.pos?null:new Ct(i.pos-n, o.pos-n, this);
    }, St.prototype.valid=function(e, t) {
      const n=e.content.findIndex(t.from); const r=n.index; const i=n.offset; return i==t.from&&i+e.child(r).nodeSize==t.to;
    }, St.prototype.eq=function(e) {
      return this==e||e instanceof St&&xt(this.attrs, e.attrs)&&xt(this.spec, e.spec);
    }; var Ct=function(e, t, n) {
      this.from=e, this.to=t, this.type=n;
    }; const Mt={spec: {configurable: !0}, inline: {configurable: !0}}; Ct.prototype.copy=function(e, t) {
      return new Ct(e, t, this.type);
    }, Ct.prototype.eq=function(e, t) {
      return void 0===t&&(t=0), this.type.eq(e.type)&&this.from+t==e.from&&this.to+t==e.to;
    }, Ct.prototype.map=function(e, t, n) {
      return this.type.map(e, this, t, n);
    }, Ct.widget=function(e, t, n) {
      return new Ct(e, e, new kt(t, n));
    }, Ct.inline=function(e, t, n, r) {
      return new Ct(e, t, new _t(n, r));
    }, Ct.node=function(e, t, n, r) {
      return new Ct(e, t, new St(n, r));
    }, Mt.spec.get=function() {
      return this.type.spec;
    }, Mt.inline.get=function() {
      return this.type instanceof _t;
    }, Object.defineProperties(Ct.prototype, Mt); const Tt=[]; var Ot={}; var Dt=function(e, t) {
      this.local=e&&e.length?e:Tt, this.children=t&&t.length?t:Tt;
    }; Dt.create=function(e, t) {
      return t.length?It(t, e, 0, Ot):Et;
    }, Dt.prototype.find=function(e, t, n) {
      const r=[]; return this.findInner(null==e?0:e, null==t?1e9:t, r, 0, n), r;
    }, Dt.prototype.findInner=function(e, t, n, r, i) {
      for (let o=0; o<this.local.length; o++) {
        const s=this.local[o]; s.from<=t&&s.to>=e&&(!i||i(s.spec))&&n.push(s.copy(s.from+r, s.to+r));
      } for (let a=0; a<this.children.length; a+=3) {
        if (this.children[a]<t&&this.children[a+1]>e) {
          const l=this.children[a]+1; this.children[a+2].findInner(e-l, t-l, n, r+l, i);
        }
      }
    }, Dt.prototype.map=function(e, t, n) {
      return this==Et||0==e.maps.length?this:this.mapInner(e, t, 0, 0, n||Ot);
    }, Dt.prototype.mapInner=function(e, t, n, r, i) {
      for (var o, s=0; s<this.local.length; s++) {
        const a=this.local[s].map(e, n, r); a&&a.type.valid(t, a)?(o||(o=[])).push(a):i.onRemove&&i.onRemove(this.local[s].spec);
      } return this.children.length?function(e, t, n, r, i, o, s) {
        for (var a=e.slice(), l=function(e, t, n, r) {
            for (let s=0; s<a.length; s+=3) {
              const l=a[s+1]; let c=void 0; -1==l||e>l+o||(t>=a[s]+o?a[s+1]=-1:n>=i&&(c=r-n-(t-e))&&(a[s]+=c, a[s+1]+=c));
            }
          }, c=0; c<n.maps.length; c++)n.maps[c].forEach(l); for (var u=!1, d=0; d<a.length; d+=3) {
          if (-1==a[d+1]) {
            const h=n.map(e[d]+o); const p=h-i; if (p<0||p>=r.content.size) {
              u=!0; continue;
            } const f=n.map(e[d+1]+o, -1)-i; const m=r.content.findIndex(p); const g=m.index; const v=m.offset; const y=r.maybeChild(g); if (y&&v==p&&v+y.nodeSize==f) {
              const b=a[d+2].mapInner(n, y, h+1, e[d]+o+1, s); b!=Et?(a[d]=p, a[d+1]=f, a[d+2]=b):(a[d+1]=-2, u=!0);
            } else u=!0;
          }
        } if (u) {
          const w=It(function(e, t, n, r, i, o, s) {
            function a(e, t) {
              for (let o=0; o<e.local.length; o++) {
                const l=e.local[o].map(r, i, t); l?n.push(l):s.onRemove&&s.onRemove(e.local[o].spec);
              } for (let c=0; c<e.children.length; c+=3)a(e.children[c+2], e.children[c]+t+1);
            } for (let l=0; l<e.length; l+=3)-1==e[l+1]&&a(e[l+2], t[l]+o+1); return n;
          }(a, e, t||[], n, i, o, s), r, 0, s); t=w.local; for (let x=0; x<a.length; x+=3)a[x+1]<0&&(a.splice(x, 3), x-=3); for (let k=0, _=0; k<w.children.length; k+=3) {
            for (let S=w.children[k]; _<a.length&&a[_]<S;)_+=3; a.splice(_, 0, w.children[k], w.children[k+1], w.children[k+2]);
          }
        } return new Dt(t&&t.sort(qt), a);
      }(this.children, o, e, t, n, r, i):o?new Dt(o.sort(qt)):Et;
    }, Dt.prototype.add=function(e, t) {
      return t.length?this==Et?Dt.create(e, t):this.addInner(e, t, 0):this;
    }, Dt.prototype.addInner=function(e, t, n) {
      let r; const i=this; let o=0; e.forEach((function(e, s) {
        let a; const l=s+n; if (a=Lt(t, e, l)) {
          for (r||(r=i.children.slice()); o<r.length&&r[o]<s;)o+=3; r[o]==s?r[o+2]=r[o+2].addInner(e, a, l+1):r.splice(o, 0, s, s+e.nodeSize, It(a, e, l+1, Ot)), o+=3;
        }
      })); const s=At(o?zt(t):t, -n); return new Dt(s.length?this.local.concat(s).sort(qt):this.local, r||this.children);
    }, Dt.prototype.remove=function(e) {
      return 0==e.length||this==Et?this:this.removeInner(e, 0);
    }, Dt.prototype.removeInner=function(e, t) {
      for (var n=this.children, r=this.local, i=0; i<n.length; i+=3) {
        for (var o=void 0, s=n[i]+t, a=n[i+1]+t, l=0, c=void 0; l<e.length; l++)(c=e[l])&&c.from>s&&c.to<a&&(e[l]=null, (o||(o=[])).push(c)); if (o) {
          n==this.children&&(n=this.children.slice()); const u=n[i+2].removeInner(o, s+1); u!=Et?n[i+2]=u:(n.splice(i, 3), i-=3);
        }
      } if (r.length) for (let d=0, h=void 0; d<e.length; d++) if (h=e[d]) for (let p=0; p<r.length; p++)r[p].eq(h, t)&&(r==this.local&&(r=this.local.slice()), r.splice(p--, 1)); return n==this.children&&r==this.local?this:r.length||n.length?new Dt(r, n):Et;
    }, Dt.prototype.forChild=function(e, t) {
      if (this==Et) return this; if (t.isLeaf) return Dt.empty; for (var n, r, i=0; i<this.children.length; i+=3) {
        if (this.children[i]>=e) {
          this.children[i]==e&&(n=this.children[i+2]); break;
        }
      } for (let o=e+1, s=o+t.content.size, a=0; a<this.local.length; a++) {
        const l=this.local[a]; if (l.from<s&&l.to>o&&l.type instanceof _t) {
          const c=Math.max(o, l.from)-o; const u=Math.min(s, l.to)-o; c<u&&(r||(r=[])).push(l.copy(c, u));
        }
      } if (r) {
        const d=new Dt(r.sort(qt)); return n?new Nt([d, n]):d;
      } return n||Et;
    }, Dt.prototype.eq=function(e) {
      if (this==e) return !0; if (!(e instanceof Dt)||this.local.length!=e.local.length||this.children.length!=e.children.length) return !1; for (let t=0; t<this.local.length; t++) if (!this.local[t].eq(e.local[t])) return !1; for (let n=0; n<this.children.length; n+=3) if (this.children[n]!=e.children[n]||this.children[n+1]!=e.children[n+1]||!this.children[n+2].eq(e.children[n+2])) return !1; return !0;
    }, Dt.prototype.locals=function(e) {
      return Ft(this.localsInner(e));
    }, Dt.prototype.localsInner=function(e) {
      if (this==Et) return Tt; if (e.inlineContent||!this.local.some(_t.is)) return this.local; for (var t=[], n=0; n<this.local.length; n++) this.local[n].type instanceof _t||t.push(this.local[n]); return t;
    }; var Et=new Dt; Dt.empty=Et, Dt.removeOverlap=Ft; var Nt=function(e) {
      this.members=e;
    }; function At(e, t) {
      if (!t||!e.length) return e; for (var n=[], r=0; r<e.length; r++) {
        const i=e[r]; n.push(new Ct(i.from+t, i.to+t, i.type));
      } return n;
    } function Lt(e, t, n) {
      if (t.isLeaf) return null; for (var r=n+t.nodeSize, i=null, o=0, s=void 0; o<e.length; o++)(s=e[o])&&s.from>n&&s.to<r&&((i||(i=[])).push(s), e[o]=null); return i;
    } function zt(e) {
      for (var t=[], n=0; n<e.length; n++)null!=e[n]&&t.push(e[n]); return t;
    } function It(e, t, n, r) {
      const i=[]; let o=!1; t.forEach((function(t, s) {
        const a=Lt(e, t, s+n); if (a) {
          o=!0; const l=It(a, t, n+s+1, r); l!=Et&&i.push(s, s+t.nodeSize, l);
        }
      })); for (var s=At(o?zt(e):e, -n).sort(qt), a=0; a<s.length; a++)s[a].type.valid(t, s[a])||(r.onRemove&&r.onRemove(s[a].spec), s.splice(a--, 1)); return s.length||i.length?new Dt(s, i):Et;
    } function qt(e, t) {
      return e.from-t.from||e.to-t.to;
    } function Ft(e) {
      for (var t=e, n=0; n<t.length-1; n++) {
        const r=t[n]; if (r.from!=r.to) {
          for (let i=n+1; i<t.length; i++) {
            const o=t[i]; if (o.from!=r.from) {
              o.from<r.to&&(t==e&&(t=e.slice()), t[n]=r.copy(r.from, o.from), Pt(t, i, r.copy(o.from, r.to))); break;
            }o.to!=r.to&&(t==e&&(t=e.slice()), t[i]=o.copy(o.from, r.to), Pt(t, i+1, o.copy(r.to, o.to)));
          }
        }
      } return t;
    } function Pt(e, t, n) {
      for (;t<e.length&&qt(n, e[t])>0;)t++; e.splice(t, 0, n);
    } function Rt(e) {
      const t=[]; return e.someProp('decorations', (function(n) {
        const r=n(e.state); r&&r!=Et&&t.push(r);
      })), e.cursorWrapper&&t.push(Dt.create(e.state.doc, [e.cursorWrapper.deco])), Nt.from(t);
    }Nt.prototype.forChild=function(e, t) {
      if (t.isLeaf) return Dt.empty; for (var n=[], r=0; r<this.members.length; r++) {
        const i=this.members[r].forChild(e, t); i!=Et&&(i instanceof Nt?n=n.concat(i.members):n.push(i));
      } return Nt.from(n);
    }, Nt.prototype.eq=function(e) {
      if (!(e instanceof Nt)||e.members.length!=this.members.length) return !1; for (let t=0; t<this.members.length; t++) if (!this.members[t].eq(e.members[t])) return !1; return !0;
    }, Nt.prototype.locals=function(e) {
      for (var t, n=!0, r=0; r<this.members.length; r++) {
        const i=this.members[r].localsInner(e); if (i.length) {
          if (t) {
            n&&(t=t.slice(), n=!1); for (let o=0; o<i.length; o++)t.push(i[o]);
          } else t=i;
        }
      } return t?Ft(n?t:t.sort(qt)):Tt;
    }, Nt.from=function(e) {
      switch (e.length) {
        case 0: return Et; case 1: return e[0]; default: return new Nt(e);
      }
    }; var Bt=function(e, t) {
      this._props=t, this.state=t.state, this.dispatch=this.dispatch.bind(this), this._root=null, this.focused=!1, this.trackWrites=null, this.dom=e&&e.mount||document.createElement('div'), e&&(e.appendChild?e.appendChild(this.dom):e.apply?e(this.dom):e.mount&&(this.mounted=!0)), this.editable=Vt(this), this.markCursor=null, this.cursorWrapper=null, Ht(this), this.nodeViews=$t(this), this.docView=X(this.state.doc, Wt(this), Rt(this), this.dom, this), this.lastSelectedViewDesc=null, this.dragging=null, function(e) {
        e.shiftKey=!1, e.mouseDown=null, e.lastKeyCode=null, e.lastKeyCodeTime=0, e.lastClick={time: 0, x: 0, y: 0, type: ''}, e.lastSelectionOrigin=null, e.lastSelectionTime=0, e.lastIOSEnter=0, e.lastIOSEnterFallbackTimeout=null, e.composing=!1, e.composingTimeout=null, e.compositionNodes=[], e.compositionEndedAt=-2e8, e.domObserver=new Ge(e, (function(t, n, o, a) {
          return function(e, t, n, o, a) {
            if (t<0) {
              const l=e.lastSelectionTime>Date.now()-50?e.lastSelectionOrigin:null; const c=pe(e, l); if (c&&!e.state.selection.eq(c)) {
                const u=e.state.tr.setSelection(c); 'pointer'==l?u.setMeta('pointer', !0):'key'==l&&u.scrollIntoView(), e.dispatch(u);
              }
            } else {
              const d=e.state.doc.resolve(t); const h=d.sharedDepth(n); t=d.before(h+1), n=e.state.doc.resolve(n).after(h+1); let p; let f; const m=e.state.selection; const g=function(e, t, n) {
                const r=e.docView.parseRange(t, n); const o=r.node; const a=r.fromOffset; let l=r.toOffset; const c=r.from; const u=r.to; const d=e.root.getSelection(); let h=null; const p=d.anchorNode; if (p&&e.dom.contains(1==p.nodeType?p:p.parentNode)&&(h=[{node: p, offset: d.anchorOffset}], x(d)||h.push({node: d.focusNode, offset: d.focusOffset})), s.chrome&&8===e.lastKeyCode) {
                  for (let f=l; f>a; f--) {
                    const m=o.childNodes[f-1]; const g=m.pmViewDesc; if ('BR'==m.nodeType&&!g) {
                      l=f; break;
                    } if (!g||g.size) break;
                  }
                } const v=e.state.doc; const y=e.someProp('domParser')||i.aw.fromSchema(e.state.schema); const b=v.resolve(c); let w=null; const k=y.parse(o, {topNode: b.parent, topMatch: b.parent.contentMatchAt(b.index()), topOpen: !0, from: a, to: l, preserveWhitespace: !b.parent.type.spec.code||'full', editableContent: !0, findPositions: h, ruleFromNode: Ie, context: b}); if (h&&null!=h[0].pos) {
                  const _=h[0].pos; let S=h[1]&&h[1].pos; null==S&&(S=_), w={anchor: _+c, head: S+c};
                } return {doc: k, sel: w, from: c, to: u};
              }(e, t, n); const v=e.state.doc; const y=v.slice(g.from, g.to); 8===e.lastKeyCode&&Date.now()-100<e.lastKeyCodeTime?(p=e.state.selection.to, f='end'):(p=e.state.selection.from, f='start'), e.lastKeyCode=null; let b=function(e, t, n, r, i) {
                let o=e.findDiffStart(t, n); if (null==o) return null; const s=e.findDiffEnd(t, n+e.size, n+t.size); let a=s.a; let l=s.b; return 'end'==i&&(r-=a+Math.max(0, o-Math.min(a, l))-o), a<o&&e.size<t.size?(l=(o-=r<=o&&r>=a?o-r:0)+(l-a), a=o):l<o&&(a=(o-=r<=o&&r>=l?o-r:0)+(a-l), l=o), {start: o, endA: a, endB: l};
              }(y.content, g.doc.content, g.from, p, f); if (!b) {
                if (!(o&&m instanceof r.Bs&&!m.empty&&m.$head.sameParent(m.$anchor))||e.composing||g.sel&&g.sel.anchor!=g.sel.head) {
                  if (g.sel) {
                    const w=qe(e, e.state.doc, g.sel); w&&!w.eq(e.state.selection)&&e.dispatch(e.state.tr.setSelection(w));
                  } return;
                }b={start: m.from, endA: m.to, endB: m.to};
              }e.domChangeCount++, e.state.selection.from<e.state.selection.to&&b.start==b.endB&&e.state.selection instanceof r.Bs&&(b.start>e.state.selection.from&&b.start<=e.state.selection.from+2?b.start=e.state.selection.from:b.endA<e.state.selection.to&&b.endA>=e.state.selection.to-2&&(b.endB+=e.state.selection.to-b.endA, b.endA=e.state.selection.to)), s.ie&&s.ie_version<=11&&b.endB==b.start+1&&b.endA==b.start&&b.start>g.from&&'  '==g.doc.textBetween(b.start-g.from-1, b.start-g.from+1)&&(b.start--, b.endA--, b.endB--); let _; const S=g.doc.resolveNoCache(b.start-g.from); let C=g.doc.resolveNoCache(b.endB-g.from); const M=S.sameParent(C)&&S.parent.inlineContent; if ((s.ios&&e.lastIOSEnter>Date.now()-225&&(!M||a.some((function(e) {
                return 'DIV'==e.nodeName||'P'==e.nodeName;
              })))||!M&&S.pos<g.doc.content.size&&(_=r.Y1.findFrom(g.doc.resolve(S.pos+1), 1, !0))&&_.head==C.pos)&&e.someProp('handleKeyDown', (function(t) {
                return t(e, k(13, 'Enter'));
              })))e.lastIOSEnter=0; else if (e.state.selection.anchor>b.start&&function(e, t, n, r, i) {
                if (!r.parent.isTextblock||n-t<=i.pos-r.pos||Fe(r, !0, !1)<i.pos) return !1; const o=e.resolve(t); if (o.parentOffset<o.parent.content.size||!o.parent.isTextblock) return !1; const s=e.resolve(Fe(o, !0, !0)); return !(!s.parent.isTextblock||s.pos>n||Fe(s, !0, !1)<n)&&r.parent.content.cut(r.parentOffset).eq(s.parent.content);
              }(v, b.start, b.endA, S, C)&&e.someProp('handleKeyDown', (function(t) {
                return t(e, k(8, 'Backspace'));
              })))s.android&&s.chrome&&e.domObserver.suppressSelectionUpdates(); else {
                s.android&&!M&&S.start()!=C.start()&&0==C.parentOffset&&S.depth==C.depth&&g.sel&&g.sel.anchor==g.sel.head&&g.sel.head==b.endA&&(b.endB-=2, C=g.doc.resolveNoCache(b.endB-g.from), setTimeout((function() {
                  e.someProp('handleKeyDown', (function(t) {
                    return t(e, k(13, 'Enter'));
                  }));
                }), 20)); let T; let O; let D; let E; const N=b.start; const A=b.endA; if (M) {
                  if (S.pos==C.pos) {
                    s.ie&&s.ie_version<=11&&0==S.parentOffset&&(e.domObserver.suppressSelectionUpdates(), setTimeout((function() {
                      return fe(e);
                    }), 20)), T=e.state.tr.delete(N, A), O=v.resolve(b.start).marksAcross(v.resolve(b.endA));
                  } else if (b.endA==b.endB&&(E=v.resolve(b.start))&&(D=function(e, t) {
                    for (var n, r, o, s=e.firstChild.marks, a=t.firstChild.marks, l=s, c=a, u=0; u<a.length; u++)l=a[u].removeFromSet(l); for (let d=0; d<s.length; d++)c=s[d].removeFromSet(c); if (1==l.length&&0==c.length) {
                      r=l[0], n='add', o=function(e) {
                        return e.mark(r.addToSet(e.marks));
                      };
                    } else {
                      if (0!=l.length||1!=c.length) return null; r=c[0], n='remove', o=function(e) {
                        return e.mark(r.removeFromSet(e.marks));
                      };
                    } for (var h=[], p=0; p<t.childCount; p++)h.push(o(t.child(p))); if (i.HY.from(h).eq(e)) return {mark: r, type: n};
                  }(S.parent.content.cut(S.parentOffset, C.parentOffset), E.parent.content.cut(E.parentOffset, b.endA-E.start()))))T=e.state.tr, 'add'==D.type?T.addMark(N, A, D.mark):T.removeMark(N, A, D.mark); else if (S.parent.child(S.index()).isText&&S.index()==C.index()-(C.textOffset?0:1)) {
                    const L=S.parent.textBetween(S.parentOffset, C.parentOffset); if (e.someProp('handleTextInput', (function(t) {
                      return t(e, N, A, L);
                    }))) return; T=e.state.tr.insertText(L, N, A);
                  }
                } if (T||(T=e.state.tr.replace(N, A, g.doc.slice(b.start-g.from, b.endB-g.from))), g.sel) {
                  const z=qe(e, T.doc, g.sel); z&&!(s.chrome&&s.android&&e.composing&&z.empty&&(z.head==N||z.head==T.mapping.map(A)-1)||s.ie&&z.empty&&z.head==N)&&T.setSelection(z);
                }O&&T.ensureMarks(O), e.dispatch(T.scrollIntoView());
              }
            }
          }(e, t, n, o, a);
        })), e.domObserver.start(), e.domChangeCount=0, e.eventHandlers=Object.create(null); const t=function(t) {
          const n=Ze[t]; e.dom.addEventListener(t, e.eventHandlers[t]=function(t) {
            !function(e, t) {
              if (!t.bubbles) return !0; if (t.defaultPrevented) return !1; for (let n=t.target; n!=e.dom; n=n.parentNode) if (!n||11==n.nodeType||n.pmViewDesc&&n.pmViewDesc.stopEvent(t)) return !1; return !0;
            }(e, t)||nt(e, t)||!e.editable&&t.type in Qe||n(e, t);
          });
        }; for (const n in Ze)t(n); s.safari&&e.dom.addEventListener('input', (function() {
          return null;
        })), tt(e);
      }(this), this.pluginViews=[], this.updatePluginViews();
    }; const jt={props: {configurable: !0}, root: {configurable: !0}}; function Wt(e) {
      const t=Object.create(null); return t.class='ProseMirror', t.contenteditable=String(e.editable), e.someProp('attributes', (function(n) {
        if ('function'==typeof n&&(n=n(e.state)), n) for (const r in n)'class'==r?t.class+=' '+n[r]:t[r]||'contenteditable'==r||'nodeName'==r||(t[r]=String(n[r]));
      })), [Ct.node(0, e.state.doc.content.size, t)];
    } function Ht(e) {
      if (e.markCursor) {
        const t=document.createElement('img'); t.setAttribute('mark-placeholder', 'true'), e.cursorWrapper={dom: t, deco: Ct.widget(e.state.selection.head, t, {raw: !0, marks: e.markCursor})};
      } else e.cursorWrapper=null;
    } function Vt(e) {
      return !e.someProp('editable', (function(t) {
        return !1===t(e.state);
      }));
    } function $t(e) {
      const t={}; return e.someProp('nodeViews', (function(e) {
        for (const n in e)Object.prototype.hasOwnProperty.call(t, n)||(t[n]=e[n]);
      })), t;
    }jt.props.get=function() {
      if (this._props.state!=this.state) {
        const e=this._props; for (const t in this._props={}, e) this._props[t]=e[t]; this._props.state=this.state;
      } return this._props;
    }, Bt.prototype.update=function(e) {
      e.handleDOMEvents!=this._props.handleDOMEvents&&tt(this), this._props=e, this.updateStateInner(e.state, !0);
    }, Bt.prototype.setProps=function(e) {
      const t={}; for (const n in this._props)t[n]=this._props[n]; for (const r in t.state=this.state, e)t[r]=e[r]; this.update(t);
    }, Bt.prototype.updateState=function(e) {
      this.updateStateInner(e, this.state.plugins!=e.plugins);
    }, Bt.prototype.updateStateInner=function(e, t) {
      const n=this; const i=this.state; let o=!1; let a=!1; if (e.storedMarks&&this.composing&&(ft(this), a=!0), this.state=e, t) {
        const l=$t(this); (function(e, t) {
          let n=0; let r=0; for (const i in e) {
            if (e[i]!=t[i]) return !0; n++;
          } for (const o in t)r++; return n!=r;
        })(l, this.nodeViews)&&(this.nodeViews=l, o=!0), tt(this);
      } this.editable=Vt(this), Ht(this); const c=Rt(this); const u=Wt(this); const d=t?'reset':e.scrollToSelection>i.scrollToSelection?'to selection':'preserve'; const h=o||!this.docView.matchesNode(e.doc, u, c); !h&&e.selection.eq(i.selection)||(a=!0); let p; let f; let m; let v; let y; let b; let w; let x; let k; let _; const S='preserve'==d&&a&&null==this.dom.style.overflowAnchor&&function(e) {
        for (var t, n, r=e.dom.getBoundingClientRect(), i=Math.max(0, r.top), o=(r.left+r.right)/2, s=i+1; s<Math.min(innerHeight, r.bottom); s+=5) {
          const a=e.root.elementFromPoint(o, s); if (a!=e.dom&&e.dom.contains(a)) {
            const l=a.getBoundingClientRect(); if (l.top>=i-20) {
              t=a, n=l.top; break;
            }
          }
        } return {refDOM: t, refTop: n, stack: T(e.dom)};
      }(this); if (a) {
        this.domObserver.stop(); let C=h&&(s.ie||s.chrome)&&!this.composing&&!i.selection.empty&&!e.selection.empty&&(v=i.selection, y=e.selection, b=Math.min(v.$anchor.sharedDepth(v.head), y.$anchor.sharedDepth(y.head)), v.$anchor.start(b)!=y.$anchor.start(b)); if (h) {
          const D=s.chrome?this.trackWrites=this.root.getSelection().focusNode:null; !o&&this.docView.update(e.doc, u, c, this)||(this.docView.updateOuterDeco([]), this.docView.destroy(), this.docView=X(e.doc, u, c, this.dom, this)), D&&!this.trackWrites&&(C=!0);
        }C||!(this.mouseDown&&this.domObserver.currentSelection.eq(this.root.getSelection())&&(p=this, f=p.docView.domFromPos(p.state.selection.anchor), m=p.root.getSelection(), g(f.node, f.offset, m.anchorNode, m.anchorOffset)))?fe(this, C):(be(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
      } if (this.updatePluginViews(i), 'reset'==d) this.dom.scrollTop=0; else if ('to selection'==d) {
        const E=this.root.getSelection().focusNode; this.someProp('handleScrollToSelection', (function(e) {
          return e(n);
        }))||(e.selection instanceof r.qv?M(this, this.docView.domAfterPos(e.selection.from).getBoundingClientRect(), E):M(this, this.coordsAtPos(e.selection.head, 1), E));
      } else S&&(x=(w=S).refDOM, k=w.refTop, O(w.stack, 0==(_=x?x.getBoundingClientRect().top:0)?0:_-k));
    }, Bt.prototype.destroyPluginViews=function() {
      for (var e; e=this.pluginViews.pop();)e.destroy&&e.destroy();
    }, Bt.prototype.updatePluginViews=function(e) {
      if (e&&e.plugins==this.state.plugins) {
        for (let t=0; t<this.pluginViews.length; t++) {
          const n=this.pluginViews[t]; n.update&&n.update(this, e);
        }
      } else {
        this.destroyPluginViews(); for (let r=0; r<this.state.plugins.length; r++) {
          const i=this.state.plugins[r]; i.spec.view&&this.pluginViews.push(i.spec.view(this));
        }
      }
    }, Bt.prototype.someProp=function(e, t) {
      let n; const r=this._props&&this._props[e]; if (null!=r&&(n=t?t(r):r)) return n; const i=this.state.plugins; if (i) {
        for (let o=0; o<i.length; o++) {
          const s=i[o].props[e]; if (null!=s&&(n=t?t(s):s)) return n;
        }
      }
    }, Bt.prototype.hasFocus=function() {
      return this.root.activeElement==this.dom;
    }, Bt.prototype.focus=function() {
      this.domObserver.stop(), this.editable&&function(e) {
        if (e.setActive) return e.setActive(); if (D) return e.focus(D); const t=T(e); e.focus(null==D?{get preventScroll() {
          return D={preventScroll: !0}, !0;
        }}:void 0), D||(D=!1, O(t, 0));
      }(this.dom), fe(this), this.domObserver.start();
    }, jt.root.get=function() {
      const e=this._root; if (null==e) {
        for (let t=this.dom.parentNode; t; t=t.parentNode) {
          if (9==t.nodeType||11==t.nodeType&&t.host) {
            return t.getSelection||(Object.getPrototypeOf(t).getSelection=function() {
              return document.getSelection();
            }), this._root=t;
          }
        }
      } return e||document;
    }, Bt.prototype.posAtCoords=function(e) {
      return L(this, e);
    }, Bt.prototype.coordsAtPos=function(e, t) {
      return void 0===t&&(t=1), q(this, e, t);
    }, Bt.prototype.domAtPos=function(e) {
      return this.docView.domFromPos(e);
    }, Bt.prototype.nodeDOM=function(e) {
      const t=this.docView.descAt(e); return t?t.nodeDOM:null;
    }, Bt.prototype.posAtDOM=function(e, t, n) {
      void 0===n&&(n=-1); const r=this.docView.posFromDOM(e, t, n); if (null==r) throw new RangeError('DOM position not inside the editor'); return r;
    }, Bt.prototype.endOfTextblock=function(e, t) {
      return function(e, t, n) {
        return j==t&&W==n?H:(j=t, W=n, H='up'==n||'down'==n?function(e, t, n) {
          const r=t.selection; const i='up'==n?r.$anchor.min(r.$head):r.$anchor.max(r.$head); return R(e, t, (function() {
            for (var t=e.docView.domFromPos(i.pos).node; ;) {
              const r=e.docView.nearestDesc(t, !0); if (!r) break; if (r.node.isBlock) {
                t=r.dom; break;
              }t=r.dom.parentNode;
            } for (let o=q(e, i.pos, 1), s=t.firstChild; s; s=s.nextSibling) {
              let a=void 0; if (1==s.nodeType)a=s.getClientRects(); else {
                if (3!=s.nodeType) continue; a=m(s, 0, s.nodeValue.length).getClientRects();
              } for (let l=0; l<a.length; l++) {
                const c=a[l]; if (c.bottom>c.top&&('up'==n?c.bottom<o.top+1:c.top>o.bottom-1)) return !1;
              }
            } return !0;
          }));
        }(e, t, n):function(e, t, n) {
          const r=t.selection.$head; if (!r.parent.isTextblock) return !1; const i=r.parentOffset; const o=!i; const s=i==r.parent.content.size; const a=getSelection(); return B.test(r.parent.textContent)&&a.modify?R(e, t, (function() {
            const t=a.getRangeAt(0); const i=a.focusNode; const o=a.focusOffset; const s=a.caretBidiLevel; a.modify('move', n, 'character'); const l=!(r.depth?e.docView.domAfterPos(r.before()):e.dom).contains(1==a.focusNode.nodeType?a.focusNode:a.focusNode.parentNode)||i==a.focusNode&&o==a.focusOffset; return a.removeAllRanges(), a.addRange(t), null!=s&&(a.caretBidiLevel=s), l;
          })):'left'==n||'backward'==n?o:s;
        }(e, t, n));
      }(this, t||this.state, e);
    }, Bt.prototype.destroy=function() {
      this.docView&&(function(e) {
        for (const t in e.domObserver.stop(), e.eventHandlers)e.dom.removeEventListener(t, e.eventHandlers[t]); clearTimeout(e.composingTimeout), clearTimeout(e.lastIOSEnterFallbackTimeout);
      }(this), this.destroyPluginViews(), this.mounted?(this.docView.update(this.state.doc, [], Rt(this), this), this.dom.textContent=''):this.dom.parentNode&&this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView=null);
    }, Bt.prototype.dispatchEvent=function(e) {
      return function(e, t) {
        nt(e, t)||!Ze[t.type]||!e.editable&&t.type in Qe||Ze[t.type](e, t);
      }(this, e);
    }, Bt.prototype.dispatch=function(e) {
      const t=this._props.dispatchTransaction; t?t.call(this, e):this.updateState(this.state.apply(e));
    }, Object.defineProperties(Bt.prototype, jt);
  }, 51: (e, t, n)=>{
    'use strict'; n(955), n(922), n(631), n(189), n(629), n(258), n(425), n(411), n(876), n(47), n(131), n(702), n(354), n(149), n(86), n(589);
  }, 43: (e, t, n)=>{
    'use strict'; const i=n(922); const o=n(638); const s=n(780); const a=()=>new Map; const l=(e)=>{
      const t=a(); return e.forEach(((e, n)=>{
        t.set(n, e);
      })), t;
    }; const c=(e, t, n)=>{
      let r=e.get(t); return void 0===r&&e.set(t, r=n()), r;
    }; const u=()=>new Set; const d=(e)=>e[e.length-1]; const h=(e, t)=>{
      for (let n=0; n<t.length; n++)e.push(t[n]);
    }; const p=Array.from; class f {
      constructor() {
        this._observers=a();
      }on(e, t) {
        c(this._observers, e, u).add(t);
      }once(e, t) {
        const n=(...r)=>{
          this.off(e, n), t(...r);
        }; this.on(e, n);
      }off(e, t) {
        const n=this._observers.get(e); void 0!==n&&(n.delete(t), 0===n.size&&this._observers.delete(e));
      }emit(e, t) {
        return p((this._observers.get(e)||a()).values()).forEach(((e)=>e(...t)));
      }destroy() {
        this._observers=a();
      }
    } const m=Math.floor; const g=(Math.ceil, Math.abs); const v=(Math.imul, Math.round, Math.log10); const y=(Math.log2, Math.log, Math.sqrt, (e, t)=>e<t?e:t); const b=(e, t)=>e>t?e:t; const w=(Number.isNaN, Math.pow, Math.sign, (e)=>0!==e?e<0:1/e<0); const x=String.fromCharCode; const k=(String.fromCodePoint, /^\s*/g); const _=/([A-Z])/g; const S=(e, t)=>((e)=>e.replace(k, ''))(e.replace(_, ((e)=>`${t}${((e)=>e.toLowerCase())(e)}`))); 'undefined'!=typeof TextEncoder&&new TextEncoder; let C='undefined'==typeof TextDecoder?null:new TextDecoder('utf-8', {fatal: !0, ignoreBOM: !0}); C&&1===C.decode(new Uint8Array).length&&(C=null); let M=new class {
      constructor() {
        this.map=new Map;
      }setItem(e, t) {
        this.map.set(e, t);
      }getItem(e) {
        return this.map.get(e);
      }
    }; try {
      'undefined'!=typeof localStorage&&(M=localStorage);
    } catch (e) {} const T=M; const O='undefined'!=typeof process&&process.release&&/node|io\.js/.test(process.release.name); const D='undefined'!=typeof window&&!O; let E; 'undefined'!=typeof navigator&&/Mac/.test(navigator.platform); const N=[]; ((e)=>(()=>{
      if (void 0===E) {
        if (O) {
          E=a(); const e=process.argv; let t=null; for (let n=0; n<e.length; n++) {
            const r=e[n]; '-'===r[0]?(null!==t&&E.set(t, ''), t=r):null!==t?(E.set(t, r), t=null):N.push(r);
          }null!==t&&E.set(t, '');
        } else {
'object'==typeof location?(E=a(), (location.search||'?').slice(1).split('&').forEach(((e)=>{
  if (0!==e.length) {
    const [t, n]=e.split('='); E.set(`--${S(t, '-')}`, n), E.set(`-${S(t, '-')}`, n);
  }
}))):E=a();
        }
      } return E;
    })().has(e))('--'+'production')||((e)=>{
      return void 0===(t=O?process.env[e.toUpperCase()]:T.getItem(e))?null:t; let t;
    })('production'); const A=(e)=>new Uint8Array(e); const L=(e, t, n)=>new Uint8Array(e, t, n); const z=D?(e)=>{
      let t=''; for (let n=0; n<e.byteLength; n++)t+=x(e[n]); return btoa(t);
    }:(e)=>Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString('base64'); const I=D?(e)=>{
      const t=atob(e); const n=A(t.length); for (let e=0; e<t.length; e++)n[e]=t.charCodeAt(e); return n;
    }:(e)=>{
      const t=Buffer.from(e, 'base64'); return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    }; const q=128; const F=127; const P=(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.isInteger||((e)=>'number'==typeof e&&isFinite(e)&&m(e)===e)); Number.isNaN; class R {
      constructor() {
        this.cpos=0, this.cbuf=new Uint8Array(100), this.bufs=[];
      }
    } const B=()=>new R; const j=(e)=>{
      let t=e.cpos; for (let n=0; n<e.bufs.length; n++)t+=e.bufs[n].length; return t;
    }; const W=(e)=>{
      const t=new Uint8Array(j(e)); let n=0; for (let r=0; r<e.bufs.length; r++) {
        const i=e.bufs[r]; t.set(i, n), n+=i.length;
      } return t.set(L(e.cbuf.buffer, 0, e.cpos), n), t;
    }; const H=(e, t)=>{
      const n=e.cbuf.length; e.cpos===n&&(e.bufs.push(e.cbuf), e.cbuf=new Uint8Array(2*n), e.cpos=0), e.cbuf[e.cpos++]=t;
    }; const V=H; const $=(e, t)=>{
      for (;t>F;)H(e, q|F&t), t>>>=7; H(e, F&t);
    }; const U=(e, t)=>{
      const n=w(t); for (n&&(t=-t), H(e, (t>63?q:0)|(n?64:0)|63&t), t>>>=6; t>0;)H(e, (t>F?q:0)|F&t), t>>>=7;
    }; const K=(e, t)=>{
      const n=unescape(encodeURIComponent(t)); const r=n.length; $(e, r); for (let t=0; t<r; t++)H(e, n.codePointAt(t));
    }; const J=(e, t)=>{
      const n=e.cbuf.length; const r=e.cpos; const i=y(n-r, t.length); const o=t.length-i; e.cbuf.set(t.subarray(0, i), r), e.cpos+=i, o>0&&(e.bufs.push(e.cbuf), e.cbuf=new Uint8Array(b(2*n, o)), e.cbuf.set(t.subarray(i)), e.cpos=o);
    }; const Y=(e, t)=>{
      $(e, t.byteLength), J(e, t);
    }; const G=(e, t)=>{
      ((e, t)=>{
        const n=e.cbuf.length; n-e.cpos<t&&(e.bufs.push(L(e.cbuf.buffer, 0, e.cpos)), e.cbuf=new Uint8Array(2*b(n, t)), e.cpos=0);
      })(e, t); const n=new DataView(e.cbuf.buffer, e.cpos, t); return e.cpos+=t, n;
    }; const X=new DataView(new ArrayBuffer(4)); const Z=(e, t)=>{
      switch (typeof t) {
        case 'string': H(e, 119), K(e, t); break; case 'number': P(t)&&t<=2147483647?(H(e, 125), U(e, t)):(n=t, X.setFloat32(0, n), X.getFloat32(0)===n?(H(e, 124), ((e, t)=>{
          G(e, 4).setFloat32(0, t);
        })(e, t)):(H(e, 123), ((e, t)=>{
          G(e, 8).setFloat64(0, t);
        })(e, t))); break; case 'bigint': H(e, 122), ((e, t)=>{
          G(e, 8).setBigInt64(0, t);
        })(e, t); break; case 'object': if (null===t)H(e, 126); else if (t instanceof Array) {
          H(e, 117), $(e, t.length); for (let n=0; n<t.length; n++)Z(e, t[n]);
        } else if (t instanceof Uint8Array)H(e, 116), Y(e, t); else {
          H(e, 118); const n=Object.keys(t); $(e, n.length); for (let r=0; r<n.length; r++) {
            const i=n[r]; K(e, i), Z(e, t[i]);
          }
        } break; case 'boolean': H(e, t?120:121); break; default: H(e, 127);
      } let n;
    }; class Q extends R {
      constructor(e) {
        super(), this.w=e, this.s=null, this.count=0;
      }write(e) {
this.s===e?this.count++:(this.count>0&&$(this, this.count-1), this.count=1, this.w(this, e), this.s=e);
      }
    } const ee=(e)=>{
      e.count>0&&(U(e.encoder, 1===e.count?e.s:-e.s), e.count>1&&$(e.encoder, e.count-2));
    }; class te {
      constructor() {
        this.encoder=new R, this.s=0, this.count=0;
      }write(e) {
this.s===e?this.count++:(ee(this), this.count=1, this.s=e);
      }toUint8Array() {
        return ee(this), W(this.encoder);
      }
    } const ne=(e)=>{
      if (e.count>0) {
        const t=e.diff<<1|(1===e.count?0:1); U(e.encoder, t), e.count>1&&$(e.encoder, e.count-2);
      }
    }; class re {
      constructor() {
        this.encoder=new R, this.s=0, this.count=0, this.diff=0;
      }write(e) {
this.diff===e-this.s?(this.s=e, this.count++):(ne(this), this.count=1, this.diff=e-this.s, this.s=e);
      }toUint8Array() {
        return ne(this), W(this.encoder);
      }
    } class ie {
      constructor() {
        this.sarr=[], this.s='', this.lensE=new te;
      }write(e) {
        this.s+=e, this.s.length>19&&(this.sarr.push(this.s), this.s=''), this.lensE.write(e.length);
      }toUint8Array() {
        const e=new R; return this.sarr.push(this.s), this.s='', K(e, this.sarr.join('')), J(e, this.lensE.toUint8Array()), W(e);
      }
    } class oe {
      constructor(e) {
        this.arr=e, this.pos=0;
      }
    } const se=(e)=>new oe(e); const ae=(e)=>((e, t)=>{
      const n=L(e.arr.buffer, e.pos+e.arr.byteOffset, t); return e.pos+=t, n;
    })(e, ce(e)); const le=(e)=>e.arr[e.pos++]; const ce=(e)=>{
      let t=0; let n=0; for (;;) {
        const r=e.arr[e.pos++]; if (t|=(r&F)<<n, n+=7, r<q) return t>>>0; if (n>35) throw new Error('Integer out of range!');
      }
    }; const ue=(e)=>{
      let t=e.arr[e.pos++]; let n=63&t; let r=6; const i=(64&t)>0?-1:1; if (0==(t&q)) return i*n; for (;;) {
        if (t=e.arr[e.pos++], n|=(t&F)<<r, r+=7, t<q) return i*(n>>>0); if (r>41) throw new Error('Integer out of range!');
      }
    }; const de=(e)=>{
      let t=ce(e); if (0===t) return ''; {let n=String.fromCodePoint(le(e)); if (--t<100) for (;t--;)n+=String.fromCodePoint(le(e)); else {
        for (;t>0;) {
          const r=t<1e4?t:1e4; const i=e.arr.subarray(e.pos, e.pos+r); e.pos+=r, n+=String.fromCodePoint.apply(null, i), t-=r;
        }
      } return decodeURIComponent(escape(n));}
    }; const he=(e, t)=>{
      const n=new DataView(e.arr.buffer, e.arr.byteOffset+e.pos, t); return e.pos+=t, n;
    }; const pe=[(e)=>{}, (e)=>null, ue, (e)=>he(e, 4).getFloat32(0), (e)=>he(e, 8).getFloat64(0), (e)=>he(e, 8).getBigInt64(0), (e)=>!1, (e)=>!0, de, (e)=>{
      const t=ce(e); const n={}; for (let r=0; r<t; r++)n[de(e)]=fe(e); return n;
    }, (e)=>{
      const t=ce(e); const n=[]; for (let r=0; r<t; r++)n.push(fe(e)); return n;
    }, ae]; const fe=(e)=>pe[127-le(e)](e); class me extends oe {
      constructor(e, t) {
        super(e), this.reader=t, this.s=null, this.count=0;
      }read() {
        return 0===this.count&&(this.s=this.reader(this), (e=this).pos!==e.arr.length?this.count=ce(this)+1:this.count=-1), this.count--, this.s; let e;
      }
    } class ge extends oe {
      constructor(e) {
        super(e), this.s=0, this.count=0;
      }read() {
        if (0===this.count) {
          this.s=ue(this); const e=w(this.s); this.count=1, e&&(this.s=-this.s, this.count=ce(this)+2);
        } return this.count--, this.s;
      }
    } class ve extends oe {
      constructor(e) {
        super(e), this.s=0, this.count=0, this.diff=0;
      }read() {
        if (0===this.count) {
          const e=ue(this); const t=1&e; this.diff=e>>1, this.count=1, t&&(this.count=ce(this)+2);
        } return this.s+=this.diff, this.count--, this.s;
      }
    } class ye {
      constructor(e) {
        this.decoder=new ge(e), this.str=de(this.decoder), this.spos=0;
      }read() {
        const e=this.spos+this.decoder.read(); const t=this.str.slice(this.spos, e); return this.spos=e, t;
      }
    } const be=n(448); be.S; const we=be.n; const xe=Math.random; const ke=()=>new Uint32Array(we(4))[0]; const _e=[1e7]+-1e3+-4e3+-8e3+-1e11; const Se=()=>_e.replace(/[018]/g, ((e)=>(e^ke()&15>>e/4).toString(16))); const Ce=(e)=>new Error(e); const Me=()=>{
      throw Ce('Method unimplemented');
    }; const Te=()=>{
      throw Ce('Unexpected case');
    }; const Oe=(Object.assign, Object.keys); const De=(e)=>Oe(e).length; const Ee=(e, t)=>Object.prototype.hasOwnProperty.call(e, t); const Ne=(e, t, n=0)=>{
      try {
        for (;n<e.length; n++)e[n](...t);
      } finally {
        n<e.length&&Ne(e, t, n+1);
      }
    }; const Ae=(e, t)=>{
      if (null==e||null==t) return ((e, t)=>e===t)(e, t); if (e.constructor!==t.constructor) return !1; if (e===t) return !0; switch (e.constructor) {
        case ArrayBuffer: e=new Uint8Array(e), t=new Uint8Array(t); case Uint8Array: if (e.byteLength!==t.byteLength) return !1; for (let n=0; n<e.length; n++) if (e[n]!==t[n]) return !1; break; case Set: if (e.size!==t.size) return !1; for (const n of e) if (!t.has(n)) return !1; break; case Map: if (e.size!==t.size) return !1; for (const n of e.keys()) if (!t.has(n)||!Ae(e.get(n), t.get(n))) return !1; break; case Object: if (De(e)!==De(t)) return !1; for (const n in e) if (!Ee(e, n)||!Ae(e[n], t[n])) return !1; break; case Array: if (e.length!==t.length) return !1; for (let n=0; n<e.length; n++) if (!Ae(e[n], t[n])) return !1; break; default: return !1;
      } return !0;
    }; const Le=Symbol; class ze {
      constructor(e, t) {
        this.left=e, this.right=t;
      }
    } const Ie=(e, t)=>new ze(e, t); const qe='undefined'!=typeof document?document:{}; const Fe=('undefined'!=typeof DOMParser&&new DOMParser, qe.ELEMENT_NODE, qe.TEXT_NODE, qe.CDATA_SECTION_NODE, qe.COMMENT_NODE, qe.DOCUMENT_NODE, qe.DOCUMENT_TYPE_NODE, qe.DOCUMENT_FRAGMENT_NODE, Date.now); const Pe=Le(); const Re=Le(); const Be=Le(); const je=Le(); const We=Le(); const He=Le(); const Ve=Le(); const $e=Le(); const Ue=Le(); const Ke={[Pe]: Ie('font-weight', 'bold'), [Re]: Ie('font-weight', 'normal'), [Be]: Ie('color', 'blue'), [We]: Ie('color', 'green'), [je]: Ie('color', 'grey'), [He]: Ie('color', 'red'), [Ve]: Ie('color', 'purple'), [$e]: Ie('color', 'orange'), [Ue]: Ie('color', 'black')}; const Je={[Pe]: '[1m', [Re]: '[2m', [Be]: '[34m', [We]: '[32m', [je]: '[37m', [He]: '[31m', [Ve]: '[35m', [$e]: '[38;5;208m', [Ue]: '[0m'}; const Ye=O?(e)=>{
      const t=[]; const n=[]; let r=0; for (;r<e.length; r++) {
        const n=e[r]; const i=Je[n]; if (void 0!==i)t.push(i); else {
          if (n.constructor!==String&&n.constructor!==Number) break; t.push(n);
        }
      } for (r>0&&(t.push('[0m'), n.push(t.join(''))); r<e.length; r++) {
        const t=e[r]; t instanceof Symbol||n.push(t);
      } return n;
    }:(e)=>{
      const t=[]; const n=[]; const r=a(); let i=[]; let o=0; for (;o<e.length; o++) {
        const i=e[o]; const s=Ke[i]; if (void 0!==s)r.set(s.left, s.right); else {
          if (i.constructor!==String&&i.constructor!==Number) break; {const e=((e, t)=>{
            const n=[]; for (const [r, i] of e)n.push(t(i, r)); return n;
          })(r, ((e, t)=>`${t}:${e};`)).join(''); o>0||e.length>0?(t.push('%c'+i), n.push(e)):t.push(i);}
        }
      } for (o>0&&(i=n, i.unshift(t.join(''))); o<e.length; o++) {
        const t=e[o]; t instanceof Symbol||i.push(t);
      } return i;
    }; const Ge=new Set; Fe(); const Xe=(e)=>({[Symbol.iterator]() {
      return this;
    }, next: e}); const Ze=(e, t)=>Xe((()=>{
      const {done: n, value: r}=e.next(); return {done: n, value: n?void 0:t(r)};
    })); class Qe {
      constructor(e, t) {
        this.clock=e, this.len=t;
      }
    } class et {
      constructor() {
        this.clients=new Map;
      }
    } const tt=(e, t, n)=>t.clients.forEach(((t, r)=>{
      const i=e.doc.store.clients.get(r); for (let r=0; r<t.length; r++) {
        const o=t[r]; en(e, i, o.clock, o.len, n);
      }
    })); const nt=(e, t)=>{
      const n=e.clients.get(t.client); return void 0!==n&&null!==((e, t)=>{
        let n=0; let r=e.length-1; for (;n<=r;) {
          const i=m((n+r)/2); const o=e[i]; const s=o.clock; if (s<=t) {
            if (t<s+o.len) return i; n=i+1;
          } else r=i-1;
        } return null;
      })(n, t.clock);
    }; const rt=(e)=>{
      e.clients.forEach(((e)=>{
        let t; let n; for (e.sort(((e, t)=>e.clock-t.clock)), t=1, n=1; t<e.length; t++) {
          const r=e[n-1]; const i=e[t]; r.clock+r.len===i.clock?r.len+=i.len:(n<t&&(e[n]=i), n++);
        }e.length=n;
      }));
    }; const it=(e, t, n, r)=>{
      c(e.clients, t, (()=>[])).push(new Qe(n, r));
    }; const ot=()=>new et; const st=(e)=>{
      const t=ot(); return e.clients.forEach(((e, n)=>{
        const r=[]; for (let t=0; t<e.length; t++) {
          const n=e[t]; if (n.deleted) {
            const i=n.id.clock; let o=n.length; if (t+1<e.length) for (let n=e[t+1]; t+1<e.length&&n.id.clock===i+o&&n.deleted; n=e[1+ ++t])o+=n.length; r.push(new Qe(i, o));
          }
        }r.length>0&&t.clients.set(n, r);
      })), t;
    }; const at=(e, t)=>{
      $(e.restEncoder, t.clients.size), t.clients.forEach(((t, n)=>{
        e.resetDsCurVal(), $(e.restEncoder, n); const r=t.length; $(e.restEncoder, r); for (let n=0; n<r; n++) {
          const r=t[n]; e.writeDsClock(r.clock), e.writeDsLen(r.len);
        }
      }));
    }; const lt=(e, t, n)=>{
      const r=new et; const i=ce(e.restDecoder); for (let o=0; o<i; o++) {
        e.resetDsCurVal(); const i=ce(e.restDecoder); const o=ce(e.restDecoder); const s=n.clients.get(i)||[]; const a=Kt(n, i); for (let n=0; n<o; n++) {
          const n=e.readDsClock(); const o=n+e.readDsLen(); if (n<a) {
            a<o&&it(r, i, a, o-a); let e=Yt(s, n); let l=s[e]; for (!l.deleted&&l.id.clock<n&&(s.splice(e+1, 0, Cr(t, l, n-l.id.clock)), e++); e<s.length&&(l=s[e++], l.id.clock<o);)l.deleted||(o<l.id.clock+l.length&&s.splice(e, 0, Cr(t, l, o-l.id.clock)), l.delete(t));
          } else it(r, i, n, o-n);
        }
      } if (r.clients.size>0) {
        const e=new mt; at(e, r), n.pendingDeleteReaders.push(new ht(se(e.toUint8Array())));
      }
    }; const ct=ke; class ut extends f {
      constructor({guid: e=Se(), gc: t=!0, gcFilter: n=(()=>!0), meta: r=null, autoLoad: i=!1}={}) {
        super(), this.gc=t, this.gcFilter=n, this.clientID=ct(), this.guid=e, this.share=new Map, this.store=new $t, this._transaction=null, this._transactionCleanups=[], this.subdocs=new Set, this._item=null, this.shouldLoad=i, this.autoLoad=i, this.meta=r;
      }load() {
        const e=this._item; null===e||this.shouldLoad||an(e.parent.doc, ((e)=>{
          e.subdocsLoaded.add(this);
        }), null, !0), this.shouldLoad=!0;
      }getSubdocs() {
        return this.subdocs;
      }getSubdocGuids() {
        return new Set(Array.from(this.subdocs).map(((e)=>e.guid)));
      }transact(e, t=null) {
        an(this, e, t);
      }get(e, t=bn) {
        const n=c(this.share, e, (()=>{
          const e=new t; return e._integrate(this, null), e;
        })); const r=n.constructor; if (t!==bn&&r!==t) {
          if (r===bn) {
            const r=new t; r._map=n._map, n._map.forEach(((e)=>{
              for (;null!==e; e=e.left)e.parent=r;
            })), r._start=n._start; for (let e=r._start; null!==e; e=e.right)e.parent=r; return r._length=n._length, this.share.set(e, r), r._integrate(this, null), r;
          } throw new Error(`Type with the name ${e} has already been defined with a different constructor`);
        } return n;
      }getArray(e='') {
        return this.get(e, In);
      }getText(e='') {
        return this.get(e, Xn);
      }getMap(e='') {
        return this.get(e, Fn);
      }getXmlFragment(e='') {
        return this.get(e, Qn);
      }toJSON() {
        const e={}; return this.share.forEach(((t, n)=>{
          e[n]=t.toJSON();
        })), e;
      }destroy() {
        p(this.subdocs).forEach(((e)=>e.destroy())); const e=this._item; if (null!==e) {
          this._item=null; const t=e.content; e.deleted?t.doc=null:(t.doc=new ut({guid: this.guid, ...t.opts}), t.doc._item=e), an(e.parent.doc, ((n)=>{
            e.deleted||n.subdocsAdded.add(t.doc), n.subdocsRemoved.add(this);
          }), null, !0);
        } this.emit('destroyed', [!0]), super.destroy();
      }on(e, t) {
        super.on(e, t);
      }off(e, t) {
        super.off(e, t);
      }
    } class dt {
      constructor(e) {
        this.restDecoder=e;
      }resetDsCurVal() {}readDsClock() {
        return ce(this.restDecoder);
      }readDsLen() {
        return ce(this.restDecoder);
      }
    } class ht {
      constructor(e) {
        this.dsCurrVal=0, this.restDecoder=e;
      }resetDsCurVal() {
        this.dsCurrVal=0;
      }readDsClock() {
        return this.dsCurrVal+=ce(this.restDecoder), this.dsCurrVal;
      }readDsLen() {
        const e=ce(this.restDecoder)+1; return this.dsCurrVal+=e, e;
      }
    } class pt extends ht {
      constructor(e) {
        super(e), this.keys=[], le(e), this.keyClockDecoder=new ve(ae(e)), this.clientDecoder=new ge(ae(e)), this.leftClockDecoder=new ve(ae(e)), this.rightClockDecoder=new ve(ae(e)), this.infoDecoder=new me(ae(e), le), this.stringDecoder=new ye(ae(e)), this.parentInfoDecoder=new me(ae(e), le), this.typeRefDecoder=new ge(ae(e)), this.lenDecoder=new ge(ae(e));
      }readLeftID() {
        return new Et(this.clientDecoder.read(), this.leftClockDecoder.read());
      }readRightID() {
        return new Et(this.clientDecoder.read(), this.rightClockDecoder.read());
      }readClient() {
        return this.clientDecoder.read();
      }readInfo() {
        return this.infoDecoder.read();
      }readString() {
        return this.stringDecoder.read();
      }readParentInfo() {
        return 1===this.parentInfoDecoder.read();
      }readTypeRef() {
        return this.typeRefDecoder.read();
      }readLen() {
        return this.lenDecoder.read();
      }readAny() {
        return fe(this.restDecoder);
      }readBuf() {
        return ae(this.restDecoder);
      }readJSON() {
        return fe(this.restDecoder);
      }readKey() {
        const e=this.keyClockDecoder.read(); if (e<this.keys.length) return this.keys[e]; {const e=this.stringDecoder.read(); return this.keys.push(e), e;}
      }
    } class ft {
      constructor() {
        this.restEncoder=new R;
      }toUint8Array() {
        return W(this.restEncoder);
      }resetDsCurVal() {}writeDsClock(e) {
        $(this.restEncoder, e);
      }writeDsLen(e) {
        $(this.restEncoder, e);
      }
    } class mt {
      constructor() {
        this.restEncoder=new R, this.dsCurrVal=0;
      }toUint8Array() {
        return W(this.restEncoder);
      }resetDsCurVal() {
        this.dsCurrVal=0;
      }writeDsClock(e) {
        const t=e-this.dsCurrVal; this.dsCurrVal=e, $(this.restEncoder, t);
      }writeDsLen(e) {
        0===e&&Te(), $(this.restEncoder, e-1), this.dsCurrVal+=e;
      }
    } class gt extends mt {
      constructor() {
        super(), this.keyMap=new Map, this.keyClock=0, this.keyClockEncoder=new re, this.clientEncoder=new te, this.leftClockEncoder=new re, this.rightClockEncoder=new re, this.infoEncoder=new Q(V), this.stringEncoder=new ie, this.parentInfoEncoder=new Q(V), this.typeRefEncoder=new te, this.lenEncoder=new te;
      }toUint8Array() {
        const e=B(); return V(e, 0), Y(e, this.keyClockEncoder.toUint8Array()), Y(e, this.clientEncoder.toUint8Array()), Y(e, this.leftClockEncoder.toUint8Array()), Y(e, this.rightClockEncoder.toUint8Array()), Y(e, W(this.infoEncoder)), Y(e, this.stringEncoder.toUint8Array()), Y(e, W(this.parentInfoEncoder)), Y(e, this.typeRefEncoder.toUint8Array()), Y(e, this.lenEncoder.toUint8Array()), J(e, W(this.restEncoder)), W(e);
      }writeLeftID(e) {
        this.clientEncoder.write(e.client), this.leftClockEncoder.write(e.clock);
      }writeRightID(e) {
        this.clientEncoder.write(e.client), this.rightClockEncoder.write(e.clock);
      }writeClient(e) {
        this.clientEncoder.write(e);
      }writeInfo(e) {
        this.infoEncoder.write(e);
      }writeString(e) {
        this.stringEncoder.write(e);
      }writeParentInfo(e) {
        this.parentInfoEncoder.write(e?1:0);
      }writeTypeRef(e) {
        this.typeRefEncoder.write(e);
      }writeLen(e) {
        this.lenEncoder.write(e);
      }writeAny(e) {
        Z(this.restEncoder, e);
      }writeBuf(e) {
        Y(this.restEncoder, e);
      }writeJSON(e) {
        Z(this.restEncoder, e);
      }writeKey(e) {
void 0===this.keyMap.get(e)?(this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(e)):this.keyClockEncoder.write(this.keyClock++);
      }
    } const vt=ft; const yt=dt; const bt=class extends ft {
      writeLeftID(e) {
        $(this.restEncoder, e.client), $(this.restEncoder, e.clock);
      }writeRightID(e) {
        $(this.restEncoder, e.client), $(this.restEncoder, e.clock);
      }writeClient(e) {
        $(this.restEncoder, e);
      }writeInfo(e) {
        V(this.restEncoder, e);
      }writeString(e) {
        K(this.restEncoder, e);
      }writeParentInfo(e) {
        $(this.restEncoder, e?1:0);
      }writeTypeRef(e) {
        $(this.restEncoder, e);
      }writeLen(e) {
        $(this.restEncoder, e);
      }writeAny(e) {
        Z(this.restEncoder, e);
      }writeBuf(e) {
        Y(this.restEncoder, e);
      }writeJSON(e) {
        K(this.restEncoder, JSON.stringify(e));
      }writeKey(e) {
        K(this.restEncoder, e);
      }
    }; const wt=class extends dt {
      readLeftID() {
        return At(ce(this.restDecoder), ce(this.restDecoder));
      }readRightID() {
        return At(ce(this.restDecoder), ce(this.restDecoder));
      }readClient() {
        return ce(this.restDecoder);
      }readInfo() {
        return le(this.restDecoder);
      }readString() {
        return de(this.restDecoder);
      }readParentInfo() {
        return 1===ce(this.restDecoder);
      }readTypeRef() {
        return ce(this.restDecoder);
      }readLen() {
        return ce(this.restDecoder);
      }readAny() {
        return fe(this.restDecoder);
      }readBuf() {
        return ((e)=>{
          const t=A(e.byteLength); return t.set(e), t;
        })(ae(this.restDecoder));
      }readJSON() {
        return JSON.parse(de(this.restDecoder));
      }readKey() {
        return de(this.restDecoder);
      }
    }; const xt=(e, t, n)=>{
      const r=new Map; n.forEach(((e, n)=>{
        Kt(t, n)>e&&r.set(n, e);
      })), Ut(t).forEach(((e, t)=>{
        n.has(t)||r.set(t, 0);
      })), $(e.restEncoder, r.size), Array.from(r.entries()).sort(((e, t)=>t[0]-e[0])).forEach((([n, r])=>{
        ((e, t, n, r)=>{
          const i=Yt(t, r); $(e.restEncoder, t.length-i), e.writeClient(n), $(e.restEncoder, r); const o=t[i]; o.write(e, r-o.id.clock); for (let n=i+1; n<t.length; n++)t[n].write(e, 0);
        })(e, t.clients.get(n), n, r);
      }));
    }; const kt=(e, t, n, r=new pt(e))=>an(t, ((e)=>{
      ((e, t, n)=>{
        const r=new Map; let i; ((e, t, n)=>{
          const r=ce(e.restDecoder); for (let i=0; i<r; i++) {
            const r=ce(e.restDecoder); const i=new Array(r); const o=e.readClient(); let s=ce(e.restDecoder); t.set(o, i); for (let t=0; t<r; t++) {
              const r=e.readInfo(); if (0!=(31&r)) {
                const a=0==(192&r); const l=new Tr(At(o, s), null, (r&q)===q?e.readLeftID():null, null, 64==(64&r)?e.readRightID():null, a?e.readParentInfo()?n.get(e.readString()):e.readLeftID():null, a&&32==(32&r)?e.readString():null, Or(e, r)); i[t]=l, s+=l.length;
              } else {
                const n=e.readLen(); i[t]=new or(At(o, s), n), s+=n;
              }
            }
          }
        })(e, r, t.doc), ((e, t)=>{
          const n=e.pendingClientsStructRefs; t.forEach(((e, t)=>{
            const r=n.get(t); if (void 0===r)n.set(t, {refs: e, i: 0}); else {
              const t=r.i>0?r.refs.slice(r.i):r.refs; for (let n=0; n<e.length; n++)t.push(e[n]); r.i=0, r.refs=t.sort(((e, t)=>e.id.clock-t.id.clock));
            }
          }));
        })(n, r), ((e, t)=>{
          const n=t.pendingStack; const r=t.pendingClientsStructRefs; const i=Array.from(r.keys()).sort(((e, t)=>e-t)); if (0===i.length) return; const o=()=>{
            let e=r.get(i[i.length-1]); for (;e.refs.length===e.i;) {
              if (i.pop(), !(i.length>0)) return t.pendingClientsStructRefs.clear(), null; e=r.get(i[i.length-1]);
            } return e;
          }; let s=o(); if (null===s&&0===n.length) return; let a=n.length>0?n.pop():s.refs[s.i++]; const l=new Map; for (;;) {
            const i=c(l, a.id.client, (()=>Kt(t, a.id.client))); const u=a.id.clock<i?i-a.id.clock:0; if (a.id.clock+u!==i) {
              const e=r.get(a.id.client)||{refs: [], i: 0}; if (e.refs.length!==e.i) {
                const t=e.refs[e.i]; if (t.id.clock<a.id.clock) {
                  e.refs[e.i]=a, a=t, e.refs=e.refs.slice(e.i).sort(((e, t)=>e.id.clock-t.id.clock)), e.i=0; continue;
                }
              } return void n.push(a);
            } const d=a.getMissing(e, t); if (null===d) {
              if ((0===u||u<a.length)&&(a.integrate(e, u), l.set(a.id.client, a.id.clock+a.length)), n.length>0)a=n.pop(); else if (null!==s&&s.i<s.refs.length)a=s.refs[s.i++]; else {
                if (s=o(), null===s) break; a=s.refs[s.i++];
              }
            } else {
              const e=r.get(d)||{refs: [], i: 0}; if (e.refs.length===e.i) return void n.push(a); n.push(a), a=e.refs[e.i++];
            }
          }t.pendingClientsStructRefs.clear();
        })(t, n), (i=n.pendingClientsStructRefs).forEach(((e, t)=>{
e.i===e.refs.length?i.delete(t):(e.refs.splice(0, e.i), e.i=0);
        })), ((e, t)=>{
          const n=t.pendingDeleteReaders; t.pendingDeleteReaders=[]; for (let r=0; r<n.length; r++)lt(n[r], e, t);
        })(t, n);
      })(r, e, t.store), lt(r, e, t.store);
    }), n, !1); const _t=(e)=>((e)=>{
      const t=new Map; const n=ce(e.restDecoder); for (let r=0; r<n; r++) {
        const n=ce(e.restDecoder); const r=ce(e.restDecoder); t.set(n, r);
      } return t;
    })(new yt(se(e))); const St=(e, t=new mt)=>(((e, t)=>{
      ((e, t)=>{
        $(e.restEncoder, t.size), t.forEach(((t, n)=>{
          $(e.restEncoder, n), $(e.restEncoder, t);
        }));
      })(e, Ut(t.store));
    })(t, e), t.toUint8Array()); class Ct {
      constructor() {
        this.l=[];
      }
    } const Mt=()=>new Ct; const Tt=(e, t)=>e.l.push(t); const Ot=(e, t)=>{
      const n=e.l; const r=n.length; e.l=n.filter(((e)=>t!==e)), r===e.l.length&&console.error('[yjs] Tried to remove event handler that doesn\'t exist.');
    }; const Dt=(e, t, n)=>Ne(e.l, [t, n]); class Et {
      constructor(e, t) {
        this.client=e, this.clock=t;
      }
    } const Nt=(e, t)=>e===t||null!==e&&null!==t&&e.client===t.client&&e.clock===t.clock; const At=(e, t)=>new Et(e, t); const Lt=(e)=>{
      for (const [t, n] of e.doc.share.entries()) if (n===e) return t; throw Te();
    }; const zt=(e, t)=>{
      for (;null!==t;) {
        if (t.parent===e) return !0; t=t.parent._item;
      } return !1;
    }; class It {
      constructor(e, t, n) {
        this.type=e, this.tname=t, this.item=n;
      }
    } const qt=(e)=>new It(null==e.type?null:At(e.type.client, e.type.clock), e.tname||null, null==e.item?null:At(e.item.client, e.item.clock)); class Ft {
      constructor(e, t) {
        this.type=e, this.index=t;
      }
    } const Pt=(e, t)=>{
      let n=null; let r=null; return null===e._item?r=Lt(e):n=At(e._item.id.client, e._item.id.clock), new It(n, r, t);
    }; const Rt=(e, t)=>{
      let n=e._start; for (;null!==n;) {
        if (!n.deleted&&n.countable) {
          if (n.length>t) return Pt(e, At(n.id.client, n.id.clock+t)); t-=n.length;
        }n=n.right;
      } return Pt(e, null);
    }; const Bt=(e, t)=>e===t||null!==e&&null!==t&&e.tname===t.tname&&Nt(e.item, t.item)&&Nt(e.type, t.type); class jt {
      constructor(e, t) {
        this.ds=e, this.sv=t;
      }
    } const Wt=(e, t)=>new jt(e, t); const Ht=(Wt(ot(), new Map), (e, t)=>void 0===t?!e.deleted:t.sv.has(e.id.client)&&(t.sv.get(e.id.client)||0)>e.id.clock&&!nt(t.ds, e.id)); const Vt=(e, t)=>{
      const n=c(e.meta, Vt, u); const r=e.doc.store; n.has(t)||(t.sv.forEach(((t, n)=>{
        t<Kt(r, n)&&Zt(e, At(n, t));
      })), tt(e, t.ds, ((e)=>{})), n.add(t));
    }; class $t {
      constructor() {
        this.clients=new Map, this.pendingClientsStructRefs=new Map, this.pendingStack=[], this.pendingDeleteReaders=[];
      }
    } const Ut=(e)=>{
      const t=new Map; return e.clients.forEach(((e, n)=>{
        const r=e[e.length-1]; t.set(n, r.id.clock+r.length);
      })), t;
    }; const Kt=(e, t)=>{
      const n=e.clients.get(t); if (void 0===n) return 0; const r=n[n.length-1]; return r.id.clock+r.length;
    }; const Jt=(e, t)=>{
      let n=e.clients.get(t.id.client); if (void 0===n)n=[], e.clients.set(t.id.client, n); else {
        const e=n[n.length-1]; if (e.id.clock+e.length!==t.id.clock) throw Te();
      }n.push(t);
    }; const Yt=(e, t)=>{
      let n=0; let r=e.length-1; let i=e[r]; let o=i.id.clock; if (o===t) return r; let s=m(t/(o+i.length-1)*r); for (;n<=r;) {
        if (i=e[s], o=i.id.clock, o<=t) {
          if (t<o+i.length) return s; n=s+1;
        } else r=s-1; s=m((n+r)/2);
      } throw Te();
    }; const Gt=(e, t)=>{
      const n=e.clients.get(t.client); return n[Yt(n, t.clock)];
    }; const Xt=(e, t, n)=>{
      const r=Yt(t, n); const i=t[r]; return i.id.clock<n&&i instanceof Tr?(t.splice(r+1, 0, Cr(e, i, n-i.id.clock)), r+1):r;
    }; const Zt=(e, t)=>{
      const n=e.doc.store.clients.get(t.client); return n[Xt(e, n, t.clock)];
    }; const Qt=(e, t, n)=>{
      const r=t.clients.get(n.client); const i=Yt(r, n.clock); const o=r[i]; return n.clock!==o.id.clock+o.length-1&&o.constructor!==or&&r.splice(i+1, 0, Cr(e, o, n.clock-o.id.clock+1)), o;
    }; const en=(e, t, n, r, i)=>{
      if (0===r) return; const o=n+r; let s; let a=Xt(e, t, n); do {
        s=t[a++], o<s.id.clock+s.length&&Xt(e, t, o), i(s);
      } while (a<t.length&&t[a].id.clock<o);
    }; class tn {
      constructor(e, t, n) {
        this.doc=e, this.deleteSet=new et, this.beforeState=Ut(e.store), this.afterState=new Map, this.changed=new Map, this.changedParentTypes=new Map, this._mergeStructs=[], this.origin=t, this.meta=new Map, this.local=n, this.subdocsAdded=new Set, this.subdocsRemoved=new Set, this.subdocsLoaded=new Set;
      }
    } const nn=(e, t)=>!(0===t.deleteSet.clients.size&&!((e, n)=>{
      for (const [n, o] of e) if (r=o, i=n, t.beforeState.get(i)!==r) return !0; let r; let i; return !1;
    })(t.afterState)||(rt(t.deleteSet), ((e, t)=>{
      xt(e, t.doc.store, t.beforeState);
    })(e, t), at(e, t.deleteSet), 0)); const rn=(e, t, n)=>{
      const r=t._item; (null===r||r.id.clock<(e.beforeState.get(r.id.client)||0)&&!r.deleted)&&c(e.changed, t, u).add(n);
    }; const on=(e, t)=>{
      const n=e[t-1]; const r=e[t]; n.deleted===r.deleted&&n.constructor===r.constructor&&n.mergeWith(r)&&(e.splice(t, 1), r instanceof Tr&&null!==r.parentSub&&r.parent._map.get(r.parentSub)===r&&r.parent._map.set(r.parentSub, n));
    }; const sn=(e, t)=>{
      if (t<e.length) {
        const n=e[t]; const r=n.doc; const i=r.store; const o=n.deleteSet; const s=n._mergeStructs; try {
          rt(o), n.afterState=Ut(n.doc.store), r._transaction=null, r.emit('beforeObserverCalls', [n, r]); const a=[]; n.changed.forEach(((e, t)=>a.push((()=>{
            null!==t._item&&t._item.deleted||t._callObserver(n, e);
          })))), a.push((()=>{
            n.changedParentTypes.forEach(((e, t)=>a.push((()=>{
              null!==t._item&&t._item.deleted||((e=e.filter(((e)=>null===e.target._item||!e.target._item.deleted))).forEach(((e)=>{
                e.currentTarget=t;
              })), e.sort(((e, t)=>e.path.length-t.path.length)), Dt(t._dEH, e, n));
            })))), a.push((()=>r.emit('afterTransaction', [n, r])));
          })), Ne(a, []);
        } finally {
          r.gc&&((e, t, n)=>{
            for (const [r, i] of e.clients.entries()) {
              const e=t.clients.get(r); for (let r=i.length-1; r>=0; r--) {
                const o=i[r]; const s=o.clock+o.len; for (let r=Yt(e, o.clock), i=e[r]; r<e.length&&i.id.clock<s; i=e[++r]) {
                  const i=e[r]; if (o.clock+o.len<=i.id.clock) break; i instanceof Tr&&i.deleted&&!i.keep&&n(i)&&i.gc(t, !1);
                }
              }
            }
          })(o, i, r.gcFilter), ((e, t)=>{
            e.clients.forEach(((e, n)=>{
              const r=t.clients.get(n); for (let t=e.length-1; t>=0; t--) {
                const n=e[t]; for (let e=y(r.length-1, 1+Yt(r, n.clock+n.len-1)), t=r[e]; e>0&&t.id.clock>=n.clock; t=r[--e])on(r, e);
              }
            }));
          })(o, i), n.afterState.forEach(((e, t)=>{
            const r=n.beforeState.get(t)||0; if (r!==e) {
              const e=i.clients.get(t); const n=b(Yt(e, r), 1); for (let t=e.length-1; t>=n; t--)on(e, t);
            }
          })); for (let e=0; e<s.length; e++) {
            const {client: t, clock: n}=s[e].id; const r=i.clients.get(t); const o=Yt(r, n); o+1<r.length&&on(r, o+1), o>0&&on(r, o);
          } if (n.local||n.afterState.get(r.clientID)===n.beforeState.get(r.clientID)||(r.clientID=ct(), ((...e)=>{
            console.log(...Ye(e)), Ge.forEach(((t)=>t.print(e)));
          })($e, Pe, '[yjs] ', Re, He, 'Changed the client-id because another client seems to be using it.')), r.emit('afterTransactionCleanup', [n, r]), r._observers.has('update')) {
            const e=new bt; nn(e, n)&&r.emit('update', [e.toUint8Array(), n.origin, r]);
          } if (r._observers.has('updateV2')) {
            const e=new gt; nn(e, n)&&r.emit('updateV2', [e.toUint8Array(), n.origin, r]);
          }n.subdocsAdded.forEach(((e)=>r.subdocs.add(e))), n.subdocsRemoved.forEach(((e)=>r.subdocs.delete(e))), r.emit('subdocs', [{loaded: n.subdocsLoaded, added: n.subdocsAdded, removed: n.subdocsRemoved}]), n.subdocsRemoved.forEach(((e)=>e.destroy())), e.length<=t+1?(r._transactionCleanups=[], r.emit('afterAllTransactions', [r, e])):sn(e, t+1);
        }
      }
    }; const an=(e, t, n=null, r=!0)=>{
      const i=e._transactionCleanups; let o=!1; null===e._transaction&&(o=!0, e._transaction=new tn(e, n, r), i.push(e._transaction), 1===i.length&&e.emit('beforeAllTransactions', [e]), e.emit('beforeTransaction', [e._transaction, e])); try {
        t(e._transaction);
      } finally {
        o&&i[0]===e._transaction&&sn(i, 0);
      }
    }; class ln {
      constructor(e, t, n) {
        this.ds=e, this.beforeState=t, this.afterState=n, this.meta=new Map;
      }
    } const cn=(e, t, n)=>{
      let r=null; const i=e.doc; const o=e.scope; return an(i, ((s)=>{
        for (;t.length>0&&null===r;) {
          const a=i.store; const l=t.pop(); const c=new Set; const u=[]; let d=!1; l.afterState.forEach(((e, t)=>{
            const n=l.beforeState.get(t)||0; const r=e-n; const c=a.clients.get(t); n!==e&&(Zt(s, At(t, n)), e<Kt(i.store, t)&&Zt(s, At(t, e)), en(s, c, n, r, ((t)=>{
              if (t instanceof Tr) {
                if (null!==t.redone) {
                  let {item: n, diff: i}=_r(a, t.id); i>0&&(n=Zt(s, At(n.id.client, n.id.clock+i))), n.length>r&&Zt(s, At(n.id.client, e)), t=n;
                }!t.deleted&&o.some(((e)=>zt(e, t)))&&u.push(t);
              }
            })));
          })), tt(s, l.ds, ((e)=>{
            const t=e.id; const n=t.clock; const r=t.client; const i=l.beforeState.get(r)||0; const s=l.afterState.get(r)||0; e instanceof Tr&&o.some(((t)=>zt(t, e)))&&!(n>=i&&n<s)&&c.add(e);
          })), c.forEach(((e)=>{
            d=null!==Mr(s, e, c)||d;
          })); for (let t=u.length-1; t>=0; t--) {
            const n=u[t]; e.deleteFilter(n)&&(n.delete(s), d=!0);
          }r=l, null!=r&&e.emit('stack-item-popped', [{stackItem: r, type: n}, e]);
        }s.changed.forEach(((e, t)=>{
          e.has(null)&&t._searchMarker&&(t._searchMarker.length=0);
        }));
      }), e), r;
    }; class un extends f {
      constructor(e, {captureTimeout: t=500, deleteFilter: n=(()=>!0), trackedOrigins: r=new Set([null])}={}) {
        super(), this.scope=e instanceof Array?e:[e], this.deleteFilter=n, r.add(this), this.trackedOrigins=r, this.undoStack=[], this.redoStack=[], this.undoing=!1, this.redoing=!1, this.doc=this.scope[0].doc, this.lastChange=0, this.doc.on('afterTransaction', ((e)=>{
          if (!this.scope.some(((t)=>e.changedParentTypes.has(t)))||!(this.trackedOrigins.has(e.origin)||e.origin&&this.trackedOrigins.has(e.origin.constructor))) return; const n=this.undoing; const r=this.redoing; const i=n?this.redoStack:this.undoStack; n?this.stopCapturing():r||(this.redoStack=[]); const o=e.beforeState; const s=e.afterState; const a=Fe(); if (a-this.lastChange<t&&i.length>0&&!n&&!r) {
            const t=i[i.length-1]; t.ds=((e)=>{
              const t=new et; for (let n=0; n<e.length; n++) {
                e[n].clients.forEach(((r, i)=>{
                  if (!t.clients.has(i)) {
                    const o=r.slice(); for (let t=n+1; t<e.length; t++)h(o, e[t].clients.get(i)||[]); t.clients.set(i, o);
                  }
                }));
              } return rt(t), t;
            })([t.ds, e.deleteSet]), t.afterState=s;
          } else i.push(new ln(e.deleteSet, o, s)); n||r||(this.lastChange=a), tt(e, e.deleteSet, ((e)=>{
            e instanceof Tr&&this.scope.some(((t)=>zt(t, e)))&&Sr(e, !0);
          })), this.emit('stack-item-added', [{stackItem: i[i.length-1], origin: e.origin, type: n?'redo':'undo'}, this]);
        }));
      }clear() {
        this.doc.transact(((e)=>{
          const t=(t)=>{
            tt(e, t.ds, ((e)=>{
              e instanceof Tr&&this.scope.some(((t)=>zt(t, e)))&&Sr(e, !1);
            }));
          }; this.undoStack.forEach(t), this.redoStack.forEach(t);
        })), this.undoStack=[], this.redoStack=[];
      }stopCapturing() {
        this.lastChange=0;
      }undo() {
        let e; this.undoing=!0; try {
          e=cn(this, this.undoStack, 'undo');
        } finally {
          this.undoing=!1;
        } return e;
      }redo() {
        let e; this.redoing=!0; try {
          e=cn(this, this.redoStack, 'redo');
        } finally {
          this.redoing=!1;
        } return e;
      }
    } class dn {
      constructor(e, t) {
        this.target=e, this.currentTarget=e, this.transaction=t, this._changes=null;
      } get path() {
        return hn(this.currentTarget, this.target);
      }deletes(e) {
        return nt(this.transaction.deleteSet, e.id);
      }adds(e) {
        return e.id.clock>=(this.transaction.beforeState.get(e.id.client)||0);
      } get changes() {
        let e=this._changes; if (null===e) {
          const t=this.target; const n=u(); const r=u(); const i=[]; const o=new Map; e={added: n, deleted: r, delta: i, keys: o}; const s=this.transaction.changed.get(t); if (s.has(null)) {
            let e=null; const o=()=>{
              e&&i.push(e);
            }; for (let i=t._start; null!==i; i=i.right)i.deleted?this.deletes(i)&&!this.adds(i)&&(null!==e&&void 0!==e.delete||(o(), e={delete: 0}), e.delete+=i.length, r.add(i)):this.adds(i)?(null!==e&&void 0!==e.insert||(o(), e={insert: []}), e.insert=e.insert.concat(i.content.getContent()), n.add(i)):(null!==e&&void 0!==e.retain||(o(), e={retain: 0}), e.retain+=i.length); null!==e&&void 0===e.retain&&o();
          }s.forEach(((e)=>{
            if (null!==e) {
              const n=t._map.get(e); let r; let i; if (this.adds(n)) {
                let e=n.left; for (;null!==e&&this.adds(e);)e=e.left; if (this.deletes(n)) {
                  if (null===e||!this.deletes(e)) return; r='delete', i=d(e.content.getContent());
                } else null!==e&&this.deletes(e)?(r='update', i=d(e.content.getContent())):(r='add', i=void 0);
              } else {
                if (!this.deletes(n)) return; r='delete', i=d(n.content.getContent());
              }o.set(e, {action: r, oldValue: i});
            }
          })), this._changes=e;
        } return e;
      }
    } const hn=(e, t)=>{
      const n=[]; for (;null!==t._item&&t!==e;) {
        if (null!==t._item.parentSub)n.unshift(t._item.parentSub); else {
          let e=0; let r=t._item.parent._start; for (;r!==t._item&&null!==r;)r.deleted||e++, r=r.right; n.unshift(e);
        }t=t._item.parent;
      } return n;
    }; let pn=0; class fn {
      constructor(e, t) {
        e.marker=!0, this.p=e, this.index=t, this.timestamp=pn++;
      }
    } const mn=(e, t, n)=>{
      e.p.marker=!1, e.p=t, t.marker=!0, e.index=n, e.timestamp=pn++;
    }; const gn=(e, t)=>{
      if (null===e._start||0===t||null===e._searchMarker) return null; const n=0===e._searchMarker.length?null:e._searchMarker.reduce(((e, n)=>g(t-e.index)<g(t-n.index)?e:n)); let r=e._start; let i=0; for (null!==n&&(r=n.p, i=n.index, ((e)=>{
        e.timestamp=pn++;
      })(n)); null!==r.right&&i<t;) {
        if (!r.deleted&&r.countable) {
          if (t<i+r.length) break; i+=r.length;
        }r=r.right;
      } for (;null!==r.left&&i>t;)r=r.left, !r.deleted&&r.countable&&(i-=r.length); for (;null!==r.left&&r.left.id.client===r.id.client&&r.left.id.clock+r.left.length===r.id.clock;)r=r.left, !r.deleted&&r.countable&&(i-=r.length); return null!==n&&g(n.index-i)<r.parent.length/80?(mn(n, r, i), n):((e, t, n)=>{
        if (e.length>=80) {
          const r=e.reduce(((e, t)=>e.timestamp<t.timestamp?e:t)); return mn(r, t, n), r;
        } {const r=new fn(t, n); return e.push(r), r;}
      })(e._searchMarker, r, i);
    }; const vn=(e, t, n)=>{
      for (let r=e.length-1; r>=0; r--) {
        const i=e[r]; if (n>0) {
          let t=i.p; for (t.marker=!1; t&&(t.deleted||!t.countable);)t=t.left, t&&!t.deleted&&t.countable&&(i.index-=t.length); if (null===t||!0===t.marker) {
            e.splice(r, 1); continue;
          }i.p=t, t.marker=!0;
        }(t<i.index||n>0&&t===i.index)&&(i.index=b(t, i.index+n));
      }
    }; const yn=(e, t, n)=>{
      const r=e; const i=t.changedParentTypes; for (;c(i, e, (()=>[])).push(n), null!==e._item;)e=e._item.parent; Dt(r._eH, n, t);
    }; class bn {
      constructor() {
        this._item=null, this._map=new Map, this._start=null, this.doc=null, this._length=0, this._eH=Mt(), this._dEH=Mt(), this._searchMarker=null;
      }_integrate(e, t) {
        this.doc=e, this._item=t;
      }_copy() {
        throw Me();
      }clone() {
        throw Me();
      }_write(e) {} get _first() {
        let e=this._start; for (;null!==e&&e.deleted;)e=e.right; return e;
      }_callObserver(e, t) {
        !e.local&&this._searchMarker&&(this._searchMarker.length=0);
      }observe(e) {
        Tt(this._eH, e);
      }observeDeep(e) {
        Tt(this._dEH, e);
      }unobserve(e) {
        Ot(this._eH, e);
      }unobserveDeep(e) {
        Ot(this._dEH, e);
      }toJSON() {}
    } const wn=(e, t, n)=>{
      t<0&&(t=e._length+t), n<0&&(n=e._length+n); let r=n-t; const i=[]; let o=e._start; for (;null!==o&&r>0;) {
        if (o.countable&&!o.deleted) {
          const e=o.content.getContent(); if (e.length<=t)t-=e.length; else {
            for (let n=t; n<e.length&&r>0; n++)i.push(e[n]), r--; t=0;
          }
        }o=o.right;
      } return i;
    }; const xn=(e)=>{
      const t=[]; let n=e._start; for (;null!==n;) {
        if (n.countable&&!n.deleted) {
          const e=n.content.getContent(); for (let n=0; n<e.length; n++)t.push(e[n]);
        }n=n.right;
      } return t;
    }; const kn=(e, t)=>{
      const n=[]; let r=e._start; for (;null!==r;) {
        if (r.countable&&Ht(r, t)) {
          const e=r.content.getContent(); for (let t=0; t<e.length; t++)n.push(e[t]);
        }r=r.right;
      } return n;
    }; const _n=(e, t)=>{
      let n=0; let r=e._start; for (;null!==r;) {
        if (r.countable&&!r.deleted) {
          const i=r.content.getContent(); for (let r=0; r<i.length; r++)t(i[r], n++, e);
        }r=r.right;
      }
    }; const Sn=(e, t)=>{
      const n=[]; return _n(e, ((r, i)=>{
        n.push(t(r, i, e));
      })), n;
    }; const Cn=(e)=>{
      let t=e._start; let n=null; let r=0; return {[Symbol.iterator]() {
        return this;
      }, next: ()=>{
        if (null===n) {
          for (;null!==t&&t.deleted;)t=t.right; if (null===t) return {done: !0, value: void 0}; n=t.content.getContent(), r=0, t=t.right;
        } const e=n[r++]; return n.length<=r&&(n=null), {done: !1, value: e};
      }};
    }; const Mn=(e, t)=>{
      const n=gn(e, t); let r=e._start; for (null!==n&&(r=n.p, t-=n.index); null!==r; r=r.right) {
        if (!r.deleted&&r.countable) {
          if (t<r.length) return r.content.getContent()[t]; t-=r.length;
        }
      }
    }; const Tn=(e, t, n, r)=>{
      let i=n; const o=e.doc; const s=o.clientID; const a=o.store; const l=null===n?t._start:n.right; let c=[]; const u=()=>{
        c.length>0&&(i=new Tr(At(s, Kt(a, s)), i, i&&i.lastId, l, l&&l.id, t, null, new hr(c)), i.integrate(e, 0), c=[]);
      }; r.forEach(((n)=>{
        switch (n.constructor) {
          case Number: case Object: case Boolean: case Array: case String: c.push(n); break; default: switch (u(), n.constructor) {
            case Uint8Array: case ArrayBuffer: i=new Tr(At(s, Kt(a, s)), i, i&&i.lastId, l, l&&l.id, t, null, new sr(new Uint8Array(n))), i.integrate(e, 0); break; case ut: i=new Tr(At(s, Kt(a, s)), i, i&&i.lastId, l, l&&l.id, t, null, new lr(n)), i.integrate(e, 0); break; default: if (!(n instanceof bn)) throw new Error('Unexpected content type in insert operation'); i=new Tr(At(s, Kt(a, s)), i, i&&i.lastId, l, l&&l.id, t, null, new kr(n)), i.integrate(e, 0);
          }
        }
      })), u();
    }; const On=(e, t, n, r)=>{
      if (0===n) return t._searchMarker&&vn(t._searchMarker, n, r.length), Tn(e, t, null, r); const i=n; const o=gn(t, n); let s=t._start; for (null!==o&&(s=o.p, 0==(n-=o.index)&&(s=s.prev, n+=s&&s.countable&&!s.deleted?s.length:0)); null!==s; s=s.right) {
        if (!s.deleted&&s.countable) {
          if (n<=s.length) {
            n<s.length&&Zt(e, At(s.id.client, s.id.clock+n)); break;
          }n-=s.length;
        }
      } return t._searchMarker&&vn(t._searchMarker, i, r.length), Tn(e, t, s, r);
    }; const Dn=(e, t, n, r)=>{
      if (0===r) return; const i=n; const o=r; const s=gn(t, n); let a=t._start; for (null!==s&&(a=s.p, n-=s.index); null!==a&&n>0; a=a.right)!a.deleted&&a.countable&&(n<a.length&&Zt(e, At(a.id.client, a.id.clock+n)), n-=a.length); for (;r>0&&null!==a;)a.deleted||(r<a.length&&Zt(e, At(a.id.client, a.id.clock+r)), a.delete(e), r-=a.length), a=a.right; if (r>0) throw Ce('array length exceeded'); t._searchMarker&&vn(t._searchMarker, i, -o+r);
    }; const En=(e, t, n)=>{
      const r=t._map.get(n); void 0!==r&&r.delete(e);
    }; const Nn=(e, t, n, r)=>{
      const i=t._map.get(n)||null; const o=e.doc; const s=o.clientID; let a; if (null==r)a=new hr([r]); else {
        switch (r.constructor) {
          case Number: case Object: case Boolean: case Array: case String: a=new hr([r]); break; case Uint8Array: a=new sr(r); break; case ut: a=new lr(r); break; default: if (!(r instanceof bn)) throw new Error('Unexpected content type'); a=new kr(r);
        }
      } new Tr(At(s, Kt(o.store, s)), i, i&&i.lastId, null, null, t, n, a).integrate(e, 0);
    }; const An=(e, t)=>{
      const n=e._map.get(t); return void 0===n||n.deleted?void 0:n.content.getContent()[n.length-1];
    }; const Ln=(e)=>{
      return t=e.entries(), n=(e)=>!e[1].deleted, Xe((()=>{
        let e; do {
          e=t.next();
        } while (!e.done&&!n(e.value)); return e;
      })); let t; let n;
    }; class zn extends dn {
      constructor(e, t) {
        super(e, t), this._transaction=t;
      }
    } class In extends bn {
      constructor() {
        super(), this._prelimContent=[], this._searchMarker=[];
      } static from(e) {
        const t=new In; return t.push(e), t;
      }_integrate(e, t) {
        super._integrate(e, t), this.insert(0, this._prelimContent), this._prelimContent=null;
      }_copy() {
        return new In;
      }clone() {
        const e=new In; return e.insert(0, this.toArray().map(((e)=>e instanceof bn?e.clone():e))), e;
      } get length() {
        return null===this._prelimContent?this._length:this._prelimContent.length;
      }_callObserver(e, t) {
        super._callObserver(e, t), yn(this, e, new zn(this, e));
      }insert(e, t) {
null!==this.doc?an(this.doc, ((n)=>{
  On(n, this, e, t);
})):this._prelimContent.splice(e, 0, ...t);
      }push(e) {
        this.insert(this.length, e);
      }unshift(e) {
        this.insert(0, e);
      }delete(e, t=1) {
null!==this.doc?an(this.doc, ((n)=>{
  Dn(n, this, e, t);
})):this._prelimContent.splice(e, t);
      }get(e) {
        return Mn(this, e);
      }toArray() {
        return xn(this);
      }slice(e=0, t=this.length) {
        return wn(this, e, t);
      }toJSON() {
        return this.map(((e)=>e instanceof bn?e.toJSON():e));
      }map(e) {
        return Sn(this, e);
      }forEach(e) {
        _n(this, e);
      }[Symbol.iterator]() {
        return Cn(this);
      }_write(e) {
        e.writeTypeRef(mr);
      }
    } class qn extends dn {
      constructor(e, t, n) {
        super(e, t), this.keysChanged=n;
      }
    } class Fn extends bn {
      constructor(e) {
        super(), this._prelimContent=null, this._prelimContent=void 0===e?new Map:new Map(e);
      }_integrate(e, t) {
        super._integrate(e, t), this._prelimContent.forEach(((e, t)=>{
          this.set(t, e);
        })), this._prelimContent=null;
      }_copy() {
        return new Fn;
      }clone() {
        const e=new Fn; return this.forEach(((t, n)=>{
          e.set(n, t instanceof bn?t.clone():t);
        })), e;
      }_callObserver(e, t) {
        yn(this, e, new qn(this, e, t));
      }toJSON() {
        const e={}; return this._map.forEach(((t, n)=>{
          if (!t.deleted) {
            const r=t.content.getContent()[t.length-1]; e[n]=r instanceof bn?r.toJSON():r;
          }
        })), e;
      } get size() {
        return [...Ln(this._map)].length;
      }keys() {
        return Ze(Ln(this._map), ((e)=>e[0]));
      }values() {
        return Ze(Ln(this._map), ((e)=>e[1].content.getContent()[e[1].length-1]));
      }entries() {
        return Ze(Ln(this._map), ((e)=>[e[0], e[1].content.getContent()[e[1].length-1]]));
      }forEach(e) {
        return this._map.forEach(((t, n)=>{
          t.deleted||e(t.content.getContent()[t.length-1], n, this);
        })), {};
      }[Symbol.iterator]() {
        return this.entries();
      }delete(e) {
null!==this.doc?an(this.doc, ((t)=>{
  En(t, this, e);
})):this._prelimContent.delete(e);
      }set(e, t) {
        return null!==this.doc?an(this.doc, ((n)=>{
          Nn(n, this, e, t);
        })):this._prelimContent.set(e, t), t;
      }get(e) {
        return An(this, e);
      }has(e) {
        return ((e, t)=>{
          const n=this._map.get(t); return void 0!==n&&!n.deleted;
        })(0, e);
      }_write(e) {
        e.writeTypeRef(gr);
      }
    } const Pn=(e, t)=>e===t||'object'==typeof e&&'object'==typeof t&&e&&t&&((e, t)=>e===t||De(e)===De(t)&&((e, t)=>{
      for (const n in e) if (!t(e[n], n)) return !1; return !0;
    })(e, ((e, n)=>(void 0!==e||Ee(t, n))&&t[n]===e)))(e, t); class Rn {
      constructor(e, t, n, r) {
        this.left=e, this.right=t, this.index=n, this.currentAttributes=r;
      }forward() {
        switch (null===this.right&&Te(), this.right.content.constructor) {
          case cr: case pr: this.right.deleted||(this.index+=this.right.length); break; case ur: this.right.deleted||Hn(this.currentAttributes, this.right.content);
        } this.left=this.right, this.right=this.right.right;
      }
    } const Bn=(e, t, n)=>{
      for (;null!==t.right&&n>0;) {
        switch (t.right.content.constructor) {
          case cr: case pr: t.right.deleted||(n<t.right.length&&Zt(e, At(t.right.id.client, t.right.id.clock+n)), t.index+=t.right.length, n-=t.right.length); break; case ur: t.right.deleted||Hn(t.currentAttributes, t.right.content);
        }t.left=t.right, t.right=t.right.right;
      } return t;
    }; const jn=(e, t, n)=>{
      const r=new Map; const i=gn(t, n); if (i) {
        const t=new Rn(i.p.left, i.p, i.index, r); return Bn(e, t, n-i.index);
      } {const i=new Rn(null, t._start, 0, r); return Bn(e, i, n);}
    }; const Wn=(e, t, n, r)=>{
      for (;null!==n.right&&(!0===n.right.deleted||n.right.content.constructor===ur&&Pn(r.get(n.right.content.key), n.right.content.value));)n.right.deleted||r.delete(n.right.content.key), n.forward(); const i=e.doc; const o=i.clientID; let s=n.left; const a=n.right; r.forEach(((n, r)=>{
        s=new Tr(At(o, Kt(i.store, o)), s, s&&s.lastId, a, a&&a.id, t, null, new ur(r, n)), s.integrate(e, 0);
      }));
    }; const Hn=(e, t)=>{
      const {key: n, value: r}=t; null===r?e.delete(n):e.set(n, r);
    }; const Vn=(e, t)=>{
      for (;null!==e.right&&(e.right.deleted||e.right.content.constructor===ur&&Pn(t[e.right.content.key]||null, e.right.content.value));)e.forward();
    }; const $n=(e, t, n, r)=>{
      const i=e.doc; const o=i.clientID; const s=new Map; for (const a in r) {
        const l=r[a]; const c=n.currentAttributes.get(a)||null; if (!Pn(c, l)) {
          s.set(a, c); const {left: r, right: u}=n; n.right=new Tr(At(o, Kt(i.store, o)), r, r&&r.lastId, u, u&&u.id, t, null, new ur(a, l)), n.right.integrate(e, 0), n.forward();
        }
      } return s;
    }; const Un=(e, t, n, r, i)=>{
      n.currentAttributes.forEach(((e, t)=>{
        void 0===i[t]&&(i[t]=null);
      })); const o=e.doc; const s=o.clientID; Vn(n, i); const a=$n(e, t, n, i); const l=r.constructor===String?new pr(r):new cr(r); let {left: c, right: u, index: d}=n; t._searchMarker&&vn(t._searchMarker, n.index, l.getLength()), u=new Tr(At(s, Kt(o.store, s)), c, c&&c.lastId, u, u&&u.id, t, null, l), u.integrate(e, 0), n.right=u, n.index=d, n.forward(), Wn(e, t, n, a);
    }; const Kn=(e, t, n, r, i)=>{
      const o=e.doc; const s=o.clientID; Vn(n, i); const a=$n(e, t, n, i); for (;r>0&&null!==n.right;) {
        if (!n.right.deleted) {
          switch (n.right.content.constructor) {
            case ur: {const {key: t, value: r}=n.right.content; const o=i[t]; void 0!==o&&(Pn(o, r)?a.delete(t):a.set(t, r), n.right.delete(e)); break;} case cr: case pr: r<n.right.length&&Zt(e, At(n.right.id.client, n.right.id.clock+r)), r-=n.right.length;
          }
        }n.forward();
      } if (r>0) {
        let i=''; for (;r>0; r--)i+='\n'; n.right=new Tr(At(s, Kt(o.store, s)), n.left, n.left&&n.left.lastId, n.right, n.right&&n.right.id, t, null, new pr(i)), n.right.integrate(e, 0), n.forward();
      }Wn(e, t, n, a);
    }; const Jn=(e, t, n, r, i)=>{
      for (;n&&n.content.constructor!==pr&&n.content.constructor!==cr;)n.deleted||n.content.constructor!==ur||Hn(i, n.content), n=n.right; let o=0; for (;t!==n;) {
        if (!t.deleted) {
          const n=t.content; switch (n.constructor) {
            case ur: {const {key: s, value: a}=n; (i.get(s)||null)===a&&(r.get(s)||null)!==a||(t.delete(e), o++); break;}
          }
        }t=t.right;
      } return o;
    }; const Yn=(e, t, n)=>{
      const r=n; const i=l(t.currentAttributes); const o=t.right; for (;n>0&&null!==t.right;) {
        if (!1===t.right.deleted) {
          switch (t.right.content.constructor) {
            case cr: case pr: n<t.right.length&&Zt(e, At(t.right.id.client, t.right.id.clock+n)), n-=t.right.length, t.right.delete(e);
          }
        }t.forward();
      }o&&Jn(e, o, t.right, i, l(t.currentAttributes)); const s=(t.left||t.right).parent; return s._searchMarker&&vn(s._searchMarker, t.index, -r+n), t;
    }; class Gn extends dn {
      constructor(e, t) {
        super(e, t), this._delta=null;
      } get delta() {
        if (null===this._delta) {
          const e=this.target.doc; this._delta=[], an(e, ((e)=>{
            const t=this._delta; const n=new Map; const r=new Map; let i=this.target._start; let o=null; const s={}; let a=''; let l=0; let c=0; const u=()=>{
              if (null!==o) {
                let e; switch (o) {
                  case 'delete': e={delete: c}, c=0; break; case 'insert': e={insert: a}, n.size>0&&(e.attributes={}, n.forEach(((t, n)=>{
                    null!==t&&(e.attributes[n]=t);
                  }))), a=''; break; case 'retain': if (e={retain: l}, Object.keys(s).length>0) {
                    e.attributes={}; for (const t in s)e.attributes[t]=s[t];
                  }l=0;
                }t.push(e), o=null;
              }
            }; for (;null!==i;) {
              switch (i.content.constructor) {
                case cr: this.adds(i)?this.deletes(i)||(u(), o='insert', a=i.content.embed, u()):this.deletes(i)?('delete'!==o&&(u(), o='delete'), c+=1):i.deleted||('retain'!==o&&(u(), o='retain'), l+=1); break; case pr: this.adds(i)?this.deletes(i)||('insert'!==o&&(u(), o='insert'), a+=i.content.str):this.deletes(i)?('delete'!==o&&(u(), o='delete'), c+=i.length):i.deleted||('retain'!==o&&(u(), o='retain'), l+=i.length); break; case ur: {const {key: t, value: a}=i.content; if (this.adds(i)) {
                  if (!this.deletes(i)) {
                    const l=n.get(t)||null; Pn(l, a)?i.delete(e):('retain'===o&&u(), Pn(a, r.get(t)||null)?delete s[t]:s[t]=a);
                  }
                } else if (this.deletes(i)) {
                  r.set(t, a); const e=n.get(t)||null; Pn(e, a)||('retain'===o&&u(), s[t]=e);
                } else if (!i.deleted) {
                  r.set(t, a); const n=s[t]; void 0!==n&&(Pn(n, a)?i.delete(e):('retain'===o&&u(), null===a?s[t]=a:delete s[t]));
                }i.deleted||('insert'===o&&u(), Hn(n, i.content)); break;}
              }i=i.right;
            } for (u(); t.length>0;) {
              const e=t[t.length-1]; if (void 0===e.retain||void 0!==e.attributes) break; t.pop();
            }
          }));
        } return this._delta;
      }
    } class Xn extends bn {
      constructor(e) {
        super(), this._pending=void 0!==e?[()=>this.insert(0, e)]:[], this._searchMarker=[];
      } get length() {
        return this._length;
      }_integrate(e, t) {
        super._integrate(e, t); try {
          this._pending.forEach(((e)=>e()));
        } catch (e) {
          console.error(e);
        } this._pending=null;
      }_copy() {
        return new Xn;
      }clone() {
        const e=new Xn; return e.applyDelta(this.toDelta()), e;
      }_callObserver(e, t) {
        super._callObserver(e, t); const n=new Gn(this, e); const r=e.doc; if (!e.local) {
          let t=!1; for (const [n, i] of e.afterState.entries()) {
            const o=e.beforeState.get(n)||0; if (i!==o&&(en(e, r.store.clients.get(n), o, i, ((e)=>{
              e.deleted||e.content.constructor!==ur||(t=!0);
            })), t)) break;
          }t||tt(e, e.deleteSet, ((e)=>{
            e instanceof or||t||e.parent===this&&e.content.constructor===ur&&(t=!0);
          })), an(r, ((e)=>{
t?((e)=>{
  let t=0; an(e.doc, ((n)=>{
    let r=e._start; let i=e._start; let o=a(); const s=l(o); for (;i;) {
      if (!1===i.deleted) {
        switch (i.content.constructor) {
          case ur: Hn(s, i.content); break; case cr: case pr: t+=Jn(n, r, i, o, s), o=l(s), r=i;
        }
      }i=i.right;
    }
  }));
})(this):tt(e, e.deleteSet, ((t)=>{
  t instanceof or||t.parent===this&&((e, t)=>{
    for (;t&&t.right&&(t.right.deleted||t.right.content.constructor!==pr&&t.right.content.constructor!==cr);)t=t.right; const n=new Set; for (;t&&(t.deleted||t.content.constructor!==pr&&t.content.constructor!==cr);) {
      if (!t.deleted&&t.content.constructor===ur) {
        const r=t.content.key; n.has(r)?t.delete(e):n.add(r);
      }t=t.left;
    }
  })(e, t);
}));
          }));
        }yn(this, e, n);
      }toString() {
        let e=''; let t=this._start; for (;null!==t;)!t.deleted&&t.countable&&t.content.constructor===pr&&(e+=t.content.str), t=t.right; return e;
      }toJSON() {
        return this.toString();
      }applyDelta(e, {sanitize: t=!0}={}) {
null!==this.doc?an(this.doc, ((n)=>{
  const r=new Rn(null, this._start, 0, new Map); for (let i=0; i<e.length; i++) {
    const o=e[i]; if (void 0!==o.insert) {
      const s=t||'string'!=typeof o.insert||i!==e.length-1||null!==r.right||'\n'!==o.insert.slice(-1)?o.insert:o.insert.slice(0, -1); ('string'!=typeof s||s.length>0)&&Un(n, this, r, s, o.attributes||{});
    } else void 0!==o.retain?Kn(n, this, r, o.retain, o.attributes||{}):void 0!==o.delete&&Yn(n, r, o.delete);
  }
})):this._pending.push((()=>this.applyDelta(e)));
      }toDelta(e, t, n) {
        const r=[]; const i=new Map; const o=this.doc; let s=''; let a=this._start; function l() {
          if (s.length>0) {
            const e={}; let t=!1; i.forEach(((n, r)=>{
              t=!0, e[r]=n;
            })); const n={insert: s}; t&&(n.attributes=e), r.push(n), s='';
          }
        } return an(o, ((o)=>{
          for (e&&Vt(o, e), t&&Vt(o, t); null!==a;) {
            if (Ht(a, e)||void 0!==t&&Ht(a, t)) {
              switch (a.content.constructor) {
                case pr: {const r=i.get('ychange'); void 0===e||Ht(a, e)?void 0===t||Ht(a, t)?void 0!==r&&(l(), i.delete('ychange')):void 0!==r&&r.user===a.id.client&&'added'===r.state||(l(), i.set('ychange', n?n('added', a.id):{type: 'added'})):void 0!==r&&r.user===a.id.client&&'removed'===r.state||(l(), i.set('ychange', n?n('removed', a.id):{type: 'removed'})), s+=a.content.str; break;} case cr: {l(); const e={insert: a.content.embed}; if (i.size>0) {
                  const t={}; e.attributes=t, i.forEach(((e, n)=>{
                    t[n]=e;
                  }));
                }r.push(e); break;} case ur: Ht(a, e)&&(l(), Hn(i, a.content));
              }
            }a=a.right;
          }l();
        }), Vt), r;
      }insert(e, t, n) {
        if (t.length<=0) return; const r=this.doc; null!==r?an(r, ((r)=>{
          const i=jn(r, this, e); n||(n={}, i.currentAttributes.forEach(((e, t)=>{
            n[t]=e;
          }))), Un(r, this, i, t, n);
        })):this._pending.push((()=>this.insert(e, t, n)));
      }insertEmbed(e, t, n={}) {
        if (t.constructor!==Object) throw new Error('Embed must be an Object'); const r=this.doc; null!==r?an(r, ((r)=>{
          const i=jn(r, this, e); Un(r, this, i, t, n);
        })):this._pending.push((()=>this.insertEmbed(e, t, n)));
      }delete(e, t) {
        if (0===t) return; const n=this.doc; null!==n?an(n, ((n)=>{
          Yn(n, jn(n, this, e), t);
        })):this._pending.push((()=>this.delete(e, t)));
      }format(e, t, n) {
        if (0===t) return; const r=this.doc; null!==r?an(r, ((r)=>{
          const i=jn(r, this, e); null!==i.right&&Kn(r, this, i, t, n);
        })):this._pending.push((()=>this.format(e, t, n)));
      }_write(e) {
        e.writeTypeRef(vr);
      }
    } class Zn {
      constructor(e, t=(()=>!0)) {
        this._filter=t, this._root=e, this._currentNode=e._start, this._firstCall=!0;
      }[Symbol.iterator]() {
        return this;
      }next() {
        let e=this._currentNode; let t=e.content.type; if (null!==e&&(!this._firstCall||e.deleted||!this._filter(t))) {
          do {
            if (t=e.content.type, e.deleted||t.constructor!==er&&t.constructor!==Qn||null===t._start) {
              for (;null!==e;) {
                if (null!==e.right) {
                  e=e.right; break;
                }e=e.parent===this._root?null:e.parent._item;
              }
            } else e=t._start;
          } while (null!==e&&(e.deleted||!this._filter(e.content.type)));
        } return this._firstCall=!1, null===e?{value: void 0, done: !0}:(this._currentNode=e, {value: e.content.type, done: !1});
      }
    } class Qn extends bn {
      constructor() {
        super(), this._prelimContent=[];
      }_integrate(e, t) {
        super._integrate(e, t), this.insert(0, this._prelimContent), this._prelimContent=null;
      }_copy() {
        return new Qn;
      }clone() {
        const e=new Qn; return e.insert(0, e.toArray().map(((e)=>e instanceof bn?e.clone():e))), e;
      } get length() {
        return null===this._prelimContent?this._length:this._prelimContent.length;
      }createTreeWalker(e) {
        return new Zn(this, e);
      }querySelector(e) {
        e=e.toUpperCase(); const t=new Zn(this, ((t)=>t.nodeName&&t.nodeName.toUpperCase()===e)).next(); return t.done?null:t.value;
      }querySelectorAll(e) {
        return e=e.toUpperCase(), Array.from(new Zn(this, ((t)=>t.nodeName&&t.nodeName.toUpperCase()===e)));
      }_callObserver(e, t) {
        yn(this, e, new tr(this, t, e));
      }toString() {
        return Sn(this, ((e)=>e.toString())).join('');
      }toJSON() {
        return this.toString();
      }toDOM(e=document, t={}, n) {
        const r=e.createDocumentFragment(); return void 0!==n&&n._createAssociation(r, this), _n(this, ((i)=>{
          r.insertBefore(i.toDOM(e, t, n), null);
        })), r;
      }insert(e, t) {
null!==this.doc?an(this.doc, ((n)=>{
  On(n, this, e, t);
})):this._prelimContent.splice(e, 0, ...t);
      }delete(e, t=1) {
null!==this.doc?an(this.doc, ((n)=>{
  Dn(n, this, e, t);
})):this._prelimContent.splice(e, t);
      }toArray() {
        return xn(this);
      }push(e) {
        this.insert(this.length, e);
      }unshift(e) {
        this.insert(0, e);
      }get(e) {
        return Mn(this, e);
      }slice(e=0, t=this.length) {
        return wn(this, e, t);
      }_write(e) {
        e.writeTypeRef(br);
      }
    } class er extends Qn {
      constructor(e='UNDEFINED') {
        super(), this.nodeName=e, this._prelimAttrs=new Map;
      }_integrate(e, t) {
        super._integrate(e, t), this._prelimAttrs.forEach(((e, t)=>{
          this.setAttribute(t, e);
        })), this._prelimAttrs=null;
      }_copy() {
        return new er(this.nodeName);
      }clone() {
        const e=new er(this.nodeName); const t=this.getAttributes(); for (const n in t)e.setAttribute(n, t[n]); return e.insert(0, e.toArray().map(((e)=>e instanceof bn?e.clone():e))), e;
      }toString() {
        const e=this.getAttributes(); const t=[]; const n=[]; for (const t in e)n.push(t); n.sort(); const r=n.length; for (let i=0; i<r; i++) {
          const r=n[i]; t.push(r+'="'+e[r]+'"');
        } const i=this.nodeName.toLocaleLowerCase(); return `<${i}${t.length>0?' '+t.join(' '):''}>${super.toString()}</${i}>`;
      }removeAttribute(e) {
null!==this.doc?an(this.doc, ((t)=>{
  En(t, this, e);
})):this._prelimAttrs.delete(e);
      }setAttribute(e, t) {
null!==this.doc?an(this.doc, ((n)=>{
  Nn(n, this, e, t);
})):this._prelimAttrs.set(e, t);
      }getAttribute(e) {
        return An(this, e);
      }getAttributes(e) {
        return ((e)=>{
          const t={}; return this._map.forEach(((e, n)=>{
            e.deleted||(t[n]=e.content.getContent()[e.length-1]);
          })), t;
        })();
      }toDOM(e=document, t={}, n) {
        const r=e.createElement(this.nodeName); const i=this.getAttributes(); for (const e in i)r.setAttribute(e, i[e]); return _n(this, ((i)=>{
          r.appendChild(i.toDOM(e, t, n));
        })), void 0!==n&&n._createAssociation(r, this), r;
      }_write(e) {
        e.writeTypeRef(yr), e.writeKey(this.nodeName);
      }
    } class tr extends dn {
      constructor(e, t, n) {
        super(e, n), this.childListChanged=!1, this.attributesChanged=new Set, t.forEach(((e)=>{
null===e?this.childListChanged=!0:this.attributesChanged.add(e);
        }));
      }
    } class nr extends Fn {
      constructor(e) {
        super(), this.hookName=e;
      }_copy() {
        return new nr(this.hookName);
      }clone() {
        const e=new nr(this.hookName); return this.forEach(((t, n)=>{
          e.set(n, t);
        })), e;
      }toDOM(e=document, t={}, n) {
        const r=t[this.hookName]; let i; return i=void 0!==r?r.createDom(this):document.createElement(this.hookName), i.setAttribute('data-yjs-hook', this.hookName), void 0!==n&&n._createAssociation(i, this), i;
      }_write(e) {
        e.writeTypeRef(wr), e.writeKey(this.hookName);
      }
    } class rr extends Xn {
      _copy() {
        return new rr;
      }clone() {
        const e=new rr; return e.applyDelta(this.toDelta()), e;
      }toDOM(e=document, t, n) {
        const r=e.createTextNode(this.toString()); return void 0!==n&&n._createAssociation(r, this), r;
      }toString() {
        return this.toDelta().map(((e)=>{
          const t=[]; for (const n in e.attributes) {
            const r=[]; for (const t in e.attributes[n])r.push({key: t, value: e.attributes[n][t]}); r.sort(((e, t)=>e.key<t.key?-1:1)), t.push({nodeName: n, attrs: r});
          }t.sort(((e, t)=>e.nodeName<t.nodeName?-1:1)); let n=''; for (let e=0; e<t.length; e++) {
            const r=t[e]; n+=`<${r.nodeName}`; for (let e=0; e<r.attrs.length; e++) {
              const t=r.attrs[e]; n+=` ${t.key}="${t.value}"`;
            }n+='>';
          }n+=e.insert; for (let e=t.length-1; e>=0; e--)n+=`</${t[e].nodeName}>`; return n;
        })).join('');
      }toJSON() {
        return this.toString();
      }_write(e) {
        e.writeTypeRef(xr);
      }
    } class ir {
      constructor(e, t) {
        this.id=e, this.length=t;
      } get deleted() {
        throw Me();
      }mergeWith(e) {
        return !1;
      }write(e, t, n) {
        throw Me();
      }integrate(e, t) {
        throw Me();
      }
    } class or extends ir {
      get deleted() {
        return !0;
      }delete() {}mergeWith(e) {
        return this.length+=e.length, !0;
      }integrate(e, t) {
        t>0&&(this.id.clock+=t, this.length-=t), Jt(e.doc.store, this);
      }write(e, t) {
        e.writeInfo(0), e.writeLen(this.length-t);
      }getMissing(e, t) {
        return null;
      }
    } class sr {
      constructor(e) {
        this.content=e;
      }getLength() {
        return 1;
      }getContent() {
        return [this.content];
      }isCountable() {
        return !0;
      }copy() {
        return new sr(this.content);
      }splice(e) {
        throw Me();
      }mergeWith(e) {
        return !1;
      }integrate(e, t) {}delete(e) {}gc(e) {}write(e, t) {
        e.writeBuf(this.content);
      }getRef() {
        return 3;
      }
    } class ar {
      constructor(e) {
        this.len=e;
      }getLength() {
        return this.len;
      }getContent() {
        return [];
      }isCountable() {
        return !1;
      }copy() {
        return new ar(this.len);
      }splice(e) {
        const t=new ar(this.len-e); return this.len=e, t;
      }mergeWith(e) {
        return this.len+=e.len, !0;
      }integrate(e, t) {
        it(e.deleteSet, t.id.client, t.id.clock, this.len), t.markDeleted();
      }delete(e) {}gc(e) {}write(e, t) {
        e.writeLen(this.len-t);
      }getRef() {
        return 1;
      }
    } class lr {
      constructor(e) {
        e._item&&console.error('This document was already integrated as a sub-document. You should create a second instance instead with the same guid.'), this.doc=e; const t={}; this.opts=t, e.gc||(t.gc=!1), e.autoLoad&&(t.autoLoad=!0), null!==e.meta&&(t.meta=e.meta);
      }getLength() {
        return 1;
      }getContent() {
        return [this.doc];
      }isCountable() {
        return !0;
      }copy() {
        return new lr(this.doc);
      }splice(e) {
        throw Me();
      }mergeWith(e) {
        return !1;
      }integrate(e, t) {
        this.doc._item=t, e.subdocsAdded.add(this.doc), this.doc.shouldLoad&&e.subdocsLoaded.add(this.doc);
      }delete(e) {
e.subdocsAdded.has(this.doc)?e.subdocsAdded.delete(this.doc):e.subdocsRemoved.add(this.doc);
      }gc(e) {}write(e, t) {
        e.writeString(this.doc.guid), e.writeAny(this.opts);
      }getRef() {
        return 9;
      }
    } class cr {
      constructor(e) {
        this.embed=e;
      }getLength() {
        return 1;
      }getContent() {
        return [this.embed];
      }isCountable() {
        return !0;
      }copy() {
        return new cr(this.embed);
      }splice(e) {
        throw Me();
      }mergeWith(e) {
        return !1;
      }integrate(e, t) {}delete(e) {}gc(e) {}write(e, t) {
        e.writeJSON(this.embed);
      }getRef() {
        return 5;
      }
    } class ur {
      constructor(e, t) {
        this.key=e, this.value=t;
      }getLength() {
        return 1;
      }getContent() {
        return [];
      }isCountable() {
        return !1;
      }copy() {
        return new ur(this.key, this.value);
      }splice(e) {
        throw Me();
      }mergeWith(e) {
        return !1;
      }integrate(e, t) {
        t.parent._searchMarker=null;
      }delete(e) {}gc(e) {}write(e, t) {
        e.writeKey(this.key), e.writeJSON(this.value);
      }getRef() {
        return 6;
      }
    } class dr {
      constructor(e) {
        this.arr=e;
      }getLength() {
        return this.arr.length;
      }getContent() {
        return this.arr;
      }isCountable() {
        return !0;
      }copy() {
        return new dr(this.arr);
      }splice(e) {
        const t=new dr(this.arr.slice(e)); return this.arr=this.arr.slice(0, e), t;
      }mergeWith(e) {
        return this.arr=this.arr.concat(e.arr), !0;
      }integrate(e, t) {}delete(e) {}gc(e) {}write(e, t) {
        const n=this.arr.length; e.writeLen(n-t); for (let r=t; r<n; r++) {
          const t=this.arr[r]; e.writeString(void 0===t?'undefined':JSON.stringify(t));
        }
      }getRef() {
        return 2;
      }
    } class hr {
      constructor(e) {
        this.arr=e;
      }getLength() {
        return this.arr.length;
      }getContent() {
        return this.arr;
      }isCountable() {
        return !0;
      }copy() {
        return new hr(this.arr);
      }splice(e) {
        const t=new hr(this.arr.slice(e)); return this.arr=this.arr.slice(0, e), t;
      }mergeWith(e) {
        return this.arr=this.arr.concat(e.arr), !0;
      }integrate(e, t) {}delete(e) {}gc(e) {}write(e, t) {
        const n=this.arr.length; e.writeLen(n-t); for (let r=t; r<n; r++) {
          const t=this.arr[r]; e.writeAny(t);
        }
      }getRef() {
        return 8;
      }
    } class pr {
      constructor(e) {
        this.str=e;
      }getLength() {
        return this.str.length;
      }getContent() {
        return this.str.split('');
      }isCountable() {
        return !0;
      }copy() {
        return new pr(this.str);
      }splice(e) {
        const t=new pr(this.str.slice(e)); this.str=this.str.slice(0, e); const n=this.str.charCodeAt(e-1); return n>=55296&&n<=56319&&(this.str=this.str.slice(0, e-1)+'�', t.str='�'+t.str.slice(1)), t;
      }mergeWith(e) {
        return this.str+=e.str, !0;
      }integrate(e, t) {}delete(e) {}gc(e) {}write(e, t) {
        e.writeString(0===t?this.str:this.str.slice(t));
      }getRef() {
        return 4;
      }
    } const fr=[(e)=>new In, (e)=>new Fn, (e)=>new Xn, (e)=>new er(e.readKey()), (e)=>new Qn, (e)=>new nr(e.readKey()), (e)=>new rr]; const mr=0; const gr=1; const vr=2; const yr=3; const br=4; const wr=5; const xr=6; class kr {
      constructor(e) {
        this.type=e;
      }getLength() {
        return 1;
      }getContent() {
        return [this.type];
      }isCountable() {
        return !0;
      }copy() {
        return new kr(this.type._copy());
      }splice(e) {
        throw Me();
      }mergeWith(e) {
        return !1;
      }integrate(e, t) {
        this.type._integrate(e.doc, t);
      }delete(e) {
        let t=this.type._start; for (;null!==t;)t.deleted?e._mergeStructs.push(t):t.delete(e), t=t.right; this.type._map.forEach(((t)=>{
t.deleted?e._mergeStructs.push(t):t.delete(e);
        })), e.changed.delete(this.type);
      }gc(e) {
        let t=this.type._start; for (;null!==t;)t.gc(e, !0), t=t.right; this.type._start=null, this.type._map.forEach(((t)=>{
          for (;null!==t;)t.gc(e, !0), t=t.left;
        })), this.type._map=new Map;
      }write(e, t) {
        this.type._write(e);
      }getRef() {
        return 7;
      }
    } const _r=(e, t)=>{
      let n; let r=t; let i=0; do {
        i>0&&(r=At(r.client, r.clock+i)), n=Gt(e, r), i=r.clock-n.id.clock, r=n.redone;
      } while (null!==r&&n instanceof Tr); return {item: n, diff: i};
    }; const Sr=(e, t)=>{
      for (;null!==e&&e.keep!==t;)e.keep=t, e=e.parent._item;
    }; const Cr=(e, t, n)=>{
      const {client: r, clock: i}=t.id; const o=new Tr(At(r, i+n), t, At(r, i+n-1), t.right, t.rightOrigin, t.parent, t.parentSub, t.content.splice(n)); return t.deleted&&o.markDeleted(), t.keep&&(o.keep=!0), null!==t.redone&&(o.redone=At(t.redone.client, t.redone.clock+n)), t.right=o, null!==o.right&&(o.right.left=o), e._mergeStructs.push(o), null!==o.parentSub&&null===o.right&&o.parent._map.set(o.parentSub, o), t.length=n, o;
    }; const Mr=(e, t, n)=>{
      const r=e.doc; const i=r.store; const o=r.clientID; const s=t.redone; if (null!==s) return Zt(e, s); let a; let l; let c=t.parent._item; if (null===t.parentSub)a=t.left, l=t; else {
        for (a=t; null!==a.right;) if (a=a.right, a.id.client!==o) return null; null!==a.right&&(a=t.parent._map.get(t.parentSub)), l=null;
      } if (null!==c&&!0===c.deleted&&null===c.redone&&(!n.has(c)||null===Mr(e, c, n))) return null; if (null!==c&&null!==c.redone) {
        for (;null!==c.redone;)c=Zt(e, c.redone); for (;null!==a;) {
          let t=a; for (;null!==t&&t.parent._item!==c;)t=null===t.redone?null:Zt(e, t.redone); if (null!==t&&t.parent._item===c) {
            a=t; break;
          }a=a.left;
        } for (;null!==l;) {
          let t=l; for (;null!==t&&t.parent._item!==c;)t=null===t.redone?null:Zt(e, t.redone); if (null!==t&&t.parent._item===c) {
            l=t; break;
          }l=l.right;
        }
      } const u=Kt(i, o); const d=At(o, u); const h=new Tr(d, a, a&&a.lastId, l, l&&l.id, null===c?t.parent:c.content.type, t.parentSub, t.content.copy()); return t.redone=d, Sr(h, !0), h.integrate(e, 0), h;
    }; class Tr extends ir {
      constructor(e, t, n, r, i, o, s, a) {
        super(e, a.getLength()), this.origin=n, this.left=t, this.right=r, this.rightOrigin=i, this.parent=o, this.parentSub=s, this.redone=null, this.content=a, this.info=this.content.isCountable()?2:0;
      } set marker(e) {
        (8&this.info)>0!==e&&(this.info^=8);
      } get marker() {
        return (8&this.info)>0;
      } get keep() {
        return (1&this.info)>0;
      } set keep(e) {
        this.keep!==e&&(this.info^=1);
      } get countable() {
        return (2&this.info)>0;
      } get deleted() {
        return (4&this.info)>0;
      } set deleted(e) {
        this.deleted!==e&&(this.info^=4);
      }markDeleted() {
        this.info|=4;
      }getMissing(e, t) {
        if (this.origin&&this.origin.client!==this.id.client&&this.origin.clock>=Kt(t, this.origin.client)) return this.origin.client; if (this.rightOrigin&&this.rightOrigin.client!==this.id.client&&this.rightOrigin.clock>=Kt(t, this.rightOrigin.client)) return this.rightOrigin.client; if (this.parent&&this.parent.constructor===Et&&this.id.client!==this.parent.client&&this.parent.clock>=Kt(t, this.parent.client)) return this.parent.client; if (this.origin&&(this.left=Qt(e, t, this.origin), this.origin=this.left.lastId), this.rightOrigin&&(this.right=Zt(e, this.rightOrigin), this.rightOrigin=this.right.id), (this.left&&this.left.constructor===or||this.right&&this.right.constructor===or)&&(this.parent=null), this.parent) {
          if (this.parent.constructor===Et) {
            const e=Gt(t, this.parent); e.constructor===or?this.parent=null:this.parent=e.content.type;
          }
        } else this.left&&this.left.constructor===Tr&&(this.parent=this.left.parent, this.parentSub=this.left.parentSub), this.right&&this.right.constructor===Tr&&(this.parent=this.right.parent, this.parentSub=this.right.parentSub); return null;
      }integrate(e, t) {
        if (t>0&&(this.id.clock+=t, this.left=Qt(e, e.doc.store, At(this.id.client, this.id.clock-1)), this.origin=this.left.lastId, this.content=this.content.splice(t), this.length-=t), this.parent) {
          if (!this.left&&(!this.right||null!==this.right.left)||this.left&&this.left.right!==this.right) {
            let t; let n=this.left; if (null!==n)t=n.right; else if (null!==this.parentSub) for (t=this.parent._map.get(this.parentSub)||null; null!==t&&null!==t.left;)t=t.left; else t=this.parent._start; const r=new Set; const i=new Set; for (;null!==t&&t!==this.right;) {
              if (i.add(t), r.add(t), Nt(this.origin, t.origin)) {
                if (t.id.client<this.id.client)n=t, r.clear(); else if (Nt(this.rightOrigin, t.rightOrigin)) break;
              } else {
                if (null===t.origin||!i.has(Gt(e.doc.store, t.origin))) break; r.has(Gt(e.doc.store, t.origin))||(n=t, r.clear());
              }t=t.right;
            } this.left=n;
          } if (null!==this.left) {
            const e=this.left.right; this.right=e, this.left.right=this;
          } else {
            let e; if (null!==this.parentSub) for (e=this.parent._map.get(this.parentSub)||null; null!==e&&null!==e.left;)e=e.left; else e=this.parent._start, this.parent._start=this; this.right=e;
          }null!==this.right?this.right.left=this:null!==this.parentSub&&(this.parent._map.set(this.parentSub, this), null!==this.left&&this.left.delete(e)), null===this.parentSub&&this.countable&&!this.deleted&&(this.parent._length+=this.length), Jt(e.doc.store, this), this.content.integrate(e, this), rn(e, this.parent, this.parentSub), (null!==this.parent._item&&this.parent._item.deleted||null!==this.parentSub&&null!==this.right)&&this.delete(e);
        } else new or(this.id, this.length).integrate(e, 0);
      } get next() {
        let e=this.right; for (;null!==e&&e.deleted;)e=e.right; return e;
      } get prev() {
        let e=this.left; for (;null!==e&&e.deleted;)e=e.left; return e;
      } get lastId() {
        return 1===this.length?this.id:At(this.id.client, this.id.clock+this.length-1);
      }mergeWith(e) {
        return !!(Nt(e.origin, this.lastId)&&this.right===e&&Nt(this.rightOrigin, e.rightOrigin)&&this.id.client===e.id.client&&this.id.clock+this.length===e.id.clock&&this.deleted===e.deleted&&null===this.redone&&null===e.redone&&this.content.constructor===e.content.constructor&&this.content.mergeWith(e.content))&&(e.keep&&(this.keep=!0), this.right=e.right, null!==this.right&&(this.right.left=this), this.length+=e.length, !0);
      }delete(e) {
        if (!this.deleted) {
          const t=this.parent; this.countable&&null===this.parentSub&&(t._length-=this.length), this.markDeleted(), it(e.deleteSet, this.id.client, this.id.clock, this.length), rn(e, t, this.parentSub), this.content.delete(e);
        }
      }gc(e, t) {
        if (!this.deleted) throw Te(); this.content.gc(e), t?((e, t, n)=>{
          const r=e.clients.get(t.id.client); r[Yt(r, t.id.clock)]=n;
        })(e, this, new or(this.id, this.length)):this.content=new ar(this.length);
      }write(e, t) {
        const n=t>0?At(this.id.client, this.id.clock+t-1):this.origin; const r=this.rightOrigin; const i=this.parentSub; const o=31&this.content.getRef()|(null===n?0:q)|(null===r?0:64)|(null===i?0:32); if (e.writeInfo(o), null!==n&&e.writeLeftID(n), null!==r&&e.writeRightID(r), null===n&&null===r) {
          const t=this.parent; const n=t._item; if (null===n) {
            const n=Lt(t); e.writeParentInfo(!0), e.writeString(n);
          } else e.writeParentInfo(!1), e.writeLeftID(n.id); null!==i&&e.writeString(i);
        } this.content.write(e, t);
      }
    } const Or=(e, t)=>Dr[31&t](e); const Dr=[()=>{
      throw Te();
    }, (e)=>new ar(e.readLen()), (e)=>{
      const t=e.readLen(); const n=[]; for (let r=0; r<t; r++) {
        const t=e.readString(); 'undefined'===t?n.push(void 0):n.push(JSON.parse(t));
      } return new dr(n);
    }, (e)=>new sr(e.readBuf()), (e)=>new pr(e.readString()), (e)=>new cr(e.readJSON()), (e)=>new ur(e.readString(), e.readJSON()), (e)=>new kr(fr[e.readTypeRef()](e)), (e)=>{
      const t=e.readLen(); const n=[]; for (let r=0; r<t; r++)n.push(e.readAny()); return new hr(n);
    }, (e)=>new lr(new ut({guid: e.readString(), ...e.readAny()}))]; const Er=n(955); const Nr=new Map; const Ar='undefined'==typeof BroadcastChannel?class {
      constructor(e) {
        this.room=e, this.onmessage=null, addEventListener('storage', ((t)=>t.key===e&&null!==this.onmessage&&this.onmessage({data: I(t.newValue||'')})));
      }postMessage(e) {
        T.setItem(this.room, z(new Uint8Array(e)));
      }
    }:BroadcastChannel; const Lr=(e)=>c(Nr, e, (()=>{
      const t=new Set; const n=new Ar(e); return n.onmessage=(e)=>t.forEach(((t)=>t(e.data))), {bc: n, subs: t};
    })); const zr=(e, t)=>{
      const n=Lr(e); n.bc.postMessage(t), n.subs.forEach(((e)=>e(t)));
    }; const Ir=(e, t)=>{
      $(e, 0); const n=((e)=>St(e, new vt))(t); Y(e, n);
    }; const qr=(e, t, n)=>{
      $(e, 1), Y(e, ((e, t)=>((e, t, n=new gt)=>(((e, t, n=new Map)=>{
        xt(e, t.store, n), at(e, st(t.store));
      })(n, e, null==t?new Map:_t(t)), n.toUint8Array()))(e, t, new bt))(t, n));
    }; const Fr=(e, t, n)=>{
      ((e, t, n)=>{
        ((e, t, n, r=pt)=>{
          const i=se(t); kt(i, e, n, new r(i));
        })(e, t, n, wt);
      })(t, ae(e), n);
    }; const Pr=Fr; class Rr extends f {
      constructor(e) {
        super(), this.doc=e, this.states=new Map, this.meta=new Map, this._checkInterval=setInterval((()=>{
          const t=Fe(); null!==this.getLocalState()&&15e3<=t-this.meta.get(e.clientID).lastUpdated&&this.setLocalState(this.getLocalState()); const n=[]; this.meta.forEach(((r, i)=>{
            i!==e.clientID&&3e4<=t-r.lastUpdated&&this.states.has(i)&&n.push(i);
          })), n.length>0&&Br(this, n, 'timeout');
        }), m(3e3)), e.on('destroy', (()=>{
          this.destroy();
        })), this.setLocalState({});
      }destroy() {
        super.destroy(), clearInterval(this._checkInterval);
      }getLocalState() {
        return this.states.get(this.doc.clientID)||null;
      }setLocalState(e) {
        const t=this.doc.clientID; const n=this.meta.get(t); const r=void 0===n?0:n.clock+1; const i=this.states.get(t); null===e?this.states.delete(t):this.states.set(t, e), this.meta.set(t, {clock: r, lastUpdated: Fe()}); const o=[]; const s=[]; const a=[]; const l=[]; null===e?l.push(t):null==i?null!=e&&o.push(t):(s.push(t), Ae(i, e)||a.push(t)), (o.length>0||a.length>0||l.length>0)&&this.emit('change', [{added: o, updated: a, removed: l}, 'local']), this.emit('update', [{added: o, updated: s, removed: l}, 'local']);
      }setLocalStateField(e, t) {
        const n=this.getLocalState(); null!==n&&(n[e]=t, this.setLocalState(n));
      }getStates() {
        return this.states;
      }
    } const Br=(e, t, n)=>{
      const r=[]; for (let n=0; n<t.length; n++) {
        const i=t[n]; if (e.states.has(i)) {
          if (e.states.delete(i), i===e.doc.clientID) {
            const t=e.meta.get(i); e.meta.set(i, {clock: t.clock+1, lastUpdated: Fe()});
          }r.push(i);
        }
      }r.length>0&&(e.emit('change', [{added: [], updated: [], removed: r}, n]), e.emit('update', [{added: [], updated: [], removed: r}, n]));
    }; const jr=(e, t, n=e.states)=>{
      const r=t.length; const i=B(); $(i, r); for (let o=0; o<r; o++) {
        const r=t[o]; const s=n.get(r)||null; const a=e.meta.get(r).clock; $(i, r), $(i, a), K(i, JSON.stringify(s));
      } return W(i);
    }; const Wr=()=>{
      let e=!0; return (t, n)=>{
        if (e) {
          e=!1; try {
            t();
          } finally {
            e=!0;
          }
        } else void 0!==n&&n();
      };
    }; const Hr=(e, t)=>console.warn(`Permission denied to access ${e.url}.\n${t}`); const Vr=(e, t, n)=>{
      const r=se(t); const i=B(); switch (ce(r)) {
        case 0: {$(i, 0); const t=((e, t, n, r)=>{
          const i=ce(e); switch (i) {
            case 0: ((e, t, n)=>{
              qr(t, n, ae(e));
            })(e, t, n); break; case 1: Fr(e, n, r); break; case 2: Pr(e, n, r); break; default: throw new Error('Unknown message type');
          } return i;
        })(r, i, e.doc, e); n&&1===t&&!e.synced&&(e.synced=!0); break;} case 3: $(i, 1), Y(i, jr(e.awareness, Array.from(e.awareness.getStates().keys()))); break; case 1: ((e, t, n)=>{
          const r=se(t); const i=Fe(); const o=[]; const s=[]; const a=[]; const l=[]; const c=ce(r); for (let t=0; t<c; t++) {
            const t=ce(r); let n=ce(r); const c=JSON.parse(de(r)); const u=e.meta.get(t); const d=e.states.get(t); const h=void 0===u?0:u.clock; (h<n||h===n&&null===c&&e.states.has(t))&&(null===c?t===e.doc.clientID&&null!=e.getLocalState()?n++:e.states.delete(t):e.states.set(t, c), e.meta.set(t, {clock: n, lastUpdated: i}), void 0===u&&null!==c?o.push(t):void 0!==u&&null===c?l.push(t):null!==c&&(Ae(c, d)||a.push(t), s.push(t)));
          }(o.length>0||a.length>0||l.length>0)&&e.emit('change', [{added: o, updated: a, removed: l}, n]), (o.length>0||s.length>0||l.length>0)&&e.emit('update', [{added: o, updated: s, removed: l}, n]);
        })(e.awareness, ae(r), e); break; case 2: ((e, t, n)=>{
          switch (ce(e)) {
            case 0: n(t, de(e));
          }
        })(r, e.doc, Hr); break; default: return console.error('Unable to compute message'), i;
      } return i;
    }; const $r=(e)=>{
      if (e.shouldConnect&&null===e.ws) {
        const t=new e._WS(e.url); t.binaryType='arraybuffer', e.ws=t, e.wsconnecting=!0, e.wsconnected=!1, e.synced=!1, t.onmessage=(n)=>{
          e.wsLastMessageReceived=Fe(); const r=Vr(e, new Uint8Array(n.data), !0); j(r)>1&&t.send(W(r));
        }, t.onclose=()=>{
          e.ws=null, e.wsconnecting=!1, e.wsconnected?(e.wsconnected=!1, e.synced=!1, Br(e.awareness, Array.from(e.awareness.getStates().keys()), e), e.emit('status', [{status: 'disconnected'}])):e.wsUnsuccessfulReconnects++, setTimeout($r, y(1200*v(e.wsUnsuccessfulReconnects+1), 2500), e);
        }, t.onopen=()=>{
          e.wsLastMessageReceived=Fe(), e.wsconnecting=!1, e.wsconnected=!0, e.wsUnsuccessfulReconnects=0, e.emit('status', [{status: 'connected'}]); const n=B(); if ($(n, 0), Ir(n, e.doc), t.send(W(n)), null!==e.awareness.getLocalState()) {
            const n=B(); $(n, 1), Y(n, jr(e.awareness, [e.doc.clientID])), t.send(W(n));
          }
        }, e.emit('status', [{status: 'connecting'}]);
      }
    }; const Ur=(e, t)=>{
      e.wsconnected&&e.ws.send(t), e.bcconnected&&e.mux((()=>{
        zr(e.bcChannel, t);
      }));
    }; const Kr=n(297); const Jr=n(778); const Yr=n(751); const Gr=new i.H$('y-sync'); const Xr=new i.H$('y-undo'); const Zr=new i.H$('yjs-cursor'); const Qr=(e)=>class {
      constructor(e) {
        this._=e;
      }destroy() {
        e(this._);
      }
    }; const ei=Qr(clearTimeout); Qr(clearInterval), Qr(((e)=>'undefined'!=typeof requestAnimationFrame&&cancelAnimationFrame(e))), Qr(((e)=>'undefined'!=typeof cancelIdleCallback&&cancelIdleCallback(e))); let ti=null; const ni=()=>{
      const e=ti; ti=null, e.forEach(((e, t)=>{
        const n=t.state.tr; e.forEach(((e, t)=>{
          n.setMeta(t, e);
        })), t.dispatch(n);
      }));
    }; const ri=(e, t, n)=>{
      if (0===e) return Rt(t, 0); let r=null===t._first?null:t._first.content.type; for (;null!==r&&t!==r;) {
        if (r.constructor===rr) {
          if (r._length>=e) return Rt(r, e); if (e-=r._length, null!==r._item&&null!==r._item.next)r=r._item.next.content.type; else {
            do {
              r=null===r._item?null:r._item.parent, e--;
            } while (r!==t&&null!==r&&null!==r._item&&null===r._item.next); null!==r&&r!==t&&(r=null===r._item?null:r._item.next.content.type);
          }
        } else {
          const i=(n.get(r)||{nodeSize: 0}).nodeSize; if (null!==r._first&&e<i)r=r._first.content.type, e--; else {
            if (1===e&&0===r._length&&i>1) return new It(null===r._item?null:r._item.id, null===r._item?Lt(r):null, null); if (e-=i, null!==r._item&&null!==r._item.next)r=r._item.next.content.type; else {
              if (0===e) return r=null===r._item?r:r._item.parent, new It(null===r._item?null:r._item.id, null===r._item?Lt(r):null, null); do {
                r=r._item.parent, e--;
              } while (r!==t&&null===r._item.next); r!==t&&(r=r._item.next.content.type);
            }
          }
        } if (null===r) throw Te(); if (0===e&&r.constructor!==rr&&r!==t) return new It(null===r._item?null:r._item.id, null===r._item?Lt(r):null, null);
      } return Rt(t, t._length);
    }; const ii=(e, t, n, r)=>{
      const i=((e, t)=>{
        const n=t.store; const r=e.item; const i=e.type; const o=e.tname; let s=null; let a=0; if (null!==r) {
          if (Kt(n, r.client)<=r.clock) return null; const e=_r(n, r); const t=e.item; if (!(t instanceof Tr)) return null; if (s=t.parent, null===s._item||!s._item.deleted) {
            a=t.deleted||!t.countable?0:e.diff; let n=t.left; for (;null!==n;)!n.deleted&&n.countable&&(a+=n.length), n=n.left;
          }
        } else {
          if (null!==o)s=t.get(o); else {
            if (null===i) throw Te(); {if (Kt(n, i.client)<=i.clock) return null; const {item: e}=_r(n, i); if (!(e instanceof Tr&&e.content instanceof kr)) return null; s=e.content.type;}
          }a=s._length;
        } return ((e, t)=>new Ft(e, t))(s, a);
      })(n, e); if (null===i||!zt(t, i.type._item)) return null; let o=i.type; let s=0; if (o.constructor===rr)s=i.index; else if (null===o._item||!o._item.deleted) {
        let e=o._first; let t=0; for (;t<o._length&&t<i.index&&null!==e;) {
          if (!e.deleted) {
            const n=e.content.type; t++, n.constructor===rr?s+=n._length:s+=r.get(n).nodeSize;
          }e=e.right;
        }s+=1;
      } for (;o!==t&&null!==o._item;) {
        const e=o._item.parent; if (null===e._item||!e._item.deleted) {
          s+=1; let t=e._first; for (;null!==t;) {
            const e=t.content.type; if (e===o) break; t.deleted||(e.constructor===rr?s+=e._length:s+=r.get(e).nodeSize), t=t.right;
          }
        }o=e;
      } return s-1;
    }; const oi=(e, t)=>void 0===t?!e.deleted:t.sv.has(e.id.client)&&t.sv.get(e.id.client)>e.id.clock&&!nt(t.ds, e.id); const si=[{light: '#ecd44433', dark: '#ecd444'}]; const ai=(e, t, n)=>{
      if (!e.has(n)) {
        if (e.size<t.length) {
          const n=u(); e.forEach(((e)=>n.add(e))), t=t.filter(((e)=>!n.has(e)));
        }e.set(n, (r=t)[m(xe()*r.length)]);
      } let r; return e.get(n);
    }; const li=(e, t)=>({anchor: ri(t.selection.anchor, e.type, e.mapping), head: ri(t.selection.head, e.type, e.mapping)}); class ci {
      constructor(e, t) {
        this.type=e, this.prosemirrorView=t, this.mux=Wr(), this.mapping=new Map, this._observeFunction=this._typeChanged.bind(this), this.doc=e.doc, this.beforeTransactionSelection=null, this.doc.on('beforeAllTransactions', (()=>{
          null===this.beforeTransactionSelection&&(this.beforeTransactionSelection=li(this, t.state));
        })), this.doc.on('afterAllTransactions', ((e)=>{
          this.beforeTransactionSelection=null;
        })), e.observeDeep(this._observeFunction), this._domSelectionInView=null;
      }_isLocalCursorInView() {
        return !!this.prosemirrorView.hasFocus()&&(D&&null===this._domSelectionInView&&(setTimeout((()=>{
          this._domSelectionInView=null;
        }), 0), this._domSelectionInView=this._isDomSelectionInView()), this._domSelectionInView);
      }_isDomSelectionInView() {
        const e=this.prosemirrorView._root.getSelection(); const t=this.prosemirrorView._root.createRange(); t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset); const n=t.getBoundingClientRect(); const r=qe.documentElement; return n.bottom>=0&&n.right>=0&&n.left<=(window.innerWidth||r.clientWidth||0)&&n.top<=(window.innerHeight||r.clientHeight||0);
      }renderSnapshot(e, t) {
        t||(t=Wt(ot(), new Map)), this.prosemirrorView.dispatch(this.prosemirrorView.state.tr.setMeta(Gr, {snapshot: e, prevSnapshot: t}));
      }unrenderSnapshot() {
        this.mapping=new Map, this.mux((()=>{
          const e=this.type.toArray().map(((e)=>di(e, this.prosemirrorView.state.schema, this.mapping))).filter(((e)=>null!==e)); const t=this.prosemirrorView.state.tr.replace(0, this.prosemirrorView.state.doc.content.size, new o.p2(new o.HY(e), 0, 0)); t.setMeta(Gr, {snapshot: null, prevSnapshot: null}), this.prosemirrorView.dispatch(t);
        }));
      }_forceRerender() {
        this.mapping=new Map, this.mux((()=>{
          const e=this.type.toArray().map(((e)=>di(e, this.prosemirrorView.state.schema, this.mapping))).filter(((e)=>null!==e)); const t=this.prosemirrorView.state.tr.replace(0, this.prosemirrorView.state.doc.content.size, new o.p2(new o.HY(e), 0, 0)); this.prosemirrorView.dispatch(t);
        }));
      }_renderSnapshot(e, t, n) {
        e||(e=((e)=>Wt(st(e.store), Ut(e.store)))(this.doc)), this.mapping=new Map, this.mux((()=>{
          this.doc.transact(((r)=>{
            const i=n.permanentUserData; i&&i.dss.forEach(((e)=>{
              tt(r, e, ((e)=>{}));
            })); const s=(e, t)=>{
              const r='added'===e?i.getUserByClientId(t.client):i.getUserByDeletedId(t); return {user: r, type: e, color: ai(n.colorMapping, n.colors, r)};
            }; const a=kn(this.type, new jt(t.ds, e.sv)).map(((n)=>!n._item.deleted||oi(n._item, e)||oi(n._item, t)?di(n, this.prosemirrorView.state.schema, new Map, e, t, s):null)).filter(((e)=>null!==e)); const l=this.prosemirrorView.state.tr.replace(0, this.prosemirrorView.state.doc.content.size, new o.p2(new o.HY(a), 0, 0)); this.prosemirrorView.dispatch(l);
          }), Gr);
        }));
      }_typeChanged(e, t) {
        const n=Gr.getState(this.prosemirrorView.state); 0!==e.length&&null==n.snapshot&&null==n.prevSnapshot?this.mux((()=>{
          const e=(e, t)=>this.mapping.delete(t); tt(t, t.deleteSet, ((e)=>e.constructor===Tr&&this.mapping.delete(e.content.type))), t.changed.forEach(e), t.changedParentTypes.forEach(e); const n=this.type.toArray().map(((e)=>ui(e, this.prosemirrorView.state.schema, this.mapping))).filter(((e)=>null!==e)); let r=this.prosemirrorView.state.tr.replace(0, this.prosemirrorView.state.doc.content.size, new o.p2(new o.HY(n), 0, 0)); ((e, t, n)=>{
            if (null!==t&&null!==t.anchor&&null!==t.head) {
              const r=ii(n.doc, n.type, t.anchor, n.mapping); const o=ii(n.doc, n.type, t.head, n.mapping); null!==r&&null!==o&&(e=e.setSelection(i.Bs.create(e.doc, r, o)));
            }
          })(r, this.beforeTransactionSelection, this), r=r.setMeta(Gr, {isChangeOrigin: !0}), null!==this.beforeTransactionSelection&&this._isLocalCursorInView()&&r.scrollIntoView(), this.prosemirrorView.dispatch(r);
        })):this.renderSnapshot(n.snapshot, n.prevSnapshot);
      }_prosemirrorChanged(e) {
        this.mux((()=>{
          this.doc.transact((()=>{
            ki(this.doc, this.type, e, this.mapping), this.beforeTransactionSelection=li(this, this.prosemirrorView.state);
          }), Gr);
        }));
      }destroy() {
        this.type.unobserveDeep(this._observeFunction);
      }
    } const ui=(e, t, n, r, i, o)=>{
      const s=n.get(e); if (void 0===s) {
        if (e instanceof er) return di(e, t, n, r, i, o); throw Me();
      } return s;
    }; const di=(e, t, n, r, i, o)=>{
      const s=[]; const a=(e)=>{
        if (e.constructor===er) {
          const a=ui(e, t, n, r, i, o); null!==a&&s.push(a);
        } else {
          const a=hi(e, t, n, r, i, o); null!==a&&a.forEach(((e)=>{
            null!==e&&s.push(e);
          }));
        }
      }; void 0===r||void 0===i?e.toArray().forEach(a):kn(e, new jt(i.ds, r.sv)).forEach(a); try {
        const a=e.getAttributes(r); void 0!==r&&(oi(e._item, r)?oi(e._item, i)||(a.ychange=o?o('added', e._item.id):{type: 'added'}):a.ychange=o?o('removed', e._item.id):{type: 'removed'}); const l=t.node(e.nodeName, a, s); return n.set(e, l), l;
      } catch (t) {
        return e.doc.transact(((t)=>{
          e._item.delete(t);
        }), Gr), n.delete(e), null;
      }
    }; const hi=(e, t, n, r, i, o)=>{
      const s=[]; const a=e.toDelta(r, i, o); try {
        for (let e=0; e<a.length; e++) {
          const n=a[e]; const r=[]; for (const e in n.attributes)r.push(t.mark(e, n.attributes[e])); s.push(t.text(n.insert, r));
        }
      } catch (t) {
        return e.doc.transact(((t)=>{
          e._item.delete(t);
        }), Gr), null;
      } return s;
    }; const pi=(e, t)=>e instanceof Array?((e, t)=>{
      const n=new rr; const r=e.map(((e)=>({insert: e.text, attributes: xi(e.marks)}))); return n.applyDelta(r), t.set(n, e), n;
    })(e, t):((e, t)=>{
      const n=new er(e.type.name); for (const t in e.attrs) {
        const r=e.attrs[t]; null!==r&&'ychange'!==t&&n.setAttribute(t, r);
      } return n.insert(0, mi(e).map(((e)=>pi(e, t)))), t.set(n, e), n;
    })(e, t); const fi=(e, t)=>{
      const n=Object.keys(e).filter(((t)=>null!==e[t])); let r=n.length===Object.keys(t).filter(((e)=>null!==t[e])).length; for (let i=0; i<n.length&&r; i++) {
        const o=n[i]; const s=e[o]; const a=t[o]; r='ychange'===o||s===a||'object'==typeof s&&'object'==typeof a&&fi(s, a);
      } return r;
    }; const mi=(e)=>{
      const t=e.content.content; const n=[]; for (let e=0; e<t.length; e++) {
        const r=t[e]; if (r.isText) {
          const r=[]; for (let n=t[e]; e<t.length&&n.isText; n=t[++e])r.push(n); e--, n.push(r);
        } else n.push(r);
      } return n;
    }; const gi=(e, t)=>{
      const n=e.toDelta(); return n.length===t.length&&n.every(((e, n)=>e.insert===t[n].text&&Oe(e.attributes||{}).length===t[n].marks.length&&t[n].marks.every(((t)=>fi(e.attributes[t.type.name]||{}, t.attrs)))));
    }; const vi=(e, t)=>{
      if (e instanceof er&&!(t instanceof Array)&&_i(e, t)) {
        const n=mi(t); return e._length===n.length&&fi(e.getAttributes(), t.attrs)&&e.toArray().every(((e, t)=>vi(e, n[t])));
      } return e instanceof rr&&t instanceof Array&&gi(e, t);
    }; const yi=(e, t)=>e===t||e instanceof Array&&t instanceof Array&&e.length===t.length&&e.every(((e, n)=>t[n]===e)); const bi=(e, t, n)=>{
      const r=e.toArray(); const i=mi(t); const o=i.length; const s=r.length; const a=y(s, o); let l=0; let c=0; let u=!1; for (;l<a; l++) {
        const e=r[l]; const t=i[l]; if (yi(n.get(e), t))u=!0; else if (!vi(e, t)) break;
      } for (;l+c<a; c++) {
        const e=r[s-c-1]; const t=i[o-c-1]; if (yi(n.get(e), t))u=!0; else if (!vi(e, t)) break;
      } return {equalityFactor: l+c, foundMappedChild: u};
    }; const wi=(e, t, n)=>{
      n.set(e, t); const {nAttrs: r, str: i}=((e)=>{
        let t=''; let n=e._start; const r={}; for (;null!==n;)n.deleted||(n.countable&&n.content instanceof pr?t+=n.content.str:n.content instanceof ur&&(r[n.content.key]=null)), n=n.right; return {str: t, nAttrs: r};
      })(e); const o=t.map(((e)=>({insert: e.text, attributes: Object.assign({}, r, xi(e.marks))}))); const {insert: s, remove: a, index: l}=((e, t)=>{
        let n=0; let r=0; for (;n<e.length&&n<t.length&&e[n]===t[n];)n++; if (n!==e.length||n!==t.length) for (;r+n<e.length&&r+n<t.length&&e[e.length-r-1]===t[t.length-r-1];)r++; return {index: n, remove: e.length-n-r, insert: t.slice(n, t.length-r)};
      })(i, o.map(((e)=>e.insert)).join('')); e.delete(l, a), e.insert(l, s), e.applyDelta(o.map(((e)=>({retain: e.insert.length, attributes: e.attributes}))));
    }; const xi=(e)=>{
      const t={}; return e.forEach(((e)=>{
        'ychange'!==e.type.name&&(t[e.type.name]=e.attrs);
      })), t;
    }; const ki=(e, t, n, r)=>{
      if (t instanceof er&&t.nodeName!==n.type.name) throw new Error('node name mismatch!'); if (r.set(t, n), t instanceof er) {
        const e=t.getAttributes(); const r=n.attrs; for (const n in r)null!==r[n]?e[n]!==r[n]&&'ychange'!==n&&t.setAttribute(n, r[n]):t.removeAttribute(n); for (const n in e) void 0===r[n]&&t.removeAttribute(n);
      } const i=mi(n); const o=i.length; const s=t.toArray(); const a=s.length; const l=y(o, a); let c=0; let u=0; for (;c<l; c++) {
        const e=s[c]; const t=i[c]; if (!yi(r.get(e), t)) {
          if (!vi(e, t)) break; r.set(e, t);
        }
      } for (;u+c+1<l; u++) {
        const e=s[a-u-1]; const t=i[o-u-1]; if (!yi(r.get(e), t)) {
          if (!vi(e, t)) break; r.set(e, t);
        }
      }e.transact((()=>{
        for (;a-c-u>0&&o-c-u>0;) {
          const n=s[c]; const l=i[c]; const d=s[a-u-1]; const h=i[o-u-1]; if (n instanceof rr&&l instanceof Array)gi(n, l)||wi(n, l, r), c+=1; else {
            let i=n instanceof er&&_i(n, l); let o=d instanceof er&&_i(d, h); if (i&&o) {
              const e=bi(n, l, r); const t=bi(d, h, r); e.foundMappedChild&&!t.foundMappedChild?o=!1:!e.foundMappedChild&&t.foundMappedChild||e.equalityFactor<t.equalityFactor?i=!1:o=!1;
            }i?(ki(e, n, l, r), c+=1):o?(ki(e, d, h, r), u+=1):(t.delete(c, 1), t.insert(c, [pi(l, r)]), c+=1);
          }
        } const n=a-c-u; if (n>0&&t.delete(c, n), c+u<o) {
          const e=[]; for (let t=c; t<o-u; t++)e.push(pi(i[t], r)); t.insert(c, e);
        }
      }), Gr);
    }; const _i=(e, t)=>!(t instanceof Array)&&e.nodeName===t.type.name; const Si=(e)=>{
      const t=document.createElement('span'); t.classList.add('ProseMirror-yjs-cursor'), t.setAttribute('style', `border-color: ${e.color}`); const n=document.createElement('div'); return n.setAttribute('style', `background-color: ${e.color}`), n.insertBefore(document.createTextNode(e.name), null), t.insertBefore(n, null), t;
    }; const Ci=(e, t, n)=>{
      const r=Gr.getState(e); const i=r.doc; const o=[]; return null!=r.snapshot||null!=r.prevSnapshot||null===r.binding?s.EH.create(e.doc, []):(t.getStates().forEach(((t, a)=>{
        if (a!==i.clientID&&null!=t.cursor) {
          const l=t.user||{}; null==l.color&&(l.color='#ffa500'), null==l.name&&(l.name=`User: ${a}`); let c=ii(i, r.type, qt(t.cursor.anchor), r.binding.mapping); let u=ii(i, r.type, qt(t.cursor.head), r.binding.mapping); if (null!==c&&null!==u) {
            const t=b(e.doc.content.size-1, 0); c=y(c, t), u=y(u, t), o.push(s.p.widget(u, (()=>n(l)), {key: a+'', side: 10})); const r=y(c, u); const i=b(c, u); o.push(s.p.inline(r, i, {style: `background-color: ${l.color}70`}, {inclusiveEnd: !0, inclusiveStart: !1}));
          }
        }
      })), s.EH.create(e.doc, o));
    }; const Mi=(e)=>{
      const t=Xr.getState(e).undoManager; if (null!=t) return t.redo(), !0;
    }; function Ti(e) {
      const t=document.createElement('span'); t.classList.add('ProseMirror-yjs-cursor'); const n=document.createElement('div'); return n.insertBefore(document.createTextNode(111), null), t.insertBefore(n, null), t;
    } const Oi=localStorage.getItem('id'); Ti(); const Di=new ut; const Ei=new class extends f {
      constructor(e, t, n, {connect: r=!0, awareness: i=new Rr(n), params: o={}, WebSocketPolyfill: s=WebSocket, resyncInterval: a=-1}={}) {
        for (super(); '/'===e[e.length-1];)e=e.slice(0, e.length-1); const l=((e)=>((e, t)=>{
          const n=[]; for (const r in e)n.push(t(e[r], r)); return n;
        })(e, ((e, t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e)}`)).join('&'))(o); this.bcChannel=e+'/'+t, this.url=e+'/'+t+(0===l.length?'':'?'+l), this.roomname=t, this.doc=n, this._WS=s, this.awareness=i, this.wsconnected=!1, this.wsconnecting=!1, this.bcconnected=!1, this.wsUnsuccessfulReconnects=0, this.mux=Wr(), this._synced=!1, this.ws=null, this.wsLastMessageReceived=0, this.shouldConnect=r, this._resyncInterval=0, a>0&&(this._resyncInterval=setInterval((()=>{
          if (this.ws) {
            const e=B(); $(e, 0), Ir(e, n), this.ws.send(W(e));
          }
        }), a)), this._bcSubscriber=(e)=>{
          this.mux((()=>{
            const t=Vr(this, new Uint8Array(e), !1); j(t)>1&&zr(this.bcChannel, W(t));
          }));
        }, this._updateHandler=(e, t)=>{
          if (t!==this||null===t) {
            const t=B(); $(t, 0), ((e, t)=>{
              $(e, 2), Y(e, t);
            })(t, e), Ur(this, W(t));
          }
        }, this.doc.on('update', this._updateHandler), this._awarenessUpdateHandler=({added: e, updated: t, removed: n}, r)=>{
          const o=e.concat(t).concat(n); const s=B(); $(s, 1), Y(s, jr(i, o)), Ur(this, W(s));
        }, window.addEventListener('beforeunload', (()=>{
          Br(this.awareness, [n.clientID], 'window unload');
        })), i.on('update', this._awarenessUpdateHandler), this._checkInterval=setInterval((()=>{
          this.wsconnected&&3e4<Fe()-this.wsLastMessageReceived&&this.ws.close();
        }), 3e3), r&&this.connect();
      } get synced() {
        return this._synced;
      } set synced(e) {
        this._synced!==e&&(this._synced=e, this.emit('sync', [e]));
      }destroy() {
        0!==this._resyncInterval&&clearInterval(this._resyncInterval), clearInterval(this._checkInterval), this.disconnect(), this.awareness.off('update', this._awarenessUpdateHandler), this.doc.off('update', this._updateHandler), super.destroy();
      }connectBc() {
        let e; let t; this.bcconnected||(e=this.bcChannel, t=this._bcSubscriber, Lr(e).subs.add(t), this.bcconnected=!0), this.mux((()=>{
          const e=B(); $(e, 0), Ir(e, this.doc), zr(this.bcChannel, W(e)); const t=B(); $(t, 0), qr(t, this.doc), zr(this.bcChannel, W(t)); const n=B(); $(n, 3), zr(this.bcChannel, W(n)); const r=B(); $(r, 1), Y(r, jr(this.awareness, [this.doc.clientID])), zr(this.bcChannel, W(r));
        }));
      }disconnectBc() {
        const e=B(); let t; let n; $(e, 1), Y(e, jr(this.awareness, [this.doc.clientID], new Map)), Ur(this, W(e)), this.bcconnected&&(t=this.bcChannel, n=this._bcSubscriber, Lr(t).subs.delete(n), this.bcconnected=!1);
      }disconnect() {
        this.shouldConnect=!1, this.disconnectBc(), null!==this.ws&&this.ws.close();
      }connect() {
        this.shouldConnect=!0, this.wsconnected||null!==this.ws||($r(this), this.connectBc());
      }
    }('ws://localhost:1234', `${Oi}`, Di); const Ni=Di.getXmlFragment('prosemirror'); window.view=new s.tk(document.querySelector('#editor'), {state: i.yy.create({schema: Er.fK, plugins: [((e, {colors: t=si, colorMapping: n=new Map, permanentUserData: r=null}={})=>{
      let o=!1; const s=new i.Sy({props: {editable: (e)=>{
        const t=Gr.getState(e); return null==t.snapshot&&null==t.prevSnapshot;
      }}, key: Gr, state: {init: (i, o)=>({type: e, doc: e.doc, binding: null, snapshot: null, prevSnapshot: null, isChangeOrigin: !1, colors: t, colorMapping: n, permanentUserData: r}), apply: (e, t)=>{
        const n=e.getMeta(Gr); if (void 0!==n) {
          t=Object.assign({}, t); for (const e in n)t[e]=n[e];
        } return t.isChangeOrigin=void 0!==n&&!!n.isChangeOrigin, null!==t.binding&&(void 0===n||null==n.snapshot&&null==n.prevSnapshot||setTimeout((()=>{
null==n.restore?t.binding._renderSnapshot(n.snapshot, n.prevSnapshot, t):(t.binding._renderSnapshot(n.snapshot, n.snapshot, t), delete t.restore, delete t.snapshot, delete t.prevSnapshot, t.binding._prosemirrorChanged(t.binding.prosemirrorView.state.doc));
        }), 0)), t;
      }}, view: (t)=>{
        const n=new ci(e, t); return setTimeout((()=>{
          n._forceRerender(), t.dispatch(t.state.tr.setMeta(Gr, {binding: n}));
        }), 0), {update: ()=>{
          const e=s.getState(t.state); if (null==e.snapshot&&null==e.prevSnapshot) {
            const e=t.state.doc.type.createAndFill().content.size; (o||t.state.doc.content.size>e)&&(o=!0, n._prosemirrorChanged(t.state.doc));
          }
        }, destroy: ()=>{
          n.destroy();
        }};
      }}); return s;
    })(Ni), ((e, {cursorBuilder: t=Si, getSelection: n=((e)=>e.selection)}={}, r='cursor')=>new i.Sy({key: Zr, state: {init: (n, r)=>Ci(r, e, t), apply(n, r, i, o) {
      const s=Gr.getState(o); const a=n.getMeta(Zr); return s&&s.isChangeOrigin||a&&a.awarenessUpdated?Ci(o, e, t):r.map(n.mapping, n.doc);
    }}, props: {decorations: (e)=>Zr.getState(e)}, view: (t)=>{
      const i=()=>{
        t.docView&&((e, t, n)=>{
          ti||(ti=new Map, ((e, t)=>{
            new ei(setTimeout(t, e));
          })(0, ni)), c(ti, e, a).set(t, {awarenessUpdated: !0});
        })(t, Zr);
      }; const o=()=>{
        const i=Gr.getState(t.state); const o=e.getLocalState()||{}; if (t.hasFocus()&&null!==i.binding) {
          const s=n(t.state); const a=ri(s.anchor, i.type, i.binding.mapping); const l=ri(s.head, i.type, i.binding.mapping); null!=o.cursor&&Bt(qt(o.cursor.anchor), a)&&Bt(qt(o.cursor.head), l)||e.setLocalStateField(r, {anchor: a, head: l});
        } else null!=o.cursor&&null!==ii(i.doc, i.type, qt(o.cursor.anchor), i.binding.mapping)&&e.setLocalStateField(r, null);
      }; return e.on('change', i), t.dom.addEventListener('focusin', o), t.dom.addEventListener('focusout', o), {update: o, destroy: ()=>{
        e.off('change', i), e.setLocalStateField(r, null);
      }};
    }}))(Ei.awareness, {cursorBuilder: Ti}), (({protectedNodes: e=new Set(['paragraph']), trackedOrigins: t=[]}={})=>new i.Sy({key: Xr, state: {init: (n, r)=>{
      const i=Gr.getState(r); const o=new un(i.type, {trackedOrigins: new Set([Gr].concat(t)), deleteFilter: (t)=>!(t instanceof Tr&&t.content instanceof kr&&(t.content.type instanceof Xn||t.content.type instanceof er&&e.has(t.content.type.nodeName))&&0!==t.content.type._length)}); return {undoManager: o, prevSel: null, hasUndoOps: o.undoStack.length>0, hasRedoOps: o.redoStack.length>0};
    }, apply: (e, t, n, r)=>{
      const i=Gr.getState(r).binding; const o=t.undoManager; const s=o.undoStack.length>0; const a=o.redoStack.length>0; return i?{undoManager: o, prevSel: li(i, n), hasUndoOps: s, hasRedoOps: a}:s!==t.hasUndoOps||a!==t.hasRedoOps?Object.assign({}, t, {hasUndoOps: o.undoStack.length>0, hasRedoOps: o.redoStack.length>0}):t;
    }}, view: (e)=>{
      const t=Gr.getState(e.state); const n=Xr.getState(e.state).undoManager; return n.on('stack-item-added', (({stackItem: n})=>{
        const r=t.binding; r&&n.meta.set(r, Xr.getState(e.state).prevSel);
      })), n.on('stack-item-popped', (({stackItem: e})=>{
        const n=t.binding; n&&(n.beforeTransactionSelection=e.meta.get(n)||n.beforeTransactionSelection);
      })), {destroy: ()=>{
        n.destroy();
      }};
    }}))(), (0, Yr.h)(Jr.YR, {'Mod-z': (e)=>{
      const t=Xr.getState(e).undoManager; if (null!=t) return t.undo(), !0;
    }, 'Mod-y': Mi, 'Mod-Shift-z': Mi})].concat((0, Kr.jR)({schema: Er.fK}))}), nodeViews: {code_block: (e, t, n)=>new CodeBlockView(e, t, n)}}), r;
  }, 186: (e, t, n)=>{
    'use strict'; n.d(t, {q: ()=>o}); const r='http://www.w3.org/2000/svg'; const i='ProseMirror-icon'; function o(e) {
      const t=document.createElement('div'); if (t.className=i, e.path) {
        const n='pm-icon-'+function(e) {
          let t=0; for (let n=0; n<e.length; n++)t=(t<<5)-t+e.charCodeAt(n)|0; return t;
        }(e.path).toString(16); document.getElementById(n)||function(e, t) {
          let n=document.getElementById(i+'-collection'); n||(n=document.createElementNS(r, 'svg'), n.id=i+'-collection', n.style.display='none', document.body.insertBefore(n, document.body.firstChild)); const o=document.createElementNS(r, 'symbol'); o.id=e, o.setAttribute('viewBox', '0 0 '+t.width+' '+t.height), o.appendChild(document.createElementNS(r, 'path')).setAttribute('d', t.path), n.appendChild(o);
        }(n, e); const o=t.appendChild(document.createElementNS(r, 'svg')); o.style.width=e.width/e.height+'em', o.appendChild(document.createElementNS(r, 'use')).setAttributeNS('http://www.w3.org/1999/xlink', 'href', /([^#]*)/.exec(document.location)[1]+'#'+n);
      } else e.dom?t.appendChild(e.dom.cloneNode(!0)):(t.appendChild(document.createElement('span')).textContent=e.text||'', e.css&&(t.firstChild.style.cssText=e.css)); return t;
    }
  }, 297: (e, t, n)=>{
    'use strict'; n.d(t, {jR: ()=>z}); const r=n(751); const i=n(189); const o=n(778); const s=n(922); const a=n(81); function l(e) {
      return void 0===e&&(e={}), new s.Sy({view: function(t) {
        return new c(t, e);
      }});
    } var c=function(e, t) {
      const n=this; this.editorView=e, this.width=t.width||1, this.color=t.color||'black', this.class=t.class, this.cursorPos=null, this.element=null, this.timeout=null, this.handlers=['dragover', 'dragend', 'drop', 'dragleave'].map((function(t) {
        const r=function(e) {
          return n[t](e);
        }; return e.dom.addEventListener(t, r), {name: t, handler: r};
      }));
    }; c.prototype.destroy=function() {
      const e=this; this.handlers.forEach((function(t) {
        const n=t.name; const r=t.handler; return e.editorView.dom.removeEventListener(n, r);
      }));
    }, c.prototype.update=function(e, t) {
      null!=this.cursorPos&&t.doc!=e.state.doc&&this.updateOverlay();
    }, c.prototype.setCursor=function(e) {
      e!=this.cursorPos&&(this.cursorPos=e, null==e?(this.element.parentNode.removeChild(this.element), this.element=null):this.updateOverlay());
    }, c.prototype.updateOverlay=function() {
      let e; const t=this.editorView.state.doc.resolve(this.cursorPos); if (!t.parent.inlineContent) {
        const n=t.nodeBefore; const r=t.nodeAfter; if (n||r) {
          const i=this.editorView.nodeDOM(this.cursorPos-(n?n.nodeSize:0)).getBoundingClientRect(); let o=n?i.bottom:i.top; n&&r&&(o=(o+this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top)/2), e={left: i.left, right: i.right, top: o-this.width/2, bottom: o+this.width/2};
        }
      } if (!e) {
        const s=this.editorView.coordsAtPos(this.cursorPos); e={left: s.left-this.width/2, right: s.left+this.width/2, top: s.top, bottom: s.bottom};
      } const a=this.editorView.dom.offsetParent; this.element||(this.element=a.appendChild(document.createElement('div')), this.class&&(this.element.className=this.class), this.element.style.cssText='position: absolute; z-index: 50; pointer-events: none; background-color: '+this.color); const l=!a||a==document.body&&'static'==getComputedStyle(a).position?{left: -pageXOffset, top: -pageYOffset}:a.getBoundingClientRect(); this.element.style.left=e.left-l.left+'px', this.element.style.top=e.top-l.top+'px', this.element.style.width=e.right-e.left+'px', this.element.style.height=e.bottom-e.top+'px';
    }, c.prototype.scheduleRemoval=function(e) {
      const t=this; clearTimeout(this.timeout), this.timeout=setTimeout((function() {
        return t.setCursor(null);
      }), e);
    }, c.prototype.dragover=function(e) {
      if (this.editorView.editable) {
        const t=this.editorView.posAtCoords({left: e.clientX, top: e.clientY}); if (t) {
          let n=t.pos; this.editorView.dragging&&this.editorView.dragging.slice&&null==(n=(0, a.nj)(this.editorView.state.doc, n, this.editorView.dragging.slice))&&(n=t.pos), this.setCursor(n), this.scheduleRemoval(5e3);
        }
      }
    }, c.prototype.dragend=function() {
      this.scheduleRemoval(20);
    }, c.prototype.drop=function() {
      this.scheduleRemoval(20);
    }, c.prototype.dragleave=function(e) {
      e.target!=this.editorView.dom&&this.editorView.dom.contains(e.relatedTarget)||this.setCursor(null);
    }; const u=n(780); const d=n(638); const h=function(e) {
      function t(t) {
        e.call(this, t, t);
      } return e&&(t.__proto__=e), t.prototype=Object.create(e&&e.prototype), t.prototype.constructor=t, t.prototype.map=function(n, r) {
        const i=n.resolve(r.map(this.head)); return t.valid(i)?new t(i):e.near(i);
      }, t.prototype.content=function() {
        return d.p2.empty;
      }, t.prototype.eq=function(e) {
        return e instanceof t&&e.head==this.head;
      }, t.prototype.toJSON=function() {
        return {type: 'gapcursor', pos: this.head};
      }, t.fromJSON=function(e, n) {
        if ('number'!=typeof n.pos) throw new RangeError('Invalid input for GapCursor.fromJSON'); return new t(e.resolve(n.pos));
      }, t.prototype.getBookmark=function() {
        return new p(this.anchor);
      }, t.valid=function(e) {
        const t=e.parent; if (t.isTextblock||!function(e) {
          for (let t=e.depth; t>=0; t--) {
            const n=e.index(t); if (0!=n) {
              for (let r=e.node(t).child(n-1); ;r=r.lastChild) {
                if (0==r.childCount&&!r.inlineContent||r.isAtom||r.type.spec.isolating) return !0; if (r.inlineContent) return !1;
              }
            }
          } return !0;
        }(e)||!function(e) {
          for (let t=e.depth; t>=0; t--) {
            const n=e.indexAfter(t); const r=e.node(t); if (n!=r.childCount) {
              for (let i=r.child(n); ;i=i.firstChild) {
                if (0==i.childCount&&!i.inlineContent||i.isAtom||i.type.spec.isolating) return !0; if (i.inlineContent) return !1;
              }
            }
          } return !0;
        }(e)) return !1; const n=t.type.spec.allowGapCursor; if (null!=n) return n; const r=t.contentMatchAt(e.index()).defaultType; return r&&r.isTextblock;
      }, t.findFrom=function(e, n, r) {
        e:for (;;) {
          if (!r&&t.valid(e)) return e; for (var i=e.pos, o=null, a=e.depth; ;a--) {
            const l=e.node(a); if (n>0?e.indexAfter(a)<l.childCount:e.index(a)>0) {
              o=l.child(n>0?e.indexAfter(a):e.index(a)-1); break;
            } if (0==a) return null; i+=n; const c=e.doc.resolve(i); if (t.valid(c)) return c;
          } for (;;) {
            const u=n>0?o.firstChild:o.lastChild; if (!u) {
              if (o.isAtom&&!o.isText&&!s.qv.isSelectable(o)) {
                e=e.doc.resolve(i+o.nodeSize*n), r=!1; continue e;
              } break;
            }o=u, i+=n; const d=e.doc.resolve(i); if (t.valid(d)) return d;
          } return null;
        }
      }, t;
    }(s.Y1); h.prototype.visible=!1, s.Y1.jsonID('gapcursor', h); var p=function(e) {
      this.pos=e;
    }; p.prototype.map=function(e) {
      return new p(e.map(this.pos));
    }, p.prototype.resolve=function(e) {
      const t=e.resolve(this.pos); return h.valid(t)?new h(t):s.Y1.near(t);
    }; const f=(0, r.$)({ArrowLeft: m('horiz', -1), ArrowRight: m('horiz', 1), ArrowUp: m('vert', -1), ArrowDown: m('vert', 1)}); function m(e, t) {
      const n='vert'==e?t>0?'down':'up':t>0?'right':'left'; return function(e, r, i) {
        const o=e.selection; let a=t>0?o.$to:o.$from; let l=o.empty; if (o instanceof s.Bs) {
          if (!i.endOfTextblock(n)||0==a.depth) return !1; l=!1, a=e.doc.resolve(t>0?a.after():a.before());
        } const c=h.findFrom(a, t, l); return !!c&&(r&&r(e.tr.setSelection(new h(c))), !0);
      };
    } function g(e, t, n) {
      if (!e.editable) return !1; const r=e.state.doc.resolve(t); if (!h.valid(r)) return !1; const i=e.posAtCoords({left: n.clientX, top: n.clientY}).inside; return !(i>-1&&s.qv.isSelectable(e.state.doc.nodeAt(i))||(e.dispatch(e.state.tr.setSelection(new h(r))), 0));
    } function v(e) {
      if (!(e.selection instanceof h)) return null; const t=document.createElement('div'); return t.className='ProseMirror-gapcursor', u.EH.create(e.doc, [u.p.widget(e.selection.head, t, {key: 'gapcursor'})]);
    } const y=n(405); const b='http://www.w3.org/2000/svg'; const w='ProseMirror-icon'; const x='ProseMirror-menu'; const k=function(e) {
      this.spec=e;
    }; function _(e, t) {
      return e._props.translate?e._props.translate(t):t;
    }k.prototype.render=function(e) {
      const t=this.spec; const n=t.render?t.render(e):t.icon?function(e) {
        const t=document.createElement('div'); if (t.className=w, e.path) {
          const n='pm-icon-'+function(e) {
            for (var t=0, n=0; n<e.length; n++)t=(t<<5)-t+e.charCodeAt(n)|0; return t;
          }(e.path).toString(16); document.getElementById(n)||function(e, t) {
            let n=document.getElementById(w+'-collection'); n||((n=document.createElementNS(b, 'svg')).id=w+'-collection', n.style.display='none', document.body.insertBefore(n, document.body.firstChild)); const r=document.createElementNS(b, 'symbol'); r.id=e, r.setAttribute('viewBox', '0 0 '+t.width+' '+t.height), r.appendChild(document.createElementNS(b, 'path')).setAttribute('d', t.path), n.appendChild(r);
          }(n, e); const r=t.appendChild(document.createElementNS(b, 'svg')); r.style.width=e.width/e.height+'em', r.appendChild(document.createElementNS(b, 'use')).setAttributeNS('http://www.w3.org/1999/xlink', 'href', /([^#]*)/.exec(document.location)[1]+'#'+n);
        } else e.dom?t.appendChild(e.dom.cloneNode(!0)):(t.appendChild(document.createElement('span')).textContent=e.text||'', e.css&&(t.firstChild.style.cssText=e.css)); return t;
      }(t.icon):t.label?(0, y.Z)('div', null, _(e, t.label)):null; if (!n) throw new RangeError('MenuItem without icon or label property'); if (t.title) {
        const r='function'==typeof t.title?t.title(e.state):t.title; n.setAttribute('title', _(e, r));
      } return t.class&&n.classList.add(t.class), t.css&&(n.style.cssText+=t.css), n.addEventListener('mousedown', (function(r) {
        r.preventDefault(), n.classList.contains(x+'-disabled')||t.run(e.state, e.dispatch, e, r);
      })), {dom: n, update: function(e) {
        if (t.select) {
          const r=t.select(e); if (n.style.display=r?'':'none', !r) return !1;
        } let i=!0; if (t.enable&&(i=t.enable(e)||!1, O(n, x+'-disabled', !i)), t.active) {
          const o=i&&t.active(e)||!1; O(n, x+'-active', o);
        } return !0;
      }};
    }; const S={time: 0, node: null}; const C=function(e, t) {
      this.options=t||{}, this.content=Array.isArray(e)?e:[e];
    }; function M(e, t) {
      return function(n) {
        for (var r=!1, i=0; i<e.length; i++) {
          const o=e[i](n); t[i].style.display=o?'':'none', o&&(r=!0);
        } return r;
      };
    }C.prototype.render=function(e) {
      const t=this; const n=function(e, t) {
        for (var n=[], r=[], i=0; i<e.length; i++) {
          const o=e[i].render(t); const s=o.dom; const a=o.update; n.push((0, y.Z)('div', {class: x+'-dropdown-item'}, s)), r.push(a);
        } return {dom: n, update: M(r, n)};
      }(this.content, e); const r=(0, y.Z)('div', {class: x+'-dropdown '+(this.options.class||''), style: this.options.css}, _(e, this.options.label)); this.options.title&&r.setAttribute('title', _(e, this.options.title)); const i=(0, y.Z)('div', {class: x+'-dropdown-wrap'}, r); let o=null; let s=null; const a=function() {
        o&&o.close()&&(o=null, window.removeEventListener('mousedown', s));
      }; return r.addEventListener('mousedown', (function(e) {
        e.preventDefault(), function(e) {
          S.time=Date.now(), S.node=e.target;
        }(e), o?a():(o=t.expand(i, n.dom), window.addEventListener('mousedown', s=function() {
          let e; e=i, Date.now()-100<S.time&&S.node&&e.contains(S.node)||a();
        }));
      })), {dom: i, update: function(e) {
        const t=n.update(e); return i.style.display=t?'':'none', t;
      }};
    }, C.prototype.expand=function(e, t) {
      const n=(0, y.Z)('div', {class: x+'-dropdown-menu '+(this.options.class||'')}, t); let r=!1; return e.appendChild(n), {close: function() {
        if (!r) return r=!0, e.removeChild(n), !0;
      }, node: n};
    }; const T={join: {width: 800, height: 900, path: 'M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z'}, lift: {width: 1024, height: 1024, path: 'M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z'}, selectParentNode: {text: '⬚', css: 'font-weight: bold'}, undo: {width: 1024, height: 1024, path: 'M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z'}, redo: {width: 1024, height: 1024, path: 'M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z'}, strong: {width: 805, height: 1024, path: 'M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z'}, em: {width: 585, height: 1024, path: 'M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z'}, code: {width: 896, height: 1024, path: 'M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z'}, link: {width: 951, height: 1024, path: 'M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z'}, bulletList: {width: 768, height: 896, path: 'M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z'}, orderedList: {width: 768, height: 896, path: 'M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z'}, blockquote: {width: 640, height: 896, path: 'M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z'}}; function O(e, t, n) {
n?e.classList.add(t):e.classList.remove(t);
    } new k({title: 'Join with above block', run: o.MI, select: function(e) {
      return (0, o.MI)(e);
    }, icon: T.join}), new k({title: 'Lift out of enclosing block', run: o.xb, select: function(e) {
      return (0, o.xb)(e);
    }, icon: T.lift}), new k({title: 'Select parent node', run: o.N0, select: function(e) {
      return (0, o.N0)(e);
    }, icon: T.selectParentNode}), new k({title: 'Undo last change', run: i.Yw, enable: function(e) {
      return (0, i.Yw)(e);
    }, icon: T.undo}), new k({title: 'Redo last undone change', run: i.KX, enable: function(e) {
      return (0, i.KX)(e);
    }, icon: T.redo}); const D='ProseMirror-menubar'; const E=function(e, t) {
      const n=this; this.editorView=e, this.options=t, this.wrapper=(0, y.Z)('div', {class: D+'-wrapper'}), this.menu=this.wrapper.appendChild((0, y.Z)('div', {class: D})), this.menu.className=D, this.spacer=null, e.dom.parentNode.replaceChild(this.wrapper, e.dom), this.wrapper.appendChild(e.dom), this.maxHeight=0, this.widthForMaxHeight=0, this.floating=!1; const r=function(e, t) {
        for (var n=document.createDocumentFragment(), r=[], i=[], o=0; o<t.length; o++) {
          for (var s=t[o], a=[], l=[], c=0; c<s.length; c++) {
            const u=s[c].render(e); const d=u.dom; const h=u.update; const p=(0, y.Z)('span', {class: x+'item'}, d); n.appendChild(p), l.push(p), a.push(h);
          }a.length&&(r.push(M(a, l)), o<t.length-1&&i.push(n.appendChild((0, y.Z)('span', {class: x+'separator'}))));
        } return {dom: n, update: function(e) {
          for (var t=!1, n=!1, o=0; o<r.length; o++) {
            const s=r[o](e); o&&(i[o-1].style.display=n&&s?'':'none'), n=s, s&&(t=!0);
          } return t;
        }};
      }(this.editorView, this.options.content); const i=r.dom; const o=r.update; if (this.contentUpdate=o, this.menu.appendChild(i), this.update(), t.floating&&!function() {
        if ('undefined'==typeof navigator) return !1; const e=navigator.userAgent; return !/Edge\/\d/.test(e)&&/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e);
      }()) {
        this.updateFloat(); const s=function(e) {
          for (var t=[window], n=e.parentNode; n; n=n.parentNode)t.push(n); return t;
        }(this.wrapper); this.scrollFunc=function(e) {
          const t=n.editorView.root; (t.body||t).contains(n.wrapper)?n.updateFloat(e.target.getBoundingClientRect&&e.target):s.forEach((function(e) {
            return e.removeEventListener('scroll', n.scrollFunc);
          }));
        }, s.forEach((function(e) {
          return e.addEventListener('scroll', n.scrollFunc);
        }));
      }
    }; E.prototype.update=function() {
      this.contentUpdate(this.editorView.state), this.floating?this.updateScrollCursor():(this.menu.offsetWidth!=this.widthForMaxHeight&&(this.widthForMaxHeight=this.menu.offsetWidth, this.maxHeight=0), this.menu.offsetHeight> this.maxHeight&&(this.maxHeight=this.menu.offsetHeight, this.menu.style.minHeight=this.maxHeight+'px'));
    }, E.prototype.updateScrollCursor=function() {
      const e=this.editorView.root.getSelection(); if (e.focusNode) {
        const t=e.getRangeAt(0).getClientRects(); const n=t[function(e) {
          return e.anchorNode==e.focusNode?e.anchorOffset>e.focusOffset:e.anchorNode.compareDocumentPosition(e.focusNode)==Node.DOCUMENT_POSITION_FOLLOWING;
        }(e)?0:t.length-1]; if (n) {
          const r=this.menu.getBoundingClientRect(); if (n.top<r.bottom&&n.bottom>r.top) {
            const i=function(e) {
              for (let t=e.parentNode; t; t=t.parentNode) if (t.scrollHeight>t.clientHeight) return t;
            }(this.wrapper); i&&(i.scrollTop-=r.bottom-n.top);
          }
        }
      }
    }, E.prototype.updateFloat=function(e) {
      const t=this.wrapper; const n=t.getBoundingClientRect(); const r=e?Math.max(0, e.getBoundingClientRect().top):0; if (this.floating) {
        if (n.top>=r||n.bottom<this.menu.offsetHeight+10) this.floating=!1, this.menu.style.position=this.menu.style.left=this.menu.style.top=this.menu.style.width='', this.menu.style.display='', this.spacer.parentNode.removeChild(this.spacer), this.spacer=null; else {
          const i=(t.offsetWidth-t.clientWidth)/2; this.menu.style.left=n.left+i+'px', this.menu.style.display=n.top>window.innerHeight?'none':'', e&&(this.menu.style.top=r+'px');
        }
      } else if (n.top<r&&n.bottom>=this.menu.offsetHeight+10) {
        this.floating=!0; const o=this.menu.getBoundingClientRect(); this.menu.style.left=o.left+'px', this.menu.style.width=o.width+'px', e&&(this.menu.style.top=r+'px'), this.menu.style.position='fixed', this.spacer=(0, y.Z)('div', {class: D+'-spacer', style: 'height: '+o.height+'px'}), t.insertBefore(this.spacer, this.menu);
      }
    }, E.prototype.destroy=function() {
      this.wrapper.parentNode&&this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper);
    }; const N=n(94); const A=n(395); const L=n(736); function z(e) {
      const t=[(0, L.PZ)(e.schema), (0, r.h)((0, A.T)(e.schema, e.mapKeys)), (0, r.h)(o.YR), l(), new s.Sy({props: {decorations: v, createSelectionBetween: function(e, t, n) {
        if (t.pos==n.pos&&h.valid(n)) return new h(n);
      }, handleClick: g, handleKeyDown: f}})]; return !1!==e.menuBar&&t.push(function(e) {
        return new s.Sy({view: function(t) {
          return new E(t, e);
        }});
      }({floating: !0!==e.floatingMenu, content: e.menuContent||(0, N.j)(e.schema).fullMenu})), !1!==e.history&&t.push((0, i.m8)()), t.concat(new s.Sy({props: {attributes: {class: 'ProseMirror-example-setup-style'}}}));
    }
  }, 736: (e, t, n)=>{
    'use strict'; n.d(t, {PZ: ()=>i}); const r=n(896); function i(e) {
      let t; const n=r.yR.concat(r.LH, r.pR); let i; return (t=e.nodes.blockquote)&&n.push((i=t, (0, r.S0)(/^\s*>\s$/, i))), (t=e.nodes.ordered_list)&&n.push(function(e) {
        return (0, r.S0)(/^(\d+)\.\s$/, e, ((e)=>({order: +e[1]})), ((e, t)=>t.childCount+t.attrs.order==+e[1]));
      }(t)), (t=e.nodes.bullet_list)&&n.push(function(e) {
        return (0, r.S0)(/^\s*([-+*])\s$/, e);
      }(t)), (t=e.nodes.code_block)&&n.push(function(e) {
        return (0, r.zK)(/^```$/, e);
      }(t)), (t=e.nodes.heading)&&n.push(function(e, t) {
        return (0, r.zK)(new RegExp('^(#{1,6})\\s$'), e, ((e)=>({level: e[1].length})));
      }(t)), (0, r.Hw)({rules: n});
    }
  }, 395: (e, t, n)=>{
    'use strict'; n.d(t, {T: ()=>l}); const r=n(778); const i=n(465); const o=n(189); const s=n(896); const a='undefined'!=typeof navigator&&/Mac/.test(navigator.platform); function l(e, t) {
      let n; const l={}; function c(e, n) {
        if (t) {
          const n=t[e]; if (!1===n) return; n&&(e=n);
        }l[e]=n;
      } if (c('Mod-z', o.Yw), c('Shift-Mod-z', o.KX), c('Backspace', s.dU), a||c('Mod-y', o.KX), c('Alt-ArrowUp', r.MI), c('Alt-ArrowDown', r.Ig), c('Mod-BracketLeft', r.xb), c('Escape', r.N0), (n=e.marks.strong)&&(c('Mod-b', (0, r.w9)(n)), c('Mod-B', (0, r.w9)(n))), (n=e.marks.em)&&(c('Mod-i', (0, r.w9)(n)), c('Mod-I', (0, r.w9)(n))), (n=e.marks.code)&&c('Mod-`', (0, r.w9)(n)), (n=e.nodes.bullet_list)&&c('Shift-Ctrl-8', (0, i.KI)(n)), (n=e.nodes.ordered_list)&&c('Shift-Ctrl-9', (0, i.KI)(n)), (n=e.nodes.blockquote)&&c('Ctrl->', (0, r.ym)(n)), n=e.nodes.hard_break) {
        const e=n; const t=(0, r.QF)(r.uo, ((t, n)=>(n(t.tr.replaceSelectionWith(e.create()).scrollIntoView()), !0))); c('Mod-Enter', t), c('Shift-Enter', t), a&&c('Ctrl-Enter', t);
      } if ((n=e.nodes.list_item)&&(c('Enter', (0, i.s6)(n)), c('Mod-[', (0, i.IB)(n)), c('Mod-]', (0, i.bw)(n))), (n=e.nodes.paragraph)&&c('Shift-Ctrl-0', (0, r.uJ)(n)), (n=e.nodes.code_block)&&c('Shift-Ctrl-\\', (0, r.uJ)(n)), n=e.nodes.heading) for (let e=1; e<=6; e++)c('Shift-Ctrl-'+e, (0, r.uJ)(n, {level: e})); if (n=e.nodes.horizontal_rule) {
        const e=n; c('Mod-_', ((t, n)=>(n(t.tr.replaceSelectionWith(e.create()).scrollIntoView()), !0)));
      } return l;
    }
  }, 94: (e, t, n)=>{
    'use strict'; n.d(t, {j: ()=>p}); const r=n(556); const i=n(922); const o=n(778); const s=n(465); const a=n(706); function l(e, t) {
      const n=e.selection.$from; for (let e=n.depth; e>=0; e--) {
        const r=n.index(e); if (n.node(e).canReplaceWith(r, r, t)) return !0;
      } return !1;
    } function c(e, t) {
      const n={label: t.title, run: e}; for (const e in t)n[e]=t[e]; return t.enable&&!0!==t.enable||t.select||(n[t.enable?'enable':'select']=(t)=>e(t)), new r.sN(n);
    } function u(e, t) {
      const {from: n, $from: r, to: i, empty: o}=e.selection; return o?t.isInSet(e.storedMarks||r.marks()):e.doc.rangeHasMark(n, i, t);
    } function d(e, t) {
      const n={active: (t)=>u(t, e), enable: !0}; for (const e in t)n[e]=t[e]; return c((0, o.w9)(e), n);
    } function h(e, t) {
      return c((0, s.KI)(e, t.attrs), t);
    } function p(e) {
      let t; const n={}; let s; let c; if ((t=e.marks.strikethrough)&&(n.toggleStrike=d(t, {title: 'Strikethrough', icon: r.ci.strikethrough})), (t=e.marks.strong)&&(n.toggleStrong=d(t, {title: 'Toggle strong style', icon: r.ci.strong})), (t=e.marks.em)&&(n.toggleEm=d(t, {title: 'Toggle emphasis', icon: r.ci.em})), (t=e.marks.underline)&&(n.toggleUnderline=d(t, {title: 'Underline', icon: r.ci.underline})), (t=e.marks.code)&&(n.toggleCode=d(t, {title: 'Toggle code font', icon: r.ci.code})), (t=e.marks.mark)&&(n.toggleMark=d(t, {title: 'color', icon: r.ci.mark})), (t=e.marks.link)&&(n.toggleLink=(s=t, new r.sN({title: 'Add or remove link', icon: r.ci.link, active: (e)=>u(e, s), enable: (e)=>!e.selection.empty, run(e, t, n) {
        if (u(e, s)) return (0, o.w9)(s)(e, t), !0; (0, a.cS)({title: 'Create a link', fields: {href: new a.nv({label: 'Link target', required: !0}), title: new a.nv({label: 'Title'})}, callback(e) {
          (0, o.w9)(s, e)(n.state, n.dispatch), n.focus();
        }});
      }}))), (t=e.nodes.image)&&(n.insertImage=(c=t, new r.sN({title: 'Insert image', label: 'Image', enable: (e)=>l(e, c), run(e, t, n) {
        const {from: r, to: o}=e.selection; let s=null; e.selection instanceof i.qv&&e.selection.node.type===c&&(s=e.selection.node.attrs), (0, a.cS)({title: 'Insert image', fields: {src: new a.nv({label: 'Location', required: !0, value: s&&s.src}), title: new a.nv({label: 'Title', value: s&&s.title}), alt: new a.nv({label: 'Description', value: s?s.alt:e.doc.textBetween(r, o, ' ')})}, callback(e) {
          n.dispatch(n.state.tr.replaceSelectionWith(c.createAndFill(e))), n.focus();
        }});
      }}))), (t=e.nodes.bullet_list)&&(n.wrapBulletList=h(t, {title: 'Wrap in bullet list', icon: r.ci.bulletList})), (t=e.nodes.ordered_list)&&(n.wrapOrderedList=h(t, {title: 'Wrap in ordered list', icon: r.ci.orderedList})), (t=e.nodes.blockquote)&&(n.wrapBlockQuote=(0, r.lB)(t, {title: 'Wrap in block quote', icon: r.ci.blockquote})), (t=e.nodes.paragraph)&&(n.makeParagraph=(0, r.Gl)(t, {title: 'Change to paragraph', label: 'Plain'})), (t=e.nodes.code_block)&&(n.makeCodeBlock=(0, r.Gl)(t, {title: 'Change to code block', label: 'Code'})), t=e.nodes.heading) for (let e=1; e<=10; e++)n['makeHead'+e]=(0, r.Gl)(t, {title: 'Change to heading '+e, label: 'Level '+e, attrs: {level: e}}); if (t=e.nodes.horizontal_rule) {
        const e=t; n.insertHorizontalRule=new r.sN({title: 'Insert horizontal rule', icon: r.ci.horizontal_rule, enable: (t)=>l(t, e), run(t, n) {
          n(t.tr.replaceSelectionWith(e.create()));
        }});
      } const p=(e)=>e.filter(((e)=>e)); return n.typeMenu=new r.Lt(p([n.makeHead1, n.makeHead2, n.makeHead3, n.makeHead4, n.makeHead5, n.makeHead6]), {label: 'H', css: 'font-weight: bold', title: 'Heading'}), n.inlineMenu=[p([n.toggleStrong, n.toggleEm, n.toggleUnderline, n.toggleCode, n.toggleMark, n.toggleLink, n.toggleStrike, n.insertHorizontalRule, n.insertImage])], n.blockMenu=[p([n.wrapBulletList, n.wrapOrderedList, n.wrapBlockQuote, r.jN, r.VX, n.makeCodeBlock])], n.fullMenu=n.inlineMenu.concat([[n.typeMenu]], n.blockMenu, [[r.dY, r.gn]]), n;
    }
  }, 706: (e, t, n)=>{
    'use strict'; n.d(t, {cS: ()=>i, nv: ()=>s}); const r='ProseMirror-prompt'; function i(e) {
      const t=document.body.appendChild(document.createElement('div')); t.className=r; const n=(e)=>{
        t.contains(e.target)||i();
      }; setTimeout((()=>window.addEventListener('mousedown', n)), 50); const i=()=>{
        window.removeEventListener('mousedown', n), t.parentNode&&t.parentNode.removeChild(t);
      }; const s=[]; for (const t in e.fields)s.push(e.fields[t].render()); const a=document.createElement('button'); a.type='submit', a.className=r+'-submit', a.textContent='OK'; const l=document.createElement('button'); l.type='button', l.className=r+'-cancel', l.textContent='Cancel', l.addEventListener('click', i); const c=t.appendChild(document.createElement('form')); e.title&&(c.appendChild(document.createElement('h5')).textContent=e.title), s.forEach(((e)=>{
        c.appendChild(document.createElement('div')).appendChild(e);
      })); const u=c.appendChild(document.createElement('div')); u.className=r+'-buttons', u.appendChild(a), u.appendChild(document.createTextNode(' ')), u.appendChild(l); const d=t.getBoundingClientRect(); t.style.top=(window.innerHeight-d.height)/2+'px', t.style.left=(window.innerWidth-d.width)/2+'px'; const h=()=>{
        const t=function(e, t) {
          const n=Object.create(null); let r=0; for (const i in e) {
            const s=e[i]; const a=t[r++]; const l=s.read(a); const c=s.validate(l); if (c) return o(a, c), null; n[i]=s.clean(l);
          } return n;
        }(e.fields, s); t&&(i(), e.callback(t));
      }; c.addEventListener('submit', ((e)=>{
        e.preventDefault(), h();
      })), c.addEventListener('keydown', ((e)=>{
27==e.keyCode?(e.preventDefault(), i()):13!=e.keyCode||e.ctrlKey||e.metaKey||e.shiftKey?9==e.keyCode&&window.setTimeout((()=>{
  t.contains(document.activeElement)||i();
}), 500):(e.preventDefault(), h());
      })); const p=c.elements[0]; p&&p.focus();
    } function o(e, t) {
      const n=e.parentNode; const r=n.appendChild(document.createElement('div')); r.style.left=e.offsetLeft+e.offsetWidth+2+'px', r.style.top=e.offsetTop-5+'px', r.className='ProseMirror-invalid', r.textContent=t, setTimeout((()=>n.removeChild(r)), 1500);
    } class s extends class {
      constructor(e) {
        this.options=e;
      }read(e) {
        return e.value;
      }validateType(e) {}validate(e) {
        return !e&&this.options.required?'Required field':this.validateType(e)||this.options.validate&&this.options.validate(e);
      }clean(e) {
        return this.options.clean?this.options.clean(e):e;
      }
    } {
      render() {
        const e=document.createElement('input'); return e.type='text', e.placeholder=this.options.label, e.value=this.options.value||'', e.autocomplete='off', e;
      }
    }
  }, 556: (e, t, n)=>{
    'use strict'; n.d(t, {sN: ()=>l, Lt: ()=>d, ci: ()=>p, jN: ()=>f, VX: ()=>m, dY: ()=>g, gn: ()=>v, lB: ()=>y, Gl: ()=>b}); const r=n(405); const i=n(778); const o=n(189); const s=n(186); const a='ProseMirror-menu'; class l {
      constructor(e) {
        this.spec=e;
      }render(e) {
        const t=this.spec; const n=t.render?t.render(e):t.icon?(0, s.q)(t.icon):t.label?(0, r.Z)('div', null, c(e, t.label)):null; if (!n) throw new RangeError('MenuItem without icon or label property'); if (t.title) {
          const r='function'==typeof t.title?t.title(e.state):t.title; n.setAttribute('title', c(e, r));
        } return t.class&&n.classList.add(t.class), t.css&&(n.style.cssText+=t.css), n.addEventListener('mousedown', ((r)=>{
          r.preventDefault(), n.classList.contains(a+'-disabled')||t.run(e.state, e.dispatch, e, r);
        })), {dom: n, update: function(e) {
          if (t.select) {
            const r=t.select(e); if (n.style.display=r?'':'none', !r) return !1;
          } let r=!0; if (t.enable&&(r=t.enable(e)||!1, w(n, a+'-disabled', !r)), t.active) {
            const i=r&&t.active(e)||!1; w(n, a+'-active', i);
          } return !0;
        }};
      }
    } function c(e, t) {
      return e._props.translate?e._props.translate(t):t;
    } const u={time: 0, node: null}; class d {
      constructor(e, t) {
        this.options=t||{}, this.content=Array.isArray(e)?e:[e];
      }render(e) {
        const t=function(e, t) {
          const n=[]; const i=[]; for (let o=0; o<e.length; o++) {
            const {dom: s, update: l}=e[o].render(t); n.push((0, r.Z)('div', {class: a+'-dropdown-item'}, s)), i.push(l);
          } return {dom: n, update: h(i, n)};
        }(this.content, e); const n=(0, r.Z)('div', {class: a+'-dropdown '+(this.options.class||''), style: this.options.css}, c(e, this.options.label)); this.options.title&&n.setAttribute('title', c(e, this.options.title)); const i=(0, r.Z)('div', {class: a+'-dropdown-wrap'}, n); let o=null; let s=null; const l=()=>{
          o&&o.close()&&(o=null, window.removeEventListener('mousedown', s));
        }; return n.addEventListener('mousedown', ((e)=>{
          e.preventDefault(), function(e) {
            u.time=Date.now(), u.node=e.target;
          }(e), o?l():(o=this.expand(i, t.dom), window.addEventListener('mousedown', s=()=>{
            let e; e=i, Date.now()-100<u.time&&u.node&&e.contains(u.node)||l();
          }));
        })), {dom: i, update: function(e) {
          const n=t.update(e); return i.style.display=n?'':'none', n;
        }};
      }expand(e, t) {
        const n=(0, r.Z)('div', {class: a+'-dropdown-menu '+(this.options.class||'')}, t); let i=!1; return e.appendChild(n), {close: function() {
          if (!i) return i=!0, e.removeChild(n), !0;
        }, node: n};
      }
    } function h(e, t) {
      return (n)=>{
        let r=!1; for (let i=0; i<e.length; i++) {
          const o=e[i](n); t[i].style.display=o?'':'none', o&&(r=!0);
        } return r;
      };
    } const p={join: {width: 800, height: 900, path: 'M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z'}, strikethrough: {width: 768, height: 768, path: 'M 768 384 v 48 h -175.88 c 20.628 28.882 31.88 62.019 31.88 96 c 0 53.159 -27.495 104.27 -75.435 140.223 c -44.518 33.389 -102.963 51.777 -164.565 51.777 c -61.604 0 -120.047 -18.389 -164.565 -51.777 c -47.94 -35.953 -75.435 -87.064 -75.435 -140.223 h 96 c 0 52.037 65.945 96 144 96 s 144 -43.964 144 -96 c 0 -52.037 -65.945 -96 -144 -96 h -384 v -48 h 224.638 c -1.754 -1.24 -3.492 -2.493 -5.203 -3.777 c -47.94 -35.955 -75.435 -87.065 -75.435 -140.223 s 27.495 -104.268 75.435 -140.223 c 44.518 -33.389 102.961 -51.777 164.565 -51.777 c 61.602 0 120.047 18.388 164.565 51.777 c 47.94 35.955 75.435 87.064 75.435 140.223 h -96 c 0 -52.036 -65.945 -96 -144 -96 s -144 43.964 -144 96 c 0 52.036 65.945 96 144 96 c 59.233 0 115.54 17.009 159.361 48 h 224.639 Z'}, horizontal_rule: {width: 512, height: 512, path: 'M 0 208 v 96 c 0 8.836 7.164 16 16 16 h 480 c 8.836 0 16 -7.164 16 -16 v -96 c 0 -8.836 -7.164 -16 -16 -16 h -480 c -8.836 0 -16 7.164 -16 16 Z'}, lift: {width: 448, height: 512, path: 'M 108 284 c -6.6 0 -12 -5.4 -12 -12 v -32 c 0 -6.6 5.4 -12 12 -12 h 232 c 6.6 0 12 5.4 12 12 v 32 c 0 6.6 -5.4 12 -12 12 H 108 Z M 448 80 v 352 c 0 26.5 -21.5 48 -48 48 H 48 c -26.5 0 -48 -21.5 -48 -48 V 80 c 0 -26.5 21.5 -48 48 -48 h 352 c 26.5 0 48 21.5 48 48 Z m -48 346 V 86 c 0 -3.3 -2.7 -6 -6 -6 H 54 c -3.3 0 -6 2.7 -6 6 v 340 c 0 3.3 2.7 6 6 6 h 340 c 3.3 0 6 -2.7 6 -6 Z'}, selectParentNode: {text: '⬚', css: 'font-weight: bold'}, undo: {width: 1024, height: 1024, path: 'M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z'}, redo: {width: 1024, height: 1024, path: 'M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z'}, strong: {width: 805, height: 1024, path: 'M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z'}, em: {width: 585, height: 1024, path: 'M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z'}, underline: {width: 448, height: 512, path: 'M 32 64 h 32 v 160 c 0 88.22 71.78 160 160 160 s 160 -71.78 160 -160 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 272 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 32 v 160 a 80 80 0 0 1 -160 0 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 32 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 Z m 400 384 H 16 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 v -32 a 16 16 0 0 0 -16 -16 Z'}, heading: {width: 512, height: 512, path: 'M 32 64 h 32 v 160 c 0 88.22 71.78 160 160 160 s 160 -71.78 160 -160 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 272 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 32 v 160 a 80 80 0 0 1 -160 0 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 32 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 Z m 400 384 H 16 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 v -32 a 16 16 0 0 0 -16 -16 Z'}, code: {width: 896, height: 1024, path: 'M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z'}, mark: {width: 512, height: 512, path: 'M 167.02 309.34 c -40.12 2.58 -76.53 17.86 -97.19 72.3 c -2.35 6.21 -8 9.98 -14.59 9.98 c -11.11 0 -45.46 -27.67 -55.25 -34.35 C 0 439.62 37.93 512 128 512 c 75.86 0 128 -43.77 128 -120.19 c 0 -3.11 -0.65 -6.08 -0.97 -9.13 l -88.01 -73.34 Z M 457.89 0 c -15.16 0 -29.37 6.71 -40.21 16.45 C 213.27 199.05 192 203.34 192 257.09 c 0 13.7 3.25 26.76 8.73 38.7 l 63.82 53.18 c 7.21 1.8 14.64 3.03 22.39 3.03 c 62.11 0 98.11 -45.47 211.16 -256.46 c 7.38 -14.35 13.9 -29.85 13.9 -45.99 C 512 20.64 486 0 457.89 0 Z'}, link: {width: 951, height: 1024, path: 'M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z'}, bulletList: {width: 768, height: 896, path: 'M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z'}, orderedList: {width: 768, height: 896, path: 'M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z'}, blockquote: {width: 448, height: 512, path: 'M 352 240 v 32 c 0 6.6 -5.4 12 -12 12 h -88 v 88 c 0 6.6 -5.4 12 -12 12 h -32 c -6.6 0 -12 -5.4 -12 -12 v -88 h -88 c -6.6 0 -12 -5.4 -12 -12 v -32 c 0 -6.6 5.4 -12 12 -12 h 88 v -88 c 0 -6.6 5.4 -12 12 -12 h 32 c 6.6 0 12 5.4 12 12 v 88 h 88 c 6.6 0 12 5.4 12 12 Z m 96 -160 v 352 c 0 26.5 -21.5 48 -48 48 H 48 c -26.5 0 -48 -21.5 -48 -48 V 80 c 0 -26.5 21.5 -48 48 -48 h 352 c 26.5 0 48 21.5 48 48 Z m -48 346 V 86 c 0 -3.3 -2.7 -6 -6 -6 H 54 c -3.3 0 -6 2.7 -6 6 v 340 c 0 3.3 2.7 6 6 6 h 340 c 3.3 0 6 -2.7 6 -6 Z'}}; const f=new l({title: 'Join with above block', run: i.MI, select: (e)=>(0, i.MI)(e), icon: p.join}); const m=new l({title: 'Lift out of enclosing block', run: i.xb, select: (e)=>(0, i.xb)(e), icon: p.lift}); new l({title: 'Select parent node', run: i.N0, select: (e)=>(0, i.N0)(e), icon: p.selectParentNode}); const g=new l({title: 'Undo last change', run: o.Yw, enable: (e)=>(0, o.Yw)(e), icon: p.undo}); const v=new l({title: 'Redo last undone change', run: o.KX, enable: (e)=>(0, o.KX)(e), icon: p.redo}); function y(e, t) {
      const n={run: (n, r)=>(0, i.ym)(e, t.attrs)(n, r), select: (n)=>(0, i.ym)(e, t.attrs instanceof Function?null:t.attrs)(n)}; for (const e in t)n[e]=t[e]; return new l(n);
    } function b(e, t) {
      const n=(0, i.uJ)(e, t.attrs); const r={run: n, enable: (e)=>n(e), active(n) {
        const {$from: r, to: i, node: o}=n.selection; return o?o.hasMarkup(e, t.attrs):i<=r.end()&&r.parent.hasMarkup(e, t.attrs);
      }}; for (const e in t)r[e]=t[e]; return new l(r);
    } function w(e, t, n) {
n?e.classList.add(t):e.classList.remove(t);
    }
  }, 955: (e, t, n)=>{
    'use strict'; n.d(t, {fK: ()=>d}); const r=n(638); const i=['br']; const o=(e, t={})=>(t=Object.assign({}, t), null!==e.ychange&&(t.ychange_user=e.ychange.user, t.ychange_state=e.ychange.state), t); const s={doc: {content: 'block+'}, paragraph: {attrs: {ychange: {default: null}}, content: 'inline*', group: 'block', parseDOM: [{tag: 'p'}], toDOM: (e)=>['p', o(e.attrs), 0]}, blockquote: {attrs: {ychange: {default: null}}, content: 'block+', group: 'block', defining: !0, parseDOM: [{tag: 'blockquote'}], toDOM: (e)=>['blockquote', o(e.attrs), 0]}, horizontal_rule: {attrs: {ychange: {default: null}}, group: 'block', parseDOM: [{tag: 'hr'}], toDOM: (e)=>['hr', o(e.attrs)]}, ordered_list: {content: 'list_item+', group: 'block', attrs: {order: {default: 1}, tight: {default: !1}, ychange: {default: null}}, parseDOM: [{tag: 'ol'}], toDOM: (e)=>['ol', o(e.attrs), 0]}, bullet_list: {content: 'list_item+', group: 'block', attrs: {tight: {default: !1}, ychange: {default: null}}, parseDOM: [{tag: 'ul'}], toDOM: (e)=>['ul', o(e.attrs), 0]}, list_item: {content: 'paragraph block*', defining: !0, parseDOM: [{tag: 'li'}], toDOM: ()=>['li', 0]}, heading: {attrs: {level: {default: 1}, ychange: {default: null}}, content: 'inline*', group: 'block', defining: !0, parseDOM: [{tag: 'h1', attrs: {level: 1}}, {tag: 'h2', attrs: {level: 2}}, {tag: 'h3', attrs: {level: 3}}, {tag: 'h4', attrs: {level: 4}}, {tag: 'h5', attrs: {level: 5}}, {tag: 'h6', attrs: {level: 6}}], toDOM: (e)=>['h'+e.attrs.level, o(e.attrs), 0]}, code_block: {attrs: {ychange: {default: null}}, content: 'text*', marks: '', group: 'block', code: !0, defining: !0, isolating: !0, parseDOM: [{tag: 'pre', preserveWhitespace: 'full'}], toDOM: (e)=>['pre', o(e.attrs), ['code', 0]]}, text: {group: 'inline'}, hard_break: {inline: !0, group: 'inline', selectable: !1, parseDOM: [{tag: 'br'}], toDOM: ()=>i}}; const a=['em', 0]; const l=['strong', 0]; const c=['code', 0]; const u={link: {attrs: {href: {}, title: {default: null}}, inclusive: !1, parseDOM: [{tag: 'a[href]', getAttrs: (e)=>({href: e.getAttribute('href'), title: e.getAttribute('title')})}], toDOM: (e)=>['a', e.attrs, 0]}, strikethrough: {parseDOM: [{tag: 's'}, {style: 'text-decoration'}], toDOM: ()=>['s', 0]}, underline: {parseDOM: [{tag: 'u'}], toDOM: ()=>['u', 0]}, em: {parseDOM: [{tag: 'i'}, {tag: 'em'}, {style: 'font-style=italic'}], toDOM: ()=>a}, mark: {parseDOM: [{tag: 'mark'}, {tag: 'm'}], toDOM: ()=>['mark']}, strong: {parseDOM: [{tag: 'strong'}, {tag: 'b', getAttrs: (e)=>'normal'!==e.style.fontWeight&&null}, {style: 'font-weight', getAttrs: (e)=>/^(bold(er)?|[5-9]\d{2,})$/.test(e)&&null}], toDOM: ()=>l}, code: {parseDOM: [{tag: 'code'}], toDOM: ()=>c}, ychange: {attrs: {user: {default: null}, state: {default: null}}, inclusive: !1, parseDOM: [{tag: 'ychange'}], toDOM: (e)=>['ychange', {ychange_user: e.attrs.user, ychange_state: e.attrs.state}, 0]}}; const d=new r.V_({nodes: s, marks: u});
  }}; const t={}; function n(r) {
    if (t[r]) return t[r].exports; const i=t[r]={exports: {}}; return e[r].call(i.exports, i, i.exports, n), i.exports;
  }n.n=(e)=>{
    const t=e&&e.__esModule?()=>e.default:()=>e; return n.d(t, {a: t}), t;
  }, n.d=(e, t)=>{
    for (const r in t)n.o(t, r)&&!n.o(e, r)&&Object.defineProperty(e, r, {enumerable: !0, get: t[r]});
  }, n.o=(e, t)=>Object.prototype.hasOwnProperty.call(e, t), n(51), n(186), n(43), n(297), n(736), n(395), n(94), n(706), n(556), n(955);
})();
