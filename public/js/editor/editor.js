
import {EditorState} from "prosemirror-state"
import {DOMParser} from"prosemirror-model"
import {EditorView} from "prosemirror-view"
import * as Y from 'yjs'
import { schema } from './schema.js'
import { WebsocketProvider } from 'y-websocket'
import {rule} from "./index.js"
import {baseKeymap} from"prosemirror-commands"
import {keymap } from 'prosemirror-keymap'
import {ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { CodeBlockView, arrowHandler } from './code_block.js';
var randomColor = require('randomcolor'); // import the script
var color = randomColor();
let editor=localStorage.getItem('editor');
    let id=localStorage.getItem('talker');
     function myCursorBuilder(user){
        const cursor = document.createElement('span')
        cursor.classList.add('ProseMirror-yjs-cursor')
        const userDiv = document.createElement('div')
        userDiv.insertBefore(document.createTextNode(`${id}`), null)
        userDiv.setAttribute('style', `background-color: ${color}`)
        cursor.insertBefore(userDiv, null)
        return cursor
      }
   
      
        const user=myCursorBuilder()
        const ydoc = new Y.Doc()
        const provider = new WebsocketProvider('wss://demos.yjs.dev',`${editor}`, ydoc)
        const type = ydoc.getXmlFragment('prosemirror')
        window.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
             schema,
                plugins: [
                    ySyncPlugin(type),
                    yCursorPlugin(provider.awareness,{ cursorBuilder: myCursorBuilder }),
                    yUndoPlugin(),
                    keymap(baseKeymap,{
                      'Mod-z': undo,
                      'Mod-y': redo,
                      'Mod-Shift-z': redo
                    })
                  ].concat(rule({ schema }))
            })
           , nodeViews: { code_block(node, view, getPos) {return new CodeBlockView(node, view, getPos)}}
        })
        
 

  r
