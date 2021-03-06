import crel from 'crelt';
import {lift, joinUp, selectParentNode, wrapIn, setBlockType} from 'prosemirror-commands';
import {undo, redo} from 'prosemirror-history';

import {getIcon} from './icons';

const prefix = 'ProseMirror-menu';

// ::- An icon or label that, when clicked, executes a command.
export class MenuItem {
  // :: (MenuItemSpec)
  constructor(spec) {
    // :: MenuItemSpec
    // The spec used to create the menu item.
    this.spec = spec;
  }

  // :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
  // Renders the icon according to its [display
  // spec](#menu.MenuItemSpec.display), and adds an event handler which
  // executes the command when the representation is clicked.
  render(view) {
    const spec = this.spec;
    const dom = spec.render ? spec.render(view) :
        spec.icon ? getIcon(spec.icon) :
        spec.label ? crel('div', null, translate(view, spec.label)) :
        null;
    if (!dom) throw new RangeError('MenuItem without icon or label property');
    if (spec.title) {
      const title = (typeof spec.title === 'function' ? spec.title(view.state) : spec.title);
      dom.setAttribute('title', translate(view, title));
    }
    if (spec.class) dom.classList.add(spec.class);
    if (spec.css) dom.style.cssText += spec.css;

    dom.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!dom.classList.contains(prefix + '-disabled')) {
        spec.run(view.state, view.dispatch, view, e);
      }
    });

    function update(state) {
      if (spec.select) {
        const selected = spec.select(state);
        dom.style.display = selected ? '' : 'none';
        if (!selected) return false;
      }
      let enabled = true;
      if (spec.enable) {
        enabled = spec.enable(state) || false;
        setClass(dom, prefix + '-disabled', !enabled);
      }
      if (spec.active) {
        const active = enabled && spec.active(state) || false;
        setClass(dom, prefix + '-active', active);
      }
      return true;
    }

    return {dom, update};
  }
}

function translate(view, text) {
  return view._props.translate ? view._props.translate(text) : text;
}

// MenuItemSpec:: interface
// The configuration object passed to the `MenuItem` constructor.
//
//   run:: (EditorState, (Transaction), EditorView, dom.Event)
//   The function to execute when the menu item is activated.
//
//   select:: ?(EditorState) → bool
//   Optional function that is used to determine whether the item is
//   appropriate at the moment. Deselected items will be hidden.
//
//   enable:: ?(EditorState) → bool
//   Function that is used to determine if the item is enabled. If
//   given and returning false, the item will be given a disabled
//   styling.
//
//   active:: ?(EditorState) → bool
//   A predicate function to determine whether the item is 'active' (for
//   example, the item for toggling the strong mark might be active then
//   the cursor is in strong text).
//
//   render:: ?(EditorView) → dom.Node
//   A function that renders the item. You must provide either this,
//   [`icon`](#menu.MenuItemSpec.icon), or [`label`](#MenuItemSpec.label).
//
//   icon:: ?Object
//   Describes an icon to show for this item. The object may specify
//   an SVG icon, in which case its `path` property should be an [SVG
//   path
//   spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d),
//   and `width` and `height` should provide the viewbox in which that
//   path exists. Alternatively, it may have a `text` property
//   specifying a string of text that makes up the icon, with an
//   optional `css` property giving additional CSS styling for the
//   text. _Or_ it may contain `dom` property containing a DOM node.
//
//   label:: ?string
//   Makes the item show up as a text label. Mostly useful for items
//   wrapped in a [drop-down](#menu.Dropdown) or similar menu. The object
//   should have a `label` property providing the text to display.
//
//   title:: ?union<string, (EditorState) → string>
//   Defines DOM title (mouseover) text for the item.
//
//   class:: ?string
//   Optionally adds a CSS class to the item's DOM representation.
//
//   css:: ?string
//   Optionally adds a string of inline CSS to the item's DOM
//   representation.

