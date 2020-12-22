
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


window.addEventListener('load', () => {
var randomColor = require('randomcolor'); // import the script
var color = randomColor();
let urlParams = new URLSearchParams(window.location.search);

let room=urlParams.get('room');

  

const editor = document.createElement('div')
editor.setAttribute('id', 'editor')
const editorContainer = document.createElement('div')
editorContainer.insertBefore(editor, null)
      
       
        const ydoc = new Y.Doc()
        const provider = new WebsocketProvider('ws://localhost:1234',`${room}`, ydoc)
        const type = ydoc.getXmlFragment('prosemirror')
        const prosemirrorView=window.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
             schema,
                plugins: [
                   
                    yCursorPlugin(provider.awareness),
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
        document.body.insertBefore(editorContainer, null)
 
        window.example = { provider, ydoc, type, prosemirrorView }
      })
