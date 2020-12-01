import React from 'react'
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from './contexts/ConversationsProvider';
import { Router, Route, Link, hashHistory } from 'react-router-dom'
import Editor from "../Editor/Editor";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()

  return (
  
   

    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      <Link to="/about">About</Link>

      {selectedConversation && <OpenConversation />}
    </div>
   
  )

}