const lastMenuEvent = {time: 0, node: null};
function markMenuEvent(e) {
  lastMenuEvent.time = Date.now();
  lastMenuEvent.node = e.target;
}
function isMenuEvent(wrapper) {
  return Date.now() - 100 < lastMenuEvent.time &&
    lastMenuEvent.node && wrapper.contains(lastMenuEvent.node);
}

// ::- A drop-down menu, displayed as a label with a downwards-pointing
// triangle to the right of it.
export class Dropdown {
  // :: ([MenuElement], ?Object)
  // Create a dropdown wrapping the elements. Options may include
  // the following properties:
  //
  // **`label`**`: string`
  //   : The label to show on the drop-down control.
  //
  // **`title`**`: string`
  //   : Sets the
  //     [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)
  //     attribute given to the menu control.
  //
  // **`class`**`: string`
  //   : When given, adds an extra CSS class to the menu control.
  //
  // **`css`**`: string`
  //   : When given, adds an extra set of CSS styles to the menu control.
  constructor(content, options) {
    this.options = options || {};
    this.content = Array.isArray(content) ? content : [content];
  }

  // :: (EditorView) → {dom: dom.Node, update: (EditorState)}
  // Render the dropdown menu and sub-items.
  render(view) {
    const content = renderDropdownItems(this.content, view);

    const label = crel('div', {class: prefix + '-dropdown ' + (this.options.class || ''),
      style: this.options.css},
    translate(view, this.options.label));
    if (this.options.title) label.setAttribute('title', translate(view, this.options.title));
    const wrap = crel('div', {class: prefix + '-dropdown-wrap'}, label);
    let open = null; let listeningOnClose = null;
    const close = () => {
      if (open && open.close()) {
        open = null;
        window.removeEventListener('mousedown', listeningOnClose);
      }
    };
    label.addEventListener('mousedown', (e) => {
      e.preventDefault();
      markMenuEvent(e);
      if (open) {
        close();
      } else {
        open = this.expand(wrap, content.dom);
        window.addEventListener('mousedown', listeningOnClose = () => {
          if (!isMenuEvent(wrap)) close();
        });
      }
    });

    function update(state) {
      const inner = content.update(state);
      wrap.style.display = inner ? '' : 'none';
      return inner;
    }

    return {dom: wrap, update};
  }

  expand(dom, items) {
    const menuDOM = crel('div', {class: prefix + '-dropdown-menu ' + (this.options.class || '')}, items);

    let done = false;
    function close() {
      if (done) return;
      done = true;
      dom.removeChild(menuDOM);
      return true;
    }
    dom.appendChild(menuDOM);
    return {close, node: menuDOM};
  }
}

function renderDropdownItems(items, view) {
  const rendered = []; const updates = [];
  for (let i = 0; i < items.length; i++) {
    const {dom, update} = items[i].render(view);
    rendered.push(crel('div', {class: prefix + '-dropdown-item'}, dom));
    updates.push(update);
  }
  return {dom: rendered, update: combineUpdates(updates, rendered)};
}

function combineUpdates(updates, nodes) {
  return (state) => {
    let something = false;
    for (let i = 0; i < updates.length; i++) {
      const up = updates[i](state);
      nodes[i].style.display = up ? '' : 'none';
      if (up) something = true;
    }
    return something;
  };
}

// ::- Represents a submenu wrapping a group of elements that start
// hidden and expand to the right when hovered over or tapped.
export class DropdownSubmenu {
  // :: ([MenuElement], ?Object)
  // Creates a submenu for the given group of menu elements. The
  // following options are recognized:
  //
  // **`label`**`: string`
  //   : The label to show on the submenu.
  constructor(content, options) {
    this.options = options || {};
    this.content = Array.isArray(content) ? content : [content];
  }

