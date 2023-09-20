import React, {useContext, useEffect, useState} from 'react'
import Message from './Message.jsx'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{  
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    };
  }, [data.chatId])

  return (
    <div className='messages bg-[#ddddf7] p-2 h-[calc(100%_-_96px)] overflow-y-scroll'>
      {messages.map((m)=>(
        <Message key={m.id} message={m} />
      ))}
    </div>
  )
}
