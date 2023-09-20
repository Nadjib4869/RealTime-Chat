import React, {useContext, useEffect, useState} from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Chats() {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats =  () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data())
      });
    
      return () => {
        unsub()
      };
    
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])

  console.log(Object.entries(chats).map(chat=>chat[1].userInfo.displayName))

  const handleSelect = (u) => {
    dispatch({type:'CHANGE_USER', payload:u})
  }

  return (
    <div className='chats'>
       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
       <div onClick={()=>handleSelect(chat[1].userInfo)} key={chat[0]} className="userChat p-2 flex items-center gap-10 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img src={chat[1].userInfo.photoURL} alt="" className='w-12 h-12 rounded-full object-cover' />
        <div className="userChatInfo">
          <span className='text-lg font-medium max-xs:hidden'>
            {chat[1].userInfo.displayName}
          </span>
          <p className='text-sm text-gray-300 max-xs:hidden'>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  )
}