  // :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
  // Renders the submenu.
  render(view) {
    const items = renderDropdownItems(this.content, view);

    const label = crel('div', {class: prefix + '-submenu-label'}, translate(view, this.options.label));
    const wrap = crel('div', {class: prefix + '-submenu-wrap'}, label,
        crel('div', {class: prefix + '-submenu'}, items.dom));
    let listeningOnClose = null;
    label.addEventListener('mousedown', (e) => {
      e.preventDefault();
      markMenuEvent(e);
      setClass(wrap, prefix + '-submenu-wrap-active');
      if (!listeningOnClose) {
        window.addEventListener('mousedown', listeningOnClose = () => {
          if (!isMenuEvent(wrap)) {
            wrap.classList.remove(prefix + '-submenu-wrap-active');
            window.removeEventListener('mousedown', listeningOnClose);
            listeningOnClose = null;
          }
        });
      }
    });

    function update(state) {
      const inner = items.update(state);
      wrap.style.display = inner ? '' : 'none';
      return inner;
    }
    return {dom: wrap, update};
  }
}

// :: (EditorView, [union<MenuElement, [MenuElement]>]) → {dom: ?dom.DocumentFragment, update: (EditorState) → bool}
// Render the given, possibly nested, array of menu elements into a
// document fragment, placing separators between them (and ensuring no
// superfluous separators appear when some of the groups turn out to
// be empty).
export function renderGrouped(view, content) {
  const result = document.createDocumentFragment();
  const updates = []; const separators = [];
  for (let i = 0; i < content.length; i++) {
    const items = content[i]; const localUpdates = []; const localNodes = [];
    for (let j = 0; j < items.length; j++) {
      const {dom, update} = items[j].render(view);
      const span = crel('span', {class: prefix + 'item'}, dom);
      result.appendChild(span);
      localNodes.push(span);
      localUpdates.push(update);
    }
    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
      if (i < content.length - 1) {
        separators.push(result.appendChild(separator()));
      }
    }
  }

  function update(state) {
    let something = false; let needSep = false;
    for (let i = 0; i < updates.length; i++) {
      const hasContent = updates[i](state);
      if (i) separators[i - 1].style.display = needSep && hasContent ? '' : 'none';
      needSep = hasContent;
      if (hasContent) something = true;
    }
    return something;
  }
  return {dom: result, update};
}

function separator() {
  return crel('span', {class: prefix + 'separator'});
}

