import React, {useEffect} from 'react';
import {EditorState} from "prosemirror-state"
import {DOMParser} from "prosemirror-model"
import {EditorView} from "prosemirror-view"
import * as Y from 'yjs'
import { schema } from './schema.js'
import { WebsocketProvider } from 'y-websocket'
import {rule} from "./index"
import {baseKeymap} from"prosemirror-commands"
import {keymap } from 'prosemirror-keymap'
import {ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import './App.css';
import { CodeBlockView, arrowHandler } from './code_block';



     function myCursorBuilder(user){
        const cursor = document.createElement('span')
        cursor.classList.add('ProseMirror-yjs-cursor')
        const userDiv = document.createElement('div')
        userDiv.insertBefore(document.createTextNode(111), null)
        cursor.insertBefore(userDiv, null)
        return cursor
      }

function App() {
    useEffect(() => {
        const user=myCursorBuilder()
        const ydoc = new Y.Doc()
        const provider = new WebsocketProvider('ws://localhost:3000/','prosemirror', ydoc)
        const type = ydoc.getXmlFragment('prosemirror')
        window.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
              doc: DOMParser.fromSchema(schema).parse(document.querySelector("#content")),
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
        
    });

  return (

    <div className="App">
        <div id="editor" />
        <div id="content" />
    </div>
        
  );
}

export default App;