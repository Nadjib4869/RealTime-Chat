import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Message({message}) {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
//! ${message.senderId === currentUser.uid ? owner : "flex gap-2 mb-5"}

  const ref = useRef();

  message.sender === currentUser.uid ? console.log('owner') : console.log('not owner')

  console.log(message.sender, currentUser.uid)

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:'smooth'});
  },[message]);

  return (
    <div ref={ref} className={`flex gap-2 mb-5 ${message.sender=== currentUser.uid ? 'flex-row-reverse' : ''}`}>
        <div className="messageInfo flex-col text-slate-500 font-light ">
            <img 
            src={
              message.sender === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
            } 
              alt="" 
              className='w-10 h-10 rounded-full object-cover' />
            <span className='text-sm'>Just now</span>
        </div>
        <div className={`max-w-4/5 ${message.sender === currentUser.uid ? 'items-end' : 'flex-col'}`}>
            <p className={`max-w-max px-2 py-1 ${message.sender === currentUser.uid ? 'bg-[#8da4f1] text-white rounded-l-xl rounded-br-xl' : 'bg-white rounded-r-xl rounded-bl-xl'}`}>{message.text}</p>
            {message.img && <img src={message.img} alt="" className='w-2/4' />}
        </div>
    </div>
  )
}