// :: Object
// A set of basic editor-related icons. Contains the properties
// `join`, `lift`, `selectParentNode`, `undo`, `redo`, `strong`, `em`,
// `code`, `link`, `bulletList`, `orderedList`, and `blockquote`, each
// holding an object that can be used as the `icon` option to
// `MenuItem`.
export const icons = {
  join: {
    width: 800, height: 900,
    path: 'M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z',
  },
  strikethrough: {
    width: 768, height: 768,
    path: 'M 768 384 v 48 h -175.88 c 20.628 28.882 31.88 62.019 31.88 96 c 0 53.159 -27.495 104.27 -75.435 140.223 c -44.518 33.389 -102.963 51.777 -164.565 51.777 c -61.604 0 -120.047 -18.389 -164.565 -51.777 c -47.94 -35.953 -75.435 -87.064 -75.435 -140.223 h 96 c 0 52.037 65.945 96 144 96 s 144 -43.964 144 -96 c 0 -52.037 -65.945 -96 -144 -96 h -384 v -48 h 224.638 c -1.754 -1.24 -3.492 -2.493 -5.203 -3.777 c -47.94 -35.955 -75.435 -87.065 -75.435 -140.223 s 27.495 -104.268 75.435 -140.223 c 44.518 -33.389 102.961 -51.777 164.565 -51.777 c 61.602 0 120.047 18.388 164.565 51.777 c 47.94 35.955 75.435 87.064 75.435 140.223 h -96 c 0 -52.036 -65.945 -96 -144 -96 s -144 43.964 -144 96 c 0 52.036 65.945 96 144 96 c 59.233 0 115.54 17.009 159.361 48 h 224.639 Z',
  },
  horizontal_rule: {
    width: 512, height: 512,
    path: 'M 0 208 v 96 c 0 8.836 7.164 16 16 16 h 480 c 8.836 0 16 -7.164 16 -16 v -96 c 0 -8.836 -7.164 -16 -16 -16 h -480 c -8.836 0 -16 7.164 -16 16 Z',
  },
  lift: {
    width: 448, height: 512,
    path: 'M 108 284 c -6.6 0 -12 -5.4 -12 -12 v -32 c 0 -6.6 5.4 -12 12 -12 h 232 c 6.6 0 12 5.4 12 12 v 32 c 0 6.6 -5.4 12 -12 12 H 108 Z M 448 80 v 352 c 0 26.5 -21.5 48 -48 48 H 48 c -26.5 0 -48 -21.5 -48 -48 V 80 c 0 -26.5 21.5 -48 48 -48 h 352 c 26.5 0 48 21.5 48 48 Z m -48 346 V 86 c 0 -3.3 -2.7 -6 -6 -6 H 54 c -3.3 0 -6 2.7 -6 6 v 340 c 0 3.3 2.7 6 6 6 h 340 c 3.3 0 6 -2.7 6 -6 Z',
  },
  selectParentNode: {text: '\u2b1a', css: 'font-weight: bold'},
  undo: {
    width: 1024, height: 1024,
    path: 'M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z',
  },
  redo: {
    width: 1024, height: 1024,
    path: 'M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z',
  },
  strong: {
    width: 805, height: 1024,
    path: 'M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z',
  },
  em: {
    width: 585, height: 1024,
    path: 'M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z',
  },
  underline: {
    width: 448, height: 512,
    path: 'M 32 64 h 32 v 160 c 0 88.22 71.78 160 160 160 s 160 -71.78 160 -160 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 272 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 32 v 160 a 80 80 0 0 1 -160 0 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 32 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 Z m 400 384 H 16 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 v -32 a 16 16 0 0 0 -16 -16 Z',
  },
  heading: {
    width: 512, height: 512,
    path: 'M 32 64 h 32 v 160 c 0 88.22 71.78 160 160 160 s 160 -71.78 160 -160 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 272 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 32 v 160 a 80 80 0 0 1 -160 0 V 64 h 32 a 16 16 0 0 0 16 -16 V 16 a 16 16 0 0 0 -16 -16 H 32 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 Z m 400 384 H 16 a 16 16 0 0 0 -16 16 v 32 a 16 16 0 0 0 16 16 h 416 a 16 16 0 0 0 16 -16 v -32 a 16 16 0 0 0 -16 -16 Z',
  },
  code: {
    width: 896, height: 1024,
    path: 'M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z',
  },
  mark: {
    width: 512, height: 512,
    path: 'M 167.02 309.34 c -40.12 2.58 -76.53 17.86 -97.19 72.3 c -2.35 6.21 -8 9.98 -14.59 9.98 c -11.11 0 -45.46 -27.67 -55.25 -34.35 C 0 439.62 37.93 512 128 512 c 75.86 0 128 -43.77 128 -120.19 c 0 -3.11 -0.65 -6.08 -0.97 -9.13 l -88.01 -73.34 Z M 457.89 0 c -15.16 0 -29.37 6.71 -40.21 16.45 C 213.27 199.05 192 203.34 192 257.09 c 0 13.7 3.25 26.76 8.73 38.7 l 63.82 53.18 c 7.21 1.8 14.64 3.03 22.39 3.03 c 62.11 0 98.11 -45.47 211.16 -256.46 c 7.38 -14.35 13.9 -29.85 13.9 -45.99 C 512 20.64 486 0 457.89 0 Z',
  },
  link: {
    width: 951, height: 1024,
    path: 'M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z',
  },

  bulletList: {
    width: 768, height: 896,
    path: 'M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z',
  },
  orderedList: {
    width: 768, height: 896,
    path: 'M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z',
  },
  blockquote: {
    width: 448, height: 512,
    path: 'M 352 240 v 32 c 0 6.6 -5.4 12 -12 12 h -88 v 88 c 0 6.6 -5.4 12 -12 12 h -32 c -6.6 0 -12 -5.4 -12 -12 v -88 h -88 c -6.6 0 -12 -5.4 -12 -12 v -32 c 0 -6.6 5.4 -12 12 -12 h 88 v -88 c 0 -6.6 5.4 -12 12 -12 h 32 c 6.6 0 12 5.4 12 12 v 88 h 88 c 6.6 0 12 5.4 12 12 Z m 96 -160 v 352 c 0 26.5 -21.5 48 -48 48 H 48 c -26.5 0 -48 -21.5 -48 -48 V 80 c 0 -26.5 21.5 -48 48 -48 h 352 c 26.5 0 48 21.5 48 48 Z m -48 346 V 86 c 0 -3.3 -2.7 -6 -6 -6 H 54 c -3.3 0 -6 2.7 -6 6 v 340 c 0 3.3 2.7 6 6 6 h 340 c 3.3 0 6 -2.7 6 -6 Z',
  },
};

