(function() {
  const t=[].indexOf||function(t) {
    for (let e=0, n=this.length; e<n; e++) if (e in this&&this[e]===t) return e; return -1;
  }; const e=[].slice; !function(t, e) {
'function'==typeof define&&define.amd?define('waypoints', ['jquery'], function(n) {
  return e(n, t);
}):e(t.jQuery, t);
  }(this, function(n, r) {
    let i; let o; let l; let s; let c; let a; let u; let f; let h; let d; let p; let v; let y; let w; let g; let S; return i=n(r), f=t.call(r, 'ontouchstart')>=0, s={horizontal: {}, vertical: {}}, c=1, u={}, a='waypoints-context-id', p='resize.waypoints', v='scroll.waypoints', y=1, w='waypoints-waypoint-ids', g='waypoint', S='waypoints', o=function() {
      function t(t) {
        const e=this; this.$element=t, this.element=t[0], this.didResize=!1, this.didScroll=!1, this.id='context'+c++, this.oldScroll={x: t.scrollLeft(), y: t.scrollTop()}, this.waypoints={horizontal: {}, vertical: {}}, t.data(a, this.id), u[this.id]=this, t.bind(v, function() {
          let t; if (!e.didScroll&&!f) {
            return e.didScroll=!0, t=function() {
              return e.doScroll(), e.didScroll=!1;
            }, r.setTimeout(t, n[S].settings.scrollThrottle);
          }
        }), t.bind(p, function() {
          let t; if (!e.didResize) {
            return e.didResize=!0, t=function() {
              return n[S]('refresh'), e.didResize=!1;
            }, r.setTimeout(t, n[S].settings.resizeThrottle);
          }
        });
      } return t.prototype.doScroll=function() {
        let t; const e=this; return t={horizontal: {newScroll: this.$element.scrollLeft(), oldScroll: this.oldScroll.x, forward: 'right', backward: 'left'}, vertical: {newScroll: this.$element.scrollTop(), oldScroll: this.oldScroll.y, forward: 'down', backward: 'up'}}, !f||t.vertical.oldScroll&&t.vertical.newScroll||n[S]('refresh'), n.each(t, function(t, r) {
          let i; let o; let l; return l=[], o=r.newScroll>r.oldScroll, i=o?r.forward:r.backward, n.each(e.waypoints[t], function(t, e) {
            let n; let i; return r.oldScroll<(n=e.offset)&&n<=r.newScroll?l.push(e):r.newScroll<(i=e.offset)&&i<=r.oldScroll?l.push(e):void 0;
          }), l.sort(function(t, e) {
            return t.offset-e.offset;
          }), o||l.reverse(), n.each(l, function(t, e) {
            if (e.options.continuous||t===l.length-1) return e.trigger([i]);
          });
        }), this.oldScroll={x: t.horizontal.newScroll, y: t.vertical.newScroll};
      }, t.prototype.refresh=function() {
        let t; let e; let r; const i=this; return r=n.isWindow(this.element), e=this.$element.offset(), this.doScroll(), t={horizontal: {contextOffset: r?0:e.left, contextScroll: r?0:this.oldScroll.x, contextDimension: this.$element.width(), oldScroll: this.oldScroll.x, forward: 'right', backward: 'left', offsetProp: 'left'}, vertical: {contextOffset: r?0:e.top, contextScroll: r?0:this.oldScroll.y, contextDimension: r?n[S]('viewportHeight'):this.$element.height(), oldScroll: this.oldScroll.y, forward: 'down', backward: 'up', offsetProp: 'top'}}, n.each(t, function(t, e) {
          return n.each(i.waypoints[t], function(t, r) {
            let i; let o; let l; let s; let c; if (i=r.options.offset, l=r.offset, o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp], n.isFunction(i)?i=i.apply(r.element):'string'==typeof i&&(i=parseFloat(i), r.options.offset.indexOf('%')>-1&&(i=Math.ceil(e.contextDimension*i/100))), r.offset=o-e.contextOffset+e.contextScroll-i, (!r.options.onlyOnScroll||null==l)&&r.enabled) return null!==l&&l<(s=e.oldScroll)&&s<=r.offset?r.trigger([e.backward]):null!==l&&l>(c=e.oldScroll)&&c>=r.offset?r.trigger([e.forward]):null===l&&e.oldScroll>=r.offset?r.trigger([e.forward]):void 0;
          });
        });
      }, t.prototype.checkEmpty=function() {
        if (n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([p, v].join(' ')), delete u[this.id];
      }, t;
    }(), l=function() {
      function t(t, e, r) {
        let i; let o; r=n.extend({}, n.fn[g].defaults, r), 'bottom-in-view'===r.offset&&(r.offset=function() {
          let t; return t=n[S]('viewportHeight'), n.isWindow(e.element)||(t=e.$element.height()), t-n(this).outerHeight();
        }), this.$element=t, this.element=t[0], this.axis=r.horizontal?'horizontal':'vertical', this.callback=r.handler, this.context=e, this.enabled=r.enabled, this.id='waypoints'+y++, this.offset=null, this.options=r, e.waypoints[this.axis][this.id]=this, s[this.axis][this.id]=this, i=null!=(o=t.data(w))?o:[], i.push(this.id), t.data(w, i);
      } return t.prototype.trigger=function(t) {
        if (this.enabled) return null!=this.callback&&this.callback.apply(this.element, t), this.options.triggerOnce?this.destroy():void 0;
      }, t.prototype.disable=function() {
        return this.enabled=!1;
      }, t.prototype.enable=function() {
        return this.context.refresh(), this.enabled=!0;
      }, t.prototype.destroy=function() {
        return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty();
      }, t.getWaypointsByElement=function(t) {
        let e; let r; return (r=n(t).data(w))?(e=n.extend({}, s.horizontal, s.vertical), n.map(r, function(t) {
          return e[t];
        })):[];
      }, t;
    }(), d={init: function(t, e) {
      let r; return null==e&&(e={}), null==(r=e.handler)&&(e.handler=t), this.each(function() {
        let t; let r; let i; let s; return t=n(this), i=null!=(s=e.context)?s:n.fn[g].defaults.context, n.isWindow(i)||(i=t.closest(i)), i=n(i), r=u[i.data(a)], r||(r=new o(i)), new l(t, r, e);
      }), n[S]('refresh'), this;
    }, disable: function() {
      return d._invoke(this, 'disable');
    }, enable: function() {
      return d._invoke(this, 'enable');
    }, destroy: function() {
      return d._invoke(this, 'destroy');
    }, prev: function(t, e) {
      return d._traverse.call(this, t, e, function(t, e, n) {
        if (e>0) return t.push(n[e-1]);
      });
    }, next: function(t, e) {
      return d._traverse.call(this, t, e, function(t, e, n) {
        if (e<n.length-1) return t.push(n[e+1]);
      });
    }, _traverse: function(t, e, i) {
      let o; let l; return null==t&&(t='vertical'), null==e&&(e=r), l=h.aggregate(e), o=[], this.each(function() {
        let e; return e=n.inArray(this, l[t]), i(o, e, l[t]);
      }), this.pushStack(o);
    }, _invoke: function(t, e) {
      return t.each(function() {
        let t; return t=l.getWaypointsByElement(this), n.each(t, function(t, n) {
          return n[e](), !0;
        });
      }), this;
    }}, n.fn[g]=function() {
      let t; let r; return r=arguments[0], t=2<=arguments.length?e.call(arguments, 1):[], d[r]?d[r].apply(this, t):n.isFunction(r)?d.init.apply(this, arguments):n.isPlainObject(r)?d.init.apply(this, [null, r]):r?n.error('The '+r+' method does not exist in jQuery Waypoints.'):n.error('jQuery Waypoints needs a callback function or handler option.');
    }, n.fn[g].defaults={context: r, continuous: !0, enabled: !0, horizontal: !1, offset: 0, triggerOnce: !1}, h={refresh: function() {
      return n.each(u, function(t, e) {
        return e.refresh();
      });
    }, viewportHeight: function() {
      let t; return null!=(t=r.innerHeight)?t:i.height();
    }, aggregate: function(t) {
      let e; let r; let i; return e=s, t&&(e=null!=(i=u[n(t).data(a)])?i.waypoints:void 0), e?(r={horizontal: [], vertical: []}, n.each(r, function(t, i) {
        return n.each(e[t], function(t, e) {
          return i.push(e);
        }), i.sort(function(t, e) {
          return t.offset-e.offset;
        }), r[t]=n.map(i, function(t) {
          return t.element;
        }), r[t]=n.unique(r[t]);
      }), r):[];
    }, above: function(t) {
      return null==t&&(t=r), h._filter(t, 'vertical', function(t, e) {
        return e.offset<=t.oldScroll.y;
      });
    }, below: function(t) {
      return null==t&&(t=r), h._filter(t, 'vertical', function(t, e) {
        return e.offset>t.oldScroll.y;
      });
    }, left: function(t) {
      return null==t&&(t=r), h._filter(t, 'horizontal', function(t, e) {
        return e.offset<=t.oldScroll.x;
      });
    }, right: function(t) {
      return null==t&&(t=r), h._filter(t, 'horizontal', function(t, e) {
        return e.offset>t.oldScroll.x;
      });
    }, enable: function() {
      return h._invoke('enable');
    }, disable: function() {
      return h._invoke('disable');
    }, destroy: function() {
      return h._invoke('destroy');
    }, extendFn: function(t, e) {
      return d[t]=e;
    }, _invoke: function(t) {
      let e; return e=n.extend({}, s.vertical, s.horizontal), n.each(e, function(e, n) {
        return n[t](), !0;
      });
    }, _filter: function(t, e, r) {
      let i; let o; return (i=u[n(t).data(a)])?(o=[], n.each(i.waypoints[e], function(t, e) {
        if (r(i, e)) return o.push(e);
      }), o.sort(function(t, e) {
        return t.offset-e.offset;
      }), n.map(o, function(t) {
        return t.element;
      })):[];
    }}, n[S]=function() {
      let t; let n; return n=arguments[0], t=2<=arguments.length?e.call(arguments, 1):[], h[n]?h[n].apply(null, t):h.aggregate.call(null, n);
    }, n[S].settings={resizeThrottle: 100, scrollThrottle: 30}, i.load(function() {
      return n[S]('refresh');
    });
  });
}).call(this);
