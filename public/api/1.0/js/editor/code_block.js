import{ schema} from'./schema';
import{ Selection, TextSelection } from 'prosemirror-state';
import CodeMirror from  'codemirror';
import { undo, redo } from 'prosemirror-history';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/http/http';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/php/php';
import 'codemirror/mode/pug/pug';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/xml/xml';

export class CodeBlockView {
  constructor(node, view, getPos) {
    // Store for later
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.incomingChanges = false;

    // Create a CodeMirror instance
    this.cm = new CodeMirror(null, {
      value: this.node.textContent,
      mode: 'javascript',   //TODO: get mode by node.attrs.params,
      lineNumbers: false,
      extraKeys: this.codeMirrorKeymap(),
      scrollbarStyle: null,
      lineWrapping: true,
    });

    // The editor's outer node is our DOM representation
    this.dom = this.cm.getWrapperElement();
    // CodeMirror needs to be in the DOM to properly initialize, so
    // schedule it to update itself
    setTimeout(() => this.cm.refresh(), 20);

    // This flag is used to avoid an update loop between the outer and
    // inner editor
    this.updating = false;
    // Track whether changes are have been made but not yet propagated
    this.cm.on('beforeChange', () => { this.incomingChanges = true; });
    // Propagate updates from the code editor to ProseMirror
    this.cm.on('cursorActivity', () => {
      if (!this.updating && !this.incomingChanges) this.forwardSelection();
    });
    this.cm.on('changes', () => {
      if (!this.updating) {
        this.valueChanged();
        this.forwardSelection();
      }
      this.incomingChanges = false;
    });
    this.cm.on('focus', () => this.forwardSelection());
  }

  forwardSelection() {
    if (!this.cm.hasFocus()) return;
    const { state } = this.view;
    const selection = this.asProseMirrorSelection(state.doc);
    if (!selection.eq(state.selection)) {
      this.view.dispatch(state.tr.setSelection(selection));
    }
  }

  asProseMirrorSelection(doc) {
    const offset = this.getPos() + 1;
    const anchor = this.cm.indexFromPos(this.cm.getCursor('anchor')) + offset;
    const head = this.cm.indexFromPos(this.cm.getCursor('head')) + offset;
    return TextSelection.create(doc, anchor, head);
  }

  setSelection(anchor, head) {
    this.cm.focus();
    this.updating = true;
    this.cm.setSelection(this.cm.posFromIndex(anchor),
      this.cm.posFromIndex(head));
    this.updating = false;
  }

  computeChange(oldVal, newVal) {
    if (oldVal === newVal) return null;
    let start = 0; let oldEnd = oldVal.length; let newEnd = newVal.length;
    while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
      ++start;
    }
    while (oldEnd > start && newEnd > start
      && oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)) {
      oldEnd--;
      newEnd--;
    }
    return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
  }

  valueChanged() {
    const change = this.computeChange(this.node.textContent, this.cm.getValue());
    if (change) {
      const start = this.getPos() + 1;
      const tr = this.view.state.tr.replaceWith(
        start + change.from, start + change.to,
        change.text ? schema.text(change.text) : null,
      );
      this.view.dispatch(tr);
    }
  }

  codeMirrorKeymap() {
    const { view } = this;
    const mod = /Mac/.test(navigator.platform) ? 'Cmd' : 'Ctrl';
    return CodeMirror.normalizeKeyMap({
      Up: () => this.maybeEscape('line', -1),
      Left: () => this.maybeEscape('char', -1),
      Down: () => this.maybeEscape('line', 1),
      Right: () => this.maybeEscape('char', 1),
      [`${mod}-Z`]: () => undo(view.state, view.dispatch),
      [`Shift-${mod}-Z`]: () => redo(view.state, view.dispatch),
      [`${mod}-Y`]: () => redo(view.state, view.dispatch),
      'Ctrl-Enter': () => {
        if (exitCode(view.state, view.dispatch)) view.focus();
      },
    });
  }

  maybeEscape(unit, dir) {
    const pos = this.cm.getCursor();
    if (this.cm.somethingSelected()
      || pos.line !== (dir < 0 ? this.cm.firstLine() : this.cm.lastLine())
      || (unit === 'char'
        && pos.ch !== (dir < 0 ? 0 : this.cm.getLine(pos.line).length))) return CodeMirror.Pass;
    this.view.focus();
    const targetPos = this.getPos() + (dir < 0 ? 0 : this.node.nodeSize);
    const selection = Selection.near(this.view.state.doc.resolve(targetPos), dir);
    this.view.dispatch(this.view.state.tr.setSelection(selection).scrollIntoView());
    this.view.focus();
  }

  update(node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    const change = this.computeChange(this.cm.getValue(), node.textContent);
    if (change) {
      this.updating = true;
      this.cm.replaceRange(change.text, this.cm.posFromIndex(change.from),
        this.cm.posFromIndex(change.to));
      this.updating = false;
    }
    return true;
  }

  selectNode() { this.cm.focus(); }

  stopEvent() { return true; }
}

export function arrowHandler(dir) {
  return (state, dispatch, view) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      const side = dir === 'left' || dir === 'up' ? -1 : 1;
      const { $head } = state.selection;
      const nextPos = Selection.near(state.doc.resolve(side > 0 ? $head.after() : $head.before()), side);
      if (nextPos.$head && nextPos.$head.parent.type.name === 'code_block') {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
}