// :: MenuItem
// Menu item for the `joinUp` command.
export const joinUpItem = new MenuItem({
  title: 'Join with above block',
  run: joinUp,
  select: (state) => joinUp(state),
  icon: icons.join,
});

// :: MenuItem
// Menu item for the `lift` command.
export const liftItem = new MenuItem({
  title: 'Lift out of enclosing block',
  run: lift,
  select: (state) => lift(state),
  icon: icons.lift,
});

// :: MenuItem
// Menu item for the `selectParentNode` command.
export const selectParentNodeItem = new MenuItem({
  title: 'Select parent node',
  run: selectParentNode,
  select: (state) => selectParentNode(state),
  icon: icons.selectParentNode,
});

// :: MenuItem
// Menu item for the `undo` command.
export const undoItem = new MenuItem({
  title: 'Undo last change',
  run: undo,
  enable: (state) => undo(state),
  icon: icons.undo,
});

// :: MenuItem
// Menu item for the `redo` command.
export const redoItem = new MenuItem({
  title: 'Redo last undone change',
  run: redo,
  enable: (state) => redo(state),
  icon: icons.redo,
});

// :: (NodeType, Object) → MenuItem
// Build a menu item for wrapping the selection in a given node type.
// Adds `run` and `select` properties to the ones present in
// `options`. `options.attrs` may be an object or a function.
export function wrapItem(nodeType, options) {
  const passedOptions = {
    run(state, dispatch) {
      // FIXME if (options.attrs instanceof Function) options.attrs(state, attrs => wrapIn(nodeType, attrs)(state))
      return wrapIn(nodeType, options.attrs)(state, dispatch);
    },
    select(state) {
      return wrapIn(nodeType, options.attrs instanceof Function ? null : options.attrs)(state);
    },
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}

// :: (NodeType, Object) → MenuItem
// Build a menu item for changing the type of the textblock around the
// selection to the given type. Provides `run`, `active`, and `select`
// properties. Others must be given in `options`. `options.attrs` may
// be an object to provide the attributes for the textblock node.
export function blockTypeItem(nodeType, options) {
  const command = setBlockType(nodeType, options.attrs);
  const passedOptions = {
    run: command,
    enable(state) {
      return command(state);
    },
    active(state) {
      const {$from, to, node} = state.selection;
      if (node) return node.hasMarkup(nodeType, options.attrs);
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
    },
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}

// Work around classList.toggle being broken in IE11
function setClass(dom, cls, on) {
  if (on) dom.classList.add(cls);
  else dom.classList.remove(cls);
}
