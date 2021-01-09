!function(t, e) {
'object'==typeof exports&&'undefined'!=typeof module?e(require('jquery')):'function'==typeof define&&define.amd?define(['jquery'], e):e((t=t||self).jQuery);
}(this, function(t) {
  'use strict'; function e(t) {
    return t[0];
  } function o(t) {
    return t[t.length-1];
  } function n(t) {
    return t.slice(1);
  } function i(t, e) {
    return !!(t&&t.length&&e)&&-1!==t.indexOf(e);
  } function r(e) {
    return e&&t(e).hasClass('note-editable');
  } function s(t) {
    return t=t.toUpperCase(), function(e) {
      return e&&e.nodeName.toUpperCase()===t;
    };
  } function a(t) {
    return t&&3===t.nodeType;
  } function l(t) {
    return t&&/^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(t.nodeName.toUpperCase());
  } function c(t) {
    return !r(t)&&t&&/^DIV|^P|^LI|^H[1-7]/.test(t.nodeName.toUpperCase());
  } function d(t) {
    return !(p(t)||u(t)||xt(t)||c(t)||Ct(t)||St(t)||wt(t));
  } function u(t) {
    return t&&/^UL|^OL/.test(t.nodeName.toUpperCase());
  } function h(t) {
    return t&&/^TD|^TH/.test(t.nodeName.toUpperCase());
  } function p(t) {
    return h(t)||St(t)||r(t);
  } function f(t) {
    return a(t)?t.nodeValue.length:t?t.childNodes.length:0;
  } function m(t) {
    const e=f(t); return 0===e||!a(t)&&1===e&&t.innerHTML===$t||!(!vt.all(t.childNodes, a)||''!==t.innerHTML);
  } function g(t) {
    l(t)||f(t)||(t.innerHTML=$t);
  } function v(t, e) {
    for (;t;) {
      if (e(t)) return t; if (r(t)) break; t=t.parentNode;
    } return null;
  } function b(t, e) {
    e=e||gt.fail; const o=[]; return v(t, function(t) {
      return r(t)||o.push(t), e(t);
    }), o;
  } function y(t, e) {
    e=e||gt.fail; for (var o=[]; t&&!e(t);)o.push(t), t=t.nextSibling; return o;
  } function k(t, e) {
    const o=e.nextSibling; const n=e.parentNode; return o?n.insertBefore(t, o):n.appendChild(t), t;
  } function C(e, o) {
    return t.each(o, function(t, o) {
      e.appendChild(o);
    }), e;
  } function w(t) {
    return 0===t.offset;
  } function x(t) {
    return t.offset===f(t.node);
  } function S(t) {
    return w(t)||x(t);
  } function I(t, e) {
    for (;t&&t!==e;) {
      if (0!==N(t)) return !1; t=t.parentNode;
    } return !0;
  } function T(t, e) {
    if (!e) return !1; for (;t&&t!==e;) {
      if (N(t)!==f(t.parentNode)-1) return !1; t=t.parentNode;
    } return !0;
  } function N(t) {
    for (var e=0; t=t.previousSibling;)e+=1; return e;
  } function E(t) {
    return !!(t&&t.childNodes&&t.childNodes.length);
  } function R(t, e) {
    let o; let n; if (0===t.offset) {
      if (r(t.node)) return null; o=t.node.parentNode, n=N(t.node);
    } else n=E(t.node)?f(o=t.node.childNodes[t.offset-1]):(o=t.node, e?0:t.offset-1); return {node: o, offset: n};
  } function L(t, e) {
    let o; let n; if (f(t.node)===t.offset) {
      if (r(t.node)) return null; o=t.node.parentNode, n=N(t.node)+1;
    } else n=E(t.node)?(o=t.node.childNodes[t.offset], 0):(o=t.node, e?f(t.node):t.offset+1); return {node: o, offset: n};
  } function A(t, e) {
    return t.node===e.node&&t.offset===e.offset;
  } function F(t, e) {
    let o=e&&e.isSkipPaddingBlankHTML; const n=e&&e.isNotSplitEdgePoint; const i=e&&e.isDiscardEmptySplits; if (i&&(o=!0), S(t)&&(a(t.node)||n)) {
      if (w(t)) return t.node; if (x(t)) return t.node.nextSibling;
    } if (a(t.node)) return t.node.splitText(t.offset); const r=t.node.childNodes[t.offset]; const s=k(t.node.cloneNode(!1), t.node); return C(s, y(r)), o||(g(t.node), g(s)), i&&(m(t.node)&&D(t.node), m(s))?(D(s), t.node.nextSibling):s;
  } function P(t, e, o) {
    const n=b(e.node, gt.eq(t)); return n.length?1===n.length?F(e, o):n.reduce(function(t, n) {
      return t===e.node&&(t=F(e, o)), F({node: n, offset: t?N(t):f(n)}, o);
    }):null;
  } function H(t) {
    return document.createElement(t);
  } function D(t, e) {
    if (t&&t.parentNode) {
      if (t.removeNode) return t.removeNode(e); const o=t.parentNode; if (!e) {
        for (var n=[], i=0, r=t.childNodes.length; i<r; i++)n.push(t.childNodes[i]); for (i=0, r=n.length; i<r; i++)o.insertBefore(n[i], t);
      }o.removeChild(t);
    }
  } function B(t, e) {
    const o=Nt(t[0])?t.val():t.html(); return e?o.replace(/[\n\r]/g, ''):o;
  } function z(t, e) {
    let o; let n; let i=t.parentElement(); const r=document.body.createTextRange(); const s=vt.from(i.childNodes); for (o=0; o<s.length; o++) {
      if (!Et.isText(s[o])) {
        if (r.moveToElementText(s[o]), 0<=r.compareEndPoints('StartToStart', t)) break; n=s[o];
      }
    } if (0!==o&&Et.isText(s[o-1])) {
      const a=document.body.createTextRange(); let l=null; a.moveToElementText(n||i), a.collapse(!n), l=n?n.nextSibling:i.firstChild; const c=t.duplicate(); c.setEndPoint('StartToStart', a); for (var d=c.text.replace(/[\r\n]/g, '').length; d>l.nodeValue.length&&l.nextSibling;)d-=l.nodeValue.length, l=l.nextSibling; l.nodeValue, e&&l.nextSibling&&Et.isText(l.nextSibling)&&d===l.nodeValue.length&&(d-=l.nodeValue.length, l=l.nextSibling), i=l, o=d;
    } return {cont: i, offset: o};
  } function M(t) {
    var e=function(t, o) {
      let n; let i; if (Et.isText(t)) {
        const r=Et.listPrev(t, gt.not(Et.isText)); const s=vt.last(r).previousSibling; n=s||t.parentNode, o+=vt.sum(vt.tail(r), Et.nodeLength), i=!s;
      } else {
        if (n=t.childNodes[o]||t, Et.isText(n)) return e(n, 0); o=0, i=!1;
      } return {node: n, collapseToStart: i, offset: o};
    }; const o=document.body.createTextRange(); const n=e(t.node, t.offset); return o.moveToElementText(n.node), o.collapse(n.collapseToStart), o.moveStart('character', n.offset), o;
  }t=t&&t.hasOwnProperty('default')?t.default:t; const O=function() {
    function e(t, e, o, n) {
      this.markup=t, this.children=e, this.options=o, this.callback=n;
    } return e.prototype.render=function(e) {
      const o=t(this.markup); if (this.options&&this.options.contents&&o.html(this.options.contents), this.options&&this.options.className&&o.addClass(this.options.className), this.options&&this.options.data&&t.each(this.options.data, function(t, e) {
        o.attr('data-'+t, e);
      }), this.options&&this.options.click&&o.on('click', this.options.click), this.children) {
        const n=o.find('.note-children-container'); this.children.forEach(function(t) {
          t.render(n.length?n:o);
        });
      } return this.callback&&this.callback(o, this.options), this.options&&this.options.callback&&this.options.callback(o), e&&e.append(o), o;
    }, e;
  }(); const U=function(t, e) {
    return function() {
      const o='object'==typeof arguments[1]?arguments[1]:arguments[0]; let n=Array.isArray(arguments[0])?arguments[0]:[]; return o&&o.children&&(n=o.children), new O(t, n, o, e);
    };
  }; const j=U('<div class="note-editor note-frame panel panel-default"/>'); const K=U('<div class="note-toolbar panel-heading" role="toolbar"></div></div>'); const W=U('<div class="note-editing-area"/>'); const V=U('<textarea class="note-codable" role="textbox" aria-multiline="true"/>'); const q=U('<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>'); const G=U(['<output class="note-status-output" aria-live="polite"/>', '<div class="note-statusbar" role="status">', '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '  </div>', '</div>'].join('')); const _=U('<div class="note-editor"/>'); const Z=U(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>', '<output class="note-status-output" aria-live="polite"/>'].join('')); const Y=U('<div class="note-btn-group btn-group">'); const Q=U('<ul class="dropdown-menu" role="list">', function(t, e) {
    const o=Array.isArray(e.items)?e.items.map(function(t) {
      const o='string'==typeof t?t:t.value||''; const n=e.template?e.template(t):t; const i='object'==typeof t?t.option:void 0; return '<li role="listitem" aria-label="'+o+'"><a href="#" data-value="'+o+'"'+(void 0!==i?' data-option="'+i+'"':'')+'>'+n+'</a></li>';
    }).join(''):e.items; t.html(o).attr({'aria-label': e.title});
  }); const J=U('<ul class="dropdown-menu note-check" role="list">', function(t, e) {
    const o=Array.isArray(e.items)?e.items.map(function(t) {
      const o='string'==typeof t?t:t.value||''; const n=e.template?e.template(t):t; return '<li role="listitem" aria-label="'+t+'"><a href="#" data-value="'+o+'">'+nt(e.checkClassName)+' '+n+'</a></li>';
    }).join(''):e.items; t.html(o).attr({'aria-label': e.title});
  }); const X=U('<div class="note-color-palette"/>', function(t, e) {
    for (var o=[], n=0, i=e.colors.length; n<i; n++) {
      for (var r=e.eventName, s=e.colors[n], a=e.colorsName[n], l=[], c=0, d=s.length; c<d; c++) {
        const u=s[c]; const h=a[c]; l.push(['<button type="button" class="note-color-btn"', 'style="background-color:', u, '" ', 'data-event="', r, '" ', 'data-value="', u, '" ', 'title="', h, '" ', 'aria-label="', h, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(''));
      }o.push('<div class="note-color-row">'+l.join('')+'</div>');
    }t.html(o.join('')), e.tooltip&&t.find('.note-color-btn').tooltip({container: e.container, trigger: 'hover', placement: 'bottom'});
  }); const tt=U('<div class="modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function(t, e) {
    e.fade&&t.addClass('fade'), t.attr({'aria-label': e.title}), t.html(['<div class="modal-dialog">', '  <div class="modal-content">', e.title?'    <div class="modal-header">      <button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>      <h4 class="modal-title">'+e.title+'</h4>    </div>':'', '    <div class="modal-body">'+e.body+'</div>', e.footer?'    <div class="modal-footer">'+e.footer+'</div>':'', '  </div>', '</div>'].join(''));
  }); const et=U(['<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', '</div>'].join(''), function(t, e) {
    const o=void 0!==e.direction?e.direction:'bottom'; t.addClass(o), e.hideArrow&&t.find('.arrow').hide();
  }); const ot=U('<div class="checkbox"></div>', function(t, e) {
    t.html(['<label'+(e.id?' for="'+e.id+'"':'')+'>', ' <input role="checkbox" type="checkbox"'+(e.id?' id="'+e.id+'"':''), e.checked?' checked':'', ' aria-checked="'+(e.checked?'true':'false')+'"/>', e.text?e.text:'', '</label>'].join(''));
  }); var nt=function(t, e) {
    return '<'+(e=e||'i')+' class="'+t+'"/>';
  }; var it={editor: j, toolbar: K, editingArea: W, codable: V, editable: q, statusbar: G, airEditor: _, airEditable: Z, buttonGroup: Y, dropdown: Q, dropdownButtonContents: function(t, e) {
    return t+' '+nt(e.icons.caret, 'span');
  }, dropdownCheck: J, palette: X, dialog: tt, popover: et, checkbox: ot, icon: nt, options: {}, button: function(e, o) {
    return U('<button type="button" class="note-btn btn btn-default btn-sm" role="button" tabindex="-1">', function(e, o) {
      o&&o.tooltip&&e.attr({'title': o.tooltip, 'aria-label': o.tooltip}).tooltip({container: void 0!==o.container?o.container:'body', trigger: 'hover', placement: 'bottom'}).on('click', function(e) {
        t(e.currentTarget).tooltip('hide');
      });
    })(e, o);
  }, toggleBtn: function(t, e) {
    t.toggleClass('disabled', !e), t.attr('disabled', !e);
  }, toggleBtnActive: function(t, e) {
    t.toggleClass('active', e);
  }, onDialogShown: function(t, e) {
    t.one('shown.bs.modal', e);
  }, onDialogHidden: function(t, e) {
    t.one('hidden.bs.modal', e);
  }, showDialog: function(t) {
    t.modal('show');
  }, hideDialog: function(t) {
    t.modal('hide');
  }, createLayout: function(t, e) {
    const o=(e.airMode?it.airEditor([it.editingArea([it.airEditable()])]):it.editor([it.toolbar(), it.editingArea([it.codable(), it.editable()]), it.statusbar()])).render(); return o.insertAfter(t), {note: t, editor: o, toolbar: o.find('.note-toolbar'), editingArea: o.find('.note-editing-area'), editable: o.find('.note-editable'), codable: o.find('.note-codable'), statusbar: o.find('.note-statusbar')};
  }, removeLayout: function(t, e) {
    t.html(e.editable.html()), e.editor.remove(), t.show();
  }}; t.summernote=t.summernote||{lang: {}}, t.extend(t.summernote.lang, {'en-US': {font: {bold: 'Bold', italic: 'Italic', underline: 'Underline', clear: 'Remove Font Style', height: 'Line Height', name: 'Font Family', strikethrough: 'Strikethrough', subscript: 'Subscript', superscript: 'Superscript', size: 'Font Size'}, image: {image: 'Picture', insert: 'Insert Image', resizeFull: 'Resize full', resizeHalf: 'Resize half', resizeQuarter: 'Resize quarter', resizeNone: 'Original size', floatLeft: 'Float Left', floatRight: 'Float Right', floatNone: 'Remove float', shapeRounded: 'Shape: Rounded', shapeCircle: 'Shape: Circle', shapeThumbnail: 'Shape: Thumbnail', shapeNone: 'Shape: None', dragImageHere: 'Drag image or text here', dropImage: 'Drop image or Text', selectFromFiles: 'Select from files', maximumFileSize: 'Maximum file size', maximumFileSizeError: 'Maximum file size exceeded.', url: 'Image URL', remove: 'Remove Image', original: 'Original'}, video: {video: 'Video', videoLink: 'Video Link', insert: 'Insert Video', url: 'Video URL', providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'}, link: {link: 'Link', insert: 'Insert Link', unlink: 'Unlink', edit: 'Edit', textToDisplay: 'Text to display', url: 'To what URL should this link go?', openInNewWindow: 'Open in new window'}, table: {table: 'Table', addRowAbove: 'Add row above', addRowBelow: 'Add row below', addColLeft: 'Add column left', addColRight: 'Add column right', delRow: 'Delete row', delCol: 'Delete column', delTable: 'Delete table'}, hr: {insert: 'Insert Horizontal Rule'}, style: {style: 'Style', p: 'Normal', blockquote: 'Quote', pre: 'Code', h1: 'Header 1', h2: 'Header 2', h3: 'Header 3', h4: 'Header 4', h5: 'Header 5', h6: 'Header 6'}, lists: {unordered: 'Unordered list', ordered: 'Ordered list'}, options: {help: 'Help', fullscreen: 'Full Screen', codeview: 'Code View'}, paragraph: {paragraph: 'Paragraph', outdent: 'Outdent', indent: 'Indent', left: 'Align left', center: 'Align center', right: 'Align right', justify: 'Justify full'}, color: {recent: 'Recent Color', more: 'More Color', background: 'Background Color', foreground: 'Foreground Color', transparent: 'Transparent', setTransparent: 'Set transparent', reset: 'Reset', resetToDefault: 'Reset to default', cpSelect: 'Select'}, shortcut: {shortcuts: 'Keyboard shortcuts', close: 'Close', textFormatting: 'Text formatting', action: 'Action', paragraphFormatting: 'Paragraph formatting', documentStyle: 'Document Style', extraKeys: 'Extra keys'}, help: {'insertParagraph': 'Insert Paragraph', 'undo': 'Undoes the last command', 'redo': 'Redoes the last command', 'tab': 'Tab', 'untab': 'Untab', 'bold': 'Set a bold style', 'italic': 'Set a italic style', 'underline': 'Set a underline style', 'strikethrough': 'Set a strikethrough style', 'removeFormat': 'Clean a style', 'justifyLeft': 'Set left align', 'justifyCenter': 'Set center align', 'justifyRight': 'Set right align', 'justifyFull': 'Set full align', 'insertUnorderedList': 'Toggle unordered list', 'insertOrderedList': 'Toggle ordered list', 'outdent': 'Outdent on current paragraph', 'indent': 'Indent on current paragraph', 'formatPara': 'Change current block\'s format as a paragraph(P tag)', 'formatH1': 'Change current block\'s format as H1', 'formatH2': 'Change current block\'s format as H2', 'formatH3': 'Change current block\'s format as H3', 'formatH4': 'Change current block\'s format as H4', 'formatH5': 'Change current block\'s format as H5', 'formatH6': 'Change current block\'s format as H6', 'insertHorizontalRule': 'Insert horizontal rule', 'linkDialog.show': 'Show Link Dialog'}, history: {undo: 'Undo', redo: 'Redo'}, specialChar: {specialChar: 'SPECIAL CHARACTERS', select: 'Select Special characters'}}}); const rt='function'==typeof define&&define.amd; let st; const at=navigator.userAgent; const lt=/MSIE|Trident/i.test(at); if (lt) {
    let ct=/MSIE (\d+[.]\d+)/.exec(at); ct&&(st=parseFloat(ct[1])), (ct=/Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(at))&&(st=parseFloat(ct[1]));
  } const dt=/Edge\/\d+/.test(at); const ut=!!window.CodeMirror; const ht='ontouchstart'in window||0<navigator.MaxTouchPoints||0<navigator.msMaxTouchPoints; const pt=lt||dt?'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted':'input'; const ft={isMac: -1<navigator.appVersion.indexOf('Mac'), isMSIE: lt, isEdge: dt, isFF: !dt&&/firefox/i.test(at), isPhantom: /PhantomJS/i.test(at), isWebkit: !dt&&/webkit/i.test(at), isChrome: !dt&&/chrome/i.test(at), isSafari: !dt&&/safari/i.test(at), browserVersion: st, jqueryVersion: parseFloat(t.fn.jquery), isSupportAmd: rt, isSupportTouch: ht, hasCodeMirror: ut, isFontInstalled: function(t) {
    const e='Comic Sans MS'===t?'Courier New':'Comic Sans MS'; const o='mmmmmmmmmmwwwww'; const n=document.createElement('canvas').getContext('2d'); n.font='200px \''+e+'\''; const i=n.measureText(o).width; return n.font='200px \''+t+'\', \''+e+'\'', i!==n.measureText(o).width;
  }, isW3CRangeSupport: !!document.createRange, inputEventName: pt}; let mt=0; var gt={eq: function(t) {
    return function(e) {
      return t===e;
    };
  }, eq2: function(t, e) {
    return t===e;
  }, peq2: function(t) {
    return function(e, o) {
      return e[t]===o[t];
    };
  }, ok: function() {
    return !0;
  }, fail: function() {
    return !1;
  }, self: function(t) {
    return t;
  }, not: function(t) {
    return function() {
      return !t.apply(t, arguments);
    };
  }, and: function(t, e) {
    return function(o) {
      return t(o)&&e(o);
    };
  }, invoke: function(t, e) {
    return function() {
      return t[e].apply(t, arguments);
    };
  }, uniqueId: function(t) {
    const e=++mt+''; return t?t+e:e;
  }, rect2bnd: function(t) {
    const e=$(document); return {top: t.top+e.scrollTop(), left: t.left+e.scrollLeft(), width: t.right-t.left, height: t.bottom-t.top};
  }, invertObject: function(t) {
    const e={}; for (const o in t)t.hasOwnProperty(o)&&(e[t[o]]=o); return e;
  }, namespaceToCamel: function(t, e) {
    return (e=e||'')+t.split('.').map(function(t) {
      return t.substring(0, 1).toUpperCase()+t.substring(1);
    }).join('');
  }, debounce: function(t, e, o) {
    let n; return function() {
      const i=this; const r=arguments; const s=o&&!n; clearTimeout(n), n=setTimeout(function() {
        n=null, o||t.apply(i, r);
      }, e), s&&t.apply(i, r);
    };
  }, isValidUrl: function(t) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi.test(t);
  }}; var vt={head: e, last: o, initial: function(t) {
    return t.slice(0, t.length-1);
  }, tail: n, prev: function(t, e) {
    if (t&&t.length&&e) {
      const o=t.indexOf(e); return -1===o?null:t[o-1];
    } return null;
  }, next: function(t, e) {
    if (t&&t.length&&e) {
      const o=t.indexOf(e); return -1===o?null:t[o+1];
    } return null;
  }, find: function(t, e) {
    for (let o=0, n=t.length; o<n; o++) {
      const i=t[o]; if (e(i)) return i;
    }
  }, contains: i, all: function(t, e) {
    for (let o=0, n=t.length; o<n; o++) if (!e(t[o])) return !1; return !0;
  }, sum: function(t, e) {
    return e=e||gt.self, t.reduce(function(t, o) {
      return t+e(o);
    }, 0);
  }, from: function(t) {
    for (var e=[], o=t.length, n=-1; ++n<o;)e[n]=t[n]; return e;
  }, isEmpty: function(t) {
    return !t||!t.length;
  }, clusterBy: function(t, i) {
    return t.length?n(t).reduce(function(t, e) {
      const n=o(t); return i(o(n), e)?n[n.length]=e:t[t.length]=[e], t;
    }, [[e(t)]]):[];
  }, compact: function(t) {
    for (var e=[], o=0, n=t.length; o<n; o++)t[o]&&e.push(t[o]); return e;
  }, unique: function(t) {
    for (var e=[], o=0, n=t.length; o<n; o++)i(e, t[o])||e.push(t[o]); return e;
  }}; const bt=String.fromCharCode(160); const yt=s('PRE'); const kt=s('LI'); var Ct=s('TABLE'); var wt=s('DATA'); var xt=s('HR'); var St=s('BLOCKQUOTE'); const It=s('A'); const Tt=s('BODY'); var $t=ft.isMSIE&&ft.browserVersion<11?'&nbsp;':'<br>'; var Nt=s('TEXTAREA'); var Et={NBSP_CHAR: bt, ZERO_WIDTH_NBSP_CHAR: '\ufeff', blank: $t, emptyPara: '<p>'+$t+'</p>', makePredByNodeName: s, isEditable: r, isControlSizing: function(e) {
    return e&&t(e).hasClass('note-control-sizing');
  }, isText: a, isElement: function(t) {
    return t&&1===t.nodeType;
  }, isVoid: l, isPara: c, isPurePara: function(t) {
    return c(t)&&!kt(t);
  }, isHeading: function(t) {
    return t&&/^H[1-7]/.test(t.nodeName.toUpperCase());
  }, isInline: d, isBlock: gt.not(d), isBodyInline: function(t) {
    return d(t)&&!v(t, c);
  }, isBody: Tt, isParaInline: function(t) {
    return d(t)&&!!v(t, c);
  }, isPre: yt, isList: u, isTable: Ct, isData: wt, isCell: h, isBlockquote: St, isBodyContainer: p, isAnchor: It, isDiv: s('DIV'), isLi: kt, isBR: s('BR'), isSpan: s('SPAN'), isB: s('B'), isU: s('U'), isS: s('S'), isI: s('I'), isImg: s('IMG'), isTextarea: Nt, isEmpty: m, isEmptyAnchor: gt.and(It, m), isClosestSibling: function(t, e) {
    return t.nextSibling===e||t.previousSibling===e;
  }, withClosestSiblings: function(t, e) {
    e=e||gt.ok; const o=[]; return t.previousSibling&&e(t.previousSibling)&&o.push(t.previousSibling), o.push(t), t.nextSibling&&e(t.nextSibling)&&o.push(t.nextSibling), o;
  }, nodeLength: f, isLeftEdgePoint: w, isRightEdgePoint: x, isEdgePoint: S, isLeftEdgeOf: I, isRightEdgeOf: T, isLeftEdgePointOf: function(t, e) {
    return w(t)&&I(t.node, e);
  }, isRightEdgePointOf: function(t, e) {
    return x(t)&&T(t.node, e);
  }, prevPoint: R, nextPoint: L, isSamePoint: A, isVisiblePoint: function(t) {
    if (a(t.node)||!E(t.node)||m(t.node)) return !0; const e=t.node.childNodes[t.offset-1]; const o=t.node.childNodes[t.offset]; return !(e&&!l(e)||o&&!l(o));
  }, prevPointUntil: function(t, e) {
    for (;t;) {
      if (e(t)) return t; t=R(t);
    } return null;
  }, nextPointUntil: function(t, e) {
    for (;t;) {
      if (e(t)) return t; t=L(t);
    } return null;
  }, isCharPoint: function(t) {
    if (!a(t.node)) return !1; const e=t.node.nodeValue.charAt(t.offset-1); return e&&' '!==e&&e!==bt;
  }, walkPoint: function(t, e, o, n) {
    for (let i=t; i&&(o(i), !A(i, e));)i=L(i, n&&t.node!==i.node&&e.node!==i.node);
  }, ancestor: v, singleChildAncestor: function(t, e) {
    for (t=t.parentNode; t&&1===f(t);) {
      if (e(t)) return t; if (r(t)) break; t=t.parentNode;
    } return null;
  }, listAncestor: b, lastAncestor: function(t, e) {
    const o=b(t); return vt.last(o.filter(e));
  }, listNext: y, listPrev: function(t, e) {
    e=e||gt.fail; for (var o=[]; t&&!e(t);)o.push(t), t=t.previousSibling; return o;
  }, listDescendant: function(t, e) {
    const o=[]; return e=e||gt.ok, function n(i) {
      t!==i&&e(i)&&o.push(i); for (let r=0, s=i.childNodes.length; r<s; r++)n(i.childNodes[r]);
    }(t), o;
  }, commonAncestor: function(t, e) {
    for (let o=b(t), n=e; n; n=n.parentNode) if (-1<o.indexOf(n)) return n; return null;
  }, wrap: function(e, o) {
    const n=e.parentNode; const i=t('<'+o+'>')[0]; return n.insertBefore(i, e), i.appendChild(e), i;
  }, insertAfter: k, appendChildNodes: C, position: N, hasChildren: E, makeOffsetPath: function(t, e) {
    return b(e, gt.eq(t)).map(N).reverse();
  }, fromOffsetPath: function(t, e) {
    for (var o=t, n=0, i=e.length; n<i; n++)o=o.childNodes.length<=e[n]?o.childNodes[o.childNodes.length-1]:o.childNodes[e[n]]; return o;
  }, splitTree: P, splitPoint: function(t, e) {
    let o; let n; const i=e?c:p; const r=b(t.node, i); const s=vt.last(r)||t.node; n=i(s)?(o=r[r.length-2], s):(o=s).parentNode; let a=o&&P(o, t, {isSkipPaddingBlankHTML: e, isNotSplitEdgePoint: e}); return a||n!==t.node||(a=t.node.childNodes[t.offset]), {rightNode: a, container: n};
  }, create: H, createText: function(t) {
    return document.createTextNode(t);
  }, remove: D, removeWhile: function(t, e) {
    for (;t&&!r(t)&&e(t);) {
      const o=t.parentNode; D(t), t=o;
    }
  }, replace: function(t, e) {
    if (t.nodeName.toUpperCase()===e.toUpperCase()) return t; const o=H(e); return t.style.cssText&&(o.style.cssText=t.style.cssText), C(o, vt.from(t.childNodes)), k(o, t), D(t), o;
  }, html: function(t, e) {
    let o=B(t); return e&&(o=(o=o.replace(/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g, function(t, e, o) {
      o=o.toUpperCase(); const n=/^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(o)&&!!e; const i=/^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(o); return t+(n||i?'\n':'');
    })).trim()), o;
  }, value: B, posFromPlaceholder: function(e) {
    const o=t(e); const n=o.offset(); const i=o.outerHeight(!0); return {left: n.left, top: n.top+i};
  }, attachEvents: function(t, e) {
    Object.keys(e).forEach(function(o) {
      t.on(o, e[o]);
    });
  }, detachEvents: function(t, e) {
    Object.keys(e).forEach(function(o) {
      t.off(o, e[o]);
    });
  }, isCustomStyleTag: function(t) {
    return t&&!a(t)&&vt.contains(t.classList, 'note-styletag');
  }}; const Rt=function() {
    function e(e, o) {
      this.ui=t.summernote.ui, this.$note=e, this.memos={}, this.modules={}, this.layoutInfo={}, this.options=o, this.initialize();
    } return e.prototype.initialize=function() {
      return this.layoutInfo=this.ui.createLayout(this.$note, this.options), this._initialize(), this.$note.hide(), this;
    }, e.prototype.destroy=function() {
      this._destroy(), this.$note.removeData('summernote'), this.ui.removeLayout(this.$note, this.layoutInfo);
    }, e.prototype.reset=function() {
      const t=this.isDisabled(); this.code(Et.emptyPara), this._destroy(), this._initialize(), t&&this.disable();
    }, e.prototype._initialize=function() {
      const e=this; const o=t.extend({}, this.options.buttons); Object.keys(o).forEach(function(t) {
        e.memo('button.'+t, o[t]);
      }); const n=t.extend({}, this.options.modules, t.summernote.plugins||{}); Object.keys(n).forEach(function(t) {
        e.module(t, n[t], !0);
      }), Object.keys(this.modules).forEach(function(t) {
        e.initializeModule(t);
      });
    }, e.prototype._destroy=function() {
      const t=this; Object.keys(this.modules).reverse().forEach(function(e) {
        t.removeModule(e);
      }), Object.keys(this.memos).forEach(function(e) {
        t.removeMemo(e);
      }), this.triggerEvent('destroy', this);
    }, e.prototype.code=function(t) {
      const e=this.invoke('codeview.isActivated'); if (void 0===t) return this.invoke('codeview.sync'), e?this.layoutInfo.codable.val():this.layoutInfo.editable.html(); e?this.layoutInfo.codable.val(t):this.layoutInfo.editable.html(t), this.$note.val(t), this.triggerEvent('change', t, this.layoutInfo.editable);
    }, e.prototype.isDisabled=function() {
      return 'false'===this.layoutInfo.editable.attr('contenteditable');
    }, e.prototype.enable=function() {
      this.layoutInfo.editable.attr('contenteditable', !0), this.invoke('toolbar.activate', !0), this.triggerEvent('disable', !1);
    }, e.prototype.disable=function() {
      this.invoke('codeview.isActivated')&&this.invoke('codeview.deactivate'), this.layoutInfo.editable.attr('contenteditable', !1), this.invoke('toolbar.deactivate', !0), this.triggerEvent('disable', !0);
    }, e.prototype.triggerEvent=function() {
      const t=vt.head(arguments); const e=vt.tail(vt.from(arguments)); const o=this.options.callbacks[gt.namespaceToCamel(t, 'on')]; o&&o.apply(this.$note[0], e), this.$note.trigger('summernote.'+t, e);
    }, e.prototype.initializeModule=function(t) {
      const e=this.modules[t]; e.shouldInitialize=e.shouldInitialize||gt.ok, e.shouldInitialize()&&(e.initialize&&e.initialize(), e.events&&Et.attachEvents(this.$note, e.events));
    }, e.prototype.module=function(t, e, o) {
      if (1===arguments.length) return this.modules[t]; this.modules[t]=new e(this), o||this.initializeModule(t);
    }, e.prototype.removeModule=function(t) {
      const e=this.modules[t]; e.shouldInitialize()&&(e.events&&Et.detachEvents(this.$note, e.events), e.destroy&&e.destroy()), delete this.modules[t];
    }, e.prototype.memo=function(t, e) {
      if (1===arguments.length) return this.memos[t]; this.memos[t]=e;
    }, e.prototype.removeMemo=function(t) {
      this.memos[t]&&this.memos[t].destroy&&this.memos[t].destroy(), delete this.memos[t];
    }, e.prototype.createInvokeHandlerAndUpdateState=function(t, e) {
      const o=this; return function(n) {
        o.createInvokeHandler(t, e)(n), o.invoke('buttons.updateCurrentStyle');
      };
    }, e.prototype.createInvokeHandler=function(e, o) {
      const n=this; return function(i) {
        i.preventDefault(); const r=t(i.target); n.invoke(e, o||r.closest('[data-value]').data('value'), r);
      };
    }, e.prototype.invoke=function() {
      const t=vt.head(arguments); const e=vt.tail(vt.from(arguments)); const o=t.split('.'); const n=1<o.length; const i=n&&vt.head(o); const r=n?vt.last(o):vt.head(o); const s=this.modules[i||'editor']; return !i&&this[r]?this[r].apply(this, e):s&&s[r]&&s.shouldInitialize()?s[r].apply(s, e):void 0;
    }, e;
  }(); t.fn.extend({summernote: function() {
    const e=t.type(vt.head(arguments)); const o='string'===e; const n='object'===e; const i=t.extend({}, t.summernote.options, n?vt.head(arguments):{}); i.langInfo=t.extend(!0, {}, t.summernote.lang['en-US'], t.summernote.lang[i.lang]), i.icons=t.extend(!0, {}, t.summernote.options.icons, i.icons), i.tooltip='auto'===i.tooltip?!ft.isSupportTouch:i.tooltip, this.each(function(e, o) {
      const n=t(o); if (!n.data('summernote')) {
        const r=new Rt(n, i); n.data('summernote', r), n.data('summernote').triggerEvent('init', r.layoutInfo);
      }
    }); const r=this.first(); if (r.length) {
      const s=r.data('summernote'); if (o) return s.invoke.apply(s, vt.from(arguments)); i.focus&&s.invoke('editor.focus');
    } return this;
  }}); const Lt=function() {
    function e(t, e, o, n) {
      this.sc=t, this.so=e, this.ec=o, this.eo=n, this.isOnEditable=this.makeIsOn(Et.isEditable), this.isOnList=this.makeIsOn(Et.isList), this.isOnAnchor=this.makeIsOn(Et.isAnchor), this.isOnCell=this.makeIsOn(Et.isCell), this.isOnData=this.makeIsOn(Et.isData);
    } return e.prototype.nativeRange=function() {
      if (ft.isW3CRangeSupport) {
        const t=document.createRange(); return t.setStart(this.sc, this.sc.data&&this.so> this.sc.data.length?0:this.so), t.setEnd(this.ec, this.sc.data?Math.min(this.eo, this.sc.data.length):this.eo), t;
      } const e=M({node: this.sc, offset: this.so}); return e.setEndPoint('EndToEnd', M({node: this.ec, offset: this.eo})), e;
    }, e.prototype.getPoints=function() {
      return {sc: this.sc, so: this.so, ec: this.ec, eo: this.eo};
    }, e.prototype.getStartPoint=function() {
      return {node: this.sc, offset: this.so};
    }, e.prototype.getEndPoint=function() {
      return {node: this.ec, offset: this.eo};
    }, e.prototype.select=function() {
      const t=this.nativeRange(); if (ft.isW3CRangeSupport) {
        const e=document.getSelection(); 0<e.rangeCount&&e.removeAllRanges(), e.addRange(t);
      } else t.select(); return this;
    }, e.prototype.scrollIntoView=function(e) {
      const o=t(e).height(); return e.scrollTop+o<this.sc.offsetTop&&(e.scrollTop+=Math.abs(e.scrollTop+o-this.sc.offsetTop)), this;
    }, e.prototype.normalize=function() {
      const t=function(t, e) {
        if (Et.isVisiblePoint(t)&&(!Et.isEdgePoint(t)||Et.isRightEdgePoint(t)&&!e||Et.isLeftEdgePoint(t)&&e||Et.isRightEdgePoint(t)&&e&&Et.isVoid(t.node.nextSibling)||Et.isLeftEdgePoint(t)&&!e&&Et.isVoid(t.node.previousSibling)||Et.isBlock(t.node)&&Et.isEmpty(t.node))) return t; const o=Et.ancestor(t.node, Et.isBlock); if ((Et.isLeftEdgePointOf(t, o)||Et.isVoid(Et.prevPoint(t).node))&&!e||(Et.isRightEdgePointOf(t, o)||Et.isVoid(Et.nextPoint(t).node))&&e) {
          if (Et.isVisiblePoint(t)) return t; e=!e;
        } return (e?Et.nextPointUntil(Et.nextPoint(t), Et.isVisiblePoint):Et.prevPointUntil(Et.prevPoint(t), Et.isVisiblePoint))||t;
      }; const o=t(this.getEndPoint(), !1); const n=this.isCollapsed()?o:t(this.getStartPoint(), !0); return new e(n.node, n.offset, o.node, o.offset);
    }, e.prototype.nodes=function(t, e) {
      t=t||gt.ok; const o=e&&e.includeAncestor; const n=e&&e.fullyContains; const i=this.getStartPoint(); const r=this.getEndPoint(); const s=[]; const a=[]; return Et.walkPoint(i, r, function(e) {
        let i; Et.isEditable(e.node)||(n?(Et.isLeftEdgePoint(e)&&a.push(e.node), Et.isRightEdgePoint(e)&&vt.contains(a, e.node)&&(i=e.node)):i=o?Et.ancestor(e.node, t):e.node, i&&t(i)&&s.push(i));
      }, !0), vt.unique(s);
    }, e.prototype.commonAncestor=function() {
      return Et.commonAncestor(this.sc, this.ec);
    }, e.prototype.expand=function(t) {
      const o=Et.ancestor(this.sc, t); const n=Et.ancestor(this.ec, t); if (!o&&!n) return new e(this.sc, this.so, this.ec, this.eo); const i=this.getPoints(); return o&&(i.sc=o, i.so=0), n&&(i.ec=n, i.eo=Et.nodeLength(n)), new e(i.sc, i.so, i.ec, i.eo);
    }, e.prototype.collapse=function(t) {
      return t?new e(this.sc, this.so, this.sc, this.so):new e(this.ec, this.eo, this.ec, this.eo);
    }, e.prototype.splitText=function() {
      const t=this.sc===this.ec; const o=this.getPoints(); return Et.isText(this.ec)&&!Et.isEdgePoint(this.getEndPoint())&&this.ec.splitText(this.eo), Et.isText(this.sc)&&!Et.isEdgePoint(this.getStartPoint())&&(o.sc=this.sc.splitText(this.so), o.so=0, t&&(o.ec=o.sc, o.eo=this.eo-this.so)), new e(o.sc, o.so, o.ec, o.eo);
    }, e.prototype.deleteContents=function() {
      if (this.isCollapsed()) return this; const o=this.splitText(); const n=o.nodes(null, {fullyContains: !0}); const i=Et.prevPointUntil(o.getStartPoint(), function(t) {
        return !vt.contains(n, t.node);
      }); const r=[]; return t.each(n, function(t, e) {
        const o=e.parentNode; i.node!==o&&1===Et.nodeLength(o)&&r.push(o), Et.remove(e, !1);
      }), t.each(r, function(t, e) {
        Et.remove(e, !1);
      }), new e(i.node, i.offset, i.node, i.offset).normalize();
    }, e.prototype.makeIsOn=function(t) {
      return function() {
        const e=Et.ancestor(this.sc, t); return !!e&&e===Et.ancestor(this.ec, t);
      };
    }, e.prototype.isLeftEdgeOf=function(t) {
      if (!Et.isLeftEdgePoint(this.getStartPoint())) return !1; const e=Et.ancestor(this.sc, t); return e&&Et.isLeftEdgeOf(this.sc, e);
    }, e.prototype.isCollapsed=function() {
      return this.sc===this.ec&&this.so===this.eo;
    }, e.prototype.wrapBodyInlineWithPara=function() {
      if (Et.isBodyContainer(this.sc)&&Et.isEmpty(this.sc)) return this.sc.innerHTML=Et.emptyPara, new e(this.sc.firstChild, 0, this.sc.firstChild, 0); let t; const o=this.normalize(); if (Et.isParaInline(this.sc)||Et.isPara(this.sc)) return o; if (Et.isInline(o.sc)) {
        const n=Et.listAncestor(o.sc, gt.not(Et.isInline)); t=vt.last(n), Et.isInline(t)||(t=n[n.length-2]||o.sc.childNodes[o.so]);
      } else t=o.sc.childNodes[0<o.so?o.so-1:0]; let i=Et.listPrev(t, Et.isParaInline).reverse(); if ((i=i.concat(Et.listNext(t.nextSibling, Et.isParaInline))).length) {
        const r=Et.wrap(vt.head(i), 'p'); Et.appendChildNodes(r, vt.tail(i));
      } return this.normalize();
    }, e.prototype.insertNode=function(t) {
      const e=this.wrapBodyInlineWithPara().deleteContents(); const o=Et.splitPoint(e.getStartPoint(), Et.isInline(t)); return o.rightNode?o.rightNode.parentNode.insertBefore(t, o.rightNode):o.container.appendChild(t), t;
    }, e.prototype.pasteHTML=function(e) {
      const o=t('<div></div>').html(e)[0]; let n=vt.from(o.childNodes); const i=this.wrapBodyInlineWithPara().deleteContents(); return 0<i.so&&(n=n.reverse()), n=n.map(function(t) {
        return i.insertNode(t);
      }), 0<i.so&&(n=n.reverse()), n;
    }, e.prototype.toString=function() {
      const t=this.nativeRange(); return ft.isW3CRangeSupport?t.toString():t.text;
    }, e.prototype.getWordRange=function(t) {
      let o=this.getEndPoint(); if (!Et.isCharPoint(o)) return this; const n=Et.prevPointUntil(o, function(t) {
        return !Et.isCharPoint(t);
      }); return t&&(o=Et.nextPointUntil(o, function(t) {
        return !Et.isCharPoint(t);
      })), new e(n.node, n.offset, o.node, o.offset);
    }, e.prototype.bookmark=function(t) {
      return {s: {path: Et.makeOffsetPath(t, this.sc), offset: this.so}, e: {path: Et.makeOffsetPath(t, this.ec), offset: this.eo}};
    }, e.prototype.paraBookmark=function(t) {
      return {s: {path: vt.tail(Et.makeOffsetPath(vt.head(t), this.sc)), offset: this.so}, e: {path: vt.tail(Et.makeOffsetPath(vt.last(t), this.ec)), offset: this.eo}};
    }, e.prototype.getClientRects=function() {
      return this.nativeRange().getClientRects();
    }, e;
  }(); const At={create: function(t, e, o, n) {
    if (4===arguments.length) return new Lt(t, e, o, n); if (2===arguments.length) return new Lt(o=t, n=e, o, n); let i=this.createFromSelection(); return i||1!==arguments.length?i:(i=this.createFromNode(t)).collapse(Et.emptyPara===t.innerHTML);
  }, createFromSelection: function() {
    let t; let e; let o; let n; if (ft.isW3CRangeSupport) {
      const i=document.getSelection(); if (!i||0===i.rangeCount) return null; if (Et.isBody(i.anchorNode)) return null; const r=i.getRangeAt(0); t=r.startContainer, e=r.startOffset,
      o=r.endContainer, n=r.endOffset;
    } else {
      const s=document.selection.createRange(); const a=s.duplicate(); a.collapse(!1); const l=s; l.collapse(!0); let c=z(l, !0); const d=z(a, !1); Et.isText(c.node)&&Et.isLeftEdgePoint(c)&&Et.isTextNode(d.node)&&Et.isRightEdgePoint(d)&&d.node.nextSibling===c.node&&(c=d), t=c.cont, e=c.offset, o=d.cont, n=d.offset;
    } return new Lt(t, e, o, n);
  }, createFromNode: function(t) {
    let e=t; let o=0; let n=t; let i=Et.nodeLength(n); return Et.isVoid(e)&&(o=Et.listPrev(e).length-1, e=e.parentNode), Et.isBR(n)?(i=Et.listPrev(n).length-1, n=n.parentNode):Et.isVoid(n)&&(i=Et.listPrev(n).length, n=n.parentNode), this.create(e, o, n, i);
  }, createFromNodeBefore: function(t) {
    return this.createFromNode(t).collapse(!0);
  }, createFromNodeAfter: function(t) {
    return this.createFromNode(t).collapse();
  }, createFromBookmark: function(t, e) {
    const o=Et.fromOffsetPath(t, e.s.path); const n=e.s.offset; const i=Et.fromOffsetPath(t, e.e.path); const r=e.e.offset; return new Lt(o, n, i, r);
  }, createFromParaBookmark: function(t, e) {
    const o=t.s.offset; const n=t.e.offset; const i=Et.fromOffsetPath(vt.head(e), t.s.path); const r=Et.fromOffsetPath(vt.last(e), t.e.path); return new Lt(i, o, r, n);
  }}; const Ft={BACKSPACE: 8, TAB: 9, ENTER: 13, SPACE: 32, DELETE: 46, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52, NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, B: 66, E: 69, I: 73, J: 74, K: 75, L: 76, R: 82, S: 83, U: 85, V: 86, Y: 89, Z: 90, SLASH: 191, LEFTBRACKET: 219, BACKSLASH: 220, RIGHTBRACKET: 221}; const Pt={isEdit: function(t) {
    return vt.contains([Ft.BACKSPACE, Ft.TAB, Ft.ENTER, Ft.SPACE, Ft.DELETE], t);
  }, isMove: function(t) {
    return vt.contains([Ft.LEFT, Ft.UP, Ft.RIGHT, Ft.DOWN], t);
  }, nameFromCode: gt.invertObject(Ft), code: Ft}; const Ht=function() {
    function t(t) {
      this.stack=[], this.stackOffset=-1, this.$editable=t, this.editable=t[0];
    } return t.prototype.makeSnapshot=function() {
      const t=At.create(this.editable); return {contents: this.$editable.html(), bookmark: t&&t.isOnEditable()?t.bookmark(this.editable):{s: {path: [], offset: 0}, e: {path: [], offset: 0}}};
    }, t.prototype.applySnapshot=function(t) {
      null!==t.contents&&this.$editable.html(t.contents), null!==t.bookmark&&At.createFromBookmark(this.editable, t.bookmark).select();
    }, t.prototype.rewind=function() {
      this.$editable.html()!==this.stack[this.stackOffset].contents&&this.recordUndo(), this.stackOffset=0, this.applySnapshot(this.stack[this.stackOffset]);
    }, t.prototype.commit=function() {
      this.stack=[], this.stackOffset=-1, this.recordUndo();
    }, t.prototype.reset=function() {
      this.stack=[], this.stackOffset=-1, this.$editable.html(''), this.recordUndo();
    }, t.prototype.undo=function() {
      this.$editable.html()!==this.stack[this.stackOffset].contents&&this.recordUndo(), 0<this.stackOffset&&(this.stackOffset--, this.applySnapshot(this.stack[this.stackOffset]));
    }, t.prototype.redo=function() {
      this.stack.length-1> this.stackOffset&&(this.stackOffset++, this.applySnapshot(this.stack[this.stackOffset]));
    }, t.prototype.recordUndo=function() {
      this.stackOffset++, this.stack.length> this.stackOffset&&(this.stack=this.stack.slice(0, this.stackOffset)), this.stack.push(this.makeSnapshot());
    }, t;
  }(); const Dt=function() {
    function e() {} return e.prototype.jQueryCSS=function(e, o) {
      if (ft.jqueryVersion<1.9) {
        const n={}; return t.each(o, function(t, o) {
          n[o]=e.css(o);
        }), n;
      } return e.css(o);
    }, e.prototype.fromNode=function(t) {
      const e=this.jQueryCSS(t, ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'])||{}; return e['font-size']=parseInt(e['font-size'], 10), e;
    }, e.prototype.stylePara=function(e, o) {
      t.each(e.nodes(Et.isPara, {includeAncestor: !0}), function(e, n) {
        t(n).css(o);
      });
    }, e.prototype.styleNodes=function(e, o) {
      e=e.splitText(); const n=o&&o.nodeName||'SPAN'; const i=!(!o||!o.expandClosestSibling); const r=!(!o||!o.onlyPartialContains); if (e.isCollapsed()) return [e.insertNode(Et.create(n))]; let s=Et.makePredByNodeName(n); const a=e.nodes(Et.isText, {fullyContains: !0}).map(function(t) {
        return Et.singleChildAncestor(t, s)||Et.wrap(t, n);
      }); if (i) {
        if (r) {
          const l=e.nodes(); s=gt.and(s, function(t) {
            return vt.contains(l, t);
          });
        } return a.map(function(e) {
          const o=Et.withClosestSiblings(e, s); const n=vt.head(o); const i=vt.tail(o); return t.each(i, function(t, e) {
            Et.appendChildNodes(n, e.childNodes), Et.remove(e);
          }), vt.head(o);
        });
      } return a;
    }, e.prototype.current=function(e) {
      const o=t(Et.isElement(e.sc)?e.sc:e.sc.parentNode); let n=this.fromNode(o); try {
        n=t.extend(n, {'font-bold': document.queryCommandState('bold')?'bold':'normal', 'font-italic': document.queryCommandState('italic')?'italic':'normal', 'font-underline': document.queryCommandState('underline')?'underline':'normal', 'font-subscript': document.queryCommandState('subscript')?'subscript':'normal', 'font-superscript': document.queryCommandState('superscript')?'superscript':'normal', 'font-strikethrough': document.queryCommandState('strikethrough')?'strikethrough':'normal', 'font-family': document.queryCommandValue('fontname')||n['font-family']});
      } catch (e) {} if (e.isOnList()) {
        const i=-1<['circle', 'disc', 'disc-leading-zero', 'square'].indexOf(n['list-style-type']); n['list-style']=i?'unordered':'ordered';
      } else n['list-style']='none'; const r=Et.ancestor(e.sc, Et.isPara); if (r&&r.style['line-height'])n['line-height']=r.style.lineHeight; else {
        const s=parseInt(n['line-height'], 10)/parseInt(n['font-size'], 10); n['line-height']=s.toFixed(1);
      } return n.anchor=e.isOnAnchor()&&Et.ancestor(e.sc, Et.isAnchor), n.ancestors=Et.listAncestor(e.sc, Et.isEditable), n.range=e, n;
    }, e;
  }(); const Bt=function() {
    function e() {} return e.prototype.insertOrderedList=function(t) {
      this.toggleList('OL', t);
    }, e.prototype.insertUnorderedList=function(t) {
      this.toggleList('UL', t);
    }, e.prototype.indent=function(e) {
      const o=this; const n=At.create(e).wrapBodyInlineWithPara(); const i=n.nodes(Et.isPara, {includeAncestor: !0}); const r=vt.clusterBy(i, gt.peq2('parentNode')); t.each(r, function(e, n) {
        const i=vt.head(n); if (Et.isLi(i)) {
          const r=o.findList(i.previousSibling); r?n.map(function(t) {
            return r.appendChild(t);
          }):(o.wrapList(n, i.parentNode.nodeName), n.map(function(t) {
            return t.parentNode;
          }).map(function(t) {
            return o.appendToPrevious(t);
          }));
        } else {
          t.each(n, function(e, o) {
            t(o).css('marginLeft', function(t, e) {
              return (parseInt(e, 10)||0)+25;
            });
          });
        }
      }), n.select();
    }, e.prototype.outdent=function(e) {
      const o=this; const n=At.create(e).wrapBodyInlineWithPara(); const i=n.nodes(Et.isPara, {includeAncestor: !0}); const r=vt.clusterBy(i, gt.peq2('parentNode')); t.each(r, function(e, n) {
        const i=vt.head(n); Et.isLi(i)?o.releaseList([n]):t.each(n, function(e, o) {
          t(o).css('marginLeft', function(t, e) {
            return 25<(e=parseInt(e, 10)||0)?e-25:'';
          });
        });
      }), n.select();
    }, e.prototype.toggleList=function(e, o) {
      const n=this; const i=At.create(o).wrapBodyInlineWithPara(); let r=i.nodes(Et.isPara, {includeAncestor: !0}); const s=i.paraBookmark(r); const a=vt.clusterBy(r, gt.peq2('parentNode')); if (vt.find(r, Et.isPurePara)) {
        let l=[]; t.each(a, function(t, o) {
          l=l.concat(n.wrapList(o, e));
        }), r=l;
      } else {
        const c=i.nodes(Et.isList, {includeAncestor: !0}).filter(function(o) {
          return !t.nodeName(o, e);
        }); c.length?t.each(c, function(t, o) {
          Et.replace(o, e);
        }):r=this.releaseList(a, !0);
      }At.createFromParaBookmark(s, r).select();
    }, e.prototype.wrapList=function(t, e) {
      const o=vt.head(t); const n=vt.last(t); const i=Et.isList(o.previousSibling)&&o.previousSibling; const r=Et.isList(n.nextSibling)&&n.nextSibling; const s=i||Et.insertAfter(Et.create(e||'UL'), n); return t=t.map(function(t) {
        return Et.isPurePara(t)?Et.replace(t, 'LI'):t;
      }), Et.appendChildNodes(s, t), r&&(Et.appendChildNodes(s, vt.from(r.childNodes)), Et.remove(r)), t;
    }, e.prototype.releaseList=function(e, o) {
      const n=this; let i=[]; return t.each(e, function(e, r) {
        const s=vt.head(r); const a=vt.last(r); const l=o?Et.lastAncestor(s, Et.isList):s.parentNode; const c=l.parentNode; if ('LI'===l.parentNode.nodeName) {
          r.map(function(t) {
            const e=n.findNextSiblings(t); c.nextSibling?c.parentNode.insertBefore(t, c.nextSibling):c.parentNode.appendChild(t), e.length&&(n.wrapList(e, l.nodeName), t.appendChild(e[0].parentNode));
          }), 0===l.children.length&&c.removeChild(l), 0===c.childNodes.length&&c.parentNode.removeChild(c);
        } else {
          const d=1<l.childNodes.length?Et.splitTree(l, {node: a.parentNode, offset: Et.position(a)+1}, {isSkipPaddingBlankHTML: !0}):null; const u=Et.splitTree(l, {node: s.parentNode, offset: Et.position(s)}, {isSkipPaddingBlankHTML: !0}); r=o?Et.listDescendant(u, Et.isLi):vt.from(u.childNodes).filter(Et.isLi), !o&&Et.isList(l.parentNode)||(r=r.map(function(t) {
            return Et.replace(t, 'P');
          })), t.each(vt.from(r).reverse(), function(t, e) {
            Et.insertAfter(e, l);
          }); const h=vt.compact([l, u, d]); t.each(h, function(e, o) {
            const n=[o].concat(Et.listDescendant(o, Et.isList)); t.each(n.reverse(), function(t, e) {
              Et.nodeLength(e)||Et.remove(e, !0);
            });
          });
        }i=i.concat(r);
      }), i;
    }, e.prototype.appendToPrevious=function(t) {
      return t.previousSibling?Et.appendChildNodes(t.previousSibling, [t]):this.wrapList([t], 'LI');
    }, e.prototype.findList=function(t) {
      return t?vt.find(t.children, function(t) {
        return -1<['OL', 'UL'].indexOf(t.nodeName);
      }):null;
    }, e.prototype.findNextSiblings=function(t) {
      for (var e=[]; t.nextSibling;)e.push(t.nextSibling), t=t.nextSibling; return e;
    }, e;
  }(); const zt=function() {
    function e(t) {
      this.bullet=new Bt, this.options=t.options;
    } return e.prototype.insertTab=function(t, e) {
      const o=Et.createText(new Array(e+1).join(Et.NBSP_CHAR)); (t=t.deleteContents()).insertNode(o, !0), (t=At.create(o, e)).select();
    }, e.prototype.insertParagraph=function(e, o) {
      o=(o=(o=o||At.create(e)).deleteContents()).wrapBodyInlineWithPara(); let n; const i=Et.ancestor(o.sc, Et.isPara); if (i) {
        if (Et.isEmpty(i)&&Et.isLi(i)) return void this.bullet.toggleList(i.parentNode.nodeName); let r=null; if (1===this.options.blockquoteBreakingLevel?r=Et.ancestor(i, Et.isBlockquote):2===this.options.blockquoteBreakingLevel&&(r=Et.lastAncestor(i, Et.isBlockquote)), r) {
          n=t(Et.emptyPara)[0], Et.isRightEdgePoint(o.getStartPoint())&&Et.isBR(o.sc.nextSibling)&&t(o.sc.nextSibling).remove(); const s=Et.splitTree(r, o.getStartPoint(), {isDiscardEmptySplits: !0}); s?s.parentNode.insertBefore(n, s):Et.insertAfter(n, r);
        } else {
          n=Et.splitTree(i, o.getStartPoint()); let a=Et.listDescendant(i, Et.isEmptyAnchor); a=a.concat(Et.listDescendant(n, Et.isEmptyAnchor)), t.each(a, function(t, e) {
            Et.remove(e);
          }), (Et.isHeading(n)||Et.isPre(n)||Et.isCustomStyleTag(n))&&Et.isEmpty(n)&&(n=Et.replace(n, 'p'));
        }
      } else {
        const l=o.sc.childNodes[o.so]; n=t(Et.emptyPara)[0], l?o.sc.insertBefore(n, l):o.sc.appendChild(n);
      }At.create(n, 0).normalize().select().scrollIntoView(e);
    }, e;
  }(); var Mt=function(t, e, o, n) {
    function i(t, e, o, n, i, r, s) {
      const a={baseRow: o, baseCell: n, isRowSpan: i, isColSpan: r, isVirtual: s}; u[t]||(u[t]=[]), u[t][e]=a;
    } function r(t, e) {
      if (!u[t]) return e; if (!u[t][e]) return e; for (let o=e; u[t][o];) if (o++, !u[t][o]) return o;
    } function s(t, e) {
      const o=r(t.rowIndex, e.cellIndex); const n=1<e.colSpan; const s=1<e.rowSpan; const l=t.rowIndex===d.rowPos&&e.cellIndex===d.colPos; i(t.rowIndex, o, t, e, s, n, !1); const c=e.attributes.rowSpan?parseInt(e.attributes.rowSpan.value, 10):0; if (1<c) {
        for (let u=1; u<c; u++) {
          const h=t.rowIndex+u; a(h, o, e, l), i(h, o, t, e, !0, n, !0);
        }
      } const p=e.attributes.colSpan?parseInt(e.attributes.colSpan.value, 10):0; if (1<p) {
        for (let f=1; f<p; f++) {
          const m=r(t.rowIndex, o+f); a(t.rowIndex, m, e, l), i(t.rowIndex, m, t, e, s, !0, !0);
        }
      }
    } function a(t, e, o, n) {
      t===d.rowPos&&d.colPos>=o.cellIndex&&o.cellIndex<=e&&!n&&d.colPos++;
    } function l(t) {
      switch (e) {
        case Mt.where.Column: if (t.isColSpan) return Mt.resultAction.SubtractSpanCount; break; case Mt.where.Row: if (!t.isVirtual&&t.isRowSpan) return Mt.resultAction.AddCell; if (t.isRowSpan) return Mt.resultAction.SubtractSpanCount;
      } return Mt.resultAction.RemoveCell;
    } function c(t) {
      switch (e) {
        case Mt.where.Column: if (t.isColSpan) return Mt.resultAction.SumSpanCount; if (t.isRowSpan&&t.isVirtual) return Mt.resultAction.Ignore; break; case Mt.where.Row: if (t.isRowSpan) return Mt.resultAction.SumSpanCount; if (t.isColSpan&&t.isVirtual) return Mt.resultAction.Ignore;
      } return Mt.resultAction.AddCell;
    } var d={colPos: 0, rowPos: 0}; var u=[]; const h=[]; this.getActionList=function() {
      for (var t, n, i, r=e===Mt.where.Row?d.rowPos:-1, s=e===Mt.where.Column?d.colPos:-1, a=0, p=!0; p;) {
        const f=0<=r?r:a; const m=0<=s?s:a; const g=u[f]; if (!g) return p=!1, h; const v=g[m]; if (!v) return p=!1, h; let b=Mt.resultAction.Ignore; switch (o) {
          case Mt.requestAction.Add: b=c(v); break; case Mt.requestAction.Delete: b=l(v);
        }h.push((t=b, n=f, i=m, {baseCell: v.baseCell, action: t, virtualTable: {rowIndex: n, cellIndex: i}})), a++;
      } return h;
    }, t&&t.tagName&&('td'===t.tagName.toLowerCase()||'th'===t.tagName.toLowerCase())?(d.colPos=t.cellIndex, t.parentElement&&t.parentElement.tagName&&'tr'===t.parentElement.tagName.toLowerCase()?d.rowPos=t.parentElement.rowIndex:console.error('Impossible to identify start Row point.', t)):console.error('Impossible to identify start Cell point.', t), function() {
      for (let t=n.rows, e=0; e<t.length; e++) for (let o=t[e].cells, i=0; i<o.length; i++)s(t[e], o[i]);
    }();
  }; Mt.where={Row: 0, Column: 1}, Mt.requestAction={Add: 0, Delete: 1}, Mt.resultAction={Ignore: 0, SubtractSpanCount: 1, RemoveCell: 2, AddCell: 3, SumSpanCount: 4}; let Ot; const Ut=function() {
    function e() {} return e.prototype.tab=function(t, e) {
      const o=Et.ancestor(t.commonAncestor(), Et.isCell); const n=Et.ancestor(o, Et.isTable); const i=Et.listDescendant(n, Et.isCell); const r=vt[e?'prev':'next'](i, o); r&&At.create(r, 0).select();
    }, e.prototype.addRow=function(e, o) {
      for (var n=Et.ancestor(e.commonAncestor(), Et.isCell), i=t(n).closest('tr'), r=this.recoverAttributes(i), s=t('<tr'+r+'></tr>'), a=new Mt(n, Mt.where.Row, Mt.requestAction.Add, t(i).closest('table')[0]).getActionList(), l=0; l<a.length; l++) {
        const c=a[l]; const d=this.recoverAttributes(c.baseCell); switch (c.action) {
          case Mt.resultAction.AddCell: s.append('<td'+d+'>'+Et.blank+'</td>'); break; case Mt.resultAction.SumSpanCount: if ('top'===o&&(c.baseCell.parent?c.baseCell.closest('tr').rowIndex:0)<=i[0].rowIndex) {
            const u=t('<div></div>').append(t('<td'+d+'>'+Et.blank+'</td>').removeAttr('rowspan')).html(); s.append(u); break;
          } var h=parseInt(c.baseCell.rowSpan, 10); h++, c.baseCell.setAttribute('rowSpan', h);
        }
      } if ('top'===o)i.before(s); else {
        if (1<n.rowSpan) {
          const p=i[0].rowIndex+(n.rowSpan-2); return void t(t(i).parent().find('tr')[p]).after(t(s));
        }i.after(s);
      }
    }, e.prototype.addCol=function(e, o) {
      const n=Et.ancestor(e.commonAncestor(), Et.isCell); const i=t(n).closest('tr'); t(i).siblings().push(i); for (let r=new Mt(n, Mt.where.Column, Mt.requestAction.Add, t(i).closest('table')[0]).getActionList(), s=0; s<r.length; s++) {
        const a=r[s]; const l=this.recoverAttributes(a.baseCell); switch (a.action) {
          case Mt.resultAction.AddCell: 'right'===o?t(a.baseCell).after('<td'+l+'>'+Et.blank+'</td>'):t(a.baseCell).before('<td'+l+'>'+Et.blank+'</td>'); break; case Mt.resultAction.SumSpanCount: if ('right'===o) {
            let c=parseInt(a.baseCell.colSpan, 10); c++, a.baseCell.setAttribute('colSpan', c);
          } else t(a.baseCell).before('<td'+l+'>'+Et.blank+'</td>');
        }
      }
    }, e.prototype.recoverAttributes=function(t) {
      let e=''; if (!t) return e; for (let o=t.attributes||[], n=0; n<o.length; n++)'id'!==o[n].name.toLowerCase()&&o[n].specified&&(e+=' '+o[n].name+'=\''+o[n].value+'\''); return e;
    }, e.prototype.deleteRow=function(e) {
      for (var o=Et.ancestor(e.commonAncestor(), Et.isCell), n=t(o).closest('tr'), i=n.children('td, th').index(t(o)), r=n[0].rowIndex, s=new Mt(o, Mt.where.Row, Mt.requestAction.Delete, t(n).closest('table')[0]).getActionList(), a=0; a<s.length; a++) {
        if (s[a]) {
          const l=s[a].baseCell; const c=s[a].virtualTable; const d=l.rowSpan&&1<l.rowSpan; let u=d?parseInt(l.rowSpan, 10):0; switch (s[a].action) {
            case Mt.resultAction.Ignore: continue; case Mt.resultAction.AddCell: var h=n.next('tr')[0]; if (!h) continue; var p=n[0].cells[i]; d&&(2<u?(u--, h.insertBefore(p, h.cells[i]), h.cells[i].setAttribute('rowSpan', u), h.cells[i].innerHTML=''):2===u&&(h.insertBefore(p, h.cells[i]), h.cells[i].removeAttribute('rowSpan'), h.cells[i].innerHTML='')); continue; case Mt.resultAction.SubtractSpanCount: d&&(2<u?(u--, l.setAttribute('rowSpan', u), c.rowIndex!==r&&l.cellIndex===i&&(l.innerHTML='')):2===u&&(l.removeAttribute('rowSpan'), c.rowIndex!==r&&l.cellIndex===i&&(l.innerHTML=''))); continue; case Mt.resultAction.RemoveCell: continue;
          }
        }
      }n.remove();
    }, e.prototype.deleteCol=function(e) {
      for (let o=Et.ancestor(e.commonAncestor(), Et.isCell), n=t(o).closest('tr'), i=n.children('td, th').index(t(o)), r=new Mt(o, Mt.where.Column, Mt.requestAction.Delete, t(n).closest('table')[0]).getActionList(), s=0; s<r.length; s++) {
        if (r[s]) {
          switch (r[s].action) {
            case Mt.resultAction.Ignore: continue; case Mt.resultAction.SubtractSpanCount: var a=r[s].baseCell; if (a.colSpan&&1<a.colSpan) {
              let l=a.colSpan?parseInt(a.colSpan, 10):0; 2<l?(l--, a.setAttribute('colSpan', l), a.cellIndex===i&&(a.innerHTML='')):2===l&&(a.removeAttribute('colSpan'), a.cellIndex===i&&(a.innerHTML=''));
            } continue; case Mt.resultAction.RemoveCell: Et.remove(r[s].baseCell, !0); continue;
          }
        }
      }
    }, e.prototype.createTable=function(e, o, n) {
      for (var i, r=[], s=0; s<e; s++)r.push('<td>'+Et.blank+'</td>'); i=r.join(''); for (var a, l=[], c=0; c<o; c++)l.push('<tr>'+i+'</tr>'); a=l.join(''); const d=t('<table>'+a+'</table>'); return n&&n.tableClassName&&d.addClass(n.tableClassName), d[0];
    }, e.prototype.deleteTable=function(e) {
      const o=Et.ancestor(e.commonAncestor(), Et.isCell); t(o).closest('table').remove();
    }, e;
  }(); const jt=function() {
    function e(e) {
      const o=this; this.context=e, this.$note=e.layoutInfo.note, this.$editor=e.layoutInfo.editor, this.$editable=e.layoutInfo.editable, this.options=e.options, this.lang=this.options.langInfo, this.editable=this.$editable[0], this.lastRange=null, this.style=new Dt, this.table=new Ut, this.typing=new zt(e), this.bullet=new Bt, this.history=new Ht(this.$editable), this.context.memo('help.undo', this.lang.help.undo), this.context.memo('help.redo', this.lang.help.redo), this.context.memo('help.tab', this.lang.help.tab), this.context.memo('help.untab', this.lang.help.untab), this.context.memo('help.insertParagraph', this.lang.help.insertParagraph), this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList), this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList), this.context.memo('help.indent', this.lang.help.indent), this.context.memo('help.outdent', this.lang.help.outdent), this.context.memo('help.formatPara', this.lang.help.formatPara), this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule), this.context.memo('help.fontName', this.lang.help.fontName); for (var n=['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'formatBlock', 'removeFormat', 'backColor'], i=0, r=n.length; i<r; i++) {
        this[n[i]]=function(t) {
          return function(e) {
            o.beforeCommand(), document.execCommand(t, !1, e), o.afterCommand(!0);
          };
        }(n[i]), this.context.memo('help.'+n[i], this.lang.help[n[i]]);
      } for (this.fontName=this.wrapCommand(function(t) {
        return o.fontStyling('font-family', '\''+t+'\'');
      }), this.fontSize=this.wrapCommand(function(t) {
        return o.fontStyling('font-size', t+'px');
      }), i=1; i<=6; i++) {
        this['formatH'+i]=function(t) {
          return function() {
            o.formatBlock('H'+t);
          };
        }(i), this.context.memo('help.formatH'+i, this.lang.help['formatH'+i]);
      } this.insertParagraph=this.wrapCommand(function() {
        o.typing.insertParagraph(o.editable);
      }), this.insertOrderedList=this.wrapCommand(function() {
        o.bullet.insertOrderedList(o.editable);
      }), this.insertUnorderedList=this.wrapCommand(function() {
        o.bullet.insertUnorderedList(o.editable);
      }), this.indent=this.wrapCommand(function() {
        o.bullet.indent(o.editable);
      }), this.outdent=this.wrapCommand(function() {
        o.bullet.outdent(o.editable);
      }), this.insertNode=this.wrapCommand(function(e) {
        o.isLimited(t(e).text().length)||(o.getLastRange().insertNode(e), At.createFromNodeAfter(e).select(), o.setLastRange());
      }), this.insertText=this.wrapCommand(function(t) {
        if (!o.isLimited(t.length)) {
          const e=o.getLastRange().insertNode(Et.createText(t)); At.create(e, Et.nodeLength(e)).select(), o.setLastRange();
        }
      }), this.pasteHTML=this.wrapCommand(function(t) {
        if (!o.isLimited(t.length)) {
          t=o.context.invoke('codeview.purify', t); const e=o.getLastRange().pasteHTML(t); At.createFromNodeAfter(vt.last(e)).select(), o.setLastRange();
        }
      }), this.formatBlock=this.wrapCommand(function(t, e) {
        const n=o.options.callbacks.onApplyCustomStyle; n?n.call(o, e, o.context, o.onFormatBlock):o.onFormatBlock(t, e);
      }), this.insertHorizontalRule=this.wrapCommand(function() {
        const t=o.getLastRange().insertNode(Et.create('HR')); t.nextSibling&&(At.create(t.nextSibling, 0).normalize().select(), o.setLastRange());
      }), this.lineHeight=this.wrapCommand(function(t) {
        o.style.stylePara(o.getLastRange(), {lineHeight: t});
      }), this.createLink=this.wrapCommand(function(e) {
        let n=e.url; const i=e.text; const r=e.isNewWindow; let s=e.range||o.getLastRange(); const a=i.length-s.toString().length; if (!(0<a&&o.isLimited(a))) {
          const l=s.toString()!==i; 'string'==typeof n&&(n=n.trim()), n=o.options.onCreateLink?o.options.onCreateLink(n):/^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(n)?n:'http://'+n; let c=[]; if (l) {
            const d=(s=s.deleteContents()).insertNode(t('<A>'+i+'</A>')[0]); c.push(d);
          } else c=o.style.styleNodes(s, {nodeName: 'A', expandClosestSibling: !0, onlyPartialContains: !0}); t.each(c, function(e, o) {
            t(o).attr('href', n), r?t(o).attr('target', '_blank'):t(o).removeAttr('target');
          }); const u=At.createFromNodeBefore(vt.head(c)).getStartPoint(); const h=At.createFromNodeAfter(vt.last(c)).getEndPoint(); At.create(u.node, u.offset, h.node, h.offset).select(), o.setLastRange();
        }
      }), this.color=this.wrapCommand(function(t) {
        const e=t.foreColor; const o=t.backColor; e&&document.execCommand('foreColor', !1, e), o&&document.execCommand('backColor', !1, o);
      }), this.foreColor=this.wrapCommand(function(t) {
        document.execCommand('styleWithCSS', !1, !0), document.execCommand('foreColor', !1, t);
      }), this.insertTable=this.wrapCommand(function(t) {
        const e=t.split('x'); o.getLastRange().deleteContents().insertNode(o.table.createTable(e[0], e[1], o.options));
      }), this.removeMedia=this.wrapCommand(function() {
        let e=t(o.restoreTarget()).parent(); e.parent('figure').length?e.parent('figure').remove():e=t(o.restoreTarget()).detach(), o.context.triggerEvent('media.delete', e, o.$editable);
      }), this.floatMe=this.wrapCommand(function(e) {
        const n=t(o.restoreTarget()); n.toggleClass('note-float-left', 'left'===e), n.toggleClass('note-float-right', 'right'===e), n.css('float', 'none'===e?'':e);
      }), this.resize=this.wrapCommand(function(e) {
        const n=t(o.restoreTarget()); 0===(e=parseFloat(e))?n.css('width', ''):n.css({width: 100*e+'%', height: ''});
      });
    } return e.prototype.initialize=function() {
      const t=this; this.$editable.on('keydown', function(e) {
        if (e.keyCode===Pt.code.ENTER&&t.context.triggerEvent('enter', e), t.context.triggerEvent('keydown', e), e.isDefaultPrevented()||(t.options.shortcuts?t.handleKeyMap(e):t.preventDefaultEditableShortCuts(e)), t.isLimited(1, e)) return !1;
      }).on('keyup', function(e) {
        t.setLastRange(), t.context.triggerEvent('keyup', e);
      }).on('focus', function(e) {
        t.setLastRange(), t.context.triggerEvent('focus', e);
      }).on('blur', function(e) {
        t.context.triggerEvent('blur', e);
      }).on('mousedown', function(e) {
        t.context.triggerEvent('mousedown', e);
      }).on('mouseup', function(e) {
        t.setLastRange(), t.context.triggerEvent('mouseup', e);
      }).on('scroll', function(e) {
        t.context.triggerEvent('scroll', e);
      }).on('paste', function(e) {
        t.setLastRange(), t.context.triggerEvent('paste', e);
      }), this.$editable.attr('spellcheck', this.options.spellCheck), this.$editable.html(Et.html(this.$note)||Et.emptyPara), this.$editable.on(ft.inputEventName, gt.debounce(function() {
        t.context.triggerEvent('change', t.$editable.html(), t.$editable);
      }, 10)), this.$editor.on('focusin', function(e) {
        t.context.triggerEvent('focusin', e);
      }).on('focusout', function(e) {
        t.context.triggerEvent('focusout', e);
      }), this.options.airMode||(this.options.width&&this.$editor.outerWidth(this.options.width), this.options.height&&this.$editable.outerHeight(this.options.height), this.options.maxHeight&&this.$editable.css('max-height', this.options.maxHeight), this.options.minHeight&&this.$editable.css('min-height', this.options.minHeight)), this.history.recordUndo(), this.setLastRange();
    }, e.prototype.destroy=function() {
      this.$editable.off();
    }, e.prototype.handleKeyMap=function(t) {
      const e=this.options.keyMap[ft.isMac?'mac':'pc']; const o=[]; t.metaKey&&o.push('CMD'), t.ctrlKey&&!t.altKey&&o.push('CTRL'), t.shiftKey&&o.push('SHIFT'); const n=Pt.nameFromCode[t.keyCode]; n&&o.push(n); const i=e[o.join('+')]; i?!1!==this.context.invoke(i)&&t.preventDefault():Pt.isEdit(t.keyCode)&&this.afterCommand();
    }, e.prototype.preventDefaultEditableShortCuts=function(t) {
      (t.ctrlKey||t.metaKey)&&vt.contains([66, 73, 85], t.keyCode)&&t.preventDefault();
    }, e.prototype.isLimited=function(t, e) {
      return t=t||0, (void 0===e||!(Pt.isMove(e.keyCode)||e.ctrlKey||e.metaKey||vt.contains([Pt.code.BACKSPACE, Pt.code.DELETE], e.keyCode)))&&0<this.options.maxTextLength&&this.$editable.text().length+t>=this.options.maxTextLength;
    }, e.prototype.createRange=function() {
      return this.focus(), this.setLastRange(), this.getLastRange();
    }, e.prototype.setLastRange=function() {
      this.lastRange=At.create(this.editable);
    }, e.prototype.getLastRange=function() {
      return this.lastRange||this.setLastRange(), this.lastRange;
    }, e.prototype.saveRange=function(t) {
      t&&this.getLastRange().collapse().select();
    }, e.prototype.restoreRange=function() {
      this.lastRange&&(this.lastRange.select(), this.focus());
    }, e.prototype.saveTarget=function(t) {
      this.$editable.data('target', t);
    }, e.prototype.clearTarget=function() {
      this.$editable.removeData('target');
    }, e.prototype.restoreTarget=function() {
      return this.$editable.data('target');
    }, e.prototype.currentStyle=function() {
      let t=At.create(); return t&&(t=t.normalize()), t?this.style.current(t):this.style.fromNode(this.$editable);
    }, e.prototype.styleFromNode=function(t) {
      return this.style.fromNode(t);
    }, e.prototype.undo=function() {
      this.context.triggerEvent('before.command', this.$editable.html()), this.history.undo(), this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }, e.prototype.commit=function() {
      this.context.triggerEvent('before.command', this.$editable.html()), this.history.commit(), this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }, e.prototype.redo=function() {
      this.context.triggerEvent('before.command', this.$editable.html()), this.history.redo(), this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }, e.prototype.beforeCommand=function() {
      this.context.triggerEvent('before.command', this.$editable.html()), this.focus();
    }, e.prototype.afterCommand=function(t) {
      this.normalizeContent(), this.history.recordUndo(), t||this.context.triggerEvent('change', this.$editable.html(), this.$editable);
    }, e.prototype.tab=function() {
      const t=this.getLastRange(); if (t.isCollapsed()&&t.isOnCell()) this.table.tab(t); else {
        if (0===this.options.tabSize) return !1; this.isLimited(this.options.tabSize)||(this.beforeCommand(), this.typing.insertTab(t, this.options.tabSize), this.afterCommand());
      }
    }, e.prototype.untab=function() {
      const t=this.getLastRange(); if (t.isCollapsed()&&t.isOnCell()) this.table.tab(t, !0); else if (0===this.options.tabSize) return !1;
    }, e.prototype.wrapCommand=function(t) {
      return function() {
        this.beforeCommand(), t.apply(this, arguments), this.afterCommand();
      };
    }, e.prototype.insertImage=function(e, o) {
      let n; const i=this; return (n=e, t.Deferred(function(e) {
        const o=t('<img>'); o.one('load', function() {
          o.off('error abort'), e.resolve(o);
        }).one('error abort', function() {
          o.off('load').detach(), e.reject(o);
        }).css({display: 'none'}).appendTo(document.body).attr('src', n);
      }).promise()).then(function(t) {
        i.beforeCommand(), 'function'==typeof o?o(t):('string'==typeof o&&t.attr('data-filename', o), t.css('width', Math.min(i.$editable.width(), t.width()))), t.show(), At.create(i.editable).insertNode(t[0]), At.createFromNodeAfter(t[0]).select(), i.setLastRange(), i.afterCommand();
      }).fail(function(t) {
        i.context.triggerEvent('image.upload.error', t);
      });
    }, e.prototype.insertImagesAsDataURL=function(e) {
      const o=this; t.each(e, function(e, n) {
        let i; const r=n.name; o.options.maximumImageFileSize&&o.options.maximumImageFileSize<n.size?o.context.triggerEvent('image.upload.error', o.lang.image.maximumFileSizeError):(i=n, t.Deferred(function(e) {
          t.extend(new FileReader, {onload: function(t) {
            const o=t.target.result; e.resolve(o);
          }, onerror: function(t) {
            e.reject(t);
          }}).readAsDataURL(i);
        }).promise()).then(function(t) {
          return o.insertImage(t, r);
        }).fail(function() {
          o.context.triggerEvent('image.upload.error');
        });
      });
    }, e.prototype.insertImagesOrCallback=function(t) {
this.options.callbacks.onImageUpload?this.context.triggerEvent('image.upload', t):this.insertImagesAsDataURL(t);
    }, e.prototype.getSelectedText=function() {
      let t=this.getLastRange(); return t.isOnAnchor()&&(t=At.createFromNode(Et.ancestor(t.sc, Et.isAnchor))), t.toString();
    }, e.prototype.onFormatBlock=function(e, o) {
      if (document.execCommand('FormatBlock', !1, ft.isMSIE?'<'+e+'>':e), o&&o.length&&(o[0].tagName.toUpperCase()!==e.toUpperCase()&&(o=o.find(e)), o&&o.length)) {
        const n=o[0].className||''; if (n) {
          const i=this.createRange(); t([i.sc, i.ec]).closest(e).addClass(n);
        }
      }
    }, e.prototype.formatPara=function() {
      this.formatBlock('P');
    }, e.prototype.fontStyling=function(e, o) {
      const n=this.getLastRange(); if (n) {
        const i=this.style.styleNodes(n); if (t(i).css(e, o), n.isCollapsed()) {
          const r=vt.head(i); r&&!Et.nodeLength(r)&&(r.innerHTML=Et.ZERO_WIDTH_NBSP_CHAR, At.createFromNodeAfter(r.firstChild).select(), this.setLastRange(), this.$editable.data('bogus', r));
        }
      }
    }, e.prototype.unlink=function() {
      let t=this.getLastRange(); if (t.isOnAnchor()) {
        const e=Et.ancestor(t.sc, Et.isAnchor); (t=At.createFromNode(e)).select(), this.setLastRange(), this.beforeCommand(), document.execCommand('unlink'), this.afterCommand();
      }
    }, e.prototype.getLinkInfo=function() {
      const e=this.getLastRange().expand(Et.isAnchor); const o=t(vt.head(e.nodes(Et.isAnchor))); const n={range: e, text: e.toString(), url: o.length?o.attr('href'):''}; return o.length&&(n.isNewWindow='_blank'===o.attr('target')), n;
    }, e.prototype.addRow=function(t) {
      const e=this.getLastRange(this.$editable); e.isCollapsed()&&e.isOnCell()&&(this.beforeCommand(), this.table.addRow(e, t), this.afterCommand());
    }, e.prototype.addCol=function(t) {
      const e=this.getLastRange(this.$editable); e.isCollapsed()&&e.isOnCell()&&(this.beforeCommand(), this.table.addCol(e, t), this.afterCommand());
    }, e.prototype.deleteRow=function() {
      const t=this.getLastRange(this.$editable); t.isCollapsed()&&t.isOnCell()&&(this.beforeCommand(), this.table.deleteRow(t), this.afterCommand());
    }, e.prototype.deleteCol=function() {
      const t=this.getLastRange(this.$editable); t.isCollapsed()&&t.isOnCell()&&(this.beforeCommand(), this.table.deleteCol(t), this.afterCommand());
    }, e.prototype.deleteTable=function() {
      const t=this.getLastRange(this.$editable); t.isCollapsed()&&t.isOnCell()&&(this.beforeCommand(), this.table.deleteTable(t), this.afterCommand());
    }, e.prototype.resizeTo=function(t, e, o) {
      let n; if (o) {
        const i=t.y/t.x; const r=e.data('ratio'); n={width: i<r?t.x:t.y/r, height: i<r?t.x*r:t.y};
      } else n={width: t.x, height: t.y}; e.css(n);
    }, e.prototype.hasFocus=function() {
      return this.$editable.is(':focus');
    }, e.prototype.focus=function() {
      this.hasFocus()||this.$editable.focus();
    }, e.prototype.isEmpty=function() {
      return Et.isEmpty(this.$editable[0])||Et.emptyPara===this.$editable.html();
    }, e.prototype.empty=function() {
      this.context.invoke('code', Et.emptyPara);
    }, e.prototype.normalizeContent=function() {
      this.$editable[0].normalize();
    }, e;
  }(); const Kt=function() {
    function t(t) {
      this.context=t, this.$editable=t.layoutInfo.editable;
    } return t.prototype.initialize=function() {
      this.$editable.on('paste', this.pasteByEvent.bind(this));
    }, t.prototype.pasteByEvent=function(t) {
      const e=t.originalEvent.clipboardData; if (e&&e.items&&e.items.length) {
        const o=1<e.items.length?e.items[1]:vt.head(e.items); 'file'===o.kind&&-1!==o.type.indexOf('image/')&&this.context.invoke('editor.insertImagesOrCallback', [o.getAsFile()]), this.context.invoke('editor.afterCommand');
      }
    }, t;
  }(); const Wt=function() {
    function e(e) {
      this.context=e, this.$eventListener=t(document), this.$editor=e.layoutInfo.editor, this.$editable=e.layoutInfo.editable, this.options=e.options, this.lang=this.options.langInfo, this.documentEventHandlers={}, this.$dropzone=t(['<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', '</div>'].join('')).prependTo(this.$editor);
    } return e.prototype.initialize=function() {
this.options.disableDragAndDrop?(this.documentEventHandlers.onDrop=function(t) {
  t.preventDefault();
}, this.$eventListener=this.$dropzone, this.$eventListener.on('drop', this.documentEventHandlers.onDrop)):this.attachDragAndDropEvent();
    }, e.prototype.attachDragAndDropEvent=function() {
      const e=this; let o=t(); const n=this.$dropzone.find('.note-dropzone-message'); this.documentEventHandlers.onDragenter=function(t) {
        const i=e.context.invoke('codeview.isActivated'); const r=0<e.$editor.width()&&0<e.$editor.height(); i||o.length||!r||(e.$editor.addClass('dragover'), e.$dropzone.width(e.$editor.width()), e.$dropzone.height(e.$editor.height()), n.text(e.lang.image.dragImageHere)), o=o.add(t.target);
      }, this.documentEventHandlers.onDragleave=function(t) {
        (o=o.not(t.target)).length||e.$editor.removeClass('dragover');
      }, this.documentEventHandlers.onDrop=function() {
        o=t(), e.$editor.removeClass('dragover');
      }, this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter).on('dragleave', this.documentEventHandlers.onDragleave).on('drop', this.documentEventHandlers.onDrop),
      this.$dropzone.on('dragenter', function() {
        e.$dropzone.addClass('hover'), n.text(e.lang.image.dropImage);
      }).on('dragleave', function() {
        e.$dropzone.removeClass('hover'), n.text(e.lang.image.dragImageHere);
      }), this.$dropzone.on('drop', function(o) {
        const n=o.originalEvent.dataTransfer; o.preventDefault(), n&&n.files&&n.files.length?(e.$editable.focus(), e.context.invoke('editor.insertImagesOrCallback', n.files)):t.each(n.types, function(o, i) {
          const r=n.getData(i); -1<i.toLowerCase().indexOf('text')?e.context.invoke('editor.pasteHTML', r):t(r).each(function(t, o) {
            e.context.invoke('editor.insertNode', o);
          });
        });
      }).on('dragover', !1);
    }, e.prototype.destroy=function() {
      const t=this; Object.keys(this.documentEventHandlers).forEach(function(e) {
        t.$eventListener.off(e.substr(2).toLowerCase(), t.documentEventHandlers[e]);
      }), this.documentEventHandlers={};
    }, e;
  }(); ft.hasCodeMirror&&(Ot=window.CodeMirror); const Vt=function() {
    function t(t) {
      this.context=t, this.$editor=t.layoutInfo.editor, this.$editable=t.layoutInfo.editable, this.$codable=t.layoutInfo.codable, this.options=t.options;
    } return t.prototype.sync=function() {
      this.isActivated()&&ft.hasCodeMirror&&this.$codable.data('cmEditor').save();
    }, t.prototype.isActivated=function() {
      return this.$editor.hasClass('codeview');
    }, t.prototype.toggle=function() {
this.isActivated()?this.deactivate():this.activate(), this.context.triggerEvent('codeview.toggled');
    }, t.prototype.purify=function(t) {
      if (this.options.codeviewFilter&&(t=t.replace(this.options.codeviewFilterRegex, ''), this.options.codeviewIframeFilter)) {
        const e=this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase); t=t.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function(t) {
          if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(t)) return ''; for (let o=0, n=e; o<n.length; o++) {
            const i=n[o]; if (new RegExp('src="(https?:)?//'+i.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')+'/(.+)"').test(t)) return t;
          } return '';
        });
      } return t;
    }, t.prototype.activate=function() {
      const t=this; if (this.$codable.val(Et.html(this.$editable, this.options.prettifyHtml)), this.$codable.height(this.$editable.height()), this.context.invoke('toolbar.updateCodeview', !0), this.$editor.addClass('codeview'), this.$codable.focus(), ft.hasCodeMirror) {
        const e=Ot.fromTextArea(this.$codable[0], this.options.codemirror); if (this.options.codemirror.tern) {
          const o=new Ot.TernServer(this.options.codemirror.tern); e.ternServer=o, e.on('cursorActivity', function(t) {
            o.updateArgHints(t);
          });
        }e.on('blur', function(o) {
          t.context.triggerEvent('blur.codeview', e.getValue(), o);
        }), e.on('change', function(o) {
          t.context.triggerEvent('change.codeview', e.getValue(), e);
        }), e.setSize(null, this.$editable.outerHeight()), this.$codable.data('cmEditor', e);
      } else {
        this.$codable.on('blur', function(e) {
          t.context.triggerEvent('blur.codeview', t.$codable.val(), e);
        }), this.$codable.on('input', function(e) {
          t.context.triggerEvent('change.codeview', t.$codable.val(), t.$codable);
        });
      }
    }, t.prototype.deactivate=function() {
      if (ft.hasCodeMirror) {
        const t=this.$codable.data('cmEditor'); this.$codable.val(t.getValue()), t.toTextArea();
      } const e=this.purify(Et.value(this.$codable, this.options.prettifyHtml)||Et.emptyPara); const o=this.$editable.html()!==e; this.$editable.html(e), this.$editable.height(this.options.height?this.$codable.height():'auto'), this.$editor.removeClass('codeview'), o&&this.context.triggerEvent('change', this.$editable.html(), this.$editable), this.$editable.focus(), this.context.invoke('toolbar.updateCodeview', !1);
    }, t.prototype.destroy=function() {
      this.isActivated()&&this.deactivate();
    }, t;
  }(); const qt=function() {
    function e(e) {
      this.$document=t(document), this.$statusbar=e.layoutInfo.statusbar, this.$editable=e.layoutInfo.editable, this.options=e.options;
    } return e.prototype.initialize=function() {
      const t=this; this.options.airMode||this.options.disableResizeEditor?this.destroy():this.$statusbar.on('mousedown', function(e) {
        e.preventDefault(), e.stopPropagation(); const o=t.$editable.offset().top-t.$document.scrollTop(); const n=function(e) {
          let n=e.clientY-(o+24); n=0<t.options.minheight?Math.max(n, t.options.minheight):n, n=0<t.options.maxHeight?Math.min(n, t.options.maxHeight):n, t.$editable.height(n);
        }; t.$document.on('mousemove', n).one('mouseup', function() {
          t.$document.off('mousemove', n);
        });
      });
    }, e.prototype.destroy=function() {
      this.$statusbar.off(), this.$statusbar.addClass('locked');
    }, e;
  }(); const Gt=function() {
    function e(e) {
      const o=this; this.context=e, this.$editor=e.layoutInfo.editor, this.$toolbar=e.layoutInfo.toolbar, this.$editable=e.layoutInfo.editable, this.$codable=e.layoutInfo.codable, this.$window=t(window), this.$scrollbar=t('html, body'), this.onResize=function() {
        o.resizeTo({h: o.$window.height()-o.$toolbar.outerHeight()});
      };
    } return e.prototype.resizeTo=function(t) {
      this.$editable.css('height', t.h), this.$codable.css('height', t.h), this.$codable.data('cmeditor')&&this.$codable.data('cmeditor').setsize(null, t.h);
    }, e.prototype.toggle=function() {
      this.$editor.toggleClass('fullscreen'), this.isFullscreen()?(this.$editable.data('orgHeight', this.$editable.css('height')), this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight')), this.$editable.css('maxHeight', ''), this.$window.on('resize', this.onResize).trigger('resize'), this.$scrollbar.css('overflow', 'hidden')):(this.$window.off('resize', this.onResize), this.resizeTo({h: this.$editable.data('orgHeight')}), this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight')), this.$scrollbar.css('overflow', 'visible')), this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
    }, e.prototype.isFullscreen=function() {
      return this.$editor.hasClass('fullscreen');
    }, e;
  }(); const _t=function() {
    function e(e) {
      const o=this; this.context=e, this.$document=t(document), this.$editingArea=e.layoutInfo.editingArea, this.options=e.options, this.lang=this.options.langInfo, this.events={'summernote.mousedown': function(t, e) {
        o.update(e.target, e)&&e.preventDefault();
      }, 'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function() {
        o.update();
      }, 'summernote.disable': function() {
        o.hide();
      }, 'summernote.codeview.toggled': function() {
        o.update();
      }};
    } return e.prototype.initialize=function() {
      const e=this; this.$handle=t(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage?'note-control-holder':'note-control-sizing', ' note-control-se"></div>', this.options.disableResizeImage?'':'<div class="note-control-selection-info"></div>', '</div>', '</div>'].join('')).prependTo(this.$editingArea), this.$handle.on('mousedown', function(t) {
        if (Et.isControlSizing(t.target)) {
          t.preventDefault(), t.stopPropagation(); const o=e.$handle.find('.note-control-selection').data('target'); const n=o.offset(); const i=e.$document.scrollTop(); const r=function(t) {
            e.context.invoke('editor.resizeTo', {x: t.clientX-n.left, y: t.clientY-(n.top-i)}, o, !t.shiftKey), e.update(o[0]);
          }; e.$document.on('mousemove', r).one('mouseup', function(t) {
            t.preventDefault(), e.$document.off('mousemove', r), e.context.invoke('editor.afterCommand');
          }), o.data('ratio')||o.data('ratio', o.height()/o.width());
        }
      }), this.$handle.on('wheel', function(t) {
        t.preventDefault(), e.update();
      });
    }, e.prototype.destroy=function() {
      this.$handle.remove();
    }, e.prototype.update=function(e, o) {
      if (this.context.isDisabled()) return !1; const n=Et.isImg(e); const i=this.$handle.find('.note-control-selection'); if (this.context.invoke('imagePopover.update', e, o), n) {
        const r=t(e); const s=r.position(); const a={left: s.left+parseInt(r.css('marginLeft'), 10), top: s.top+parseInt(r.css('marginTop'), 10)}; const l={w: r.outerWidth(!1), h: r.outerHeight(!1)}; i.css({display: 'block', left: a.left, top: a.top, width: l.w, height: l.h}).data('target', r); const c=new Image; c.src=r.attr('src'); const d=l.w+'x'+l.h+' ('+this.lang.image.original+': '+c.width+'x'+c.height+')'; i.find('.note-control-selection-info').text(d), this.context.invoke('editor.saveTarget', e);
      } else this.hide(); return n;
    }, e.prototype.hide=function() {
      this.context.invoke('editor.clearTarget'), this.$handle.children().hide();
    }, e;
  }(); const Zt=/^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i; const Yt=function() {
    function e(t) {
      const e=this; this.context=t, this.events={'summernote.keyup': function(t, o) {
        o.isDefaultPrevented()||e.handleKeyup(o);
      }, 'summernote.keydown': function(t, o) {
        e.handleKeydown(o);
      }};
    } return e.prototype.initialize=function() {
      this.lastWordRange=null;
    }, e.prototype.destroy=function() {
      this.lastWordRange=null;
    }, e.prototype.replace=function() {
      if (this.lastWordRange) {
        const e=this.lastWordRange.toString(); const o=e.match(Zt); if (o&&(o[1]||o[2])) {
          const n=o[1]?e:'http://'+e; const i=t('<a />').html(e).attr('href', n)[0]; this.context.options.linkTargetBlank&&t(i).attr('target', '_blank'), this.lastWordRange.insertNode(i), this.lastWordRange=null, this.context.invoke('editor.focus');
        }
      }
    }, e.prototype.handleKeydown=function(t) {
      if (vt.contains([Pt.code.ENTER, Pt.code.SPACE], t.keyCode)) {
        const e=this.context.invoke('editor.createRange').getWordRange(); this.lastWordRange=e;
      }
    }, e.prototype.handleKeyup=function(t) {
      vt.contains([Pt.code.ENTER, Pt.code.SPACE], t.keyCode)&&this.replace();
    }, e;
  }(); const Qt=function() {
    function t(t) {
      const e=this; this.$note=t.layoutInfo.note, this.events={'summernote.change': function() {
        e.$note.val(t.invoke('code'));
      }};
    } return t.prototype.shouldInitialize=function() {
      return Et.isTextarea(this.$note[0]);
    }, t;
  }(); const Jt=function() {
    function t(t) {
      const e=this; this.context=t, this.options=t.options.replace||{}, this.keys=[Pt.code.ENTER, Pt.code.SPACE, Pt.code.PERIOD, Pt.code.COMMA, Pt.code.SEMICOLON, Pt.code.SLASH], this.previousKeydownCode=null, this.events={'summernote.keyup': function(t, o) {
        o.isDefaultPrevented()||e.handleKeyup(o);
      }, 'summernote.keydown': function(t, o) {
        e.handleKeydown(o);
      }};
    } return t.prototype.shouldInitialize=function() {
      return !!this.options.match;
    }, t.prototype.initialize=function() {
      this.lastWord=null;
    }, t.prototype.destroy=function() {
      this.lastWord=null;
    }, t.prototype.replace=function() {
      if (this.lastWord) {
        const t=this; const e=this.lastWord.toString(); this.options.match(e, function(e) {
          if (e) {
            let o=''; if ('string'==typeof e?o=Et.createText(e):e instanceof jQuery?o=e[0]:e instanceof Node&&(o=e), !o) return; t.lastWord.insertNode(o), t.lastWord=null, t.context.invoke('editor.focus');
          }
        });
      }
    }, t.prototype.handleKeydown=function(t) {
      if (this.previousKeydownCode&&vt.contains(this.keys, this.previousKeydownCode)) this.previousKeydownCode=t.keyCode; else {
        if (vt.contains(this.keys, t.keyCode)) {
          const e=this.context.invoke('editor.createRange').getWordRange(); this.lastWord=e;
        } this.previousKeydownCode=t.keyCode;
      }
    }, t.prototype.handleKeyup=function(t) {
      vt.contains(this.keys, t.keyCode)&&this.replace();
    }, t;
  }(); const Xt=function() {
    function e(t) {
      const e=this; this.context=t, this.$editingArea=t.layoutInfo.editingArea, this.options=t.options, this.events={'summernote.init summernote.change': function() {
        e.update();
      }, 'summernote.codeview.toggled': function() {
        e.update();
      }};
    } return e.prototype.shouldInitialize=function() {
      return !!this.options.placeholder;
    }, e.prototype.initialize=function() {
      const e=this; this.$placeholder=t('<div class="note-placeholder">'), this.$placeholder.on('click', function() {
        e.context.invoke('focus');
      }).html(this.options.placeholder).prependTo(this.$editingArea), this.update();
    }, e.prototype.destroy=function() {
      this.$placeholder.remove();
    }, e.prototype.update=function() {
      const t=!this.context.invoke('codeview.isActivated')&&this.context.invoke('editor.isEmpty'); this.$placeholder.toggle(t);
    }, e;
  }(); const te=function() {
    function e(e) {
      this.ui=t.summernote.ui, this.context=e, this.$toolbar=e.layoutInfo.toolbar, this.options=e.options, this.lang=this.options.langInfo, this.invertedKeyMap=gt.invertObject(this.options.keyMap[ft.isMac?'mac':'pc']);
    } return e.prototype.representShortcut=function(t) {
      let e=this.invertedKeyMap[t]; return this.options.shortcuts&&e?(ft.isMac&&(e=e.replace('CMD', '⌘').replace('SHIFT', '⇧')), ' ('+(e=e.replace('BACKSLASH', '\\').replace('SLASH', '/').replace('LEFTBRACKET', '[').replace('RIGHTBRACKET', ']'))+')'):'';
    }, e.prototype.button=function(t) {
      return !this.options.tooltip&&t.tooltip&&delete t.tooltip, t.container=this.options.container, this.ui.button(t);
    }, e.prototype.initialize=function() {
      this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), this.addTablePopoverButtons(), this.fontInstalledMap={};
    }, e.prototype.destroy=function() {
      delete this.fontInstalledMap;
    }, e.prototype.isFontInstalled=function(t) {
      return this.fontInstalledMap.hasOwnProperty(t)||(this.fontInstalledMap[t]=ft.isFontInstalled(t)||vt.contains(this.options.fontNamesIgnoreCheck, t)), this.fontInstalledMap[t];
    }, e.prototype.isFontDeservedToAdd=function(t) {
      return ''!==(t=t.toLowerCase())&&this.isFontInstalled(t)&&-1===['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'].indexOf(t);
    }, e.prototype.colorPalette=function(e, o, n, i) {
      const r=this; return this.ui.buttonGroup({className: 'note-color '+e, children: [this.button({className: 'note-current-color-button', contents: this.ui.icon(this.options.icons.font+' note-recent-color'), tooltip: o, click: function(e) {
        const o=t(e.currentTarget); n&&i?r.context.invoke('editor.color', {backColor: o.attr('data-backColor'), foreColor: o.attr('data-foreColor')}):n?r.context.invoke('editor.color', {backColor: o.attr('data-backColor')}):i&&r.context.invoke('editor.color', {foreColor: o.attr('data-foreColor')});
      }, callback: function(t) {
        const e=t.find('.note-recent-color'); n&&(e.css('background-color', r.options.colorButton.backColor), t.attr('data-backColor', r.options.colorButton.backColor)), i?(e.css('color', r.options.colorButton.foreColor), t.attr('data-foreColor', r.options.colorButton.foreColor)):e.css('color', 'transparent');
      }}), this.button({className: 'dropdown-toggle', contents: this.ui.dropdownButtonContents('', this.options), tooltip: this.lang.color.more, data: {toggle: 'dropdown'}}), this.ui.dropdown({items: (n?['<div class="note-palette">', '  <div class="note-palette-title">'+this.lang.color.background+'</div>', '  <div>', '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">', this.lang.color.transparent, '    </button>', '  </div>', '  <div class="note-holder" data-event="backColor"/>', '  <div>', '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">', this.lang.color.cpSelect, '    </button>', '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="'+this.options.colorButton.backColor+'" data-event="backColorPalette">', '  </div>', '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>', '</div>'].join(''):'')+(i?['<div class="note-palette">', '  <div class="note-palette-title">'+this.lang.color.foreground+'</div>', '  <div>', '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, '    </button>', '  </div>', '  <div class="note-holder" data-event="foreColor"/>', '  <div>', '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">', this.lang.color.cpSelect, '    </button>', '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="'+this.options.colorButton.foreColor+'" data-event="foreColorPalette">', '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>', '</div>'].join(''):''), callback: function(e) {
        e.find('.note-holder').each(function(e, o) {
          const n=t(o); n.append(r.ui.palette({colors: r.options.colors, colorsName: r.options.colorsName, eventName: n.data('event'), container: r.options.container, tooltip: r.options.tooltip}).render());
        }); const o=[['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']]; e.find('.note-holder-custom').each(function(e, n) {
          const i=t(n); i.append(r.ui.palette({colors: o, colorsName: o, eventName: i.data('event'), container: r.options.container, tooltip: r.options.tooltip}).render());
        }), e.find('input[type=color]').each(function(o, n) {
          t(n).change(function() {
            const o=e.find('#'+t(this).data('event')).find('.note-color-btn').first(); const n=this.value.toUpperCase(); o.css('background-color', n).attr('aria-label', n).attr('data-value', n).attr('data-original-title', n), o.click();
          });
        });
      }, click: function(o) {
        o.stopPropagation(); const n=t('.'+e); const i=t(o.target); const s=i.data('event'); const a=i.attr('data-value'); if ('openPalette'===s) {
          const l=n.find('#'+a); const c=t(n.find('#'+l.data('event')).find('.note-color-row')[0]); const d=c.find('.note-color-btn').last().detach(); const u=l.val(); d.css('background-color', u).attr('aria-label', u).attr('data-value', u).attr('data-original-title', u), c.prepend(d), l.click();
        } else if (vt.contains(['backColor', 'foreColor'], s)) {
          const h='backColor'===s?'background-color':'color'; const p=i.closest('.note-color').find('.note-recent-color'); const f=i.closest('.note-color').find('.note-current-color-button'); p.css(h, a), f.attr('data-'+s, a), r.context.invoke('editor.'+s, a);
        }
      }})]}).render();
    }, e.prototype.addToolbarButtons=function() {
      const e=this; this.context.memo('button.style', function() {
        return e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents(e.ui.icon(e.options.icons.magic), e.options), tooltip: e.lang.style.style, data: {toggle: 'dropdown'}}), e.ui.dropdown({className: 'dropdown-style', items: e.options.styleTags, title: e.lang.style.style, template: function(t) {
          'string'==typeof t&&(t={tag: t, title: e.lang.style.hasOwnProperty(t)?e.lang.style[t]:t}); const o=t.tag; const n=t.title; return '<'+o+(t.style?' style="'+t.style+'" ':'')+(t.className?' class="'+t.className+'"':'')+'>'+n+'</'+o+'>';
        }, click: e.context.createInvokeHandler('editor.formatBlock')})]).render();
      }); for (var o=function(t, o) {
          const i=n.options.styleTags[t]; n.context.memo('button.style.'+i, function() {
            return e.button({className: 'note-btn-style-'+i, contents: '<div data-value="'+i+'">'+i.toUpperCase()+'</div>', tooltip: e.lang.style[i], click: e.context.createInvokeHandler('editor.formatBlock')}).render();
          });
        }, n=this, i=0, r=this.options.styleTags.length; i<r; i++)o(i); this.context.memo('button.bold', function() {
        return e.button({className: 'note-btn-bold', contents: e.ui.icon(e.options.icons.bold), tooltip: e.lang.font.bold+e.representShortcut('bold'), click: e.context.createInvokeHandlerAndUpdateState('editor.bold')}).render();
      }), this.context.memo('button.italic', function() {
        return e.button({className: 'note-btn-italic', contents: e.ui.icon(e.options.icons.italic), tooltip: e.lang.font.italic+e.representShortcut('italic'), click: e.context.createInvokeHandlerAndUpdateState('editor.italic')}).render();
      }), this.context.memo('button.underline', function() {
        return e.button({className: 'note-btn-underline', contents: e.ui.icon(e.options.icons.underline), tooltip: e.lang.font.underline+e.representShortcut('underline'), click: e.context.createInvokeHandlerAndUpdateState('editor.underline')}).render();
      }), this.context.memo('button.clear', function() {
        return e.button({contents: e.ui.icon(e.options.icons.eraser), tooltip: e.lang.font.clear+e.representShortcut('removeFormat'), click: e.context.createInvokeHandler('editor.removeFormat')}).render();
      }), this.context.memo('button.strikethrough', function() {
        return e.button({className: 'note-btn-strikethrough', contents: e.ui.icon(e.options.icons.strikethrough), tooltip: e.lang.font.strikethrough+e.representShortcut('strikethrough'), click: e.context.createInvokeHandlerAndUpdateState('editor.strikethrough')}).render();
      }), this.context.memo('button.superscript', function() {
        return e.button({className: 'note-btn-superscript', contents: e.ui.icon(e.options.icons.superscript), tooltip: e.lang.font.superscript, click: e.context.createInvokeHandlerAndUpdateState('editor.superscript')}).render();
      }), this.context.memo('button.subscript', function() {
        return e.button({className: 'note-btn-subscript', contents: e.ui.icon(e.options.icons.subscript), tooltip: e.lang.font.subscript, click: e.context.createInvokeHandlerAndUpdateState('editor.subscript')}).render();
      }), this.context.memo('button.fontname', function() {
        const o=e.context.invoke('editor.currentStyle'); return t.each(o['font-family'].split(','), function(t, o) {
          o=o.trim().replace(/['"]+/g, ''), e.isFontDeservedToAdd(o)&&-1===e.options.fontNames.indexOf(o)&&e.options.fontNames.push(o);
        }), e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents('<span class="note-current-fontname"/>', e.options), tooltip: e.lang.font.name, data: {toggle: 'dropdown'}}), e.ui.dropdownCheck({className: 'dropdown-fontname', checkClassName: e.options.icons.menuCheck, items: e.options.fontNames.filter(e.isFontInstalled.bind(e)), title: e.lang.font.name, template: function(t) {
          return '<span style="font-family: \''+t+'\'">'+t+'</span>';
        }, click: e.context.createInvokeHandlerAndUpdateState('editor.fontName')})]).render();
      }), this.context.memo('button.fontsize', function() {
        return e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', e.options), tooltip: e.lang.font.size, data: {toggle: 'dropdown'}}), e.ui.dropdownCheck({className: 'dropdown-fontsize', checkClassName: e.options.icons.menuCheck, items: e.options.fontSizes, title: e.lang.font.size, click: e.context.createInvokeHandlerAndUpdateState('editor.fontSize')})]).render();
      }), this.context.memo('button.color', function() {
        return e.colorPalette('note-color-all', e.lang.color.recent, !0, !0);
      }), this.context.memo('button.forecolor', function() {
        return e.colorPalette('note-color-fore', e.lang.color.foreground, !1, !0);
      }), this.context.memo('button.backcolor', function() {
        return e.colorPalette('note-color-back', e.lang.color.background, !0, !1);
      }), this.context.memo('button.ul', function() {
        return e.button({contents: e.ui.icon(e.options.icons.unorderedlist), tooltip: e.lang.lists.unordered+e.representShortcut('insertUnorderedList'), click: e.context.createInvokeHandler('editor.insertUnorderedList')}).render();
      }), this.context.memo('button.ol', function() {
        return e.button({contents: e.ui.icon(e.options.icons.orderedlist), tooltip: e.lang.lists.ordered+e.representShortcut('insertOrderedList'), click: e.context.createInvokeHandler('editor.insertOrderedList')}).render();
      }); const s=this.button({contents: this.ui.icon(this.options.icons.alignLeft), tooltip: this.lang.paragraph.left+this.representShortcut('justifyLeft'), click: this.context.createInvokeHandler('editor.justifyLeft')}); const a=this.button({contents: this.ui.icon(this.options.icons.alignCenter), tooltip: this.lang.paragraph.center+this.representShortcut('justifyCenter'), click: this.context.createInvokeHandler('editor.justifyCenter')}); const l=this.button({contents: this.ui.icon(this.options.icons.alignRight), tooltip: this.lang.paragraph.right+this.representShortcut('justifyRight'), click: this.context.createInvokeHandler('editor.justifyRight')}); const c=this.button({contents: this.ui.icon(this.options.icons.alignJustify), tooltip: this.lang.paragraph.justify+this.representShortcut('justifyFull'), click: this.context.createInvokeHandler('editor.justifyFull')}); const d=this.button({contents: this.ui.icon(this.options.icons.outdent), tooltip: this.lang.paragraph.outdent+this.representShortcut('outdent'), click: this.context.createInvokeHandler('editor.outdent')}); const u=this.button({contents: this.ui.icon(this.options.icons.indent), tooltip: this.lang.paragraph.indent+this.representShortcut('indent'), click: this.context.createInvokeHandler('editor.indent')}); this.context.memo('button.justifyLeft', gt.invoke(s, 'render')), this.context.memo('button.justifyCenter', gt.invoke(a, 'render')), this.context.memo('button.justifyRight', gt.invoke(l, 'render')), this.context.memo('button.justifyFull', gt.invoke(c, 'render')), this.context.memo('button.outdent', gt.invoke(d, 'render')), this.context.memo('button.indent', gt.invoke(u, 'render')), this.context.memo('button.paragraph', function() {
        return e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents(e.ui.icon(e.options.icons.alignLeft), e.options), tooltip: e.lang.paragraph.paragraph, data: {toggle: 'dropdown'}}), e.ui.dropdown([e.ui.buttonGroup({className: 'note-align', children: [s, a, l, c]}), e.ui.buttonGroup({className: 'note-list', children: [d, u]})])]).render();
      }), this.context.memo('button.height', function() {
        return e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents(e.ui.icon(e.options.icons.textHeight), e.options), tooltip: e.lang.font.height, data: {toggle: 'dropdown'}}), e.ui.dropdownCheck({items: e.options.lineHeights, checkClassName: e.options.icons.menuCheck, className: 'dropdown-line-height', title: e.lang.font.height, click: e.context.createInvokeHandler('editor.lineHeight')})]).render();
      }), this.context.memo('button.table', function() {
        return e.ui.buttonGroup([e.button({className: 'dropdown-toggle', contents: e.ui.dropdownButtonContents(e.ui.icon(e.options.icons.table), e.options), tooltip: e.lang.table.table, data: {toggle: 'dropdown'}}), e.ui.dropdown({title: e.lang.table.table, className: 'note-table', items: ['<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', '</div>', '<div class="note-dimension-display">1 x 1</div>'].join('')})], {callback: function(t) {
          t.find('.note-dimension-picker-mousecatcher').css({width: e.options.insertTableMaxSize.col+'em', height: e.options.insertTableMaxSize.row+'em'}).mousedown(e.context.createInvokeHandler('editor.insertTable')).on('mousemove', e.tableMoveHandler.bind(e));
        }}).render();
      }), this.context.memo('button.link', function() {
        return e.button({contents: e.ui.icon(e.options.icons.link), tooltip: e.lang.link.link+e.representShortcut('linkDialog.show'), click: e.context.createInvokeHandler('linkDialog.show')}).render();
      }), this.context.memo('button.picture', function() {
        return e.button({contents: e.ui.icon(e.options.icons.picture), tooltip: e.lang.image.image, click: e.context.createInvokeHandler('imageDialog.show')}).render();
      }), this.context.memo('button.video', function() {
        return e.button({contents: e.ui.icon(e.options.icons.video), tooltip: e.lang.video.video, click: e.context.createInvokeHandler('videoDialog.show')}).render();
      }), this.context.memo('button.hr', function() {
        return e.button({contents: e.ui.icon(e.options.icons.minus), tooltip: e.lang.hr.insert+e.representShortcut('insertHorizontalRule'), click: e.context.createInvokeHandler('editor.insertHorizontalRule')}).render();
      }), this.context.memo('button.fullscreen', function() {
        return e.button({className: 'btn-fullscreen', contents: e.ui.icon(e.options.icons.arrowsAlt), tooltip: e.lang.options.fullscreen, click: e.context.createInvokeHandler('fullscreen.toggle')}).render();
      }), this.context.memo('button.codeview', function() {
        return e.button({className: 'btn-codeview', contents: e.ui.icon(e.options.icons.code), tooltip: e.lang.options.codeview, click: e.context.createInvokeHandler('codeview.toggle')}).render();
      }), this.context.memo('button.redo', function() {
        return e.button({contents: e.ui.icon(e.options.icons.redo), tooltip: e.lang.history.redo+e.representShortcut('redo'), click: e.context.createInvokeHandler('editor.redo')}).render();
      }), this.context.memo('button.undo', function() {
        return e.button({contents: e.ui.icon(e.options.icons.undo), tooltip: e.lang.history.undo+e.representShortcut('undo'), click: e.context.createInvokeHandler('editor.undo')}).render();
      }), this.context.memo('button.help', function() {
        return e.button({contents: e.ui.icon(e.options.icons.question), tooltip: e.lang.options.help, click: e.context.createInvokeHandler('helpDialog.show')}).render();
      });
    }, e.prototype.addImagePopoverButtons=function() {
      const t=this; this.context.memo('button.resizeFull', function() {
        return t.button({contents: '<span class="note-fontsize-10">100%</span>', tooltip: t.lang.image.resizeFull, click: t.context.createInvokeHandler('editor.resize', '1')}).render();
      }), this.context.memo('button.resizeHalf', function() {
        return t.button({contents: '<span class="note-fontsize-10">50%</span>', tooltip: t.lang.image.resizeHalf, click: t.context.createInvokeHandler('editor.resize', '0.5')}).render();
      }), this.context.memo('button.resizeQuarter', function() {
        return t.button({contents: '<span class="note-fontsize-10">25%</span>', tooltip: t.lang.image.resizeQuarter, click: t.context.createInvokeHandler('editor.resize', '0.25')}).render();
      }), this.context.memo('button.resizeNone', function() {
        return t.button({contents: t.ui.icon(t.options.icons.rollback), tooltip: t.lang.image.resizeNone, click: t.context.createInvokeHandler('editor.resize', '0')}).render();
      }), this.context.memo('button.floatLeft', function() {
        return t.button({contents: t.ui.icon(t.options.icons.floatLeft), tooltip: t.lang.image.floatLeft, click: t.context.createInvokeHandler('editor.floatMe', 'left')}).render();
      }), this.context.memo('button.floatRight', function() {
        return t.button({contents: t.ui.icon(t.options.icons.floatRight), tooltip: t.lang.image.floatRight, click: t.context.createInvokeHandler('editor.floatMe', 'right')}).render();
      }), this.context.memo('button.floatNone', function() {
        return t.button({contents: t.ui.icon(t.options.icons.rollback), tooltip: t.lang.image.floatNone, click: t.context.createInvokeHandler('editor.floatMe', 'none')}).render();
      }), this.context.memo('button.removeMedia', function() {
        return t.button({contents: t.ui.icon(t.options.icons.trash), tooltip: t.lang.image.remove, click: t.context.createInvokeHandler('editor.removeMedia')}).render();
      });
    }, e.prototype.addLinkPopoverButtons=function() {
      const t=this; this.context.memo('button.linkDialogShow', function() {
        return t.button({contents: t.ui.icon(t.options.icons.link), tooltip: t.lang.link.edit, click: t.context.createInvokeHandler('linkDialog.show')}).render();
      }), this.context.memo('button.unlink', function() {
        return t.button({contents: t.ui.icon(t.options.icons.unlink), tooltip: t.lang.link.unlink, click: t.context.createInvokeHandler('editor.unlink')}).render();
      });
    }, e.prototype.addTablePopoverButtons=function() {
      const t=this; this.context.memo('button.addRowUp', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.rowAbove), tooltip: t.lang.table.addRowAbove, click: t.context.createInvokeHandler('editor.addRow', 'top')}).render();
      }), this.context.memo('button.addRowDown', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.rowBelow), tooltip: t.lang.table.addRowBelow, click: t.context.createInvokeHandler('editor.addRow', 'bottom')}).render();
      }), this.context.memo('button.addColLeft', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.colBefore), tooltip: t.lang.table.addColLeft, click: t.context.createInvokeHandler('editor.addCol', 'left')}).render();
      }), this.context.memo('button.addColRight', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.colAfter), tooltip: t.lang.table.addColRight, click: t.context.createInvokeHandler('editor.addCol', 'right')}).render();
      }), this.context.memo('button.deleteRow', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.rowRemove), tooltip: t.lang.table.delRow, click: t.context.createInvokeHandler('editor.deleteRow')}).render();
      }), this.context.memo('button.deleteCol', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.colRemove), tooltip: t.lang.table.delCol, click: t.context.createInvokeHandler('editor.deleteCol')}).render();
      }), this.context.memo('button.deleteTable', function() {
        return t.button({className: 'btn-md', contents: t.ui.icon(t.options.icons.trash), tooltip: t.lang.table.delTable, click: t.context.createInvokeHandler('editor.deleteTable')}).render();
      });
    }, e.prototype.build=function(t, e) {
      for (let o=0, n=e.length; o<n; o++) {
        for (var i=e[o], r=Array.isArray(i)?i[0]:i, s=Array.isArray(i)?1===i.length?[i[0]]:i[1]:[i], a=this.ui.buttonGroup({className: 'note-'+r}).render(), l=0, c=s.length; l<c; l++) {
          const d=this.context.memo('button.'+s[l]); d&&a.append('function'==typeof d?d():d);
        }a.appendTo(t);
      }
    }, e.prototype.updateCurrentStyle=function(e) {
      const o=this; const n=e||this.$toolbar; const i=this.context.invoke('editor.currentStyle'); if (this.updateBtnStates(n, {'.note-btn-bold': function() {
        return 'bold'===i['font-bold'];
      }, '.note-btn-italic': function() {
        return 'italic'===i['font-italic'];
      }, '.note-btn-underline': function() {
        return 'underline'===i['font-underline'];
      }, '.note-btn-subscript': function() {
        return 'subscript'===i['font-subscript'];
      }, '.note-btn-superscript': function() {
        return 'superscript'===i['font-superscript'];
      }, '.note-btn-strikethrough': function() {
        return 'strikethrough'===i['font-strikethrough'];
      }}), i['font-family']) {
        const r=i['font-family'].split(',').map(function(t) {
          return t.replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');
        }); const s=vt.find(r, this.isFontInstalled.bind(this)); n.find('.dropdown-fontname a').each(function(e, o) {
          const n=t(o); const i=n.data('value')+''==s+''; n.toggleClass('checked', i);
        }), n.find('.note-current-fontname').text(s).css('font-family', s);
      } if (i['font-size']) {
        const a=i['font-size']; n.find('.dropdown-fontsize a').each(function(e, o) {
          const n=t(o); const i=n.data('value')+''==a+''; n.toggleClass('checked', i);
        }), n.find('.note-current-fontsize').text(a);
      } if (i['line-height']) {
        const l=i['line-height']; n.find('.dropdown-line-height li a').each(function(e, n) {
          const i=t(n).data('value')+''==l+''; o.className=i?'checked':'';
        });
      }
    }, e.prototype.updateBtnStates=function(e, o) {
      const n=this; t.each(o, function(t, o) {
        n.ui.toggleBtnActive(e.find(t), o());
      });
    }, e.prototype.tableMoveHandler=function(e) {
      let o; const n=t(e.target.parentNode); const i=n.next(); const r=n.find('.note-dimension-picker-mousecatcher'); const s=n.find('.note-dimension-picker-highlighted'); const a=n.find('.note-dimension-picker-unhighlighted'); if (void 0===e.offsetX) {
        const l=t(e.target).offset(); o={x: e.pageX-l.left, y: e.pageY-l.top};
      } else o={x: e.offsetX, y: e.offsetY}; const c=Math.ceil(o.x/18)||1; const d=Math.ceil(o.y/18)||1; s.css({width: c+'em', height: d+'em'}), r.data('value', c+'x'+d), 3<c&&c<this.options.insertTableMaxSize.col&&a.css({width: c+1+'em'}), 3<d&&d<this.options.insertTableMaxSize.row&&a.css({height: d+1+'em'}), i.html(c+' x '+d);
    }, e;
  }(); const ee=function() {
    function e(e) {
      this.context=e, this.$window=t(window), this.$document=t(document), this.ui=t.summernote.ui, this.$note=e.layoutInfo.note, this.$editor=e.layoutInfo.editor, this.$toolbar=e.layoutInfo.toolbar, this.$editable=e.layoutInfo.editable, this.$statusbar=e.layoutInfo.statusbar, this.options=e.options, this.isFollowing=!1, this.followScroll=this.followScroll.bind(this);
    } return e.prototype.shouldInitialize=function() {
      return !this.options.airMode;
    }, e.prototype.initialize=function() {
      const t=this; this.options.toolbar=this.options.toolbar||[], this.options.toolbar.length?this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar):this.$toolbar.hide(), this.options.toolbarContainer&&this.$toolbar.appendTo(this.options.toolbarContainer), this.changeContainer(!1), this.$note.on('summernote.keyup summernote.mouseup summernote.change', function() {
        t.context.invoke('buttons.updateCurrentStyle');
      }), this.context.invoke('buttons.updateCurrentStyle'), this.options.followingToolbar&&this.$window.on('scroll resize', this.followScroll);
    }, e.prototype.destroy=function() {
      this.$toolbar.children().remove(), this.options.followingToolbar&&this.$window.off('scroll resize', this.followScroll);
    }, e.prototype.followScroll=function() {
      if (this.$editor.hasClass('fullscreen')) return !1; const e=this.$editor.outerHeight(); const o=this.$editor.width(); const n=this.$toolbar.height(); const i=this.$statusbar.height(); let r=0; this.options.otherStaticBar&&(r=t(this.options.otherStaticBar).outerHeight()); const s=this.$document.scrollTop(); const a=this.$editor.offset().top; const l=a-r; const c=a+e-r-n-i; !this.isFollowing&&l<s&&s<c-n?(this.isFollowing=!0, this.$toolbar.css({position: 'fixed', top: r, width: o}), this.$editable.css({marginTop: this.$toolbar.height()+5})):this.isFollowing&&(s<l||c<s)&&(this.isFollowing=!1, this.$toolbar.css({position: 'relative', top: 0, width: '100%'}), this.$editable.css({marginTop: ''}));
    }, e.prototype.changeContainer=function(t) {
t?this.$toolbar.prependTo(this.$editor):this.options.toolbarContainer&&this.$toolbar.appendTo(this.options.toolbarContainer), this.followScroll();
    }, e.prototype.updateFullscreen=function(t) {
      this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), t), this.changeContainer(t);
    }, e.prototype.updateCodeview=function(t) {
      this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), t), t?this.deactivate():this.activate();
    }, e.prototype.activate=function(t) {
      let e=this.$toolbar.find('button'); t||(e=e.not('.btn-codeview')), this.ui.toggleBtn(e, !0);
    }, e.prototype.deactivate=function(t) {
      let e=this.$toolbar.find('button'); t||(e=e.not('.btn-codeview')), this.ui.toggleBtn(e, !1);
    }, e;
  }(); const oe=function() {
    function e(e) {
      this.context=e, this.ui=t.summernote.ui, this.$body=t(document.body), this.$editor=e.layoutInfo.editor, this.options=e.options, this.lang=this.options.langInfo, e.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
    } return e.prototype.initialize=function() {
      const e=this.options.dialogsInBody?this.$body:this.$editor; const o=['<div class="form-group note-form-group">', '<label class="note-form-label">'+this.lang.link.textToDisplay+'</label>', '<input class="note-link-text form-control note-form-control note-input" type="text" />', '</div>', '<div class="form-group note-form-group">', '<label class="note-form-label">'+this.lang.link.url+'</label>', '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />', '</div>', this.options.disableLinkTarget?'':t('<div/>').append(this.ui.checkbox({className: 'sn-checkbox-open-in-new-window', text: this.lang.link.openInNewWindow, checked: !0}).render()).html()].join(''); const n='<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-link-btn" value="'+this.lang.link.insert+'" disabled>'; this.$dialog=this.ui.dialog({className: 'link-dialog', title: this.lang.link.insert, fade: this.options.dialogsFade, body: o, footer: n}).render().appendTo(e);
    }, e.prototype.destroy=function() {
      this.ui.hideDialog(this.$dialog), this.$dialog.remove();
    }, e.prototype.bindEnterKey=function(t, e) {
      t.on('keypress', function(t) {
        t.keyCode===Pt.code.ENTER&&(t.preventDefault(), e.trigger('click'));
      });
    }, e.prototype.toggleLinkBtn=function(t, e, o) {
      this.ui.toggleBtn(t, e.val()&&o.val());
    }, e.prototype.showLinkDialog=function(e) {
      const o=this; return t.Deferred(function(t) {
        const n=o.$dialog.find('.note-link-text'); const i=o.$dialog.find('.note-link-url'); const r=o.$dialog.find('.note-link-btn'); const s=o.$dialog.find('.sn-checkbox-open-in-new-window input[type=checkbox]'); o.ui.onDialogShown(o.$dialog, function() {
          o.context.triggerEvent('dialog.shown'), !e.url&&gt.isValidUrl(e.text)&&(e.url=e.text), n.on('input paste propertychange', function() {
            e.text=n.val(), o.toggleLinkBtn(r, n, i);
          }).val(e.text), i.on('input paste propertychange', function() {
            e.text||n.val(i.val()), o.toggleLinkBtn(r, n, i);
          }).val(e.url), ft.isSupportTouch||i.trigger('focus'), o.toggleLinkBtn(r, n, i), o.bindEnterKey(i, r), o.bindEnterKey(n, r); const a=void 0!==e.isNewWindow?e.isNewWindow:o.context.options.linkTargetBlank; s.prop('checked', a), r.one('click', function(r) {
            r.preventDefault(), t.resolve({range: e.range, url: i.val(), text: n.val(), isNewWindow: s.is(':checked')}), o.ui.hideDialog(o.$dialog);
          });
        }), o.ui.onDialogHidden(o.$dialog, function() {
          n.off(), i.off(), r.off(), 'pending'===t.state()&&t.reject();
        }), o.ui.showDialog(o.$dialog);
      }).promise();
    }, e.prototype.show=function() {
      const t=this; const e=this.context.invoke('editor.getLinkInfo'); this.context.invoke('editor.saveRange'), this.showLinkDialog(e).then(function(e) {
        t.context.invoke('editor.restoreRange'), t.context.invoke('editor.createLink', e);
      }).fail(function() {
        t.context.invoke('editor.restoreRange');
      });
    }, e;
  }(); const ne=function() {
    function e(e) {
      const o=this; this.context=e, this.ui=t.summernote.ui, this.options=e.options, this.events={'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function() {
        o.update();
      }, 'summernote.disable summernote.dialog.shown': function() {
        o.hide();
      }};
    } return e.prototype.shouldInitialize=function() {
      return !vt.isEmpty(this.options.popover.link);
    }, e.prototype.initialize=function() {
      this.$popover=this.ui.popover({className: 'note-link-popover', callback: function(t) {
        t.find('.popover-content,.note-popover-content').prepend('<span><a target="_blank"></a>&nbsp;</span>');
      }}).render().appendTo(this.options.container); const t=this.$popover.find('.popover-content,.note-popover-content'); this.context.invoke('buttons.build', t, this.options.popover.link);
    }, e.prototype.destroy=function() {
      this.$popover.remove();
    }, e.prototype.update=function() {
      if (this.context.invoke('editor.hasFocus')) {
        const e=this.context.invoke('editor.getLastRange'); if (e.isCollapsed()&&e.isOnAnchor()) {
          const o=Et.ancestor(e.sc, Et.isAnchor); const n=t(o).attr('href'); this.$popover.find('a').attr('href', n).html(n); const i=Et.posFromPlaceholder(o); this.$popover.css({display: 'block', left: i.left, top: i.top});
        } else this.hide();
      } else this.hide();
    }, e.prototype.hide=function() {
      this.$popover.hide();
    }, e;
  }(); const ie=function() {
    function e(e) {
      this.context=e, this.ui=t.summernote.ui, this.$body=t(document.body), this.$editor=e.layoutInfo.editor, this.options=e.options, this.lang=this.options.langInfo;
    } return e.prototype.initialize=function() {
      const t=this.options.dialogsInBody?this.$body:this.$editor; let e=''; if (this.options.maximumImageFileSize) {
        const o=Math.floor(Math.log(this.options.maximumImageFileSize)/Math.log(1024)); const n=1*(this.options.maximumImageFileSize/Math.pow(1024, o)).toFixed(2)+' '+' KMGTP'[o]+'B'; e='<small>'+this.lang.image.maximumFileSize+' : '+n+'</small>';
      } const i=['<div class="form-group note-form-group note-group-select-from-files">', '<label class="note-form-label">'+this.lang.image.selectFromFiles+'</label>', '<input class="note-image-input form-control-file note-form-control note-input" ', ' type="file" name="files" accept="image/*" multiple="multiple" />', e, '</div>', '<div class="form-group note-group-image-url" style="overflow:auto;">', '<label class="note-form-label">'+this.lang.image.url+'</label>', '<input class="note-image-url form-control note-form-control note-input ', ' col-md-12" type="text" />', '</div>'].join(''); const r='<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-image-btn" value="'+this.lang.image.insert+'" disabled>'; this.$dialog=this.ui.dialog({title: this.lang.image.insert, fade: this.options.dialogsFade, body: i, footer: r}).render().appendTo(t);
    }, e.prototype.destroy=function() {
      this.ui.hideDialog(this.$dialog), this.$dialog.remove();
    }, e.prototype.bindEnterKey=function(t, e) {
      t.on('keypress', function(t) {
        t.keyCode===Pt.code.ENTER&&(t.preventDefault(), e.trigger('click'));
      });
    }, e.prototype.show=function() {
      const t=this; this.context.invoke('editor.saveRange'), this.showImageDialog().then(function(e) {
        t.ui.hideDialog(t.$dialog), t.context.invoke('editor.restoreRange'), 'string'==typeof e?t.options.callbacks.onImageLinkInsert?t.context.triggerEvent('image.link.insert', e):t.context.invoke('editor.insertImage', e):t.context.invoke('editor.insertImagesOrCallback', e);
      }).fail(function() {
        t.context.invoke('editor.restoreRange');
      });
    }, e.prototype.showImageDialog=function() {
      const e=this; return t.Deferred(function(t) {
        const o=e.$dialog.find('.note-image-input'); const n=e.$dialog.find('.note-image-url'); const i=e.$dialog.find('.note-image-btn'); e.ui.onDialogShown(e.$dialog, function() {
          e.context.triggerEvent('dialog.shown'), o.replaceWith(o.clone().on('change', function(e) {
            t.resolve(e.target.files||e.target.value);
          }).val('')), n.on('input paste propertychange', function() {
            e.ui.toggleBtn(i, n.val());
          }).val(''), ft.isSupportTouch||n.trigger('focus'), i.click(function(e) {
            e.preventDefault(), t.resolve(n.val());
          }), e.bindEnterKey(n, i);
        }), e.ui.onDialogHidden(e.$dialog, function() {
          o.off(), n.off(), i.off(), 'pending'===t.state()&&t.reject();
        }), e.ui.showDialog(e.$dialog);
      });
    }, e;
  }(); const re=function() {
    function e(e) {
      const o=this; this.context=e, this.ui=t.summernote.ui, this.editable=e.layoutInfo.editable[0], this.options=e.options, this.events={'summernote.disable': function() {
        o.hide();
      }};
    } return e.prototype.shouldInitialize=function() {
      return !vt.isEmpty(this.options.popover.image);
    }, e.prototype.initialize=function() {
      this.$popover=this.ui.popover({className: 'note-image-popover'}).render().appendTo(this.options.container); const t=this.$popover.find('.popover-content,.note-popover-content'); this.context.invoke('buttons.build', t, this.options.popover.image);
    }, e.prototype.destroy=function() {
      this.$popover.remove();
    }, e.prototype.update=function(t, e) {
      if (Et.isImg(t)) {
        const o=Et.posFromPlaceholder(t); const n=Et.posFromPlaceholder(this.editable); this.$popover.css({display: 'block', left: this.options.popatmouse?e.pageX-20:o.left, top: this.options.popatmouse?e.pageY:Math.min(o.top, n.top)});
      } else this.hide();
    }, e.prototype.hide=function() {
      this.$popover.hide();
    }, e;
  }(); const se=function() {
    function e(e) {
      const o=this; this.context=e, this.ui=t.summernote.ui, this.options=e.options, this.events={'summernote.mousedown': function(t, e) {
        o.update(e.target);
      }, 'summernote.keyup summernote.scroll summernote.change': function() {
        o.update();
      }, 'summernote.disable': function() {
        o.hide();
      }};
    } return e.prototype.shouldInitialize=function() {
      return !vt.isEmpty(this.options.popover.table);
    }, e.prototype.initialize=function() {
      this.$popover=this.ui.popover({className: 'note-table-popover'}).render().appendTo(this.options.container); const t=this.$popover.find('.popover-content,.note-popover-content'); this.context.invoke('buttons.build', t, this.options.popover.table), ft.isFF&&document.execCommand('enableInlineTableEditing', !1, !1);
    }, e.prototype.destroy=function() {
      this.$popover.remove();
    }, e.prototype.update=function(t) {
      if (this.context.isDisabled()) return !1; const e=Et.isCell(t); if (e) {
        const o=Et.posFromPlaceholder(t); this.$popover.css({display: 'block', left: o.left, top: o.top});
      } else this.hide(); return e;
    }, e.prototype.hide=function() {
      this.$popover.hide();
    }, e;
  }(); const ae=function() {
    function e(e) {
      this.context=e, this.ui=t.summernote.ui, this.$body=t(document.body), this.$editor=e.layoutInfo.editor, this.options=e.options, this.lang=this.options.langInfo;
    } return e.prototype.initialize=function() {
      const t=this.options.dialogsInBody?this.$body:this.$editor; const e=['<div class="form-group note-form-group row-fluid">', '<label class="note-form-label">'+this.lang.video.url+' <small class="text-muted">'+this.lang.video.providers+'</small></label>', '<input class="note-video-url form-control note-form-control note-input" type="text" />', '</div>'].join(''); const o='<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-video-btn" value="'+this.lang.video.insert+'" disabled>'; this.$dialog=this.ui.dialog({title: this.lang.video.insert, fade: this.options.dialogsFade, body: e, footer: o}).render().appendTo(t);
    }, e.prototype.destroy=function() {
      this.ui.hideDialog(this.$dialog), this.$dialog.remove();
    }, e.prototype.bindEnterKey=function(t, e) {
      t.on('keypress', function(t) {
        t.keyCode===Pt.code.ENTER&&(t.preventDefault(), e.trigger('click'));
      });
    }, e.prototype.createVideoNode=function(e) {
      let o; const n=e.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/); const i=e.match(/(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/); const r=e.match(/\/\/vine\.co\/v\/([a-zA-Z0-9]+)/); const s=e.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/); const a=e.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/); const l=e.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/); const c=e.match(/\/\/v\.qq\.com.*?vid=(.+)/); const d=e.match(/\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/); const u=e.match(/^.+.(mp4|m4v)$/); const h=e.match(/^.+.(ogg|ogv)$/); const p=e.match(/^.+.(webm)$/); const f=e.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/); if (n&&11===n[1].length) {
        const m=n[1]; let g=0; if (void 0!==n[2]) {
          const v=n[2].match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/); if (v) for (let b=[3600, 60, 1], y=0, k=b.length; y<k; y++)g+=void 0!==v[y+1]?b[y]*parseInt(v[y+1], 10):0;
        }o=t('<iframe>').attr('frameborder', 0).attr('src', '//www.youtube.com/embed/'+m+(0<g?'?start='+g:'')).attr('width', '640').attr('height', '360');
      } else if (i&&i[0].length)o=t('<iframe>').attr('frameborder', 0).attr('src', 'https://instagram.com/p/'+i[1]+'/embed/').attr('width', '612').attr('height', '710').attr('scrolling', 'no').attr('allowtransparency', 'true'); else if (r&&r[0].length)o=t('<iframe>').attr('frameborder', 0).attr('src', r[0]+'/embed/simple').attr('width', '600').attr('height', '600').attr('class', 'vine-embed'); else if (s&&s[3].length)o=t('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('src', '//player.vimeo.com/video/'+s[3]).attr('width', '640').attr('height', '360'); else if (a&&a[2].length)o=t('<iframe>').attr('frameborder', 0).attr('src', '//www.dailymotion.com/embed/video/'+a[2]).attr('width', '640').attr('height', '360'); else if (l&&l[1].length)o=t('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '498').attr('width', '510').attr('src', '//player.youku.com/embed/'+l[1]); else if (c&&c[1].length||d&&d[2].length) {
        const C=c&&c[1].length?c[1]:d[2]; o=t('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>').attr('frameborder', 0).attr('height', '310').attr('width', '500').attr('src', 'http://v.qq.com/iframe/player.html?vid='+C+'&amp;auto=0');
      } else if (u||h||p)o=t('<video controls>').attr('src', e).attr('width', '640').attr('height', '360'); else {
        if (!f||!f[0].length) return !1; o=t('<iframe>').attr('frameborder', 0).attr('src', 'https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(f[0])+'&show_text=0&width=560').attr('width', '560').attr('height', '301').attr('scrolling', 'no').attr('allowtransparency', 'true');
      } return o.addClass('note-video-clip'), o[0];
    }, e.prototype.show=function() {
      const t=this; const e=this.context.invoke('editor.getSelectedText'); this.context.invoke('editor.saveRange'), this.showVideoDialog(e).then(function(e) {
        t.ui.hideDialog(t.$dialog), t.context.invoke('editor.restoreRange'); const o=t.createVideoNode(e); o&&t.context.invoke('editor.insertNode', o);
      }).fail(function() {
        t.context.invoke('editor.restoreRange');
      });
    }, e.prototype.showVideoDialog=function(e) {
      const o=this; return t.Deferred(function(t) {
        const e=o.$dialog.find('.note-video-url'); const n=o.$dialog.find('.note-video-btn'); o.ui.onDialogShown(o.$dialog, function() {
          o.context.triggerEvent('dialog.shown'), e.on('input paste propertychange', function() {
            o.ui.toggleBtn(n, e.val());
          }), ft.isSupportTouch||e.trigger('focus'), n.click(function(o) {
            o.preventDefault(), t.resolve(e.val());
          }), o.bindEnterKey(e, n);
        }), o.ui.onDialogHidden(o.$dialog, function() {
          e.off(), n.off(), 'pending'===t.state()&&t.reject();
        }), o.ui.showDialog(o.$dialog);
      });
    }, e;
  }(); const le=function() {
    function e(e) {
      this.context=e, this.ui=t.summernote.ui, this.$body=t(document.body), this.$editor=e.layoutInfo.editor, this.options=e.options, this.lang=this.options.langInfo;
    } return e.prototype.initialize=function() {
      const t=this.options.dialogsInBody?this.$body:this.$editor; const e=['<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.12</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', '</p>'].join(''); this.$dialog=this.ui.dialog({title: this.lang.options.help, fade: this.options.dialogsFade, body: this.createShortcutList(), footer: e, callback: function(t) {
        t.find('.modal-body,.note-modal-body').css({'max-height': 300, 'overflow': 'scroll'});
      }}).render().appendTo(t);
    }, e.prototype.destroy=function() {
      this.ui.hideDialog(this.$dialog), this.$dialog.remove();
    }, e.prototype.createShortcutList=function() {
      const e=this; const o=this.options.keyMap[ft.isMac?'mac':'pc']; return Object.keys(o).map(function(n) {
        const i=o[n]; const r=t('<div><div class="help-list-item"/></div>'); return r.append(t('<label><kbd>'+n+'</kdb></label>').css({'width': 180, 'margin-right': 10})).append(t('<span/>').html(e.context.memo('help.'+i)||i)), r.html();
      }).join('');
    }, e.prototype.showHelpDialog=function() {
      const e=this; return t.Deferred(function(t) {
        e.ui.onDialogShown(e.$dialog, function() {
          e.context.triggerEvent('dialog.shown'), t.resolve();
        }), e.ui.showDialog(e.$dialog);
      }).promise();
    }, e.prototype.show=function() {
      const t=this; this.context.invoke('editor.saveRange'), this.showHelpDialog().then(function() {
        t.context.invoke('editor.restoreRange');
      });
    }, e;
  }(); const ce=function() {
    function e(e) {
      const o=this; this.context=e, this.ui=t.summernote.ui, this.options=e.options, this.events={'summernote.keyup summernote.mouseup summernote.scroll': function() {
        o.update();
      }, 'summernote.disable summernote.change summernote.dialog.shown': function() {
        o.hide();
      }, 'summernote.focusout': function(t, e) {
        ft.isFF||e.relatedTarget&&Et.ancestor(e.relatedTarget, gt.eq(o.$popover[0]))||o.hide();
      }};
    } return e.prototype.shouldInitialize=function() {
      return this.options.airMode&&!vt.isEmpty(this.options.popover.air);
    }, e.prototype.initialize=function() {
      this.$popover=this.ui.popover({className: 'note-air-popover'}).render().appendTo(this.options.container); const t=this.$popover.find('.popover-content'); this.context.invoke('buttons.build', t, this.options.popover.air);
    }, e.prototype.destroy=function() {
      this.$popover.remove();
    }, e.prototype.update=function() {
      const t=this.context.invoke('editor.currentStyle'); if (t.range&&!t.range.isCollapsed()) {
        const e=vt.last(t.range.getClientRects()); if (e) {
          const o=gt.rect2bnd(e); this.$popover.css({display: 'block', left: Math.max(o.left+o.width/2, 0)-20, top: o.top+o.height}), this.context.invoke('buttons.updateCurrentStyle', this.$popover);
        }
      } else this.hide();
    }, e.prototype.hide=function() {
      this.$popover.hide();
    }, e;
  }(); const de=function() {
    function e(e) {
      const o=this; this.context=e, this.ui=t.summernote.ui, this.$editable=e.layoutInfo.editable, this.options=e.options, this.hint=this.options.hint||[], this.direction=this.options.hintDirection||'bottom', this.hints=Array.isArray(this.hint)?this.hint:[this.hint], this.events={'summernote.keyup': function(t, e) {
        e.isDefaultPrevented()||o.handleKeyup(e);
      }, 'summernote.keydown': function(t, e) {
        o.handleKeydown(e);
      }, 'summernote.disable summernote.dialog.shown': function() {
        o.hide();
      }};
    } return e.prototype.shouldInitialize=function() {
      return 0<this.hints.length;
    }, e.prototype.initialize=function() {
      const e=this; this.lastWordRange=null, this.$popover=this.ui.popover({className: 'note-hint-popover', hideArrow: !0, direction: ''}).render().appendTo(this.options.container), this.$popover.hide(), this.$content=this.$popover.find('.popover-content,.note-popover-content'), this.$content.on('click', '.note-hint-item', function(o) {
        e.$content.find('.active').removeClass('active'), t(o.currentTarget).addClass('active'), e.replace();
      });
    }, e.prototype.destroy=function() {
      this.$popover.remove();
    }, e.prototype.selectItem=function(t) {
      this.$content.find('.active').removeClass('active'), t.addClass('active'), this.$content[0].scrollTop=t[0].offsetTop-this.$content.innerHeight()/2;
    }, e.prototype.moveDown=function() {
      const t=this.$content.find('.note-hint-item.active'); const e=t.next(); if (e.length) this.selectItem(e); else {
        let o=t.parent().next(); o.length||(o=this.$content.find('.note-hint-group').first()), this.selectItem(o.find('.note-hint-item').first());
      }
    }, e.prototype.moveUp=function() {
      const t=this.$content.find('.note-hint-item.active'); const e=t.prev(); if (e.length) this.selectItem(e); else {
        let o=t.parent().prev(); o.length||(o=this.$content.find('.note-hint-group').last()), this.selectItem(o.find('.note-hint-item').last());
      }
    }, e.prototype.replace=function() {
      const t=this.$content.find('.note-hint-item.active'); if (t.length) {
        const e=this.nodeFromItem(t); this.lastWordRange.insertNode(e), At.createFromNode(e).collapse().select(), this.lastWordRange=null, this.hide(), this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]), this.context.invoke('editor.focus');
      }
    }, e.prototype.nodeFromItem=function(t) {
      const e=this.hints[t.data('index')]; const o=t.data('item'); let n=e.content?e.content(o):o; return 'string'==typeof n&&(n=Et.createText(n)), n;
    }, e.prototype.createItemTemplates=function(e, o) {
      const n=this.hints[e]; return o.map(function(o, i) {
        const r=t('<div class="note-hint-item"/>'); return r.append(n.template?n.template(o):o+''), r.data({index: e, item: o}), r;
      });
    }, e.prototype.handleKeydown=function(t) {
      this.$popover.is(':visible')&&(t.keyCode===Pt.code.ENTER?(t.preventDefault(), this.replace()):t.keyCode===Pt.code.UP?(t.preventDefault(), this.moveUp()):t.keyCode===Pt.code.DOWN&&(t.preventDefault(), this.moveDown()));
    }, e.prototype.searchKeyword=function(t, e, o) {
      const n=this.hints[t]; if (n&&n.match.test(e)&&n.search) {
        const i=n.match.exec(e); n.search(i[1], o);
      } else o();
    }, e.prototype.createGroup=function(e, o) {
      const n=this; const i=t('<div class="note-hint-group note-hint-group-'+e+'"/>'); return this.searchKeyword(e, o, function(t) {
        (t=t||[]).length&&(i.html(n.createItemTemplates(e, t)), n.show());
      }), i;
    }, e.prototype.handleKeyup=function(t) {
      const e=this; if (!vt.contains([Pt.code.ENTER, Pt.code.UP, Pt.code.DOWN], t.keyCode)) {
        const o=this.context.invoke('editor.getLastRange').getWordRange(); const n=o.toString(); if (this.hints.length&&n) {
          this.$content.empty(); const i=gt.rect2bnd(vt.last(o.getClientRects())); i&&(this.$popover.hide(), this.lastWordRange=o, this.hints.forEach(function(t, o) {
            t.match.test(n)&&e.createGroup(o, n).appendTo(e.$content);
          }), this.$content.find('.note-hint-item:first').addClass('active'), 'top'===this.direction?this.$popover.css({left: i.left, top: i.top-this.$popover.outerHeight()-5}):this.$popover.css({left: i.left, top: i.top+i.height+5}));
        } else this.hide();
      }
    }, e.prototype.show=function() {
      this.$popover.show();
    }, e.prototype.hide=function() {
      this.$popover.hide();
    }, e;
  }(); t.summernote=t.extend(t.summernote, {version: '0.8.12', plugins: {}, dom: Et, range: At, options: {langInfo: t.summernote.lang['en-US'], modules: {editor: jt, clipboard: Kt, dropzone: Wt, codeview: Vt, statusbar: qt, fullscreen: Gt, handle: _t, hintPopover: de, autoLink: Yt, autoSync: Qt, autoReplace: Jt, placeholder: Xt, buttons: te, toolbar: ee, linkDialog: oe, linkPopover: ne, imageDialog: ie, imagePopover: re, tablePopover: se, videoDialog: ae, helpDialog: le, airPopover: ce}, buttons: {}, lang: 'en-US', followingToolbar: !1, otherStaticBar: '', toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['fontname', ['fontname']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['view', ['fullscreen', 'codeview', 'help']]], popatmouse: !0, popover: {image: [['resize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']]], link: [['link', ['linkDialogShow', 'unlink']]], table: [['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']], ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]], air: [['color', ['color']], ['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture']]]}, airMode: !1, width: null, height: null, linkTargetBlank: !0, focus: !1, tabSize: 4, styleWithSpan: !0, shortcuts: !0, textareaAutoSync: !0, hintDirection: 'bottom', tooltip: 'auto', container: 'body', maxTextLength: 0, blockquoteBreakingLevel: 2, spellCheck: !0, styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande', 'Tahoma', 'Times New Roman', 'Verdana'], fontNamesIgnoreCheck: [], fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'], colors: [['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'], ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'], ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'], ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'], ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'], ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'], ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'], ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']], colorsName: [['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'], ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'], ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'], ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'], ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'], ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'], ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'], ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou']], colorButton: {foreColor: '#000000', backColor: '#FFFF00'}, lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'], tableClassName: 'table table-bordered', insertTableMaxSize: {col: 10, row: 10}, dialogsInBody: !1, dialogsFade: !1, maximumImageFileSize: null, callbacks: {onBeforeCommand: null, onBlur: null, onBlurCodeview: null, onChange: null, onChangeCodeview: null, onDialogShown: null, onEnter: null, onFocus: null, onImageLinkInsert: null, onImageUpload: null, onImageUploadError: null, onInit: null, onKeydown: null, onKeyup: null, onMousedown: null, onMouseup: null, onPaste: null, onScroll: null}, codemirror: {mode: 'text/html', htmlMode: !0, lineNumbers: !0}, codeviewFilter: !1, codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi, codeviewIframeFilter: !0, codeviewIframeWhitelistSrc: [], codeviewIframeWhitelistSrcBase: ['www.youtube.com', 'www.youtube-nocookie.com', 'www.facebook.com', 'vine.co', 'instagram.com', 'player.vimeo.com', 'www.dailymotion.com', 'player.youku.com', 'v.qq.com'], keyMap: {pc: {'ENTER': 'insertParagraph', 'CTRL+Z': 'undo', 'CTRL+Y': 'redo', 'TAB': 'tab', 'SHIFT+TAB': 'untab', 'CTRL+B': 'bold', 'CTRL+I': 'italic', 'CTRL+U': 'underline', 'CTRL+SHIFT+S': 'strikethrough', 'CTRL+BACKSLASH': 'removeFormat', 'CTRL+SHIFT+L': 'justifyLeft', 'CTRL+SHIFT+E': 'justifyCenter', 'CTRL+SHIFT+R': 'justifyRight', 'CTRL+SHIFT+J': 'justifyFull', 'CTRL+SHIFT+NUM7': 'insertUnorderedList', 'CTRL+SHIFT+NUM8': 'insertOrderedList', 'CTRL+LEFTBRACKET': 'outdent', 'CTRL+RIGHTBRACKET': 'indent', 'CTRL+NUM0': 'formatPara', 'CTRL+NUM1': 'formatH1', 'CTRL+NUM2': 'formatH2', 'CTRL+NUM3': 'formatH3', 'CTRL+NUM4': 'formatH4', 'CTRL+NUM5': 'formatH5', 'CTRL+NUM6': 'formatH6', 'CTRL+ENTER': 'insertHorizontalRule', 'CTRL+K': 'linkDialog.show'}, mac: {'ENTER': 'insertParagraph', 'CMD+Z': 'undo', 'CMD+SHIFT+Z': 'redo', 'TAB': 'tab', 'SHIFT+TAB': 'untab', 'CMD+B': 'bold', 'CMD+I': 'italic', 'CMD+U': 'underline', 'CMD+SHIFT+S': 'strikethrough', 'CMD+BACKSLASH': 'removeFormat', 'CMD+SHIFT+L': 'justifyLeft', 'CMD+SHIFT+E': 'justifyCenter', 'CMD+SHIFT+R': 'justifyRight', 'CMD+SHIFT+J': 'justifyFull', 'CMD+SHIFT+NUM7': 'insertUnorderedList', 'CMD+SHIFT+NUM8': 'insertOrderedList', 'CMD+LEFTBRACKET': 'outdent', 'CMD+RIGHTBRACKET': 'indent', 'CMD+NUM0': 'formatPara', 'CMD+NUM1': 'formatH1', 'CMD+NUM2': 'formatH2', 'CMD+NUM3': 'formatH3', 'CMD+NUM4': 'formatH4', 'CMD+NUM5': 'formatH5', 'CMD+NUM6': 'formatH6', 'CMD+ENTER': 'insertHorizontalRule', 'CMD+K': 'linkDialog.show'}}, icons: {align: 'note-icon-align', alignCenter: 'note-icon-align-center', alignJustify: 'note-icon-align-justify', alignLeft: 'note-icon-align-left', alignRight: 'note-icon-align-right', rowBelow: 'note-icon-row-below', colBefore: 'note-icon-col-before', colAfter: 'note-icon-col-after', rowAbove: 'note-icon-row-above', rowRemove: 'note-icon-row-remove', colRemove: 'note-icon-col-remove', indent: 'note-icon-align-indent', outdent: 'note-icon-align-outdent', arrowsAlt: 'note-icon-arrows-alt', bold: 'note-icon-bold', caret: 'note-icon-caret', circle: 'note-icon-circle', close: 'note-icon-close', code: 'note-icon-code', eraser: 'note-icon-eraser', floatLeft: 'note-icon-float-left', floatRight: 'note-icon-float-right', font: 'note-icon-font', frame: 'note-icon-frame', italic: 'note-icon-italic', link: 'note-icon-link', unlink: 'note-icon-chain-broken', magic: 'note-icon-magic', menuCheck: 'note-icon-menu-check', minus: 'note-icon-minus', orderedlist: 'note-icon-orderedlist', pencil: 'note-icon-pencil', picture: 'note-icon-picture', question: 'note-icon-question', redo: 'note-icon-redo', rollback: 'note-icon-rollback', square: 'note-icon-square', strikethrough: 'note-icon-strikethrough', subscript: 'note-icon-subscript', superscript: 'note-icon-superscript', table: 'note-icon-table', textHeight: 'note-icon-text-height', trash: 'note-icon-trash', underline: 'note-icon-underline', undo: 'note-icon-undo', unorderedlist: 'note-icon-unorderedlist', video: 'note-icon-video'}}}), t.summernote=t.extend(t.summernote, {ui: it});
});
