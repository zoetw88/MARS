
import {EditorState} from "prosemirror-state"
import {DOMParser} from"prosemirror-model"
import {EditorView} from "prosemirror-view"
import * as Y from 'yjs'
import { schema } from '../../api/1.0/js/editor/schema.js'
import { WebsocketProvider } from 'y-websocket'
import {rule} from "../../api/1.0/js/editor/index.js"
import {baseKeymap} from"prosemirror-commands"
import {keymap } from 'prosemirror-keymap'
import {ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { CodeBlockView, arrowHandler } from './code_block.js';
    
let urlParams = new URLSearchParams(window.location.search);

let room=urlParams.get('room');
let id=urlParams.get('id');
     function myCursorBuilder(user){
        const cursor = document.createElement('span')
        cursor.classList.add('ProseMirror-yjs-cursor')
        const userDiv = document.createElement('div')
        userDiv.insertBefore(document.createTextNode(`${id}`), null)
        cursor.insertBefore(userDiv, null)
        return cursor
      }

      
        const user=myCursorBuilder()
        const ydoc = new Y.Doc()
        const provider = new WebsocketProvider('ws://localhost:1234',`${room}`, ydoc)
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
